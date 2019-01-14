<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DOCUMENTTEMPLATE')) define('DOCUMENTTEMPLATE','DocumentTemplateService.class');

class DocumentTemplateService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				ct.CMPY_CODE				as TEMPLATE_CMPY_CODE
				, ct.CMPY_NAME				as TEMPLATE_CMPY_NAME
				, ct.CMPY_TYPE				as TEMPLATE_CMPY_TYPE
				, ct.CMPY_REPORT_RECEIVERS	as TEMPLATE_CMPY_EMAIL_DEF
				, ct.TEMPLATE_CODE			as TEMPLATE_CODE
				, ct.TEMPLATE_NAME			as TEMPLATE_NAME
				, ct.TEMPLATE_TYPE			as TEMPLATE_TYPE_ID
				, tt.TEMPLATE_TYPE_NAME		as TEMPLATE_TYPE
				, ct.FILE_NAME				as TEMPLATE_FILE
				, ct.LOCALE					as TEMPLATE_LOCALE
				, tl.LOCALE_NAME			as TEMPLATE_LOCALE_NAME
				, ct.DESCRIPTION			as TEMPLATE_NOTE
				, NVL(tc.TEMPLATE_IDENTIFIER, ct.TEMPLATE_CODE)					as TEMPLATE_IDENTIFIER
				, NVL(tc.DEFAULT_FLAG, 'N')					as TEMPLATE_CMPY_FLAG
				, NVL(tc.STATUS, 0)							as TEMPLATE_CMPY_STATUS
				, NVL(tc.EMAIL, ct.CMPY_REPORT_RECEIVERS)	as TEMPLATE_CMPY_EMAIL
				, NVL(tc.COPIES, 3)							as TEMPLATE_CMPY_COPIES
				, NVL(tc.FOOTERS, decode(ct.TEMPLATE_TYPE, 1, 'Driver;Terminal;Customer', 'Processing;Driver Copy;Customer Copy') )				as TEMPLATE_CMPY_FOOTERS
				, (tc.WARNING_PERCENT)						as TEMPLATE_WARN_PERCENT
				, (tc.WARNING_QTY)							as TEMPLATE_WARN_QTY
				, NVL(tc.SEND_TO_PRINTER, 'Y')				as TEMPLATE_PRINT_FLAG
			from
				TEMPLATE_N_CMPY tc
				, (
					select 
						cmp.CMPY_CODE				
						, cmp.CMPY_NAME				
						, cmp.CMPY_TYPE				
						, cmp.CMPY_REPORT_RECEIVERS	
						, bdt.TEMPLATE_CODE			
						, bdt.TEMPLATE_NAME			
						, bdt.TEMPLATE_TYPE			
						, bdt.FILE_NAME				
						, bdt.LOCALE					
						, bdt.DESCRIPTION			
					from 
						GUI_COMPANYS cmp
						, BOL_DN_TEMPLATE bdt 
					where 
						cmp.SUPPLIER='Y' or cmp.DRAWER='Y'
				) ct 
				, (
					select 
						1 			as TEMPLATE_TYPE_ID
						, 'BOL' 	as TEMPLATE_TYPE_CODE
						, MESSAGE 	as TEMPLATE_TYPE_NAME 
					from 
						MSG_LOOKUP 
					where 
						MSG_ID=49 
						and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
					union 
					select 
						2 			as TEMPLATE_TYPE_ID
						, 'DN' 	as TEMPLATE_TYPE_CODE
						, MESSAGE 	as TEMPLATE_TYPE_NAME 
					from 
						MSG_LOOKUP 
					where 
						MSG_ID=1091 
						and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
					union 
					select 
						3 			as TEMPLATE_TYPE_ID
						, 'BOUL' 	as TEMPLATE_TYPE_CODE
						, MESSAGE 	as TEMPLATE_TYPE_NAME 
					from 
						MSG_LOOKUP 
					where 
						MSG_ID=1233 
						and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
					union 
					select 
						4 			as TEMPLATE_TYPE_ID
						, 'BOL_LPG' 	as TEMPLATE_TYPE_CODE
						, 'LPG '||MESSAGE 	as TEMPLATE_TYPE_NAME 
					from 
						MSG_LOOKUP 
					where 
						MSG_ID=49 
						and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
				) tt
				, LOCALE_LANGUAGES tl
			where 
				ct.CMPY_CODE = tc.CMPY_CODE(+) 
				and ct.TEMPLATE_CODE = tc.TEMPLATE_CODE(+) 
				and ct.TEMPLATE_TYPE = tc.TEMPLATE_TYPE(+) 
				and ct.TEMPLATE_TYPE = tt.TEMPLATE_TYPE_ID
				and ct.LOCALE = tl.LOCALE_CODE
	";
	var $myview2="
			select 
				bdt.TEMPLATE_CODE			as TEMPLATE_CODE
				, bdt.TEMPLATE_NAME			as TEMPLATE_NAME
				, bdt.TEMPLATE_TYPE			as TEMPLATE_TYPE
				, bdt.FILE_NAME				as TEMPLATE_FILE
				, bdt.LOCALE					as TEMPLATE_LOCALE
				, bdt.DESCRIPTION			as TEMPLATE_NOTE
				, tnc.CMPY_CODE				as TEMPLATE_CMPY_CODE
				, cmp.CMPY_NAME				as TEMPLATE_CMPY_NAME
				, tnc.DEFAULT_FLAG			as TEMPLATE_CMPY_FLAG
				, NVL(tnc.EMAIL, cmp.CMPY_REPORT_RECEIVERS)					as TEMPLATE_CMPY_EMAIL
				, tnc.COPIES				as TEMPLATE_CMPY_COPIES
				, tnc.FOOTERS				as TEMPLATE_CMPY_FOOTERS
			from 
				BOL_DN_TEMPLATE 			bdt
				, TEMPLATE_N_CMPY 			tnc
				, COMPANYS 					cmp
			where 
				cmp.CMPY_CODE = tnc.CMPY_CODE
				and tnc.TEMPLATE_CODE = bdt.TEMPLATE_CODE
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) DTVIEW ";
			
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
		else $sort="ORDER BY TEMPLATE_CMPY_CODE, TEMPLATE_TYPE, TEMPLATE_IDENTIFIER";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) DTVIEW ";
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

    public function getCompanyTemplate( $cmpy_code, $locale_code="-1", $type_id=-1, $temp_id="-1", $temp_name="-1" )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from  ( " . $this->myview . " ) DTVIEW 
			where 
				TEMPLATE_CMPY_CODE=:cmpy_code 
				and ( '-1'=:locale_code or TEMPLATE_LOCALE=:locale_code )
				and ( -1=:type_id or TEMPLATE_TYPE_ID=:type_id )
				and ( '-1'=:temp_id or (upper(TEMPLATE_IDENTIFIER) like '%'||upper(:temp_id)||'%') )
				and ( '-1'=:temp_name or (upper(TEMPLATE_NAME) like '%'||upper(:temp_name)||'%') )
		";
		$sql['sql_data'] = array( $cmpy_code, $locale_code, $type_id, $temp_id, $temp_name );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
   }

   
   public function lookupTemplateType()
   {
        $sql="
			select 
				1 			as TEMPLATE_TYPE_ID
				, 'BOL' 	as TEMPLATE_TYPE_CODE
				, MESSAGE 	as TEMPLATE_TYPE_NAME 
			from 
				MSG_LOOKUP 
			where 
				MSG_ID=49 
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
			union 
			select 
				2 			as TEMPLATE_TYPE_ID
				, 'DN' 	as TEMPLATE_TYPE_CODE
				, MESSAGE 	as TEMPLATE_TYPE_NAME 
			from 
				MSG_LOOKUP 
			where 
				MSG_ID=1091 
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
			union 
			select 
				3 			as TEMPLATE_TYPE_ID
				, 'BOUL' 	as TEMPLATE_TYPE_CODE
				, MESSAGE 	as TEMPLATE_TYPE_NAME 
			from 
				MSG_LOOKUP 
			where 
				MSG_ID=1233 
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
			union 
			select 
				4 			as TEMPLATE_TYPE_ID
				, 'BOL_LPG' 	as TEMPLATE_TYPE_CODE
				, 'LPG '||MESSAGE 	as TEMPLATE_TYPE_NAME 
			from 
				MSG_LOOKUP 
			where 
				MSG_ID=49 
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
		";
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

   
   public function lookupTemplateLocale()
   {
        $sql="
		select * from LOCALE_LANGUAGES order by LOCALE_ID	
		";
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

	
    public function isTemplateCompanyExisted( $temp, $cmpy )
	{
		$sql = array();
        $sql['sql_text'] = "select * from TEMPLATE_N_CMPY where TEMPLATE_CODE = :template_code and CMPY_CODE = :template_cmpy_code ";
		$sql['sql_data'] = array( $temp, $cmpy );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }
	
    public function isTemplateCompanyTypeIdentifierExisted( $cmpy, $type, $id )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * 
			from TEMPLATE_N_CMPY 
			where 
				CMPY_CODE = :template_cmpy_code 
				and TEMPLATE_TYPE = :template_type 
				and TEMPLATE_IDENTIFIER = :template_id 
		";
		
		$sql['sql_data'] = array( $cmpy, $type, $id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }
  
    
	public function create( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into TEMPLATE_N_CMPY
			( 
				TEMPLATE_CODE
				, CMPY_CODE
				, DEFAULT_FLAG
				, STATUS
				, EMAIL
				, COPIES
				, FOOTERS
				, TEMPLATE_TYPE
				, TEMPLATE_IDENTIFIER				
				, WARNING_PERCENT
				, WARNING_QTY
				, SEND_TO_PRINTER
			) 
			values 
			( 
				:template_code
				, :template_cmpy_code
				, :template_cmpy_flag
				, :template_cmpy_status
				, :template_cmpy_email
				, :template_cmpy_copies
				, :template_cmpy_footers
				, :template_type_id
				, :template_identifier				
				, :template_warn_percent
				, :template_warn_qty
				, :template_print_flag
			) 
		";
		$sql['sql_data'] = array( 
			$data->template_code, $data->template_cmpy_code, 
			$data->template_cmpy_flag, $data->template_cmpy_status, $data->template_cmpy_email, $data->template_cmpy_copies, $data->template_cmpy_footers,    
			$data->template_type_id, $data->template_identifier, $data->template_warn_percent, $data->template_warn_qty, $data->template_print_flag 
			);
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the Template Company succeeded!!!",DOCUMENTTEMPLATE);

		// write journal
		$keys = array ("TEMPLATE_CODE"=>($data->template_code), "CMPY_CODE"=>($data->template_cmpy_code));
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Template Company", "TEMPLATE_N_CMPY", $keys, $excludes );
		$ins_journal->logOneLine("created a template company link [" . $data->template_code . ", " . $data->template_cmpy_code . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update TEMPLATE_N_CMPY set 
				DEFAULT_FLAG = :template_cmpy_flag 
				, STATUS = :template_cmpy_status
				, EMAIL = :template_cmpy_email
				, COPIES = :template_cmpy_copies 
				, FOOTERS = :template_cmpy_footers 
				, TEMPLATE_TYPE = :template_type_id
				, TEMPLATE_IDENTIFIER = :template_identifier 
				, WARNING_PERCENT = :template_warn_percent
				, WARNING_QTY = :template_warn_qty
				, SEND_TO_PRINTER = :template_print_flag
			where 
				TEMPLATE_CODE = :template_code
				and CMPY_CODE = :template_cmpy_code 
		";
		$sql['sql_data'] = array( 
			$data->template_cmpy_flag, $data->template_cmpy_status, $data->template_cmpy_email, $data->template_cmpy_copies, $data->template_cmpy_footers,    
			$data->template_type_id, $data->template_identifier, $data->template_warn_percent, $data->template_warn_qty, $data->template_print_flag,    
			$data->template_code, $data->template_cmpy_code 
			);
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the template company succeeded!!!",DOCUMENTTEMPLATE);
		
		$keys = array ("TEMPLATE_CODE"=>($data->template_code), "CMPY_CODE"=>($data->template_cmpy_code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Template Company", "TEMPLATE_N_CMPY", $keys, $excludes );
		$upd_journal->logOneLine("updated a template company link [" . $data->template_code . ", " . $data->template_cmpy_code . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from TEMPLATE_N_CMPY 
			where 
				TEMPLATE_CODE = :template_code
				and CMPY_CODE = :template_cmpy_code 
		";
		$sql['sql_data'] = array( $data->template_code, $data->template_cmpy_code );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the template company succeeded!!!",DOCUMENTTEMPLATE);

		// write journal
		$keys = array ("TEMPLATE_CODE"=>($data->template_code), "CMPY_CODE"=>($data->template_cmpy_code));
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Template Company", "TEMPLATE_N_CMPY", $keys, $excludes );
		$del_journal->logOneLine("deleted a template company link [" . $data->template_code . ", " . $data->template_cmpy_code . "] successfully");
		
		return "OK";
	}
    
	public function updateDocumentTemplate( $data )
	{
		$succ_count = 0;
		$fail_count = 0;
		foreach( $data as $key=>$item )
		{
			// check if the link exists
			$existed = $this->isTemplateCompanyExisted( $item->template_code, $item->template_cmpy_code );
			if ( $existed > 0 )
			{	// template company link exists, then either update or delete
				if ( $item->template_cmpy_status > 0 )
				{	// do update
					$res = $this->update( $item );
					if ( $res == "OK" )
					{
						$succ_count += 1;
					}
					else
					{
						$fail_count += 1;
					}
				}
				else
				{	// do delete
					$res = $this->delete( $item );
					if ( $res == "OK" )
					{
						$succ_count += 1;
					}
					else
					{
						$fail_count += 1;
					}
				}
			}
			else
			{	// template company link does not exist, then either insert or do nothing
				if ( $item->template_cmpy_status > 0 )
				{	// do insert
					$res = $this->create( $item );
					if ( $res == "OK" )
					{
						$succ_count += 1;
					}
					else
					{
						$fail_count += 1;
					}
				}
				else
				{	// do nothing
				}
			}
		}
		
		if ( $fail_count > 0 )
		{
			return "ERROR";
		}
		
		return "OK";
	}
    
	
}
?>