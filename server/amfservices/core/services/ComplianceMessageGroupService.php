<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('COMPLIANCEMESSAGEGROUP')) define('COMPLIANCEMESSAGEGROUP','ComplianceMessageGroupService.class');

class ComplianceMessageGroupService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
			    pg.PGR_CODE						as CPM_GROUP_CODE
				, pg.PGR_DESCRIPTION			as CPM_GROUP_NAME
				, PGR_CODE||' - '||PGR_DESCRIPTION									as CPM_GROUP_DESC
				, cm.CM_MSG_ID					as CPM_MESSAGE_CODE
				, cm.CM_MSG_NAME				as CPM_MESSAGE_NAME
				, cm.CM_MSG_ID||' - '||cm.CM_MSG_NAME								as CPM_MESSAGE_DESC
				, cm.CM_REQ_WHOLE_LD			as CPM_MESSAGE_FOR_LOAD
				, cm.CM_MSG						as CPM_MESSAGE_TEXT
				, cm.CM_LOCALE					as CPM_MESSAGE_LOCALE
				, cl.LOCALE_NAME				as CPM_MESSAGE_LOCALE_NAME
			from 
				COMPLIANCE_PRODGROUP_2_MSG		gm
				, PRODUCT_GROUP					pg
				, COMPLIANCE_MSG				cm
				, (
					select 'zh_CN' as LOCALE_CODE, 'Chinese - China' as LOCALE_NAME from dual
					union 
					select 'zh_HK' as LOCALE_CODE, 'Chinese - Hong Kong' as LOCALE_NAME from dual
					union 
					select 'zh_SG' as LOCALE_CODE, 'Chinese - Singapore' as LOCALE_NAME from dual
					union 
					select 'zh_TW' as LOCALE_CODE, 'Chinese - Taiwan' as LOCALE_NAME from dual
					union 
					select 'en_AU' as LOCALE_CODE, 'English - Australia' as LOCALE_NAME from dual
					union 
					select 'en_GB' as LOCALE_CODE, 'English - United Kingdom' as LOCALE_NAME from dual
					union 
					select 'en_US' as LOCALE_CODE, 'English - United States' as LOCALE_NAME from dual
					union 
					select 'fr_FR' as LOCALE_CODE, 'French - France' as LOCALE_NAME from dual
					union 
					select 'de_DE' as LOCALE_CODE, 'German - Germany' as LOCALE_NAME from dual
					union 
					select 'hi_IN' as LOCALE_CODE, 'Hindi - India' as LOCALE_NAME from dual
					union 
					select 'it_IT' as LOCALE_CODE, 'Italian - Italy' as LOCALE_NAME from dual
					union 
					select 'ja_JP' as LOCALE_CODE, 'Japanese - Japan' as LOCALE_NAME from dual
					union 
					select 'ms_BN' as LOCALE_CODE, 'Malay - Brunei' as LOCALE_NAME from dual
					union 
					select 'ms_MY' as LOCALE_CODE, 'Malay - Malaysia' as LOCALE_NAME from dual
					union 
					select 'es_ES' as LOCALE_CODE, 'Spanish - Spain' as LOCALE_NAME from dual
					union 
					select 'th_TH' as LOCALE_CODE, 'Thai - Thailand' as LOCALE_NAME from dual
					union 
					select 'vi_VN' as LOCALE_CODE, 'Vietnamese - Vietnam' as LOCALE_NAME from dual
				) cl
			where 
				1 = 1
				and gm.CPM_PGR_CODE = pg.PGR_CODE
				and gm.CPM_MSG_ID = cm.CM_MSG_ID
				and cm.CM_LOCALE = cl.LOCALE_CODE(+)
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) CPMVIEW ";
			
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
		else $sort="ORDER BY CPM_GROUP_CODE, CPM_MESSAGE_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) CPMVIEW ";
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

    public function isComplianceMessageGroupExisted( $grp_code, $msg_code )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from COMPLIANCE_PRODGROUP_2_MSG 
			where 
				CPM_PGR_CODE = :grp_code
				and CPM_MSG_ID = :msg_code
		";
		
		$sql['sql_data'] = array( $grp_code, $msg_code );
		
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
		$rec_count = $this->isComplianceMessageGroupExisted( $data->cpm_group_code, $data->cpm_message_code );
		if ( $rec_count > 0 )
		{
			logMe("The Compliance Message Group exists already therefore no INSERT action!!!",COMPLIANCEMESSAGEGROUP);
			return "ERROR";
		}

		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into COMPLIANCE_PRODGROUP_2_MSG
			( 
				CPM_PGR_CODE
				, CPM_MSG_ID
			) 
			values 
			( 
				:grp_code
				, :msg_code 
			) 
		";

		$sql['sql_data'] = array( $data->cpm_group_code, $data->cpm_message_code );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the Compliance Message Group succeeded!!!",COMPLIANCEMESSAGEGROUP);

		// write journal
		$keys = array ("CPM_PGR_CODE"=>($data->cpm_group_code), "CPM_MSG_ID"=>($data->cpm_message_code) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Compliance Message Group", "COMPLIANCE_PRODGROUP_2_MSG", $keys, $excludes );
		$ins_journal->logOneLine("created a Compliance Message Group with [" . $data->cpm_group_code . ", " . $data->cpm_message_code . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
		$data1 = $data->oldobj;
		$data2 = $data->newobj;
		
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update COMPLIANCE_PRODGROUP_2_MSG set 
				CPM_PGR_CODE = :grp_code2
				, CPM_MSG_ID = :msg_code2
			where 
				CPM_PGR_CODE = :grp_code
				and CPM_MSG_ID = :msg_code
		";
		$sql['sql_data'] = array( $data2->cpm_group_code, $data2->cpm_message_code,  $data1->cpm_group_code, $data1->cpm_message_code );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the Compliance Message Group succeeded!!!",COMPLIANCEMESSAGEGROUP);
		
		$keys = array ("CPM_PGR_CODE"=>($data2->cpm_group_code), "CPM_MSG_ID"=>($data2->cpm_message_code) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Compliance Message Group", "COMPLIANCE_PRODGROUP_2_MSG", $keys, $excludes );
		$upd_journal->logOneLine("updated a Compliance Message Group from [" . $data1->cpm_group_code . ", " . $data1->cpm_message_code . "] to [" . $data2->cpm_group_code . ", " . $data2->cpm_message_code . "] successfully");
		
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
		$rec_count = $this->isComplianceMessageGroupExisted( $data->cpm_group_code, $data->cpm_message_code );
		if ( $rec_count == 0 )
		{
			logMe("The Compliance Message Group does not exist therefore no DELETE action!!!",COMPLIANCEMESSAGEGROUP);
			return "ERROR";
		}

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from COMPLIANCE_PRODGROUP_2_MSG 
			where 
				CPM_PGR_CODE = :grp_code
				and CPM_MSG_ID = :msg_code
		";
		$sql['sql_data'] = array( $data->cpm_group_code, $data->cpm_message_code );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the Compliance Message Group succeeded!!!",COMPLIANCEMESSAGEGROUP);

		// write journal
		$keys = array ("CPM_PGR_CODE"=>($data->cpm_group_code), "CPM_MSG_ID"=>($data->cpm_message_code) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Compliance Message Group", "COMPLIANCE_PRODGROUP_2_MSG", $keys, $excludes );
		$del_journal->logOneLine("deleted a Compliance Message Group with [" . $data->cpm_group_code . ", " . $data->cpm_message_code . "] successfully");
		
		return "OK";
	}
	
}
?>