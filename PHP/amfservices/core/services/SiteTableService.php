<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('SITETABLE')) define('SITETABLE','SiteTableService.class');

class SiteTableService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview=" select * from SITE ";
	
	
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) STVIEW ";
			
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
		else $sort="ORDER BY SITE_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) STVIEW ";
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

    public function isSiteExisted( $site_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from SITE where SITE_CODE=:site_code ";
		$sql['sql_data'] = array( $site_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }
    
   public function getTheMainSite()
   {
        $sql="select * from SITE where ROWNUM=1 ";

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
   }


	public function create( $data )
	{
		return "OK";
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into SITE
			( 
				SITE_CODE
				, SITE_MNGR
				, SITE_ADDR
				, SITE_AL_ADJ
				, SITE_CL_ADJ
				, SITE_T_ADJ
				, SITE_KG_ADJ
				, SITE_NAME
			) 
			values 
			( 
				:site_code
				, :site_mngr
				, :site_addr
				, :site_al_adj
				, :site_cl_adj
				, :site_t_adj
				, :site_kg_adj
				, :site_name
			) 
		";
		$sql['sql_data'] = array( $data->site_code, $data->site_mngr, $data->site_addr, $data->site_al_adj, $data->site_cl_adj, $data->site_t_adj, $data->site_kg_adj, $data->site_name );
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the site succeeded!!!",SITETABLE);

		// write journal
		$keys = array ("SITE_CODE"=>($data->site_code) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Site", "SITE", $keys, $excludes );
		$ins_journal->logOneLine("created a site [" . $data->site_code . ":" . $data->site_name . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update SITE set 
				SITE_AL_ADJ = :site_al_adj
				, SITE_CL_ADJ = :site_cl_adj 
				, SITE_T_ADJ = :site_t_adj 
				, SITE_KG_ADJ = :site_kg_adj 
			where 
				SITE_CODE = :site_code
		";
		$sql['sql_data'] = array( $data->site_al_adj, $data->site_cl_adj, $data->site_t_adj, $data->site_kg_adj, $data->site_code );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the site succeeded!!!",SITETABLE);

		// write journal
		$keys = array ("SITE_CODE"=>($data->site_code) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Site", "SITE", $keys, $excludes );
		$upd_journal->logOneLine("updated a site [" . $data->site_code . ":" . $data->site_name . "] [" . $data->site_al_adj . ',' . $data->site_cl_adj . ',' . $data->site_kg_adj . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
		return "OK";

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from SITE 
			where 
				SITE_CODE = :site_code
		";
		$sql['sql_data'] = array( $data->site_code );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the site succeeded!!!",SITETABLE);

		// write journal
		$keys = array ("SITE_CODE"=>($data->site_code) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Site", "SITE", $keys, $excludes );
		$del_journal->logOneLine("deleted a site [" . $data->site_code . ":" . $data->site_name . "] successfully");
		
		return "OK";
	}
	
}
?>