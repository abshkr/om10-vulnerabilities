<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('PRODUCTGROUP')) define('PRODUCTGROUP','ProductGroupService.class');

class ProductGroupService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				pg.PGR_CODE											as PGR_CODE
				, pg.PGR_DESCRIPTION								as PGR_NAME
				, pg.PGR_UNIT										as PGR_UNIT
				, gu.DESCRIPTION									as PGR_UNITNAME
				, decode( dp.PROD_COUNT, NULL, 0, dp.PROD_COUNT) 	as PGR_PRODCOUNT
			from 
				PRODUCT_GROUP  		pg
				, UNIT_SCALE_VW		gu
				, (
					select PROD_PROD_GROUP, count(PROD_CODE) as PROD_COUNT from PRODUCTS where 1=1 group by PROD_PROD_GROUP
				) dp
			where
				pg.PGR_UNIT = gu.UNIT_ID
				and pg.PGR_CODE = dp.PROD_PROD_GROUP(+) 
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) PGVIEW ";
			
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
		else $sort="ORDER BY PGR_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) PGVIEW ";
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

    public function isProductGroupExisted( $pgr_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from PRODUCT_GROUP where PGR_CODE=:pgr_code ";
		$sql['sql_data'] = array( $pgr_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isProductGroupUsed( $pgr_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from COMPLIANCE_PRODGROUP_2_MSG where CPM_PGR_CODE=:pgr_code ";
		$sql['sql_data'] = array( $pgr_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count1 = $mydb->count( $sql );
		
		$sql = array();
        $sql['sql_text'] = "select * from PRODUCTS where PROD_PROD_GROUP=:pgr_code ";
		$sql['sql_data'] = array( $pgr_code );
		
		// get the total number of the records
		$count2 = $mydb->count( $sql );
		
		$count = $count1 + $count2;
		
        return $count;
   }




	public function create( $data )
	{
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into PRODUCT_GROUP
			( 
				PGR_CODE
				, PGR_DESCRIPTION
				, PGR_UNIT
			) 
			values 
			( 
				:pgr_code
				, :pgr_name
				, :pgr_unit 
			) 
		";
		$sql['sql_data'] = array( $data->pgr_code, $data->pgr_name, $data->pgr_unit );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the product group succeeded!!!",PRODUCTGROUP);

		// write journal
		$keys = array ("PGR_CODE"=>($data->pgr_code) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Product Group", "PRODUCT_GROUP", $keys, $excludes );
		$ins_journal->logOneLine("created a product group [" . $data->pgr_code . ":" . $data->pgr_name . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update PRODUCT_GROUP set 
				PGR_DESCRIPTION = :pgr_name 
				, PGR_UNIT = :pgr_unit
			where 
				PGR_CODE = :pgr_code
		";
		$sql['sql_data'] = array( $data->pgr_name, $data->pgr_unit, $data->pgr_code );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the product group succeeded!!!",PRODUCTGROUP);
		
		$keys = array ("PGR_CODE"=>($data->pgr_code) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Product Group", "PRODUCT_GROUP", $keys, $excludes );
		$upd_journal->logOneLine("updated a product group [" . $data->pgr_code . ":" . $data->pgr_name . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
		$rec_count = $this->isProductGroupUsed( $data->pgr_code );
		if ( $rec_count > 0 )
		{
			logMe("The Product Group is still used therefore no DELETE action!!!",PRODUCTGROUP);
			return "ERROR";
		}
		
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from PRODUCT_GROUP 
			where 
				PGR_CODE = :pgr_code
		";
		$sql['sql_data'] = array( $data->pgr_code );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the product group succeeded!!!",PRODUCTGROUP);

		// write journal
		$keys = array ("PGR_CODE"=>($data->pgr_code) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Product Group", "PRODUCT_GROUP", $keys, $excludes );
		$del_journal->logOneLine("deleted a product group [" . $data->pgr_code . ":" . $data->pgr_name . "] successfully");
		
		return "OK";
	}
	
}
?>