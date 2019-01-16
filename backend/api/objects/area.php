<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';

class Area
{   
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read()
    {
        $query = "
            SELECT AREA_K,
                AREA_NAME,
                AREA_CPCTY,
                AREA_EQP_SFT_LNK 
            FROM AREA_RC";        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}   