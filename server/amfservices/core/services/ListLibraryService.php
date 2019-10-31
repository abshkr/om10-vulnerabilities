<?php
require_once( 'bootstrap.php' );

class ListLibraryService
{
	
	public function __construct()
	{
/* 		$this->username = $_SERVER['OMEGA_USER'];
		$this->password = $_SERVER['OMEGA_PWD'];
		$this->DBPort = $_SERVER['OMEGA_DBPORT'];
		if ( strlen($this->DBPort) > 0 )
		{
			$DBPort = ":".$this->DBPort;
		}
		if(isset($_SERVER['DB_ENCRYPT']) &&
			($_SERVER['DB_ENCRYPT'] == 'YES' || $_SERVER['DB_DECRYPT'] == 'yes')) 
		{
            $temp = decrypt_user_pwd($this->password);
            $this->password = $temp;
        }
		//$this->server = "localhost".$DBPort."/".$_SERVER['OMEGA_DBASE'];     		
		//$this->connect = oci_connect("DF_COOGEE","abcd1234","localhost/OML5K","zhs16gbk");
		$this->server = "localhost".$DBPort."/".$_SERVER['OMEGA_DBASE'];     		
		$this->connect = oci_connect($this->username,$this->password,$this->server,"zhs16gbk");
 */	}

	
	public function lookupOrderDetails($supplier="-1", $order="-1", $caseType='L')
	{
		/*
        $sql = "
			select * from GUI_ORDERS where ORDER_SUPP_CODE='$supplier' and ORDER_CUST_NO=$order
			";
		*/
		$sql = array();
        $sql['sql_text'] = "
			select * from GUI_ORDERS where ORDER_SUPP_CODE=:supplier and ORDER_CUST_NO=:order
			";
		$sql['sql_data'] = array( $supplier, $order );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
    public function lookupLoadTrip($supplier="-1", $status="-1", $caseType='L')
	{
		/*
        $sql="
			select 
				sc.SHLS_SUPP as TRIP_SUPPLIER 
				, sc.SHLS_TRIP_NO as TRIP_NO 
				, NVL(sc.STATS, 'F') AS TRIP_STATUS
				, tk.TNKR_CARRIER as TRIP_CARRIER 
				, tk.TNKR_OWNER as TRIP_OWNER 
				, sc.SHL_TANKER as TRIP_TANKER 
				, ld.LD_TERMINAL as LOAD_TERMINAL 
				, ld.LOAD_ID as LOAD_ID 
				, ld.LOAD_NUMBER as LOAD_NUMBER 
				, ld.LOAD_OPER as LOAD_OPERATOR 
			from 
				LOADS ld 
				, TANKERS tk 
				, SCHEDULE sc
			where 
				sc.SHL_TANKER = tk.TNKR_CODE 
				and sc.SHLSLOAD_LD_TRM = ld.LD_TERMINAL(+) 
				and sc.SHLSLOAD_LOAD_ID = ld.LOAD_ID(+) 
				and (sc.SHLS_SUPP='$supplier') 
				and ('-1'='$status' or NVL(sc.STATS, 'F')='$status') 
			order by sc.SHLS_SUPP, sc.SHLS_TRIP_NO			
			";
				//and ('-1'='$supplier' or sc.SHLS_SUPP='$supplier') 
				//and ('-1'='$status' or NVL(sc.STATS, 'F')='$status') 
		*/	
		$sql = array();
        $sql['sql_text'] = "
			select 
				sc.SHLS_SUPP as TRIP_SUPPLIER 
				, sc.SHLS_TRIP_NO as TRIP_NO 
				, NVL(sc.STATS, 'F') AS TRIP_STATUS
				, tk.TNKR_CARRIER as TRIP_CARRIER 
				, tk.TNKR_OWNER as TRIP_OWNER 
				, sc.SHL_TANKER as TRIP_TANKER 
				, ld.LD_TERMINAL as LOAD_TERMINAL 
				, ld.LOAD_ID as LOAD_ID 
				, ld.LOAD_NUMBER as LOAD_NUMBER 
				, ld.LOAD_OPER as LOAD_OPERATOR 
			from 
				LOADS ld 
				, TANKERS tk 
				, SCHEDULE sc
			where 
				sc.SHL_TANKER = tk.TNKR_CODE 
				and sc.SHLSLOAD_LD_TRM = ld.LD_TERMINAL(+) 
				and sc.SHLSLOAD_LOAD_ID = ld.LOAD_ID(+) 
				and (sc.SHLS_SUPP=:supplier) 
				and ('-1'=:status or NVL(sc.STATS, 'F')=:status) 
			order by sc.SHLS_SUPP, sc.SHLS_TRIP_NO			
			";
				//and ('-1'=:supplier or sc.SHLS_SUPP=:supplier) 
				//and ('-1'=:status or NVL(sc.STATS, 'F')=:status) 
		$sql['sql_data'] = array( $supplier, $status );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
   
   
   
    public function lookupTerminal($caseType='L')
	{
        $sql="select TERM_CODE, TERM_NAME, TERM_CODE||' - '||TERM_NAME as TERM_DESC from TERMINAL";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
	public function lookupCompany($type=-1, $caseType='L')
	{
		if ($type == -1)
		{
			$bitAnd = 255;
		}
		else
		{
			$bitAnd = pow(2, $type);
		}
        /*
        $sql="
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
			from GUI_COMPANYS 
			where (-1=$type or bitand(CMPY_TYPE,$bitAnd)<>0 )
			order by CMPY_NAME asc
			";
		*/	
			
		$sql = array();
		/*
        $sql['sql_text'] = "
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
			from GUI_COMPANYS 
			where (-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 )
			order by CMPY_NAME asc
			";
		*/
		if ( $type != 2 && $type != 6 ) 
		{
			$sql['sql_text'] = "
				select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
				from GUI_COMPANYS 
				where (-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 )
				order by CMPY_NAME asc
			";
		}
		else
		{
			$sql['sql_text'] = "
				SELECT distinct 
					CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
				FROM 
					GUI_COMPANYS 
				WHERE 
					(-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 ) 
					and ( 
					( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and ( CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
						or ( CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=$type and status=1) ) ) 
					)
					or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
					or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
					or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
				ORDER BY CMPY_NAME ASC
			";
		}
		$sql['sql_data'] = array( $type, $bitAnd );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupCustomer($supplier="-1", $caseType='L')
	{
		/*
        $sql = "
			select 
				cust.CUST_ACCT as CUST_ACNT 
				, cust.CUST_SUPP as CUST_SUPP_CODE
				, scmp.CMPY_NAME as CUST_SUPP_NAME
				, cust.CUST_CODE as CUST_CMPY_CODE
				, ccmp.CMPY_NAME as CUST_CMPY_NAME
				, cust.CUST_ACCT||' - '||ccmp.CMPY_NAME as CUST_DESC
			from 
				CUSTOMER cust
				, COMPANYS scmp
				, COMPANYS ccmp
			where 
				cust.CUST_SUPP = scmp.CMPY_CODE 
				and cust.CUST_CODE = ccmp.CMPY_CODE
				and ('-1'='$supplier' or CUST_SUPP='$supplier') 
			order by CUST_CMPY_NAME			
			";
		*/	
			
		$sql = array();
        $sql['sql_text'] = "
			select 
				cust.CUST_ACCT as CUST_ACNT 
				, cust.CUST_SUPP as CUST_SUPP_CODE
				, scmp.CMPY_NAME as CUST_SUPP_NAME
				, cust.CUST_CODE as CUST_CMPY_CODE
				, ccmp.CMPY_NAME as CUST_CMPY_NAME
				, cust.CUST_ACCT||' - '||ccmp.CMPY_NAME as CUST_DESC
			from 
				CUSTOMER cust
				, COMPANYS scmp
				, COMPANYS ccmp
			where 
				cust.CUST_SUPP = scmp.CMPY_CODE 
				and cust.CUST_CODE = ccmp.CMPY_CODE
				and ('-1'=:supplier or CUST_SUPP=:supplier) 
			order by CUST_CMPY_NAME			
			";
		$sql['sql_data'] = array( $supplier );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupCustomerByFilter($supplier="-1", $category="-1", $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				cust.CUST_ACCT 									as CUST_ACNT 
				, cust.CUST_SUPP 								as CUST_SUPP_CODE
				, scmp.CMPY_NAME 								as CUST_SUPP_NAME
				, cust.CUST_CODE 								as CUST_CMPY_CODE
				, ccmp.CMPY_NAME 								as CUST_CMPY_NAME
				, cust.CUST_ACCT||' - '||ccmp.CMPY_NAME 		as CUST_DESC
				, cust.CUST_CATEGORY							as CUST_CTGR_CODE
				, catg.CATEG_DESCRIPT							as CUST_CTGR_TEXT
			from 
				CUSTOMER 				cust
				, COMPANYS 				scmp
				, COMPANYS 				ccmp
				, CST_PRCE_CATEGOR		catg
			where 
				cust.CUST_SUPP = scmp.CMPY_CODE 
				and cust.CUST_CODE = ccmp.CMPY_CODE
				and cust.CUST_CATEGORY = catg.CATEG_CODE(+)
				and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
				and ('-1'=:category or cust.CUST_CATEGORY=:category) 
			order by CUST_CMPY_NAME			
			";
		$sql['sql_data'] = array( $supplier, $category );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 

    public function lookupCompatibleDrawer($cmpy='-1', $prod='-1', $caseType='L')
	{
		/*
        $sql="
 			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
			from GUI_COMPANYS 
			where (bitand(CMPY_TYPE,16)<>0 ) 
				and CMPY_CODE in 
				( 	select rd.rat_prod_prodcmpy
					from RPTOBJ_PROD_RATIOS_VW rs, RPTOBJ_PROD_RATIOS_VW rd 
					where
						rs.ratio_base = rd.ratio_base 
						and rs.rat_seq = rd.rat_seq
						and rs.rat_count = rd.rat_count
						and ('-1'='$cmpy' or rs.rat_prod_prodcmpy = '$cmpy')
						and ('-1'='$prod' or rs.rat_prod_prodcode = '$prod')  
						and rd.rat_prod_prodcmpy != 'BaSePrOd'
				)
			order by CMPY_NAME asc
			";
		*/	
			
		$sql = array();
        $sql['sql_text'] = "
 			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
			from GUI_COMPANYS 
			where (bitand(CMPY_TYPE,16)<>0 ) 
				and CMPY_CODE in 
				( 	select rd.rat_prod_prodcmpy
					from RPTOBJ_PROD_RATIOS_VW rs, RPTOBJ_PROD_RATIOS_VW rd 
					where
						rs.ratio_base = rd.ratio_base 
						and rs.rat_seq = rd.rat_seq
						and rs.rat_count = rd.rat_count
						and ('-1'=:cmpy or rs.rat_prod_prodcmpy = :cmpy)
						and ('-1'=:prod or rs.rat_prod_prodcode = :prod)  
						and rd.rat_prod_prodcmpy != 'BaSePrOd'
				)
			order by CMPY_NAME asc
			";
		$sql['sql_data'] = array( $cmpy, $prod );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
	public function lookupProduct($drawer="-1", $caseType='L')
	{
		/*
        $sql = "
			select 
				prod.PROD_CODE
				, prod.PROD_CMPY
				, cmpy.CMPY_NAME as PROD_CMPY_NAME
				, prod.PROD_NAME
				, prod.PROD_PROD_GROUP
				, prod.PROD_CLASS
				, prod.PROD_RPT_UNIT
				, prod.PROD_RPT_TEMP
				, prod.PROD_IS_BLEND
				, prod.PROD_CMPY||' - '||prod.PROD_CODE as PROD_KEYS
				, prod.PROD_CMPY||' - '||prod.PROD_CODE||' - '||prod.PROD_NAME as PROD_DESC
			from 
				PRODUCTS prod
				, COMPANYS cmpy
			where 
				('-1'='$drawer' or prod.PROD_CMPY='$drawer') and prod.PROD_CMPY = cmpy.CMPY_CODE 
			order by prod.PROD_CODE 
			";
		*/
			
		$sql = array();
        $sql['sql_text'] = "
			select 
				prod.PROD_CODE
				, prod.PROD_CMPY
				, cmpy.CMPY_NAME as PROD_CMPY_NAME
				, prod.PROD_NAME
				, prod.PROD_PROD_GROUP
				, prod.PROD_CLASS
				, prod.PROD_RPT_UNIT
				, prod.PROD_RPT_TEMP
				, prod.PROD_IS_BLEND
				, prod.PROD_TXT_COLOUR 
				, prod.PROD_BACK_COLOUR 
				, prod.PROD_IMAGE 
				, 'assets/products/'	as IMAGE_PATH
				, prod.PROD_CMPY||' - '||prod.PROD_CODE as PROD_KEYS
				, prod.PROD_CMPY||' - '||prod.PROD_CODE||' - '||prod.PROD_NAME as PROD_DESC
			from 
				PRODUCTS prod
				, COMPANYS cmpy
			where 
				('-1'=:drawer or prod.PROD_CMPY=:drawer) and prod.PROD_CMPY = cmpy.CMPY_CODE 
			order by prod.PROD_CODE 
			";
		$sql['sql_data'] = array( $drawer );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
    public function lookupPersonnel($employer="-1", $role=-1, $caseType='L')
	{
		/*
        $sql="
			select 
				PER_CODE as PSNL_CODE
				, PER_NAME as PSNL_NAME
				, PER_AUTH as PSNL_ROLE
				, PER_CMPY as PSNL_CMPY_CODE
				, CMPY_NAME as PSNL_CMPY_NAME
				, PER_DEPARTMENT as PSNL_DEPT 
			from GUI_PERSONNEL 
			where 
				('-1'='$employer' or PER_CMPY='$employer') 
				and (-1=$role or PER_AUTH=$role) 
			order by PER_CODE asc
			";
			//	(PER_CMPY='$employer') 
		*/	
			
		$sql = array();
        $sql['sql_text'] = "
			select 
				PER_CODE as PSNL_CODE
				, PER_NAME as PSNL_NAME
				, PER_AUTH as PSNL_ROLE
				, PER_CMPY as PSNL_CMPY_CODE
				, CMPY_NAME as PSNL_CMPY_NAME
				, PER_DEPARTMENT as PSNL_DEPT 
			from GUI_PERSONNEL 
			where 
				('-1'=:employer or PER_CMPY=:employer) 
				and (-1=:role or PER_AUTH=:role) 
			order by PER_CODE asc
			";
		$sql['sql_data'] = array( $employer, $role );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
	
    public function lookupOrderMethodType($caseType='L')
	{
        $sql="select ORD_MTHD_ID as ORDMTHD_TYPE_ID, ORD_MTHD_NAME as ORDMTHD_TYPE_NAME from ORD_MTHD_TYP order by ORD_MTHD_ID";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
	public function lookupOrderStatusType($caseType='L')
	{
        $sql = "select ORDER_STATUS_ID as ORDSTAT_TYPE_ID, ORDER_STATUS_NAME as ORDSTAT_TYPE_NAME from ORDER_STATUS_TYP order by ORDER_STATUS_ID";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
    public function lookupTransportType($ord_mthd, $caseType='L')
	{
		/*
        $sql="
			select 
				TRANSPORT_ID as TRNSPT_TYPE_ID
				, TRANSPORT_NAME as TRNSPT_TYPE_NAME 
			from TRANSPORT_TYP 
			where
				( -1=$ord_mthd) or ( 0=$ord_mthd and TRANSPORT_ID in (0,2,4,5)) or ( 1=$ord_mthd and TRANSPORT_ID in (1,3))
			order by TRANSPORT_ID
			";
		*/	
			
		$sql = array();
        $sql['sql_text'] = "
			select 
				TRANSPORT_ID as TRNSPT_TYPE_ID
				, TRANSPORT_NAME as TRNSPT_TYPE_NAME 
			from TRANSPORT_TYP 
			where
				( -1=:ord_mthd) or ( 0=:ord_mthd and TRANSPORT_ID in (0,2,4,5)) or ( 1=:ord_mthd and TRANSPORT_ID in (1,3))
			order by TRANSPORT_ID
			";
		$sql['sql_data'] = array( $ord_mthd );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
    public function lookupCustomerSaleType($caseType='L')
	{
        $sql="select CUSTOMER_SALE_ID as SALE_TYPE_ID, CUSTOMER_SALE_NAME as SALE_TYPE_NAME from CUSTOMER_SALE_TYP order by CUSTOMER_SALE_ID";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
    public function lookupCustomerPriceType($caseType='L')
	{
        $sql="select CUSTOMER_PRICE_ID as PRICE_TYPE_ID, CUSTOMER_PRICE_NAME as PRICE_TYPE_NAME from CUSTOMER_PRICE_TYP order by CUSTOMER_PRICE_ID";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }

    public function lookupCustomerInvoiceType($caseType='L')
	{
        $sql="select CUSTOMER_INV_ID as INVOICE_TYPE_ID, CUSTOMER_INV_NAME as INVOICE_TYPE_NAME from CUSTOMER_INV_TYP order by CUSTOMER_INV_ID";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
    public function lookupCustomerTermsType($caseType='L')
	{
        $sql="select CUSTOMER_TERMS_ID as TERMS_TYPE_ID, CUSTOMER_TERMS_NAME as TERMS_TYPE_NAME from CUSTOMER_TERMS_TYP order by CUSTOMER_TERMS_ID";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
    public function lookupCustomerCategory($caseType='L')
	{
        $sql="select CATEG_CODE as CATEGORY_CODE, CATEG_DESCRIPT as CATEGORY_NAME from CST_PRCE_CATEGOR order by CATEG_CODE";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }

    public function lookupErpType($caseType='L')
	{
        $sql="select ERP_TYPE_NO as ERP_TYPE_ID, ERP_TYPE_NAME from ERP_TYPE where ( (ERP_REGION_CODE = SYS_CONTEXT('CONN_CONTEXT','LANG')) or (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL and ERP_REGION_CODE = 'ENG') ) ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
   
    public function lookupDelvLocation($caseType='L')
	{
        $sql="select DLV_CODE as DELV_CODE, DLV_NAME as DELV_NAME, DLV_CODE||' - '||DLV_NAME as DELV_DESC from DELV_LOCATION";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
   public function lookupDelvLocationByPage($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 50)
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
		else $sort="ORDER BY DELV_CODE ASC";
		
		$core_query = 
		"	
			select DLV_CODE as DELV_CODE, DLV_NAME as DELV_NAME, DLV_CODE||' - '||DLV_NAME as DELV_DESC, DLV_GRID as DELV_GRID from DELV_LOCATION
		";
		
		//$query = "SELECT * FROM ($core_query) $filter $sort";
		$query = "SELECT * FROM ($core_query) " . $filter['sql_text'] . " $sort";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter['sql_data'];
		
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($queryPaged);
		$data->count = $mydb->count( $query );

		return($data);
    } 
	
	public function lookupProductUnit($caseType='L')
	{
        $sql = "SELECT UNIT_ID, DESCRIPTION as UNIT_NAME FROM UNIT_SCALE_VW WHERE UNIT_ID IN(5,11,17)";
		/*
		$sql = "
			SELECT UNIT_ID, DESCRIPTION as UNIT_NAME 
			FROM UNIT_SCALE_VW 
			WHERE 
				UNIT_ID=5 
				and (((select count(config_value) from site_config where config_key='SITE_EXTERNAL_BLENDING_ALLOWED')=0) 
				  or ((select config_value from site_config where config_key='SITE_EXTERNAL_BLENDING_ALLOWED') != 'Y')) 
			union
			SELECT UNIT_ID, DESCRIPTION as UNIT_NAME FROM UNIT_SCALE_VW WHERE UNIT_ID IN (11,17)		
		";
		*/
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
    public function lookupPriceOffset($caseType='L')
	{
        $sql="
			select 
				padj.PROFF_CODE
				, padj.PROFF_NAME
				, padj.PROFF_DEB_TYPE
				, dtyp.CUSTOMER_AMNT_NAME as PROFF_DEB_NAME 
				, padj.PROFF_APPLY
				, atyp.OFFSET_SUBJECT_NAME as PROFF_APPLY_NAME 
				, padj.PROFF_TO_PRINT 
			from 
				PRICE_ADJUSTS padj
				, CUSTOMER_AMNT_TYP dtyp
				, OFFSET_SUBJECT_TYP atyp
			where
				padj.PROFF_DEB_TYPE = dtyp.CUSTOMER_AMNT_ID 
				and padj.PROFF_APPLY = atyp.OFFSET_SUBJECT_ID			
		";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
   
    public function lookupArea($caseType='L')
	{
        $sql="select AREA_K, AREA_NAME, AREA_K||' - '||AREA_NAME as AREA_DESC from AREA_RC order by AREA_K ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
   
    public function lookupPrinter($caseType='L')
	{
        $sql="select PRNTR, SYS_PRNTR, PRNTR||' - '||SYS_PRNTR as PRNTR_DESC from PRINTER order by PRNTR ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
   
    public function lookupPrinterUsage($caseType='L')
	{
        $sql=
		"
		select 
			ENUMITEM.ENUM_NO		as PRT_USAGE
			, MSG_LOOKUP.MESSAGE	as PRT_USAGE_NAME
			, (ENUMITEM.ENUM_NO || ' - ' ||MSG_LOOKUP.MESSAGE)		as PRT_USAGE_DESC
		from 
			ENUMITEM
			, MSG_LOOKUP
		where 
			MSG_LOOKUP.MSG_ID = ENUMITEM.ENUM_TMM
			and ( MSG_LOOKUP.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND MSG_LOOKUP.LANG_ID = 'ENG') ) 
			and ENUMITEM.ENUMTYPENAME = 'PRN_USE'
		order by ENUMITEM.ENUM_NO ASC
		";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
	public function lookupCompanyPlusDefault($type=-1, $caseType='L')
	{
		if ($type == -1)
		{
			$bitAnd = 255;
		}
		else
		{
			$bitAnd = pow(2, $type);
		}
        
        $sql="
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, CMPY_DESC
			from 
			(
				(
					select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
					from COMPANYS
					where 
						( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
							and COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
						and COMPANYS.CMPY_CODE = 'ANY'
				)
				union
				(
					select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
					from GUI_COMPANYS 
					where (-1=$type or bitand(CMPY_TYPE,$bitAnd)<>0 )
				)
			)
			order by CMPY_NAME asc
			";
		/*
		$sql = array();
        $sql['sql_text'] = "
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, CMPY_DESC
			from 
			(
				(
					select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
					from COMPANYS
					where 
						( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
							and COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
						and COMPANYS.CMPY_CODE = 'ANY'
				) aaa
				union
				(
					select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
					from GUI_COMPANYS 
					where (-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 )
				) bbb
			) ccc
			order by CMPY_NAME asc
			";
		$sql['sql_data'] = array( $type, $bitAnd );
		*/	
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupCompanyWithDefaultPrinters($printer_id="-1", $caseType='L')
	{
		/*
        $sql="
			select 
				CMPY_CODE
				, CMPY_NAME
				, CMPY_TYPE
				, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC
				, CMPY_BOL_VP_NAME
				, CMPY_LD_REP_VP
				, CMPY_DRV_INST_VP			
			from 
				COMPANYS 
			where 
				'-1' = '$printer_id' 
				or CMPY_BOL_VP_NAME = '$printer_id' 
				or CMPY_LD_REP_VP = '$printer_id' 
				or CMPY_DRV_INST_VP = '$printer_id' 			
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			select 
				CMPY_CODE
				, CMPY_NAME
				, CMPY_TYPE
				, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC
				, CMPY_BOL_VP_NAME
				, CMPY_LD_REP_VP
				, CMPY_DRV_INST_VP			
			from 
				COMPANYS 
			where 
				'-1' = :printer_id 
				or CMPY_BOL_VP_NAME = :printer_id 
				or CMPY_LD_REP_VP = :printer_id 
				or CMPY_DRV_INST_VP = :printer_id 			
		";
		$sql['sql_data'] = array( $printer_id );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAllocationType($user_cmpy, $caseType='L')
	{
        /*
        $sql="
		SELECT COMPANY_ID ACHECK_TYPE,COMPANY_NAME ACHECK_NAME
		FROM COMPANY_TYP
		WHERE COMPANY_ID IN (2,3,4)
		   OR ( ('$user_cmpy' in (select CMPY_CODE from COMPANYS where bitand(CMPY_TYPE, 3)>0 )) AND COMPANY_ID=1 )
			";
		*/
		$sql = array();
        $sql['sql_text'] = "
		SELECT COMPANY_ID ACHECK_TYPE,COMPANY_NAME ACHECK_NAME
		FROM COMPANY_TYP
		WHERE COMPANY_ID IN (2,3,4)
		   OR ( (:user_cmpy in (select CMPY_CODE from COMPANYS where bitand(CMPY_TYPE, 3)>0 )) AND COMPANY_ID=1 )
			";
		$sql['sql_data'] = array( $user_cmpy );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAllocationCompany($type=-1, $caseType='L')
	{
 		if ($type == -1)
		{
			$bitAnd = 255;
		}
		else
		{
			$bitAnd = pow(2, $type);
		}
        /*
        $sql="
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
			from GUI_COMPANYS 
			where (-1=$type or bitand(CMPY_TYPE,$bitAnd)<>0 ) and (bitand(CMPY_TYPE,31)<>0)
			order by CMPY_NAME asc
			";
		*/
		$sql = array();
		/*
        $sql['sql_text'] = "
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
			from GUI_COMPANYS 
			where (-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 ) and (bitand(CMPY_TYPE,31)<>0)
			order by CMPY_NAME asc
			";
		*/
		if ( $type != 2 && $type != 6 ) 
		{
			$sql['sql_text'] = "
				select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
				from GUI_COMPANYS 
				where (-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 ) and (bitand(CMPY_TYPE,31)<>0)
				order by CMPY_NAME asc
			";
		}
		else
		{
			$sql['sql_text'] = "
				SELECT distinct 
					CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
				FROM 
					GUI_COMPANYS 
				WHERE 
					(-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 ) and (bitand(CMPY_TYPE,31)<>0)  
					and ( 
					( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and ( CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
						or ( CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=$type and status=1) ) ) 
					)
					or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
					or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
					or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
				ORDER BY CMPY_NAME ASC
			";
		}
		$sql['sql_data'] = array( $type, $bitAnd );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAllocationSupplier($type=-1, $caseType='L')
	{
		if ( $type == 1 )
		{
			$sql="
				select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
				from COMPANYS 
				where CMPY_CODE='BaSePrOd'
			";
		}
		else
		{
			$sql="
				select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
				from GUI_COMPANYS 
				where (bitand(CMPY_TYPE,2)<>0)
				order by CMPY_NAME asc
			";
		}

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAllocationSupplierAll($caseType='L')
	{
		$sql="
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
			from COMPANYS 
			where CMPY_CODE='BaSePrOd'
			union
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
			from GUI_COMPANYS 
			where (bitand(CMPY_TYPE,2)<>0)
			order by CMPY_NAME asc
		";

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAllocationLockType($caseType='L')
	{
        
        $sql="SELECT ALLOC_LOCK_ID, ALLOC_LOCK_NAME	FROM ALLOC_LOCK_TYP order by ALLOC_LOCK_ID";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAllocationPeriodType($caseType='L')
	{
        
        $sql="SELECT ALLOC_PERIOD_ID, NVL(ALLOC_PERIOD_NAME, ' ') as ALLOC_PERIOD_NAME	FROM ALLOC_PERIOD_TYP order by ALLOC_PERIOD_ID";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 

	
	public function lookupBaseProduct($category=-1, $caseType='L')
	{
		/*
        $sql = "
			select 
				bp.BASE_CODE
				, bp.BASE_NAME
				, bp.BASE_PROD_GROUP
				, bp.BASE_CAT
				, bc.BCLASS_DESC													as BASE_CLASS_DESC
				, bp.BASE_RPT_TUNT
				, bp.BASE_RPT_TEMP	
				, decode(bp.BASE_CAT, 6, 1, 0)										as BASE_ADTV
				, bp.BASE_CODE||' - '||bp.BASE_NAME									as BASE_TEXT
				, bp.BASE_CODE||' - '||bp.BASE_NAME||' ('||bc.BCLASS_DESC||') ' 	as BASE_DESC
			from 
				BASE_PRODS 		bp
				, (
					select 
						bs.BCLASS_NO
						, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
						, bs.BCLASS_DENS_LO
						, bs.BCLASS_DENS_HI
						, bs.BCLASS_VCF_ALG
						, bs.BCLASS_TEMP_LO
						, bs.BCLASS_TEMP_HI			
					from 
						BASECLASS 			bs
						, BCLASS_TYP		bm
					where 
						1=1	
						and bs.BCLASS_NO = bm.BCLASS_ID(+)
				) 					bc
			where 
				1=1
				and bp.BASE_CAT = bc.BCLASS_NO
				and (-1=$category or bp.BASE_CAT=$category) 
			order by bp.BASE_CODE 
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			select 
				bp.BASE_CODE
				, bp.BASE_NAME
				, bp.BASE_PROD_GROUP
				, bp.BASE_CAT
				, bc.BCLASS_DESC													as BASE_CLASS_DESC
				, bp.BASE_RPT_TUNT
				, bp.BASE_RPT_TEMP	
				, decode(bp.BASE_CAT, 6, 1, 0)										as BASE_ADTV
				, bp.BASE_CODE||' - '||bp.BASE_NAME									as BASE_TEXT
				, bp.BASE_CODE||' - '||bp.BASE_NAME||' ('||bc.BCLASS_DESC||') ' 	as BASE_DESC
			from 
				BASE_PRODS 		bp
				, (
					select 
						bs.BCLASS_NO
						, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
						, bs.BCLASS_DENS_LO
						, bs.BCLASS_DENS_HI
						, bs.BCLASS_VCF_ALG
						, bs.BCLASS_TEMP_LO
						, bs.BCLASS_TEMP_HI			
					from 
						BASECLASS 			bs
						, BCLASS_TYP		bm
					where 
						1=1	
						and bs.BCLASS_NO = bm.BCLASS_ID(+)
				) 					bc
			where 
				1=1
				and bp.BASE_CAT = bc.BCLASS_NO
				and (-1=:category or bp.BASE_CAT=:category) 
			order by bp.BASE_CODE 
		";
		$sql['sql_data'] = array( $category );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAvailableBaseProduct($cmpy="-1", $prod="-1", $category=-1, $caseType='L')
	{
		/*
        $sql = "
			select 
				bp.BASE_CODE
				, bp.BASE_NAME
				, bp.BASE_PROD_GROUP
				, bp.BASE_CAT
				, bc.BCLASS_DESC													as BASE_CLASS_DESC
				, bp.BASE_RPT_TUNT
				, bp.BASE_RPT_TEMP	
				, decode(bp.BASE_CAT, 6, 1, 0)										as BASE_ADTV
				, bp.BASE_CODE||' - '||bp.BASE_NAME									as BASE_TEXT
				, bp.BASE_CODE||' - '||bp.BASE_NAME||' ('||bc.BCLASS_DESC||') ' 	as BASE_DESC
			from 
				BASE_PRODS 		bp
				, (
					select 
						bs.BCLASS_NO
						, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
						, bs.BCLASS_DENS_LO
						, bs.BCLASS_DENS_HI
						, bs.BCLASS_VCF_ALG
						, bs.BCLASS_TEMP_LO
						, bs.BCLASS_TEMP_HI			
					from 
						BASECLASS 			bs
						, BCLASS_TYP		bm
					where 
						1=1	
						and bs.BCLASS_NO = bm.BCLASS_ID(+)
				) 					bc
			where 
				1=1
				and bp.BASE_CAT = bc.BCLASS_NO
				and (-1=$category or bp.BASE_CAT=$category) 
				and bp.BASE_CODE not in (select pr.RATIO_BASE from RATIOS pr where pr.RAT_PROD_PRODCODE='$prod' and pr.RAT_PROD_PRODCMPY='$cmpy' )
			order by bp.BASE_CODE 
		";
		*/	
		$sql = array();
        $sql['sql_text'] = "
			select 
				bp.BASE_CODE
				, bp.BASE_NAME
				, bp.BASE_PROD_GROUP
				, bp.BASE_CAT
				, bc.BCLASS_DESC													as BASE_CLASS_DESC
				, bp.BASE_RPT_TUNT
				, bp.BASE_RPT_TEMP	
				, decode(bp.BASE_CAT, 6, 1, 0)										as BASE_ADTV
				, bp.BASE_CODE||' - '||bp.BASE_NAME									as BASE_TEXT
				, bp.BASE_CODE||' - '||bp.BASE_NAME||' ('||bc.BCLASS_DESC||') ' 	as BASE_DESC
			from 
				BASE_PRODS 		bp
				, (
					select 
						bs.BCLASS_NO
						, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
						, bs.BCLASS_DENS_LO
						, bs.BCLASS_DENS_HI
						, bs.BCLASS_VCF_ALG
						, bs.BCLASS_TEMP_LO
						, bs.BCLASS_TEMP_HI			
					from 
						BASECLASS 			bs
						, BCLASS_TYP		bm
					where 
						1=1	
						and bs.BCLASS_NO = bm.BCLASS_ID(+)
				) 					bc
			where 
				1=1
				and bp.BASE_CAT = bc.BCLASS_NO
				and (-1=:category or bp.BASE_CAT=:category) 
				and bp.BASE_CODE not in (select pr.RATIO_BASE from RATIOS pr where pr.RAT_PROD_PRODCODE=:prod and pr.RAT_PROD_PRODCMPY=:cmpy )
			order by bp.BASE_CODE 
		";
		$sql['sql_data'] = array( $category, $prod, $cmpy );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupProductGroup($caseType='L')
	{
        
        $sql = "
			select 
				PGR_CODE
				, PGR_DESCRIPTION
				, PGR_UNIT
				, PGR_CODE||' - '||PGR_DESCRIPTION									as PGR_TEXT
			from 
				PRODUCT_GROUP
			where 
				1=1 
			order by PGR_CODE  
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupGenericProduct($code="-1", $caseType='L')
	{
        /*
        $sql = "
			select 
				gp.GEN_PROD_CODE
				, decode( gu.PROD_COUNT, NULL, 0, gu.PROD_COUNT) 									as PROD_COUNT
				, gp.GEN_PROD_CODE||' ('||decode( gu.PROD_COUNT, NULL, 0, gu.PROD_COUNT)||') ' 		as GEN_PROD_DESC
			from 
				GENERIC_PROD  gp
				, (
					select PROD_CLASS, count(PROD_CODE) as PROD_COUNT from PRODUCTS where 1=1 group by PROD_CLASS
				) gu
			where
				gp.GEN_PROD_CODE = gu.PROD_CLASS(+) 
				and ( '-1'='$code' or gp.GEN_PROD_CODE like '%$code%' )
			order by gp.GEN_PROD_CODE
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			select 
				gp.GEN_PROD_CODE
				, decode( gu.PROD_COUNT, NULL, 0, gu.PROD_COUNT) 									as PROD_COUNT
				, gp.GEN_PROD_CODE||' ('||decode( gu.PROD_COUNT, NULL, 0, gu.PROD_COUNT)||') ' 		as GEN_PROD_DESC
			from 
				GENERIC_PROD  gp
				, (
					select PROD_CLASS, count(PROD_CODE) as PROD_COUNT from PRODUCTS where 1=1 group by PROD_CLASS
				) gu
			where
				gp.GEN_PROD_CODE = gu.PROD_CLASS(+) 
				and ( '-1'=:code or gp.GEN_PROD_CODE like '%'||:code||'%' )
			order by gp.GEN_PROD_CODE
		";
		$sql['sql_data'] = array( $code );
			
         $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupHazchem($caseType='L')
	{
        
       $sql = "
			select 
				HZCF_ID
				, HZCF_NAME
				, HZCF_CLASS
				, HZCF_SUB_RISK
				, HZCF_HZ_CODE
				, HZCF_EMRG
				, HZCF_PACK_GROUP
				, HZCF_PACK_METHOD
				, HZCF_UN_NUM
				, HZCF_ID||' - '||HZCF_NAME 	as HZCF_TEXT
				, HZCF_ID||' - '||HZCF_NAME||' ('||HZCF_CLASS||', '||HZCF_SUB_RISK||', '||HZCF_HZ_CODE||', '||HZCF_EMRG||') ' 	as HZCF_DESC
			from 
				HAZCHEM
			where 
				1=1 
			order by HZCF_CLASS DESC  
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupCompanyAll($type=-1, $caseType='L')
	{
		if ($type == -1)
		{
			$bitAnd = 255;
		}
		else
		{
			$bitAnd = pow(2, $type);
		}
		/*
        $sql="
			select (cmp.CMPY_CODE||' - '||cmp.CMPY_NAME) as CMPY_DESC, cmp.*  
			from (
				select * 
				from COMPANYS 
				where 
					( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' AND COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
			) cmp
			where (-1=$type or bitand(cmp.CMPY_TYPE,$bitAnd)<>0 or cmp.CMPY_CODE='BaSePrOd' )
			order by cmp.CMPY_NAME asc
			";
		*/	
		$sql = array();
        $sql['sql_text'] = "
			select (cmp.CMPY_CODE||' - '||cmp.CMPY_NAME) as CMPY_DESC, cmp.*  
			from (
				select * 
				from COMPANYS 
				where 
					( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' AND COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
			) cmp
			where (-1=:cmpytype or bitand(cmp.CMPY_TYPE,:type_bitAnd)<>0) and ( cmp.CMPY_CODE<>'BaSePrOd' )
			order by cmp.CMPY_NAME asc
			";
		$sql['sql_data'] = array( $type, $bitAnd );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupReportProfileType($caseType='L')
	{
        $sql="
			select 
				ALLOC_PERIOD_ID												as REPORT_TYPE_ID
				, DECODE(ALLOC_PERIOD_ID, 1, 'D', 2, 'W', 4, 'M', 'N')   	as REPORT_TYPE_CODE 
				, DECODE(ALLOC_PERIOD_ID, 0, ' ', ALLOC_PERIOD_NAME) 		as REPORT_TYPE_NAME
			from ALLOC_PERIOD_TYP 
			where ALLOC_PERIOD_ID in (0, 1,2,4)
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupReportFileFromDatabase($caseType='L')
	{
        $sql="select distinct JASPER_FILE from REPORT_FILES";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupReportFileFromFolder()
	{
		$dir = $_SERVER['OMEGA_HOME'] . '/bin/jasper';
		$files = scandir($dir);
		
		$arr = array();
		foreach( $files as $name )
		{	
			if ( strpos( $name, '.jasper' ) === FALSE )
			{
				continue;
			}
			$itm_arr=array();
			$itm_arr['report_jasper_file'] = $name;
			$arr[] = $itm_arr;
		}
		
		$data->count = count( $arr );
		$data->sqls = "";
		//$data->json_on=1;
		//$data->data = (json_encode($arr));
		$data->json_on=0;
		$data->data = $arr;

		return($data);
    } 
	
	public function lookupReportFileAvailable()
	{
		// get the list of report file names from directory
		$dir = $_SERVER['OMEGA_HOME'] . '/bin/jasper';
		$files = scandir($dir);
		
		// get the list of report file names defined in database
        $sql="select distinct JASPER_FILE from REPORT_FILES";
        $mydb = DB::getInstance();
        $rows = $mydb->query($sql, "L", OCI_COMMIT_ON_SUCCESS);        
		
		$arr = array();
		foreach( $files as $name )
		{	
			if ( strpos( $name, '.jasper' ) === FALSE )
			{
				continue;
			}
			$found=FALSE;
			foreach( $rows as $item )
			{
				if ( $item['jasper_file'] == $name )
				{
					$found = TRUE;
					break;
				}
			}
			if ( $found === FALSE )
			{
				$itm_arr=array();
				$itm_arr['report_jasper_file'] = $name;
				$arr[] = $itm_arr;
				
			}
		}
		
		$data->count = count( $arr );
		$data->sqls = "";
		//$data->json_on=1;
		//$data->data = (json_encode($arr));
		$data->json_on=0;
		$data->data = $arr;

		return($data);
    } 
	
	// report company must be either a supplier or ANY/ALL
	public function lookupReportCompany($caseType='L')
	{
        $sql="
			select (cmp.CMPY_CODE||' - '||cmp.CMPY_NAME) as CMPY_DESC, cmp.*  
			from (
				select * 
				from COMPANYS 
				where 
					( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' AND COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
			) cmp
			where ( bitand(cmp.CMPY_TYPE,2)<>0 or cmp.CMPY_CODE='ANY' )
			order by cmp.CMPY_NAME asc
			";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 

	public function lookupReportProfile($caseType='L')
	{
        $sql="select * from GUI_REPORT_PROFILE order by REPORT_NAME ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupReportFilter($caseType='L')
	{
		$sql = "SELECT * FROM REPORT_FILTER order by JASPER_FILE, ARGUMENT_SEQ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
	}

	
	public function lookupTankBaseProduct($category=-1, $caseType='L')
	{
		/*
        $sql = "
			select 
				bp.BASE_CODE
				, bp.BASE_NAME
				, bp.BASE_PROD_GROUP
				, bp.BASE_CAT
				, bc.BCLASS_DESC													as BASE_CLASS_DESC
				, bp.BASE_RPT_TUNT
				, bp.BASE_RPT_TEMP	
				, decode(bp.BASE_CAT, 6, 1, 0)										as BASE_ADTV
				, bp.BASE_CODE||' - '||bp.BASE_NAME									as BASE_TEXT
				, bp.BASE_CODE||' - '||bp.BASE_NAME||' ('||bc.BCLASS_DESC||') ' 	as BASE_DESC
				, bc.BCLASS_DENS_LO													as BASE_CLASS_DENS_LO
				, bc.BCLASS_DENS_HI													as BASE_CLASS_DENS_HI
				, bc.BCLASS_VCF_ALG													as BASE_CLASS_VCF_ALG
				, bc.BCLASS_TEMP_LO													as BASE_CLASS_TEMP_LO
				, bc.BCLASS_TEMP_HI													as BASE_CLASS_TEMP_HI
			from 
				BASE_PRODS 		bp
				, (
					select 
						bs.BCLASS_NO
						, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
						, bs.BCLASS_DENS_LO
						, bs.BCLASS_DENS_HI
						, bs.BCLASS_VCF_ALG
						, bs.BCLASS_TEMP_LO
						, bs.BCLASS_TEMP_HI			
					from 
						BASECLASS 			bs
						, BCLASS_TYP		bm
					where 
						1=1	
						and bs.BCLASS_NO = bm.BCLASS_ID(+)
				) 					bc
			where 
				1=1
				and bp.BASE_CAT = bc.BCLASS_NO
				and (-1=$category or bp.BASE_CAT=$category) 
			order by bp.BASE_CODE 
		";
		*/	
		$sql = array();
        $sql['sql_text'] = "
			select 
				bp.BASE_CODE
				, bp.BASE_NAME
				, bp.BASE_PROD_GROUP
				, bp.BASE_CAT
				, bc.BCLASS_DESC													as BASE_CLASS_DESC
				, bp.BASE_RPT_TUNT
				, bp.BASE_RPT_TEMP	
				, decode(bp.BASE_CAT, 6, 1, 0)										as BASE_ADTV
				, bp.BASE_CODE||' - '||bp.BASE_NAME									as BASE_TEXT
				, bp.BASE_CODE||' - '||bp.BASE_NAME||' ('||bc.BCLASS_DESC||') ' 	as BASE_DESC
				, bc.BCLASS_DENS_LO													as BASE_CLASS_DENS_LO
				, bc.BCLASS_DENS_HI													as BASE_CLASS_DENS_HI
				, bc.BCLASS_VCF_ALG													as BASE_CLASS_VCF_ALG
				, bc.BCLASS_TEMP_LO													as BASE_CLASS_TEMP_LO
				, bc.BCLASS_TEMP_HI													as BASE_CLASS_TEMP_HI
			from 
				BASE_PRODS 		bp
				, (
					select 
						bs.BCLASS_NO
						, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
						, bs.BCLASS_DENS_LO
						, bs.BCLASS_DENS_HI
						, bs.BCLASS_VCF_ALG
						, bs.BCLASS_TEMP_LO
						, bs.BCLASS_TEMP_HI			
					from 
						BASECLASS 			bs
						, BCLASS_TYP		bm
					where 
						1=1	
						and bs.BCLASS_NO = bm.BCLASS_ID(+)
				) 					bc
			where 
				1=1
				and bp.BASE_CAT = bc.BCLASS_NO
				and (-1=:category or bp.BASE_CAT=:category) 
			order by bp.BASE_CODE 
		";
		$sql['sql_data'] = array( $category );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupBaseClass($caseType='L')
	{
		//select * from BASECLASS where BCLASS_NO>0	order by BCLASS_NO  
        $sql = "
			select 
				bs.BCLASS_NO
				, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
				, bs.BCLASS_DENS_LO
				, bs.BCLASS_DENS_HI
				, bs.BCLASS_VCF_ALG
				, bs.BCLASS_TEMP_LO
				, bs.BCLASS_TEMP_HI			
			from 
				BASECLASS 			bs
				, BCLASS_TYP		bm
			where 
				bs.BCLASS_NO>0	
				and bs.BCLASS_NO = bm.BCLASS_ID(+)
			order by bs.BCLASS_NO  
		";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupTanks($site, $base, $type, $caseType='L')
	{
		/*
        $sql = "
			select TANK_CODE||' ['||TANK_BASE||' - '||TANK_BASE_NAME||' - '||TANK_BCLASS_NAME||']' as TANK_DESC, GUI_TANKS.*  
			from GUI_TANKS 
			where 
				('-1'='$site' or TANK_TERMINAL='$site') 
				and ('-1'='$base' or TANK_BASE='$base')
				and ('-1'='$type' or TANK_BASE_CLASS='$type')
			order by TANK_CODE  
		";
		*/	
		$sql = array();
        $sql['sql_text'] = "
			select TANK_CODE||' ['||TANK_BASE||' - '||TANK_BASE_NAME||' - '||TANK_BCLASS_NAME||']' as TANK_DESC, GUI_TANKS.*  
			from GUI_TANKS 
			where 
				('-1'=:tanksite or TANK_TERMINAL=:tanksite) 
				and ('-1'=:tankbase or TANK_BASE=:tankbase)
				and ('-1'=:tanktype or TANK_BASE_CLASS=:tanktype)
			order by TANK_CODE  
		";
		$sql['sql_data'] = array( $site, $base, $type );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupLevelAlarms($caseType='L')
	{
        $sql = "
			select * from LEVEL_ALARMS_TYP	order by LEVEL_ALARMS_ID  
		";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupGaugeMethods($caseType='L')
	{
        $sql = "
			select * from GAUGE_METHOD_TYP	order by GAUGE_METHOD_ID  
		";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAreas($caseType='L')
	{
        $sql = "
			select * from AREA_RC	order by AREA_NAME  
		";

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupTankGroups($caseType='L')
	{
        $sql = "
			select * from TGROUP	order by TGR_NAME  
		";

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupTankGroupsAndDetails($caseType='L')
	{
        $sql = "
		select 
			TGROUP.TGR_NAME				as TGR_NAME
			, G.TKNU					as TGR_TANKCOUNT
			, G.TGR_TANKS				as TGR_TANKLIST
			, T.TANK_CODE				as TGR_TANKCODE
			, T.TANK_BASE				as TGR_BASECODE
			, T.BASE_NAME				as TGR_BASENAME
			, T.TANK_TERMINAL			as TGR_SITECODE
			, T.TERM_NAME				as TGR_SITENAME
		from
			( 
			select
				TGRLINK.TGR_GRLK
				, COUNT(*) TKNU
				, LISTAGG(TANKS.TANK_CODE||'-'||BASE_PRODS.BASE_NAME, ',') WITHIN GROUP (ORDER BY TANKS.TANK_CODE) as TGR_TANKS
			from
				TANKS
				, TGRLINK
				, BASE_PRODS
			where
				TANKS.TANK_CODE = TGRLINK.TGR_TKLK_TANKCODE
				and TANKS.TANK_BASE = BASE_PRODS.BASE_CODE
				and TANKS.TANK_TERMINAL = TGRLINK.TGR_TKLK_TANKDEPO
			group by TGRLINK.TGR_GRLK
			) G,
			( 
			select 
				TGRLINK.TGR_GRLK
				, TANKS.TANK_CODE
				, TANKS.TANK_BASE
				, BASE_PRODS.BASE_NAME
				, TANKS.TANK_TERMINAL
				, TERMINAL.TERM_NAME
			from
				TANKS
				, TGRLINK
				, BASE_PRODS
				, TERMINAL
			where
				TANKS.TANK_CODE = TGRLINK.TGR_TKLK_TANKCODE
				and TANKS.TANK_TERMINAL = TGRLINK.TGR_TKLK_TANKDEPO
				and TGRLINK.TGR_NTK=1
				and BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
				and TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
			) T
			, TGROUP
		where 
			TGROUP.TGR_NAME = T.TGR_GRLK(+)
			and TGROUP.TGR_NAME = G.TGR_GRLK(+) 
		";

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupTankGroupLinks($caseType='L')
	{
        $sql = "
			select 
				TGR_GRLK					as TANK_GROUP
				, TGR_NTK					as TANK_ACTIVE
				, TGR_TKLK_TANKDEPO			as TANK_TERMINAL
				, TGR_TKLK_TANKCODE			as TANK_CODE
			from TGRLINK	
			order by TGR_GRLK  
		";

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupTanksInGroup($tkgrp, $caseType='L')
	{
		/*
        $sql = "
			select
				TANKS.TANK_CODE				as TANK_CODE
				, BASE_PRODS.BASE_CODE		as TANK_BASECODE
				, BASE_PRODS.BASE_NAME		as TANK_BASENAME
				, TGRLINK.TGR_NTK			as TANK_ACTIVE
				, TGRLINK.TGR_GRLK			as TANK_GROUP
				, TANKS.TANK_TERMINAL		as TANK_SITECODE
				, TERMINAL.TERM_NAME		as TANK_SITENAME
			from
				TANKS
				, TGRLINK
				, BASE_PRODS
				, TERMINAL
			where
				TANKS.TANK_CODE = TGRLINK.TGR_TKLK_TANKCODE
				and TANKS.TANK_TERMINAL = TGRLINK.TGR_TKLK_TANKDEPO
				and BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
				and TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
				and ('-1'='$tkgrp' or TGRLINK.TGR_GRLK = '$tkgrp')
			order by TGRLINK.TGR_GRLK, TGRLINK.TGR_TKLK_TANKCODE
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			select
				TANKS.TANK_CODE				as TANK_CODE
				, BASE_PRODS.BASE_CODE		as TANK_BASECODE
				, BASE_PRODS.BASE_NAME		as TANK_BASENAME
				, TGRLINK.TGR_NTK			as TANK_ACTIVE
				, TGRLINK.TGR_GRLK			as TANK_GROUP
				, TANKS.TANK_TERMINAL		as TANK_SITECODE
				, TERMINAL.TERM_NAME		as TANK_SITENAME
			from
				TANKS
				, TGRLINK
				, BASE_PRODS
				, TERMINAL
			where
				TANKS.TANK_CODE = TGRLINK.TGR_TKLK_TANKCODE
				and TANKS.TANK_TERMINAL = TGRLINK.TGR_TKLK_TANKDEPO
				and BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
				and TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
				and ('-1'=:tkgrp or TGRLINK.TGR_GRLK = :tkgrp)
			order by TGRLINK.TGR_GRLK, TGRLINK.TGR_TKLK_TANKCODE
		";
		$sql['sql_data'] = array( $tkgrp );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupTanksNotInGroup($base_code, $caseType='L')
	{
		/*
        $sql = "
			select
				TANKS.TANK_CODE				as TANK_CODE
				, BASE_PRODS.BASE_CODE		as TANK_BASECODE
				, BASE_PRODS.BASE_NAME		as TANK_BASENAME
				, TANKS.TANK_TERMINAL		as TANK_SITECODE
				, TERMINAL.TERM_NAME		as TANK_SITENAME
				, TANKS.TANK_CODE||' - '||BASE_PRODS.BASE_NAME		as TANK_DESC
			from
				TANKS
				, BASE_PRODS
				, TERMINAL
			where
				TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
				and BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
				and ('-1'='$base_code' or BASE_PRODS.BASE_CODE = '$base_code')
				and (TANKS.TANK_CODE, TANKS.TANK_TERMINAL) not in (select TGR_TKLK_TANKCODE, TGRLINK.TGR_TKLK_TANKDEPO from TGRLINK)
			order by TANKS.TANK_CODE
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			select
				TANKS.TANK_CODE				as TANK_CODE
				, BASE_PRODS.BASE_CODE		as TANK_BASECODE
				, BASE_PRODS.BASE_NAME		as TANK_BASENAME
				, TANKS.TANK_TERMINAL		as TANK_SITECODE
				, TERMINAL.TERM_NAME		as TANK_SITENAME
				, TANKS.TANK_CODE||' - '||BASE_PRODS.BASE_NAME		as TANK_DESC
			from
				TANKS
				, BASE_PRODS
				, TERMINAL
			where
				TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
				and BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
				and ('-1'=:base_code or BASE_PRODS.BASE_CODE = :base_code)
				and (TANKS.TANK_CODE, TANKS.TANK_TERMINAL) not in (select TGR_TKLK_TANKCODE, TGRLINK.TGR_TKLK_TANKDEPO from TGRLINK)
			order by TANKS.TANK_CODE
		";
		$sql['sql_data'] = array( $base_code );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupUnitScale($caseType='L')
	{
        $sql = "SELECT UNIT_ID, DESCRIPTION as UNIT_NAME FROM UNIT_SCALE_VW WHERE 1=1";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupCompanyByCode($code, $caseType='L')
	{
        //$sql = "select * from COMPANYS where CMPY_CODE='$code'";
			
		$sql = array();
        $sql['sql_text'] = "select * from COMPANYS where CMPY_CODE=:cmpy_code";
		$sql['sql_data'] = array( $code );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
	}
	
	public function lookupRoles($caseType='L')
	{
        $sql = "
			select 
				AUTH_LEVEL_ID 			as ROLE_ID
				, AUTH_LEVEL_NAME 		as ROLE_NAME 
			from AUTH_LEVEL_TYP	
			order by AUTH_LEVEL_ID  
		";

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
   
    public function lookupGate($caseType='L')
	{
        $sql="select * from GATE_RC order by GATE_K ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
   
    public function lookupEqptType($caseType='L')
	{
        $sql="select * from EQUIP_TYPES_VW order by ETYP_TITLE ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
   
    public function lookupProfile($caseType='L')
	{
        $sql="
				select
					pr.PRF_CODE
					, pr.PRF_ETYP
					, pr.PRF_SUPP
					, et.ETYP_TITLE				as PRF_ETYP_NAME
					, sc.CMPY_NAME				as PRF_SUPP_NAME
					, (pr.PRF_CODE||' - '||pr.PRF_ETYP||', '||et.ETYP_TITLE||' - '||pr.PRF_SUPP||', '||sc.CMPY_NAME)			as PRF_DESC
				from 
					PROFILE					pr
					, EQUIP_TYPES			et
					, COMPANYS				sc
				where 
					pr.PRF_ETYP = et.ETYP_ID
					and pr.PRF_SUPP = sc.CMPY_CODE
		";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }
	
	public function lookupAuthType($caseType='L')
	{
        $sql = "
			(
			select
				999						as ROLE_ID
				, MESSAGE 				as ROLE_NAME 
			from 
				MSG_LOOKUP 
			where 
				(MSG_ID=1900 )  
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
			)
			union	
			(
			select 
				AUTH_LEVEL_ID 			as ROLE_ID
				, AUTH_LEVEL_NAME 		as ROLE_NAME 
			from AUTH_LEVEL_TYP	
			)
		";

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupTemperatureUnits($caseType='L')
	{
        $sql = "SELECT UNIT_ID, DESCRIPTION as UNIT_NAME FROM UNIT_SCALE_VW WHERE UNIT_ID in (0,1)";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupBatchMeterUsage($caseType='L')
	{
/*		
SELECT bu.BAM_USAGE_ID, 
        	bu.BAM_USAGE_NAME USAGE
    		FROM BAM_USAGE_TYP bu 
   		WHERE bu.BAM_USAGE_ID IN (4,5,6) 
        UNION 
        SELECT -1, 'ALL BATCH' FROM DUAL 
        ORDER BY 1;
*/
        $sql = "SELECT bu.BAM_USAGE_ID, bu.BAM_USAGE_NAME USAGE FROM BAM_USAGE_TYP bu WHERE bu.BAM_USAGE_ID IN (4,5,6) ORDER BY 1";
			  
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupLoadMeterUsage($caseType='L')
	{
/*
SELECT bu.BAM_USAGE_ID,  
             	bu.BAM_USAGE_NAME  
      		  FROM BAM_USAGE_TYP bu  
 		     WHERE bu.BAM_USAGE_ID IN (1,2,3,7,8)  
              ORDER by 1 ;
*/		
        $sql = "SELECT bu.BAM_USAGE_ID, bu.BAM_USAGE_NAME FROM BAM_USAGE_TYP bu WHERE bu.BAM_USAGE_ID IN (1,2,3,7,8) ORDER by 1";
			  
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupMeterType($caseType='L')
	{
        $sql = "SELECT BA_METER_ID, BA_METER_NAME from BA_METER_TYP where BA_METER_ID !=0 ORDER by 1";
			  
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupQtyType($caseType='L')
	{
        $sql = "SELECT QTY_ID, QTY_NAME from QTY_TYP where 1=1 ORDER by 1";
			  
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupDocumentType($caseType='L')
	{
        $sql = "SELECT DOCUMENT_ID, DOCUMENT_NAME from DOCUMENT_TYP where 1=1 ORDER by 1";
			  
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
   
	public function lookupCorrectionMethods($caseType='L')
	{
		/*
        $sql="
			select 1 as CORR_MTHD_ID, 'NO_COMPENSTN' as CORR_MTHD_CODE, 'No compensation is applied' as CORR_MTHD_NAME from DUAL
			union 
			select 2 as CORR_MTHD_ID, 'ASTM_DENSITY' as CORR_MTHD_CODE, 'Compensation is applied according to the density of the product using ASTM formulas' as CORR_MTHD_NAME from DUAL
			union 
			select 3 as CORR_MTHD_ID, 'ASTM_API' as CORR_MTHD_CODE, 'Compensation is applied according to the API using ASTM formulas' as CORR_MTHD_NAME from DUAL
			union 
			select 4 as CORR_MTHD_ID, 'ASTM_C_OF_E' as CORR_MTHD_CODE, 'Compensation is applied according to the coefficient of expansion using ASTM formulas' as CORR_MTHD_NAME from DUAL
			union 
			select 5 as CORR_MTHD_ID, 'OIML_ETHANOL' as CORR_MTHD_CODE, 'Compensation is applied using the OIML formula for ethanol' as CORR_MTHD_NAME from DUAL
		";
		*/
		$sql = "select * from COMPENSATION_MTHD";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
   }
   
	public function lookupRefTempSpecs($caseType='L')
	{
		$sql = "select * from REF_TEMP_SPEC";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
   }
	
	public function lookupCompanyTypes($roles="0,1,2,3,4,5,6,7", $caseType='L')
	{
		if ( $roles == "" )
		{
			$roles = "0,1,2,3,4,5,6,7";
		}
		
		$sql = array();
        $sql['sql_text'] = "
			SELECT 
				COMPANY_ID 		as CMPY_TYPE_ID
				, COMPANY_NAME	as CMPY_TYPE_NAME
			FROM COMPANY_TYP
			WHERE 
				COMPANY_ID IN (" . $roles . ")
			";
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupLoadBay($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM BA_DEVICE
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupMovementSupplier($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT 
			  CMPY_CODE
			  , CMPY_NAME
			  , NVL(CMPY_PLANT, CMPY_CODE)  as CMPY_PLANT
			  , CMPY_MOVEMENTS_REV 
			  , (NVL(CMPY_PLANT, CMPY_CODE)||' - '||CMPY_CODE||' - '||CMPY_NAME)    as PLANT_GUI  
			FROM 
			  COMPANYS 
			WHERE 
			  BITAND(cmpy_type,2)<>0 
			ORDER BY CMPY_NAME ASC
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupMovementItemType($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT 
				MOVITEM_TYPE_ID
				, decode(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') as MOVITEM_TYPE_CODE
				, MOVITEM_TYPE_NAME 
			FROM MOVITEM_TYPES 
			order by MOVITEM_TYPE_ID
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 

	
	// The following list data are for Nomination
	
	// get all Site data
	public function lookupNominationSiteSetting($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM SITE
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all Terminal data
	public function lookupNominationTerminal($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM TERMINAL WHERE TERM_CODE in (select SITE_CODE from SITE)
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all supplier data
	public function lookupNominationSupplier($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,2)<>0 ORDER BY CMPY_NAME ASC
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all carrier data
	public function lookupNominationCarrier($caseType='L')
	{
		$sql = array();
        /*
		$sql['sql_text'] = "
			SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,4)<>0 ORDER BY CMPY_NAME ASC
		";
		*/
        $sql['sql_text'] = "
			SELECT * FROM GUI_COMPANYS 
			WHERE 
				BITAND(CMPY_TYPE,4)<>0 
				and ( 
					( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and ( CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
						or ( CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=2 and status=1) ) ) 
					)
					or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
					or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
					or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
			ORDER BY CMPY_NAME ASC
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all vehicle data
	public function lookupNominationVehicle($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM GUI_TANKERS
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all personnel data
	public function lookupNominationPersonnel($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM PERSONNEL
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	
	//ok, let's get more lists for movement items too
	// get all product units data
	public function lookupNominationProductUnit($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM UNIT_SCALE_VW WHERE UNIT_ID in (5, 11, 17)
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all Plant data
	public function lookupNominationPlant($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT DISTINCT CMPY_PLANT as TERM_CODE, 'PLANT' as TERM_NAME, 'PLANT_CODE' as CMPY_CODE, 'PLANT_TYPE' as CMPY_TYPE FROM COMPANYS WHERE CMPY_PLANT IS NOT NULL ORDER BY CMPY_PLANT
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all drawer data
	public function lookupNominationDrawer($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,16)<>0 ORDER BY CMPY_NAME ASC
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all drawer products data
	public function lookupNominationDrawerProduct($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM PRODUCTS WHERE PROD_CMPY!='BaSePrOd'
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all tanks data
	public function lookupNominationTank($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM TANKS
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	// get all ratios data
	public function lookupNominationProductRatio($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM RATIOS ORDER BY RAT_PROD_PRODCMPY, RAT_PROD_PRODCODE, RATIO_BASE
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupNominationItemType($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT MOVITEM_TYPE_ID, decode(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') as MOVITEM_TYPE_CODE, MOVITEM_TYPE_NAME FROM MOVITEM_TYPES order by MOVITEM_TYPE_ID
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupNominationSource($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT MOVSOURCE_TYPE_ID, MOVSOURCE_TYPE_NAME FROM MOVSOURCE_TYPES order by MOVSOURCE_TYPE_ID
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupNominationStatus($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT MOVSTATUS_TYPE_ID, MOVSTATUS_TYPE_NAME FROM MOVSTATUS_TYPES order by MOVSTATUS_TYPE_ID
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 

	// following services are for nomination schedules
		
	// get all bay arms data
	public function lookupNominationBayarm($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM BA_ARMS
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
		
	// get all schedule status data
	public function lookupNominationScheduleStatus($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM SCHEDULE_STATUS_SHORT_LOOKUP
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
		
	// get all trailer data
	public function lookupNominationTrailer($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT * FROM GUI_EQUIPMENT_LIST
		";
		$sql['sql_data'] = array(  );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupAddressContent($caseType='L')
	{
/*			select 
				DB_ADDR_LINE_ID															as ADDRESS_CODE
				, DB_ADDR_LINE_ID||'['||NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN group (order by DB_ADDRLINE_NO), ' ')||']' 	as ADDRESS_TEXT
			from 
				DB_ADDRESS_LINE
			where 
				1 = 1 
			group by 
				DB_ADDR_LINE_ID
*/				
        $sql="
			select 
				da.DB_ADDRESS_KEY						as ADDRESS_CODE
				, da.DB_ADDRESS_KEY||'['||NVL(dl.DB_ADDR_TEXT, ' ')||']' 	as ADDRESS_TEXT
			from 
				DB_ADDRESS		da
				, (
					select 
						DB_ADDR_LINE_ID
						, NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN group (order by DB_ADDRLINE_NO), ' ')	 as DB_ADDR_TEXT
					from 
						DB_ADDRESS_LINE
					where 
						1 = 1 
					group by 
						DB_ADDR_LINE_ID
				) dl
			where 
				1 = 1
				and da.DB_ADDRESS_KEY = dl.DB_ADDR_LINE_ID(+)
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 

	// following services are for folios
		
	// get folios
	public function lookupFolios($status, $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT 
				CLOSEOUT_NR
				, CLOSEOUT_DATE
				, PREV_CLOSEOUT_DATE
				, STATUS
				, REPORT_TRIGGER
				, USER_CODE
				, LAST_CHG_TIME
				, CLOSEOUT_NAME 
			from 
				CLOSEOUTS
			where 
				STATUS=:status_value
		";
		$sql['sql_data'] = array( $status );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
	public function lookupOpenFrozenFolios($caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			SELECT 
				CLOSEOUT_NR
				, CLOSEOUT_DATE
				, PREV_CLOSEOUT_DATE
				, STATUS
				, REPORT_TRIGGER
				, USER_CODE
				, LAST_CHG_TIME
				, CLOSEOUT_NAME 
			from 
				CLOSEOUTS
			where 
				(STATUS=0 or STATUS=1)
		";
		$sql['sql_data'] = array( );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
}
?>