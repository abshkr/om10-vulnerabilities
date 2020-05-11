<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class OpenOrder extends CommonClass
{
    protected $TABLE_NAME = 'CUST_ORDER';
    protected $VIEW_NAME = 'GUI_ORDERS';
    protected $primary_keys = array("order_no");
    protected $table_view_map = array(
        "ORDER_NO" => "ORDER_SYS_NO",
        "ORDER_CUST_ORDNO" => "ORDER_CUST_NO",
        "ORDER_CUST" => "ORDER_CUST_ACNT",
        "CUST_CODE" => "ORDER_CUST_CODE",
        "CUST_SUPP" => "ORDER_SUPP_CODE",
        "ORDDATE" => "ORDER_ORD_TIME",
        "ORDER_DELV_MTHD" => "ORDER_TTYP_ID",
        "ORDER_STAT" => "ORDER_STAT_ID",
        "ORDER_SALE_TYPE" => "ORDER_STYP_ID",
        "ORDER_DLV_CODE" => "ORDER_DLOC_CODE",
        "ORDER_REF_CODE" => "ORDER_REF_CODE",
        "DELDATE" => "ORDER_DLV_TIME",
        "ORDER_EXP_DATE" => "ORDER_EXP_TIME",
        "ORDER_DRAWER" => "ORDER_DRWR_CODE",
        "ORDER_CARRIER" => "ORDER_CARR_CODE",
        "ORD_TRANSFER_TYP" => "ORDER_TRSF_TYPE",
        "ORD_PAY_DESC" => "ORDER_PAY_NOTE",
        "ORD_PSN_CODE" => "ORDER_PSNL_CODE",
        "ORDER_SOURCE" => "ORDER_SRC_ID",
        "ORD_SOLD_TO_NUM" => "ORDER_SOLD_TO_NUM",
        "ORD_SHIP_TO_NUM" => "ORDER_SHIP_TO_NUM",
        "ORD_SUPPLY_POINT" => "ORDER_STRM_CODE",
        "ORDER_TERMINAL" => "ORDER_DTRM_CODE",
    );
    public $NUMBER_FIELDS = array(
        "ORDER_SYS_NO",
        "ORDER_CUST_NO",
        "OITEM_PROD_QTY",
        "OITEM_PROD_UNIT",
        "OITEM_LOAD_QTY",
        "OITEM_SCHD_QTY",
        "OITEM_DELV_QTY",
    );
    public $BOOLEAN_FIELDS = array(
        "ORDER_APPROVED" => "Y",
    );

    public function read()
    {
        $query = "
            SELECT *
            FROM " . $this->VIEW_NAME . "
            ORDER BY ORDER_SYS_NO";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function transport_types()
    {
        $query = "
            SELECT *
            FROM TRANSPORT_TYP
            ORDER BY TRANSPORT_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function delv_locations()
    {
        $query = "
            SELECT DLV_CODE DELV_CODE, DLV_NAME DELV_NAME, DLV_CODE||' - '||DLV_NAME DELV_DESC
            FROM DELV_LOCATION
            ORDER BY DLV_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function sold_to()
    {
        return $this->partners('AG');
    }

    public function ship_to()
    {
        return $this->partners('WE');
    }

    public function next_cust_order()
    {
        $company_service = new CompanyService($this->conn, $this->order_supp_code, $auto_commit = true);
        $new_cust_order = $company_service->next_cust_ordno();

        $result = array();
        $result["records"] = array();
        $item = array(
            "order_cust_no" => $new_cust_order,
        );

        array_push($result["records"], $item);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function pre_create()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        $this->order_sys_no = $this->next_order_no();
        $this->order_stat_id = 0; // 0 -- NEW
        $this->order_approved = 'N';
        // write_log($this->order_no, __FILE__, __LINE__);
        $site_service = new SiteService($this->conn, $auto_commit = false);
        $site_code = $site_service->site_code();
        $this->order_strm_code = $site_code;
        $this->order_dtrm_code = $site_code;
    }

    protected function post_create()
    {
        $company_service = new CompanyService($this->conn, $this->order_supp_code, $auto_commit = false);
        $company_service->set_last_order($this->order_cust_no);
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->items)) {
            $lineno = 1;
            foreach ($this->items as $value) {
                // write_log(json_encode($value), __FILE__, __LINE__);
                $query = "INSERT INTO OPRODMTD (
                    OPROD_SCHEDULED,
                    OPROD_LOADED,
                    OPROD_DELIVERED,
                    OPROD_BY_PACKS,
                    OPRD_PACK_SIZE,
                    ORDER_PROD_QTY,
                    ORDER_PROD_UNIT,
                    PROD_PRICE_TYPE,
                    OPROD_PRICE,
                    ORDER_PROD_KEY,
                    OSPROD_PRODCODE,
                    OSPROD_PRODCMPY,
                    OPROD_CH_NO,
                    OPRD_LINE_ITEMNO)
                VALUES (
                    0,
                    0,
                    0,
                    'N',
                    1,
                    :order_prod_qty,
                    :order_prod_unit,
                    0,
                    0,
                    :order_prod_key,
                    :osprod_prodcode,
                    :osprod_prodcmpy,
                    0,
                    :oprd_line_itemno
                )";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':order_prod_qty', $value->oitem_prod_qty);
                oci_bind_by_name($stmt, ':order_prod_unit', $value->oitem_prod_unit);
                oci_bind_by_name($stmt, ':order_prod_key', $this->order_sys_no);
                oci_bind_by_name($stmt, ':osprod_prodcode', $value->oitem_prod_code);
                oci_bind_by_name($stmt, ':osprod_prodcmpy', $value->oitem_prod_cmpy);
                oci_bind_by_name($stmt, ':oprd_line_itemno', $lineno);

                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    throw new DatabaseException($e['message']);
                    return false;
                }

                $lineno += 1;
            }
        }

        if (isset($this->order_instruction)) {
            $query = "INSERT INTO ORD_INSTRUCT (OI_ORDER_NO, OI_INSTR_COUNTER, OI_INSTRUCTION)
                VALUES (:oi_order_no, 1, :oi_instruction)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':oi_order_no', $this->order_sys_no);
            oci_bind_by_name($stmt, ':oi_instruction', $this->order_instruction);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                throw new DatabaseException($e['message']);
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
            DELETE FROM ORD_INSTRUCT
            WHERE OI_ORDER_NO = :oi_order_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':oi_order_no', $this->order_sys_no);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        $query = "
            DELETE FROM OPRODMTD
            WHERE ORDER_PROD_KEY = :oi_order_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':oi_order_no', $this->order_sys_no);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    private function next_order_no()
    {
        $query = "SELECT MAX(ORDER_NO) + 1 NEXT_NO
            FROM CUST_ORDER";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['NEXT_NO'];
    }

    private function partners($partner_type)
    {
        $query = "
        SELECT PRTNR_SEQ,
            PRTNR_TYPE,
            PARTNER_TYPE_NAME,
            PRTNR_CODE,
            PRTNR_NAME1,
            PRTNR_NAME2,
            PRTNR_NAME3,
            PRTNR_NAME4,
            PRTNR_NAME5,
            PRTNR_ADDR,
            DB_ADDR_TEXT,
            PRTNR_CMPY,
            PART_CMPY.CMPY_NAME PARTNER_CMPY_NAME,
            CUST_CODE,
            CUST_CMPY.CMPY_NAME CUST_CMPY_NAME
        FROM PARTNER, PARTNER_TYPES, COMPANYS PART_CMPY, CMPY_CUST_PRTNR, CUSTOMER, COMPANYS CUST_CMPY,
            (SELECT DB_ADDR_LINE_ID, LISTAGG(DB_ADDR_LINE, ', ')
            WITHIN GROUP (ORDER BY DB_ADDRLINE_NO) AS DB_ADDR_TEXT
            FROM DB_ADDRESS_LINE
            GROUP BY DB_ADDR_LINE_ID) DB_ADDRESS
        WHERE PRTNR_TYPE = PARTNER_TYPE_CODE
            AND PRTNR_TYPE = :partner_type
            AND PRTNR_ADDR = DB_ADDRESS.DB_ADDR_LINE_ID(+)
            AND PART_CMPY.CMPY_CODE = PRTNR_CMPY
            AND PRTNR_CMPY = :supplier
            AND CMPY_CUST_PRTNR.CCP_CMPY_CODE = PRTNR_CMPY AND CCP_CUST_ACCT = CUSTOMER.CUST_ACCT(+)
            AND CUSTOMER.CUST_CODE = CUST_CMPY.CMPY_CODE(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->order_supp_code);
        oci_bind_by_name($stmt, ':partner_type', $partner_type);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function approve()
    {
        $query = "
            SELECT NVL(ORDER_APPROVED, 'N') ORDER_APPROVED
            FROM CUST_ORDER
            WHERE ORDER_NO = :order_sys_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_sys_no', $this->order_sys_no);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $old = $row2['ORDER_APPROVED'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "
            UPDATE CUST_ORDER
            SET ORDER_APPROVED = 'Y',
                ORDER_APPR_NO = CONCAT('AP', ORDER_CUST_ORDNO),
                ORD_AP_DATE = SYSDATE
            WHERE ORDER_NO = :order_sys_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_sys_no', $this->order_sys_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        if ($old == 'N') {
            $journal = new Journal($this->conn);
            $jnl_data[0] = sprintf("Open order %d approved by %s", $this->order_sys_no, Utilities::getCurrPsn());

            if (!$journal->jnlLogEvent(
                Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        return true;
    }

    public function unapprove()
    {
        $query = "
            SELECT NVL(ORDER_APPROVED, 'N') ORDER_APPROVED
            FROM CUST_ORDER
            WHERE ORDER_NO = :order_sys_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_sys_no', $this->order_sys_no);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $old = $row2['ORDER_APPROVED'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "
            UPDATE CUST_ORDER
            SET ORDER_APPROVED = 'N'
            WHERE ORDER_NO = :order_sys_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_sys_no', $this->order_sys_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        if ($old == 'Y') {
            $journal = new Journal($this->conn);
            $jnl_data[0] = sprintf("Open order %d unapproved by %s", $this->order_sys_no, Utilities::getCurrPsn());

            if (!$journal->jnlLogEvent(
                Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        return true;
    }

    public function items()
    {
        $query = "
        SELECT OITEM_ORDER_ID,
            NVL(OITEM_PROD_CODE, PROD_CODE) OITEM_PROD_CODE,
            NVL(OITEM_PROD_CMPY, PROD_CMPY) OITEM_PROD_CMPY,
            NVL(OITEM_PROD_NAME, PROD_NAME) OITEM_PROD_NAME,
            NVL(OITEM_DRWR_NAME, CMPY_NAME) OITEM_DRWR_NAME,
            NVL(OITEM_PROD_QTY, 0) OITEM_PROD_QTY,
            OITEM_PROD_UNIT,
            OITEM_UNIT_NAME,
            OITEM_BY_PACKS,
            OITEM_PACK_SIZE,
            NVL(OITEM_SCHD_QTY, 0) OITEM_SCHD_QTY,
            NVL(OITEM_LOAD_QTY, 0) OITEM_LOAD_QTY,
            NVL(OITEM_DELV_QTY, 0) OITEM_DELV_QTY,
            OITEM_EXEMPT_NO,
            OITEM_PADJ_CODE,
            OITEM_PADJ_NAME,
            OITEM_PRICE_TYPE,
            OITEM_PRICE_NAME,
            OITEM_PROD_PRICE,
            OITEM_PERIOD_NO,
            OITEM_LINE_NO
        FROM
            (
            SELECT PROD_CODE,
                PROD_CMPY,
                PROD_NAME,
                CMPY_NAME
            FROM PRODUCTS, CUST_ORDER, COMPANYS
            WHERE PROD_CMPY = CUST_ORDER.ORDER_DRAWER
                AND PROD_CMPY = CMPY_CODE
                AND ORDER_NO = :order_sys_no
            ) ALL_PRODS,
            GUI_ORDER_ITEMS
        WHERE ALL_PRODS.PROD_CODE = GUI_ORDER_ITEMS.OITEM_PROD_CODE(+)
            AND ALL_PRODS.PROD_CMPY = GUI_ORDER_ITEMS.OITEM_PROD_CMPY(+)
            AND :order_sys_no = GUI_ORDER_ITEMS.OITEM_ORDER_ID(+)
        ORDER BY OITEM_PROD_QTY DESC, PROD_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_sys_no', $this->order_sys_no);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM GUI_ORDER_ITEMS
            WHERE OITEM_ORDER_ID = :oitem_order_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':oitem_order_id', $this->order_sys_no);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['OITEM_PROD_CODE']] = $flow_row;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }
}
