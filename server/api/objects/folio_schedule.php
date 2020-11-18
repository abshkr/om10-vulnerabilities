<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

//Old php: amfphp dmsFolioService.php::getFolioScheduling
class FolioSchedule extends CommonClass
{
    protected $TABLE_NAME = 'FOLIOCALENDAR';
    protected $primary_keys = array("seq");
    public $desc = "Folio schedule exception";
    
    public $NUMBER_FIELDS = array(
        
    );

    public $BOOLEAN_FIELDS = array(
        
    );

    public function read()
    {
        $query = "SELECT * FROM FOLIOCALENDAR ORDER BY SEQ";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_existence()
    {
        $query = "SELECT COUNT(*) CN FROM FOLIOCALENDAR
            WHERE WINDOW_NAME = :window AND REPEAT_INTERVAL = :interval";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':window', $this->window_name);
        oci_bind_by_name($stmt, ':interval', $this->repeat_interval);
        if (oci_execute($stmt, $this->commit_mode)) {
            $this->record_str = sprintf("window:%s, interval:%s", $this->window_name, $this->repeat_interval);
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if ($row['CN'] > 0) {
                return true;
            }

            return false;
            
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
    }

    public function pre_delete()
    {
        return $this->pre_update();
    }

    public function pre_update()
    {
        if (!isset($this->seq)) {
            $query = "SELECT SEQ FROM FOLIOCALENDAR
                WHERE WINDOW_NAME = :window AND REPEAT_INTERVAL = :interval";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':window', $this->window_name);
            oci_bind_by_name($stmt, ':interval', $this->repeat_interval);
            if (oci_execute($stmt, $this->commit_mode)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                $this->seq = $row['SEQ'];
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        if (!isset($this->user_code)) {
            $this->user_code = Utilities::getCurrPsn();
        }
    }

    public function pre_create()
    {
        $query = "SELECT NVL(MAX(SEQ), 0) + 1 NEW_SEQ FROM FOLIOCALENDAR";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->seq = $row['NEW_SEQ'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        if (!isset($this->user_code)) {
            $this->user_code = Utilities::getCurrPsn();
        }

        if (!isset($this->status)) {
            $this->status = 1;
        }
    }

    protected function post_create()
    {
        $this->update_last_chg();
        $this->changeExceptionToLiveTable("ADD");
    }

    protected function post_update()
    {
        $this->update_last_chg();
        $this->changeExceptionToLiveTable("ADD");
    }

    protected function post_delete()
    {
        $this->update_last_chg();
        $this->changeExceptionToLiveTable("DELETE");
    }

    private function update_last_chg()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        // write_log(json_encode($this), __FILE__, __LINE__);

        $this->user_code = Utilities::getCurrPsn();
        
        $query = "UPDATE FOLIOCALENDAR
            SET LAST_CHG_TIME = SYSDATE,
                USER_CODE = :last_chg_user
            WHERE WINDOW_NAME = :window_name
                AND REPEAT_INTERVAL = :repeat_interval";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':window_name', $this->window_name);
        oci_bind_by_name($stmt, ':repeat_interval', $this->repeat_interval);
        oci_bind_by_name($stmt, ':last_chg_user', $this->user_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    private function changeExceptionToLiveTable($action)
    {
        write_log(sprintf("%s::%s() START. action:%s", __CLASS__, __FUNCTION__, $action),
            __FILE__, __LINE__);

        $flag = 1;
        if ($action == "DELETE") {
            $flag = 0;
        }

        if (!isset($this->window_name) || (!$this->window_name))	{
            write_log("window_name not set", __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        if (!isset($this->repeat_interval) || (!$this->repeat_interval))	{
            write_log("repeat_interval not set", __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        
        switch ($this->window_name) {
            case "ONCE_WINDOW":     //For example 10_11_2020 10th of Nov 2020
                $strExplode = explode('_', $this->repeat_interval);
                $date  = $strExplode[0];
                $month = $strExplode[1];
                $year  = $strExplode[2];
                    
                $query = "UPDATE FILTERCALENDAR SET ONCE_WINDOW = " . $flag . " 
                    WHERE C_DATE = TO_DATE('" . $date . "/" . $month ."/" . $year . "', 'DD/MM/YYYY') AND C_DATE >= SYSDATE - 1";
                $stmt = oci_parse($this->conn, $query);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
                break;
            
            case "WEEK_WINDOW":     //For examle: Friday
                switch (strtoupper($this->repeat_interval)) {
                    case "MONDAY":		
                    case "MON":		
                        $dayNum = 1;	
                        break;
                    case "TUESDAY":		
                    case "TUES":	
                        $dayNum = 2;	
                        break;
                    case "WEDNESDAY": 	
                    case "WED":		
                        $dayNum = 3;	
                        break;
                    case "THURSDAY":	
                    case "THURS":	
                        $dayNum = 4;	
                        break;
                    case "FRIDAY":		
                    case "FRI":		
                        $dayNum = 5;	
                        break;
                    case "SATURDAY":	
                    case "SAT":		
                        $dayNum = 6;	
                        break;
                    case "SUNDAY":		
                    case "SUN":		
                        $dayNum = 7;	
                        break;
                    default: 
                        write_log("Invalid WEEK_WINDOW:" . $this->repeat_interval, __FILE__, __LINE__, LogLevel::ERROR);
                }

                $query = "UPDATE FILTERCALENDAR SET WEEK_WINDOW = " . $flag . "  
                    WHERE DAY_OF_WEEK IN (" . $dayNum . ") AND C_DATE >= SYSDATE - 1";
                $stmt = oci_parse($this->conn, $query);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
                break;
                
            case "MONTH_WINDOW":    //For exaple, 8: every 8th of a month
                $cleanMonth = $this->repeat_interval < 10 ? "0" . $this->repeat_interval : $this->repeat_interval;
                $query = "UPDATE FILTERCALENDAR SET MONTH_WINDOW = " . $flag . " 
                    WHERE TO_CHAR (C_DATE, 'DD') = '" . $cleanMonth . "' AND C_DATE >= SYSDATE - 1";
                $stmt = oci_parse($this->conn, $query);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
                break;		

            case "DATE_YEAR_WINDOW":    //For example 10_11: every 10th of Nov
                $strExplode = explode('_', $this->repeat_interval);
                $month = intval($strExplode[1]) < 10 ? "0" . $strExplode[1] : $strExplode[1];
                $date = intval($strExplode[0]) < 10 ? "0" . $strExplode[0] : $strExplode[0];

                $query = "UPDATE FILTERCALENDAR SET DATE_YEAR_WINDOW = " . $flag . " 
                    WHERE TO_CHAR (C_DATE, 'DD_MM')= '" . $date . "_" . $month . "' AND C_DATE >= SYSDATE - 1";
                $stmt = oci_parse($this->conn, $query);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
                break;	

            case "YEAR_WINDOW":     //For example 2_Saturday_9, the third Saturday of Sep
                $strExplode = explode('_', $this->repeat_interval);
                $dayCount = $strExplode[0] * 7;
                $day = $strExplode[1];
                $month = intval($strExplode[2]) < 10 ? "0" . $strExplode[2] : $strExplode[2];

                $query = "UPDATE FILTERCALENDAR SET YEAR_WINDOW = " . $flag . " 
                    WHERE C_DATE = NEXT_DAY(LAST_DAY(ADD_MONTHS(C_DATE, -1)), '$day') + $dayCount 
                        AND TO_CHAR(C_DATE, 'MM') = '$month' AND C_DATE >= SYSDATE - 1";
                $stmt = oci_parse($this->conn, $query);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
                break;	
        }

    }
}