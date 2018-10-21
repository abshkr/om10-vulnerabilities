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
            SELECT CMPY_CODE, 
                CMPY_NAME                    
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 1)) <> 0
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
        $keyword = htmlspecialchars(strip_tags($cmpy_code));
        oci_bind_by_name($stmt, ':cmpy_code', $cmpy_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

}
