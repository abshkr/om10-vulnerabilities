<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/socket_client.php';
include_once __DIR__ . '/../shared/baiman_typedef.php';

class SpecialMvService
{
    private $conn = null;

    public function __construct($conn, $mlitm_id = null, $auto_commit = false)
    {
        $this->conn = $conn;
        $this->mlitm_id = $mlitm_id;
        $this->auto_commit = $auto_commit;
        
        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    private function populate_specmove_det()
    {
        $msg = new SPEC_MOVE_REQ();
        $msg->Message_Length = "000000"; /* Auto-calculate at the end of population */
        $msg->message_number = "0000"; /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    "; /* Fixed */
        $msg->Source_device_flags = "0000"; /* Fixed */
        $msg->Source_id_number = "   "; /* Fixed */
        $msg->Dest_system_device = "BAI_999       "; /* Fixed */
        $msg->Dest_id_number = "   "; /* Fixed */
        $msg->Message_Type = "SPEC_MOVE_REQ      "; /* Fixed */
        $msg->Message_Version = "01.00.00"; /* Fixed */
        $msg->mlitm_id = sprintf("%09d", $this->mlitm_id);

        return $msg->to_string();
    }

    // private function get_specialmovment_type()
    // {
    //     $query = "SELECT NVL(MLITM_TYPE, 0) MV_TYPE FROM MOV_LOAD_ITEMS 
    //         WHERE MLITM_ID = :mlitm_id";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return 0;
    //     }
    //     $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //     return $row['MV_TYPE'];
    // }

    private function initial_baseprod($drawer, $prod, &$base, &$base_class)
    {
        $query = "SELECT RATIO_BASE, BASE_CAT, BCLASS_DESC 
            FROM RATIOS, BASE_PRODS, BASECLASS 
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

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $base = $row['RATIO_BASE'];
        $base_class = $row['BCLASS_DESC'];
    }

    /**
     * Return : true or false
     */
    private function initialize() 
    {
        $query = "SELECT NVL(MLITM_TYPE, 0) MLITM_TYPE,
                TO_CHAR(NVL(MLITM_DTIM_START, SYSDATE), 'DD.MM.RRRRHH24:MI:SS') MLITM_DTIM_START, 
                TO_CHAR(NVL(MLITM_DTIM_END, SYSDATE), 'DD.MM.RRRRHH24:MI:SS') MLITM_DTIM_END,
                NVL(MLITM_QTY_AMB, 0) MLITM_QTY_AMB, 
                NVL(MLITM_QTY_COR, 0) MLITM_QTY_COR, 
                NVL(MLITM_QTY_KG, 0) MLITM_QTY_KG, 
                NVL(MLITM_TEMP_AMB, 0) MLITM_TEMP_AMB, 
                NVL(MLITM_DENS_COR, 0) MLITM_DENS_COR, 
                MLITM_PRODCMPY_TO, 
                MLITM_PRODCODE_TO, 
                MLITM_TANKCODE_TO,
                MLITM_PRODCMPY,
                MLITM_PRODCODE, 
                MLITM_TANKCODE
            FROM MOV_LOAD_ITEMS WHERE MLITM_ID = :mlitm_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mlitm_id', $this->mlitm_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        foreach ($row as $key => $value) {
            $item = strtolower($key);
            $this->$item = $value;
        }

        return true;
    }

    /**
     * Return : true or false
     */
    public function submit(&$err_msg)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $special_msg = $this->populate_specmove_det($this->mlitm_id);
        try {
            $client = new SocketClient($this->conn);
        } catch (Bay999Exception $e) {
            $err_msg = $e->getMessage();
            return false;
        }
        
        $client->send($special_msg);
        $response = $client->get_repond();

        write_log(sprintf("SPEC_MOVE_REQ response:%s", $response), __FILE__, __LINE__);

        if (substr($response, 0, 2) != "OK" && substr($response, 0, 11) != "OUTSTANDING") {
            write_log("Wrong SPEC_MOVE_REQ response", __FILE__, __LINE__);
            $err_msg = trim(substr($response, 0, 32));
            return false;
        }
        
        $this->initialize();
        write_log(json_encode($this), __FILE__, __LINE__);
        
        define('MV_RECEIPT', 0);
        define('MV_DISPOSAL', 1);
        define('MV_TRANSFER', 2);

        $serv = new ManualTransactionService($this->conn);
        $serv->set_property('supplier', trim(substr($response, 41, 20)));
        $serv->set_property('trip_no', trim(substr($response, 32, 9)));
        $serv->set_property('load_number', trim(substr($response, 32, 9)));
        $serv->set_property('start_time', $this->mlitm_dtim_start);
        $serv->set_property('finish_time', $this->mlitm_dtim_end);
        $serv->set_property('drawer_code', trim(substr($response, 41, 20)));
        $serv->set_property('drawer_name', "");
        $serv->set_property('tanker_code', "SPECIAL");
        $serv->set_property('operator_code', "");
        $serv->set_property('order_number', 0);     //Not an open order 
        $serv->set_property('num_of_transfers', 1); //For special movment, always 1 transfers

        $num_of_transfers = 1;
        $transfers = array();
        for ($i = 0; $i < $num_of_transfers; ++$i) {
            $transfers[$i] = new Manual_Transfer();
            $transfers[$i]->Arm_Code = "";
            //$transfers[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
            $transfers[$i]->nr_in_tkr = 1;

            if ($this->mlitm_type == MV_RECEIPT) {
                $transfers[$i]->drawer_code = $this->mlitm_prodcmpy_to;
                $transfers[$i]->product_code = $this->mlitm_prodcode_to;
            } else {
                $transfers[$i]->drawer_code = $this->mlitm_prodcmpy;
                $transfers[$i]->product_code = $this->mlitm_prodcode;
            }
            
            $transfers[$i]->dens = $this->mlitm_dens_cor * 1000;
            $transfers[$i]->Temperature = $this->mlitm_temp_amb * 100;
            $transfers[$i]->amb_vol = $this->mlitm_qty_amb * 1000;
            $transfers[$i]->cor_vol = $this->mlitm_qty_cor * 1000;
            $transfers[$i]->liq_kg = $this->mlitm_qty_kg * 1000;

            $transfers[$i]->num_of_meter = 0; //Special movement does not have meter info

            /* Assume the drawer product has only one base. For speical movement, its reasonable */
            $transfers[$i]->Number_of_Bases = 1;
            $this->initial_baseprod($transfers[$i]->drawer_code, $transfers[$i]->product_code, $base, $base_class);
            for ($j = 0; $j < $transfers[$i]->Number_of_Bases; ++$j) {
                $transfers[$i]->bases[$j] = new Transfer_Base();
                if ($this->mlitm_type == MV_RECEIPT) {
                    $transfers[$i]->bases[$j]->Tank_Code = $this->mlitm_tankcode_to;
                } else {
                    $transfers[$i]->bases[$j]->Tank_Code = $this->mlitm_tankcode;
                }
                
                $transfers[$i]->bases[$j]->product_code = $base;

                $transfers[$i]->bases[$j]->prod_class = $base_class;
                $transfers[$i]->bases[$j]->dens = $this->mlitm_dens_cor * 1000;
                $transfers[$i]->bases[$j]->Temperature = $this->mlitm_temp_amb * 100;

                $transfers[$i]->bases[$j]->amb_vol = $this->mlitm_qty_amb * 1000;
                $transfers[$i]->bases[$j]->cor_vol = $this->mlitm_qty_cor * 1000;
                $transfers[$i]->bases[$j]->liq_kg = $this->mlitm_qty_kg * 1000;
            }
        }

        $serv->set_property('transfers', $transfers);
        $serv->set_property('is_nomination', false);
        $serv->set_property('auto_complete', "T");          //For special, auto complete is T

        $result = $serv->do_create($err_msg);
        if ($this->mlitm_type != MV_TRANSFER) {
            return $result;
        }

        if (!$result) {
            //This means for transfer, the first schedule already goes wrong, so return it 
            return $result;
        }

        $serv->unset_property('trsa_id');

        /* for transfer, this is the second schedule, which is an unloading */
        $serv->set_property('supplier', trim(substr($response, 70, 20)));
        $serv->set_property('trip_no', trim(substr($response, 61, 9)));
        $serv->set_property('load_number', trim(substr($response, 61, 9)));
        $serv->set_property('start_time', $this->mlitm_dtim_start);
        $serv->set_property('finish_time', $this->mlitm_dtim_end);
        $serv->set_property('drawer_code', trim(substr($response, 70, 20)));
        $serv->set_property('drawer_name', "");
        $serv->set_property('tanker_code', "SPECIAL");
        $serv->set_property('operator_code', "");
        $serv->set_property('order_number', 0);     //Not an open order 
        $serv->set_property('num_of_transfers', 1); //For special movment, always 1 transfers

        $num_of_transfers = 1;
        $transfers = array();
        for ($i = 0; $i < $num_of_transfers; ++$i) {
            $transfers[$i] = new Manual_Transfer();
            $transfers[$i]->Arm_Code = "";
            //$transfers[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
            $transfers[$i]->nr_in_tkr = 1;

            $transfers[$i]->drawer_code = $this->mlitm_prodcmpy_to;
            $transfers[$i]->product_code = $this->mlitm_prodcode_to;
            $transfers[$i]->dens = $this->mlitm_dens_cor * 1000;
            $transfers[$i]->Temperature = $this->mlitm_temp_amb * 100;
            $transfers[$i]->amb_vol = $this->mlitm_qty_amb * 1000;
            $transfers[$i]->cor_vol = $this->mlitm_qty_cor * 1000;
            $transfers[$i]->liq_kg = $this->mlitm_qty_kg * 1000;

            $transfers[$i]->num_of_meter = 0; //Special movement does not have meter info

            /* Assume the drawer product has only one base. For speical movement, its reasonable */
            $transfers[$i]->Number_of_Bases = 1;
            $this->initial_baseprod($transfers[$i]->drawer_code, $transfers[$i]->product_code, $base, $base_class);
            for ($j = 0; $j < $transfers[$i]->Number_of_Bases; ++$j) {
                $transfers[$i]->bases[$j] = new Transfer_Base();
                $transfers[$i]->bases[$j]->Tank_Code = $this->mlitm_tankcode_to;
                $transfers[$i]->bases[$j]->product_code = $base;

                $transfers[$i]->bases[$j]->prod_class = $base_class;
                $transfers[$i]->bases[$j]->dens = $this->mlitm_dens_cor * 1000;
                $transfers[$i]->bases[$j]->Temperature = $this->mlitm_temp_amb * 100;

                $transfers[$i]->bases[$j]->amb_vol = $this->mlitm_qty_amb * 1000;
                $transfers[$i]->bases[$j]->cor_vol = $this->mlitm_qty_cor * 1000;
                $transfers[$i]->bases[$j]->liq_kg = $this->mlitm_qty_kg * 1000;
            }
        }

        $serv->set_property('transfers', $transfers);
        $serv->set_property('is_nomination', false);
        $serv->set_property('auto_complete', "T");          //For special, auto complete is T

        return $serv->do_create($err_msg);
    }
}