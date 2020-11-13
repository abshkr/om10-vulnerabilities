<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';


class Customer extends CommonClass
{
    protected $TABLE_NAME = 'CUSTOMER';
    
    protected $table_view_map = array(
        "CUST_ACCT" => "CUST_ACCOUNT",
        "CUST_CODE" => "CUST_CMPY_CODE",
        "CUST_SUPP" => "CUST_SUPP_CODE",
        "CUST_ADDR" => "CUST_ADDR_CODE",
        "CUST_CONTACT" => "CUST_CONTACT",
        "CUST_PHONE_NO" => "CUST_PHONE_NO",
        "CUST_CATEGORY" => "CUST_CTGR_CODE",
        "CUST_SALE_TYPE" => "CUST_SALETYPE_ID",
        "CUST_INV_TYPE" => "CUST_INVTYPE_ID",
        "CUST_VARIABLE_PR" => "CUST_PRICETYPE_ID",
        "CUST_DELIV_POINT" => "CUST_DELV_CODE",
        "CUST_CRD_LIM" => "CUST_CRD_LIMIT",
        "CUST_CRD_TERMS" => "CUST_CRD_TERMS",
        "CUST_CRD_DAYS" => "CUST_CRD_DAYS",
        "CUST_ORD_DAYS" => "CUST_ORD_DAYS",
        "CUST_BALANCE" => "CUST_BALANCE",
        "CUST_APPR_TOTAL" => "CUST_APPR_TOTAL",
    );

    public $BOOLEAN_FIELDS = array(
        "CUST_CMPY_FLAG" => "Y",
        "CUST_SUPP_FLAG" => "Y",
    );

    public $NUMBER_FIELDS = array(
        "CUST_CRD_LIMIT",
        "CUST_BALANCE",
        "CUST_APPR_TOTAL",
        "CUST_ORD_DAYS",
        "CUST_CRD_DAYS",
        "CUST_ORDER_COUNT",
        "CUST_DLOC_COUNT",
    );

    public function delivery_locations()
    {
        $query = "
            select 
                DLV_CODE as DELV_CODE, 
                DLV_NAME as DELV_NAME, 
                DLV_CODE||' - '||DLV_NAME as DELV_DESC, 
                DLV_GRID as DELV_GRID 
            from 
                DELV_LOCATION
            ORDER BY DLV_CODE
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pricing_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->pricing_types();
    }

    public function invoice_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->invoice_types();
    }

    public function sale_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->sale_types();
    }

    public function terms_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->terms_types();
    }

    public function account_numbers()
    {
        $query = "
            SELECT CUST_ACCT FROM CUSTOMER
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

    public function check_customer_account()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM CUSTOMER WHERE CUST_ACCT=:acct_no
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':acct_no', $this->cust_account);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_customer_company()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM CUSTOMER WHERE CUST_SUPP=:supp_code AND CUST_CODE=:cmpy_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supp_code', $this->cust_supp_code);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cust_cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function customer_products()
    {
        $query = "SELECT CUSTOMER_PRODUCT.CUST_ACCT,
                CUSTOMER.CUST_CODE CUST_CODE,
                PRODUCTS.PROD_CODE,
                PRODUCTS.PROD_CMPY,
                PRODUCTS.PROD_NAME,
                CUSTOMER.CUST_SUPP SUPPLIER_CODE,
                SUPP.CMPY_NAME SUPPLIER_NAME,
                CCMP.CMPY_NAME CUSTOMER_NAME
            FROM CUSTOMER_PRODUCT, CUSTOMER, PRODUCTS, COMPANYS SUPP, COMPANYS CCMP
            WHERE CUSTOMER.CUST_SUPP = SUPP.CMPY_CODE
                AND CUSTOMER.CUST_CODE = CCMP.CMPY_CODE
                AND CUSTOMER_PRODUCT.CUST_ACCT = CUSTOMER.CUST_ACCT
                AND CUSTOMER_PRODUCT.PROD_CODE = PRODUCTS.PROD_CODE
                AND CUSTOMER_PRODUCT.PROD_CMPY = PRODUCTS.PROD_CMPY
            ORDER BY PRODUCTS.PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function supplier_products()
    {
        $query = "
            SELECT 
                PROD_CODE, 
                PROD_NAME,
                CMPY_CODE PROD_CMPY,
                CMPY_CODE SUPPLIER_CODE,
                CMPY_NAME SUPPLIER_NAME
            FROM PRODUCTS, COMPANYS
            WHERE PROD_CMPY = :cmpy_code
                AND CMPY_CODE = :cmpy_code
            ORDER BY PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->supplier_code);
        
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
        $query = "
        SELECT 
            CU.CUST_ACCT CUST_ACCOUNT,
            CU.CUST_CODE CUST_CMPY_CODE,
            CC.CUSTOMER CUST_CMPY_FLAG,
            CC.CMPY_NAME CUST_CMPY_NAME,
            CU.CUST_SUPP CUST_SUPP_CODE,
            SC.SUPPLIER CUST_SUPP_FLAG,
            SC.CMPY_NAME CUST_SUPP_NAME,
            CU.CUST_CONTACT CUST_CONTACT,
            CU.CUST_PHONE_NO CUST_PHONE_NO,
            CU.CUST_CRD_LIM CUST_CRD_LIMIT,
            CU.CUST_BALANCE CUST_BALANCE,
            CU.CUST_APPR_TOTAL CUST_APPR_TOTAL,
            CU.CUST_ORD_DAYS CUST_ORD_DAYS,
            CU.CUST_CRD_DAYS CUST_CRD_DAYS,
            CU.CUST_VARIABLE_PR CUST_PRICETYPE_ID,
            PT.CUSTOMER_PRICE_NAME CUST_PRICETYPE_NAME,
            CU.CUST_ADDR CUST_ADDR_CODE,
            NVL(DL.DB_ADDR_TEXT, ' ') CUST_ADDR_TEXT,
            DECODE(DA.DB_ADDRESS_KEY, NULL, ' ', DA.DB_ADDRESS_KEY||'['||NVL(DL.DB_ADDR_TEXT, ' ')||']') CUST_ADDR_DESC,
            CU.CUST_CATEGORY CUST_CTGR_CODE,
            CG.CATEG_DESCRIPT CUST_CTGR_TEXT,
            CU.CUST_DELIV_POINT CUST_DELV_CODE,
            DV.DLV_NAME CUST_DELV_NAME,
            CU.CUST_INV_TYPE CUST_INVTYPE_ID,
            IT.CUSTOMER_INV_NAME CUST_INVTYPE_NAME,
            CU.CUST_SALE_TYPE CUST_SALETYPE_ID,
            ST.CUSTOMER_SALE_NAME CUST_SALETYPE_NAME,
            CU.CUST_CRD_TERMS CUST_CRD_TERMS,
            TT.CUSTOMER_TERMS_NAME CUST_TERMS_NAME,
            AL.LOCKAL_LOCK CUST_ALLOC_LOCKID,
            AL.ALLOC_LOCK_NAME CUST_ALLOC_LOCKNAME,
            NVL(CO.CUST_ORDER_COUNT, 0) CUST_ORDER_COUNT,
            NVL(DC.CUST_DLOC_COUNT, 0) CUST_DLOC_COUNT
        FROM 
            CUSTOMER CU,
            GUI_COMPANYS CC,
            GUI_COMPANYS SC,
            CST_PRCE_CATEGOR CG,
            DB_ADDRESS DA,
            (
            SELECT DB_ADDR_LINE_ID,
                NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ') DB_ADDR_TEXT
            FROM DB_ADDRESS_LINE
            GROUP BY DB_ADDR_LINE_ID
            ) DL,
            DELV_LOCATION DV,
            CUSTOMER_INV_TYP IT,
            CUSTOMER_PRICE_TYP PT,
            CUSTOMER_SALE_TYP ST,
            CUSTOMER_TERMS_TYP TT,
            (
            SELECT LOCKAL.LOCKATYP_AT_CMPY,
                LOCKAL.LOCKAL_SUPL,
                LOCKAL.LOCKAL_LOCK,
                ALLOC_LOCK_TYP.ALLOC_LOCK_NAME 
            FROM LOCKAL, ALLOC_LOCK_TYP
            WHERE LOCKAL.LOCKATYP_AT_TYPE = 3
                AND LOCKAL.LOCKAL_LOCK= ALLOC_LOCK_TYP.ALLOC_LOCK_ID
            ) AL,
            (
            SELECT ORDER_CUST,
                COUNT(*) CUST_ORDER_COUNT
            FROM CUST_ORDER
            GROUP BY ORDER_CUST
            ) CO,
            (
            SELECT DLC_CUSTOMER,
                COUNT(*) CUST_DLOC_COUNT
            FROM DELV_FOR_CUST
            GROUP BY DLC_CUSTOMER
            ) DC
        WHERE CU.CUST_SUPP = SC.CMPY_CODE 
            AND CU.CUST_CODE = CC.CMPY_CODE 
            AND CU.CUST_ADDR = DA.DB_ADDRESS_KEY(+)
            AND DA.DB_ADDRESS_KEY = DL.DB_ADDR_LINE_ID(+)
            AND CU.CUST_CATEGORY = CG.CATEG_CODE(+)
            AND CU.CUST_DELIV_POINT = DV.DLV_CODE(+)
            AND CU.CUST_CRD_TERMS = TT.CUSTOMER_TERMS_ID(+)
            AND CU.CUST_SALE_TYPE = ST.CUSTOMER_SALE_ID(+)
            AND CU.CUST_INV_TYPE = IT.CUSTOMER_INV_ID(+)
            AND CU.CUST_VARIABLE_PR = PT.CUSTOMER_PRICE_ID(+)
            AND CU.CUST_CODE = AL.LOCKATYP_AT_CMPY(+)
            AND CU.CUST_SUPP = AL.LOCKAL_SUPL(+)
            AND CU.CUST_ACCT = CO.ORDER_CUST(+)
            AND CU.CUST_ACCT = DC.DLC_CUSTOMER(+)
        ORDER BY CUST_ACCT";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "DELETE FROM CUSTOMER_PRODUCT WHERE CUST_ACCT = :cust_account";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cust_account', $this->cust_account);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }
        
        return true;
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->products)) {
            return true;
        }
        
        foreach ($this->products as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            $query = "INSERT INTO CUSTOMER_PRODUCT 
                (
                    CUST_ACCT,
                    PROD_CODE,
                    PROD_CMPY
                )
            VALUES 
                (
                    :cust_acct,
                    :prod_code,
                    :prod_cmpy
                )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':cust_acct', $value->cust_acct);
            oci_bind_by_name($stmt, ':prod_code', $value->prod_code);
            oci_bind_by_name($stmt, ':prod_cmpy', $value->prod_cmpy);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }
    
    protected function retrieve_children_data()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "SELECT PROD_CODE, PROD_CMPY
                FROM CUSTOMER_PRODUCT
                WHERE CUST_ACCT = :cust_acct
                ORDER BY PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cust_acct', $this->cust_account);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $ret_obj = new stdClass();
        $prod_array = array();
        while ($item = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            array_push($prod_array, $item);
        }

        $ret_obj->products = $prod_array;
        write_log(json_encode($ret_obj), __FILE__, __LINE__);
        return $ret_obj;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        write_log(json_encode($old), __FILE__, __LINE__);
        write_log(json_encode($new), __FILE__, __LINE__);

        $module = "customer product";
        if (isset($new->products)) {
            foreach ($old->products as $old_product) {
                write_log(json_encode($old_product), __FILE__, __LINE__);
                $still_exist = false;
                foreach ($new->products as $new_product) {
                    write_log(json_encode($new_product), __FILE__, __LINE__);
                    // write_log($old_product->PROD_CODE, __FILE__, __LINE__);
                    // write_log($old_product->PROD_CMPY, __FILE__, __LINE__);
                    // write_log($new_product->PROD_CODE, __FILE__, __LINE__);
                    // write_log($new_product->PROD_CMPY, __FILE__, __LINE__);
                    if ($old_product['PROD_CODE'] === $new_product['PROD_CODE'] &&
                        $old_product['PROD_CMPY'] === $new_product['PROD_CMPY']) {
                        $still_exist = true;
                        break;
                    }
                }

                if (!$still_exist) {
                    $jnl_data[0] = Utilities::getCurrPsn();
                    $jnl_data[1] = $module;
                    $jnl_data[2] = sprintf("customer account:%s", $this->cust_account);
                    $jnl_data[3] = sprintf("product code:%s, product company:%s", $old_product['PROD_CODE'], $old_product['PROD_CMPY']);
    
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
            foreach ($new->products as $new_product) {
                $was_there = false;
                foreach ($old->products as $old_product) {
                    if ($old_product['PROD_CODE'] === $new_product['PROD_CODE'] &&
                        $old_product['PROD_CMPY'] === $new_product['PROD_CMPY']) {
                        $was_there = true;
                        break;
                    }
                }

                if (!$was_there) {
                    $jnl_data[0] = Utilities::getCurrPsn();
                    $jnl_data[1] = $module;
                    $jnl_data[2] = sprintf("customer account:%s", $this->cust_account);
                    $jnl_data[3] = sprintf("product code:%s, product company:%s", $new_product['PROD_CODE'], $new_product['PROD_CMPY']);
    
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
    }

    public function read_customer_company_by_mode($supplier, $mode)
    {
        if ($mode > 0) {
            // mode = 1, find existing customer company for the supplier
            $query = "
                select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
                from GUI_COMPANYS 
                where 
                    bitand(CMPY_TYPE, 8) <> 0 
                    and (CMPY_CODE in (select CUST_CODE from CUSTOMER where CUST_SUPP=:supp_code))
                order by CMPY_NAME asc
            ";
        }
        else {
            // mode = -1, find available customer company for the supplier
            $query = "
                select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
                from GUI_COMPANYS 
                where 
                    bitand(CMPY_TYPE, 8)<>0 
                    and (CMPY_CODE not in (select CUST_CODE from CUSTOMER where CUST_SUPP=:supp_code))
                order by CMPY_NAME asc
            ";
        }
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supp_code', $supplier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    } 

    public function read_customer_of_supplier()
    {
        return $this->read_customer_company_by_mode($this->cust_supp_code, 1);
    }

    public function read_customer_for_supplier()
    {
        return $this->read_customer_company_by_mode($this->cust_supp_code, -1);
    }
    
    public function read_customer_company_by_supplier()
    {
        $query = "
            select cmp.* from 
            (
            select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC, :supp_code as CUST_SUPP 
            from GUI_COMPANYS 
            where 
                bitand(CMPY_TYPE, 8) <> 0 
                and (CMPY_CODE in (select CUST_CODE from CUSTOMER where CUST_SUPP=:supp_code))
            union 
            select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC, '' as CUST_SUPP 
            from GUI_COMPANYS 
            where 
                bitand(CMPY_TYPE, 8)<>0 
                and (CMPY_CODE not in (select CUST_CODE from CUSTOMER where CUST_SUPP=:supp_code))
            ) cmp
            order by cmp.CMPY_NAME asc
        ";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supp_code', $this->cust_supp_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    } 
}