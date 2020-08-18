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
    /*
        DELV_DETAILS
        dd_number	1
        dd_supp_code	2
        dd_tripord_no	3
        dd_ld_type	4

        DELV_DETAILS_DN
        ddd_templ_id	1
        ddd_dd_number	2
        ddd_dd_supp_code	3
        ddd_dd_tripord_no	4
        ddd_dd_ld_type	5

        DELV_DETAILS_DN_ADDL_INFO
        ddd_templ_id	1
        ddd_dd_number	2
        ddd_dd_supp_code	3
        ddd_dd_tripord_no	4
        ddd_dd_ld_type	5
        addi_fld_line_no	6

        DELV_DETAILS_ITEM
        ddi_line_item_num	1
        ddi_dd_number	2
        ddi_dd_supp_code	3
        ddi_dd_tripord_no	4
        ddi_dd_ld_type	5

        DELV_DETAILS_ITEM_ADDL_INFO
        ddi_line_item_num	1
        ddi_dd_number	2
        ddi_dd_supp_code	3
        ddi_dd_tripord_no	4
        ddi_dd_ld_type	5
        addi_fld_line_no	6

        DELV_BOL
        db_templ_id	1
        db_supp_code	2
        db_tripord_no	3
        db_ld_type	4
    */

    protected $TABLE_NAME = 'DELV_DETAILS';
    //protected $VIEW_NAME = '';
    protected $primary_keys = array("dd_number", "dd_supp_code", "dd_tripord_no", "dd_ld_type");
    
    protected $del_n_ins_children = false;   //Because both DELV_DETAILS_ITEM and DELV_DETAILS_DN have children

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


    /* public function pre_create()
    {
    }

    protected function post_create()
    {
    } */

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->ddi_items)) {
            $lineno = 1;
            foreach ($this->ddi_items as $value) {
                // write_log(json_encode($value), __FILE__, __LINE__);
                $query = "
                    INSERT INTO DELV_DETAILS_ITEM (
                        DDI_DD_NUMBER
                        , DDI_DD_SUPP_CODE
                        , DDI_DD_TRIPORD_NO
                        , DDI_DD_LD_TYPE
                        , DDI_LINE_ITEM_NUM
                        , DDI_ITEM_CAT
                        , DDI_CMPT_NUM
                        , DDI_PROD_CODE
                        , DDI_CMPY_CODE
                        , DDI_QTY
                        , DDI_UNIT
                        , DDI_ITEM_DESC
                        , DDI_DUTY_CODE
                        , DDI_EXCISE_LIC_NUM
                        , DDI_REF_DOC_NUM
                        , DDI_SITE_CAPACITY
                        , DDI_TANK_CODE
                    ) VALUES (
                        :ddi_dd_number
                        , :ddi_dd_supp_code
                        , :ddi_dd_tripord_no
                        , :ddi_dd_ld_type
                        , :ddi_line_item_num
                        , :ddi_item_cat
                        , :ddi_cmpt_num
                        , :ddi_prod_code
                        , :ddi_cmpy_code
                        , :ddi_qty
                        , :ddi_unit
                        , :ddi_item_desc
                        , :ddi_duty_code
                        , :ddi_excise_lic_num
                        , :ddi_ref_doc_num
                        , :ddi_site_capacity
                        , :ddi_tank_code
                    )
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':ddi_dd_number', $value->ddi_dd_number);
                oci_bind_by_name($stmt, ':ddi_dd_supp_code', $value->ddi_dd_supp_code);
                oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $value->ddi_dd_tripord_no);
                oci_bind_by_name($stmt, ':ddi_dd_ld_type', $value->ddi_dd_ld_type);
                oci_bind_by_name($stmt, ':ddi_line_item_num', $value->ddi_line_item_num);
                oci_bind_by_name($stmt, ':ddi_item_cat', $value->ddi_item_cat);
                oci_bind_by_name($stmt, ':ddi_cmpt_num', $value->ddi_cmpt_num);
                oci_bind_by_name($stmt, ':ddi_prod_code', $value->ddi_prod_code);
                oci_bind_by_name($stmt, ':ddi_cmpy_code', $value->ddi_cmpy_code);
                oci_bind_by_name($stmt, ':ddi_qty', $value->ddi_qty);
                oci_bind_by_name($stmt, ':ddi_unit', $value->ddi_unit);
                oci_bind_by_name($stmt, ':ddi_item_desc', $value->ddi_item_desc);
                oci_bind_by_name($stmt, ':ddi_duty_code', $value->ddi_duty_code);
                oci_bind_by_name($stmt, ':ddi_excise_lic_num', $value->ddi_excise_lic_num);
                oci_bind_by_name($stmt, ':ddi_ref_doc_num', $value->ddi_ref_doc_num);
                oci_bind_by_name($stmt, ':ddi_site_capacity', $value->ddi_site_capacity);
                oci_bind_by_name($stmt, ':ddi_tank_code', $value->ddi_tank_code);

                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    throw new DatabaseException($e['message']);
                    return false;
                }

                $lineno += 1;
            }
        }

        if (isset($this->ddd_items)) {
            $lineno = 1;
            foreach ($this->ddd_items as $value) {
                // write_log(json_encode($value), __FILE__, __LINE__);
                $query = "
                    INSERT INTO DELV_DETAILS_ITEM (
                        DDD_DD_NUMBER
                        , DDD_DD_SUPP_CODE
                        , DDD_DD_TRIPORD_NO
                        , DDD_DD_LD_TYPE
                        , DDD_TEMPL_ID
                    ) VALUES (
                        :ddd_dd_number
                        , :ddd_dd_supp_code
                        , :ddd_dd_tripord_no
                        , :ddd_dd_ld_type
                        , :ddd_templ_id
                    )
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':ddd_dd_number', $value->ddd_dd_number);
                oci_bind_by_name($stmt, ':ddd_dd_supp_code', $value->ddd_dd_supp_code);
                oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $value->ddd_dd_tripord_no);
                oci_bind_by_name($stmt, ':ddd_dd_ld_type', $value->ddd_dd_ld_type);
                oci_bind_by_name($stmt, ':ddd_templ_id', $value->ddd_templ_id);

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

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        /*
            DELV_DETAILS_DN_ADDL_INFO
            ddd_templ_id	1
            ddd_dd_number	2
            ddd_dd_supp_code	3
            ddd_dd_tripord_no	4
            ddd_dd_ld_type	5
            addi_fld_line_no	6
        */
        $query = "
            DELETE FROM DELV_DETAILS_DN_ADDL_INFO
            WHERE DDD_DD_NUMBER = :ddd_dd_number
                AND DDD_DD_SUPP_CODE = :ddd_dd_supp_code
                AND DDD_DD_TRIPORD_NO = :ddd_dd_tripord_no
                AND DDD_DD_LD_TYPE = :ddd_dd_ld_type
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        /*
            DELV_DETAILS_DN
            ddd_templ_id	1
            ddd_dd_number	2
            ddd_dd_supp_code	3
            ddd_dd_tripord_no	4
            ddd_dd_ld_type	5
        */
        $query = "
            DELETE FROM DELV_DETAILS_DN
            WHERE DDD_DD_NUMBER = :ddd_dd_number
                AND DDD_DD_SUPP_CODE = :ddd_dd_supp_code
                AND DDD_DD_TRIPORD_NO = :ddd_dd_tripord_no
                AND DDD_DD_LD_TYPE = :ddd_dd_ld_type
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        /*
            DELV_DETAILS_ITEM_ADDL_INFO
            ddi_line_item_num	1
            ddi_dd_number	2
            ddi_dd_supp_code	3
            ddi_dd_tripord_no	4
            ddi_dd_ld_type	5
            addi_fld_line_no	6
        */
        $query = "
            DELETE FROM DELV_DETAILS_ITEM_ADDL_INFO
            WHERE DDI_DD_NUMBER = :ddi_dd_number
                AND DDI_DD_SUPP_CODE = :ddi_dd_supp_code
                AND DDI_DD_TRIPORD_NO = :ddi_dd_tripord_no
                AND DDI_DD_LD_TYPE = :ddi_dd_ld_type
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        /*
            DELV_DETAILS_ITEM
            ddi_line_item_num	1
            ddi_dd_number	2
            ddi_dd_supp_code	3
            ddi_dd_tripord_no	4
            ddi_dd_ld_type	5
        */
        $query = "
            DELETE FROM DELV_DETAILS_ITEM
            WHERE DDI_DD_NUMBER = :ddi_dd_number
                AND DDI_DD_SUPP_CODE = :ddi_dd_supp_code
                AND DDI_DD_TRIPORD_NO = :ddi_dd_tripord_no
                AND DDI_DD_LD_TYPE = :ddi_dd_ld_type
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
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
        $query = "
            SELECT * 
            FROM DELV_DETAILS_ITEM
            WHERE DDI_DD_NUMBER = :ddi_dd_number
                AND DDI_DD_SUPP_CODE = :ddi_dd_supp_code
                AND DDI_DD_TRIPORD_NO = :ddi_dd_tripord_no
                AND DDI_DD_LD_TYPE = :ddi_dd_ld_type
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['DDI_LINE_ITEM_NUM']] = $flow_row;
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function retrieve_ddd_items()
    {
        $query = "
            SELECT * 
            FROM DELV_DETAILS_DN
            WHERE DDD_DD_NUMBER = :ddd_dd_number
                AND DDD_DD_SUPP_CODE = :ddd_dd_supp_code
                AND DDD_DD_TRIPORD_NO = :ddd_dd_tripord_no
                AND DDD_DD_LD_TYPE = :ddd_dd_ld_type
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['DDD_TEMPL_ID']] = $flow_row;
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function update_children($old_children = null)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        foreach ($old_children as $product => $item_array) {
            $still_exist = false;
            foreach ($this->ddi_items as $item) {
                // found existing record, do UPDATE
                if ($item->ddi_line_item_num == $product) {
                    $query = "
                    UPDATE DELV_DETAILS_ITEM
                    SET 
                        DDI_ITEM_CAT = :ddi_item_cat
                        , DDI_CMPT_NUM = :ddi_cmpt_num
                        , DDI_PROD_CODE = :ddi_prod_code
                        , DDI_CMPY_CODE = :ddi_cmpy_code
                        , DDI_QTY = :ddi_qty
                        , DDI_UNIT = :ddi_unit
                        , DDI_ITEM_DESC = :ddi_item_desc
                        , DDI_DUTY_CODE = :ddi_duty_code
                        , DDI_EXCISE_LIC_NUM = :ddi_excise_lic_num
                        , DDI_REF_DOC_NUM = :ddi_ref_doc_num
                        , DDI_SITE_CAPACITY = :ddi_site_capacity
                        , DDI_TANK_CODE = :ddi_tank_code
                    WHERE
                        DDI_DD_NUMBER = :ddi_dd_number
                        AND DDI_DD_SUPP_CODE = :ddi_dd_supp_code
                        AND DDI_DD_TRIPORD_NO = :ddi_dd_tripord_no
                        AND DDI_DD_LD_TYPE = :ddi_dd_ld_type
                        AND DDI_LINE_ITEM_NUM = :ddi_line_item_num
                    ";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':ddi_item_cat', $item->ddi_item_cat);
                    oci_bind_by_name($stmt, ':ddi_cmpt_num', $item->ddi_cmpt_num);
                    oci_bind_by_name($stmt, ':ddi_prod_code', $item->ddi_prod_code);
                    oci_bind_by_name($stmt, ':ddi_cmpy_code', $item->ddi_cmpy_code);
                    oci_bind_by_name($stmt, ':ddi_qty', $item->ddi_qty);
                    oci_bind_by_name($stmt, ':ddi_unit', $item->ddi_unit);
                    oci_bind_by_name($stmt, ':ddi_item_desc', $item->ddi_item_desc);
                    oci_bind_by_name($stmt, ':ddi_duty_code', $item->ddi_duty_code);
                    oci_bind_by_name($stmt, ':ddi_excise_lic_num', $item->ddi_excise_lic_num);
                    oci_bind_by_name($stmt, ':ddi_ref_doc_num', $item->ddi_ref_doc_num);
                    oci_bind_by_name($stmt, ':ddi_site_capacity', $item->ddi_site_capacity);
                    oci_bind_by_name($stmt, ':ddi_tank_code', $item->ddi_tank_code);
                    oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
                    oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
                    oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
                    oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
                    oci_bind_by_name($stmt, ':ddi_line_item_num', $item->ddi_line_item_num);
            
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        return false;
                    }
                    $still_exist = true;
                    break;
                }
            }
            
            // $product not found, need to remove it and its children
            if ($still_exist == false) {
                $query = "
                    DELETE FROM DELV_DETAILS_ITEM_ADDL_INFO
                    WHERE DDI_DD_NUMBER = :ddi_dd_number
                        AND DDI_DD_SUPP_CODE = :ddi_dd_supp_code
                        AND DDI_DD_TRIPORD_NO = :ddi_dd_tripord_no
                        AND DDI_DD_LD_TYPE = :ddi_dd_ld_type
                        AND DDI_LINE_ITEM_NUM = :ddi_line_item_num
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
                oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
                oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
                oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
                oci_bind_by_name($stmt, ':ddi_line_item_num', $product);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $query = "
                    DELETE FROM DELV_DETAILS_ITEM
                    WHERE DDI_DD_NUMBER = :ddi_dd_number
                        AND DDI_DD_SUPP_CODE = :ddi_dd_supp_code
                        AND DDI_DD_TRIPORD_NO = :ddi_dd_tripord_no
                        AND DDI_DD_LD_TYPE = :ddi_dd_ld_type
                        AND DDI_LINE_ITEM_NUM = :ddi_line_item_num
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
                oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
                oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
                oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
                oci_bind_by_name($stmt, ':ddi_line_item_num', $product);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($this->ddi_items as $item) {
            if (isset($old_children[$item->ddi_line_item_num])) {
                continue;
            }

            $query = "
                INSERT INTO DELV_DETAILS_ITEM (
                    DDI_DD_NUMBER
                    , DDI_DD_SUPP_CODE
                    , DDI_DD_TRIPORD_NO
                    , DDI_DD_LD_TYPE
                    , DDI_LINE_ITEM_NUM
                    , DDI_ITEM_CAT
                    , DDI_CMPT_NUM
                    , DDI_PROD_CODE
                    , DDI_CMPY_CODE
                    , DDI_QTY
                    , DDI_UNIT
                    , DDI_ITEM_DESC
                    , DDI_DUTY_CODE
                    , DDI_EXCISE_LIC_NUM
                    , DDI_REF_DOC_NUM
                    , DDI_SITE_CAPACITY
                    , DDI_TANK_CODE
                ) VALUES (
                    :ddi_dd_number
                    , :ddi_dd_supp_code
                    , :ddi_dd_tripord_no
                    , :ddi_dd_ld_type
                    , :ddi_line_item_num
                    , :ddi_item_cat
                    , :ddi_cmpt_num
                    , :ddi_prod_code
                    , :ddi_cmpy_code
                    , :ddi_qty
                    , :ddi_unit
                    , :ddi_item_desc
                    , :ddi_duty_code
                    , :ddi_excise_lic_num
                    , :ddi_ref_doc_num
                    , :ddi_site_capacity
                    , :ddi_tank_code
                )
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
            oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
            oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
            oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
            oci_bind_by_name($stmt, ':ddi_line_item_num', $item->ddi_line_item_num);
            oci_bind_by_name($stmt, ':ddi_item_cat', $item->ddi_item_cat);
            oci_bind_by_name($stmt, ':ddi_cmpt_num', $item->ddi_cmpt_num);
            oci_bind_by_name($stmt, ':ddi_prod_code', $item->ddi_prod_code);
            oci_bind_by_name($stmt, ':ddi_cmpy_code', $item->ddi_cmpy_code);
            oci_bind_by_name($stmt, ':ddi_qty', $item->ddi_qty);
            oci_bind_by_name($stmt, ':ddi_unit', $item->ddi_unit);
            oci_bind_by_name($stmt, ':ddi_item_desc', $item->ddi_item_desc);
            oci_bind_by_name($stmt, ':ddi_duty_code', $item->ddi_duty_code);
            oci_bind_by_name($stmt, ':ddi_excise_lic_num', $item->ddi_excise_lic_num);
            oci_bind_by_name($stmt, ':ddi_ref_doc_num', $item->ddi_ref_doc_num);
            oci_bind_by_name($stmt, ':ddi_site_capacity', $item->ddi_site_capacity);
            oci_bind_by_name($stmt, ':ddi_tank_code', $item->ddi_tank_code);

            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        // update DN templates
        // retrieve old records
        $old_templates = $this->retrieve_ddd_items();

        foreach ($old_templates as $product => $item_array) {
            $still_exist = false;
            foreach ($this->ddd_items as $item) {
                // found existing record, do nothing
                if ($item->ddd_templ_id == $product) {
                    $still_exist = true;
                    break;
                }
            }
            
            // $product not found, need to remove it and its children
            if ($still_exist == false) {
                $query = "
                    DELETE FROM DELV_DETAILS_DN_ADDL_INFO
                    WHERE DDD_DD_NUMBER = :ddd_dd_number
                        AND DDD_DD_SUPP_CODE = :ddd_dd_supp_code
                        AND DDD_DD_TRIPORD_NO = :ddd_dd_tripord_no
                        AND DDD_DD_LD_TYPE = :ddd_dd_ld_type
                        AND DDD_TEMPL_ID = :ddd_templ_id
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
                oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
                oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
                oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
                oci_bind_by_name($stmt, ':ddd_templ_id', $product);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $query = "
                    DELETE FROM DELV_DETAILS_ITEM
                    WHERE DDI_DD_NUMBER = :ddi_dd_number
                        AND DDI_DD_SUPP_CODE = :ddi_dd_supp_code
                        AND DDI_DD_TRIPORD_NO = :ddi_dd_tripord_no
                        AND DDI_DD_LD_TYPE = :ddi_dd_ld_type
                        AND DDI_LINE_ITEM_NUM = :ddi_line_item_num
                        AND DDD_TEMPL_ID = :ddd_templ_id
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
                oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
                oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
                oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
                oci_bind_by_name($stmt, ':ddd_templ_id', $product);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($this->ddd_items as $item) {
            if (isset($old_templates[$item->ddd_templ_id])) {
                continue;
            }

            $query = "
                INSERT INTO DELV_DETAILS_DN (
                    DDD_DD_NUMBER
                    , DDD_DD_SUPP_CODE
                    , DDD_DD_TRIPORD_NO
                    , DDD_DD_LD_TYPE
                    , DDD_TEMPL_ID
                ) VALUES (
                    :ddd_dd_number
                    , :ddd_dd_supp_code
                    , :ddd_dd_tripord_no
                    , :ddd_dd_ld_type
                    , :ddd_templ_id
                )
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
            oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
            oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
            oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
            oci_bind_by_name($stmt, ':ddd_templ_id', $item->ddd_templ_id);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }


    /* protected function journal_children_change($journal, $old, $new)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
            
        // write_log(json_encode($old), __FILE__, __LINE__);
        // write_log(json_encode($new), __FILE__, __LINE__);
        $module = "movement item";
        foreach ($old as $item_key => $item_array) {
            // write_log($item_key, __FILE__, __LINE__);
            // write_log($value, __FILE__, __LINE__);
            if (isset($new[$item_key])) {
                foreach ($item_array as $field => $value) {
                    if ($new[$item_key][$field] != $value) {
                        $record = sprintf("mv_id:%s, item key:%s", $this->mv_id, $item_key);
                        $journal->valueChange($module, $record, $field, $value, $new[$item_key][$field]);
                    }
                }
            } 

            if (!isset($new[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("mv_id:%s, item key:%s", $this->mv_id, $item_key);
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
        foreach ($new as $item_key => $alloc_item) {
            if (!isset($old[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("mv_id:%s, item key:%s", $this->mv_id, $item_key);

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
    } */

}
