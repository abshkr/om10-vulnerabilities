<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once __DIR__ . '/../service/partnership_service.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class OpenOrder extends CommonClass
{
    protected $TABLE_NAME = 'CUST_ORDER';
    protected $VIEW_NAME = 'GUI_ORDERS';
    protected $primary_keys = array("order_no");

    protected $del_n_ins_children = false;   //Because OPRODMTD has child OPROD_CHILD

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

    public function read_all()
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

    public function read()
    {
        if (!isset($this->time_option)) {
            $this->time_option = "ORDER_ORD_TIME";
        }
        if (!isset($this->order_supp_code)) {
            $this->order_supp_code = "-1";
        }
        if (!isset($this->order_cust_acnt)) {
            $this->order_cust_acnt = "-1";
        }
        if (!isset($this->order_stat_id)) {
            $this->order_stat_id = -1;
        }
        if (!isset($this->order_cust_no)) {
            $this->order_cust_no = -1;
        }
        if (!isset($this->order_ref_code)) {
            $this->order_ref_code = "-1";
        }
        if (!isset($this->start_date)) {
            $this->start_date = "-1";
        }
        if (!isset($this->end_date)) {
            $this->end_date = "-1";
        }
        if (isset($this->order_cust_no) && $this->order_cust_no !== -1) {
            $this->start_date = "-1";
            $this->end_date = "-1";
        }
        if (isset($this->order_ref_code) && $this->order_ref_code !== "-1") {
            $this->start_date = "-1";
            $this->end_date = "-1";
        }
        if (isset($this->start_date) && $this->start_date === -1) {
            $this->start_date = "-1";
        }
        if (isset($this->end_date) && $this->end_date === -1) {
            $this->end_date = "-1";
        }
        $this->start_date = trim($this->start_date);
        $this->end_date = trim($this->end_date);

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . "
            WHERE 
                1 = 1
        ";

        //        AND ('-1' = :start_date OR " . $this->time_option . " > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')) 
        if ( $this->start_date === "-1") {
            $query .= "
                AND ('-1' = :start_date) 
            ";
        } else {
            $query .= "
                AND (" . $this->time_option . " > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')) 
            ";
        }
        //        AND ('-1' = :end_date OR " . $this->time_option . " < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS'))
        if ( $this->end_date === "-1") {
            $query .= "
                AND ('-1' = :end_date)
            ";
        } else {
            $query .= "
                AND (" . $this->time_option . " < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS'))
            ";
        }
        $query .= "
                AND ('-1' = :supplier OR ORDER_SUPP_CODE = :supplier)
                AND ('-1' = :customer OR ORDER_CUST_ACNT = :customer)
                AND (-1 = :status OR ORDER_STAT_ID = :status)
                AND (-1 = :order_cust_no OR ORDER_CUST_NO LIKE '%'||:order_cust_no||'%')
                AND ('-1' = :order_ref_code OR ORDER_REF_CODE LIKE '%'||:order_ref_code||'%')
            ORDER BY " . $this->time_option . " DESC
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_date', $this->start_date);
        oci_bind_by_name($stmt, ':end_date', $this->end_date);
        oci_bind_by_name($stmt, ':supplier', $this->order_supp_code);
        oci_bind_by_name($stmt, ':customer', $this->order_cust_acnt);
        oci_bind_by_name($stmt, ':status', $this->order_stat_id);
        oci_bind_by_name($stmt, ':order_cust_no', $this->order_cust_no);
        oci_bind_by_name($stmt, ':order_ref_code', $this->order_ref_code);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function search()
    {
        if (!isset($this->order_supp_code)) {
            $this->order_supp_code = "-1";
        }
        if (!isset($this->order_cust_acnt)) {
            $this->order_cust_acnt = "-1";
        }
        if (!isset($this->order_stat_id)) {
            $this->order_stat_id = -1;
        }
        if (!isset($this->order_cust_no)) {
            $this->order_cust_no = -1;
        }
        if (!isset($this->order_ref_code)) {
            $this->order_ref_code = "-1";
        }
        if (!isset($this->start_date)) {
            $this->start_date = "-1";
        }
        if (!isset($this->end_date)) {
            $this->end_date = "-1";
        }
        if (!isset($this->time_option)) {
            $this->time_option = "ORDER_ORD_TIME";
        }

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . "
            WHERE ('-1' = :supplier OR ORDER_SUPP_CODE = :supplier)
                AND ('-1' = :customer OR ORDER_CUST_ACNT = :customer)
                AND (-1 = :status OR ORDER_STAT_ID = :status)
                AND (-1 = :order_cust_no OR ORDER_CUST_NO LIKE '%'||:order_cust_no||'%')
                AND ('-1' = :order_ref_code OR ORDER_REF_CODE LIKE '%'||:order_ref_code||'%')
                AND ('-1' = :start_date OR " . $this->time_option . " > :start_date)
                AND ('-1' = :end_date OR " . $this->time_option . " < :end_date)
            ORDER BY ORDER_ORD_TIME DESC
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->order_supp_code);
        oci_bind_by_name($stmt, ':customer', $this->order_cust_acnt);
        oci_bind_by_name($stmt, ':status', $this->order_stat_id);
        oci_bind_by_name($stmt, ':order_cust_no', $this->order_cust_no);
        oci_bind_by_name($stmt, ':order_ref_code', $this->order_ref_code);
        oci_bind_by_name($stmt, ':start_date', $this->start_date);
        oci_bind_by_name($stmt, ':end_date', $this->end_date);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_by_time_and_customer()
    {
        if (!isset($this->time_option)) {
            $this->time_option = "ORDER_ORD_TIME";
        }
        if (!isset($this->order_supp_code)) {
            $this->order_supp_code = "-1";
        }
        if (!isset($this->order_cust_acnt)) {
            $this->order_cust_acnt = "-1";
        }
        if (!isset($this->start_date)) {
            $query = "
            SELECT * FROM " . $this->VIEW_NAME . "
            WHERE " . $this->time_option . " > SYSDATE - 7
                AND ('-1' = :supplier OR ORDER_SUPP_CODE = :supplier)
                AND ('-1' = :customer OR ORDER_CUST_ACNT = :customer)
            ORDER BY " . $this->time_option . " DESC";
//            WHERE " . $this->time_option . " > TO_CHAR(SYSDATE - 7, 'YYYY-MM-DD HH24:MI:SS')
            $stmt = oci_parse($this->conn, $query);
        
        } else {
            $query = "
                SELECT * FROM " . $this->VIEW_NAME . "
                WHERE " . $this->time_option . " > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS') 
                  AND " . $this->time_option . " < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS')
                  AND ('-1' = :supplier OR ORDER_SUPP_CODE = :supplier)
                  AND ('-1' = :customer OR ORDER_CUST_ACNT = :customer)
                  ORDER BY " . $this->time_option . " DESC";
//                WHERE " . $this->time_option . " > :start_date AND ORDER_ORD_TIME < :end_date
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        oci_bind_by_name($stmt, ':supplier', $this->order_supp_code);
        oci_bind_by_name($stmt, ':customer', $this->order_cust_acnt);
    
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    
    public function read_by_time_only()
    {
        if (!isset($this->start_date)) {
            $query = "
            SELECT * FROM " . $this->VIEW_NAME . "
            WHERE ORDER_ORD_TIME > SYSDATE - 7
            ORDER BY ORDER_ORD_TIME DESC";
//            WHERE ORDER_ORD_TIME > TO_CHAR(SYSDATE - 7, 'YYYY-MM-DD HH24:MI:SS')
            $stmt = oci_parse($this->conn, $query);
        
        } else {
            if (!isset($this->time_option)) {
                $this->time_option = "ORDER_ORD_TIME";
            }
            $query = "
                SELECT * FROM " . $this->VIEW_NAME . "
                WHERE " . $this->time_option . " > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS') 
                  AND " . $this->time_option . " < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS')
                ORDER BY " . $this->time_option . " DESC";
//                WHERE ORDER_ORD_TIME > :start_date AND ORDER_ORD_TIME < :end_date
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

    public function transport_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->transport_types();
    }

    public function order_status_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->order_status_types();
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

    public function site_code()
    {
        $query = "
            SELECT * FROM SITE
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
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
        $this->order_no = $this->next_order_no();
        $this->order_sys_no = $this->order_no;
        $this->order_stat = 0; // 0 -- NEW
        $this->order_approved = 'N';
        // write_log($this->order_no, __FILE__, __LINE__);
        $site_service = new SiteService($this->conn, $auto_commit = false);
        $site_code = $site_service->site_code();
        $this->ord_supply_point = $site_code;
        $this->order_terminal = $site_code;
    }

    protected function post_create()
    {
        $company_service = new CompanyService($this->conn, $this->order_supp_code, $auto_commit = false);
        $company_service->set_last_order($this->order_cust_no);
    }

	public function devide_text_into_array($txt, $step)
	{
		$arr = array();
		$len = strlen($txt);
		for($i=0; $i<$len; $i+=$step)
		{
			$msg = substr($txt, $i, $step);
			$arr[] = $msg;
		}
		return $arr;
	}

    protected function insert_order_instructions($order_id, $instructions)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($instructions)) {
            $items = $this->devide_text_into_array($instructions, 80);
            $lineno = 1;
            foreach ($items as $value) {
                // write_log(json_encode($value), __FILE__, __LINE__);
                $query = "
                    INSERT INTO ORD_INSTRUCT (
                        OI_ORDER_NO, 
                        OI_INSTR_COUNTER, 
                        OI_INSTRUCTION
                    )
                    VALUES (
                        :oi_order_no, 
                        :oi_counter, 
                        :oi_instruction
                    )
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':oi_order_no', $order_id);
                oci_bind_by_name($stmt, ':oi_counter', $lineno);
                oci_bind_by_name($stmt, ':oi_instruction', $value);

                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    throw new DatabaseException($e['message']);
                    return false;
                }

                $lineno += 1;
            }
        }

        return true;
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->order_items)) {
            $lineno = 1;
            foreach ($this->order_items as $value) {
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

        $this->insert_order_instructions($this->order_sys_no, $this->order_instructions);

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
            DELETE FROM OPROD_CHILD
            WHERE OPB_DAD_OPRODKEY = :oi_order_no";
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

    protected function update_children($old_children = null)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        foreach ($old_children as $product => $item_array) {
            $still_exist = false;
            foreach ($this->order_items as $item) {
                if ($item->oitem_prod_code == $product) {
                    $query = "UPDATE OPRODMTD
                        SET ORDER_PROD_QTY = :order_prod_qty,
                            ORDER_PROD_UNIT = :order_prod_unit
                        WHERE OSPROD_PRODCODE = :osprod_prodcode
                            AND OSPROD_PRODCMPY = :osprod_prodcmpy
                            AND ORDER_PROD_KEY = :order_prod_key";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':order_prod_key', $this->order_sys_no);
                    oci_bind_by_name($stmt, ':order_prod_unit', $item->oitem_prod_unit);
                    oci_bind_by_name($stmt, ':order_prod_qty', $item->oitem_prod_qty);
                    oci_bind_by_name($stmt, ':osprod_prodcmpy', $item->oitem_prod_cmpy);
                    oci_bind_by_name($stmt, ':osprod_prodcode', $item->oitem_prod_code);
        
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        return false;
                    }
                    $still_exist = true;
                    break;
                }
            }
            
            if ($still_exist == false) {
                $query = "DELETE FROM OPROD_CHILD 
                    WHERE OPB_DAD_OPRODKEY = :order_prod_key
                        AND OPB_DAD_OSPROD_PRODCODE = :osprod_prodcode";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':order_prod_key', $this->order_sys_no);
                oci_bind_by_name($stmt, ':osprod_prodcode', $product);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $query = "DELETE FROM OPRODMTD 
                    WHERE OSPROD_PRODCODE = :osprod_prodcode
                        AND ORDER_PROD_KEY = :order_prod_key";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':order_prod_key', $this->order_sys_no);
                oci_bind_by_name($stmt, ':osprod_prodcode', $product);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($this->order_items as $item) {
            if (isset($old_children[$item->oitem_prod_code])) {
                continue;
            }

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
                NULL
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':order_prod_qty', $item->oitem_prod_qty);
            oci_bind_by_name($stmt, ':order_prod_unit', $item->oitem_prod_unit);
            oci_bind_by_name($stmt, ':order_prod_key', $this->order_sys_no);
            oci_bind_by_name($stmt, ':osprod_prodcode', $item->oitem_prod_code);
            oci_bind_by_name($stmt, ':osprod_prodcmpy', $item->oitem_prod_cmpy);
            // oci_bind_by_name($stmt, ':oprd_line_itemno', $lineno);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        // update order instructions
        // delete it first
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
        // then insert new again
        $this->insert_order_instructions($this->order_sys_no, $this->order_instructions);

        return true;
    }

    private function next_order_no()
    {
        $query = "SELECT NVL(MAX(ORDER_NO), 0) + 1 NEXT_NO
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
        if (isset($this->page_state) && $this->page_state === 'create') {
            return $this->init_items();
        }
        else {
            return $this->order_items();
        }
    }

    public function order_items()
    {
        $query = "
        SELECT OITEM_ORDER_ID,
            NVL(OITEM_PROD_CODE, PROD_CODE) OITEM_PROD_CODE,
            NVL(OITEM_PROD_CMPY, PROD_CMPY) OITEM_PROD_CMPY,
            NVL(OITEM_PROD_NAME, PROD_NAME) OITEM_PROD_NAME,
            NVL(OITEM_DRWR_NAME, CMPY_NAME) OITEM_DRWR_NAME,
            NVL(OITEM_PROD_QTY, 0) OITEM_PROD_QTY,
            NVL(OITEM_PROD_UNIT, 5) OITEM_PROD_UNIT,
            NVL(OITEM_UNIT_NAME, 'l') OITEM_UNIT_NAME,
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
            FROM PRODUCTS, CUST_ORDER, COMPANYS, CUSTOMER
            WHERE PROD_CMPY = CUSTOMER.CUST_SUPP
                AND CUSTOMER.CUST_ACCT=CUST_ORDER.ORDER_CUST
                AND PROD_CMPY = CMPY_CODE
                AND CUST_ORDER.ORDER_NO = :order_sys_no
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

    public function init_items()
    {
        $query = "
            select
                NULL as OITEM_ORDER_ID
                , PROD_CODE as OITEM_PROD_CODE
                , PROD_CMPY as OITEM_PROD_CMPY
                , PROD_NAME as OITEM_PROD_NAME
                , NULL as OITEM_DRWR_NAME
                , 0 as OITEM_PROD_QTY
                , 5 as OITEM_PROD_UNIT
                , NULL as OITEM_UNIT_NAME
                , 'N' as OITEM_BY_PACKS 
                , 1 as OITEM_PACK_SIZE
                , 0 as OITEM_SCHD_QTY
                , 0 as OITEM_LOAD_QTY
                , 0 as OITEM_DELV_QTY
                , NULL as OITEM_EXEMPT_NO
                , NULL as OITEM_PADJ_CODE
                , NULL as OITEM_PADJ_NAME
                , NULL as OITEM_PRICE_TYPE
                , NULL as OITEM_PRICE_NAME
                , NULL as OITEM_PROD_PRICE
                , NULL as OITEM_PERIOD_NO
                , NULL as OITEM_LINE_NO
            from
                PRODUCTS
            where 
                (PROD_CMPY=:drawer_code) 
            order by
                PROD_CMPY, PROD_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':drawer_code', $this->order_drwr_code);
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

    public function order_instructions()
    {
        $query = "
            select
                OI_ORDER_NO             as OINST_ORDER
                , OI_INSTR_COUNTER         as OINST_COUNTER
                , OI_INSTRUCTION         as OINST_TEXT
            from
                ORD_INSTRUCT
            where 
                OI_ORDER_NO=:order_id  
                and (-1=:order_counter or OI_INSTR_COUNTER=:order_counter) 
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->order_sys_no) || $this->order_sys_no === 'undefined') {
            $this->order_sys_no = -1;
        }
        oci_bind_by_name($stmt, ':order_id', $this->order_sys_no);
        if (!isset($this->order_instruct_counter)) {
            $this->order_instruct_counter = -1;
        }
        oci_bind_by_name($stmt, ':order_counter', $this->order_instruct_counter);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function order_schedules()
    {
        $query = "
            select
                co.ORDER_NO as SCHD_ORDER_ID
                , sd.SHLS_SUPP as SCHD_SUPP_CODE
                , sp.CMPY_NAME as SCHD_SUPPLIER
                , sd.SHLS_TRIP_NO as SCHD_TRIP_NO
                , sd.SHL_TANKER as SCHD_TNKR_CODE
                , tk.TNKR_NAME as SCHD_TANKER
                , tk.TNKR_CARRIER as SCHD_CARR_CODE
                , ca.CMPY_NAME as SCHD_CARRIER
                , sd.SHLS_CALDATE as SCHD_DATE
                , NVL (sd.STATS, 'F') as SCHD_STATUS_CODE
                , DECODE(st.STATUS_TEXT, NULL, 'UNKNOWN', st.STATUS_TEXT) as SCHD_STATUS
            from 
                CUST_ORDER co
                , ORD_SCHEDULE os
                , SCHEDULE sd
                , COMPANYS sp
                , TANKERS tk
                , COMPANYS ca
                , SCHEDULE_STATUS_SHORT_LOOKUP st
            where 
                co.ORDER_NO = os.OS_ORDER_NO
                and os.OS_SHL_SHLSTRIP =  sd.SHLS_TRIP_NO
                and os.OS_SHL_SHLSSUPP =  sd.SHLS_SUPP
                and sd.SHLS_SUPP = sp.CMPY_CODE
                and sd.SHL_TANKER = tk.TNKR_CODE
                and tk.TNKR_CARRIER = ca.CMPY_CODE
                and NVL (sd.STATS, 'F') = st.STATUS_CODE(+)
                and co.ORDER_NO=:order_id 
            order by
                sd.SHLS_SUPP, sd.SHLS_TRIP_NO
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->order_sys_no) || $this->order_sys_no === 'undefined') {
            $this->order_sys_no = -1;
        }
        oci_bind_by_name($stmt, ':order_id', $this->order_sys_no);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    private function order_assign_mode()
    {
        $query = "
          select count(*) as CNT
          from SITE_CONFIG 
          where CONFIG_KEY='OO_TO_ONE_TRIP' 
            and CONFIG_VALUE='S'
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return (int)$row['CNT'];
    }

    public function order_item_schedules()
    {
        $query = "";
        $singleOO = $this->order_assign_mode();
        
        //write_log("singleOO:" . $singleOO, __FILE__, __LINE__, LogLevel::ERROR);
		
		if ( $singleOO === 1 ) { // assign single order to one trip compartment
            $query = "
                select 
                    sc.SCHD_ORDER as SCHD_ORDER_ID 
                    , sc.SCHDSPEC_SHLSSUPP as SCHD_SUPP_CODE 
                    , sp.CMPY_NAME as SCHD_SUPPLIER 
                    , sc.SCHDSPEC_SHLSTRIP as SCHD_TRIP_NO 
                    , sc.SCHD_COMP_ID as SCHD_CMPT_NO 
                    , sc.SCHDPROD_PRODCODE as SCHD_PROD_CODE 
                    , sc.SCHDPROD_PRODCMPY as SCHD_PROD_CMPY  
                    , pd.PROD_NAME as SCHD_PROD_NAME 
                    , sc.SCHD_SPECQTY as SCHD_PROD_QTY 
                    , sc.SCHD_UNITS as SCHD_PROD_UNIT 
                    , un.DESCRIPTION as SCHD_UNIT_NAME 
                from 
                    SPECDETS sc 
                    , COMPANYS sp 
                    , PRODUCTS pd 
                    , UNIT_SCALE_VW un 
                where 
                    sc.SCHD_ORDER = :order_id 
                    and sc.SCHDPROD_PRODCODE = :order_prod_code 
                    and sc.SCHDPROD_PRODCMPY = :order_prod_cmpy 
                    and sc.SCHDSPEC_SHLSSUPP = sp.CMPY_CODE 
                    and sc.SCHDPROD_PRODCODE = pd.PROD_CODE  
                    and sc.SCHDPROD_PRODCMPY = pd.PROD_CMPY  
                    and sc.SCHD_UNITS = un.UNIT_ID 
                order by
                    sc.SCHDSPEC_SHLSSUPP, sc.SCHDSPEC_SHLSTRIP, sc.SCHD_COMP_ID 
            ";
        }
        else { // assign multiple order to one trip compartment
            $query = "
                select 
                    so.SCHORDER_ORD as SCHD_ORDER_ID 
                    , so.SCHO_DAD_SCHDSPEC_SHLSSUPP as SCHD_SUPP_CODE 
                    , sp.CMPY_NAME as SCHD_SUPPLIER 
                    , so.SCHO_DAD_SCHDSPEC_SHLSTRIP as SCHD_TRIP_NO 
                    , so.SCHO_DAD_SCHDCMPT as SCHD_CMPT_NO 
                    , sc.SCHDPROD_PRODCODE as SCHD_PROD_CODE 
                    , sc.SCHDPROD_PRODCMPY as SCHD_PROD_CMPY  
                    , pd.PROD_NAME as SCHD_PROD_NAME 
                    , so.SCHORDER_QTY as SCHD_PROD_QTY 
                    , sc.SCHD_UNITS as SCHD_PROD_UNIT 
                    , un.DESCRIPTION as SCHD_UNIT_NAME 
                from 
                    SPECDETS sc 
                    , SPEC_ORDERS so
                    , COMPANYS sp 
                    , PRODUCTS pd 
                    , UNIT_SCALE_VW un 
                where 
                    so.SCHORDER_ORD = :order_id 
                    and sc.SCHDPROD_PRODCODE = :order_prod_code 
                    and sc.SCHDPROD_PRODCMPY = :order_prod_cmpy 
                    and sc.SCHDSPEC_SHLSSUPP = sp.CMPY_CODE 
                    and sc.SCHDPROD_PRODCODE = pd.PROD_CODE  
                    and sc.SCHDPROD_PRODCMPY = pd.PROD_CMPY  
                    and sc.SCHD_UNITS = un.UNIT_ID 
                    and sc.SCHDSPEC_SHLSSUPP = so.SCHO_DAD_SCHDSPEC_SHLSSUPP 
                    and sc.SCHDSPEC_SHLSTRIP = so.SCHO_DAD_SCHDSPEC_SHLSTRIP 
                    and sc.SCHD_COMP_ID = so.SCHO_DAD_SCHDCMPT 
                order by 
                    so.SCHO_DAD_SCHDSPEC_SHLSSUPP, so.SCHO_DAD_SCHDSPEC_SHLSTRIP, so.SCHO_DAD_SCHDCMPT 
            ";
        }
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_id', $this->oitem_order_id);
        oci_bind_by_name($stmt, ':order_prod_code', $this->oitem_prod_code);
        oci_bind_by_name($stmt, ':order_prod_cmpy', $this->oitem_prod_cmpy);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
