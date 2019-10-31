<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('CUSTOMERCATEGORY')) define('CUSTOMERCATEGORY','CustomerCategoryService.class');

class CustomerCategoryService
{
	var $useCGI=0;
    var $mylang='ENG';
	var $myview="
		select 
			cg.CATEG_CODE								as CATEGORY_CODE
			, cg.CATEG_DESCRIPT							as CATEGORY_NAME
			, NVL(cu.CATEG_COUNT, 0)					as CATEGORY_COUNT
		from 
			CST_PRCE_CATEGOR 				cg
			, (
				select 
					CUST_CATEGORY
					, count(*)				as CATEG_COUNT
				from 
					CUSTOMER
				where 
					1 = 1
				group by CUST_CATEGORY
			)								cu
		where 
			cg.CATEG_CODE = cu.CUST_CATEGORY(+)
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
            $this->cgi = CGIDIR . "cust_ord/category.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/cust_ord/category.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) CGVIEW ";
			
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
		else $sort="ORDER BY CATEGORY_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) CGVIEW ";
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

    public function isCustomerCategoryUsed( $catg_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from CUSTOMER where CUST_CATEGORY=:catg_code ";
		$sql['sql_data'] = array( $catg_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isCustomerCategoryExisted( $catg_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from CST_PRCE_CATEGOR where CATEG_CODE=:catg_code";
		$sql['sql_data'] = array( $catg_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }
	
	public function lookupCategoryCustomers($catg_code, $caseType='L')
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
			from 
				CUSTOMER cust
				, COMPANYS scmp
				, COMPANYS ccmp
			where 
				cust.CUST_SUPP = scmp.CMPY_CODE 
				and cust.CUST_CODE = ccmp.CMPY_CODE
				and cust.CUST_CATEGORY=:catg_code 
			order by CUST_CMPY_NAME			
			";
		$sql['sql_data'] = array( $catg_code );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 


/*    
https://bz.diamondkey.local/phpwrapper/category.php?op=30217&pg=-1&pg_3=-1&frm_catcode=t123&frm_catdesc=ttt123

op	30217
pg	-1
pg_3	-1
frm_catcode	t123
frm_catdesc	ttt123

var opStatus=30227;
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
        Call CGI to CREATE Customer Category Category
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Customer Category Category++++++",CUSTOMERCATEGORY);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'frm_catcode'=>urlencode($data->category_code),
            'frm_catdesc'=>urlencode($data->category_name),
            'pg'=>-1,
            'pg_3'=>-1,
			'op'=>urlencode("30217")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=30227;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Customer Category failed!!!", CUSTOMERCATEGORY);
                return "ERROR";
        }
        logMe("CGI Add Customer Category succeeded!!!", CUSTOMERCATEGORY);
		
        return "OK";
    }  


/*
https://bz.diamondkey.local/phpwrapper/category.php?op=30216&pg=-1&pg_3=-1&frm_catcode=t123&frm_catdesc=ttt1235678

op	30216
pg	-1
pg_3	-1
frm_catcode	t123
frm_catdesc	ttt1235678

var opStatus=30226;
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
		$keys = array ("CATEG_CODE"=>($data->category_code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Customer Categories", "CST_PRCE_CATEGOR", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Customer Category 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Customer Category++++++",CUSTOMERCATEGORY);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'frm_catcode'=>urlencode($data->category_code),
            'frm_catdesc'=>urlencode($data->category_name),
            'pg'=>-1,
            'pg_3'=>-1,
			'op'=>urlencode("30216")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=30226;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Customer Category failed!!!", CUSTOMERCATEGORY);
                return "ERROR";
        }
        logMe("CGI Update Customer Category succeeded!!!", CUSTOMERCATEGORY);

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
https://bz.diamondkey.local/phpwrapper/category.php?frm_catcode=t123&frm_catdesc=ttt1235678&pg=-1&pg_3=-1&preqstr=frm_catdesc%3Dttt1235678%26frm_catcode%3Dt123%26pg_3%3D-1%26pg%3D-1%26op%3D30216&op=30218

frm_catcode	t123
frm_catdesc	ttt1235678
pg	-1
pg_3	-1
preqstr	frm_catdesc=ttt1235678&frm_catcode=t123&pg_3=-1&pg=-1&op=30216
op	30218

var opStatus=30228;
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
		
        logMe("Info: ++++++Deleting Customer Category++++++",CUSTOMERCATEGORY);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'frm_catcode'=>urlencode($data->category_code),
            'frm_catdesc'=>urlencode($data->category_name),
            'pg'=>-1,
            'pg_3'=>-1,
			'op'=>urlencode("30218")
       );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=30228;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("CGI Delete Customer Category failed!!!", CUSTOMERCATEGORY);
			return "ERROR";
        }
        logMe("CGI Delete Customer Category succeeded!!!", CUSTOMERCATEGORY);

        return "OK";
    }   
	
    public function createByPHP($data)
	{
        $mydb = DB::getInstance();
		$sql = array();
		
        $sql['sql_text'] = "
			insert into CST_PRCE_CATEGOR
			( 
				CATEG_CODE
				, CATEG_DESCRIPT
			) 
			values 
			( 
				:categ_code
				, :categ_descript
			) 
		";

		$sql['sql_data'] = array( $data->category_code, $data->category_name );
				
        $res = $mydb->insert($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("CATEG_CODE"=>($data->category_code));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Customer Categories", "CST_PRCE_CATEGOR", $keys, $excludes );
			$main_msg = $data->category_code . " - " . $data->category_name;
			$ins_journal->logOneLine("created a customer category [" . $main_msg . "] successfully");
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
		$keys = array ("CATEG_CODE"=>($data->category_code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Customer Categories", "CST_PRCE_CATEGOR", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			UPDATE CST_PRCE_CATEGOR set 
				CATEG_DESCRIPT = :categ_descript
			where 
				CATEG_CODE = :cust_catg
		";
		$sql['sql_data'] = array( $data->category_name, $data->category_code );
		
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
		$sql['sql_text'] = "DELETE FROM CST_PRCE_CATEGOR WHERE CATEG_CODE=:cust_catg";
		$sql['sql_data'] = array( $data->category_code );
		$res = $mydb->delete($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("CATEG_CODE"=>($data->category_code));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Customer Categories", "CST_PRCE_CATEGOR", $keys, $excludes );
			$main_msg = $data->category_code . " - " . $data->category_name;
			$del_journal->logOneLine("deleted a customer category [" . $main_msg . "] successfully");
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