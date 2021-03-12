<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once __DIR__ . '/../service/tank_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class ProdMovement extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCT_MVMNTS';

    public $NUMBER_FIELDS = array(
        "PMV_INTENDED_QTY",
        "PMV_EXPCTD_DENS",
        "PMV_OBSVD_DENS",
        "PMV_OPENING_QTY",
        "PMV_MOVED_QTY",
        "PMV_OPEN_AMB",
        "OPEN_TEMP",
        "PMV_OPEN_COR",
        "PMV_OPEN_KG",
        "OPEN_DENSITY",
        "CLOSE_STD_TOT",
        "CLOSE_TEMP", 
        "CLOSE_AMB_TOT",
        "CLOSE_DENSITY",
        "TANK_LEVEL",
        "AVL_SUM",
        "CVL_SUM",
        "KG_SUM",
        "BAY_AVL_SUM",
        "BAY_CVL_SUM",
        "PERCENTAGE", 
        "PMV_NUMBER",
    );

    /*
        PMV_ROAD = 0,
        PMV_RAIL,
        PMV_MARINE,
        PMV_TANK,
        PMV_PIPELINE,
        PMV_REFINERY,
        PMV_N_TYPES
     */
    public function target_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_movement_types();
    }

    public function prodmvnt_classes()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_movement_classes();
    }

    /*
        PMV_NEW = 0,
        PMV_IN_PROGRESS,
        PMV_HALTED,
        PMV_COMPLETE,
        PMV_DOES_NOT_EXIST,
        PMV_N_STATUS
    */
    public function prodmvnt_states()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_movement_states();
    }

    public function tanks()
    {
        $serv = new TankService($this->conn);
        return $serv->tanks_by_base(isset($this->base_code) ? $this->base_code : null);
    }

    //op=206&h_PMV_NUMBER=2&pmvDepot=MOBPET&sess_id=GDyaQelbVjls
    public function start()
    {
        if (!isset($this->pmv_number)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: pmv_number not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        //Make sure it is a START or a RESUME
        $prod_start = false;
        $query = "
            SELECT PMV.PMV_STATUS
            FROM PRODUCT_MVMNTS PMV
            WHERE PMV_NUMBER = :pmv_number";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        } else {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            write_log($row["PMV_STATUS"], __FILE__, __LINE__);
            if ($row["PMV_STATUS"] == '0') {    //status was NEW
                $prod_start = true;
            }
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "pmvDepot=" . rawurlencode(strip_tags($site_code)) . 
            "&h_PMV_NUMBER=" . rawurlencode(strip_tags($this->pmv_number)) .
            "&op=206";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/prod_movement.cgi", $query_string);
        $op_pos = strpos($res, "op=");
        if (strpos($res, "op=") === false) {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $return_code = substr($res, $op_pos + 4, 3);
        write_log("CGI returns: " . $return_code, __FILE__, __LINE__);

        if ($return_code === "246") {
            $error = new EchoSchema(400, response("__PRODUCTMOVEMENT_START_FAIL3__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } else if ($return_code === "236") {
            $error = new EchoSchema(400, response("__PRODUCTMOVEMENT_START_FAIL2__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } else if ($return_code === "226") {
            $error = new EchoSchema(400, response("__PRODUCTMOVEMENT_START_FAIL__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if ($prod_start) {    //status was NEW
            write_log("Update readings", __FILE__, __LINE__);
            //Doing some copy
            $query = "
                SELECT TANK_COR_VOL,
                    TANK_AMB_VOL,
                    TANK_LIQUID_KG,
                    TANK_DENSITY,
                    TANK_TEMP,
                    TANK_PROD_LVL
                FROM TANKS
                WHERE TANK_CODE = (
                        SELECT DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE)
                        FROM PRODUCT_MVMNTS
                        WHERE PMV_NUMBER = :pmv_number
                    )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $tank_cor_vol = $row["TANK_COR_VOL"];
            $tank_amb_vol = $row["TANK_AMB_VOL"];
            $tank_liquid_kg = $row["TANK_LIQUID_KG"];
            $tank_density = $row["TANK_DENSITY"];
            $tank_temp = $row["TANK_TEMP"];
            $tank_prod_lvl = $row["TANK_PROD_LVL"];
            
            $query = "UPDATE PRODUCT_MVMNTS
                SET PMV_OPEN_AMB = :tank_amb_vol,
                    PMV_OPEN_COR = :tank_cor_vol,
                    PMV_OPEN_KG = :tank_liquid_kg,
                    PMV_TEMPERATURE = :tank_temp,
                    PMV_OBSVD_DENS = :tank_density,
                    PMV_OPEN_TANKLEVEL = :pmv_open_tanklevel
                WHERE PMV_NUMBER = :pmv_number";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
            oci_bind_by_name($stmt, ':tank_amb_vol', $tank_amb_vol);
            oci_bind_by_name($stmt, ':tank_cor_vol', $tank_cor_vol);
            oci_bind_by_name($stmt, ':tank_liquid_kg', $tank_liquid_kg);
            oci_bind_by_name($stmt, ':tank_temp', $tank_temp);
            oci_bind_by_name($stmt, ':tank_density', $tank_density);
            oci_bind_by_name($stmt, ':pmv_open_tanklevel', $tank_prod_lvl);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            }
        }
        
        $error = new EchoSchema(200, response("__PRODUCTMOVEMENT_STARTED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    //op=207&h_PMV_NUMBER=2&pmvDepot=MOBPET&sess_id=GDyaQelbVjls
    public function halt()
    {
        if (!isset($this->pmv_number)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: pmv_number not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "pmvDepot=" . rawurlencode(strip_tags($site_code)) . 
            "&h_PMV_NUMBER=" . rawurlencode(strip_tags($this->pmv_number)) .
            "&op=207";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/prod_movement.cgi", $query_string);
        if (strpos($res, "op=\"207\"") === false) {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        // write_log($res, __FILE__, __LINE__);

        $error = new EchoSchema(200, response("__PRODUCTMOVEMENT_HALTED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    /**
     * Delete
     * pmvDepot=CNS&h_PMV_NUMBER=8&h_PMV_BATCHCODE=cw2&h_PMV_STATUS=0&pg=1&preqstr=&op=203&sess_id=AmWKMUILowuv
     */
    public function delete() 
    {
        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "pmvDepot=" . $site_code . 
            "&h_PMV_NUMBER=" . rawurlencode(strip_tags($this->pmv_number)) . 
            "&h_PMV_BATCHCODE=" . rawurlencode(strip_tags($this->pmv_batchcode)) . 
            "&h_PMV_STATUS=0&pg=1&preqstr=&op=203";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/prod_movement.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);
        if (strpos($res, "op=\"203\"") === false) {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return true;
        }

        // write_log($res, __FILE__, __LINE__);

        $error = new EchoSchema(200, response("__PRODUCTMOVEMENT_CREATED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
        return false;
    }

    /**
     * Complete type:
     * preqstr=&newProductMovementNr=8&pmvDepot=CNS&addedType=3&base=100004&h_PMV_BATCHCODE=333&src=5&h_PMV_SRCCODE=444&dst=3&h_PMV_DSTCODE=A0430D&h_PMV_TRANS_TYPE=5&h_PMV_INTENDED_QTY=1234&QuantityScale=l&h_PMV_OPENING_QTY=1002&h_PMV_OBSVD_DENS=234&op=202&sess_id=AmWKMUILowuv
     * 
     * New Type:
     * preqstr=&newProductMovementNr=8&pmvDepot=CNS&addedType=0&base=100006&h_PMV_BATCHCODE=cw2&src=3&h_PMV_SRCCODE=SPARE&dst=5&h_PMV_DSTCODE=des%20unt&h_PMV_TRANS_TYPE=1&h_PMV_INTENDED_QTY=5000&QuantityScale=l&h_PMV_OPENING_QTY=0&h_PMV_OBSVD_DENS=0.0&op=202&sess_id=AmWKMUILowuv
     */
    public function create() 
    {
        if (!isset($this->pmv_number)) {
            $query = "SELECT NVL(MAX(PMV_NUMBER), 0) + 1 PMV_NUMBER FROM PRODUCT_MVMNTS";
            $stmt = oci_parse($this->conn, $query);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->pmv_number = $row['PMV_NUMBER'];
        }

        if (!isset($this->pmv_status)) {
            $this->pmv_status = 0;
        }

        if (!isset($this->pmv_unit)) {
            $this->pmv_unit = 28;
        }

        if (!isset($this->pmv_opening_qty)) {
            $this->pmv_opening_qty = 0;
        }

        if (!isset($this->pmv_obsvd_dens)) {
            $this->pmv_obsvd_dens = 0;
        }

        $unit = $this->pmv_unit == '17' ? 'kg' : 'liter';

        // write_log(json_encode($this), __FILE__, __LINE__);
        
        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "preqstr=&newProductMovementNr=" . $this->pmv_number . "&pmvDepot=" . $site_code . 
            "&addedType=" . rawurlencode(strip_tags($this->pmv_status)) . 
            "&base=" . rawurlencode(strip_tags($this->pmv_prdctlnk)) . 
            "&h_PMV_BATCHCODE=" . rawurlencode(strip_tags($this->pmv_batchcode)) . 
            "&src=" . rawurlencode(strip_tags($this->pmv_srctype)) . 
            "&h_PMV_SRCCODE=" . rawurlencode(strip_tags($this->pmv_srccode)) . 
            "&dst=" . rawurlencode(strip_tags($this->pmv_dsttype)) . 
            "&h_PMV_DSTCODE=" . rawurlencode(strip_tags($this->pmv_dstcode)) . 
            "&h_PMV_TRANS_TYPE=" . rawurlencode(strip_tags($this->pmv_trans_type)) . 
            "&h_PMV_INTENDED_QTY=" . rawurlencode(strip_tags($this->pmv_intended_qty)) . 
            "&QuantityScale=" . $unit .
            "&h_PMV_OPENING_QTY=" . rawurlencode(strip_tags($this->pmv_opening_qty)) . 
            "&h_PMV_OBSVD_DENS=" . rawurlencode(strip_tags($this->pmv_obsvd_dens)) . 
            "&op=202";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/prod_movement.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);
        if (strpos($res, "op=\"212\"") === false) {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return true;
        }

        // write_log($res, __FILE__, __LINE__);

        $error = new EchoSchema(200, response("__PRODUCTMOVEMENT_CREATED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
        return false;
    }

    /**
    * SCRIPT_NAME: /cgi-bin/en/stck_mgmt/prod_movement.cgi
    * REQUEST: op=208&h_PMV_NUMBER=14&pmvDepot=CNS&sess_id=qHjQvdidqaee
    */
    public function complete() 
    {
        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "pmvDepot=" . rawurlencode(strip_tags($site_code)) . 
            "&h_PMV_NUMBER=" . rawurlencode(strip_tags($this->pmv_number)) . "&op=208";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/prod_movement.cgi", $query_string);
        $op_pos = strpos($res, "op=");
        if (strpos($res, "op=") === false) {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $return_code = substr($res, $op_pos + 4, 2);
        write_log("CGI returns: " . $return_code, __FILE__, __LINE__);

        if ($return_code === "228") {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        //Doing some copy
        $query = "
            SELECT TANK_COR_VOL,
                TANK_AMB_VOL,
                TANK_LIQUID_KG,
                TANK_DENSITY,
                TANK_TEMP,
                TANK_PROD_LVL
            FROM TANKS
            WHERE TANK_CODE = (
                    SELECT DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE)
                    FROM PRODUCT_MVMNTS
                    WHERE PMV_NUMBER = :pmv_number
                )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $tank_cor_vol = $row["TANK_COR_VOL"];
        $tank_amb_vol = $row["TANK_AMB_VOL"];
        $tank_liquid_kg = $row["TANK_LIQUID_KG"];
        $tank_density = $row["TANK_DENSITY"];
        $tank_temp = $row["TANK_TEMP"];
        $tank_prod_lvl = $row["TANK_PROD_LVL"];

        $query = "UPDATE PRODUCT_MVMNTS
            SET PMV_CLOSE_AMB = :tank_amb_vol,
                PMV_CLOSE_COR = :tank_cor_vol,
                PMV_CLOSE_KG = :TANK_LIQUID_KG,
                PMV_CLOSE_TANKLEVEL = :pmv_open_tanklevel,
                PMV_CLOSE_TEMP = :tank_temp,
                PMV_CLOSE_DENS = :tank_dens
            WHERE PMV_NUMBER = :pmv_number";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
        oci_bind_by_name($stmt, ':tank_amb_vol', $tank_amb_vol);
        oci_bind_by_name($stmt, ':tank_cor_vol', $tank_cor_vol);
        oci_bind_by_name($stmt, ':tank_liquid_kg', $tank_liquid_kg);
        oci_bind_by_name($stmt, ':pmv_open_tanklevel', $tank_prod_lvl);
        oci_bind_by_name($stmt, ':tank_temp', $tank_temp);
        oci_bind_by_name($stmt, ':tank_dens', $tank_density);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        oci_commit($this->conn);
        $error = new EchoSchema(200, response("__PRODUCTMOVEMENT_COMPLETED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);

        return;
    }

    /**
     * pmvDepot=CNS&h_PMV_NUMBER=8&h_PMV_BATCHCODE=45&h_PMV_STATUS=3&pg=1&preqstr=&op=9&sess_id=AmWKMUILowuv
     */
    public function complete_batch() 
    {
        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "pmvDepot=" . $site_code . 
            "&h_PMV_NUMBER=" . rawurlencode(strip_tags($this->pmv_number)) . 
            "&h_PMV_BATCHCODE=" . rawurlencode(strip_tags($this->pmv_batchcode)) . 
            "&h_PMV_STATUS=3&pg=1&preqstr=&op=9";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/prod_movement.cgi", $query_string);
        $op_pos = strpos($res, "op=");
        if (strpos($res, "op=") === false) {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $return_code = substr($res, $op_pos + 4, 2);
        write_log("CGI returns: " . $return_code, __FILE__, __LINE__);

        if ($return_code === "19") {
            $error = new EchoSchema(400, response("__PRODUCTMOVEMENT_ALREADY_COMPLETED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } else if ($return_code === "39") {
            $error = new EchoSchema(400, response("__PRODUCTMOVEMENT_BATCH_COMPLETE_FAIL__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } 
        
        $error = new EchoSchema(200, response("__PRODUCTMOVEMENT_STARTED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);

        return;
    }

    // public function pre_create()
    // {
    //     // $query = "SELECT COUNT(*) CNT FROM PRODUCT_BATCH 
    //     //     WHERE PRB_BATCHCODE = :prb_batchcode";
    //     // $stmt = oci_parse($this->conn, $query);
    //     // oci_bind_by_name($stmt, ':prb_batchcode', $this->pmv_batchcode);
    //     // if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //     //     $e = oci_error($stmt);
    //     //     write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //     //     return false;
    //     // }

    //     // $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //     // if ((int)$row['CNT'] <= 0) {
    //     //     $query = "INSERT INTO PRODUCT_BATCH (PRB_BATCHCODE, PRB_STRT_DATE)
    //     //         VALUES (:prb_batchcode, SYSDATE)";
    //     //     $stmt = oci_parse($this->conn, $query);
    //     //     oci_bind_by_name($stmt, ':prb_batchcode', $this->pmv_batchcode);
    //     //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //     //         $e = oci_error($stmt);
    //     //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //     //         $err_msg = "DB error:" . $e['message'];
    //     //         return false;
    //     //     }
    //     // }

    //     if (!isset($this->pmv_number)) {
    //         $query = "SELECT NVL(MAX(PMV_NUMBER), 0) + 1 PMV_NUMBER FROM PRODUCT_MVMNTS";
    //         $stmt = oci_parse($this->conn, $query);
    //         if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //             $e = oci_error($stmt);
    //             write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //             return false;
    //         }

    //         $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //         $this->pmv_number = $row['PMV_NUMBER'];
    //     }

    //     if (!isset($this->pmv_status)) {
    //         $this->pmv_status = 0;
    //     }

    //     if (!isset($this->pmv_unit)) {
    //         $this->pmv_unit = 28;
    //     }

    //     if (!isset($this->pmv_opening_qty)) {
    //         $this->pmv_opening_qty = 0;
    //     }

    //     if (!isset($this->pmv_obsvd_dens)) {
    //         $this->pmv_obsvd_dens = 0;
    //     }

    //     return true;
    // }

    public function progress()
    {
        $query = "
            SELECT 
                PMV.PMV_NUMBER,
                PMV.PMV_SRC_TERMINAL,
                PMV.PMV_SRCTYPE,
                PMV_TYP1.PMV_NAME PMV_SRCTYPE_NAME,
                PMV.PMV_SRCCODE,
                PMV_UNIT,
                UNIT_SCALE_VW.DESCRIPTION PMV_UNIT_NAME,
                NVL(PMV_OPENING_QTY, 0) PMV_OPENING_QTY,
                PMV_INTENDED_QTY,
                NVL(PMV_MOVED_QTY, 0) PMV_MOVED_QTY,
                PMV_EXPCTD_DENS,
                PMV_OBSVD_DENS,
                PMV.PMV_DST_TERMINAL,
                PMV.PMV_DSTTYPE,
                PMV_TYP2.PMV_NAME PMV_DSTTYPE_NAME,
                PMV_TRANS_TYPE,
                PMV_TRANSFER_CLASS_NAME PMV_TRANS_TYPE_NAME,
                PMV.PMV_DSTCODE,
                PMV.PMV_PRDCTLNK,
                PMV.PMV_BATCHCODE,
                PMV.PMV_STATUS,
                PMV_STATE_TYP.PMV_STATE_NAME PMV_STATUS_NAME
            FROM PRODUCT_MVMNTS PMV, PMV_STATE_TYP, PMV_TYP PMV_TYP1, PMV_TYP PMV_TYP2, UNIT_SCALE_VW, PMV_TRANSFER_CLASS_TYP
            WHERE PMV_NUMBER= :pmv_number
                AND PMV.PMV_STATUS = PMV_STATE_TYP.PMV_STATE_ID
                AND PMV_SRCTYPE = PMV_TYP1.PMV_ID
                AND PMV_DSTTYPE = PMV_TYP2.PMV_ID
                AND PMV_UNIT = UNIT_ID
                AND PMV_TRANS_TYPE = PMV_TRANSFER_CLASS_TYP.PMV_TRANSFER_CLASS_ID
            ORDER BY NVL(PMV.PMV_DATE2, SYSDATE) DESC, PMV.PMV_STATUS DESC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
        if (oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }

    public function read()
    {
        $query = "
            SELECT 
                PMV.PMV_NUMBER,
                PMV.PMV_SRC_TERMINAL,
                PMV.PMV_SRCTYPE,
                PMV_TYP1.PMV_NAME PMV_SRCTYPE_NAME,
                PMV.PMV_SRCCODE,
                PMV_UNIT,
                UNIT_SCALE_VW.DESCRIPTION PMV_UNIT_NAME,
                PMV_INTENDED_QTY,
                PMV_OPENING_QTY,
                PMV_MOVED_QTY,
                ROUND(DECODE(PMV_INTENDED_QTY, 0, 0, PMV_MOVED_QTY / PMV_INTENDED_QTY) * 100, 2) PERCENTAGE,
                PMV_EXPCTD_DENS,
                PMV_OBSVD_DENS,
                PMV.PMV_DST_TERMINAL,
                PMV.PMV_DSTTYPE,
                PMV_TYP2.PMV_NAME PMV_DSTTYPE_NAME,
                PMV_TRANS_TYPE,
                PMV_TRANSFER_CLASS_NAME PMV_TRANS_TYPE_NAME,
                PMV.PMV_DSTCODE,
                PMV.PMV_PRDCTLNK,
                PMV.PMV_BATCHCODE,
                PMV.PMV_STATUS,
                PMV_STATE_TYP.PMV_STATE_NAME PMV_STATUS_NAME
            FROM PRODUCT_MVMNTS PMV, PMV_STATE_TYP, PMV_TYP PMV_TYP1, PMV_TYP PMV_TYP2, UNIT_SCALE_VW, PMV_TRANSFER_CLASS_TYP
            WHERE PMV.PMV_STATUS = PMV_STATE_TYP.PMV_STATE_ID(+)
                AND PMV_SRCTYPE = PMV_TYP1.PMV_ID
                AND PMV_DSTTYPE = PMV_TYP2.PMV_ID
                AND PMV_UNIT = UNIT_ID(+)
                AND PMV_TRANS_TYPE = PMV_TRANSFER_CLASS_TYP.PMV_TRANSFER_CLASS_ID ";
        if (isset($this->start_date) && $this->start_date != -1 && $this->start_date != '-1') {
            $query .= "
                AND PMV_DATE1 > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')
            ";
        }
        if (isset($this->end_date) && $this->end_date != -1 && $this->end_date != '-1') {
            $query .= "
                AND PMV_DATE1 < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS')
            ";
        }

        $query .= "ORDER BY NVL(PMV.PMV_DATE2, SYSDATE) DESC, PMV.PMV_STATUS DESC";

        $stmt = oci_parse($this->conn, $query);
        if (isset($this->start_date) && $this->start_date != -1 && $this->start_date != '-1') {
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
        }
        if (isset($this->end_date) && $this->end_date != -1 && $this->end_date != '-1') {
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_decorate(&$result_array)
    {
        /**
         * If SITE_PRODUCT_MVMNTS_LITER == AMB, use 
         * DECODE(PMV_SRCTYPE, 3, 
         *      PMV_OPEN_AMB - DECODE(PMV_STATUS, 3, PMV_CLOSE_AMB, TANK_AMB_VOL) - NVL(LOADED_AVL, 0), 
         *      DECODE(PMV_STATUS, 3, PMV_CLOSE_AMB, TANK_AMB_VOL) - PMV_OPEN_AMB + NVL(LOADED_AVL, 0))
         * as product movement quantity. 
         * This is a Green Energy request. Normally, use PMV_MOVED_QTY, but for UK, there might be loadings
         * during a product movement duration. On the other hand, PMV_MOVED_QTY is done inside tpmman, it is
         * using STD (
         * Pmv_update_tank_pmvs {
         *      ...
         *      Pmv_qty_set_double( pmv_num, diff_in_units, diff_stdltr, COR_LITRE);
         *      ...
         * }
         * But Green Enery wants AMB, so use a SITE_CONFIG SITE_PRODUCT_MVMNTS_LITER.
         */
        $movement_liter_unit = 'STD';
        $query = "SELECT CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_PRODUCT_MVMNTS_LITER'";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row && $row["CONFIG_VALUE"] === 'AMB') {
            $movement_liter_unit = 'AMB';
        }

        foreach ($result_array as $i => $pmv) {
            $result_array[$i]['bay_avl_sum'] = 0;
            $result_array[$i]['bay_cvl_sum'] = 0;
            
            $query = "
            SELECT PMV_UNIT, 
                DECODE(PMV_SRCTYPE, 3, 
                    PMV_OPEN_AMB - DECODE(PMV_STATUS, 3, PMV_CLOSE_AMB, TANK_AMB_VOL) + NVL(LOADED_AVL, 0), 
                    DECODE(PMV_STATUS, 3, PMV_CLOSE_AMB, TANK_AMB_VOL) - PMV_OPEN_AMB + NVL(LOADED_AVL, 0)) AVL_SUM,
                DECODE(PMV_SRCTYPE, 3, 
                    PMV_OPEN_COR - DECODE(PMV_STATUS, 3, PMV_CLOSE_COR, TANK_COR_VOL) + NVL(LOADED_CVL, 0), 
                    DECODE(PMV_STATUS, 3, PMV_CLOSE_COR, TANK_COR_VOL) - PMV_OPEN_COR + NVL(LOADED_CVL, 0)) CVL_SUM,
                DECODE(PMV_SRCTYPE, 3, 
                    PMV_OPEN_KG - DECODE(PMV_STATUS, 3, PMV_CLOSE_KG, TANK_LIQUID_KG) + NVL(LOADED_KG, 0), 
                    DECODE(PMV_STATUS, 3, PMV_CLOSE_KG, TANK_LIQUID_KG) - PMV_OPEN_KG + NVL(LOADED_KG, 0)) KG_SUM
            FROM PRODUCT_MVMNTS, 
            (
                SELECT NVL(SUM(DECODE(TRSB_UNT, 34, TRSB_AVL / 1000, TRSB_AVL)), 0) LOADED_AVL,
                    NVL(SUM(DECODE(TRSB_UNT, 34, TRSB_CVL / 1000, TRSB_CVL)), 0) LOADED_CVL,
                    NVL(SUM(TRSB_KG), 0) LOADED_KG,
                    DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE) TANK_CODE,
                    PMV_NUMBER
                FROM TRANBASE, TRANSFERS, TRANSACTIONS, PRODUCT_MVMNTS
                WHERE TRSB_ID_TRSF_ID = TRSF_ID AND TRSB_ID_TRSF_TRM = TRSF_TERMINAL
                    AND TRSFTRID_TRSA_ID = TRSA_ID AND TRSFTRID_TRSA_TRM = TRSA_TERMINAL
                    AND PMV_NUMBER = :pmv_number
                    AND TRSA_ED_DMY > NVL(PMV_DATE1, SYSDATE)
                    AND TRSA_ED_DMY < NVL(PMV_DATE2, SYSDATE)
                    AND TRSB_TK_TANKCODE = DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE)
                GROUP BY PMV_SRCTYPE, PMV_SRCCODE, PMV_DSTCODE, PMV_NUMBER
            ) LOADED,
            (
                SELECT TANK_COR_VOL,
                    TANK_AMB_VOL,
                    TANK_LIQUID_KG,
                    TANK_DENSITY,
                    TANK_TEMP,
                    TANK_PROD_LVL
                FROM TANKS
                WHERE TANK_CODE = (
                        SELECT DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE)
                        FROM PRODUCT_MVMNTS
                        WHERE PMV_NUMBER = :pmv_number
                    )
            ) TANK_INFO
            WHERE PRODUCT_MVMNTS.PMV_NUMBER = :pmv_number
                AND PRODUCT_MVMNTS.PMV_NUMBER = LOADED.PMV_NUMBER(+)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':pmv_number', $pmv['pmv_number']);
            if (!oci_execute($stmt, $this->commit_mode)) {
                return;
            } 
            
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if ($row) {
                if ($row['PMV_UNIT'] == 17 /* KG */) {
                    $produce_moved = floatval($row['KG_SUM']);
                } else if ($movement_liter_unit === 'AMB') {
                    $produce_moved = floatval($row['AVL_SUM']);
                } else {
                    $produce_moved = floatval($row['CVL_SUM']);
                }

                // $result_array[$i]['bay_avl_sum'] = floatval($row['BAY_AVL_SUM']);
                // $result_array[$i]['bay_cvl_sum'] = floatval($row['BAY_CVL_SUM']);
                $result_array[$i]['percentage'] = 
                    round(($produce_moved) * 100 / floatval($result_array[$i]['pmv_intended_qty']), 2);
            }
        }
    }

    public function start_folio()
    {
        $query = "
            SELECT CLOSEOUT_NR, 
                DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE) TANK_CODE, 
                PMV_OPEN_COR, 
                PMV_TEMPERATURE OPEN_TEMP, 
                PMV_OPEN_AMB,
                PMV_OPEN_KG,
                PMV_OBSVD_DENS OPEN_DENSITY, 
                PMV_DATE1, 
                PMV_OPEN_TANKLEVEL TANK_LEVEL
            FROM PRODUCT_MVMNTS, 
                (SELECT CLOSEOUT_NR, PMV_NUMBER FROM CLOSEOUTS, PRODUCT_MVMNTS
                WHERE PMV_NUMBER = :pmv_number
                AND PMV_DATE1 > PREV_CLOSEOUT_DATE AND (PMV_DATE1 < CLOSEOUT_DATE OR CLOSEOUT_DATE IS NULL)) TMP
            WHERE PRODUCT_MVMNTS.PMV_NUMBER = :pmv_number AND PRODUCT_MVMNTS.PMV_NUMBER = TMP.PMV_NUMBER(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function bay_loaded()
    {
        if (!isset($this->pmv_number)) {
            return null;
        }

        $query = "
            SELECT PMV_TANK.TANK_CODE, 
                NVL(AVL_SUM, 0) BAY_AVL_SUM, 
                NVL(CVL_SUM, 0) BAY_CVL_SUM,
                NVL(KG_SUM, 0) BAY_KG_SUM
            FROM
            (
                SELECT DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE) TANK_CODE FROM PRODUCT_MVMNTS WHERE PMV_NUMBER = :pmv_number
            ) PMV_TANK,
            (
                SELECT NVL(SUM(DECODE(TRSB_UNT, 34, TRSB_AVL / 1000, TRSB_AVL)), 0) AVL_SUM,
                    NVL(SUM(DECODE(TRSB_UNT, 34, TRSB_CVL / 1000, TRSB_CVL)), 0) CVL_SUM,
                    NVL(SUM(TRSB_KG), 0) KG_SUM,
                    DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE) TANK_CODE
                FROM TRANBASE, TRANSFERS, TRANSACTIONS, PRODUCT_MVMNTS
                WHERE TRSB_ID_TRSF_ID = TRSF_ID AND TRSB_ID_TRSF_TRM = TRSF_TERMINAL
                    AND TRSFTRID_TRSA_ID = TRSA_ID AND TRSFTRID_TRSA_TRM = TRSA_TERMINAL
                    AND PMV_NUMBER = :pmv_number
                    AND TRSA_ED_DMY > NVL(PMV_DATE1, SYSDATE)
                    AND TRSA_ED_DMY < NVL(PMV_DATE2, SYSDATE)
                    AND TRSB_TK_TANKCODE = DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE)
                GROUP BY PMV_SRCTYPE, PMV_SRCCODE, PMV_DSTCODE
            ) LOAD_INFO
            WHERE PMV_TANK.TANK_CODE = LOAD_INFO.TANK_CODE (+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function end_folio()
    {
        $query = "
            SELECT CLOSEOUT_NR, 
                DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE) TANK_CODE, 
                DECODE(PMV_STATUS, 3, PMV_CLOSE_COR, TANK_COR_VOL) PMV_CLOSE_COR, 
                DECODE(PMV_STATUS, 3, PMV_CLOSE_TEMP, TANK_TEMP) CLOSE_TEMP, 
                DECODE(PMV_STATUS, 3, PMV_CLOSE_AMB, TANK_AMB_VOL) PMV_CLOSE_AMB,
                DECODE(PMV_STATUS, 3, PMV_CLOSE_KG, TANK_LIQUID_KG) PMV_CLOSE_KG,
                DECODE(PMV_STATUS, 3, PMV_CLOSE_DENS, TANK_DENSITY) CLOSE_DENSITY, 
                PMV_DATE2, 
                DECODE(PMV_STATUS, 3, PMV_CLOSE_TANKLEVEL, TANK_PROD_LVL) TANK_LEVEL,
                DECODE(PMV_SRCTYPE, 3, 
                    PMV_OPEN_AMB - DECODE(PMV_STATUS, 3, PMV_CLOSE_AMB, TANK_AMB_VOL) + NVL(LOADED_AVL, 0), 
                    DECODE(PMV_STATUS, 3, PMV_CLOSE_AMB, TANK_AMB_VOL) - PMV_OPEN_AMB + NVL(LOADED_AVL, 0)) AVL_SUM,
                DECODE(PMV_SRCTYPE, 3, 
                    PMV_OPEN_COR - DECODE(PMV_STATUS, 3, PMV_CLOSE_COR, TANK_COR_VOL) + NVL(LOADED_CVL, 0), 
                    DECODE(PMV_STATUS, 3, PMV_CLOSE_COR, TANK_COR_VOL) - PMV_OPEN_COR + NVL(LOADED_CVL, 0)) CVL_SUM,
                DECODE(PMV_SRCTYPE, 3, 
                    PMV_OPEN_KG - DECODE(PMV_STATUS, 3, PMV_CLOSE_KG, TANK_LIQUID_KG) + NVL(LOADED_KG, 0), 
                    DECODE(PMV_STATUS, 3, PMV_CLOSE_KG, TANK_LIQUID_KG) - PMV_OPEN_KG + NVL(LOADED_KG, 0)) KG_SUM
            FROM PRODUCT_MVMNTS, 
            (
                SELECT CLOSEOUT_NR, PMV_NUMBER FROM CLOSEOUTS, PRODUCT_MVMNTS
                WHERE PMV_NUMBER = :pmv_number
                AND PMV_DATE2 > PREV_CLOSEOUT_DATE AND PMV_DATE2 < NVL(CLOSEOUT_DATE, SYSDATE)
            ) TMP,
            (
                SELECT NVL(SUM(DECODE(TRSB_UNT, 34, TRSB_AVL / 1000, TRSB_AVL)), 0) LOADED_AVL,
                    NVL(SUM(DECODE(TRSB_UNT, 34, TRSB_CVL / 1000, TRSB_CVL)), 0) LOADED_CVL,
                    NVL(SUM(TRSB_KG), 0) LOADED_KG,
                    DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE) TANK_CODE,
                    PMV_NUMBER
                FROM TRANBASE, TRANSFERS, TRANSACTIONS, PRODUCT_MVMNTS
                WHERE TRSB_ID_TRSF_ID = TRSF_ID AND TRSB_ID_TRSF_TRM = TRSF_TERMINAL
                    AND TRSFTRID_TRSA_ID = TRSA_ID AND TRSFTRID_TRSA_TRM = TRSA_TERMINAL
                    AND PMV_NUMBER = :pmv_number
                    AND TRSA_ED_DMY > NVL(PMV_DATE1, SYSDATE)
                    AND TRSA_ED_DMY < NVL(PMV_DATE2, SYSDATE)
                    AND TRSB_TK_TANKCODE = DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE)
                GROUP BY PMV_SRCTYPE, PMV_SRCCODE, PMV_DSTCODE, PMV_NUMBER
            ) LOADED,
            (
                SELECT TANK_COR_VOL,
                    TANK_AMB_VOL,
                    TANK_LIQUID_KG,
                    TANK_DENSITY,
                    TANK_TEMP,
                    TANK_PROD_LVL
                FROM TANKS
                WHERE TANK_CODE = (
                        SELECT DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE)
                        FROM PRODUCT_MVMNTS
                        WHERE PMV_NUMBER = :pmv_number
                    )
            ) TANK_INFO
            WHERE PRODUCT_MVMNTS.PMV_NUMBER = :pmv_number
                AND PRODUCT_MVMNTS.PMV_NUMBER = TMP.PMV_NUMBER(+)
                AND PRODUCT_MVMNTS.PMV_NUMBER = LOADED.PMV_NUMBER(+)";
        // $query = "
        //     SELECT CLOSEOUTS.CLOSEOUT_NR, 
        //         DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE) TANK_CODE, 
        //         PMV_CLOSE_COR, 
        //         PMV_CLOSE_TEMP CLOSE_TEMP, 
        //         PMV_CLOSE_AMB,
        //         PMV_CLOSE_DENS CLOSE_DENSITY, 
        //         PREV_CLOSEOUT_DATE, 
        //         PMV_CLOSE_TANKLEVEL TANK_LEVEL
        //     FROM PRODUCT_MVMNTS, CLOSEOUTS
        //     WHERE PMV_NUMBER = :pmv_number
        //         AND PMV_DATE2 > PREV_CLOSEOUT_DATE AND PMV_DATE2 < CLOSEOUT_DATE";
        // $query = "
        //     SELECT CLOSEOUTS.CLOSEOUT_NR, 
        //         TANK_CODE, 
        //         CLOSE_STD_TOT, 
        //         CLOSE_TEMP, 
        //         CLOSE_AMB_TOT,
        //         CLOSE_DENSITY, 
        //         PREV_CLOSEOUT_DATE, 
        //         TANK_LEVEL
        //     FROM PRODUCT_MVMNTS, CLOSEOUTS, CLOSEOUT_TANK
        //     WHERE PMV_NUMBER = :pmv_number
        //         AND PMV_DATE2 > PREV_CLOSEOUT_DATE AND PMV_DATE2 < CLOSEOUT_DATE
        //         AND CLOSEOUTS.CLOSEOUT_NR = CLOSEOUT_TANK.CLOSEOUT_NR
        //         AND DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE) = TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    /**
        Old implementation is in prod_movement.pc. Check https://dev.diamondkey.com/browse/OM5K-8428 for details
        EXEC SQL DECLARE batch_cur CURSOR FOR
        SELECT
            PMV.PMV_NUMBER,
            PMV.PMV_SRC_TERMINAL,
            PMV.PMV_SRCTYPE,
            PMV.PMV_SRCCODE,
            PMV.PMV_DST_TERMINAL,
            PMV_MOVED_QTY,
            PMV.PMV_DSTTYPE,
            PMV.PMV_DSTCODE,
            PMV.PMV_PRDCTLNK,
            PMV.PMV_BATCHCODE,
            UPPER(ML.MESSAGE),
            PMV.PMV_STATUS
        FROM PRODUCT_MVMNTS PMV, ENUMITEM EI, MSG_LOOKUP ML
        WHERE
            (PMV.PMV_SRC_TERMINAL = :g_pmvDepot OR PMV.PMV_DST_TERMINAL = :g_pmvDepot)
            AND PMV.PMV_STATUS = EI.ENUM_NO
            AND EI.ENUM_TMM = ML.MSG_ID
            AND EI.ENUMTYPENAME = 'PMV_STATE'
            AND ML.LANG_ID = :o_LANG_ID
            AND PMV_BATCHCODE = :o_PMV_BATCHCODE AND PMV_STATUS = 3
            ORDER BY NVL(PMV.PMV_DATE2,SYSDATE) DESC, PMV.PMV_NUMBER DESC;
    */
    public function progress_table()
    {
        //PMV_STATUS == 3 means COMPLETE
        $query = "
            SELECT PMV.PMV_NUMBER,
                PMV.PMV_SRC_TERMINAL,
                PMV.PMV_SRCTYPE,
                PMV.PMV_SRCCODE,
                PMV.PMV_DST_TERMINAL,
                PMV_MOVED_QTY,
                PMV.PMV_DSTTYPE,
                PMV.PMV_DSTCODE,
                PMV.PMV_PRDCTLNK,
                PMV.PMV_BATCHCODE,
                PMV_STATE_NAME PMV_STATUS_NAME,
                PMV.PMV_STATUS
            FROM PRODUCT_MVMNTS PMV, PMV_STATE_TYP
            WHERE PMV.PMV_STATUS = PMV_STATE_TYP.PMV_STATE_ID
                AND PMV_BATCHCODE = :pmv_batchcode AND PMV_STATUS = 3
            ORDER BY NVL(PMV.PMV_DATE2, SYSDATE) DESC, PMV.PMV_NUMBER DESC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_batchcode', $this->pmv_batchcode);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
