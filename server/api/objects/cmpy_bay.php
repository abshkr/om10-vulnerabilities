<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CompanyBay extends CommonClass
{
    protected $TABLE_NAME = 'BA_METERS';
    protected $VIEW_NAME = 'BA_METERS';

    public $NUMBER_FIELDS = array(
        "BACL_BAY_TYPE",
    );

    public function read()
    {
        $query = "
        SELECT BACL_BAY_CODE,
            BACL_CMPY_CODE,
            CMPY_NAME,
            BACL_BAY_TYPE,
            DECODE(BACL_BAY_TYPE, 0, 'Tranditional Loading', 1, 'Nomination Movement', 'Tranditional Loading') BACL_BAY_TYPE_NAME
        FROM BA_CMPY_LNK, COMPANYS
        WHERE BACL_CMPY_CODE = CMPY_CODE
        ORDER BY BACL_CMPY_CODE, BACL_BAY_CODE";
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