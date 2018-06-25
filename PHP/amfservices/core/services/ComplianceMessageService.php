<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('COMPLIANCEMESSAGE')) define('COMPLIANCEMESSAGE','ComplianceMessageService.class');

class ComplianceMessageService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				cm.CM_MSG_ID					as CM_MESSAGE_CODE
				, cm.CM_MSG_NAME				as CM_MESSAGE_NAME
				, cm.CM_MSG_ID||' - '||cm.CM_MSG_NAME								as CM_MESSAGE_DESC
				, cm.CM_REQ_WHOLE_LD			as CM_MESSAGE_FOR_LOAD
				, cm.CM_MSG						as CM_MESSAGE_TEXT
				, cm.CM_LOCALE					as CM_MESSAGE_LOCALE
				, cl.LOCALE_NAME				as CM_MESSAGE_LOCALE_NAME
			from 
				COMPLIANCE_MSG				cm
				, LOCALE_LANGUAGES cl
			where 
				1 = 1
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) CMVIEW ";
			
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
		else $sort="ORDER BY CM_MESSAGE_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) CMVIEW ";
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

    public function isComplianceMessageExisted( $msg_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from COMPLIANCE_MSG where CM_MSG_ID=:msg_code ";
		$sql['sql_data'] = array( $msg_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isComplianceMessageUsed( $msg_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from COMPLIANCE_PRODGROUP_2_MSG where CPM_MSG_ID=:msg_code ";
		$sql['sql_data'] = array( $msg_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

   
   public function lookupComplianceMessageLocale()
   {
        $sql="
		select * from LOCALE_LANGUAGES order by LOCALE_ID	
		";
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}




	public function create( $data )
	{
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into COMPLIANCE_MSG
			( 
				CM_MSG_ID
				, CM_MSG_NAME
				, CM_REQ_WHOLE_LD 
				, CM_MSG 
				, CM_LOCALE 
			) 
			values 
			( 
				:cm_message_code
				, :cm_message_name
				, :cm_message_for_load 
				, :cm_message_text 
				, :cm_message_locale 
			) 
		";
		$sql['sql_data'] = array( $data->cm_message_code, $data->cm_message_name, $data->cm_message_for_load, $data->cm_message_text, $data->cm_message_locale );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the compliance message succeeded!!!",COMPLIANCEMESSAGE);

		// write journal
		$keys = array ("CM_MSG_ID"=>($data->cm_message_code) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Compliance Message", "COMPLIANCE_MSG", $keys, $excludes );
		$ins_journal->logOneLine("created a compliance message [" . $data->cm_message_code . ":" . $data->cm_message_name . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update COMPLIANCE_MSG set 
				CM_MSG_NAME = :cm_message_name 
				, CM_REQ_WHOLE_LD = :cm_message_for_load
				, CM_MSG = :cm_message_text
				, CM_LOCALE = :cm_message_locale 
			where 
				CM_MSG_ID = :cm_message_code
		";
		$sql['sql_data'] = array( $data->cm_message_name, $data->cm_message_for_load, $data->cm_message_text, $data->cm_message_locale, $data->cm_message_code );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the compliance message succeeded!!!",COMPLIANCEMESSAGE);
		
		$keys = array ("CM_MSG_ID"=>($data->cm_message_code) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Compliance Message", "COMPLIANCE_MSG", $keys, $excludes );
		$upd_journal->logOneLine("updated a compliance message [" . $data->cm_message_code . ":" . $data->cm_message_name . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
		$rec_count = $this->isComplianceMessageUsed( $data->cm_message_code );
		if ( $rec_count > 0 )
		{
			logMe("The Compliance Message is still used therefore no DELETE action!!!",COMPLIANCEMESSAGE);
			return "ERROR";
		}
		
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from COMPLIANCE_MSG 
			where 
				CM_MSG_ID = :cm_message_code
		";
		$sql['sql_data'] = array( $data->cm_message_code );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the compliance message succeeded!!!",COMPLIANCEMESSAGE);

		// write journal
		$keys = array ("CM_MSG_ID"=>($data->cm_message_code) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Compliance Message", "COMPLIANCE_MSG", $keys, $excludes );
		$del_journal->logOneLine("deleted a compliance message [" . $data->cm_message_code . ":" . $data->cm_message_name . "] successfully");
		
		return "OK";
	}
	
}
?>