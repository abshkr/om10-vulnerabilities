<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';

class Tank
{
	// database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //Because base cannot be too many, do not do limit
    //Old sample from amf TankService.php::getPaged():
    // "tank_code":"ST 3","tank_name":"ST 3","tank_terminal":"TGI","tank_sitename":"Shell TanjungGelang","tank_base":"220008581","tank_base_name":"Nemo 2016","tank_base_group":null,"tank_base_class":"6","tank_bclass_name":"Additive","tank_base_tunit":"0","tank_base_rpttemp":"0","tank_bclass_dens_lo":"1","tank_bclass_dens_hi":"2000","tank_bclass_vcf_alg":"3","tank_bclass_temp_lo":"-20","tank_bclass_temp_hi":"200","tank_drv_type":null,"tank_drv_aux":null,"tank_identifier":null,"tank_location":null,"tank_outflow_ope":null,"tank_inflow_open":null,"tank_adhoc_ivrq":null,"tank_inv_needed":null,"tank_dipping_on":"N","tank_leakdtct_on":null,"tank_alarmed":null,"tank_poll_gap":"0","tank_prod_lvl":"0","tank_address":"0","tank_rcpts":"0","tank_trfs":"93526","tank_no_sbt":"0","tank_versno":"0","tank_pakscan_act":"0","tank_alarm_state":null,"tank_lvl_alarm":"0","tank_lvlalarm_desc":"OK - NORMAL","tank_gaugingmthd":"0","tank_gaugingmthd_desc":"MANUAL","tank_instance":"0","tank_channel":"0","tank_sbt_ty":"0","tank_eth_content":"0","tank_ltr_close":"0","tank_kg_close":"0","tank_close_dens":"980","tank_rptvcfclose":"1","tank_inflow_rate":"0","tank_spare_fld1":null,"tank_spare_fld2":null,"tank_rcpt_vol":"0","tank_trf_vol":"0","tank_rcpt_kg":"0","tank_trf_kg":"0","tank_pump_vol":"0","tank_res":"0","tank_amb_vol":"0","tank_cor_vol":"0","tank_vapour_kg":"0","tank_liquid_kg":"0","tank_water":"0","tank_water_lvl":"0","tank_ullage":"0","tank_api":"12.8","tank_prod_c_of_e":"0","tank_60_86_vcf":"0","tank_density":"980","tank_temp":"0","tank_rptvcf":".0001","tank_amb_density":"0","tank_dtol_volume":"0","tank_dtol_percent":"0","tank_mtol_volume":"0","tank_mtol_percent":"0","tank_date":null,"tank_group":null,"tank_15_density":"980","tank_base_ref_temp":null,"tank_base_ref_tunt":null,"tank_base_corr_mthd":"1","tank_base_ref_temp_spec":"1","tank_base_limit_preset_ht":null,"tank_base_dens_lo":"1","tank_base_dens_hi":"2000","tank_base_color":null,"tank_active":"1","tank_atg_manchg":"2018-11-01 17:12:56:61976","tank_atg_status":null,"tank_sulphur":null,"tank_flashpoint":null,"tank_status":"0","tank_status_name":"In Service - Not used","tank_hh_level":null,"tank_h_level":null,"tank_l_level":null,"tank_ll_level":null,"tank_uh_level":null,"tank_ul_level":null,"tank_hh_state":"-1","tank_h_state":"-1","tank_l_state":"-1","tank_ll_state":"-1","tank_uh_state":"-1","tank_ul_state":"-1"
    function read()
    {
        // if (!isset($this->end_num)) {
        //     $this->start_num = 1;
        //     $this->end_num = $this->count();
        // }

        Utilities::sanitize($this);

        $query = "
            SELECT * FROM GUI_TANKS ORDER BY TANK_CODE";        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function create()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__), 
            __FILE__, __LINE__);

        Utilities::sanitize($this);

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
                TANK_15_DENSITY
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
                :tank_15_density
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
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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

        Utilities::sanitize($this);

        $query = "
            SELECT * FROM GUI_TANKS 
            WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);            
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

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
                TANK_15_DENSITY = :tank_15_density
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
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn; 
        $jnl_data[1] = "Tank";
        $jnl_data[2] = $this->tank_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "Tank";
        $record = sprintf("code:%s", $this->tank_code);
        foreach ($this as $key => $value) {
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] && 
                !$journal->valueChange(
                    $module, $record, $key, $row[strtoupper($key)], $value)) {
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $query = "
            DELETE FROM TANKS 
            WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}