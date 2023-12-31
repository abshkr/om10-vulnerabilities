<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class DangerousGoods extends CommonClass
{
    protected $TABLE_NAME = 'DANGEROUS_GOODS';
    
    public function read()
    {
        $query = "SELECT * FROM DANGEROUS_GOODS ORDER BY MATERIAL";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_brief()
    {
        $query = "
            SELECT MATERIAL, ADR_DESC1, ADR_NAME, ADR_TYPE, MATERIAL || ' - ' || ADR_NAME ADR_DESC
            FROM DANGEROUS_GOODS 
            ORDER BY MATERIAL
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
