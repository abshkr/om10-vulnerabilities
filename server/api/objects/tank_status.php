<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../config/setups.php';

class TankStatus
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function status_types()
    {
        $query = "
            SELECT TANK_STATUS_ID, TANK_STATUS_CODE, TANK_STATUS_NAME
            FROM TANK_STATUS_TYP
            ORDER BY TANK_STATUS_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function gauge_methods()
    {
        $query = "
           SELECT * FROM GAUGE_METHOD_TYP ORDER BY GAUGE_METHOD_ID ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    /*
    SCRIPT_NAME: /cgi-bin/en/calcvcf.cgi
    begin: 20190206_17:31:53.337494+11
    REQUEST_METHOD: POST
    COOKIE:
    REQUEST: sess_id=igiVvGkQPtkp&frm_baseCd=400003030&frm_which_type=LT&frm_real_amount=3500&frm_real_temp=31.30&frm_real_dens=747.200&frm_tank_trm=TGI&frm_tank_cd=T1&frm_strap_height_mm=8807
     */
    public function calc_tank_qty_by_level()
    {
        $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . '/cgi-bin/en/calcvcf.cgi';

        $ref_density = 0;
        if (isset($this->tank_15_density) && $this->tank_15_density > 0) {
            $ref_density = $this->tank_15_density;
        } else {
            $ref_density = $this->tank_density;
        }

        $data = array(
            'frm_baseCd' => $this->tank_base,
            'frm_which_type' => $this->tank_qty_type,
            'frm_real_amount' => $this->tank_qty_amount,
            'frm_real_temp' => $this->tank_temp,
            'frm_real_dens' => $ref_density,
            'frm_tank_trm' => $this->tank_terminal,
            'frm_tank_cd' => $this->tank_code,
            'frm_strap_height_mm' => $this->tank_prod_lvl);

        $options = array
            (
            'http' => array
            (
                'header' => "Content-type: text/xml\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ),
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $xml = simplexml_load_string($result);
        echo json_encode($xml, JSON_PRETTY_PRINT);
    }

    /*
    SCRIPT_NAME: /cgi-bin/en/calcvcf.cgi
    begin: 20190206_16:52:22.908323+11
    REQUEST_METHOD: POST
    COOKIE:
    REQUEST: sess_id=igiVvGkQPtkp&frm_baseCd=400003030&frm_which_type=LT&frm_real_amount=2666065&frm_real_temp=31.30&frm_real_dens=747.200
     */
    public function calc_tank_qty()
    {
        $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . '/cgi-bin/en/calcvcf.cgi';

        $ref_density = 0;
        if (isset($this->tank_15_density) && $this->tank_15_density > 0) {
            $ref_density = $this->tank_15_density;
        } else {
            $ref_density = $this->tank_density;
        }

        $data = array(
            'frm_baseCd' => $this->tank_base,
            'frm_which_type' => $this->tank_qty_type,
            'frm_real_amount' => $this->tank_qty_amount,
            'frm_real_temp' => $this->tank_temp,
            'frm_real_dens' => $ref_density);

        $options = array
            (
            'http' => array
            (
                'header' => "Content-type: text/xml\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ),
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $xml = simplexml_load_string($result);
        echo json_encode($xml, JSON_PRETTY_PRINT);
    }

    //Because base cannot be too many, do not do limit
    //Old sample from amf TankService.php::getPaged():
    // "tank_code":"ST 3","tank_name":"ST 3","tank_terminal":"TGI","tank_sitename":"Shell TanjungGelang","tank_base":"220008581","tank_base_name":"Nemo 2016","tank_base_group":null,"tank_base_class":"6","tank_bclass_name":"Additive","tank_base_tunit":"0","tank_base_rpttemp":"0","tank_bclass_dens_lo":"1","tank_bclass_dens_hi":"2000","tank_bclass_vcf_alg":"3","tank_bclass_temp_lo":"-20","tank_bclass_temp_hi":"200","tank_drv_type":null,"tank_drv_aux":null,"tank_identifier":null,"tank_location":null,"tank_outflow_ope":null,"tank_inflow_open":null,"tank_adhoc_ivrq":null,"tank_inv_needed":null,"tank_dipping_on":"N","tank_leakdtct_on":null,"tank_alarmed":null,"tank_poll_gap":"0","tank_prod_lvl":"0","tank_address":"0","tank_rcpts":"0","tank_trfs":"93526","tank_no_sbt":"0","tank_versno":"0","tank_pakscan_act":"0","tank_alarm_state":null,"tank_lvl_alarm":"0","tank_lvlalarm_desc":"OK - NORMAL","tank_gaugingmthd":"0","tank_gaugingmthd_desc":"MANUAL","tank_instance":"0","tank_channel":"0","tank_sbt_ty":"0","tank_eth_content":"0","tank_ltr_close":"0","tank_kg_close":"0","tank_close_dens":"980","tank_rptvcfclose":"1","tank_inflow_rate":"0","tank_spare_fld1":null,"tank_spare_fld2":null,"tank_rcpt_vol":"0","tank_trf_vol":"0","tank_rcpt_kg":"0","tank_trf_kg":"0","tank_pump_vol":"0","tank_res":"0","tank_amb_vol":"0","tank_cor_vol":"0","tank_vapour_kg":"0","tank_liquid_kg":"0","tank_water":"0","tank_water_lvl":"0","tank_ullage":"0","tank_api":"12.8","tank_prod_c_of_e":"0","tank_60_86_vcf":"0","tank_density":"980","tank_temp":"0","tank_rptvcf":".0001","tank_amb_density":"0","tank_dtol_volume":"0","tank_dtol_percent":"0","tank_mtol_volume":"0","tank_mtol_percent":"0","tank_date":null,"tank_group":null,"tank_15_density":"980","tank_base_ref_temp":null,"tank_base_ref_tunt":null,"tank_base_corr_mthd":"1","tank_base_ref_temp_spec":"1","tank_base_limit_preset_ht":null,"tank_base_dens_lo":"1","tank_base_dens_hi":"2000","tank_base_color":null,"tank_active":"1","tank_atg_manchg":"2018-11-01 17:12:56:61976","tank_atg_status":null,"tank_sulphur":null,"tank_flashpoint":null,"tank_status":"0","tank_status_name":"In Service - Not used","tank_hh_level":null,"tank_h_level":null,"tank_l_level":null,"tank_ll_level":null,"tank_uh_level":null,"tank_ul_level":null,"tank_hh_state":"-1","tank_h_state":"-1","tank_l_state":"-1","tank_ll_state":"-1","tank_uh_state":"-1","tank_ul_state":"-1"
    public function read()
    {
        write_log(sprintf("%s::%s() START. tank_code:%s", __CLASS__, __FUNCTION__, $this->tank_code),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            SELECT GUI_TANKS.*, FLOW_RATE
            FROM GUI_TANKS, TANK_MAX_FLOW
            WHERE GUI_TANKS.TANK_CODE = :tank_code
                AND GUI_TANKS.TANK_CODE = TANK_MAX_FLOW.TANK_CODE(+)
                AND TANK_PROD_LVL = TANK_LEVEL(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
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

    public function updateStatus()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        //Old data
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

        //CGI sample: sess_id=vhNZdvHKEiQZ&tankTerm=TGI&tk=T1&prod=400003030&origin=&prodNm=U95+BASE&lvlAlrm=0&leakDtct=N&fcfld=&loDens=610.6&hiDens=770.352&tk_location=ON_SITE&Dnst=747.2&prodCE=0&lqdKG=521655&prodLvl=9800&obsTC=31.30&obsVol=2666065&stdVol=2661799&gaugMthd=1&tkGpNm=MOGAS&op=25
        $session_id = Utilities::getCurrentSession($this);

        $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . '/cgi-bin/en/stck_mgmt/tank_stat.cgi';

        $ref_density = 0;
        if (isset($this->tank_15_density) && $this->tank_15_density > 0) {
            $ref_density = $this->tank_15_density;
        } else {
            $ref_density = $this->tank_density;
        }

        $data = array(
            'tankTerm' => $this->tank_terminal,
            'tk' => $this->tank_code,
            'prod' => $this->tank_base,
            'origin' => "",
            // 'prodNm' => $this->tank_base_name,
            'lvlAlrm' => $this->tank_lvl_alarm,
            'leakDtct' => $this->tank_leakdtct_on,
            'fcfld' => "",
            'loDens' => $this->tank_bclass_dens_lo,
            'hiDens' => $this->tank_bclass_dens_hi,
            'tk_location' => $this->tank_location,
            'Dnst' => $this->tank_density,
            'prodCE' => $this->tank_prod_c_of_e,
            'lqdKG' => $this->tank_liquid_kg,
            'prodLvl' => $this->tank_prod_lvl,
            'obsTC' => $this->tank_temp,
            'obsVol' => $this->tank_amb_vol,
            'stdVol' => $this->tank_cor_vol,
            'gaugMthd' => $this->tank_gaugingmthd,
            'tkGpNm' => $this->tank_group,
            "sess_id" => $session_id,
            'op' => "25");

        $options = array
            (
            'http' => array
            (
                'header' => "Content-type: text/xml\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ),
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        $pattern = "var saveSt=\"1\";";
        if (!strstr($result, $pattern)) {
            write_log("CGI returns error:" . $url,
                __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        //Some data not update in CGI
        $query = "
            UPDATE TANKS
            SET TANK_API = :tank_api,
                TANK_15_DENSITY = :tank_15_density,
                TANK_PROD_C_OF_E = :tank_prod_c_of_e,
                TANK_ULLAGE = :tank_ullage,
                TANK_SULPHUR = :tank_sulphur,
                TANK_FLASHPOINT = :tank_flashpoint,
                TANK_STATUS = :tank_status,
                TANK_HH_LEVEL = :tank_hh_level,
                TANK_H_LEVEL = :tank_h_level,
                TANK_L_LEVEL = :tank_l_level,
                TANK_LL_LEVEL = :tank_ll_level,
                TANK_UH_LEVEL = :tank_uh_level,
                TANK_UL_LEVEL = :tank_ul_level,
                TANK_ATG_MANCHG = SYSDATE
            WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_api', $this->tank_api);
        oci_bind_by_name($stmt, ':tank_15_density', $this->tank_15_density);
        oci_bind_by_name($stmt, ':tank_prod_c_of_e', $this->tank_prod_c_of_e);
        oci_bind_by_name($stmt, ':tank_ullage', $this->tank_ullage);
        oci_bind_by_name($stmt, ':tank_sulphur', $this->tank_sulphur);
        oci_bind_by_name($stmt, ':tank_flashpoint', $this->tank_flashpoint);
        oci_bind_by_name($stmt, ':tank_status', $this->tank_status);
        oci_bind_by_name($stmt, ':tank_hh_level', $this->tank_hh_level);
        oci_bind_by_name($stmt, ':tank_h_level', $this->tank_h_level);
        oci_bind_by_name($stmt, ':tank_l_level', $this->tank_l_level);
        oci_bind_by_name($stmt, ':tank_ll_level', $this->tank_ll_level);
        oci_bind_by_name($stmt, ':tank_uh_level', $this->tank_uh_level);
        oci_bind_by_name($stmt, ':tank_ul_level', $this->tank_ul_level);
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
        $jnl_data[1] = "Tank status";
        $jnl_data[2] = $this->tank_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        //New data
        $query = "
            SELECT * FROM GUI_TANKS
            WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = "GUI_TANKS";
        $record = sprintf("code:%s", $this->tank_code);
        foreach ($row2 as $key => $value) {
            if ($key === "TANK_ATG_MANCHG" ||
                $key === "TANK_GAUGINGMTHD" ||
                $key === "TANK_DATE" ||
                $key === "TANK_STATUS" ||
                $key === "TANK_HH_STATE" ||
                $key === "TANK_H_STATE" ||
                $key === "TANK_L_STATE" ||
                $key === "TANK_LL_STATE" ||
                $key === "TANK_UH_STATE" ||
                $key === "TANK_UL_STATE") {
                continue;
            }

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

    public function updateGauge()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        //Old data
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

        //CGI sample: sess_id=vhNZdvHKEiQZ&tankTerm=TGI&tk=T1&tkgId=11&tkgType=22&tkgAux=33&tkgChannel=44&tkgInst=55&tkgPollInt=120&tkAddress=66&op=20
        $session_id = Utilities::getCurrentSession($this);

        $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . '/cgi-bin/en/stck_mgmt/tank_stat.cgi';

        $data = array(
            'tankTerm' => $this->tank_terminal,
            'tk' => $this->tank_code,
            'tkgId' => $this->tank_identifier,
            'tkgType' => $this->tank_drv_type,
            'tkgAux' => $this->tank_drv_aux,
            'tkgChannel' => $this->tank_channel,
            'tkgInst' => $this->tank_instance,
            'tkgPollInt' => $this->tank_poll_gap,
            'tkAddress' => $this->tank_address,
            "sess_id" => $session_id,
            'op' => "20",
        );

        $options = array
            (
            'http' => array
            (
                'header' => "Content-type: text/xml\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ),
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        $pattern = "var op=\"30\";";
        if (!strstr($result, $pattern)) {
            write_log("CGI returns error:" . $url,
                __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = "Tank gauge";
        $jnl_data[2] = $this->tank_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        //New data
        $query = "
            SELECT * FROM GUI_TANKS
            WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = "GUI_TANKS";
        $record = sprintf("code:%s", $this->tank_code);
        foreach ($row2 as $key => $value) {
            if ($key === "TANK_ATG_MANCHG" ||
                $key === "TANK_GAUGINGMTHD" ||
                $key === "TANK_DATE" ||
                $key === "TANK_STATUS" ||
                $key === "TANK_HH_STATE" ||
                $key === "TANK_H_STATE" ||
                $key === "TANK_L_STATE" ||
                $key === "TANK_LL_STATE" ||
                $key === "TANK_UH_STATE" ||
                $key === "TANK_UL_STATE") {
                continue;
            }

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
        write_log(sprintf("%s::%s() START. tank_code:%s", __CLASS__, __FUNCTION__, $this->tank_code),
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
