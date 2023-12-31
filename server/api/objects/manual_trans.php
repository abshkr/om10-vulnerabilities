<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/manual_trans_service.php';
include_once __DIR__ . '/../service/schedule_service.php';
include_once 'common_class.php';

//Old php: classes\ManualTransactions.class.php
class ManualTrans extends CommonClass
{
    protected $TABLE_NAME = 'DUMMY';

    public function get_tanker_details()
    {
        $query = "
            SELECT *
            FROM TNKR_EQUIP_CMPT_DET_VW
            WHERE TNKR_CODE = :tanker
            ORDER BY TNKR_CMPT
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tanker', $this->tanker);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_ord_suppliers()
    {
        $query = "
            SELECT DISTINCT 
                ORDER_SUPP_CODE SUPPLIER,
                ORDER_SUPP_NAME SUPPLIER_NAME
            FROM GUI_ORDERS
            WHERE ORDER_STAT_ID NOT IN (2, 3, 5, 6) AND ORDER_APPROVED = 'Y'
            ORDER BY ORDER_SUPP_CODE
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

    public function get_schd_suppliers()
    {
        $query = "SELECT SHLS_SUPP SUPPLIER, CMPY_NAME SUPPLIER_NAME
            FROM
            (
                SELECT DISTINCT SHLS_SUPP FROM SCHEDULE
                WHERE STATS IS NULL OR STATS IN ('A', 'L', 'N')
            ), COMPANYS
            WHERE SHLS_SUPP = CMPY_CODE
            ORDER BY SHLS_SUPP";
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
                AND ORDER_CUST_ACNT = :customer
                AND ORDER_SUPP_CODE = :supplier
                AND ORDER_APPROVED = 'Y'
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
        $query = "
            SELECT DISTINCT 
                ORDER_CUST_CODE COMPANY,
                ORDER_CUST_ACNT CUSTOMER,
                ORDER_CUST_NAME CUSTOMER_NAME
            FROM GUI_ORDERS
            WHERE ORDER_SUPP_CODE = :supplier
            ORDER BY ORDER_CUST_ACNT";
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
        $query = "
            SELECT 
                (CO.ORD_SOLD_TO_NUM || NVL2(CMPY.CMPY_NAME,' - ','') || CMPY.CMPY_NAME) as CUSTOMER_CODE, 
                (CO.ORD_SHIP_TO_NUM || NVL2(DL.DLV_NAME,' - ','') || DL.DLV_NAME) as DELIVERY_LOCATION,
                ORDER_DRAWER,
                ORDER_CARRIER
            FROM CUST_ORDER CO,
                CUSTOMER CUST,
                COMPANYS CMPY,
                DELV_LOCATION DL
            WHERE CO.ORDER_CUST_ORDNO = :order_cust_no
            AND CO.ORDER_CUST in (select CUST_ACCT from CUSTOMER where CUST_SUPP=:supplier)
            AND (CO.ORD_SOLD_TO_NUM = CUST.CUST_CODE(+) AND CUST.CUST_CODE = CMPY.CMPY_CODE(+))
            AND CO.ORD_SHIP_TO_NUM = DL.DLV_CODE(+)
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_cust_no', $this->order_cust_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_sched_prods()
    {
        $query = "SELECT SCHPSPID_SHLSTRIP,
                SCHPSPID_SHLSSUPP,
                SCHPPROD_PRODCODE,
                SCHPPROD_PRODCMPY,
                PROD_NAME,
                SCHP_UNITS,
                SCHP_SPECQTY,
                SCHP_ORDER 
            FROM SPECPROD, PRODUCTS
            WHERE SCHPSPID_SHLSTRIP = :trip_no
                AND SCHPSPID_SHLSSUPP = :supplier
                AND SCHPPROD_PRODCODE = PROD_CODE
                AND SCHPPROD_PRODCMPY = PROD_CMPY
            ORDER BY SCHPPROD_PRODCODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        return $stmt;
    }

    public function get_sched_type()
    {
        $query = "
            SELECT 
                DECODE(
                    UPPER(LD_TYPE), 
                    'PRESCHEDULE', 'BY_COMPARTMENT', 
                    'PREORDER', 'BY_PRODUCT', 
                    UPPER(LD_TYPE)
                ) as SCHD_TYPE 
            FROM GUI_SCHEDULES 
            WHERE 
                SUPPLIER_CODE = :supplier 
                AND SHLS_TRIP_NO = :trip_no
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        return $stmt;
    }

    public function get_sched_basics()
    {
        // write_log(sprintf("%s::%s() START. trip:%d, supplier:%s",
        //     __CLASS__, __FUNCTION__, $this->trip_no, $this->supplier),
        //     __FILE__, __LINE__);

        $query = "
            SELECT C.CMPY_CODE, C.CMPY_NAME
            FROM SCHEDULE S, COMPANYS C, TANKERS T 
            WHERE S.SHL_TANKER = T.TNKR_CODE 
                AND T.TNKR_CARRIER = C.CMPY_CODE 
                AND S.SHLS_SUPP = :supplier 
                AND S.SHLS_TRIP_NO = :trip_no
        ";
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
                $query = "
                    SELECT 
                        C.CMPY_CODE CARRIER, 
                        C.CMPY_NAME CARRIER_NAME,
                        T.TNKR_CODE,
                        S.SHLS_DRAWER DRAWER,
                        S.SHLS_DRIVER DRIVER
                    FROM SCHEDULE S, COMPANYS C, TANKERS T 
                    WHERE S.SHL_TANKER = T.TNKR_CODE 
                        AND T.TNKR_CARRIER = C.CMPY_CODE 
                        AND S.SHLS_SUPP = :supplier 
                        AND S.SHLS_TRIP_NO = :trip_no
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':supplier', $this->supplier);
                oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            } else {
                $query = "
                    SELECT 
                        CMPY_CODE CARRIER, 
                        CMPY_NAME CARRIER_NAME,
                        NULL TNKR_CODE,
                        NULL DRAWER,
                        NULL DRIVER
                    FROM GUI_COMPANYS 
                    WHERE BITAND(CMPY_TYPE, 4) <> 0 
                    ORDER BY CMPY_CODE ASC
                ";
                $stmt = oci_parse($this->conn, $query);
            }

            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }
        } else {
            $query = "
                SELECT C.CMPY_CODE CARRIER, 
                    C.CMPY_NAME CARRIER_NAME,
                    T.TNKR_CODE,
                    S.SHLS_DRAWER DRAWER,
                    S.SHLS_DRIVER DRIVER,
                    S.SHLS_CUST
                FROM SCHEDULE S, COMPANYS C, TANKERS T 
                WHERE S.SHL_TANKER = T.TNKR_CODE 
                    AND T.TNKR_CARRIER = C.CMPY_CODE 
                    AND S.SHLS_SUPP = :supplier 
                    AND S.SHLS_TRIP_NO = :trip_no
            ";
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
        
        $query = "
            SELECT DISTINCT 
                R.RAT_PROD_PRODCMPY, 
                R.RAT_PROD_PRODCODE, 
                B.STREAM_INDEX,
                B.STREAM_BAYCODE, 
                B.STREAM_ARMCODE, 
                B.STREAM_BASECODE, 
                B.STREAM_TANKCODE, 
                B.STREAM_TANKDEN, 
                B.STREAM_BCLASS_CODE,
                R.RATIO_VALUE,
                R.ADTV_FLAG,
                R.RAT_SUB_SEQ,
                R.RAT_SEQ as RATIO_SEQ,
                R.RAT_SUB_COUNT,
                R.RAT_COUNT,
                R.RAT_TOTAL as RATIO_TOTAL
            FROM 
                RPTOBJ_PROD_RATIOS_VW R,
                GUI_PIPENODE B
            WHERE 
                B.STREAM_BASECODE = R.RATIO_BASE(+)
                AND RAT_PROD_PRODCODE = :prod_code
                AND RAT_PROD_PRODCMPY = :prod_cmpy
            ORDER BY R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_INDEX, R.RAT_SEQ
        ";
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

    public function get_prod_arms()
    {
        if (is_array($this->prod_code)) {
            foreach($this->prod_code as &$value){
                $value = "'$value'";
            }
            $comma_separated_prods = implode(',', $this->prod_code);
            $query = "
                SELECT 
                    R.RAT_PROD_PRODCMPY, 
                    R.RAT_PROD_PRODCODE, 
                    B.STREAM_INDEX,
                    B.STREAM_BAYCODE, 
                    B.STREAM_ARMCODE, 
                    B.STREAM_MTRCODE, 
                    B.STREAM_INJCODE, 
                    B.STREAM_BASECODE, 
                    B.STREAM_BASENAME, 
                    B.STREAM_BCLASS_CODE,
                    DECODE(B.STREAM_BCLASS_CODE, 6, 'T', 11,'T','F') METER_TYPE_CODE, 
                    DECODE(B.STREAM_BCLASS_CODE, 6, 'INJECT', 11,'INJECT','METER') METER_TYPE_DESC, 
                    B.STREAM_BCLASS_NMAE,
                    B.STREAM_TANKCODE, 
                    B.STREAM_TANKDEN, 
                    STREAM_TANKTEMP AS BASE_RPT_TEMP, 
                    BP.BASE_RPT_TEMP AS BASE_RPT_TEMP2, 
                    R.RATIO_VALUE,
                    R.ADTV_FLAG,
                    R.RAT_SUB_SEQ,
                    R.RAT_SEQ,
                    R.RAT_SUB_COUNT,
                    R.RAT_COUNT,
                    R.RAT_TOTAL as RATIO_TOTAL,
                    BA.BAA_LOCK,
                    BA.BAA_BAD_LNK,
                    BA.BAA_BAY_SEQ,
                    BA.BAA_BAD_SEQ,
                    BA.BAA_BLENDTYPE,
                    BA.BAA_PARKTYPE
                FROM 
                    RPTOBJ_PROD_RATIOS_VW R,
                    GUI_PIPENODE B,
                    BA_ARMS BA,
                    BAY_AREA BAY,
                    BA_DEVICE BAD,
                    BASE_PRODS BP
                WHERE 
                    B.STREAM_BASECODE = R.RATIO_BASE(+)
                    AND B.STREAM_BASECODE = BP.BASE_CODE(+) 
                    AND B.STREAM_ARMCODE = BA.BAA_CODE(+)
                    AND BA.BAA_LOCK = 'N'
                    AND B.STREAM_BAYCODE = BAY.BA_CODE(+)
                    AND B.STREAM_BAYCODE = BAD.BAD_PHYSCODE(+)
                    AND BAY.BA_LOCK = 'N'
                    AND BAD.BAD_LOCK = 'N'
                    AND R.RAT_PROD_PRODCMPY = :prod_cmpy 
                    AND R.RAT_PROD_PRODCODE IN (" . $comma_separated_prods . ") 
                ORDER BY R.RAT_PROD_PRODCMPY, B.STREAM_ARMCODE, R.RAT_SEQ, B.STREAM_BASECODE
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpy);
        } else {
            $query = "
                SELECT 
                    R.RAT_PROD_PRODCMPY, 
                    R.RAT_PROD_PRODCODE, 
                    B.STREAM_INDEX,
                    B.STREAM_BAYCODE, 
                    B.STREAM_ARMCODE, 
                    B.STREAM_MTRCODE, 
                    B.STREAM_INJCODE, 
                    B.STREAM_BASECODE, 
                    B.STREAM_BASENAME, 
                    B.STREAM_BCLASS_CODE,
                    DECODE(B.STREAM_BCLASS_CODE, 6, 'T', 11,'T','F') METER_TYPE_CODE, 
                    DECODE(B.STREAM_BCLASS_CODE, 6, 'INJECT', 11,'INJECT','METER') METER_TYPE_DESC, 
                    B.STREAM_BCLASS_NMAE,
                    B.STREAM_TANKCODE, 
                    B.STREAM_TANKDEN, 
                    STREAM_TANKTEMP AS BASE_RPT_TEMP, 
                    BP.BASE_RPT_TEMP AS BASE_RPT_TEMP2, 
                    R.RATIO_VALUE,
                    R.ADTV_FLAG,
                    R.RAT_SUB_SEQ,
                    R.RAT_SEQ,
                    R.RAT_SUB_COUNT,
                    R.RAT_COUNT,
                    R.RAT_TOTAL as RATIO_TOTAL,
                    BA.BAA_LOCK,
                    BA.BAA_BAD_LNK,
                    BA.BAA_BAY_SEQ,
                    BA.BAA_BAD_SEQ,
                    BA.BAA_BLENDTYPE,
                    BA.BAA_PARKTYPE
                FROM 
                    RPTOBJ_PROD_RATIOS_VW R,
                    GUI_PIPENODE B,
                    BA_ARMS BA,
                    BAY_AREA BAY,
                    BA_DEVICE BAD,
                    BASE_PRODS BP
                WHERE 
                    B.STREAM_BASECODE = R.RATIO_BASE(+)
                    AND B.STREAM_BASECODE = BP.BASE_CODE(+) 
                    AND B.STREAM_ARMCODE = BA.BAA_CODE(+)
                    AND BA.BAA_LOCK = 'N'
                    AND B.STREAM_BAYCODE = BAY.BA_CODE(+)
                    AND B.STREAM_BAYCODE = BAD.BAD_PHYSCODE(+)
                    AND BAY.BA_LOCK = 'N'
                    AND BAD.BAD_LOCK = 'N'
                    AND R.RAT_PROD_PRODCMPY = :prod_cmpy 
                    AND R.RAT_PROD_PRODCODE = :prod_code 
                ORDER BY R.RAT_PROD_PRODCMPY, B.STREAM_ARMCODE, R.RAT_SEQ, B.STREAM_BASECODE
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
            oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpy);
        }
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

        if (isset($this->load_security)) {
            $serv->set_property('load_security', $this->load_security);
        }
        
        $start_time = DateTime::createFromFormat('Y-m-d H:i:s', $this->start_time);
        $serv->set_property('start_time', $start_time->format('d.m.YH:i:s'));
        $end_time = DateTime::createFromFormat('Y-m-d H:i:s', $this->end_time);
        $serv->set_property('finish_time', $end_time->format('d.m.YH:i:s'));
        // $serv->set_property('drawer_code', $this->supplier);
        $serv->set_property('drawer_code', $this->drawer);
        $serv->set_property('drawer_name', "");
        $serv->set_property('tanker_code', $this->tanker);
        $serv->set_property('operator_code', '8888');   //By default, use 8888 as driver
        if (isset($this->driver) && $this->driver != null && $this->driver != 'null' && $this->driver != 'undefined') {
            $serv->set_property('operator_code', $this->driver);
        }
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
            $transfers[$i]->nr_in_tkr = $this->transfers[$i]->nr_in_tkr;

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
                if ($this->transfers[$i]->bases[$j]->base_class_code == '6') {
                    $transfers[$i]->bases[$j]->prod_class = 'ADDITIVE';
                }
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

    //TODO
    public function actualise()
    {
        write_log(json_encode($this), __FILE__, __LINE__);
/*
        $serv = new ManualTransactionService($this->conn);
        $serv->set_property('supplier', $this->supplier);
        if (isset($this->trip_no)) {
            $serv->set_property('trip_no', $this->trip_no);
            $serv->set_property('load_number', $this->trip_no);
        }

        if (isset($this->load_security)) {
            $serv->set_property('load_security', $this->load_security);
        }
        
        $start_time = DateTime::createFromFormat('Y-m-d H:i:s', $this->start_time);
        $serv->set_property('start_time', $start_time->format('d.m.YH:i:s'));
        $end_time = DateTime::createFromFormat('Y-m-d H:i:s', $this->end_time);
        $serv->set_property('finish_time', $end_time->format('d.m.YH:i:s'));
        // $serv->set_property('drawer_code', $this->supplier);
        $serv->set_property('drawer_code', $this->drawer);
        $serv->set_property('drawer_name', "");
        $serv->set_property('tanker_code', $this->tanker);
        $serv->set_property('operator_code', '8888');   //By default, use 8888 as driver
        if (isset($this->driver) && $this->driver != null && $this->driver != 'null' && $this->driver != 'undefined') {
            $serv->set_property('operator_code', $this->driver);
        }
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
            $transfers[$i]->nr_in_tkr = $this->transfers[$i]->nr_in_tkr;

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
                if ($this->transfers[$i]->bases[$j]->base_class_code == '6') {
                    $transfers[$i]->bases[$j]->prod_class = 'ADDITIVE';
                }
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
    */
    
        $result = new EchoSchema(200, 
            response("__MANUAL_TRANS_SUBMITTED__",
            sprintf("Manual transaction (load number:%d, supplier:%s) submitted", $this->trip_no, $this->supplier)));
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function get_base_details()
    {
        if (is_array($this->arm_code)) {
            foreach($this->arm_code as &$value){
                $value = "'$value'";
            }
            $comma_separated_arms = implode(',', $this->arm_code);
            $query = "
                SELECT 
                    R.RAT_PROD_PRODCMPY, 
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
                    B.STREAM_TANKCODE, 
                    B.STREAM_TANKDEN, 
                    STREAM_TANKTEMP AS BASE_RPT_TEMP, 
                    BP.BASE_RPT_TEMP AS BASE_RPT_TEMP2, 
                    R.RATIO_VALUE,
                    R.ADTV_FLAG,
                    R.RAT_SUB_SEQ,
                    R.RAT_SEQ,
                    R.RAT_SUB_COUNT,
                    R.RAT_COUNT,
                    R.RAT_TOTAL as RATIO_TOTAL
                FROM 
                    RPTOBJ_PROD_RATIOS_VW R,
                    GUI_PIPENODE B,
                    BASE_PRODS BP
                WHERE 
                    B.STREAM_BASECODE = R.RATIO_BASE(+)
                    AND B.STREAM_BASECODE = BP.BASE_CODE(+) 
                    AND RAT_PROD_PRODCMPY = :prod_cmpy 
                    AND RAT_PROD_PRODCODE = :prod_code 
                    AND STREAM_ARMCODE IN (" . $comma_separated_arms . ") 
                ORDER BY R.RAT_PROD_PRODCMPY, METER_TYPE_CODE, B.STREAM_ARMCODE, B.STREAM_BASECODE
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
            oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpy);
        } else {
            $query = "
                SELECT 
                    R.RAT_PROD_PRODCMPY, 
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
                    B.STREAM_TANKCODE, 
                    B.STREAM_TANKDEN, 
                    STREAM_TANKTEMP AS BASE_RPT_TEMP, 
                    BP.BASE_RPT_TEMP AS BASE_RPT_TEMP2, 
                    R.RATIO_VALUE,
                    R.ADTV_FLAG,
                    R.RAT_SUB_SEQ,
                    R.RAT_SEQ,
                    R.RAT_SUB_COUNT,
                    R.RAT_COUNT,
                    R.RAT_TOTAL as RATIO_TOTAL
                FROM 
                    RPTOBJ_PROD_RATIOS_VW R,
                    GUI_PIPENODE B,
                    BASE_PRODS BP
                WHERE 
                    B.STREAM_BASECODE = R.RATIO_BASE(+)
                    AND B.STREAM_BASECODE = BP.BASE_CODE(+) 
                    AND RAT_PROD_PRODCMPY = :prod_cmpy 
                    AND RAT_PROD_PRODCODE = :prod_code 
                    AND STREAM_ARMCODE = :arm_code
                ORDER BY R.RAT_PROD_PRODCMPY, METER_TYPE_CODE, B.STREAM_ARMCODE, B.STREAM_BASECODE
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
            oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpy);
            oci_bind_by_name($stmt, ':arm_code', $this->arm_code);
        }
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
        $query = "
            SELECT 
                'BY_PRODUCT' AS SCHD_TYPE,
                :supplier as SHLS_SUPP,
                (
                    SELECT (
                        CASE 
                            WHEN :supplier <> (SELECT ORDER_DRAWER FROM CUST_ORDER WHERE ORDER_CUST_ORDNO = :order_cust_no)
                            THEN (SELECT ORDER_DRAWER FROM CUST_ORDER WHERE ORDER_CUST_ORDNO = :order_cust_no)
                            ELSE :supplier
                        END
                    )
                    FROM DUAL
                ) as SHLS_DRAWER,
                TC.TNKR_CMPT_NO,
                TC.TRAILERCOMP AS  TLR_CMPT,
                (NVL(SF.ADJ_AMNT, 0) + TC.CMPT_CAPACIT) AS CMPT_CAPACIT,
                TC.CMPT_UNITS,
                TC.UNIT,
                TC.CMPT_UNITS AS TC_UNITS,
                TC.UNIT AS TC_UNITNAME,
                TC.EQPT_CODE,
                TC.TC_EQPT,
                NULL AS PROD_CODE,
                NULL AS PROD_NAME,
                NULL AS PROD_DESC,
                NULL AS ALLOWED_QTY,
                0 AS LOAD_QTY,
                0 AS PRELD_QTY,
                0 AS SCHORDER_QTY,
                NULL AS PREV_PROD,
                NULL AS PREV_PRODCODE,
                NULL AS SHLSLOAD_LOAD_ID,
                NULL AS ARM_NAME,
                NULL AS ARMCODE,
                0 AS QTY_LOADED,
                0 AS QTY_PRELOAD,
                0 AS QTY_AMB,
                0 AS QTY_STD,
                0 AS QTY_KG,
                :order_cust_no AS ORDER_CUST_ORDNO,
                (
                    SELECT ORDER_REF_CODE 
                    FROM CUST_ORDER 
                    WHERE ORDER_CUST_ORDNO = :order_cust_no
                ) AS ORDER_REF_CODE,
                (
                    SELECT (CO.ORD_SOLD_TO_NUM || NVL2(CMPY.CMPY_NAME,' - ','') || CMPY.CMPY_NAME) 
                      FROM CUST_ORDER CO, CUSTOMER CUST, COMPANYS CMPY
                     WHERE CO.ORDER_CUST_ORDNO = :order_cust_no
                       AND CO.ORDER_CUST in (select CUST_ACCT from CUSTOMER where CUST_SUPP=:supplier)
                       AND (CO.ORD_SOLD_TO_NUM = CUST.CUST_CODE(+) AND CUST.CUST_CODE = CMPY.CMPY_CODE(+))
                ) AS CUSTOMER_CODE,
                (
                    SELECT (CO.ORD_SHIP_TO_NUM || NVL2(DL.DLV_NAME,' - ','') || DL.DLV_NAME)
                      FROM CUST_ORDER CO, DELV_LOCATION DL
                     WHERE CO.ORDER_CUST_ORDNO = :order_cust_no
                       AND CO.ORDER_CUST in (select CUST_ACCT from CUSTOMER where CUST_SUPP=:supplier)
                       AND CO.ORD_SHIP_TO_NUM = DL.DLV_CODE(+)
                ) AS DELIVERY_LOCATION，
                NULL AS DELIVERY_NUM
            FROM
                (
                SELECT 
                    ROWNUM TNKR_CMPT_NO,
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
                    WHERE te.TC_EQPT = trs.EQPT_ID
                        AND trs.EQPT_ETP = C.ETYP_ID_RT
                        AND un.UNIT_ID = c.CMPT_UNITS
                        AND te.TC_TANKER = :tanker
                    ORDER BY te.TC_SEQNO,TO_NUMBER(c.TRAILERCOMP)
                    ) tc_tmp
                ) tc,
                SFILL_ADJUST sf
            WHERE 
                tc.TC_EQPT = sf.ADJ_EQP(+)
                AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
            ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':order_cust_no', $this->order_cust_no);
        oci_bind_by_name($stmt, ':tanker', $this->tanker);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        return $stmt;
    }

    //Old code: ManualTransactions.class.php::getOrderProductsByCustOrderNo($custorderno)
    public function get_order_products()
    {
        $query = "
            SELECT 
                CO.ORDER_CUST_ORDNO, 
                OPD.OSPROD_PRODCMPY PROD_CMPY, 
                OPD.OSPROD_PRODCODE as PROD_CODE, 
                P.PROD_NAME as PROD_NAME, 
                P.PROD_CODE||' - '||P.PROD_NAME as PROD_DESC,
                P.PROD_CLASS as PROD_CLASS, 
                OPD.ORDER_PROD_QTY as SCHP_SPECQTY, 
                OPD.ORDER_PROD_QTY as QTY_PLANNED, 
                OPD.ORDER_PROD_UNIT as UNIT_CODE,
                decode(OPD.ORDER_PROD_UNIT,'5','l(amb)','11','l(cor)','17','kg','unknown') as UNIT_NAME, 
                NVL(OO_QTY.QTY_SCHEDULED,0) as QTY_SCHEDULED, 
                NVL(OO_QTY.QTY_PRELOADED,0) as QTY_PRELOADED, 
                NVL(OO_QTY.QTY_LOADED,0) as QTY_LOADED, 
                NVL(OO_QTY.QTY_AMB,0) as QTY_AMB, 
                NVL(OO_QTY.QTY_STD,0) as QTY_STD, 
                NVL(OO_QTY.QTY_KG,0) as QTY_KG,
                DRAWER_P.PROD_CMPY as DRAW_PROD_CMPY, 
                DRAWER_P.PROD_CODE as DRAW_PROD_CODE, 
                DRAWER_P.PROD_NAME as DRAW_PROD_NAME, 
                DRAWER_P.PROD_CODE||' - '||DRAWER_P.PROD_NAME as DRAW_PROD_DESC,
                DRAWER_P.PROD_CLASS as DRAW_PROD_CLASS
            FROM
                CUST_ORDER CO,
                OPRODMTD OPD,
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
                        pr.PROD_CODE as PROD_CODE
                        , pr.PROD_NAME as PROD_NAME
                        , pr.PROD_CMPY as PROD_CMPY
                        , spec.SCHP_UNITS as UNIT_CODE
                        , uv.DESCRIPTION as UNIT_NAME
                        , spec.SCHP_SPECQTY as SCHP_SPECQTY
                        , NVL(DECODE(spec.SCHP_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
                        , cmpt.TRIP_QTY_PRELOAD QTY_PRELOADED
                        , cmpt.TRIP_QTY_SCHED QTY_SCHED
                        , trsf.TRIP_QTY_AMB QTY_AMB
                        , trsf.TRIP_QTY_STD QTY_STD
                        , trsf.TRIP_QTY_KG QTY_KG
                        , spec.SCHPSPID_SHLSTRIP
                        , spec.SCHPSPID_SHLSSUPP
                    from
                        SPECPROD spec
                        , PRODUCTS pr
                        , UNIT_SCALE_VW uv
                        , (
                        select
                            SPECDETS.SCHDSPEC_SHLSSUPP as TRIP_SUPPLIER
                            , SPECDETS.SCHDSPEC_SHLSTRIP as TRIP_NO
                            , SPECDETS.SCHDPROD_PRODCMPY as TRIP_PRODCMPY
                            , SPECDETS.SCHDPROD_PRODCODE as TRIP_PRODCODE
                            , SUM(SPECDETS.SCHD_PRESETQTY) as TRIP_QTY_PRESET
                            , SUM(SPECDETS.SCHD_PRLDQTY) as TRIP_QTY_PRELOAD
                            , SUM(SPECDETS.SCHD_SPECQTY) as TRIP_QTY_SCHED
                            , SUM(SPECDETS.SCHD_DELIVERED) as TRIP_QTY_LOADED
                        from SPECDETS
                        group by SPECDETS.SCHDSPEC_SHLSSUPP, SPECDETS.SCHDSPEC_SHLSTRIP, SPECDETS.SCHDPROD_PRODCMPY, SPECDETS.SCHDPROD_PRODCODE
                        ) cmpt
                        , (
                        select
                            SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
                            , SCHEDULE.SHLS_TRIP_NO as TRIP_NO
                            , TRANSFERS.TRSFPROD_PRODCMPY as TRIP_PRODCMPY
                            , TRANSFERS.TRSFPROD_PRODCODE as TRIP_PRODCODE
                            , SUM(TRANSFERS.TRSF_QTY_AMB) as TRIP_QTY_AMB
                            , SUM(TRANSFERS.TRSF_QTY_COR) as TRIP_QTY_STD
                            , SUM(TRANSFERS.TRSF_LOAD_KG) as TRIP_QTY_KG
                            , SUM(TRANSFERS.TRSF_RETURNS) as TRIP_QTY_RTN
                            , SUM(TRANSFERS.TRSF_PRELOAD_KG) as TRIP_QTY_PKG
                            , SUM(TRANSFERS.TRSF_DELIVERED) as TRIP_QTY_DELIVERED
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
                        and uv.UNIT_ID = spec.SCHP_UNITS
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

    //Update a tanker of a PreOrder schedule
    private function update_tanker($tanker) 
    {
        if (!isset($this->new_tanker)) {
            return;
        }

        $query = "
            UPDATE SCHEDULE SET SHL_TANKER = :tanker 
            WHERE SHLS_TRIP_NO = :trip and SHLS_SUPP = :supplier
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip', $this->trip_no);
        oci_bind_by_name($stmt, ':tanker', $this->new_tanker);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            throw new DatabaseException($e['message']);;
        }

        $journal = new Journal($this->conn, false);
        if (isset($tanker) && $tanker != $this->new_tanker) {
            $record = sprintf("shls_supp:%s, shls_trip_no:%d", $this->supplier, $this->trip_no);
            $journal->valueChange("SCHEDULE", $record, "SHL_TANKER", $tanker, $this->new_tanker);
        }

        return;
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

        // if user has changed the tanker of a PreOrder schedule, update the schedule with new tanker
        if (strtoupper($row['LD_TYPE']) === "PREORDER" 
        && isset($this->new_tanker) && strlen($this->new_tanker) > 0
        && $tanker !== $this->new_tanker) {
            $this->update_tanker($tanker);
            $tanker = $this->new_tanker;
        }

        if (strtoupper($row['LD_TYPE']) === "PRESCHEDULE") {
            $query = "SELECT
                    'BY_COMPARTMENT' as SCHD_TYPE,
                    et.EQPT_CODE,
                    et.TNKR_CMPT_NO,
                    et.CMPT_UNITS AS TC_UNITS,
                    et.UNIT AS TC_UNITNAME,
                    sd.UNIT UNIT,
                    et.TRAILERCOMP TLR_CMPT,
                    sd.SHLS_SUPP,
                    sd.SHLS_DRAWER,
                    sd.PROD_CODE,
                    sd.PROD_NAME,
                    sd.PROD_CODE||' - '||sd.PROD_NAME AS PROD_DESC,
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
                                    ORDER BY te.TC_SEQNO,TO_NUMBER(c.TRAILERCOMP)
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
                            SCHEDULE.SHLS_DRAWER,
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
                    et.CMPT_UNITS as TC_UNITS,
                    et.UNIT as TC_UNITNAME,
                    et.UNIT as UNIT,
                    et.TRAILERCOMP TLR_CMPT,
                    sd2.SHLS_SUPP,
                    sd2.SHLS_DRAWER,
                    null as PROD_CODE,
                    null as PROD_NAME,
                    NULL AS PROD_DESC,
                    et.CMPT_UNITS as CMPT_UNITS,
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
                    sd.SHLSLOAD_LOAD_ID,
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
                                        ORDER BY te.TC_SEQNO,TO_NUMBER(c.TRAILERCOMP)
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
                            SCHEDULE.SHLS_SUPP,
                            SCHEDULE.SHLS_DRAWER,
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

    public function get_trip_products()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $sched_service = new ScheduleService($this->conn);
        $this->drawer_code = $sched_service->shls_drawer($this->shls_trip_no, $this->supplier_code);

        write_log(json_encode($this), __FILE__, __LINE__);

        // fix the issue when the supplier and the drawer is different
        $query = "
        SELECT 
            NVL(PRODUCTS.PROD_CODE, LOADED.PROD_CODE) PROD_CODE,
            NVL(PRODUCTS.PROD_NAME, LOADED.PROD_NAME) PROD_NAME,
            NVL(PRODUCTS.PROD_CODE, LOADED.PROD_CODE)||' - '||NVL(PRODUCTS.PROD_NAME, LOADED.PROD_NAME) as PROD_DESC,
            NVL(PRODUCTS.PROD_CMPY, LOADED.PROD_CMPY) PROD_CMPY,
            NVL(PRODUCTS.PROD_CLASS, LOADED.PROD_CLASS) PROD_CLASS,
            DRAWER_P.PROD_CMPY as DRAW_PROD_CMPY, 
            DRAWER_P.PROD_CODE as DRAW_PROD_CODE, 
            DRAWER_P.PROD_NAME as DRAW_PROD_NAME, 
            DRAWER_P.PROD_CODE||' - '||DRAWER_P.PROD_NAME as DRAW_PROD_DESC,
            DRAWER_P.PROD_CLASS as DRAW_PROD_CLASS,
            QTY_SCHEDULED,
            QTY_SCHEDULED as QTY_PLANNED,
            UNIT_CODE,
            UNIT_NAME, 
            QTY_LOADED,
            QTY_PRELOADED,
            QTY_AMB,
            QTY_STD,
            QTY_KG
        FROM 
            PRODUCTS,
            PRODUCTS DRAWER_P,
            (
            SELECT SPEC_PR.UNIT_CODE, 
                SPEC_PR.QTY_SCHEDULED, 
                SPEC_PR.PROD_CODE, 
                SPEC_PR.PROD_NAME, 
                SPEC_PR.PROD_CMPY, 
                SPEC_PR.PROD_CLASS,
                DECODE(SPEC_PR.SCHP_UNITS, 5, TRSF.TRIP_QTY_AMB, 11, TRSF.TRIP_QTY_STD, 17, TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) 
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
                    WHERE SPEC.SCHPPROD_PRODCMPY = PR.PROD_CMPY
                        AND SPEC.SCHPPROD_PRODCODE = PR.PROD_CODE
                        AND SPEC.SCHPSPID_SHLSTRIP = :shls_trip_no
                        AND SPEC.SCHPSPID_SHLSSUPP = :shls_supp
                ) SPEC_PR, 
                UNIT_SCALE_VW UV, 
                (
                    SELECT SPECDETS.SCHDSPEC_SHLSSUPP AS TRIP_SUPPLIER,
                        SPECDETS.SCHDSPEC_SHLSTRIP AS TRIP_NO,
                        SPECDETS.SCHDPROD_PRODCMPY AS TRIP_PRODCMPY,
                        SPECDETS.SCHDPROD_PRODCODE AS TRIP_PRODCODE,
                        SUM(SPECDETS.SCHD_PRESETQTY) AS TRIP_QTY_PRESET,
                        SUM(SPECDETS.SCHD_PRLDQTY) AS TRIP_QTY_PRELOAD,
                        SUM(SPECDETS.SCHD_SPECQTY) AS TRIP_QTY_SCHED,
                        SUM(SPECDETS.SCHD_DELIVERED) AS TRIP_QTY_LOADED,
                        PRODUCTS.PROD_CLASS
                    FROM SPECDETS, PRODUCTS
                    WHERE SCHDPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND SCHDPROD_PRODCODE = PROD_CODE
                    GROUP BY SCHDSPEC_SHLSSUPP, SCHDSPEC_SHLSTRIP, SCHDPROD_PRODCMPY, SCHDPROD_PRODCODE, PROD_CLASS
                ) CMPT, 
                (
                    SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER, PROD_CLASS,
                        SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
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
                        AND TRSFPROD_PRODCODE = PROD_CODE AND TRSFPROD_PRODCMPY = PROD_CMPY
                    GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSFPROD_PRODCMPY, 
                        TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
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
            AND DRAWER_P.PROD_CLASS = PRODUCTS.PROD_CLASS -- get comptiable drawer products
            AND DRAWER_P.PROD_CMPY = :drawer_code -- get comptiable drawer products
            -- AND PRODUCTS.PROD_CMPY = :drawer_code
            AND NVL(LOADED.QTY_SCHEDULED,0) > 0
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

    public function get_trip_seal()
    {
        $query = "
            SELECT s.SHLS_SEAL_NO 
            FROM SCHEDULE s 
            WHERE s.SHLS_TRIP_NO=:trip_no and s.SHLS_SUPP=:supplier
        ";
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

    public function get_trip_briefs()
    {
        $query = "
            SELECT 
                DECODE(
                    UPPER(LD_TYPE), 
                    'PRESCHEDULE', 'BY_COMPARTMENT', 
                    'PREORDER', 'BY_PRODUCT', 
                    UPPER(LD_TYPE)
                ) as SCHD_TYPE,
                SHLSLOAD_LOAD_ID  as SCHD_LOAD_ID,
                STATUS  as SCHD_STATUS,
                SHLS_LOAD_SECURITY_INFO,
                CARRIER_CODE  as SCHD_CARRIER,
                TNKR_CODE  as SCHD_TANKER
            FROM GUI_SCHEDULES 
            WHERE 
                SUPPLIER_CODE = :supplier 
                AND SHLS_TRIP_NO = :trip_no
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        return $stmt;
    }
}
