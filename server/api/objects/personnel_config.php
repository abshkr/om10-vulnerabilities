<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class PersonnelConfig extends CommonClass
{
    protected $TABLE_NAME = 'PERSONNEL_CONFIG';
    
    public function read()
    {
        if (!isset($this->per_code)) {
            $this->per_code = Utilities::getCurrPsn();
            // write_log($this->per_code, __FILE__, __LINE__);
        }
        $query = "SELECT *
            FROM PERSONNEL_CONFIG
            WHERE PER_CODE = :per_code
            ORDER BY CONFIG_KEY";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        } else {
            return $stmt;
        }
    }

    public function pre_update()
    {
        if (!isset($this->per_code)) {
            $this->per_code = Utilities::getCurrPsn();
        }

        $query = "SELECT COUNT(*) CN
            FROM PERSONNEL_CONFIG
            WHERE PER_CODE = :per_code AND CONFIG_KEY = :config_key
            ORDER BY CONFIG_KEY";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':config_key', $this->config_key);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } 

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] <= 0) {
            $query = "INSERT INTO PERSONNEL_CONFIG (PER_CODE, CONFIG_KEY, CONFIG_VAL_LAST_CHG)
                VALUES (:per_code, :config_key, SYSDATE)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':per_code', $this->per_code);
            oci_bind_by_name($stmt, ':config_key', $this->config_key);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }
    }

    public function update()
    {
        $query = "UPDATE PERSONNEL_CONFIG
            SET CONFIG_VALUE = :config_value,
                CONFIG_VAL_LAST_CHG = SYSDATE
            WHERE PER_CODE = :per_code AND CONFIG_KEY = :config_key";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':config_key', $this->config_key);
        oci_bind_by_name($stmt, ':config_value', $this->config_value);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        
        return true;
    }
}
