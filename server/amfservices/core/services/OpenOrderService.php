<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('CUSTORDER')) define('CUSTORDER','OpenOrderService.class');

class OpenOrderService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	
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
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "cust_ord/order_ent_maint.cgi";
            $this->cgi_items = CGIDIR . "cust_ord/order_det.cgi";
            $this->cgi_periods = CGIDIR . "cust_ord/order_period.cgi";
            $this->cgi_approve = CGIDIR . "cust_ord/order_approve.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/cust_ord/order_ent_maint.cgi";
            $this->cgi_items ="cgi-bin/en/cust_ord/order_det.cgi";
            $this->cgi_periods ="cgi-bin/en/cust_ord/order_period.cgi";
            $this->cgi_approve = "cgi-bin/en/cust_ord/order_approve.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM GUI_ORDERS";
			
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
		else $sort="ORDER BY ORDER_EXP_TIME DESC";
		
		//$query = "SELECT * FROM GUI_ORDERS $filter $sort";
		$query = "SELECT * FROM GUI_ORDERS " . $filter['sql_text'] . " $sort";

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


    public function getOrderInstructionsAsArray( $order_id, $counter )
	{
		/*
		$sql="
			select
				OI_ORDER_NO 			as OINST_ORDER
				, OI_INSTR_COUNTER 		as OINST_COUNTER
				, OI_INSTRUCTION 		as OINST_TEXT
			from
				ORD_INSTRUCT
			where 
				OI_ORDER_NO=$order_id  
				and (-1=$counter or OI_INSTR_COUNTER=$counter) 
		";
		*/	
		$sql = array();
        $sql['sql_text'] = "
			select
				OI_ORDER_NO 			as OINST_ORDER
				, OI_INSTR_COUNTER 		as OINST_COUNTER
				, OI_INSTRUCTION 		as OINST_TEXT
			from
				ORD_INSTRUCT
			where 
				OI_ORDER_NO=:order_id  
				and (-1=:order_counter or OI_INSTR_COUNTER=:order_counter) 
		";
		$sql['sql_data'] = array( $order_id, $counter );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getOrderInstructions( $order_id, $counter )
	{
		/*
		$sql="
			select
				OI_ORDER_NO 			as OINST_ORDER
				, OI_INSTR_COUNTER 		as OINST_COUNTER
				, OI_INSTRUCTION 		as OINST_TEXT
			from
				ORD_INSTRUCT
			where 
				OI_ORDER_NO=$order_id  
				and (-1=$counter or OI_INSTR_COUNTER=$counter) 
		";
		*/	
		$sql = array();
        $sql['sql_text'] = "
			select
				OI_ORDER_NO 			as OINST_ORDER
				, OI_INSTR_COUNTER 		as OINST_COUNTER
				, OI_INSTRUCTION 		as OINST_TEXT
			from
				ORD_INSTRUCT
			where 
				OI_ORDER_NO=:order_id  
				and (-1=:order_counter or OI_INSTR_COUNTER=:order_counter) 
		";
		$sql['sql_data'] = array( $order_id, $counter );
		
        $mydb = DB::getInstance();
	    $rows = $mydb->query($sql, "N"); 

		//XarrayEncodingConversion($rows);
	
        $txt = "";
        foreach( $rows as $x )
		{
            $txt .= $x->OINST_TEXT;
        }
        
		return $txt;
	}
         
    public function getOrderItems( $order_id )
	{
		/*
		$sql="
			select
				OITEM_ORDER_ID
				, OITEM_PROD_CODE
				, OITEM_PROD_CMPY
				, OITEM_PROD_NAME
				, OITEM_DRWR_NAME
				, OITEM_PROD_QTY
				, OITEM_PROD_UNIT
				, OITEM_UNIT_NAME
				, NVL(OITEM_BY_PACKS, 'N') as OITEM_BY_PACKS 
				, OITEM_PACK_SIZE
				, (OITEM_PROD_QTY-OITEM_SCHD_QTY) as OITEM_SCHD_QTY
				, (OITEM_PROD_QTY-OITEM_LOAD_QTY) as OITEM_LOAD_QTY
				, OITEM_DELV_QTY
				, OITEM_EXEMPT_NO
				, OITEM_PADJ_CODE
				, OITEM_PADJ_NAME
				, OITEM_PRICE_TYPE
				, OITEM_PRICE_NAME
				, OITEM_PROD_PRICE
				, OITEM_PERIOD_NO
				, OITEM_LINE_NO
				, OITEM_PROD_QTY  as OITEM_PROD_QTY2
			from
				GUI_ORDER_ITEMS
			where 
				OITEM_ORDER_ID=$order_id 
			order by
				OITEM_ORDER_ID, OITEM_LINE_NO
		";
		*/	
		$sql = array();
        $sql['sql_text'] = "
			select
				OITEM_ORDER_ID
				, OITEM_PROD_CODE
				, OITEM_PROD_CMPY
				, OITEM_PROD_NAME
				, OITEM_DRWR_NAME
				, OITEM_PROD_QTY
				, OITEM_PROD_UNIT
				, OITEM_UNIT_NAME
				, NVL(OITEM_BY_PACKS, 'N') as OITEM_BY_PACKS 
				, OITEM_PACK_SIZE
				, (OITEM_PROD_QTY-OITEM_SCHD_QTY) as OITEM_SCHD_QTY
				, (OITEM_PROD_QTY-OITEM_LOAD_QTY) as OITEM_LOAD_QTY
				, OITEM_DELV_QTY
				, OITEM_EXEMPT_NO
				, OITEM_PADJ_CODE
				, OITEM_PADJ_NAME
				, OITEM_PRICE_TYPE
				, OITEM_PRICE_NAME
				, OITEM_PROD_PRICE
				, OITEM_PERIOD_NO
				, OITEM_LINE_NO
				, OITEM_PROD_QTY  as OITEM_PROD_QTY2
			from
				GUI_ORDER_ITEMS
			where 
				OITEM_ORDER_ID=:order_id 
			order by
				OITEM_ORDER_ID, OITEM_LINE_NO
		";
		$sql['sql_data'] = array( $order_id );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
/*		
        $rows = $mydb->query($sql);
		//error_log( "\n".$sql, 3, "temp.log");
		
        $arr = array();
        foreach($rows as $x){
            $periods = $this->getOrderPeriods( $x->OITEM_ORDER_ID, $x->OITEM_PROD_CODE, $x->OITEM_PROD_CMPY );
            $x->oitem_periods = $periods;
            //$schedules = $this->getOrderItemSchedules( $x->OITEM_ORDER_ID, $x->OITEM_PROD_CODE, $x->OITEM_PROD_CMPY );
            //$x->oitem_schedules = $schedules;
            $arr[] = $x;
        }
        
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "GUI_ORDER_ITEMS")));       
*/		
	}
         
    public function initOrderItems( $drawer )
	{
		/*
		$sql="
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
				(PROD_CMPY='$drawer') 
			order by
				PROD_CMPY, PROD_CODE
		";
		*/	
		$sql = array();
        $sql['sql_text'] = "
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
		$sql['sql_data'] = array( $drawer );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
/*		
        $arr = array();
        foreach($rows as $x){
            $periods = $this->initOrderPeriods( $x->OITEM_ORDER_ID, $x->OITEM_PROD_CODE, $x->OITEM_PROD_CMPY );
            $x->oitem_periods = $periods;
            $arr[] = $x;
        }
        
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "GUI_ORDER_ITEMS")));      
*/		
	}
         
    public function getOrderPeriods( $order_id, $prod_code, $prod_cmpy )
	{
		/*
		$sql="
			select
				OPRD_ORDER_ID
				, OPRD_PROD_CODE
				, OPRD_PROD_CMPY
				, OPRD_PROD_NAME
				, OPRD_DRWR_NAME
				, OPRD_PERIOD_NO
				, DECODE(OPRD_PERIOD_START, NULL, '', TO_CHAR(OPRD_PERIOD_START, 'YYYY-MM-DD')) as OPRD_PERIOD_START
				, DECODE(OPRD_PERIOD_END, NULL, '', TO_CHAR(OPRD_PERIOD_END, 'YYYY-MM-DD')) as OPRD_PERIOD_END
				, OPRD_PROD_UNIT
				, OPRD_UNIT_NAME
				, OPRD_PROD_QTY
				, OPRD_PROD_USED
				, NVL(OPRD_PRICE_FIXED, 'N') as OPRD_PRICE_FIXED
				, OPRD_PROD_PRICE
			from
				GUI_ORDER_PERIODS
			where 
				OPRD_ORDER_ID=$order_id  
				and OPRD_PROD_CODE='$prod_code'
				and OPRD_PROD_CMPY='$prod_cmpy'  
			order by 
				OPRD_ORDER_ID, OPRD_PROD_CODE, OPRD_PROD_CMPY, OPRD_PERIOD_NO
		";
		*/	
		
		$sql = array();
        $sql['sql_text'] = "
			select
				OPRD_ORDER_ID
				, OPRD_PROD_CODE
				, OPRD_PROD_CMPY
				, OPRD_PROD_NAME
				, OPRD_DRWR_NAME
				, OPRD_PERIOD_NO
				, DECODE(OPRD_PERIOD_START, NULL, '', TO_CHAR(OPRD_PERIOD_START, 'YYYY-MM-DD')) as OPRD_PERIOD_START
				, DECODE(OPRD_PERIOD_END, NULL, '', TO_CHAR(OPRD_PERIOD_END, 'YYYY-MM-DD')) as OPRD_PERIOD_END
				, OPRD_PROD_UNIT
				, OPRD_UNIT_NAME
				, OPRD_PROD_QTY
				, OPRD_PROD_USED
				, NVL(OPRD_PRICE_FIXED, 'N') as OPRD_PRICE_FIXED
				, OPRD_PROD_PRICE
			from
				GUI_ORDER_PERIODS
			where 
				OPRD_ORDER_ID=:order_id  
				and OPRD_PROD_CODE=:order_prod_code
				and OPRD_PROD_CMPY=:order_prod_cmpy  
			order by 
				OPRD_ORDER_ID, OPRD_PROD_CODE, OPRD_PROD_CMPY, OPRD_PERIOD_NO
		";
		$sql['sql_data'] = array( $order_id, $prod_code, $prod_cmpy );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getOrderSchedules( $order_id )
	{
		/*
		$sql="
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
				and co.ORDER_NO=$order_id 
			order by
				sd.SHLS_SUPP, sd.SHLS_TRIP_NO
		";
		*/	
		
		$sql = array();
        $sql['sql_text'] = "
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
		$sql['sql_data'] = array( $order_id );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

    public function isSingleOrderToOneTripCmpt()
	{
		$sql = "select * from SITE_CONFIG where CONFIG_KEY='OO_TO_ONE_TRIP' and CONFIG_VALUE='S'";
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }
         
    public function getOrderItemSchedules( $order_id, $prod_code, $prod_cmpy )
	{
		$singleOO = $this->isSingleOrderToOneTripCmpt();
		
		if ( $singleOO == 1 )
		{
			// single open order is assigned to one trip compartment
			/*
			$sql = "
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
					sc.SCHD_ORDER = $order_id 
					and sc.SCHDPROD_PRODCODE = '$prod_code' 
					and sc.SCHDPROD_PRODCMPY = '$prod_cmpy' 
					and sc.SCHDSPEC_SHLSSUPP = sp.CMPY_CODE 
					and sc.SCHDPROD_PRODCODE = pd.PROD_CODE  
					and sc.SCHDPROD_PRODCMPY = pd.PROD_CMPY  
					and sc.SCHD_UNITS = un.UNIT_ID 
				order by
					sc.SCHDSPEC_SHLSSUPP, sc.SCHDSPEC_SHLSTRIP, sc.SCHD_COMP_ID 
			";
			*/
			$sql = array();
			$sql['sql_text'] = "
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
			$sql['sql_data'] = array( $order_id, $prod_code, $prod_cmpy );
		}
		else
		{
			// multiple open orders are assigned to one trip compartment
			/*
			$sql = "
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
					so.SCHORDER_ORD = $order_id 
					and sc.SCHDPROD_PRODCODE = '$prod_code' 
					and sc.SCHDPROD_PRODCMPY = '$prod_cmpy' 
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
			*/
			$sql = array();
			$sql['sql_text'] = "
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
			$sql['sql_data'] = array( $order_id, $prod_code, $prod_cmpy );
		}
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

    public function isOrderNoUsed($order_id)
	{
		//$sql = "select * from CUST_ORDER where ORDER_NO=" . $order_id . " ";
		
		$sql = array();
        $sql['sql_text'] = "select * from CUST_ORDER where ORDER_NO=:order_id ";
		$sql['sql_data'] = array( $order_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isOrderCustNoUsed($supplier, $order_id)
	{
		//$sql = "select * from CUST_ORDER where ORDER_CUST_ORDNO=" . $order_id . " and (ORDER_CUST in (select CUST_ACCT from CUSTOMER where CUST_SUPP='" . $supplier . "' ) )";
		
		$sql = array();
        $sql['sql_text'] = "select * from CUST_ORDER where ORDER_CUST_ORDNO=:order_id and (ORDER_CUST in (select CUST_ACCT from CUSTOMER where CUST_SUPP=:supplier_code ) )";
		$sql['sql_data'] = array( $order_id, $supplier );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }
    
// 	order_ent_maint.cgi?is_search_on=-1&pg_3=1&pg=1&suppCd=0003&cmpyCd=222&custAcc=222&termCd=CGPER&op=607
    public function getNextOrderCustNum( $data )
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'suppCd'=>urlencode($data->order_supp_code),
            'cmpyCd'=>urlencode($data->order_cust_code),
            'custAcc'=>urlencode($data->order_cust_acnt),
            'termCd'=>urlencode($data->order_dtrm_code),
            'is_search_on'=>urlencode("-1"),   	//???
			'op'=>urlencode("607")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $orderCustNo='';
        if(preg_match("/(var frm_order_cust_no=\")(\d+)(\";)/", $response, $out)){
            $orderCustNo=$out[2];
            return $orderCustNo;
        }else{
            return "ERROR";
        }
    }

	
    public function getOrderSysNo($customer, $order_cust_no)
	{
        $mydb = DB::getInstance();
        //$sql="
		//	select ORDER_NO from CUST_ORDER where ORDER_CUST_ORDNO=$order_cust_no and ORDER_CUST='$customer' 
		//	";
		
		$sql = array();
        $sql['sql_text'] = "
			select ORDER_NO from CUST_ORDER where ORDER_CUST_ORDNO=:order_cust_no and ORDER_CUST=:customer_acct 
			";
		$sql['sql_data'] = array( $order_cust_no, $customer );
		
        $rows = $mydb->query($sql, "N");
        return ((integer)$rows[0]->ORDER_NO);
    }

    public function getDefaultTimeString()
	{
        $mydb = DB::getInstance();
        $sql="
			select CONFIG_VALUE from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_TIME_STRING' 
			";
        $rows = $mydb->query($sql, "N");
		
		$str = "23:59:59";
		if ( count( $rows ) > 0 )
		{
			$str = $rows[0]->CONFIG_VALUE;
		}
		
        return $str;
    }
	
	
    public function updateExtraOrderFields($ordno, $soldto, $shipto)
	{
        $mydb = DB::getInstance();
        //$sql="update CUST_ORDER set ORD_SOLD_TO_NUM='".$soldto."', ORD_SHIP_TO_NUM='".$shipto."' where ORDER_NO=$ordno";
		
		$sql = array();
        $sql['sql_text'] = "update CUST_ORDER set ORD_SOLD_TO_NUM=:order_soldto, ORD_SHIP_TO_NUM=:order_shipto where ORDER_NO=:order_ordno";
		$sql['sql_data'] = array( $soldto, $shipto, $ordno );
		
        $result = $mydb->update($sql);
        return $result;
    }
	
    public function updateOrderTimes($ordno, $ordDate, $delDate, $expDate)
	{
        $mydb = DB::getInstance();
		/*
        $sql=
		"
			update CUST_ORDER set 
				ORDDATE=to_date('$ordDate', 'YYYY-MM-DD HH24:MI:SS')
				, DELDATE=to_date('$delDate', 'YYYY-MM-DD HH24:MI:SS')
				, ORDER_EXP_DATE=to_date('$expDate', 'YYYY-MM-DD HH24:MI:SS')
			where ORDER_NO=$ordno
		";
		*/
		$sql = array();
        $sql['sql_text'] = 
		"
			update CUST_ORDER set 
				ORDDATE=to_date(:order_ordDate, 'YYYY-MM-DD HH24:MI:SS')
				, DELDATE=to_date(:order_delDate, 'YYYY-MM-DD HH24:MI:SS')
				, ORDER_EXP_DATE=to_date(:order_expDate, 'YYYY-MM-DD HH24:MI:SS')
			where ORDER_NO=:order_ordno
		";
		$sql['sql_data'] = array( $ordDate, $delDate, $expDate, $ordno );
		
        $result = $mydb->update($sql);
        return $result;
    }

/*
order_sys_no
order_supp_code
order_cust_acnt
order_cust_no
order_ref_code
order_ord_time
order_dlv_time
order_exp_time
order_stat_id
order_mthd_id--
order_ttyp_id
order_styp_id
order_drwr_code
order_carr_code
order_dloc_code
order_dtrm_code
order_strm_code
order_approved
order_app_no
order_app_time
order_inv_no
order_total
order_limit		
order_trsf_type
order_price_printed
order_pay_note
order_psnl_code
order_src_id
*/
    
    public function create($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to CREATE Customer Open Order
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Customer Open Order++++++",CUSTORDER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'termCd'=>urlencode($data->order_dtrm_code),
            'frm_order_no'=>urlencode($data->order_sys_no),
            'suppCd'=>urlencode($data->order_supp_code),
            'cmpyCd'=>urlencode($data->order_cust_code),
            'custAcc'=>urlencode($data->order_cust_acnt),
            'frm_order_cust_no'=>urlencode($data->order_cust_no),
            'frm_order_ref_code'=>urlencode($data->order_ref_code),
            'frm_orddate'=>urlencode($data->order_ord_time),
            'frm_deldate'=>urlencode($data->order_dlv_time),
            'frm_order_exp_date'=>urlencode($data->order_exp_time),
			
            'order_status'=>urlencode($data->order_stat_id),
            'frm_order_ord_mthd'=>urlencode($data->order_mthd_id),
            'frm_order_delv_mthd'=>urlencode($data->order_ttyp_id),
            'frm_order_sale_type'=>urlencode($data->order_styp_id),
            'frm_order_drawer'=>urlencode($data->order_drwr_code),
            'frm_order_carrier'=>urlencode($data->order_carr_code),

            'frm_order_dlv_code'=>urlencode($data->order_dloc_code),
            'frm_order_terminal'=>urlencode($data->order_dtrm_code),
            'frm_ord_supply_point'=>urlencode($data->order_strm_code),
            'frm_order_approved'=>urlencode($data->order_approved),
//            ''=>urlencode($data->order_app_no),
//            ''=>urlencode($data->order_app_time),
			
            'frm_order_invoiced'=>urlencode( strlen($data->order_inv_no)>0?'Y':'N' ),   	//???
            'frm_order_total'=>urlencode($data->order_total),
            'frm_order_limit'=>urlencode($data->order_limit),
            'frm_transfer_type'=>urlencode($data->order_trsf_type),
//            ''=>urlencode($data->order_price_printed),
//            ''=>urlencode($data->order_pay_note),
//            ''=>urlencode($data->order_psnl_code),
            'frm_order_source'=>urlencode($data->order_src_id),
            'frm_order_instruction'=>urlencode($data->order_instructions),   	//???
            'is_search_on'=>urlencode("-1"),   	//???

			'op'=>urlencode("617")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=627;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Customer Open Order failed!!!",CUSTORDER);
                return "ERROR";
        }
        logMe("CGI Add Customer Open Order succeeded!!!",CUSTORDER);

		$data->order_sys_no = $this->getOrderSysNo( $data->order_cust_acnt, $data->order_cust_no );
		
		// update sold to and ship to
		$this->updateExtraOrderFields( $data->order_sys_no, $data->order_sold_to_num, $data->order_ship_to_num );
		$this->updateOrderTimes( $data->order_sys_no, $data->order_ord_time, $data->order_dlv_time, $data->order_exp_time );
		
//http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_det.cgi?termCd=-1&op=6017&custAcc=AFGR&suppCd=AUFG&cmpyCd=AFGR&pg=1&pg_3=1&orderNo=298&frm_order_prod_key=298&frm_osprod_prodcmpy=AUFG&frm_prod_price=&frm_prod_price_unit=&frm_osprod_prodcode=ADO&frm_oprd_pack_size=&frm_order_prod_qty=1234&frm_order_prod_unit=5&frm_oprod_exempt_no=&frm_oprod_exempt_off=		
				logMe("Info00000: ++++++Adding new Customer Open Order product++++++",CUSTORDER."---".print_r($data, TRUE));

		if ( is_array($data->order_items) === FALSE )
		{
			$data->order_items = (array)($data->order_items);
		}
		if( $data->has_items=="1" && sizeof($data->order_items) > 0 )
		{
			for($i=0; $i<sizeof($data->order_items); $i++)
			{      
				logMe("Info: ++++++Adding new Customer Open Order product++++++",CUSTORDER);
				logMe("Info111: ++++++Adding new Customer Open Order product++++++",CUSTORDER."---".sizeof($data->order_items));
				logMe("Info112: ++++++Adding new Customer Open Order product++++++",CUSTORDER."---".gettype($data->order_items));
				logMe("Info113: ++++++Adding new Customer Open Order product++++++",CUSTORDER."---".gettype($data->order_items[$i]));
				$fields = array(
					'sess_id'=>urlencode($data->session_id),
					'termCd'=>urlencode($data->order_dtrm_code),
					'orderNo'=>urlencode($data->order_sys_no),
					'frm_order_prod_key'=>urlencode($data->order_sys_no),
					'suppCd'=>urlencode($data->order_supp_code),
					'cmpyCd'=>urlencode($data->order_cust_code),
					'custAcc'=>urlencode($data->order_cust_acnt),
					'frm_osprod_prodcmpy'=>urlencode($data->order_items[$i]->oitem_prod_cmpy),
					'frm_osprod_prodcode'=>urlencode($data->order_items[$i]->oitem_prod_code),
					'frm_order_prod_qty'=>urlencode($data->order_items[$i]->oitem_prod_qty),
					'frm_order_prod_unit'=>urlencode($data->order_items[$i]->oitem_prod_unit),
					'frm_oprd_pack_size'=>urlencode($data->order_items[$i]->oitem_pack_size),
					'frm_prod_price'=>urlencode($data->order_items[$i]->oitem_prod_price),
					'frm_prod_price_unit'=>urlencode(""),
					'frm_oprod_exempt_no'=>urlencode($data->order_items[$i]->oitem_exempt_no),
					'frm_oprod_exempt_off'=>urlencode($data->order_items[$i]->oitem_padj_code),

					'op'=>urlencode("6017")
				);
				logMe("Info222: ++++++Adding new Customer Open Order product++++++",CUSTORDER);
				$thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
				$thunkObj->writeToClient($this->cgi_items);

				$response = $thunkObj->read();
				$patternSuccess = "var opStatus=6027;";
				$isFound = strstr($response, $patternSuccess);
				if ($isFound == false) {
						logMe("Add Customer Open Order Product failed!!!",CUSTORDER);
						return "ERROR";
				}
				logMe("CGI Add Customer Open Order Product succeeded!!!",CUSTORDER);
			}
		}
		
        return "OK";
    }  
    
    public function update($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("ORDER_NO"=>($data->order_sys_no), "ORDER_CUST"=>($data->order_cust_acnt), "ORDER_CUST_ORDNO"=>($data->order_cust_no));
		$excludes = array ("ORD_TRANSFER_TYP"=>0);
		$upd_journal = new UpdateJournalClass( "Open Orders", "CUST_ORDER", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Customer Open Order 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Customer Open Order++++++",CUSTORDER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'termCd'=>urlencode($data->order_dtrm_code),
            'orderNo'=>urlencode($data->order_sys_no),
            'suppCd'=>urlencode($data->order_supp_code),
            'cmpyCd'=>urlencode($data->order_cust_code),
            'custAcc'=>urlencode($data->order_cust_acnt),
            'frm_order_cust_no'=>urlencode($data->order_cust_no),
            'frm_order_ref_code'=>urlencode($data->order_ref_code),
            'frm_orddate'=>urlencode($data->order_ord_time),
            'frm_deldate'=>urlencode($data->order_dlv_time),
            'frm_order_exp_date'=>urlencode($data->order_exp_time),
			
            'order_status'=>urlencode($data->order_stat_id),
            'frm_order_ord_mthd'=>urlencode($data->order_mthd_id),
            'frm_order_delv_mthd'=>urlencode($data->order_ttyp_id),
            'frm_order_sale_type'=>urlencode($data->order_styp_id),
            'frm_order_drawer'=>urlencode($data->order_drwr_code),
            'frm_order_carrier'=>urlencode($data->order_carr_code),

            'frm_order_dlv_code'=>urlencode($data->order_dloc_code),
            'frm_order_terminal'=>urlencode($data->order_dtrm_code),
            'frm_ord_supply_point'=>urlencode($data->order_strm_code),
            'frm_order_approved'=>urlencode($data->order_approved),
//            ''=>urlencode($data->order_app_no),
//            ''=>urlencode($data->order_app_time),
			
            'frm_order_invoiced'=>urlencode( strlen($data->order_inv_no)>0?'Y':'N' ),   	//???
            'frm_order_total'=>urlencode($data->order_total),
            'frm_order_limit'=>urlencode($data->order_limit),
            'frm_transfer_type'=>urlencode($data->order_trsf_type),
//            ''=>urlencode($data->order_price_printed),
//            ''=>urlencode($data->order_pay_note),
//            ''=>urlencode($data->order_psnl_code),
            'frm_order_source'=>urlencode($data->order_src_id),
            'frm_order_instruction'=>urlencode($data->order_instructions),   	//???
            'is_search_on'=>urlencode("-1"),   	//???

			'op'=>urlencode("616")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=626;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Customer Open Order!!!",CUSTORDER);
                return "ERROR";
        }
        logMe("CGI Update Customer Open Order!!!",CUSTORDER);
		
		// update sold to and ship to
		$this->updateExtraOrderFields( $data->order_sys_no, $data->order_sold_to_num, $data->order_ship_to_num );
		$this->updateOrderTimes( $data->order_sys_no, $data->order_ord_time, $data->order_dlv_time, $data->order_exp_time );

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
        logMe("CGI LOG0 Update Customer Open Order!!!",CUSTORDER);
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
        logMe("CGI LOG1 Update Customer Open Order!!!",CUSTORDER);
		$upd_journal->log();
        logMe("CGI LOG2 Update Customer Open Order!!!",CUSTORDER);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		// get the original list of order products
		if( $data->has_items=="1" && sizeof($data->order_items) > 0 )
		{
			for($i=0; $i<sizeof($data->order_items); $i++)
			{   
				$errmsg = $i."\t".$data->order_items[$i]->oitem_prod_code."\t".$data->order_items[$i]->oitem_prod_qty."\taction: ".$data->actions[$i]->option."\t".sizeof($data->actions)."*******";
				//error_log( "\n*****ERRMSG_OPRODMTD\n".$errmsg, 3, "temp.log");
			
				if ( $data->actions[$i]->option == "1" )
				{ // insert new product to open order
//http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_det.cgi?termCd=-1&op=6017&custAcc=AFGR&suppCd=AUFG&cmpyCd=AFGR&pg=1&pg_3=1&orderNo=298&frm_order_prod_key=298&frm_osprod_prodcmpy=AUFG&frm_prod_price=&frm_prod_price_unit=&frm_osprod_prodcode=ADO&frm_oprd_pack_size=&frm_order_prod_qty=1234&frm_order_prod_unit=5&frm_oprod_exempt_no=&frm_oprod_exempt_off=		
					logMe("Info: ++++++Adding new Customer Open Order product++++++",CUSTORDER);
					$fields = array(
						'sess_id'=>urlencode($data->session_id),
						'termCd'=>urlencode($data->order_dtrm_code),
						'orderNo'=>urlencode($data->order_sys_no),
						'frm_order_prod_key'=>urlencode($data->order_sys_no),
						'suppCd'=>urlencode($data->order_supp_code),
						'cmpyCd'=>urlencode($data->order_cust_code),
						'custAcc'=>urlencode($data->order_cust_acnt),
						'frm_osprod_prodcmpy'=>urlencode($data->order_items[$i]->oitem_prod_cmpy),
						'frm_osprod_prodcode'=>urlencode($data->order_items[$i]->oitem_prod_code),
						'frm_order_prod_qty'=>urlencode($data->order_items[$i]->oitem_prod_qty),
						'frm_order_prod_unit'=>urlencode($data->order_items[$i]->oitem_prod_unit),
						'frm_oprd_pack_size'=>urlencode($data->order_items[$i]->oitem_pack_size),
						'frm_prod_price'=>urlencode($data->order_items[$i]->oitem_prod_price),
						'frm_prod_price_unit'=>urlencode(""),
						'frm_oprod_exempt_no'=>urlencode($data->order_items[$i]->oitem_exempt_no),
						'frm_oprod_exempt_off'=>urlencode($data->order_items[$i]->oitem_padj_code),

						'op'=>urlencode("6017")
					);
					$thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
					$thunkObj->writeToClient($this->cgi_items);

					$response = $thunkObj->read();
					$patternSuccess = "var opStatus=6027;";
					$isFound = strstr($response, $patternSuccess);
					if ($isFound == false) {
						logMe("Add Customer Open Order Product failed!!!",CUSTORDER);
						return "ERROR";
					}
					logMe("CGI Add Customer Open Order Product succeeded!!!",CUSTORDER);
				}
				else
//				if ( $data->order_items[$i]->action == 2 )
				if ( $data->actions[$i]->option == "2" )
				{ // update existing product in open order
					//////////////////////////////////////////////////////////////////////////////////////////////////////////
					////////////////////// new module to log any changes of any fields on any screen ////////////////////////
					////////////////////// Before the updates                                        ////////////////////////
					/////////////////////////////////////////////////////////////////////////////////////////////////////////
					$keys2 = array ("ORDER_PROD_KEY"=>($data->order_sys_no), "OSPROD_PRODCMPY"=>($data->order_items[$i]->oitem_prod_cmpy), "OSPROD_PRODCODE"=>($data->order_items[$i]->oitem_prod_code));
					$excludes2 = array ("ORDER_PROD_KEY"=>0);
					$upd_journal2 = new UpdateJournalClass( "Open Orders", "OPRODMTD", $keys2, $excludes2 );
					$upd_journal2->setOldValues( $upd_journal2->getRecordValues() );
					/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
//http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_det.cgi?termCd=-1&op=6016&custAcc=AFGR&suppCd=AUFG&cmpyCd=AFGR&pg=1&pg_3=1&orderNo=297&frm_order_prod_key=297&frm_osprod_prodcmpy=AUFG&frm_osprod_prodcode=ULP&frm_prod_price=0&frm_prod_price_unit=0&frm_prod_name=ULP&frm_oprd_pack_size=1&frm_order_prod_qty=123456&frm_order_prod_unit=5&frm_oprod_exempt_no=&frm_oprod_exempt_off=		
					logMe("Info: ++++++Updating existing Customer Open Order product++++++",CUSTORDER);
					$fields = array(
						'sess_id'=>urlencode($data->session_id),
						'termCd'=>urlencode($data->order_dtrm_code),
						'orderNo'=>urlencode($data->order_sys_no),
						'frm_order_prod_key'=>urlencode($data->order_sys_no),
						'suppCd'=>urlencode($data->order_supp_code),
						'cmpyCd'=>urlencode($data->order_cust_code),
						'custAcc'=>urlencode($data->order_cust_acnt),
						'frm_osprod_prodcmpy'=>urlencode($data->order_items[$i]->oitem_prod_cmpy),
						'frm_osprod_prodcode'=>urlencode($data->order_items[$i]->oitem_prod_code),
						'frm_order_prod_qty'=>urlencode($data->order_items[$i]->oitem_prod_qty),
						'frm_order_prod_unit'=>urlencode($data->order_items[$i]->oitem_prod_unit),
						'frm_oprd_pack_size'=>urlencode($data->order_items[$i]->oitem_pack_size),
						'frm_prod_price'=>urlencode($data->order_items[$i]->oitem_prod_price),
						'frm_prod_price_unit'=>urlencode(""),
						'frm_oprod_exempt_no'=>urlencode($data->order_items[$i]->oitem_exempt_no),
						'frm_oprod_exempt_off'=>urlencode($data->order_items[$i]->oitem_padj_code),

						'op'=>urlencode("6016")
					);
					$thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
					$thunkObj->writeToClient($this->cgi_items);

					$response = $thunkObj->read();
					$patternSuccess = "var opStatus=6026;";
					$isFound = strstr($response, $patternSuccess);
					if ($isFound == false) {
						logMe("Update Customer Open Order Product failed!!!",CUSTORDER);
						return "ERROR";
					}
					logMe("CGI Update Customer Open Order Product succeeded!!!",CUSTORDER);

					//////////////////////////////////////////////////////////////////////////////////////////////////////////
					////////////////////// new module to log any changes of any fields on any screen ////////////////////////
					////////////////////// After the updates                                         ////////////////////////
					/////////////////////////////////////////////////////////////////////////////////////////////////////////
					$upd_journal2->setNewValues( $upd_journal2->getRecordValues() );
					$upd_journal2->log();
					/////////////////////////////////////////////////////////////////////////////////////////////////////////
				}
				else
				if ( $data->actions[$i]->option == "3" )
				{ // delete existing product from open order
//http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_det.cgi?orderNo=297&prodCmpy=AUFG&prodCd=ULP&custAcc=AFGR&suppCd=AUFG&cmpyCd=AFGR&termCd=-1&pg=1&pg_3=1&preqstr=frm_oprod_exempt_off%3D%26frm_oprod_exempt_no%3D%26frm_order_prod_unit%3D5%26frm_order_prod_qty%3D123456%26frm_oprd_pack_size%3D1%26frm_prod_name%3DULP%26frm_prod_price_unit%3D0%26frm_prod_price%3D0%26frm_osprod_prodcode%3DULP%26frm_osprod_prodcmpy%3DAUFG%26frm_order_prod_key%3D297%26orderNo%3D297%26pg_3%3D1%26pg%3D1%26cmpyCd%3DAFGR%26suppCd%3DAUFG%26custAcc%3DAFGR%26op%3D6016%26termCd%3D-1&op=6018
					logMe("Info: ++++++Deleting new Customer Open Order product++++++",CUSTORDER);
					$fields = array(
						'sess_id'=>urlencode($data->session_id),
						'orderNo'=>urlencode($data->order_sys_no),
						'prodCmpy'=>urlencode($data->order_items[$i]->oitem_prod_cmpy),
						'prodCd'=>urlencode($data->order_items[$i]->oitem_prod_code),
						'custAcc'=>urlencode($data->order_cust_acnt),
						'suppCd'=>urlencode($data->order_supp_code),
						'termCd'=>urlencode($data->order_dtrm_code),
						'cmpyCd'=>urlencode($data->order_cust_code),

						'op'=>urlencode("6018")
					);
					$thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
					$thunkObj->writeToClient($this->cgi_items);

					$response = $thunkObj->read();
					$patternSuccess = "var opStatus=6028;";
					$isFound = strstr($response, $patternSuccess);
					if ($isFound == false) {
						logMe("Delete Customer Open Order Product failed!!!",CUSTORDER);
						return "ERROR";
					}
					logMe("CGI Delete Customer Open Order Product succeeded!!!",CUSTORDER);
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
        return "OK";
    }  

	
//http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_ent_maint.cgi?orderCustNo=5800013&orderNo=292&custAcc=AFGR&suppCd=AUFG&cmpyCd=AFGR&termCd=CGPER&pg=1&pg_3=1&is_search_on=-1&order_status=0&preqstr=op%3D601%26termCd%3D-1%26custAcc%3DAFGR%26cmpyCd%3DAFGR%26suppCd%3DAUFG%26pg%3D1%26pg_3%3D1&op=618
    public function delete($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting Customer Open Order++++++",CUSTORDER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'orderCustNo'=>urlencode($data->order_cust_no),
            'orderNo'=>urlencode($data->order_sys_no),
            'custAcc'=>urlencode($data->order_cust_acnt),
            'suppCd'=>urlencode($data->order_supp_code),
            'cmpyCd'=>urlencode($data->order_cust_code),
            'termCd'=>urlencode($data->order_dtrm_code),
            'order_status'=>urlencode($data->order_stat_id),
             'op'=>urlencode("618")
        );
       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=628;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("Delete Customer Open Order failed!!!",CUSTORDER);
            $patternFailed = "var opStatus=638;";
            $failed = strstr($response, $patternFailed);            
            if($failed){
                return "DEPENDENCIES";
            }else{                
//                return "ERROR";
				$patternFailed2 = "var opStatus=648;";
				$failed2 = strstr($response, $patternFailed2);            
				if($failed2){
					return "DEPENDENCIES";
				}else{      
					return "ERROR";
				}
            }
        }
        logMe("CGI Delete Customer Open Order succeeded!!!",CUSTORDER);

        return "OK";
    }   

//http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_approve.cgi?pg_3=1&pg=1&suppCd=AUFG&cmpyCd=AFGR&custAcc=AFGR&termCd=CGPER&orderNo=295&prodCd=-1&prodCmpy=-1&op=6513	
//http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_approve.cgi?pg_3=1&pg=1&suppCd=AUFG&cmpyCd=MINT&custAcc=MINT&termCd=CGPER&orderNo=14250&prodCd=-1&prodCmpy=-1&op=6513
    public function approve($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("ORDER_NO"=>($data->order_sys_no), "ORDER_CUST"=>($data->order_cust_acnt), "ORDER_CUST_ORDNO"=>($data->order_cust_no));
		$excludes = array ("ORDER_NO"=>0);
		$upd_journal = new UpdateJournalClass( "Open Orders", "CUST_ORDER", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        logMe("Info: ++++++Approving Customer Open Order++++++",CUSTORDER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'orderCustNo'=>urlencode($data->order_cust_no),
            'orderNo'=>urlencode($data->order_sys_no),
            'custAcc'=>urlencode($data->order_cust_acnt),
            'suppCd'=>urlencode($data->order_supp_code),
            'cmpyCd'=>urlencode($data->order_cust_code),
            'termCd'=>urlencode($data->order_dtrm_code),
            'order_status'=>urlencode($data->order_stat_id),
            'prodCd'=>urlencode("-1"),
            'prodCmpy'=>urlencode("-1"),
             'op'=>urlencode("6513")
			 );
		$thunkObj = new Thunk($this->host, $this->cgi_approve, $fields);
        $thunkObj->writeToClient($this->cgi_approve);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=6523;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("Approve Customer Open Order failed!!!",CUSTORDER);
            $patternFailed = "var opStatus=6533;";
            $failed = strstr($response, $patternFailed);            
            if($failed){
                return "DEPENDENCIES";
            }else{     
			
                return "ERROR";
            }
        }
        logMe("CGI Approve Customer Open Order succeeded!!!",CUSTORDER);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        return "OK";
    }   
	
    public function unapprove($ordno)
	{
        $mydb = DB::getInstance();
		/*
        $sql = 
		"
			update CUST_ORDER 
			set 
				ORDER_APPROVED='N' 
				, ORDER_APPR_NO=NULL
				, ORD_AP_DATE=NULL			
			where 
				ORDER_NO=$ordno
		";
		*/
		$sql = array();
        $sql['sql_text'] =  
		"
			update CUST_ORDER 
			set 
				ORDER_APPROVED='N' 
				, ORDER_APPR_NO=NULL
				, ORD_AP_DATE=NULL			
			where 
				ORDER_NO=:order_ordno
		";
		$sql['sql_data'] = array( $ordno );
		
        $result = $mydb->update($sql);
		if ( $result == RETURN_OK )
		{
			return "OK";
		}
		else
		{
			return "ERROR";
		}
    }
	
}
?>