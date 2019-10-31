<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DELIVERYDETAIL')) define('DELIVERYDETAIL','DeliveryDetailService.class');

class DeliveryDetailService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
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
-- 						, ccp.CCP_CUST_ACCT				as PARTNER_CUST_ACCT
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
-- 						, ccp.CCP_CUST_ACCT				as PARTNER_CUST_ACCT
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
--				and sld.PARTNER_CUST_ACCT is null
--				and shp.PARTNER_CUST_ACCT is null
	";
	
/*
				and (
					( ( dd.DD_LD_TYPE!=3 ) and ( sld.PARTNER_CUST_ACCT is null and shp.PARTNER_CUST_ACCT is null ) )
					or 
					( ( dd.DD_LD_TYPE=3 ) and 
						( 
							(sld.PARTNER_CUST_ACCT in (select order_cust from cust_order where order_cust_ordno=dd.DD_TRIPORD_NO)) and 
							(shp.PARTNER_CUST_ACCT in (select order_cust from cust_order where order_cust_ordno=dd.DD_TRIPORD_NO))
						) 
					)
				)
*/
	
	public function __construct()
	{
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
			if( isset($_SERVER['HTTP_HOST']) )
			{
				$this->host = $_SERVER['HTTP_HOST'];
			}
			else
			{
				$this->host = "localhost";
			}
        }
/*        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "gantry/baseprods_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/baseprods_mod.cgi";
        }
*/		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) DDVIEW ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function getPaged($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 50)
	{
        $g = new GlobalClass();
	
		if ($values == "" || is_string($values) )
		{
			//$filter = $values;
			$filterObj = array();
			$filterObj['sql_text'] = $values;
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		} 
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY DD_SUPP_CODE, DD_TRIPORD_NO";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) DDVIEW ";
		//$query = $query . " $filter $sort ";
		$query = $query . " " . $filter['sql_text'] . " $sort ";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter['sql_data'];
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($queryPaged);
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 
         
    public function getDeliveryDetailItems( $dd_number, $dd_supp_code, $dd_tripord_no, $dd_ld_type )
	{
		$sql = array();
        $sql['sql_text'] = "
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
		$sql['sql_data'] = array( $dd_number, $dd_supp_code, $dd_tripord_no, $dd_ld_type );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getDeliveryDetailDNTemplates(  $dd_number, $dd_supp_code, $dd_tripord_no, $dd_ld_type  )
	{
		$sql = array();
        $sql['sql_text'] = "
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
		$sql['sql_data'] = array( $dd_number, $dd_supp_code, $dd_tripord_no, $dd_ld_type );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getDeliveryBOLTemplates(  $dd_supp_code, $dd_tripord_no, $dd_ld_type  )
	{
		$sql = array();
        $sql['sql_text'] = "
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
		$sql['sql_data'] = array( $dd_supp_code, $dd_tripord_no, $dd_ld_type );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getAllTemplatesByType(  $tmpl_type  )
	{
		$sql = array();
        $sql['sql_text'] = "
			select
				tmp.TEMPLATE_CODE
				, tmp.TEMPLATE_NAME
				, tmp.TEMPLATE_TYPE
			from 
				BOL_DN_TEMPLATE				tmp
			where
				1=1
				and tmp.TEMPLATE_TYPE = :tmpl_type
		";
		$sql['sql_data'] = array( $tmpl_type );
		
		/*
			select
				tmp.TEMPLATE_CODE
				, tmp.TEMPLATE_NAME
				, tmp.TEMPLATE_TYPE
				, tnc.TEMPLATE_IDENTIFIER
				, tnc.CMPY_CODE 
			from 
				BOL_DN_TEMPLATE				tmp
				, TEMPLATE_N_CMPY			tnc
			where
				tmp.TEMPLATE_CODE = tnc.TEMPLATE_CODE(+)
				and tmp.TEMPLATE_TYPE = tnc.TEMPLATE_TYPE(+)
				and tmp.TEMPLATE_TYPE = :tmpl_type
		*/
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getTripCompartments(  $supp_code, $trip_no  )
	{
		$sql = array();
        $sql['sql_text'] = "
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
		$sql['sql_data'] = array( $supp_code, $trip_no );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getTripProducts(  $supp_code, $trip_no  )
	{
		$sql = array();
        $sql['sql_text'] = "
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
		$sql['sql_data'] = array( $supp_code, $trip_no );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getOrderProducts(  $supp_code, $order_no  )
	{
		$sql = array();
        $sql['sql_text'] = "
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
		$sql['sql_data'] = array( $order_no, $supp_code );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

	
	
    public function isDeliveryDetailUsedByPrinting( $dd_number, $dd_supp_code, $dd_tripord_no, $dd_ld_type )
	{
		// 1: pre-order; 2: pre-schedule; 3: open order
		$sql = array();
		if ( $dd_ld_type == 3 )
		{
			$sql['sql_text'] = "
				select * 
				from SPECDETS 
				where 
					SCHD_DELIV_NUM=:dd_number
					and SCHDSPEC_SHLSSUPP=:dd_supp_code
					and SCHD_ORDER in (select ORDER_NO from CUST_ORDER where ORDER_CUST_ORDNO=:dd_tripord_no and ORDER_CUST in (select CUST_ACCT from CUSTOMER where CUST_SUPP=:dd_supp_code2))  
			";
			$sql['sql_data'] = array( $dd_number, $dd_supp_code, $dd_tripord_no, $dd_supp_code );
		}
		else
		{
			$sql['sql_text'] = "
				select * 
				from SPECDETS 
				where 
					SCHD_DELIV_NUM=:dd_number
					and SCHDSPEC_SHLSSUPP=:dd_supp_code
					and SCHDSPEC_SHLSTRIP=:dd_tripord_no
			";
			$sql['sql_data'] = array( $dd_number, $dd_supp_code, $dd_tripord_no );
		}
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function isDeliveryDetailExisted( $dd_number, $dd_supp_code, $dd_tripord_no, $dd_ld_type )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * 
			from DELV_DETAILS 
			where 
				DD_NUMBER=:dd_number
				and DD_SUPP_CODE=:dd_supp_code
				and DD_TRIPORD_NO=:dd_tripord_no
				and DD_LD_TYPE=:dd_ld_type
		";
		$sql['sql_data'] = array( $dd_number, $dd_supp_code, $dd_tripord_no, $dd_ld_type );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function isDeliveryDetailItemExisted( $ddi_dd_number, $ddi_dd_supp_code, $ddi_dd_tripord_no, $ddi_dd_ld_type, $ddi_line_item_num )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * 
			from DELV_DETAILS_ITEM 
			where 
				DDI_DD_NUMBER=:ddi_dd_number 
				and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
				and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
				and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
				and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
		";
		
		$sql['sql_data'] = array( $ddi_dd_number, $ddi_dd_supp_code, $ddi_dd_tripord_no, $ddi_dd_ld_type, $ddi_line_item_num );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function isDeliveryDetailDNTemplateExisted( $ddd_dd_number, $ddd_dd_supp_code, $ddd_dd_tripord_no, $ddd_dd_ld_type, $ddd_templ_id )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * 
			from DELV_DETAILS_DN 
			where 
				DDD_DD_NUMBER=:ddd_dd_number 
				and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
				and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
				and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and DDD_TEMPL_ID=:ddd_templ_id 
		";
		
		$sql['sql_data'] = array( $ddd_dd_number, $ddd_dd_supp_code, $ddd_dd_tripord_no, $ddd_dd_ld_type, $ddd_templ_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function isDeliveryBOLTemplateExisted( $db_supp_code, $db_tripord_no, $db_ld_type, $db_templ_id )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * 
			from DELV_BOL 
			where 
				DB_SUPP_CODE=:db_supp_code 
				and DB_TRIPORD_NO=:db_tripord_no 
				and DB_LD_TYPE=:db_ld_type 
				and DB_TEMPL_ID=:db_templ_id 
		";
		
		$sql['sql_data'] = array( $db_supp_code, $db_tripord_no, $db_ld_type, $db_templ_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

	public function lookupDeliveryDetailLoadType()
	{
		/*
        $sql="
			select 1 as LOAD_TYPE_ID, 'A' as LOAD_TYPE_CODE, 'Preschedule Load' as LOAD_TYPE_NAME from DUAL
			union 
			select 2 as LOAD_TYPE_ID, 'Q' as LOAD_TYPE_CODE, 'Preorder Load' as LOAD_TYPE_NAME from DUAL
			union 
			select 3 as LOAD_TYPE_ID, 'O' as LOAD_TYPE_CODE, 'Open Order' as LOAD_TYPE_NAME from DUAL
		";
		*/
        $sql="
			select 
				SHL_TYPE_ID															as LOAD_TYPE_ID
				, DECODE(SHL_TYPE_ID, 2, 'A', 1, 'Q', 3, 'O', SHL_TYPE_ID||'-')		as LOAD_TYPE_CODE
				, SHL_TYPE_NAME														as LOAD_TYPE_NAME
			from 
				SHL_TYPE_TYP
			where 
				SHL_TYPE_ID in (1,2,3) 
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

	public function lookupDeliveryDetailDelvType()
	{
        $sql="
			select 1 as DELIVERY_TYPE_ID, 'LF' as DELIVERY_TYPE_CODE, 'Outbound delivery' as DELIVERY_TYPE_NAME from DUAL
			union 
			select 2 as DELIVERY_TYPE_ID, 'WRD' as DELIVERY_TYPE_CODE, 'Customer returns' as DELIVERY_TYPE_NAME from DUAL
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

	
  
    
	public function createBOLTemplate( $data )
	{
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DELV_BOL
			( 
				DB_SUPP_CODE
				, DB_TRIPORD_NO
				, DB_LD_TYPE
				, DB_TEMPL_ID
			) 
			values 
			( 
				:db_supp_code
				, :db_tripord_no
				, :db_ld_type
				, :db_templ_id
			) 
		";
		$sql['sql_data'] = array(  
				$data->db_supp_code
				, $data->db_tripord_no
				, $data->db_ld_type
				, $data->db_templ_id
		);
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the delivery BOL template succeeded!!!",DELIVERYDETAIL);

		// write journal
		$keys = array ( "DB_TEMPL_ID"=>($data->db_templ_id), "DB_SUPP_CODE"=>($data->db_supp_code), "DB_TRIPORD_NO"=>($data->db_tripord_no), "DB_LD_TYPE"=>($data->db_ld_type) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Delivery BOL Templates", "DELV_BOL", $keys, $excludes );
		$ins_journal->logOneLine("created a delivery BOL template [" . $data->db_templ_id . ", " . $data->db_supp_code . ", " . $data->db_tripord_no . ", " . $data->db_ld_type . "] successfully");
		
		return "OK";
	}
    
	public function updateBOLTemplate( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DELV_BOL set 
				DB_TEMPL_ID       = :db_templ_id
			where 
				DB_SUPP_CODE   = :db_supp_code
				and DB_TRIPORD_NO  = :db_tripord_no
				and DB_LD_TYPE     = :db_ld_type
				and DB_TEMPL_ID  = :db_templ_id_old
		";
		$sql['sql_data'] = array(  
				$data->db_templ_id
				, $data->db_supp_code
				, $data->db_tripord_no
				, $data->db_ld_type
				, $data->db_templ_id_old
		);
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the delivery BOL template succeeded!!!",DELIVERYDETAIL);
		
		$keys = array ( "DB_TEMPL_ID"=>($data->db_templ_id), "DB_SUPP_CODE"=>($data->db_supp_code), "DB_TRIPORD_NO"=>($data->db_tripord_no), "DB_LD_TYPE"=>($data->db_ld_type) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Delivery BOL Templates", "DELV_BOL", $keys, $excludes );
		$upd_journal->logOneLine("updated a delivery BOL template [" . $data->db_templ_id . ", " . $data->db_supp_code . ", " . $data->db_tripord_no . ", " . $data->db_ld_type . "] successfully");
		
		return "OK";
	}
    
	public function deleteBOLTemplate( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_BOL 
			where 
				DB_SUPP_CODE   = :db_supp_code
				and DB_TRIPORD_NO  = :db_tripord_no
				and DB_LD_TYPE     = :db_ld_type
				and DB_TEMPL_ID       = :db_templ_id
		";
		$sql['sql_data'] = array(  
				$data->db_supp_code
				, $data->db_tripord_no
				, $data->db_ld_type
				, $data->db_templ_id
		);
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the delivery BOL template succeeded!!!",DELIVERYDETAIL);

		// write journal
		$keys = array ( "DB_TEMPL_ID"=>($data->db_templ_id), "DB_SUPP_CODE"=>($data->db_supp_code), "DB_TRIPORD_NO"=>($data->db_tripord_no), "DB_LD_TYPE"=>($data->db_ld_type) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Delivery BOL Templates", "DELV_BOL", $keys, $excludes );
		$del_journal->logOneLine("deleted a delivery BOL template [" . $data->db_templ_id . ", " . $data->db_supp_code . ", " . $data->db_tripord_no . ", " . $data->db_ld_type . "] successfully");
		
		return "OK";
	}

  
    
	public function createMain( $data )
	{
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DELV_DETAILS
			( 
				DD_NUMBER
				, DD_SUPP_CODE
				, DD_TRIPORD_NO
				, DD_LD_TYPE
				, DD_DELV_TYPE
				, DD_ROUTE
				, DD_SHIP_COND
				, DD_VEH_ARR_TIME
				, DD_PHONE
				, DD_INSTRUCTION
				, DD_LPG_REMARK
				, DD_SALES_ORD_NUM
				, DD_CUST_PO
				, DD_SALE_ORD_TYPE
				, DD_VAT_ID
				, DD_SOLD_TO
				, DD_SHIP_TO	
				, DD_CUSTOM_CODE
				, DD_LPG_DEST_TYPE
				, DD_PERMIT_NUM				
				, DD_SELL_CMPY_CODE				
			) 
			values 
			( 
				:dd_number
				, :dd_supp_code
				, :dd_tripord_no
				, :dd_ld_type
				, :dd_delv_type
				, :dd_route
				, :dd_ship_cond
				, to_date(:dd_veh_arr_time, 'YYYY-MM-DD HH24:MI:SS')
				, :dd_phone
				, :dd_instruction
				, :dd_lpg_remark
				, :dd_sales_ord_num
				, :dd_cust_po
				, :dd_sale_ord_type
				, :dd_vat_id
				, :dd_sold_to
				, :dd_ship_to		
				, :dd_custom_code
				, :dd_lpg_dest_type
				, :dd_permit_num				
				, :dd_sell_cmpy_code				
			) 
		";
		$sql['sql_data'] = array( 
				$data->dd_number
				, $data->dd_supp_code
				, $data->dd_tripord_no
				, $data->dd_ld_type
				, $data->dd_delv_type
				, $data->dd_route
				, $data->dd_ship_cond
				, $data->dd_veh_arr_time
				, $data->dd_phone
				, $data->dd_instruction
				, $data->dd_lpg_remark
				, $data->dd_sales_ord_num
				, $data->dd_cust_po
				, $data->dd_sale_ord_type
				, $data->dd_vat_id
				, $data->dd_sold_to
				, $data->dd_ship_to 
				, $data->dd_custom_code
				, $data->dd_lpg_dest_type
				, $data->dd_permit_num				
				, $data->dd_sell_cmpy_code				
				);
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the delivery details succeeded!!!",DELIVERYDETAIL);

		// write journal
		$keys = array ("DD_NUMBER"=>($data->dd_number), "DD_SUPP_CODE"=>($data->dd_supp_code), "DD_TRIPORD_NO"=>($data->dd_tripord_no), "DD_LD_TYPE"=>($data->dd_ld_type) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Delivery Details", "DELV_DETAILS", $keys, $excludes );
		$ins_journal->logOneLine("created a delivery details for [" . $data->dd_number . ", " . $data->dd_supp_code . ", " . $data->dd_tripord_no . ", " . $data->dd_ld_type . "] successfully");
		
		return "OK";
	}
    
	public function updateMain( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DELV_DETAILS set 
				DD_DELV_TYPE     = :dd_delv_type
				, DD_ROUTE         = :dd_route
				, DD_SHIP_COND     = :dd_ship_cond
				, DD_VEH_ARR_TIME  = to_date(:dd_veh_arr_time, 'YYYY-MM-DD HH24:MI:SS')
				, DD_PHONE         = :dd_phone
				, DD_INSTRUCTION   = :dd_instruction
				, DD_LPG_REMARK    = :dd_lpg_remark
				, DD_SALES_ORD_NUM = :dd_sales_ord_num
				, DD_CUST_PO       = :dd_cust_po
				, DD_SALE_ORD_TYPE = :dd_sale_ord_type
				, DD_VAT_ID        = :dd_vat_id
				, DD_SOLD_TO       = :dd_sold_to
				, DD_SHIP_TO       = :dd_ship_to		
				, DD_CUSTOM_CODE   = :dd_custom_code		
				, DD_LPG_DEST_TYPE = :dd_lpg_dest_type		
				, DD_PERMIT_NUM    = :dd_permit_num		
				, DD_SELL_CMPY_CODE    = :dd_sell_cmpy_code		
			where 
				DD_NUMBER          = :dd_number
				and DD_SUPP_CODE     = :dd_supp_code
				and DD_TRIPORD_NO    = :dd_tripord_no
				and DD_LD_TYPE       = :dd_ld_type
		";
		$sql['sql_data'] = array( 
				$data->dd_delv_type
				, $data->dd_route
				, $data->dd_ship_cond
				, $data->dd_veh_arr_time
				, $data->dd_phone
				, $data->dd_instruction
				, $data->dd_lpg_remark
				, $data->dd_sales_ord_num
				, $data->dd_cust_po
				, $data->dd_sale_ord_type
				, $data->dd_vat_id
				, $data->dd_sold_to
				, $data->dd_ship_to 
				, $data->dd_custom_code
				, $data->dd_lpg_dest_type
				, $data->dd_permit_num				
				, $data->dd_sell_cmpy_code				
				, $data->dd_number
				, $data->dd_supp_code
				, $data->dd_tripord_no
				, $data->dd_ld_type
				);
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the delivery details succeeded!!!",DELIVERYDETAIL);
		
		$keys = array ("DD_NUMBER"=>($data->dd_number), "DD_SUPP_CODE"=>($data->dd_supp_code), "DD_TRIPORD_NO"=>($data->dd_tripord_no), "DD_LD_TYPE"=>($data->dd_ld_type) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Delivery Details", "DELV_DETAILS", $keys, $excludes );
		$upd_journal->logOneLine("updated a delivery detail from [" . $data->dd_number . ", " . $data->dd_supp_code . ", " . $data->dd_tripord_no . ", " . $data->dd_ld_type . "] successfully");
		
		return "OK";
	}
    
	public function deleteMain( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS 
			where 
				DD_NUMBER          = :dd_number
				and DD_SUPP_CODE     = :dd_supp_code
				and DD_TRIPORD_NO    = :dd_tripord_no
				and DD_LD_TYPE       = :dd_ld_type
		";
		$sql['sql_data'] = array( 
				$data->dd_number
				, $data->dd_supp_code
				, $data->dd_tripord_no
				, $data->dd_ld_type
				);
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the delivery details succeeded!!!",DELIVERYDETAIL);

		// write journal
		$keys = array ("DD_NUMBER"=>($data->dd_number), "DD_SUPP_CODE"=>($data->dd_supp_code), "DD_TRIPORD_NO"=>($data->dd_tripord_no), "DD_LD_TYPE"=>($data->dd_ld_type) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Delivery Details", "DELV_DETAILS", $keys, $excludes );
		$del_journal->logOneLine("deleted a delivery detail [" . $data->dd_number . ", " . $data->dd_supp_code . ", " . $data->dd_tripord_no . ", " . $data->dd_ld_type . "] successfully");
		
		return "OK";
	}

  
    
	public function createLine( $data )
	{
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DELV_DETAILS_ITEM
			( 
				DDI_DD_NUMBER
				, DDI_DD_SUPP_CODE
				, DDI_DD_TRIPORD_NO
				, DDI_DD_LD_TYPE
				, DDI_ITEM_CAT
				, DDI_LINE_ITEM_NUM
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
			) 
			values 
			( 
				:ddi_dd_number
				, :ddi_dd_supp_code
				, :ddi_dd_tripord_no
				, :ddi_dd_ld_type
				, :ddi_item_cat
				, :ddi_line_item_num
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
		$sql['sql_data'] = array(  
				$data->ddi_dd_number
				, $data->ddi_dd_supp_code
				, $data->ddi_dd_tripord_no
				, $data->ddi_dd_ld_type
				, $data->ddi_item_cat
				, $data->ddi_line_item_num
				, $data->ddi_cmpt_num
				, $data->ddi_prod_code
				, $data->ddi_cmpy_code
				, $data->ddi_qty
				, $data->ddi_unit
				, $data->ddi_item_desc
				, $data->ddi_duty_code
				, $data->ddi_excise_lic_num
				, $data->ddi_ref_doc_num
				, $data->ddi_site_capacity
				, $data->ddi_tank_code
		);
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the delivery detail item succeeded!!!",DELIVERYDETAIL);

		// write journal
		$keys = array ( "DDI_LINE_ITEM_NUM"=>($data->ddi_line_item_num), "DDI_DD_NUMBER"=>($data->ddi_dd_number), "DDI_DD_SUPP_CODE"=>($data->ddi_dd_supp_code), "DDI_DD_TRIPORD_NO"=>($data->ddi_dd_tripord_no), "DDI_DD_LD_TYPE"=>($data->ddi_dd_ld_type) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Delivery Detail Items", "DELV_DETAILS_ITEM", $keys, $excludes );
		$ins_journal->logOneLine("created a delivery detail item [" . $data->ddi_line_item_num . ", " . $data->ddi_dd_number . ", " . $data->ddi_dd_supp_code . ", " . $data->ddi_dd_tripord_no . ", " . $data->ddi_dd_ld_type . "] successfully");
		
		return "OK";
	}
    
	public function updateLine( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DELV_DETAILS_ITEM set 
				DDI_ITEM_CAT       = :ddi_item_cat
				, DDI_CMPT_NUM       = :ddi_cmpt_num
				, DDI_PROD_CODE      = :ddi_prod_code
				, DDI_CMPY_CODE      = :ddi_cmpy_code
				, DDI_QTY            = :ddi_qty
				, DDI_UNIT           = :ddi_unit
				, DDI_ITEM_DESC      = :ddi_item_desc
				, DDI_DUTY_CODE      = :ddi_duty_code
				, DDI_EXCISE_LIC_NUM = :ddi_excise_lic_num
				, DDI_REF_DOC_NUM    = :ddi_ref_doc_num
				, DDI_SITE_CAPACITY  = :ddi_site_capacity
				, DDI_TANK_CODE      = :ddi_tank_code
			where 
				DDI_DD_NUMBER      = :ddi_dd_number
				and DDI_DD_SUPP_CODE   = :ddi_dd_supp_code
				and DDI_DD_TRIPORD_NO  = :ddi_dd_tripord_no
				and DDI_DD_LD_TYPE     = :ddi_dd_ld_type
				and DDI_LINE_ITEM_NUM  = :ddi_line_item_num
		";
		$sql['sql_data'] = array(  
				$data->ddi_item_cat
				, $data->ddi_cmpt_num
				, $data->ddi_prod_code
				, $data->ddi_cmpy_code
				, $data->ddi_qty
				, $data->ddi_unit
				, $data->ddi_item_desc
				, $data->ddi_duty_code
				, $data->ddi_excise_lic_num
				, $data->ddi_ref_doc_num
				, $data->ddi_site_capacity
				, $data->ddi_tank_code
				, $data->ddi_dd_number
				, $data->ddi_dd_supp_code
				, $data->ddi_dd_tripord_no
				, $data->ddi_dd_ld_type
				, $data->ddi_line_item_num
		);
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the delivery detail item succeeded!!!",DELIVERYDETAIL);
		
		$keys = array ( "DDI_LINE_ITEM_NUM"=>($data->ddi_line_item_num), "DDI_DD_NUMBER"=>($data->ddi_dd_number), "DDI_DD_SUPP_CODE"=>($data->ddi_dd_supp_code), "DDI_DD_TRIPORD_NO"=>($data->ddi_dd_tripord_no), "DDI_DD_LD_TYPE"=>($data->ddi_dd_ld_type) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Delivery Detail Items", "DELV_DETAILS_ITEM", $keys, $excludes );
		$upd_journal->logOneLine("updated a delivery detail item [" . $data->ddi_line_item_num . ", " . $data->ddi_dd_number . ", " . $data->ddi_dd_supp_code . ", " . $data->ddi_dd_tripord_no . ", " . $data->ddi_dd_ld_type . "] successfully");
		
		return "OK";
	}
    
	public function deleteLine( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS_ITEM 
			where 
				DDI_DD_NUMBER      = :ddi_dd_number
				and DDI_DD_SUPP_CODE   = :ddi_dd_supp_code
				and DDI_DD_TRIPORD_NO  = :ddi_dd_tripord_no
				and DDI_DD_LD_TYPE     = :ddi_dd_ld_type
				and DDI_LINE_ITEM_NUM  = :ddi_line_item_num
		";
		$sql['sql_data'] = array(  
				$data->ddi_dd_number
				, $data->ddi_dd_supp_code
				, $data->ddi_dd_tripord_no
				, $data->ddi_dd_ld_type
				, $data->ddi_line_item_num
		);
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the delivery detail item succeeded!!!",DELIVERYDETAIL);

		// write journal
		$keys = array ( "DDI_LINE_ITEM_NUM"=>($data->ddi_line_item_num), "DDI_DD_NUMBER"=>($data->ddi_dd_number), "DDI_DD_SUPP_CODE"=>($data->ddi_dd_supp_code), "DDI_DD_TRIPORD_NO"=>($data->ddi_dd_tripord_no), "DDI_DD_LD_TYPE"=>($data->ddi_dd_ld_type) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Delivery Detail Items", "DELV_DETAILS_ITEM", $keys, $excludes );
		$del_journal->logOneLine("deleted a delivery detail item [" . $data->ddi_line_item_num . ", " . $data->ddi_dd_number . ", " . $data->ddi_dd_supp_code . ", " . $data->ddi_dd_tripord_no . ", " . $data->ddi_dd_ld_type . "] successfully");
		
		return "OK";
	}

  
    
	public function createDNTemplate( $data )
	{
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DELV_DETAILS_DN
			( 
				DDD_DD_NUMBER
				, DDD_DD_SUPP_CODE
				, DDD_DD_TRIPORD_NO
				, DDD_DD_LD_TYPE
				, DDD_TEMPL_ID
			) 
			values 
			( 
				:ddd_dd_number
				, :ddd_dd_supp_code
				, :ddd_dd_tripord_no
				, :ddd_dd_ld_type
				, :ddd_templ_id
			) 
		";
		$sql['sql_data'] = array(  
				$data->ddd_dd_number
				, $data->ddd_dd_supp_code
				, $data->ddd_dd_tripord_no
				, $data->ddd_dd_ld_type
				, $data->ddd_templ_id
		);
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the delivery detail DN template succeeded!!!",DELIVERYDETAIL);

		// write journal
		$keys = array ( "DDD_TEMPL_ID"=>($data->ddd_templ_id), "DDD_DD_NUMBER"=>($data->ddd_dd_number), "DDD_DD_SUPP_CODE"=>($data->ddd_dd_supp_code), "DDD_DD_TRIPORD_NO"=>($data->ddd_dd_tripord_no), "DDD_DD_LD_TYPE"=>($data->ddd_dd_ld_type) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Delivery Detail DN Templates", "DELV_DETAILS_DN", $keys, $excludes );
		$ins_journal->logOneLine("created a delivery detail DN template [" . $data->ddd_templ_id . ", " . $data->ddd_dd_number . ", " . $data->ddd_dd_supp_code . ", " . $data->ddd_dd_tripord_no . ", " . $data->ddd_dd_ld_type . "] successfully");
		
		return "OK";
	}
    
	public function updateDNTemplate( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DELV_DETAILS_DN set 
				DDD_TEMPL_ID       = :ddd_templ_id
			where 
				DDD_DD_NUMBER      = :ddd_dd_number
				and DDD_DD_SUPP_CODE   = :ddd_dd_supp_code
				and DDD_DD_TRIPORD_NO  = :ddd_dd_tripord_no
				and DDD_DD_LD_TYPE     = :ddd_dd_ld_type
				and DDD_TEMPL_ID  = :ddd_templ_id_old
		";
		$sql['sql_data'] = array(  
				$data->ddd_templ_id
				, $data->ddd_dd_number
				, $data->ddd_dd_supp_code
				, $data->ddd_dd_tripord_no
				, $data->ddd_dd_ld_type
				, $data->ddd_templ_id_old
		);
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the delivery detail DN template succeeded!!!",DELIVERYDETAIL);
		
		$keys = array ( "DDD_TEMPL_ID"=>($data->ddd_templ_id), "DDD_DD_NUMBER"=>($data->ddd_dd_number), "DDD_DD_SUPP_CODE"=>($data->ddd_dd_supp_code), "DDD_DD_TRIPORD_NO"=>($data->ddd_dd_tripord_no), "DDD_DD_LD_TYPE"=>($data->ddd_dd_ld_type) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Delivery Detail DN Templates", "DELV_DETAILS_DN", $keys, $excludes );
		$upd_journal->logOneLine("updated a delivery detail DN template [" . $data->ddd_templ_id . ", " . $data->ddd_dd_number . ", " . $data->ddd_dd_supp_code . ", " . $data->ddd_dd_tripord_no . ", " . $data->ddd_dd_ld_type . "] successfully");
		
		return "OK";
	}
    
	public function deleteDNTemplate( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS_DN 
			where 
				DDD_DD_NUMBER      = :ddd_dd_number
				and DDD_DD_SUPP_CODE   = :ddd_dd_supp_code
				and DDD_DD_TRIPORD_NO  = :ddd_dd_tripord_no
				and DDD_DD_LD_TYPE     = :ddd_dd_ld_type
				and DDD_TEMPL_ID       = :ddd_templ_id
		";
		$sql['sql_data'] = array(  
				$data->ddd_dd_number
				, $data->ddd_dd_supp_code
				, $data->ddd_dd_tripord_no
				, $data->ddd_dd_ld_type
				, $data->ddd_templ_id
		);
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the delivery detail DN template succeeded!!!",DELIVERYDETAIL);

		// write journal
		$keys = array ( "DDD_TEMPL_ID"=>($data->ddd_templ_id), "DDD_DD_NUMBER"=>($data->ddd_dd_number), "DDD_DD_SUPP_CODE"=>($data->ddd_dd_supp_code), "DDD_DD_TRIPORD_NO"=>($data->ddd_dd_tripord_no), "DDD_DD_LD_TYPE"=>($data->ddd_dd_ld_type) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Delivery Detail DN Templates", "DELV_DETAILS_DN", $keys, $excludes );
		$del_journal->logOneLine("deleted a delivery detail DN template [" . $data->ddd_templ_id . ", " . $data->ddd_dd_number . ", " . $data->ddd_dd_supp_code . ", " . $data->ddd_dd_tripord_no . ", " . $data->ddd_dd_ld_type . "] successfully");
		
		return "OK";
	}

  
    
	public function create( $data )
	{
		// add delivery details
		$res = $this->createMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// add delivery detail item
		if ( is_array($data->ddi_items) === FALSE )
		{
			$data->ddi_items = (array)($data->ddi_items);
		}
		if( $data->has_items_ddi=="1" && sizeof($data->ddi_items) > 0 )
		{
			for($i=0; $i<sizeof($data->ddi_items); $i++)
			{      
				$line_item = $data->ddi_items[$i];
				$lineResult = $this->createLine( $line_item );
				if ( $lineResult != "OK" )
				{
					return $lineResult;
				}
			}
		}
		
		// add delivery detail DN templates
		if ( is_array($data->ddd_items) === FALSE )
		{
			$data->ddd_items = (array)($data->ddd_items);
		}
		if( $data->has_items_ddd=="1" && sizeof($data->ddd_items) > 0 )
		{
			for($i=0; $i<sizeof($data->ddd_items); $i++)
			{      
				$line_item = $data->ddd_items[$i];
				$lineResult = $this->createDNTemplate( $line_item );
				if ( $lineResult != "OK" )
				{
					return $lineResult;
				}
			}
		}
		
		// add delivery BOL templates
		if ( is_array($data->ddb_items) === FALSE )
		{
			$data->ddb_items = (array)($data->ddb_items);
		}
		if( $data->has_items_ddb=="1" && sizeof($data->ddb_items) > 0 )
		{
			for($i=0; $i<sizeof($data->ddb_items); $i++)
			{      
				$line_item = $data->ddb_items[$i];
				if ( $line_item->db_action == '+' )
				{
					$lineResult = $this->createBOLTemplate( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $line_item->db_action == '-' )
				{
					$lineResult = $this->deleteBOLTemplate( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				{ // do nothing
					continue; 
				}
			}
		}
		
        return "OK";
	}
    
	public function update( $data )
	{
		// update delivery details
		$res = $this->updateMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		
		// update delivery detail item
		if ( is_array($data->ddi_items) === FALSE )
		{
			$data->ddi_items = (array)($data->ddi_items);
		}
		if( $data->has_items_ddi=="1" && sizeof($data->ddi_items) > 0 )
		{
			for($i=0; $i<sizeof($data->ddi_items); $i++)
			{   
				$line_item = $data->ddi_items[$i];
				if ( $data->actions_ddi[$i]->option == "1" )
				{ // insert new delivery detail item
					$lineResult = $this->createLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions_ddi[$i]->option == "2" )
				{ // update existing delivery detail item
					$lineResult = $this->updateLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions_ddi[$i]->option == "3" )
				{ // delete existing delivery detail item
					$lineResult = $this->deleteLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
		
		// update delivery detail DN templates
		if ( is_array($data->ddd_items) === FALSE )
		{
			$data->ddd_items = (array)($data->ddd_items);
		}
		if( $data->has_items_ddd=="1" && sizeof($data->ddd_items) > 0 )
		{
			for($i=0; $i<sizeof($data->ddd_items); $i++)
			{   
				$line_item = $data->ddd_items[$i];
				if ( $data->actions_ddd[$i]->option == "1" )
				{ // insert new delivery detail DN template
					$lineResult = $this->createDNTemplate( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions_ddd[$i]->option == "2" )
				{ // update existing delivery detail DN template
					$lineResult = $this->updateDNTemplate( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions_ddd[$i]->option == "3" )
				{ // delete existing delivery detail DN template
					$lineResult = $this->deleteDNTemplate( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
		
		// update delivery BOL templates
		if ( is_array($data->ddb_items) === FALSE )
		{
			$data->ddb_items = (array)($data->ddb_items);
		}
		if( $data->has_items_ddb=="1" && sizeof($data->ddb_items) > 0 )
		{
			for($i=0; $i<sizeof($data->ddb_items); $i++)
			{   
				$line_item = $data->ddb_items[$i];
				if ( $data->actions_ddb[$i]->option == "1" )
				{ // insert new delivery detail BOL template
					$lineResult = $this->createBOLTemplate( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions_ddb[$i]->option == "2" )
				{ // update existing delivery detail BOL template
					$lineResult = $this->updateBOLTemplate( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions_ddb[$i]->option == "3" )
				{ // delete existing delivery detail BOL template
					$lineResult = $this->deleteBOLTemplate( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
        return "OK";
	}
    
	public function deleteAllItems( $data )
	{
		// delete all delivery detail items
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS_ITEM 
			where 
				DDI_DD_NUMBER      = :ddi_dd_number
				and DDI_DD_SUPP_CODE   = :ddi_dd_supp_code
				and DDI_DD_TRIPORD_NO  = :ddi_dd_tripord_no
				and DDI_DD_LD_TYPE     = :ddi_dd_ld_type
		";
		$sql['sql_data'] = array( 
				$data->dd_number
				, $data->dd_supp_code
				, $data->dd_tripord_no
				, $data->dd_ld_type
				);
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete ALL the delivery details items succeeded!!!",DELIVERYDETAIL);
		
		return "OK";
	}
    
	public function deleteAllTemplates( $data )
	{
		// delete all delivery detail DN templates
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS_DN 
			where 
				DDD_DD_NUMBER      = :ddd_dd_number
				and DDD_DD_SUPP_CODE   = :ddd_dd_supp_code
				and DDD_DD_TRIPORD_NO  = :ddd_dd_tripord_no
				and DDD_DD_LD_TYPE     = :ddd_dd_ld_type
		";
		$sql['sql_data'] = array( 
				$data->dd_number
				, $data->dd_supp_code
				, $data->dd_tripord_no
				, $data->dd_ld_type
				);
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete ALL the delivery details DN templates succeeded!!!",DELIVERYDETAIL);
		
		return "OK";
	}

    public function isDeliveryDetailExistedForBOL( $dd_supp_code, $dd_tripord_no, $dd_ld_type )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * 
			from DELV_DETAILS 
			where 
				1=1
				and DD_SUPP_CODE=:dd_supp_code
				and DD_TRIPORD_NO=:dd_tripord_no
				and DD_LD_TYPE=:dd_ld_type
		";
		$sql['sql_data'] = array( $dd_supp_code, $dd_tripord_no, $dd_ld_type );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}
    
	public function deleteAllBOLTemplates( $data )
	{
		// check if no delivery number for this supplier, trip/order, and load type
		if ( $this->isDeliveryDetailExistedForBOL( $data->dd_supp_code, $data->dd_tripord_no, $data->dd_ld_type ) > 0 )
		{
			return "OK";
		}			
		
		// delete all delivery detail DN templates
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_BOL 
			where 
				DB_SUPP_CODE   = :db_supp_code
				and DB_TRIPORD_NO  = :db_tripord_no
				and DB_LD_TYPE     = :db_ld_type
		";
		$sql['sql_data'] = array(  
				$data->dd_supp_code
				, $data->dd_tripord_no
				, $data->dd_ld_type
		);
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete ALL the delivery BOL templates succeeded!!!",DELIVERYDETAIL);
		
		return "OK";
	}
    
	public function delete( $data )
	{
		// delete all delivery detail items
        $comment_res = $this->deleteAllItems($data);
		if ( $comment_res != "OK" )
		{
			return "ERROR";
		}
		
		// delete all delivery detail DN templates
        $comment_res = $this->deleteAllTemplates($data);
		if ( $comment_res != "OK" )
		{
			return "ERROR";
		}
		
		// delete delivery details
		$res = $this->deleteMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// delete all delivery BOL templates
        $comment_res = $this->deleteAllBOLTemplates($data);
		if ( $comment_res != "OK" )
		{
			return "ERROR";
		}
		
		return "OK";
	}
	
}
?>