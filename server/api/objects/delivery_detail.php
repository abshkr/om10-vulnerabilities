<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once __DIR__ . '/../service/partnership_service.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class DeliveryDetail extends CommonClass
{
    protected $TABLE_NAME = 'DELV_DETAILS';
    //protected $VIEW_NAME = '';
    protected $primary_keys = array("dd_number", "dd_supp_code", "dd_tripord_no", "dd_ld_type");
    
    protected $del_n_ins_children = false;   //Because OPRODMTD has child OPROD_CHILD

    protected $table_view_map = array(
    );
    public $NUMBER_FIELDS = array(
        "DD_TRIPORD_NO",
        "DD_LD_TYPE",
        "DD_SALES_ORD_NUM",
    );
    public $BOOLEAN_FIELDS = array(
    );

    public $VIEW_QUERY = "
        select 
            dd.DD_NUMBER
            , dd.DD_SUPP_CODE
            , sc.CMPY_NAME				as DD_SUPP_NAME
            , dd.DD_TRIPORD_NO
            , dd.DD_LD_TYPE
            , dlt.SHL_TYPE_NAME			as DD_LOAD_TYPENAME
            , dd.DD_DELV_TYPE
            , ddt.DELIVERY_TYPE_NAME	as DD_DELV_TYPENAME
            , dd.DD_ROUTE
            , dd.DD_SHIP_COND
            , dd.DD_VEH_ARR_TIME
            , dd.DD_PHONE
            , dd.DD_INSTRUCTION
            , dd.DD_LPG_REMARK
            , dd.DD_SALES_ORD_NUM
            , dd.DD_CUST_PO
            , dd.DD_SALE_ORD_TYPE
            , dd.DD_VAT_ID
            , dd.DD_SOLD_TO
            , sld.PARTNER_DESC			as DD_SOLD_TO_DESC
            , dd.DD_SHIP_TO			
            , shp.PARTNER_DESC			as DD_SHIP_TO_DESC
            , dd.DD_CUSTOM_CODE
            , dd.DD_LPG_DEST_TYPE
            , dd.DD_PERMIT_NUM
            , dd.DD_SELL_CMPY_CODE
        from 
            DELV_DETAILS		dd
            , COMPANYS			sc
            , SHL_TYPE_TYP		dlt
            , (
                select 1 as DELIVERY_TYPE_ID, 'LF' as DELIVERY_TYPE_CODE, 'Outbound delivery' as DELIVERY_TYPE_NAME from DUAL
                union 
                select 2 as DELIVERY_TYPE_ID, 'WRD' as DELIVERY_TYPE_CODE, 'Customer returns' as DELIVERY_TYPE_NAME from DUAL
            ) ddt
            , (
                select distinct 
                    ccp.CCP_CMPY_CODE				as PARTNER_CMPY_CODE
                    , ccp.CCP_PRTNR_SEQ				as PARTNER_SEQ
                    , pr.PRTNR_CODE					as PARTNER_CODE
                    , pr.PRTNR_TYPE					as PARTNER_TYPE
                    , pr.PRTNR_ADDR					as PARTNER_ADDR_CODE
                    , pr.PRTNR_SEQ||' - '||pr.PRTNR_CODE||' - '||pr.PRTNR_NAME1 	as PARTNER_DESC
                from 
                    CMPY_CUST_PRTNR			ccp
                    , PARTNER				pr
                where 
                    ccp.CCP_PRTNR_SEQ = pr.PRTNR_SEQ
                    and pr.PRTNR_TYPE = 'AG'
                    and pr.PRTNR_CMPY = ccp.CCP_CMPY_CODE
            ) sld
            , (
                select distinct 
                    ccp.CCP_CMPY_CODE				as PARTNER_CMPY_CODE
                    , ccp.CCP_PRTNR_SEQ				as PARTNER_SEQ
                    , pr.PRTNR_CODE					as PARTNER_CODE
                    , pr.PRTNR_TYPE					as PARTNER_TYPE
                    , pr.PRTNR_ADDR					as PARTNER_ADDR_CODE
                    , pr.PRTNR_SEQ||' - '||pr.PRTNR_CODE||' - '||pr.PRTNR_NAME1 	as PARTNER_DESC
                from 
                    CMPY_CUST_PRTNR			ccp
                    , PARTNER				pr
                where 
                    ccp.CCP_PRTNR_SEQ = pr.PRTNR_SEQ
                    and pr.PRTNR_TYPE = 'WE'
                    and pr.PRTNR_CMPY = ccp.CCP_CMPY_CODE
            ) shp
        where 
            1 = 1
            and dd.DD_SUPP_CODE = sc.CMPY_CODE
            and dd.DD_LD_TYPE = dlt.SHL_TYPE_ID(+)
            and dd.DD_DELV_TYPE = ddt.DELIVERY_TYPE_CODE(+)
            and dd.DD_SOLD_TO = sld.PARTNER_CODE(+)
            and dd.DD_SHIP_TO = shp.PARTNER_CODE(+)
            and dd.DD_SUPP_CODE = sld.PARTNER_CMPY_CODE(+)
            and dd.DD_SUPP_CODE = shp.PARTNER_CMPY_CODE(+)
    ";


    public function read()
    {
        $query = "
            SELECT * 
            FROM (
                " . $this->VIEW_QUERY . "
            )
            WHERE
                1 = 1
                AND ('-1' = :dd_number OR DD_NUMBER = :dd_number)
                AND ('-1' = :dd_supp_code OR DD_SUPP_CODE = :dd_supp_code)
                AND (-1 = :dd_tripord_no OR DD_TRIPORD_NO = :dd_tripord_no)
                AND (-1 = :dd_ld_type OR DD_LD_TYPE = :dd_ld_type)
            ORDER BY DD_SUPP_CODE, DD_TRIPORD_NO
        ";
        $stmt = oci_parse($this->conn, $query);

        if (!isset($this->dd_number)) {
            $this->dd_number = '-1';
        }
        oci_bind_by_name($stmt, ':dd_number', $this->dd_number);
        if (!isset($this->dd_supp_code)) {
            $this->dd_supp_code = '-1';
        }
        oci_bind_by_name($stmt, ':dd_supp_code', $this->dd_supp_code);
        if (!isset($this->dd_tripord_no)) {
            $this->dd_tripord_no = -1;
        }
        oci_bind_by_name($stmt, ':dd_tripord_no', $this->dd_tripord_no);
        if (!isset($this->dd_ld_type)) {
            $this->dd_ld_type = -1;
        }
        oci_bind_by_name($stmt, ':dd_ld_type', $this->dd_ld_type);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function delivery_detail_items()
    {
        $query = "
            select
                ddi.DDI_DD_NUMBER
                , ddi.DDI_DD_SUPP_CODE
                , sc.CMPY_NAME					as DDI_DD_SUPP_NAME
                , ddi.DDI_DD_TRIPORD_NO
                , ddi.DDI_DD_LD_TYPE
                , dlt.SHL_TYPE_NAME				as DDI_DD_LOAD_TYPENAME
                , ddi.DDI_ITEM_CAT
                , ddi.DDI_LINE_ITEM_NUM
                , ddi.DDI_CMPT_NUM
                , ddi.DDI_CMPY_CODE
                , dc.CMPY_NAME					as DDI_PROD_CMPYNAME
                , ddi.DDI_PROD_CODE
                , prd.PROD_NAME					as DDI_PROD_NAME
                , ddi.DDI_QTY
                , ddi.DDI_UNIT
                , usv.DESCRIPTION				as DDI_UNIT_NAME
                , NVL(ddi.DDI_ITEM_DESC, prd.PROD_NAME)		as DDI_ITEM_DESC
                , ddi.DDI_DUTY_CODE
                , ddi.DDI_EXCISE_LIC_NUM
                , ddi.DDI_REF_DOC_NUM
                , ddi.DDI_SITE_CAPACITY
                , ddi.DDI_TANK_CODE			
            from
                DELV_DETAILS_ITEM 			ddi
                , COMPANYS					sc
                , SHL_TYPE_TYP				dlt
                , PRODUCTS					prd
                , COMPANYS					dc
                , UNIT_SCALE_VW				usv
            where 
                1=1
                and ddi.DDI_DD_NUMBER = :dd_number
                and ddi.DDI_DD_SUPP_CODE = :dd_supp_code
                and ddi.DDI_DD_TRIPORD_NO = :dd_tripord_no
                and ddi.DDI_DD_LD_TYPE = :dd_ld_type
                and ddi.DDI_DD_SUPP_CODE = sc.CMPY_CODE
                and ddi.DDI_DD_LD_TYPE = dlt.SHL_TYPE_ID(+)
                and ddi.DDI_PROD_CODE = prd.PROD_CODE
                and ddi.DDI_CMPY_CODE = prd.PROD_CMPY
                and prd.PROD_CMPY = dc.CMPY_CODE
                and ddi.DDI_UNIT = usv.UNIT_ID(+)
            order by
                ddi.DDI_DD_SUPP_CODE, ddi.DDI_DD_TRIPORD_NO, ddi.DDI_LINE_ITEM_NUM
        ";
        $stmt = oci_parse($this->conn, $query);
        
        if (!isset($this->dd_number)) {
            $this->dd_number = '-1';
        }
        oci_bind_by_name($stmt, ':dd_number', $this->dd_number);
        if (!isset($this->dd_supp_code)) {
            $this->dd_supp_code = '-1';
        }
        oci_bind_by_name($stmt, ':dd_supp_code', $this->dd_supp_code);
        if (!isset($this->dd_tripord_no)) {
            $this->dd_tripord_no = -1;
        }
        oci_bind_by_name($stmt, ':dd_tripord_no', $this->dd_tripord_no);
        if (!isset($this->dd_ld_type)) {
            $this->dd_ld_type = -1;
        }
        oci_bind_by_name($stmt, ':dd_ld_type', $this->dd_ld_type);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function delivery_detail_dn_templates()
    {
        $query = "
            select
                ddd.DDD_DD_NUMBER
                , ddd.DDD_DD_SUPP_CODE
                , sc.CMPY_NAME					as DDD_DD_SUPP_NAME
                , ddd.DDD_DD_TRIPORD_NO
                , ddd.DDD_DD_LD_TYPE
                , dlt.SHL_TYPE_NAME				as DDD_DD_LOAD_TYPENAME
                , ddd.DDD_TEMPL_ID
                , tmp.TEMPLATE_CODE
                , tmp.TEMPLATE_NAME
                , tmp.TEMPLATE_TYPE_ID
                , tmp.TEMPLATE_FILE
                , tmp.TEMPLATE_LOCALE
                , tmp.TEMPLATE_NOTE
                , tmp.TEMPLATE_CMPY_FLAG
                , tmp.TEMPLATE_CMPY_EMAIL
                , tmp.TEMPLATE_CMPY_COPIES
                , tmp.TEMPLATE_CMPY_FOOTERS
                , tmp.TEMPLATE_WARN_PERCENT
            from
                DELV_DETAILS_DN 			ddd
                , (
                    select 
                        ct.CMPY_CODE				as TEMPLATE_CMPY_CODE
                        , ct.CMPY_NAME				as TEMPLATE_CMPY_NAME
                        , ct.CMPY_TYPE				as TEMPLATE_CMPY_TYPE
                        , ct.CMPY_REPORT_RECEIVERS	as TEMPLATE_CMPY_EMAIL_DEF
                        , ct.TEMPLATE_CODE			as TEMPLATE_CODE
                        , ct.TEMPLATE_NAME			as TEMPLATE_NAME
                        , ct.TEMPLATE_TYPE			as TEMPLATE_TYPE_ID
                        , ct.FILE_NAME				as TEMPLATE_FILE
                        , ct.LOCALE					as TEMPLATE_LOCALE
                        , ct.DESCRIPTION			as TEMPLATE_NOTE
                        , NVL(tc.TEMPLATE_IDENTIFIER, ct.TEMPLATE_CODE)					as TEMPLATE_IDENTIFIER
                        , NVL(tc.DEFAULT_FLAG, 'N')					as TEMPLATE_CMPY_FLAG
                        , NVL(tc.STATUS, 0)							as TEMPLATE_CMPY_STATUS
                        , NVL(tc.EMAIL, ct.CMPY_REPORT_RECEIVERS)	as TEMPLATE_CMPY_EMAIL
                        , NVL(tc.COPIES, 3)							as TEMPLATE_CMPY_COPIES
                        , NVL(tc.FOOTERS, decode(ct.TEMPLATE_TYPE, 1, 'Driver;Terminal;Customer', 'Processing;Driver Copy;Customer Copy') )				as TEMPLATE_CMPY_FOOTERS
                        , NVL(tc.WARNING_PERCENT, 0)				as TEMPLATE_WARN_PERCENT
                        , NVL(tc.WARNING_QTY, 0)					as TEMPLATE_WARN_QTY
                    from
                        TEMPLATE_N_CMPY tc
                        , (
                            select 
                                cmp.CMPY_CODE				
                                , cmp.CMPY_NAME				
                                , cmp.CMPY_TYPE				
                                , cmp.CMPY_REPORT_RECEIVERS	
                                , bdt.TEMPLATE_CODE			
                                , bdt.TEMPLATE_NAME			
                                , bdt.TEMPLATE_TYPE			
                                , bdt.FILE_NAME				
                                , bdt.LOCALE					
                                , bdt.DESCRIPTION			
                            from 
                                GUI_COMPANYS cmp
                                , BOL_DN_TEMPLATE bdt 
                            where 
                                cmp.SUPPLIER='Y' or cmp.DRAWER='Y'
                        ) ct 
                    where 
                        ct.CMPY_CODE = tc.CMPY_CODE(+) 
                        and ct.TEMPLATE_CODE = tc.TEMPLATE_CODE(+) 
                        and ct.TEMPLATE_TYPE = tc.TEMPLATE_TYPE(+) 
                        and ct.TEMPLATE_TYPE = 2
                ) tmp
                , COMPANYS					sc
                , SHL_TYPE_TYP				dlt
            where 
                1=1
                and ddd.DDD_DD_NUMBER = :dd_number
                and ddd.DDD_DD_SUPP_CODE = :dd_supp_code
                and ddd.DDD_DD_TRIPORD_NO = :dd_tripord_no
                and ddd.DDD_DD_LD_TYPE = :dd_ld_type
                and ddd.DDD_DD_SUPP_CODE = sc.CMPY_CODE
                and ddd.DDD_DD_LD_TYPE = dlt.SHL_TYPE_ID(+)
                and ddd.DDD_TEMPL_ID = tmp.TEMPLATE_IDENTIFIER(+)
                and ddd.DDD_DD_SUPP_CODE = tmp.TEMPLATE_CMPY_CODE(+)
            order by
                ddd.DDD_DD_SUPP_CODE, ddd.DDD_DD_TRIPORD_NO, ddd.DDD_TEMPL_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        
        if (!isset($this->dd_number)) {
            $this->dd_number = '-1';
        }
        oci_bind_by_name($stmt, ':dd_number', $this->dd_number);
        if (!isset($this->dd_supp_code)) {
            $this->dd_supp_code = '-1';
        }
        oci_bind_by_name($stmt, ':dd_supp_code', $this->dd_supp_code);
        if (!isset($this->dd_tripord_no)) {
            $this->dd_tripord_no = -1;
        }
        oci_bind_by_name($stmt, ':dd_tripord_no', $this->dd_tripord_no);
        if (!isset($this->dd_ld_type)) {
            $this->dd_ld_type = -1;
        }
        oci_bind_by_name($stmt, ':dd_ld_type', $this->dd_ld_type);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function delivery_bol_templates()
    {
        $query = "
            select
                db.DB_SUPP_CODE
                , sc.CMPY_NAME					as DB_SUPP_NAME
                , db.DB_TRIPORD_NO
                , db.DB_LD_TYPE
                , dlt.SHL_TYPE_NAME				as DB_LOAD_TYPENAME
                , db.DB_TEMPL_ID
                , tmp.TEMPLATE_CODE
                , tmp.TEMPLATE_NAME
                , tmp.TEMPLATE_TYPE_ID
                , tmp.TEMPLATE_FILE
                , tmp.TEMPLATE_LOCALE
                , tmp.TEMPLATE_NOTE
                , tmp.TEMPLATE_CMPY_FLAG
                , tmp.TEMPLATE_CMPY_EMAIL
                , tmp.TEMPLATE_CMPY_COPIES
                , tmp.TEMPLATE_CMPY_FOOTERS
                , tmp.TEMPLATE_WARN_PERCENT
            from
                DELV_BOL 			db
                , (
                    select 
                        ct.CMPY_CODE				as TEMPLATE_CMPY_CODE
                        , ct.CMPY_NAME				as TEMPLATE_CMPY_NAME
                        , ct.CMPY_TYPE				as TEMPLATE_CMPY_TYPE
                        , ct.CMPY_REPORT_RECEIVERS	as TEMPLATE_CMPY_EMAIL_DEF
                        , ct.TEMPLATE_CODE			as TEMPLATE_CODE
                        , ct.TEMPLATE_NAME			as TEMPLATE_NAME
                        , ct.TEMPLATE_TYPE			as TEMPLATE_TYPE_ID
                        , ct.FILE_NAME				as TEMPLATE_FILE
                        , ct.LOCALE					as TEMPLATE_LOCALE
                        , ct.DESCRIPTION			as TEMPLATE_NOTE
                        , NVL(tc.TEMPLATE_IDENTIFIER, ct.TEMPLATE_CODE)					as TEMPLATE_IDENTIFIER
                        , NVL(tc.DEFAULT_FLAG, 'N')					as TEMPLATE_CMPY_FLAG
                        , NVL(tc.STATUS, 0)							as TEMPLATE_CMPY_STATUS
                        , NVL(tc.EMAIL, ct.CMPY_REPORT_RECEIVERS)	as TEMPLATE_CMPY_EMAIL
                        , NVL(tc.COPIES, 3)							as TEMPLATE_CMPY_COPIES
                        , NVL(tc.FOOTERS, decode(ct.TEMPLATE_TYPE, 1, 'Driver;Terminal;Customer', 'Processing;Driver Copy;Customer Copy') )				as TEMPLATE_CMPY_FOOTERS
                        , NVL(tc.WARNING_PERCENT, 0)				as TEMPLATE_WARN_PERCENT
                        , NVL(tc.WARNING_QTY, 0)					as TEMPLATE_WARN_QTY
                    from
                        TEMPLATE_N_CMPY tc
                        , (
                            select 
                                cmp.CMPY_CODE				
                                , cmp.CMPY_NAME				
                                , cmp.CMPY_TYPE				
                                , cmp.CMPY_REPORT_RECEIVERS	
                                , bdt.TEMPLATE_CODE			
                                , bdt.TEMPLATE_NAME			
                                , bdt.TEMPLATE_TYPE			
                                , bdt.FILE_NAME				
                                , bdt.LOCALE					
                                , bdt.DESCRIPTION			
                            from 
                                GUI_COMPANYS cmp
                                , BOL_DN_TEMPLATE bdt 
                            where 
                                cmp.SUPPLIER='Y' or cmp.DRAWER='Y'
                        ) ct 
                    where 
                        ct.CMPY_CODE = tc.CMPY_CODE(+) 
                        and ct.TEMPLATE_CODE = tc.TEMPLATE_CODE(+) 
                        and ct.TEMPLATE_TYPE = tc.TEMPLATE_TYPE(+) 
                        and ct.TEMPLATE_TYPE = 2
                ) tmp
                , COMPANYS					sc
                , SHL_TYPE_TYP				dlt
            where 
                1=1
                and db.DB_SUPP_CODE = :dd_supp_code
                and db.DB_TRIPORD_NO = :dd_tripord_no
                and db.DB_LD_TYPE = :dd_ld_type
                and db.DB_SUPP_CODE = sc.CMPY_CODE
                and db.DB_LD_TYPE = dlt.SHL_TYPE_ID(+)
                and db.DB_TEMPL_ID = tmp.TEMPLATE_IDENTIFIER(+)
                and db.DB_SUPP_CODE = tmp.TEMPLATE_CMPY_CODE(+)
            order by
                db.DB_SUPP_CODE, db.DB_TRIPORD_NO, db.DB_TEMPL_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        
        if (!isset($this->dd_supp_code)) {
            $this->dd_supp_code = '-1';
        }
        oci_bind_by_name($stmt, ':dd_supp_code', $this->dd_supp_code);
        if (!isset($this->dd_tripord_no)) {
            $this->dd_tripord_no = -1;
        }
        oci_bind_by_name($stmt, ':dd_tripord_no', $this->dd_tripord_no);
        if (!isset($this->dd_ld_type)) {
            $this->dd_ld_type = -1;
        }
        oci_bind_by_name($stmt, ':dd_ld_type', $this->dd_ld_type);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function templates()
    {
        $query = "
            select
                tmp.TEMPLATE_CODE
                , tmp.TEMPLATE_NAME
                , tmp.TEMPLATE_TYPE
            from 
                BOL_DN_TEMPLATE				tmp
            where
                1=1
                and (-1 = :tmpl_type or tmp.TEMPLATE_TYPE = :tmpl_type)
        ";
        $stmt = oci_parse($this->conn, $query);

        if (!isset($this->tmpl_type)) {
            $this->tmpl_type = -1;
        }
        oci_bind_by_name($stmt, ':tmpl_type', $this->tmpl_type);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function trip_compartments()
    {
        $query = "
            select
                s.SCHD_COMP_ID			as DDI_CMPT_NUM
                , s.SCHDPROD_PRODCMPY	as DDI_CMPY_CODE
                , s.SCHDPROD_PRODCODE	as DDI_PROD_CODE
                , p.PROD_NAME			as DDI_PROD_NAME
                , s.SCHD_SPECQTY		as DDI_QTY
                , s.SCHD_UNITS			as DDI_UNIT
                , u.DESCRIPTION			as DDI_UNIT_NAME
                , s.SCHD_COMP_ID||'--'||s.SCHDPROD_PRODCMPY||'--'||s.SCHDPROD_PRODCODE||'--'||p.PROD_NAME||'--'||s.SCHD_SPECQTY||'--'||s.SCHD_UNITS||'--'||u.DESCRIPTION	as ITEM_DESC
            from 
                SPECDETS			s
                , PRODUCTS			p
                , UNIT_SCALE_VW		u
            where
                s.SCHDSPEC_SHLSSUPP = :supp_code
                and s.SCHDSPEC_SHLSTRIP = :trip_no
                and s.SCHD_SPECQTY>0
                and s.SCHDPROD_PRODCODE = p.PROD_CODE
                and s.SCHDPROD_PRODCMPY = p.PROD_CMPY
                and s.SCHD_UNITS = u.UNIT_ID
            order by SCHD_COMP_ID
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':supp_code', $this->supp_code);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function trip_products()
    {
        $query = "
            select
                NULL					as DDI_CMPT_NUM
                , s.SCHPPROD_PRODCMPY	as DDI_CMPY_CODE
                , s.SCHPPROD_PRODCODE	as DDI_PROD_CODE
                , p.PROD_NAME			as DDI_PROD_NAME
                , s.SCHP_SPECQTY		as DDI_QTY
                , s.SCHP_UNITS			as DDI_UNIT
                , u.DESCRIPTION			as DDI_UNIT_NAME
                , s.SCHPPROD_PRODCMPY||'--'||s.SCHPPROD_PRODCODE||'--'||p.PROD_NAME||'--'||s.SCHP_SPECQTY||'--'||s.SCHP_UNITS||'--'||u.DESCRIPTION	as ITEM_DESC
            from 
                SPECPROD			s
                , PRODUCTS			p
                , UNIT_SCALE_VW		u
            where
                SCHPSPID_SHLSSUPP = :supp_code
                and SCHPSPID_SHLSTRIP = :trip_no
                and SCHP_SPECQTY>0
                and s.SCHPPROD_PRODCODE = p.PROD_CODE
                and s.SCHPPROD_PRODCMPY = p.PROD_CMPY
                and s.SCHP_UNITS = u.UNIT_ID
            order by SCHPPROD_PRODCMPY, SCHPPROD_PRODCODE
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':supp_code', $this->supp_code);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function order_products()
    {
        $query = "
            select
                NULL					as DDI_CMPT_NUM
                , s.OSPROD_PRODCMPY		as DDI_CMPY_CODE
                , s.OSPROD_PRODCODE		as DDI_PROD_CODE
                , p.PROD_NAME			as DDI_PROD_NAME
                , s.ORDER_PROD_QTY		as DDI_QTY
                , s.ORDER_PROD_UNIT		as DDI_UNIT
                , u.DESCRIPTION			as DDI_UNIT_NAME
                , s.OSPROD_PRODCMPY||'--'||s.OSPROD_PRODCODE||'--'||p.PROD_NAME||'--'||s.ORDER_PROD_QTY||'--'||s.ORDER_PROD_UNIT||'--'||u.DESCRIPTION	as ITEM_DESC
            from 
                OPRODMTD			s
                , PRODUCTS			p
                , UNIT_SCALE_VW		u
            where
                ORDER_PROD_KEY in 
                (
                    select order_no from CUST_ORDER where ORDER_CUST_ORDNO=:order_no and 
                    ORDER_CUST in (select CUST_ACCT from CUSTOMER where CUST_SUPP=:supp_code)
                )
                and ORDER_PROD_QTY>0
                and s.OSPROD_PRODCODE = p.PROD_CODE
                and s.OSPROD_PRODCMPY = p.PROD_CMPY
                and s.ORDER_PROD_UNIT = u.UNIT_ID
            order by OSPROD_PRODCMPY, OSPROD_PRODCODE
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':supp_code', $this->supp_code);
        oci_bind_by_name($stmt, ':order_no', $this->order_no);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    public function check_delivery_detail_for_bol()
    {
        $query = "
            select COUNT(*) as CNT 
            from DELV_DETAILS 
            where 
                1=1
                and DD_SUPP_CODE=:dd_supp_code
                and DD_TRIPORD_NO=:dd_tripord_no
                and DD_LD_TYPE=:dd_ld_type
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':dd_ld_type', $this->dd_ld_type);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_delivery_detail_for_printing()
    {
        if (isset($this->dd_ld_type) && $this->dd_ld_type == 3) {
            $query = "
                select COUNT(*) as CNT 
                from SPECDETS 
                where 
                    SCHD_DELIV_NUM=:dd_number
                    and SCHDSPEC_SHLSSUPP=:dd_supp_code
                    and SCHD_ORDER in (
                        select ORDER_NO from CUST_ORDER where ORDER_CUST_ORDNO=:dd_tripord_no and ORDER_CUST in (
                            select CUST_ACCT from CUSTOMER where CUST_SUPP=:dd_supp_code
                        )
                    )  
            ";
        }
        else {
            $query = "
                select COUNT(*) as CNT 
                from SPECDETS 
                where 
                    SCHD_DELIV_NUM=:dd_number
                    and SCHDSPEC_SHLSSUPP=:dd_supp_code
                    and SCHDSPEC_SHLSTRIP=:dd_tripord_no
            ";
        }
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':dd_tripord_no', $this->dd_tripord_no);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_delivery_detail()
    {
        $query = "
            select COUNT(*) as CNT 
            from DELV_DETAILS 
            where 
                DD_NUMBER=:dd_number
                and DD_SUPP_CODE=:dd_supp_code
                and DD_TRIPORD_NO=:dd_tripord_no
                and DD_LD_TYPE=:dd_ld_type
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':dd_ld_type', $this->dd_ld_type);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_delivery_detail_item()
    {
        $query = "
            select COUNT(*) as CNT 
            from DELV_DETAILS_ITEM 
            where 
                DDI_DD_NUMBER=:ddi_dd_number 
                and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
                and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
                and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
                and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':ddi_line_item_num', $this->ddi_line_item_num);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_delivery_detail_dn_template()
    {
        $query = "
            select COUNT(*) as CNT 
            from DELV_DETAILS_DN 
            where 
                DDD_DD_NUMBER=:ddd_dd_number 
                and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
                and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
                and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
                and DDD_TEMPL_ID=:ddd_templ_id 
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':ddd_templ_id', $this->ddd_templ_id);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_delivery_bol_template()
    {
        $query = "
            select COUNT(*) as CNT 
            from DELV_BOL 
            where 
                DB_SUPP_CODE=:db_supp_code 
                and DB_TRIPORD_NO=:db_tripord_no 
                and DB_LD_TYPE=:db_ld_type 
                and DB_TEMPL_ID=:db_templ_id 
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':db_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':db_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':db_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':db_templ_id', $this->db_templ_id);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    public function load_types()
    {
        $query = "
            select 
                SHL_TYPE_ID															as LOAD_TYPE_ID
                , DECODE(SHL_TYPE_ID, 2, 'A', 1, 'Q', 3, 'O', SHL_TYPE_ID||'-')		as LOAD_TYPE_CODE
                , SHL_TYPE_NAME														as LOAD_TYPE_NAME
            from 
                SHL_TYPE_TYP
            where 
                SHL_TYPE_ID in (1,2,3) 
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

    public function delivery_types()
    {
        $query = "
            select 1 as DELIVERY_TYPE_ID, 'LF' as DELIVERY_TYPE_CODE, 'Outbound delivery' as DELIVERY_TYPE_NAME from DUAL
            union 
            select 2 as DELIVERY_TYPE_ID, 'WRD' as DELIVERY_TYPE_CODE, 'Customer returns' as DELIVERY_TYPE_NAME from DUAL
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
                $query = "DELETE FROM OPROD_CHILD WHERE OPB_DAD_OPRODKEY = :oi_order_no";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':oi_order_no', $this->order_sys_no);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $query = "DELETE FROM OPRODMTD WHERE ORDER_PROD_KEY = :oi_order_no";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':oi_order_no', $this->order_sys_no);
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
        return $row['CNT'];
    }

    public function order_item_schedules()
    {
        $query = "";
		$singleOO = $this->isSingleOrderToOneTripCmpt();
		
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
