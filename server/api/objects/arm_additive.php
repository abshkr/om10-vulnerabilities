<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/tank_service.php';
include_once 'common_class.php';

//gantry/arm_additives.cgi
class ArmAdditive extends CommonClass
{
    protected $TABLE_NAME = 'BA_INJECTORS';
    public $desc = "Arm additive";
    protected $check_mandatory = false;
    public $check_exists = false;

    protected $table_view_map = array(
        "BAA_BAD_LNK" => "BAD_PHYSCODE"
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

    public function next_inj_seq()
    {
        $query = "
        SELECT NVL(MAX(SUBSTR(BAI_CODE, -1)), 0) + 1 NEXT_SEQ
        FROM BA_INJECTORS, PIPENODE ARM, PIPENODE METER, PIPENODE INJ, 
            PIPENODE TANK_NODE, STREAM_LINKS TANK_TO_INJ, STREAM_LINKS INJ_TO_MTR,
            BASE_PRODS, TANKS, BA_DEVICE, BA_ARMS, BAD_BA
        WHERE ARM.PN_TYPE = 8
            AND METER.PN_TYPE = 2
            AND INJ.PN_TYPE = 7
            AND TANK_NODE.PN_TYPE = 1
            AND TANK_TO_INJ.STREAM_LINK_UP = TANK_NODE.PN_ID
            AND TANK_TO_INJ.STREAM_LINK_DOWN = INJ.PN_ID
            AND INJ_TO_MTR.STREAM_LINK_UP = INJ.PN_ID
            AND INJ_TO_MTR.STREAM_LINK_DOWN = METER.PN_ID
            AND BA_INJECTORS.BAI_CODE = INJ.PN_INJ
            AND ARM.PN_STREAM = INJ.PN_STREAM
            AND TANK_NODE.PN_TANK_TANKCODE = TANK_CODE
            AND TANK_BASE = BASE_CODE
            AND BAA_CODE = ARM.PN_ARM
            AND BAA_BAD_LNK = BAD_PHYSCODE
            AND BAD_LNK = BAD_PHYSCODE
            AND BAA_CODE = :baa_code
            AND BA_CODE_LNK = :ba_code
        ORDER BY BAI_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ba_code', $this->ba_code);
        oci_bind_by_name($stmt, ':baa_code', $this->baa_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        } 

        return $stmt;
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/armadditives_mod.cgi
    //inj_nr=4&inj_vol=202&mtr=AVGS01&tank=SN6172&prod=Nemo%206172%20%28VPM%29&bay=AVGS01&arm=A03101&cmd=ADD&sess_id=KefWsWgsFxLc
    public function add_inj()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        if (!isset($this->inj_seq)) {
            $error = new EchoSchema(400, "Parameter missing");
            echo json_encode($error, JSON_PRETTY_PRINT);

            return array(); //Return array to prevent further process
        }

        $query_string = "inj_nr=" . $this->inj_seq . 
            "&inj_vol=" . $this->bai_volume .
            "&mtr=" . $this->meter_code .
            "&tank=" . $this->tank_code .
            "&bay=" . $this->bay_code .
            "&arm=" . $this->arm_code .
            "&cmd=ADD";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/armadditives_mod.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);
        if (strpos($res, 'Operation Succeeded')) {
            $result = array();
            $result["result"] = 0;
            $result["message"] = "New additive added";
            echo json_encode($result, JSON_PRETTY_PRINT);
            return array(); //Return array to prevent read
        } else {
            $error = new EchoSchema(500, "CGI invocation error, check logs/php_rest_*.log file for details");
            echo json_encode($error, JSON_PRETTY_PRINT);

            return array(); //Return array to prevent further process
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/armadditives_mod.cgi
    //inj_nr=1&inj_vol=104&mtr=AVGS01&tank=224401&prod=Infineum%20R375_Raw&cmd=MOD&bay=AVGS01&arm=A03101&sess_id=IRRkVurJbsky
    public function mod_inj()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        if (!isset($this->inj_seq)) {
            $error = new EchoSchema(400, "Parameter missing");
            echo json_encode($error, JSON_PRETTY_PRINT);

            return array(); //Return array to prevent further process
        }

        $query_string = "inj_nr=" . $this->inj_seq . 
            "&inj_vol=" . $this->bai_volume .
            "&mtr=" . $this->meter_code .
            "&tank=" . $this->tank_code .
            "&bay=" . $this->bay_code .
            "&arm=" . $this->arm_code .
            "&cmd=MOD";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/armadditives_mod.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);
        if (strpos($res, 'Operation Succeeded')) {
            $result = array();
            $result["result"] = 0;
            $result["message"] = "Additive modified";
            echo json_encode($result, JSON_PRETTY_PRINT);
            return array(); //Return array to prevent read
        } else {
            $error = new EchoSchema(500, "CGI invocation error, check logs/php_rest_*.log file for details");
            echo json_encode($error, JSON_PRETTY_PRINT);

            return array(); //Return array to prevent further process
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/gantry/armadditives_mod.cgi
    //inj_nr=1&inj_vol=104&mtr=AVGS01&tank=224401&prod=Infineum%20R375_Raw&cmd=DEL&bay=AVGS01&arm=A03101&sess_id=IRRkVurJbsky
    public function del_inj()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        if (!isset($this->inj_seq)) {
            $error = new EchoSchema(400, "Parameter missing");
            echo json_encode($error, JSON_PRETTY_PRINT);

            return array(); //Return array to prevent further process
        }

        $query_string = "inj_nr=" . $this->inj_seq . 
            "&inj_vol=" . $this->bai_volume .
            "&mtr=" . $this->meter_code .
            "&tank=" . $this->tank_code .
            "&bay=" . $this->bay_code .
            "&arm=" . $this->arm_code .
            "&cmd=DEL";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/gantry/armadditives_mod.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);
        if (strpos($res, 'Operation Succeeded')) {
            $result = array();
            $result["result"] = 0;
            $result["message"] = "Additive deleted";
            echo json_encode($result, JSON_PRETTY_PRINT);
            return array(); //Return array to prevent read
        } else {
            $error = new EchoSchema(500, "CGI invocation error, check logs/php_rest_*.log file for details");
            echo json_encode($error, JSON_PRETTY_PRINT);

            return array(); //Return array to prevent further process
        }
    }

    public function tanks()
    {
        $serv = new TankService($this->conn);
        return $serv->additive_tanks();
    }

    public function read()
    {
        if (isset($this->ba_code) && isset($this->baa_code)) {
            $query = "
            SELECT BAI_CODE, SUBSTR(BAI_CODE, -1) INJ_SEQ,
                BAI_VOLUME * 1000 BAI_VOLUME, METER.PN_MTR METER_CODE, 
                TANK_NODE.PN_TANK_TANKCODE TANK_CODE, BASE_NAME,
                BAA_CODE ARM_CODE, BA_CODE_LNK BAY_CODE
            FROM BA_INJECTORS, PIPENODE ARM, PIPENODE METER, PIPENODE INJ, 
                PIPENODE TANK_NODE, STREAM_LINKS TANK_TO_INJ, STREAM_LINKS INJ_TO_MTR,
                BASE_PRODS, TANKS, BA_DEVICE, BA_ARMS, BAD_BA
            WHERE ARM.PN_TYPE = 8
                AND METER.PN_TYPE = 2
                AND INJ.PN_TYPE = 7
                AND TANK_NODE.PN_TYPE = 1
                AND TANK_TO_INJ.STREAM_LINK_UP = TANK_NODE.PN_ID
                AND TANK_TO_INJ.STREAM_LINK_DOWN = INJ.PN_ID
                AND INJ_TO_MTR.STREAM_LINK_UP = INJ.PN_ID
                AND INJ_TO_MTR.STREAM_LINK_DOWN = METER.PN_ID
                AND BA_INJECTORS.BAI_CODE = INJ.PN_INJ
                AND ARM.PN_STREAM = INJ.PN_STREAM
                AND TANK_NODE.PN_TANK_TANKCODE = TANK_CODE
                AND TANK_BASE = BASE_CODE
                AND BAA_CODE = ARM.PN_ARM
                AND BAA_BAD_LNK = BAD_PHYSCODE
                AND BAD_LNK = BAD_PHYSCODE
                AND BAA_CODE = :baa_code
                AND BA_CODE_LNK = :ba_code
            ORDER BY BAI_CODE";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ba_code', $this->ba_code);
            oci_bind_by_name($stmt, ':baa_code', $this->baa_code);
        } else{
            $query = "
            SELECT BAI_CODE, SUBSTR(BAI_CODE, -1) INJ_SEQ,
                BAI_VOLUME * 1000 BAI_VOLUME, METER.PN_MTR METER_CODE, 
                TANK_NODE.PN_TANK_TANKCODE TANK_CODE, BASE_NAME,
                BAA_CODE ARM_CODE, BA_CODE_LNK BAY_CODE
            FROM BA_INJECTORS, PIPENODE ARM, PIPENODE METER, PIPENODE INJ, 
                PIPENODE TANK_NODE, STREAM_LINKS TANK_TO_INJ, STREAM_LINKS INJ_TO_MTR,
                BASE_PRODS, TANKS, BA_DEVICE, BA_ARMS, BAD_BA
            WHERE ARM.PN_TYPE = 8
                AND METER.PN_TYPE = 2
                AND INJ.PN_TYPE = 7
                AND TANK_NODE.PN_TYPE = 1
                AND TANK_TO_INJ.STREAM_LINK_UP = TANK_NODE.PN_ID
                AND TANK_TO_INJ.STREAM_LINK_DOWN = INJ.PN_ID
                AND INJ_TO_MTR.STREAM_LINK_UP = INJ.PN_ID
                AND INJ_TO_MTR.STREAM_LINK_DOWN = METER.PN_ID
                AND BA_INJECTORS.BAI_CODE = INJ.PN_INJ
                AND ARM.PN_STREAM = INJ.PN_STREAM
                AND TANK_NODE.PN_TANK_TANKCODE = TANK_CODE
                AND TANK_BASE = BASE_CODE
                AND BAA_CODE = ARM.PN_ARM
                AND BAA_BAD_LNK = BAD_PHYSCODE
                AND BAD_LNK = BAD_PHYSCODE
            ORDER BY BA_CODE_LNK, BAA_CODE, BAI_CODE";
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
}
