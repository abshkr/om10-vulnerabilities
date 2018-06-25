<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('TANKSTRAP')) define('TANKSTRAP','TankStrapService.class');

class TankStrapService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				ts.STRAP_HEIGHT				as STRAP_HEIGHT
				, ts.STRAP_VOL				as STRAP_VOLUME
				, ts.STR_TK_TANKCODE		as STRAP_TANKCODE
				, gt.TANK_NAME				as STRAP_TANKNAME
				, ts.STR_TK_TANKDEPO		as STRAP_SITECODE
				, gt.TANK_SITENAME			as STRAP_SITENAME
				, gt.TANK_BASE				as STRAP_BASECODE
				, gt.TANK_BASE_NAME			as STRAP_BASENAME
				, gt.TANK_BASE_CLASS		as STRAP_BASECLASS
				, gt.TANK_BCLASS_NAME		as STRAP_BSCLSNAME
				, gt.TANK_PROD_LVL			as STRAP_TANKLEVEL
			from 
				STRAPS			ts
				, GUI_TANKS		gt
			where 
				1 = 1
				and ts.STR_TK_TANKCODE = gt.TANK_CODE
				and ts.STR_TK_TANKDEPO = gt.TANK_TERMINAL
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) TSVIEW ";
			
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
		else $sort="ORDER BY STRAP_TANKCODE, STRAP_SITECODE, STRAP_HEIGHT";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) TSVIEW ";
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

    public function isTankStrapExisted( $tank_code, $tank_site, $height )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from STRAPS 
			where 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
				and STRAP_HEIGHT = :strap_height 
		";
		$sql['sql_data'] = array( $tank_code, $tank_site, $height );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function countTankStraps( $tank_code, $tank_site )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from STRAPS 
			where 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
		";
		$sql['sql_data'] = array( $tank_code, $tank_site );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function getTankHeightVolumeRange( $tank_code, $tank_site, $height )
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "
			select ts.STRAP_HEIGHT, ts.STRAP_VOL
			from
			(
				select * from STRAPS 
				where 
					STR_TK_TANKCODE = :str_tk_tankcode 
					and STR_TK_TANKDEPO = :str_tk_tankdepo 
					and STRAP_HEIGHT < :strap_height 
				order by STRAP_HEIGHT DESC
			) ts
			where ROWNUM=1
		";
		$sql['sql_data'] = array( $tank_code, $tank_site, $height );
		
        $rows = $mydb->query($sql, "N");
		if ( count($rows) > 0 )
		{
			$rtn_str = $rows[0]->STRAP_HEIGHT . "|" . $rows[0]->STRAP_VOL;
		}
		else
		{
			$rtn_str = "-1|-1";
		}
		
		$sql = array();
        $sql['sql_text'] = "
			select ts.STRAP_HEIGHT, ts.STRAP_VOL
			from
			(
				select * from STRAPS 
				where 
					STR_TK_TANKCODE = :str_tk_tankcode 
					and STR_TK_TANKDEPO = :str_tk_tankdepo 
					and STRAP_HEIGHT > :strap_height 
				order by STRAP_HEIGHT ASC
			) ts
			where ROWNUM=1
		";
		$sql['sql_data'] = array( $tank_code, $tank_site, $height );
		
        $rows = $mydb->query($sql, "N");
		if ( count($rows) > 0 )
		{
			$rtn_str .= "|" . $rows[0]->STRAP_HEIGHT . "|" . $rows[0]->STRAP_VOL;
		}
		else
		{
			$rtn_str .= "|-1|-1";
		}
		
        return $rtn_str;
	}


	public function create( $data )
	{
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into STRAPS
			( 
				STRAP_HEIGHT
				, STRAP_VOL
				, STR_TK_TANKCODE
				, STR_TK_TANKDEPO
			) 
			values 
			( 
				:strap_height
				, :strap_vol
				, :str_tk_tankcode
				, :str_tk_tankdepo
			) 
		";
		$sql['sql_data'] = array( $data->strap_height, $data->strap_volume, $data->strap_tankcode, $data->strap_sitecode );
		
		
        $straps_res = $mydb->insert($sql);
		
		if ( $straps_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the tank strap succeeded!!!",TANKSTRAP);

		// write journal
		$keys = array ("STR_TK_TANKCODE"=>($data->strap_tankcode), "STR_TK_TANKDEPO"=>($data->strap_sitecode), "STRAP_HEIGHT"=>($data->strap_height) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Tank Straps", "STRAPS", $keys, $excludes );
		$ins_journal->logOneLine("created a tank strap [" . $data->strap_tankcode . ":" . $data->strap_sitecode . ":" . $data->strap_height . ":" . $data->strap_volume . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update STRAPS set 
				STRAP_VOL = :strap_vol 
			where 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
				and STRAP_HEIGHT = :strap_height 
		";
		
		
		$sql['sql_data'] = array( $data->strap_volume, $data->strap_tankcode, $data->strap_sitecode, $data->strap_height );
		
        $straps_res = $mydb->update($sql);
		
		if ( $straps_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the tank strap succeeded!!!",TANKSTRAP);
		
		$keys = array ("STR_TK_TANKCODE"=>($data->strap_tankcode), "STR_TK_TANKDEPO"=>($data->strap_sitecode), "STRAP_HEIGHT"=>($data->strap_height) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Tank Straps", "STRAPS", $keys, $excludes );
		$upd_journal->logOneLine("updated a tank strap [" . $data->strap_tankcode . ":" . $data->strap_sitecode . ":" . $data->strap_height . ":" . $data->strap_volume . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from STRAPS 
			where 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
				and STRAP_HEIGHT = :strap_height 
		";
		$sql['sql_data'] = array( $data->strap_tankcode, $data->strap_sitecode, $data->strap_height );
		
        $straps_res = $mydb->delete($sql);
		
		if ( $straps_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the tank strap succeeded!!!",TANKSTRAP);

		// write journal
		$keys = array ("STR_TK_TANKCODE"=>($data->strap_tankcode), "STR_TK_TANKDEPO"=>($data->strap_sitecode), "STRAP_HEIGHT"=>($data->strap_height) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Tank Straps", "STRAPS", $keys, $excludes );
		$del_journal->logOneLine("deleted a tank strap [" . $data->strap_tankcode . ":" . $data->strap_sitecode . ":" . $data->strap_height . ":" . $data->strap_volume . "] successfully");
		
		return "OK";
	}
  
    public function batchImportOneByOne( $data )
	{
		// check to see if parameter is an array or an object
		if ( is_object( $data ) )
		{
			// one row as object, one record
			$rtn = $this->deleteNoLog( $data );
			$rtn = $this->createNoLog( $data );
			return $rtn;
		}
		else if ( is_array( $data ) )
		{
			// more than one rows as an array, multiple records
			$ok_num = 0;
			foreach( $data as $rowobj )
			{
				$rtn = $this->deleteNoLog( $rowobj );
				$rtn = $this->createNoLog( $rowobj );
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
	
	public function createNoLogNoBinding( $data )
	{
		
		$mydb = DB::getInstance();
		$sql = "";
        $sql = "
			insert into STRAPS
			( 
				STRAP_HEIGHT
				, STRAP_VOL
				, STR_TK_TANKCODE
				, STR_TK_TANKDEPO
			) 
			values 
			( 
				" . $data->strap_height ."
				, " . $data->strap_volume . "
				, '" . $data->strap_tankcode . "'
				, '" . $data->strap_sitecode . "'
			) 
		";
		
        $straps_res = $mydb->insert($sql);
		
		if ( $straps_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the tank strap succeeded!!!",TANKSTRAP);
		
		return "OK";
	}
	
	public function createNoLogByBinding( $data )
	{
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into STRAPS
			( 
				STRAP_HEIGHT
				, STRAP_VOL
				, STR_TK_TANKCODE
				, STR_TK_TANKDEPO
			) 
			values 
			( 
				:strap_height
				, :strap_vol
				, :str_tk_tankcode
				, :str_tk_tankdepo
			) 
		";
		$sql['sql_data'] = array( $data->strap_height, $data->strap_volume, $data->strap_tankcode, $data->strap_sitecode );
		
		
        $straps_res = $mydb->insert($sql);
		
		if ( $straps_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the tank strap succeeded!!!",TANKSTRAP);
		
		return "OK";
	}
	
	public function createNoLogByProcedure( $data )
	{
		
		$mydb = DB::getInstance();
		$sql = "BEGIN Load_Tank_Data(" . $data->strap_height ."
				, " . $data->strap_volume . "
				, '" . $data->strap_tankcode . "'
				, '" . $data->strap_sitecode . "'); END;";
		
        $straps_res = $mydb->insert($sql);
		
		if ( $straps_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the tank strap succeeded!!!",TANKSTRAP);
		
		return "OK";
	}
	
	public function createNoLog( $data )
	{
		//return $this->createNoLogNoBinding( $data );
		return $this->createNoLogByBinding( $data );
		//return $this->createNoLogByProcedure( $data );
	}
    
	public function deleteNoLog( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from STRAPS 
			where 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
				and STRAP_HEIGHT = :strap_height 
		";
		$sql['sql_data'] = array( $data->strap_tankcode, $data->strap_sitecode, $data->strap_height );
		
        $straps_res = $mydb->delete($sql);
		
		if ( $straps_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the tank strap succeeded!!!",TANKSTRAP);
		
		return "OK";
	}
    
	public function deleteByTank( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from STRAPS 
			where 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
		";
		$sql['sql_data'] = array( $data->strap_tankcode, $data->strap_sitecode );
		
        $straps_res = $mydb->delete($sql);
		
		if ( $straps_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the tank's straps succeeded!!!",TANKSTRAP);

		// write journal
		$keys = array ("STR_TK_TANKCODE"=>($data->strap_tankcode), "STR_TK_TANKDEPO"=>($data->strap_sitecode) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Tank Straps", "STRAPS", $keys, $excludes );
		$del_journal->logOneLine("deleted one tank straps [" . $data->strap_tankcode . ":" . $data->strap_sitecode . "] successfully");
		
		return "OK";
	}
  
    public function batchImport1( $data, $doDelete=0 )
	{
		// check to see if parameter is an array or an object
		if ( is_object( $data ) )
		{
			// one row as object, one record
			$rtn = $this->deleteByTank( $data );
			$rtn = $this->create( $data );
			return $rtn;
		}
		else if ( is_array( $data ) )
		{
			// more than one rows as an array, multiple records
			$ok_num = 0;
			$is_deleted = FALSE;
			//if ( $is_deleted === FALSE && $doDelete===1 )
			if ( $doDelete>0 )
			{
				$rtn = $this->deleteByTank( $data[0] );
				$is_deleted = TRUE;
			}
			foreach( $data as $rowobj )
			{
				$rtn = $this->createNoLog( $rowobj );
				if ( $rtn == "OK" )
				{
					$ok_num += 1;
				}
			}
			if ( $ok_num > 0 )
			{
				logMe("Import the tank strap succeeded!!!",TANKSTRAP);

				// write journal
				$keys = array ("STR_TK_TANKCODE"=>($rowobj->strap_tankcode), "STR_TK_TANKDEPO"=>($rowobj->strap_sitecode) );
				$excludes = array ();
				$ins_journal = new UpdateJournalClass( "Tank Straps", "STRAPS", $keys, $excludes );
				$ins_journal->logOneLine("created one tank straps [" . $rowobj->strap_tankcode . ":" . $rowobj->strap_sitecode . "] successfully");
		
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
  
    public function batchImport( $data, $doDelete=0 )
	{
		// check to see if parameter is an array or an object
		if ( is_object( $data ) )
		{
			// one row as object, one record
			$rtn = $this->deleteByTank( $data );
			$rtn = $this->create( $data );
			return $rtn;
		}
		else if ( is_array( $data ) )
		{
			// more than one rows as an array, multiple records
			$ok_num = 0;
			$is_deleted = FALSE;
			//if ( $is_deleted === FALSE && $doDelete===1 )
			if ( $doDelete>0 )
			{
				$rtn = $this->deleteByTank( $data[0] );
				$is_deleted = TRUE;
			}
			$heights = array();
			$volumes = array();
			$tankcodes = array();
			$sitecodes = array();
			$i = -1;
			foreach( $data as $rowobj )
			{
				$i += 1;
				$heights[$i] = $rowobj->strap_height;
				$volumes[$i] = $rowobj->strap_volume;
				$tankcodes[$i] = $rowobj->strap_tankcode;
				$sitecodes[$i] = $rowobj->strap_sitecode;
			}
			$mydb = DB::getInstance();
			$sql = "BEGIN LOADER_PKG.Load_Straps_Data (:hdata, :vdata, :tdata, :sdata); END;";
			$stid = oci_parse( $mydb->connect, $sql );
			oci_bind_array_by_name($stid, ":hdata", $heights, $i+1, 9, SQLT_INT);
			oci_bind_array_by_name($stid, ":vdata", $volumes, $i+1, 20, SQLT_FLT);
			oci_bind_array_by_name($stid, ":tdata", $tankcodes, $i+1, 24, SQLT_CHR);
			oci_bind_array_by_name($stid, ":sdata", $sitecodes, $i+1, 16, SQLT_CHR);
			if(oci_execute($stid, OCI_COMMIT_ON_SUCCESS)){
				$rtn = "OK";
			}else{
				$mydb->logError(oci_error($stid));
				$rtn = "ERROR";
			}
			if ( $rtn == "OK" )
			{
				logMe("Import the tank strap succeeded!!!",TANKSTRAP);

				// write journal
				$keys = array ("STR_TK_TANKCODE"=>($rowobj->strap_tankcode), "STR_TK_TANKDEPO"=>($rowobj->strap_sitecode) );
				$excludes = array ();
				$ins_journal = new UpdateJournalClass( "Tank Straps", "STRAPS", $keys, $excludes );
				$ins_journal->logOneLine("created one tank straps [" . $rowobj->strap_tankcode . ":" . $rowobj->strap_sitecode . "] successfully");
		
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
	
}
?>