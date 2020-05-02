<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CorrectionMethod extends CommonClass
{
    protected $TABLE_NAME = 'COMPENSATION_MTHD';

    //Because base cannot be too many, do not do limit
    public function read()
    {
        $query = "
            SELECT COMPENSATION_ID,
                COMPENSATION_NAME
            FROM COMPENSATION_MTHD
            ORDER BY COMPENSATION_ID";
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
