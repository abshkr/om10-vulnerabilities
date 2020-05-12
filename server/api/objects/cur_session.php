<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CurSession extends CommonClass
{
    protected $VIEW_NAME = 'DUMMY';
    
    public function server_date()
    {
        $feature_array = array();

        $feature_array['time_zone'] = preg_replace("/\r|\n/", "", shell_exec("date +'%:z'")); 
        $feature_array['date'] = preg_replace("/\r|\n/", "", shell_exec("date +'%F %H:%M:%S'"));

        $result = array();
        $result["records"] = $feature_array;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function sessionData()
    {
        $feature_array = array();

        $feature_array['time_zone'] = preg_replace("/\r|\n/", "", shell_exec("date +'%:z'")); 
        $feature_array['date'] = preg_replace("/\r|\n/", "", shell_exec("date +'%F %H:%M:%S'"));

        $alarms = array();

        $query = "SELECT MAX(SEQ) AS LAST FROM GUI_SITE_JOURNAL WHERE GEN_DATE > SYSDATE - 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $last_sequence = $row['LAST'];
        if (isset($_SESSION["ALARM_LAST_SEQUENCE"])) {
            $prev_sequence = $_SESSION["ALARM_LAST_SEQUENCE"];
        } else {
            $prev_sequence = $last_sequence;
        }
        $_SESSION["ALARM_LAST_SEQUENCE"] = $last_sequence;
        
        if ($prev_sequence != $last_sequence) {
            $lang = Utilities::getCurrLang();
            $query = "SELECT * FROM GUI_SITE_JOURNAL 
                WHERE SEQ > :prev_sequence AND MSG_EVENT = 'ALARM' AND REGION_CODE = :lang
                ORDER BY GEN_DATE ASC";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':prev_sequence', $prev_sequence);
            oci_bind_by_name($stmt, ':lang', $lang);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return;
            }

            Utilities::retrieve($alarms, $this, $stmt, $method=__FUNCTION__);
        }

        $feature_array['alarms'] = $alarms;
        $result = array();
        $result["records"] = $feature_array;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
}
