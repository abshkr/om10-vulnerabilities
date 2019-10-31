<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DDIADDITIONALLINES')) define('DDIADDITIONALLINES','DdiAdditionalLineService.class');

class DdiAdditionalLineService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				addl.DDI_DD_NUMBER
				, addl.DDI_DD_SUPP_CODE
				, sc.CMPY_NAME					as DDI_DD_SUPP_NAME
				, addl.DDI_DD_TRIPORD_NO
				, addl.DDI_DD_LD_TYPE
				, dlt.SHL_TYPE_NAME				as DDI_DD_LOAD_TYPENAME
				, addl.DDI_LINE_ITEM_NUM
				, addl.ADDI_FLD_LINE_NO	
				, addl.ADDI_FLD_INFO
			from 
				DELV_DETAILS_ITEM_ADDL_INFO		addl
				, COMPANYS						sc
				, SHL_TYPE_TYP					dlt
			where 
				1 = 1
				and addl.DDI_DD_SUPP_CODE = sc.CMPY_CODE
				and addl.DDI_DD_LD_TYPE = dlt.SHL_TYPE_ID(+)
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
		else $sort="ORDER BY DDI_DD_NUMBER, DDI_DD_SUPP_CODE, DDI_DD_TRIPORD_NO, DDI_DD_LD_TYPE, DDI_LINE_ITEM_NUM, ADDI_FLD_LINE_NO";
		
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

    public function isAdditionalLineExisted( $ddi_dd_number, $ddi_dd_supp_code, $ddi_dd_tripord_no, $ddi_dd_ld_type, $ddi_line_item_num, $addi_fld_line_no )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from DELV_DETAILS_ITEM_ADDL_INFO 
			where 
				DDI_DD_NUMBER=:ddi_dd_number 
				and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
				and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
				and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
				and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
				and ADDI_FLD_LINE_NO=:addi_fld_line_no 
		";
		
		$sql['sql_data'] = array( $ddi_dd_number, $ddi_dd_supp_code, $ddi_dd_tripord_no, $ddi_dd_ld_type, $ddi_line_item_num, $addi_fld_line_no );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function isAdditionalInfoExisted( $ddi_dd_number, $ddi_dd_supp_code, $ddi_dd_tripord_no, $ddi_dd_ld_type, $ddi_line_item_num )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from DELV_DETAILS_ITEM_ADDL_INFO 
			where 
				DDI_DD_NUMBER=:ddi_dd_number 
				and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
				and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
				and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
				and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
		";
		
		$sql['sql_data'] = array( $ddi_dd_number, $ddi_dd_supp_code, $ddi_dd_tripord_no, $ddi_dd_ld_type, $ddi_line_item_num );
		
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
			$cnt = $this->isAdditionalInfoExisted( $rowobj->ddi_dd_number, $rowobj->ddi_dd_supp_code, $rowobj->ddi_dd_tripord_no, $rowobj->ddi_dd_ld_type, $rowobj->ddi_line_item_num );
			$counts =  $rowobj->ddi_line_item_num . ':::' . $cnt . '|';
		}
		$counts = substr( $counts, 0, -1 );
		
		return $counts;
	}
   
	public function countAdditionalInfoAsArray( $data )
	{
		$counts = array();
		foreach( $data as $rowobj )
		{
			$cnt = $this->isAdditionalInfoExisted( $rowobj->ddi_dd_number, $rowobj->ddi_dd_supp_code, $rowobj->ddi_dd_tripord_no, $rowobj->ddi_dd_ld_type, $rowobj->ddi_line_item_num );
			$obj = array();
			$obj['ddi_dd_number'] = $rowobj->ddi_dd_number;
			$obj['ddi_dd_supp_code'] = $rowobj->ddi_dd_supp_code;
			$obj['ddi_dd_tripord_no'] = $rowobj->ddi_dd_tripord_no;
			$obj['ddi_dd_ld_type'] = $rowobj->ddi_dd_ld_type;
			$obj['ddi_line_item_num'] = $rowobj->ddi_line_item_num;
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
			insert into DELV_DETAILS_ITEM_ADDL_INFO
			( 
				DDI_DD_NUMBER
				, DDI_DD_SUPP_CODE 
				, DDI_DD_TRIPORD_NO 
				, DDI_DD_LD_TYPE 
				, DDI_LINE_ITEM_NUM 
				, ADDI_FLD_LINE_NO 
				, ADDI_FLD_INFO 
			) 
			values 
			( 
				:ddi_dd_number
				, :ddi_dd_supp_code 
				, :ddi_dd_tripord_no 
				, :ddi_dd_ld_type 
				, :ddi_line_item_num 
				, :addi_fld_line_no 
				, :addi_fld_info 
			) 
		";
		$sql['sql_data'] = array( $data->ddi_dd_number, $data->ddi_dd_supp_code, $data->ddi_dd_tripord_no, $data->ddi_dd_ld_type, $data->ddi_line_item_num, $data->addi_fld_line_no, $data->addi_fld_info );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the DD Item Additional Info Line succeeded!!!",DDIADDITIONALLINES);

		// write journal
		$keys = array ( "DDI_DD_NUMBER"=>($data->ddi_dd_number), "DDI_DD_SUPP_CODE"=>($data->ddi_dd_supp_code), "DDI_DD_TRIPORD_NO"=>($data->ddi_dd_tripord_no), "DDI_DD_LD_TYPE"=>($data->ddi_dd_ld_type), "DDI_LINE_ITEM_NUM"=>($data->ddi_line_item_num), "ADDI_FLD_LINE_NO"=>($data->addi_fld_line_no) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "DD Item Additional Info", "DELV_DETAILS_ITEM_ADDL_INFO", $keys, $excludes );
		$ins_journal->logOneLine("created a line of DDI Additional Info [" . $data->addi_fld_line_no . ", " . $data->addi_fld_info . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DELV_DETAILS_ITEM_ADDL_INFO set 
				ADDI_FLD_INFO = :addi_fld_info 
			where 
				DDI_DD_NUMBER=:ddi_dd_number 
				and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
				and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
				and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
				and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
				and ADDI_FLD_LINE_NO=:addi_fld_line_no 
		";
		$sql['sql_data'] = array( $data->addi_fld_info, $data->ddi_dd_number, $data->ddi_dd_supp_code, $data->ddi_dd_tripord_no, $data->ddi_dd_ld_type, $data->ddi_line_item_num, $data->addi_fld_line_no );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the DD Item Additional Info line succeeded!!!",DDIADDITIONALLINES);
		
		$keys = array ( "DDI_DD_NUMBER"=>($data->ddi_dd_number), "DDI_DD_SUPP_CODE"=>($data->ddi_dd_supp_code), "DDI_DD_TRIPORD_NO"=>($data->ddi_dd_tripord_no), "DDI_DD_LD_TYPE"=>($data->ddi_dd_ld_type), "DDI_LINE_ITEM_NUM"=>($data->ddi_line_item_num), "ADDI_FLD_LINE_NO"=>($data->addi_fld_line_no) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "DD Item Additional Info", "DELV_DETAILS_ITEM_ADDL_INFO", $keys, $excludes );
		$upd_journal->logOneLine("updated a line of DDI Additional Info [" . $data->addi_fld_line_no . ", " . $data->addi_fld_info . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS_ITEM_ADDL_INFO 
			where 
				DDI_DD_NUMBER=:ddi_dd_number 
				and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
				and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
				and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
				and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
				and ADDI_FLD_LINE_NO=:addi_fld_line_no 
		";
		$sql['sql_data'] = array( $data->ddi_dd_number, $data->ddi_dd_supp_code, $data->ddi_dd_tripord_no, $data->ddi_dd_ld_type, $data->ddi_line_item_num, $data->addi_fld_line_no );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the DD Item Additional Info line succeeded!!!",DDIADDITIONALLINES);

		// write journal
		$keys = array ( "DDI_DD_NUMBER"=>($data->ddi_dd_number), "DDI_DD_SUPP_CODE"=>($data->ddi_dd_supp_code), "DDI_DD_TRIPORD_NO"=>($data->ddi_dd_tripord_no), "DDI_DD_LD_TYPE"=>($data->ddi_dd_ld_type), "DDI_LINE_ITEM_NUM"=>($data->ddi_line_item_num), "ADDI_FLD_LINE_NO"=>($data->addi_fld_line_no) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "DD Item Additional Info", "DELV_DETAILS_ITEM_ADDL_INFO", $keys, $excludes );
		$del_journal->logOneLine("deleted a line of DDI Additional Info [" . $data->addi_fld_line_no . ", " . $data->addi_fld_info . "] successfully");
		
		return "OK";
	}
    
	public function deleteAll( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DELV_DETAILS_ITEM_ADDL_INFO 
			where 
				DDI_DD_NUMBER=:ddi_dd_number 
				and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
				and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
				and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
				and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
		";
		$sql['sql_data'] = array( $data->ddi_dd_number, $data->ddi_dd_supp_code, $data->ddi_dd_tripord_no, $data->ddi_dd_ld_type, $data->ddi_line_item_num );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the DD Item Additional Info lines succeeded!!!",DDIADDITIONALLINES);

		// write journal
		$keys = array ( "DDI_DD_NUMBER"=>($data->ddi_dd_number), "DDI_DD_SUPP_CODE"=>($data->ddi_dd_supp_code), "DDI_DD_TRIPORD_NO"=>($data->ddi_dd_tripord_no), "DDI_DD_LD_TYPE"=>($data->ddi_dd_ld_type), "DDI_LINE_ITEM_NUM"=>($data->ddi_line_item_num) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "DD Item Additional Info", "DELV_DETAILS_ITEM_ADDL_INFO", $keys, $excludes );
		$del_journal->logOneLine("deleted lines of DDI Additional Info successfully");
		
		return "OK";
	}

	
}
?>