<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

//Old PHP: amf PartnershipService.php
class Partnership extends CommonClass
{
    protected $TABLE_NAME = 'CMPY_CUST_PRTNR';
    protected $VIEW_NAME = 'CMPY_CUST_PRTNR';

    public $check_exists = false;
    protected $check_mandatory = false;

    protected $primary_keys = array(
        // "ccp_cmpy_code",
        "ccp_cust_acct",
        // "ccp_prtnr_seq"
    );

    protected $table_view_map = array(
        "CCP_CUST_ACCT" => "PARTNER_CUST_ACCT"
    );

    public function customers()
    {
        $query = "
            SELECT CUST.CUST_ACCT,
                CUST.CUST_SUPP,
                SCMP.CMPY_NAME CUST_SUPP_NAME,
                CUST.CUST_CODE,
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

    public function partners()
    {
        $query = "SELECT 
                PR.PRTNR_SEQ,
                PR.PRTNR_CMPY,
                CM.CMPY_NAME PRTNR_CMPY_NAME,
                PR.PRTNR_CODE,
                PR.PRTNR_NAME1,
                PR.PRTNR_TYPE,
                PT.PARTNER_TYPE_NAME PRTNR_TYPE_NAME,
                PR.PRTNR_SEQ || ' - ' || PR.PRTNR_CODE || ' - ' || PR.PRTNR_NAME1 PRTNR_DESC
            FROM PARTNER PR,
                GUI_COMPANYS CM,
                PARTNER_TYPES PT
            WHERE PR.PRTNR_TYPE = PT.PARTNER_TYPE_CODE
                AND PR.PRTNR_CMPY = CM.CMPY_CODE
                AND PRTNR_CMPY = :supplier
            ORDER BY PRTNR_SEQ";
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

    public function read()
    {
        $query = "SELECT 
                CCP.CCP_CMPY_CODE PARTNER_CMPY_CODE,
                CMP.CMPY_NAME PARTNER_CMPY_NAME,
                CCP.CCP_CUST_ACCT PARTNER_CUST_ACCT,
                CCM.CMPY_NAME PARTNER_CUST_NAME,
                CCP.CCP_PRTNR_SEQ PARTNER_SEQ,
                PR.PRTNR_CODE PARTNER_CODE,
                PR.PRTNR_NAME1,
                PR.PRTNR_NAME2,
                PR.PRTNR_NAME3,
                PR.PRTNR_NAME4,
                PR.PRTNR_NAME5,
                PR.PRTNR_TYPE,
                PT.PARTNER_TYPE_NAME PRTNR_TYPE_NAME,
                PR.PRTNR_ADDR,
                DL.DB_ADDR_TEXT PRTNR_ADDR_TEXT,
                PR.PRTNR_SEQ || ' - ' || PR.PRTNR_CODE || ' - ' || PR.PRTNR_NAME1 PRTNR_DESC
            FROM 
                CMPY_CUST_PRTNR CCP,
                GUI_COMPANYS CMP,
                CUSTOMER CST,
                COMPANYS CCM,
                PARTNER PR,
                PARTNER_TYPES PT,
                DB_ADDRESS DA,
                (
                    SELECT DB_ADDR_LINE_ID, LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO) AS DB_ADDR_TEXT
                    FROM DB_ADDRESS_LINE
                    GROUP BY DB_ADDR_LINE_ID
                ) DL
            WHERE CCP.CCP_PRTNR_SEQ = PR.PRTNR_SEQ
                AND PR.PRTNR_TYPE = PT.PARTNER_TYPE_CODE
                AND PR.PRTNR_ADDR = DA.DB_ADDRESS_KEY(+)
                AND DA.DB_ADDRESS_KEY = DL.DB_ADDR_LINE_ID(+)
                AND CCP.CCP_CMPY_CODE = CMP.CMPY_CODE
                AND CCP.CCP_CUST_ACCT = CST.CUST_ACCT(+)
                AND CST.CUST_CODE = CCM.CMPY_CODE(+)
                AND CCP.CCP_CMPY_CODE = PR.PRTNR_CMPY
            ORDER BY CCP_CMPY_CODE, CCP_PRTNR_SEQ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->partner_cust_acct)) {
            return true;
        }

        foreach ($this->partners as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            // write_log($site_code, __FILE__, __LINE__);
            $query = "INSERT INTO CMPY_CUST_PRTNR (
                CCP_CMPY_CODE,
                CCP_CUST_ACCT,
                CCP_PRTNR_SEQ)
            VALUES (
                :ccp_cmpy_code,
                :ccp_cust_acct,
                :ccp_prtnr_seq
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ccp_cmpy_code', $this->partner_cmpy_code);
            oci_bind_by_name($stmt, ':ccp_cust_acct', $this->partner_cust_acct);
            oci_bind_by_name($stmt, ':ccp_prtnr_seq', $value->partner_seq);
            
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            DELETE FROM CMPY_CUST_PRTNR
            WHERE CCP_CUST_ACCT = :ccp_cust_acct";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ccp_cust_acct', $this->partner_cust_acct);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    protected function retrieve_children_data()
    {
        $query = "SELECT CCP_CMPY_CODE,
                CCP_CUST_ACCT,
                CCP_PRTNR_SEQ,
                CCP_CMPY_CODE || ' - ' || CCP_PRTNR_SEQ SUPP_PARTNER
            FROM CMPY_CUST_PRTNR
            WHERE CCP_CUST_ACCT = :ccp_cust_acct";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ccp_cust_acct', $this->partner_cust_acct);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['SUPP_PARTNER']] = $flow_row;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $module = "partnership";
        // write_log(json_encode($old), __FILE__, __LINE__);
        foreach ($old as $tank_code => $alloc_item) {
            if (!isset($new[$tank_code])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("supplier:%s", $alloc_item['CCP_CMPY_CODE']);
                $jnl_data[3] = sprintf("partner seq:%s", $alloc_item['CCP_PRTNR_SEQ']);

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
        foreach ($new as $tank_code => $alloc_item) {
            if (!isset($old[$tank_code])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("supplier:%s", $alloc_item['CCP_CMPY_CODE']);
                $jnl_data[3] = sprintf("partner seq:%s", $alloc_item['CCP_PRTNR_SEQ']);

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

    public function check_existence()
    {
        return true;
    }
}