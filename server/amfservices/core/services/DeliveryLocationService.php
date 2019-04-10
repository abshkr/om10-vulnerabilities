<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DELIVERYLOCATION')) define('DELIVERYLOCATION','DeliveryLocationService.class');

class DeliveryLocationService
{
	var $useCGI=0;
    var $mylang='ENG';
/*
DLV_CODE	VARCHAR2(16 BYTE)				x
DLV_NAME	VARCHAR2(100 BYTE)				x
DLV_ADDR	VARCHAR2(40 BYTE)					d
DLV_GRID	VARCHAR2(60 BYTE)				x
DLV_TRANSTYPE	NUMBER(2,0)
DLV_DOC_TYPE	NUMBER(2,0)
DLV_QTY_TYPE	NUMBER(2,0)
DLV_ETYP_ID	NUMBER(9,0)							d
DLV_PHONE	VARCHAR2(40 BYTE)				x
DLV_TRIP_TIME	NUMBER(9,0)					x
DLV_TARRIF	FLOAT							x
DLV_DISTANCE	NUMBER(9,0)					x
DLV_CONTACT_NAME	VARCHAR2(100 BYTE)		x
DLV_PROF	VARCHAR2(16 BYTE)					d
*/	
	var $myview="
		select 
            dl.DLV_CODE 									as DELV_CODE
			, dl.DLV_NAME 									as DELV_NAME 
			, dl.DLV_ADDR 									as DELV_ADDR_CODE
			, NVL(al.DB_ADDR_TEXT, ' ')						as DELV_ADDR_TEXT
			, decode(da.DB_ADDRESS_KEY, NULL, ' ', da.DB_ADDRESS_KEY||'['||NVL(al.DB_ADDR_TEXT, ' ')||']')		as DELV_ADDR_DESC
			, dl.DLV_GRID 									as DELV_GRID 
			, dl.DLV_TRANSTYPE 								as DELV_TRSP_TYPEID
			, tt.TRANSPORT_NAME								as DELV_TRSP_TYPENAME
			, dl.DLV_DOC_TYPE 								as DELV_DOC_TYPEID
			, dt.DOCUMENT_NAME								as DELV_DOC_TYPENAME
			, dl.DLV_QTY_TYPE 								as DELV_QTY_TYPEID 
			, qt.QTY_NAME 									as DELV_QTY_TYPENAME 
			, dl.DLV_ETYP_ID 								as DELV_ETYP_ID 
			, et.ETYP_TITLE 								as DELV_ETYP_TITLE 
			, dl.DLV_PHONE 									as DELV_PHONE 
			, dl.DLV_TRIP_TIME 								as DELV_TRIP_TIME 
			, dl.DLV_TARRIF 								as DELV_TARRIF 
			, dl.DLV_DISTANCE 								as DELV_DISTANCE 
			, dl.DLV_CONTACT_NAME 							as DELV_CONTACT 
			, dl.DLV_PROF									as DELV_PRF_CODE 
			, decode(dl.DLV_PROF, NULL, ' ', pr.PRF_DESC)	as DELV_PRF_DESC 
			, dc.DLC_CUSTOMER								as DELV_CUST_ACCT
			, cu.CUST_DESC									as DELV_CUST_ACCTDESC
			, cu.CUST_SUPP_CODE								as DELV_CUST_SUPPCODE
			, cu.CUST_SUPP_NAME								as DELV_CUST_SUPPNAME
			, cu.CUST_CMPY_CODE								as DELV_CUST_CMPYCODE
			, cu.CUST_CMPY_NAME								as DELV_CUST_CMPYNAME
			, cu.CUST_CTGR_CODE								as DELV_CUST_CATGCODE
			, cu.CUST_CTGR_TEXT								as DELV_CUST_CATGTEXT
			, NVL(dcnt.DELV_CUST_COUNT, 0)					as DELV_CUST_COUNT
			, NVL(co.DELV_ORDER_COUNT, 0)					as DELV_ORDER_COUNT
		from 
			DELV_LOCATION					dl
			, TRANSPORT_TYP					tt
			, DOCUMENT_TYP					dt
			, QTY_TYP						qt
			, EQUIP_TYPES					et
			, DB_ADDRESS					da
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
			) 								al
			, (
				select
					PROFILE.PRF_CODE
					, (PROFILE.PRF_CODE||' - '||PROFILE.PRF_ETYP||', '||EQUIP_TYPES.ETYP_TITLE||' - '||PROFILE.PRF_SUPP||', '||COMPANYS.CMPY_NAME)			as PRF_DESC
				from 
					PROFILE
					, EQUIP_TYPES
					, COMPANYS
				where 
					PROFILE.PRF_ETYP = EQUIP_TYPES.ETYP_ID
					and PROFILE.PRF_SUPP = COMPANYS.CMPY_CODE
			)								pr
			, DELV_FOR_CUST					dc
			, (
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
			)								cu
			, (
				select 
					DLC_DELV_LOC
					, count(*)				as DELV_CUST_COUNT
				from DELV_FOR_CUST
				where 1=1
				group by DLC_DELV_LOC
			)					dcnt
			, (
				select
					ORDER_DLV_CODE
					, count(*)			as DELV_ORDER_COUNT
				from 
					CUST_ORDER
				where 
					1=1
				group by ORDER_DLV_CODE
			)						co
		where
			dl.DLV_CODE				= dc.DLC_DELV_LOC(+)
			and dc.DLC_CUSTOMER		= cu.CUST_ACNT(+)
			and dl.DLV_ADDR			= da.DB_ADDRESS_KEY(+)
			and da.DB_ADDRESS_KEY 	= al.DB_ADDR_LINE_ID(+)
			and dl.DLV_TRANSTYPE	= tt.TRANSPORT_ID(+)
			and dl.DLV_DOC_TYPE		= dt.DOCUMENT_ID(+)
			and dl.DLV_QTY_TYPE		= qt.QTY_ID(+)
			and dl.DLV_ETYP_ID		= et.ETYP_ID(+)
			and dl.DLV_PROF			= pr.PRF_CODE(+)
			and dl.DLV_CODE			= dcnt.DLC_DELV_LOC(+)
			and dl.DLV_CODE			= co.ORDER_DLV_CODE(+)
	";
	
	var $myview2="
		select 
            dl.DLV_CODE 									as DELV_CODE
			, dl.DLV_NAME 									as DELV_NAME 
			, dl.DLV_ADDR 									as DELV_ADDR_CODE
			, NVL(al.DB_ADDR_TEXT, ' ')						as DELV_ADDR_TEXT
			, decode(da.DB_ADDRESS_KEY, NULL, ' ', da.DB_ADDRESS_KEY||'['||NVL(al.DB_ADDR_TEXT, ' ')||']')		as DELV_ADDR_DESC
			, dl.DLV_GRID 									as DELV_GRID 
			, dl.DLV_TRANSTYPE 								as DELV_TRSP_TYPEID
			, tt.TRANSPORT_NAME								as DELV_TRSP_TYPENAME
			, dl.DLV_DOC_TYPE 								as DELV_DOC_TYPEID
			, dt.DOCUMENT_NAME								as DELV_DOC_TYPENAME
			, dl.DLV_QTY_TYPE 								as DELV_QTY_TYPEID 
			, qt.QTY_NAME 									as DELV_QTY_TYPENAME 
			, dl.DLV_ETYP_ID 								as DELV_ETYP_ID 
			, et.ETYP_TITLE 								as DELV_ETYP_TITLE 
			, dl.DLV_PHONE 									as DELV_PHONE 
			, dl.DLV_TRIP_TIME 								as DELV_TRIP_TIME 
			, dl.DLV_TARRIF 								as DELV_TARRIF 
			, dl.DLV_DISTANCE 								as DELV_DISTANCE 
			, dl.DLV_CONTACT_NAME 							as DELV_CONTACT 
			, dl.DLV_PROF									as DELV_PRF_CODE 
			, decode(dl.DLV_PROF, NULL, ' ', pr.PRF_DESC)	as DELV_PRF_DESC 
			, '-1'											as DELV_CUST_ACCT
			, ''											as DELV_CUST_ACCTDESC
			, '-1'											as DELV_CUST_SUPPCODE
			, ''											as DELV_CUST_SUPPNAME
			, '-1'											as DELV_CUST_CMPYCODE
			, ''											as DELV_CUST_CMPYNAME
			, '-1'											as DELV_CUST_CATGCODE
			, ''											as DELV_CUST_CATGTEXT
			, NVL(dc.DELV_CUST_COUNT, 0)					as DELV_CUST_COUNT
			, NVL(co.DELV_ORDER_COUNT, 0)					as DELV_ORDER_COUNT
		from 
			DELV_LOCATION					dl
			, TRANSPORT_TYP					tt
			, DOCUMENT_TYP					dt
			, QTY_TYP						qt
			, EQUIP_TYPES					et
			, DB_ADDRESS					da
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
			) 								al
			, (
				select
					PROFILE.PRF_CODE
					, (PROFILE.PRF_CODE||' - '||PROFILE.PRF_ETYP||', '||EQUIP_TYPES.ETYP_TITLE||' - '||PROFILE.PRF_SUPP||', '||COMPANYS.CMPY_NAME)			as PRF_DESC
				from 
					PROFILE
					, EQUIP_TYPES
					, COMPANYS
				where 
					PROFILE.PRF_ETYP = EQUIP_TYPES.ETYP_ID
					and PROFILE.PRF_SUPP = COMPANYS.CMPY_CODE
			)								pr
			, (
				select 
					DLC_DELV_LOC
					, count(*)				as DELV_CUST_COUNT
				from DELV_FOR_CUST
				where 1=1
				group by DLC_DELV_LOC
			)					dc
			, (
				select
					ORDER_DLV_CODE
					, count(*)			as DELV_ORDER_COUNT
				from 
					CUST_ORDER
				where 
					1=1
				group by ORDER_DLV_CODE
			)						co
		where
			dl.DLV_ADDR			= da.DB_ADDRESS_KEY(+)
			and da.DB_ADDRESS_KEY 	= al.DB_ADDR_LINE_ID(+)
			and dl.DLV_TRANSTYPE	= tt.TRANSPORT_ID(+)
			and dl.DLV_DOC_TYPE		= dt.DOCUMENT_ID(+)
			and dl.DLV_QTY_TYPE		= qt.QTY_ID(+)
			and dl.DLV_ETYP_ID		= et.ETYP_ID(+)
			and dl.DLV_PROF			= pr.PRF_CODE(+)
			and dl.DLV_CODE			= dc.DLC_DELV_LOC(+)
			and dl.DLV_CODE			= co.ORDER_DLV_CODE(+)
	";
	
	var $myview3="
		select 
            dl.DLV_CODE 									as DELV_CODE
			, dl.DLV_NAME 									as DELV_NAME 
			, dl.DLV_ADDR 									as DELV_ADDR 
			, dl.DLV_GRID 									as DELV_GRID 
			, dl.DLV_TRANSTYPE 								as DELV_TRSP_TYPEID
			, tt.TRANSPORT_NAME								as DELV_TRSP_TYPENAME
			, dl.DLV_DOC_TYPE 								as DELV_DOC_TYPEID
			, dt.DOCUMENT_NAME								as DELV_DOC_TYPENAME
			, dl.DLV_QTY_TYPE 								as DELV_QTY_TYPEID 
			, qt.QTY_NAME 									as DELV_QTY_TYPENAME 
			, dl.DLV_ETYP_ID 								as DELV_ETYP_ID 
			, et.ETYP_TITLE 								as DELV_ETYP_TITLE 
			, dl.DLV_PHONE 									as DELV_PHONE 
			, dl.DLV_TRIP_TIME 								as DELV_TRIP_TIME 
			, dl.DLV_TARRIF 								as DELV_TARRIF 
			, dl.DLV_DISTANCE 								as DELV_DISTANCE 
			, dl.DLV_CONTACT_NAME 							as DELV_CONTACT 
			, decode(dl.DLV_PROF, NULL, ' ', pr.PRF_DESC)	as DELV_PROFILE 
			, NVL(dc.DELV_CUST_COUNT, 0)					as DELV_CUST_COUNT
		from 
			DELV_LOCATION					dl
			, TRANSPORT_TYP					tt
			, DOCUMENT_TYP					dt
			, QTY_TYP						qt
			, EQUIP_TYPES					et
			, DB_ADDRESS					da
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
			) 								al
			, (
				select
					PROFILE.PRF_CODE
					, (PROFILE.PRF_CODE||' - '||PROFILE.PRF_ETYP||', '||EQUIP_TYPES.ETYP_TITLE||' - '||PROFILE.PRF_SUPP||', '||COMPANYS.CMPY_NAME)			as PRF_DESC
				from 
					PROFILE
					, EQUIP_TYPES
					, COMPANYS
				where 
					PROFILE.PRF_ETYP = EQUIP_TYPES.ETYP_ID
					and PROFILE.PRF_SUPP = COMPANYS.CMPY_CODE
			)								pr
			, (
				select 
					DLC_DELV_LOC
					, count(*)				as DELV_CUST_COUNT
				from DELV_FOR_CUST
				where 1=1
				group by DLC_DELV_LOC
			)					dc
		where
			dl.DLV_CODE				= dc.DLC_DELV_LOC(+)
			and dl.DLV_ADDR			= da.DB_ADDRESS_KEY(+)
			and da.DB_ADDRESS_KEY 	= al.DB_ADDR_LINE_ID(+)
			and dl.DLV_TRANSTYPE	= tt.TRANSPORT_ID(+)
			and dl.DLV_DOC_TYPE		= dt.DOCUMENT_ID(+)
			and dl.DLV_QTY_TYPE		= qt.QTY_ID(+)
			and dl.DLV_ETYP_ID		= et.ETYP_ID(+)
			and dl.DLV_PROF			= pr.PRF_CODE(+)
	";


			
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
            $this->cgi = CGIDIR . "cust_ord/delivery.cgi";
            $this->cgi_custdlv = CGIDIR . "cust_ord/delivery_loc.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/cust_ord/delivery.cgi";
            $this->cgi_custdlv ="cgi-bin/en/cust_ord/delivery_loc.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) DLVIEW ";
			
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
			if ( $values->delv_cust_acct == "" )
			{
				$this->myview = $this->myview2;
				/*
				unset($values->delv_cust_acct);
				unset($values->delv_cust_suppcode);
				unset($dtypes->delv_cust_acct);
				unset($dtypes->delv_cust_suppcode);
				*/
			}
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		} 
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY DELV_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) DLVIEW ";
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
		$data->sql2=$queryPaged['sql_text'];
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 

    public function isDeliveryLocationUsed( $cust_acct, $delv_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from DELV_FOR_CUST where DLC_CUSTOMER=:acct_no and DLC_DELV_LOC=:delv_no";
		$sql['sql_data'] = array( $cust_acct, $delv_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isDeliveryLocationExisted( $delv_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from DELV_LOCATION where DLV_CODE=:delv_code";
		$sql['sql_data'] = array( $delv_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }
	
	public function lookupCustomerByDelvloc($mode, $delv_code, $supplier="-1", $category="-1", $caseType='L')
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
				and (cust.CUST_ACCT $mode (select DLC_CUSTOMER from DELV_FOR_CUST where DLC_DELV_LOC=:delv_code))
			order by CUST_CMPY_NAME			
			";
		$sql['sql_data'] = array( $supplier, $category, $delv_code );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 

	public function lookupCustomerHaveDelvloc($delv_code, $supplier="-1", $category="-1", $caseType='L')
	{
		return $this->lookupCustomerByDelvloc( "in", $delv_code, $supplier, $category, $caseType);
	}

	public function lookupCustomerHavenoDelvloc($delv_code, $supplier="-1", $category="-1", $caseType='L')
	{
		return $this->lookupCustomerByDelvloc( "not in", $delv_code, $supplier, $category, $caseType);
	}
	
	public function lookupDelvlocByCustomer($mode, $cust_acct, $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				*
			from 
				DELV_LOCATION	dl
			where 
				(dl.DLV_CODE $mode (select DLC_DELV_LOC from DELV_FOR_CUST where DLC_CUSTOMER=:cust_acct))
			order by DLV_NAME			
			";
		$sql['sql_data'] = array( $supplier, $category, $delv_code );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 

	public function lookupDelvlocHaveCustomer($cust_acct, $caseType='L')
	{
		return $this->lookupDelvlocByCustomer( "in", $cust_acct, $caseType);
	}

	public function lookupDelvlocHavenoCustomer($cust_acct, $caseType='L')
	{
		return $this->lookupDelvlocByCustomer( "not in", $cust_acct, $caseType);
	}
	
/*
VIEW 
https://bz.diamondkey.local/phpwrapper/delivery_loc.php?op=401&pg=1&cmpyCd=jts40&suppCd=0006&custAcc=TSTCGjts40
op	401
pg	1
cmpyCd	jts40
suppCd	0006
custAcc	TSTCGjts40

https://bz.diamondkey.local/phpwrapper/delivery_loc.php?is_search_on=-1&pg_3=1&pg=1&suppCd=0006&cmpyCd=jts40&custAcc=TSTCGjts40&op=407
is_search_on	-1
pg_3	1
pg	1
suppCd	0006
cmpyCd	jts40
custAcc	TSTCGjts40
op	407

*/


/*    
https://bz.diamondkey.local/phpwrapper/delivery_loc.php
delivCd	-1
op	417
custAcc	TSTCGjts40
suppCd	0006
cmpyCd	jts40
pg	1
pg_3	1
is_search_on	-1
frm_default	0
frm_name	CST_11
frm_code	CST_11
frm_address	zbtst
frm_grid	CSTDLV
frm_transport	0
frm_equipment	94
frm_document	0
frm_quantity	0
frm_triptime	0
frm_distance	0
frm_tarrif	0
frm_contact	abc
frm_phone	67891234
frm_profile	

var opStatus=427;


https://bz.diamondkey.local/phpwrapper/delivery.php
delivCd	-1
op	417
custAcc	-1
suppCd	-1
cmpyCd	-1
pg	-1
pg_3	1
is_search_on	-1
frm_default	0
frm_code	CST_16
frm_name	CST16
frm_address	jts002
frm_grid	CSTDLV
frm_transport	0
frm_equipment	94
frm_document	0
frm_quantity	0
frm_triptime	0
frm_distance	0
frm_tarrif	0
frm_contact	wertyui
frm_phone	12345678
frm_profile	

var opStatus=427;
*/	
    public function createByCGI($data)
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
        Call CGI to CREATE Delivery Location
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Delivery Location++++++",DELIVERYLOCATION);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'delivCd'=>'-1',
            'custAcc'=>urlencode($data->delv_cust_acct),
            'suppCd'=>urlencode($data->delv_cust_suppcode),
            'cmpyCd'=>urlencode($data->delv_cust_cmpycode),
            'pg'=>'-1',
            'pg_3'=>'1',
            'is_search_on'=>'-1',
            'frm_default'=>'0',
            'frm_code'=>urlencode($data->delv_code),
            'frm_name'=>urlencode($data->delv_name),
            'frm_address'=>urlencode($data->delv_addr_code),
            'frm_grid'=>urlencode($data->delv_grid),
            'frm_transport'=>urlencode($data->delv_trsp_typeid),
            'frm_document'=>urlencode($data->delv_doc_typeid),
            'frm_quantity'=>urlencode($data->delv_qty_typeid),
            'frm_equipment'=>urlencode($data->delv_etyp_id),
            'frm_phone'=>urlencode($data->delv_phone),
            'frm_triptime'=>urlencode($data->delv_trip_time),
            'frm_tarrif'=>urlencode($data->delv_tarrif),
            'frm_distance'=>urlencode($data->delv_distance),
            'frm_contact'=>urlencode($data->delv_contact),
            'frm_profile'=>urlencode($data->delv_prf_code),
			'op'=>urlencode("417")
        );
		
		if ( $data->delv_cust_acct=="-1" && $data->delv_cust_suppcode=="-1" && $data->delv_cust_cmpycode=="-1" )
		{
			// independent delivery location
			$acgi = $this->cgi;
		}
		else
		{
			// customer-related delivery location
			$acgi = $this->cgi_custdlv;
		}
        $thunkObj = new Thunk($this->host, $acgi, $fields);
        $thunkObj->writeToClient($acgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=427;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Delivery Location failed!!!", DELIVERYLOCATION);
                return "ERROR";
        }
        logMe("CGI Add Delivery Location succeeded!!!", DELIVERYLOCATION);
		
        return "OK";
    }  


/*
https://bz.diamondkey.local/phpwrapper/delivery_loc.php
delivCd	CST_11
op	416
custAcc	TSTCGjts40
suppCd	0006
cmpyCd	jts40
pg	1
pg_3	1
is_search_on	-1
frm_default	1
frm_name	CST_11
frm_code	CST_11
frm_address	zbtst
frm_grid	CSTDLV
frm_transport	1
frm_equipment	94
frm_document	0
frm_quantity	0
frm_triptime	24
frm_distance	1234
frm_tarrif	0
frm_contact	abc
frm_phone	67891239
frm_profile	

var opStatus=426;


https://bz.diamondkey.local/phpwrapper/delivery.php
delivCd	CST_16
op	416
custAcc	-1
suppCd	-1
cmpyCd	-1
pg	-1
pg_3	1
is_search_on	-1
frm_default	1
frm_code	CST_16
frm_name	CST168
frm_address	jts002
frm_grid	CSTDLV
frm_transport	0
frm_equipment	94
frm_document	2
frm_quantity	1
frm_triptime	0
frm_distance	0
frm_tarrif	0
frm_contact	wertyui
frm_phone	12345678
frm_profile	

var opStatus=426;
*/	
    public function updateByCGI($data)
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
		$keys = array ("DLV_CODE"=>($data->delv_code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Delivery Locations", "DELV_LOCATION", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Delivery Location 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Delivery Location++++++",DELIVERYLOCATION);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'delivCd'=>urlencode($data->delv_code),
            'custAcc'=>urlencode($data->delv_cust_acct),
            'suppCd'=>urlencode($data->delv_cust_suppcode),
            'cmpyCd'=>urlencode($data->delv_cust_cmpycode),
            'pg'=>'-1',
            'pg_3'=>'1',
            'is_search_on'=>'-1',
            'frm_default'=>'1',
            'frm_code'=>urlencode($data->delv_code),
            'frm_name'=>urlencode($data->delv_name),
            'frm_address'=>urlencode($data->delv_addr_code),
            'frm_grid'=>urlencode($data->delv_grid),
            'frm_transport'=>urlencode($data->delv_trsp_typeid),
            'frm_document'=>urlencode($data->delv_doc_typeid),
            'frm_quantity'=>urlencode($data->delv_qty_typeid),
            'frm_equipment'=>urlencode($data->delv_etyp_id),
            'frm_phone'=>urlencode($data->delv_phone),
            'frm_triptime'=>urlencode($data->delv_trip_time),
            'frm_tarrif'=>urlencode($data->delv_tarrif),
            'frm_distance'=>urlencode($data->delv_distance),
            'frm_contact'=>urlencode($data->delv_contact),
            'frm_profile'=>urlencode($data->delv_prf_code),
			'op'=>urlencode("416")
        );
		
		if ( $data->delv_cust_acct=="-1" && $data->delv_cust_suppcode=="-1" && $data->delv_cust_cmpycode=="-1" )
		{
			// independent delivery location
			$acgi = $this->cgi;
		}
		else
		{
			// customer-related delivery location
			$acgi = $this->cgi_custdlv;
		}
        $thunkObj = new Thunk($this->host, $acgi, $fields);
        $thunkObj->writeToClient($acgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=426;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Delivery Location failed!!!", DELIVERYLOCATION);
                return "ERROR";
        }
        logMe("CGI Update Delivery Location succeeded!!!", DELIVERYLOCATION);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
 		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        return "OK";
    }  

	
/*
https://bz.diamondkey.local/phpwrapper/delivery_loc.php?delivCd=CST_11&custAcc=TSTCGjts40&suppCd=0006&cmpyCd=jts40&pg=1&pg_3=1&is_search_on=-1&preqstr=op%3D401%26custAcc%3DTSTCGjts40%26cmpyCd%3Djts40%26suppCd%3D0006%26pg%3D1%26pg_3%3D1%26is_search_on%3D-1&op=418
delivCd	CST_11
custAcc	TSTCGjts40
suppCd	0006
cmpyCd	jts40
pg	1
pg_3	1
is_search_on	-1
preqstr	op=401&custAcc=TSTCGjts40&cmpyCd=jts40&suppCd=0006&pg=1&pg_3=1&is_search_on=-1
op	418

var opStatus=428;


https://bz.diamondkey.local/phpwrapper/delivery.php?delivCd=CST_16&custAcc=-1&suppCd=-1&cmpyCd=-1&pg=-1&pg_3=1&is_search_on=-1&preqstr=&op=418
delivCd	CST_16
custAcc	-1
suppCd	-1
cmpyCd	-1
pg	-1
pg_3	1
is_search_on	-1
preqstr	
op	418

var opStatus=428;
*/
    public function deleteByCGI($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting Delivery Location++++++",DELIVERYLOCATION);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'delivCd'=>urlencode($data->delv_code),
            'custAcc'=>urlencode($data->delv_cust_acct),
            'suppCd'=>urlencode($data->delv_cust_suppcode),
            'cmpyCd'=>urlencode($data->delv_cust_cmpycode),
            'pg'=>'-1',
            'pg_3'=>'1',
            'is_search_on'=>'-1',
			'preqstr'=>"",
			'op'=>urlencode("418")
        );
		
		if ( $data->delv_cust_acct=="-1" && $data->delv_cust_suppcode=="-1" && $data->delv_cust_cmpycode=="-1" )
		{
			// independent delivery location
			$acgi = $this->cgi;
		}
		else
		{
			// customer-related delivery location
			$acgi = $this->cgi_custdlv;
		}
        $thunkObj = new Thunk($this->host, $acgi, $fields);
        $thunkObj->writeToClient($acgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=428;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("CGI Delete Delivery Location failed!!!", DELIVERYLOCATION);
			return "ERROR";
        }
        logMe("CGI Delete Delivery Location succeeded!!!", DELIVERYLOCATION);

        return "OK";
    }   

/*
https://bz.diamondkey.local/phpwrapper/delivery.php?delivCd=CST_18&custAcc=-1&suppCd=-1&cmpyCd=-1&pg=-1&pg_3=1&is_search_on=-1&preqstr=&op=409
delivCd	CST_18
custAcc	-1
suppCd	-1
cmpyCd	-1
pg	-1
pg_3	1
is_search_on	-1
preqstr	
op	409


https://bz.diamondkey.local/phpwrapper/delivery.php?delivCd=CST_18&op=419&pg=-1&frm_code=CST_18&frm_supplier=0006&frm_category=-1&frm_customer=0081&frm_assntype=1
delivCd	CST_18
op	419
pg	-1
frm_code	CST_18
frm_supplier	0006
frm_category	-1
frm_customer	0081
frm_assntype	1

var opStatus=429;


https://bz.diamondkey.local/phpwrapper/delivery.php?delivCd=CST_18&op=419&pg=-1&frm_code=CST_18&frm_supplier=0006&frm_category=-1&frm_customer=0081&frm_assntype=2
delivCd	CST_18
op	419
pg	-1
frm_code	CST_18
frm_supplier	0006
frm_category	-1
frm_customer	0081
frm_assntype	2

var opStatus=429;



https://bz.diamondkey.local/phpwrapper/delivery.php?delivCd=CST_18&op=419&pg=-1&frm_code=CST_18&frm_supplier=-1&frm_category=-1&frm_customer=-1&frm_assntype=1
delivCd	CST_18
op	419
pg	-1
frm_code	CST_18
frm_supplier	-1
frm_category	-1
frm_customer	-1
frm_assntype	1

var opStatus=429;


https://bz.diamondkey.local/phpwrapper/delivery.php?delivCd=CST_18&op=419&pg=-1&frm_code=CST_18&frm_supplier=-1&frm_category=-1&frm_customer=-1&frm_assntype=2
delivCd	CST_18
op	419
pg	-1
frm_code	CST_18
frm_supplier	-1
frm_category	-1
frm_customer	-1
frm_assntype	2

var opStatus=429;
*/
    public function link2CustomerByCGI($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		$linkop = "Link";
		if ( $data->delv_cust_optype == 2 )
		{
			$linkop = "Unlink";
		}
		else
		{
			$linkop = "Link";
		}
        logMe("Info: ++++++$linkop Delivery Location With Customer++++++",DELIVERYLOCATION);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'delivCd'=>urlencode($data->delv_code),
            'frm_code'=>urlencode($data->delv_code),
            'frm_customer'=>urlencode($data->delv_cust_acct),
            'frm_supplier'=>urlencode($data->delv_cust_suppcode),
            'frm_category'=>urlencode($data->delv_cust_catgcode),
            'frm_assntype'=>urlencode($data->delv_cust_optype),
            'pg'=>'-1',
			'op'=>urlencode("419")
        );
		
		$acgi = $this->cgi;
        $thunkObj = new Thunk($this->host, $acgi, $fields);
        $thunkObj->writeToClient($acgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=429;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("CGI $linkop Delivery Location failed!!!", DELIVERYLOCATION);
			return "ERROR";
        }
        logMe("CGI $linkop Delivery Location succeeded!!!", DELIVERYLOCATION);

        return "OK";
    }   
	
	
	
    public function createByPHP($data)
	{
        $mydb = DB::getInstance();
		$sql = array();
		
        $sql['sql_text'] = "
			insert into DELV_LOCATION
			( 
				DLV_CODE
				, DLV_NAME
				, DLV_ADDR
				, DLV_GRID
				, DLV_TRANSTYPE
				, DLV_DOC_TYPE
				, DLV_QTY_TYPE
				, DLV_ETYP_ID
				, DLV_PHONE
				, DLV_TRIP_TIME
				, DLV_TARRIF
				, DLV_DISTANCE
				, DLV_CONTACT_NAME
				, DLV_PROF
			) 
			values 
			( 
				:dlv_code
				, :dlv_name
				, :dlv_addr
				, :dlv_grid
				, :dlv_transtype
				, :dlv_doc_type
				, :dlv_qty_type
				, :dlv_etyp_id
				, :dlv_phone
				, :dlv_trip_time
				, :dlv_tarrif
				, :dlv_distance
				, :dlv_contact_name
				, :dlv_prof
			) 
		";

		$sql['sql_data'] = array( $data->delv_code, $data->delv_name, $data->delv_addr_code, $data->delv_grid, $data->delv_trsp_typeid, $data->delv_doc_typeid, $data->delv_qty_typeid, $data->delv_etyp_id, $data->delv_phone, $data->delv_trip_time, $data->delv_tarrif, $data->delv_distance, $data->delv_contact, $data->delv_prf_code );
				
        $res = $mydb->insert($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("DLV_CODE"=>($data->delv_code));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Delivery Locations", "DELV_LOCATION", $keys, $excludes );
			$main_msg = $data->delv_code . " - " . $data->delv_name;
			$ins_journal->logOneLine("created a delivery location [" . $main_msg . "] successfully");
        }
		
        if ($res == RETURN_OK)
        {
			// link to customer if a customer is selected
			if ( $data->delv_cust_acct!="-1" )
			{
				$data->delv_cust_optype = 1;
				$res2 = $this->link2CustomerByPHP($data);
			}
			return "OK";
        }
		else
		{
			return "ERROR";
		}
		
    }
    
    public function updateByPHP($data)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("DLV_CODE"=>($data->delv_code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Delivery Locations", "DELV_LOCATION", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			UPDATE DELV_LOCATION set 
				DLV_NAME     			= :dlv_name
				, DLV_ADDR     			= :dlv_addr
				, DLV_GRID     			= :dlv_grid
				, DLV_TRANSTYPE     	= :dlv_transtype
				, DLV_DOC_TYPE     		= :dlv_doc_type
				, DLV_QTY_TYPE     		= :dlv_qty_type
				, DLV_ETYP_ID     		= :dlv_etyp_id
				, DLV_PHONE     		= :dlv_phone
				, DLV_TRIP_TIME     	= :dlv_trip_time
				, DLV_TARRIF     		= :dlv_tarrif
				, DLV_DISTANCE     		= :dlv_distance
				, DLV_CONTACT_NAME     	= :dlv_contact_name
				, DLV_PROF     			= :dlv_prof
			where 
				DLV_CODE = :dlv_code
		";
		$sql['sql_data'] = array( $data->delv_name, $data->delv_addr_code, $data->delv_grid, $data->delv_trsp_typeid, $data->delv_doc_typeid, $data->delv_qty_typeid, $data->delv_etyp_id, $data->delv_phone, $data->delv_trip_time, $data->delv_tarrif, $data->delv_distance, $data->delv_contact, $data->delv_prf_code, $data->delv_code );
		
        $res = $mydb->update($sql);
		
        if ($res == RETURN_OK)
        {
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    }
    
    public function deleteByPHP($data)
	{
		$cnt = $this->isDeliveryLocationUsed( $data->delv_cust_acct, $data->delv_code );
		// unlink from customer if a customer is selected
		if ( $cnt>0 && $data->delv_cust_acct!="-1" )
		{
			$data->delv_cust_optype = 2;
			$res2 = $this->link2CustomerByPHP($data);
			if ( $res2 == "ERROR" ) 
			{
				return $res2;
			}
		}
			
        $mydb = DB::getInstance();        

		$sql = array();
		$sql['sql_text'] = "DELETE FROM DELV_LOCATION WHERE DLV_CODE=:delv_code";
		$sql['sql_data'] = array( $data->delv_code );
		$res = $mydb->delete($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("DLV_CODE"=>($data->delv_code));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Delivery Locations", "DELV_LOCATION", $keys, $excludes );
			$main_msg = $data->delv_code . " - " . $data->delv_name;
			$del_journal->logOneLine("deleted a delivery location [" . $main_msg . "] successfully");
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    } 
	
    public function link2CustomerByPHP($data)
	{
        $mydb = DB::getInstance();
		$sql = array();
			
		if ( $data->delv_cust_optype == 1 )
		{
			// create the link
			$sql['sql_text'] = "
				insert into DELV_FOR_CUST
				( 
					DLC_CUSTOMER
					, DLC_DELV_LOC
				) 
				select
					cu.CUST_ACCT	as DLC_CUSTOMER
					, :dlv_code		as DLC_DELV_LOC
				from
					CUSTOMER		cu
				where
					('-1'=:cust_acct or cu.CUST_ACCT=:cust_acct)
					and ('-1'=:cust_supp or cu.CUST_SUPP=:cust_supp)
					and ('-1'=:cust_catg or cu.CUST_CATEGORY=:cust_catg)
			";
			$sql['sql_data'] = array( $data->delv_code, $data->delv_cust_acct, $data->delv_cust_suppcode, $data->delv_cust_catgcode );
			
			$res = $mydb->insert($sql);
		
			if ($res == RETURN_OK)
			{
				$keys = array ("DLC_CUSTOMER"=>($data->delv_cust_acct), "DLC_DELV_LOC"=>($data->delv_code));
				$excludes = array ();
				$ins_journal = new UpdateJournalClass( "Delivery Locations for Customers", "DELV_FOR_CUST", $keys, $excludes );
				if ( $data->delv_cust_acct != -1 )
				{
					$delv_msg = $data->delv_code . " - " . $data->delv_name;
					$cust_msg = $data->delv_cust_acctdesc;
					$ins_journal->logOneLine("created a delivery location [" . $delv_msg . "] for a customer [" . $cust_msg . "] successfully");
				}
				else
				{
					$delv_msg = $data->delv_code . " - " . $data->delv_name;
					$cust_msg = "";
					if ( $data->delv_cust_suppcode!=-1 )
					{
						$cust_msg = " Supplier: " . $data->delv_cust_suppcode . " - " . $data->delv_cust_suppname; 
					}
					if ( $data->delv_cust_catgcode!=-1 )
					{
						$cust_msg = " Category: " . $data->delv_cust_catgcode; 
					}
					if ( $cust_msg == "" )
					{
						$ins_journal->logOneLine("created a delivery location [" . $delv_msg . "] for all customers successfully");
					}
					else
					{
						$ins_journal->logOneLine("created a delivery location [" . $delv_msg . "] for customers belonging to [" . $cust_msg . "] successfully");
					}
				}
			}
		}
		else
		{
			// delete the link
			$sql['sql_text'] = "
				delete from DELV_FOR_CUST
				where 
					DLC_DELV_LOC = :dlv_code
					and DLC_CUSTOMER in (
						select cu.CUST_ACCT from CUSTOMER cu
						where
							('-1'=:cust_acct or cu.CUST_ACCT=:cust_acct)
							and ('-1'=:cust_supp or cu.CUST_SUPP=:cust_supp)
							and ('-1'=:cust_catg or cu.CUST_CATEGORY=:cust_catg)
						)
			";
			$sql['sql_data'] = array( $data->delv_code, $data->delv_cust_acct, $data->delv_cust_suppcode, $data->delv_cust_catgcode );
			
			$res = $mydb->delete($sql);
		
			if ($res == RETURN_OK)
			{
				$keys = array ("DLC_CUSTOMER"=>($data->delv_cust_acct), "DLC_DELV_LOC"=>($data->delv_code));
				$excludes = array ();
				$del_journal = new UpdateJournalClass( "Delivery Locations for Customers", "DELV_FOR_CUST", $keys, $excludes );
				if ( $data->delv_cust_acct != -1 )
				{
					$delv_msg = $data->delv_code . " - " . $data->delv_name;
					$cust_msg = $data->delv_cust_acctdesc;
					$del_journal->logOneLine("deleted a delivery location [" . $delv_msg . "] from a customer [" . $cust_msg . "] successfully");
				}
				else
				{
					$delv_msg = $data->delv_code . " - " . $data->delv_name;
					$cust_msg = "";
					if ( $data->delv_cust_suppcode!=-1 )
					{
						$cust_msg = " Supplier: " . $data->delv_cust_suppcode . " - " . $data->delv_cust_suppname; 
					}
					if ( $data->delv_cust_catgcode!=-1 )
					{
						$cust_msg = " Category: " . $data->delv_cust_catgcode; 
					}
					if ( $cust_msg == "" )
					{
						$del_journal->logOneLine("deleted a delivery location [" . $delv_msg . "] from all customers successfully");
					}
					else
					{
						$del_journal->logOneLine("deleted a delivery location [" . $delv_msg . "] from customers belonging to [" . $cust_msg . "] successfully");
					}
				}
			}
		}
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
		
    }
	
    public function createOneLink($delv_code, $delv_name, $cust_acct, $cust_desc)
	{
        $mydb = DB::getInstance();
		$sql = array();
		$sql['sql_text'] = "
			insert into DELV_FOR_CUST
			( 
				DLC_CUSTOMER
				, DLC_DELV_LOC
			) 
			values 
			(
				:cust_acct
				, :delv_code
			)
		";
		$sql['sql_data'] = array( $cust_acct, $delv_code );
			
		$res = $mydb->insert($sql);
		
		if ($res == RETURN_OK)
		{
			$keys = array ("DLC_CUSTOMER"=>($cust_acct), "DLC_DELV_LOC"=>($delv_code));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Delivery Locations for Customers", "DELV_FOR_CUST", $keys, $excludes );
			$delv_msg = $delv_code . " - " . $delv_name;
			$cust_msg = $cust_desc;
			$ins_journal->logOneLine("created a delivery location [" . $delv_msg . "] for a customer [" . $cust_msg . "] successfully");
		}
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
		
    }
	
    public function deleteOneLink($delv_code, $delv_name, $cust_acct, $cust_desc)
	{
        $mydb = DB::getInstance();
		$sql = array();
		$sql['sql_text'] = "
			delete from DELV_FOR_CUST
			where 
			( 
				DLC_CUSTOMER = :cust_acct
				and DLC_DELV_LOC = :delv_code
			) 
		";
		$sql['sql_data'] = array( $cust_acct, $delv_code );
			
		$res = $mydb->delete($sql);
		
		if ($res == RETURN_OK)
		{
			$keys = array ("DLC_CUSTOMER"=>($cust_acct), "DLC_DELV_LOC"=>($delv_code));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Delivery Locations for Customers", "DELV_FOR_CUST", $keys, $excludes );
			$delv_msg = $delv_code . " - " . $delv_name;
			$cust_msg = $cust_desc;
			$del_journal->logOneLine("delete a delivery location [" . $delv_msg . "] from a customer [" . $cust_msg . "] successfully");
		}
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
		
    }
    
	public function createLinks( $data )
	{
		if ( is_array($data->cust_items) === FALSE )
		{
			$data->cust_items = (array)($data->cust_items);
		}
		if( sizeof($data->cust_items) > 0 )
		{
			for($i=0; $i<sizeof($data->cust_items); $i++)
			{      
				$line_item = $data->cust_items[$i];
				$lineResult = $this->createOneLink( $data->delv_code, $data->delv_name, $line_item->cust_acnt, $line_item->cust_desc );
				if ( $lineResult != "OK" )
				{
					return $lineResult;
				}
			}
		}
		
        return "OK";
	}
    
	public function deleteLinks( $data )
	{
		if ( is_array($data->cust_items) === FALSE )
		{
			$data->cust_items = (array)($data->cust_items);
		}
		if( sizeof($data->cust_items) > 0 )
		{
			for($i=0; $i<sizeof($data->cust_items); $i++)
			{      
				$line_item = $data->cust_items[$i];
				$lineResult = $this->deleteOneLink( $data->delv_code, $data->delv_name, $line_item->cust_acnt, $line_item->cust_desc );
				if ( $lineResult != "OK" )
				{
					return $lineResult;
				}
			}
		}
		
        return "OK";
	}

    
	public function create( $data )
	{
		if ( $this->useCGI == 1 )
		{
			return $this->createByCGI( $data );
		}
		else
		{
			return $this->createByPHP( $data );
		}
	}
    
	public function update( $data )
	{
		if ( $this->useCGI == 1 )
		{
			return $this->updateByCGI( $data );
		}
		else
		{
			return $this->updateByPHP( $data );
		}
	}
    
	public function delete( $data )
	{
		if ( $this->useCGI == 1 )
		{
			return $this->deleteByCGI( $data );
		}
		else
		{
			return $this->deleteByPHP( $data );
		}
	}
    
	public function link2Customer( $data )
	{
		if ( $this->useCGI == 1 )
		{
			return $this->link2CustomerByCGI( $data );
		}
		else
		{
			return $this->link2CustomerByPHP( $data );
		}
	}
	
	
}
?>