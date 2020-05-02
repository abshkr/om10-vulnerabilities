<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/manual_trans_service.php';
include_once __DIR__ . '/../service/specialmv_service.php';
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

    public function read()
    {
        if (!isset($this->start_date)) {
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
                    DECODE(MLITM_STATUS, 0, 'Entering', 5, 'Completed', 9, 'Reversed', 'Invalid') MV_STATUS_NAME,
                    MLITM_DTIM_POSTED, 
                    MLITM_OPER_POSTED, 
                    MLITM_COMMENT 
                FROM " . $this->VIEW_NAME . ", MOVITEM_TYPES, MOV_REASONS
                WHERE MLITM_TYPE = MOVITEM_TYPES.MOVITEM_TYPE_ID (+)
                    AND MLITM_REASON_CODE = MOV_REASONS.MR_ID(+)
                ORDER BY MLITM_DTIM_START DESC";
            $stmt = oci_parse($this->conn, $query);
        } else {
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
                    DECODE(MLITM_STATUS, 0, 'Entering', 5, 'Completed', 9, 'Reversed', 'Invalid') MV_STATUS_NAME,
                    MLITM_DTIM_POSTED, 
                    MLITM_OPER_POSTED, 
                    MLITM_COMMENT 
                FROM " . $this->VIEW_NAME . ", MOVITEM_TYPES, , MOV_REASONS
                WHERE MLITM_TYPE = MOVITEM_TYPES.MOVITEM_TYPE_ID (+)
                    AND MLITM_REASON_CODE = MOV_REASONS.MR_ID(+)
                    AND MLITM_DTIM_START > :start_date
                    AND MLITM_DTIM_START < :end_date
                ORDER BY MLITM_DTIM_START DESC";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
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

    public function pre_create()
    {
        $query = "SELECT MAX(MLITM_ID) + 1 NEXT_ID FROM MOV_LOAD_ITEMS";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $this->mlitm_id = $row['NEXT_ID'];
        $this->mlitm_dtim_posted = date('Y-m-d H:i:s', time());
        if (isset($_SESSION['PERCODE'])) {
            $this->mlitm_oper_posted = $_SESSION['PERCODE'];
        }
        $this->mlitm_mov_num  = $row['NEXT_ID'];
        $this->mlitm_status = "0";
        if (!isset($this->mlitm_dtim_end)) {
            $this->mlitm_dtim_end = $this->mlitm_dtim_start;
        }
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
        $query = "SELECT MR_ID, MR_ACTION 
            FROM MOV_REASONS 
            WHERE MR_TYPE = :mr_type
            ORDER BY MR_ID";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mr_type', $this->mr_type);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function reverse()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        if (!isset($this->mlitm_id)) {
            $error = new EchoSchema(400, "parameter missing: mlitm_id not provided");
            echo json_encode($error, JSON_PRETTY_PRINT);
            return array();
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
            $error = new EchoSchema(500, sprintf("There are %d schedules in this special movment", $row['CN']));
            echo json_encode($error, JSON_PRETTY_PRINT);
            write_log(sprintf("There are %d schedules in this special movment", $row['CN']), __FILE__, __LINE__, LogLevel::ERROR);
            return array();
        }

        $query = "SELECT MSITM_SHLSTRIP, MSITM_SHLSSUPP 
            FROM MOV_SCHD_ITEMS, MOV_LOAD_ITEMS 
            WHERE MSITM_MOVEID = MLITM_MOV_ID  AND MSITM_MOVITEM = MLITM_MOV_LINE AND MLITM_ID = :mlitm_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $supplier = $row['MSITM_SHLSSUPP'];
            $trip_no = $row['MSITM_SHLSTRIP'];
            $serv = new ManualTransactionService($this->conn, $supplier = $supplier, $trip_no = $trip_no);
            $error_msg = null;
            if (!$serv->reverse_trip($error_msg)) {
                if ($error_msg) {
                    $error = new EchoSchema(500, "Internal Error: " . $error_msg);
                } else {
                    $error = new EchoSchema(500, "Internal error, check logs/php_rest_*.log file for details");
                }
                
                echo json_encode($error, JSON_PRETTY_PRINT);
                write_log("reverse_trip failed", __FILE__, __LINE__, LogLevel::ERROR);
                return array();
            }
        }

        $error = new EchoSchema(200, sprintf("Special movment %d has been reversed", $this->mlitm_id));
        echo json_encode($error, JSON_PRETTY_PRINT);
        return array();
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

    /**
     * Old PHP: dmSpecialMovements.processSpecialMovement
     */
    public function submit()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $serv = new SpecialMvService($this->conn, $mlitm_id = $this->mlitm_id);
        
        $error_msg = null;
        if ($serv->submit($error_msg)) {
            $result = new EchoSchema(200, sprintf("Special movment %d submitted", $this->mlitm_id));
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result = new EchoSchema(500, "Failed to submit special movement, error message: " . $error_msg);
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
        
        return array();
    }
}