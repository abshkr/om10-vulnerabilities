<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/manual_trans_service.php';
include_once 'common_class.php';

//Old php: classes\ManualTransactions.class.php
class ManualTrans extends CommonClass
{
    protected $TABLE_NAME = 'DUMMY';

    public function get_suppliers()
    {
        $query = "SELECT DISTINCT ORDER_SUPP_CODE SUPPLIER,
                ORDER_SUPP_NAME SUPPLIER_NAME
            FROM GUI_ORDERS
            WHERE ORDER_STAT_ID NOT IN (2, 3, 5, 6)";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_orders()
    {
        $query = "SELECT DISTINCT ORDER_CUST_NO
            FROM GUI_ORDERS
            WHERE ORDER_STAT_ID NOT IN (2, 3, 5, 6)
                AND ORDER_CUST_CODE = :customer
                AND ORDER_SUPP_CODE = :supplier
            ORDER BY ORDER_CUST_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':customer', $this->customer);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_customers()
    {
        $query = "SELECT DISTINCT ORDER_CUST_CODE CUSTOMER,
                ORDER_CUST_NAME CUSTOMER_NAME
            FROM GUI_ORDERS
            WHERE ORDER_SUPP_CODE = :supplier
            ORDER BY ORDER_CUST_CODE";
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

    public function get_trips()
    {
        $query = "SELECT SHLS_TRIP_NO 
            FROM SCHEDULE 
            WHERE (STATS IN ('F', 'A') OR STATS IS NULL) 
                AND SHLS_SUPP = :supplier AND SHLS_CLASS = 0 
            ORDER BY SHLS_CALDATE DESC";
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

    public function get_drivers()
    {
        $query = "SELECT PER_CODE, PER_NAME FROM PERSONNEL 
            WHERE PER_AUTH IN (7, 8, 9) ORDER BY PER_CODE ASC";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Old code: ManualTransactions.class.php::getAdditionalInfoByOpenOrder
    public function get_order_basics()
    {
        $query = "SELECT (CO.ORD_SOLD_TO_NUM || NVL2(CMPY.CMPY_NAME,' - ','') || CMPY.CMPY_NAME) as CUSTOMER_CODE, 
                    (CO.ORD_SHIP_TO_NUM || NVL2(DL.DLV_NAME,' - ','') || DL.DLV_NAME) as DELIVERY_LOCATION,
                    ORDER_CARRIER
                FROM CUST_ORDER CO,
                    CUSTOMER CUST,
                    COMPANYS CMPY,
                    DELV_LOCATION DL
                WHERE CO.ORDER_CUST_ORDNO = :order_cust_no
                    AND (CO.ORD_SOLD_TO_NUM = CUST.CUST_CODE(+) AND CUST.CUST_CODE = CMPY.CMPY_CODE(+))
                    AND CO.ORD_SHIP_TO_NUM = DL.DLV_CODE(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_cust_no', $this->order_cust_no);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_sched_basics()
    {
        // write_log(sprintf("%s::%s() START. trip:%d, supplier:%s",
        //     __CLASS__, __FUNCTION__, $this->trip_no, $this->supplier),
        //     __FILE__, __LINE__);

        $query = "SELECT C.CMPY_CODE, C.CMPY_NAME
            FROM SCHEDULE S, COMPANYS C, TANKERS T 
            WHERE S.SHL_TANKER = T.TNKR_CODE 
                AND T.TNKR_CARRIER = C.CMPY_CODE 
                AND S.SHLS_SUPP = :supplier 
                AND S.SHLS_TRIP_NO = :trip_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CMPY_NAME'] == "GENERIC CARRIER") {
            $query = "SELECT C.CMPY_VET FROM COMPANYS C WHERE C.CMPY_CODE = :supplier";
            $stmt2 = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt2, ':supplier', $this->supplier);
            if (!oci_execute($stmt2)) {
                $e = oci_error($stmt2);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }

            $row = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS);
            if ($row['CMPY_VET'] == 1 || $row['CMPY_VET'] == 2 || $row['CMPY_VET'] == 3) {
                //Vet PrimeMover(1) or Vet Trailer(2) or Vet all(3)
                $query = "SELECT C.CMPY_CODE CARRIER, 
                        C.CMPY_NAME CARRIER_NAME,
                        T.TNKR_CODE
                    FROM SCHEDULE S, COMPANYS C, TANKERS T 
                    WHERE S.SHL_TANKER = T.TNKR_CODE 
                        AND T.TNKR_CARRIER = C.CMPY_CODE 
                        AND S.SHLS_SUPP = :supplier AND S.SHLS_TRIP_NO = :trip_no";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':supplier', $this->supplier);
                oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            } else {
                $query = "SELECT CMPY_CODE CARRIER, 
                        CMPY_NAME CARRIER_NAME,
                        NULL TNKR_CODE
                    FROM GUI_COMPANYS 
                    WHERE BITAND(CMPY_TYPE, 4) <> 0 
                    ORDER BY CMPY_CODE ASC";
                $stmt = oci_parse($this->conn, $query);
            }

            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }
        } else {
            $query = "SELECT C.CMPY_CODE CARRIER, 
                    C.CMPY_NAME CARRIER_NAME,
                    T.TNKR_CODE
                FROM SCHEDULE S, COMPANYS C, TANKERS T 
                WHERE S.SHL_TANKER = T.TNKR_CODE 
                    AND T.TNKR_CARRIER = C.CMPY_CODE 
                    AND S.SHLS_SUPP = :supplier 
                    AND S.SHLS_TRIP_NO = :trip_no";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':supplier', $this->supplier);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            if (oci_execute($stmt, $this->commit_mode)) {
                return $stmt;
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }
        }
    }

    //Get arms by product. Old code:dmManualTransactions.php::getInstance. 
    public function get_arms()
    {
        write_log(sprintf("%s::%s() START. prod_code:%s, prod_cmpy:%s",
            __CLASS__, __FUNCTION__, $this->prod_code, $this->prod_cmpy),
            __FILE__, __LINE__);
        
        $query = "SELECT DISTINCT R.RAT_PROD_PRODCMPY, 
                R.RAT_PROD_PRODCODE, 
                B.STREAM_BAYCODE, 
                B.STREAM_ARMCODE, 
                B.STREAM_BASECODE, 
                B.STREAM_TANKCODE, 
                B.STREAM_TANKDEN, 
                B.STREAM_BCLASS_CODE
            FROM RATIOS R,
                GUI_PIPENODE B
            WHERE B.STREAM_BASECODE = R.RATIO_BASE(+)
                AND RAT_PROD_PRODCODE = :prod_code
                AND RAT_PROD_PRODCMPY = :prod_cmpy
            ORDER BY R.RAT_PROD_PRODCMPY, B.STREAM_ARMCODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
        oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpy);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Old php: ManualTransactions.class.php::do_create
    public function submit()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $serv = new ManualTransactionService($this->conn);
        $serv->set_property('supplier', $this->supplier);
        if (isset($this->trip_no)) {
            $serv->set_property('trip_no', $this->trip_no);
            $serv->set_property('load_number', $this->trip_no);
        }
        
        $start_time = DateTime::createFromFormat('Y-m-d H:i:s', $this->start_time);
        $serv->set_property('start_time', $start_time->format('d.m.YH:i:s'));
        $end_time = DateTime::createFromFormat('Y-m-d H:i:s', $this->end_time);
        $serv->set_property('finish_time', $end_time->format('d.m.YH:i:s'));
        $serv->set_property('drawer_code', $this->supplier);
        $serv->set_property('drawer_name', "");
        $serv->set_property('tanker_code', $this->tanker);
        $serv->set_property('operator_code', "8888");
        if (isset($this->order_cust_no)) {
            $serv->set_property('order_cust_no', $this->order_cust_no);
            $serv->set_property('load_number', $this->order_cust_no);
        } else {
            $serv->set_property('order_cust_no', 0);     //Not an open order 
        }
        if (!isset($this->transfers)) {
            $serv->set_property('num_of_transfers', 0);
            $num_of_transfers = 0;
        } else {
            $serv->set_property('num_of_transfers', count($this->transfers));
            $num_of_transfers = count($this->transfers);
        }
        
        $transfers = array();
        for ($i = 0; $i < $num_of_transfers; ++$i) {
            $transfers[$i] = new Manual_Transfer();
            $transfers[$i]->Arm_Code = $this->transfers[$i]->arm_code;
            //$transfers[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
            $transfers[$i]->nr_in_tkr = 1;

            $transfers[$i]->drawer_code = $this->transfers[$i]->drawer_code;
            $transfers[$i]->product_code = $this->transfers[$i]->product_code;
            
            $transfers[$i]->dens = $this->transfers[$i]->dens * 1000;
            $transfers[$i]->Temperature = $this->transfers[$i]->temperature * 100;
            $transfers[$i]->amb_vol = $this->transfers[$i]->amb_vol * 1000;
            $transfers[$i]->cor_vol = $this->transfers[$i]->cor_vol * 1000;
            $transfers[$i]->liq_kg = $this->transfers[$i]->liq_kg * 1000;

            $transfers[$i]->num_of_meter = count($this->transfers[$i]->meters);
            for ($j = 0; $j < $transfers[$i]->num_of_meter; ++$j) {
                $transfers[$i]->meters[$j] = new stdClass();
                $transfers[$i]->meters[$j]->Injector_or_Meter = $this->transfers[$i]->meters[$j]->injector_or_meter;
                $transfers[$i]->meters[$j]->Meter_Injector_Code = $this->transfers[$i]->meters[$j]->meter_injector_code;

                $transfers[$i]->meters[$j]->open_amb = $this->transfers[$i]->meters[$j]->open_amb;
                $transfers[$i]->meters[$j]->open_kg = $this->transfers[$i]->meters[$j]->open_kg;
                $transfers[$i]->meters[$j]->open_cor = $this->transfers[$i]->meters[$j]->open_cor;
                $transfers[$i]->meters[$j]->close_amb = $this->transfers[$i]->meters[$j]->close_amb;
                $transfers[$i]->meters[$j]->close_cor = $this->transfers[$i]->meters[$j]->close_cor;
                $transfers[$i]->meters[$j]->close_kg = $this->transfers[$i]->meters[$j]->close_kg;
            }

            $transfers[$i]->Number_of_Bases = count($this->transfers[$i]->bases);
            for ($j = 0; $j < $transfers[$i]->Number_of_Bases; ++$j) {
                $transfers[$i]->bases[$j] = new Transfer_Base();
                $transfers[$i]->bases[$j]->Tank_Code = $this->transfers[$i]->bases[$j]->tank_code;
                $transfers[$i]->bases[$j]->product_code = $this->transfers[$i]->bases[$j]->base_code;
                $transfers[$i]->bases[$j]->prod_class = $this->transfers[$i]->bases[$j]->base_class;
                $transfers[$i]->bases[$j]->dens = $this->transfers[$i]->bases[$j]->dens * 1000;
                $transfers[$i]->bases[$j]->Temperature = $this->transfers[$i]->bases[$j]->temperature * 100;

                $transfers[$i]->bases[$j]->amb_vol = $this->transfers[$i]->bases[$j]->amb_vol * 1000;
                $transfers[$i]->bases[$j]->cor_vol = $this->transfers[$i]->bases[$j]->cor_vol * 1000;
                $transfers[$i]->bases[$j]->liq_kg = $this->transfers[$i]->bases[$j]->liq_kg * 1000;
            }
        }

        $serv->set_property('transfers', $transfers);
        $serv->set_property('is_nomination', false);
        $serv->set_property('auto_complete', "F");

        if (isset($this->seals)) {
            $serv->set_property('seals', $this->seals);
        }

        if ($serv->do_create($error_msg)) {
            if (isset($this->order_cust_no)) {
                $result = new EchoSchema(200, 
                    response("__MANUAL_TRANS_SUBMITTED__",
                    sprintf("Manual transaction (open order:%d) submitted", $this->order_cust_no)));
            } else {
                $result = new EchoSchema(200, 
                    response("__MANUAL_TRANS_SUBMITTED__",
                    sprintf("Manual transaction (load number:%d, supplier:%s) submitted", $this->trip_no, $this->supplier)));
            }
            
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result = new EchoSchema(500, response("__MANUAL_TRANS_FAILED__",
                "Failed to submit manual transaction, error message: " . $error_msg));
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }

    public function get_base_details()
    {
        $query = "SELECT R.RAT_PROD_PRODCMPY, 
                R.RAT_PROD_PRODCODE, 
                B.STREAM_ARMCODE, 
                B.STREAM_MTRCODE, 
                B.STREAM_INJCODE, 
                B.STREAM_BASECODE, 
                B.STREAM_BASENAME, 
                B.STREAM_BCLASS_CODE,
                DECODE(B.STREAM_BCLASS_CODE, 6, 'T', 11,'T','F') METER_TYPE_CODE, 
                DECODE(B.STREAM_BCLASS_CODE, 6, 'INJECT', 11,'INJECT','METER') METER_TYPE_DESC, 
                B.STREAM_BCLASS_NMAE,
                B.STREAM_TANKCODE, B.STREAM_TANKDEN, STREAM_TANKTEMP AS BASE_RPT_TEMP, 
                BP.BASE_RPT_TEMP AS BASE_RPT_TEMP2, R.RATIO_VALUE
            FROM RATIOS R,
                GUI_PIPENODE B,
                BASE_PRODS BP
            WHERE B.STREAM_BASECODE = R.RATIO_BASE(+)
                AND B.STREAM_BASECODE = BP.BASE_CODE(+) 
                AND RAT_PROD_PRODCMPY = :prod_cmpy AND RAT_PROD_PRODCODE = :prod_code AND STREAM_ARMCODE = :arm_code
            ORDER BY R.RAT_PROD_PRODCMPY, METER_TYPE_CODE, B.STREAM_ARMCODE, B.STREAM_BASECODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
        oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpy);
        oci_bind_by_name($stmt, ':arm_code', $this->arm_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Old code: ManualTransactions.class.php::getOrderDetailsByTanker
    public function get_order_details()
    {
        $query = "SELECT 'BY_PRODUCT' as SCHD_TYPE,
                TC.TNKR_CMPT_NO,
                TC.TRAILERCOMP,
                NVL(SF.ADJ_AMNT, 0) + TC.CMPT_CAPACIT CMPT_CAPACIT,
                TC.CMPT_UNITS,
                TC.UNIT,
                TC.EQPT_CODE,
                TC.TC_EQPT,
                NULL AS PROD_CODE,
                NULL AS ALLOWED_QTY
            FROM
            (
                SELECT ROWNUM TNKR_CMPT_NO,
                    tc_tmp.*
                FROM
                (
                    SELECT c.TRAILERCOMP,
                    c.CMPT_CAPACIT,
                    c.CMPT_UNITS,
                    un.DESCRIPTION UNIT,
                    te.TC_SEQNO,
                    trs.EQPT_CODE,
                    te.TC_EQPT,
                    c.ETYP_ID_RT,
                    te.TC_TANKER
                    FROM TNKR_EQUIP te,
                        TRANSP_EQUIP trs,
                        UNIT_SCALE_VW un,
                        CMPT_VW c
                    WHERE te.TC_EQPT = trs.EQPT_ID
                        AND trs.EQPT_ETP = C.ETYP_ID_RT
                        AND un.UNIT_ID = c.CMPT_UNITS
                        AND te.TC_TANKER = :tanker
                    ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
            ) tc,
            SFILL_ADJUST sf
        WHERE tc.TC_EQPT = sf.ADJ_EQP(+)
            AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY tc.TNKR_CMPT_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tanker', $this->tanker);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        return $stmt;
    }

    //Old code: ManualTransactions.class.php::getScheduleDetailsBySuppTrip
    public function get_sched_details()
    {
        $query = "SELECT LD_TYPE, TNKR_CODE
            FROM GUI_SCHEDULES
            WHERE SUPPLIER_CODE = :supplier AND SHLS_TRIP_NO = :trip_no
            UNION
            SELECT LD_TYPE, TNKR_CODE
            FROM GUI_NOM_SCHEDULES
            WHERE SUPPLIER_CODE = :supplier AND SHLS_TRIP_NO = :trip_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $tanker = $row["TNKR_CODE"];
        if (strtoupper($row['LD_TYPE']) === "PRESCHEDULE") {
            $query = "SELECT
                    'BY_COMPARTMENT' as SCHD_TYPE,
                    et.EQPT_CODE,
                    et.TNKR_CMPT_NO,
                    sd.UNIT UNIT,
                    et.TRAILERCOMP TLR_CMPT,
                    sd.SHLS_SUPP,
                    sd.PROD_CODE,
                    sd.PROD_NAME,
                    sd.SCHD_UNITS CMPT_UNITS,
                    sd.SCHD_SPECQTY ALLOWED_QTY,
                    0 LOAD_QTY,
                    0 PRELD_QTY,
                    pr.PROD_NAME PREV_PROD,
                    DECODE(sd.ORDER_CUST_ORDNO, 0, NULL, sd.ORDER_CUST_ORDNO) ORDER_CUST_ORDNO,
                    et.CMPT_CAPACIT,
                    '' ORDER_REF_CODE,
                    0.0 SCHORDER_QTY,
                    DECODE(pr.PROD_CODE, '-1', NULL, pr.PROD_CODE) PREV_PRODCODE,
                    et.TC_EQPT,
                    sd.SHLSLOAD_LOAD_ID,
                    sd.ARM_NAME,
                    sd.ARMCODE,
                    NVL(DECODE(sd.SCHD_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED), 0) as QTY_LOADED,
                    sd.SCHD_PRLDQTY QTY_PRELOAD,
                    trsf.TRIP_QTY_AMB QTY_AMB,
                    trsf.TRIP_QTY_STD QTY_STD,
                    trsf.TRIP_QTY_KG QTY_KG,
                    sd.CUSTOMER_CODE,
                    sd.DELIVERY_LOCATION,
                    sd.DELIVERY_NUMBER
                FROM
                    (
                        SELECT
                            tc.TNKR_CMPT_NO,
                            tc.TRAILERCOMP,
                            NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT,
                            tc.CMPT_UNITS,
                            tc.UNIT,
                            tc.EQPT_CODE,
                            tc.TC_EQPT
                        FROM
                            (
                                SELECT ROWNUM TNKR_CMPT_NO, tc_tmp.*
                                FROM
                                (
                                    SELECT
                                        c.TRAILERCOMP,
                                        c.CMPT_CAPACIT,
                                        c.CMPT_UNITS,
                                        un.DESCRIPTION UNIT,
                                        te.TC_SEQNO,
                                        trs.EQPT_CODE,
                                        te.TC_EQPT,
                                        c.ETYP_ID_RT,
                                        te.TC_TANKER
                                    FROM
                                        TNKR_EQUIP te,
                                        TRANSP_EQUIP trs,
                                        UNIT_SCALE_VW un,
                                        CMPT_VW c
                                    WHERE
                                        te.TC_EQPT = trs.EQPT_ID
                                        AND trs.EQPT_ETP = C.ETYP_ID_RT
                                        AND un.UNIT_ID = c.CMPT_UNITS
                                        AND te.TC_TANKER = :tanker
                                    ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                                ) tc_tmp
                            ) tc, SFILL_ADJUST sf
                        WHERE tc.TC_EQPT = sf.ADJ_EQP(+)
                            AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
                        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
                    ) et,
                    (
                        SELECT PRODUCTS.PROD_NAME,
                            SPECDETS.SCHDPROD_PRODCODE PROD_CODE,
                            SPECDETS.SCHD_TRAILER,
                            SPECDETS.SCHD_TRAILERCOMP,
                            SPECDETS.SCHD_COMP_ID,
                            SPECDETS.SCHD_SPECQTY,
                            SPECDETS.SCHD_UNITS,
                            CUST_ORDER.ORDER_CUST_ORDNO,
                            un.DESCRIPTION UNIT,
                            SCHEDULE.SHLSLOAD_LOAD_ID,
                            BA_ARMS.ARM_NAME,
                            SPECDETS.ARMCODE,
                            SCHEDULE.SHLS_SUPP,
                            SPECDETS.SCHDSPEC_SHLSSUPP,
                            SPECDETS.SCHDSPEC_SHLSTRIP,
                            SPECDETS.SCHDPROD_PRODCMPY,
                            SPECDETS.SCHDPROD_PRODCODE,
                            SPECDETS.SCHD_PRLDQTY,
                            (SPECDETS.SCHD_SOLD_TO_NUM || NVL2(COMPANYS.CMPY_NAME,' - ','') || COMPANYS.CMPY_NAME) CUSTOMER_CODE,
                            (SPECDETS.SCHD_SHIP_TO_NUM || NVL2(DELV_LOCATION.DLV_NAME,' - ','') || DELV_LOCATION.DLV_NAME) DELIVERY_LOCATION,
                            SPECDETS.SCHD_DELIV_NUM DELIVERY_NUMBER
                        FROM
                            SPECDETS,
                            SCHEDULE,
                            PRODUCTS,
                            CUST_ORDER,
                            unit_scale_vw un,
                            BA_ARMS,
                            CUSTOMER,
                            COMPANYS,
                            DELV_LOCATION
                        WHERE SPECDETS.SCHD_UNITS = un.UNIT_ID
                            AND PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
                            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
                            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
                            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
                            AND CUST_ORDER.ORDER_NO(+) = SPECDETS.SCHD_ORDER
                            AND SCHEDULE.SHLS_SUPP = :supplier
                            AND SCHEDULE.SHLS_TRIP_NO = :trip_no
                            AND SPECDETS.ARMCODE = BA_ARMS.BAA_CODE(+)
                            AND (SPECDETS.SCHD_SOLD_TO_NUM = CUSTOMER.CUST_ACCT(+) AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+))
                            AND (SPECDETS.SCHD_SHIP_TO_NUM = DELV_LOCATION.DLV_CODE(+))
                    ) sd,
                    (
                        SELECT PRODUCTS.PROD_NAME,
                            SPECDETS.SCHD_TRAILER,
                            SPECDETS.SCHD_TRAILERCOMP,
                            SPECDETS.SCHD_COMP_ID,
                            SPECDETS.SCHD_UNITS,
                            PRODUCTS.PROD_CODE
                        FROM SPECDETS,
                            SCHEDULE,
                            PRODUCTS
                        WHERE PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
                            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
                            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
                            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
                            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                            (
                                SELECT * FROM
                                (
                                    SELECT SCHEDULE.SHLS_TRIP_NO,
                                        SCHEDULE.SHLS_SUPP
                                    FROM LOADS,
                                        SCHEDULE
                                    WHERE LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                        AND LOADS.LOAD_DMY < NVL(
                                            (
                                            SELECT
                                                LOADS.LOAD_DMY
                                            FROM
                                                LOADS,
                                                SCHEDULE
                                            WHERE
                                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                                AND LOADS.LOAD_DMY IS NOT NULL
                                                AND SCHEDULE.SHLS_SUPP = :supplier
                                                AND SCHEDULE.SHL_TANKER = :tanker
                                                AND SCHEDULE.SHLS_TRIP_NO = :trip_no
                                            ), SYSDATE)
                                        AND LOADS.LOAD_DMY IS NOT NULL
                                        AND SCHEDULE.SHLS_SUPP = :supplier
                                        AND SCHEDULE.SHL_TANKER = :tanker
                                    ORDER BY LOADS.LOAD_DMY DESC
                                )
                                WHERE ROWNUM = 1
                            )
                    ) pr,
                    (
                        SELECT SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER,
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
                        FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS
                        WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                            AND SCHEDULE.SHLS_SUPP = :supplier
                            AND SCHEDULE.SHL_TANKER = :tanker
                        GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
                            TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
                    ) trsf
                WHERE et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
                    AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
                    AND sd.SCHDSPEC_SHLSSUPP = trsf.TRIP_SUPPLIER(+)
                    AND sd.SCHDSPEC_SHLSTRIP = trsf.TRIP_NO(+)
                    AND sd.SCHDPROD_PRODCMPY = trsf.TRIP_PRODCMPY(+)
                    AND sd.SCHDPROD_PRODCODE = trsf.TRIP_PRODCODE(+)
                    AND sd.SCHD_COMP_ID      = trsf.TRIP_COMPARTMENT(+)
                ORDER BY TO_NUMBER(et.TNKR_CMPT_NO)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':supplier', $this->supplier);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            oci_bind_by_name($stmt, ':tanker', $tanker);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }
            return $stmt;
        } else {
            $query = "SELECT 
                    'BY_PRODUCT' as SCHD_TYPE,
                    et.EQPT_CODE,
                    et.TNKR_CMPT_NO,
                    null as UNIT,
                    et.TRAILERCOMP TLR_CMPT,
                    sd2.SHLS_SUPP,
                    null as PROD_CODE,
                    null as PROD_NAME,
                    null as CMPT_UNITS,
                    null as ALLOWED_QTY,
                    0 LOAD_QTY,
                    0 PRELD_QTY,
                    pr.PROD_NAME PREV_PROD,
                    null as ORDER_CUST_ORDNO,
                    et.CMPT_CAPACIT,
                    '' ORDER_REF_CODE,
                    0.0 SCHORDER_QTY,
                    DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE,
                    et.TC_EQPT,
                    null as SHLSLOAD_LOAD_ID,
                    null as ARM_NAME,
                    null as ARMCODE,
                    NVL(DECODE(sd.SCHD_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED,
                    sd.SCHD_PRLDQTY QTY_PRELOAD,
                    trsf.TRIP_QTY_AMB QTY_AMB,
                    trsf.TRIP_QTY_STD QTY_STD,
                    trsf.TRIP_QTY_KG QTY_KG,
                    sd2.CUSTOMER_CODE,
                    sd2.DELIVERY_LOCATION,
                    sd2.DELIVERY_NUMBER
                FROM
                    (
                        SELECT tc.TNKR_CMPT_NO,
                            tc.TRAILERCOMP,
                            NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT,
                            tc.CMPT_UNITS,
                            tc.UNIT,
                            tc.EQPT_CODE,
                            tc.TC_EQPT
                        FROM
                            (
                                SELECT ROWNUM TNKR_CMPT_NO,
                                    tc_tmp.*
                                FROM
                                    (
                                        SELECT
                                            c.TRAILERCOMP,
                                            c.CMPT_CAPACIT,
                                            c.CMPT_UNITS,
                                            un.DESCRIPTION UNIT,
                                            te.TC_SEQNO,
                                            trs.EQPT_CODE,
                                            te.TC_EQPT,
                                            c.ETYP_ID_RT,
                                            te.TC_TANKER
                                        FROM
                                            TNKR_EQUIP te,
                                            TRANSP_EQUIP trs,
                                            UNIT_SCALE_VW un,
                                            CMPT_VW c
                                        WHERE
                                            te.TC_EQPT = trs.EQPT_ID
                                            AND trs.EQPT_ETP = C.ETYP_ID_RT
                                            AND un.UNIT_ID = c.CMPT_UNITS
                                            AND te.TC_TANKER = :tanker
                                        ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                                    ) tc_tmp
                            ) tc,
                            SFILL_ADJUST sf
                        WHERE tc.TC_EQPT = sf.ADJ_EQP(+)
                            AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
                        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
                    ) et,
                    (
                        SELECT PRODUCTS.PROD_NAME,
                            SPECDETS.SCHDPROD_PRODCODE PROD_CODE,
                            SPECDETS.SCHD_TRAILER,
                            SPECDETS.SCHD_TRAILERCOMP,
                            SPECDETS.SCHD_COMP_ID,
                            SPECDETS.SCHD_SPECQTY,
                            SPECDETS.SCHD_UNITS,
                            CUST_ORDER.ORDER_CUST_ORDNO,
                            un.DESCRIPTION UNIT,
                            SCHEDULE.SHLSLOAD_LOAD_ID,
                            BA_ARMS.ARM_NAME,
                            SPECDETS.ARMCODE,
                            SCHEDULE.SHLS_SUPP,
                            SPECDETS.SCHDSPEC_SHLSSUPP,
                            SPECDETS.SCHDSPEC_SHLSTRIP,
                            SPECDETS.SCHDPROD_PRODCMPY,
                            SPECDETS.SCHDPROD_PRODCODE,
                            SPECDETS.SCHD_PRLDQTY
                        FROM
                            SPECDETS,
                            SCHEDULE,
                            PRODUCTS,
                            CUST_ORDER,
                            unit_scale_vw un,
                            BA_ARMS
                        WHERE
                            SPECDETS.SCHD_UNITS = un.UNIT_ID
                            AND PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
                            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
                            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
                            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
                            AND CUST_ORDER.ORDER_NO(+) = SPECDETS.SCHD_ORDER
                            AND SCHEDULE.SHLS_SUPP = :supplier
                            AND SCHEDULE.SHLS_TRIP_NO = :trip_no
                            AND SPECDETS.ARMCODE = BA_ARMS.BAA_CODE(+)
                    ) sd,
                    (
                        SELECT
                            SHLS_SUPP,
                            (SCHEDULE.SHLS_SOLD_TO_NUM || NVL2(COMPANYS.CMPY_NAME,' - ','') || COMPANYS.CMPY_NAME) CUSTOMER_CODE,
                            (SCHEDULE.SHLS_SHIP_TO_NUM || NVL2(DELV_LOCATION.DLV_NAME,' - ','') || DELV_LOCATION.DLV_NAME) DELIVERY_LOCATION,
                            SCHEDULE.SHL_FLEET_DATA DELIVERY_NUMBER
                        FROM SCHEDULE,
                            CUSTOMER,
                            COMPANYS,
                            DELV_LOCATION
                        WHERE SCHEDULE.SHLS_SUPP = :supplier
                            AND SCHEDULE.SHLS_TRIP_NO = :trip_no
                            AND (SCHEDULE.SHLS_SOLD_TO_NUM = CUSTOMER.CUST_CODE(+) AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+))
                            AND (SCHEDULE.SHLS_SHIP_TO_NUM = DELV_LOCATION.DLV_CODE(+))
                    ) sd2,
                    (
                        SELECT PRODUCTS.PROD_NAME,
                            SPECDETS.SCHD_TRAILER,
                            SPECDETS.SCHD_TRAILERCOMP,
                            SPECDETS.SCHD_COMP_ID,
                            SPECDETS.SCHD_UNITS,
                            PRODUCTS.PROD_CODE
                        FROM SPECDETS,
                            SCHEDULE,
                            PRODUCTS
                        WHERE PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
                            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
                            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
                            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
                            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                                (
                                    SELECT * FROM
                                    (
                                        SELECT SCHEDULE.SHLS_TRIP_NO, SCHEDULE.SHLS_SUPP
                                        FROM LOADS, SCHEDULE
                                        WHERE LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                            AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                            AND LOADS.LOAD_DMY < NVL(
                                                (
                                                SELECT LOADS.LOAD_DMY
                                                FROM LOADS, SCHEDULE
                                                WHERE
                                                    LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                                    AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                                    AND LOADS.LOAD_DMY IS NOT NULL
                                                    AND SCHEDULE.SHLS_SUPP = :supplier
                                                    AND SCHEDULE.SHL_TANKER = :tanker
                                                    AND SCHEDULE.SHLS_TRIP_NO = :trip_no
                                                ), SYSDATE)
                                            AND LOADS.LOAD_DMY IS NOT NULL
                                            AND SCHEDULE.SHLS_SUPP = :supplier
                                            AND SCHEDULE.SHL_TANKER = :tanker
                                        ORDER BY LOADS.LOAD_DMY DESC
                                    )
                                    WHERE ROWNUM = 1
                                )
                    ) pr,
                    (
                        SELECT SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER,
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
                        FROM SCHEDULE,
                            LOADS,
                            TRANSACTIONS,
                            TRANSFERS
                        WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                            AND SCHEDULE.SHLS_SUPP = :supplier
                            AND SCHEDULE.SHL_TANKER = :tanker
                        GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
                            TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
                    ) trsf
                WHERE et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
                    AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
                    AND sd.SCHDSPEC_SHLSSUPP = trsf.TRIP_SUPPLIER(+)
                    AND sd.SCHDSPEC_SHLSTRIP = trsf.TRIP_NO(+)
                    AND sd.SCHDPROD_PRODCMPY = trsf.TRIP_PRODCMPY(+)
                    AND sd.SCHDPROD_PRODCODE = trsf.TRIP_PRODCODE(+)
                    AND sd.SCHD_COMP_ID      = trsf.TRIP_COMPARTMENT(+)
                ORDER BY TO_NUMBER(et.TNKR_CMPT_NO)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':supplier', $this->supplier);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            oci_bind_by_name($stmt, ':tanker', $tanker);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }
            return $stmt;
        }
    }
}
