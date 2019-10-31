<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('LEGACYEXPIRYDATESERVICE')) define('LEGACYEXPIRYDATESERVICE','LegacyExpiryDateService.class');

class LegacyExpiryDateService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				ed.EXPIRY_DATE_NO				as LEGACY_EXPIRY_DATE_NO
				, ed.EXPIRY_DATE_TITL			as LEGACY_EXPIRY_DATE_TITL
				, ed.EXPIRY_DATE_REJA			as LEGACY_EXPIRY_DATE_REJA
				, ed.EXPIRY_DATE_DESC			as LEGACY_EXPIRY_DATE_DESC
			from 
				EXPIRY_DATE		ed
			where 
				1 = 1
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
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) EDVIEW ";
			
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
		else $sort="ORDER BY LEGACY_EXPIRY_DATE_NO";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) EDVIEW ";
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

    public function isLegacyExpiryDateExisted( $ed_no)
	{
		$sql = array();
		$sql['sql_text'] = "
			select * 
			from 
				EXPIRY_DATE 
			where 
				EXPIRY_DATE_NO = :num
		";
		$sql['sql_data'] = array( $ed_no );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }

    public function isLegacyExpiryDateDescExisted( $ed_desc)
	{
		$sql = array();
		$sql['sql_text'] = "
			select * 
			from 
				EXPIRY_DATE 
			where 
				EXPIRY_DATE_DESC = :desc
		";
		$sql['sql_data'] = array( $ed_desc );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }
    
    public function getNextExpiryDateNo(  )
	{
        $mydb = DB::getInstance();

		$sql = array();
        $sql['sql_text'] = "select MAX(EXPIRY_DATE_NO)+1 AS NEXT_ID from EXPIRY_DATE";
		$sql['sql_data'] = array();
		
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

  
    public function create( $data )
	{
		// check to see if parameter is an array or an object
		if ( is_object( $data ) )
		{
			// one row as object, one record
			return $this->createOneRecord( $data );
		}
		else if ( is_array( $data ) )
		{
			// more than one rows as an array, multiple records
			$ok_num = 0;
			foreach( $data as $rowobj )
			{
				$rtn = $this->createOneRecord( $rowobj );
				if ( $rtn == "OK" )
				{
					$ok_num += 1;
				}
			}
			if ( $ok_num > 0 )
			{
				return "OK";
			}
			else
			{
				return "ERROR";
			}			
		}
		else
		{
			return "ERROR";
		}			
		
	}
	
	public function createOneRecord( $data )
	{
		$rec_count = $this->isLegacyExpiryDateExisted( $data->legacy_expiry_date_no );
		if ( $rec_count > 0 )
		{
			logMe("The legacy expiry date exists already therefore no INSERT action!!!",LEGACYEXPIRYDATESERVICE);
			return "ERROR";
		}

		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into EXPIRY_DATE
			( 
				EXPIRY_DATE_NO
				, EXPIRY_DATE_TITL
				, EXPIRY_DATE_REJA
				, EXPIRY_DATE_DESC
			) 
			values 
			( 
				:ed_num
				, :ed_name 
				, :ed_flag 
				, :ed_desc 
			) 
		";

		$sql['sql_data'] = array( $data->legacy_expiry_date_no, $data->legacy_expiry_date_titl, $data->legacy_expiry_date_reja, $data->legacy_expiry_date_desc );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the legacy expiry date succeeded!!!",LEGACYEXPIRYDATESERVICE);

		// write journal
		$keys = array ("EXPIRY_DATE_NO"=>($data->legacy_expiry_date_no));
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Legacy Expiry Date", "EXPIRY_DATE", $keys, $excludes );
		$main_msg = $data->legacy_expiry_date_no . " - " . $data->legacy_expiry_date_desc . ", " . $data->legacy_expiry_date_titl;
		$ins_journal->logOneLine("created a legacy expiry date with [" . $main_msg . "] successfully");
		
		return "OK";
	}
  
    public function update( $data )
	{
		// check to see if parameter is an array or an object
		if ( is_object( $data ) )
		{
			// one row as object, one record
			return $this->updateOneRecord( $data );
		}
		else if ( is_array( $data ) )
		{
			// more than one rows as an array, multiple records
			$ok_num = 0;
			foreach( $data as $rowobj )
			{
				$rtn = $this->updateOneRecord( $rowobj );
				if ( $rtn == "OK" )
				{
					$ok_num += 1;
				}
			}
			if ( $ok_num > 0 )
			{
				return "OK";
			}
			else
			{
				return "ERROR";
			}			
		}
		else
		{
			return "ERROR";
		}			
		
	}
    
	public function updateOneRecord( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update EXPIRY_DATE set 
				EXPIRY_DATE_TITL = :ed_name
				, EXPIRY_DATE_REJA = :ed_flag
				, EXPIRY_DATE_DESC = :ed_desc
			where 
				EXPIRY_DATE_NO = :ed_num
		";
		$sql['sql_data'] = array( $data->legacy_expiry_date_titl, $data->legacy_expiry_date_reja, $data->legacy_expiry_date_desc, $data->legacy_expiry_date_no );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the legacy expiry date succeeded!!!",LEGACYEXPIRYDATESERVICE);
		
		$keys = array ("EXPIRY_DATE_NO"=>($data->legacy_expiry_date_no));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Legacy Expiry Date", "EXPIRY_DATE", $keys, $excludes );
		$main_msg = $data->legacy_expiry_date_no . " - " . $data->legacy_expiry_date_desc . ", " . $data->legacy_expiry_date_titl;
		$upd_journal->logOneLine("updated a legacy expiry date with [" . $main_msg . "] successfully");
		
		return "OK";
	}
    
    public function delete( $data )
	{
		// check to see if parameter is an array or an object
		if ( is_object( $data ) )
		{
			// one row as object, one record
			return $this->deleteOneRecord( $data );
		}
		else if ( is_array( $data ) )
		{
			// more than one rows as an array, multiple records
			$ok_num = 0;
			foreach( $data as $rowobj )
			{
				$rtn = $this->deleteOneRecord( $rowobj );
				if ( $rtn == "OK" )
				{
					$ok_num += 1;
				}
			}
			if ( $ok_num > 0 )
			{
				return "OK";
			}
			else
			{
				return "ERROR";
			}			
		}
		else
		{
			return "ERROR";
		}			
		
	}
	
	public function deleteOneRecord( $data )
	{
		$rec_count = $this->isLegacyExpiryDateExisted( $data->legacy_expiry_date_no );
		if ( $rec_count == 0 )
		{
			logMe("The legacy expiry date does not exist therefore no DELETE action!!!",LEGACYEXPIRYDATESERVICE);
			return "ERROR";
		}

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from EXPIRY_DATE 
			where 
				EXPIRY_DATE_NO = :ed_num
		";
		$sql['sql_data'] = array( $data->legacy_expiry_date_no );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the legacy expiry date succeeded!!!",LEGACYEXPIRYDATESERVICE);

		// write journal
		$keys = array ("EXPIRY_DATE_NO"=>($data->legacy_expiry_date_no) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Legacy Expiry Date", "EXPIRY_DATE", $keys, $excludes );
		$main_msg = $data->legacy_expiry_date_no . " - " . $data->legacy_expiry_date_desc . ", " . $data->legacy_expiry_date_titl;
		$del_journal->logOneLine("deleted a legacy expiry date with [" . $main_msg . "] successfully");
		
		return "OK";
	}
	
}
?>