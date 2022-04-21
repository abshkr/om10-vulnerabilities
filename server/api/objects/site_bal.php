<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class SiteBal extends CommonClass
{
    protected $TABLE_NAME = 'TANKS';


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

    public function read() 
    {
        $flag = $this->is_multi_folio_tank_base();
        if ($flag) {
            return $this->read_with_base_change();
        } else {
            return $this->read_no_base_change();
        }

    }

    // read the Site Balance from the Current Folio without the changes of tank base product
    public function read_no_base_change()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND TERMINAL.TERM_CODE = :term_code ";
        }

        // trsa_class: The class of the transaction. 0: the transaction for nomral loading; 1:the transaction for nomination movement.
        // trsa_iotype: The flow direction of the arm in the transaction. -1: in, 1: out.
        // [1]Opening Stock
        // [2]Receipts To Site  - truck unloading + nomination recipt, but excludes nomination transfer;
        // [3]Transfer In -  includes incoming part of nomination transfer type within current folio time range
        // [4]=[1+2+3]Total Acc
        // [5]Disposal For Offsite ? TRANSFERVOL -  includes truck loading + nomination disposal , but excludes nomination transfer type
        // [6]Transfer Out -  includes outgoing part of nomination transfer type within current folio time range
        // [7]=[4-5-6]Book Balance
        // [8]Closing Stock
        // [9]=[8-7]Gain/Loss

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
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0))                                                            AS ACCNTTOT,
            (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0))        AS TRANSFERVOL,
            ((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0)))                                                            AS BOOKBALANCE,
            (NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1))                               AS CLOSINGSTOCK,
            (NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0))        AS RECEIPTSVOL,
            NVL(TRSF_IN_CVL, 0)                                                                    AS TRANSFERIN,
            NVL(TRSF_OUT_CVL, 0)                                                                   AS TRANSFEROUT,
            NVL(RCPT_CVL, 0)                                                                       AS RCPT_CVL,
            NVL(RACK_CVL, 0)                                                                       AS RACK_CVL,
            ((NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1)) -
            ((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0))))                                                           AS GAINLOSS
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
                    TRANBASE.TRSB_BS, 
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
                    AND TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) NOT IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
            ) RECEIPT_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) TRSF_IN_AVL, 
                    SUM(TRANBASE.TRSB_CVL) TRSF_IN_CVL, 
                    TRANBASE.TRSB_BS, 
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
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
            ) TRANSFER_IN_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) TRSF_OUT_AVL, 
                    SUM(TRANBASE.TRSB_CVL) TRSF_OUT_CVL, 
                    TRANBASE.TRSB_BS, 
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
                    AND TRANSACTIONS.TRSA_IOTYPE = 1 AND TRANSACTIONS.TRSA_CLASS = 1
                    AND TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
            ) TRANSFER_OUT_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) RACK_AVL, 
                    SUM(TRANBASE.TRSB_CVL) RACK_CVL, 
                    TRANBASE.TRSB_BS, 
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
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
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
            AND TANKS.TANK_BASE = RECEIPT_INFO.TRSB_BS(+)
            AND TANKS.TANK_BASE = TRANSFER_IN_INFO.TRSB_BS(+)
            AND TANKS.TANK_BASE = TRANSFER_OUT_INFO.TRSB_BS(+)
            AND TANKS.TANK_BASE = RACK_INFO.TRSB_BS(+)
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

    // read the Site Balance from the Current Folio with the changes of tank base product
    public function read_with_base_change()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND TERMINAL.TERM_CODE = :term_code ";
        }

        // trsa_class: The class of the transaction. 0: the transaction for nomral loading; 1:the transaction for nomination movement.
        // trsa_iotype: The flow direction of the arm in the transaction. -1: in, 1: out.
        // [1]Opening Stock
        // [2]Receipts To Site  - truck unloading + nomination recipt, but excludes nomination transfer;
        // [3]Transfer In -  includes incoming part of nomination transfer type within current folio time range
        // [4]=[1+2+3]Total Acc
        // [5]Disposal For Offsite ? TRANSFERVOL -  includes truck loading + nomination disposal , but excludes nomination transfer type
        // [6]Transfer Out -  includes outgoing part of nomination transfer type within current folio time range
        // [7]=[4-5-6]Book Balance
        // [8]Closing Stock
        // [9]=[8-7]Gain/Loss

        $query = "
        SELECT 
            TANKS.TANK_TERMINAL                                                                    AS TANKSITE,
            TERMINAL.TERM_CODE || ' - ' || TERMINAL.TERM_NAME                                      AS TANKSITENAME,
            TANKS.TANK_CODE                                                                        AS TANKCODE,
            CLOSEOUT_TANK.BASE_PERIOD_OPEN,
            CLOSEOUT_TANK.BASE_PERIOD_CLOSE,
            BASE_PRODS.BASE_CODE                                                                   AS PRODUCTCODE,
            BASE_PRODS.BASE_NAME                                                                   AS PRODUCTNAME,
            NVL(TANKS.TANK_DENSITY, 0.0)                                                           AS TANK_DENSITY,
            (NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1))                        AS OPENINGSTOCK2,
            (NVL(CLOSEOUT_TANK.OPEN_STD_TOT, 0.0))                                                 AS OPENINGSTOCK,
            (NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0))                                                            AS ACCNTTOT2,
            (NVL(CLOSEOUT_TANK.OPEN_STD_TOT, 0.0) 
                + NVL(RCPT_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0))                                                            AS ACCNTTOT,
            (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0))        AS TRANSFERVOL2,
            NVL(RACK_CVL, 0)                                                                       AS TRANSFERVOL,
            ((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0)))                                                            AS BOOKBALANCE2,
            ((NVL(CLOSEOUT_TANK.OPEN_STD_TOT, 0.0) 
                + NVL(RCPT_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0)) 
              - NVL(RACK_CVL, 0) 
              - (NVL(TRSF_OUT_CVL, 0)))                                                            AS BOOKBALANCE,
            (NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1))                               AS CLOSINGSTOCK2,
            (CASE WHEN CLOSEOUT_TANK.BASE_PERIOD_CLOSE IS NULL 
            THEN NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) 
            ELSE NVL(CLOSEOUT_TANK.CLOSE_STD_TOT, 0.0) END)                                        AS CLOSINGSTOCK,
            (NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0))        AS RECEIPTSVOL1,
            NVL(RCPT_CVL, 0)                                                                       AS RECEIPTSVOL,
            NVL(TRSF_IN_CVL, 0)                                                                    AS TRANSFERIN,
            NVL(TRSF_OUT_CVL, 0)                                                                   AS TRANSFEROUT,
            NVL(RCPT_CVL, 0)                                                                       AS RCPT_CVL,
            NVL(RACK_CVL, 0)                                                                       AS RACK_CVL,
            ((NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1)) -
            ((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0))))                                                           AS GAINLOSS1,
            ((CASE WHEN CLOSEOUT_TANK.BASE_PERIOD_CLOSE IS NULL 
            THEN NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) 
            ELSE NVL(CLOSEOUT_TANK.CLOSE_STD_TOT, 0.0) END) -
            ((NVL(CLOSEOUT_TANK.OPEN_STD_TOT, 0.0) 
                + NVL(RCPT_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(RACK_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0))))                                                           AS GAINLOSS
        FROM 
            TERMINAL, 
            CLOSEOUTS,
            (
            SELECT
                ctgrp.*
            FROM (
                SELECT ctb.*, 
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM CLOSEOUT_TANK_BASES ctb WHERE CLOSEOUT_NR = :cls_out
                -- WHERE ctb.BASE_PERIOD_CLOSE IS NULL OR ctb.BASE_PERIOD_OPEN != ctb.BASE_PERIOD_CLOSE
                union all
                SELECT 
                    ct.CLOSEOUT_NR
                    , ct.TANK_TERMINAL
                    , ct.TANK_CODE
                    , 1                      as BASE_PERIOD_INDEX
                    , cl.PREV_CLOSEOUT_DATE  as BASE_PERIOD_OPEN
                    , cl.CLOSEOUT_DATE       as BASE_PERIOD_CLOSE
                    , ct.TANK_BASECODE
                    , ct.TANK_BASENAME
                    , ct.OPEN_STD_TOT
                    , ct.OPEN_MASS_TOT
                    , ct.LAST_GAUGE_TIME
                    , ct.CLOSE_STD_TOT
                    , ct.CLOSE_MASS_TOT
                    , ct.FREEZE_STD_TOT
                    , ct.FREEZE_MASS_TOT
                    , ct.RCPT_VOL
                    , ct.TRF_VOL
                    , ct.OPEN_TEMP
                    , ct.OPEN_DENSITY
                    , ct.FREEZE_TEMP
                    , ct.FREEZE_DENSITY
                    , ct.CLOSE_TEMP
                    , ct.CLOSE_DENSITY
                    , ct.DESCRIPTION
                    , ct.USER_CODE
                    , ct.LAST_CHG_TIME
                    , ct.OPEN_AMB_TOT
                    , ct.CLOSE_AMB_TOT
                    , ct.FREEZE_AMB_TOT
                    , ct.TANK_LEVEL
                    , ct.TANK_WATER_LVL
                    , ct.TANK_WATER
                    , ct.TANK_ROOF_WEIGHT
                    , ct.TANK_IFC,
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM CLOSEOUT_TANK ct, CLOSEOUTS cl
                WHERE ct.CLOSEOUT_NR = cl.CLOSEOUT_NR
                  AND (ct.CLOSEOUT_NR, ct.TANK_TERMINAL, ct.TANK_CODE, 1) not in (select CLOSEOUT_NR, TANK_TERMINAL, TANK_CODE, BASE_PERIOD_INDEX from CLOSEOUT_TANK_BASES)
                  AND ct.CLOSEOUT_NR = :cls_out
            ) ctgrp
            WHERE 1=1
            ) CLOSEOUT_TANK, 
            TANKS, 
            BASE_PRODS,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) RCPT_AVL, 
                    SUM(TRANBASE.TRSB_CVL) RCPT_CVL, 
                    TRANBASE.TRSB_BS,
                    TRANBASE.TRSB_TK_TANKDEPO,
                    TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE,
                    (
                        SELECT CLOSEOUT_DATE, PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out
                    ) CLOSEOUT_INFO
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = -1
                    AND TRANSACTIONS.TRSA_ED_DMY > PREV_CLOSEOUT_DATE
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) NOT IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                    AND (TRSB_TK_TANKCODE, TRSB_TK_TANKDEPO) NOT IN (
                        SELECT TANK_CODE, TANK_TERMINAL FROM CLOSEOUT_TANK_BASES WHERE CLOSEOUT_NR = :cls_out
                        )
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE, 
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS')
                UNION
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) RCPT_AVL, 
                    SUM(TRANBASE.TRSB_CVL) RCPT_CVL, 
                    TRANBASE.TRSB_BS,
                    TRANBASE.TRSB_TK_TANKDEPO,
                    TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE,
                    (
                        SELECT BASE_PERIOD_OPEN, NVL(BASE_PERIOD_CLOSE, SYSDATE) BASE_PERIOD_CLOSE, TANK_TERMINAL, TANK_CODE FROM CLOSEOUT_TANK_BASES
                        WHERE CLOSEOUT_NR = :cls_out
                    ) CLOSEOUT_BASE_INFO
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = -1
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) NOT IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                    AND (TRSB_TK_TANKCODE, TRSB_TK_TANKDEPO) NOT IN (
                        SELECT TANK_CODE, TANK_TERMINAL FROM CLOSEOUT_TANK_BASES WHERE CLOSEOUT_NR = :cls_out
                        )
                    AND TRSB_TK_TANKCODE = CLOSEOUT_BASE_INFO.TANK_CODE AND TRSB_TK_TANKDEPO = CLOSEOUT_BASE_INFO.TANK_TERMINAL
                    AND TO_CHAR(TRANSACTIONS.TRSA_ED_DMY, 'YYYY-MM-DD HH24:MI:SS') >= TO_CHAR(NVL(BASE_PERIOD_OPEN, SYSDATE), 'YYYY-MM-DD HH24:MI:SS')
                    AND TO_CHAR(TRANSACTIONS.TRSA_ED_DMY, 'YYYY-MM-DD HH24:MI:SS') < TO_CHAR(NVL(BASE_PERIOD_CLOSE, SYSDATE), 'YYYY-MM-DD HH24:MI:SS')
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE, 
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS')
            ) RECEIPT_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) TRSF_IN_AVL, 
                    SUM(TRANBASE.TRSB_CVL) TRSF_IN_CVL, 
                    TRANBASE.TRSB_BS,
                    TRANBASE.TRSB_TK_TANKDEPO,
                    TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE,
                    (
                        SELECT CLOSEOUT_DATE, PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out
                    ) CLOSEOUT_INFO
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = -1 AND TRANSACTIONS.TRSA_CLASS = 1
                    AND TRANSACTIONS.TRSA_ED_DMY > PREV_CLOSEOUT_DATE
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                    AND (TRSB_TK_TANKCODE, TRSB_TK_TANKDEPO) NOT IN (
                        SELECT TANK_CODE, TANK_TERMINAL FROM CLOSEOUT_TANK_BASES
                        WHERE CLOSEOUT_NR = :cls_out
                        )
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE, 
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS')
                UNION
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) TRSF_IN_AVL, 
                    SUM(TRANBASE.TRSB_CVL) TRSF_IN_CVL, 
                    TRANBASE.TRSB_BS,
                    TRANBASE.TRSB_TK_TANKDEPO,
                    TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE,
                    (
                        SELECT BASE_PERIOD_OPEN, BASE_PERIOD_CLOSE, TANK_TERMINAL, TANK_CODE FROM CLOSEOUT_TANK_BASES
                        WHERE CLOSEOUT_NR = :cls_out
                    ) CLOSEOUT_BASE_INFO
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = -1 AND TRANSACTIONS.TRSA_CLASS = 1
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                    AND TRSB_TK_TANKCODE = CLOSEOUT_BASE_INFO.TANK_CODE AND TRSB_TK_TANKDEPO = CLOSEOUT_BASE_INFO.TANK_TERMINAL
                    AND TO_CHAR(TRANSACTIONS.TRSA_ED_DMY, 'YYYY-MM-DD HH24:MI:SS') >= TO_CHAR(NVL(BASE_PERIOD_OPEN, SYSDATE), 'YYYY-MM-DD HH24:MI:SS')
                    AND TO_CHAR(TRANSACTIONS.TRSA_ED_DMY, 'YYYY-MM-DD HH24:MI:SS') < TO_CHAR(NVL(BASE_PERIOD_CLOSE, SYSDATE), 'YYYY-MM-DD HH24:MI:SS')
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE, 
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS')
            ) TRANSFER_IN_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) TRSF_OUT_AVL, 
                    SUM(TRANBASE.TRSB_CVL) TRSF_OUT_CVL, 
                    TRANBASE.TRSB_BS,
                    TRANBASE.TRSB_TK_TANKDEPO,
                    TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE,
                    (
                        SELECT CLOSEOUT_DATE, PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out
                    ) CLOSEOUT_INFO
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = 1 AND TRANSACTIONS.TRSA_CLASS = 1
                    AND TRANSACTIONS.TRSA_ED_DMY > PREV_CLOSEOUT_DATE
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                    AND (TRSB_TK_TANKCODE, TRSB_TK_TANKDEPO) NOT IN (
                        SELECT TANK_CODE, TANK_TERMINAL FROM CLOSEOUT_TANK_BASES
                        WHERE CLOSEOUT_NR = :cls_out
                        )
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE, 
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS')
                UNION
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) TRSF_OUT_AVL, 
                    SUM(TRANBASE.TRSB_CVL) TRSF_OUT_CVL, 
                    TRANBASE.TRSB_BS,
                    TRANBASE.TRSB_TK_TANKDEPO,
                    TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE,
                    (
                        SELECT BASE_PERIOD_OPEN, BASE_PERIOD_CLOSE, TANK_TERMINAL, TANK_CODE FROM CLOSEOUT_TANK_BASES
                        WHERE CLOSEOUT_NR = :cls_out
                    ) CLOSEOUT_BASE_INFO
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = 1 AND TRANSACTIONS.TRSA_CLASS = 1
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                    AND TRSB_TK_TANKCODE = CLOSEOUT_BASE_INFO.TANK_CODE AND TRSB_TK_TANKDEPO = CLOSEOUT_BASE_INFO.TANK_TERMINAL
                    AND TO_CHAR(TRANSACTIONS.TRSA_ED_DMY, 'YYYY-MM-DD HH24:MI:SS') > TO_CHAR(NVL(BASE_PERIOD_OPEN, SYSDATE), 'YYYY-MM-DD HH24:MI:SS')
                    AND TO_CHAR(TRANSACTIONS.TRSA_ED_DMY, 'YYYY-MM-DD HH24:MI:SS') <= TO_CHAR(NVL(BASE_PERIOD_CLOSE, SYSDATE), 'YYYY-MM-DD HH24:MI:SS')
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS')
            ) TRANSFER_OUT_INFO,
            (
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) RACK_AVL, 
                    SUM(TRANBASE.TRSB_CVL) RACK_CVL, 
                    TRANBASE.TRSB_BS,
                    TRANBASE.TRSB_TK_TANKDEPO, 
                    TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE,
                    (
                        SELECT CLOSEOUT_DATE, PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out
                    ) CLOSEOUT_INFO
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = 1 
                    -- AND TRANSACTIONS.TRSA_CLASS = 0
                    AND TRANSACTIONS.TRSA_ED_DMY > PREV_CLOSEOUT_DATE
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) NOT IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                    AND (TRSB_TK_TANKCODE, TRSB_TK_TANKDEPO) NOT IN (
                        SELECT TANK_CODE, TANK_TERMINAL FROM CLOSEOUT_TANK_BASES
                        WHERE CLOSEOUT_NR = :cls_out
                        )
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE, 
                    TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH24:MI:SS')
                UNION
                SELECT 
                    SUM(TRANBASE.TRSB_AVL) RACK_AVL, 
                    SUM(TRANBASE.TRSB_CVL) RACK_CVL, 
                    TRANBASE.TRSB_BS,
                    TRANBASE.TRSB_TK_TANKDEPO, 
                    TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS') OPEN_TIME_STR,
                    NVL(TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS'), '-1') CLOSE_TIME_STR
                FROM 
                    TRANSFERS, 
                    TRANSACTIONS, 
                    TRANBASE,
                    (
                        SELECT BASE_PERIOD_OPEN, BASE_PERIOD_CLOSE, TANK_TERMINAL, TANK_CODE FROM CLOSEOUT_TANK_BASES
                        WHERE CLOSEOUT_NR = :cls_out
                    ) CLOSEOUT_BASE_INFO
                WHERE 
                    TRANBASE.TRSB_ID_TRSF_ID = TRANSFERS.TRSF_ID
                    AND TRANBASE.TRSB_ID_TRSF_TRM = TRANSFERS.TRSF_TERMINAL
                    AND TRANSFERS.TRSFTRID_TRSA_ID = TRANSACTIONS.TRSA_ID
                    AND TRANSFERS.TRSFTRID_TRSA_TRM = TRANSACTIONS.TRSA_TERMINAL
                    AND TRANSACTIONS.TRSA_IOTYPE = 1 
                    -- AND TRANSACTIONS.TRSA_CLASS = 0
                    AND (TRANSFERS.TRSF_ID, TRANSFERS.TRSF_TERMINAL) NOT IN (SELECT MTITM_TRSF_ID, MTITM_TERMINAL FROM MOV_TRSF_ITEMS, MOVEMENT_ITEMS
                        WHERE MTITM_MOV_ID = MVITM_MOVE_ID AND MTITM_MOV_LINE = MVITM_LINE_ID AND MVITM_TYPE = 2)
                    AND TRSB_TK_TANKCODE = CLOSEOUT_BASE_INFO.TANK_CODE AND TRSB_TK_TANKDEPO = CLOSEOUT_BASE_INFO.TANK_TERMINAL
                    AND TO_CHAR(TRANSACTIONS.TRSA_ED_DMY, 'YYYY-MM-DD HH24:MI:SS') >= TO_CHAR(NVL(BASE_PERIOD_OPEN, SYSDATE), 'YYYY-MM-DD HH24:MI:SS')
                    AND TO_CHAR(TRANSACTIONS.TRSA_ED_DMY, 'YYYY-MM-DD HH24:MI:SS') < TO_CHAR(NVL(BASE_PERIOD_CLOSE, SYSDATE), 'YYYY-MM-DD HH24:MI:SS')
                GROUP BY TRANBASE.TRSB_BS, TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE,
                    TO_CHAR(BASE_PERIOD_OPEN, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(BASE_PERIOD_CLOSE, 'YYYY-MM-DD HH24:MI:SS')
            ) RACK_INFO
        WHERE CLOSEOUTS.CLOSEOUT_NR = :cls_out
            AND CLOSEOUTS.CLOSEOUT_NR = CLOSEOUT_TANK.CLOSEOUT_NR
            AND CLOSEOUT_TANK.TANK_CODE = TANKS.TANK_CODE
            AND BASE_PRODS.BASE_CODE = NVL(CLOSEOUT_TANK.TANK_BASECODE, TANKS.TANK_BASE)
            AND CLOSEOUT_TANK.TANK_CODE = RECEIPT_INFO.TRSB_TK_TANKCODE(+)
            AND CLOSEOUT_TANK.TANK_TERMINAL = RECEIPT_INFO.TRSB_TK_TANKDEPO(+)
            AND CLOSEOUT_TANK.OPEN_TIME_STR = RECEIPT_INFO.OPEN_TIME_STR(+)
            AND CLOSEOUT_TANK.CLOSE_TIME_STR = RECEIPT_INFO.CLOSE_TIME_STR(+)
            AND CLOSEOUT_TANK.TANK_CODE = TRANSFER_IN_INFO.TRSB_TK_TANKCODE(+)
            AND CLOSEOUT_TANK.TANK_TERMINAL = TRANSFER_IN_INFO.TRSB_TK_TANKDEPO(+)
            AND CLOSEOUT_TANK.OPEN_TIME_STR = TRANSFER_IN_INFO.OPEN_TIME_STR(+)
            AND CLOSEOUT_TANK.CLOSE_TIME_STR = TRANSFER_IN_INFO.CLOSE_TIME_STR(+)
            AND CLOSEOUT_TANK.TANK_CODE = TRANSFER_OUT_INFO.TRSB_TK_TANKCODE(+)
            AND CLOSEOUT_TANK.TANK_TERMINAL = TRANSFER_OUT_INFO.TRSB_TK_TANKDEPO(+)
            AND CLOSEOUT_TANK.OPEN_TIME_STR = TRANSFER_OUT_INFO.OPEN_TIME_STR(+)
            AND CLOSEOUT_TANK.CLOSE_TIME_STR = TRANSFER_OUT_INFO.CLOSE_TIME_STR(+)
            AND CLOSEOUT_TANK.TANK_CODE = RACK_INFO.TRSB_TK_TANKCODE(+)
            AND CLOSEOUT_TANK.TANK_TERMINAL = RACK_INFO.TRSB_TK_TANKDEPO(+)
            AND CLOSEOUT_TANK.OPEN_TIME_STR = RACK_INFO.OPEN_TIME_STR(+)
            AND CLOSEOUT_TANK.CLOSE_TIME_STR = RACK_INFO.CLOSE_TIME_STR(+)
            AND TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
            $terminal_condition
        ORDER BY TANKS.TANK_TERMINAL, TANKS.TANK_CODE, CLOSEOUT_TANK.BASE_PERIOD_INDEX
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



    // transfer in&out should include all transactions, not just nomination
    public function read2()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND TERMINAL.TERM_CODE = :term_code ";
        }

        // trsa_class: The class of the transaction. 0: the transaction for nomral loading; 1:the transaction for nomination movement.
        // trsa_iotype: The flow direction of the arm in the transaction. -1: in, 1: out.
        // [1]Opening Stock
        // [2]Receipts To Site
        // [3]Transfer In
        // [4]=[1+2+3]Total Acc
        // [5]Disposal For Offsite ? TRANSFERVOL
        // [6]Transfer Out
        // [7]=[4-5-6]Book Balance
        // [8]Closing Stock
        // [9]=[8-7]Gain/Loss

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
                + (NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0)) 
                +  NVL(TRSF_IN_CVL, 0))                                                            AS ACCNTTOT,
            (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0))        AS TRANSFERVOL,
            ((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0)))                                                            AS BOOKBALANCE,
            (NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1))                               AS CLOSINGSTOCK,
            (NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0))        AS RECEIPTSVOL,
            NVL(TRSF_IN_CVL, 0)                                                                    AS TRANSFERIN,
            NVL(TRSF_OUT_CVL, 0)                                                                   AS TRANSFEROUT,
            ((NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1)) -
            ((NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) 
                + NVL(TANKS.TANK_RCPT_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) 
                +  NVL(TRSF_IN_CVL, 0)) 
              - (NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_OUT_CVL, 0)) 
              - (NVL(TRSF_OUT_CVL, 0))))                                                           AS GAINLOSS
        FROM 
            TERMINAL, 
            CLOSEOUTS, 
            CLOSEOUT_TANK, 
            TANKS, 
            BASE_PRODS,
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
                    AND TRANSACTIONS.TRSA_IOTYPE = -1 -- AND TRANSACTIONS.TRSA_CLASS = 1
                    AND TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
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
                    -- AND TRANSACTIONS.TRSA_CLASS = 1
                WHERE 
                    TRANSACTIONS.TRSA_ED_DMY > (SELECT PREV_CLOSEOUT_DATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = :cls_out)
                GROUP BY TRANBASE.TRSB_TK_TANKDEPO, TRANBASE.TRSB_TK_TANKCODE
            ) TRANSFER_OUT_INFO
        WHERE CLOSEOUTS.CLOSEOUT_NR = :cls_out
            AND CLOSEOUTS.CLOSEOUT_NR = CLOSEOUT_TANK.CLOSEOUT_NR
            AND CLOSEOUT_TANK.TANK_CODE = TANKS.TANK_CODE
            AND BASE_PRODS.BASE_CODE = TANK_BASE
            AND TANKS.TANK_CODE = TRANSFER_IN_INFO.TRSB_TK_TANKCODE(+)
            AND TANKS.TANK_CODE = TRANSFER_OUT_INFO.TRSB_TK_TANKCODE(+)
            AND TANKS.TANK_TERMINAL = TRANSFER_IN_INFO.TRSB_TK_TANKDEPO(+)
            AND TANKS.TANK_TERMINAL = TRANSFER_OUT_INFO.TRSB_TK_TANKDEPO(+)
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
        NVL(TANKS.TANK_COR_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TANKS.TANK_LTR_CLOSE, 0.0)*NVL(TANKS.TANK_RPTVCFCLOSE, 1) - NVL(TANKS.TANK_RCPT_VOL, 0.0) * NVL(TANKS.TANK_RPTVCF, 1) + NVL(TANKS.TANK_TRF_VOL, 0.0)*NVL(TANKS.TANK_RPTVCF, 1) - NVL(TRSF_IN_CVL, 0) + NVL(TRSF_OUT_CVL, 0) GAINLOSS
    
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