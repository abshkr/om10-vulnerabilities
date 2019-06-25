<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('EXPIRYDATEDETAILSERVICE')) define('EXPIRYDATEDETAILSERVICE','ExpiryDateDetailService.class');

class ExpiryDateDetailService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				eddt.ED_TARGET_CODE			as ED_TARGET_CODE
				, edta.EDTA_TARGET_DESC		as ED_TARGET_DESC
				, edta.EDTA_MAX_EXP			as ED_TARGET_MAXEXP
				, edta.EDTA_STATUS			as ED_TARGET_STATUS
				, eddt.ED_CMPY_CODE			as ED_CMPY_CODE
				, cmpy.CMPY_NAME			as ED_CMPY_NAME
				, cmpy.CMPY_TYPE			as ED_CMPY_TYPE
				, eddt.ED_OBJECT_ID			as ED_OBJECT_ID	
				, eddt.ED_EXP_DATES			as ED_EXP_DATES
			from 
				EXPIRY_DATE_TARGETS				edta
				, GUI_COMPANYS					cmpy
				, (
					select 
						ED_TARGET_CODE, ED_CMPY_CODE, ED_OBJECT_ID
						, LISTAGG(ED_TYPE_CODE||'::'||TO_CHAR(ED_EXP_DATE, 'yyyy-mm-dd hh24:mi:ss')||'::'||ED_STATUS, '---') WITHIN group (order by ED_TYPE_CODE) as ED_EXP_DATES
					from 
						EXPIRY_DATE_DETAILS
					where 
						1 = 1 
					group by 
						ED_TARGET_CODE, ED_CMPY_CODE, ED_OBJECT_ID
				) 								eddt
			where 
				1 = 1
				and edta.EDTA_TARGET_CODE = eddt.ED_TARGET_CODE
				and eddt.ED_CMPY_CODE = cmpy.CMPY_CODE
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) EDDTVIEW ";
			
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
		else $sort="ORDER BY ED_TARGET_CODE, ED_CMPY_CODE, ED_OBJECT_ID";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) EDDTVIEW ";
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
         
    public function getExpiryDateDetailLines( $target_code, $cmpy_code, $object_id )
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				edd.ED_TARGET_CODE
				, edd.ED_CMPY_CODE
				, edd.ED_OBJECT_ID
				, edd.ED_TYPE_CODE
				, edt.EDT_TYPE_DESC		as ED_TYPE_DESC
				, TO_CHAR(edt.EDT_DEF_EXP_DATE, 'yyyy-mm-dd hh24:mi:ss' )		as ED_TYPE_DEFVALUE
-- 				, edt.EDT_DEF_EXP_DATE	as ED_TYPE_DEFVALUE
				, edt.EDT_DATE_FMT		as ED_TYPE_FORMAT
				, edt.EDT_TIME_ENABLED	as ED_TYPE_TIMEFLAG
				, TO_CHAR(edd.ED_EXP_DATE, 'yyyy-mm-dd hh24:mi:ss' )		as ED_EXP_DATE
-- 				, edd.ED_EXP_DATE
				, edd.ED_STATUS
				, edt.EDT_REJECT		as ED_TYPE_REJECT
			from 
				EXPIRY_DATE_DETAILS			edd
				, EXPIRY_DATE_TYPES			edt
			where 
				1 = 1 
				and edd.ED_TARGET_CODE = :ed_target_code
				and edd.ED_CMPY_CODE = :ed_cmpy_code
				and edd.ED_OBJECT_ID = :ed_object_id
				and edd.ED_TARGET_CODE = edt.EDT_TARGET_CODE
				and edd.ED_TYPE_CODE = edt.EDT_TYPE_CODE
		";
		$sql['sql_data'] = array( $target_code, $cmpy_code, $object_id );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);
		//$data = $mydb->retrieveArray($sql);

		return($data);
	}

    public function isExpiryDateDetailExisted( $target_code, $cmpy_code, $object_id )
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				*
			from 
				EXPIRY_DATE_DETAILS
			where 
				1 = 1 
				and ED_TARGET_CODE = :ed_target_code
				and ED_CMPY_CODE = :ed_cmpy_code
				and ED_OBJECT_ID = :ed_object_id
		";
		$sql['sql_data'] = array( $target_code, $cmpy_code, $object_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function isExpiryDateDetailLineExisted( $target_code, $cmpy_code, $object_id, $type_code )
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				*
			from 
				EXPIRY_DATE_DETAILS
			where 
				1 = 1 
				and ED_TARGET_CODE = :ed_target_code
				and ED_CMPY_CODE = :ed_cmpy_code
				and ED_OBJECT_ID = :ed_object_id
				and ED_TYPE_CODE = :ed_type_code
		";
		$sql['sql_data'] = array( $target_code, $cmpy_code, $object_id, $type_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

   
	public function lookupExpiryDateDetailType( $target_code )
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
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function lookupExpiryDateDetailHeader( $target_code='-1' )
	{
		$sql = array();
		$sql['sql_text'] = "
			select 
				ED_TARGET_CODE, ED_CMPY_CODE, ED_OBJECT_ID
			from 
				EXPIRY_DATE_DETAILS
			where 
				1 = 1 
				and ('-1' = :edt_target_code1 or ED_TARGET_CODE = :edt_target_code)
			group by 
				ED_TARGET_CODE, ED_CMPY_CODE, ED_OBJECT_ID
		";
		$sql['sql_data'] = array( $target_code, $target_code );

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
    } 
	
	public function lookupExpiryDateDetailContent( $target_code='-1' )
	{
		$sql = array();
		$sql['sql_text'] = "
			select 
				ED_TARGET_CODE, ED_CMPY_CODE, ED_OBJECT_ID
				, LISTAGG(ED_TYPE_CODE||'::'||TO_CHAR(ED_EXP_DATE, 'yyyy-mm-dd hh24:mi:ss')||'::'||ED_STATUS, '---') WITHIN group (order by ED_TYPE_CODE) as ED_EXP_DATES
			from 
				EXPIRY_DATE_DETAILS
			where 
				1 = 1 
				and ('-1' = :edt_target_code1 or ED_TARGET_CODE = :edt_target_code)
			group by 
				ED_TARGET_CODE, ED_CMPY_CODE, ED_OBJECT_ID
		";
		$sql['sql_data'] = array( $target_code, $target_code );

        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
    } 


  
    
	public function createMain( $data )
	{
		return "OK";
	}
    
	public function updateMain( $data )
	{
		return "OK";
	}
    
	public function deleteMain( $data )
	{
		return "OK";
	}

  
    
	public function createLine( $data )
	{
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into EXPIRY_DATE_DETAILS
			( 
				ED_TARGET_CODE
				, ED_CMPY_CODE
				, ED_OBJECT_ID
				, ED_TYPE_CODE
				, ED_EXP_DATE
				, ED_STATUS	
			) 
			values 
			( 
				:ed_target_code
				, :ed_cmpy_code
				, :ed_object_id
				, :ed_type_code
				, TO_DATE(:ed_exp_date, 'yyyy-mm-dd hh24:mi:ss' )
-- 				, :ed_exp_date
				, :ed_status	
			) 
		";
		$sql['sql_data'] = array( $data->ed_target_code, $data->ed_cmpy_code, $data->ed_object_id, $data->ed_type_code, $data->ed_exp_date, $data->ed_status );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the expiry date detail line succeeded!!!",EXPIRYDATEDETAILSERVICE);
				
		// write journal
		$keys = array ( "ED_TARGET_CODE"=>($data->ed_target_code), "ED_CMPY_CODE"=>($data->ed_cmpy_code), "ED_OBJECT_ID"=>($data->ed_object_id), "ED_TYPE_CODE"=>($data->ed_type_code) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Expiry Date Details", "EXPIRY_DATE_DETAILS", $keys, $excludes );
		$main_msg = $data->ed_target_code . ", " . $data->ed_cmpy_code . ", " . $data->ed_object_id . ", " . $data->ed_type_code . ", " . $data->ed_exp_date;
		$ins_journal->logOneLine("created a line of expiry date detail [" . $main_msg . "] successfully");
		
		if ($data->ed_target_code == "PERSONNEL")
		{
			$sql['sql_text'] = "
				UPDATE PERSONNEL SET PER_LAST_MODIFIED=current_date 
				WHERE PER_CODE=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		else if ($data->ed_target_code == "TANKERS")
		{
			$sql['sql_text'] = "
				UPDATE TANKERS SET TNKR_LAST_MODIFIED=current_date 
				WHERE TNKR_CODE=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		else if ($data->ed_target_code == "TRANSP_EQUIP")
		{
			$sql['sql_text'] = "
				UPDATE TRANSP_EQUIP SET EQPT_LAST_MODIFIED=current_date 
				WHERE EQPT_ID=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		$comment_res = $mydb->update($sql);
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		return "OK";
	}
    
	public function updateLine( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update EXPIRY_DATE_DETAILS set 
				ED_EXP_DATE = TO_DATE(:ed_exp_date, 'yyyy-mm-dd hh24:mi:ss' )
-- 				ED_EXP_DATE = :ed_exp_date 
				, ED_STATUS = :ed_status
			where 
				ED_TARGET_CODE = :ed_target_code
				and ED_CMPY_CODE = :ed_cmpy_code
				and ED_OBJECT_ID = :ed_object_id
				and ED_TYPE_CODE = :ed_type_code
		";
		$sql['sql_data'] = array( $data->ed_exp_date, $data->ed_status, $data->ed_target_code, $data->ed_cmpy_code, $data->ed_object_id, $data->ed_type_code );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the expiry date detail line succeeded!!!",EXPIRYDATEDETAILSERVICE);
		
		$keys = array ( "ED_TARGET_CODE"=>($data->ed_target_code), "ED_CMPY_CODE"=>($data->ed_cmpy_code), "ED_OBJECT_ID"=>($data->ed_object_id), "ED_TYPE_CODE"=>($data->ed_type_code) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Expiry Date Details", "EXPIRY_DATE_DETAILS", $keys, $excludes );
		$main_msg = $data->ed_target_code . ", " . $data->ed_cmpy_code . ", " . $data->ed_object_id . ", " . $data->ed_type_code . ", " . $data->ed_exp_date;
		$upd_journal->logOneLine("updated a line of expiry date detail [" . $main_msg . "] successfully");

		if ($data->ed_target_code == "PERSONNEL")
		{
			$sql['sql_text'] = "
				UPDATE PERSONNEL SET PER_LAST_MODIFIED=current_date 
				WHERE PER_CODE=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		else if ($data->ed_target_code == "TANKERS")
		{
			$sql['sql_text'] = "
				UPDATE TANKERS SET TNKR_LAST_MODIFIED=current_date 
				WHERE TNKR_CODE=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		else if ($data->ed_target_code == "TRANSP_EQUIP")
		{
			$sql['sql_text'] = "
				UPDATE TRANSP_EQUIP SET EQPT_LAST_MODIFIED=current_date 
				WHERE EQPT_ID=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		logMe($sql['sql_text'], EXPIRYDATEDETAILSERVICE);
		$comment_res = $mydb->update($sql);
		if ($comment_res != RETURN_OK)
		{
			return "ERROR";
		}
		return "OK";
	}
    
	public function deleteLine( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from EXPIRY_DATE_DETAILS 
			where 
				ED_TARGET_CODE = :ed_target_code
				and ED_CMPY_CODE = :ed_cmpy_code
				and ED_OBJECT_ID = :ed_object_id
				and ED_TYPE_CODE = :ed_type_code
		";
		$sql['sql_data'] = array( $data->ed_target_code, $data->ed_cmpy_code, $data->ed_object_id, $data->ed_type_code );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the expiry date detail line succeeded!!!",EXPIRYDATEDETAILSERVICE);

		// write journal
		$keys = array ( "ED_TARGET_CODE"=>($data->ed_target_code), "ED_CMPY_CODE"=>($data->ed_cmpy_code), "ED_OBJECT_ID"=>($data->ed_object_id), "ED_TYPE_CODE"=>($data->ed_type_code) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Expiry Date Details", "EXPIRY_DATE_DETAILS", $keys, $excludes );
		$main_msg = $data->ed_target_code . ", " . $data->ed_cmpy_code . ", " . $data->ed_object_id . ", " . $data->ed_type_code . ", " . $data->ed_exp_date;
		$del_journal->logOneLine("deleted a line of expiry date detail [" . $main_msg . "] successfully");

		if ($data->ed_target_code == "PERSONNEL")
		{
			$sql['sql_text'] = "
				UPDATE PERSONNEL SET PER_LAST_MODIFIED=current_date 
				WHERE PER_CODE=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		else if ($data->ed_target_code == "TANKERS")
		{
			$sql['sql_text'] = "
				UPDATE TANKERS SET TNKR_LAST_MODIFIED=current_date 
				WHERE TNKR_CODE=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		else if ($data->ed_target_code == "TRANSP_EQUIP")
		{
			$sql['sql_text'] = "
				UPDATE TRANSP_EQUIP SET EQPT_LAST_MODIFIED=current_date 
				WHERE EQPT_ID=:code";
			$sql['sql_data'] = array($data->ed_object_id);
		}
		$comment_res = $mydb->update($sql);
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		return "OK";
	}

  
    
	public function create( $data )
	{
		// add expiry date detail header
		$res = $this->createMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// add expiry date detail line
		if ( is_array($data->edd_items) === FALSE )
		{
			$data->edd_items = (array)($data->edd_items);
		}
		if( $data->has_items=="1" && sizeof($data->edd_items) > 0 )
		{
			for($i=0; $i<sizeof($data->edd_items); $i++)
			{      
				$line_item = $data->edd_items[$i];
				$lineResult = $this->createLine( $line_item );
				if ( $lineResult != "OK" )
				{
					return $lineResult;
				}
				$this->updateTargetDates( $line_item, "UPDATE" );
			}
		}
		
        return "OK";
	}
    
	public function update( $data )
	{
		// should not update the expiry date detail header
		
		// update expiry date detail line
		if ( is_array($data->edd_items) === FALSE )
		{
			$data->edd_items = (array)($data->edd_items);
		}
		if( $data->has_items=="1" && sizeof($data->edd_items) > 0 )
		{
			for($i=0; $i<sizeof($data->edd_items); $i++)
			{   
				$line_item = $data->edd_items[$i];
				if ( $data->actions[$i]->option == "1" )
				{ // insert new expiry date detail line
					$lineResult = $this->createLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
					$this->updateTargetDates( $line_item, "UPDATE" );
				}
				else
				if ( $data->actions[$i]->option == "2" )
				{ // update existing expiry date detail line
					$lineResult = $this->updateLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
					$this->updateTargetDates( $line_item, "UPDATE" );
				}
				else
				if ( $data->actions[$i]->option == "3" )
				{ // delete existing expiry date detail line
					$lineResult = $this->deleteLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
					$this->updateTargetDates( $line_item, "DELETE" );
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
        return "OK";
	}
    
	public function delete( $data )
	{
		// delete all expiry date detail lines
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from EXPIRY_DATE_DETAILS 
			where 
				ED_TARGET_CODE = :ed_target_code
				and ED_CMPY_CODE = :ed_cmpy_code
				and ED_OBJECT_ID = :ed_object_id
		";
		$sql['sql_data'] = array( $data->ed_target_code, $data->ed_cmpy_code, $data->ed_object_id );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the expiry date detail lines succeeded!!!",EXPIRYDATEDETAILSERVICE);
		
		// delete expiry date detail header
		$res = @$this->deleteMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		$this->deleteTargetDates($data);
		return "OK";
	}
    
	public function updateExpiryDateDetailKey( $oldData, $newData )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update EXPIRY_DATE_DETAILS set 
				ED_TARGET_CODE = :ed_target_code_new
				, ED_CMPY_CODE = :ed_cmpy_code_new
				, ED_OBJECT_ID = :ed_object_id_new
			where 
				ED_TARGET_CODE = :ed_target_code_old
				and ED_CMPY_CODE = :ed_cmpy_code_old
				and ED_OBJECT_ID = :ed_object_id_old
		";
		$sql['sql_data'] = array( $newData->ed_target_code, $newData->ed_cmpy_code, $newData->ed_object_id, $oldData->ed_target_code, $oldData->ed_cmpy_code, $oldData->ed_object_id );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the expiry date detail key succeeded!!!",EXPIRYDATEDETAILSERVICE);
		
		return "OK";
	}
    
	public function updateTargetDates( $data, $action )
	{
		$tblname = "";
		$colname = "";
		$keyname = "";
		if ( $data->ed_target_code == "TANKERS" )
		{
			$tblname = "TANKERS";
			$keyname = "TNKR_CODE";
			if ( $data->ed_type_code == "TNKR_EXPIRY_DATE_1" )
			{
				$colname = "TNKR_LIC_EXP";
			}
			if ( $data->ed_type_code == "TNKR_EXPIRY_DATE_2" )
			{
				$colname = "TNKR_DGLIC_EXP";
			}
			if ( $data->ed_type_code == "TNKR_EXPIRY_DATE_3" )
			{
				$colname = "TNKR_INS_EXP";
			}
		}
		if ( $data->ed_target_code == "TRANSP_EQUIP" )
		{
			$tblname = "TRANSP_EQUIP";
			$keyname = "EQPT_ID";
			if ( $data->ed_type_code == "EQPT_EXPIRY_DATE_1" )
			{
				$colname = "EQPT_EXP_D1_DMY";
			}
			if ( $data->ed_type_code == "EQPT_EXPIRY_DATE_2" )
			{
				$colname = "EQPT_EXP_D2_DMY";
			}
			if ( $data->ed_type_code == "EQPT_EXPIRY_DATE_3" )
			{
				$colname = "EQPT_EXP_D3_DMY";
			}
		}
		if ( $data->ed_target_code == "PERSONNEL" )
		{
			$tblname = "PERSONNEL";
			$keyname = "PER_CODE";
			if ( $data->ed_type_code == "PSNL_EXPIRY_DATE_1" )
			{
				$colname = "PER_EXP_D1_DMY";
			}
			if ( $data->ed_type_code == "PSNL_EXPIRY_DATE_2" )
			{
				$colname = "PER_EXP_D2_DMY";
			}
			if ( $data->ed_type_code == "PSNL_EXPIRY_DATE_3" )
			{
				$colname = "PER_EXP_D3_DMY";
			}
		}
		
		if ( $tblname == "" || $colname == "" || $keyname == "" )
		{
			return "OK";
		}
		
        $mydb = DB::getInstance();
		$sql = array();
		if ( $action == "UPDATE" )
		{
			$sql['sql_text'] = "
				update $tblname set 
					$colname = TO_DATE(:ed_exp_date, 'yyyy-mm-dd hh24:mi:ss' )
				where 
					$keyname = :ed_object_id
			";
			$sql['sql_data'] = array( $data->ed_exp_date, $data->ed_object_id );
		}
		else
		{
			$sql['sql_text'] = "
				update $tblname set 
					$colname = NULL
				where 
					$keyname = :ed_object_id
			";
			$sql['sql_data'] = array( $data->ed_object_id );
		}
			
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the expiry date in $tblname line succeeded!!!",EXPIRYDATEDETAILSERVICE);
		
		$keys = array ( $keyname=>($data->ed_object_id) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Expiry Date Details for ".$tblname, $tblname, $keys, $excludes );
		$main_msg = $tblname . ", " . $keyname . ", " . $data->ed_object_id . ", " . $colname . ", " . $data->ed_exp_date;
		$upd_journal->logOneLine("updated a line of expiry date detail [" . $main_msg . "] successfully");
		
		return "OK";
	}
    
	public function deleteTargetDates( $data )
	{
		$tblname = "";
		$colname = "";
		$keyname = "";
		if ( $data->ed_target_code == "TANKERS" )
		{
			$tblname = "TANKERS";
			$keyname = "TNKR_CODE";
			$colname = "TNKR_LIC_EXP = NULL, TNKR_DGLIC_EXP = NULL, TNKR_INS_EXP = NULL";
		}
		if ( $data->ed_target_code == "TRANSP_EQUIP" )
		{
			$tblname = "TRANSP_EQUIP";
			$keyname = "EQPT_ID";
			$colname = "EQPT_EXP_D1_DMY = NULL, EQPT_EXP_D2_DMY = NULL, EQPT_EXP_D3_DMY = NULL";
		}
		if ( $data->ed_target_code == "PERSONNEL" )
		{
			$tblname = "PERSONNEL";
			$keyname = "PER_CODE";
			$colname = "PER_EXP_D1_DMY = NULL, PER_EXP_D2_DMY = NULL, PER_EXP_D3_DMY = NULL";
		}
		
		if ( $tblname == "" || $colname == "" || $keyname == "" )
		{
			return "OK";
		}
		
        $mydb = DB::getInstance();
		$sql = array();
		$sql['sql_text'] = "
			update $tblname set 
				 $colname 
			where 
				$keyname = :ed_object_id
		";
		$sql['sql_data'] = array( $data->ed_object_id );
			
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the expiry date in $tblname line succeeded!!!",EXPIRYDATEDETAILSERVICE);
		
		$keys = array ( $keyname=>($data->ed_object_id) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Expiry Date Details for ".$tblname, $tblname, $keys, $excludes );
		$main_msg = $tblname . ", " . $keyname . ", " . $colname;
		$upd_journal->logOneLine("updated a line of expiry date detail [" . $main_msg . "] successfully");
		
		return "OK";
	}

}
?>