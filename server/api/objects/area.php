<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Area extends CommonClass
{
    protected $TABLE_NAME = 'AREA_RC';
    protected $primary_keys = array("area_k");

    public function read()
    {
        $query = "
            SELECT AREA_K,
                AREA_NAME
            FROM AREA_RC
            ORDER BY AREA_K";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
