<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class PhysicalPrinter
{
    // database connection and table name
    private $conn;

    public $prntr;
    public $sys_prntr;
    public $prntr_lock;
    public $prntr_area;
    public $area_name;

    public $desc = "physical printer";

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->prntr = '%';
        $this->sys_prntr = '%';
        $this->prntr_area = '%';
    }

    // read personnel
    public function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT
                P.PRNTR
                , P.SYS_PRNTR
                , NVL(P.PRNTR_LOCK, 'N') AS PRNTR_LOCK
                , NVL(P.PRNTR_AREA, '') AS PRNTR_AREA
                , A.AREA_NAME
            FROM
                PRINTER P
                , AREA_RC A
            WHERE
                P.PRNTR_AREA = A.AREA_K(+)
                AND TO_CHAR(P.PRNTR) LIKE :prntr
                AND TO_CHAR(P.SYS_PRNTR) LIKE :sys_prntr
                AND TO_CHAR(P.PRNTR_AREA) LIKE :prntr_area
            ORDER BY P.PRNTR";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        oci_bind_by_name($stmt, ':sys_prntr', $this->sys_prntr);
        oci_bind_by_name($stmt, ':prntr_area', $this->prntr_area);
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

        $query = "INSERT INTO PRINTER (
            PRNTR,
            SYS_PRNTR,
            PRNTR_LOCK,
            PRNTR_AREA)
            VALUES (
            :prntr,
            :sys_prntr,
            :prntr_lock,
            :prntr_area
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        oci_bind_by_name($stmt, ':sys_prntr', $this->sys_prntr);
        oci_bind_by_name($stmt, ':prntr_lock', $this->prntr_lock);
        oci_bind_by_name($stmt, ':prntr_area', $this->prntr_area);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "physical printer";
        $jnl_data[2] = $this->prntr;

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

        Utilities::sanitize($this);

        $query = "DELETE FROM PRINTER
            WHERE PRNTR = :prntr
                AND SYS_PRNTR = :sys_prntr
                AND PRNTR_LOCK = :prntr_lock
                AND PRNTR_AREA = :prntr_area";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        oci_bind_by_name($stmt, ':sys_prntr', $this->sys_prntr);
        oci_bind_by_name($stmt, ':prntr_lock', $this->prntr_lock);
        oci_bind_by_name($stmt, ':prntr_area', $this->prntr_area);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "physical printer";
        $jnl_data[2] = $this->prntr;

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

    public function update()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            SELECT
                P.PRNTR
                , P.SYS_PRNTR
                , NVL(P.PRNTR_LOCK, 'N') AS PRNTR_LOCK
                , NVL(P.PRNTR_AREA, '') AS PRNTR_AREA
                , A.AREA_NAME
            FROM
                PRINTER P
                , AREA_RC A
            WHERE
                PRNTR = :prntr
                AND P.PRNTR_AREA = A.AREA_K(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // write_log(json_encode($row), __FILE__, __LINE__);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "UPDATE PRINTER
            SET SYS_PRNTR = :sys_prntr,
                PRNTR_LOCK = :prntr_lock,
                PRNTR_AREA = :prntr_area
            WHERE PRNTR = :prntr";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        oci_bind_by_name($stmt, ':sys_prntr', $this->sys_prntr);
        oci_bind_by_name($stmt, ':prntr_lock', $this->prntr_lock);
        oci_bind_by_name($stmt, ':prntr_area', $this->prntr_area);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "phycial printer";
        $jnl_data[2] = $this->prntr;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "PRINTER";
        $record = sprintf("logical printer:%s", $this->prntr);
        foreach ($this as $key => $value) {
            if ($key === 'prntr_area') {
                continue;
            }

            // write_log($key, __FILE__, __LINE__);
            // write_log($value, __FILE__, __LINE__);
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
                !$journal->valueChange(
                    $module, $record, $key, $row[strtoupper($key)], $value)) {
                return false;
            }
        }

        oci_commit($this->conn);

        return true;
    }
}
