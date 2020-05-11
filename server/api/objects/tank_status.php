<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../config/setups.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

/**
 * Old PHP: amf TankService.php
 * GUI_TANKS has too many columns, some of them are not used. Here are the main columns and its frontend display:
 * tank_code:
 * tank_name:
 * tank_terminal:
 * tank_base: base product, not editable on tank status screen
 * tank_drv_type: interface type
 * tank_drv_aux: auxiliary
 * tank_identifier: identifier for gauge
 * tank_location: area
 * tank_outflow_ope:  
 * tank_inflow_open:
 * tank_adhoc_ivrq: 
 * tank_inv_needed: 
 * tank_dipping_on:
 * tank_leakdtct_on: leak detection
 * tank_alarmed: 
 * tank_poll_gap: poll interval
 * tank_prod_lvl: product level
 * tank_address: register offset
 * tank_no_sbt: 
 * tank_versno: 
 * tank_pakscan_act: 
 * tank_alarm_state: level alarm state
 * tank_lvl_alarm: 
 * tank_gaugingmthd: gauging method
 * tank_instance: instance
 * tank_channel: channel
 * tank_sbt_ty: 
 * tank_eth_content:
 * tank_ltr_close:
 * tank_kg_close:
 * tank_close_dens: 
 * tank_rptvcfclose:
 * tank_inflow_rate:
 * tank_spare_fld1:
 * tank_spare_fld2:
 * tank_pump_vol: 
 * tank_res:
 * tank_amb_vol: amb volume
 * tank_cor_vol: std volume
 * tank_vapour_kg: 
 * tank_liquid_kg: liquid mass
 * tank_water:
 * tank_water_lvl:
 * tank_ullage: ullage
 * tank_api:
 * tank_prod_c_of_e:
 * tank_60_86_vcf:
 * tank_density: density
 * tank_temp: observed temperature
 * tank_rptvcf: 
 * tank_amb_density:
 * tank_dtol_volume: 
 * tank_dtol_percent: 
 * tank_mtol_volume: 
 * tank_mtol_percent: 
 * tank_date: 
 * tank_group: 
 * tank_15_density: standard density,
 * tank_active: 
 * tank_atg_manchg: 2020-01-27 13:33:53,
 * tank_atg_status: 
 * tank_sulphur: sulphur (wt%) in percent
 * tank_flashpoint: flash point
 * tank_status:
 * tank_status_name: In Service - Not used,
 * tank_hh_level: HH
 * tank_h_level: H
 * tank_l_level: L
 * tank_ll_level: LL
 * tank_uh_level: user H
 * tank_ul_level: user L
 * tank_max_level: 
 * tank_max_capacity: 
 * tank_exc_pid: Set to Y to exclude this tank from PID Message
 * tank_exc_pds: Set to Y to exclude this tank from PDS Message
 * tank_exc_spmv: Set to Y to exclude this tank from Special Movement Message
 * tank_exc_stckrpt: Set to Y to exclude this tank from Stock Reports
 * tank_viscosity: 
 * tank_batch_no: 
 * flow_rate: 
 */
class TankStatus extends CommonClass
{
    protected $TABLE_NAME = 'TANKS';
    protected $VIEW_NAME = 'GUI_TANKS';

    protected $primary_keys = array(
        "tank_code",
        "tank_terminal"
    );

    protected $table_view_map = array(
        "TANK_DAILY_TOL_VOL" => "TANK_DTOL_VOLUME",
        "TANK_DAILY_TOL_PERCENT" => "TANK_DTOL_PERCENT",
        "TANK_MONTHLY_TOL_VOL" => "TANK_MTOL_VOLUME",
        "TANK_MONTHLY_TOL_PERCENT" => "TANK_MTOL_PERCENT",
    );

    public $BOOLEAN_FIELDS = array(
        "TANK_ADHOC_IVRQ" => "Y",
        "TANK_INV_NEEDED" => "Y",
        "TANK_DIPPING_ON" => "Y",
        "TANK_LEAKDTCT_ON" => "Y",
        "TANK_ACTIVE" => 1,
        "TANK_ATG_STATUS" => 1,
        "TANK_EXC_PID" => 'Y',
        "TANK_EXC_PDS" => 'Y',
        "TANK_EXC_SPMV" => 'Y',
        "TANK_EXC_STCKRPT" => 'Y',
    );

    public $NUMBER_FIELDS = array(
        "TANK_BCLASS_DENS_LO",
        "TANK_BCLASS_DENS_HI",
        "TANK_BCLASS_TEMP_LO",
        "TANK_BCLASS_TEMP_HI",
        "TANK_POLL_GAP",
        "TANK_CLOSE_DENS",
        "TANK_DENSITY",
        "TANK_BASE_REF_TEMP",
        "TANK_BASE_DENS_LO",
        "TANK_BASE_DENS_HI",
        "TANK_VAPOUR_KG",
        "TANK_LIQUID_KG",
        "TANK_WATER",
        "TANK_WATER_LVL",
        "TANK_PUMP_VOL",
        "TANK_LTR_CLOSE",
        "TANK_KG_CLOSE",
        "TANK_AMB_DENSITY",
        "TANK_AMB_VOL",
        "TANK_COR_VOL",
        "TANK_PROD_LVL",
        "TANK_TEMP",
        "TANK_RCPTS",
        "TANK_TRFS",
        "TANK_NO_SBT",
        "TANK_VERSNO",
        "TANK_PAKSCAN_ACT",
        "TANK_ALARM_STATE",
        "TANK_15_DENSITY",
        "TANK_SULPHUR",
        "TANK_FLASHPOINT",
        "TANK_HH_LEVEL",
        "TANK_H_LEVEL",
        "TANK_L_LEVEL",
        "TANK_LL_LEVEL",
        "TANK_UH_LEVEL",
        "TANK_UL_LEVEL",
    );
    
    public function status_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->tank_status_types();
    }

    public function prod_categories()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_categories();
    }

    public function gauge_methods()
    {
        $serv = new EnumService($this->conn);
        return $serv->gauge_methods();
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
        $ref_density = 0;
        if (isset($this->tank_15_density) && $this->tank_15_density > 0) {
            $ref_density = $this->tank_15_density;
        } else {
            $ref_density = $this->tank_density;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();

        $query_string = "frm_baseCd=" . rawurlencode(strip_tags($this->tank_base)) . 
            "&frm_which_type=" . rawurlencode(strip_tags($this->tank_qty_type)) .
            "&frm_real_amount=" . rawurlencode(strip_tags($this->tank_qty_amount)) .
            "&frm_real_temp=" . rawurlencode(strip_tags($this->tank_temp)) .
            "&frm_real_dens=" . rawurlencode(strip_tags($ref_density)) .
            "&frm_tank_trm=" . rawurlencode(strip_tags($site_code)) .
            "&frm_tank_cd=" . rawurlencode(strip_tags($this->tank_code)) .
            "&frm_strap_height_mm=" . rawurlencode(strip_tags($this->tank_prod_lvl));

        $res = Utilities::http_cgi_invoke("cgi-bin/en/calcvcf.cgi", $query_string);
        $xml = simplexml_load_string($res);
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
        $ref_density = 0;
        if (isset($this->tank_15_density) && $this->tank_15_density > 0) {
            $ref_density = $this->tank_15_density;
        } else {
            $ref_density = $this->tank_density;
        }

        $query_string = "frm_baseCd=" . rawurlencode(strip_tags($this->tank_base)) . 
            "&frm_which_type=" . rawurlencode(strip_tags($this->tank_qty_type)) .
            "&frm_real_amount=" . rawurlencode(strip_tags($this->tank_qty_amount)) .
            "&frm_real_temp=" . rawurlencode(strip_tags($this->tank_temp)) .
            "&frm_real_dens=" . rawurlencode(strip_tags($ref_density));

        $res = Utilities::http_cgi_invoke("cgi-bin/en/calcvcf.cgi", $query_string);
        $xml = simplexml_load_string($res);
        echo json_encode($xml, JSON_PRETTY_PRINT);
    }

    //Because base cannot be too many, do not do limit
    //Old sample from amf TankService.php::getPaged():
    public function read()
    {
        if (isset($this->tank_code)) {
            $query = "
                SELECT GUI_TANKS.*, FLOW_RATE
                FROM GUI_TANKS, TANK_MAX_FLOW
                WHERE GUI_TANKS.TANK_CODE = :tank_code
                    AND GUI_TANKS.TANK_CODE = TANK_MAX_FLOW.TANK_CODE(+)
                    AND TANK_PROD_LVL = TANK_LEVEL(+)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        } else {
            $query = "
                SELECT GUI_TANKS.*, FLOW_RATE
                FROM GUI_TANKS, TANK_MAX_FLOW
                WHERE GUI_TANKS.TANK_CODE = TANK_MAX_FLOW.TANK_CODE(+)
                    AND TANK_PROD_LVL = TANK_LEVEL(+)";
            $stmt = oci_parse($this->conn, $query);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function create()
    {
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

    public function post_update()
    {
        $query = "UPDATE TANKS SET TANK_ATG_MANCHG = SYSDATE WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function updateStatus()
    {
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
