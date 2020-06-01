<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

//Old PHP: amfservices\core\services\AllocationPeriodService.php
class AllocationPeriod extends CommonClass
{
    protected $TABLE_NAME = 'ALL_CHILD';
    protected $VIEW_NAME = 'GUI_ALLOCATION_PERIODS';
    protected $view_keys = array("aiprd_type", "aiprd_cmpycode", "aiprd_prodcode", "aiprd_suppcode", "aiprd_index");
    
    protected $table_view_map = array(
        "ALCH_ALP_ALL_ATKY_AT_TYPE" => "AIPRD_TYPE",
        "ALCH_ALP_ALL_ATKY_AT_CMPY" => "AIPRD_CMPYCODE",
        "ALCH_ALP_ALL_PROD_PRODCODE" => "AIPRD_PRODCODE",
        "ALCH_ALP_ALL_PROD_PRODCMPY" => "AIPRD_SUPPCODE",
        "ALL_CHILD_P_NO" => "AIPRD_INDEX",
        "ALL_CH_STRT_DAY" => "AIPRD_DAYSTART",
        "ALL_CH_END_DAY" => "AIPRD_DAYEND",
        "ALL_CH_UNIT" => "AIPRD_PRODUNIT",
        "ALL_CH_QTY" => "AIPRD_QTYLIMIT",
    );

    public $NUMBER_FIELDS = array(
        "AIPRD_QTYLIMIT",
    );

    public function read()
    {
        $query = "
            SELECT *
            FROM " . $this->VIEW_NAME . "
            WHERE AIPRD_TYPE = :aiprd_type
                AND AIPRD_CMPYCODE = :aiprd_cmpycode
                AND AIPRD_PRODCODE = :aiprd_prodcode
                AND AIPRD_SUPPCODE = :aiprd_suppcode
            ORDER BY AIPRD_TYPE, AIPRD_CMPYCODE, AIPRD_PRODCODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':aiprd_type', $this->aiprd_type);
        oci_bind_by_name($stmt, ':aiprd_cmpycode', $this->aiprd_cmpycode);
        oci_bind_by_name($stmt, ':aiprd_prodcode', $this->aiprd_prodcode);
        oci_bind_by_name($stmt, ':aiprd_suppcode', $this->aiprd_suppcode);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    
}
