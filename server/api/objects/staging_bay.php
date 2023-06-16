<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/company_service.php';
//include_once __DIR__ . '/../service/manual_trans_service.php';
include_once __DIR__ . '/../service/schedule_service.php';
include_once 'common_class.php';

class StagingBay extends CommonClass
{
    protected $TABLE_NAME = 'DUMMY';


    public function get_pickup_specs() 
    {
        if (!isset($this->supplier_code) || $this->supplier_code === "undefined") {
            $this->supplier_code = "-1";
        }
        if (!isset($this->shls_trip_no) || $this->shls_trip_no === "undefined") {
            $this->shls_trip_no = -1;
        }
        $query = "
            SELECT *
            FROM PICKUP_SCHEDULE_SPECS
            WHERE
                PLSS_PICKUP_TRIP = :shls_trip_no
                AND PLSS_PICKUP_SUPP = :shls_supp
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_pickup_specs_extra() 
    {
        if (!isset($this->supplier_code) || $this->supplier_code === "undefined") {
            $this->supplier_code = "-1";
        }
        if (!isset($this->shls_trip_no) || $this->shls_trip_no === "undefined") {
            $this->shls_trip_no = -1;
        }
        $query = "
            SELECT distinct * 
            FROM (
                SELECT PLSS.*, CMPT.SCHD_SPECQTY AS PLSS_STAGED_AVAILQTY, SCHD.SHLS_LD_TYPE AS PLSS_STAGED_LOADTYPE2, 0 AS PLSS_STAGED_AVAILORD
                FROM PICKUP_SCHEDULE_SPECS PLSS, SPECDETS CMPT, SCHEDULE SCHD
                WHERE
                    PLSS.PLSS_STAGED_TRIP = CMPT.SCHDSPEC_SHLSTRIP
                    AND PLSS.PLSS_STAGED_SUPP = CMPT.SCHDSPEC_SHLSSUPP
                    AND PLSS.PLSS_STAGED_CMPT = CMPT.SCHD_COMP_ID
                    AND PLSS.PLSS_STAGED_PRODCODE = CMPT.SCHDPROD_PRODCODE
                    AND PLSS.PLSS_STAGED_PRODCMPY = CMPT.SCHDPROD_PRODCMPY
                    AND PLSS.PLSS_STAGED_ORDER IS NULL
                    AND SCHD.SHLS_TRIP_NO = CMPT.SCHDSPEC_SHLSTRIP
                    AND SCHD.SHLS_SUPP = CMPT.SCHDSPEC_SHLSSUPP
                    AND SCHD.SHLS_LD_TYPE = 2
                UNION ALL
                SELECT PLSS.*, PROD.SCHP_SPECQTY AS PLSS_STAGED_AVAILQTY, SCHD.SHLS_LD_TYPE AS PLSS_STAGED_LOADTYPE2, 0 AS PLSS_STAGED_AVAILORD
                FROM PICKUP_SCHEDULE_SPECS PLSS, SPECPROD PROD, SCHEDULE SCHD
                WHERE
                    PLSS.PLSS_STAGED_TRIP = PROD.SCHPSPID_SHLSTRIP
                    AND PLSS.PLSS_STAGED_SUPP = PROD.SCHPSPID_SHLSSUPP
                    AND PLSS.PLSS_STAGED_PRODCODE = PROD.SCHPPROD_PRODCODE
                    AND PLSS.PLSS_STAGED_PRODCMPY = PROD.SCHPPROD_PRODCMPY
                    AND PLSS.PLSS_STAGED_CMPT IS NULL
                    AND PLSS.PLSS_STAGED_ORDER IS NULL
                    AND SCHD.SHLS_TRIP_NO = PROD.SCHPSPID_SHLSTRIP
                    AND SCHD.SHLS_SUPP = PROD.SCHPSPID_SHLSSUPP
                    AND SCHD.SHLS_LD_TYPE = 3
                UNION ALL
                SELECT PLSS.*, PROD.SCHP_SPECQTY AS PLSS_STAGED_AVAILQTY, SCHD.SHLS_LD_TYPE AS PLSS_STAGED_LOADTYPE2, (OPRD.ORDER_PROD_QTY - OPRD.OPROD_SCHEDULED) AS PLSS_STAGED_AVAILORD
                FROM PICKUP_SCHEDULE_SPECS PLSS, SPECPROD PROD, SCHEDULE SCHD, OPRODMTD OPRD
                WHERE
                    PLSS.PLSS_STAGED_TRIP = PROD.SCHPSPID_SHLSTRIP
                    AND PLSS.PLSS_STAGED_SUPP = PROD.SCHPSPID_SHLSSUPP
                    AND PLSS.PLSS_STAGED_PRODCODE = PROD.SCHPPROD_PRODCODE
                    AND PLSS.PLSS_STAGED_PRODCMPY = PROD.SCHPPROD_PRODCMPY
                    AND PLSS.PLSS_STAGED_CMPT IS NULL
                    AND PLSS.PLSS_STAGED_ORDER = PROD.SCHP_ORDER
                    AND SCHD.SHLS_TRIP_NO = PROD.SCHPSPID_SHLSTRIP
                    AND SCHD.SHLS_SUPP = PROD.SCHPSPID_SHLSSUPP
                    AND SCHD.SHLS_LD_TYPE = 4
                    AND PLSS.PLSS_STAGED_PRODCODE = OPRD.OSPROD_PRODCODE
                    AND PLSS.PLSS_STAGED_PRODCMPY = OPRD.OSPROD_PRODCMPY
                    AND PLSS.PLSS_STAGED_ORDER = OPRD.ORDER_PROD_KEY
            )
            WHERE
                PLSS_PICKUP_TRIP = :shls_trip_no
                AND PLSS_PICKUP_SUPP = :shls_supp
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_pre_schedules()
    {
        $query = "
            SELECT GUI_SCHEDULES.*, 
                DECODE(LOAD_REVERSE_FLAG, 
                    1, 'Y',
                    3, 'Y',
                    'N'
                ) REVERSED,
                DECODE(LOAD_REVERSE_FLAG, 
                    3, 'Y',
                    'N'
                ) ARCHIVED,
                DECODE(SHLS_LD_TYPE, 
                    6, 'Y',
                    'N'
                ) UNLOAD,
                ccmp.CMPY_CODE                             AS SHLS_CUST_CMPYCODE,
                ccmp.CMPY_NAME                             AS SHLS_CUST_CMPYNAME,
                SHL_SOURCE_TYPES.SOURCE_TYPE_NAME          AS SHLS_SRCTYPE_DESC,
                DECODE(SHLS_SRCTYPE, 
                    1, 'Manually Created',
                    2, 'From Host',
                    3, 'Open Order',
                    4, 'Standalone or Special',
                    'Unknown'
                )                                          AS SHLS_SRCTYPE_DESC2 
            FROM GUI_SCHEDULES, SHL_SOURCE_TYPES, CUSTOMER cust, COMPANYS ccmp
            WHERE SHLS_SRCTYPE = SHL_SOURCE_TYPES.SOURCE_TYPE_ID
                AND SHLS_CUST = cust.CUST_ACCT(+)
                AND cust.CUST_CODE = ccmp.CMPY_CODE(+)
                AND (STATUS IS NULL OR STATUS = 'F') 
                AND SUPPLIER_CODE = :supplier 
                AND SHLS_PICKUP_MODE != 1 
                AND SHLS_LD_TYPE = 2
            ORDER BY SHLS_CALDATE DESC
        ";
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

    public function get_pre_orders()
    {
        $query = "
            SELECT GUI_SCHEDULES.*, 
                DECODE(LOAD_REVERSE_FLAG, 
                    1, 'Y',
                    3, 'Y',
                    'N'
                ) REVERSED,
                DECODE(LOAD_REVERSE_FLAG, 
                    3, 'Y',
                    'N'
                ) ARCHIVED,
                DECODE(SHLS_LD_TYPE, 
                    6, 'Y',
                    'N'
                ) UNLOAD,
                ccmp.CMPY_CODE                             AS SHLS_CUST_CMPYCODE,
                ccmp.CMPY_NAME                             AS SHLS_CUST_CMPYNAME,
                SHL_SOURCE_TYPES.SOURCE_TYPE_NAME          AS SHLS_SRCTYPE_DESC,
                DECODE(SHLS_SRCTYPE, 
                    1, 'Manually Created',
                    2, 'From Host',
                    3, 'Open Order',
                    4, 'Standalone or Special',
                    'Unknown'
                )                                          AS SHLS_SRCTYPE_DESC2 
            FROM GUI_SCHEDULES, SHL_SOURCE_TYPES, CUSTOMER cust, COMPANYS ccmp
            WHERE SHLS_SRCTYPE = SHL_SOURCE_TYPES.SOURCE_TYPE_ID
                AND SHLS_CUST = cust.CUST_ACCT(+)
                AND cust.CUST_CODE = ccmp.CMPY_CODE(+)
                AND (STATUS IS NULL OR STATUS = 'F')  
                AND SUPPLIER_CODE = :supplier 
                AND SHLS_PICKUP_MODE != 1 
                AND SHLS_LD_TYPE = 3
            ORDER BY SHLS_CALDATE DESC
        ";
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

    public function get_open_orders()
    {
        $query = "
            SELECT *
            FROM GUI_ORDERS
            WHERE ORDER_STAT_ID NOT IN (2, 3, 5, 6)
                AND ORDER_SUPP_CODE = :supplier
                AND ORDER_APPROVED = 'Y'
            ORDER BY ORDER_CUST_NO
        ";
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



    public function get_trip_compartments()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        /*
            need to get customer details at compartment level:
            a. check if the compartment has OO, if it has, use OO's ORDER_CUST
            b. if not, check if the schedule has value in SHLS_CUST, if it has, use SHLS_CUST
            c. otherwise, customer does not exist
        */

        $query = "
        SELECT EQPT_CODE,
            EQPT_ID,
            TANKER_INFO.COMPARTMENT,
            TANKER_INFO.CMPT_NO                            AS EQPT_CMPT,
            PROD_CODE, 
            PROD_NAME, 
            PROD_CMPY,
            NVL(UNIT_CODE, CMPT_UNITS)                     AS UNIT_CODE, 
            NVL(UNIT_NAME, CMPT_UNITS_NAME)                AS UNIT_NAME, 
            SAFEFILL,
            NVL(QTY_SCHEDULED, QTY_LOADED)                 AS QTY_SCHEDULED, 
            QTY_PRELOAD,
            SCHDSPEC_SHLSTRIP, 
            SCHDSPEC_SHLSSUPP, 
            SCHD_SOLD_TO_NUM,
            SCHD_SHIP_TO_NUM, 
            ORDER_CUST_ORDNO,
            SCHD_ORDER,
            SCHD_DELIV_NUM, 
            PROD_CLASS, 
            NULL                                           AS PLSS_PICKUP_TRIP,
            NULL                                           AS PLSS_PICKUP_SUPP,
            NULL                                           AS PLSS_PICKUP_CMPT,
            SCHDSPEC_SHLSTRIP                              AS PLSS_STAGED_TRIP,
            SCHDSPEC_SHLSSUPP                              AS PLSS_STAGED_SUPP,
            TANKER_INFO.COMPARTMENT                        AS PLSS_STAGED_CMPT,
            PROD_CODE                                      AS PLSS_STAGED_PRODCODE,
            PROD_CMPY                                      AS PLSS_STAGED_PRODCMPY,
            NVL(UNIT_CODE, CMPT_UNITS)                     AS PLSS_STAGED_UNITS,
            NVL(QTY_SCHEDULED, QTY_LOADED)                 AS PLSS_STAGED_AVAILQTY,
            NVL(QTY_SCHEDULED, QTY_LOADED)                 AS PLSS_STAGED_SPECQTY,
            QTY_PRELOAD                                    AS PLSS_STAGED_PRLDQTY,
            SCHD_ORDER                                     AS PLSS_STAGED_ORDER,
            PLSS_STAGED_CUST,
            PLSS_STAGED_DELVLOC,
            2                                              AS PLSS_STAGED_LOADTYPE,
            SCHD_ORDER                                     AS ORDER_ID,
            TRIP_ORDER_NO,
            TRIP_CUSTOMER,
            TRIP_DELVLOC,
            QTY_LOADED, 
            QTY_AMB, 
            QTY_STD, 
            QTY_KG
        FROM
        (
            SELECT TMP.*, ROWNUM COMPARTMENT FROM
            (
                SELECT TC_SEQNO, EQPT_CODE, EQPT_ID,
                    ETYP_ID EQPT_ETP,
                    CMPT_NO,
                    DECODE(UNIT_ID, 11, 11, 17, 17, 5)                         AS CMPT_UNITS,
                    DECODE(UNIT_ID, 11, 'l (cor)', 17, 'kg', 'l (amb)')        AS CMPT_UNITS_NAME2,
                    UNIT_TITLE                                                 AS CMPT_UNITS_NAME,
                    ADJ_SAFEFILL                                               AS SAFEFILL,
                    ADJ_CAPACITY                                               AS SFL,
                    NVL(ADJ_CMPT_LOCK, 0)                                      AS ADJ_CMPT_LOCK
                FROM TNKR_EQUIP, GUI_EQUIPLIST_CMPT_VW
                WHERE EQPT_ID = TC_EQPT
                    AND TC_TANKER = (
                        SELECT SHL_TANKER FROM SCHEDULE WHERE SHLS_TRIP_NO = :shls_trip_no AND SHLS_SUPP = :shls_supp)
                ORDER BY TC_SEQNO, CMPT_NO
            ) TMP
        ) TANKER_INFO, 
        (
            SELECT SPEC_PROD.COMPARTMENT, 
                SPEC_PROD.PROD_CODE, 
                SPEC_PROD.PROD_NAME, 
                SPEC_PROD.PROD_CMPY,
                SPEC_PROD.UNIT_CODE, 
                SPEC_PROD.UNIT_NAME, 
                SPEC_PROD.QTY_SCHEDULED, 
                SPEC_PROD.QTY_PRELOAD,
                SPEC_PROD.SCHDSPEC_SHLSTRIP, 
                SPEC_PROD.SCHDSPEC_SHLSSUPP, 
                SPEC_PROD.SCHD_SOLD_TO_NUM,
                SPEC_PROD.SCHD_SHIP_TO_NUM, 
                SPEC_PROD.ORDER_CUST_ORDNO,
                SPEC_PROD.SCHD_ORDER,
                SPEC_PROD.SCHD_DELIV_NUM, 
                SPEC_PROD.PROD_CLASS, 
                SPEC_PROD.PLSS_STAGED_CUST,
                SPEC_PROD.PLSS_STAGED_DELVLOC,
                SPEC_PROD.TRIP_ORDER_NO,
                SPEC_PROD.TRIP_CUSTOMER,
                SPEC_PROD.TRIP_DELVLOC,
                DECODE(SPEC_PROD.UNIT_CODE, 
                    5, TRSF.TRIP_QTY_AMB, 
                    28, TRSF.TRIP_QTY_AMB, 
                    11, TRSF.TRIP_QTY_STD, 
                    17, TRSF.TRIP_QTY_KG, 
                    TRSF.TRIP_QTY_DELIVERED)               AS QTY_LOADED, 
                TRSF.TRIP_QTY_AMB                          AS QTY_AMB, 
                TRSF.TRIP_QTY_STD                          AS QTY_STD, 
                TRSF.TRIP_QTY_KG                           AS QTY_KG        
            FROM
                (
                    SELECT SPEC.SCHD_COMP_ID               AS COMPARTMENT,
                        PR.PROD_CODE                       AS PROD_CODE,
                        PR.PROD_NAME                       AS PROD_NAME,
                        PR.PROD_CMPY                       AS PROD_CMPY,
                        SPEC.SCHD_UNITS                    AS UNIT_CODE,
                        UV.DESCRIPTION                     AS UNIT_NAME,
                        SPEC.SCHD_SPECQTY                  AS QTY_SCHEDULED,
                        SPEC.SCHD_PRLDQTY                  AS QTY_PRELOAD,
                        SPEC.SCHDSPEC_SHLSTRIP,
                        SPEC.SCHDSPEC_SHLSSUPP,
                        SPEC.SCHD_SOLD_TO_NUM,
                        SPEC.SCHD_SHIP_TO_NUM,
                        CUST_ORDER.ORDER_CUST_ORDNO,
                        SPEC.SCHD_ORDER,
                        SPEC.SCHD_DELIV_NUM,
                        NVL(CUST_ORDER.ORDER_CUST, SCHD.SHLS_CUST)    AS PLSS_STAGED_CUST,
                        NVL(SCHD.SHLS_DELVLOC, CUSTOMER.CUST_DELIV_POINT)  AS PLSS_STAGED_DELVLOC,
                        DECODE(SPEC.SCHD_ORDER, NULL, TO_CHAR(SPEC.SCHDSPEC_SHLSTRIP), SPEC.SCHDSPEC_SHLSTRIP||'/'||CUST_ORDER.ORDER_CUST_ORDNO)               AS TRIP_ORDER_NO,
                        DECODE(NVL(CUST_ORDER.ORDER_CUST, SCHD.SHLS_CUST), NULL, NULL, NVL(CUST_ORDER.ORDER_CUST, SCHD.SHLS_CUST)||' - '||COMPANYS.CMPY_NAME)  AS TRIP_CUSTOMER,
                        DECODE(NVL(SCHD.SHLS_DELVLOC, CUSTOMER.CUST_DELIV_POINT), NULL, NULL, NVL(SCHD.SHLS_DELVLOC, CUSTOMER.CUST_DELIV_POINT)||' - '||DLOC.DLV_NAME)   AS TRIP_DELVLOC,
                        PR.PROD_CLASS
                    FROM SPECDETS SPEC,
                        SCHEDULE SCHD,
                        PRODUCTS PR,
                        UNIT_SCALE_VW UV,
                        CUST_ORDER,
                        CUSTOMER,
                        COMPANYS,
                        DELV_LOCATION DLOC
                    WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
                        AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
                        AND UV.UNIT_ID = SPEC.SCHD_UNITS
                        AND SPEC.SCHDSPEC_SHLSTRIP = :shls_trip_no
                        AND SPEC.SCHDSPEC_SHLSSUPP = :shls_supp
                        AND SCHD.SHLS_TRIP_NO = SPEC.SCHDSPEC_SHLSTRIP
                        AND SCHD.SHLS_SUPP = SPEC.SCHDSPEC_SHLSSUPP
                        AND SPEC.SCHD_ORDER = CUST_ORDER.ORDER_NO(+)
                        AND NVL(CUST_ORDER.ORDER_CUST, SCHD.SHLS_CUST) = CUSTOMER.CUST_ACCT(+)
                        AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+)
                        AND NVL(SCHD.SHLS_DELVLOC, CUSTOMER.CUST_DELIV_POINT) = DLOC.DLV_CODE(+)
                ) SPEC_PROD, 
                (
                    SELECT SCHEDULE.SHLS_SUPP              AS TRIP_SUPPLIER,
                        PRODUCTS.PROD_CLASS                AS PROD_CLASS,
                        SCHEDULE.SHLS_TRIP_NO              AS TRIP_NO,
                        TRANSFERS.TRSF_DES                 AS TRIP_COMPARTMENT,
                        TRANSFERS.TRSFPROD_PRODCMPY        AS TRIP_PRODCMPY,
                        TRANSFERS.TRSFPROD_PRODCODE        AS TRIP_PRODCODE,
                        SUM(TRANSFERS.TRSF_QTY_AMB)        AS TRIP_QTY_AMB,
                        SUM(TRANSFERS.TRSF_QTY_COR)        AS TRIP_QTY_STD,
                        SUM(TRANSFERS.TRSF_LOAD_KG)        AS TRIP_QTY_KG,
                        SUM(TRANSFERS.TRSF_RETURNS)        AS TRIP_QTY_RTN,
                        SUM(TRANSFERS.TRSF_PRELOAD_KG)     AS TRIP_QTY_PKG,
                        SUM(TRANSFERS.TRSF_DELIVERED)      AS TRIP_QTY_DELIVERED
                    FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                    WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                        AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                        AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                        AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                        AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                        AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
                    GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
                        TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
                ) TRSF
            WHERE
                SPEC_PROD.SCHDSPEC_SHLSSUPP = TRSF.TRIP_SUPPLIER (+)
                AND SPEC_PROD.SCHDSPEC_SHLSTRIP = TRSF.TRIP_NO (+)
                AND SPEC_PROD.COMPARTMENT = TRSF.TRIP_COMPARTMENT (+)
                AND SPEC_PROD.PROD_CLASS = TRSF.PROD_CLASS (+)
        ) SPEC_INFO
        WHERE TANKER_INFO.COMPARTMENT = SPEC_INFO.COMPARTMENT(+)
        ORDER BY COMPARTMENT
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_trip_products()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        /*
            need to get customer details at product level:
            a. check if the product has OO, if it has, use OO's ORDER_CUST
            b. if not, check if the schedule has value in SHLS_CUST, if it has, use SHLS_CUST
            c. otherwise, customer does not exist
        */

        $sched_service = new ScheduleService($this->conn);
        $this->drawer_code = $sched_service->shls_drawer($this->shls_trip_no, $this->supplier_code);

        write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
        SELECT LOADED.UNIT_CODE,
            LOADED.QTY_SCHEDULED,
            NVL(PRODUCTS.PROD_CODE, LOADED.PROD_CODE)      AS PROD_CODE,
            NVL(PRODUCTS.PROD_NAME, LOADED.PROD_NAME)      AS PROD_NAME,
            NVL(PRODUCTS.PROD_CMPY, LOADED.PROD_CMPY)      AS PROD_CMPY,
            NVL(PRODUCTS.PROD_CLASS, LOADED.PROD_CLASS)    AS PROD_CLASS,
            PRODUCTS.PROD_IMAGE,
            LOADED.QTY_LOADED,
            LOADED.UNIT_NAME, 
            LOADED.QTY_PRELOADED,
            LOADED.SCHPSPID_SHLSTRIP, 
            LOADED.SCHPSPID_SHLSSUPP,
            LOADED.ORDER_CUST_ORDNO,
            LOADED.SCHP_ORDER,    
            NULL                                           AS PLSS_PICKUP_TRIP,
            NULL                                           AS PLSS_PICKUP_SUPP,
            NULL                                           AS PLSS_PICKUP_CMPT,
            LOADED.SCHPSPID_SHLSTRIP                       AS PLSS_STAGED_TRIP,
            LOADED.SCHPSPID_SHLSSUPP                       AS PLSS_STAGED_SUPP,
            NULL                                           AS PLSS_STAGED_CMPT,
            NVL(PRODUCTS.PROD_CODE, LOADED.PROD_CODE)      AS PLSS_STAGED_PRODCODE,
            NVL(PRODUCTS.PROD_CMPY, LOADED.PROD_CMPY)      AS PLSS_STAGED_PRODCMPY,
            LOADED.UNIT_CODE                               AS PLSS_STAGED_UNITS,
            LOADED.QTY_SCHEDULED                           AS PLSS_STAGED_AVAILQTY,
            LOADED.QTY_SCHEDULED                           AS PLSS_STAGED_SPECQTY,
            LOADED.QTY_PRELOADED                           AS PLSS_STAGED_PRLDQTY,
            LOADED.SCHP_ORDER                              AS PLSS_STAGED_ORDER,
            LOADED.PLSS_STAGED_CUST,
            LOADED.PLSS_STAGED_DELVLOC,
            3                                              AS PLSS_STAGED_LOADTYPE,
            LOADED.SCHP_ORDER                              AS ORDER_ID,
            LOADED.TRIP_ORDER_NO,
            LOADED.TRIP_CUSTOMER,
            LOADED.TRIP_DELVLOC,
            LOADED.QTY_AMB,
            LOADED.QTY_STD,
            LOADED.QTY_KG
        FROM PRODUCTS,
        (
            SELECT SPEC_PR.UNIT_CODE, 
                SPEC_PR.QTY_SCHEDULED, 
                SPEC_PR.PROD_CODE, 
                SPEC_PR.PROD_NAME, 
                SPEC_PR.PROD_CMPY, 
                SPEC_PR.PROD_CLASS,
                SPEC_PR.SCHPSPID_SHLSTRIP, 
                SPEC_PR.SCHPSPID_SHLSSUPP,
                SPEC_PR.SCHP_UNITS,
                SPEC_PR.SCHP_ORDER,    
                SPEC_PR.ORDER_CUST_ORDNO,
                SPEC_PR.PLSS_STAGED_CUST,
                SPEC_PR.PLSS_STAGED_DELVLOC,
                SPEC_PR.TRIP_ORDER_NO,
                SPEC_PR.TRIP_CUSTOMER,
                SPEC_PR.TRIP_DELVLOC,
                DECODE(SPEC_PR.SCHP_UNITS, 
                    5, TRSF.TRIP_QTY_AMB, 
                    28, TRSF.TRIP_QTY_AMB, 
                    11, TRSF.TRIP_QTY_STD, 
                    17, TRSF.TRIP_QTY_KG, 
                    TRSF.TRIP_QTY_DELIVERED)               AS QTY_LOADED, 
                UV.DESCRIPTION                             AS UNIT_NAME, 
                CMPT.TRIP_QTY_PRELOAD                      AS QTY_PRELOADED, 
                TRSF.TRIP_QTY_AMB                          AS QTY_AMB, 
                TRSF.TRIP_QTY_STD                          AS QTY_STD, 
                TRSF.TRIP_QTY_KG                           AS QTY_KG
            FROM
                (
                    SELECT SPEC.SCHPSPID_SHLSTRIP, 
                        SPEC.SCHPSPID_SHLSSUPP,
                        SPEC.SCHP_UNITS,
                        PR.PROD_CLASS,
                        SPEC.SCHP_UNITS                    AS UNIT_CODE,
                        SPEC.SCHP_SPECQTY                  AS QTY_SCHEDULED,
                        SPEC.SCHP_ORDER,    
                        CUST_ORDER.ORDER_CUST_ORDNO,
                        NVL(CUST_ORDER.ORDER_CUST, SCHD.SHLS_CUST)    AS PLSS_STAGED_CUST,
                        NVL(SCHD.SHLS_DELVLOC, CUSTOMER.CUST_DELIV_POINT)  AS PLSS_STAGED_DELVLOC,
                        DECODE(SPEC.SCHP_ORDER, NULL, TO_CHAR(SPEC.SCHPSPID_SHLSTRIP), SPEC.SCHPSPID_SHLSTRIP||'/'||CUST_ORDER.ORDER_CUST_ORDNO)               AS TRIP_ORDER_NO,
                        DECODE(NVL(CUST_ORDER.ORDER_CUST, SCHD.SHLS_CUST), NULL, NULL, NVL(CUST_ORDER.ORDER_CUST, SCHD.SHLS_CUST)||' - '||COMPANYS.CMPY_NAME)  AS TRIP_CUSTOMER,
                        DECODE(NVL(SCHD.SHLS_DELVLOC, CUSTOMER.CUST_DELIV_POINT), NULL, NULL, NVL(SCHD.SHLS_DELVLOC, CUSTOMER.CUST_DELIV_POINT)||' - '||DLOC.DLV_NAME)   AS TRIP_DELVLOC,
                        PR.PROD_CODE                       AS PROD_CODE,
                        PR.PROD_NAME                       AS PROD_NAME,
                        PR.PROD_CMPY                       AS PROD_CMPY
                    FROM SPECPROD SPEC,
                        SCHEDULE SCHD,
                        PRODUCTS PR,
                        CUST_ORDER,
                        CUSTOMER,
                        COMPANYS,
                        DELV_LOCATION DLOC
                    WHERE SPEC.SCHPPROD_PRODCMPY = PR.PROD_CMPY               -- product company will be always the supplier in SPECPROD
                        AND SPEC.SCHPPROD_PRODCODE = PR.PROD_CODE
                        AND SPEC.SCHPSPID_SHLSTRIP = :shls_trip_no
                        AND SPEC.SCHPSPID_SHLSSUPP = :shls_supp
                        AND SCHD.SHLS_TRIP_NO = SPEC.SCHPSPID_SHLSTRIP
                        AND SCHD.SHLS_SUPP = SPEC.SCHPSPID_SHLSSUPP
                        AND SPEC.SCHP_ORDER = CUST_ORDER.ORDER_NO(+)
                        AND NVL(CUST_ORDER.ORDER_CUST, SCHD.SHLS_CUST) = CUSTOMER.CUST_ACCT(+)
                        AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+)
                        AND NVL(SCHD.SHLS_DELVLOC, CUSTOMER.CUST_DELIV_POINT) = DLOC.DLV_CODE(+)
                ) SPEC_PR, 
                UNIT_SCALE_VW UV, 
                (
                    SELECT SPDT.SCHDSPEC_SHLSSUPP          AS TRIP_SUPPLIER,
                        SPDT.SCHDSPEC_SHLSTRIP             AS TRIP_NO,
                        SPDT.SCHDPROD_PRODCMPY             AS TRIP_PRODCMPY,
                        SPDT.SCHDPROD_PRODCODE             AS TRIP_PRODCODE,
                        SUM(SPDT.SCHD_PRESETQTY)           AS TRIP_QTY_PRESET,
                        SUM(SPDT.SCHD_PRLDQTY)             AS TRIP_QTY_PRELOAD,
                        SUM(SPDT.SCHD_SPECQTY)             AS TRIP_QTY_SCHED,
                        SUM(SPDT.SCHD_DELIVERED)           AS TRIP_QTY_LOADED,
                        PRODUCTS.PROD_CLASS
                    FROM PRODUCTS, (
                        SELECT 
                            SCHDSPEC_SHLSSUPP,
                            SCHDSPEC_SHLSTRIP,
                            -- product company will be the drawer sometimes in SPECDETS, convert it to supplier
                            DECODE(SCHDPROD_PRODCMPY, :drawer_code, SCHDSPEC_SHLSSUPP, SCHDPROD_PRODCMPY) AS SCHDPROD_PRODCMPY,
                            SCHDPROD_PRODCODE,
                            SCHD_PRESETQTY,
                            SCHD_PRLDQTY,
                            SCHD_SPECQTY,
                            SCHD_DELIVERED
                        FROM SPECDETS
                        WHERE SCHDSPEC_SHLSSUPP=:shls_supp AND SCHDSPEC_SHLSTRIP = :shls_trip_no
                        ) SPDT
                    WHERE SPDT.SCHDPROD_PRODCMPY = PRODUCTS.PROD_CMPY 
                        AND SPDT.SCHDPROD_PRODCODE = PRODUCTS.PROD_CODE
                    GROUP BY SPDT.SCHDSPEC_SHLSSUPP, SPDT.SCHDSPEC_SHLSTRIP, SPDT.SCHDPROD_PRODCMPY, SPDT.SCHDPROD_PRODCODE, PRODUCTS.PROD_CLASS
                ) CMPT, 
                (
                    SELECT SCHEDULE.SHLS_SUPP              AS TRIP_SUPPLIER
                        , PRODUCTS.PROD_CLASS,
                        SCHEDULE.SHLS_TRIP_NO              AS TRIP_NO,
                        -- product company will be the drawer sometimes in TRANSFERS, leave as it is
                        -- TRANSFERS.TRSFPROD_PRODCMPY     AS TRIP_PRODCMPY,
                        DECODE(TRANSFERS.TRSFPROD_PRODCMPY, :drawer_code, SCHEDULE.SHLS_SUPP, TRANSFERS.TRSFPROD_PRODCMPY) AS TRIP_PRODCMPY,
                        TRANSFERS.TRSFPROD_PRODCODE        AS TRIP_PRODCODE,
                        SUM(TRANSFERS.TRSF_QTY_AMB)        AS TRIP_QTY_AMB,
                        SUM(TRANSFERS.TRSF_QTY_COR)        AS TRIP_QTY_STD,
                        SUM(TRANSFERS.TRSF_LOAD_KG)        AS TRIP_QTY_KG,
                        SUM(TRANSFERS.TRSF_RETURNS)        AS TRIP_QTY_RTN,
                        SUM(TRANSFERS.TRSF_PRELOAD_KG)     AS TRIP_QTY_PKG,
                        SUM(TRANSFERS.TRSF_DELIVERED)      AS TRIP_QTY_DELIVERED
                    FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                    WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                        AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                        AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                        AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                        AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                        AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        AND TRSFPROD_PRODCODE = PROD_CODE 
                        AND DECODE(TRANSFERS.TRSFPROD_PRODCMPY, :drawer_code, SCHEDULE.SHLS_SUPP, TRANSFERS.TRSFPROD_PRODCMPY) = PROD_CMPY
                        AND SCHEDULE.SHLS_TRIP_NO = :shls_trip_no
                        AND SCHEDULE.SHLS_SUPP = :shls_supp
                    GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, 
                        DECODE(TRANSFERS.TRSFPROD_PRODCMPY, :drawer_code, SCHEDULE.SHLS_SUPP, TRANSFERS.TRSFPROD_PRODCMPY), 
                        TRANSFERS.TRSFPROD_PRODCODE, PRODUCTS.PROD_CLASS
                ) TRSF
            WHERE SPEC_PR.SCHPSPID_SHLSSUPP = CMPT.TRIP_SUPPLIER (+)
                AND SPEC_PR.SCHPSPID_SHLSTRIP = CMPT.TRIP_NO (+)
                -- AND SPEC_PR.PROD_CLASS = CMPT.PROD_CLASS (+)
                AND SPEC_PR.PROD_CODE = CMPT.TRIP_PRODCODE(+)
                AND SPEC_PR.PROD_CMPY = CMPT.TRIP_PRODCMPY(+)
                AND CMPT.TRIP_SUPPLIER = TRSF.TRIP_SUPPLIER (+)
                AND CMPT.TRIP_NO = TRSF.TRIP_NO (+)
                -- AND CMPT.PROD_CLASS = TRSF.PROD_CLASS (+)
                AND CMPT.TRIP_PRODCODE = TRSF.TRIP_PRODCODE(+)
                AND CMPT.TRIP_PRODCMPY = TRSF.TRIP_PRODCMPY(+)
                AND UV.UNIT_ID = SPEC_PR.SCHP_UNITS
        ) LOADED
        WHERE PRODUCTS.PROD_CMPY = LOADED.PROD_CMPY(+)
            AND PRODUCTS.PROD_CODE = LOADED.PROD_CODE(+)
            AND PRODUCTS.PROD_CMPY = :shls_supp
        ORDER BY PRODUCTS.PROD_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        oci_bind_by_name($stmt, ':drawer_code', $this->drawer_code);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_order_items()
    {
        $query = "
            SELECT 
                OPD.ORDER_PROD_UNIT                        AS UNIT_CODE,
                NVL(OO_QTY.QTY_SCHEDULED,0)                AS QTY_SCHEDULED,
                OPD.OSPROD_PRODCODE                        AS PROD_CODE,
                P.PROD_NAME                                AS PROD_NAME,
                OPD.OSPROD_PRODCMPY                        AS PROD_CMPY,
                P.PROD_CODE||' - '||P.PROD_NAME            AS PROD_DESC,
                P.PROD_CLASS                               AS PROD_CLASS,
                P.PROD_IMAGE                               AS PROD_IMAGE,
                NVL(OO_QTY.QTY_LOADED,0)                   AS QTY_LOADED,
                UV.DESCRIPTION                             AS UNIT_NAME, 
                NVL(OO_QTY.QTY_PRELOADED,0)                AS QTY_PRELOADED,
                -- LOADED.SCHPSPID_SHLSTRIP, 
                -- LOADED.SCHPSPID_SHLSSUPP,
                CO.ORDER_CUST_ORDNO,
                OPD.ORDER_PROD_KEY                         AS SCHP_ORDER,    
                NULL                                       AS PLSS_PICKUP_TRIP,
                NULL                                       AS PLSS_PICKUP_SUPP,
                NULL                                       AS PLSS_PICKUP_CMPT,
                NULL                                       AS PLSS_STAGED_TRIP,
                CUSTOMER.CUST_SUPP                         AS PLSS_STAGED_SUPP,
                NULL                                       AS PLSS_STAGED_CMPT,
                OPD.OSPROD_PRODCODE                        AS PLSS_STAGED_PRODCODE,
                OPD.OSPROD_PRODCMPY                        AS PLSS_STAGED_PRODCMPY,
                OPD.ORDER_PROD_UNIT                        AS PLSS_STAGED_UNITS,
                (OPD.ORDER_PROD_QTY - OPD.OPROD_SCHEDULED) AS PLSS_STAGED_AVAILQTY,
                (OPD.ORDER_PROD_QTY - OPD.OPROD_SCHEDULED) AS PLSS_STAGED_SPECQTY,
                NVL(OO_QTY.QTY_PRELOADED,0)                AS PLSS_STAGED_PRLDQTY,
                OPD.ORDER_PROD_KEY                         AS PLSS_STAGED_ORDER,
                CO.ORDER_CUST                              AS PLSS_STAGED_CUST,
                NVL(CO.ORDER_DLV_CODE, CUSTOMER.CUST_DELIV_POINT)                  AS PLSS_STAGED_DELVLOC,
                4                                          AS PLSS_STAGED_LOADTYPE,
                OPD.ORDER_PROD_KEY                         AS ORDER_ID,
                NULL||'/'||CO.ORDER_CUST_ORDNO             AS TRIP_ORDER_NO,
                DECODE(CO.ORDER_CUST, NULL, NULL, CO.ORDER_CUST||' - '||COMPANYS.CMPY_NAME)                       AS TRIP_CUSTOMER,
                DECODE(NVL(CO.ORDER_DLV_CODE, CUSTOMER.CUST_DELIV_POINT), NULL, NULL, NVL(CO.ORDER_DLV_CODE, CUSTOMER.CUST_DELIV_POINT)||' - '||DLOC.DLV_NAME)    AS TRIP_DELVLOC,
                NVL(OO_QTY.QTY_AMB,0)                      AS QTY_AMB,
                NVL(OO_QTY.QTY_STD,0)                      AS QTY_STD,
                NVL(OO_QTY.QTY_KG,0)                       AS QTY_KG,
                OPD.ORDER_PROD_QTY                         AS SCHP_SPECQTY, 
                OPD.ORDER_PROD_QTY                         AS QTY_PLANNED, 
                OPD.ORDER_PROD_KEY,    
                OPD.OPROD_SCHEDULED                        AS OITEM_SCHD_QTY,
                OPD.OPROD_LOADED                           AS OITEM_LOAD_QTY,
                OPD.OPROD_DELIVERED                        AS OITEM_DELV_QTY,
                OPD.ORDER_PROD_QTY                         AS OITEM_PROD_QTY,
                OPD.OPROD_CH_NO,
                OPD.OPRD_LINE_ITEMNO,
                DRAWER_P.PROD_CMPY                         AS DRAW_PROD_CMPY, 
                DRAWER_P.PROD_CODE                         AS DRAW_PROD_CODE, 
                DRAWER_P.PROD_NAME                         AS DRAW_PROD_NAME, 
                DRAWER_P.PROD_CODE||' - '||DRAWER_P.PROD_NAME        AS DRAW_PROD_DESC,
                DRAWER_P.PROD_CLASS                        AS DRAW_PROD_CLASS
            FROM
                OPRODMTD OPD,
                CUST_ORDER CO,
                CUSTOMER,
                COMPANYS,
                DELV_LOCATION DLOC,
                UNIT_SCALE_VW UV,
                PRODUCTS P,
                PRODUCTS DRAWER_P,
                (
                select 
                    TRIP_PROD.PROD_CODE,
                    sum(TRIP_PROD.QTY_SCHED) QTY_SCHEDULED,
                    sum(TRIP_PROD.QTY_PRELOADED) QTY_PRELOADED,
                    sum(TRIP_PROD.QTY_LOADED) QTY_LOADED,
                    sum(TRIP_PROD.QTY_AMB) QTY_AMB,
                    sum(TRIP_PROD.QTY_STD) QTY_STD,
                    sum(TRIP_PROD.QTY_KG) QTY_KG
                from
                    CUST_ORDER CO,
                    ORD_SCHEDULE OS,
                    (
                    select
                        pr.PROD_CODE                       AS PROD_CODE
                        , pr.PROD_NAME                     AS PROD_NAME
                        , pr.PROD_CMPY                     AS PROD_CMPY
                        , spec.SCHP_UNITS                  AS UNIT_CODE
                        -- , uv.DESCRIPTION                   AS UNIT_NAME
                        , spec.SCHP_SPECQTY                AS SCHP_SPECQTY
                        , NVL(DECODE(spec.SCHP_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED), 0) AS QTY_LOADED
                        , cmpt.TRIP_QTY_PRELOAD            AS QTY_PRELOADED
                        , cmpt.TRIP_QTY_SCHED              AS QTY_SCHED
                        , trsf.TRIP_QTY_AMB                AS QTY_AMB
                        , trsf.TRIP_QTY_STD                AS QTY_STD
                        , trsf.TRIP_QTY_KG                 AS QTY_KG
                        , spec.SCHPSPID_SHLSTRIP
                        , spec.SCHPSPID_SHLSSUPP
                    from
                        SPECPROD spec
                        , PRODUCTS pr
                        -- , UNIT_SCALE_VW uv
                        , (
                        select
                            SPECDETS.SCHDSPEC_SHLSSUPP     AS TRIP_SUPPLIER
                            , SPECDETS.SCHDSPEC_SHLSTRIP   AS TRIP_NO
                            , SPECDETS.SCHDPROD_PRODCMPY   AS TRIP_PRODCMPY
                            , SPECDETS.SCHDPROD_PRODCODE   AS TRIP_PRODCODE
                            , SUM(SPECDETS.SCHD_PRESETQTY) AS TRIP_QTY_PRESET
                            , SUM(SPECDETS.SCHD_PRLDQTY)   AS TRIP_QTY_PRELOAD
                            , SUM(SPECDETS.SCHD_SPECQTY)   AS TRIP_QTY_SCHED
                            , SUM(SPECDETS.SCHD_DELIVERED) AS TRIP_QTY_LOADED
                        from SPECDETS
                        group by SPECDETS.SCHDSPEC_SHLSSUPP, SPECDETS.SCHDSPEC_SHLSTRIP, SPECDETS.SCHDPROD_PRODCMPY, SPECDETS.SCHDPROD_PRODCODE
                        ) cmpt
                        , (
                        select
                            SCHEDULE.SHLS_SUPP                 AS TRIP_SUPPLIER
                            , SCHEDULE.SHLS_TRIP_NO            AS TRIP_NO
                            , TRANSFERS.TRSFPROD_PRODCMPY      AS TRIP_PRODCMPY
                            , TRANSFERS.TRSFPROD_PRODCODE      AS TRIP_PRODCODE
                            , SUM(TRANSFERS.TRSF_QTY_AMB)      AS TRIP_QTY_AMB
                            , SUM(TRANSFERS.TRSF_QTY_COR)      AS TRIP_QTY_STD
                            , SUM(TRANSFERS.TRSF_LOAD_KG)      AS TRIP_QTY_KG
                            , SUM(TRANSFERS.TRSF_RETURNS)      AS TRIP_QTY_RTN
                            , SUM(TRANSFERS.TRSF_PRELOAD_KG)   AS TRIP_QTY_PKG
                            , SUM(TRANSFERS.TRSF_DELIVERED)    AS TRIP_QTY_DELIVERED
                        from
                            SCHEDULE
                            , LOADS
                            , TRANSACTIONS
                            , TRANSFERS
                        where
                            SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                            and SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                            and LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                            and LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                            and TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                            and TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        group by SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
                        ) trsf
                    where
                        spec.SCHPSPID_SHLSSUPP = cmpt.TRIP_SUPPLIER (+)
                        and spec.SCHPSPID_SHLSTRIP = cmpt.TRIP_NO (+)
                        and spec.SCHPPROD_PRODCMPY = cmpt.TRIP_PRODCMPY (+)
                        and spec.SCHPPROD_PRODCODE = cmpt.TRIP_PRODCODE (+)
                        and cmpt.TRIP_SUPPLIER = trsf.TRIP_SUPPLIER (+)
                        and cmpt.TRIP_NO = trsf.TRIP_NO (+)
                        and cmpt.TRIP_PRODCMPY = trsf.TRIP_PRODCMPY (+)
                        and cmpt.TRIP_PRODCODE = trsf.TRIP_PRODCODE (+)
                        and spec.SCHPPROD_PRODCMPY = pr.PROD_CMPY
                        and spec.SCHPPROD_PRODCODE = pr.PROD_CODE
                        -- and uv.UNIT_ID = spec.SCHP_UNITS
                    order by spec.SCHPSPID_SHLSSUPP, spec.SCHPSPID_SHLSTRIP, pr.PROD_NAME
                    ) trip_prod
                where
                    CO.ORDER_NO = OS.OS_ORDER_NO
                    and OS.OS_SHL_SHLSTRIP = trip_prod.SCHPSPID_SHLSTRIP
                    and OS.OS_SHL_SHLSSUPP = trip_prod.SCHPSPID_SHLSSUPP
                    and CO.ORDER_CUST_ORDNO = :order_cust_no
                group by trip_prod.PROD_CODE, CO.ORDER_CUST_ORDNO
                ) OO_QTY
            WHERE
                OPD.ORDER_PROD_KEY=CO.ORDER_NO
                AND OPD.OSPROD_PRODCODE = P.PROD_CODE
                AND OPD.OSPROD_PRODCMPY = P.PROD_CMPY
                AND OPD.ORDER_PROD_UNIT = UV.UNIT_ID
                AND DRAWER_P.PROD_CLASS = P.PROD_CLASS -- get comptiable drawer products
                AND DRAWER_P.PROD_CMPY = CO.ORDER_DRAWER -- get comptiable drawer products
                AND OPD.OSPROD_PRODCODE = OO_QTY.PROD_CODE(+)
                AND CO.ORDER_CUST_ORDNO = :order_cust_no
                AND OPD.OSPROD_PRODCMPY = :supplier
                AND OPD.ORDER_PROD_QTY > 0
                AND (OPD.ORDER_PROD_QTY - NVL(OO_QTY.QTY_LOADED,0)) > 0
                AND CO.ORDER_CUST = CUSTOMER.CUST_ACCT
                AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE
                AND NVL(CO.ORDER_DLV_CODE, CUSTOMER.CUST_DELIV_POINT) = DLOC.DLV_CODE(+)
            ORDER BY OPD.OSPROD_PRODCODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':order_cust_no', $this->order_cust_no);
//        oci_bind_by_name($stmt, ':order_sys_no', $this->order_sys_no);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_order_products()
    {
        $query = "
            SELECT 
                CO.ORDER_CUST_ORDNO, 
                OPD.OSPROD_PRODCMPY                        AS PROD_CMPY, 
                OPD.OSPROD_PRODCODE                        AS PROD_CODE, 
                P.PROD_NAME                                AS PROD_NAME, 
                P.PROD_CODE||' - '||P.PROD_NAME            AS PROD_DESC,
                P.PROD_CLASS                               AS PROD_CLASS, 
                OPD.ORDER_PROD_QTY                         AS SCHP_SPECQTY, 
                OPD.ORDER_PROD_QTY                         AS QTY_PLANNED, 
                OPD.ORDER_PROD_UNIT                        AS UNIT_CODE,
                UV.DESCRIPTION                             AS UNIT_NAME,
                -- decode(OPD.ORDER_PROD_UNIT,'5','l(amb)','11','l(cor)','17','kg','unknown') AS UNIT_NAME, 
                NVL(OO_QTY.QTY_SCHEDULED,0)                AS QTY_SCHEDULED, 
                NVL(OO_QTY.QTY_PRELOADED,0)                AS QTY_PRELOADED, 
                NVL(OO_QTY.QTY_LOADED,0)                   AS QTY_LOADED, 
                NVL(OO_QTY.QTY_AMB,0)                      AS QTY_AMB, 
                NVL(OO_QTY.QTY_STD,0)                      AS QTY_STD, 
                NVL(OO_QTY.QTY_KG,0)                       AS QTY_KG,
                DRAWER_P.PROD_CMPY                         AS DRAW_PROD_CMPY, 
                DRAWER_P.PROD_CODE                         AS DRAW_PROD_CODE, 
                DRAWER_P.PROD_NAME                         AS DRAW_PROD_NAME, 
                DRAWER_P.PROD_CODE||' - '||DRAWER_P.PROD_NAME        AS DRAW_PROD_DESC,
                DRAWER_P.PROD_CLASS                        AS DRAW_PROD_CLASS
            FROM
                CUST_ORDER CO,
                OPRODMTD OPD,
                UNIT_SCALE_VW UV,
                PRODUCTS P,
                PRODUCTS DRAWER_P,
                (
                select 
                    TRIP_PROD.PROD_CODE,
                    sum(TRIP_PROD.QTY_SCHED) QTY_SCHEDULED,
                    sum(TRIP_PROD.QTY_PRELOADED) QTY_PRELOADED,
                    sum(TRIP_PROD.QTY_LOADED) QTY_LOADED,
                    sum(TRIP_PROD.QTY_AMB) QTY_AMB,
                    sum(TRIP_PROD.QTY_STD) QTY_STD,
                    sum(TRIP_PROD.QTY_KG) QTY_KG
                from
                    CUST_ORDER CO,
                    ORD_SCHEDULE OS,
                    (
                    select
                        pr.PROD_CODE                       AS PROD_CODE
                        , pr.PROD_NAME                     AS PROD_NAME
                        , pr.PROD_CMPY                     AS PROD_CMPY
                        , spec.SCHP_UNITS                  AS UNIT_CODE
                        -- , uv.DESCRIPTION                   AS UNIT_NAME
                        , spec.SCHP_SPECQTY                AS SCHP_SPECQTY
                        , NVL(DECODE(spec.SCHP_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED), 0) AS QTY_LOADED
                        , cmpt.TRIP_QTY_PRELOAD            AS QTY_PRELOADED
                        , cmpt.TRIP_QTY_SCHED              AS QTY_SCHED
                        , trsf.TRIP_QTY_AMB                AS QTY_AMB
                        , trsf.TRIP_QTY_STD                AS QTY_STD
                        , trsf.TRIP_QTY_KG                 AS QTY_KG
                        , spec.SCHPSPID_SHLSTRIP
                        , spec.SCHPSPID_SHLSSUPP
                    from
                        SPECPROD spec
                        , PRODUCTS pr
                        -- , UNIT_SCALE_VW uv
                        , (
                        select
                            SPECDETS.SCHDSPEC_SHLSSUPP     AS TRIP_SUPPLIER
                            , SPECDETS.SCHDSPEC_SHLSTRIP   AS TRIP_NO
                            , SPECDETS.SCHDPROD_PRODCMPY   AS TRIP_PRODCMPY
                            , SPECDETS.SCHDPROD_PRODCODE   AS TRIP_PRODCODE
                            , SUM(SPECDETS.SCHD_PRESETQTY) AS TRIP_QTY_PRESET
                            , SUM(SPECDETS.SCHD_PRLDQTY)   AS TRIP_QTY_PRELOAD
                            , SUM(SPECDETS.SCHD_SPECQTY)   AS TRIP_QTY_SCHED
                            , SUM(SPECDETS.SCHD_DELIVERED) AS TRIP_QTY_LOADED
                        from SPECDETS
                        group by SPECDETS.SCHDSPEC_SHLSSUPP, SPECDETS.SCHDSPEC_SHLSTRIP, SPECDETS.SCHDPROD_PRODCMPY, SPECDETS.SCHDPROD_PRODCODE
                        ) cmpt
                        , (
                        select
                            SCHEDULE.SHLS_SUPP                 AS TRIP_SUPPLIER
                            , SCHEDULE.SHLS_TRIP_NO            AS TRIP_NO
                            , TRANSFERS.TRSFPROD_PRODCMPY      AS TRIP_PRODCMPY
                            , TRANSFERS.TRSFPROD_PRODCODE      AS TRIP_PRODCODE
                            , SUM(TRANSFERS.TRSF_QTY_AMB)      AS TRIP_QTY_AMB
                            , SUM(TRANSFERS.TRSF_QTY_COR)      AS TRIP_QTY_STD
                            , SUM(TRANSFERS.TRSF_LOAD_KG)      AS TRIP_QTY_KG
                            , SUM(TRANSFERS.TRSF_RETURNS)      AS TRIP_QTY_RTN
                            , SUM(TRANSFERS.TRSF_PRELOAD_KG)   AS TRIP_QTY_PKG
                            , SUM(TRANSFERS.TRSF_DELIVERED)    AS TRIP_QTY_DELIVERED
                        from
                            SCHEDULE
                            , LOADS
                            , TRANSACTIONS
                            , TRANSFERS
                        where
                            SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                            and SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                            and LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                            and LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                            and TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                            and TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        group by SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
                        ) trsf
                    where
                        spec.SCHPSPID_SHLSSUPP = cmpt.TRIP_SUPPLIER (+)
                        and spec.SCHPSPID_SHLSTRIP = cmpt.TRIP_NO (+)
                        and spec.SCHPPROD_PRODCMPY = cmpt.TRIP_PRODCMPY (+)
                        and spec.SCHPPROD_PRODCODE = cmpt.TRIP_PRODCODE (+)
                        and cmpt.TRIP_SUPPLIER = trsf.TRIP_SUPPLIER (+)
                        and cmpt.TRIP_NO = trsf.TRIP_NO (+)
                        and cmpt.TRIP_PRODCMPY = trsf.TRIP_PRODCMPY (+)
                        and cmpt.TRIP_PRODCODE = trsf.TRIP_PRODCODE (+)
                        and spec.SCHPPROD_PRODCMPY = pr.PROD_CMPY
                        and spec.SCHPPROD_PRODCODE = pr.PROD_CODE
                        -- and uv.UNIT_ID = spec.SCHP_UNITS
                    order by spec.SCHPSPID_SHLSSUPP, spec.SCHPSPID_SHLSTRIP, pr.PROD_NAME
                    ) trip_prod
                where
                    CO.ORDER_NO = OS.OS_ORDER_NO
                    and OS.OS_SHL_SHLSTRIP = trip_prod.SCHPSPID_SHLSTRIP
                    and OS.OS_SHL_SHLSSUPP = trip_prod.SCHPSPID_SHLSSUPP
                    and CO.ORDER_CUST_ORDNO = :order_cust_no
                group by trip_prod.PROD_CODE, CO.ORDER_CUST_ORDNO
                ) OO_QTY
            WHERE
                OPD.ORDER_PROD_KEY=CO.ORDER_NO
                AND OPD.OSPROD_PRODCODE = P.PROD_CODE
                AND OPD.OSPROD_PRODCMPY = P.PROD_CMPY
                AND OPD.ORDER_PROD_UNIT = UV.UNIT_ID
                AND DRAWER_P.PROD_CLASS = P.PROD_CLASS -- get comptiable drawer products
                AND DRAWER_P.PROD_CMPY = CO.ORDER_DRAWER -- get comptiable drawer products
                AND OPD.OSPROD_PRODCODE = OO_QTY.PROD_CODE(+)
                AND CO.ORDER_CUST_ORDNO = :order_cust_no
                AND OPD.OSPROD_PRODCMPY = :supplier
                AND OPD.ORDER_PROD_QTY > 0
                AND (OPD.ORDER_PROD_QTY - NVL(OO_QTY.QTY_LOADED,0)) > 0
            ORDER BY OPD.OSPROD_PRODCODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':order_cust_no', $this->order_cust_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        return $stmt;
    }



    public function get_tnkr_cmpts()
    {
        $query = "
            SELECT BASIC.*,
                PREV.TRSFPROD_PRODCODE PREV_PROD_CODE,
                PREV.PROD_NAME PREV_PROD_NAME
                FROM
                (
                SELECT EQPT_CODE, 
                    EQPT_ID,
                    ROWNUM COMPARTMENT,
                    EQPT_CMPT, 
                    NULL PROD_CODE,
                    NULL PROD_NAME,
                    NULL PROD_CMPY,
                    UNIT_CODE,
                    UNIT_NAME, 
                    SAFEFILL, 
                    0 QTY_SCHEDULED,
                    0 QTY_PRELOAD,
                    NULL SCHDSPEC_SHLSTRIP,
                    NULL SCHDSPEC_SHLSSUPP,
                    NULL SCHD_SOLD_TO_NUM,
                    NULL SCHD_SHIP_TO_NUM,
                    NULL ORDER_CUST_ORDNO,
                    NULL SCHD_ORDER,
                    NULL SCHD_DELIV_NUM,
                    NULL PROD_CLASS,
                    NULL PLSS_PICKUP_TRIP,
                    NULL PLSS_PICKUP_SUPP,
                    NULL PLSS_PICKUP_CMPT,
                    NULL PLSS_STAGED_TRIP,
                    NULL PLSS_STAGED_SUPP,
                    NULL PLSS_STAGED_CMPT,
                    NULL PLSS_STAGED_PRODCODE,
                    NULL PLSS_STAGED_PRODCMPY,
                    NULL PLSS_STAGED_UNITS,
                    NULL PLSS_STAGED_AVAILQTY,
                    NULL PLSS_STAGED_SPECQTY,
                    NULL PLSS_STAGED_PRLDQTY,
                    NULL PLSS_STAGED_ORDER,
                    NULL PLSS_STAGED_CUST,
                    NULL PLSS_STAGED_DELVLOC,
                    NULL PLSS_STAGED_LOADTYPE,
                    NULL ORDER_ID,
                    NULL TRIP_ORDER_NO,
                    NULL TRIP_CUSTOMER,
                    NULL TRIP_DELVLOC,
                    0 QTY_LOADED,
                    0 QTY_AMB,
                    0 QTY_STD,
                    0 QTY_KG
                FROM
                (
                    SELECT TC_SEQNO, EQPT_CODE, EQPT_ID,
                        ETYP_ID EQPT_ETP,
                        CMPT_NO EQPT_CMPT,
                        UNIT_ID UNIT_CODE,
                        UNIT_TITLE UNIT_NAME2,
                        UNIT_TITLE UNIT_NAME,
                        ADJ_SAFEFILL SAFEFILL,
                        ADJ_CAPACITY SFL,
                        NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
                    FROM GUI_EQUIPLIST_CMPT_VW, TNKR_EQUIP
                    WHERE EQPT_ID = TC_EQPT
                        AND TC_TANKER = :tnkr_code
                    ORDER BY TC_SEQNO, CMPT_NO
                ) TMP
                ORDER BY COMPARTMENT
            ) BASIC,
            (
                SELECT DISTINCT TRSF_DES, TRSFPROD_PRODCODE, TRSFPROD_PRODCMPY, PROD_NAME
                FROM
                (
                    SELECT LOAD_ID, LD_TERMINAL
                    FROM
                        (
                            SELECT LOAD_ID, LD_TERMINAL
                            FROM LOADS
                            WHERE
                                LOADS.LOAD_DMY < SYSDATE
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND LOADS.LOAD_TANKER = :tnkr_code
                            ORDER BY LOADS.LOAD_DMY DESC
                        )
                        WHERE ROWNUM = 1
                    ), PRODUCTS, TRANSFERS, TRANSACTIONS
                    WHERE TRSFTRID_TRSA_ID = TRSA_ID 
                    AND TRSALDID_LD_TRM = LD_TERMINAL
                    AND TRSALDID_LOAD_ID = LOAD_ID
                    AND TRSF_LOAD_KG > 0
                    AND PROD_CODE = TRSFPROD_PRODCODE
                    AND PROD_CMPY = TRSFPROD_PRODCMPY
                ) PREV
            WHERE BASIC.COMPARTMENT = PREV.TRSF_DES(+)
            ORDER BY BASIC.COMPARTMENT
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_cmpt_details()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
        SELECT EQPT_CODE,
            EQPT_ID,
            TANKER_INFO.COMPARTMENT,
            TANKER_INFO.CMPT_NO EQPT_CMPT,
            PROD_CODE, 
            PROD_NAME, 
            PROD_CMPY,
            NVL(UNIT_CODE, CMPT_UNITS) UNIT_CODE, 
            NVL(UNIT_NAME, CMPT_UNITS_NAME) UNIT_NAME, 
            SAFEFILL,
            NVL(QTY_SCHEDULED, QTY_LOADED)  AS QTY_SCHEDULED, 
            QTY_PRELOAD,
            SCHDSPEC_SHLSTRIP, 
            SCHDSPEC_SHLSSUPP, 
            SCHD_SOLD_TO_NUM,
            SCHD_SHIP_TO_NUM, 
            ORDER_CUST_ORDNO,
            SCHD_ORDER,
            SCHD_DELIV_NUM, 
            PROD_CLASS, 
            PLSS_PICKUP_TRIP,
            PLSS_PICKUP_SUPP,
            PLSS_PICKUP_CMPT,
            PLSS_STAGED_TRIP,
            PLSS_STAGED_SUPP,
            PLSS_STAGED_CMPT,
            PLSS_STAGED_PRODCODE,
            PLSS_STAGED_PRODCMPY,
            PLSS_STAGED_UNITS,
            NULL                               AS PLSS_STAGED_AVAILQTY,
            PLSS_STAGED_SPECQTY,
            PLSS_STAGED_PRLDQTY,
            PLSS_STAGED_ORDER,
            PLSS_STAGED_CUST,
            PLSS_STAGED_DELVLOC,
            PLSS_STAGED_LOADTYPE,
            NVL(PLSS_STAGED_ORDER, SCHD_ORDER) AS ORDER_ID,
            TRIP_ORDER_NO,
            TRIP_CUSTOMER,
            TRIP_DELVLOC,
            QTY_LOADED, 
            QTY_AMB, 
            QTY_STD, 
            QTY_KG
        FROM
        (
            SELECT TMP.*, ROWNUM COMPARTMENT FROM
            (
                SELECT TC_SEQNO, EQPT_CODE, EQPT_ID,
                    ETYP_ID EQPT_ETP,
                    CMPT_NO,
                    DECODE(UNIT_ID, 11, 11, 17, 17, 5) CMPT_UNITS,
                    DECODE(UNIT_ID, 11, 'l (cor)', 17, 'kg', 'l (amb)') CMPT_UNITS_NAME2,
                    UNIT_TITLE CMPT_UNITS_NAME,
                    ADJ_SAFEFILL SAFEFILL,
                    ADJ_CAPACITY SFL,
                    NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
                FROM TNKR_EQUIP, GUI_EQUIPLIST_CMPT_VW
                WHERE EQPT_ID = TC_EQPT
                    AND TC_TANKER = (
                        SELECT SHL_TANKER FROM SCHEDULE WHERE SHLS_TRIP_NO = :shls_trip_no AND SHLS_SUPP = :shls_supp)
                ORDER BY TC_SEQNO, CMPT_NO
            ) TMP
        ) TANKER_INFO, 
        (
            SELECT SPEC_PROD.COMPARTMENT, 
                SPEC_PROD.PROD_CODE, 
                SPEC_PROD.PROD_NAME, 
                SPEC_PROD.PROD_CMPY,
                SPEC_PROD.UNIT_CODE, 
                SPEC_PROD.UNIT_NAME, 
                SPEC_PROD.QTY_SCHEDULED, 
                SPEC_PROD.QTY_PRELOAD,
                SPEC_PROD.SCHDSPEC_SHLSTRIP, 
                SPEC_PROD.SCHDSPEC_SHLSSUPP, 
                SPEC_PROD.SCHD_SOLD_TO_NUM,
                SPEC_PROD.SCHD_SHIP_TO_NUM, 
                SPEC_PROD.ORDER_CUST_ORDNO,
                SPEC_PROD.SCHD_ORDER,
                SPEC_PROD.SCHD_DELIV_NUM, 
                SPEC_PROD.PROD_CLASS, 
                SPEC_PROD.PLSS_PICKUP_TRIP,
                SPEC_PROD.PLSS_PICKUP_SUPP,
                SPEC_PROD.PLSS_PICKUP_CMPT,
                SPEC_PROD.PLSS_STAGED_TRIP,
                SPEC_PROD.PLSS_STAGED_SUPP,
                SPEC_PROD.PLSS_STAGED_CMPT,
                SPEC_PROD.PLSS_STAGED_PRODCODE,
                SPEC_PROD.PLSS_STAGED_PRODCMPY,
                SPEC_PROD.PLSS_STAGED_UNITS,
                SPEC_PROD.PLSS_STAGED_SPECQTY,
                SPEC_PROD.PLSS_STAGED_PRLDQTY,
                SPEC_PROD.PLSS_STAGED_ORDER,
                SPEC_PROD.PLSS_STAGED_CUST,
                SPEC_PROD.PLSS_STAGED_DELVLOC,
                SPEC_PROD.PLSS_STAGED_LOADTYPE,
                SPEC_PROD.TRIP_ORDER_NO,
                SPEC_PROD.TRIP_CUSTOMER,
                SPEC_PROD.TRIP_DELVLOC,
                DECODE(SPEC_PROD.UNIT_CODE, 
                    5, TRSF.TRIP_QTY_AMB, 
                    28, TRSF.TRIP_QTY_AMB, 
                    11, TRSF.TRIP_QTY_STD, 
                    17, TRSF.TRIP_QTY_KG, 
                    TRSF.TRIP_QTY_DELIVERED) AS QTY_LOADED, 
                TRSF.TRIP_QTY_AMB QTY_AMB, 
                TRSF.TRIP_QTY_STD QTY_STD, 
                TRSF.TRIP_QTY_KG QTY_KG        
            FROM
                (
                    SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT,
                        PR.PROD_CODE AS PROD_CODE,
                        PR.PROD_NAME AS PROD_NAME,
                        PR.PROD_CMPY AS PROD_CMPY,
                        SPEC.SCHD_UNITS AS UNIT_CODE,
                        UV.DESCRIPTION AS UNIT_NAME,
                        SPEC.SCHD_SPECQTY AS QTY_SCHEDULED,
                        SPEC.SCHD_PRLDQTY QTY_PRELOAD,
                        SPEC.SCHDSPEC_SHLSTRIP,
                        SPEC.SCHDSPEC_SHLSSUPP,
                        SPEC.SCHD_SOLD_TO_NUM,
                        SPEC.SCHD_SHIP_TO_NUM,
                        PLSS.PLSS_PICKUP_TRIP,
                        PLSS.PLSS_PICKUP_SUPP,
                        PLSS.PLSS_PICKUP_CMPT,
                        PLSS.PLSS_STAGED_TRIP,
                        PLSS.PLSS_STAGED_SUPP,
                        PLSS.PLSS_STAGED_CMPT,
                        PLSS.PLSS_STAGED_PRODCODE,
                        PLSS.PLSS_STAGED_PRODCMPY,
                        PLSS.PLSS_STAGED_UNITS,
                        PLSS.PLSS_STAGED_SPECQTY,
                        PLSS.PLSS_STAGED_PRLDQTY,
                        PLSS.PLSS_STAGED_ORDER,
                        PLSS.PLSS_STAGED_CUST,
                        PLSS.PLSS_STAGED_DELVLOC,
                        PLSS.PLSS_STAGED_LOADTYPE,
                        DECODE(NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER), NULL, TO_CHAR(PLSS.PLSS_STAGED_TRIP), PLSS.PLSS_STAGED_TRIP||'/'||CUST_ORDER.ORDER_CUST_ORDNO) AS TRIP_ORDER_NO,
                        DECODE(PLSS.PLSS_STAGED_CUST, NULL, NULL, PLSS.PLSS_STAGED_CUST||' - '||COMPANYS.CMPY_NAME) AS TRIP_CUSTOMER,
                        DECODE(PLSS.PLSS_STAGED_DELVLOC, NULL, NULL, PLSS.PLSS_STAGED_DELVLOC||' - '||DLOC.DLV_NAME) AS TRIP_DELVLOC,
                        CUST_ORDER.ORDER_CUST_ORDNO,
                        SPEC.SCHD_ORDER,
                        SPEC.SCHD_DELIV_NUM,
                        PR.PROD_CLASS
                    FROM SPECDETS SPEC,
                        PICKUP_SCHEDULE_SPECS PLSS,
                        PRODUCTS PR,
                        UNIT_SCALE_VW UV,
                        CUST_ORDER,
                        CUSTOMER,
                        COMPANYS,
                        DELV_LOCATION DLOC
                    WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
                        AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
                        AND UV.UNIT_ID = SPEC.SCHD_UNITS
                        AND SPEC.SCHDSPEC_SHLSTRIP = :shls_trip_no
                        AND SPEC.SCHDSPEC_SHLSSUPP = :shls_supp
                        AND SPEC.SCHDSPEC_SHLSTRIP = PLSS.PLSS_PICKUP_TRIP(+)
                        AND SPEC.SCHDSPEC_SHLSSUPP = PLSS.PLSS_PICKUP_SUPP(+)
                        AND SPEC.SCHD_COMP_ID = PLSS.PLSS_PICKUP_CMPT(+)
                        AND SPEC.SCHDPROD_PRODCODE = PLSS.PLSS_STAGED_PRODCODE(+)
                        AND SPEC.SCHDPROD_PRODCMPY = PLSS.PLSS_STAGED_PRODCMPY(+)
                        AND NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER) = CUST_ORDER.ORDER_NO(+)
                        AND PLSS.PLSS_STAGED_CUST = CUSTOMER.CUST_ACCT(+)
                        AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+)
                        AND PLSS.PLSS_STAGED_DELVLOC = DLOC.DLV_CODE(+)
                ) SPEC_PROD, 
                (
                    SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER,
                        PRODUCTS.PROD_CLASS AS PROD_CLASS,
                        SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
                        TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT,
                        TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
                        TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
                        SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
                        SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
                        SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
                        SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
                        SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
                        SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
                    FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                    WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                        AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                        AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                        AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                        AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                        AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
                    GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
                        TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
                ) TRSF
            WHERE
                -- SPEC_PROD.SCHDSPEC_SHLSSUPP = TRSF.TRIP_SUPPLIER (+)
                -- AND SPEC_PROD.SCHDSPEC_SHLSTRIP = TRSF.TRIP_NO (+)
                -- AND SPEC_PROD.COMPARTMENT = TRSF.TRIP_COMPARTMENT (+)
                SPEC_PROD.PLSS_STAGED_SUPP = TRSF.TRIP_SUPPLIER (+)
                AND SPEC_PROD.PLSS_STAGED_TRIP = TRSF.TRIP_NO (+)
                AND SPEC_PROD.PLSS_PICKUP_CMPT = TRSF.TRIP_COMPARTMENT (+)
                AND SPEC_PROD.PROD_CLASS = TRSF.PROD_CLASS (+)
        ) SPEC_INFO
        WHERE TANKER_INFO.COMPARTMENT = SPEC_INFO.COMPARTMENT(+)
        ORDER BY COMPARTMENT
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_cmpt_details_by_pickup_transfers()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
        SELECT EQPT_CODE,
            EQPT_ID,
            TANKER_INFO.COMPARTMENT,
            TANKER_INFO.CMPT_NO EQPT_CMPT,
            PROD_CODE, 
            PROD_NAME, 
            PROD_CMPY,
            NVL(UNIT_CODE, CMPT_UNITS) UNIT_CODE, 
            NVL(UNIT_NAME, CMPT_UNITS_NAME) UNIT_NAME, 
            SAFEFILL,
            NVL(QTY_SCHEDULED, QTY_LOADED)  AS QTY_SCHEDULED, 
            QTY_PRELOAD,
            SCHDSPEC_SHLSTRIP, 
            SCHDSPEC_SHLSSUPP, 
            SCHD_SOLD_TO_NUM,
            SCHD_SHIP_TO_NUM, 
            ORDER_CUST_ORDNO,
            SCHD_ORDER,
            SCHD_DELIV_NUM, 
            PROD_CLASS, 
            PLSS_PICKUP_TRIP,
            PLSS_PICKUP_SUPP,
            PLSS_PICKUP_CMPT,
            PLSS_STAGED_TRIP,
            PLSS_STAGED_SUPP,
            PLSS_STAGED_CMPT,
            PLSS_STAGED_PRODCODE,
            PLSS_STAGED_PRODCMPY,
            PLSS_STAGED_UNITS,
            NULL                               AS PLSS_STAGED_AVAILQTY,
            PLSS_STAGED_SPECQTY,
            PLSS_STAGED_PRLDQTY,
            PLSS_STAGED_ORDER,
            PLSS_STAGED_CUST,
            PLSS_STAGED_DELVLOC,
            PLSS_STAGED_LOADTYPE,
            NVL(PLSS_STAGED_ORDER, SCHD_ORDER) AS ORDER_ID,
            TRIP_ORDER_NO,
            TRIP_CUSTOMER,
            TRIP_DELVLOC,
            QTY_LOADED, 
            QTY_AMB, 
            QTY_STD, 
            QTY_KG
        FROM
        (
            SELECT TMP.*, ROWNUM COMPARTMENT FROM
            (
                SELECT TC_SEQNO, EQPT_CODE, EQPT_ID,
                    ETYP_ID EQPT_ETP,
                    CMPT_NO,
                    DECODE(UNIT_ID, 11, 11, 17, 17, 5) CMPT_UNITS,
                    DECODE(UNIT_ID, 11, 'l (cor)', 17, 'kg', 'l (amb)') CMPT_UNITS_NAME2,
                    UNIT_TITLE CMPT_UNITS_NAME,
                    ADJ_SAFEFILL SAFEFILL,
                    ADJ_CAPACITY SFL,
                    NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
                FROM TNKR_EQUIP, GUI_EQUIPLIST_CMPT_VW
                WHERE EQPT_ID = TC_EQPT
                    AND TC_TANKER = (
                        SELECT SHL_TANKER FROM SCHEDULE WHERE SHLS_TRIP_NO = :shls_trip_no AND SHLS_SUPP = :shls_supp)
                ORDER BY TC_SEQNO, CMPT_NO
            ) TMP
        ) TANKER_INFO, 
        (
            SELECT SPEC_PROD.COMPARTMENT, 
                SPEC_PROD.PROD_CODE, 
                SPEC_PROD.PROD_NAME, 
                SPEC_PROD.PROD_CMPY,
                SPEC_PROD.UNIT_CODE, 
                SPEC_PROD.UNIT_NAME, 
                SPEC_PROD.QTY_SCHEDULED, 
                SPEC_PROD.QTY_PRELOAD,
                SPEC_PROD.SCHDSPEC_SHLSTRIP, 
                SPEC_PROD.SCHDSPEC_SHLSSUPP, 
                SPEC_PROD.SCHD_SOLD_TO_NUM,
                SPEC_PROD.SCHD_SHIP_TO_NUM, 
                SPEC_PROD.ORDER_CUST_ORDNO,
                SPEC_PROD.SCHD_ORDER,
                SPEC_PROD.SCHD_DELIV_NUM, 
                SPEC_PROD.PROD_CLASS, 
                SPEC_PROD.PLSS_PICKUP_TRIP,
                SPEC_PROD.PLSS_PICKUP_SUPP,
                SPEC_PROD.PLSS_PICKUP_CMPT,
                SPEC_PROD.PLSS_STAGED_TRIP,
                SPEC_PROD.PLSS_STAGED_SUPP,
                SPEC_PROD.PLSS_STAGED_CMPT,
                SPEC_PROD.PLSS_STAGED_PRODCODE,
                SPEC_PROD.PLSS_STAGED_PRODCMPY,
                SPEC_PROD.PLSS_STAGED_UNITS,
                SPEC_PROD.PLSS_STAGED_SPECQTY,
                SPEC_PROD.PLSS_STAGED_PRLDQTY,
                SPEC_PROD.PLSS_STAGED_ORDER,
                SPEC_PROD.PLSS_STAGED_CUST,
                SPEC_PROD.PLSS_STAGED_DELVLOC,
                SPEC_PROD.PLSS_STAGED_LOADTYPE,
                SPEC_PROD.TRIP_ORDER_NO,
                SPEC_PROD.TRIP_CUSTOMER,
                SPEC_PROD.TRIP_DELVLOC,
                DECODE(SPEC_PROD.UNIT_CODE, 
                    5, TRSF.TRIP_QTY_AMB, 
                    28, TRSF.TRIP_QTY_AMB, 
                    11, TRSF.TRIP_QTY_STD, 
                    17, TRSF.TRIP_QTY_KG, 
                    TRSF.TRIP_QTY_DELIVERED) AS QTY_LOADED, 
                TRSF.TRIP_QTY_AMB QTY_AMB, 
                TRSF.TRIP_QTY_STD QTY_STD, 
                TRSF.TRIP_QTY_KG QTY_KG        
            FROM
                (
                    SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT,
                        PR.PROD_CODE AS PROD_CODE,
                        PR.PROD_NAME AS PROD_NAME,
                        PR.PROD_CMPY AS PROD_CMPY,
                        SPEC.SCHD_UNITS AS UNIT_CODE,
                        UV.DESCRIPTION AS UNIT_NAME,
                        SPEC.SCHD_SPECQTY AS QTY_SCHEDULED,
                        SPEC.SCHD_PRLDQTY QTY_PRELOAD,
                        SPEC.SCHDSPEC_SHLSTRIP,
                        SPEC.SCHDSPEC_SHLSSUPP,
                        SPEC.SCHD_SOLD_TO_NUM,
                        SPEC.SCHD_SHIP_TO_NUM,
                        PLSS.PLSS_PICKUP_TRIP,
                        PLSS.PLSS_PICKUP_SUPP,
                        PLSS.PLSS_PICKUP_CMPT,
                        PLSS.PLSS_STAGED_TRIP,
                        PLSS.PLSS_STAGED_SUPP,
                        PLSS.PLSS_STAGED_CMPT,
                        PLSS.PLSS_STAGED_PRODCODE,
                        PLSS.PLSS_STAGED_PRODCMPY,
                        PLSS.PLSS_STAGED_UNITS,
                        PLSS.PLSS_STAGED_SPECQTY,
                        PLSS.PLSS_STAGED_PRLDQTY,
                        PLSS.PLSS_STAGED_ORDER,
                        PLSS.PLSS_STAGED_CUST,
                        PLSS.PLSS_STAGED_DELVLOC,
                        PLSS.PLSS_STAGED_LOADTYPE,
                        DECODE(NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER), NULL, TO_CHAR(PLSS.PLSS_STAGED_TRIP), PLSS.PLSS_STAGED_TRIP||'/'||CUST_ORDER.ORDER_CUST_ORDNO) AS TRIP_ORDER_NO,
                        DECODE(PLSS.PLSS_STAGED_CUST, NULL, NULL, PLSS.PLSS_STAGED_CUST||' - '||COMPANYS.CMPY_NAME) AS TRIP_CUSTOMER,
                        DECODE(PLSS.PLSS_STAGED_DELVLOC, NULL, NULL, PLSS.PLSS_STAGED_DELVLOC||' - '||DLOC.DLV_NAME) AS TRIP_DELVLOC,
                        CUST_ORDER.ORDER_CUST_ORDNO,
                        SPEC.SCHD_ORDER,
                        SPEC.SCHD_DELIV_NUM,
                        PR.PROD_CLASS
                    FROM SPECDETS SPEC,
                        PICKUP_SCHEDULE_SPECS PLSS,
                        PRODUCTS PR,
                        UNIT_SCALE_VW UV,
                        CUST_ORDER,
                        CUSTOMER,
                        COMPANYS,
                        DELV_LOCATION DLOC
                    WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
                        AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
                        AND UV.UNIT_ID = SPEC.SCHD_UNITS
                        AND SPEC.SCHDSPEC_SHLSTRIP = :shls_trip_no
                        AND SPEC.SCHDSPEC_SHLSSUPP = :shls_supp
                        AND SPEC.SCHDSPEC_SHLSTRIP = PLSS.PLSS_PICKUP_TRIP(+)
                        AND SPEC.SCHDSPEC_SHLSSUPP = PLSS.PLSS_PICKUP_SUPP(+)
                        AND SPEC.SCHD_COMP_ID = PLSS.PLSS_PICKUP_CMPT(+)
                        AND SPEC.SCHDPROD_PRODCODE = PLSS.PLSS_STAGED_PRODCODE(+)
                        AND SPEC.SCHDPROD_PRODCMPY = PLSS.PLSS_STAGED_PRODCMPY(+)
                        AND NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER) = CUST_ORDER.ORDER_NO(+)
                        AND PLSS.PLSS_STAGED_CUST = CUSTOMER.CUST_ACCT(+)
                        AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+)
                        AND PLSS.PLSS_STAGED_DELVLOC = DLOC.DLV_CODE(+)
                ) SPEC_PROD, 
                (
                    SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER,
                        PRODUCTS.PROD_CLASS AS PROD_CLASS,
                        SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
                        TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT,
                        TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
                        TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
                        SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
                        SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
                        SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
                        SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
                        SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
                        SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
                    FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                    WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                        AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                        AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                        AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                        AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                        AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
                    GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
                        TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
                ) TRSF
            WHERE
                SPEC_PROD.SCHDSPEC_SHLSSUPP = TRSF.TRIP_SUPPLIER (+)
                AND SPEC_PROD.SCHDSPEC_SHLSTRIP = TRSF.TRIP_NO (+)
                AND SPEC_PROD.COMPARTMENT = TRSF.TRIP_COMPARTMENT (+)
                AND SPEC_PROD.PROD_CLASS = TRSF.PROD_CLASS (+)
        ) SPEC_INFO
        WHERE TANKER_INFO.COMPARTMENT = SPEC_INFO.COMPARTMENT(+)
        ORDER BY COMPARTMENT
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_product_details_by_compartments()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
        SELECT 
            PROD_CODE,
            PROD_NAME,
            PROD_CMPY,
            PROD_IMAGE,
            PROD_CLASS, 
            UNIT_CODE,
            UNIT_NAME, 
            SUM(QTY_SCHEDULED)   AS QTY_SCHEDULED,
            SUM(QTY_LOADED)      AS QTY_LOADED,
            SUM(QTY_PRELOAD)     AS QTY_PRELOADED,
            SUM(QTY_AMB)         AS QTY_AMB,
            SUM(QTY_STD)         AS QTY_STD,
            SUM(QTY_KG)          AS QTY_KG
        FROM (
            SELECT
                SPEC_INFO.COMPARTMENT,
                PROD_CODE, 
                PROD_NAME, 
                PROD_CMPY,
                PROD_IMAGE,
                UNIT_CODE, 
                UNIT_NAME, 
                NVL(QTY_SCHEDULED, QTY_LOADED)  AS QTY_SCHEDULED, 
                QTY_PRELOAD,
                SCHDSPEC_SHLSTRIP, 
                SCHDSPEC_SHLSSUPP, 
                ORDER_CUST_ORDNO,
                SCHD_ORDER,
                PROD_CLASS, 
                PLSS_PICKUP_TRIP,
                PLSS_PICKUP_SUPP,
                PLSS_PICKUP_CMPT,
                PLSS_STAGED_TRIP,
                PLSS_STAGED_SUPP,
                PLSS_STAGED_CMPT,
                PLSS_STAGED_PRODCODE,
                PLSS_STAGED_PRODCMPY,
                PLSS_STAGED_UNITS,
                NULL                               AS PLSS_STAGED_AVAILQTY,
                PLSS_STAGED_SPECQTY,
                PLSS_STAGED_PRLDQTY,
                PLSS_STAGED_ORDER,
                PLSS_STAGED_CUST,
                PLSS_STAGED_DELVLOC,
                PLSS_STAGED_LOADTYPE,
                NVL(PLSS_STAGED_ORDER, SCHD_ORDER) AS ORDER_ID,
                TRIP_ORDER_NO,
                TRIP_CUSTOMER,
                TRIP_DELVLOC,
                QTY_LOADED, 
                QTY_AMB, 
                QTY_STD, 
                QTY_KG
            FROM
            (
                SELECT SPEC_PROD.COMPARTMENT, 
                    SPEC_PROD.PROD_CODE, 
                    SPEC_PROD.PROD_NAME, 
                    SPEC_PROD.PROD_CMPY,
                    SPEC_PROD.UNIT_CODE, 
                    SPEC_PROD.UNIT_NAME, 
                    SPEC_PROD.PROD_IMAGE,
                    SPEC_PROD.QTY_SCHEDULED, 
                    SPEC_PROD.QTY_PRELOAD,
                    SPEC_PROD.SCHDSPEC_SHLSTRIP, 
                    SPEC_PROD.SCHDSPEC_SHLSSUPP, 
                    SPEC_PROD.SCHD_SOLD_TO_NUM,
                    SPEC_PROD.SCHD_SHIP_TO_NUM, 
                    SPEC_PROD.ORDER_CUST_ORDNO,
                    SPEC_PROD.SCHD_ORDER,
                    SPEC_PROD.SCHD_DELIV_NUM, 
                    SPEC_PROD.PROD_CLASS, 
                    SPEC_PROD.PLSS_PICKUP_TRIP,
                    SPEC_PROD.PLSS_PICKUP_SUPP,
                    SPEC_PROD.PLSS_PICKUP_CMPT,
                    SPEC_PROD.PLSS_STAGED_TRIP,
                    SPEC_PROD.PLSS_STAGED_SUPP,
                    SPEC_PROD.PLSS_STAGED_CMPT,
                    SPEC_PROD.PLSS_STAGED_PRODCODE,
                    SPEC_PROD.PLSS_STAGED_PRODCMPY,
                    SPEC_PROD.PLSS_STAGED_UNITS,
                    SPEC_PROD.PLSS_STAGED_SPECQTY,
                    SPEC_PROD.PLSS_STAGED_PRLDQTY,
                    SPEC_PROD.PLSS_STAGED_ORDER,
                    SPEC_PROD.PLSS_STAGED_CUST,
                    SPEC_PROD.PLSS_STAGED_DELVLOC,
                    SPEC_PROD.PLSS_STAGED_LOADTYPE,
                    SPEC_PROD.TRIP_ORDER_NO,
                    SPEC_PROD.TRIP_CUSTOMER,
                    SPEC_PROD.TRIP_DELVLOC,
                    DECODE(SPEC_PROD.UNIT_CODE, 
                        5, TRSF.TRIP_QTY_AMB, 
                        28, TRSF.TRIP_QTY_AMB, 
                        11, TRSF.TRIP_QTY_STD, 
                        17, TRSF.TRIP_QTY_KG, 
                        TRSF.TRIP_QTY_DELIVERED) AS QTY_LOADED, 
                    TRSF.TRIP_QTY_AMB QTY_AMB, 
                    TRSF.TRIP_QTY_STD QTY_STD, 
                    TRSF.TRIP_QTY_KG QTY_KG        
                FROM
                    (
                        SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT,
                            PR.PROD_CODE AS PROD_CODE,
                            PR.PROD_NAME AS PROD_NAME,
                            PR.PROD_CMPY AS PROD_CMPY,
                            SPEC.SCHD_UNITS AS UNIT_CODE,
                            UV.DESCRIPTION AS UNIT_NAME,
                            SPEC.SCHD_SPECQTY AS QTY_SCHEDULED,
                            SPEC.SCHD_PRLDQTY QTY_PRELOAD,
                            SPEC.SCHDSPEC_SHLSTRIP,
                            SPEC.SCHDSPEC_SHLSSUPP,
                            SPEC.SCHD_SOLD_TO_NUM,
                            SPEC.SCHD_SHIP_TO_NUM,
                            PLSS.PLSS_PICKUP_TRIP,
                            PLSS.PLSS_PICKUP_SUPP,
                            PLSS.PLSS_PICKUP_CMPT,
                            PLSS.PLSS_STAGED_TRIP,
                            PLSS.PLSS_STAGED_SUPP,
                            PLSS.PLSS_STAGED_CMPT,
                            PLSS.PLSS_STAGED_PRODCODE,
                            PLSS.PLSS_STAGED_PRODCMPY,
                            PLSS.PLSS_STAGED_UNITS,
                            PLSS.PLSS_STAGED_SPECQTY,
                            PLSS.PLSS_STAGED_PRLDQTY,
                            PLSS.PLSS_STAGED_ORDER,
                            PLSS.PLSS_STAGED_CUST,
                            PLSS.PLSS_STAGED_DELVLOC,
                            PLSS.PLSS_STAGED_LOADTYPE,
                            DECODE(NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER), NULL, TO_CHAR(PLSS.PLSS_STAGED_TRIP), PLSS.PLSS_STAGED_TRIP||'/'||CUST_ORDER.ORDER_CUST_ORDNO) AS TRIP_ORDER_NO,
                            DECODE(PLSS.PLSS_STAGED_CUST, NULL, NULL, PLSS.PLSS_STAGED_CUST||' - '||COMPANYS.CMPY_NAME) AS TRIP_CUSTOMER,
                            DECODE(PLSS.PLSS_STAGED_DELVLOC, NULL, NULL, PLSS.PLSS_STAGED_DELVLOC||' - '||DLOC.DLV_NAME) AS TRIP_DELVLOC,
                            CUST_ORDER.ORDER_CUST_ORDNO,
                            SPEC.SCHD_ORDER,
                            SPEC.SCHD_DELIV_NUM,
                            PR.PROD_IMAGE,
                            PR.PROD_CLASS
                        FROM SPECDETS SPEC,
                            PICKUP_SCHEDULE_SPECS PLSS,
                            PRODUCTS PR,
                            UNIT_SCALE_VW UV,
                            CUST_ORDER,
                            CUSTOMER,
                            COMPANYS,
                            DELV_LOCATION DLOC
                        WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
                            AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
                            AND UV.UNIT_ID = SPEC.SCHD_UNITS
                            AND SPEC.SCHDSPEC_SHLSTRIP = :shls_trip_no
                            AND SPEC.SCHDSPEC_SHLSSUPP = :shls_supp
                            AND SPEC.SCHDSPEC_SHLSTRIP = PLSS.PLSS_PICKUP_TRIP(+)
                            AND SPEC.SCHDSPEC_SHLSSUPP = PLSS.PLSS_PICKUP_SUPP(+)
                            AND SPEC.SCHD_COMP_ID = PLSS.PLSS_PICKUP_CMPT(+)
                            AND SPEC.SCHDPROD_PRODCODE = PLSS.PLSS_STAGED_PRODCODE(+)
                            AND SPEC.SCHDPROD_PRODCMPY = PLSS.PLSS_STAGED_PRODCMPY(+)
                            AND NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER) = CUST_ORDER.ORDER_NO(+)
                            AND PLSS.PLSS_STAGED_CUST = CUSTOMER.CUST_ACCT(+)
                            AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+)
                            AND PLSS.PLSS_STAGED_DELVLOC = DLOC.DLV_CODE(+)
                    ) SPEC_PROD, 
                    (
                        SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER,
                            PRODUCTS.PROD_CLASS AS PROD_CLASS,
                            SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
                            TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT,
                            TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
                            TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
                            SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
                            SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
                            SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
                            SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
                            SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
                            SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
                        FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                        WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                            AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
                        GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
                            TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
                    ) TRSF
                WHERE
                    -- SPEC_PROD.SCHDSPEC_SHLSSUPP = TRSF.TRIP_SUPPLIER (+)
                    -- AND SPEC_PROD.SCHDSPEC_SHLSTRIP = TRSF.TRIP_NO (+)
                    -- AND SPEC_PROD.COMPARTMENT = TRSF.TRIP_COMPARTMENT (+)
                    SPEC_PROD.PLSS_STAGED_SUPP = TRSF.TRIP_SUPPLIER (+)
                    AND SPEC_PROD.PLSS_STAGED_TRIP = TRSF.TRIP_NO (+)
                    AND SPEC_PROD.PLSS_PICKUP_CMPT = TRSF.TRIP_COMPARTMENT (+)
                    AND SPEC_PROD.PROD_CLASS = TRSF.PROD_CLASS (+)
            ) SPEC_INFO
        )
        WHERE 1=1
        GROUP BY PROD_CODE,PROD_NAME,PROD_CMPY,PROD_IMAGE,PROD_CLASS,UNIT_CODE,UNIT_NAME
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_product_details()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $sched_service = new ScheduleService($this->conn);
        $this->drawer_code = $sched_service->shls_drawer($this->shls_trip_no, $this->supplier_code);

        write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
        SELECT 
            UNIT_CODE,
            QTY_SCHEDULED,
            NVL(PRODUCTS.PROD_CODE, LOADED.PROD_CODE) PROD_CODE,
            NVL(PRODUCTS.PROD_NAME, LOADED.PROD_NAME) PROD_NAME,
            NVL(PRODUCTS.PROD_CMPY, LOADED.PROD_CMPY) PROD_CMPY,
            PROD_IMAGE,
            QTY_LOADED,
            UNIT_NAME, 
            QTY_PRELOADED,
            QTY_AMB,
            QTY_STD,
            QTY_KG
        FROM PRODUCTS,
        (
            SELECT SPEC_PR.UNIT_CODE, 
                SPEC_PR.QTY_SCHEDULED, 
                SPEC_PR.PROD_CODE, 
                SPEC_PR.PROD_NAME, 
                SPEC_PR.PROD_CMPY, 
                DECODE(SPEC_PR.SCHP_UNITS, 
                    5, TRSF.TRIP_QTY_AMB, 
                    28, TRSF.TRIP_QTY_AMB, 
                    11, TRSF.TRIP_QTY_STD, 17, 
                    TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) 
                    AS QTY_LOADED, 
                UV.DESCRIPTION AS UNIT_NAME, 
                CMPT.TRIP_QTY_PRELOAD QTY_PRELOADED, 
                TRSF.TRIP_QTY_AMB QTY_AMB, 
                TRSF.TRIP_QTY_STD QTY_STD, 
                TRSF.TRIP_QTY_KG QTY_KG
            FROM
                (
                    SELECT SCHPSPID_SHLSTRIP, 
                        SCHPSPID_SHLSSUPP,
                        SCHP_UNITS,
                        PROD_CLASS,
                        SPEC.SCHP_UNITS AS UNIT_CODE,
                        SPEC.SCHP_SPECQTY AS QTY_SCHEDULED,
                        PR.PROD_CODE AS PROD_CODE,
                        PR.PROD_NAME AS PROD_NAME,
                        PR.PROD_CMPY AS PROD_CMPY
                    FROM SPECPROD SPEC, PRODUCTS PR
                    WHERE SPEC.SCHPPROD_PRODCMPY = PR.PROD_CMPY               -- product company will be always the supplier in SPECPROD
                        AND SPEC.SCHPPROD_PRODCODE = PR.PROD_CODE
                        AND SPEC.SCHPSPID_SHLSTRIP = :shls_trip_no
                        AND SPEC.SCHPSPID_SHLSSUPP = :shls_supp
                ) SPEC_PR, 
                UNIT_SCALE_VW UV, 
                (
                    SELECT SPDT.SCHDSPEC_SHLSSUPP AS TRIP_SUPPLIER,
                        SPDT.SCHDSPEC_SHLSTRIP AS TRIP_NO,
                        SPDT.SCHDPROD_PRODCMPY AS TRIP_PRODCMPY,
                        SPDT.SCHDPROD_PRODCODE AS TRIP_PRODCODE,
                        SUM(SPDT.SCHD_PRESETQTY) AS TRIP_QTY_PRESET,
                        SUM(SPDT.SCHD_PRLDQTY) AS TRIP_QTY_PRELOAD,
                        SUM(SPDT.SCHD_SPECQTY) AS TRIP_QTY_SCHED,
                        SUM(SPDT.SCHD_DELIVERED) AS TRIP_QTY_LOADED,
                        PRODUCTS.PROD_CLASS
                    FROM PRODUCTS, (
                        SELECT 
                            SCHDSPEC_SHLSSUPP,
                            SCHDSPEC_SHLSTRIP,
                            -- product company will be the drawer sometimes in SPECDETS, convert it to supplier
                            DECODE(SCHDPROD_PRODCMPY, :drawer_code, SCHDSPEC_SHLSSUPP, SCHDPROD_PRODCMPY) as SCHDPROD_PRODCMPY,
                            SCHDPROD_PRODCODE,
                            SCHD_PRESETQTY,
                            SCHD_PRLDQTY,
                            SCHD_SPECQTY,
                            SCHD_DELIVERED
                        FROM SPECDETS
                        WHERE SCHDSPEC_SHLSSUPP=:shls_supp AND SCHDSPEC_SHLSTRIP = :shls_trip_no
                        ) SPDT
                    WHERE SPDT.SCHDPROD_PRODCMPY = PRODUCTS.PROD_CMPY 
                        AND SPDT.SCHDPROD_PRODCODE = PRODUCTS.PROD_CODE
                    GROUP BY SPDT.SCHDSPEC_SHLSSUPP, SPDT.SCHDSPEC_SHLSTRIP, SPDT.SCHDPROD_PRODCMPY, SPDT.SCHDPROD_PRODCODE, PRODUCTS.PROD_CLASS
                ) CMPT, 
                (
                    SELECT PKLD.PLSS_PICKUP_SUPP AS TRIP_SUPPLIER
                        , PRODUCTS.PROD_CLASS,
                        PKLD.PLSS_PICKUP_TRIP AS TRIP_NO,
                        -- product company will be the drawer sometimes in TRANSFERS, leave as it is
                        -- TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
                        DECODE(TRANSFERS.TRSFPROD_PRODCMPY, :drawer_code, SCHEDULE.SHLS_SUPP, TRANSFERS.TRSFPROD_PRODCMPY) AS TRIP_PRODCMPY,
                        TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
                        SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
                        SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
                        SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
                        SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
                        SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
                        SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
                    FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS, PICKUP_SCHEDULE_SPECS PKLD
                    WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                        AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                        AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                        AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                        AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                        AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        AND TRSFPROD_PRODCODE = PROD_CODE 
                        AND DECODE(TRANSFERS.TRSFPROD_PRODCMPY, :drawer_code, SCHEDULE.SHLS_SUPP, TRANSFERS.TRSFPROD_PRODCMPY) = PROD_CMPY
                        AND SCHEDULE.SHLS_TRIP_NO = PKLD.PLSS_STAGED_TRIP
                        AND SCHEDULE.SHLS_SUPP = PKLD.PLSS_STAGED_SUPP
                        AND PKLD.PLSS_PICKUP_TRIP =  :shls_trip_no
                        AND PKLD.PLSS_PICKUP_SUPP = :shls_supp
                        AND PKLD.PLSS_PICKUP_CMPT = TRANSFERS.TRSF_DES
                    GROUP BY PKLD.PLSS_PICKUP_SUPP, PKLD.PLSS_PICKUP_TRIP, 
                        DECODE(TRANSFERS.TRSFPROD_PRODCMPY, :drawer_code, SCHEDULE.SHLS_SUPP, TRANSFERS.TRSFPROD_PRODCMPY), 
                        TRANSFERS.TRSFPROD_PRODCODE, PRODUCTS.PROD_CLASS
                ) TRSF
            WHERE SPEC_PR.SCHPSPID_SHLSSUPP = CMPT.TRIP_SUPPLIER (+)
                AND SPEC_PR.SCHPSPID_SHLSTRIP = CMPT.TRIP_NO (+)
                --AND SPEC_PR.PROD_CLASS = CMPT.PROD_CLASS (+)
                AND SPEC_PR.PROD_CODE = CMPT.TRIP_PRODCODE(+)
                AND SPEC_PR.PROD_CMPY = CMPT.TRIP_PRODCMPY(+)
                AND CMPT.TRIP_SUPPLIER = TRSF.TRIP_SUPPLIER (+)
                AND CMPT.TRIP_NO = TRSF.TRIP_NO (+)
                --AND CMPT.PROD_CLASS = TRSF.PROD_CLASS (+)
                AND CMPT.TRIP_PRODCODE = TRSF.TRIP_PRODCODE(+)
                AND CMPT.TRIP_PRODCMPY = TRSF.TRIP_PRODCMPY(+)
                AND UV.UNIT_ID = SPEC_PR.SCHP_UNITS
        ) LOADED
        WHERE PRODUCTS.PROD_CMPY = LOADED.PROD_CMPY(+)
            AND PRODUCTS.PROD_CODE = LOADED.PROD_CODE(+)
            AND PRODUCTS.PROD_CMPY = :shls_supp
        ORDER BY QTY_SCHEDULED DESC NULLS LAST, PRODUCTS.PROD_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        oci_bind_by_name($stmt, ':drawer_code', $this->drawer_code);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }



    public function transactions()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->mv_id)) {
            if (isset($this->mv_all)) {
                $query = "
                    SELECT GUI_TRANSACTIONS.*, 
                        DECODE(TRSA_REVERSE_FLAG, 1, TRSA_REVERSE, NULL) TRSA_REVERSE_EX,
                        DECODE(TRSA_REVERSE_FLAG, 1, 'Reversal', 2, 'Repost', NULL) TRSA_REVERSE_DESC
                    FROM GUI_TRANSACTIONS 
                    WHERE (TRSA_TRIP, TRSA_SUPPLIER) IN 
                        (SELECT MS.MS_SHLSTRIP, MS.MS_SHLSSUPP FROM MOV_SCHEDULES MS, MOV_SCHD_ITEMS MI, MOVEMENT_ITEMS NI 
                        WHERE MS.MS_SHLSTRIP = MI.MSITM_SHLSTRIP AND MS.MS_SHLSSUPP = MI.MSITM_SHLSSUPP 
                            AND MI.MSITM_MOVEID = NI.MVITM_MOVE_ID AND MI.MSITM_MOVITEM = NI.MVITM_LINE_ID AND NI.MVITM_TYPE = 0
                            AND MI.MSITM_MOVEID = :move_id ) 
                    ORDER BY TRSA_ID";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':move_id', $this->mv_id); 
                // oci_bind_by_name($stmt, ':line_id', $this->line_id); 
            } else {
                $query = "
                    SELECT GUI_TRANSACTIONS.*, 
                        DECODE(TRSA_REVERSE_FLAG, 1, TRSA_REVERSE, NULL) TRSA_REVERSE_EX,
                        DECODE(TRSA_REVERSE_FLAG, 1, 'Reversal', 2, 'Repost', NULL) TRSA_REVERSE_DESC
                    FROM GUI_TRANSACTIONS 
                    WHERE (TRSA_TRIP, TRSA_SUPPLIER) IN 
                        (SELECT MS.MS_SHLSTRIP, MS.MS_SHLSSUPP FROM MOV_SCHEDULES MS, MOV_SCHD_ITEMS MI 
                        WHERE MS.MS_SHLSTRIP = MI.MSITM_SHLSTRIP AND MS.MS_SHLSSUPP = MI.MSITM_SHLSSUPP 
                            AND MI.MSITM_MOVEID = :move_id AND MI.MSITM_MOVITEM = :line_id) 
                    ORDER BY TRSA_ID";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':move_id', $this->mv_id); 
                oci_bind_by_name($stmt, ':line_id', $this->line_id); 
            }
        } else {
            $query = "
                SELECT TRSA.*, 
                    DECODE(TRSA.TRSA_REVERSE_FLAG, 1, TRSA.TRSA_REVERSE, NULL)          AS TRSA_REVERSE_EX,
                    DECODE(TRSA.TRSA_REVERSE_FLAG, 1, 'Reversal', 2, 'Repost', NULL)    AS TRSA_REVERSE_DESC
                FROM 
                    GUI_TRANSACTIONS TRSA
                    , (
                        SELECT DISTINCT PLSS_PICKUP_TRIP, PLSS_PICKUP_SUPP, PLSS_STAGED_TRIP, PLSS_STAGED_SUPP
                        FROM PICKUP_SCHEDULE_SPECS
                    )  PLSS
                WHERE 
                    TRSA.TRSA_TRIP = PLSS.PLSS_STAGED_TRIP
                    AND TRSA.TRSA_SUPPLIER = PLSS.PLSS_STAGED_SUPP
                    AND PLSS.PLSS_PICKUP_TRIP = :trip_no
                    AND PLSS.PLSS_PICKUP_SUPP = :supplier
                ORDER BY PLSS.PLSS_STAGED_SUPP, PLSS.PLSS_STAGED_TRIP, TRSA.TRSA_ID
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no); 
            oci_bind_by_name($stmt, ':supplier', $this->supplier); 
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function transactions_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $result = array();
        $hook_item['transfers'] = $result;
        // write_log(json_encode($hook_item), __FILE__, __LINE__);

        if (!array_key_exists('trsa_id', $hook_item)) {
            write_log("hook_item does not have trsa_id item, cannot do transactions_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
            SELECT * FROM GUI_TRANSACTION_DETAILS 
            WHERE TRSFTRID_TRSA_ID = :trsa_id
            ORDER BY TRSFTRID_TRSA_ID, TRSF_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $hook_item['trsa_id']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $hook_item['transfers'] = $result;
    }

    public function transactions_hook_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $result = array();
        $hook_item['base_prods'] = $result;
        // write_log(json_encode($hook_item), __FILE__, __LINE__);

        if (!array_key_exists('trsf_id', $hook_item)) {
            write_log("hook_item does not have mv_id item, cannot do transactions_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
            SELECT DECODE(TRSB_UNT, 34, TRANBASE.TRSB_CVL / 1000, TRANBASE.TRSB_CVL) TRSB_CVL, 
                DECODE(TRSB_UNT, 34, TRANBASE.TRSB_AVL / 1000, TRANBASE.TRSB_AVL) TRSB_AVL, 
                TRANBASE.TRSB_TMP, 
                TRANBASE.TRSB_DNS, 
                TRANBASE.TRSB_TMP_F, 
                TRANBASE.TRSB_API, 
                TRANBASE.TRSB_TK_TANKCODE, 
                TRANBASE.TRSB_KG, 
                DECODE(TRSB_UNT, 34, 5, TRSB_UNT) TRSB_UNT, 
                BASE_PRODS.BASE_CODE, 
                BASE_PRODS.BASE_NAME, 
                BASE_PRODS.BASE_CAT,
                TRANBASE.TRSB_VCF,
                TRANBASE.TRSB_BATCH_NO
            FROM TRANBASE, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TRANBASE.TRSB_BS AND 
                TRANBASE.TRSB_ID_TRSF_ID = :trsf_id
            ORDER BY BASE_PRODS.BASE_CAT DESC
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsf_id', $hook_item['trsf_id']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['base_prods'] = $result;

        //Another hook
        $result = array();
        $hook_item['meters'] = $result;
        
        $query = "
            SELECT MIN(TRSB_OPN_AMB) TRSB_OPN_AMB,
                MIN(TRSB_OPN_COR) TRSB_OPN_COR,
                MIN(TRSB_OPN_KG) TRSB_OPN_KG,
                MAX(TRSB_CLS_AMB) TRSB_CLS_AMB, 
                MAX(TRSB_CLS_COR) TRSB_CLS_COR,
                MAX(TRSB_CLS_KG) TRSB_CLS_KG,
                TRSB_METER,
                TRSB_ID_TRSF_ID
            FROM TRANBASE
            WHERE TRSB_ID_TRSF_ID = :trsf_id
                AND TRSB_INJECTOR IS NULL
            GROUP BY TRSB_METER, TRSB_ID_TRSF_ID
            ORDER BY TRSB_METER
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsf_id', $hook_item['trsf_id']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['meters'] = $result;
    }



    public function customer_products_by_supplier()
    {
        $query = "SELECT CUSTOMER_PRODUCT.CUST_ACCT,
                CUSTOMER.CUST_CODE CUST_CODE,
                PRODUCTS.PROD_CODE,
                PRODUCTS.PROD_CMPY,
                PRODUCTS.PROD_NAME,
                CUSTOMER.CUST_SUPP SUPPLIER_CODE,
                SUPP.CMPY_NAME SUPPLIER_NAME,
                CCMP.CMPY_NAME CUSTOMER_NAME
            FROM CUSTOMER_PRODUCT, CUSTOMER, PRODUCTS, COMPANYS SUPP, COMPANYS CCMP
            WHERE CUSTOMER.CUST_SUPP = SUPP.CMPY_CODE
                AND CUSTOMER.CUST_CODE = CCMP.CMPY_CODE
                AND CUSTOMER_PRODUCT.CUST_ACCT = CUSTOMER.CUST_ACCT
                AND CUSTOMER_PRODUCT.PROD_CODE = PRODUCTS.PROD_CODE
                AND CUSTOMER_PRODUCT.PROD_CMPY = PRODUCTS.PROD_CMPY
                AND CUSTOMER.CUST_SUPP = :supplier
            ORDER BY PRODUCTS.PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, 'supplier', $this->supplier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // read delivery locations links to suppliers
    public function delvloc_by_supplier()
    {
        $query = "
            SELECT 
                DL.DLV_CODE                                AS DELV_CODE,
                DL.DLV_NAME                                AS DELV_NAME,
                DL.DLV_CODE ||' - '|| DL.DLV_NAME          AS DELV_DESC,
                DC.DLC_CUSTOMER                            AS DELV_CUST_ACCT,
                CU.CUST_DESC                               AS DELV_CUST_ACCTDESC,
                CU.CUST_SUPP_CODE                          AS DELV_CUST_SUPPCODE,
                CU.CUST_SUPP_NAME                          AS DELV_CUST_SUPPNAME,
                CU.CUST_CMPY_CODE                          AS DELV_CUST_CMPYCODE,
                CU.CUST_CMPY_NAME                          AS DELV_CUST_CMPYNAME
            FROM 
                DELV_LOCATION DL,
                DELV_FOR_CUST DC,
                (
                    SELECT 
                        CUST.CUST_ACCT                     AS CUST_ACNT,
                        CUST.CUST_SUPP                     AS CUST_SUPP_CODE,
                        SCMP.CMPY_NAME                     AS CUST_SUPP_NAME,
                        CUST.CUST_CODE                     AS CUST_CMPY_CODE,
                        CCMP.CMPY_NAME                     AS CUST_CMPY_NAME,
                        CUST.CUST_ACCT ||' - '|| CCMP.CMPY_NAME      AS CUST_DESC
                    FROM 
                        CUSTOMER CUST,
                        COMPANYS SCMP,
                        COMPANYS CCMP
                    WHERE CUST.CUST_SUPP = SCMP.CMPY_CODE 
                        AND CUST.CUST_CODE = CCMP.CMPY_CODE
                ) CU
            WHERE DL.DLV_CODE = DC.DLC_DELV_LOC(+)
                AND DC.DLC_CUSTOMER = CU.CUST_ACNT(+)
                and ('-1' = :supplier OR CU.CUST_SUPP_CODE = :supplier)
            ORDER BY DELV_CODE
        ";

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


    // read delivery locations links to customers
    public function delvloc_by_customer()
    {
        $query = "
            SELECT 
                DL.DLV_CODE                                AS DELV_CODE,
                DL.DLV_NAME                                AS DELV_NAME,
                DL.DLV_CODE ||' - '|| DL.DLV_NAME          AS DELV_DESC,
                DC.DLC_CUSTOMER                            AS DELV_CUST_ACCT,
                CU.CUST_DESC                               AS DELV_CUST_ACCTDESC,
                CU.CUST_SUPP_CODE                          AS DELV_CUST_SUPPCODE,
                CU.CUST_SUPP_NAME                          AS DELV_CUST_SUPPNAME,
                CU.CUST_CMPY_CODE                          AS DELV_CUST_CMPYCODE,
                CU.CUST_CMPY_NAME                          AS DELV_CUST_CMPYNAME
            FROM 
                DELV_LOCATION DL,
                DELV_FOR_CUST DC,
                (
                    SELECT 
                        CUST.CUST_ACCT                     AS CUST_ACNT,
                        CUST.CUST_SUPP                     AS CUST_SUPP_CODE,
                        SCMP.CMPY_NAME                     AS CUST_SUPP_NAME,
                        CUST.CUST_CODE                     AS CUST_CMPY_CODE,
                        CCMP.CMPY_NAME                     AS CUST_CMPY_NAME,
                        CUST.CUST_ACCT ||' - '|| CCMP.CMPY_NAME      AS CUST_DESC
                    FROM 
                        CUSTOMER CUST,
                        COMPANYS SCMP,
                        COMPANYS CCMP
                    WHERE CUST.CUST_SUPP = SCMP.CMPY_CODE 
                        AND CUST.CUST_CODE = CCMP.CMPY_CODE
                ) CU
            WHERE DL.DLV_CODE = DC.DLC_DELV_LOC(+)
                AND DC.DLC_CUSTOMER = CU.CUST_ACNT(+)
                and ('-1' = :customer OR DC.DLC_CUSTOMER = :customer)
            ORDER BY DELV_CODE
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':customer', $this->customer);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function next_trip_no()
    {
        $company_service = new CompanyService($this->conn, $this->supplier_code, $auto_commit = true);
        $new_pickup = $company_service->next_pickup_no();

        $result = array();
        $result["records"] = array();
        $item = array(
            "next_trip_no" => $new_pickup,
        );

        array_push($result["records"], $item);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }


    /* private function update_pickup_cmpt($compartment)
    {
        // PLSS_PICKUP_TRIP
        // PLSS_PICKUP_SUPP
        // PLSS_PICKUP_CMPT
        // PLSS_STAGED_TRIP
        // PLSS_STAGED_SUPP
        // PLSS_STAGED_CMPT
        // PLSS_STAGED_PRODCODE
        // PLSS_STAGED_PRODCMPY
        // PLSS_STAGED_ORDER        
        $query = "
            UPDATE PICKUP_SCHEDULE_SPECS 
            SET PLSS_STAGED_LOADTYPE = :loadtype
            WHERE PLSS_PICKUP_SUPP = :supp 
                AND PLSS_PICKUP_TRIP = :trip 
                AND PLSS_PICKUP_CMPT = :cmpt
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':loadtype', $compartment->plss_staged_loadtype);
        oci_bind_by_name($stmt, ':supp', $this->supplier_code);
        oci_bind_by_name($stmt, ':trip', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':cmpt', $compartment->compartment);
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    } */

    public function create_pickup()
    {
        // write_log(json_encode($this), __FILE__, __LINE__);

        $url = 'http://' . $_SERVER['SERVER_NAME'] . ':4001/create-pickup-trip';
        // $url = 'http://localhost:4001/create-pickup-trip';

        // prepare compartments
        $new_compartments = array();
        if (isset($this->compartments)) {
            foreach ($this->compartments as $compartment) {
                if ($compartment->prod_code == "") {
                    continue;
                }
                $new_compartment = (object)array();
                $new_compartment->schd_comp_id = $compartment->compartment;
                $new_compartment->prod_code = $compartment->prod_code;
                $new_compartment->prod_cmpy = $compartment->prod_cmpy;
                $new_compartment->schd_units = $compartment->unit_code;
                $new_compartment->staged_trip = $compartment->plss_staged_trip;
                $new_compartment->staged_supp = $compartment->plss_staged_supp;
                $new_compartment->staged_comp_id = $compartment->plss_staged_cmpt;
                $new_compartment->staged_order = $compartment->order_cust_ordno; // plss_staged_order;
                $new_compartment->schd_specqty = $compartment->qty_scheduled; // plss_staged_specqty;
                $new_compartment->schd_prldqty = $compartment->qty_preload; // plss_staged_prldqty;
                $new_compartment->staged_customer = $compartment->plss_staged_cust;
                $new_compartment->staged_delvloc = $compartment->plss_staged_delvloc;
                $new_compartment->staged_loadtype = $compartment->plss_staged_loadtype;
                $new_compartments[] = $new_compartment;
            }
        }
        // prepare dataset
        $data = (object)array();
        $data->supplier = $this->supplier_code;
        $data->trip = $this->shls_trip_no;
        $data->tanker = $this->tnkr_code;
        $data->compartments = $new_compartments;
        // the following are optional for endpoints
        $data->terminal = $this->shls_terminal;
        $data->drawer = $this->drawer_code;
        $data->carrier = $this->carrier_code;
        if (isset($this->driver) && $this->driver != "") {
            $data->driver = $this->driver;
        } else {
            $data->driver = '8888';
        }
        $data->dateScheduled = $this->shls_caldate;
        $data->dateExpired = $this->shls_exp2;

        write_log(json_encode($data), __FILE__, __LINE__);
        // write_log(http_build_query($data), __FILE__, __LINE__);

        $options = array(
            'http' => array(
                'header' => "Content-type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
            ),
        );
        $context = stream_context_create($options);
        // create request to ENDPOINT
        $result = file_get_contents($url, false, $context);
        // $result = file_get_contents($url, false);
        // convert JSON string to Array
        $array = json_decode($result, true);
        write_log('back from endpoint: '.$result.'!!!'.$url, __FILE__, __LINE__);


        if (isset($array['result']) && $array['result'] == true) {
            // need update CMPY_PICKUP_TRIP_LAST
            $company_service = new CompanyService($this->conn, $this->supplier_code, $auto_commit = true);
            $company_service->set_last_pickup($this->shls_trip_no);

            $response = new EchoSchema(200, 
                response("__CREATE_SUCCEEDED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) created", $this->shls_trip_no, $this->supplier_code)
                )
            );
            
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            $response = new EchoSchema(500, 
                response("__CREATE_FAILED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) is failed to create [error: %s]", $this->shls_trip_no, $this->supplier_code, json_encode($array['details']))
                )
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }

    public function delete_pickup()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $url = 'http://' . $_SERVER['SERVER_NAME'] . ':4001/cancel-pickup';
        // $url = 'http://localhost:4001/cancel-pickup';

        // prepare dataset
        $data = (object)array();
        $data->supplier = $this->supplier_code;
        $data->trip = $this->shls_trip_no;
        $options = array(
            'http' => array(
                'header' => "Content-type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
            ),
        );
        $context = stream_context_create($options);
        // create request to ENDPOINT
        $result = file_get_contents($url, false, $context);
        // convert JSON string to Array
        $array = json_decode($result, true);

        if (isset($array['result']) && $array['result'] == true) {
            $response = new EchoSchema(200, 
                response("__DELETE_SUCCEEDED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) deleted", $this->shls_trip_no, $this->supplier_code)
                )
            );
            
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            $response = new EchoSchema(500, 
                response("__DELETE_FAILED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) is failed to delete [error: %s]", $this->shls_trip_no, $this->supplier_code, json_encode($array['details']))
                )
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }

    // delete first and then create with new details
    public function update_pickup()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $url = 'http://' . $_SERVER['SERVER_NAME'] . ':4001/cancel-pickup';
        // $url = 'http://localhost:4001/cancel-pickup';

        // prepare dataset
        $data = (object)array();
        $data->supplier = $this->supplier_code;
        $data->trip = $this->shls_trip_no;
        $options = array(
            'http' => array(
                'header' => "Content-type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
            ),
        );
        $context = stream_context_create($options);
        // create request to ENDPOINT
        $result = file_get_contents($url, false, $context);
        // convert JSON string to Array
        $array = json_decode($result, true);

        if (isset($array['result']) && $array['result'] == true) {
            $this->create_pickup();
        } else {
            $response = new EchoSchema(500, 
                response("__DELETE_FAILED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) is failed to delete [error: %s]", $this->shls_trip_no, $this->supplier_code, json_encode($array['details']))
                )
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }

    private function get_tanker_key()
    {
        $query = "
            SELECT KYA_KEY_NO, KYA_TXT, KYA_PHYS_TYPE 
            FROM GUI_ACCESS_KEYS
            WHERE KYA_TYPE=4 and KYA_TANKER=:tanker 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tanker', $this->tnkr_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row;
    }

    private function get_driver_key()
    {
        $query = "
            SELECT KYA_KEY_NO, KYA_TXT, KYA_PHYS_TYPE 
            FROM GUI_ACCESS_KEYS
            WHERE KYA_TYPE=3 and KYA_DRAWER=:supplier and KYA_SUPPLIER=:supplier
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row;
    }

    public function activate_pickup()
    {
        // write_log(json_encode($this), __FILE__, __LINE__);

        $url = 'http://' . $_SERVER['SERVER_NAME'] . ':4001/activate-pickup';
        // $url = 'http://localhost:4001/activate-pickup';

        $ids = array();
        $keys = $this->get_tanker_key();
        write_log(json_encode($keys), __FILE__, __LINE__);
        if (isset($keys) && is_array($keys)) {
            $id = (object)array();
            $id->idvalue = $keys['KYA_TXT'];
            $id->phystype = $keys['KYA_PHYS_TYPE'];
            $ids[] = $id;
        }
        $keys = $this->get_driver_key();
        write_log(json_encode($keys), __FILE__, __LINE__);
        if (isset($keys) && is_array($keys)) {
            $id = (object)array();
            $id->idvalue = $keys['KYA_TXT'];
            $id->phystype = $keys['KYA_PHYS_TYPE'];
            $ids[] = $id;
        }
        write_log(json_encode($ids), __FILE__, __LINE__);

        // prepare dataset
        $data = (object)array();
        $data->supplier = $this->supplier_code;
        $data->trip = $this->shls_trip_no;
        // $data->ids = $ids;

        $options = array(
            'http' => array(
                'header' => "Content-type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
            ),
        );
        $context = stream_context_create($options);
        // create request to ENDPOINT
        $result = file_get_contents($url, false, $context);
        // convert JSON string to Array
        $array = json_decode($result, true);

        if (isset($array['result']) && $array['result'] == true) {
            $response = new EchoSchema(200, 
                response("__UPDATE_SUCCEEDED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) activated", $this->shls_trip_no, $this->supplier_code)
                )
            );
            
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            $response = new EchoSchema(500, 
                response("__UPDATE_FAILED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) is failed to activate [error: %s]", $this->shls_trip_no, $this->supplier_code, json_encode($array['details']))
                )
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }

    public function deactivate_pickup()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $url = 'http://' . $_SERVER['SERVER_NAME'] . ':4001/deactivate-pickup';
        // $url = 'http://localhost:4001/deactivate-pickup';

        $ids = array();
        $keys = $this->get_tanker_key();
        if (isset($keys) && is_array($keys)) {
            $id = (object)array();
            $id->idvalue = $keys['KYA_TXT'];
            $id->phystype = $keys['KYA_PHYS_TYPE'];
            $ids[] = $id;
        }
        $keys = $this->get_driver_key();
        write_log(json_encode($keys), __FILE__, __LINE__);
        if (isset($keys) && is_array($keys)) {
            $id = (object)array();
            $id->idvalue = $keys['KYA_TXT'];
            $id->phystype = $keys['KYA_PHYS_TYPE'];
            $ids[] = $id;
        }
        // prepare dataset
        $data = (object)array();
        $data->supplier = $this->supplier_code;
        $data->trip = $this->shls_trip_no;
        // $data->ids = $ids;

        $options = array(
            'http' => array(
                'header' => "Content-type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
            ),
        );
        $context = stream_context_create($options);
        // create request to ENDPOINT
        $result = file_get_contents($url, false, $context);
        // convert JSON string to Array
        $array = json_decode($result, true);

        if (isset($array['result']) && $array['result'] == true) {
            $response = new EchoSchema(200, 
                response("__UPDATE_SUCCEEDED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) deactivated", $this->shls_trip_no, $this->supplier_code)
                )
            );
            
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            $response = new EchoSchema(500, 
                response("__UPDATE_FAILED__",
                    sprintf("Pickup Load (trip number:%d, supplier:%s) is failed to deactivate [error: %s]", $this->shls_trip_no, $this->supplier_code, json_encode($array['details']))
                )
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }

}

/*
Here are the steps of creating a pick-up trip  (for all the samples, localhost can change to 10.2.20.52 which is the GE server)
1# Create an empty pickup trip
http://localhost:4001/create-pickup-trip
This is to create an empty pickup trip. 
Parameter 
{ 
    "ids": [{"idvalue": "110546","phystype": 6,"pin": null,"type": 3},{"idvalue": "1234","phystype": 6,"pin": null,"type": 4}]
}
Or
{ 
    "supplier": "1",
    "trip": 1001,
    "tanker": "1234"
}
Logic is: if supplier and tanker are provided, then use it. If not provided, use the information of ids to get tanker and supplier. If trip number is provided, use this trip as pickup trip number, if not provided, automatically use next trip number of this supplier.
This endpoints also accept a parameter of compartments, if compartments is provided, nodejs will combine creating pickup trip and adding compartments information into one action, but normally we create an empty pickup trip first, then use the endpoint below to add compartments data.

Here is the sample i did using POSTMAN
 

2# Add compartments
http://localhost:4001/add-to-pickup
{ 
    "supplier": "1",
    "trip": "1001",
    "tanker": "1234",
    "compartments": [
        {
            "schd_comp_id": 1,
            "prod_code": "141",
            "prod_cmpy": "1",
            "schd_units": 5,
            "staged_trip":896,
            "staged_supp": "1",
            "staged_comp_id": 1,
            "staged_order": null,
            "schd_specqty": 1500,
            "schd_prldqty": 0
        }
    ]
}
For open order, staged trip is null, and staged oder is set, like
{ 
    "supplier": "1",
    "trip": "1001",
    "tanker": "1234",
    "compartments": [
        {
            "schd_comp_id": 1,
            "prod_code": "141",
            "prod_cmpy": "1",
            "schd_units": 5,
            "staged_trip":null,
            "staged_supp": null,
            "staged_comp_id": 1,
            "staged_order": 206,
            "schd_specqty": 1000,
            "schd_prldqty": 0
        }
    ]
}

3# Activate pickup trip
http://10.2.20.52:4001/activate-pickup
{ 
    "supplier": "1",
    "trip": "1001",
    "ids": [
        {
            "idvalue":"110546",
            "phystype":6
        },
        {
            "idvalue":"11441234",
            "phystype":6
        }
    ]
}
After activating this pickup trip, it can be loaded at loading bay as normal, and when completing this pickup trip, Omage handles all the follow-up jobs like replicate loading data to staged trips, reconcile open order quantity and allocations.
 
4# cancel pickup trip
It can only be canceled when it is not acivated.
http://localhost:4001/cancel-pickup
{
    "supplier": "1",
    "trip": "1001",
}

*/

/*
{
    "shls_ld_type": "2",
    "shls_terminal": "CNS",
    "supplier_code": "7640102",
    "shls_trip_no": 900130,
    "drawer_code": "7640102",
    "carrier_code": "11561639",
    "tnkr_code": "ZZZ999",
    "driver": "",
    "shls_caldate": "2023-05-29 19:49:22",
    "shls_exp2": "2023-05-31 19:49:22",
    "compartments": [
        {
            "eqpt_code": "ZZZ999",
            "eqpt_id": "963410319",
            "compartment": "1",
            "eqpt_cmpt": "1",
            "prod_code": "400000922",
            "prod_name": "LSFO 380",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "9000",
            "qty_scheduled": 6000,
            "qty_preload": 0,
            "schdspec_shlstrip": 900130,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_cust_ordno": "",
            "schd_order": "",
            "schd_deliv_num": "",
            "prod_class": "",
            "plss_pickup_trip": 900130,
            "plss_pickup_supp": "7640102",
            "plss_pickup_cmpt": "1",
            "plss_staged_trip": "900116",
            "plss_staged_supp": "7640102",
            "plss_staged_cmpt": "1",
            "plss_staged_prodcode": "400000922",
            "plss_staged_prodcmpy": "7640102",
            "plss_staged_units": "5",
            "plss_staged_specqty": 6000,
            "plss_staged_prldqty": 0,
            "plss_staged_order": "",
            "plss_staged_cust": "11561639",
            "plss_staged_delvloc": "11561639",
            "plss_staged_loadtype": "2",
            "order_id": "",
            "trip_order_no": "900116",
            "trip_customer": "",
            "trip_delvloc": "",
            "qty_loaded": "0",
            "qty_amb": "0",
            "qty_std": "0",
            "qty_kg": "0",
            "prev_prod_code": "400003045",
            "prev_prod_name": "Kerosene"
        },
        {
            "eqpt_code": "ZZZ999",
            "eqpt_id": "963410319",
            "compartment": "2",
            "eqpt_cmpt": "2",
            "prod_code": "400003045",
            "prod_name": "KEROSENE",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "9000",
            "qty_scheduled": 9000,
            "qty_preload": 0,
            "schdspec_shlstrip": 900130,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_cust_ordno": "",
            "schd_order": "",
            "schd_deliv_num": "",
            "prod_class": "",
            "plss_pickup_trip": 900130,
            "plss_pickup_supp": "7640102",
            "plss_pickup_cmpt": "2",
            "plss_staged_trip": "900117",
            "plss_staged_supp": "7640102",
            "plss_staged_cmpt": "",
            "plss_staged_prodcode": "400003045",
            "plss_staged_prodcmpy": "7640102",
            "plss_staged_units": "5",
            "plss_staged_specqty": 9000,
            "plss_staged_prldqty": 0,
            "plss_staged_order": "",
            "plss_staged_cust": "11556746",
            "plss_staged_delvloc": "11556746",
            "plss_staged_loadtype": "3",
            "order_id": "",
            "trip_order_no": "900117",
            "trip_customer": "",
            "trip_delvloc": "",
            "qty_loaded": "0",
            "qty_amb": "0",
            "qty_std": "0",
            "qty_kg": "0",
            "prev_prod_code": "400003048",
            "prev_prod_name": "F/O A"
        },
        {
            "eqpt_code": "ZZZ999",
            "eqpt_id": "963410319",
            "compartment": "3",
            "eqpt_cmpt": "3",
            "prod_code": "400003047",
            "prod_name": "AGOB0 UABASEB2/B5",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "9000",
            "qty_scheduled": 8888,
            "qty_preload": 0,
            "schdspec_shlstrip": 900130,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_cust_ordno": "",
            "schd_order": "",
            "schd_deliv_num": "",
            "prod_class": "",
            "plss_pickup_trip": 900130,
            "plss_pickup_supp": "7640102",
            "plss_pickup_cmpt": "3",
            "plss_staged_trip": "900117",
            "plss_staged_supp": "7640102",
            "plss_staged_cmpt": "",
            "plss_staged_prodcode": "400003047",
            "plss_staged_prodcmpy": "7640102",
            "plss_staged_units": "5",
            "plss_staged_specqty": 8888,
            "plss_staged_prldqty": 0,
            "plss_staged_order": "",
            "plss_staged_cust": "12000000",
            "plss_staged_delvloc": "12000000",
            "plss_staged_loadtype": "3",
            "order_id": "",
            "trip_order_no": "900117",
            "trip_customer": "",
            "trip_delvloc": "",
            "qty_loaded": "0",
            "qty_amb": "0",
            "qty_std": "0",
            "qty_kg": "0",
            "prev_prod_code": "400003045",
            "prev_prod_name": "Kerosene"
        },
        {
            "eqpt_code": "ZZZ999",
            "eqpt_id": "963410319",
            "compartment": "4",
            "eqpt_cmpt": "4",
            "prod_code": "400003048",
            "prod_name": "F/O A",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "9000",
            "qty_scheduled": 9000,
            "qty_preload": 0,
            "schdspec_shlstrip": 900130,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_cust_ordno": "900035",
            "schd_order": "",
            "schd_deliv_num": "",
            "prod_class": "",
            "plss_pickup_trip": 900130,
            "plss_pickup_supp": "7640102",
            "plss_pickup_cmpt": "4",
            "plss_staged_trip": "",
            "plss_staged_supp": "7640102",
            "plss_staged_cmpt": "",
            "plss_staged_prodcode": "400003048",
            "plss_staged_prodcmpy": "7640102",
            "plss_staged_units": "5",
            "plss_staged_specqty": 9000,
            "plss_staged_prldqty": 0,
            "plss_staged_order": "36",
            "plss_staged_cust": "11561639",
            "plss_staged_delvloc": "11561639",
            "plss_staged_loadtype": "4",
            "order_id": "",
            "trip_order_no": "/900035",
            "trip_customer": "11561639 - MAXWELL 1991 CO LTD",
            "trip_delvloc": "",
            "qty_loaded": "0",
            "qty_amb": "0",
            "qty_std": "0",
            "qty_kg": "0",
            "prev_prod_code": "400003048",
            "prev_prod_name": "F/O A"
        }
    ]
}
*/