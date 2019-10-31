<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class PersonnelOnsite extends CommonClass
{
    protected $TABLE_NAME = 'REPORT_CMPY';

    public function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT PER_CODE, PER_NAME ,CMPY_NAME, AREA_K, AREA_NAME, PERL_ENTER_TIME
            FROM GUI_PERSONNEL, AREA_RC
            WHERE PER_CODE = PERL_PSN AND PERL_ARA <> 9999 AND PERL_ARA = AREA_K
            ORDER BY PER_CODE";
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
