<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('GENERICEXPIRYDATESERVICE')) define('GENERICEXPIRYDATESERVICE','GenericExpiryDateService.class');

class GenericExpiryDateService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				edcln.EDT_TARGET_CODE		as EXPIRY_DATE_TARGET_CODE
				, edtbl.EDTA_TARGET_DESC	as EXPIRY_DATE_TARGET_DESC
				, edtbl.EDTA_MAX_EXP		as EXPIRY_DATE_TARGET_MAXEXP
				, edtbl.EDTA_STATUS			as EXPIRY_DATE_TARGET_STATUS
				, edcln.EDT_TYPE_CODE		as EXPIRY_DATE_TYPE_CODE
				, edcln.EDT_TYPE_DESC		as EXPIRY_DATE_TYPE_DESC
				, edcln.EDT_STATUS			as EXPIRY_DATE_TYPE_STATUS
				, edcln.EDT_REJECT			as EXPIRY_DATE_TYPE_REJECT
				, edcln.EDT_DEFAULT			as EXPIRY_DATE_TYPE_DEFAULT
				, edcln.EDT_DEF_EXP_DATE	as EXPIRY_DATE_TYPE_DEFVALUE
				, edcln.EDT_DATE_FMT		as EXPIRY_DATE_TYPE_FORMAT
				, edcln.EDT_TIME_ENABLED	as EXPIRY_DATE_TYPE_TIMEFLAG	
				, NVL(edcnt.ED_DATA_COUNT, 0)		as EXPIRY_DATE_TYPE_RECNUM
			from 
				EXPIRY_DATE_TYPES		edcln
				, EXPIRY_DATE_TARGETS	edtbl
				, (
					select 
						ED_TARGET_CODE
						, ED_TYPE_CODE
						, count(*) 			as ED_DATA_COUNT 
					from EXPIRY_DATE_DETAILS 
					where 1=1 
					group by ED_TARGET_CODE, ED_TYPE_CODE
				)						edcnt
			where 
				1 = 1 
				and edcln.EDT_TARGET_CODE = edtbl.EDTA_TARGET_CODE
				and edcln.EDT_TARGET_CODE = edcnt.ED_TARGET_CODE(+)
				and edcln.EDT_TYPE_CODE = edcnt.ED_TYPE_CODE(+)
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
		else $sort="ORDER BY EXPIRY_DATE_TYPE_DEFAULT DESC, EXPIRY_DATE_TYPE_CODE";
		
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

	public function getExpiryDateTargets()
	{
		$sql = "SELECT * FROM EXPIRY_DATE_TARGETS ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
    public function isExpiryDateTargetEnabled( $target_code )
	{
		$sql = array();
		$sql['sql_text'] = "
			select * 
			from 
				EXPIRY_DATE_TARGETS 
			where 
				EDTA_TARGET_CODE = :edta_target_code
				and EDTA_STATUS != 0
				and TO_NUMBER((select CONFIG_VALUE from SITE_CONFIG where CONFIG_KEY='SITE_EXPIRY_DATE_MANAGE_MODE'), '99')>1
		";
		$sql['sql_data'] = array( $target_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }
	
    public function isExpiryDateTypeExisted( $target_code, $type_code )
	{
		$sql = array();
		$sql['sql_text'] = "
			select * 
			from 
				EXPIRY_DATE_TYPES 
			where 
				EDT_TARGET_CODE = :edt_target_code
				and EDT_TYPE_CODE = :edt_type_code
		";
		$sql['sql_data'] = array( $target_code, $type_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }
    
    public function getTotalExpiryDateTypes( $target_code )
	{
		$sql = array();
		$sql['sql_text'] = "
			select * 
			from 
				EXPIRY_DATE_TYPES 
			where 
				EDT_TARGET_CODE = :edt_target_code
		";
		$sql['sql_data'] = array( $target_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
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
		$rec_count = $this->isExpiryDateTypeExisted( $data->expiry_date_target_code, $data->expiry_date_type_code );
		if ( $rec_count > 0 )
		{
			logMe("The expiry date type exists already therefore no INSERT action!!!",GENERICEXPIRYDATESERVICE);
			return "ERROR";
		}

		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into EXPIRY_DATE_TYPES
			( 
				EDT_TARGET_CODE
				, EDT_TYPE_CODE
				, EDT_TYPE_DESC
				, EDT_STATUS
				, EDT_REJECT
				, EDT_DEFAULT
				, EDT_DEF_EXP_DATE
				, EDT_DATE_FMT
				, EDT_TIME_ENABLED
			) 
			values 
			( 
				:edt_target_code
				, :edt_type_code
				, :edt_type_desc
				, :edt_status
				, :edt_reject
				, :edt_default
				, TO_DATE(:edt_def_exp_date, 'yyyy-mm-dd hh24:mi:ss' )
-- 				, :edt_def_exp_date
				, :edt_date_fmt
				, :edt_time_enabled
			) 
		";

		$sql['sql_data'] = array( $data->expiry_date_target_code, $data->expiry_date_type_code, $data->expiry_date_type_desc, $data->expiry_date_type_status, $data->expiry_date_type_reject, $data->expiry_date_type_default, $data->expiry_date_type_defvalue, $data->expiry_date_type_format, $data->expiry_date_type_timeflag );
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the expiry date type succeeded!!!",GENERICEXPIRYDATESERVICE);

		// write journal
		$keys = array ("EDT_TARGET_CODE"=>($data->expiry_date_target_code), "EDT_TYPE_CODE"=>($data->expiry_date_type_code));
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Expiry Date Types", "EXPIRY_DATE_TYPES", $keys, $excludes );
		$main_msg = $data->expiry_date_target_code . ", " . $data->expiry_date_type_code . " - " . $data->expiry_date_type_desc;
		$ins_journal->logOneLine("created an expiry date type with [" . $main_msg . "] successfully");
		
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
			update EXPIRY_DATE_TYPES set 
				EDT_TYPE_DESC = :edt_type_desc
				, EDT_STATUS = :edt_status
				, EDT_REJECT = :edt_reject
				, EDT_DEFAULT = :edt_default
				, EDT_DEF_EXP_DATE = TO_DATE(:edt_def_exp_date, 'yyyy-mm-dd hh24:mi:ss' )
-- 				, EDT_DEF_EXP_DATE = :edt_def_exp_date
				, EDT_DATE_FMT = :edt_date_fmt
				, EDT_TIME_ENABLED = :edt_time_enabled	
			where 
				EDT_TARGET_CODE = :edt_target_code
				and EDT_TYPE_CODE = :edt_type_code
		";
		$sql['sql_data'] = array( $data->expiry_date_type_desc, $data->expiry_date_type_status, $data->expiry_date_type_reject, $data->expiry_date_type_default, $data->expiry_date_type_defvalue, $data->expiry_date_type_format, $data->expiry_date_type_timeflag, $data->expiry_date_target_code, $data->expiry_date_type_code );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the expiry date type succeeded!!!",GENERICEXPIRYDATESERVICE);
		
		$keys = array ("EDT_TARGET_CODE"=>($data->expiry_date_target_code), "EDT_TYPE_CODE"=>($data->expiry_date_type_code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Expiry Date Types", "EXPIRY_DATE_TYPES", $keys, $excludes );
		$main_msg = $data->expiry_date_target_code . ", " . $data->expiry_date_type_code . " - " . $data->expiry_date_type_desc;
		$upd_journal->logOneLine("updated an expiry date type with [" . $main_msg . "] successfully");
		
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
		$rec_count = $this->isExpiryDateTypeExisted( $data->expiry_date_target_code, $data->expiry_date_type_code );
		if ( $rec_count == 0 )
		{
			logMe("The expiry date type does not exist therefore no DELETE action!!!",GENERICEXPIRYDATESERVICE);
			return "ERROR";
		}

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from EXPIRY_DATE_TYPES 
			where 
				EDT_TARGET_CODE = :edt_target_code
				and EDT_TYPE_CODE = :edt_type_code
		";
		$sql['sql_data'] = array( $data->expiry_date_target_code, $data->expiry_date_type_code );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the expiry date type succeeded!!!",GENERICEXPIRYDATESERVICE);

		// write journal
		$keys = array ("EDT_TARGET_CODE"=>($data->expiry_date_target_code), "EDT_TYPE_CODE"=>($data->expiry_date_type_code));
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Expiry Date Types", "EXPIRY_DATE_TYPES", $keys, $excludes );
		$main_msg = $data->expiry_date_target_code . ", " . $data->expiry_date_type_code . " - " . $data->expiry_date_type_desc;
		$del_journal->logOneLine("deleted an expiry date type with [" . $main_msg . "] successfully");
		
		return "OK";
	}
	
}
?>