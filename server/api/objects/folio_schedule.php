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
        $query = "SELECT * FROM FOLIOCALENDAR WHERE WINDOW_NAME != 'OVERRIDE' ORDER BY SEQ";

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
    }

    protected function post_create()
    {
        return $this->post_update();
    }

    protected function post_update()
    {
        $query = "UPDATE FOLIOCALENDAR
            SET LAST_CHG_TIME = SYSDATE
            WHERE SEQ = :seq";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':seq', $this->seq);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}