<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('AUDITING')) define('AUDITING','AuditingService.class');

class AuditingService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				au.AU_RECORD_KEY			as AUDIT_RECORD_KEY
				, au.AU_ACTION				as AUDIT_ACTION_ID
				, aa.AUDIT_ACTION_NAME		as AUDIT_ACTION_NAME
				, au.AU_DATE				as AUDIT_DATETIME
				, au.AU_CATEGORY			as AUDIT_CATEGORY_ID
				, ac.AC_CATEGORY_DESC		as AUDIT_CATEGORY_NAME
				, au.AU_BATCH_KEY			as AUDIT_BATCH_KEY
				, au.AU_TABLE_ACC_SEQ		as AUDIT_TABLE_ACC_SEQ
				, au.AU_TABLE_ACC_TIME		as AUDIT_TABLE_ACC_TIME
				, au.AU_TABLE_NAME			as AUDIT_TABLE
				, NVL(tcd.TCD_COLUMN_DESC, au.AU_COLUMN_NAME)			as AUDIT_COLUMN
				, au.AU_PKEYS				as AUDIT_PKEYS
				, au.AU_DESCRIPTION			as AUDIT_DESCRIPTION
				, au.AU_BEFORE_DESC				as AUDIT_VALUE_BEFORE
				, au.AU_AFTER_DESC				as AUDIT_VALUE_AFTER
-- 				, NVL(tcv1.TCVD_KEY_VAL_DESC, au.AU_BEFORE) 	as AUDIT_VALUE_BEFORE
-- 				, NVL(tcv2.TCVD_KEY_VAL_DESC, au.AU_AFTER) 	as AUDIT_VALUE_AFTER
				, au.AU_PER_CODE			as AUDIT_USER_CODE
				, NVL(au.AU_PER_NAME, pr.PER_NAME)			as AUDIT_USER_NAME
				, au.AU_PER_CMPY			as AUDIT_CMPY_CODE
				, NVL(au.AU_PER_CMPY_NAME, cp.CMPY_NAME)		as AUDIT_CMPY_NAME
				, au.AU_IP					as AUDIT_IP
				, au.AU_SESSION_ID			as AUDIT_SESSION_ID
				, au.AU_OSUSER				as AUDIT_OSUSER
				, au.AU_MACHINE				as AUDIT_MACHINE
				, au.AU_PROGRAM				as AUDIT_PROGRAM
			from 
				ACTIONS_FOR_AUDIT		au
				, GUI_COMPANYS			cp
				, (
					select 1 as AUDIT_ACTION_ID, 'INS' as AUDIT_ACTION_CODE, 'Add' as AUDIT_ACTION_NAME from DUAL
					union 
					select 2 as AUDIT_ACTION_ID, 'UPD' as AUDIT_ACTION_CODE, 'Modify' as AUDIT_ACTION_NAME from DUAL
					union 
					select 3 as AUDIT_ACTION_ID, 'DEL' as AUDIT_ACTION_CODE, 'Delete' as AUDIT_ACTION_NAME from DUAL
				)						aa
				, AUDIT_CATEGORY		ac
				, PERSONNEL				pr
				, TABLE_COLUMN_DESC		tcd
-- 				
-- 				, TABLE_COLUMN_VAL_DESC	tcv1
-- 				, TABLE_COLUMN_VAL_DESC	tcv2
			where 
				1 = 1
				and au.AU_ACTION = aa.AUDIT_ACTION_ID(+)
				and au.AU_CATEGORY = ac.AC_CATEGORY_ID(+)
				and au.AU_PER_CMPY = cp.CMPY_CODE(+)
				and au.AU_PER_CODE = pr.PER_CODE(+)
				and au.AU_TABLE_NAME = tcd.TCD_TABLE_NAME(+)
				and au.AU_COLUMN_NAME = tcd.TCD_COLUMN_NAME(+)
				and (tcd.TCD_LANG=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND tcd.TCD_LANG = 'ENG'))
-- 				
-- 				and au.AU_TABLE_NAME = tcv1.TCVD_TABLE_NAME(+)
-- 				and au.AU_COLUMN_NAME = tcv1.TCVD_COLUMN_NAME(+)
-- 				and au.AU_BEFORE = tcv1.TCVD_KEY_VAL(+)
-- 				and (tcv1.TCVD_LANG=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND tcv1.TCVD_LANG = 'ENG'))
-- 				and au.AU_TABLE_NAME = tcv2.TCVD_TABLE_NAME(+)
-- 				and au.AU_COLUMN_NAME = tcv2.TCVD_COLUMN_NAME(+)
-- 				and au.AU_AFTER = tcv2.TCVD_KEY_VAL(+)
-- 				and (tcv2.TCVD_LANG=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND tcv2.TCVD_LANG = 'ENG'))
	";
	
	public function __construct()
	{
		session_start();
		
	}

	public function lookupAuditActionList()
	{
        $sql="
			select 1 as AUDIT_ACTION_ID, 'INS' as AUDIT_ACTION_CODE, 'Add' as AUDIT_ACTION_NAME from DUAL
			union 
			select 2 as AUDIT_ACTION_ID, 'UPD' as AUDIT_ACTION_CODE, 'Modify' as AUDIT_ACTION_NAME from DUAL
			union 
			select 3 as AUDIT_ACTION_ID, 'DEL' as AUDIT_ACTION_CODE, 'Delete' as AUDIT_ACTION_NAME from DUAL
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);
		//$data = $mydb->retrieveArray($sql);

		return($data);
	}

	public function lookupAuditCategoryList()
	{
        $sql="select AC_CATEGORY_ID as AUDIT_CATEGORY_ID,   AC_CATEGORY_DESC as AUDIT_CATEGORY_NAME from AUDIT_CATEGORY order by AC_CATEGORY_ID";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);
		//$data = $mydb->retrieveArray($sql);

		return($data);
	}
	
    public function lookupAuditPersonnel($employer="-1", $role=-1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				p.PER_CODE as PSNL_CODE
				, p.PER_NAME as PSNL_NAME
				, p.PER_AUTH as PSNL_ROLE
				, p.PER_CMPY as PSNL_CMPY_CODE
				, c.CMPY_NAME as PSNL_CMPY_NAME
				, p.PER_DEPARTMENT as PSNL_DEPT 
			from 
				PERSONNEL 		p
				, COMPANYS		c
			where 
				('-1'=:employer or p.PER_CMPY=:employer) 
				and (-1=:role or p.PER_AUTH=:role) 
				and p.PER_CMPY=c.CMPY_CODE
			order by p.PER_CODE asc
			";
		$sql['sql_data'] = array( $employer, $role );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
    }
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) ADDRVIEW ";
			
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
		else $sort="ORDER BY AUDIT_DATETIME DESC";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) ADDRVIEW ";
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
    
	public function isAuditRecordKeyUsed( $key )
	{
		
        return 0;
	}
    
	public function getNextAuditRecordKey( )
	{
		
        return 0;
	}
    
	public function create( $data )
	{
		
        return "OK";
	}
    
	public function update( $data )
	{
		
        return "OK";
	}
    
	public function delete( $data )
	{
		
        return "OK";
	}

}
?>