<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('GATEPERMISSION')) define('GATEPERMISSION','GatePermissionService.class');

class GatePermissionService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				pr.PRMSSN_K							as PRMSSN_ID
				, pr.PRMSSN_NAME					as PRMSSN_NAME
				, pr.PRMSSN_CASE					as PRMSSN_CASE
				, pr.PRMSSN_AUTH					as PRMSSN_AUTH
				, pr.PRMSSN_ETYP					as PRMSSN_ETYP
				, NVL(pr.PRMSSN_EXPIRY_CHECK,0)		as PRMSSN_EXPIRY_CHECK
				, gr.GATE_K							as PRMSSN_GATE
				, gr.G_TCD							as PRMSSN_GATETCD
				, ar.AREA_K							as PRMSSN_AREAID
				, ar.AREA_NAME						as PRMSSN_AREANAME
				, ad.ADV_CODE						as PRMSSN_ADV_CODE
				, ad.ADV_DEVICE             		as PRMSSN_ADV_DEVICE
				, ad.ADV_PORT               		as PRMSSN_ADV_PORT
				, ad.ADV_LOCKOUT            		as PRMSSN_ADV_LOCKOUT
				, ad.ADV_PIN_PASS           		as PRMSSN_ADV_PIN_PASS
			from 
				PRMSSN_RC				pr
				, GATE_RC				gr
				, AREA_RC				ar
				, ACCDEV				ad
			where
				pr.PRMSSN_GATE = gr.GATE_K
				and gr.GATE_AREA = ar.AREA_K
				and gr.GATE_DVCE = ad.ADV_CODE
	";
	
	
	public function __construct()
	{
		session_start();
		
		//$this->checkExpiryColumns();
		
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
            $this->cgi = CGIDIR . "access_ctrl/gate_perm.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/access_ctrl/gate_perm.cgi";
        }
		
		
	}
	
	public function checkExpiryColumns()
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "select * from USER_TAB_COLS where TABLE_NAME=:tbl_name and COLUMN_NAME=:cln_name ";
		
		// get the total number of the records
		$sql['sql_data'] = array( "PRMSSN_RC", "PRMSSN_EXPIRY_CHECK" );
		$count1 = $mydb->count( $sql );
		$sql['sql_data'] = array( "PRMT_RC", "PRMT_EXPIRY_CHECK" );
		$count2 = $mydb->count( $sql );
		
		// add new column if it does not exist
		if ( $count1 == 0 )
		{
			$sql1 = "ALTER TABLE PRMSSN_RC ADD PRMSSN_EXPIRY_CHECK NUMBER(1)";
			$mydb->insert($sql1);
		}
		if ( $count2 == 0 )
		{
			$sql2 = "ALTER TABLE PRMT_RC ADD PRMT_EXPIRY_CHECK NUMBER(1)";
			$mydb->insert($sql2);
		}
		
		return "OK";
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) GPVIEW ";
			
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
		else $sort="ORDER BY PRMSSN_ID";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) GPVIEW ";
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
         
    public function getGatePermissionRules( $prmssn_id )
	{
		$pmsg = $this->lookupGatePermissionDefaultType();
		
		$def_eqpt="Default Equip";
		$any_eqpt="Equip";
		$def_psnl="Default Personnel";
		$any_psnl="Personnel";
		$any_text="ANY";
		
		foreach( $pmsg as $row )
		{
			if ( $row['msg_id'] == 1900 )
			{
				$any_text = $row['message'];
			}
			if ( $row['msg_id'] == 3035 )
			{
				$def_eqpt = $row['message'];
			}
			if ( $row['msg_id'] == 3036 )
			{
				$any_eqpt = $row['message'];
			}
			if ( $row['msg_id'] == 3037 )
			{
				$def_psnl = $row['message'];
			}
			if ( $row['msg_id'] == 3038 )
			{
				$any_psnl = $row['message'];
			}
		}
		
		$sql = array();
        $sql['sql_text'] = "
			select *
			from
			(
			(
			select
				pr.PRMSSN_K					as RULE_ID
				, pr.PRMSSN_CASE			as RULE_CASE
				, DECODE( 
					pr.PRMSSN_CASE,	
					'DEFAULT_EQUIP', 		'$def_eqpt',
					'PRM_EQPT',				'$any_eqpt',
					'DEFAULT_PERSONNEL',	'$def_psnl',
					'PRM_PRSSNL',			'$any_psnl'
				)							as RULE_CASENAME
				, DECODE(
					pr.PRMSSN_CASE,
					'DEFAULT_EQUIP', 		-999,
					pr.PRMSSN_ETYP
				)							as RULE_ETYP
				, DECODE(
					pr.PRMSSN_CASE,
					'DEFAULT_EQUIP', 		'$any_text',
					et.ETYP_TITLE
				)							as RULE_ETYPNAME
				, pr.PRMSSN_AUTH			as RULE_AUTH
				, DECODE(
					pr.PRMSSN_CASE,
					'DEFAULT_PERSONNEL',	'$any_text',
					rt.AUTH_LEVEL_NAME
				)							as RULE_AUTHNAME
				, 1							as RULE_FIRST
				, pr.PRMSSN_K				as RULE_PARENT
				, NVL(pr.PRMSSN_EXPIRY_CHECK,0)	as RULE_EXPIRY_CHECK
			from 
				PRMSSN_RC					pr
				, EQUIP_TYPES				et
				, AUTH_LEVEL_TYP			rt
			where
				pr.PRMSSN_AUTH = rt.AUTH_LEVEL_ID(+)
				and pr.PRMSSN_ETYP = et.ETYP_ID(+)
				and pr.PRMSSN_K = :prmssn
			)
			union
			(
			select
				pr.PRMT_K					as RULE_ID
				, pr.PRMT_CLASS				as RULE_CASE
				, DECODE( 
					pr.PRMT_CLASS,	
					'DEFAULT_EQUIP', 		'$def_eqpt',
					'PRM_EQPT',				'$any_eqpt',
					'DEFAULT_PERSONNEL',	'$def_psnl',
					'PRM_PRSSNL',			'$any_psnl'
				)							as RULE_CASENAME
				, DECODE(
					pr.PRMT_CLASS,
					'DEFAULT_EQUIP', 		-999,
					pr.PRMT_ETP
				)							as RULE_ETYP
				, DECODE(
					pr.PRMT_CLASS,
					'DEFAULT_EQUIP', 		'$any_text',
					et.ETYP_TITLE
				)							as RULE_ETYPNAME
				, pr.PRMT_AUTH				as RULE_AUTH
				, DECODE(
					pr.PRMT_CLASS,
					'DEFAULT_PERSONNEL',	'$any_text',
					rt.AUTH_LEVEL_NAME
				)							as RULE_AUTHNAME
				, 0							as RULE_FIRST
				, pr.PRMT_PRMSSN			as RULE_PARENT
				, NVL(pr.PRMT_EXPIRY_CHECK,0)		as RULE_EXPIRY_CHECK
			from 
				PRMT_RC						pr
				, EQUIP_TYPES				et
				, AUTH_LEVEL_TYP			rt
			where
				pr.PRMT_AUTH = rt.AUTH_LEVEL_ID(+)
				and pr.PRMT_ETP = et.ETYP_ID(+)
				and pr.PRMT_PRMSSN = :prmssn
			)
			) 
			order by RULE_ID
		";
		$sql['sql_data'] = array( $prmssn_id );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

    public function isGatePermissionExisted( $prmssn_id )
	{
		$sql = array();
        $sql['sql_text'] = "select * from PRMSSN_RC where PRMSSN_K = :prmssn ";
		$sql['sql_data'] = array( $prmssn_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isGatePermissionRuleExisted( $rule_id, $prmssn_id )
	{
		$sql = array();
        $sql['sql_text'] = "select * from PRMT_RC where PRMT_K=:rule_id and PRMT_PRMSSN=:prmssn_id ";
		$sql['sql_data'] = array( $rule_id, $prmssn_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function getNextGatePermissionId(  )
	{
        $mydb = DB::getInstance();

		$sql = array();
        $sql['sql_text'] = "select MAX(PRMSSN_K)+1 AS NEXT_ID from PRMSSN_RC";
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

    public function getNextGatePermissionRuleId( $pid )
	{
        $mydb = DB::getInstance();

		$sql = array();
        $sql['sql_text'] = "select MAX(PRMT_PSEQ)+1 AS NEXT_ID from PRMT_RC where PRMT_PRMSSN=:prmssn_id";
		$sql['sql_data'] = array($pid);
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->NEXT_ID) == TRUE || $rows[0]->NEXT_ID=="" )
		{
			$next_id = 2;
		}
		else
		{
			$next_id = (integer)$rows[0]->NEXT_ID;
		}
		
		return( $pid*1000 + $next_id );
    }
    
    
   public function lookupGatePermissionType()
   {
        $sql="
			select 
				DECODE( MSG_ID, 147, 1, 183, 2, 0 )									as PERMISSION_CLASS_ID
				, DECODE( MSG_ID, 147, 'PERSONNEL|DEFAULT_PERSONNEL|PRM_PRSSNL', 183, 'EQUIPMENT|DEFAULT_EQUIP|PRM_EQPT', ' ' )			
																					as PERMISSION_CLASS_CODE
				, MESSAGE 															as PERMISSION_CLASS_NAME 
			from 
				MSG_LOOKUP 
			where 
				(MSG_ID=147 or MSG_ID=183 )  
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
   }
    
    
   public function lookupGatePermissionDefaultType()
   {
        $sql="
			select MSG_ID, MESSAGE from MSG_LOOKUP 
			where 
				( MSG_ID=1900 or (MSG_ID>=3035 and MSG_ID<=3038) )  
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
		";
        $mydb = DB::getInstance();
		$data = $mydb->query($sql);

		return($data);
   }

  
    
	public function createMain( $data )
	{
		$next_seq = $data->prmssn_id;
		if ( $next_seq=="" || $next_seq<=0 )
		{
			$next_seq = $this->getNextGatePermissionId();
		}
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into PRMSSN_RC
			( 
				PRMSSN_K
				, PRMSSN_NAME
				, PRMSSN_GATE
				, PRMSSN_CASE
				, PRMSSN_AUTH
				, PRMSSN_ETYP
				, PRMSSN_EXPIRY_CHECK
			) 
			values 
			( 
				:prmssn_k
				, :prmssn_name
				, :prmssn_gate
				, :prmssn_case
				, :prmssn_auth
				, :prmssn_etyp
				, :prmssn_expiry_check
			) 
		";
		$sql['sql_data'] = array( $next_seq, $data->prmssn_name, $data->prmssn_gate, $data->prmssn_case, $data->prmssn_auth, $data->prmssn_etyp, $data->prmssn_expiry_check );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the gate permission succeeded!!!",GATEPERMISSION);

		// write journal
		$keys = array ("PRMSSN_K"=>($next_seqy) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Gate Permissions", "PRMSSN_RC", $keys, $excludes );
		$ins_journal->logOneLine("created a gate permission [" . $next_seq . ":" . $data->prmssn_name . "] successfully");
		
		return "OK";
	}
    
	public function updateMain( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update PRMSSN_RC set 
				PRMSSN_NAME = :prmssn_name 
				, PRMSSN_GATE = :prmssn_gate 
				, PRMSSN_CASE = :prmssn_case 
				, PRMSSN_AUTH = :prmssn_auth 
				, PRMSSN_ETYP = :prmssn_etyp 
				, PRMSSN_EXPIRY_CHECK = :prmssn_expiry_check 
			where 
				PRMSSN_K = :prmssn_k
		";
		$sql['sql_data'] = array( $data->prmssn_name, $data->prmssn_gate, $data->prmssn_case, $data->prmssn_auth, $data->prmssn_etyp, $data->prmssn_expiry_check, $data->prmssn_id );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the gate permission succeeded!!!",GATEPERMISSION);
		
		$keys = array ("PRMSSN_K"=>($data->prmssn_id) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Gate Permissions", "PRMSSN_RC", $keys, $excludes );
		$upd_journal->logOneLine("updated a gate permission [" . $data->prmssn_id . ":" . $data->prmssn_name . "] successfully");
		
		return "OK";
	}
    
	public function deleteMain( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from PRMSSN_RC 
			where 
				PRMSSN_K = :prmssn_k
		";
		$sql['sql_data'] = array( $data->prmssn_id );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the gate permission succeeded!!!",GATEPERMISSION);

		// write journal
		$keys = array ("PRMSSN_K"=>($data->prmssn_id) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Gate Permissions", "PRMSSN_RC", $keys, $excludes );
		$del_journal->logOneLine("deleted a gate permission [" . $data->prmssn_id . ":" . $data->prmssn_name . "] successfully");
		
		return "OK";
	}

  
    
	public function createLine( $data )
	{
		$next_seq = $data->prmt_k;
		if ( $next_seq=="" || $next_seq<=1000 )
		{
			$next_seq = $this->getNextGatePermissionRuleId( $data->prmt_prmssn );
		}

		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into PRMT_RC
			( 
				PRMT_K
				, PRMT_CLASS 
				, PRMT_AUTH 
				, PRMT_ETP 
				, PRMT_PRMSSN 
				, PRMT_EXPIRY_CHECK 
				, PRMT_PSEQ 
			) 
			values 
			( 
				:prmt_k
				, :prmt_class 
				, :prmt_auth 
				, :prmt_etp 
				, :prmt_prmssn 
				, :prmt_expiry_check 
				, :prmt_pseq 
			) 
		";
		$sql['sql_data'] = array( $next_seq, $data->prmt_class, $data->prmt_auth, $data->prmt_etp, $data->prmt_prmssn, $data->prmt_expiry_check, ($next_seq%1000) );
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the gate permission rule succeeded!!!",GATEPERMISSION);

		// write journal
		$keys = array ( "PRMT_K"=>($next_seq) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Gate Permission Rules", "PRMT_RC", $keys, $excludes );
		$ins_journal->logOneLine("created a gate permission rule [" . $next_seq . ", " . $data->prmt_prmssn . ", " . $data->prmt_class . "] successfully");
		
		return "OK";
	}
    
	public function updateLine( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update PRMT_RC set 
				PRMT_CLASS = :prmt_class 
				, PRMT_AUTH = :prmt_auth
				, PRMT_ETP = :prmt_etp
				, PRMT_EXPIRY_CHECK = :prmt_expiry_checkp
			where 
				PRMT_K = :prmt_k
				and PRMT_PRMSSN = :prmt_prmssn
		";
		$sql['sql_data'] = array( $data->prmt_class, $data->prmt_auth, $data->prmt_etp, $data->prmt_expiry_check, $data->prmt_k, $data->prmt_prmssn );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the gate permission rule succeeded!!!",GATEPERMISSION);
		
		$keys = array ( "PRMT_K"=>($data->prmt_k) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Gate Permission Rules", "PRMT_RC", $keys, $excludes );
		$upd_journal->logOneLine("updated a gate permission rule [" . $data->prmt_k . ", " . $data->prmt_prmssn . ", " . $data->prmt_class . "] successfully");
		
		return "OK";
	}
    
	public function deleteLine( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from PRMT_RC 
			where 
				PRMT_K = :prmt_k
				and PRMT_PRMSSN = :prmt_prmssn
		";
		$sql['sql_data'] = array( $data->prmt_k, $data->prmt_prmssn );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the gate permission rule succeeded!!!",GATEPERMISSION);

		// write journal
		$keys = array ( "PRMT_K"=>($data->prmt_k) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Gate Permission Rules", "PRMT_RC", $keys, $excludes );
		$del_journal->logOneLine("deleted a gate permission rule [" . $data->prmt_k . ", " . $data->prmt_prmssn . ", " . $data->prmt_class . "] successfully");
		
		return "OK";
	}

  
    
	public function create( $data )
	{
		$data->prmssn_id = $this->getNextGatePermissionId();
			
		// add gate permission header
		$res = $this->createMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// add gate permission line
		if ( is_array($data->gp_items) === FALSE )
		{
			$data->gp_items = (array)($data->gp_items);
		}
		if( $data->has_items=="1" && sizeof($data->gp_items) > 0 )
		{
			for($i=0; $i<sizeof($data->gp_items); $i++)
			{      
				$line_item = $data->gp_items[$i];
				$line_item->prmt_prmssn = $data->prmssn_id;
				$line_item->prmt_k = "";
				$lineResult = $this->createLine( $line_item );
				if ( $lineResult != "OK" )
				{
					return $lineResult;
				}
			}
		}
		
        return "OK";
	}
    
	public function update( $data )
	{
			
		// update gate permission header
		$res = $this->updateMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// update gate permission line
		if ( is_array($data->gp_items) === FALSE )
		{
			$data->gp_items = (array)($data->gp_items);
		}
		if( $data->has_items=="1" && sizeof($data->gp_items) > 0 )
		{
			for($i=0; $i<sizeof($data->gp_items); $i++)
			{   
				$line_item = $data->gp_items[$i];
				if ( $data->actions[$i]->option == "1" )
				{ // insert new gate permission line
					$lineResult = $this->createLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions[$i]->option == "2" )
				{ // update existing gate permission line
					$lineResult = $this->updateLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions[$i]->option == "3" )
				{ // delete existing gate permission line
					$lineResult = $this->deleteLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
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
		// delete all gate permission lines
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from PRMT_RC 
			where 
				PRMT_PRMSSN = :prmt_prmssn
		";
		$sql['sql_data'] = array( $data->prmssn_id );
		
        $comment_res = $mydb->delete($sql, OCI_NO_AUTO_COMMIT);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the gate permission rules succeeded!!!",GATEPERMISSION);
		
		// delete gate permission header
		$res = @$this->deleteMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		return "OK";
	}
	
}
?>