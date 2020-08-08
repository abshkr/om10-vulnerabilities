<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/tanker_service.php';
include_once __DIR__ . '/../service/unit_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once __DIR__ . '/../service/partnership_service.php';
include_once __DIR__ . '/../service/manual_trans_service.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

//Old PHP: LoadSchedules.class.php
class Schedule extends CommonClass
{
    protected $TABLE_NAME = 'SCHEDULE';
    protected $VIEW_NAME = 'GUI_SCHEDULES';
    // protected $primary_keys = array("area_k");

    public $NUMBER_FIELDS = array(
        "SHLS_TRIP_NO",
        "ORDER_NO",
        "ORDER_CUST_ORDNO",
        "QTY_AMB",
        "QTY_STD",
        "QTY_KG",
        "QTY_LOADED",
        "QTY_PRELOADED",
        "QTY_SCHEDULED",
        "SCHDSPEC_SHLSTRIP",
        "QTY_PRELOAD",
        "COMPARTMENT"
    );

    protected $table_view_map = array(
        "SHLS_SUPP" => "SUPPLIER_CODE"
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "CMPY_SCHD_ARCHIVE" => "Y",
        "CMPY_SCHD_REV_REPOST" => "Y",
        "REVERSED" => "Y",
        "ARCHIVED" => "Y",
        "UNLOAD" => "Y",
    );

    public function suppliers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->suppliers();
    }

    public function drawers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->drawers();
    }

    public function carriers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->carriers();
    }

    public function tankers_by_carrier()
    {
        $company_service = new TankerService($this->conn);
        return $company_service->tankers_by_carrier($this->tnkr_carrier);
    }

    public function next_trip_no()
    {
        $company_service = new CompanyService($this->conn, $this->supplier_code, $auto_commit = true);
        $new_cust_order = $company_service->next_trip_no();

        $result = array();
        $result["records"] = array();
        $item = array(
            "next_trip_no" => $new_cust_order,
        );

        array_push($result["records"], $item);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function unit_types()
    {
        $unit_service = new UnitService($this->conn);
        return $unit_service->loadable_unit_types();
    }

    public function status()
    {
        $unit_service = new EnumService($this->conn);
        return $unit_service->schedule_status();
    }

    public function sold_tos()
    {
        $serv = new PartnershipService($this->conn);
        return $serv->sold_tos();
    }

    public function ship_tos()
    {
        $serv = new PartnershipService($this->conn);
        return $serv->ship_tos();
    }

    public function drawer_products()
    {
        $query = "
            SELECT PROD_CODE, PROD_NAME, PROD_IMAGE FROM PRODUCTS 
            WHERE PROD_CMPY = :cmpy_code
            ORDER BY PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->drawer_code);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function view_dli()
    {
        //tankTerm=P251&supp=5860106&tripNo=600000040&rpt_type=0&ftsize=16&forms=1&rows=1&sess_id=QKohSpbjlpwF
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trip_no not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: supplier not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->shls_terminal)) {
            $serv = new SiteService($this->conn);
            $this->shls_terminal = $serv->site_code();
        }
        
        $query_string = "tankTerm=" . $this->shls_terminal . "&supp=" . $this->supplier .
            "&tripNo=" . $this->trip_no . "&rpt_type=0&ftsize=16&forms=1&rows=1";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/drv_instr_popup.cgi", $query_string);
        if (strpos($res, "redirectToLoginPage") !== false) {
            $error = new EchoSchema(400, response("__INVALID_SESSION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        echo $res;
    }

    //Old code: TransactionsService.php::reverseTransactions()
    public function reverse()
    {
        $serv = new ManualTransactionService($this->conn, $this->supplier, $this->trip_no);
        $serv->set_property('supplier', $this->supplier);
        $serv->set_property('trip_no', $this->trip_no);
        $error_msg = null;
        if (!$serv->reverse_trip($error_msg)) {
            $error = new EchoSchema(500, response("__INTERNAL_ERROR__", $error_msg));
            
            echo json_encode($error, JSON_PRETTY_PRINT);
            write_log("reverse_trip failed", __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $error = new EchoSchema(200, response("__SCHEDULE_REVERSED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    //Old code: TransactionsService.php::reverseTransactions() 
    //Archive == reverse fist, then archive
    public function archive()
    {
        $serv = new ManualTransactionService($this->conn, $this->supplier, $this->trip_no);
        $serv->set_property('supplier', $this->supplier);
        $serv->set_property('trip_no', $this->trip_no);
        $error_msg = null;
        if (!$serv->archive_trip($error_msg)) {
            $error = new EchoSchema(500, response("__INTERNAL_ERROR__", $error_msg));
            
            echo json_encode($error, JSON_PRETTY_PRINT);
            write_log("Archive failed", __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $error = new EchoSchema(200, response("__SCHED_ARCHIVED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    //tankTerm=P251&supp=5860106&tripNo=600000040&op=18&sess_id=QKohSpbjlpwF
    public function print_dli()
    {
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, "parameter missing: trip_no not provided");
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, "parameter missing: supplier not provided");
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->shls_terminal)) {
            $serv = new SiteService($this->conn);
            $this->shls_terminal = $serv->site_code();
        }
        
        $query_string = "tankTerm=" . $this->shls_terminal . "&supp=" . $this->supplier .
            "&tripNo=" . $this->trip_no . "&op=18";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/drv_instr.cgi", $query_string);
        if (strpos($res, "redirectToLoginPage") !== false) {
            $error = new EchoSchema(400, response("__INVALID_SESSION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        echo $res;
    }

    public function search()
    {
        if (isset($this->shls_trip_no)) {
            $shls_trip_no = '%' . $this->shls_trip_no . '%';
        } else {
            $shls_trip_no = '%';
        }

        $query = "
            SELECT " . $this->VIEW_NAME . ".*, 
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
                DECODE(SHLS_SRCTYPE, 
                    1, 'Manually Created',
                    2, 'From Host',
                    3, 'Open Order',
                    4, 'Standalone or Special',
                    'Unknown'
            ) SHLS_SRCTYPE_DESC FROM " . $this->VIEW_NAME . "
            WHERE SHLS_TRIP_NO LIKE :shls_trip_no " ;

        if (isset($this->supplier_code)) {
            $query = $query . " AND SUPPLIER_CODE = :supplier_code";
        }

        if (isset($this->carrier_code)) {
            $query = $query . " AND CARRIER_CODE = :carrier_code";
        }

        if (isset($this->shls_terminal)) {
            $query = $query . " AND SHLS_TERMINAL = :shls_terminal";
        }

        if (isset($this->tnkr_code)) {
            $query = $query . " AND TNKR_CODE LIKE :tnkr_code";
        }

        if (isset($this->status)) {
            $query = $query . " AND STATUS = :status";
        }

        if (isset($this->start_date) && isset($this->end_date)) {
            $query = $query . " AND SHLS_CALDATE > :start_date AND SHLS_CALDATE < :end_date";
        }

        $query = $query . " ORDER BY SHLS_TRIP_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $shls_trip_no);

        if (isset($this->supplier_code)) {
            oci_bind_by_name($stmt, ':supplier_code', $this->supplier_code);
        }

        if (isset($this->carrier_code)) {
            oci_bind_by_name($stmt, ':carrier_code', $this->carrier_code);
        }

        if (isset($this->shls_terminal)) {
            oci_bind_by_name($stmt, ':shls_terminal', $this->shls_terminal);
        }

        if (isset($this->tnkr_code)) {
            $tnkr_code = '%' . $this->tnkr_code . '%';
            oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);
        }

        if (isset($this->status)) {
            oci_bind_by_name($stmt, ':status', $this->status);
        }

        if (isset($this->start_date) && isset($this->end_date)) {
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Overwrite super class 
    public function mandatory_fields_check()
    {
        return true;
    }

    //sess_id=hvufDCYgiNhz&tankTerm=CNS&supp=7640102&tripNo=900097&op=19&cmd=DEL&callerTyp=flex
    public function delete()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "DELETE FROM SEAL WHERE SEALSPEC_SHLSTRIP = :trip_no AND SEALSPEC_SHLSSUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__SAVE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query = "UPDATE SCHEDULE SET SHLS_SEAL_NO = NULL WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__SAVE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->shls_terminal)) {
            $serv = new SiteService($this->conn);
            $this->shls_terminal = $serv->site_code();
        }

        $query_string = "tankTerm=" . rawurlencode(strip_tags($this->shls_terminal)) . 
            "&tripNo=" . rawurlencode(strip_tags($this->shls_trip_no)) . 
            "&supp=" . rawurlencode(strip_tags($this->supplier_code)) . 
            "&op=19&cmd=DEL";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/load_scheds.cgi", $query_string);
        write_log($res, __FILE__, __LINE__);

        if (strpos($res, "Successfully Deleted") === false) {
            // throw new DatabaseException("load_scheds CGI error");
            write_log("load_scheds CGI error", __FILE__, __LINE__, LogLevel::ERROR);
            throw new DatabaseException(response("__CGI_FAILED__"));
        }

        return true;

        // $result = null;
        // $query = "
        //     BEGIN
        //         CLEAN_RUSTY_TRIP_R21(:o_trip_no, :o_supp_code, :o_exec_result);
        //     END;";
        // $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':o_supp_code', $this->supplier_code);
        // oci_bind_by_name($stmt, ':o_trip_no', $this->shls_trip_no);
        // oci_bind_by_name($stmt, ':o_exec_result', $result);
        // if (oci_execute($stmt, $this->commit_mode)) {
        //     return true;
        // } else {
        //     $e = oci_error($stmt);
        //     write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }
    }

    private function update_cmpt_delvinfo($compartment)
    {
        $query = "
            UPDATE SPECDETS 
            SET SCHD_DELIV_NUM = :delnum, 
                SCHD_SOLD_TO_NUM = :soldto, 
                SCHD_SHIP_TO_NUM = :shipto 
            WHERE SCHDSPEC_SHLSSUPP = :supp 
                AND SCHDSPEC_SHLSTRIP = :trip 
                AND SCHD_COMP_ID = :cmpt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':delnum', $compartment->schd_deliv_num);
        oci_bind_by_name($stmt, ':soldto', $compartment->schd_sold_to_num);
        oci_bind_by_name($stmt, ':shipto', $compartment->schd_ship_to_num);
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
    }

    //In old php, it is DorHistoryService.php::updateTripHostDOR
    private function update_host_data() 
    {
        if (!isset($this->shl_fleet_data)) {
            return;
        }

        $query = "UPDATE SCHEDULE SET SHL_FLEET_DATA = :shl_fleet_data 
            WHERE SHLS_TRIP_NO = :trip and SHLS_SUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':default', $default);
        oci_bind_by_name($stmt, ':supplier', $this->supplier_code);
        oci_bind_by_name($stmt, ':trip', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shl_fleet_data', $this->shl_fleet_data);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            throw new DatabaseException($e['message']);;
        }

        return;
    }

    //In old php, it is LoadSchedules.class.php::updateSchedule
    private function update_sold_to_ship_to() 
    {
        if (!isset($this->shls_sold_to_num) && !isset($this->shls_ship_to_num)) {
            return;
        }

        if (!isset($this->shls_sold_to_num)) {
            $this->shls_sold_to_num = null;
        }

        if (!isset($this->shls_ship_to_num)) {
            $this->shls_ship_to_num = null;
        }

        $query = "UPDATE SCHEDULE SET SHLS_SOLD_TO_NUM = :shls_sold_to_num,
                SHLS_SHIP_TO_NUM = :shls_ship_to_num
            WHERE SHLS_TRIP_NO = :trip and SHLS_SUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':default', $default);
        oci_bind_by_name($stmt, ':supplier', $this->supplier_code);
        oci_bind_by_name($stmt, ':trip', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_sold_to_num', $this->shls_sold_to_num);
        oci_bind_by_name($stmt, ':shls_ship_to_num', $this->shls_ship_to_num);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            throw new DatabaseException($e['message']);;
        }

        return;
    }

    private function clean_up_zero_products()
    {
        $query = "DELETE FROM SPECPROD
            WHERE SCHPSPID_SHLSTRIP = :trip
                AND SCHPSPID_SHLSSUPP = :supplier
                AND (SCHP_SPECQTY <= 0 OR SCHP_SPECQTY IS NULL)";
        $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':default', $default);
        oci_bind_by_name($stmt, ':supplier', $this->supplier_code);
        oci_bind_by_name($stmt, ':trip', $this->shls_trip_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            throw new DatabaseException($e['message']);;
        }

        return;
    }

    //Because both create and update are calling CGI, and the only diffence is cmd
    private function create_n_update($cmd = "ADD")
    {
        write_log(sprintf("%s::%s() START. cmd:%s", __CLASS__, __FUNCTION__, $cmd),
            __FILE__, __LINE__);
        write_log(json_encode($this), __FILE__, __LINE__);

        Utilities::sanitize($this);

        if ($cmd == "ADD") {
            $op = 18;
        } else {
            $op = 17;
        }

        if (!isset($this->shls_terminal)) {
            $serv = new SiteService($this->conn);
            $this->shls_terminal = $serv->site_code();
        }

        $query_string = "tankTerm=" . rawurlencode(strip_tags($this->shls_terminal)) . 
            "&sched_type=" . rawurlencode(strip_tags($this->shls_ld_type)) .
            "&tripNo=" . rawurlencode(strip_tags($this->shls_trip_no)) . 
            "&carr=" . rawurlencode(strip_tags($this->carrier_code)) . 
            "&tanker=" . (isset($this->tnkr_code) ? rawurlencode(strip_tags($this->tnkr_code)): "")  . 
            "&date=" . rawurlencode(strip_tags($this->shls_caldate)) . 
            "&shift=" . (isset($this->shls_shift) ? rawurlencode(strip_tags($this->shls_shift)) : "") . 
            "&priority=" . (isset($this->shls_priority) ? rawurlencode(strip_tags($this->shls_priority)) : "")  . 
            "&tripExpirDteTime=" . rawurlencode(strip_tags($this->shls_exp2)) . 
            "&supp=" . rawurlencode(strip_tags($this->supplier_code)) . 
            "&op=" . strval($op) . "&cmd=" . $cmd;

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/load_scheds.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);

        $op_response = $op + 10;
        if (strpos($res, "var op=" . strval($op_response) . ";") === false) {
            // throw new DatabaseException("load_scheds CGI error");
            write_log("load_scheds CGI error", __FILE__, __LINE__, LogLevel::ERROR);
            throw new DatabaseException(response("__CGI_FAILED__"));
        }

        if (isset($this->compartments)) {
            foreach ($this->compartments as $compartment) {
                if ($cmd == "MOD") {
                    $query = "SELECT SCHD_COMP_ID, SCHDPROD_PRODCODE
                        FROM SPECDETS
                        WHERE SCHDSPEC_SHLSTRIP = :trip
                            AND SCHDSPEC_SHLSSUPP = :supplier
                            AND SCHD_SPECQTY > 0";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':supplier', $this->supplier_code);
                    oci_bind_by_name($stmt, ':trip', $this->shls_trip_no);
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        throw new DatabaseException($e['message']);;
                    }
            
                    $existing_cmpts = array();
                    while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                        $existing_cmpts[$row["SCHD_COMP_ID"]] = $row["SCHDPROD_PRODCODE"];
                    };

                    // write_log(json_encode($existing_cmpts), __FILE__, __LINE__, LogLevel::ERROR);
                    // write_log(json_encode($compartment), __FILE__, __LINE__, LogLevel::ERROR);

                    if (isset($existing_cmpts[strval($compartment->compartment)])) {
                        if ($compartment->prod_code === "") {
                            $compartment->prod_code = $existing_cmpts[strval($compartment->compartment)];
                        }
                    } else {
                        if ($compartment->qty_scheduled <= 0 || $compartment->qty_scheduled === ""
                            || $compartment->prod_code === "") {
                            continue;
                        }
                    }
                } else {
                    if ($compartment->qty_scheduled <= 0 || $compartment->qty_scheduled === ""
                        || $compartment->prod_code === "") {
                        continue;
                    }
                }

                $query_string = "tankTerm=" . rawurlencode(strip_tags($this->shls_terminal)) . 
                    "&sched_type=" . rawurlencode(strip_tags($this->shls_ld_type)) .
                    "&prod=" . rawurlencode(strip_tags($compartment->prod_code)) . 
                    "&unit=" . rawurlencode(strip_tags($compartment->unit_code)) . 
                    "&sched=" . rawurlencode(strip_tags($compartment->qty_scheduled)) . 
                    "&order=&bay_armCd=-1" .  
                    "&supp=" . rawurlencode(strip_tags($this->supplier_code)) . 
                    "&tripNo=" . rawurlencode(strip_tags($this->shls_trip_no)) . 
                    "&tanker=" . rawurlencode(strip_tags($this->tnkr_code)) . 
                    "&drawer=" . rawurlencode(strip_tags($this->drawer_code)) . 
                    "&cmptID=" . rawurlencode(strip_tags($compartment->compartment)) . 
                    "&tlrcmpt=" . rawurlencode(strip_tags($compartment->compartment)) . 
                    "&op=17&cmd=MOD";
    
                $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/load_spec_compt.cgi", $query_string);
                if (strpos($res, "Success!") === false) {
                    write_log("load_spec_compt CGI error", __FILE__, __LINE__, LogLevel::ERROR);
                    write_log($res, __FILE__, __LINE__);
                    throw new DatabaseException(response("__CGI_FAILED__"));
                }
    
                $this->update_cmpt_delvinfo($compartment);
            }
        }
        
        if (isset($this->products)) {
            foreach ($this->products as $product) {
                if ($cmd == "MOD") {
                    $query = "SELECT SCHPPROD_PRODCODE, SCHPPROD_PRODCMPY
                        FROM SPECPROD
                        WHERE SCHPSPID_SHLSTRIP = :trip
                            AND SCHPSPID_SHLSSUPP = :supplier";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':supplier', $this->supplier_code);
                    oci_bind_by_name($stmt, ':trip', $this->shls_trip_no);
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        throw new DatabaseException($e['message']);;
                    }
            
                    $existing_products = array();
                    while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                        array_push($existing_products, $row["SCHPPROD_PRODCODE"]);
                    };

                    if (!in_array($product->prod_code, $existing_products) && 
                        ($product->qty_scheduled <= 0 || $product->qty_scheduled === "")) {
                        continue;
                    }
                } else {
                    if ($product->qty_scheduled <= 0 || $product->qty_scheduled === "") {
                        continue;
                    }
                }

                $query_string = "tankTerm=" . rawurlencode(strip_tags($this->shls_terminal)) . 
                    "&sched_type=" . rawurlencode(strip_tags($this->shls_ld_type)) .
                    "&prod=" . rawurlencode(strip_tags($product->prod_code)) . 
                    "&unit=" . rawurlencode(strip_tags($product->unit_code)) . 
                    "&sched=" . rawurlencode(strip_tags($product->qty_scheduled)) . 
                    "&supp=" . rawurlencode(strip_tags($this->supplier_code)) . 
                    "&tripNo=" . rawurlencode(strip_tags($this->shls_trip_no)) . 
                    "&tanker=" . rawurlencode(strip_tags($this->tnkr_code)) . 
                    "&drawer=" . rawurlencode(strip_tags($this->drawer_code)) . 
                    "&op=" . strval($op) . "&cmd=" . $cmd;

                $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/load_spec_prod.cgi", $query_string);
                if ($cmd == "ADD") {
                    if (strpos($res, "Success!") === false) {
                        write_log("load_spec_prod CGI error", __FILE__, __LINE__, LogLevel::ERROR);
                        write_log($res, __FILE__, __LINE__);
                        throw new DatabaseException(response("__CGI_FAILED__"));
                    }
                } else {
                    if (strpos($res, "var op=27;") === false) {
                        //If does not success, very likely this is a new product, try add
                        $query_string = "tankTerm=" . rawurlencode(strip_tags($this->shls_terminal)) . 
                            "&sched_type=" . rawurlencode(strip_tags($this->shls_ld_type)) .
                            "&prod=" . rawurlencode(strip_tags($product->prod_code)) . 
                            "&unit=" . rawurlencode(strip_tags($product->unit_code)) . 
                            "&sched=" . rawurlencode(strip_tags($product->qty_scheduled)) . 
                            "&supp=" . rawurlencode(strip_tags($this->supplier_code)) . 
                            "&tripNo=" . rawurlencode(strip_tags($this->shls_trip_no)) . 
                            "&tanker=" . rawurlencode(strip_tags($this->tnkr_code)) . 
                            "&drawer=" . rawurlencode(strip_tags($this->drawer_code)) . 
                            "&op=18&cmd=ADD";
            
                        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/load_spec_prod.cgi", $query_string);
                        if (strpos($res, "Success!") === false) {
                            write_log($res, __FILE__, __LINE__);
                            write_log("load_spec_prod CGI error", __FILE__, __LINE__, LogLevel::ERROR);
                            throw new DatabaseException(response("__CGI_FAILED__"));
                        }
                    }
                }
            }
        }

        $this->clean_up_zero_products();
        $this->update_host_data();
        $this->update_sold_to_ship_to();

        return true;
    }

    private function setSHLS_SRCTYPE()
    {
        $query = "
            UPDATE SCHEDULE 
            SET SHLS_SRCTYPE = 1
            WHERE SHLS_TRIP_NO = :trip 
                AND SHLS_SUPP = :supp ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supp', $this->supplier_code);
        oci_bind_by_name($stmt, ':trip', $this->shls_trip_no);
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    }

    public function create()
    {
        if (!$this->create_n_update("ADD")) {
            return false;
        }

        return $this->setSHLS_SRCTYPE();
    }

    public function update()
    {
        return $this->create_n_update("MOD");
    }

    public function read()
    {
        if (!isset($this->start_date)) {
            $query = "
            SELECT " . $this->VIEW_NAME . ".*, 
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
                DECODE(SHLS_SRCTYPE, 
                    1, 'Manually Created',
                    2, 'From Host',
                    3, 'Open Order',
                    4, 'Standalone or Special',
                    'Unknown'
                ) SHLS_SRCTYPE_DESC FROM " . $this->VIEW_NAME . "
            WHERE SHLS_CALDATE > TO_CHAR(SYSDATE - 7, 'YYYY-MM-DD HH24:MI:SS')
            ORDER BY SHLS_CALDATE DESC";
            $stmt = oci_parse($this->conn, $query);
        
        } else {
            $query = "
                SELECT " . $this->VIEW_NAME . ".*, 
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
                DECODE(SHLS_SRCTYPE, 
                    1, 'Manually Created',
                    2, 'From Host',
                    3, 'Open Order',
                    4, 'Standalone or Special',
                    'Unknown'
                ) SHLS_SRCTYPE_DESC FROM " . $this->VIEW_NAME . "
                WHERE SHLS_CALDATE > :start_date AND SHLS_CALDATE < :end_date
                ORDER BY SHLS_CALDATE DESC";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        
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
        SELECT UNIT_CODE,
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
            AND PRODUCTS.PROD_CMPY = :drawer_code
        ORDER BY PRODUCTS.PROD_CODE";
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

    public function get_tnkr_cmpts()
    {
        $query = "
            SELECT EQPT_CODE, 
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
                NULL SCHD_DELIV_NUM,
                NULL PROD_CLASS,
                0 QTY_LOADED,
                0 QTY_AMB,
                0 QTY_STD,
                0 QTY_KG
            FROM
            (
                SELECT TC_SEQNO, EQPT_CODE,
                    EQPT_ETP,
                    CMPT_NO EQPT_CMPT,
                    DECODE(CMPT_UNITS, 28, 5, CMPT_UNITS) UNIT_CODE,
                    DECODE(CMPT_UNITS, 11, 'l (cor)', 17, 'kg', 'l (amb)') UNIT_NAME,
                    DECODE(ADJ_AMNT, NULL, CMPT_CAPACIT, CMPT_CAPACIT + ADJ_AMNT) SAFEFILL,
                    DECODE(ADJ_CAPACITY, NULL, CMPT_CAPACIT, ADJ_CAPACITY) SFL,
                    NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
                FROM TRANSP_EQUIP, COMPARTMENT, SFILL_ADJUST, TNKR_EQUIP
                WHERE COMPARTMENT.CMPT_ETYP = TRANSP_EQUIP.EQPT_ETP
                    AND EQPT_ID = TC_EQPT
                    AND TC_TANKER = :tnkr_code
                    AND EQPT_ID = SFILL_ADJUST.ADJ_EQP(+)
                    AND CMPT_NO(+) = SFILL_ADJUST.ADJ_CMPT
                ORDER BY TC_SEQNO, CMPT_NO
            ) TMP
            ORDER BY COMPARTMENT
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

        /**
         * This is old query from LoadSchedules.class.php::getScheduledCompartments. If only shows
         * comaprtment that have data. New frontend requires a result including all the comaprtments
         * */
        // $query = "
        // SELECT SPEC_PROD.COMPARTMENT, 
        //     SPEC_PROD.PROD_CODE, 
        //     SPEC_PROD.PROD_NAME, 
        //     SPEC_PROD.PROD_CMPY,
        //     SPEC_PROD.UNIT_CODE, 
        //     SPEC_PROD.UNIT_NAME, 
        //     SPEC_PROD.QTY_SCHEDULED, 
        //     SPEC_PROD.QTY_PRELOAD,
        //     SPEC_PROD.SCHDSPEC_SHLSTRIP, 
        //     SPEC_PROD.SCHDSPEC_SHLSSUPP, 
        //     SPEC_PROD.SCHD_SOLD_TO_NUM,
        //     SPEC_PROD.SCHD_SHIP_TO_NUM, 
        //     SPEC_PROD.SCHD_DELIV_NUM, 
        //     SPEC_PROD.PROD_CLASS, 
        //     DECODE(SPEC_PROD.UNIT_CODE, 5, TRSF.TRIP_QTY_AMB, 11, TRSF.TRIP_QTY_STD, 17, TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) 
        //         AS QTY_LOADED, 
        //     TRSF.TRIP_QTY_AMB QTY_AMB, 
        //     TRSF.TRIP_QTY_STD QTY_STD, 
        //     TRSF.TRIP_QTY_KG QTY_KG        
        // FROM
        //     (
        //         SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT,
        //             PR.PROD_CODE AS PROD_CODE,
        //             PR.PROD_NAME AS PROD_NAME,
        //             PR.PROD_CMPY AS PROD_CMPY,
        //             SPEC.SCHD_UNITS AS UNIT_CODE,
        //             UV.DESCRIPTION AS UNIT_NAME,
        //             SPEC.SCHD_SPECQTY AS QTY_SCHEDULED,
        //             SPEC.SCHD_PRLDQTY QTY_PRELOAD,
        //             SPEC.SCHDSPEC_SHLSTRIP,
        //             SPEC.SCHDSPEC_SHLSSUPP,
        //             SPEC.SCHD_SOLD_TO_NUM,
        //             SPEC.SCHD_SHIP_TO_NUM,
        //             SPEC.SCHD_DELIV_NUM,
        //             PR.PROD_CLASS
        //         FROM SPECDETS SPEC,
        //         PRODUCTS PR,
        //         UNIT_SCALE_VW UV
        //                 WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
        //                     AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
        //                     AND UV.UNIT_ID = SPEC.SCHD_UNITS
        //                     AND SPEC.SCHDSPEC_SHLSTRIP = :shls_trip_no 
        //                     AND SPEC.SCHDSPEC_SHLSSUPP = :shls_supp
        //     ) SPEC_PROD, 
        //     (
        //         SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER,
        //             PRODUCTS.PROD_CLASS AS PROD_CLASS,
        //             SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
        //             TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT,
        //             TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
        //             TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
        //             SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
        //             SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
        //             SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
        //             SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
        //             SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
        //             SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
        //         FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
        //         WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
        //             AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
        //             AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
        //             AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
        //             AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
        //             AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
        //             AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
        //         GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
        //             TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
        //     ) TRSF
        // WHERE
        //     SPEC_PROD.SCHDSPEC_SHLSSUPP = TRSF.TRIP_SUPPLIER (+)
        //     AND SPEC_PROD.SCHDSPEC_SHLSTRIP = TRSF.TRIP_NO (+)
        //     AND SPEC_PROD.COMPARTMENT = TRSF.TRIP_COMPARTMENT (+)
        //     AND SPEC_PROD.PROD_CLASS = TRSF.PROD_CLASS (+)
        // ORDER BY SPEC_PROD.SCHDSPEC_SHLSSUPP, SPEC_PROD.SCHDSPEC_SHLSTRIP, SPEC_PROD.COMPARTMENT
        // ";
        $query = "
        SELECT EQPT_CODE,
            TANKER_INFO.COMPARTMENT,
            TANKER_INFO.CMPT_NO EQPT_CMPT,
            PROD_CODE, 
            PROD_NAME, 
            PROD_CMPY,
            NVL(UNIT_CODE, CMPT_UNITS) UNIT_CODE, 
            NVL(UNIT_NAME, CMPT_UNITS_NAME) UNIT_NAME, 
            SAFEFILL,
            QTY_SCHEDULED, 
            QTY_PRELOAD,
            SCHDSPEC_SHLSTRIP, 
            SCHDSPEC_SHLSSUPP, 
            SCHD_SOLD_TO_NUM,
            SCHD_SHIP_TO_NUM, 
            ORDER_CUST_ORDNO,
            SCHD_DELIV_NUM, 
            PROD_CLASS, 
            QTY_LOADED, 
            QTY_AMB, 
            QTY_STD, 
            QTY_KG
        FROM
        (
            SELECT TMP.*, ROWNUM COMPARTMENT FROM
            (
                SELECT TC_SEQNO, EQPT_CODE,
                    EQPT_ETP,
                    CMPT_NO,
                    CMPT_UNITS, 
                    DECODE(CMPT_UNITS, 11, 'l (cor)', 17, 'kg', 'l (amb)') CMPT_UNITS_NAME,
                    DECODE(ADJ_AMNT, NULL, CMPT_CAPACIT, CMPT_CAPACIT + ADJ_AMNT) SAFEFILL,
                    DECODE(ADJ_CAPACITY, NULL, CMPT_CAPACIT, ADJ_CAPACITY) SFL,
                    NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
                FROM TRANSP_EQUIP, COMPARTMENT, SFILL_ADJUST, TNKR_EQUIP
                WHERE COMPARTMENT.CMPT_ETYP = TRANSP_EQUIP.EQPT_ETP
                    AND EQPT_ID = TC_EQPT
                    AND TC_TANKER = (
                        SELECT SHL_TANKER FROM SCHEDULE WHERE SHLS_TRIP_NO = :shls_trip_no AND SHLS_SUPP = :shls_supp)
                    AND EQPT_ID = SFILL_ADJUST.ADJ_EQP(+)
                    AND CMPT_NO(+) = SFILL_ADJUST.ADJ_CMPT
                ORDER BY TC_SEQNO, CMPT_NO) TMP
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
                SPEC_PROD.SCHD_DELIV_NUM, 
                SPEC_PROD.PROD_CLASS, 
                DECODE(SPEC_PROD.UNIT_CODE, 
                    5, TRSF.TRIP_QTY_AMB, 
                    11, TRSF.TRIP_QTY_STD, 
                    28, TRSF.TRIP_QTY_STD, 
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
                        CUST_ORDER.ORDER_CUST_ORDNO,
                        SPEC.SCHD_DELIV_NUM,
                        PR.PROD_CLASS
                    FROM SPECDETS SPEC,
                        PRODUCTS PR,
                        UNIT_SCALE_VW UV,
                        CUST_ORDER
                    WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
                        AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
                        AND UV.UNIT_ID = SPEC.SCHD_UNITS
                        AND SPEC.SCHDSPEC_SHLSTRIP = :shls_trip_no
                        AND SPEC.SCHDSPEC_SHLSSUPP = :shls_supp
                        AND CUST_ORDER.ORDER_NO(+) = SPEC.SCHD_ORDER
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
}
