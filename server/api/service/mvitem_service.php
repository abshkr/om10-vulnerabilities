<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../shared/socket_client.php';
include_once __DIR__ . '/../service/site_service.php';
include_once __DIR__ . '/../service/manual_trans_service.php';

class MvitemService
{
    private $conn = null;

    public function __construct($conn, $mvitm_item_id = null, $auto_commit = true)
    {
        $this->conn = $conn;
        $this->mvitm_item_id = $mvitm_item_id;
        $this->auto_commit = $auto_commit;
        
        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    private function get_pair_schedule($trip_no, $supplier)
    {
        write_log(sprintf("%s::%s() START. trip:%d, supplier:%s",
            __CLASS__, __FUNCTION__, $trip_no, $supplier),
            __FILE__, __LINE__);

        $query = "SELECT MS_PAIRTRIP, MS_PAIRSUPP
            FROM MOV_SCHEDULES 
            WHERE MS_SHLSTRIP = :trip_no
                AND MS_SHLSSUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $trip_no);
        oci_bind_by_name($stmt, ':supplier', $supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $res_obj = new StdClass();
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $res_obj->trip_no = $row['MS_PAIRTRIP'];
        $res_obj->supplier = $row['MS_PAIRSUPP'];
        return $res_obj;
    }

    private function get_schedule_by_nomination()
    {
        $query = "SELECT SHLS_TRIP_NO, SHLS_SUPP
            FROM SCHEDULE, MOV_SCHEDULES, MOVEMENT_ITEMS 
            WHERE STATS = 'L' AND SHLS_TRIP_NO = MS_SHLSTRIP 
                AND SHLS_SUPP = MS_SHLSSUPP 
                AND MS_MOVEID = MVITM_MOVE_ID AND MVITM_ITEM_ID = :mvitm_item_id
            ORDER BY SHLS_TRIP_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mvitm_item_id', $this->mvitm_item_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $res_obj = new StdClass();
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $res_obj->trip_no = $row['SHLS_TRIP_NO'];
        $res_obj->supplier = $row['SHLS_SUPP'];
        return $res_obj;
    }

    private function get_mvitem_type()
    {
        $query = "SELECT MVITM_TYPE FROM MOVEMENT_ITEMS WHERE MVITM_ITEM_ID = :mvitm_item_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mvitm_item_id', $this->mvitm_item_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['MVITM_TYPE'];
    }

    private function initial_baseprod($drawer, $prod)
    {
        $query = "SELECT RATIO_BASE, BASE_CAT, BCLASS_DESC, RATIO_VALUE , SUM_VALUE
            FROM RATIOS, BASE_PRODS, BASECLASS,
                (SELECT SUM(RATIO_VALUE) SUM_VALUE FROM RATIOS 
                WHERE RAT_PROD_PRODCODE = :prod AND RAT_PROD_PRODCMPY = :drawer)
            WHERE RAT_PROD_PRODCMPY = :drawer
                AND RAT_PROD_PRODCODE = :prod
                AND BASE_CODE = RATIO_BASE
                AND BCLASS_NO = BASE_CAT";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':drawer', $drawer);
        oci_bind_by_name($stmt, ':prod', $prod);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $bases = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $base_item = array();
            $base_item['ratio_base'] = $flow_row['RATIO_BASE'];
            $base_item['bclass_desc'] = $flow_row['BCLASS_DESC'];
            $base_item['ratio_value'] = $flow_row['RATIO_VALUE'];
            $base_item['sum_value'] = $flow_row['SUM_VALUE'];
            array_push($bases, $base_item);
        }
        
        return $bases;
    }

    private function finishup_schedule($trsa_id)
    {
        write_log(sprintf("%s::%s() START. trsa_id:%s", __CLASS__, __FUNCTION__, $trsa_id),
            __FILE__, __LINE__);

        if (isset($this->alternate_qty) && isset($this->alternate_unit)) {
            $query = "UPDATE TRANSACTIONS 
                SET TRSA_ALT_QTY = :trsa_alt_qty, 
                    TRSA_ALT_UNT = :trsa_alt_unt
                WHERE TRSA_ID = :trsa_id";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':trsa_alt_qty', $this->alternate_qty);
            oci_bind_by_name($stmt, ':trsa_alt_unt', $this->alternate_unit);
            oci_bind_by_name($stmt, ':trsa_id', $trsa_id);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }
        
        $operator = Utilities::getCurrPsn();
        $query = "UPDATE SCHEDULE 
            SET OPERATOR = :operator, 
                LAST_CHG_TIME = SYSDATE 
            WHERE SHLSLOAD_LOAD_ID = (SELECT TRSALDID_LOAD_ID FROM TRANSACTIONS WHERE TRSA_ID = :trsa_id)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':operator', $operator);
        oci_bind_by_name($stmt, ':trsa_id', $trsa_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $query = "UPDATE TRANSACTIONS 
            SET TRSA_PSN = :operator WHERE TRSA_ID = :trsa_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':operator', $operator);
        oci_bind_by_name($stmt, ':trsa_id', $trsa_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    private function explode_arm_tanks()
    {
        write_log(sprintf("%s::%s() START. from_arm:%s", 
            __CLASS__, __FUNCTION__, isset($this->from_arm) ? $this->from_arm : null),
            __FILE__, __LINE__);

        if (!isset($this->from_arm)) {
            return array();
        }

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
                R.RAT_TOTAL as RATIO_TOTAL
            FROM 
                RPTOBJ_PROD_RATIOS_VW R,
                GUI_PIPENODE B,
                BASE_PRODS BP
            WHERE 
                B.STREAM_BASECODE = R.RATIO_BASE(+)
                AND B.STREAM_BASECODE = BP.BASE_CODE(+) 
                AND R.RAT_PROD_PRODCMPY = :prod_cmpy 
                AND R.RAT_PROD_PRODCODE = :prod_code
                AND STREAM_ARMCODE = :from_arm
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prod_cmpy', $this->from_supplier);
        oci_bind_by_name($stmt, ':prod_code', $this->from_product);
        oci_bind_by_name($stmt, ':from_arm', $this->from_arm);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return array();
        }

        $tanks = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tanks[$row['STREAM_BASECODE']] = $row['STREAM_TANKCODE'];
        }

        return $tanks;
    }

    /**
     * Old PHP: dmSpecialMovements.processManualMovement -> ManualTransactions.class.php::do_nomination
     * return: true or false
     */
    public function submit(&$err_msg)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $serv = new ManualTransactionService($this->conn);

        $serv->set_property('is_nomination', true);
        $serv->set_property('operator_code', $this->operator_code);
        $serv->set_property('tanker_code', $this->tanker_code);
        $serv->set_property('number_entered', $this->mvitm_item_id);

        $auth_req = $serv->populate_auth_req();
        try {
            $client = new SocketClient($this->conn);
        } catch (Bay999Exception $e) {
            $err_msg = $e->getMessage();
            write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        
        $client->send($auth_req);
        $response = $client->get_repond();

        // write_log(sprintf("OBP_AUTH_REQ response:%s", $response), __FILE__, __LINE__);

        if ($response == "" || strpos($response, "AUTH FAILED") !== false ||
            substr_compare($response, "OBP_AUTH_SPEC", 48, 13) != 0) {
            $err_msg = $response;
            return false;
        } else if (substr_compare($response, "OBP_AUTH_SPEC", 48, 13) != 0) {
            $err_msg = substr($response, 82, 22);
            return false;
        }

        define('MV_RECEIPT', 0);
        define('MV_DISPOSAL', 1);
        define('MV_TRANSFER', 2);

        $sched_obj = $this->get_schedule_by_nomination();
        $trip_no = $sched_obj->trip_no;
        $supplier = $sched_obj->supplier;
        $serv->set_property('trip_no', $trip_no);
        $serv->set_property('load_number', $trip_no);
        $serv->set_property('supplier', $supplier);
        
        $start_time = DateTime::createFromFormat('Y-m-d H:i:s', $this->start_time);
        $serv->set_property('start_time', $start_time->format('d.m.YH:i:s'));
        $end_time = DateTime::createFromFormat('Y-m-d H:i:s', $this->end_time);
        $serv->set_property('finish_time', $end_time->format('d.m.YH:i:s'));

        $mvitem_type = $this->get_mvitem_type();
        write_log(sprintf("mvitem_type:%d, trip_no:%s, supplier:%s", 
            $mvitem_type, $trip_no, $supplier), __FILE__, __LINE__);

        $serv->set_property('num_of_transfers', 1); //For nomination manual trans, always 1 transfers
        $serv->set_property('tanker_code', $this->tanker_code);
        // write_log(json_encode($serv), __FILE__, __LINE__);

        if ($mvitem_type == MV_DISPOSAL) {
            if (!isset($this->from_tank) && !isset($this->from_arm)) {
                $err_msg = "Missing data. Please check: from_tank/from_arm, from_supplier, from_prod";
                return false;
            }
            $serv->set_property('drawer_code', $this->from_supplier);
        
            $transfers = array();
            $transfers[0] = new Manual_Transfer();
            $transfers[0]->Arm_Code = "";
            //$transfers[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
            $transfers[0]->nr_in_tkr = 1;

            $transfers[0]->drawer_code = $this->from_supplier;
            $transfers[0]->product_code = $this->from_product;
            $transfers[0]->dens = $this->density * 1000;
            $transfers[0]->Temperature = $this->temperature * 100;
            $transfers[0]->amb_vol = $this->amb_vol * 1000;
            $transfers[0]->cor_vol = $this->cor_vol * 1000;
            $transfers[0]->liq_kg = $this->liq_kg * 1000;

            $transfers[0]->num_of_meter = 0; //nomination manual trans does not have meter info

            /* Normally there is only 1 base, use loop here in case there are more  */
            $transfers[0]->Number_of_Bases = 1;
            $bases = $this->initial_baseprod($transfers[0]->drawer_code, $transfers[0]->product_code);
            $transfers[0]->Number_of_Bases = count($bases);

            $from_tanks = $this->explode_arm_tanks();
            for ($j = 0; $j < $transfers[0]->Number_of_Bases; ++$j) {
                $transfers[0]->bases[$j] = new Transfer_Base();
                if (isset($this->from_arm)) {
                    $transfers[0]->bases[$j]->Tank_Code = $from_tanks[$bases[$j]['ratio_base']];
                } else {
                    $transfers[0]->bases[$j]->Tank_Code = $this->from_tank;
                }
                
                $transfers[0]->bases[$j]->product_code = $bases[$j]['ratio_base'];

                $transfers[0]->bases[$j]->prod_class = $bases[$j]['bclass_desc'];
                $transfers[0]->bases[$j]->dens = $this->density * 1000;
                $transfers[0]->bases[$j]->Temperature = $this->temperature * 100;

                $transfers[0]->bases[$j]->amb_vol = ($this->amb_vol * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
                $transfers[0]->bases[$j]->cor_vol = ($this->cor_vol * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
                $transfers[0]->bases[$j]->liq_kg = ($this->liq_kg * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
            }
        } else if ($mvitem_type == MV_RECEIPT || $mvitem_type == MV_TRANSFER) {
            /* If it is transfer, handle unloading first. This is consistent with baiman, because for transfer,
            baiman handles unloading first */
            if (!isset($this->to_tank)) {
                $err_msg = "Missing data. Please check: to_tank, to_supplier, to_prod";
                return false;
            }
            $serv->set_property('drawer_code', $this->to_supplier);

            $transfers = array();
            $transfers[0] = new Manual_Transfer();
            $transfers[0]->Arm_Code = "";
            //$transfers[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
            $transfers[0]->nr_in_tkr = 1;

            $transfers[0]->drawer_code = $this->to_supplier;
            $transfers[0]->product_code = $this->to_product;
            $transfers[0]->dens = $this->density * 1000;
            $transfers[0]->Temperature = $this->temperature * 100;
            $transfers[0]->amb_vol = $this->amb_vol * 1000;
            $transfers[0]->cor_vol = $this->cor_vol * 1000;
            $transfers[0]->liq_kg = $this->liq_kg * 1000;

            $transfers[0]->num_of_meter = 0; //nomination manual trans does not have meter info

            /* Normally there is only 1 base, use loop here in case there are more  */
            $transfers[0]->Number_of_Bases = 1;
            $bases = $this->initial_baseprod($transfers[0]->drawer_code, $transfers[0]->product_code);
            $transfers[0]->Number_of_Bases = count($bases);
            for ($j = 0; $j < $transfers[0]->Number_of_Bases; ++$j) {
                $transfers[0]->bases[$j] = new Transfer_Base();
                $transfers[0]->bases[$j]->Tank_Code = $this->to_tank;
                $transfers[0]->bases[$j]->product_code = $bases[$j]['ratio_base'];

                $transfers[0]->bases[$j]->prod_class = $bases[$j]['bclass_desc'];
                $transfers[0]->bases[$j]->dens = $this->density * 1000;
                $transfers[0]->bases[$j]->Temperature = $this->temperature * 100;

                $transfers[0]->bases[$j]->amb_vol = ($this->amb_vol * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
                $transfers[0]->bases[$j]->cor_vol = ($this->cor_vol * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
                $transfers[0]->bases[$j]->liq_kg = ($this->liq_kg * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
            }
        }

        $serv->set_property('transfers', $transfers);
        $serv->set_property('auto_complete', "T");          //For special, auto complete is T

        $tran_det = $serv->populate_transa_det();
        
        $client->send($tran_det);
        $response = $client->get_repond();
        // write_log(sprintf("OBP_TRNSCTN_DETS DET response:%s", $response), __FILE__, __LINE__);
        if ($response == "" || substr_compare($response, "OK", 75, 2) != 0) {
            $err_msg = "DATABASE STORAGE ERROR";
            return false;
        }

        $this->finishup_schedule($serv->trsa_id);

        if ($mvitem_type == MV_TRANSFER) {
            /* For transfer, there are 2 active trips, so do an extra populate_transa_det, the second one is disposal */
            if (!isset($this->from_tank) && !isset($this->from_arm)) {
                $err_msg = "Missing data. Please check: from_tank, from_supplier, from_prod";
                return false;
            }
            $sched_obj = $this->get_pair_schedule($trip_no, $supplier);
            $trip_no = $sched_obj->trip_no;
            $supplier = $sched_obj->supplier;
            $serv->set_property('trip_no', $trip_no);
            $serv->set_property('load_number', $trip_no);
            $serv->set_property('supplier', $supplier);
            $serv->set_property('drawer_code', $this->from_supplier);
            $serv->unset_property('trsa_id');
        
            write_log(sprintf("Process disposal of transfer. trip_no:%s, supplier:%s", $trip_no, $supplier),
                __FILE__, __LINE__);
            
            $transfers = array();
            $transfers[0] = new Manual_Transfer();
            $transfers[0]->Arm_Code = "";
            //$transfers[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
            $transfers[0]->nr_in_tkr = 1;

            $transfers[0]->drawer_code = $this->from_supplier;
            $transfers[0]->product_code = $this->from_product;
            $transfers[0]->dens = $this->density * 1000;
            $transfers[0]->Temperature = $this->temperature * 100;
            $transfers[0]->amb_vol = $this->amb_vol * 1000;
            $transfers[0]->cor_vol = $this->cor_vol * 1000;
            $transfers[0]->liq_kg = $this->liq_kg * 1000;

            $transfers[0]->num_of_meter = 0; //nomination manual trans does not have meter info

            /* Normally there is only 1 base, use loop here in case there are more  */
            $transfers[0]->Number_of_Bases = 1;
            $bases = $this->initial_baseprod($transfers[0]->drawer_code, $transfers[0]->product_code);
            $transfers[0]->Number_of_Bases = count($bases);
            $from_tanks = $this->explode_arm_tanks();
            for ($j = 0; $j < $transfers[0]->Number_of_Bases; ++$j) {
                $transfers[0]->bases[$j] = new Transfer_Base();
                if ($this->from_arm) {
                    $transfers[0]->bases[$j]->Tank_Code = $from_tanks[$bases[$j]['ratio_base']];
                } else {
                    $transfers[0]->bases[$j]->Tank_Code = $this->from_tank;
                }
                $transfers[0]->bases[$j]->product_code = $bases[$j]['ratio_base'];

                $transfers[0]->bases[$j]->prod_class = $bases[$j]['bclass_desc'];
                $transfers[0]->bases[$j]->dens = $this->density * 1000;
                $transfers[0]->bases[$j]->Temperature = $this->temperature * 100;

                $transfers[0]->bases[$j]->amb_vol = ($this->amb_vol * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
                $transfers[0]->bases[$j]->cor_vol = ($this->cor_vol * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
                $transfers[0]->bases[$j]->liq_kg = ($this->liq_kg * $bases[$j]['ratio_value'] / $bases[$j]['sum_value']) * 1000;
            }

            $serv->set_property('transfers', $transfers);
            $serv->set_property('auto_complete', "T");          //For special, auto complete is T

            $tran_det = $serv->populate_transa_det();
            
            $client->send($tran_det);
            $response = $client->get_repond();
            // write_log(sprintf("OBP_TRNSCTN_DETS DET response:%s", $response), __FILE__, __LINE__);
            if ($response == "" || substr_compare($response, "OK", 75, 2) != 0) {
                $err_msg = "DATABASE STORAGE ERROR";
                return false;
            }

            $this->finishup_schedule($serv->trsa_id);
        }
        
        return true;
    }
}