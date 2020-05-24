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
            -- , CUSTOMER_AMNT_TYP AT,
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