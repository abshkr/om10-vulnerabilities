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

    // public $check_exists = false;
    protected $check_mandatory = false;

    protected $primary_keys = array(
        "ccp_cmpy_code",
        "ccp_cust_acct",
        "ccp_prtnr_seq"
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

    //Current partnerships of a supplier company
    public function parterships()
    {
        // write_log(json_encode($this), __FILE__, __LINE__);
        $query = "SELECT PRTNR_SEQ PARTNER_SEQ, 
            PRTNR_CMPY PARTNER_CMPY, 
            CMPY_NAME PARTNER_CMPY_NAME, 
            PRTNR_CODE, 
            PRTNR_NAME1, 
            PRTNR_TYPE, 
            PARTNER_TYPE_NAME PRTNR_TYPE_NAME,
            PRTNR_SEQ || ' - ' || PRTNR_CODE || ' - ' || PRTNR_NAME1 PRTNR_DESC
        FROM CMPY_CUST_PRTNR, PARTNER, GUI_COMPANYS, PARTNER_TYPES
        WHERE PARTNER.PRTNR_CMPY = CMPY_CUST_PRTNR.CCP_CMPY_CODE
            AND PRTNR_SEQ = CMPY_CUST_PRTNR.CCP_PRTNR_SEQ
            AND PRTNR_CMPY = GUI_COMPANYS.CMPY_CODE
            AND PRTNR_TYPE = PARTNER_TYPES.PARTNER_TYPE_CODE
            AND CMPY_CUST_PRTNR.CCP_CMPY_CODE = :supplier ";

        if (isset($this->partner_cust_acct) && $this->partner_cust_acct !== "") {
            $query .= " AND CCP_CUST_ACCT = :ccp_cust_acct ";
        } else {
            $query .= " AND CCP_CUST_ACCT IS NULL ";
        }
        $query .= " ORDER BY PRTNR_SEQ";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->supplier)) {
            $this->supplier = '-1';
        }
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (isset($this->partner_cust_acct) && $this->partner_cust_acct !== "") {
            oci_bind_by_name($stmt, ':ccp_cust_acct', $this->partner_cust_acct);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function partners()
    {
        $query = "SELECT PR.PRTNR_SEQ PARTNER_SEQ,
                    PR.PRTNR_CMPY PARTNER_CMPY,
                    CM.CMPY_NAME PARTNER_CMPY_NAME,
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
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    // public function partners()
    // {
    //     $query = "SELECT ALL_PARTNERS.*, 
    //             DECODE(CMPY_CUST_PRTNR.CCP_PRTNR_SEQ, NULL, 'N', 'Y') SELECTED
    //         FROM
    //         (
    //             SELECT PR.PRTNR_SEQ PARTNER_SEQ,
    //                 PR.PRTNR_CMPY PARTNER_CMPY,
    //                 CM.CMPY_NAME PARTNER_CMPY_NAME,
    //                 PR.PRTNR_CODE,
    //                 PR.PRTNR_NAME1,
    //                 PR.PRTNR_TYPE,
    //                 PT.PARTNER_TYPE_NAME PRTNR_TYPE_NAME,
    //                 PR.PRTNR_SEQ || ' - ' || PR.PRTNR_CODE || ' - ' || PR.PRTNR_NAME1 PRTNR_DESC
    //             FROM PARTNER PR,
    //                 GUI_COMPANYS CM,
    //                 PARTNER_TYPES PT
    //             WHERE PR.PRTNR_TYPE = PT.PARTNER_TYPE_CODE
    //                 AND PR.PRTNR_CMPY = CM.CMPY_CODE
    //                 AND PRTNR_CMPY = :supplier) ALL_PARTNERS, CMPY_CUST_PRTNR
    //             WHERE ALL_PARTNERS.PARTNER_CMPY = CMPY_CUST_PRTNR.CCP_CMPY_CODE(+)
    //                 AND ALL_PARTNERS.PARTNER_SEQ = CMPY_CUST_PRTNR.CCP_PRTNR_SEQ(+)
    //             ORDER BY PARTNER_SEQ";
    //     $stmt = oci_parse($this->conn, $query);
    //     if (!isset($this->supplier)) {
    //         $this->supplier = '-1';
    //     }
    //     oci_bind_by_name($stmt, ':supplier', $this->supplier);
    //     if (oci_execute($stmt, $this->commit_mode)) {
    //         return $stmt;
    //     } else {
    //         return null;
    //     }
    // }

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

    // public function pre_create()
    // {
    //     return $this->pre_update();
    // }

    // public function pre_update()
    // {
    //     if (!isset($this->partner_cust_acct) || $this->partner_cust_acct === "") {
    //         $this->partner_cust_acct = '-1';
    //     };
    // }

    // public function read_hook(&$hook_item)
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);
        
    //     $result = array();
    //     $hook_item['peers'] = $result;
    //     if (!isset($hook_item['partner_cust_acct']) || $hook_item['partner_cust_acct'] === "") {
    //         write_log("hook_item does not have partner_cust_acct, cannot do read_hook",
    //             __FILE__, __LINE__);
    //         // return;
    //         $query = "SELECT
    //             CCP_PRTNR_SEQ, 
    //             PR.PRTNR_CODE PARTNER_CODE,
    //             PR.PRTNR_NAME1,
    //             PR.PRTNR_NAME2,
    //             PR.PRTNR_NAME3,
    //             PR.PRTNR_SEQ || ' - ' || PR.PRTNR_CODE || ' - ' || PR.PRTNR_NAME1 PRTNR_DESC
    //         FROM CMPY_CUST_PRTNR CCP, PARTNER PR
    //         WHERE CCP.CCP_PRTNR_SEQ = PR.PRTNR_SEQ
    //             AND CCP_CMPY_CODE = :partner_cmpy_code
    //             AND CCP_CUST_ACCT IS NULL";
    //         $stmt = oci_parse($this->conn, $query);
    //         oci_bind_by_name($stmt, ':partner_cmpy_code', $hook_item['partner_cmpy_code']);
    //     } else {
    //         $query = "SELECT CCP_PRTNR_SEQ, 
    //                 PR.PRTNR_CODE PARTNER_CODE,
    //                 PR.PRTNR_NAME1,
    //                 PR.PRTNR_NAME2,
    //                 PR.PRTNR_NAME3,
    //                 PR.PRTNR_SEQ || ' - ' || PR.PRTNR_CODE || ' - ' || PR.PRTNR_NAME1 PRTNR_DESC
    //             FROM CMPY_CUST_PRTNR CCP, PARTNER PR
    //             WHERE CCP.CCP_PRTNR_SEQ = PR.PRTNR_SEQ
    //                 AND CCP_CMPY_CODE = :partner_cmpy_code
    //                 AND CCP_CUST_ACCT = :partner_cust_acct";
    //         $stmt = oci_parse($this->conn, $query);
    //         oci_bind_by_name($stmt, ':partner_cmpy_code', $hook_item['partner_cmpy_code']);
    //         oci_bind_by_name($stmt, ':partner_cust_acct', $hook_item['partner_cust_acct']);
    //     }
        
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
    //     $hook_item['peers'] = $result;
    // }
 
    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        // if (!isset($this->partner_cust_acct)) {
        //     return true;
        // }

        foreach ($this->partners as $value) {
            write_log(json_encode($value), __FILE__, __LINE__);
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
            
            if (!oci_execute($stmt, $this->commit_mode)) {
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

        $partner_cust_acct = $this->partner_cust_acct;
        if (!isset($partner_cust_acct) || $partner_cust_acct === "") {
            $partner_cust_acct = '-1';
        };

        $query = "
            DELETE FROM CMPY_CUST_PRTNR
            WHERE CCP_CMPY_CODE = :partner_cmpy_code
                AND (CCP_CUST_ACCT = :ccp_cust_acct OR :ccp_cust_acct = '-1')";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':partner_cmpy_code', $this->partner_cmpy_code);
        oci_bind_by_name($stmt, ':ccp_cust_acct', $partner_cust_acct);
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
        $partner_cust_acct = $this->partner_cust_acct;
        if (!isset($partner_cust_acct) || $partner_cust_acct === "") {
            $partner_cust_acct = '-1';
        };

        $query = "SELECT CCP_CMPY_CODE,
                CCP_CUST_ACCT,
                CCP_PRTNR_SEQ,
                CCP_CMPY_CODE || ' - ' || CCP_PRTNR_SEQ SUPP_PARTNER
            FROM CMPY_CUST_PRTNR
            WHERE CCP_CMPY_CODE = :partner_cmpy_code
                AND (CCP_CUST_ACCT = :ccp_cust_acct OR :ccp_cust_acct = '-1')";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':partner_cmpy_code', $this->partner_cmpy_code);
        oci_bind_by_name($stmt, ':ccp_cust_acct', $partner_cust_acct);
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
        write_log(json_encode($this), __FILE__, __LINE__);
        $query = "SELECT COUNT(*) CN
            FROM CMPY_CUST_PRTNR 
            WHERE CMPY_CUST_PRTNR.CCP_CMPY_CODE = :supplier ";

        if (isset($this->partner_cust_acct) && $this->partner_cust_acct !== "") {
            $query .= " AND CCP_CUST_ACCT = :ccp_cust_acct ";
        } else {
            $query .= " AND CCP_CUST_ACCT IS NULL ";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->partner_cmpy_code);
        if (isset($this->partner_cust_acct) && $this->partner_cust_acct !== "") {
            oci_bind_by_name($stmt, ':ccp_cust_acct', $this->partner_cust_acct);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['CN'] > 0;
    }

    public function create()
    {
        return $this->insert_children();
    }
}