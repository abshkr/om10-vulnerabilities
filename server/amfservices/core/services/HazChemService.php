<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('HAZCHEM')) define('HAZCHEM','HazChemService.class');

class HazChemService
{
    var $mylang='ENG';
	var $myview="
			select 
				hc.HZCF_ID
				, hc.HZCF_UN_NUM
				, hc.HZCF_NAME
				, hc.HZCF_SUB_RISK
				, hc.HZCF_HZ_CODE
				, hc.HZCF_EMRG
				, hc.HZCF_PACK_GROUP
				, hc.HZCF_PACK_METHOD
				, hc.HZCF_CLASS
			from 
				HAZCHEM 			hc
			where 
				1 = 1
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
            $this->cgi = CGIDIR . "gantry/hazchem_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/hazchem_mod.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) HCVIEW ";
			
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
		else $sort="ORDER BY HZCF_NAME";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) HCVIEW ";
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

    public function isHazChemKeyUsed( $hzcf_id )
	{
		//$sql = "select * from HAZCHEM where HZCF_ID='$hzcf_id' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from HAZCHEM where HZCF_ID=:hzcf_id ";
		$sql['sql_data'] = array( $hzcf_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }


/*    
https://bz.diamondkey.local/phpwrapper/hazchem_mod.php?hz_id=1618&un=11&name=tst1&risk=1&class=1&code=d&emerg=1&pkgrp=1&pktype=1&cmd=ADD

hz_id	1618
un	11
name	tst1
risk	1
class	1
code	d
emerg	1
pkgrp	1
pktype	1
cmd	ADD

https://bz.diamondkey.local/phpwrapper/hazchem.php?hz_id=1618&statusBar=Operation%20Succeeded!

http-equiv="refresh" content="0;URL=baseprods.cgi?op=20&statusBar=Operation Succeeded!"	
    <span id="feedback" style="COLOR: #FF0000;">Operation Succeeded!</span>
*/	
    public function createByCGI($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to CREATE HazChem
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new HazChem++++++",HAZCHEM);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'hz_id'=>urlencode($data->hzcf_id),
            'un'=>urlencode($data->hzcf_un_num),
            'name'=>urlencode($data->hzcf_name),
            'risk'=>urlencode($data->hzcf_sub_risk),
            'class'=>urlencode($data->hzcf_class),
            'code'=>urlencode($data->hzcf_hz_code),
            'emerg'=>urlencode($data->hzcf_emrg),
            'pkgrp'=>urlencode($data->hzcf_pack_group),
            'pktype'=>urlencode($data->hzcf_pack_method),
            'cmd'=>urlencode('ADD')
			
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=操作成功!";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Add HazChem failed!!!",HAZCHEM);
                return "ERROR";
        }
        logMe("CGI Add HazChem succeeded!!!",HAZCHEM);
		
        return "OK";
    }  


/*
https://bz.diamondkey.local/phpwrapper/hazchem_mod.php?hz_id=1618&un=11&name=tst1&risk=1.5&class=%5BY%5D&code=E&emerg=1&pkgrp=1&pktype=1&cmd=MOD

hz_id	1618
un	11
name	tst1
risk	1.5
class	[Y]
code	E
emerg	1
pkgrp	1
pktype	1
cmd	MOD

https://bz.diamondkey.local/phpwrapper/hazchem.php?hz_id=1618&statusBar=Operation%20Succeeded!

http-equiv="refresh" content="0;URL=baseprods.cgi?op=25&pg=0&statusBar=Operation Succeeded!"
      <span id="feedback" style="COLOR: #FF0000;">Operation Succeeded!</span>

*/	
    public function updateByCGI($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("HZCF_ID"=>($data->hzcf_id));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "HazChems", "HAZCHEM", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify HazChem 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating HazChem++++++",HAZCHEM);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'hz_id'=>urlencode($data->hzcf_id),
            'un'=>urlencode($data->hzcf_un_num),
            'name'=>urlencode($data->hzcf_name),
            'risk'=>urlencode($data->hzcf_sub_risk),
            'class'=>urlencode($data->hzcf_class),
            'code'=>urlencode($data->hzcf_hz_code),
            'emerg'=>urlencode($data->hzcf_emrg),
            'pkgrp'=>urlencode($data->hzcf_pack_group),
            'pktype'=>urlencode($data->hzcf_pack_method),
            'cmd'=>urlencode('MOD')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=操作成功!";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Update HazChem!!!",HAZCHEM);
                return "ERROR";
        }
        logMe("CGI Update HazChem!!!",HAZCHEM);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
 		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        return "OK";
    }  

	
/*
https://bz.diamondkey.local/phpwrapper/hazchem_mod.php?hz_id=1618&name=tst1&emerg=1&risk=1.5&class=[Y]&code=E&pkgrp=1&pktype=1&un=11&&cmd=DEL

hz_id	1618
name	tst1
emerg	1
risk	1.5
class	[Y]
code	E
pkgrp	1
pktype	1
un	11
cmd	DEL

https://bz.diamondkey.local/phpwrapper/hazchem.php?hz_id=1618&statusBar=Operation%20Succeeded!

http-equiv="refresh" content="0;URL=baseprods.cgi?op=25&pg=0&statusBar=Operation Succeeded!"
      <span id="feedback" style="COLOR: #FF0000;">Operation Succeeded!</span>
*/
    public function deleteByCGI($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting HazChem++++++",HAZCHEM);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'hz_id'=>urlencode($data->hzcf_id),
            'un'=>urlencode($data->hzcf_un_num),
            'name'=>urlencode($data->hzcf_name),
            'risk'=>urlencode($data->hzcf_sub_risk),
            'class'=>urlencode($data->hzcf_class),
            'code'=>urlencode($data->hzcf_hz_code),
            'emerg'=>urlencode($data->hzcf_emrg),
            'pkgrp'=>urlencode($data->hzcf_pack_group),
            'pktype'=>urlencode($data->hzcf_pack_method),
            'cmd'=>urlencode('DEL')
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=操作成功!";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
			logMe("CGI Delete HazChem failed!!!",HAZCHEM);
			return "ERROR";
        }
        logMe("CGI Delete HazChem succeeded!!!",HAZCHEM);

        return "OK";
    }   
	
    public function createByPHP($data)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into HAZCHEM
			( 
				HZCF_ID
				, HZCF_UN_NUM
				, HZCF_NAME
				, HZCF_SUB_RISK
				, HZCF_HZ_CODE
				, HZCF_EMRG
				, HZCF_PACK_GROUP
				, HZCF_PACK_METHOD
				, HZCF_CLASS
			) 
			values 
			( 
				:hzcf_id
				, :hzcf_un_num
				, :hzcf_name
				, :hzcf_sub_risk
				, :hzcf_hz_code
				, :hzcf_emrg
 				, :hzcf_pack_group
				, :hzcf_pack_method
				, :hzcf_class
			) 
		";

		$sql['sql_data'] = array( $data->hzcf_id, $data->hzcf_un_num, $data->hzcf_name, $data->hzcf_sub_risk, $data->hzcf_hz_code, $data->hzcf_emrg, $data->hzcf_pack_group, $data->hzcf_pack_method, $data->hzcf_class );
		
        $res = $mydb->insert($sql);
		
        if ($res == RETURN_OK)
        {
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);
		
			$keys = array ("HZCF_ID"=>($data->hzcf_id));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "HazChems", "HAZCHEM", $keys, $excludes );
			$ins_journal->logOneLine("created a hazchem [" . $data->hzcf_id . " - " . $data->hzcf_name . "] successfully");
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
		
    }
    
    public function updateByPHP($data)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("HZCF_ID"=>($data->hzcf_id));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "HazChems", "HAZCHEM", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			UPDATE HAZCHEM set 
				HZCF_UN_NUM=:hzcf_un_num
				, HZCF_NAME=:hzcf_name
				, HZCF_SUB_RISK=:hzcf_sub_risk 
				, HZCF_HZ_CODE=:hzcf_hz_code
				, HZCF_EMRG=:hzcf_emrg 
				, HZCF_PACK_GROUP=:hzcf_pack_group
				, HZCF_PACK_METHOD=:hzcf_pack_method 
				, HZCF_CLASS=:hzcf_class 
			where 
				HZCF_ID=:hzcf_id
		";
		$sql['sql_data'] = array( $data->hzcf_un_num, $data->hzcf_name, $data->hzcf_sub_risk, $data->hzcf_hz_code, $data->hzcf_emrg, $data->hzcf_pack_group, $data->hzcf_pack_method, $data->hzcf_class, $data->hzcf_id );
		
        $res = $mydb->update($sql);
		
        if ($res == RETURN_OK)
        {
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    }
    
    public function deleteByPHP($data)
	{
		$hzcf_id = $data->hzcf_id;
        $mydb = DB::getInstance();        
        
		$csql = array();
		$csql['sql_text'] = "SELECT * FROM HZ_LINK WHERE HZ_LINK_ID=:hzcf_id";
		$csql['sql_data'] = array( $hzcf_id );
        if( sizeof($mydb->query($csql))>0 )
		{
			return "ERROR"; 
		}

		$sql = array();
		$sql['sql_text'] = "DELETE FROM HAZCHEM WHERE HZCF_ID=:hzcf_id";
		$sql['sql_data'] = array( $hzcf_id );
		$res = $mydb->delete($sql);
		
        if ($res == RETURN_OK)
        {
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);
		
			$keys = array ("HZCF_ID"=>($hzcf_id));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "HazChems", "HAZCHEM", $keys, $excludes );
			$del_journal->logOneLine("deleted a hazchem [" . $data->hzcf_id . " - " . $data->hzcf_name . "] successfully");
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    } 
    
	public function create( $data )
	{
		//return $this->createByCGI( $data );
		return $this->createByPHP( $data );
	}
    
	public function update( $data )
	{
		//return $this->updateByCGI( $data );
		return $this->updateByPHP( $data );
	}
    
	public function delete( $data )
	{
		//return $this->deleteByCGI( $data );
		return $this->deleteByPHP( $data );
	}
	
}
?>