<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';

class TankMaxFlow
{
    // database connection and table name
    private $conn;
    public $desc = "tank max flow";

    public $NUMBER_FIELDS = array('FLOW_RATE');

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    public function read()
    {
        $query = "
            SELECT *
            FROM TANK_MAX_FLOW ";
        if (isset($this->tank_code)) {
            $query .= "WHERE tank_code = :tank_code ";
        }
        $query .= "ORDER BY TANK_CODE, TANK_LEVEL";

        $stmt = oci_parse($this->conn, $query);
        if (isset($this->tank_code)) {
            oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        }
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

        $this->id = 0;

        $query = "
        SELECT SEQ_TANK_MAX_FLOW_ID.NEXTVAL ID
        FROM DUAL";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->id = $row['ID'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "INSERT INTO TANK_MAX_FLOW (
                ID,
                TANK_CODE,
                TANK_LEVEL,
                FLOW_RATE)
            VALUES (
                :id,
                :tank_code,
                :tank_level,
                :flow_rate
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':id', $this->id);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        oci_bind_by_name($stmt, ':tank_level', $this->tank_level);
        oci_bind_by_name($stmt, ':flow_rate', $this->flow_rate);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "tank max flow";
        $jnl_data[2] = sprintf("id:%d, tank:%s, level:%d", $this->id, $this->tank_code, $this->tank_level);

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

        Utilities::sanitize($this);

        $query = "DELETE FROM TANK_MAX_FLOW
            WHERE ID = :id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':id', $this->id);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "tank max flow";
        // $jnl_data[2] = sprintf("id:%d, tank:%s, level:%d", $this->id, $this->tank_code, $this->tank_level);
        $jnl_data[2] = $this->id;

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

        Utilities::sanitize($this);

        $query = "
        SELECT *
        FROM TANK_MAX_FLOW
        WHERE ID = :id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':id', $this->id);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // write_log(json_encode($row), __FILE__, __LINE__);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "UPDATE TANK_MAX_FLOW
            SET TANK_CODE = :tank_code,
                TANK_LEVEL = :tank_level,
                FLOW_RATE = :flow_rate
            WHERE ID = :id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        oci_bind_by_name($stmt, ':tank_level', $this->tank_level);
        oci_bind_by_name($stmt, ':flow_rate', $this->flow_rate);
        oci_bind_by_name($stmt, ':id', $this->id);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "tank max flow";
        $jnl_data[2] = $this->id;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "Tank Max Flow";
        $record = sprintf("id:%d", $this->id);
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
}
