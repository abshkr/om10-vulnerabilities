<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('COMPANYRELATION')) define('COMPANYRELATION','CompanyRelationService.class');

class CompanyRelationService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				crlt.PARENT_CMPY_CODE			as PARENT_CMPY_CODE
				, pcmp.CMPY_NAME				as PARENT_CMPY_NAME
				, pcmp.CMPY_TYPE				as PARENT_CMPY_TYPE
				, crlt.PARENT_CMPY_ROLE			as PARENT_CMPY_ROLE
				, ptyp.COMPANY_NAME				as PARENT_CMPY_ROLENAME
				, crlt.CHILD_CMPY_CODE			as CHILD_CMPY_CODE
				, ccmp.CMPY_NAME				as CHILD_CMPY_NAME
				, ccmp.CMPY_TYPE				as CHILD_CMPY_TYPE
				, crlt.CHILD_CMPY_ROLE			as CHILD_CMPY_ROLE
				, ctyp.COMPANY_NAME				as CHILD_CMPY_ROLENAME
				, crlt.STATUS					as RELATION_STATUS
				, crlt.CREATE_DATE				as RELATION_CREATED
				, crlt.COMMENTS					as RELATION_COMMENTS
			from 
				COMPANY_RELATION		crlt
				, GUI_COMPANYS			pcmp
				, GUI_COMPANYS			ccmp
				, COMPANY_TYP			ptyp
				, COMPANY_TYP			ctyp
			where 
				1 = 1
				and crlt.PARENT_CMPY_CODE = pcmp.CMPY_CODE
				and crlt.CHILD_CMPY_CODE = ccmp.CMPY_CODE
				and crlt.PARENT_CMPY_ROLE = ptyp.COMPANY_ID
				and crlt.CHILD_CMPY_ROLE = ctyp.COMPANY_ID
	";
	
/*
0	SITE_MANAGER
1	SUPPLIER
2	CARRIER
3	CUSTOMER
4	DRAWER
5	ISSUER
6	EMPLOYER
7	HOST	
*/
	
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) CRVIEW ";
			
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
		else $sort="ORDER BY PARENT_CMPY_CODE, PARENT_CMPY_ROLE, CHILD_CMPY_ROLE, CHILD_CMPY_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) CRVIEW ";
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

    public function isCompanyRelationExisted( $pcmpy_code, $pcmpy_role, $ccmpy_code, $ccmpy_role )
	{
		$sql = array();
		$sql['sql_text'] = "
			select * 
			from 
				COMPANY_RELATION 	cr
			where 
				PARENT_CMPY_CODE = :pcmpy
				and PARENT_CMPY_ROLE = :prole
				and CHILD_CMPY_CODE = :ccmpy
				and CHILD_CMPY_ROLE = :crole
		";
		$sql['sql_data'] = array( $pcmpy_code, $pcmpy_role, $ccmpy_code, $ccmpy_role );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }

	public function lookupCompanyRoles($roles="0,1,2,3,4,5,6,7")
	{
		if ( $roles == "" )
		{
			$roles = "0,1,2,3,4,5,6,7";
		}
		
		$sql = array();
        $sql['sql_text'] = "
			SELECT 
				COMPANY_ID 		as CMPY_ROLE_ID
				, COMPANY_NAME	as CMPY_ROLE_NAME
			FROM COMPANY_TYP
			WHERE 
				COMPANY_ID IN (" . $roles . ")
			";
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
    } 

    public function getSiteConfigValue($cfg_code)
	{
        $mydb = DB::getInstance();
        $sql="
			select CONFIG_VALUE from SITE_CONFIG where CONFIG_KEY='". $cfg_code. "' 
			";
        $rows = $mydb->query($sql, "N");
		
		$str = "";
		if ( count( $rows ) > 0 )
		{
			$str = $rows[0]->CONFIG_VALUE;
		}
		
        return $str;
    }

	public function lookupParentCompanyRoles()
	{
		$roles = $this->getSiteConfigValue( "SITE_COMPANY_RELATION_PARENT_ROLES" );
		if ( $roles == "" )
		{
			$roles = "1";
		}
		
		$data = $this->lookupCompanyRoles( $roles );

		return($data);
    } 

	public function lookupChildCompanyRoles()
	{
		$roles = $this->getSiteConfigValue( "SITE_COMPANY_RELATION_CHILD_ROLES" );
		if ( $roles == "" )
		{
			$roles = "2,6";
		}
		
		$data = $this->lookupCompanyRoles( $roles );

		return($data);
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
		$rec_count = $this->isCompanyRelationExisted( $data->parent_cmpy_code, $data->parent_cmpy_role, $data->child_cmpy_code, $data->child_cmpy_role );
		if ( $rec_count > 0 )
		{
			logMe("The company relation exists already therefore no INSERT action!!!",COMPANYRELATION);
			return "ERROR";
		}

		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into COMPANY_RELATION
			( 
				PARENT_CMPY_CODE
				, PARENT_CMPY_ROLE
				, CHILD_CMPY_CODE
				, CHILD_CMPY_ROLE
				, STATUS
				, CREATE_DATE
				, COMMENTS 
			) 
			values 
			( 
				:pcode
				, :prole 
				, :ccode 
				, :crole 
				, :stat
				, SYSDATE
				, :comments
			) 
		";

		$sql['sql_data'] = array( $data->parent_cmpy_code, $data->parent_cmpy_role, $data->child_cmpy_code, $data->child_cmpy_role, $data->relation_status, $data->relation_comments );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the company relation succeeded!!!",COMPANYRELATION);

		// write journal
		$keys = array ("PARENT_CMPY_CODE"=>($data->parent_cmpy_code), "PARENT_CMPY_ROLE"=>($data->parent_cmpy_role), "CHILD_CMPY_CODE"=>($data->child_cmpy_code), "CHILD_CMPY_ROLE"=>($data->child_cmpy_role) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Company Relation", "COMPANY_RELATION", $keys, $excludes );
		//$main_msg = $data->parent_cmpy_code . ", " . $data->parent_cmpy_role . " - " . $data->child_cmpy_code . ", " . $data->child_cmpy_role;
		$main_msg = $data->parent_cmpy_name . ", " . $data->parent_cmpy_rolename . " - " . $data->child_cmpy_name . ", " . $data->child_cmpy_rolename;
		$ins_journal->logOneLine("created a company relation with [" . $main_msg . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
		$data1 = $data->oldobj;
		$data2 = $data->newobj;
		
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update COMPANY_RELATION set 
				PARENT_CMPY_CODE = :pcmpy2
				, PARENT_CMPY_ROLE = :prole2
				, CHILD_CMPY_CODE = :ccmpy2
				, CHILD_CMPY_ROLE = :crole2
				, STATUS = :stat2
				, COMMENTS = :comments2
			where 
				PARENT_CMPY_CODE = :pcmpy1
				and PARENT_CMPY_ROLE = :prole1
				and CHILD_CMPY_CODE = :ccmpy1
				and CHILD_CMPY_ROLE = :crole1
		";
		$sql['sql_data'] = array( $data2->parent_cmpy_code, $data2->parent_cmpy_role, $data2->child_cmpy_code, $data2->child_cmpy_role, 
		$data2->relation_status, $data2->relation_comments, 
		$data1->parent_cmpy_code, $data1->parent_cmpy_role, $data1->child_cmpy_code, $data1->child_cmpy_role );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the company relation succeeded!!!",COMPANYRELATION);
		
		$keys = array ("PARENT_CMPY_CODE"=>($data2->parent_cmpy_code), "PARENT_CMPY_ROLE"=>($data2->parent_cmpy_role), "CHILD_CMPY_CODE"=>($data2->child_cmpy_code), "CHILD_CMPY_ROLE"=>($data2->child_cmpy_role) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Company Relation", "COMPANY_RELATION", $keys, $excludes );
		
		//$old_msg = $data1->parent_cmpy_code . ", " . $data1->parent_cmpy_role . " - " . $data1->child_cmpy_code . ", " . $data1->child_cmpy_role;
		$old_msg = $data1->parent_cmpy_name . ", " . $data1->parent_cmpy_rolename . " - " . $data1->child_cmpy_name . ", " . $data1->child_cmpy_rolename;
		//$new_msg = $data2->parent_cmpy_code . ", " . $data2->parent_cmpy_role . " - " . $data2->child_cmpy_code . ", " . $data2->child_cmpy_role;
		$new_msg = $data2->parent_cmpy_name . ", " . $data2->parent_cmpy_rolename . " - " . $data2->child_cmpy_name . ", " . $data2->child_cmpy_rolename;
		$upd_journal->logOneLine("updated a company relation from [" . $old_msg . "] to [" . $new_msg . "] successfully");
		
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
		$rec_count = $this->isCompanyRelationExisted( $data->parent_cmpy_code, $data->parent_cmpy_role, $data->child_cmpy_code, $data->child_cmpy_role );
		if ( $rec_count == 0 )
		{
			logMe("The company relation does not exist therefore no DELETE action!!!",COMPANYRELATION);
			return "ERROR";
		}

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from COMPANY_RELATION 
			where 
				PARENT_CMPY_CODE = :pcmpy
				and PARENT_CMPY_ROLE = :prole
				and CHILD_CMPY_CODE = :ccmpy
				and CHILD_CMPY_ROLE = :crole
		";
		$sql['sql_data'] = array( $data->parent_cmpy_code, $data->parent_cmpy_role, $data->child_cmpy_code, $data->child_cmpy_role );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the company relation succeeded!!!",COMPANYRELATION);

		// write journal
		$keys = array ("PARENT_CMPY_CODE"=>($data->parent_cmpy_code), "PARENT_CMPY_ROLE"=>($data->parent_cmpy_role), "CHILD_CMPY_CODE"=>($data->child_cmpy_code), "CHILD_CMPY_ROLE"=>($data->child_cmpy_role) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Company Relation", "COMPANY_RELATION", $keys, $excludes );
		//$main_msg = $data->parent_cmpy_code . ", " . $data->parent_cmpy_role . " - " . $data->child_cmpy_code . ", " . $data->child_cmpy_role;
		$main_msg = $data->parent_cmpy_name . ", " . $data->parent_cmpy_rolename . " - " . $data->child_cmpy_name . ", " . $data->child_cmpy_rolename;
		$del_journal->logOneLine("deleted a company relation with [" . $main_msg . "] successfully");
		
		return "OK";
	}
	
}
?>