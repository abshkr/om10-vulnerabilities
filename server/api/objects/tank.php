<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/strap_service.php';
include_once 'common_class.php';
include_once 'tank_max_flow.php';

class Tank extends CommonClass
{
    protected $TABLE_NAME = 'TANKS';
    protected $VIEW_NAME = 'GUI_TANKS';
    protected $table_view_map = array(
        "TANK_DAILY_TOL_VOL" => "TANK_DTOL_VOLUME",
        "TANK_DAILY_TOL_PERCENT" => "TANK_DTOL_PERCENT",
        "TANK_MONTHLY_TOL_VOL" => "TANK_MTOL_VOLUME",
        "TANK_MONTHLY_TOL_PERCENT" => "TANK_MTOL_PERCENT",
    );

    protected $del_n_ins_children = false;
    // protected $CHILD_OBJECTS = array(
    //     "TankMaxFlow" => 'TANK_MAX_FLOW');

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "TANK_EXC_PID" => "Y",
        "TANK_EXC_PDS" => "Y",
        "TANK_EXC_SPMV" => "Y",
        "TANK_EXC_STCKRPT" => "Y",
        "TANK_AFC_ENABLED" => "Y",
        "TANK_INV_NEEDED" => "Y",
        "TANK_ADHOC_IVRQ" => "Y",
        "TANK_INV_NEEDED" => "Y",
        "TANK_ADHOC_IVRQ" => "Y",
        "TANK_ACTIVE" => 1,
        "TANK_DENS_MODE" => 1
    );

    public $NUMBER_FIELDS = array(
        "TANK_BCLASS_DENS_LO",
        "TANK_BCLASS_DENS_HI",
        "TANK_BCLASS_TEMP_LO",
        "TANK_BCLASS_TEMP_HI",
        "TANK_POLL_GAP",
        "TANK_CLOSE_DENS" => 3,
        "TANK_DENSITY" => 3,
        "TANK_BASE_REF_TEMP",
        "TANK_BASE_DENS_LO",
        "TANK_BASE_DENS_HI",
        "TANK_VAPOUR_KG",
        "TANK_LIQUID_KG" => 0,
        "TANK_WATER",
        "TANK_WATER_LVL",
        "TANK_PUMP_VOL",
        "TANK_LTR_CLOSE",
        "TANK_KG_CLOSE",
        "TANK_AMB_DENSITY",
        "TANK_AMB_VOL" => 0,
        "TANK_COR_VOL" => 0,
        "TANK_PROD_LVL",
        "TANK_TEMP" => 2,
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
        "TANK_DTOL_VOLUME",
        "TANK_DTOL_PERCENT",
        "TANK_MTOL_VOLUME",
        "TANK_MTOL_PERCENT",
        "TANK_VISCOSITY",
        "TANK_AMB_CLOSE",
        "TANK_IFC",
        "TANK_ROOF_WEIGHT",
        "TANK_TOTAL_VOL" => 0,
        "TANK_AIR_KG",
        "TANK_VCF",
        "TANK_SG",
        "ATG_CHANGED_PAST",
        "TANK_POLL_GAP"
    );

    public $AMPERSAND_FIELDS = array(
        "TANK_DRV_TYPE",
    );

    protected $primary_keys = array("tank_code");
    protected $PRIMIRAY_KEY_EXCLUSIONS = array('TANK_TERMINAL');

    public function calc_max_flow()
    {
        $query = "
            SELECT TANK_CODE, TANK_PROD_LVL FROM TANKS ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        $retrieve_count = 0;
        while ($tank_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $retrieve_count++;

            $item = array();
            $item['tank_code'] = $tank_row['TANK_CODE'];
            $item['tank_level'] = (float) $tank_row['TANK_PROD_LVL'];

            $tank_flow = new TankMaxFlow($this->conn);
            $tank_flow->tank_code = $tank_row['TANK_CODE'];
            $stmt2 = $tank_flow->read();
            $result = array();
            Utilities::retrieve($result, $tank_flow, $stmt2);

            $flow_data_count = count($result);
            if ($flow_data_count <= 0) {
                $item['flow_rate'] = 0;
                array_push($tank_max_flows, $item);
                continue;
            }

            // write_log(json_encode($result), __FILE__, __LINE__);

            //Because inside TankMaxFlow::read(), it is ordered by tank level
            $cur_level = (float) $tank_row['TANK_PROD_LVL'];
            if ($cur_level < (float) $result[0]['tank_level']) {
                write_log(sprintf("tank %s, cur lvl: %f, is less than min set", $tank_row['TANK_CODE'], $cur_level),
                    __FILE__, __LINE__, LogLevel::WARNING);
                $cur_max_flow = (float) $result[0]['flow_rate'];
            } else if ($cur_level > (float) $result[$flow_data_count - 1]['tank_level']) {
                write_log(sprintf("tank %s, cur lvl: %f, is greater than max set", $tank_row['TANK_CODE'], $cur_level),
                    __FILE__, __LINE__, LogLevel::WARNING);
                $cur_max_flow = (float) $result[$flow_data_count - 1]['flow_rate'];
            } else {
                $x1 = (float) $result[0]['tank_level'];
                $y1 = (float) $result[0]['flow_rate'];
                $x2 = (float) $result[$flow_data_count - 1]['tank_level'];
                $y2 = (float) $result[$flow_data_count - 1]['flow_rate'];
                for ($i = 0; $i < $flow_data_count; $i++) {
                    if ((int) $cur_level == (int) $result[$i]['tank_level']) {
                        $cur_max_flow = (float) $result[$i]['flow_rate'];
                        break;
                    } else if ((int) $cur_level > (int) $result[$i]['tank_level']) {
                        $x1 = (float) $result[$i]['tank_level'];
                        $y1 = (float) $result[$i]['flow_rate'];
                    } else {
                        $x2 = (float) $result[$i]['tank_level'];
                        $y2 = (float) $result[$i]['flow_rate'];
                        $cur_max_flow = (($x2 - $cur_level) / ($x2 - $x1)) * $y1 +
                            (($x1 - $cur_level) / ($x1 - $x2)) * $y2;
                        // write_log(sprintf("%f,%f,%f,%f,%f", $x1, $y1, $x2, $y2, $cur_level),
                        //     __FILE__, __LINE__);
                        break;
                    }
                }
            }

            $item['flow_rate'] = $cur_max_flow;
            array_push($tank_max_flows, $item);
        }

        Utilities::echoRead($retrieve_count, $tank_max_flows, $desc = "");
        return $tank_max_flows;
    }

    public function simple_list()
    {
        Utilities::sanitize($this);

        $query = "
        SELECT TANK_CODE FROM GUI_TANKS ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Because base cannot be too many, do not do limit
    //Old sample from amf TankService.php::getPaged():
    // "tank_code":"ST 3","tank_name":"ST 3","tank_terminal":"TGI","tank_sitename":"Shell TanjungGelang","tank_base":"220008581","tank_base_name":"Nemo 2016","tank_base_group":null,"tank_base_class":"6","tank_bclass_name":"Additive","tank_base_tunit":"0","tank_base_rpttemp":"0","tank_bclass_dens_lo":"1","tank_bclass_dens_hi":"2000","tank_bclass_vcf_alg":"3","tank_bclass_temp_lo":"-20","tank_bclass_temp_hi":"200","tank_drv_type":null,"tank_drv_aux":null,"tank_identifier":null,"tank_location":null,"tank_outflow_ope":null,"tank_inflow_open":null,"tank_adhoc_ivrq":null,"tank_inv_needed":null,"tank_dipping_on":"N","tank_leakdtct_on":null,"tank_alarmed":null,"tank_poll_gap":"0","tank_prod_lvl":"0","tank_address":"0","tank_rcpts":"0","tank_trfs":"93526","tank_no_sbt":"0","tank_versno":"0","tank_pakscan_act":"0","tank_alarm_state":null,"tank_lvl_alarm":"0","tank_lvlalarm_desc":"OK - NORMAL","tank_gaugingmthd":"0","tank_gaugingmthd_desc":"MANUAL","tank_instance":"0","tank_channel":"0","tank_sbt_ty":"0","tank_eth_content":"0","tank_ltr_close":"0","tank_kg_close":"0","tank_close_dens":"980","tank_rptvcfclose":"1","tank_inflow_rate":"0","tank_spare_fld1":null,"tank_spare_fld2":null,"tank_rcpt_vol":"0","tank_trf_vol":"0","tank_rcpt_kg":"0","tank_trf_kg":"0","tank_pump_vol":"0","tank_res":"0","tank_amb_vol":"0","tank_cor_vol":"0","tank_vapour_kg":"0","tank_liquid_kg":"0","tank_water":"0","tank_water_lvl":"0","tank_ullage":"0","tank_api":"12.8","tank_prod_c_of_e":"0","tank_60_86_vcf":"0","tank_density":"980","tank_temp":"0","tank_rptvcf":".0001","tank_amb_density":"0","tank_dtol_volume":"0","tank_dtol_percent":"0","tank_mtol_volume":"0","tank_mtol_percent":"0","tank_date":null,"tank_group":null,"tank_15_density":"980","tank_base_ref_temp":null,"tank_base_ref_tunt":null,"tank_base_corr_mthd":"1","tank_base_ref_temp_spec":"1","tank_base_limit_preset_ht":null,"tank_base_dens_lo":"1","tank_base_dens_hi":"2000","tank_base_color":null,"tank_active":"1","tank_atg_manchg":"2018-11-01 17:12:56:61976","tank_atg_status":null,"tank_sulphur":null,"tank_flashpoint":null,"tank_status":"0","tank_status_name":"In Service - Not used","tank_hh_level":null,"tank_h_level":null,"tank_l_level":null,"tank_ll_level":null,"tank_uh_level":null,"tank_ul_level":null,"tank_hh_state":"-1","tank_h_state":"-1","tank_l_state":"-1","tank_ll_state":"-1","tank_uh_state":"-1","tank_ul_state":"-1"
    public function read()
    {
        $query = "
            SELECT GUI_TANKS.*, (SYSDATE - NVL(TANK_DATE, SYSDATE)) *  24 * 60 * 60 ATG_CHANGED_PAST 
            FROM GUI_TANKS ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function calc_pumpable($item) {
        // get the value of TOV,
        $TOV = 0;
        if (!isset($item['tank_total_vol'])) {
            $TOV = (float)$item['tank_amb_vol'];
        } else {
            $TOV = (float)$item['tank_total_vol'];
        }

        // get the volume from User L-level
        $ULV = 0;
        if (!isset($item['tank_ul_level'])) {
            $ULV = 0;
        } else {
            $strap_service = new StrapService($this->conn);
            $ULV = $strap_service->get_amb($item['tank_code'], (float)$item['tank_ul_level']);
        }

        $pumpable = $TOV - $ULV;
        if ($pumpable < 0 || !is_numeric($pumpable)) {
            $pumpable = 0;
        }

        return $pumpable;
    }

    //Because in db, some status like tank_hh_state is -1, which means null. This is old CGI legacy
    public function read_decorate(&$result_array)
    {
        foreach ($result_array as $key => $tank_item) {
            foreach ($tank_item as $item => $item_value) {
                if ((
                        $item === "tank_hh_state" || 
                        $item === "tank_h_state" ||
                        $item === "tank_l_state" ||
                        $item === "tank_ll_state" ||
                        $item === "tank_uh_state" ||
                        $item === "tank_ul_state"
                    ) && $item_value === "-1") {
                    $result_array[$key][$item] = "";
                } //else if ($item === "tank_temp") {
                    // $result_array[$key]["tank_temp_f"] = ((float)$item_value) * 1.8 + 32;
                // }
                // this part will be useful when null-number-not-return defect is fixed
                // Always check if tank base prod density range is available, if not, use tank base class density range.
                if ( $item === "tank_base_dens_lo"  && ($item_value === null || $item_value === "")) {
                    $result_array[$key][$item] = $result_array[$key]["tank_bclass_dens_lo"];
                } 
                if ( $item === "tank_base_dens_hi"  && ($item_value === null || $item_value === "")) {
                    $result_array[$key][$item] = $result_array[$key]["tank_bclass_dens_hi"];
                } 
            }
            // this part will be useful when null-number-not-return defect is not fixed
            // Always check if tank base prod density range is available, if not, use tank base class density range.
            if ( !isset($tank_item["tank_base_dens_lo"]) ) {
                $result_array[$key]["tank_base_dens_lo"] = $result_array[$key]["tank_bclass_dens_lo"];
            } 
            if ( !isset($tank_item["tank_base_dens_hi"]) ) {
                $result_array[$key]["tank_base_dens_hi"] = $result_array[$key]["tank_bclass_dens_hi"];
            }
            
            if ($tank_item['tank_poll_gap'] == 0 || $tank_item['tank_poll_gap'] == "") {
                $result_array[$key]['tank_atg_status'] = 0;
                $result_array[$key]['tank_atg_status_name'] = 'Not in service';
            } else if ($tank_item['atg_changed_past'] <= $tank_item['tank_poll_gap'] + 10) {
                $result_array[$key]['tank_atg_status'] = 1;
                $result_array[$key]['tank_atg_status_name'] = 'Working';
            } else {
                $result_array[$key]['tank_atg_status'] = 2;
                $result_array[$key]['tank_atg_status_name'] = 'Not updated on time';
            }

            // calculate pumpable
            $result_array[$key]['tank_pump_vol'] = $this->calc_pumpable($tank_item);
        }
    }

    public function read_hook(&$hook_item)
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        $tank_flow = new TankMaxFlow($this->conn);
        $tank_flow->tank_code = $hook_item['tank_code'];
        $stmt = $tank_flow->read();
        $result = array();
        Utilities::retrieve($result, $tank_flow, $stmt);
        // write_log(json_encode($result), __FILE__, __LINE__);
        $hook_item['tank_max_flow'] = $result;

        $query = "
            SELECT STREAM_BAYCODE, STREAM_ARMCODE
            FROM GUI_PIPENODE
            WHERE STREAM_TANKCODE = :stream_tankcode
            ORDER BY STREAM_BAYCODE, STREAM_ARMCODE";
        $result = array();
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':stream_tankcode', $hook_item['tank_code']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['arms'] = $result;
    }

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM TANK_MAX_FLOW WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $base_item = array();
            $base_item['tank_level'] = $flow_row['TANK_LEVEL'];
            $base_item['flow_rate'] = $flow_row['FLOW_RATE'];
            $tank_max_flows[$flow_row['TANK_LEVEL']] = $base_item;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $module = $this->TABLE_NAME;
        foreach ($old as $tank_level => $max_flow_item) {
            if (isset($new[$tank_level]) && $max_flow_item['flow_rate'] != $new[$tank_level]['flow_rate']) {
                $record = sprintf("tank_code:%s, tank_level:%s", $this->tank_code, $tank_level);
                $journal->valueChange($module, $record, "flow rate", $max_flow_item['flow_rate'], $new[$tank_level]['flow_rate']);
            }

            if (!isset($new[$tank_level])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("tank_code:%s, tank_level:%s", $this->tank_code, $tank_level);
                $jnl_data[3] = sprintf("flow_rate:%s", $max_flow_item['flow_rate']);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($new as $tank_level => $max_flow_item) {
            if (!isset($old[$tank_level])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("tank_code:%s, tank_level:%s", $this->tank_code, $tank_level);
                $jnl_data[3] = sprintf("flow_rate:%s", $max_flow_item['flow_rate']);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }
    }

    protected function update_children($old_data = null)
    {
        // because $del_n_ins_children = false in this Class, this function will be called directly in common_class.php after updates of main record
        // remove the tank memeber if tank belongs to a tank group and base is changed
        if (isset($this->tank_baseold) && isset($this->tank_tgrname)) {
            if ($this->tank_baseold != $this->tank_base) {
                // need delete the tank from tank group
                $query = "
                    DELETE TGRLINK
                    WHERE 
                        TGR_TKLK_TANKCODE = :tank_code 
                        and TGR_TKLK_TANKDEPO = :tank_terminal
                        and TGR_GRLK = :tank_tgrname
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
                oci_bind_by_name($stmt, ':tank_terminal', $this->tank_terminal);
                oci_bind_by_name($stmt, ':tank_tgrname', $this->tank_tgrname);
                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

            }
        }
        if (!isset($this->tank_max_flow)) {
            return true;
        }
        
        $this->delete_children();
        $this->insert_children();

        return true;
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "DELETE FROM TANK_MAX_FLOW WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->tank_max_flow)) {
            return;
        }

        foreach ($this->tank_max_flow as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            $query = "INSERT INTO TANK_MAX_FLOW (
                ID,
                TANK_CODE,
                TANK_LEVEL,
                FLOW_RATE)
            VALUES (
                SEQ_TANK_MAX_FLOW_ID.NEXTVAL,
                :tank_code,
                :tank_level,
                :flow_rate
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
            oci_bind_by_name($stmt, ':tank_level', $value->tank_level);
            oci_bind_by_name($stmt, ':flow_rate', $value->flow_rate);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }
    }

    public function create()
    {
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

        // $this->tank_excl_from_pid = (isset($this->tank_excl_from_pid) && $this->tank_excl_from_pid ? 1 : 0);
        // $this->tank_excl_from_pds = (isset($this->tank_excl_from_pds) && $this->tank_excl_from_pds ? 1 : 0);
        // $this->tank_excl_from_special_mv = (isset($this->tank_excl_from_special_mv) && $this->tank_excl_from_special_mv ? 1 : 0);
        // $this->tank_excl_from_stock_rep = (isset($this->tank_excl_from_stock_rep) && $this->tank_excl_from_stock_rep ? 1 : 0);

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
                'ON_SITE',
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

        $query = "
            UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME;
        $jnl_data[2] = $this->tank_code;
        $jnl_data[3] = sprintf(
            "tank_name:%s, tank_base:%s", $this->tank_name, $this->tank_base);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);

        // add default tank ownership to the new tank(s) in TK_OWNERS
        $this->create_tank_owners();

        return true;
    }

    public function delete()
    {
        // need delete the child records in TK_OWNERS
        // Note: only delete it when its ownership qty is ZERO
        $query = "DELETE FROM TK_OWNERS WHERE TKLINK_TANKCODE = :tank_code and TKOWNER_QTY<=0";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
        }

        // need delete the child records in TANK_MAX_FLOW first
        $query = "DELETE FROM TANK_MAX_FLOW WHERE TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
        }

        $query = "
            DELETE TGRLINK
            WHERE TGR_TKLK_TANKCODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
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

            throw new DatabaseException($e['message']);
        }

        $query = "
            UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            throw new DatabaseException($e['message']);
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME;
        $jnl_data[2] = $this->tank_code;
        $jnl_data[3] = "";

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
        }

        oci_commit($this->conn);
        return true;
    }

    protected function post_update()
    {
        $query = "
            UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    protected function create_tank_owners()
    {
        // initialize the TK_OWNERS with the site manager company and all suppliers if the tank does not have an owner yet.
        // We don't put any current tank code into WHERE condition so it can create TK_OWNERS records for new tanks added before this fix.
        $query = "
            insert into TK_OWNERS (
                TKCMPY_LINK
                , TKLINK_TANKCODE
                , TKLINK_TANKDEPO
                , TKOWNER_QTY
                , TKO_STD_LTR
                , TKO_AMB_LTR
                , TKO_KG
                , TKO_PERCENTAGE
                , TKO_IN
                , TKO_IN_KG
                , TKO_IN_TOTAL
                , TKO_OUT
                , TKO_OUT_KG
                , TKO_OUT_TOTAL
                , TKO_OUT_PRMV
                , TKO_OUT_LD
                , TKO_ADJ_STD
                , TKO_ADJ_AMB
                , TKO_ADJ_KG
            )
            select 
                ctk.CMPY_CODE            AS TKCMPY_LINK
                , ctk.TANK_CODE          AS TKLINK_TANKCODE
                , ctk.TANK_TERMINAL      AS TKLINK_TANKDEPO
                , DECODE(ctk.SITE_MANAGER, 'Y', ctk.TANK_COR_VOL, 0)       AS TKOWNER_QTY
                , DECODE(ctk.SITE_MANAGER, 'Y', ctk.TANK_COR_VOL, 0)       AS TKO_STD_LTR
                , DECODE(ctk.SITE_MANAGER, 'Y', ctk.TANK_AMB_VOL, 0)       AS TKO_AMB_LTR
                , DECODE(ctk.SITE_MANAGER, 'Y', ctk.TANK_LIQUID_KG, 0)     AS TKO_KG
                , DECODE(ctk.SITE_MANAGER, 'Y', 100, 0)                    AS TKO_PERCENTAGE
                , DECODE(ctk.SITE_MANAGER, 'Y', ctk.TANK_RCPT_VOL, 0)      AS TKO_IN
                , DECODE(ctk.SITE_MANAGER, 'Y', ctk.TANK_RCPT_KG, 0)       AS TKO_IN_KG
                , NULL                   AS TKO_IN_TOTAL
                , DECODE(ctk.SITE_MANAGER, 'Y', ctk.TANK_TRF_VOL, 0)       AS TKO_OUT
                , DECODE(ctk.SITE_MANAGER, 'Y', ctk.TANK_TRF_KG, 0)        AS TKO_OUT_KG
                , NULL                   AS TKO_OUT_TOTAL
                , NULL                   AS TKO_OUT_PRMV
                , NULL                   AS TKO_OUT_LD
                , NULL                   AS TKO_ADJ_STD
                , NULL                   AS TKO_ADJ_AMB
                , NULL                   AS TKO_ADJ_KG
            from 
                (
                    select 
                        TKLINK_TANKCODE
                        , TKLINK_TANKDEPO
                        , TKCMPY_LINK
                        , count(*) as TKO_COUNT 
                    from TK_OWNERS 
                    group by TKLINK_TANKCODE, TKLINK_TANKDEPO, TKCMPY_LINK
                )          tko
                , (
                    select
                        cmp.CMPY_CODE
                        , cmp.SITE_MANAGER
                        , cmp.SUPPLIER
                        , tnk.TANK_CODE
                        , tnk.TANK_TERMINAL
                        , tnk.TANK_COR_VOL
                        , tnk.TANK_AMB_VOL
                        , tnk.TANK_LIQUID_KG
                        , tnk.TANK_RCPT_VOL
                        , tnk.TANK_RCPT_KG
                        , tnk.TANK_TRF_VOL
                        , tnk.TANK_TRF_KG
                    from
                        GUI_COMPANYS     cmp
                        , GUI_TANKS        tnk
                    where
                        cmp.SITE_MANAGER='Y' OR cmp.SUPPLIER = 'Y'
                )          ctk
            where 
                ctk.TANK_CODE = tko.TKLINK_TANKCODE(+)
                and ctk.TANK_TERMINAL = tko.TKLINK_TANKDEPO(+)
                and ctk.CMPY_CODE = tko.TKCMPY_LINK(+)
                and NVL(tko.TKO_COUNT, 0)=0
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);

        return true;
    }

    public function get_tank_batches()
    {
        $query = "
            SELECT TANK_CODE, TANK_TERMINAL, TANK_BASE, TANK_BATCH_NO 
            FROM TANKS
            WHERE TANK_CODE=:code and TANK_TERMINAL=:term
        ";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->tank_code);
        oci_bind_by_name($stmt, ':term', $this->tank_terminal);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

}
