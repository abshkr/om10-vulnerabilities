<?php

include_once 'common_class.php';

//Old PHP: LoadSchedules.class.php
class DorHistory extends CommonClass
{
    protected $TABLE_NAME = 'DOR_HISTORY';
    protected $VIEW_NAME = 'DOR_HISTORY';
    // protected $primary_keys = array("area_k");

    // protected $view_keys = array('trip_no', 'supplier', 'cmpt_no');

    // protected $table_view_map = array(
    //     "DH_SHLSTRIP" => "TRIP_NO",
    //     "DH_SHLSSUPP" => "SUPPLIER",
    //     "DH_SHLSCMPT" => "CMPT_NO"
    // );

    public function types()
    {
        $query = "SELECT 'STK' TYPE FROM DUAL
            UNION SELECT 'CSH' TYPE FROM DUAL
            UNION SELECT 'STL' TYPE FROM DUAL
            UNION SELECT 'ICW' TYPE FROM DUAL
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

    public function read()
    {
        $query = "SELECT 
                SD.SCHDSPEC_SHLSTRIP DH_SHLSTRIP,
                SD.SCHDSPEC_SHLSSUPP DH_SHLSSUPP,
                CM.CMPY_NAME DH_SUPP_NAME,
                SD.SCHD_COMP_ID DH_SHLSCMPT,
                SD.SCHD_HOST_DATA DH_DOR_ORIGIN,
                DH.DH_DOR_TYPE,
                DH.DH_DOR_NUMBER,
                DH.DH_CHG_DATE,
                DH.DH_PER_CODE,
                DH.DH_PER_NAME
            FROM 
                DOR_HISTORY DH,
                SPECDETS SD,
                COMPANYS CM
            WHERE SCHDSPEC_SHLSTRIP = :trip_no
                AND SCHDSPEC_SHLSSUPP = :supplier
                AND SD.SCHDSPEC_SHLSTRIP = DH.DH_SHLSTRIP(+)
                AND SD.SCHDSPEC_SHLSSUPP = DH.DH_SHLSSUPP(+)
                AND SD.SCHD_COMP_ID = DH.DH_SHLSCMPT(+)
                AND SD.SCHDSPEC_SHLSSUPP = CM.CMPY_CODE(+)
            ORDER BY SCHD_COMP_ID";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}