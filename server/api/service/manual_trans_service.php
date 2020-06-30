<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/socket_client.php';
include_once __DIR__ . '/../shared/baiman_typedef.php';

class ManualTransactionService
{
    private $conn = null;

    public function __construct($conn, $auto_commit = true, $bay_code = 'BAY999')
    {
        $this->conn = $conn;
        $this->auto_commit = $auto_commit;
        $this->bay_code = $bay_code;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    /**
     * For example: 
     * set_property('supplier', 'CN51') 
     * set_property('trip_no', '900090') 
     */
    public function set_property($key, $value)
    {
        $this->$key = $value;
    }

    public function unset_property($key)
    {
        unset($this->$key);
    }

    private function populate_reverse_det()
    {
        $msg = new XREVERSE_REQ();
        $msg->Message_Length = "000000"; /* Auto-calculate at the end of population */
        $msg->message_number = "0000"; /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    "; /* Fixed */
        $msg->Source_device_flags = "0000"; /* Fixed */
        $msg->Source_id_number = "   "; /* Fixed */
        $msg->Dest_system_device = "BAI_999       "; /* Fixed */
        $msg->Dest_id_number = "   "; /* Fixed */
        $msg->Message_Type = "MANUAL_REVERSE_TRNS"; /* Fixed */
        $msg->Message_Version = "01.00.00"; /* Fixed */
        $msg->trip_no = sprintf("%09d", $this->trip_no);
        $msg->supplier = sprintf("%-20.20s", $this->supplier);

        return $msg->to_string();
    }

    private function archive_cmpy()
    {
        $query = "SELECT CMPY_CODE FROM COMPANYS WHERE CMPY_CODE =
            (SELECT CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY = 'ARCHIVE_CMPY_CODE')
            AND ((BITAND(CMPY_TYPE, POWER (2,1)) = POWER (2,1)))";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $err_msg = "DB error:" . $e['message'];
            return false;
        }
        
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row == null) {
            return null;
        } else {
            return $row['CMPY_CODE'];
        }
    }

    public function archive_trip(&$err_msg)
    {
        write_log(sprintf("%s::%s() START. trip_no:%s, supplier:%s", 
            __CLASS__, __FUNCTION__, $this->trip_no, $this->supplier), __FILE__, __LINE__);

        $archive_cmpy = $this->archive_cmpy();
        if ($archive_cmpy == null) {
            $err_msg = "Archive company is not set";
            return false;
        }

        $query = "SELECT L.LOAD_REVERSE_FLAG 
            FROM LOADS L, SCHEDULE S
            WHERE S.SHLSLOAD_LOAD_ID = L.LOAD_ID
                AND LOAD_DMY IS NOT NULL
                AND S.SHLS_SUPP = :supplier AND s.SHLS_TRIP_NO = :trip_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $err_msg = "DB error:" . $e['message'];
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row == null) {
            $err_msg = "Schedule not complete";
            return false;
        }
        else if ($row['LOAD_REVERSE_FLAG'] != 1) {
            $this->reverse_trip($error_msg);
        }

        $query = "BEGIN ARCHIVE_TRIP(:i_trip_no_old, :i_supp_code_old, :i_supp_code_new, :o_exec_rst); END;";
        $stmt = oci_parse($this->conn, $query);
        $exec_result = null;
        oci_bind_by_name($stmt, ":i_trip_no_old", $this->trip_no);
        oci_bind_by_name($stmt, ":i_supp_code_old", $this->supplier);
        oci_bind_by_name($stmt, ":i_supp_code_new", $archive_cmpy);
        oci_bind_by_name($stmt, ":o_exec_rst", $exec_result, -1, SQLT_INT);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT) || !($exec_result === 0)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error_msg = "Failed to archive. DB error:" . $e['message'];
            return false;
        }

        $error_msg = "Complete Rev/Archive successfully.";

        $operator = Utilities::getCurrPsn();
        $query = "UPDATE SCHEDULE SET OPERATOR = :oper, LAST_CHG_TIME = SYSDATE 
            WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':oper', $operator);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $err_msg = "DB error:" . $e['message'];
            return false;
        }

        $query = "SELECT NVL(MAX(TRSA_VERSION), 0) MAX_VERSION 
            FROM TRANSACTIONS WHERE (TRSALDID_LD_TRM, TRSALDID_LOAD_ID) IN 
                (SELECT SHLSLOAD_LD_TRM, SHLSLOAD_LOAD_ID FROM SCHEDULE 
                WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $err_msg = "DB error:" . $e['message'];
            return false;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $trsa_ver = $row['MAX_VERSION'];
        
        $query = "UPDATE TRANSACTIONS SET TRSA_PSN = :oper 
            WHERE (TRSALDID_LD_TRM, TRSALDID_LOAD_ID) IN 
                (SELECT SHLSLOAD_LD_TRM, SHLSLOAD_LOAD_ID FROM SCHEDULE 
                WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier) AND TRSA_VERSION = :trsa_ver";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':oper', $this->operator);
        oci_bind_by_name($stmt, ':trsa_ver', $this->trsa_ver);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $err_msg = "DB error:" . $e['message'];
            return false;
        }

        return true;
    }

    /**
     * Return: true or false
     */
    public function reverse_trip(&$err_msg)
    {
        write_log(sprintf("%s::%s() START. trip_no:%s, supplier:%s", 
            __CLASS__, __FUNCTION__, $this->trip_no, $this->supplier), __FILE__, __LINE__);

        $query = "SELECT LOAD_REVERSE_FLAG 
            FROM LOADS, SCHEDULE
            WHERE SHLSLOAD_LOAD_ID = LOAD_ID
                AND SHLS_SUPP = :supplier AND SHLS_TRIP_NO = :trip_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $err_msg = "DB error:" . $e['message'];
            return false;
        }
        
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['LOAD_REVERSE_FLAG'] == 1) {
            write_log(sprintf("Schedule %d/%s already reversed", $this->trip_no, $this->supplier), 
                __FILE__, __LINE__, LogLevel::WARNING);
            $err_msg = sprintf("Schedule %d/%s already reversed", $this->trip_no, $this->supplier);
            return false;
        }

        $reverse_msg = $this->populate_reverse_det($this->trip_no, $this->supplier);
        $client = new SocketClient($this->conn);
        $client->send($reverse_msg);
        $response = $client->get_repond();

        write_log("Reverse response:" . $response, __FILE__, __LINE__);

        if (strlen($response) >= 14 && substr_compare($response, "OK", 12, 2) == 0) {
            $operator = Utilities::getCurrPsn();
            $query = "UPDATE SCHEDULE SET OPERATOR = :oper, LAST_CHG_TIME = SYSDATE 
                WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':oper', $operator);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            oci_bind_by_name($stmt, ':supplier', $this->supplier);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                $err_msg = "DB error:" . $e['message'];
                return false;
            }

            $query = "SELECT NVL(MAX(TRSA_VERSION), 0) MAX_VERSION 
                FROM TRANSACTIONS WHERE (TRSALDID_LD_TRM, TRSALDID_LOAD_ID) IN 
                    (SELECT SHLSLOAD_LD_TRM, SHLSLOAD_LOAD_ID FROM SCHEDULE 
                    WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            oci_bind_by_name($stmt, ':supplier', $this->supplier);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                $err_msg = "DB error:" . $e['message'];
                return false;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $trsa_ver = $row['MAX_VERSION'];
            
            $query = "UPDATE TRANSACTIONS SET TRSA_PSN = :oper 
                WHERE (TRSALDID_LD_TRM, TRSALDID_LOAD_ID) IN 
                    (SELECT SHLSLOAD_LD_TRM, SHLSLOAD_LOAD_ID FROM SCHEDULE 
                    WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier) AND TRSA_VERSION = :trsa_ver";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':oper', $this->operator);
            oci_bind_by_name($stmt, ':trsa_ver', $this->trsa_ver);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            oci_bind_by_name($stmt, ':supplier', $this->supplier);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                $err_msg = "DB error:" . $e['message'];
                return false;
            }
            return true;
        } else {
            $err_msg = "Reverse failed: " . $response;
            return false;
        }

        return true;
    }

    //Get bay transaction id
    private function intialize_trsa_id()
    {
        $query = "SELECT BA_LAST_TRNO 
            FROM BAY_AREA 
            WHERE BA_CODE = :bay_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':bay_code', $this->bay_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $this->trsa_id = $row['BA_LAST_TRNO'] + 1;
        return $this->trsa_id;
    }

    private function get_operator_name()
    {
        if (!isset($this->operator_code)) {
            return "";
        }

        $query = "SELECT USER_USERNAME FROM URBAC_USERS 
            WHERE USER_CODE = :operator_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':operator_code', $this->operator_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['USER_USERNAME'];
    }

    private function get_trip_by_order()
    {
        $query = "SELECT SHLS_TRIP_NO 
            FROM SCHEDULE, ORD_SCHEDULE, CUST_ORDER 
            WHERE STATS = 'L' AND SHLS_TRIP_NO = OS_SHL_SHLSTRIP 
                AND SHLS_SUPP = OS_SHL_SHLSSUPP AND OS_ORDER_NO = ORDER_NO 
                AND ORDER_CUST_ORDNO = :order_number";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_number', $this->order_cust_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['SHLS_TRIP_NO'];
    }

    private function get_trip_by_nomination($item_Id)
    {
        $query = "SELECT SHLS_TRIP_NO FROM SCHEDULE, MOV_SCHEDULES, MOVEMENT_ITEMS 
            WHERE STATS = 'L' AND SHLS_TRIP_NO = MS_SHLSTRIP 
                AND SHLS_SUPP = MS_SHLSSUPP 
                AND MS_MOVEID = MVITM_MOVE_ID AND MVITM_ITEM_ID = :item_Id
                ORDER BY SHLS_TRIP_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':item_Id', $item_Id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['SHLS_TRIP_NO'];
    }

    private function get_equpment_info($tanker, $nr_in_tkr, &$eqp_code, &$nr_in_eqp)
    {
        // write_log(sprintf("%s::%s() START. tanker:%s, nr_in_tkr:%d", 
        //     __CLASS__, __FUNCTION__, $tanker, $nr_in_tkr),
        //     __FILE__, __LINE__);

        $query = "SELECT TC_EQPT FROM TNKR_EQUIP WHERE TC_TANKER = :tanker ORDER BY TC_SEQNO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tanker', $tanker);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }
        $tank_compartment = 0;
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $temp = $row['TC_EQPT'];
            $query2 = "SELECT ETYP_N_ITEMS FROM EQUIP_TYPES WHERE ETYP_ID = 
                (SELECT EQPT_ETP FROM TRANSP_EQUIP WHERE EQPT_ID = :temp)";
            $stmt2 = oci_parse($this->conn, $query2);
            oci_bind_by_name($stmt2, ':temp', $temp);
            if (!oci_execute($stmt2, $this->commit_mode)) {
                $e = oci_error($stmt2);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return -1;
            }
            $row2 = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS);
            $eqp_compartment = $row2['ETYP_N_ITEMS'];

            if ($nr_in_tkr > $tank_compartment && $nr_in_tkr <= $tank_compartment + $eqp_compartment) {
                $query3 = "SELECT EQPT_CODE FROM TRANSP_EQUIP WHERE EQPT_ID = :temp";
                $stmt3 = oci_parse($this->conn, $query3);
                oci_bind_by_name($stmt3, ':temp', $temp);
                if (!oci_execute($stmt3, $this->commit_mode)) {
                    $e = oci_error($stmt3);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return -1;
                }
                $row3 = oci_fetch_array($stmt3, OCI_ASSOC + OCI_RETURN_NULLS);
                $eqp_code = $row3['EQPT_CODE'];
                $nr_in_eqp = $nr_in_tkr - $tank_compartment;
            }
            $tank_compartment += $eqp_compartment;
        }
    }

    /* Get all the info about trip. Because manual trasaction only run on existent trip,
    so we dont need caller to prepare all the info, we can retrieve
    the info we need.
    initialize:
        this->drawer_code
        this->tanker_code
        $this->num_of_prods
        $this->prods -- it is an array
        $this->num_of_comps
        $this->compartments -- it is an array */
    private function init_trip() {
        write_log(sprintf("%s::%s() START. supplier:%s, trip_no:%s", 
            __CLASS__, __FUNCTION__, $this->supplier, $this->trip_no),
            __FILE__, __LINE__);

        if (!isset($this->drawer_code) || !isset($this->tanker_code)) {
            $query = "SELECT SHLS_DRAWER, SHL_TANKER FROM SCHEDULE 
                WHERE SHLS_SUPP = :supplier AND SHLS_TRIP_NO = :trip_no";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':supplier', $this->supplier);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return -1;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->drawer_code = $row['SHLS_DRAWER'];
            $this->tanker_code = $row['SHL_TANKER'];
        }
        
        if (!isset($this->drawer_name) || $this->drawer_name == "") {
            $query = "SELECT CMPY_NAME FROM COMPANYS WHERE CMPY_CODE = :drawer_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':drawer_code', $this->drawer_code);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return -1;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->drawer_name = $row['CMPY_NAME'];
        }
        
        $query = "SELECT SCHPPROD_PRODCODE, SCHPPROD_PRODCMPY 
            FROM SPECPROD 
            WHERE SCHPSPID_SHLSSUPP = :supplier AND SCHPSPID_SHLSTRIP = :trip_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }
        
        $this->num_of_prods = 0;
        $this->prods = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $this->prods[$this->num_of_prods] = new Transfer_Product();
            $this->prods[$this->num_of_prods]->drawer_code = $row['SCHPPROD_PRODCMPY'];
            $this->prods[$this->num_of_prods]->product_code = $row['SCHPPROD_PRODCODE'];
            $this->num_of_prods += 1;
        }
        
        $query = "SELECT SUM(ETYP_N_ITEMS) EQUIP_COUNT FROM EQUIP_TYPES 
            WHERE ETYP_ID IN 
            (SELECT EQPT_ETP FROM TRANSP_EQUIP WHERE EQPT_ID IN 
                (SELECT TC_EQPT FROM TNKR_EQUIP WHERE TC_TANKER = :tanker_code))";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tanker_code', $this->tanker_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $this->num_of_comps = intval($row['EQUIP_COUNT']);
        for ($i = 0; $i < $this->num_of_comps; ++$i) {
            $this->compartments[$i] = new Transfer_Compartment();
            $this->get_equpment_info($this->tanker_code, $i + 1, $eqp_code, $nr_in_eqp);
            $this->compartments[$i]->eqp_cd = $eqp_code;
            $this->compartments[$i]->nr_in_eqp = $nr_in_eqp;
            $this->compartments[$i]->nr_in_tkr = $i + 1;

            //$compartments[$i]->sched_drawer_code = $result[$i]->SCHDPROD_PRODCMPY;
            //$compartments[$i]->sched_prod_code = $result[$i]->SCHDPROD_PRODCODE;
            /* $msg->trf_det[$i]->pdx already invloves product info. Calculate here to make the caller easier */
            for ($j = 0; $j < $this->num_of_transfers; ++$j) {
                if ($this->transfers[$j]->nr_in_tkr == $i + 1) {
                    $this->compartments[$i]->sched_drawer_code = $this->transfers[$j]->drawer_code;
                    $this->compartments[$i]->sched_prod_code = $this->transfers[$j]->product_code;
                    break;
                }
            }

            $this->compartments[$i]->preload_amb_vol = "000000000000";
            $this->compartments[$i]->preload_cor_vol = "000000000000";
            $this->compartments[$i]->preload_liq_kg = "000000000000";
        }
    }

    // private function isPreOrderSchedule($supp, $trip_no)
    // {
    //     $query = "SELECT LD_TYPE FROM GUI_SCHEDULES 
    //         WHERE SUPPLIER_CODE = :supp AND SHLS_TRIP_NO = :trip_no UNION 
    //         SELECT LD_TYPE FROM GUI_NOM_SCHEDULES 
    //         WHERE SUPPLIER_CODE = :supp AND SHLS_TRIP_NO = :trip_no";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':supp', $this->supplier);
    //     oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return -1;
    //     }
    //     $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //     if (strtoupper($row['LD_TYPE']) == "PREORDER") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    
    public function populate_transa_det() {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);

        $msg = new XTRANSAC_DET();
        $msg->Message_Length = "000000";                /* Auto-calculate at the end of population */
        $msg->message_number = "0000";                  /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    ";  /* Fixed */
        $msg->Source_device_flags = "0000";             /* Fixed */
        $msg->Source_id_number = "   ";                 /* Fixed */
        $msg->Dest_system_device = "BAI_999       ";    /* Fixed */
        $msg->Dest_id_number = "   ";                   /* Fixed */
        //$msg->Message_Type = "MAN_TRNSCTN_DETS   ";   /* Fixed */
        $msg->Message_Type = "OBP_TRNSCTN_DETS   ";     /* Fixed */
        $msg->Message_Version = "01.05.00";             /* Fixed */
        $msg->Bay_Code = "BAY999          ";            /* Fixed */
        if (!isset($this->trsa_id)) {
            $this->intialize_trsa_id();
         }

        $msg->Transaction_Number = sprintf("%07d", $this->trsa_id);     /* Get it from parameter*/
        $msg->Standalone_Mode = "OMEGA ";                               /* Fixed, still use operator mode */
        $msg->Load_Number = sprintf("%09d", $this->load_number);        /* Get it from parameter */
        $msg->Number_of_keys = "000";                                   /* Fixed, always set it 0 */
        $msg->load_unload = "T";                                        /* TODO: load/unload ? */
        $msg->end_load_on_WB = "F";                                     /* Fixed */
        $msg->prompt_eqp_on_WB = "F";                                   /* Fixed */
        $msg->Load_Type = "LD_CUST_ORDER   ";                           /* TODO: load type */
        $msg->Reject_Reason = "                      ";                 /* Fixed */
        $msg->Transaction_State = "        ";                           /* Fixed */
        $msg->Start_Time = $this->start_time;                           /* Get it from parameter, start time: "01.03.201312:28:43" */
        $msg->Finish_Time = $this->finish_time;                         /* Get it from parameter, end time: "01.03.201312:32:02" */
        $msg->Release_Time = "                  ";                      /* Fixed */
        $msg->Operator_Code = sprintf("%-16.16s", $this->operator_code); /* Get it from parameter, sample: "LEOMCA          " */
        $msg->Operator_Name = sprintf("%-50.50s", $this->get_operator_name());

        if (isset($this->order_cust_no) && $this->order_cust_no != 0) {
            $this->trip_no = $this->get_trip_by_order();
            write_log(sprintf("trip_no:%d, supplier:%s", $this->trip_no, $this->supplier), __FILE__, __LINE__);
        }
 
        //Get this->drawer_code, tanker_code, num_of_prods, prods, num_of_comps, compartments
        $this->init_trip();
        
        $msg->Drawer_Code = sprintf("%-16.16s", $this->drawer_code); 
        $msg->Drawer_Name = sprintf("%-50.50s", $this->drawer_name); 
        $msg->Tanker_Code = sprintf("%-20.20s", $this->tanker_code); 
        
        $msg->Safe_Tanker_Mass = "            ";            /* Fixed */
        $msg->Tare_Tanker_Mass = "            ";            /* Fixed */
        $msg->Tanker_Prompt = "                    ";       /* Fixed */
        $msg->Drawer_Prompt_Flags = "0125";                 /* Fixed */

        /* Baiman uses product info to call mk_specprod, and it only needs product_code */
        $msg->Number_of_Products = sprintf("%03d", $this->num_of_prods);
        for ($i = 0; $i < $this->num_of_prods; ++$i) {
            $msg->prod_det[$i] = new XPROD();
            $msg->prod_det[$i]->is_base_product = "F";      /* Fixed */
            $msg->prod_det[$i]->drawer_code = sprintf("%-8.8s", $this->prods[$i]->drawer_code);
            $msg->prod_det[$i]->product_code = sprintf("%-10.10s", $this->prods[$i]->product_code);
        }

        $msg->Number_of_Compartments = sprintf("%03d", $this->num_of_comps);
        for ($i = 0; $i < $this->num_of_comps; ++$i) {
            $msg->cmpt_det[$i] = new XCMPT();
            $msg->cmpt_det[$i]->eqp_cd =
                sprintf("%-20.20s", $this->compartments[$i]->eqp_cd);   /* Get it from init_trip() */
            $msg->cmpt_det[$i]->nr_in_eqp =
                sprintf("%02d", $this->compartments[$i]->nr_in_eqp);    /* Get it from init_trip(), sample: "01" */
            $msg->cmpt_det[$i]->nr_in_tkr =
                sprintf("%02d", $this->compartments[$i]->nr_in_tkr);    /* Get it from init_trip(), sample: "01" */
            $msg->cmpt_det[$i]->Volume_Safe_Fill_Limit =
                "000077500000"; /* Fixed, set it a big number */
            $msg->cmpt_det[$i]->Mass_Limit = "            "; /* Fixed */
            $msg->cmpt_det[$i]->Volume_Capacity = "000090000000"; /* Fixed, set it a big number */

            /* This product info will be used in mk_specdets() in baiman */
            $msg->cmpt_det[$i]->prod_def = new XPD();
            $msg->cmpt_det[$i]->prod_def->is_base_product = "F"; /* TODO: Fixed */
            $msg->cmpt_det[$i]->prod_def->drawer_code = 
                sprintf("%-8.8s", $this->compartments[$i]->sched_drawer_code); /* Get it from init_trip(), sample: "1001    " */
            $msg->cmpt_det[$i]->prod_def->product_code = 
                sprintf("%-10.10s", $this->compartments[$i]->sched_prod_code); /* Get it from init_trip(), sample: "200001735 " */

            /* preload quantity */
            $msg->cmpt_det[$i]->asmx = new XASM();
            $msg->cmpt_det[$i]->asmx->amb_vol =
                sprintf("%012d", $this->compartments[$i]->preload_amb_vol);
            $msg->cmpt_det[$i]->asmx->cor_vol =
                sprintf("%012d", $this->compartments[$i]->preload_cor_vol);
            $msg->cmpt_det[$i]->asmx->liq_kg =
                sprintf("%012d", $this->compartments[$i]->preload_liq_kg);

            $msg->cmpt_det[$i]->Nr_of_Drums_Specified = "00000"; /* Fixed */
            $msg->cmpt_det[$i]->prod_class1 = new XPC(); /* Unloading */
            $msg->cmpt_det[$i]->hybrid_loading = "F"; /* Fixed, weight-bridge only */
            $msg->cmpt_det[$i]->prod_def2 = new XPD();
            $msg->cmpt_det[$i]->asm2 = new XASM(); /* Fixed, weight-bridge only */
            $msg->cmpt_det[$i]->prod_class2 = new XPC(); /* Fixed, preloaded */
            $msg->cmpt_det[$i]->temps1 = new XTEMPS(); /* Fixed, preloaded */
            $msg->cmpt_det[$i]->asm3 = new XASM(); /* Fixed, preloaded */
            $msg->cmpt_det[$i]->NrBases1 = "000"; /* Fixed, preloaded base qtys */

            /* Baiman never uses the info below, so do not need to set them. */
            $msg->cmpt_det[$i]->Nr_of_Preloaded_Drums = "00000"; /* Fixed */
            $msg->cmpt_det[$i]->prod_class3 = new XPC(); /* loaded product */
            $msg->cmpt_det[$i]->temps2 = new XTEMPS(); /* loaded product temperature */
            $msg->cmpt_det[$i]->temps2->Temperature = "+01450"; /* TODO: temp */
            $msg->cmpt_det[$i]->temps2->Average_Temperature = "+01450"; /* TODO: average temp */

            $msg->cmpt_det[$i]->asm4 = new XASM(); /* loaded proudct quantity */
            for ($j = 0; $j < $this->num_of_transfers; ++$j) /* Find right data to fill in */ {
                if ($this->transfers[$j]->nr_in_tkr == $i + 1) {
                    $msg->cmpt_det[$i]->asm4->amb_vol = sprintf("%012d", $this->transfers[$j]->amb_vol);
                    $msg->cmpt_det[$i]->asm4->cor_vol = sprintf("%012d", $this->transfers[$j]->cor_vol);
                    $msg->cmpt_det[$i]->asm4->liq_kg = sprintf("%012d", $this->transfers[$j]->liq_kg);
                    break;
                }
            }

            $msg->cmpt_det[$i]->NrBases2 = "000"; /* TODO: loaded base product, set it to 000, cause it is not used in baiman */
            for ($j = 0; $j < $msg->cmpt_det[$i]->NrBases2; ++$j) {
                $msg->cmpt_det[$i]->qty2[$j] = new XQTY();
                $msg->cmpt_det[$i]->qty2[$j]->pd = new XPD();
                $msg->cmpt_det[$i]->qty2[$j]->pd->is_base_product = "T"; /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->pd->product_code = "200001735 "; /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->prod_class = new XPC();

                $msg->cmpt_det[$i]->qty2[$j]->temps = new XTEMPS();
                $msg->cmpt_det[$i]->qty2[$j]->temps->Temperature = "+01450"; /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->temps->Average_Temperature = "+01450"; /* TODO */

                $msg->cmpt_det[$i]->qty2[$j]->asmx = new XASM();
            }

            $msg->cmpt_det[$i]->prod_class4 = new XPC(); /* Always blank */
            $msg->cmpt_det[$i]->temps3 = new XTEMPS(); /* Always blank */
            $msg->cmpt_det[$i]->asm5 = new XASM(); /* Always zero */

            $msg->cmpt_det[$i]->NrBases3 = "000"; /* Always zero */
            $msg->cmpt_det[$i]->Nr_of_Loaded_Drums = "00000";
            $msg->cmpt_det[$i]->Prompt_Flags = "0194"; /* TODO */
        }

        $total_meters = 0;
        $meter_array = array();
        $msg->Number_of_Transfers = sprintf("%03d", $this->num_of_transfers);
        for ($i = 0; $i < $this->num_of_transfers; ++$i) {
            $msg->trf_det[$i] = new XTRF_DET();
            $msg->trf_det[$i]->Transfer_Number = sprintf("%06d", $i + 1);
            $msg->trf_det[$i]->Arm_Code = sprintf("%-6.6s", $this->transfers[$i]->Arm_Code);
            $msg->trf_det[$i]->Device_Code = "                "; /* Sample: "BAY01           " */
            $msg->trf_det[$i]->eqp_cd = "                    "; /* Fixed */
            $msg->trf_det[$i]->nr_in_eqp = "  "; /* Blank */
            $msg->trf_det[$i]->nr_in_tkr = sprintf("%02d", $this->transfers[$i]->nr_in_tkr);

            $msg->trf_det[$i]->pdx = new XPD(); /* tranfers product */
            $msg->trf_det[$i]->pdx->is_base_product = "F"; /* Always "F" */
            $msg->trf_det[$i]->pdx->drawer_code =
                sprintf("%-8.8s", $this->transfers[$i]->drawer_code); /* Sample: "1001    " */
            $msg->trf_det[$i]->pdx->product_code =
                sprintf("%-10.10s", $this->transfers[$i]->product_code); /* Sample: "200001735 " */

            $msg->trf_det[$i]->pdy = new XPD(); /* Seems repeat pdx */
            $msg->trf_det[$i]->pdy->is_base_product = $msg->trf_det[$i]->pdx->is_base_product;
            $msg->trf_det[$i]->pdy->drawer_code = $msg->trf_det[$i]->pdx->drawer_code;
            $msg->trf_det[$i]->pdy->product_code = $msg->trf_det[$i]->pdx->product_code;

            $msg->trf_det[$i]->asmx = new XASM(); /* Baiman does not use this part */

            $msg->trf_det[$i]->Nr_of_Drums = "     "; /* Always blank */
            $msg->trf_det[$i]->prod_class = new XPC();

            /* Sample: "GASOLINE"*/
            $msg->trf_det[$i]->prod_class->prod_class = "        ";
            $msg->trf_det[$i]->prod_class->dens =
                sprintf("%07d", $this->transfers[$i]->dens); /* Sample: "0735300"*/

            $msg->trf_det[$i]->temps = new XTEMPS();
            $msg->trf_det[$i]->temps->Temperature = sprintf("%+06d", $this->transfers[$i]->Temperature);

            $msg->trf_det[$i]->asm2 = new XASM();
            $msg->trf_det[$i]->asm2->amb_vol =
                sprintf("%012d", $this->transfers[$i]->amb_vol); /* Sample: "000001010000"*/
            $msg->trf_det[$i]->asm2->cor_vol =
                sprintf("%012d", $this->transfers[$i]->cor_vol); /* Sample: "000001011000"*/
            $msg->trf_det[$i]->asm2->liq_kg =
                sprintf("%012d", $this->transfers[$i]->liq_kg); /* Sample: "000000743000"*/

            $msg->trf_det[$i]->prod_class1 = new XPC(); /* Always blank */

            $msg->trf_det[$i]->temps2 = new XTEMPS(); /* Always blank */

            $msg->trf_det[$i]->asm3 = new XASM(); /* Always blank */
            $msg->trf_det[$i]->asm3->amb_vol = "            ";
            $msg->trf_det[$i]->asm3->cor_vol = "            ";
            $msg->trf_det[$i]->asm3->liq_kg = "            ";

            $msg->trf_det[$i]->Number_of_Meters = sprintf("%03d", $this->transfers[$i]->num_of_meter);
            for ($j = 0; $j < $this->transfers[$i]->num_of_meter; ++$j) {
                $msg->trf_det[$i]->mtr_det[$j] = new XMTR_DET();
                // logMe($this->transfers[$i]->meters[$j]->Injector_or_Meter, 'WHATISTHIS');
                $msg->trf_det[$i]->mtr_det[$j]->Injector_or_Meter =
                    $this->transfers[$i]->meters[$j]->Injector_or_Meter;
                $msg->trf_det[$i]->mtr_det[$j]->Meter_Injector_Code =
                    sprintf("%-16.16s", $this->transfers[$i]->meters[$j]->Meter_Injector_Code);

                $msg->trf_det[$i]->mtr_det[$j]->pd = new XPD(); /* Always blank */

                $msg->trf_det[$i]->mtr_det[$j]->prod_class = new XPC();

                $msg->trf_det[$i]->mtr_det[$j]->temps = new XTEMPS();

                $msg->trf_det[$i]->mtr_det[$j]->asmx = new XASM(); /* Baiman never uses this part */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->amb_vol =
                    "000001010000"; /* Fixed, set it as the sample gives */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->cor_vol =
                    "000001011000"; /* Fixed, set it as the sample gives */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->liq_kg =
                    "000000743000"; /* Fixed, set it as the sample gives */

                $msg->trf_det[$i]->mtr_det[$j]->asm2 = new XASM();
                $msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol =
                    sprintf("%012d", $this->transfers[$i]->meters[$j]->open_amb); /* Sample: "001916174000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol =
                    sprintf("%012d", $this->transfers[$i]->meters[$j]->open_cor); /* Sample: "001920110000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg =
                    sprintf("%012d", $this->transfers[$i]->meters[$j]->open_kg); /* Sample: "001450833000" */

                $msg->trf_det[$i]->mtr_det[$j]->asm3 = new XASM();
                $msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol =
                    sprintf("%012d", $this->transfers[$i]->meters[$j]->close_amb); /* Sample: "001917184000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol =
                    sprintf("%012d", $this->transfers[$i]->meters[$j]->close_cor); /* Sample: "001921120000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg =
                    sprintf("%012d", $this->transfers[$i]->meters[$j]->close_kg); /* Sample: "001451576000" */

                $msg->trf_det[$i]->mtr_det[$j]->Start_Mass = "            "; /* Always blank */
                $msg->trf_det[$i]->mtr_det[$j]->End_Mass = "            "; /* Always blank */

                /* copy the meter info into a structre to use later */
                $existed = false;
                for ($k = 0; $k < $total_meters; ++$k) {
                    if ($meter_array[$k]['Meter_Injector_Code'] == $msg->trf_det[$i]->mtr_det[$j]->Meter_Injector_Code) {
                        $meter_array[$k]['open_amb'] = ((int) $meter_array[$k]['open_amb'] < (int) $msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol) ?
                        $meter_array[$k]['open_amb'] : $msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol;
                        $meter_array[$k]['open_cor'] = ((int) $meter_array[$k]['open_cor'] < (int) $msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol) ?
                        $meter_array[$k]['open_cor'] : $msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol;
                        $meter_array[$k]['open_kg'] = ((int) $meter_array[$k]['open_kg'] < (int) $msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg) ?
                        $meter_array[$k]['open_kg'] : $msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg;
                        $meter_array[$k]['close_amb'] = ((int) $meter_array[$k]['close_amb'] > (int) $msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol) ?
                        $meter_array[$k]['close_amb'] : $msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol;
                        $meter_array[$k]['close_cor'] = ((int) $meter_array[$k]['close_cor'] > (int) $msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol) ?
                        $meter_array[$k]['close_cor'] : $msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol;
                        $meter_array[$k]['close_kg'] = ((int) $meter_array[$k]['close_kg'] > (int) $msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg) ?
                        $meter_array[$k]['close_kg'] : $msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg;
                        $existed = true;
                    }
                }

                if ($existed == false) {
                    $meter_array[$total_meters]['Injector_or_Meter'] = $msg->trf_det[$i]->mtr_det[$j]->Injector_or_Meter;
                    $meter_array[$total_meters]['Meter_Injector_Code'] = $msg->trf_det[$i]->mtr_det[$j]->Meter_Injector_Code;
                    $meter_array[$total_meters]['open_amb'] = $msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol;
                    $meter_array[$total_meters]['open_cor'] = $msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol;
                    $meter_array[$total_meters]['open_kg'] = $msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg;
                    $meter_array[$total_meters]['close_amb'] = $msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol;
                    $meter_array[$total_meters]['close_cor'] = $msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol;
                    $meter_array[$total_meters]['close_kg'] = $msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg;
                    $total_meters++;
                }
            }

            $msg->trf_det[$i]->Number_of_Bases = sprintf("%03d", $this->transfers[$i]->Number_of_Bases);
            for ($j = 0; $j < $this->transfers[$i]->Number_of_Bases; ++$j) {
                $msg->trf_det[$i]->base[$j] = new XBASE();
                $msg->trf_det[$i]->base[$j]->Tank_Code =
                    sprintf("%-16.16s", $this->transfers[$i]->bases[$j]->Tank_Code);

                $msg->trf_det[$i]->base[$j]->pd = new XPD();
                $msg->trf_det[$i]->base[$j]->pd->is_base_product = "T"; /* Fixed */
                $msg->trf_det[$i]->base[$j]->pd->product_code =
                    sprintf("%-10.10s", $this->transfers[$i]->bases[$j]->product_code);

                $msg->trf_det[$i]->base[$j]->prod_class = new XPC();
                $msg->trf_det[$i]->base[$j]->prod_class->prod_class =
                    sprintf("%-8.8s", $this->transfers[$i]->bases[$j]->prod_class); /* Sample: "GASOLINE"*/
                $msg->trf_det[$i]->base[$j]->prod_class->dens =
                    sprintf("%07d", $this->transfers[$i]->bases[$j]->dens); /* Sample: "0735300"*/

                $msg->trf_det[$i]->base[$j]->temps = new XTEMPS();
                $msg->trf_det[$i]->base[$j]->temps->Temperature =
                    sprintf("%+06d", $this->transfers[$i]->bases[$j]->Temperature); /* Sample: "+01450"*/

                $msg->trf_det[$i]->base[$j]->asmx = new XASM();
                $msg->trf_det[$i]->base[$j]->asmx->amb_vol =
                    sprintf("%012d", $this->transfers[$i]->bases[$j]->amb_vol); /* Sample: "000001010000" */
                $msg->trf_det[$i]->base[$j]->asmx->cor_vol =
                    sprintf("%012d", $this->transfers[$i]->bases[$j]->cor_vol); /* Sample: "000001011000" */
                $msg->trf_det[$i]->base[$j]->asmx->liq_kg =
                    sprintf("%012d", $this->transfers[$i]->bases[$j]->liq_kg); /* Sample: "000000743000" */
            }

            $msg->trf_det[$i]->Start_Mass = "            "; /* Always blank */
            $msg->trf_det[$i]->End_Mass = "            "; /* Always blank */
            $msg->trf_det[$i]->Was_Anything_Recycled = "F"; /* TODO */
        }

        /* because $msg->mtr_det is the duplicate of $msg->trf_det[$i]->Number_of_Meters, use it here so
        that caller does not need to prepare an extra parameter */
        $msg->Number_of_Meters = sprintf("%03d", $total_meters);
        for ($i = 0; $i < $total_meters; ++$i) {
            $msg->mtr_det[$i] = new XMTR_DET();
            $msg->mtr_det[$i]->Injector_or_Meter = $meter_array[$i]['Injector_or_Meter'];
            $msg->mtr_det[$i]->Meter_Injector_Code = $meter_array[$i]['Meter_Injector_Code'];

            $msg->mtr_det[$i]->pd = new XPD(); /* Always blank */

            $msg->mtr_det[$i]->prod_class = new XPC();

            $msg->mtr_det[$i]->temps = new XTEMPS();

            $msg->mtr_det[$i]->asmx = new XASM(); /* Baiman never uses this part */
            $msg->mtr_det[$i]->asmx->amb_vol = "000001010000"; /* Fixed */
            $msg->mtr_det[$i]->asmx->cor_vol = "000001011000"; /* Fixed */
            $msg->mtr_det[$i]->asmx->liq_kg = "000000743000"; /* Fixed */

            $msg->mtr_det[$i]->asm2 = new XASM();
            $msg->mtr_det[$i]->asm2->amb_vol = $meter_array[$i]['open_amb'];
            $msg->mtr_det[$i]->asm2->cor_vol = $meter_array[$i]['open_cor'];
            $msg->mtr_det[$i]->asm2->liq_kg = $meter_array[$i]['open_kg'];

            $msg->mtr_det[$i]->asm3 = new XASM();
            $msg->mtr_det[$i]->asm3->amb_vol = $meter_array[$i]['close_amb'];
            $msg->mtr_det[$i]->asm3->cor_vol = $meter_array[$i]['close_cor'];
            $msg->mtr_det[$i]->asm3->liq_kg = $meter_array[$i]['close_kg'];

            /* In the message definition, the meter structure inside transfer
            has start and end mass, but the meter structure
            inside XTRANSAC_DET level does not have these 2 fields, so they are both set "" */
            $msg->mtr_det[$i]->Start_Mass = "";
            $msg->mtr_det[$i]->End_Mass = "";
        }

        $msg->Number_of_Equipments = "000"; /* Fixed, this is only for weight-bridge */
        $msg->start_weight = "            "; /* Fixed */
        $msg->end_weight = "            "; /* Fixed */
        if (!isset($this->auto_complete)) {
            $this->auto_complete = "F";
        }
        $msg->complete_cur_load = $this->auto_complete;

        return $msg->to_string();
    }

    private function populate_openorder_personkey_info()
    {
        $query = "SELECT ORDER_DRAWER FROM CUST_ORDER 
            WHERE ORDER_CUST_ORDNO = :order_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_no', $this->order_cust_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return sprintf("%-'-40s", $this->operator_code) . "PERSONNEL ACC TYPE   " . sprintf("%-'-16s", $row['ORDER_DRAWER']);
    }

    private function populate_tankerkey_info($tanker_code, $use_accesskey = true)
    {
        if ($use_accesskey) {
            $query = "SELECT KYA_TXT FROM ACCESS_KEYS WHERE KYA_TANKER = :tanker_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tanker_code', $tanker_code);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return -1;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $auth_key = sprintf("%-'-40s", $row['KYA_TXT']);
        } else {
            $auth_key = sprintf("%-'-40s", $tanker_code);
        }

        return $auth_key . "EQUIP ACC ACC TYPE   TOUCH_BUTTON_DEV";
    }

    private function populate_personkey_info($operator, $use_accesskey = true)
    {
        if ($use_accesskey) {
            $query = "SELECT KYA_TXT FROM ACCESS_KEYS WHERE KYA_PSN = :operator";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':operator', $operator);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return -1;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $auth_key = sprintf("%-'-40s", $row['KYA_TXT']);
        } else {
            $auth_key = sprintf("%-'-40s", $operator);
        }

        return $auth_key . "PERSONNEL ACC TYPE   TOUCH_BUTTON_DEV";
    }

    /**
     * number_entered: can be open order number or trip number
     * trans: MessageHeader TODO
     */
    public function populate_auth_req()
    {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        write_log(json_encode($this), __FILE__, __LINE__);

        //Open order sample
        //0002500000OBP_SYS       0000   BAI_SYS          OBP_AUTH_REQ       01.05.000010021000008707002000000D0B533----------------------------PERSONNEL ACC TYPE   TOUCH_BUTTON_DEV000000D0AE5C----------------------------EQUIP ACC ACC TYPE   TOUCH_BUTTON_DEVT|
        $msg = new XAUTH_REQ();
        $msg->Message_Length = "000000";                /* Auto-calculate at the end of population */
        $msg->message_number = "0000";                  /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    ";  /* Fixed */
        $msg->Source_device_flags = "0000";             /* Fixed */
        $msg->Source_id_number = "   ";                 /* Fixed */
        $msg->Dest_system_device = "BAI_999       ";    /* Fixed */
        $msg->Dest_id_number = "   ";                   /* Fixed */
        $msg->Message_Type = "OBP_AUTH_REQ       ";     /* Fixed */
        if (!isset($this->trsa_id)) {
           $this->intialize_trsa_id();
        }

        $msg->Transaction_num = sprintf("%07d", $this->trsa_id);
        $msg->Trip_number = sprintf("%09d", $this->number_entered);       /* Fixed */

        if (isset($this->is_nomination) && $this->is_nomination == false) { 
            /* For open order, use populate_openorder_personkey_info which */
            $msg->Number_of_keys = "002" . 
                $this->populate_openorder_personkey_info() . 
                $this->populate_tankerkey_info($this->tanker_code, false);
            $msg->Message_Version = "91.00.00"; /* For open order, use 91.00.00 so that baiman can recognize */
        } else {
            $msg->Number_of_keys = "002" . 
                $this->populate_personkey_info($this->operator_code, false) . 
                $this->populate_tankerkey_info($this->tanker_code, false);
            $msg->Message_Version = "90.00.00"; /* use different msg version so that baiman use a different way to handle key info */
        }

        $msg->Load_type = "T"; /* Fixed */
        $msg->complete_pre_load = "F"; /* Fixed */

        return $msg->to_string();
    }

    private function has_other_active_trip($tanker, $current_trip)
    {
        write_log(sprintf("%s::%s() START. tanker:%s, current_trip:%d", 
            __CLASS__, __FUNCTION__, $tanker, $current_trip),
            __FILE__, __LINE__);

        $generic_tanker_pattern = "Generic ";
        if (strncmp($tanker, $generic_tanker_pattern, strlen($generic_tanker_pattern)) == 0) {
            return false;
        }

        $query = "SELECT COUNT(*) CNT FROM SCHEDULE, LOADS 
            WHERE SHL_TANKER = :tanker AND SHLSLOAD_LOAD_ID = LOAD_ID
                AND LD_TERMINAL = SHLSLOAD_LD_TRM AND LOAD_DMY IS NULL";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tanker', $tanker);        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);

        if ((int)$row['CNT'] <= 0) {
            return false;
        } else if ((int)$row['CNT'] > 1) {
            return true;
        } else {
            $query = "SELECT SHLS_TRIP_NO FROM SCHEDULE, LOADS 
                WHERE SHL_TANKER = :tanker AND SHLSLOAD_LOAD_ID = LOAD_ID
                AND LD_TERMINAL = SHLSLOAD_LD_TRM AND LOAD_DMY IS NULL";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tanker', $tanker);        
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if ($row['SHLS_TRIP_NO'] == $current_trip) {
                return false;
            }

            return true;
        }

    }

    private function get_trip_type($trip, $supplier)
    {
        $query = "SELECT COUNT(SCHD_COMP_ID) CNT 
            FROM SPECDETS 
            WHERE SCHD_SPECQTY > 0 AND SCHDSPEC_SHLSTRIP = :trip_no
            AND SCHDSPEC_SHLSSUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ((int)$row['CNT'] > 0) {
            return LD_TYPE::LD_PRESCHEDULE;
        }

        $query = "SELECT COUNT(*) CNT FROM SPECPROD 
            WHERE SCHP_ORDER IS NOT NULL AND SCHPSPID_SHLSTRIP = :trip_no
            AND SCHPSPID_SHLSSUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ((int)$row['CNT'] > 0) {
            return LD_TYPE::LD_ORDER;
        }

        return LD_TYPE::LD_PREORDER;
    }

    /* update SCHEDULE table, set carrier and tanker with the real one.
    -1: fails
    0: no need to switch tanker
    1: successfully switched */
    private function switch_tanker()
    {
        write_log(sprintf("%s::%s() START. trip:%d, supplier:%s, actual_tanker:%s",
            __CLASS__, __FUNCTION__, $this->trip_no, $this->supplier, $this->tanker_code),
            __FILE__, __LINE__);

        $query = "SELECT SHL_TANKER, NVL(STATS, 'N') STATS 
            FROM SCHEDULE WHERE SHLS_TRIP_NO = :trip_no
            AND SHLS_SUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['SHL_TANKER'] == $this->tanker_code) /* Same tanker */ {
            return 0;
        } else {
            if ($row['STATS'] != "N") {
                write_log("Cannot swith tanker. Schedule status is: " . $row['STATS'], __FILE__, __LINE__, LogLevel::ERROR);
                return -1;
            }

            if ($this->get_trip_type() == LD_TYPE::LD_PRESCHEDULE) {
                write_log("Preschedule trip does not switch tanker", __FILE__, __LINE__, LogLevel::ERROR);
                return -1;
            }

            $query = "UPDATE SCHEDULE 
                SET SHLS_ORIG_TKR = SHL_TANKER, SHL_TANKER = :actual_tanker
                WHERE SHLS_TRIP_NO = :trip AND SHLS_SUPP = :supplier";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':actual_tanker', $this->tanker_code);
            oci_bind_by_name($stmt, ':trip', $this->trip_no);
            oci_bind_by_name($stmt, ':supplier', $this->supplier);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return -1;
            }

            return 1;
        }
    }
    
    /**
     * Create a manual transaction. 
     * return true or false
     */
    public function do_create(&$error_msg = null) {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        write_log(json_encode($this), __FILE__, __LINE__);
        
        if (isset($this->order_cust_no) && $this->order_cust_no != 0) { /* Open order loading */
            write_log(sprintf("Do open order branch. order_number:%d", $this->order_cust_no),
                __FILE__, __LINE__);
            
            $this->set_property('is_nomination', false);
            $this->set_property('operator_code', $this->operator_code);
            $this->set_property('tanker_code', $this->tanker_code);
            $this->set_property('number_entered', $this->order_cust_no);

            /* 1. auth */
            $auth_req = $this->populate_auth_req();
            try {
                $client = new SocketClient($this->conn);
            } catch (Bay999Exception $e) {
                $error_msg = $e->getMessage();
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
            $client->send($auth_req);
            $response = $client->get_repond();

            // write_log($response, __FILE__, __LINE__);

            if ($response == "" || strpos($response, "AUTH FAILED") !== false ||
                substr_compare($response, "OBP_AUTH_SPEC", 48, 13) != 0) {
                $error_msg = $response;
                return false;
            }

            /* 2. Trasaction dets*/
            $tran_det = $this->populate_transa_det();
            $client->send($tran_det);
            $response = $client->get_repond();

            if (substr_compare($response, "OK", 75, 2) == 0) {
                //Once it's created, the stored file can be deleted (if do_save() has once been called)
                // commented out for testing $this->unlink_serialized($para_trans->Transaction_Number);
                write_log("Manual Transaction successfully submitted", __FILE__, __LINE__);
                $login_user = Utilities::getCurrPsn();

                $query = "UPDATE SCHEDULE 
                    SET OPERATOR = :login_user, 
                        LAST_CHG_TIME = SYSDATE,
                        SHLS_SEAL_NO = :seal_range
                    WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':login_user', $login_user);
                oci_bind_by_name($stmt, ':seal_range', $this->seal_range);
                oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
                oci_bind_by_name($stmt, ':supplier', $this->supplier);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    $error_msg = $e['message'];
                    return false;
                }

                $query = "DELETE FROM SEAL
                    WHERE SEALSPEC_SHLSTRIP = :trip_no AND SEALSPEC_SHLSSUPP = :supplier";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
                oci_bind_by_name($stmt, ':supplier', $this->supplier);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    $error_msg = $e['message'];
                    return false;
                }

                if (isset($this->seals)) {
                    foreach ($this->seals as $seal) {
                        $query = "INSERT INTO SEAL 
                                (SEAL_NR, 
                                SEALSPEC_SHLSTRIP, 
                                SEALSPEC_SHLSSUPP, 
                                SEAL_CMPT_NR, 
                                SEAL_PREFIX, 
                                SEAL_SUFFIX) 
                            VALUES (:seal_nr,
                                :trip_no,
                                :supplier,
                                :cmpt_nr,
                                :seal_prefix,
                                :seal_suffix)";
                        $stmt = oci_parse($this->conn, $query);
                        oci_bind_by_name($stmt, ':seal_nr', $seal->seal_nr);
                        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
                        oci_bind_by_name($stmt, ':supplier', $this->supplier);
                        oci_bind_by_name($stmt, ':cmpt_nr', $seal->cmpt_nr);
                        oci_bind_by_name($stmt, ':seal_prefix', $seal->seal_prefix);
                        oci_bind_by_name($stmt, ':seal_suffix', $seal->seal_suffix);
                        if (!oci_execute($stmt, $this->commit_mode)) {
                            $e = oci_error($stmt);
                            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                            $error_msg = $e['message'];
                            return false;
                        }
                    }
                }
            } else {
                write_log("Manual Transaction failed: " . $response, __FILE__, __LINE__);
                return false;
            }
            return true;
        } else {    //Non-open order
            write_log(sprintf("Do non-open order branch."),
                __FILE__, __LINE__);
            if ($this->has_other_active_trip($this->tanker_code, $this->trip_no)) {
                write_log(sprintf("Tanker %s has other active trips", $this->tanker_code), __FILE__, __LINE__);
                $error_msg = sprintf("Tanker %s has other active trips", $this->tanker_code);
                return false;
            }

            $switch_result = $this->switch_tanker();
            if ($switch_result < 0) {
                write_log("Failed to swith tanker.", __FILE__, __LINE__);
                $error_msg = "Failed to swith tanker.";
                return false;
            }

            $tran_det = $this->populate_transa_det();
            write_log(sprintf("send: %s", $tran_det), __FILE__, __LINE__);
            try {
                $client = new SocketClient($this->conn);
            } catch (Bay999Exception $e) {
                $error_msg = $e->getMessage();
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
            $client->send($tran_det);
            $response = $client->get_repond();
            write_log(sprintf("TRANS_DET response: %s", $response), __FILE__, __LINE__);

            $response_code = substr($response, 75, 10);
            if ($response_code != null && substr_compare($response_code, "OK", 0, 2) == 0) {
                if ($this->operator_code) {
                    $login_user = Utilities::getCurrPsn();
                    
                    $query = "UPDATE SCHEDULE 
                        SET OPERATOR = :login_user, LAST_CHG_TIME = SYSDATE 
                        WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':login_user', $login_user);
                    oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
                    oci_bind_by_name($stmt, ':supplier', $this->supplier);
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        $error_msg = $e['message'];
                        return false;
                    }
                    
                    $query = "UPDATE TRANSACTIONS SET TRSA_PSN = :login_user
                        WHERE TRSA_ID = :trans_id";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':login_user', $login_user);
                    oci_bind_by_name($stmt, ':trans_id', $this->trsa_id);
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        $error_msg = $e['message'];
                        return false;
                    }

                    $query = "UPDATE LOADS SET LD_SEAL_NO = :seal
                        WHERE LOAD_ID = (
                            SELECT TRSALDID_LOAD_ID FROM
                            TRANSACTIONS WHERE TRSA_ID = :trans_id)";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':seal', $para_trans->seal_range);
                    oci_bind_by_name($stmt, ':trans_id', $this->trsa_id);
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        $error_msg = $e['message'];
                        return false;
                    }
                }
            } else {
                write_log(sprintf("Wrong reponse from BAY999: %s", $response), __FILE__, __LINE__);
                return false;
            }

            write_log(sprintf("%s END", __FUNCTION__), __FILE__, __LINE__);
            return true;
        }
    }
}
