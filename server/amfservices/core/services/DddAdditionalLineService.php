<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DDDADDITIONALLINES')) define('DDDADDITIONALLINES','DddAdditionalLineService.class');

class DddAdditionalLineService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				addl.DDD_DD_NUMBER
				, addl.DDD_DD_SUPP_CODE
				, sc.CMPY_NAME					as DDD_DD_SUPP_NAME
				, addl.DDD_DD_TRIPORD_NO
				, addl.DDD_DD_LD_TYPE
				, dlt.SHL_TYPE_NAME				as DDD_DD_LOAD_TYPENAME
				, addl.DDD_TEMPL_ID
				, addl.ADDI_FLD_LINE_NO	
				, addl.ADDI_FLD_INFO
			from 
				DELV_DETAILS_DN_ADDL_INFO		addl
				, COMPANYS						sc
				, SHL_TYPE_TYP					dlt
			where 
				1 = 1
				and addl.DDD_DD_SUPP_CODE = sc.CMPY_CODE
				and addl.DDD_DD_LD_TYPE = dlt.SHL_TYPE_ID(+)
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
            $this->cgi = CGIDIR . "gantry/baseprods_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/baseprods_mod.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) ADDLVIEW ";
			
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
		else $sort="ORDER BY DDD_DD_NUMBER, DDD_DD_SUPP_CODE, DDD_DD_TRIPORD_NO, DDD_DD_LD_TYPE, DDD_TEMPL_ID, ADDI_FLD_LINE_NO";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) ADDLVIEW ";
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
		//$data = $mydb->retrieveArray($queryPaged);
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 

    public function isAdditionalLineExisted( $ddd_dd_number, $ddd_dd_supp_code, $ddd_dd_tripord_no, $ddd_dd_ld_type, $ddd_templ_id, $addi_fld_line_no )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from DELV_DETAILS_DN_ADDL_INFO 
			where 
				DDD_DD_NUMBER=:ddd_dd_number 
				and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
				and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
				and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and DDD_TEMPL_ID=:ddd_templ_id 
				and ADDI_FLD_LINE_NO=:addi_fld_line_no 
		";
		
		$sql['sql_data'] = array( $ddd_dd_number, $ddd_dd_supp_code, $ddd_dd_tripord_no, $ddd_dd_ld_type, $ddd_templ_id, $addi_fld_line_no );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function isAdditionalInfoExisted( $ddd_dd_number, $ddd_dd_supp_code, $ddd_dd_tripord_no, $ddd_dd_ld_type, $ddd_templ_id )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from DELV_DETAILS_DN_ADDL_INFO 
			where 
				DDD_DD_NUMBER=:ddd_dd_number 
				and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
				and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
				and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and DDD_TEMPL_ID=:ddd_templ_id 
		";
		
		$sql['sql_data'] = array( $ddd_dd_number, $ddd_dd_supp_code, $ddd_dd_tripord_no, $ddd_dd_ld_type, $ddd_templ_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}
   
	public function countAdditionalInfo( $data )
	{
		$counts = "";
		foreach( $data as $rowobj )
		{
			$cnt = $this->isAdditionalInfoExisted( $rowobj->ddd_dd_number, $rowobj->ddd_dd_supp_code, $rowobj->ddd_dd_tripord_no, $rowobj->ddd_dd_ld_type, $rowobj->ddd_templ_id );
			$counts =  $rowobj->ddd_templ_id . ':::' . $cnt . '|';
		}
		$counts = substr( $counts, 0, -1 );
		
		return $counts;
	}
   
	public function countAdditionalInfoAsArray( $data )
	{
		$counts = array();
		foreach( $data as $rowobj )
		{
			$cnt = $this->isAdditionalInfoExisted( $rowobj->ddd_dd_number, $rowobj->ddd_dd_supp_code, $rowobj->ddd_dd_tripord_no, $rowobj->ddd_dd_ld_type, $rowobj->ddd_templ_id );
			$obj = array();
			$obj['ddd_dd_number'] = $rowobj->ddd_dd_number;
			$obj['ddd_dd_supp_code'] = $rowobj->ddd_dd_supp_code;
			$obj['ddd_dd_tripord_no'] = $rowobj->ddd_dd_tripord_no;
			$obj['ddd_dd_ld_type'] = $rowobj->ddd_dd_ld_type;
			$obj['ddd_templ_id'] = $rowobj->ddd_templ_id;
			$obj['addi_info_num'] = $cnt;
			$counts[] = (object)$obj;
		}
		return $counts;
	}


    
	public function create( $data )
	{
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DELV_DETAILS_DN_ADDL_INFO
			( 
				DDD_DD_NUMBER
				, DDD_DD_SUPP_CODE 
				, DDD_DD_TRIPORD_NO 
				, DDD_DD_LD_TYPE 
				, DDD_TEMPL_ID 
				, ADDI_FLD_LINE_NO 
				, ADDI_FLD_INFO 
			) 
			values 
			( 
				:ddd_dd_number
				, :ddd_dd_supp_code 
				, :ddd_dd_tripord_no 
				, :ddd_dd_ld_type 
				, :ddd_templ_id 
				, :addi_fld_line_no 
				, :addi_fld_info 
			) 
		";
		$sql['sql_data'] = array( $data->ddd_dd_number, $data->ddd_dd_supp_code, $data->ddd_dd_tripord_no, $data->ddd_dd_ld_type, $data->ddd_templ_id, $data->addi_fld_line_no, $data->addi_fld_info );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the DD DN Additional Info Line succeeded!!!",DDDADDITIONALLINES);

		// write journal
		$keys = array ( "DDD_DD_NUMBER"=>($data->ddd_dd_number), "DDD_DD_SUPP_CODE"=>($data->ddd_dd_supp_code), "DDD_DD_TRIPORD_NO"=>($data->ddd_dd_tripord_no), "DDD_DD_LD_TYPE"=>($data->ddd_dd_ld_type), "DDD_TEMPL_ID"=>($data->ddd_templ_id), "ADDI_FLD_LINE_NO"=>($data->addi_fld_line_no) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "DD DN Additional Info", "DELV_DETAILS_DN_ADDL_INFO", $keys, $excludes );
		$ins_journal->logOneLine("created a line of DDD Additional Info [" . $data->addi_fld_line_no . ", " . $data->addi_fld_info . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DELV_DETAILS_DN_ADDL_INFO set 
				ADDI_FLD_INFO = :addi_fld_info 
			where 
				DDD_DD_NUMBER=:ddd_dd_number 
				and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
				and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
				and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and DDD_TEMPL_ID=:ddd_templ_id 
				and ADDI_FLD_LINE_NO=:addi_fld_line_no 
		";
		$sql['sql_data'] = array( $data->addi_fld_info, $data->ddd_dd_number, $data->ddd_dd_supp_code, $data->ddd_dd_tripord_no, $data->ddd_dd_ld_type, $data->ddd_templ_id, $data->addi_fld_line_no );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the DD DN Additional Info line succeeded!!!",DDDADDITIONALLINES);
		
		$keys = array ( "DDD_DD_NUMBER"=>($data->ddd_dd_number), "DDD_DD_SUPP_CODE"=>($data->ddd_dd_supp_code), "DDD_DD_TRIPORD_NO"=>($data->ddd_dd_tripord_no), "DDD_DD_LD_TYPE"=>($data->ddd_dd_ld_type), "DDD_TEMPL_ID"=>($data->ddd_templ_id), "ADDI_FLD_LINE_NO"=>($data->addi_fld_line_no) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "DD DN Additional Info", "DELV_DETAILS_DN_ADDL_INFO", $keys, $excludes );
		$upd_journal->logOneLine("updated a line of DDD Additional Info [" . $data->addi_fld_line_no . ", " . $data->addi_fld_info . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS_DN_ADDL_INFO 
			where 
				DDD_DD_NUMBER=:ddd_dd_number 
				and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
				and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
				and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and DDD_TEMPL_ID=:ddd_templ_id 
				and ADDI_FLD_LINE_NO=:addi_fld_line_no 
		";
		$sql['sql_data'] = array( $data->ddd_dd_number, $data->ddd_dd_supp_code, $data->ddd_dd_tripord_no, $data->ddd_dd_ld_type, $data->ddd_templ_id, $data->addi_fld_line_no );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the DD DN Additional Info line succeeded!!!",DDDADDITIONALLINES);

		// write journal
		$keys = array ( "DDD_DD_NUMBER"=>($data->ddd_dd_number), "DDD_DD_SUPP_CODE"=>($data->ddd_dd_supp_code), "DDD_DD_TRIPORD_NO"=>($data->ddd_dd_tripord_no), "DDD_DD_LD_TYPE"=>($data->ddd_dd_ld_type), "DDD_TEMPL_ID"=>($data->ddd_templ_id), "ADDI_FLD_LINE_NO"=>($data->addi_fld_line_no) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "DD DN Additional Info", "DELV_DETAILS_DN_ADDL_INFO", $keys, $excludes );
		$del_journal->logOneLine("deleted a line of DDD Additional Info [" . $data->addi_fld_line_no . ", " . $data->addi_fld_info . "] successfully");
		
		return "OK";
	}
    
	public function deleteAll( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS_DN_ADDL_INFO 
			where 
				DDD_DD_NUMBER=:ddd_dd_number 
				and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
				and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
				and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and DDD_TEMPL_ID=:ddd_templ_id 
		";
		$sql['sql_data'] = array( $data->ddd_dd_number, $data->ddd_dd_supp_code, $data->ddd_dd_tripord_no, $data->ddd_dd_ld_type, $data->ddd_templ_id );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the DD DN Additional Info lines succeeded!!!",DDDADDITIONALLINES);

		// write journal
		$keys = array ( "DDD_DD_NUMBER"=>($data->ddd_dd_number), "DDD_DD_SUPP_CODE"=>($data->ddd_dd_supp_code), "DDD_DD_TRIPORD_NO"=>($data->ddd_dd_tripord_no), "DDD_DD_LD_TYPE"=>($data->ddd_dd_ld_type), "DDD_TEMPL_ID"=>($data->ddd_templ_id) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "DD DN Additional Info", "DELV_DETAILS_DN_ADDL_INFO", $keys, $excludes );
		$del_journal->logOneLine("deleted lines of DDD Additional Info successfully");
		
		return "OK";
	}

	
}
?>