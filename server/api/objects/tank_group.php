<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class TankGroup
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT * FROM GUI_TANK_GROUP ORDER BY TGR_NAME";
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
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        if (!isset($this->tank_terminal)) {
            $query = "
                SELECT TERM_CODE FROM TERMINAL";
            $stmt = oci_parse($this->conn, $query);
            if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            }
            $this->tank_terminal = $row['TERM_CODE'];
        }

        $this->tank_excl_from_pid = (isset($this->tank_excl_from_pid) && $this->tank_excl_from_pid ? 1 : 0);
        $this->tank_excl_from_pds = (isset($this->tank_excl_from_pds) && $this->tank_excl_from_pds ? 1 : 0);
        $this->tank_excl_from_special_mv = (isset($this->tank_excl_from_special_mv) && $this->tank_excl_from_special_mv ? 1 : 0);
        $this->tank_excl_from_stock_rep = (isset($this->tank_excl_from_stock_rep) && $this->tank_excl_from_stock_rep ? 1 : 0);

        $query = "
            INSERT INTO TANKS (
                TANK_CODE,
                TANK_BASE,
                TANK_DENSITY,
                TANK_TERMINAL,
                TANK_DATE,
                TANK_SBT_TY,
                TANK_NO_SBT,
                TANK_60_86_VCF,
                TANK_API,
                TANK_ADDRESS,
                TANK_POLL_GAP,
                TANK_ULLAGE,
                TANK_WATER,
                TANK_COR_VOL,
                TANK_AMB_VOL,
                TANK_TEMP,
                TANK_VERSNO,
                TANK_RES,
                TANK_PROD_LVL,
                TANK_LOCATION,
                TANK_PUMP_VOL,
                TANK_TRFS,
                TANK_RCPTS,
                TANK_TRF_VOL,
                TANK_RCPT_VOL,
                TANK_LIQUID_KG,
                TANK_VAPOUR_KG,
                TANK_ETH_CONTENT,
                TANK_LTR_CLOSE,
                TANK_LEAKDTCT_ON,
                TANK_DIPPING_ON,
                TANK_GAUGINGMTHD,
                TANK_INV_NEEDED,
                TANK_ADHOC_IVRQ,
                TANK_WATER_LVL,
                TANK_LVL_ALARM,
                TANK_PAKSCAN_ACT,
                TANK_PROD_C_OF_E,
                TANK_KG_CLOSE,
                TANK_RPTVCF,
                TANK_RPTVCFCLOSE,
                TANK_CLOSE_DENS,
                TANK_RCPT_KG,
                TANK_TRF_KG,
                TANK_SPARE_FLD1,
                TANK_SPARE_FLD2,
                TANK_INSTANCE,
                TANK_CHANNEL,
                TANK_INFLOW_RATE,
                TANK_AMB_DENSITY,
                TANK_DRV_TYPE,
                TANK_DRV_AUX,
                TANK_IDENTIFIER,
                TANK_INFLOW_OPEN,
                TANK_OUTFLOW_OPE,
                TANK_NAME,
                TANK_DAILY_TOL_PERCENT,
                TANK_DAILY_TOL_VOL,
                TANK_MONTHLY_TOL_VOL,
                TANK_MONTHLY_TOL_PERCENT,
                TANK_15_DENSITY,
                TANK_EXC_PID,
                TANK_EXC_PDS,
                TANK_EXC_SPMV,
                TANK_EXC_STCKRPT
                )
            VALUES (
                :tank_code,
                :tank_base,
                :tank_density,
                :tank_terminal,
                SYSDATE,
                NULL,
                NULL,
                0,
                :tank_api,
                0,
                120,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                :tank_terminal,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                'N',
                'N',
                0,
                'N',
                'N',
                0,
                0,
                0,
                0,
                0,
                1,
                1,
                :tank_density,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                :tank_name,
                :tank_dtol_percent,
                :tank_dtol_volume,
                :tank_mtol_volume,
                :tank_mtol_percent,
                :tank_15_density,
                :tank_exc_pid,
                :tank_exc_pds,
                :tank_exc_spmv,
                :tank_exc_stckrpt
                )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_name', $this->tank_name);
        oci_bind_by_name($stmt, ':tank_density', $this->tank_density);
        oci_bind_by_name($stmt, ':tank_terminal', $this->tank_terminal);
        oci_bind_by_name($stmt, ':tank_base', $this->tank_base);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        oci_bind_by_name($stmt, ':tank_dtol_percent', $this->tank_dtol_percent);
        oci_bind_by_name($stmt, ':tank_dtol_volume', $this->tank_dtol_volume);
        oci_bind_by_name($stmt, ':tank_mtol_volume', $this->tank_mtol_volume);
        oci_bind_by_name($stmt, ':tank_mtol_percent', $this->tank_mtol_percent);
        oci_bind_by_name($stmt, ':tank_api', $this->tank_api);
        oci_bind_by_name($stmt, ':tank_15_density', $this->tank_15_density);
        oci_bind_by_name($stmt, ':tank_exc_pid', $this->tank_exc_pid);
        oci_bind_by_name($stmt, ':tank_exc_pds', $this->tank_exc_pds);
        oci_bind_by_name($stmt, ':tank_exc_spmv', $this->tank_exc_spmv);
        oci_bind_by_name($stmt, ':tank_exc_stckrpt', $this->tank_exc_stckrpt);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = "Tank";
        $jnl_data[2] = $this->tank_code;
        $jnl_data[3] = sprintf(
            "name:%s, base product:%s", $this->tank_name, $this->tank_base);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
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
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            SELECT * FROM GUI_TANKS
            WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        if (!isset($this->tank_terminal)) {
            $query = "
                SELECT TERM_CODE FROM TERMINAL";
            $stmt = oci_parse($this->conn, $query);
            if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            }
            $this->tank_terminal = $row['TERM_CODE'];
        }

        // $this->tank_excl_from_pid = (isset($this->tank_excl_from_pid) && $this->tank_excl_from_pid ? 'Y' : 'N');
        // $this->tank_excl_from_pds = (isset($this->tank_excl_from_pds) && $this->tank_excl_from_pds ? 'Y' : 'N');
        // $this->tank_excl_from_special_mv = (isset($this->tank_excl_from_special_mv) && $this->tank_excl_from_special_mv ? 'Y' : 'N');
        // $this->tank_excl_from_stock_rep = (isset($this->tank_excl_from_stock_rep) && $this->tank_excl_from_stock_rep ? 'Y' : 'N');

        $query = "
            UPDATE TANKS
            SET TANK_BASE = :tank_base,
                TANK_DENSITY = :tank_density,
                TANK_TERMINAL = :tank_terminal,
                TANK_API = :tank_api,
                TANK_NAME = :tank_name,
                TANK_DAILY_TOL_PERCENT = :tank_dtol_percent,
                TANK_DAILY_TOL_VOL = :tank_dtol_volume,
                TANK_MONTHLY_TOL_VOL = :tank_mtol_volume,
                TANK_MONTHLY_TOL_PERCENT = :tank_mtol_percent,
                TANK_15_DENSITY = :tank_15_density,
                TANK_EXC_PID = :tank_exc_pid,
                TANK_EXC_PDS = :tank_exc_pds,
                TANK_EXC_SPMV = :tank_exc_spmv,
                TANK_EXC_STCKRPT = :tank_exc_stckrpt
            WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_name', $this->tank_name);
        oci_bind_by_name($stmt, ':tank_density', $this->tank_density);
        oci_bind_by_name($stmt, ':tank_terminal', $this->tank_terminal);
        oci_bind_by_name($stmt, ':tank_base', $this->tank_base);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        oci_bind_by_name($stmt, ':tank_dtol_percent', $this->tank_dtol_percent);
        oci_bind_by_name($stmt, ':tank_dtol_volume', $this->tank_dtol_volume);
        oci_bind_by_name($stmt, ':tank_mtol_volume', $this->tank_mtol_volume);
        oci_bind_by_name($stmt, ':tank_mtol_percent', $this->tank_mtol_percent);
        oci_bind_by_name($stmt, ':tank_api', $this->tank_api);
        oci_bind_by_name($stmt, ':tank_15_density', $this->tank_15_density);
        oci_bind_by_name($stmt, ':tank_exc_pid', $this->tank_exc_pid);
        oci_bind_by_name($stmt, ':tank_exc_pds', $this->tank_exc_pds);
        oci_bind_by_name($stmt, ':tank_exc_spmv', $this->tank_exc_spmv);
        oci_bind_by_name($stmt, ':tank_exc_stckrpt', $this->tank_exc_stckrpt);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = "Tank";
        $jnl_data[2] = $this->tank_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "GUI_TANKS";
        $record = sprintf("code:%s", $this->tank_code);
        foreach ($this as $key => $value) {
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
                !$journal->valueChange(
                    $module, $record, strtoupper($key), $row[strtoupper($key)], $value)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        write_log(sprintf("%s::%s() START. base_code:%s", __CLASS__, __FUNCTION__, $this->tank_code),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            DELETE TGRLINK
            WHERE TGR_TKLK_TANKCODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $query = "
            DELETE FROM TANKS
            WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = "Tank";
        $jnl_data[2] = $this->tank_code;
        $jnl_data[3] = "";

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}
