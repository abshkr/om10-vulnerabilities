<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/area_service.php';
include_once __DIR__ . '/../service/meter_service.php';
include_once __DIR__ . '/../service/tank_service.php';
include_once 'common_class.php';

class BayConfiguration extends CommonClass
{
    protected $TABLE_NAME = 'BAY_AREA';

    public $BOOLEAN_FIELDS = array(
        "BA_LOCK" => 'Y',
        "BAD_LOCK" => 'Y',
        "BAA_LOCK" => 'Y',
        "INJECTOR" => 'Y',
        "BA_TKR_FROM_SPEC" => 'Y',
        "BA_LDCOMPL_TRAN" => 'Y',
    );

    public $NUMBER_FIELDS = array(
        "BAF_MIN_QTY",
        "BAF_MAX_QTY",
        "BAF_HI_RATE",
        "BAF_LO_RATE",
        "BAF_UP_QTY",
        "BAF_DN_QTY",
        "BAF_OVER_ORD"
    );

    public function areas()
    {
        $serv = new AreaService($this->conn);
        return $serv->read_brief();
    }

    public function meters()
    {
        $serv = new MeterService($this->conn);
        // return $serv->read_brief();
        return $serv->meters();
    }

    public function tanks()
    {
        $serv = new TankService($this->conn);
        return $serv->tanks();
    }

    public function pipenodes_simple()
    {
        $query = "SELECT * FROM GUI_PIPENODE ORDER BY STREAM_INDEX, STREAM_SEQ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pipenodes()
    {
        $query = "
            SELECT gpn.*, gtk.* 
            FROM GUI_PIPENODE gpn, GUI_TANKS gtk
            WHERE gpn.STREAM_TANKCODE = gtk.TANK_CODE AND gpn.STREAM_TANKSITE = gtk.TANK_TERMINAL
            ORDER BY gpn.STREAM_INDEX, gpn.STREAM_SEQ, gpn.STREAM_ARMCODE
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function arms()
    {
        $query = "SELECT * FROM BA_ARMS ORDER BY BAA_BAD_LNK, BAA_BAY_SEQ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function injectors()
    {
        $query = "SELECT * FROM BA_INJECTORS ORDER BY BAI_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function bay_types()
    {
        // $query = "SELECT * FROM BA_TYPE_VW WHERE BA_TYPE != 0 ORDER BY BA_TYPE";
        $query = "SELECT * FROM BA_TYPE_VW ORDER BY BA_TYPE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function bay_load_types()
    {
        $query = "SELECT * FROM LOAD_BAY_TYP ORDER BY BAY_TYPE_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function bay_load_options()
    {
        $query = "SELECT * FROM STAGING_LOAD_OPTIONS ORDER BY STAGING_LOAD_OPTION_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    public function device_types()
    {
        $query = "SELECT BAT_DEV_ID, 
                BAT_DEV_NAME, 
                BAT_N_ARMS, 
                BAT_BYTES DESCRIPTION, 
                BAT_AUX
            FROM BAT_ATTRIB, BAT_DEV_TYP 
            WHERE BAT_DEV_ID = BAT_DESIGNATION 
                -- AND BAT_DESIGNATION <> 0 
            ORDER BY BAT_DEV_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function details()
    {
        $query = "
            SELECT BAY_AREA.BA_CODE,
                BAY_AREA.BA_LOCK,
                BAY_AREA.BA_LDCOMPL_TRAN,
                BAY_AREA.BA_TKR_FROM_SPEC,
                BAD_HOSTNAME,
                BA_DEVICE.BAD_PHYSCODE,
                BA_DEVICE.BAD_LOCK,
                BAY_AREA.BA_SEQ, BA_DEVICE.BAD_NAME, BAY_AREA.BA_INSTANCE,
                BA_TYPE_VW.BA_TYPE,
                BA_TYPE_VW.DESCRIPTION BA_TYPE_NAME,
                BA_AREA, 
                AREA_NAME BA_AREA_NAME,
                BAD_SERVER,
                BAD_AUX,
                BAD_CHANNEL,
                BAT_DEV_ID DEV_TYPE_ID,
                BAT_DEV_NAME DEV_TYPE_NAME
            FROM BAY_AREA, 
                BA_DEVICE,
                BAD_BA,
                BA_TYPE_VW,
                AREA_RC,
                BAT_DEV_TYP
            WHERE BAY_AREA.BA_CODE = BAD_BA.BA_CODE_LNK
                AND BA_DEVICE.BAD_PHYSCODE = BAD_BA.BAD_LNK
                AND BAY_AREA.BA_TYPE = BA_TYPE_VW.BA_TYPE 
                AND BA_AREA = AREA_K
                AND BAD_LNKTYPE = BAT_DEV_ID 
                AND BA_CODE = :bay_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':bay_code', $this->ba_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function details_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $result = array();
        // write_log(json_encode($hook_item), __FILE__, __LINE__);
        $query = "
            SELECT *
            FROM GUI_PIPENODE
            WHERE STREAM_BAYCODE = :bay_code
            ORDER BY STREAM_ARMCODE, STREAM_MTRCODE, STREAM_INJCODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':bay_code', $this->ba_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['arm_meters'] = $result;
    }

    public function details_decorate(&$result_array)
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
        // write_log(json_encode($result_array), __FILE__, __LINE__);

        if (count($result_array) != 1) {
            write_log(sprintf("%s::%s() error: expected 1, actual %d", 
                __CLASS__, __FUNCTION__, count($result_array)),
                __FILE__, __LINE__);
            return;
        }

        $count = count($result_array[0]['arm_meters']);
        $i = 0;
        foreach ($result_array[0]['arm_meters'] as $arm_meter) {
            // write_log(json_encode($arm_meter), __FILE__, __LINE__);
            foreach ($arm_meter as $key => $value) {
                if ($key == "num_of_blend") {
                    $result_array[0]['arm_meters'][$i]['num_of_blend'] = $count - 1;
                    // write_log($count, __FILE__, __LINE__);
                }
            }
            $i += 1;
        }
    }
    
    //load_bays.pc, qstring
    public function read()
    {
        $query = "
            SELECT
                ba.*
                , bd.*
                , pn.*
            FROM 
                BAY_AREA            ba
                , BA_DEVICE         bd
                , BAD_BA            bb
                , (
                    SELECT 
                        STREAM_BAYCODE
                        , STREAM_BAYNAME
                        , COUNT(DISTINCT STREAM_ARMCODE)                                    AS ARM_COUNTS
                        , COUNT(DISTINCT STREAM_MTRCODE)                                    AS MTRINJ_COUNTS
                        , COUNT(DISTINCT STREAM_MTRCODE) - COUNT(DISTINCT STREAM_INJCODE)   AS MTR_COUNTS
                        , COUNT(DISTINCT STREAM_INJCODE)                                    AS INJ_COUNTS
                        , COUNT(DISTINCT (STREAM_TANKSITE||' - '||STREAM_TANKCODE))         AS TANK_COUNTS
                        , COUNT(DISTINCT STREAM_BASECODE)                                   AS BASE_COUNTS
                        , COUNT(DISTINCT STREAM_BCLASS_CODE)                                AS BCLASS_COUNTS
                    FROM
                        GUI_PIPENODE
                    GROUP BY STREAM_BAYCODE, STREAM_BAYNAME                    
                )                   pn
            WHERE 
                ba.BA_CODE = bb.BA_CODE_LNK
                AND bd.BAD_PHYSCODE = bb.BAD_LNK
                AND pn.STREAM_BAYCODE = ba.BA_CODE
            ORDER BY TO_NUMBER(ba.BA_INSTANCE) ASC, ba.BA_SEQ, ba.BA_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/loadbays_locks.cgi
    //op=&bay=AVGS01&ba_name=AVGS01&dev_cde=AVGS01&arm_cde0=A03101&cmd=ALL&sess_id=fxsLAsYxCsnZ
    public function remove_locks() 
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "op=&bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_name=" . rawurlencode(strip_tags($this->bad_name)) .
            "&dev_cde=" . rawurlencode(strip_tags($this->bad_physcode)) .
            "&arm_cde0=" . rawurlencode(strip_tags($this->baa_code)) . "&cmd=ALL";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/loadbays_locks.cgi", $query_string);
        
		//The CGI does not give any error message
        $result = array();
        $result["result"] = 0;
        $result["message"] = response("__ALL_LOCKS_REMOVED__");
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/loadbays_locks.cgi
    //op=&bay=AVGS01&ba_name=AVGS01&dev_cde=AVGS01&arm_cde0=A03101&cmd=BAY&sess_id=fxsLAsYxCsnZ
    public function toggle_bay_lock()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "op=&bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_name=" . rawurlencode(strip_tags($this->bad_name)) .
            "&dev_cde=" . rawurlencode(strip_tags($this->bad_physcode)) .
            "&arm_cde0=" . rawurlencode(strip_tags($this->baa_code)) . "&cmd=BAY";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/loadbays_locks.cgi", $query_string);
        
        //The CGI does not give any error message
        $result = array();
        $result["result"] = 0;
        $result["message"] = response("__BAY_LOCK_TOGGLED__");
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/ldcompl_tnkspec.cgi
    //bay=AVGS01&ba_name=AVGS01&dev_cde=AVGS01&arm_cde0=A03101&cmd=TKR&sess_id=fxsLAsYxCsnZ
    public function toggle_tanker_determination()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_name=" . rawurlencode(strip_tags($this->bad_name)) .
            "&dev_cde=" . rawurlencode(strip_tags($this->bad_physcode)) .
            "&arm_cde0=" . rawurlencode(strip_tags($this->baa_code)) . "&cmd=TKR";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/ldcompl_tnkspec.cgi", $query_string);

        if (strpos($res, 'Operation failed')) {
            $error = new EchoSchema(500, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        } else {
            $result = array();
            $result["result"] = 0;
            $result["message"] = response("__TANKER_DETERMINATION_TOGGLED__");
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/load_bays_mod.cgi
    //bay=T2&ba_typ=8&ba_area=4&ba_host=Host&ba_svr=SERV&dev_typ=1&dev_dsc=Accuload%20RBM&nbr_arm=2&dev_name=T2&dev_aux=nothing&dev_inst=1&dev_chl=3&dev_host=2&dev_svr=4&arm_cde0=1&nbr_bln0=1&mtr_cde0=JP802&tnk_cde0=SN6172&bln_mtr00=SUP02&bln_tnk00=SP-04&arm_cde1=2&nbr_bln1=1&mtr_cde1=H01FS&tnk_cde1=SP-04&bln_mtr10=H01TW&bln_tnk10=SP-05&max_arm=2&cmd=ADD&sess_id=YKNmsQcUrcRr
    public function add_bay()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
            SELECT COUNT(*) CN
            FROM BAY_AREA
            WHERE BA_CODE = :ba_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ba_code', $this->ba_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] > 0) {
            $error = new EchoSchema(500, response("__ALREADY_EXIST__", sprintf("Bay %s already exist", $this->ba_code)));
            echo json_encode($error, JSON_PRETTY_PRINT);

            return;
        }
        
        $query_string = "cmd=ADD&bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_typ=" . rawurlencode(strip_tags($this->ba_type)) .
            "&ba_area=" . rawurlencode(strip_tags($this->ba_area)) .
            "&ba_host=" . rawurlencode(strip_tags($this->ba_hostname)) .
            "&ba_svr=" . rawurlencode(strip_tags($this->ba_server)) .
            "&dev_typ=" . rawurlencode(strip_tags($this->dev_type_id)) .
            "&dev_dsc=" . rawurlencode(strip_tags($this->description)) .
            // "&nbr_arm=" . count($this->arm_meters) .
            "&dev_name=" . rawurlencode(strip_tags($this->device_name)) .
            "&dev_aux=" . rawurlencode(strip_tags($this->bad_aux)) .
            "&dev_inst=" . rawurlencode(strip_tags($this->bad_instance)) .
            "&dev_chl=" . rawurlencode(strip_tags($this->bad_channel)) .
            "&dev_host=" . rawurlencode(strip_tags($this->bad_hostname)) .
            "&dev_svr=" . rawurlencode(strip_tags($this->bad_server));

        $arm_i = 0;
        $blend_i = 0;
        $cur_seq = "";
        foreach ($this->arm_meters as $arm_meter) {
            if ($arm_meter->arm_seq == $cur_seq) {
                //Same arm, it is blend
                $cur_seq = $arm_meter->arm_seq;
                $query_string .= "&bln_mtr" . ($arm_i - 1) . $blend_i . "=" . 
                    rawurlencode(strip_tags($arm_meter->meter_code)) .
                    "&bln_tnk" . ($arm_i - 1) . $blend_i . "=" . 
                    rawurlencode(strip_tags($arm_meter->tank_code));
                $blend_i ++;
                
            } else {
                //New arm
                $query_string .= "&arm_cde" . $arm_i . "=" . $arm_meter->arm_seq .
                    "&nbr_bln" . $arm_i . "=" . $arm_meter->num_of_blend .
                    "&mtr_cde" . $arm_i . "=" . rawurlencode(strip_tags($arm_meter->meter_code)) .
                    "&tnk_cde" . $arm_i . "=" . rawurlencode(strip_tags($arm_meter->tank_code));
                $arm_i ++;
                $blend_i = 0;
                $cur_seq = $arm_meter->arm_seq;
            }
        }
        
        $query_string = $query_string . "&nbr_arm=" . $arm_i . "&max_arm=" . $arm_i;        
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/load_bays_mod.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);
        if (strpos($res, 'Operation Succeeded')) {
            $result = array();
            $result["result"] = 0;
            $result["message"] = response("__ADD_SUCCEEDED__", "Bay added");
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $error = new EchoSchema(500, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/load_bays_mod.cgi
    //bay=T2&ba_typ=UNLOAD_WBRIDGE&ba_area=4&ba_host=Host&ba_svr=SERV&dev_cde=T2&dev_inst=1&dev_typ=1&dev_chl=3&dev_name=T2&dev_dsc=Accuload%20RBM&dev_aux=nothing&dev_host=2&dev_svr=4&arm_cde0=A06101&nbr_bln0=1&mtr_cde0=JP802&tnk_cde0=222049&bln_mtr00=SUP02&bln_tnk00=SP-04&nbr_arm=1&nbr_bln=0&cmd=MOD&sess_id=LmGspKxCELZx
    public function mod_bay()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "cmd=MOD&bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_typ=" . rawurlencode(strip_tags($this->ba_type)) .
            "&ba_area=" . rawurlencode(strip_tags($this->ba_area)) .
            "&ba_host=" . rawurlencode(strip_tags($this->ba_hostname)) .
            "&ba_svr=" . rawurlencode(strip_tags($this->ba_server)) .
            "&dev_cde=" . rawurlencode(strip_tags($this->device_code)) .
            "&dev_typ=" . rawurlencode(strip_tags($this->dev_type_id)) .
            "&dev_dsc=" . rawurlencode(strip_tags($this->description)) .
            // "&nbr_arm=" . count($this->arm_meters) .
            "&dev_name=" . rawurlencode(strip_tags($this->device_name)) .
            "&dev_aux=" . rawurlencode(strip_tags($this->bad_aux)) .
            "&dev_inst=" . rawurlencode(strip_tags($this->bad_instance)) .
            "&dev_chl=" . rawurlencode(strip_tags($this->bad_channel)) .
            "&dev_host=" . rawurlencode(strip_tags($this->bad_hostname)) .
            "&dev_svr=" . rawurlencode(strip_tags($this->bad_server));
        $arm_i = 0;
        $blend_i = 0;
        $cur_seq = "";
        foreach ($this->arm_meters as $arm_meter) {
            if ($arm_meter->arm_seq == $cur_seq) {
                //Same arm, it is blend
                $cur_seq = $arm_meter->arm_seq;
                $query_string .= "&bln_mtr" . ($arm_i - 1) . $blend_i . "=" . 
                    rawurlencode(strip_tags($arm_meter->meter_code)) .
                    "&bln_tnk" . ($arm_i - 1) . $blend_i . "=" . 
                    rawurlencode(strip_tags($arm_meter->tank_code));
                $blend_i ++;
                
            } else {
                //New arm
                $query_string .= "&arm_cde" . $arm_i . "=" . $arm_meter->pn_arm .
                    "&nbr_bln" . $arm_i . "=" . $arm_meter->num_of_blend .
                    "&mtr_cde" . $arm_i . "=" . rawurlencode(strip_tags($arm_meter->meter_code)) .
                    "&tnk_cde" . $arm_i . "=" . rawurlencode(strip_tags($arm_meter->tank_code));
                $arm_i ++;
                $blend_i = 0;
                $cur_seq = $arm_meter->arm_seq;
            }
        }

        $query_string = $query_string . "&nbr_arm=" . $arm_i;  
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/load_bays_mod.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);
        if (strpos($res, 'Operation Succeeded')) {
            $result = array();
            $result["result"] = 0;
            $result["message"] = response("__UPDATE_SUCCEEDED__", "Bay modified");
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $error = new EchoSchema(500, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/load_bays_mod.cgi
    //bay=T2&ba_name=T2&dev_cde=T2&arm_cde0=A06101&cmd=DEL&sess_id=LmGspKxCELZx
    public function del_bay()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_name=" . rawurlencode(strip_tags($this->bad_name)) .
            "&dev_cde=" . rawurlencode(strip_tags($this->bad_physcode)) .
            "&arm_cde0=" . rawurlencode(strip_tags($this->baa_code)) . "&cmd=DEL";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/load_bays_mod.cgi", $query_string);

        if (strpos($res, 'Operation Succeeded')) {
            $result = array();
            $result["result"] = 0;
            $result["message"] = response("__DELETE_SUCCEEDED__", "Bay deleted");
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $error = new EchoSchema(500, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/ldcompl_tnkspec.cgi
    //op=&bay=AVGS01&ba_name=AVGS01&dev_cde=AVGS01&arm_cde0=A03101&cmd=LDC&sess_id=fxsLAsYxCsnZ
    public function toggle_auto_complete()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "op=&bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_name=" . rawurlencode(strip_tags($this->bad_name)) .
            "&dev_cde=" . rawurlencode(strip_tags($this->bad_physcode)) .
            "&arm_cde0=" . rawurlencode(strip_tags($this->baa_code)) . "&cmd=LDC";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/ldcompl_tnkspec.cgi", $query_string);

        if (strpos($res, 'Operation failed')) {
            $error = new EchoSchema(500, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        } else {
            $result = array();
            $result["result"] = 0;
            $result["message"] = response("__BAY_AUTO_COMPLETE_TOGGLED__");
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/loadbays_locks.cgi
    //op=&bay=AVGS01&ba_name=AVGS01&dev_cde=AVGS01&arm_cde0=A03101&cmd=DEV&sess_id=fxsLAsYxCsnZ
    public function toggle_device_lock()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "op=&bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_name=" . rawurlencode(strip_tags($this->bad_name)) .
            "&dev_cde=" . rawurlencode(strip_tags($this->bad_physcode)) .
            "&arm_cde0=" . rawurlencode(strip_tags($this->baa_code)) . "&cmd=DEV";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/loadbays_locks.cgi", $query_string);
        
        //The CGI does not give any error message
        $result = array();
        $result["result"] = 0;
        $result["message"] = response("__BAY_DEVICELOCK_TOGGLED__");
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/loadbays_locks.cgi
    //op=&bay=AVGS01&ba_name=AVGS01&dev_cde=AVGS01&arm_cde0=A03101&cmd=ARM&sess_id=fxsLAsYxCsnZ
    public function toggle_arm_lock()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "op=&bay=" . rawurlencode(strip_tags($this->ba_code)) . 
            "&ba_name=" . rawurlencode(strip_tags($this->bad_name)) .
            "&dev_cde=" . rawurlencode(strip_tags($this->bad_physcode)) .
            "&arm_cde0=" . rawurlencode(strip_tags($this->baa_code)) . "&cmd=ARM";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/loadbays_locks.cgi", $query_string);
        
        //The CGI does not give any error message
        $result = array();
        $result["result"] = 0;
        $result["message"] = response("__BAY_ARMLOCK_TOGGLED__");
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
}
