<?php
require_once dirname(__FILE__) . '/../bootstrap.php';
//require_once(dirname(__FILE__) . '/../vo/ManualTransactions.vo.php')
require_once dirname(__FILE__) . '/../classes/ManualTransactions.class.php';

define('MANUAL_TRANSACTIONS', basename(__FILE__));

class ManualTransactionsService
{
    public function do_create($order_trip_ind, $trans, $num_of_transfers, $transfer, $isnomi)
    {
        logMe(sprintf("%s::%s START.", __CLASS__, __FUNCTION__), MANUAL_TRANSACTIONS);

        logMe(json_encode($trans), MANUAL_TRANSACTIONS);
        logMe("num_of_transfers:" . $num_of_transfers, MANUAL_TRANSACTIONS);
        logMe(json_encode($transfer), MANUAL_TRANSACTIONS);

        foreach ($transfer as $key => $value) {
            if (!property_exists($value, "Arm_Code") ||
                (property_exists($value, "Arm_Code") && $value->Arm_Code == null)) {
                logMe(sprintf("No arm code info for transfer %s, remove it", $key), MANUAL_TRANSACTIONS);
                array_splice($transfer, $key, 1);
                $num_of_transfers -= 1;
            }
        }

        // logMe(json_encode($transfer), MANUAL_TRANSACTIONS);

        try
        {
            $Manual_tran = new ManualTransactions();
            return $Manual_tran->do_create($order_trip_ind, $trans, $num_of_transfers, $transfer, $isnomi);
        } catch (Exception $e) {
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
        foreach ($tmpArr as $value) {
            $rows[] = $this->getBaseDetails($drawer, $drawerprod, $value);
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

    public function getTankersBySuppTrip($supp, $trip_no)
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

    public function getTankInfoByProdArm($drawer, $drawerprod, $arm)
    {
        $manual_tran = new ManualTransactions();
        return $manual_tran->getTankInfoByProdArm($drawer, $drawerprod, $arm);
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
