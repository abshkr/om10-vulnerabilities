<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class ReportProfile extends CommonClass
{
    // public $check_exists = false; //Do not check existence when creating

    protected $TABLE_NAME = 'REPORT_FILES';
    protected $VIEW_NAME = 'GUI_REPORT_PROFILE';
    public $desc = "report profile";
    protected $primary_keys = array("rpt_file");
    protected $view_keys = array("report_file");
    protected $table_view_map = array(
        "RPT_NAME" => "REPORT_NAME",
        "RPT_FILE" => "REPORT_FILE",
        "FREQUENCY" => "REPORT_TYPE",
        "DESCRIPTION" => "REPORT_DESC",
        "JASPER_FILE" => "REPORT_JASPER_FILE",
        "ONDEMAND_TITLE" => "REPORT_ONDEMAND_TITLE",
        "IS_CLOSEOUT_REPORT" => "REPORT_CLOSEOUT_FLAG2",
        "LANG_ID" => "REPORT_LANG",
    );
    public $NUMBER_FIELDS = array(
        "REPORT_ONDEMAND_FLAG",
        "REPORT_CLOSEOUT_FLAG",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "REPORT_CLOSEOUT_FLAG2" => 1,
        "REPORT_ONDEMAND_FLAG" => 1,
        "REPORT_CLOSEOUT_FLAG" => 1,
        "REPORT_ADDITIVE_FLAG" => 1
    );
    
    public function read()
    {
        $query = "
            SELECT * FROM " . $this->VIEW_NAME . " ORDER BY REPORT_NAME";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function jasper_files()
    {
        $result = array();
        $result["records"] = array();

        $dir = $_SERVER['OMEGA_HOME'] . '/bin/jasper';
        $files = scandir($dir);

        $jasper_files = array();
        $num = 0;
        foreach ($files as $name) {
            if (!(substr($name, -7) === '.jasper')) {
                continue;
            }
            $num += 1;
            array_push($result["records"], $name);
        }

        http_response_code(200);
        if ($num > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = "No record found.";
            echo json_encode($result, JSON_PRETTY_PRINT);
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

    protected function post_create()
    {
        return $this->post_update();
    }

    public function post_update()
    {
        $ondemand_flag = 0;
        if (isset($this->report_ondemand_flag) && $this->report_ondemand_flag == 1) {
            $ondemand_flag |= 1;
        }

        if (isset($this->report_closeout_flag) && $this->report_closeout_flag == 1) {
            $ondemand_flag |= 1 << 1;
        }

        $query = "
            UPDATE " . $this->TABLE_NAME . " SET ONDEMAND_FLAG = :ondemand_flag
            WHERE RPT_FILE = :rpt_file";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ondemand_flag', $ondemand_flag);
        oci_bind_by_name($stmt, ':rpt_file', $this->rpt_file);
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    }

    public function pre_create()
    {
        if (!isset($this->rpt_file)) {
            $this->rpt_file = substr($this->report_jasper_file, 0, -7) . '_' . $this->report_type . ".jrxml";
        }
        if (!isset($this->lang_id)) {
            $this->lang_id = 'ENG';
        }

        if (!isset($this->ondemand_title)) {
            $this->ondemand_title = $this->report_name;
        }
    }
}
