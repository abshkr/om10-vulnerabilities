<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DORHISTORY')) define('DORHISTORY','DorHistoryService.class');

class DorHistoryService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				sd.SCHDSPEC_SHLSTRIP		as DH_TRIP_NO
				, sd.SCHDSPEC_SHLSSUPP		as DH_SUPP_CODE
				, cm.CMPY_NAME				as DH_SUPP_NAME
				, sd.SCHD_COMP_ID			as DH_CMPT_NO
				, sd.SCHD_HOST_DATA			as DH_DOR_ORIGIN
				, dh.DH_DOR_TYPE			as DH_DOR_TYPE
				, dh.DH_DOR_NUMBER			as DH_DOR_NUMBER
				, dh.DH_CHG_DATE			as DH_CHG_DATE
				, dh.DH_PER_CODE			as DH_USER_CODE
				, dh.DH_PER_NAME			as DH_USER_NAME
			from 
				DOR_HISTORY			dh
				, SPECDETS			sd
				, COMPANYS      cm
			where 
				1 = 1
				and sd.SCHDSPEC_SHLSTRIP = dh.DH_SHLSTRIP(+)
				and sd.SCHDSPEC_SHLSSUPP = dh.DH_SHLSSUPP(+)
				and sd.SCHD_COMP_ID = dh.DH_SHLSCMPT(+)
				and sd.SCHDSPEC_SHLSSUPP = cm.CMPY_CODE(+)
	";
	/*
			select 
				dh.DH_SHLSTRIP			as DH_TRIP_NO
				, dh.DH_SHLSSUPP			as DH_SUPP_CODE
				, gs.SUPPLIER				as DH_SUPP_NAME
				, dh.DH_SHLSCMPT			as DH_CMPT_NO
				, sd.SCHD_HOST_DATA			as DH_DOR_ORIGIN
				, dh.DH_DOR_TYPE			as DH_DOR_TYPE
				, dh.DH_DOR_NUMBER			as DH_DOR_NUMBER
				, dh.DH_CHG_DATE			as DH_CHG_DATE
				, dh.DH_PER_CODE			as DH_USER_CODE
				, dh.DH_PER_NAME			as DH_USER_NAME
				, sc.SHL_FLEET_DATA			as DH_DOR_ORIGIN2
				, gs.CARRIER_CODE			as DH_CARR_CODE
				, gs.CARRIER				as DH_CARR_NAME
				, gs.TNKR_CODE				as DH_TANKER
				, gs.STATUS					as DH_STATUS_CODE
				, gs.SHLS_STATUS			as DH_STATUS_NAME
				, gs.LD_TYPE				as DH_LOAD_TYPE
				, gs.SHLS_SRCTYPE			as DH_SOURCE_TYPE
			from 
				DOR_HISTORY			dh
				, GUI_SCHEDULES		gs
				, SCHEDULE			sc
				, SPECDETS			sd
			where 
				dh.DH_SHLSTRIP     = gs.SHLS_TRIP_NO
				and dh.DH_SHLSSUPP = gs.SUPPLIER_CODE
				and dh.DH_SHLSTRIP = sc.SHLS_TRIP_NO
				and dh.DH_SHLSSUPP = sc.SHLS_SUPP
				and dh.DH_SHLSTRIP = sd.SCHDSPEC_SHLSTRIP
				and dh.DH_SHLSSUPP = sd.SCHDSPEC_SHLSSUPP
				and dh.DH_SHLSCMPT = sd.SCHD_COMP_ID
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
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "gantry/baseprods_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/baseprods_mod.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) DHVIEW ";
			
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
		else $sort="ORDER BY DH_SUPP_CODE, DH_TRIP_NO, DH_CMPT_NO";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) DHVIEW ";
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

    public function isTripCmptDorExisted( $trip, $supp, $cmpt )
	{
		$sql = array();
        $sql['sql_text'] = "select * from DOR_HISTORY where DH_SHLSTRIP=:trip_no and DH_SHLSSUPP=:supp_code and DH_SHLSCMPT=:cmpt_num ";
		$sql['sql_data'] = array( $trip, $supp, $cmpt );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

   
   public function lookupDorType()
   {
        $sql="
			select 1 as DOR_TYPE_ID, 'STK' as DOR_TYPE_CODE, 'STK' as DOR_TYPE_NAME from DUAL
			union 
			select 2 as DOR_TYPE_ID, 'CSH' as DOR_TYPE_CODE, 'CSH' as DOR_TYPE_NAME from DUAL
			union 
			select 3 as DOR_TYPE_ID, 'STL' as DOR_TYPE_CODE, 'STL' as DOR_TYPE_NAME from DUAL
			union 
			select 4 as DOR_TYPE_ID, 'ICW' as DOR_TYPE_CODE, 'ICW' as DOR_TYPE_NAME from DUAL
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
   }
   
/*
1	F	NEW SCHEDULE
3	S	SPECED
5	A	ACTIVE
7	L	LOADING
9	E	ENDED
11	D	DELIVERED OK   
*/
    public function getTripStatus($trip, $supp)
	{	
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "SELECT NVL(s.STATS, 'F') AS TRIP_STATS FROM SCHEDULE s WHERE s.SHLS_TRIP_NO=:trip_no and s.SHLS_SUPP=:supp_code ";
		$sql['sql_data'] = array( $trip, $supp );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->TRIP_STATS) == TRUE || $rows[0]->TRIP_STATS=="" )
		{
			$stats = 'F';
		}
		else
		{
			$stats = $rows[0]->TRIP_STATS;
		}
		
		return($stats);
    }



   public function updateTripHostDOR( $trip, $supp, $hostDor )
   {
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "UPDATE SCHEDULE SET SHL_FLEET_DATA=:host_dor WHERE SHLS_TRIP_NO=:trip_no and SHLS_SUPP=:supp_code ";
		$sql['sql_data'] = array( $hostDor, $trip, $supp );
		
        $comment_res = $mydb->update($sql);
        logMe("Update the trip host DOR succeeded!!!",DORHISTORY);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		
		return "OK";
   }
    

   public function updateCmptHostDOR( $trip, $supp, $cmpt, $hostDor )
   {
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "UPDATE SPECDETS SET SCHD_HOST_DATA=:host_dor WHERE SCHDSPEC_SHLSTRIP=:trip_no and SCHDSPEC_SHLSSUPP=:supp_code and SCHD_COMP_ID=:cmpt_num ";
        //$sql['sql_text'] = "UPDATE SPECDETS SET SCHD_DELIV_NUM=:host_dor WHERE SCHDSPEC_SHLSTRIP=:trip_no and SCHDSPEC_SHLSSUPP=:supp_code and SCHD_COMP_ID=:cmpt_num ";
		$sql['sql_data'] = array( $hostDor, $trip, $supp, $cmpt );
		
        $comment_res = $mydb->update($sql);
        logMe("Update the compartment host DOR succeeded!!!",DORHISTORY);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		
		return "OK";
   }
  
    
	public function create( $data )
	{
		$person_code	= oracle_escape_string($_SESSION['PERCODE']);
		$person_name	= oracle_escape_string($_SESSION['PERNAME']);
		
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DOR_HISTORY
			( 
				DH_SHLSTRIP
				, DH_SHLSSUPP
				, DH_SHLSCMPT
				, DH_DOR_TYPE
				, DH_DOR_NUMBER
				, DH_CHG_DATE
				, DH_PER_CODE
				, DH_PER_NAME
			) 
			values 
			( 
				:dh_shlstrip
				, :dh_shlssupp
				, :dh_shlscmpt
				, :dh_dor_type
				, :dh_dor_number
				, SYSDATE 
				, :dh_per_code
				, :dh_per_name
			) 
		";
		$sql['sql_data'] = array( $data->dh_trip_no, $data->dh_supp_code, $data->dh_cmpt_no, $data->dh_dor_type, $data->dh_dor_number, $person_code, $person_name );
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the additional host DOR succeeded!!!",DORHISTORY);

		// write journal
		$keys = array ("DH_SHLSTRIP"=>($data->dh_trip_no), "DH_SHLSSUPP"=>($data->dh_supp_code), "DH_SHLSCMPT"=>($data->dh_cmpt_no),);
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Additional HOST DOR", "DOR_HISTORY", $keys, $excludes );
		$ins_journal->logOneLine("created an additional DOR number [" . $data->dh_dor_number . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
		$person_code	= oracle_escape_string($_SESSION['PERCODE']);
		$person_name	= oracle_escape_string($_SESSION['PERNAME']);
		
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DOR_HISTORY set 
				DH_DOR_TYPE = :dh_dor_type 
				, DH_DOR_NUMBER = :dh_dor_number
				, DH_CHG_DATE = SYSDATE
				, DH_PER_CODE = :dh_per_code 
				, DH_PER_NAME = :dh_per_name 
			where 
				DH_SHLSTRIP = :dh_shlstrip
				and DH_SHLSSUPP = :dh_shlssupp 
				and DH_SHLSCMPT = :dh_shlscmpt 
		";
		$sql['sql_data'] = array( $data->dh_dor_type, $data->dh_dor_number, $person_code, $person_name, $data->dh_trip_no, $data->dh_supp_code, $data->dh_cmpt_no );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the additional host DOR succeeded!!!",DORHISTORY);
		
		$keys = array ("DH_SHLSTRIP"=>($data->dh_trip_no), "DH_SHLSSUPP"=>($data->dh_supp_code), "DH_SHLSCMPT"=>($data->dh_cmpt_no),);
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Additional HOST DOR", "DOR_HISTORY", $keys, $excludes );
		$upd_journal->logOneLine("updated an additional DOR number to [" . $data->dh_dor_number . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DOR_HISTORY 
			where 
				DH_SHLSTRIP = :dh_shlstrip
				and DH_SHLSSUPP = :dh_shlssupp 
				and DH_SHLSCMPT = :dh_shlscmpt 
		";
		$sql['sql_data'] = array( $data->dh_trip_no, $data->dh_supp_code, $data->dh_cmpt_no );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the additional host DOR succeeded!!!",DORHISTORY);

		// write journal
		$keys = array ("DH_SHLSTRIP"=>($data->dh_trip_no), "DH_SHLSSUPP"=>($data->dh_supp_code), "DH_SHLSCMPT"=>($data->dh_cmpt_no),);
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Additional HOST DOR", "DOR_HISTORY", $keys, $excludes );
		$del_journal->logOneLine("deleted an additional DOR number [" . $data->dh_dor_number . "] successfully");
		
		return "OK";
	}
    
	public function initDorHistory( $trip, $supp )
	{
		$person_code	= oracle_escape_string($_SESSION['PERCODE']);
		$person_name	= oracle_escape_string($_SESSION['PERNAME']);
		
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DOR_HISTORY
			( 
				DH_SHLSTRIP
				, DH_SHLSSUPP
				, DH_SHLSCMPT
				, DH_DOR_TYPE
				, DH_DOR_NUMBER
				, DH_CHG_DATE
				, DH_PER_CODE
				, DH_PER_NAME
			) 
			select
				SCHDSPEC_SHLSTRIP
				, SCHDSPEC_SHLSSUPP
				, SCHD_COMP_ID
				, ''
				, SCHD_DELIV_NUM
				, SYSDATE
				, :dh_per_code
				, :dh_per_name
			from SPECDETS
			where 
				SCHDSPEC_SHLSTRIP = :dh_shlstrip
				and SCHDSPEC_SHLSSUPP = :dh_shlssupp
		";
		$sql['sql_data'] = array( $person_code, $person_name, $trip, $supp );
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Initialize the DOR history succeeded!!!",DORHISTORY);
		
		return "OK";
	}
    
	public function removeDorHistory( $trip, $supp )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DOR_HISTORY 
			where 
				DH_SHLSTRIP = :dh_shlstrip
				and DH_SHLSSUPP = :dh_shlssupp 
		";
		$sql['sql_data'] = array( $trip, $supp );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the DOR history succeeded!!!",DORHISTORY);
		
		return "OK";
	}
    
	public function resetDorHistory( $trip, $supp )
	{
		$rtn = $this->removeDorHistory( $trip, $supp );
		$rtn = $this->initDorHistory( $trip, $supp );
		
		return $rtn;
	}
	
}
?>