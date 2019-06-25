<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class CustomerCategory
{
    // database connection and table name
    private $conn;

    public $category_code;
    public $category_name;

    public $desc = "customer category";

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    public function read()
    {
        $query = "
            SELECT
                CATEG_CODE CATEGORY_CODE,
                CATEG_DESCRIPT CATEGORY_NAME,
                NVL(CU.CATEG_COUNT, 0) CATEGORY_COUNT
            FROM
                CST_PRCE_CATEGOR CG,
                (
                SELECT CUST_CATEGORY, COUNT(*) CATEG_COUNT
                FROM CUSTOMER
                GROUP BY CUST_CATEGORY
                ) CU
            WHERE
                CG.CATEG_CODE = CU.CUST_CATEGORY(+)";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // pure php function
    public function create()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "INSERT INTO CST_PRCE_CATEGOR
                (CATEG_CODE,
                CATEG_DESCRIPT)
        VALUES (:categ_code,
                :categ_descript)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        oci_bind_by_name($stmt, ':categ_descript', $this->category_name);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "customer catetory";
        $jnl_data[2] = $this->category_code;

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

    public function update()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            SELECT CATEG_CODE CATEGORY_CODE,
                CATEG_DESCRIPT CATEGORY_NAME
            FROM CST_PRCE_CATEGOR
            WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // write_log(json_encode($row), __FILE__, __LINE__);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "UPDATE CST_PRCE_CATEGOR
                SET CATEG_DESCRIPT = :categ_descript
                WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        oci_bind_by_name($stmt, ':categ_descript', $this->category_name);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "customer category";
        $jnl_data[2] = $this->category_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "customer category";
        $record = sprintf("code:%s", $this->category_code);
        foreach ($this as $key => $value) {
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
                !$journal->valueChange(
                    $module, $record, $key, $row[strtoupper($key)], $value)) {
                return false;
            }
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        write_log(
            sprintf("%s::%s START. categ_code:%s", __CLASS__, __FUNCTION__, $this->category_code),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "DELETE FROM CST_PRCE_CATEGOR
                WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "customer category";
        $jnl_data[2] = $this->category_code;

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
