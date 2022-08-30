<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';
include_once __DIR__ . '/../service/company_service.php';

class Company extends CommonClass
{
    private $image_path = "/../assets/companys/";

    protected $TABLE_NAME = 'COMPANYS';
    protected $VIEW_NAME = 'GUI_COMPANYS';
    public $NUMBER_FIELDS = array(
        "CMPY_ORD_END",
        "CMPY_ORD_LAST",
        "CMPY_ORD_STRT",
        "CMPY_TRIP_END",
        "CMPY_TRIP_LAST",
        "CMPY_TRIP_STRT",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "TRSA_REVERSE_FLAG" => 1,
        "SITE_MANAGER" => "Y",
        "SUPPLIER" => "Y",
        "CARRIER" => "Y",
        "CUSTOMER" => "Y",
        "DRAWER" => "Y",
        "ISSUER" => "Y",
        "EMPLOYER" => "Y",
        "HOST" => "Y",
        "CMPY_AUTO_LD" => "Y",
        "CMPY_AUTO_RECONC" => "Y",
        "CMPY_BAY_LOOP_CH" => "Y",
        "CMPY_BLTOL_FLAG" => 1,
        "CMPY_COMMS_OK" => "Y",
        "CMPY_ENABLE_EXPD" => "Y",
        "CMPY_FLAG_1" => "Y",
        "CMPY_FLAG_2" => "Y",
        "CMPY_FLAG_3" => "Y",
        "CMPY_HOST_DOCS" => "Y",
        "CMPY_LDTOL_FLAG" => 1,
        "CMPY_LOG_LD_DEL" => "Y",
        "CMPY_MOD_DRAWER" => "Y",
        "CMPY_MUST_SEALNO" => "Y",
        "CMPY_ORD_CARRIER" => "Y",
        "CMPY_TKR_ACTIVAT" => "Y",
        "CMPY_TKR_CFG" => "Y",
        "CMPY_WGH_COMPLET" => "Y",
        "CMPY_WIPE_ORDETS" => "Y",
        "CMPY_SCHD_REV_REPOST" => "Y",
        "CMPY_SCHD_ARCHIVE" => "Y",
        "CMPY_MOVEMENTS_REV" => "Y",
        "SEND_TO_PRINTER" => "Y",
        "DEFAULT_FLAG" => "Y",
        "CMPY_ADD_PROMPT" => "Y",
        "CMPY_CHECK_LICEN" => "Y",
        "CMPY_WGH_AUTO_FL" => "Y",
        "CMPY_REQ_PIN_FLAG" => 1
    );

    public function pre_create()
    {
        if (!isset($this->cmpy_trip_strt)) {
            $this->cmpy_trip_strt = 1;
        }
        if (!isset($this->cmpy_trip_end)) {
            $this->cmpy_trip_end = 999999999;
        }
        if (!isset($this->cmpy_trip_last)) {
            $this->cmpy_trip_last = 0;
        }
        if (!isset($this->cmpy_ord_strt)) {
            $this->cmpy_ord_strt = 1;
        }
        if (!isset($this->cmpy_ord_end)) {
            $this->cmpy_ord_end = 999999999;
        }
        if (!isset($this->cmpy_ord_last)) {
            $this->cmpy_ord_last = 0;
        }

        $this->pre_update();
    }

    public function pre_update() 
    {
        if (!isset($this->site_manager) &&
            !isset($this->supplier) &&
            !isset($this->carrier) &&
            !isset($this->customer) &&
            !isset($this->drawer) &&
            !isset($this->issuer) &&
            !isset($this->employer) &&
            !isset($this->host)) {
            return;
        }

        $this->cmpy_type = 0;
        if (isset($this->site_manager) && $this->site_manager === 'Y') {
            $this->cmpy_type = $this->cmpy_type | pow(2, 0);
        }
        if (isset($this->supplier) && $this->supplier === 'Y') {
            $this->cmpy_type = $this->cmpy_type | pow(2, 1);
        }
        if (isset($this->carrier) && $this->carrier === 'Y') {
            $this->cmpy_type = $this->cmpy_type | pow(2, 2);
        }
        if (isset($this->customer) && $this->customer === 'Y') {
            $this->cmpy_type = $this->cmpy_type | pow(2, 3);
        }
        if (isset($this->drawer) && $this->drawer === 'Y') {
            $this->cmpy_type = $this->cmpy_type | pow(2, 4);
        }
        if (isset($this->issuer) && $this->issuer === 'Y') {
            $this->cmpy_type = $this->cmpy_type | pow(2, 5);
        }
        if (isset($this->employer) && $this->employer === 'Y') {
            $this->cmpy_type = $this->cmpy_type | pow(2, 6);
        }
        if (isset($this->host) && $this->host === 'Y') {
            $this->cmpy_type = $this->cmpy_type | pow(2, 7);
        }
    }

    public function pre_delete()
    {
        // need delete the child records in BASE_PROD_OWNSHIP
        // Note: only delete it when its ownership qty is ZERO
        $query = "DELETE FROM BASE_PROD_OWNSHIP WHERE SUPP_CMPY = :cmpy_code and OWNSHIP_QTY<=0";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    protected function post_create()
    {
        // return true;
        return $this->create_base_owners();
    }

    protected function post_delete()
    {
        $query = "DELETE FROM COMPANY_CONFIG WHERE CMPY_CODE = :cmpy_code";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    protected function post_update()
    {
        if (isset($this->company_configs)) {
            foreach($this->company_configs as $config) {
                $query = "SELECT COUNT(*) CN FROM COMPANY_CONFIG
                    WHERE CONFIG_KEY = :config_key AND CMPY_CODE = :cmpy_code";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
                oci_bind_by_name($stmt, ':config_key', $config->config_key);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                if ($row['CN'] > 0) {
                    // write_log("Update COMPANY_CONFIG.", __FILE__, __LINE__, LogLevel::ERROR);
                    $query = "UPDATE COMPANY_CONFIG
                        SET CONFIG_VALUE = :config_value
                        WHERE CONFIG_KEY = :config_key AND CMPY_CODE = :cmpy_code";
                } else {
                    // write_log("Insert COMPANY_CONFIG.", __FILE__, __LINE__, LogLevel::ERROR);
                    $query = "INSERT INTO COMPANY_CONFIG (CMPY_CODE, CONFIG_KEY, CONFIG_VALUE) 
                        VALUES (:cmpy_code, :config_key, :config_value)";
                }
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
                oci_bind_by_name($stmt, ':config_key', $config->config_key);
                oci_bind_by_name($stmt, ':config_value', $config->config_value);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        return true;
    }

    public function read()
    {
        $query = "
            SELECT * FROM " . $this->VIEW_NAME . " ORDER BY CMPY_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // public function read_hook(&$hook_item)
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);

    //     $result = array();
    //     $hook_item['company_configs'] = $result;
    //     // write_log(json_encode($hook_item), __FILE__, __LINE__);

    //     if (!array_key_exists('cmpy_code', $hook_item)) {
    //         write_log("hook_item does not have cmpy_code item, cannot do read_hook",
    //             __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     $query = "
    //         SELECT * FROM COMPANY_CONFIG 
    //         WHERE CMPY_CODE = :cmpy_code";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':cmpy_code', $hook_item['cmpy_code']);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
    //     $hook_item['company_configs'] = $result;
    // }

    public function document_printers()
    {
        $query = "
            SELECT DISTINCT P.CMPY, P.PRNTR, P.CMPY || '-' || P.PRNTR PRNTR_DESC, CMP.CMPY_BOL_VP_NAME, U.PRNF_USE AS USAGE 
            FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP 
            WHERE P.USAGE = U.USAGE
                AND (P.CMPY IN (:cmpy_code, 'ANY') OR (P.CMPY IS NULL))
                AND U.PRNF_USE = 'DOCUMENT'
                AND PRNTR = CMP.CMPY_BOL_VP_NAME(+)";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function report_printers()
    {
        $query = "
            SELECT DISTINCT P.CMPY, P.PRNTR, P.CMPY || '-' || P.PRNTR PRNTR_DESC, CMP.CMPY_LD_REP_VP, U.PRNF_USE AS USAGE 
            FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP 
            WHERE P.USAGE = U.USAGE
                AND (P.CMPY IN (:cmpy_code, 'ANY') OR (P.CMPY IS NULL))
                AND U.PRNF_USE = 'LD_REPORT'
                AND PRNTR = CMP.CMPY_LD_REP_VP(+)";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function dli_printers()
    {
        $query = "
            SELECT DISTINCT P.CMPY, P.PRNTR, P.CMPY || '-' || P.PRNTR PRNTR_DESC, CMP.CMPY_DRV_INST_VP, U.PRNF_USE AS USAGE 
            FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP 
            WHERE P.USAGE = U.USAGE
                AND (P.CMPY IN (:cmpy_code, 'ANY') OR (P.CMPY IS NULL))
                AND U.PRNF_USE = 'INSTRUCT'
                AND PRNTR = CMP.CMPY_DRV_INST_VP(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function cmpy_configs()
    {
        write_log($this->cmpy_code, __FILE__, __LINE__);

        $query = "
            SELECT * FROM COMPANY_CONFIG
            WHERE CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    
    public function issuers()
    {
        //5 == issuer
        $query = "
            SELECT 
                CMPY_CODE, 
                CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 5)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function drawers()
    {
        //5 == issuer
        $query = "
            SELECT 
                CMPY_CODE, 
                CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 4)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function suppliers()
    {
        //5 == issuer
        $query = "
            SELECT 
                CMPY_CODE, 
                CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 1)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function supp_customers()
    {
        $query = "
            SELECT CUST.CUST_ACCT AS CUST_ACNT,
                CUST.CUST_SUPP AS CUST_SUPP_CODE,
                SCMP.CMPY_NAME AS CUST_SUPP_NAME,
                CUST.CUST_CODE AS CUST_CMPY_CODE,
                CCMP.CMPY_NAME AS CUST_CMPY_NAME,
                CUST.CUST_ACCT||' - '||CCMP.CMPY_NAME AS CUST_DESC
            FROM CUSTOMER CUST, COMPANYS SCMP, COMPANYS CCMP
            WHERE CUST.CUST_SUPP = SCMP.CMPY_CODE
                AND CUST.CUST_CODE = CCMP.CMPY_CODE
                AND (:supplier = '-1' OR CUST_SUPP = :supplier)
            ORDER BY CUST_ACCT";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->supplier)) {
            $this->supplier = '-1';
        }
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    public function customers()
    {
        $query = "
            SELECT 
                CMPY_CODE, 
                CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 3)) <> 0
            ORDER BY CMPY_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    public function employers()
    {
        //5 == issuer
        $query = "
            SELECT 
                CMPY_CODE, 
                CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 6)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function carriers()
    {
        $query = "
            SELECT 
                CMPY_CODE, 
                CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 2)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function retrieve_relations()
    {
        $query = "
            SELECT * FROM COMPANY_RELATION 
            WHERE PARENT_CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['CHILD_CMPY_CODE']] = $flow_row;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function delete_relations()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            DELETE FROM COMPANY_RELATION
            WHERE PARENT_CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    protected function insert_relations()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->relations)) {
            return true;
        }
        
        foreach ($this->relations as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            $query = "INSERT INTO COMPANY_RELATION (
                PARENT_CMPY_CODE,
                PARENT_CMPY_ROLE,
                CHILD_CMPY_CODE,
                CHILD_CMPY_ROLE,
                STATUS,
                CREATE_DATE,
                COMMENTS)
            VALUES (
                :parent_cmpy_code,
                :parent_cmpy_role,
                :child_cmpy_code,
                :child_cmpy_role,
                :status,
                TO_DATE(:create_date, 'YYYY-MM-DD HH24:MI:SS'),
                :comments)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':parent_cmpy_code', $value->parent_cmpy_code);
            oci_bind_by_name($stmt, ':parent_cmpy_role', $value->parent_cmpy_role);
            oci_bind_by_name($stmt, ':child_cmpy_code', $value->child_cmpy_code);
            oci_bind_by_name($stmt, ':child_cmpy_role', $value->child_cmpy_role);
            oci_bind_by_name($stmt, ':status', $value->status);
            oci_bind_by_name($stmt, ':create_date', $value->create_date);
            oci_bind_by_name($stmt, ':comments', $value->comments);

            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }

    protected function journal_relations_change($journal, $old, $new)
    {
        $module = "product relationship";
        foreach ($old as $item_key => $item_array) {
            if (isset($new[$item_key])) {
                foreach ($item_array as $field => $value) {
                    if ($new[$item_key][$field] != $value) {
                        $record = sprintf("parent company:%s, child company:%s",
                            $this->cmpy_code, $item_key);
                        $journal->valueChange($module, $record, $field, $value, $new[$item_key][$field]);
                    }
                }
            }

             if (!isset($new[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("parent company:%s", $this->cmpy_code);
                $jnl_data[3] = sprintf("child companry:%s", $item_key);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($new as $item_key => $item_array) {
            if (!isset($old[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("parent company:%s", $this->cmpy_code);
                $jnl_data[3] = sprintf("child companry:%s", $item_key);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }
    }

    public function update_relations()
    {
        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $old_child_data = $this->retrieve_relations();
        if ($this->del_n_ins_children) {
            $this->delete_relations();
            $this->insert_relations();
        }
        
        $new_child_data = $this->retrieve_relations();

        $journal = new Journal($this->conn, false);
        $this->journal_relations_change($journal, $old_child_data, $new_child_data);

        oci_commit($this->conn);
        return true;
    }

    public function check_company_code()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM COMPANYS WHERE CMPY_CODE=:code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_one_child($child_table, $ckeys, $pkeys)
    {
        // write_log("JSON child: " . $child_table, __FILE__, __LINE__, LogLevel::INFO);
        // write_log("JSON child: " . print_r($ckeys, true), __FILE__, __LINE__, LogLevel::INFO);
        // write_log("JSON child: " . print_r($pkeys, true), __FILE__, __LINE__, LogLevel::INFO);
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM $child_table
            WHERE 1=1 
        ";

        /*
            "PKEYS": [
            {
                "COLUMN_NAME": "CMPY_CODE",
                "DATA_TYPE": "VARCHAR(16)",
                "COLUMN_ID": 1
            }
            ],
            "CHILDREN": [
            {
                "TABLE_NAME": "ACCESS_KEYS",
                "CKEYS": [
                {
                    "COLUMN_NAME": "KYA_ALLOC_CMPY",
                    "DATA_TYPE": "VARCHAR(16)",
                    "COLUMN_ID": 1,
                    "TYPE": "Supplier, Carrier, Customer, Drawer"
                }
                ]
            },
        */
        foreach ($ckeys as $cid => $ckey) {
            foreach ($pkeys as $pid => $pkey) {
                if ($pkey["COLUMN_ID"] == $ckey["COLUMN_ID"]) {
                    $query .= "    AND " . $ckey["COLUMN_NAME"] . " = :" . strtolower($pkey["COLUMN_NAME"]) . "\n";
                    break;
                }
            }
        }
        // write_log("Query children: " . $query, __FILE__, __LINE__, LogLevel::INFO);

        $stmt = oci_parse($this->conn, $query);

        // oci_bind_by_name($stmt, ':code', $this->tank_batch_no);
        foreach ($pkeys as $pid => $pkey) {
            // write_log("Query children param: " . $this[strtolower($pkey["COLUMN_NAME"])], __FILE__, __LINE__, LogLevel::INFO);
            //oci_bind_by_name($stmt, ':' . strtolower($pkey["COLUMN_NAME"]), $this[strtolower($pkey["COLUMN_NAME"])]);
            $cln = strtolower($pkey["COLUMN_NAME"]);
            oci_bind_by_name($stmt, ':' . $cln, $this->$cln);
        }

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $cnt = (int)$row['CNT'];
        if ($cnt > 0) {
            write_log("Query children: " . $query, __FILE__, __LINE__, LogLevel::INFO);
        }

        return $cnt;
    }

    public function check_children()
    {
        $lang = Utilities::getCurrLang();
		
        $langClnFile = dirname(__FILE__) . "/../config/langColumns.json";
		$jsonColumns = file_get_contents($langClnFile);
		// convert json to an associated array
		$langColumns = json_decode( $jsonColumns, true );
		
		$langMsgFile = dirname(__FILE__) . "/../config/langMessages.json";
		$jsonMessages = file_get_contents($langMsgFile);
		// convert json to an associated array
		$langMessages = json_decode( $jsonMessages, true );

        $jsonFile = dirname(__FILE__) . "/../config/childTableColumns.json";
		$jsonData = file_get_contents($jsonFile);
		// convert json to an associated array
		$arrData = json_decode( $jsonData, true );

        $parent = $this->parent;
        // $parent = "COMPANYS";
        $pkeys = $arrData[$parent]["PKEYS"];
        $children = $arrData[$parent]["CHILDREN"];

        // write_log("JSON children: " . print_r($children, true), __FILE__, __LINE__, LogLevel::INFO);
        $counts = array();
        foreach ($children as $index => $child) {
            /*
                {
                    "TABLE_NAME": "ACCESS_KEYS",
                    "CKEYS": [
                    {
                        "COLUMN_NAME": "KYA_ALLOC_CMPY",
                        "DATA_TYPE": "VARCHAR(16)",
                        "COLUMN_ID": 1,
                        "TYPE": "Supplier, Carrier, Customer, Drawer"
                    }
                    ]
                },
            */
            $child_table = $child["TABLE_NAME"];
            $ckeys = $child["CKEYS"];
            $cnt = $this->check_one_child($child_table, $ckeys, $pkeys);
            if ($cnt > 0) {
                $child_title = $child_table;
                if (isset($langMessages[$lang]["SCREENS"][$child_table])) {
                    $child_title = $langMessages[$lang]["SCREENS"][$child_table];
                }
                $item = array();
                $item["table"] = $child_table;
                $item["title"] = $child_title;
                $item["child"] = $cnt;
                $item["type"] = $child["TYPE"];
                $item["language"] = $lang;
                $column_names = array();
                $column_titles = array();
                foreach ($ckeys as $cid => $ckey) {
                    $column_names[] = $ckey["COLUMN_NAME"];
                    $column_title = $ckey["COLUMN_NAME"];
                    if (isset($langColumns[$lang][$child_table][$ckey["COLUMN_NAME"]])) {
                        $column_title = $langColumns[$lang][$child_table][$ckey["COLUMN_NAME"]];
                    }
                    $column_titles[] = $column_title;
                }
                $item["column_names"] = $column_names;
                $item["column_titles"] = $column_titles;
                $counts[] = $item;
            }
        }

        $result = array();
		$result["records"] = $counts;

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
        return $result;
    }

    protected function create_base_owners()
    {
        // initialize the BASE_PROD_OWNSHIP with all the base products if the supplier does not have an owner yet.
        // We don't put any current supplier code into WHERE condition so it can create BASE_PROD_OWNSHIP records for new suppliers added before this fix.
        $query = "
            insert into BASE_PROD_OWNSHIP (
                OWNSHIP_NO
                , BASE_PROD_CODE
                , SUPP_CMPY
                , OWNSHIP_QTY
                , OWNSHIP_UNIT
                , OWNSHIP_DENSITY
                , OWNSHIP_TERMINAL
            )
            select 
                BASE_PROD_OWNSHIP_SEQ.NEXTVAL as OWNSHIP_NO
                , cbp.BASE_CODE               as BASE_PROD_CODE
                , cbp.CMPY_CODE               as SUPP_CMPY
                , 0                           as OWNSHIP_QTY
                , DECODE(cbp.BASE_STOCK_UNIT, 
                    0, DECODE(cbp.VOLUME_MODE, 'GSV', 11, 'GOV', 5, 11), 
                    1, DECODE(cbp.MASS_MODE, 'WiV', 17, 'WiA', 17, 17), 
                    11)                       as OWNSHIP_UNIT
                , 0                           as OWNSHIP_DENSITY
                , cbp.TERM_CODE               as OWNSHIP_TERMINAL
            from 
                (
                    select 
                        OWNSHIP_TERMINAL
                        , BASE_PROD_CODE
                        , SUPP_CMPY
                        , count(*) as BPO_COUNT 
                    from BASE_PROD_OWNSHIP 
                    group by OWNSHIP_TERMINAL, BASE_PROD_CODE, SUPP_CMPY
                )          bpo
                , (
                    select
                        cmp.CMPY_CODE
                        , cmp.SUPPLIER
                        , bpd.BASE_CODE
                        , bpd.BASE_STOCK_UNIT
                        , NVL((select CONFIG_VALUE from SITE_CONFIG where CONFIG_KEY='SITE_OWNERSHIP_VOLUME_MODE'), 'GSV') as VOLUME_MODE
                        , NVL((select CONFIG_VALUE from SITE_CONFIG where CONFIG_KEY='SITE_OWNERSHIP_MASS_MODE'), 'WiV')   as MASS_MODE
                        , SITE.SITE_CODE  as TERM_CODE
                    from
                        GUI_COMPANYS     cmp
                        , BASE_PRODS     bpd
                        , SITE
                    where
                        cmp.SUPPLIER = 'Y'
                )          cbp
            where 
                cbp.BASE_CODE = bpo.BASE_PROD_CODE(+)
                and cbp.CMPY_CODE = bpo.SUPP_CMPY(+)
                and cbp.TERM_CODE = bpo.OWNSHIP_TERMINAL(+)
                and NVL(bpo.BPO_COUNT, 0) = 0
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);

        return true;
    }

    public function upload($field = 'file')
    {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($_FILES) || count($_FILES) <= 0) {
            write_log("Upload failed, _FILES not set or size <= 0", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(200, response("__FILE_UPLOADED__",
                "The file ". basename($_FILES[$field]["name"]). " has been uploaded."));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $target_dir = __DIR__ . $this->image_path;
        $target_file = $target_dir . basename($_FILES[$field]["name"]);
        write_log("Upload company logo file:" . $_FILES[$field]["name"], __FILE__, __LINE__);
        
        // Check if image file is a actual image or fake image
        if (isset($_POST["submit"])) {
            $check = getimagesize($_FILES[$field]["tmp_name"]);
            if($check !== false) {
                write_log("File is an image - " . $check["mime"], __FILE__, __LINE__);
            } else {
                write_log(sprintf("File %s is not an image", $_FILES[$field]["tmp_name"]), __FILE__, __LINE__);
                $error = new EchoSchema(500, response("__NOT_IMAGE__"));
                echo json_encode($error, JSON_PRETTY_PRINT);

                return;
            }
        }

        // Check file size
        if ($_FILES[$field]["size"] > 500000) {
            write_log("The file ". basename($_FILES[$field]["name"]). " is too large", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__FILE_TOO_LARGE__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }
        
        if (move_uploaded_file($_FILES[$field]["tmp_name"], $target_file)) {
            write_log("The file ". basename($_FILES[$field]["name"]). " has been uploaded.", __FILE__, __LINE__);
            $error = new EchoSchema(200, response("__FILE_UPLOADED__",
                "The file ". basename($_FILES[$field]["name"]). " has been uploaded."));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } else {
            write_log("The file ". basename($_FILES[$field]["name"]). " upload failed", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__FILE_UPLOAD_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }
    }

    public function check_trip_order_num()
    {
        $cmpy_service = new CompanyService($this->conn);
        $is_valid = !$cmpy_service->is_trip_oo_used($this->trip_order_num);
        $result = array();
        $result["records"] = array();
        $item = array(
            "is_valid" => $is_valid,
        );

        array_push($result["records"], $item);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
}
