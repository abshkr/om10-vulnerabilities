<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class LogicalPrinter
{
    // database connection and table name
    private $conn;

    public $prt_cmpy;
    public $prt_cmpy_name;
    public $prt_usage;
    public $prt_usage_name;
    public $prt_printer;
    public $sys_printer;
    public $prt_area;
    public $area_name;

    public $desc = "logical printer";

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->prt_cmpy = '%';
        $this->prt_usage = '%';
        $this->prt_printer = '%';
        $this->prt_area = '%';
    }

    // read personnel
    public function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT
                DECODE(PCU.CMPY, NULL, 'ANY', PCU.CMPY) AS PRT_CMPY,
                DECODE(CMP.CMPY_NAME, NULL, 'ALL', CMP.CMPY_NAME) AS PRT_CMPY_NAME,
                PCU.USAGE AS PRT_USAGE,
                B.MESSAGE AS PRT_USAGE_NAME,
                PCU.PRNTR AS PRT_PRINTER,
                P.SYS_PRNTR AS SYS_PRINTER,
                P.PRNTR_AREA AS PRT_AREA,
                AR.AREA_NAME AS AREA_NAME
            FROM
                PRNTR_CMPY_USAGE PCU,
                COMPANYS CMP,
                ENUMITEM A,
                MSG_LOOKUP B,
                PRINTER P,
                AREA_RC AR
            WHERE
                ((SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' AND PCU.CMPY = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
                    OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
                    OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
                    OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL
                )
                AND CMP.CMPY_CODE (+)  = PCU.CMPY
                AND B.MSG_ID = A.ENUM_TMM
                AND ( B.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND B.LANG_ID = 'ENG') )
                AND A.ENUM_NO = PCU.USAGE
                AND A.ENUMTYPENAME = 'PRN_USE'
                AND P.PRNTR = PCU.PRNTR
                AND P.PRNTR_AREA = AR.AREA_K(+)
                AND PCU.CMPY LIKE :prt_cmpy
                AND TO_CHAR(PCU.USAGE) LIKE :prt_usage
                AND TO_CHAR(PCU.PRNTR) LIKE :prt_printer
                AND TO_CHAR(P.PRNTR_AREA) LIKE :prt_area
            ORDER BY PCU.CMPY, PCU.USAGE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        oci_bind_by_name($stmt, ':prt_printer', $this->prt_printer);
        oci_bind_by_name($stmt, ':prt_area', $this->prt_area);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "logicl printer";
        $jnl_data[2] = sprintf("[cmpy:%s, usage:%s, printer:%s]",
            $this->prt_cmpy, $this->prt_usage, $this->prt_printer);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);

        return true;
    }

    public function update()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);
        Utilities::sanitize($this);

        $query = "
            SELECT PRNTR
            FROM PRNTR_CMPY_USAGE
            WHERE CMPY = :prt_cmpy AND USAGE = :prt_usage";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // write_log(json_encode($row), __FILE__, __LINE__);
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "UPDATE PRNTR_CMPY_USAGE
            SET PRNTR = :prt_printer
            WHERE CMPY = :prt_cmpy AND USAGE = :prt_usage";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        oci_bind_by_name($stmt, ':prt_printer', $this->prt_printer);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "logicl printer";
        $jnl_data[2] = sprintf("[cmpy:%s, usage:%s, printer:%s]",
            $this->prt_cmpy, $this->prt_usage, $this->prt_printer);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "logical printer";
        $record = sprintf("cmpy:%s, usage:%s",
            $this->prt_cmpy, $this->prt_usage);
        if ($row['PRNTR'] != $this->prt_printer &&
            !$journal->valueChange(
                $module, $record, "printer", $row['PRNTR'], $this->prt_printer)) {
            return false;
        }

        return true;
    }
}
