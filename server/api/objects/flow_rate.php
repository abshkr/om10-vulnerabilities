<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';

class FlowRate
{
    // database connection and table name
    private $conn;
    public $desc = "flow rate";

    //All the fields that should be a number in JSON
    public $NUMBER_FIELDS = array(
        "FLOW_CONTRIBUTION",
        "CURRENT_FLOW_RATE",
        "PRESET",
        "LOADED_QTY",
    );

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    public function read()
    {
        $query = "
            SELECT FLOW_RATES.TANK_CODE,
                BAD_PHYSCODE,
                BAA_CODE,
                BAM_CODE,
                FLOWING,
                HIGH_FLOW_STATE,
                NVL(FLOW_CONTRIBUTION, 0) FLOW_CONTRIBUTION,
                NVL(CURRENT_FLOW_RATE, 0) CURRENT_FLOW_RATE,
                NVL(PRESET, 0) PRESET,
                NVL(LOADED_QTY, 0) LOADED_QTY,
                BASE_CODE, BASE_NAME
            FROM FLOW_RATES, TANKS, BASE_PRODS
            WHERE FLOW_RATES.TANK_CODE = TANKS.TANK_CODE AND TANK_BASE = BASE_CODE
            ORDER BY FLOW_RATES.TANK_CODE, BAA_CODE, BAM_CODE";

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

        $query = "INSERT INTO FLOW_RATES (
                TANK_CODE,
                BAD_PHYSCODE,
                BAA_CODE,
                BAM_CODE,
                FLOWING,
                HIGH_FLOW_STATE,
                FLOW_CONTRIBUTION,
                CURRENT_FLOW_RATE,
                PRESET,
                LOADED_QTY)
            VALUES (
                :tank_code,
                :bad_physcode,
                :baa_code,
                :bam_code,
                :flowing,
                :high_flow_state,
                :flow_contribution,
                :current_flow_rate,
                :preset,
                :loaded_qty
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        oci_bind_by_name($stmt, ':bad_physcode', $this->bad_physcode);
        oci_bind_by_name($stmt, ':baa_code', $this->baa_code);
        oci_bind_by_name($stmt, ':bam_code', $this->bam_code);
        oci_bind_by_name($stmt, ':flowing', $this->flowing);
        oci_bind_by_name($stmt, ':high_flow_state', $this->high_flow_state);
        oci_bind_by_name($stmt, ':flow_contribution', $this->flow_contribution);
        oci_bind_by_name($stmt, ':current_flow_rate', $this->current_flow_rate);
        oci_bind_by_name($stmt, ':preset', $this->preset);
        oci_bind_by_name($stmt, ':loaded_qty', $this->loaded_qty);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "flow rate";
        $jnl_data[2] = $this->bam_code;

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

        $query = "DELETE FROM FLOW_RATES
            WHERE BAM_CODE = :bam_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':bam_code', $this->bam_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "flow rate";
        $jnl_data[2] = $this->bam_code;

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
        FROM FLOW_RATES
        WHERE BAM_CODE = :bam_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':bam_code', $this->bam_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // write_log(json_encode($row), __FILE__, __LINE__);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "UPDATE FLOW_RATES
            SET TANK_CODE = :tank_code,
                BAD_PHYSCODE = :bad_physcode,
                BAA_CODE = :baa_code,
                FLOWING = :flowing,
                HIGH_FLOW_STATE = :high_flow_state,
                FLOW_CONTRIBUTION = :flow_contribution,
                CURRENT_FLOW_RATE = :current_flow_rate,
                PRESET = :preset,
                LOADED_QTY = :loaded_qty
            WHERE BAM_CODE = :bam_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        oci_bind_by_name($stmt, ':bad_physcode', $this->bad_physcode);
        oci_bind_by_name($stmt, ':baa_code', $this->baa_code);
        oci_bind_by_name($stmt, ':bam_code', $this->bam_code);
        oci_bind_by_name($stmt, ':flowing', $this->flowing);
        oci_bind_by_name($stmt, ':high_flow_state', $this->high_flow_state);
        oci_bind_by_name($stmt, ':flow_contribution', $this->flow_contribution);
        oci_bind_by_name($stmt, ':current_flow_rate', $this->current_flow_rate);
        oci_bind_by_name($stmt, ':preset', $this->preset);
        oci_bind_by_name($stmt, ':loaded_qty', $this->loaded_qty);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "flow rate";
        $jnl_data[2] = $this->bam_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "Flow Rate";
        $record = sprintf("meter code:%s", $this->bam_code);
        foreach ($this as $key => $value) {
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
