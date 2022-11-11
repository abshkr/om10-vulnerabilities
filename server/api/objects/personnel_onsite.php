<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class PersonnelOnsite extends CommonClass
{
    protected $TABLE_NAME = 'PERS_IN_AREA';

    public function read()
    {
        $query = "
            SELECT PER_CODE, PER_NAME ,CMPY_NAME, AREA_K, AREA_NAME, PERL_ENTER_TIME, PERL_PSN
            FROM GUI_PERSONNEL, AREA_RC
            WHERE PER_CODE = PERL_PSN AND PERL_ARA = AREA_K(+)
            ORDER BY PERL_ARA";
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
