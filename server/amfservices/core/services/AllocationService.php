<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('ALLOCATION')) define('ALLOCATION','AllocationService.class');

class AllocationService
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
            $this->cgi = CGIDIR . "gantry/allocations.cgi";
            $this->cgi_items = CGIDIR . "gantry/allocations.cgi";
            $this->cgi_periods = CGIDIR . "gantry/allocations.cgi";
            $this->cgi_reset = CGIDIR . "gantry/allocations.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/allocations.cgi";
            $this->cgi_items ="cgi-bin/en/gantry/allocations.cgi";
            $this->cgi_periods ="cgi-bin/en/gantry/allocations.cgi";
            $this->cgi_reset = "cgi-bin/en/gantry/allocations.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM GUI_ALLOCATIONS";
			
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
		else $sort="ORDER BY ALLOC_TYPE DESC";
		
		//$query = "SELECT * FROM GUI_ALLOCATIONS $filter $sort";
		$query = "SELECT * FROM GUI_ALLOCATIONS " . $filter['sql_text'] . " $sort";

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
         
    public function initAllocationItems( $drawer )
	{
		/*
		$sql="
			select
				NULL as AITEM_TYPE
				, NULL as AITEM_TYPENAME
				, NULL as AITEM_CMPYCODE
				, NULL as AITEM_CMPYNAME
				, PROD_CODE as AITEM_PRODCODE
				, PROD_CMPY as AITEM_SUPPCODE
				, PROD_NAME as AITEM_PRODNAME
				, NULL as AITEM_SUPPNAME
				, 0 as AITEM_QTYLIMIT
				, 0 as AITEM_QTYUSED
				, 0 as AITEM_QTYLEFT
				, 5 as AITEM_PRODUNIT
				, NULL as AITEM_UNITNAME
				, NULL as AITEM_PERCHILD
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
				NULL as AITEM_TYPE
				, NULL as AITEM_TYPENAME
				, NULL as AITEM_CMPYCODE
				, NULL as AITEM_CMPYNAME
				, PROD_CODE as AITEM_PRODCODE
				, PROD_CMPY as AITEM_SUPPCODE
				, PROD_NAME as AITEM_PRODNAME
				, NULL as AITEM_SUPPNAME
				, 0 as AITEM_QTYLIMIT
				, 0 as AITEM_QTYUSED
				, 0 as AITEM_QTYLEFT
				, 5 as AITEM_PRODUNIT
				, NULL as AITEM_UNITNAME
				, NULL as AITEM_PERCHILD
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
	}
         
    public function getAllocationItems( $type, $cmpy, $supp )
	{
		/*
		$sql="
			select
				AITEM_TYPE
				, AITEM_TYPENAME
				, AITEM_CMPYCODE
				, AITEM_CMPYNAME
				, AITEM_PRODCODE
				, AITEM_PRODNAME
				, AITEM_SUPPCODE
				, AITEM_SUPPNAME
				, AITEM_QTYLIMIT
				, AITEM_QTYUSED
				, AITEM_QTYLEFT
				, AITEM_PRODUNIT
				, AITEM_UNITNAME
				, AITEM_PERCHILD
			from
				GUI_ALLOCATION_ITEMS
			where 
				AITEM_TYPE=$type 
				and AITEM_CMPYCODE='$cmpy'
				and AITEM_SUPPCODE='$supp'
			order by
				AITEM_TYPE, AITEM_CMPYCODE, AITEM_SUPPCODE, AITEM_PRODCODE
		";
		*/	
		
		$sql = array();
        $sql['sql_text'] = "
			select
				AITEM_TYPE
				, AITEM_TYPENAME
				, AITEM_CMPYCODE
				, AITEM_CMPYNAME
				, AITEM_PRODCODE
				, AITEM_PRODNAME
				, AITEM_SUPPCODE
				, AITEM_SUPPNAME
				, AITEM_QTYLIMIT
				, AITEM_QTYUSED
				, AITEM_QTYLEFT
				, AITEM_PRODUNIT
				, AITEM_UNITNAME
				, AITEM_PERCHILD
			from
				GUI_ALLOCATION_ITEMS
			where 
				AITEM_TYPE=:alloc_type 
				and AITEM_CMPYCODE=:alloc_cmpy
				and AITEM_SUPPCODE=:alloc_supp
			order by
				AITEM_TYPE, AITEM_CMPYCODE, AITEM_SUPPCODE, AITEM_PRODCODE
		";
		$sql['sql_data'] = array( $type, $cmpy, $supp );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getAllocationPeriods( $type, $cmpy, $supp, $prod )
	{
		/*
		$sql="
			select
				AIPRD_TYPE
				, AIPRD_TYPENAME
				, AIPRD_CMPYCODE
				, AIPRD_CMPYNAME
				, AIPRD_PRODCODE
				, AIPRD_PRODNAME
				, AIPRD_SUPPCODE
				, AIPRD_SUPPNAME
				, AIPRD_INDEX
				, DECODE(AIPRD_DAYSTART, NULL, '', TO_CHAR(AIPRD_DAYSTART, 'YYYY-MM-DD')) as AIPRD_DAYSTART
				, DECODE(AIPRD_DAYEND, NULL, '', TO_CHAR(AIPRD_DAYEND, 'YYYY-MM-DD')) as AIPRD_DAYEND
				, AIPRD_PRODUNIT
				, AIPRD_UNITNAME
				, AIPRD_QTYLIMIT
				, AIPRD_QTYUSED
				, AIPRD_QTYLEFT
			from
				GUI_ALLOCATION_PERIODS
			where 
				AIPRD_TYPE=$type 
				and AIPRD_CMPYCODE='$cmpy'
				and AIPRD_SUPPCODE='$supp'
				and AIPRD_PRODCODE='$prod'
			order by 
				AIPRD_TYPE, AIPRD_CMPYCODE, AIPRD_SUPPCODE, AIPRD_PRODCODE, AIPRD_INDEX
		";
		*/	
		
		$sql = array();
        $sql['sql_text'] = "
			select
				AIPRD_TYPE
				, AIPRD_TYPENAME
				, AIPRD_CMPYCODE
				, AIPRD_CMPYNAME
				, AIPRD_PRODCODE
				, AIPRD_PRODNAME
				, AIPRD_SUPPCODE
				, AIPRD_SUPPNAME
				, AIPRD_INDEX
				, DECODE(AIPRD_DAYSTART, NULL, '', TO_CHAR(AIPRD_DAYSTART, 'YYYY-MM-DD')) as AIPRD_DAYSTART
				, DECODE(AIPRD_DAYEND, NULL, '', TO_CHAR(AIPRD_DAYEND, 'YYYY-MM-DD')) as AIPRD_DAYEND
				, AIPRD_PRODUNIT
				, AIPRD_UNITNAME
				, AIPRD_QTYLIMIT
				, AIPRD_QTYUSED
				, AIPRD_QTYLEFT
			from
				GUI_ALLOCATION_PERIODS
			where 
				AIPRD_TYPE=:alloc_type 
				and AIPRD_CMPYCODE=:alloc_cmpy
				and AIPRD_SUPPCODE=:alloc_supp
				and AIPRD_PRODCODE=:alloc_prod
			order by 
				AIPRD_TYPE, AIPRD_CMPYCODE, AIPRD_SUPPCODE, AIPRD_PRODCODE, AIPRD_INDEX
		";
		$sql['sql_data'] = array( $type, $cmpy, $supp, $prod );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

    //TODO: relationships of allocation and schedules
    public function getAllocationSchedules( $order_id )
	{
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
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getAllocationItemSchedules( $type=-1, $cmpy='-1', $supp='-1', $prod='-1' )
	{
		/*
		$sql="
			select * from GUI_ALLOCATION_ADJUSTS 
			where
				1=1
				and (-1=$type or ADJST_TYPE=$type)
				and ('-1'=$cmpy or ADJST_CMPYCODE=$cmpy)
				and ('-1'=$supp or ADJST_SUPPCODE=$supp)
				and ('-1'=$prod or ADJST_PRODCODE=$prod)
			order by
				ADJST_TYPE, ADJST_CMPYCODE, ADJST_SUPPCODE, ADJST_PRODCODE, ADJST_LOAD_ID
		";
		*/	
		
		$sql = array();
        $sql['sql_text'] = "
			select * from GUI_ALLOCATION_ADJUSTS 
			where
				1=1
				and (-1=:alloc_type or ADJST_TYPE=:alloc_type)
				and ('-1'=:alloc_cmpy or ADJST_CMPYCODE=:alloc_cmpy)
				and ('-1'=:alloc_supp or ADJST_SUPPCODE=:alloc_supp)
				and ('-1'=:alloc_prod or ADJST_PRODCODE=:alloc_prod)
			order by
				ADJST_TYPE, ADJST_CMPYCODE, ADJST_SUPPCODE, ADJST_PRODCODE, ADJST_LOAD_ID
		";
		$sql['sql_data'] = array( $type, $cmpy, $supp, $prod );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

    public function isAllocationKeyUsed( $type, $cmpy, $supp )
	{
		//$sql = "select * from LOCKAL where LOCKATYP_AT_TYPE=$type and LOCKATYP_AT_CMPY='$cmpy' and LOCKAL_SUPL='$supp' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from LOCKAL where LOCKATYP_AT_TYPE=:alloc_type and LOCKATYP_AT_CMPY=:alloc_cmpy and LOCKAL_SUPL=:alloc_supp ";
		$sql['sql_data'] = array( $type, $cmpy, $supp );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isAllocationItemKeyUsed( $type, $cmpy, $supp, $prod )
	{
		//$sql = "select * from ALLOCS where ALL_ATKY_AT_TYPE=$type and ALL_ATKY_AT_CMPY='$cmpy' and ALL_PROD_PRODCMPY='$supp' and ALL_PROD_PRODCODE='$prod' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from ALLOCS where ALL_ATKY_AT_TYPE=:alloc_type and ALL_ATKY_AT_CMPY=:alloc_cmpy and ALL_PROD_PRODCMPY=:alloc_supp and ALL_PROD_PRODCODE=:alloc_prod ";
		$sql['sql_data'] = array( $type, $cmpy, $supp, $prod );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }

    public function isAllocationPeriodKeyUsed( $type, $cmpy, $supp, $prod, $num )
	{
		//$sql = "select * from ALL_CHILD where ALCH_ALP_ALL_ATKY_AT_TYPE=$type and ALCH_ALP_ALL_ATKY_AT_CMPY='$cmpy' and ALCH_ALP_ALL_PROD_PRODCMPY='$supp' and ALCH_ALP_ALL_PROD_PRODCODE='$prod' and ALL_CHILD_P_NO=$num ";
		
		$sql = array();
        $sql['sql_text'] = "select * from ALL_CHILD where ALCH_ALP_ALL_ATKY_AT_TYPE=:alloc_type and ALCH_ALP_ALL_ATKY_AT_CMPY=:alloc_cmpy and ALCH_ALP_ALL_PROD_PRODCMPY=:alloc_supp and ALCH_ALP_ALL_PROD_PRODCODE=:alloc_prod and ALL_CHILD_P_NO=:alloc_pnum ";
		$sql['sql_data'] = array( $type, $cmpy, $supp, $prod, $num );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }
    
    public function getNextAllocationPeriodNum( $type, $cmpy, $supp, $prod )
	{
        $mydb = DB::getInstance();
		/*
        $sql="
				select MAX(ALL_CHILD_P_NO)+1 AS NEXT_ID 
				from ALL_CHILD
				where 
					ALCH_ALP_ALL_ATKY_AT_TYPE=$type 
					and ALCH_ALP_ALL_ATKY_AT_CMPY='$cmpy' 
					and ALCH_ALP_ALL_PROD_PRODCMPY='$supp' 
					and ALCH_ALP_ALL_PROD_PRODCODE='$prod'
			";
		*/	
		$sql = array();
        $sql['sql_text'] = "
				select MAX(ALL_CHILD_P_NO)+1 AS NEXT_ID 
				from ALL_CHILD
				where 
					ALCH_ALP_ALL_ATKY_AT_TYPE=:alloc_type 
					and ALCH_ALP_ALL_ATKY_AT_CMPY=:alloc_cmpy 
					and ALCH_ALP_ALL_PROD_PRODCMPY=:alloc_supp 
					and ALCH_ALP_ALL_PROD_PRODCODE=:alloc_prod
			";
		$sql['sql_data'] = array( $type, $cmpy, $supp, $prod );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->NEXT_ID) == TRUE || $rows[0]->NEXT_ID=="" )
		{
			$next_id = 1;
		}
		else
		{
			$next_id = (integer)$rows[0]->NEXT_ID;
		}
		
		return($next_id);
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
	

	
/*
CGIs for Allocation
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?supp=0002&cmpy=0022&lock=2&op=18&cmd=ADD&typeId=3
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?supp=0002&cmpy=0019&lock=3&period=2&op=18&cmd=ADD&typeId=3
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?supp=0002&cmpy=74&lock=4&op=18&cmd=ADD&typeId=3

http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?lock=3&period=4&op=17&cmd=MOD&typeId=3&cmpy=74&supp=0002
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?op=19&typeId=3&cmpy=74&supp=0002&lock=3&cmd=DEL


CGIs for Allocation Items
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?prod=000097&vol=1000000&unit=5&typeId=3&op=38&cmd=ADD&cmpy=0022&lock=2&supp=0002
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?prod=000152&vol=2000000&unit=17&typeId=3&op=38&cmd=ADD&cmpy=0022&lock=2&supp=0002

http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?vol=1000999&typeId=3&op=37&cmd=MOD&cmpy=0022&lock=2&supp=0002&prod=000097
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?op=39&typeId=3&cmpy=0022&supp=0002&lock=2&prod=000097&cmd=DEL
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?typeId=3&cmpy=0022&deliv=999901&supp=0002&prod=000152&op=30             reset


CGIs for Allocation Item Periods
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?lock=4&op=17&cmd=MOD&typeId=3&cmpy=0022&supp=0002
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?item=1&start=2015-05-29&end=2015-06-06&limit=123456&unit=5&typeId=3&op=58&cmd=ADD&cmpy=0022&supp=0002&lock=4&prod=000152
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?item=1&start=2015-05-29&end=2015-06-05&limit=123499&unit=5&typeId=3&op=57&cmd=MOD&cmpy=0022&supp=0002&lock=4&prod=000152
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?op=59&typeId=3&cmpy=0022&supp=0002&lock=4&prod=000152&item=1&start=2015-05-29&end=2015-06-05&limit=123499&unit=l+%28amb%29&cmd=DEL

http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?vol=2345678&typeId=3&op=37&cmd=MOD&cmpy=0022&lock=4&supp=0002&prod=000152
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?item=1&start=2015-05-29&end=2015-06-06&limit=123456&unit=17&typeId=3&op=58&cmd=ADD&cmpy=0022&supp=0002&lock=4&prod=000152


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
        Call CGI to CREATE Allocation
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Allocation++++++",ALLOCATION);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'typeId'=>urlencode($data->alloc_type),
            'cmpy'=>urlencode($data->alloc_cmpycode),
            'supp'=>urlencode($data->alloc_suppcode),
            'lock'=>urlencode($data->alloc_lock),
            'period'=>urlencode($data->alloc_period),
            'cmd'=>urlencode("ADD"),   	
			'op'=>urlencode("18")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);
//       {"Success", "成功"},
//       {"Failed, please check!", "失败，请检查！"},
//       {"Allocation is already exist!", "油品配额已存在!"},

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "stBar=Success";
        $patternSuccessChn = "stBar=成功";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Add Allocation failed!!!",ALLOCATION);
                return "ERROR";
        }
        logMe("CGI Add Allocation succeeded!!!",ALLOCATION);

		if ( is_array($data->alloc_items) === FALSE )
		{
			$data->alloc_items = (array)($data->alloc_items);
		}
		if( $data->has_items=="1" && sizeof($data->alloc_items) > 0 )
		{
			for($i=0; $i<sizeof($data->alloc_items); $i++)
			{      
				logMe("Info: ++++++Adding new Allocation product++++++",ALLOCATION);
				logMe("Info111: ++++++Adding new Allocation product++++++",ALLOCATION."---".sizeof($data->alloc_items));
				logMe("Info112: ++++++Adding new Allocation product++++++",ALLOCATION."---".gettype($data->alloc_items));
				logMe("Info113: ++++++Adding new Allocation product++++++",ALLOCATION."---".gettype($data->alloc_items[$i]));
				$fields = array(
					'sess_id'=>urlencode($data->session_id),
					'prod'=>urlencode($data->alloc_items[$i]->aitem_prodcode),
					'vol'=>urlencode($data->alloc_items[$i]->aitem_qtylimit),
					'unit'=>urlencode($data->alloc_items[$i]->aitem_produnit),
//					'typeId'=>urlencode($data->alloc_items[$i]->aitem_type),
//					'cmpy'=>urlencode($data->alloc_items[$i]->aitem_cmpycode),
//					'supp'=>urlencode($data->alloc_items[$i]->aitem_suppcode),
					'typeId'=>urlencode($data->alloc_type),
					'cmpy'=>urlencode($data->alloc_cmpycode),
					'supp'=>urlencode($data->alloc_suppcode),
					'lock'=>urlencode($data->alloc_lock),
					'cmd'=>urlencode("ADD"),   	
					'op'=>urlencode("38")
				);
				logMe("Info222: ++++++Adding new Allocation product++++++",ALLOCATION);
				$thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
				$thunkObj->writeToClient($this->cgi_items);

				$response = $thunkObj->read();
				$patternSuccessEng = "stBar=Success";
				$patternSuccessChn = "stBar=成功";
				$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
				$isFoundEng = strpos($response, $patternSuccessEng);
				$isFoundChn = strpos($response, $patternSuccessChn);
				$isFoundUtf = strpos($response, $patternSuccessUtf);
				if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
						logMe("Add Allocation Product failed!!!",ALLOCATION);
						return "ERROR";
				}
				logMe("CGI Add Allocation Product succeeded!!!",ALLOCATION);
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
		$keys = array ("LOCKATYP_AT_TYPE"=>($data->alloc_type), "LOCKATYP_AT_CMPY"=>($data->alloc_cmpycode), "LOCKAL_SUPL"=>($data->alloc_suppcode));
		$excludes = array ("LOCKAL_DMY"=>0);
		$upd_journal = new UpdateJournalClass( "Allocations", "LOCKAL", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Allocation 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Allocation++++++",ALLOCATION);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'typeId'=>urlencode($data->alloc_type),
            'cmpy'=>urlencode($data->alloc_cmpycode),
            'supp'=>urlencode($data->alloc_suppcode),
            'lock'=>urlencode($data->alloc_lock),
            'period'=>urlencode($data->alloc_period),
            'cmd'=>urlencode("MOD"),   	

			'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Success</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">成功</span>";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Update Allocation!!!",ALLOCATION);
                return "ERROR";
        }
        logMe("CGI Update Allocation!!!",ALLOCATION);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
        logMe("CGI LOG0 Update Allocation!!!",ALLOCATION);
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
        logMe("CGI LOG1 Update Allocation!!!",ALLOCATION);
		$upd_journal->log();
        logMe("CGI LOG2 Update Allocation!!!",ALLOCATION);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		// get the original list of order products
		if( $data->has_items=="1" && sizeof($data->alloc_items) > 0 )
		{
			for($i=0; $i<sizeof($data->alloc_items); $i++)
			{   
				//$errmsg = $i."\t".$data->alloc_items[$i]->aitem_prodcode."\t".$data->alloc_items[$i]->aitem_qtylimit."\taction: ".$data->actions[$i]->option."\t".sizeof($data->actions)."*******";
				//error_log( "\n*****ERRMSG_ALLOCS\n".$errmsg, 3, "temp.log");
			
				if ( $data->actions[$i]->option == "1" )
				{ // insert new product to allocation
//http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?prod=000097&vol=1000000&unit=5&typeId=3&op=38&cmd=ADD&cmpy=0022&lock=2&supp=0002
//http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?prod=000152&vol=2000000&unit=17&typeId=3&op=38&cmd=ADD&cmpy=0022&lock=2&supp=0002
					logMe("Info: ++++++Adding new Allocation product++++++",ALLOCATION);
					$fields = array(
						'sess_id'=>urlencode($data->session_id),
						'prod'=>urlencode($data->alloc_items[$i]->aitem_prodcode),
						'vol'=>urlencode($data->alloc_items[$i]->aitem_qtylimit),
						'unit'=>urlencode($data->alloc_items[$i]->aitem_produnit),
//						'typeId'=>urlencode($data->alloc_items[$i]->aitem_type),
//						'cmpy'=>urlencode($data->alloc_items[$i]->aitem_cmpycode),
//						'supp'=>urlencode($data->alloc_items[$i]->aitem_suppcode),
						'typeId'=>urlencode($data->alloc_type),
						'cmpy'=>urlencode($data->alloc_cmpycode),
						'supp'=>urlencode($data->alloc_suppcode),
						'lock'=>urlencode($data->alloc_lock),
						'cmd'=>urlencode("ADD"),   	
						'op'=>urlencode("38")
					);
					$thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
					$thunkObj->writeToClient($this->cgi_items);

					$response = $thunkObj->read();
					$patternSuccessEng = "stBar=Success";
					$patternSuccessChn = "stBar=成功";
					$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
					$isFoundEng = strpos($response, $patternSuccessEng);
					$isFoundChn = strpos($response, $patternSuccessChn);
					$isFoundUtf = strpos($response, $patternSuccessUtf);
					if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
						logMe("Add Allocation Product failed!!!",ALLOCATION);
						return "ERROR";
					}
					logMe("CGI Add Allocation Product succeeded!!!",ALLOCATION);
				}
				else
//				if ( $data->alloc_items[$i]->action == 2 )
				if ( $data->actions[$i]->option == "2" )
				{ // update existing product in allocation
					//////////////////////////////////////////////////////////////////////////////////////////////////////////
					////////////////////// new module to log any changes of any fields on any screen ////////////////////////
					////////////////////// Before the updates                                        ////////////////////////
					/////////////////////////////////////////////////////////////////////////////////////////////////////////
					$idata = $data->alloc_items[$i];
					$keys2 = array ("ALL_ATKY_AT_TYPE"=>($idata->aitem_type), "ALL_ATKY_AT_CMPY"=>($idata->aitem_cmpycode), "ALL_PROD_PRODCODE"=>($idata->aitem_prodcode), "ALL_PROD_PRODCMPY"=>($idata->aitem_suppcode));
					$excludes2 = array ("ALLOC_PER_CHILD"=>0);
					$upd_journal2 = new UpdateJournalClass( "Allocation Products", "ALLOCS", $keys2, $excludes2 );
					$upd_journal2->setOldValues( $upd_journal2->getRecordValues() );
					/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
//http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?vol=1000999&typeId=3&op=37&cmd=MOD&cmpy=0022&lock=2&supp=0002&prod=000097
		
					logMe("Info: ++++++Updating existing Allocation product++++++",ALLOCATION);
					$fields = array(
						'sess_id'=>urlencode($data->session_id),
						'vol'=>urlencode($data->alloc_items[$i]->aitem_qtylimit),
//						'typeId'=>urlencode($data->alloc_items[$i]->aitem_type),
//						'cmpy'=>urlencode($data->alloc_items[$i]->aitem_cmpycode),
//						'supp'=>urlencode($data->alloc_items[$i]->aitem_suppcode),
						'typeId'=>urlencode($data->alloc_type),
						'cmpy'=>urlencode($data->alloc_cmpycode),
						'supp'=>urlencode($data->alloc_suppcode),
						'lock'=>urlencode($data->alloc_lock),
						'prod'=>urlencode($data->alloc_items[$i]->aitem_prodcode),
						'cmd'=>urlencode("MOD"),   	
						'op'=>urlencode("37")
					);
					$thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
					$thunkObj->writeToClient($this->cgi_items);

					$response = $thunkObj->read();
					$patternSuccessEng = "stBar=Success";
					$patternSuccessChn = "stBar=成功";
					$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
					$isFoundEng = strpos($response, $patternSuccessEng);
					$isFoundChn = strpos($response, $patternSuccessChn);
					$isFoundUtf = strpos($response, $patternSuccessUtf);
					if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
						logMe("Update Allocation Product failed!!!",ALLOCATION);
						return "ERROR";
					}
					logMe("CGI Update Allocation Product succeeded!!!",ALLOCATION);

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
				{ // delete existing product from allocation
//http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?op=39&typeId=3&cmpy=0022&supp=0002&lock=2&prod=000097&cmd=DEL
					logMe("Info: ++++++Deleting new Allocation product++++++",ALLOCATION);
					$fields = array(
						'sess_id'=>urlencode($data->session_id),
//						'typeId'=>urlencode($data->alloc_items[$i]->aitem_type),
//						'cmpy'=>urlencode($data->alloc_items[$i]->aitem_cmpycode),
//						'supp'=>urlencode($data->alloc_items[$i]->aitem_suppcode),
						'typeId'=>urlencode($data->alloc_type),
						'cmpy'=>urlencode($data->alloc_cmpycode),
						'supp'=>urlencode($data->alloc_suppcode),
						'lock'=>urlencode($data->alloc_lock),
						'prod'=>urlencode($data->alloc_items[$i]->aitem_prodcode),
						'cmd'=>urlencode("DEL"),   	
						'op'=>urlencode("39")
					);
					$thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
					$thunkObj->writeToClient($this->cgi_items);

					$response = $thunkObj->read();
					$patternSuccessEng = "stBar=Success";
					$patternSuccessChn = "stBar=成功";
					$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
					$isFoundEng = strpos($response, $patternSuccessEng);
					$isFoundChn = strpos($response, $patternSuccessChn);
					$isFoundUtf = strpos($response, $patternSuccessUtf);
					if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
						logMe("Delete Allocation Product failed!!!",ALLOCATION);
						return "ERROR";
					}
					logMe("CGI Delete Allocation Product succeeded!!!",ALLOCATION);
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
        return "OK";
    }  

	
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
		
        logMe("Info: ++++++Deleting Allocation++++++",ALLOCATION);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'typeId'=>urlencode($data->alloc_type),
            'cmpy'=>urlencode($data->alloc_cmpycode),
            'supp'=>urlencode($data->alloc_suppcode),
            'lock'=>urlencode($data->alloc_lock),
            'period'=>urlencode($data->alloc_period),
            'cmd'=>urlencode("DEL"),   	

			'op'=>urlencode("19")
        );
       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "stBar=Success";
        $patternSuccessChn = "stBar=成功";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
            logMe("Delete Allocation failed!!!",ALLOCATION);
            return "ERROR";
			/*
            $patternFailed = "var opStatus=638;";
            $failed = strstr($response, $patternFailed);            
            if($failed){
                return "DEPENDENCIES";
            }else{                
				$patternFailed2 = "var opStatus=648;";
				$failed2 = strstr($response, $patternFailed2);            
				if($failed2){
					return "DEPENDENCIES";
				}else{      
					return "ERROR";
				}
            }
			*/
        }
        logMe("CGI Delete Allocation succeeded!!!",ALLOCATION);

        return "OK";
    }   

//http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?typeId=3&cmpy=0022&deliv=999901&supp=0002&prod=000152&op=30             reset
    public function resetAllocationItem($data)
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
		$keys = array ("ALL_ATKY_AT_TYPE"=>($data->aitem_type), "ALL_ATKY_AT_CMPY"=>($data->aitem_cmpycode), "ALL_PROD_PRODCODE"=>($data->aitem_prodcode), "ALL_PROD_PRODCMPY"=>($data->aitem_suppcode));
		$excludes = array ("ALLOC_PER_CHILD"=>0);
		$upd_journal = new UpdateJournalClass( "Allocation Products", "ALLOCS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        logMe("Info: ++++++Approving Allocation++++++",ALLOCATION);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
			'typeId'=>urlencode($data->aitem_type),
			'cmpy'=>urlencode($data->aitem_cmpycode),
			'deliv'=>urlencode($data->aitem_qtyused),
			'supp'=>urlencode($data->aitem_suppcode),
			'prod'=>urlencode($data->aitem_prodcode),
			'op'=>urlencode("30")
		 );
		$thunkObj = new Thunk($this->host, $this->cgi_reset, $fields);
        $thunkObj->writeToClient($this->cgi_reset);

        $response = $thunkObj->read();
        $patternSuccessEng = "stBar=Success";
        $patternSuccessChn = "stBar=成功";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
            logMe("Reset Allocation Product failed!!!",ALLOCATION);
            return "ERROR";
        }
        logMe("CGI Reset Allocation Product succeeded!!!",ALLOCATION);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        return "OK";
    }   
	
}
?>