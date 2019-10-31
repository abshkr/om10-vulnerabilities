<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('CUSTOMERCOMPANY')) define('CUSTOMERCOMPANY','CustomerService.class');

class CustomerService
{
	var $useCGI=0;
    var $mylang='ENG';
	var $myview="
		select 
            cu.CUST_ACCT 								as CUST_ACCOUNT
			, cu.CUST_CODE 								as CUST_CMPY_CODE 
			, cc.CUSTOMER								as CUST_CMPY_FLAG
			, cc.CMPY_NAME								as CUST_CMPY_NAME
			, cu.CUST_SUPP 								as CUST_SUPP_CODE
			, sc.SUPPLIER								as CUST_SUPP_FLAG
			, sc.CMPY_NAME 								as CUST_SUPP_NAME
			, cu.CUST_CONTACT							as CUST_CONTACT
			, cu.CUST_PHONE_NO							as CUST_PHONE_NO
			, cu.CUST_CRD_LIM							as CUST_CRD_LIMIT
			, cu.CUST_BALANCE							as CUST_BALANCE
			, cu.CUST_APPR_TOTAL						as CUST_APPR_TOTAL
			, cu.CUST_ORD_DAYS							as CUST_ORD_DAYS
			, cu.CUST_CRD_DAYS							as CUST_CRD_DAYS
			, cu.CUST_VARIABLE_PR						as CUST_PRICETYPE_ID
			, pt.CUSTOMER_PRICE_NAME					as CUST_PRICETYPE_NAME
			, cu.CUST_ADDR								as CUST_ADDR_CODE
			, NVL(dl.DB_ADDR_TEXT, ' ')					as CUST_ADDR_TEXT
			, decode(da.DB_ADDRESS_KEY, NULL, ' ', da.DB_ADDRESS_KEY||'['||NVL(dl.DB_ADDR_TEXT, ' ')||']')		as CUST_ADDR_DESC
			, cu.CUST_CATEGORY							as CUST_CTGR_CODE
			, cg.CATEG_DESCRIPT							as CUST_CTGR_TEXT
			, cu.CUST_DELIV_POINT						as CUST_DELV_CODE
			, dv.DLV_NAME								as CUST_DELV_NAME
			, cu.CUST_INV_TYPE							as CUST_INVTYPE_ID
			, it.CUSTOMER_INV_NAME						as CUST_INVTYPE_NAME
			, cu.CUST_SALE_TYPE							as CUST_SALETYPE_ID
			, st.CUSTOMER_SALE_NAME						as CUST_SALETYPE_NAME
			, cu.CUST_CRD_TERMS							as CUST_CRD_TERMS
			, tt.CUSTOMER_TERMS_NAME					as CUST_TERMS_NAME
			, al.LOCKAL_LOCK							as CUST_ALLOC_LOCKID
			, al.ALLOC_LOCK_NAME 						as CUST_ALLOC_LOCKNAME
			, NVL(co.CUST_ORDER_COUNT, 0)				as CUST_ORDER_COUNT
			, NVL(dc.CUST_DLOC_COUNT, 0)				as CUST_DLOC_COUNT
		from 
			CUSTOMER 				cu 
			, GUI_COMPANYS 			cc
			, GUI_COMPANYS 			sc
			, CST_PRCE_CATEGOR		cg
			, DB_ADDRESS			da
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
			) 						dl
			, DELV_LOCATION			dv
-- 			, CUSTOMER_AMNT_TYP		at
			, CUSTOMER_INV_TYP		it
			, CUSTOMER_PRICE_TYP	pt
			, CUSTOMER_SALE_TYP		st
			, CUSTOMER_TERMS_TYP	tt
			, (
				select 
					LOCKAL.LOCKATYP_AT_CMPY
					, LOCKAL.LOCKAL_SUPL
					, LOCKAL.LOCKAL_LOCK
					, ALLOC_LOCK_TYP.ALLOC_LOCK_NAME 
				from 
					LOCKAL
					, ALLOC_LOCK_TYP
				where 
					LOCKAL.LOCKATYP_AT_TYPE = 3
					and LOCKAL.LOCKAL_LOCK= ALLOC_LOCK_TYP.ALLOC_LOCK_ID
			) 						al
			, (
				select
					ORDER_CUST
					, count(*)			as CUST_ORDER_COUNT
				from 
					CUST_ORDER
				where 
					1=1
				group by ORDER_CUST
			)						co
			, (
				select 
					DLC_CUSTOMER
					, count(*)				as CUST_DLOC_COUNT
				from DELV_FOR_CUST
				where 1=1
				group by DLC_CUSTOMER
			)					dc
		where 
			cu.CUST_SUPP = sc.CMPY_CODE 
		    and cu.CUST_CODE = cc.CMPY_CODE 
		    and cu.CUST_ADDR = da.DB_ADDRESS_KEY(+)
			and da.DB_ADDRESS_KEY = dl.DB_ADDR_LINE_ID(+)
			and cu.CUST_CATEGORY = cg.CATEG_CODE(+)
			and cu.CUST_DELIV_POINT = dv.DLV_CODE(+)
			and cu.CUST_CRD_TERMS = tt.CUSTOMER_TERMS_ID(+)
			and cu.CUST_SALE_TYPE = st.CUSTOMER_SALE_ID(+)
			and cu.CUST_INV_TYPE = it.CUSTOMER_INV_ID(+)
			and cu.CUST_VARIABLE_PR = pt.CUSTOMER_PRICE_ID(+)
			and cu.CUST_CODE = al.LOCKATYP_AT_CMPY(+)
			and cu.CUST_SUPP = al.LOCKAL_SUPL(+)
			and cu.CUST_ACCT = co.ORDER_CUST(+)
			and cu.CUST_ACCT = dc.DLC_CUSTOMER(+)
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
            $this->cgi = CGIDIR . "cust_ord/cust.cgi";
            $this->cgi_acctdet = CGIDIR . "cust_ord/account_details.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/cust_ord/cust.cgi";
            $this->cgi_acctdet ="cgi-bin/en/cust_ord/account_details.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) CMVIEW ";
			
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
		else $sort="ORDER BY CUST_SUPP_CODE, CUST_CMPY_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) CMVIEW ";
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

    public function isCustomerAccountNumberUsed( $cust_acct )
	{
		$sql = array();
        $sql['sql_text'] = "select * from CUSTOMER where CUST_ACCT=:acct_no ";
		$sql['sql_data'] = array( $cust_acct );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isCustomerAccountExisted( $cust_supp, $cust_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from CUSTOMER where CUST_SUPP=:supp_code and CUST_CODE=:cmpy_code";
		$sql['sql_data'] = array( $cust_supp, $cust_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }
	
	public function lookupAvailableCustomerCompany($supp, $mode, $caseType='L')
	{
		$sql = array();
		
		if ( $mode > 0 )
		{
			// find existing customer company for the supplier
			$sql['sql_text'] = "
				select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
				from GUI_COMPANYS 
				where 
					bitand(CMPY_TYPE,8)<>0 
					and (CMPY_CODE in (select CUST_CODE from CUSTOMER where CUST_SUPP=:supp_code))
				order by CMPY_NAME asc
			";
		}
		else
		{
			// find available customer company for the supplier
			$sql['sql_text'] = "
				select CMPY_CODE, CMPY_NAME, CMPY_TYPE, (CMPY_CODE||' - '||CMPY_NAME) as CMPY_DESC 
				from GUI_COMPANYS 
				where 
					bitand(CMPY_TYPE,8)<>0 
					and (CMPY_CODE not in (select CUST_CODE from CUSTOMER where CUST_SUPP=:supp_code))
				order by CMPY_NAME asc
			";
		}
		
		$sql['sql_data'] = array( $supp );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 


/*    
https://bz.diamondkey.local/phpwrapper/cust.php?suppCd=0006&acctNum=TST_CMP123&custName=jts40&custAdd=zbtst&op=117

suppCd	0006
acctNum	TST_CMP123
custName	jts40
custAdd	zbtst
op	117

var opStatus=127;
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
        Call CGI to CREATE Customer
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Customer++++++",CUSTOMERCOMPANY);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'suppCd'=>urlencode($data->cust_supp_code),
            'acctNum'=>urlencode($data->cust_account),
            'custName'=>urlencode($data->cust_cmpy_code),
            'custAdd'=>urlencode($data->cust_addr_code),
			'op'=>urlencode("117")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=127;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Customer failed!!!", CUSTOMERCOMPANY);
                return "ERROR";
        }
        logMe("CGI Add Customer succeeded!!!", CUSTOMERCOMPANY);
		
        return "OK";
    }  


/*
https://bz.diamondkey.local/phpwrapper/cust.php?suppCd=0006&acctNum=TST_CMP123&custName=&custAdd=zbtst&op=116

suppCd	0006
acctNum	TST_CMP123
custName	
custAdd	zbtst
op	116

var opStatus=126;


https://bz.diamondkey.local/phpwrapper/account_details.php?op=216&custAcc=TST_CMP1234&suppCd=0006&cmpyCd=jts40&pg=-1&pg_3=1&frm_category=&frm_delivloc=&frm_invtype=1&frm_invgen=0&frm_saletype=3&frm_crterms=0&frm_pricetype=0&frm_ordlife=0&frm_crlimit=0

op	216
custAcc	TST_CMP1234
suppCd	0006
cmpyCd	jts40
pg	-1
pg_3	1
frm_category	
frm_delivloc	
frm_invtype	1
frm_invgen	0
frm_saletype	3
frm_crterms	0
frm_pricetype	0
frm_ordlife	0
frm_crlimit	0

var opStatus=226;

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
		$keys = array ("CUST_ACCT"=>($data->cust_account));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Customers", "CUSTOMER", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Customer 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Customer++++++",CUSTOMERCOMPANY);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'suppCd'=>urlencode($data->cust_supp_code),
            'acctNum'=>urlencode($data->cust_account),
            'custName'=>urlencode($data->cust_cmpy_code),
            'custAdd'=>urlencode($data->cust_addr_code),
			'op'=>urlencode("116")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=126;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Customer failed!!!", CUSTOMERCOMPANY);
                return "ERROR";
        }
        logMe("CGI Update Customer succeeded!!!", CUSTOMERCOMPANY);
		
        /**************************************************************************************************
        Call CGI to modify Customer Account Details
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Customer Account Details++++++",CUSTOMERCOMPANY);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'custAcc'=>urlencode($data->cust_account),
            'suppCd'=>urlencode($data->cust_supp_code),
            'cmpyCd'=>urlencode($data->cust_cmpy_code),
            'frm_category'=>urlencode($data->cust_ctgr_code),
            'frm_delivloc'=>urlencode($data->cust_delv_code),
            'frm_invtype'=>urlencode($data->cust_invtype_id),
            'frm_invgen'=>urlencode($data->cust_crd_terms),
            'frm_saletype'=>urlencode($data->cust_saletype_id),
            'frm_crterms'=>urlencode($data->cust_crd_days),
            'frm_pricetype'=>urlencode($data->cust_pricetype_id),
            'frm_ordlife'=>urlencode($data->cust_ord_days),
            'frm_crlimit'=>urlencode($data->cust_crd_limit),
			'pg'=>-1,
			'pg_3'=>1,
			'op'=>urlencode("216")
        );
        $thunkObj = new Thunk($this->host, $this->cgi_acctdet, $fields);
        $thunkObj->writeToClient($this->cgi_acctdet);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=226;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Customer Account Details failed!!!", CUSTOMERCOMPANY);
                return "ERROR";
        }
        logMe("CGI Update Customer Account Details succeeded!!!", CUSTOMERCOMPANY);

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
https://bz.diamondkey.local/phpwrapper/cust.php?custAcc=TST_CMP123&suppCd=0006&cmpyCd=jts40&preqstr=&op=118

custAcc	TST_CMP123
suppCd	0006
cmpyCd	jts40
preqstr	
op	118

var opStatus=128;
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
		
        logMe("Info: ++++++Deleting Customer++++++",CUSTOMERCOMPANY);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'suppCd'=>urlencode($data->cust_supp_code),
            'custAcc'=>urlencode($data->cust_account),
            'cmpyCd'=>urlencode($data->cust_cmpy_code),
			'preqstr'=>"",
			'op'=>urlencode("118")
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=128;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("CGI Delete Customer failed!!!", CUSTOMERCOMPANY);
			return "ERROR";
        }
        logMe("CGI Delete Customer succeeded!!!", CUSTOMERCOMPANY);

        return "OK";
    }   
	
    public function createByPHP($data)
	{
        $mydb = DB::getInstance();
		$sql = array();
		
        $sql['sql_text'] = "
			insert into CUSTOMER
			( 
				CUST_ACCT
				, CUST_CODE
				, CUST_ADDR
				, CUST_SUPP
-- 
				, CUST_INV_TYPE
				, CUST_CRD_TERMS
				, CUST_SALE_TYPE
				, CUST_VARIABLE_PR
				, CUST_CRD_DAYS
				, CUST_ORD_DAYS
				, CUST_CRD_LIM
--  
				, CUST_CATEGORY
				, CUST_DELIV_POINT
				, CUST_CONTACT
				, CUST_PHONE_NO
				, CUST_BALANCE
				, CUST_APPR_TOTAL		
			) 
			values 
			( 
				:cust_acct
				, :cust_code
				, :cust_addr
				, :cust_supp
-- 
				, :cust_inv_type
				, :cust_crd_terms
				, :cust_sale_type
				, :cust_variable_pr
				, :cust_crd_days
				, :cust_ord_days
				, :cust_crd_lim
--  
				, :cust_category
				, :cust_deliv_point
				, :cust_contact
				, :cust_phone_no
				, :cust_balance
				, :cust_appr_total		
			) 
		";

		$sql['sql_data'] = array( $data->cust_account, $data->cust_cmpy_code, $data->cust_addr_code, $data->cust_supp_code, $data->cust_invtype_id, $data->cust_crd_terms, $data->cust_saletype_id, $data->cust_pricetype_id, $data->cust_crd_days, $data->cust_ord_days, $data->cust_crd_limit, $data->cust_ctgr_code, $data->cust_delv_code, $data->cust_contact, $data->cust_phone_no, $data->cust_balance, $data->cust_appr_total );
				
        $res = $mydb->insert($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("CUST_ACCT"=>($data->cust_account));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Customers", "CUSTOMER", $keys, $excludes );
			$main_msg = "Account: " . $data->cust_account 
			          . ", Supplier: " . $data->cust_supp_code . " - " . $data->cust_supp_name
			          . ", Company: " . $data->cust_cmpy_code . " - " . $data->cust_cmpy_name;
			$ins_journal->logOneLine("created a customer [" . $main_msg . "] successfully");
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
    
    public function updateByPHP($data)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("CUST_ACCT"=>($data->cust_account));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Customers", "CUSTOMER", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			UPDATE CUSTOMER set 
				CUST_CODE             	= :cust_code
				, CUST_ADDR             = :cust_addr
				, CUST_SUPP             = :cust_supp
--                                      
				, CUST_INV_TYPE         = :cust_inv_type
				, CUST_CRD_TERMS        = :cust_crd_terms
				, CUST_SALE_TYPE        = :cust_sale_type
				, CUST_VARIABLE_PR      = :cust_variable_pr
				, CUST_CRD_DAYS         = :cust_crd_days
				, CUST_ORD_DAYS         = :cust_ord_days
				, CUST_CRD_LIM          = :cust_crd_lim
--                                      
				, CUST_CATEGORY         = :cust_category
				, CUST_DELIV_POINT      = :cust_deliv_point
				, CUST_CONTACT          = :cust_contact
				, CUST_PHONE_NO         = :cust_phone_no
				, CUST_BALANCE          = :cust_balance
				, CUST_APPR_TOTAL		= :cust_appr_total	
			where 
				CUST_ACCT = :cust_acct
		";
		$sql['sql_data'] = array( $data->cust_cmpy_code, $data->cust_addr_code, $data->cust_supp_code, $data->cust_invtype_id, $data->cust_crd_terms, $data->cust_saletype_id, $data->cust_pricetype_id, $data->cust_crd_days, $data->cust_ord_days, $data->cust_crd_limit, $data->cust_ctgr_code, $data->cust_delv_code, $data->cust_contact, $data->cust_phone_no, $data->cust_balance, $data->cust_appr_total, $data->cust_account );
		
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
        $mydb = DB::getInstance();        

		$sql = array();
		$sql['sql_text'] = "DELETE FROM CUSTOMER WHERE CUST_ACCT=:cust_acct";
		$sql['sql_data'] = array( $data->cust_account );
		$res = $mydb->delete($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("CUST_ACCT"=>($data->cust_account));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Customers", "CUSTOMER", $keys, $excludes );
			$main_msg = "Account: " . $data->cust_account 
			          . ", Supplier: " . $data->cust_supp_code . " - " . $data->cust_supp_name
			          . ", Company: " . $data->cust_cmpy_code . " - " . $data->cust_cmpy_name;
			$del_journal->logOneLine("deleted a customer [" . $main_msg . "] successfully");
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
	
}
?>