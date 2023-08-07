<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CurSession extends CommonClass
{
    protected $VIEW_NAME = 'DUMMY';
    protected $TABLE_NAME = "DUMMY";
    
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

        $start_time = null;
        $retrieve = false;
        if (!isset($_SESSION["ALARM_START_DATETIME"])) {
            $query = "SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') AS LAST FROM DUAL";
            $stmt = oci_parse($this->conn, $query);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $start_time = $row['LAST'];
            $_SESSION["ALARM_START_DATETIME"] = $start_time;
        } else {
            $start_time = $_SESSION["ALARM_START_DATETIME"];
        }
        
        $lang = Utilities::getCurrLang();
        $query = "SELECT * FROM GUI_SITE_JOURNAL 
            WHERE GEN_DATE > TO_DATE(:prev_sequence, 'YYYY-MM-DD HH24:MI:SS') AND MSG_EVENT = 'ALARM' AND REGION_CODE = :lang
            ORDER BY GEN_DATE ASC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prev_sequence', $start_time);
        oci_bind_by_name($stmt, ':lang', $lang);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($alarms, $this, $stmt, $method=__FUNCTION__);   
        
        $feature_array['alarms'] = $alarms;
        $feature_array['last_sequence'] = $start_time;
        $result = array();
        $result["records"] = $feature_array;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function killSessions()
    {
        // write_log(json_encode($this), __FILE__, __LINE__);

        if (!isset($this->sess_id) || !isset($this->per_code)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query = "DELETE FROM HTTP_SESSION_TRACE
            WHERE SESS_ID != :sess_id AND PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':sess_id', $this->sess_id);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__SESSIONS_KILL_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $error = new EchoSchema(200, response("__SESSIONS_KILLED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
        return;
    }
}
