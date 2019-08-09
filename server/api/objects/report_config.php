<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class ReportConfig extends CommonClass
{
    protected $TABLE_NAME = 'REPORT_CMPY';
    protected $VIEW_NAME = 'GUI_REPORT_COMPANY';
    public $desc = "report configuration";
    protected $primary_keys = array("rpt_cmpy", "rpt_file");
    protected $view_keys = array("report_cmpycode", "report_file");
    protected $table_view_map = array(
        "RPT_CMPY" => "REPORT_CMPYCODE",
        "RPT_FILE" => "REPORT_FILE",
        "RPT_ENABLED" => "REPORT_ENABLED",
        "RPT_ACTIVE" => "REPORT_ACTIVE",
        "RPT_CANPRINT" => "REPORT_CANPRINT",
        "RPT_CANEMAIL" => "REPORT_CANEMAIL",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "REPORT_CLOSEOUT_FLAG2" => 1,
        "REPORT_ONDEMAND_FLAG" => 1,
        "REPORT_CLOSEOUT_FLAG" => 1,
        "REPORT_ENABLED" => "Y",
        "REPORT_ACTIVE" => "Y",
        "REPORT_CANPRINT" => "Y",
        "REPORT_CANEMAIL" => "Y",
    );

    public function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . " ORDER BY REPORT_CMPYCODE, REPORT_FILE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function copmanys()
    {
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM COMPANYS
            ORDER BY DECODE(CMPY_CODE, 'ANY', 0, 1), CMPY_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function reports()
    {
        $query = "
            SELECT * FROM GUI_REPORT_PROFILE ORDER BY REPORT_NAME";
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
