<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Hazchem extends CommonClass
{
    protected $TABLE_NAME = 'HAZCHEM';
    protected $primary_keys = array("hzcf_id");

    public function read()
    {
        $query = "
            SELECT *
            FROM HAZCHEM
            ORDER BY HZCF_ID";
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
