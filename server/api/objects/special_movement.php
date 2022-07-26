<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/manual_trans_service.php';
include_once __DIR__ . '/../service/specialmv_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class SpecialMovement extends CommonClass
{
    protected $TABLE_NAME = 'MOV_LOAD_ITEMS';
    protected $VIEW_NAME = 'MOV_LOAD_ITEMS';
    public $NUMBER_FIELDS = array(
        "MLITM_QTY_AMB",
        "MLITM_QTY_COR",
        "MLITM_QTY_KG",
        "MLITM_TEMP_AMB",
        "MLITM_TEMP_COR",
        "MLITM_DENS_COR"
    );

    public function search()
    {
        if (isset($this->mlitm_id)) {
            $mlitm_id = '%' . $this->mlitm_id . '%';
        } else {
            $mlitm_id = '%';
        }

        $query = "
            SELECT MLITM_ID, 
                MLITM_TERMINAL, 
                MLITM_MOV_NUM, 
                MLITM_TYPE, 
                MOVITEM_TYPE_NAME MLITM_TYPE_NAME,
                MLITM_PRODCODE, 
                MLITM_TANKCODE, 
                MLITM_QTY_AMB, 
                MLITM_MOV_TYPE, 
                MLITM_MOV_KEY,
                MLITM_UNIT_AMB, 
                MLITM_TEMP_AMB, 
                MLITM_TMPUNIT_AMB, 
                MLITM_DENS_COR, 
                MLITM_DNSUNIT_COR, 
                MLITM_DTIM_START, 
                MLITM_REASON_CODE,  
                MR_ACTION MLITM_REASON,
                MLITM_TANKDEPO, 
                MLITM_PRODCMPY_TO, 
                MLITM_PRODCMPY, 
                MLITM_TANKDEPO_TO, 
                MLITM_PRODCODE_TO, 
                MLITM_TANKCODE_TO, 
                MLITM_QTY_COR, 
                MLITM_QTY_KG, 
                MLITM_UNIT_COR, 
                MLITM_TEMP_COR, 
                MLITM_TMPUNIT_COR,  
                MLITM_QTY_RPT, 
                MLITM_UNIT_RPT, 
                MLITM_STATUS, 
                DECODE(MLITM_STATUS, 0, 'Entering', 5, 'Completed', 9, 'Reversed', 'Invalid') MV_STATUS_NAME2,
                SPECIAL_MOVSTATUS_TYPE_NAME   as MV_STATUS_NAME,
                MLITM_DTIM_POSTED, 
                MLITM_OPER_POSTED, 
                MLITM_COMMENT 
            FROM " . $this->VIEW_NAME . ", MOVITEM_TYPES, MOV_REASONS, SPECIAL_MOVSTATUS_TYPE
            WHERE MLITM_TYPE = MOVITEM_TYPES.MOVITEM_TYPE_ID (+)
                AND MLITM_REASON_CODE = MOV_REASONS.MR_ID(+)
                AND DECODE(MLITM_STATUS, 0, 0, 5, 1, 9, 2, MLITM_STATUS) = SPECIAL_MOVSTATUS_TYPE.SPECIAL_MOVSTATUS_TYPE_ID(+)
                AND MLITM_ID LIKE :mlitm_id ";
        $stmt = oci_parse($this->conn, $query);

        if (isset($this->mlitm_status)) {
            $query = $query . " AND MLITM_STATUS = :status";
        }

        if (isset($this->start_date) && isset($this->end_date)) {
            $query = $query . " AND MLITM_DTIM_START > :start_date AND MLITM_DTIM_START < :end_date";
        }

        if (isset($this->mlitm_type)) {
            $query = $query . " AND MLITM_TYPE = :mvtype";
        }

        if (isset($this->mlitm_reason_code)) {
            $query = $query . " AND MLITM_REASON_CODE = :reason";
        }

        if (isset($this->mlitm_prodcmpy)) {
            $query = $query . " AND (MLITM_PRODCMPY = :plant OR MLITM_PRODCMPY_TO = :plant)";
        }

        $query = $query . " ORDER BY MLITM_DTIM_START DESC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $mlitm_id);

        if (isset($this->mlitm_status)) {
            oci_bind_by_name($stmt, ':status', $this->mlitm_status);
        }

        if (isset($this->start_date) && isset($this->end_date)) {
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }

        if (isset($this->mlitm_type)) {
            oci_bind_by_name($stmt, ':mvtype', $this->mlitm_type);
        }

        if (isset($this->mlitm_reason_code)) {
            oci_bind_by_name($stmt, ':reason', $this->mlitm_reason_code);
        }

        if (isset($this->mlitm_prodcmpy)) {
            oci_bind_by_name($stmt, ':plant', $this->mlitm_prodcmpy);
       }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read()
    {
        $query = "
            SELECT MLITM_ID, 
                MLITM_TERMINAL, 
                MLITM_MOV_NUM, 
                MLITM_TYPE, 
                MOVITEM_TYPE_NAME MLITM_TYPE_NAME,
                MLITM_PRODCODE, 
                MLITM_TANKCODE, 
                MLITM_QTY_AMB, 
                MLITM_MOV_TYPE, 
                MLITM_MOV_KEY,
                MLITM_UNIT_AMB, 
                MLITM_TEMP_AMB, 
                MLITM_TMPUNIT_AMB, 
                MLITM_DENS_COR, 
                MLITM_DNSUNIT_COR, 
                MLITM_DTIM_START, 
                MLITM_REASON_CODE,  
                MR_ACTION MLITM_REASON,
                MLITM_TANKDEPO, 
                MLITM_PRODCMPY_TO, 
                MLITM_PRODCMPY, 
                MLITM_TANKDEPO_TO, 
                MLITM_PRODCODE_TO, 
                MLITM_TANKCODE_TO, 
                MLITM_QTY_COR, 
                MLITM_QTY_KG, 
                MLITM_UNIT_COR, 
                MLITM_TEMP_COR, 
                MLITM_TMPUNIT_COR,  
                MLITM_QTY_RPT, 
                MLITM_UNIT_RPT, 
                MLITM_STATUS, 
                DECODE(MLITM_STATUS, 0, 'Entering', 5, 'Completed', 9, 'Reversed', 'Invalid') MV_STATUS_NAME2,
                SPECIAL_MOVSTATUS_TYPE_NAME   as MV_STATUS_NAME,
                MLITM_DTIM_POSTED, 
                MLITM_OPER_POSTED, 
                MLITM_COMMENT 
            FROM " . $this->VIEW_NAME . ", MOVITEM_TYPES, MOV_REASONS, SPECIAL_MOVSTATUS_TYPE
            WHERE MLITM_TYPE = MOVITEM_TYPES.MOVITEM_TYPE_ID (+)
                AND MLITM_REASON_CODE = MOV_REASONS.MR_ID(+)
                AND DECODE(MLITM_STATUS, 0, 0, 5, 1, 9, 2, MLITM_STATUS) = SPECIAL_MOVSTATUS_TYPE.SPECIAL_MOVSTATUS_TYPE_ID(+)
        ";
        if (isset($this->start_date) && $this->start_date != -1 && $this->start_date != '-1') {
            $query .= "
                AND MLITM_DTIM_START > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')
            ";
        }
        if (isset($this->end_date) && $this->end_date != -1 && $this->end_date != '-1') {
            $query .= "
                AND MLITM_DTIM_START < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS')
            ";
        }
        $query .= "
            ORDER BY MLITM_DTIM_START DESC
        ";
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

    public function next_id()
    {
        $query = "SELECT NVL(MAX(MLITM_ID), 0) + 1 NEXT_ID FROM MOV_LOAD_ITEMS";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pre_create()
    {
        $query = "SELECT NVL(MAX(MLITM_ID), 0) + 1 NEXT_ID FROM MOV_LOAD_ITEMS";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $this->mlitm_id = $row['NEXT_ID'];
        // $this->mlitm_dtim_posted = date('Y-m-d H:i:s', time());
        $this->mlitm_oper_posted = Utilities::getCurrPsn();

        $this->mlitm_mov_num  = $row['NEXT_ID'];
        $this->mlitm_status = "0";
        if (!isset($this->mlitm_dtim_end)) {
            $this->mlitm_dtim_end = $this->mlitm_dtim_start;
        }
    }

    protected function post_create()
    {
        $query = "UPDATE MOV_LOAD_ITEMS SET MLITM_DTIM_POSTED = SYSDATE WHERE MLITM_ID = :mlitm_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            // $error = new EchoSchema(500, response("__INTERNAL_ERROR__", "Internal Error: " . $e['message']));
            // echo json_encode($error, JSON_PRETTY_PRINT);
            false;
        };

        return true;
    }

    public function pre_update()
    {
        // $this->mlitm_dtim_posted = date('Y-m-d H:i:s', time());
        $this->mlitm_oper_posted = Utilities::getCurrPsn();
    }

    protected function post_update()
    {
        return $this->post_create();
    }

    public function mv_status() 
    {
        $query = "
            SELECT 0 MLITM_STATUS,
                'Entering' MV_STATUS_NAME
            FROM DUAL
            UNION 
            SELECT 5 MLITM_STATUS,
                'Completed' MV_STATUS_NAME
            FROM DUAL
            UNION 
            SELECT 9 MLITM_STATUS,
                'Reversed' MV_STATUS_NAME
            FROM DUAL";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function mv_reasons() 
    {
        if (isset($this->mr_type)) {
            $query = "SELECT MR_ID, MR_ACTION, MR_TYPE
                FROM MOV_REASONS 
                WHERE MR_TYPE = :mr_type
                ORDER BY MR_ID";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':mr_type', $this->mr_type);
        } else {
            $query = "SELECT MR_ID, MR_ACTION, MR_TYPE
                FROM MOV_REASONS 
                ORDER BY MR_ID";
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

    //Old php: amfservices\core\collections\dmSpecialMovements.php::reverseSpecialMovement
    //         classes\ReverseTransaction.class.php::do_specmov_reverse
    public function reverse()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        if (!isset($this->mlitm_id)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: mlitm_id not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query = "SELECT COUNT(*) CN 
            FROM MOV_SCHD_ITEMS, MOV_LOAD_ITEMS 
            WHERE MSITM_MOVEID = MLITM_MOV_ID  AND MSITM_MOVITEM = MLITM_MOV_LINE AND MLITM_ID = :mlitm_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] > 2 || $row['CN'] <= 0) {
            $error = new EchoSchema(500, response("__INVALID_SPECIAL_MOVEMENT__",
                sprintf("There are %d schedules in this special movment", $row['CN'])));
            echo json_encode($error, JSON_PRETTY_PRINT);
            write_log(sprintf("There are %d schedules in this special movment", $row['CN']), __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "SELECT MSITM_SHLSTRIP, MSITM_SHLSSUPP 
            FROM MOV_SCHD_ITEMS, MOV_LOAD_ITEMS 
            WHERE MSITM_MOVEID = MLITM_MOV_ID  AND MSITM_MOVITEM = MLITM_MOV_LINE AND MLITM_ID = :mlitm_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $serv = new ManualTransactionService($this->conn);
            $serv->trip_no = $row['MSITM_SHLSTRIP'];
            $serv->supplier = $row['MSITM_SHLSSUPP'];
            $error_msg = null;

            //Pair schedule will be reversed inside baiman
            $reverse_reesult = $serv->reverse_trip($error_msg);
            if ($reverse_reesult != ReverseResult::SUCCESS && 
                $reverse_reesult != ReverseResult::ALREADY_REVERSED) {
                if ($error_msg) {
                    $error = new EchoSchema(500, response("__INTERNAL_ERROR__", "Internal Error: " . $error_msg));
                } else {
                    $error = new EchoSchema(500, response("__INTERNAL_ERROR__"));
                }
                
                echo json_encode($error, JSON_PRETTY_PRINT);
                write_log("reverse_trip failed", __FILE__, __LINE__, LogLevel::ERROR);
                return;
            }
        }

        $query = "UPDATE MOV_LOAD_ITEMS SET MLITM_STATUS = 9 WHERE MLITM_ID = :mlitm_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__INTERNAL_ERROR__", "Internal Error: " . $e['message']));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query = "UPDATE MOV_LOAD_ITEMS SET MLITM_DTIM_POSTED = SYSDATE WHERE MLITM_ID = :mlitm_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__INTERNAL_ERROR__", "Internal Error: " . $e['message']));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        };

        //SCRIPT_NAME: /cgi-bin/en/spcl_mvment.cgi (HOST message thingy) REQUEST: user_id=9999&spclmnt_no=2698
        $query_string = "user_id=" . rawurlencode(strip_tags(Utilities::getCurrPsn())) . 
            "&spclmnt_no=" . rawurlencode(strip_tags($this->mlitm_id));
        $cgi_response = Utilities::http_cgi_invoke("cgi-bin/en/spcl_mvment.cgi", $query_string);
        write_log($cgi_response, __FILE__, __LINE__);
        if ($cgi_response === false) {
            $e = error_get_last();
            write_log($e['message'], __FILE__, __LINE__);
        }

        $error = new EchoSchema(200, response("__SPECIAL_MOVEMENT_REVERSED__",
            sprintf("Special movment %d has been reversed", $this->mlitm_id)));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    public function tanks()
    {
        $query = "SELECT TK.TANK_CODE, 
            TK.TANK_DENSITY, 
            TK.TANK_TEMP, 
            TK.TANK_NAME, 
            TL.TERM_CODE,  
            TL.TERM_NAME,
            DP.PROD_CMPY, 
            DP.PROD_CODE, 
            DP.PROD_NAME, 
            BP.BASE_CODE, 
            BP.BASE_NAME, 
            PR.RATIO_VALUE, 
            PR.RAT_PROD_PRODCODE,
            BS.BCLASS_DESC,
            BS.BCLASS_NO,
            BS.BCLASS_DENS_LO,
            BS.BCLASS_DENS_HI,
            BS.BCLASS_TEMP_LO,
            BS.BCLASS_TEMP_HI,
            BS.BCLASS_VCF_ALG					
        FROM PRODUCTS DP, RPTOBJ_PROD_RATIOS_VW PR, BASE_PRODS BP, TANKS TK, TERMINAL TL, BASECLASS BS 
        WHERE DP.PROD_CMPY  = PR.RAT_PROD_PRODCMPY 
            AND DP.PROD_CODE  = PR.RAT_PROD_PRODCODE 
            AND PR.RATIO_BASE = BP.BASE_CODE 
            AND BP.BASE_CODE  = TK.TANK_BASE 
            AND TL.TERM_CODE  = TK.TANK_TERMINAL
            AND PR.RAT_COUNT  = 1 
            AND DP.PROD_CMPY  != 'BaSePrOd'
            AND DP.PROD_CMPY = :supplier
            AND BP.BASE_CAT = BS.BCLASS_NO
        ORDER BY TL.TERM_CODE, DP.PROD_CMPY, TK.TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function is_multi_folio_tank_base()
    {
        // check if the flag is turned on
        $query = "
            SELECT NVL(CONFIG_VALUE, 'N') CONFIG_VALUE 
            FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_FOLIO_TANK_BASE_CHANGE'
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } 
        $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        if ($row['CONFIG_VALUE'] !== 'Y') {
            return false;
        }

        return true;
    }

    protected function get_folios_by_date($start_date = null, $end_date = null)
    {
        // theoretically, the periods of different closeouts will not be overlapped
        // when start_date = end_date, there should be one closeout matched
        // when either date is null, we will use the current folio id
        if (isset($start_date) && isset($end_date)) {
            $query = "
            SELECT CLOSEOUT_NR,
                CLOSEOUT_DATE END_DATE,
                PREV_CLOSEOUT_DATE START_DATE,
                STATUS,
                DECODE(STATUS,
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS_DESC
            FROM CLOSEOUTS
            WHERE 
                PREV_CLOSEOUT_DATE <= :start_date
                AND (CLOSEOUT_DATE IS NULL OR CLOSEOUT_DATE >= :end_date)
            ORDER BY CLOSEOUT_NR DESC";

            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $start_date);
            oci_bind_by_name($stmt, ':end_date', $end_date);
        } else {
            $query = "
            SELECT CLOSEOUT_NR,
                PREV_CLOSEOUT_DATE START_DATE,
                CLOSEOUT_DATE END_DATE,
                STATUS,
                DECODE(STATUS,
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS_DESC
            FROM CLOSEOUTS
            ORDER BY CLOSEOUT_NR DESC";
            $stmt = oci_parse($this->conn, $query);
        }

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        } 
        $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        $nr = $row['CLOSEOUT_NR'];

        return $nr;
    }

    public function supp_tank_products()
    {
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_SAME_DRAW_BASE_CODE", "N");
        $samecode_flag = ($config_value === 'Y' || $config_value === 'y');
        $samecode_cond = "";
        if ($samecode_flag) { 
            // drawer product code must be equal to base code
            $samecode_cond = "                AND DP.PROD_CODE = GT.TANK_BASE";
        }

        $flag = $this->is_multi_folio_tank_base();
        $query = "
            SELECT 
                GT.TANK_BASE,
                GT.TANK_BASE_NAME,
                GT.TANK_BASE_CLASS,
                GT.TANK_BCLASS_NAME,
                GT.TANK_DENSITY,
                NVL(GT.TANK_BASE_DENS_LO, GT.TANK_BCLASS_DENS_LO) DENSITY_LO,
                NVL(GT.TANK_BASE_DENS_HI, GT.TANK_BCLASS_DENS_HI) DENSITY_HI,
                GT.TANK_TEMP,
                GT.TANK_BCLASS_TEMP_LO TEMP_LO,
                GT.TANK_BCLASS_TEMP_HI TEMP_HI,
                GT.TANK_CODE, 
                GT.TANK_NAME, 
                GT.TANK_TERMINAL TERM_CODE,  
                GT.TANK_SITENAME TERM_NAME,
                DP.PROD_CMPY, 
                DP.PROD_CODE, 
                DP.PROD_NAME
            FROM 
                PRODUCTS DP, 
                RPTOBJ_PROD_RATIOS_VW PR, 
                GUI_TANKS GT
            WHERE 
                DP.PROD_CMPY = :supplier
                AND GT.TANK_CODE = :tank_code
                AND DP.PROD_CMPY  = PR.RAT_PROD_PRODCMPY 
                AND DP.PROD_CODE  = PR.RAT_PROD_PRODCODE 
                AND PR.RATIO_BASE = GT.TANK_BASE 
                AND PR.RAT_COUNT  = 1 
                AND DP.PROD_CMPY  != 'BaSePrOd'
                $samecode_cond
        ORDER BY DP.PROD_CMPY, GT.TANK_TERMINAL, GT.TANK_CODE";

        if ($flag) {
            $query = "
                SELECT DISTINCT
                    GT.TANK_BASE,
                    GT.TANK_BASE_NAME,
                    GT.TANK_BASE_CLASS,
                    GT.TANK_BCLASS_NAME,
                    GT.OPEN_DENSITY     as TANK_DENSITY,
                    NVL(GT.TANK_BASE_DENS_LO, GT.TANK_BCLASS_DENS_LO) DENSITY_LO,
                    NVL(GT.TANK_BASE_DENS_HI, GT.TANK_BCLASS_DENS_HI) DENSITY_HI,
                    GT.OPEN_TEMP        as TANK_TEMP,
                    GT.TANK_BCLASS_TEMP_LO TEMP_LO,
                    GT.TANK_BCLASS_TEMP_HI TEMP_HI,
                    GT.TANK_CODE, 
                    GT.TANK_NAME, 
                    GT.TANK_TERMINAL TERM_CODE,  
                    GT.TANK_SITENAME TERM_NAME,
                    GT.CLOSEOUT_NR,
                    GT.BASE_PERIOD_INDEX,
                    GT.BASE_PERIOD_OPEN,
                    GT.BASE_PERIOD_CLOSE,
                    DP.PROD_CMPY, 
                    DP.PROD_CODE, 
                    DP.PROD_NAME
                FROM 
                    PRODUCTS DP, 
                    RPTOBJ_PROD_RATIOS_VW PR, 
                    GUI_FOLIO_TANKS GT
                WHERE 
                    DP.PROD_CMPY = :supplier
                    AND GT.TANK_CODE = :tank_code
                    AND DP.PROD_CMPY  = PR.RAT_PROD_PRODCMPY 
                    AND DP.PROD_CODE  = PR.RAT_PROD_PRODCODE 
                    AND PR.RATIO_BASE = GT.TANK_BASE 
                    AND PR.RAT_COUNT  = 1 
                    AND DP.PROD_CMPY  != 'BaSePrOd'
                    $samecode_cond
                    AND GT.CLOSEOUT_NR = :closeout_nr
                    -- AND (GT.BASE_PERIOD_OPEN IS NULL OR GT.BASE_PERIOD_OPEN <= :move_time)
                    -- AND (GT.BASE_PERIOD_CLOSE IS NULL OR GT.BASE_PERIOD_CLOSE >= :move_time)
            ORDER BY DP.PROD_CMPY, GT.TANK_TERMINAL, GT.TANK_CODE
            ";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if ($flag) {
            $closeout_nr = $this->get_folios_by_date($this->move_time, $this->move_time);
            oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
            // oci_bind_by_name($stmt, ':move_time', $this->move_time);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function drawer_products_by_base()
    {
        $line = "1=1";
        if (isset($this->base_code)) {
            $line = "PR.RATIO_BASE = :base_code";
        }
        $query = "
            SELECT 
                DP.PROD_CMPY, 
                DP.PROD_CODE, 
                DP.PROD_NAME,
                CM.CMPY_NAME,
                PR.RATIO_BASE
            FROM 
                PRODUCTS DP, 
                COMPANYS CM,
                RPTOBJ_PROD_RATIOS_VW PR
            WHERE 
                $line 
                AND DP.PROD_CMPY  = PR.RAT_PROD_PRODCMPY 
                AND DP.PROD_CODE  = PR.RAT_PROD_PRODCODE 
                AND PR.RAT_COUNT  = 1 
                AND DP.PROD_CMPY  != 'BaSePrOd'
                AND DP.PROD_CMPY  = CM.CMPY_CODE
            ORDER BY DP.PROD_CODE, DP.PROD_CMPY
        ";
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->base_code)) {
            oci_bind_by_name($stmt, ':base_code', $this->base_code);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Adjust data in the record that special movement created in MOVEMENTS table 
    private function adjust_movement()
    {
        $query = "UPDATE MOVEMENTS
            SET MV_DTIM_EFFECT = SYSDATE,
                MV_DTIM_EXPIRY = SYSDATE
            WHERE MV_KEY = (
                SELECT MLITM_MOV_KEY FROM MOV_LOAD_ITEMS
                WHERE MLITM_ID = :mlitm_id
                )
                AND MV_DTIM_EFFECT IS NULL
                AND MV_DTIM_EXPIRY IS NULL";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    //Adjust tank batch number to NULL
    private function adjust_tank_batch()
    {
        // get the value of site settings SITE_USE_TANK_BATCH and SITE_TANK_BATCH_STRICT_MODE, and continue only when both settings are "Y", otherwise do nothing and exit.
        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $use_batch = $serv->site_config_value("SITE_USE_TANK_BATCH", "N");
        $must_batch = $serv->site_config_value("SITE_TANK_BATCH_STRICT_MODE", "N");
        if ($use_batch != 'Y' || $must_batch != 'Y') {
            return false;
        }


        // find out if the transaction type is RECEIPT or TRANSAFER, if not, do nothing and exit.
        // define('MV_RECEIPT', 0);
        // define('MV_DISPOSAL', 1);
        // define('MV_TRANSFER', 2);
        if ($this->mlitm_type == 1) {
            return false;
        }


        // get the current batch number in the TO_TANK
        $query = "
            SELECT TANK_BATCH_NO
            FROM TANKS 
            WHERE TANK_CODE = :tank_code AND TANK_TERMINAL = :tank_terminal
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->mlitm_tankcode_to);
        oci_bind_by_name($stmt, ':tank_terminal', $site_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } 
        $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        $curr_batch = $row['TANK_BATCH_NO'];
        /*
            See how php parses different values. $var is the variable.

            $var            =    NULL    ""       0        "0"      1

            strlen($var)    =    0       0        1        1        1
            is_null($var)   =    TRUE    FALSE    FALSE    FALSE    FALSE
            $var == ""      =    TRUE    TRUE     TRUE     FALSE    FALSE
            !$var           =    TRUE    TRUE     TRUE     TRUE     FALSE
            !is_null($var)  =    FALSE   TRUE     TRUE     TRUE     TRUE
            $var != ""      =    FALSE   FALSE    FALSE    TRUE     TRUE
            $var            =    FALSE   FALSE    FALSE    FALSE    TRUE
        */
        if (is_null($curr_batch) || strlen($curr_batch) == 0) {
            return false;
        }


        // if the current batch number is not NULL, end its historical record in tank batch history table, and then continue; if it is NULL already, do nothing and exit
        $query = "
            UPDATE TANK_BATCHES
            SET TANK_BATCH_END = SYSDATE
            WHERE
                TANK_BATCH_CODE = :tank_batch
                AND TANK_CODE = :tank_code
                AND TANK_TERMINAL = :tank_terminal
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_batch', $curr_batch);
        oci_bind_by_name($stmt, ':tank_code', $this->mlitm_tankcode_to);
        oci_bind_by_name($stmt, ':tank_terminal', $site_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }


        // update the batch number to NULL in TO_TANK 
        $query = "
            UPDATE TANKS
            SET TANK_BATCH_NO = NULL
            WHERE TANK_CODE = :tank_code AND TANK_TERMINAL = :tank_terminal
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->mlitm_tankcode_to);
        oci_bind_by_name($stmt, ':tank_terminal', $site_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    /**
     * Old PHP: dmSpecialMovements.processSpecialMovement
     */
    public function submit()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        $serv = new SpecialMvService($this->conn, $mlitm_id = $this->mlitm_id);
        if (isset($this->mlitm_vcf)) {
            $serv->mlitm_vcf = $this->mlitm_vcf;
        }
        
        $error_msg = null;
        if ($serv->submit($error_msg)) {
            $this->adjust_movement();
            // handle tank batch
            $this->adjust_tank_batch();

            $result = new EchoSchema(200, response("__SPECIAL_MOVEMENT_SUBMITTED__",
                sprintf("Special movment %d submitted", $this->mlitm_id)));
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result = new EchoSchema(500, response("__SPECIAL_MOVEMENT_FAILED__",
                "Failed to submit special movement, error message: " . $error_msg));
            echo json_encode($result, JSON_PRETTY_PRINT);
        }

        //SCRIPT_NAME: /cgi-bin/en/spcl_mvment.cgi (HOST message thingy) REQUEST: user_id=9999&spclmnt_no=2698
        $query_string = "user_id=" . rawurlencode(strip_tags(Utilities::getCurrPsn())) . 
            "&spclmnt_no=" . rawurlencode(strip_tags($this->mlitm_id));
        $cgi_response = Utilities::http_cgi_invoke("cgi-bin/en/spcl_mvment.cgi", $query_string);
        write_log($cgi_response, __FILE__, __LINE__);
        if ($cgi_response === false) {
            $e = error_get_last();
            write_log($e['message'], __FILE__, __LINE__);
        }
    }

    public function plant_suppliers()
    {
        $query = "
            SELECT 
                CMPY_CODE, 
                CMPY_NAME,
                CMPY_PLANT,
                NVL(CMPY_PLANT, CMPY_CODE) ||' - '|| CMPY_CODE ||' - '|| CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 1)) != 0
            ORDER BY NVL(CMPY_PLANT, CMPY_CODE), CMPY_NAME ASC
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
}