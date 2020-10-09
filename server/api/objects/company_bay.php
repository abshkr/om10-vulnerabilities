<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

//Old php: dmMovmentCompanyBay.php
class CompanyBay extends CommonClass
{
    protected $TABLE_NAME = 'BA_CMPY_LNK';
    protected $VIEW_NAME = 'BA_CMPY_LNK';

    public $NUMBER_FIELDS = array(
        "BACL_BAY_TYPE",
    );

    public function read()
    {
        $query = "
            SELECT BACL_BAY_CODE,
                BACL_CMPY_CODE,
                CMPY_NAME,
                BACL_BAY_TYPE,
                BAY_LOAD_TYPE_NAME as BACL_BAY_TYPE_NAME
            FROM BA_CMPY_LNK, COMPANYS, BAY_LOAD_TYPES
            WHERE BACL_CMPY_CODE = CMPY_CODE AND BACL_BAY_TYPE = BAY_LOAD_TYPE_ID
            ORDER BY BACL_CMPY_CODE, BACL_BAY_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function bays()
    {
        $query = "SELECT BA_CODE 
            FROM BAY_AREA
            WHERE BA_CODE != 'BAY999'
            ORDER BY BA_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    public function bay_types()
    {
        $query = "
            SELECT 
                BAY_LOAD_TYPE_ID  as BACL_BAY_TYPE, 
                BAY_LOAD_TYPE_NAME as BACL_BAY_TYPE_NAME 
            FROM BAY_LOAD_TYPES
            ORDER BY BAY_LOAD_TYPE_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}