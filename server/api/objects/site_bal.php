<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class SiteBal extends CommonClass
{
    protected $TABLE_NAME = 'TANKS';

    public function read()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND TERMINAL.TERM_CODE = :term_code ";
        }
        $query = "
        SELECT
            TANKS.TANK_TERMINAL                                                                    AS TANKSITE,
            TERMINAL.TERM_CODE || ' - ' || TERMINAL.TERM_NAME                                      AS TANKSITENAME,
            TANKS.TANK_CODE                                                                        AS TANKCODE,
            BASE_PRODS.BASE_CODE                                                                   AS PRODUCTCODE,
            BASE_PRODS.BASE_NAME                                                                   AS PRODUCTNAME,
            NVL(TANKS.TANK_DENSITY, 0.0)                                                           AS TANK_DENSITY,
            (NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1))                        AS OPENINGSTOCK,
            (NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) 
                - NVL(TRSF_IN_CVL, 0) +  NVL(TRSF_IN_CVL, 0))                                      AS ACCNTTOT,
            (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0))        AS TRANSFERVOL,
            ((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) 
                - NVL(TRSF_IN_CVL, 0) +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0)))                                                            AS BOOKBALANCE,
            (NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1))                               AS CLOSINGSTOCK,
            (NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0))        AS RECEIPTSVOL,
            NVL(TRSF_IN_CVL, 0)                                                                    AS TRANSFERIN,
            NVL(TRSF_OUT_CVL, 0)                                                                   AS TRANSFEROUT,
            (((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) 
                - NVL(TRSF_IN_CVL, 0) +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0))
            ) - (NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1)))                          AS GAINLOSS
        FROM 
            TERMINAL, 
            CLOSEOUTS, 
            CLOSEOUT_TANK, 
            TANKS, 
            BASE_PRODS,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) RCPT_AVL, 
                    SUM(TRANBASE.TRSB_CVL) RCPT_CVL, 
                    TRANBASE.TRSB_TK_TANKDEPO,
                    TRANBASE.TRSB_TK_TANKCODE
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = -1
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) NOT IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                GROUP BY TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
            ) RECEIPT_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) TRSF_IN_AVL, 
                    SUM(TRANBASE.TRSB_CVL) TRSF_IN_CVL, 
                    TRANBASE.TRSB_TK_TANKDEPO,
                    TRANBASE.TRSB_TK_TANKCODE
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = -1 AND TRANSACTIONS.TRSA_CLASS = 1
                    AND TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                GROUP BY TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
            ) TRANSFER_IN_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) TRSF_OUT_AVL, 
                    SUM(TRANBASE.TRSB_CVL) TRSF_OUT_CVL, 
                    TRANBASE.TRSB_TK_TANKDEPO, 
                    TRANBASE.TRSB_TK_TANKCODE
                FROM 
                    TRANBASE
                INNER JOIN 
                    TRANSFERS
                ON 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                INNER JOIN 
                    TRANSACTIONS
                ON 
                    TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = 1 
                    AND TRANSACTIONS.TRSA_CLASS = 1
                INNER JOIN 
                    MOV_TRSF_ITEMS
                ON 
                    TRANSFERS.TRSF_ID = MOV_TRSF_ITEMS.MTITM_TRSF_ID
                    AND TRANSFERS.TRSF_TERMINAL = MOV_TRSF_ITEMS.MTITM_TERMINAL
                    AND MOV_TRSF_ITEMS.MTITM_IOTYPE = 1 
                    AND MOV_TRSF_ITEMS.MTITM_CLASS = 1
                INNER JOIN 
                    MOVEMENTS
                ON 
                    MOV_TRSF_ITEMS.MTITM_MOV_ID = MOVEMENTS.MV_ID
                INNER JOIN 
                    MOVEMENT_ITEMS
                ON 
                    MOVEMENTS.MV_ID = MOVEMENT_ITEMS.MVITM_MOVE_ID
                    AND MOV_TRSF_ITEMS.MTITM_QTY = MOVEMENT_ITEMS.MVITM_PROD_QTY
                    AND MOVEMENT_ITEMS.MVITM_TYPE = 2
                WHERE 
                    TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
                GROUP BY TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
            ) TRANSFER_OUT_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) RACK_AVL, 
                    SUM(TRANBASE.TRSB_CVL) RACK_CVL, 
                    TRANBASE.TRSB_TK_TANKDEPO, 
                    TRANBASE.TRSB_TK_TANKCODE
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = 1 AND TRANSACTIONS.TRSA_CLASS = 0
                    AND TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) NOT IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                GROUP BY TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
            ) RACK_INFO
        WHERE CLOSEOUTS.CLOSEOUT_NR = :cls_out
            AND CLOSEOUTS.CLOSEOUT_NR = CLOSEOUT_TANK.CLOSEOUT_NR
            AND CLOSEOUT_TANK.TANK_CODE = TANKS.TANK_CODE
            AND BASE_PRODS.BASE_CODE = TANK_BASE
            AND TANKS.TANK_CODE = RECEIPT_INFO.TRSB_TK_TANKCODE(+)
            AND TANKS.TANK_CODE = TRANSFER_IN_INFO.TRSB_TK_TANKCODE(+)
            AND TANKS.TANK_CODE = TRANSFER_OUT_INFO.TRSB_TK_TANKCODE(+)
            AND TANKS.TANK_CODE = RACK_INFO.TRSB_TK_TANKCODE(+)
            AND TANKS.TANK_TERMINAL = RECEIPT_INFO.TRSB_TK_TANKDEPO(+)
            AND TANKS.TANK_TERMINAL = TRANSFER_IN_INFO.TRSB_TK_TANKDEPO(+)
            AND TANKS.TANK_TERMINAL = TRANSFER_OUT_INFO.TRSB_TK_TANKDEPO(+)
            AND TANKS.TANK_TERMINAL = RACK_INFO.TRSB_TK_TANKDEPO(+)
            AND TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
            $terminal_condition
        ORDER BY TANKS.TANK_TERMINAL, TANKS.TANK_CODE
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cls_out', $this->cls_out);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_without_terminal()
    {
        $query = "
        SELECT
        TANKS.TANK_CODE TANKCODE,
        BASE_PRODS.BASE_CODE PRODUCTCODE,
        BASE_PRODS.BASE_NAME PRODUCTNAME,
        NVL(TANKS.TANK_DENSITY, 0.0) TANK_DENSITY,
        NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) OPENINGSTOCK,
        NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) +  NVL(TRSF_IN_CVL, 0) ACCNTTOT,
        NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0) TRANSFERVOL,
        (NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) +  NVL(TRSF_IN_CVL, 0)) -  (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) - (NVL(TRSF_OUT_CVL, 0)) BOOKBALANCE,
        NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) CLOSINGSTOCK,
                    
        NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) RECEIPTSVOL,
        NVL(TRSF_IN_CVL, 0) TRANSFERIN,
        NVL(TRSF_OUT_CVL, 0) TRANSFEROUT,
        ((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) +  NVL(TRSF_IN_CVL, 0)) -  (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) - (NVL(TRSF_OUT_CVL, 0))) - (NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1)) GAINLOSS
    
    FROM TERMINAL, CLOSEOUTS, CLOSEOUT_TANK, TANKS, BASE_PRODS,
        (SELECT SUM(TRANBASE.TRSB_AVL) RCPT_AVL, SUM(TRANBASE.TRSB_CVL) RCPT_CVL, TRANBASE.TRSB_TK_TANKCODE
        FROM TRANSFERS, TRANSACTIONS, TRANBASE
        WHERE TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
            AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
            AND TRANSACTIONS.TRSA_IOTYPE = -1
            AND TRANSFERS.TRSF_ID NOT IN (SELECT MTITM_TRSF_ID FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
        GROUP BY TRANBASE.TRSB_TK_TANKCODE) RECEIPT_INFO,
        (SELECT SUM(TRANBASE.TRSB_AVL) TRSF_IN_AVL, SUM(TRANBASE.TRSB_CVL) TRSF_IN_CVL, TRANBASE.TRSB_TK_TANKCODE
        FROM TRANSFERS, TRANSACTIONS, TRANBASE
        WHERE TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
            AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
            AND TRANSACTIONS.TRSA_IOTYPE = -1 AND TRANSACTIONS.TRSA_CLASS = 1
            AND TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
            AND TRANSFERS.TRSF_ID IN (SELECT MTITM_TRSF_ID FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
        GROUP BY TRANBASE.TRSB_TK_TANKCODE) TRANSFER_IN_INFO,
        (SELECT SUM(TRANBASE.TRSB_AVL) TRSF_OUT_AVL, SUM(TRANBASE.TRSB_CVL) TRSF_OUT_CVL, TRANBASE.TRSB_TK_TANKCODE
            FROM TRANBASE
            INNER JOIN TRANSFERS
            ON TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
            INNER JOIN TRANSACTIONS
            ON TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
            AND TRANSACTIONS.TRSA_IOTYPE = 1 AND TRANSACTIONS.TRSA_CLASS = 1
            INNER JOIN MOV_TRSF_ITEMS
            ON TRANSFERS.TRSF_ID = MOV_TRSF_ITEMS.MTITM_TRSF_ID
            AND MOV_TRSF_ITEMS.MTITM_IOTYPE = 1 AND MOV_TRSF_ITEMS.MTITM_CLASS = 1
            INNER JOIN MOVEMENTS
            ON MOV_TRSF_ITEMS.MTITM_MOV_ID = MOVEMENTS.MV_ID
            INNER JOIN MOVEMENT_ITEMS
            ON MOVEMENTS.MV_ID = MOVEMENT_ITEMS.MVITM_MOVE_ID
            AND MOV_TRSF_ITEMS.MTITM_QTY = MOVEMENT_ITEMS.MVITM_PROD_QTY
            AND MOVEMENT_ITEMS.MVITM_TYPE = 2
            WHERE TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
        GROUP BY TRANBASE.TRSB_TK_TANKCODE) TRANSFER_OUT_INFO,
        (SELECT SUM(TRANBASE.TRSB_AVL) RACK_AVL, SUM(TRANBASE.TRSB_CVL) RACK_CVL, TRANBASE.TRSB_TK_TANKCODE
        FROM TRANSFERS, TRANSACTIONS, TRANBASE
        WHERE TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
            AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
            AND TRANSACTIONS.TRSA_IOTYPE = 1 AND TRANSACTIONS.TRSA_CLASS = 0
            AND TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
            AND TRANSFERS.TRSF_ID NOT IN (SELECT MTITM_TRSF_ID FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
        GROUP BY TRANBASE.TRSB_TK_TANKCODE) RACK_INFO
    WHERE CLOSEOUTS.CLOSEOUT_NR = :cls_out
        AND CLOSEOUTS.CLOSEOUT_NR = CLOSEOUT_TANK.CLOSEOUT_NR
        AND CLOSEOUT_TANK.TANK_CODE = TANKS.TANK_CODE
        AND BASE_PRODS.BASE_CODE = TANK_BASE
        AND TANKS.TANK_CODE = RECEIPT_INFO.TRSB_TK_TANKCODE(+)
        AND TANKS.TANK_CODE = TRANSFER_IN_INFO.TRSB_TK_TANKCODE(+)
        AND TANKS.TANK_CODE = TRANSFER_OUT_INFO.TRSB_TK_TANKCODE(+)
        AND TANKS.TANK_CODE = RACK_INFO.TRSB_TK_TANKCODE(+)
    ORDER BY TANKS.TANK_CODE
    ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cls_out', $this->cls_out);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_closeoutNR()
    {
        $query = "
            SELECT CLOSEOUT_NR FROM CLOSEOUTS WHERE ROWNUM <= 1 ORDER BY CLOSEOUT_NR DESC 
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
