<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
//require_once(dirname(__FILE__) . '/../vo/ManualTransactions.vo.php')
require_once(dirname(__FILE__) . '/../classes/ManualTransactions.class.php');

define('MANUAL_TRANSACTIONS', 'MANUAL_TRANS.service');

class ManualTransactionsService
{
    public function do_create($order_trip_ind, $trans, $num_of_transfers, $transfer, $isnomi)
    {
        logMe("do_create START", MANUAL_TRANSACTIONS);

        logMe("order_trip_ind:" . $order_trip_ind, MANUAL_TRANSACTIONS);
        logMe("trans.Login_User:" . $trans->Login_User, MANUAL_TRANSACTIONS);
        logMe("trans.Load_Number:" . $trans->Load_Number, MANUAL_TRANSACTIONS);
        logMe("trans.Supplier:" . $trans->Supplier, MANUAL_TRANSACTIONS);
        logMe("trans.Tanker Code:" . $trans->Tanker_Code  , MANUAL_TRANSACTIONS);
        logMe("trans.Operator_Code:" . $trans->Operator_Code, MANUAL_TRANSACTIONS);
        logMe("trans.Start_Time:" . $trans->Start_Time, MANUAL_TRANSACTIONS);
        logMe("trans.Finish_Time:" . $trans->Finish_Time, MANUAL_TRANSACTIONS);
        logMe("trans.TAS_Ref:" . $trans->TAS_Ref, MANUAL_TRANSACTIONS);
        logMe("trans.Customer:" . $trans->Customer, MANUAL_TRANSACTIONS);
        logMe("trans.User_Comments:" . $trans->User_Comments, MANUAL_TRANSACTIONS);
        logMe("num_of_transfers:" . $num_of_transfers, MANUAL_TRANSACTIONS);
        logMe("isnomi:" . $isnomi, MANUAL_TRANSACTIONS);
        
        for ($i = 0; $i < $num_of_transfers; $i++)
        {
            logMe("  transfer[".$i."].Arm_Code:" . $transfer[$i]->Arm_Code, MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].nr_in_tkr:" . $transfer[$i]->nr_in_tkr, MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].drawer_code:" . $transfer[$i]->drawer_code , MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].product_code:" . $transfer[$i]->product_code, MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].dens:" . $transfer[$i]->dens        , MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].Temperature:" . $transfer[$i]->Temperature , MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].amb_vol:" . $transfer[$i]->amb_vol     , MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].cor_vol:" . $transfer[$i]->cor_vol     , MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].liq_kg:" . $transfer[$i]->liq_kg      , MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].Equipment_ID:" . $transfer[$i]->Equipment_ID, MANUAL_TRANSACTIONS);
            logMe("  transfer[".$i."].Planned_Qty:" . $transfer[$i]->Planned_Qty , MANUAL_TRANSACTIONS);

            logMe("  transfer[".$i."].Number_of_Bases:" . 
                $transfer[$i]->Number_of_Bases, MANUAL_TRANSACTIONS);
            for ($k = 0; $k < $transfer[$i]->Number_of_Bases; $k++)
            {
                logMe("    transfer[".$i."].bases[".$k."].Tank_Code:" . 
                    $transfer[$i]->bases[$k]->Tank_Code, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].bases[".$k."].product_code:" . 
                    $transfer[$i]->bases[$k]->product_code, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].bases[".$k."].prod_class:" . 
                    $transfer[$i]->bases[$k]->prod_class, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].bases[".$k."].dens:" . 
                    $transfer[$i]->bases[$k]->dens, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].bases[".$k."].Temperature :" . 
                    $transfer[$i]->bases[$k]->Temperature , MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].bases[".$k."].amb_vol:" . 
                    $transfer[$i]->bases[$k]->amb_vol, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].bases[".$k."].cor_vol:" . 
                    $transfer[$i]->bases[$k]->cor_vol, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].bases[".$k."].liq_kg:" . 
                    $transfer[$i]->bases[$k]->liq_kg, MANUAL_TRANSACTIONS);
            }

            logMe("  transfer[".$i."].num_of_meter:" . 
                $transfer[$i]->num_of_meter, MANUAL_TRANSACTIONS);
            for ($j = 0; $j < $transfer[$i]->num_of_meter; $j++)
            {
                logMe("    transfer[".$i."].meters[".$j."].Injector_or_Meter  :" . 
                    $transfer[$i]->meters[$j]->Injector_or_Meter, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].meters[".$j."].Meter_Injector_Code:" . 
                    $transfer[$i]->meters[$j]->Meter_Injector_Code, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].meters[".$j."].open_amb           :" . 
                    $transfer[$i]->meters[$j]->open_amb, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].meters[".$j."].open_cor           :" . 
                    $transfer[$i]->meters[$j]->open_cor, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].meters[".$j."].open_kg            :" . 
                    $transfer[$i]->meters[$j]->open_kg, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].meters[".$j."].close_amb          :" . 
                    $transfer[$i]->meters[$j]->close_amb, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].meters[".$j."].close_cor          :" . 
                    $transfer[$i]->meters[$j]->close_cor, MANUAL_TRANSACTIONS);
                logMe("    transfer[".$i."].meters[".$j."].close_kg           :" . 
                    $transfer[$i]->meters[$j]->close_kg, MANUAL_TRANSACTIONS);
            }
        }                         

        try
        {
            $Manual_tran = new ManualTransactions();
            return $Manual_tran->do_create($order_trip_ind, $trans, $num_of_transfers, $transfer, $isnomi);
        }
        catch (Exception $e)
        {
            logMe("MT exception catched", MANUAL_TRANSACTIONS);
        }
    }

    public function createSchedule($item_id, $per_code, $tank_code, $schd_qty, $drawer1, $prod1, $drawer2, $prod2)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->do_mv_schd($item_id, $per_code, $tank_code, $schd_qty, $drawer1, $prod1, $drawer2, $prod2);
    }

    public function getBaseDetails($drawer, $drawerprod, $arm)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getBaseDetails($drawer, $drawerprod, $arm);    
    }
    
    public function getAllBaseDetails($drawer, $drawerprod, $arms)
    {
        $tmpArr = explode("|", $arms);
        foreach($tmpArr as $value) 
        {
            $rows[] = $this->getBaseDetails($drawer,$drawerprod, $value);
            //$rows[] = $tmpRow[0];
        }
          //XarrayEncodingConversion($rows);
        return $rows;
    }
    public function getSchdTypeBySuppTrip($supp, $trip_no)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getSchdTypeBySuppTrip($supp, $trip_no);
    }
    
    public function getRevTrsfBySuppTrip($supp, $trip_no)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getRevTrsfBySuppTrip($supp, $trip_no);
    }
    
    public function getRevBasesBySuppProd($trsfer_id, $trsa_ver)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getRevBasesBySuppProd($trsfer_id, $trsa_ver);
    }
    
    public function getRevBasesTolByLoadID($load_id, $trsa_ver)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getRevBasesTolByLoadID($load_id, $trsa_ver);
    }
    
    public function getRevMetersTolByLoadID($load_id, $trsa_ver)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getRevMetersTolByLoadID($load_id, $trsa_ver);
    }
    
    public function getDrawerProdSchdByProd($supp, $trip_no)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getDrawerProdSchdByProd($supp, $trip_no);
    }
    
    public function finalCheck_Submit($supp, $trip_no)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->finalCheck_Submit($supp, $trip_no);
    }
    
    /* replace amf async call Start */
    
    public function getCustomersBySupplier($cmpy_code)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getCustomersBySupplier($cmpy_code);
    }
    
    public function getOpenOrderNumberByCustomer($order_cust)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getOpenOrderNumberByCustomer($order_cust);
    }
    
    public function getCarriersBySuppTrip($supp, $trip_no)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getCarriersBySuppTrip($supp, $trip_no);
    }
    
    public function getTankersBySuppTrip ($supp, $trip_no)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getTankersBySuppTrip($supp, $trip_no);
    }
    
    public function getEquipmentsByTanker($tanker_code)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getEquipmentsByTanker($tanker_code);
    }   
    
    public function getCompartmentsByTanker($tanker_code)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getCompartmentsByTanker($tanker_code);
    }
    
    public function getOrderDetailsByTanker($supp, $openorder_no, $tanker_code)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getOrderDetailsByTanker($supp, $openorder_no, $tanker_code);
    }
    
    public function getScheduleDetailsBySuppTrip($supp, $trip_no)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getScheduleDetailsBySuppTrip($supp, $trip_no);
    }

    public function getTankerByCarrier_OO($carrier_code)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getTankerByCarrier_OO($carrier_code);
    }

    public function getCarriersByOpenOrder($open_order)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getCarriersByOpenOrder($open_order);
    }
    
    public function getAllCarriers()
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getAllCarriers();
    }
    
    public function getOrderProductsByCustOrderNo($custorderno)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getOrderProductsByCustOrderNo($custorderno);
    }
    
    public function getAdditionalInfoByOpenOrder($open_order)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getAdditionalInfoByOpenOrder($open_order);
    }
    
    public function getTankerByCarrier($carrier_code)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getTankerByCarrier($carrier_code);
    }

    public function getDriverCodeBySuppDrawer($supp, $drawer)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getDriverCodeBySuppDrawer($supp, $drawer);
    }

    public function getTripNumberBySupplier($type, $cmpy_code)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getTripNumberBySupplier($type, $cmpy_code);
    }

    public function getScheduleDetailsBySuppTrip_sub1($supp, $trip_no, $tanker_cd)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getScheduleDetailsBySuppTrip_sub1($supp, $trip_no, $tanker_cd);
    }
    
    public function preCheck_StartupMT($supp, $trip_no)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->preCheck_StartupMT($supp, $trip_no);
    }

    public function getPreOrderDetailsByTanker($supp, $trip_no, $tanker_code)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getPreOrderDetailsByTanker($supp, $trip_no, $tanker_code);
    }

    public function getBasesVCFInfo()
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getBasesVCFInfo();
    }


    /* replace amf async call End */

    public function getTankInfoByProdArm ($drawer, $drawerprod, $arm)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getTankInfoByProdArm ($drawer, $drawerprod, $arm);
    }
    
    public function saveMTData($module_id, $module_name, $head_data, $body_data, $user, $status) 
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->saveMTData($module_id, $module_name, $head_data, $body_data, $user, $status);
    }
    
    public function readMTHeadData($seq_id) 
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->readMTHeadData($seq_id);
    }
    
    public function readMTData($seq_id) 
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->readMTData($seq_id);
    }
    
    public function deleteMTData($seq_id) 
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->deleteMTData($seq_id);
    }

}

?>
