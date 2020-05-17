<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class LinuxServer extends CommonClass
{
    protected $VIEW_NAME = 'DUMMY';
    
    public function server_date()
    {
        $feature_array = array();

        $feature_array['time_zone'] = preg_replace("/\r|\n/", "", shell_exec("date +'%:z'")); 
        $feature_array['date'] = preg_replace("/\r|\n/", "", shell_exec("date +'%F %H:%M:%S'"));

        if (!isset($this->per_code)) {
            $this->per_code = Utilities::getCurrPsn();
        }
        $query = "SELECT NVL(MAX(CONFIG_VALUE), 'DD/MM/YYYY HH:mm:ss') DATE_FORMAT
            FROM PERSONNEL_CONFIG
            WHERE PER_CODE = :per_code AND CONFIG_KEY = 'USER_TIME_FORMAT'";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        } else {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $feature_array['customer_dateformat'] = $row['DATE_FORMAT'];
        }


        $result = array();
        $result["records"] = $feature_array;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
}
