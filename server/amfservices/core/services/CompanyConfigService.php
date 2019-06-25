<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('COMPANYCONFIG')) define('COMPANYCONFIG','CompanyConfigService.class');

class CompanyConfigService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview=" select * from COMPANY_CONFIG ";
	
	
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
        
 	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) CCVIEW ";
			
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
		else $sort="ORDER BY CMPY_CODE, CONFIG_KEY";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) CCVIEW ";
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

    public function isCompanyConfigExisted( $cmpy_code, $config_key )
	{
		$sql = array();
        $sql['sql_text'] = "select * from COMPANY_CONFIG where CMPY_CODE=:cmpy_code and CONFIG_KEY=:cfg_key ";
		$sql['sql_data'] = array( $cmpy_code, $config_key );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }
	
    public function getCompanyConfigValue($cmpy_code, $config_key)
	{
		$sql = array();
        $sql['sql_text'] = "select CONFIG_VALUE from COMPANY_CONFIG where CMPY_CODE=:cmpy_code and CONFIG_KEY=:cfg_key ";
		$sql['sql_data'] = array( $cmpy_code, $config_key );
		
        $mydb = DB::getInstance();
        $rows = $mydb->query($sql, "N");

        return ($rows[0]->CONFIG_VALUE);
    }


	public function create( $data )
	{
		//return "OK";
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into COMPANY_CONFIG
			( 
				CMPY_CODE
				, CONFIG_KEY
				, CONFIG_VALUE
				, CONFIG_COMMENT
			) 
			values 
			( 
				:cmpy_code
				, :config_key
				, :config_value
				, :config_comment
			) 
		";
		$sql['sql_data'] = array( $data->cmpy_code, $data->config_key, $data->config_value, $data->config_comment );
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the company configuration succeeded!!!",COMPANYCONFIG);

		// write journal
		$keys = array ("CMPY_CODE"=>($data->cmpy_code), "CONFIG_KEY"=>($data->config_key) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Company Configuration", "COMPANY_CONFIG", $keys, $excludes );
		$ins_journal->logOneLine("created a company configuration [Company:" . $data->cmpy_code . "][Key:" . $data->config_key . "][Value:".$data->config_value."] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update COMPANY_CONFIG set 
				CONFIG_VALUE = :config_value
				, CONFIG_COMMENT = :config_comment 
			where 
				CMPY_CODE = :cmpy_code
				and CONFIG_KEY = :config_key
		";
		$sql['sql_data'] = array( $data->config_value, $data->config_comment, $data->cmpy_code, $data->config_key );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the company configuration succeeded!!!",COMPANYCONFIG);

		// write journal
		$keys = array ("CMPY_CODE"=>($data->cmpy_code), "CONFIG_KEY"=>($data->config_key) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Company Configuration", "COMPANY_CONFIG", $keys, $excludes );
		$upd_journal->logOneLine("updated a company configuration [" . $data->cmpy_code . "," . $data->config_key  . "," . $data->config_value . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
		//return "OK";

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from COMPANY_CONFIG 
			where 
				CMPY_CODE = :cmpy_code
				and CONFIG_KEY = :config_key
		";
		$sql['sql_data'] = array( $data->cmpy_code, $data->config_key );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the company configuration succeeded!!!",COMPANYCONFIG);

		// write journal
		$keys = array ("CMPY_CODE"=>($data->cmpy_code), "CONFIG_KEY"=>($data->config_key) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Company Configuration", "COMPANY_CONFIG", $keys, $excludes );
		$del_journal->logOneLine("deleted a company configuration [" . $data->cmpy_code . ":" . $data->config_key . "] successfully");
		
		return "OK";
	}
	
    
	public function replace( $data )
	{
		$rtn = "OK";
		
		// check if the configuration exists for this company
		$num = $this->isCompanyConfigExisted( $data->cmpy_code, $data->config_key );
		
		if ( $num > 0 )
		{
			// check if the value of configuration has been changed
			$value = $this->getCompanyConfigValue( $data->cmpy_code, $data->config_key );
			if ( $value != $data->config_value )
			{
				$rtn = $this->update( $data );
				$rtn = "UPDATED";
			}
			else
			{
				$rtn = "NO_CHANGE";
			}
		}
		else
		{
			// the configuration does not exist, do CREATE
			$rtn = $this->create( $data );
			$rtn = "CREATED";
		}
		
		return $rtn;
	}
	
    
	public function replace2( $data )
	{
		$this->delete( $data );
		
		return $this->create( $data );
	}

}
?>