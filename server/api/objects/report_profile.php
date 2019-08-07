<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class ReportProfile extends CommonClass
{
    protected $TABLE_NAME = 'REPORT_FILES';
    protected $VIEW_NAME = 'GUI_REPORT_PROFILE';
    public $desc = "report configuration";
    protected $primary_keys = array("rpt_file");
    protected $view_keys = array("report_file");
    protected $table_view_map = array(
        "RPT_NAME" => "REPORT_NAME",
        "RPT_FILE" => "REPORT_FILE",
        "FREQUENCY" => "REPORT_TYPE",
        "DESCRIPTION" => "REPORT_DESC",
        "JASPER_FILE" => "REPORT_JASPER_FILE",
        "ONDEMAND_TITLE" => "REPORT_ONDEMAND_TITLE",
    );
    public $NUMBER_FIELDS = array(
        "REPORT_ONDEMAND_FLAG",
        "REPORT_CLOSEOUT_FLAG",
    );

    public function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . " ORDER BY REPORT_NAME";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_decorate(&$result_array)
    {
        $dir = $_SERVER['OMEGA_HOME'] . '/bin/jasper';
        $files = scandir($dir);

        $jasper_files = array();
        foreach ($files as $name) {
            if (strpos($name, '.jasper') === false) {
                continue;
            }
            $jasper_files[] = $name;
        }

        foreach ($result_array as $key => $value) {
            // write_log($value['report_file'], __FILE__, __LINE__);
            if (in_array($value['report_jasper_file'], $jasper_files)) {
                $result_array[$key]['source_exists'] = true;
            } else {
                $result_array[$key]['source_exists'] = false;
            }
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
