<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class RefTempSpec extends CommonClass
{
    protected $TABLE_NAME = 'REF_TEMP_SPEC';
    
    //Because base cannot be too many, do not do limit
    public function read()
    {
        $query = "
            SELECT REF_TEMP_SPEC_ID,
                REF_TEMP_SPEC_NAME
            FROM REF_TEMP_SPEC
            ORDER BY REF_TEMP_SPEC_ID";
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
