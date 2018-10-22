<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';

class OndemandReport 
{
    // database connection and table name
    private $conn;
    // private $table_name = "GUI_PERSONNEL";
    
 
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // get all suppliers
    function suppliers()
    {
        $query = "
            SELECT DISTINCT CMPY_CODE, 
                CMPY_NAME
            FROM
                COMPANYS, REPORT_CMPY
            WHERE REPORT_CMPY.RPT_CMPY = COMPANYS.CMPY_CODE
            ORDER BY CMPY_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all drawers
    function drawers()
    {
        $query = "
            SELECT CMPY_CODE, 
                CMPY_NAME                    
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 4)) <> 0
            ORDER BY CMPY_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all carriers
    function carriers()
    {
        $query = "
            SELECT CMPY_CODE, 
                CMPY_NAME                    
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 2)) <> 0
            ORDER BY CMPY_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all customers
    function customers()
    {
        $query = "
            SELECT CMPY_CODE, 
                CMPY_NAME                    
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 3)) <> 0
            ORDER BY CMPY_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all reports of supplier
    function reports($cmpy_code)
    {
        $query = "
            SELECT ONDEMAND_TITLE, 
                REPORT_FILES.RPT_FILE,
                JASPER_FILE
            FROM REPORT_FILES, REPORT_CMPY
            WHERE REPORT_FILES.RPT_FILE = REPORT_CMPY.RPT_FILE
                AND RPT_CMPY = :cmpy_code
            ORDER BY ONDEMAND_TITLE";
        
        $stmt = oci_parse($this->conn, $query);
        $cmpy_code = htmlspecialchars(strip_tags($cmpy_code));
        oci_bind_by_name($stmt, ':cmpy_code', $cmpy_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all parameters of report
    function parameters($jasper_file)
    {
        $query = "
            SELECT DECODE(ARGUMENT_NAME, 
                'CMPY_CODE', 'SUPP_CODE',
                'SUPPLIER_CODE', 'SUPP_CODE',
                ARGUMENT_NAME) ARGUMENT_NAME,
                ARGUMENT_SEQ
            FROM REPORT_FILTER 
            WHERE JASPER_FILE = :jasper_file
            ORDER BY ARGUMENT_SEQ";
        
        $stmt = oci_parse($this->conn, $query);
        $jasper_file = htmlspecialchars(strip_tags($jasper_file));
        oci_bind_by_name($stmt, ':jasper_file', $jasper_file);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all reports of supplier
    function closeout_nrs($start_date = null, $end_date = null)
    {
        if (isset($start_date) && isset($end_date)) {
            $query = "
            SELECT CLOSEOUT_NR,
                CLOSEOUT_DATE,
                PREV_CLOSEOUT_DATE,
                DECODE(STATUS, 
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS
            FROM CLOSEOUTS
            WHERE CLOSEOUT_DATE > :start_date
                AND CLOSEOUT_DATE < :end_date
            ORDER BY CLOSEOUT_NR DESC";
            
            $stmt = oci_parse($this->conn, $query);
            $start_date = htmlspecialchars(strip_tags($start_date));
            $end_date = htmlspecialchars(strip_tags($end_date));
            oci_bind_by_name($stmt, ':start_date', $start_date);
            oci_bind_by_name($stmt, ':end_date', $end_date);         
        } else {
            $query = "
            SELECT CLOSEOUT_NR,
                CLOSEOUT_DATE,
                PREV_CLOSEOUT_DATE,
                DECODE(STATUS, 
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS
            FROM CLOSEOUTS
            ORDER BY CLOSEOUT_NR DESC";
            $stmt = oci_parse($this->conn, $query);
        }
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }
}
