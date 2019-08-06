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

    public function create()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "INSERT INTO PRNTR_CMPY_USAGE (
            CMPY,
            USAGE,
            PRNTR)
            VALUES (
            :prt_cmpy,
            :prt_usage,
            :prt_printer
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        oci_bind_by_name($stmt, ':prt_printer', $this->prt_printer);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "logicl printer";
        $jnl_data[2] = sprintf("[cmpy:%s, usage:%s, printer:%s]",
            $this->prt_cmpy, $this->prt_usage, $this->prt_printer);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        $query = "DELETE FROM PRNTR_CMPY_USAGE
            WHERE CMPY = :prt_cmpy
                AND USAGE = :prt_usage
                AND PRNTR = :prt_printer";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        oci_bind_by_name($stmt, ':prt_printer', $this->prt_printer);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "customer category";
        $jnl_data[1] = "logicl printer";
        $jnl_data[2] = sprintf("[cmpy:%s, usage:%s, printer:%s]",
            $this->prt_cmpy, $this->prt_usage, $this->prt_printer);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);

        return true;
    }

}
