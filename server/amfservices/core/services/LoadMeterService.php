<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('LOADMETER')) define('LOADMETER','LoadMeterService.class');

class LoadMeterService
{
    var $mylang='ENG';
	var $myview="
		SELECT 
            bu.BAM_USAGE_NAME 								as BAM_USAGE_NAME
			, bm.BAM_CODE 									as BAM_CODE 
			, bt.BA_METER_ID 								as BAM_TYPE_ID 
			, bt.BA_METER_NAME 								as BAM_TYPE_NAME 
			, bm.BAM_NAME 									as BAM_NAME 
			, bm.BAM_MIN_FLOW 								as BAM_MIN_FLOW 
			, bm.BAM_MAX_FLOW 								as BAM_MAX_FLOW 
			, bm.BAM_KFA 									as BAM_KFA
			, to_char(bm.BAM_KDATE_DMY, 'YYYY-MM-DD') 		as BAM_LAST_MOD 
			, NVL(bm.BAM_M_CURVE, 'NULL') 					as BAM_CURVE 
			, bu.BAM_USAGE_ID 								as BAM_USAGE_ID
			, bq.QTY_ID 									as BAM_QTY_TYPE 
			, bq.QTY_NAME 									as BAM_QTY_TYPENAME 
		FROM 
			BA_METERS 			bm 
			, BAM_USAGE_TYP 	bu 
			, QTY_TYP 			bq 
			, BA_METER_TYP 		bt 
		WHERE 
			bm.BAM_USAGE = bu.BAM_USAGE_ID 
		    AND bt.BA_METER_ID = bm.BAM_TYPE 
		    AND bq.QTY_ID = bm.BAM_QTY_TYPE 
		    AND bu.BAM_USAGE_ID IN (1,2,3,7,8) 
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
            $this->cgi = CGIDIR . "gantry/mtrs_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/mtrs_mod.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) LMVIEW ";
			
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
		else $sort="ORDER BY BAM_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) LMVIEW ";
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

    public function isLoadMeterKeyUsed( $mtr_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from BA_METERS where BAM_CODE=:bam_code ";
		$sql['sql_data'] = array( $mtr_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }
   
   public function getNumberRanges()
   {
	   return "1|20|1|60|1|60";
   }


/*    
https://bz.diamondkey.local/phpwrapper/mtrs_mod.php

usage	1
bam_code	M909
bam_name	M909
bam_type	1
bam_kfa	12
bam_minflow	10
bam_maxflow	50
bam_qty_type	0
bay	
cmd	ADD
page	

https://bz.diamondkey.local/phpwrapper/batch_mtrs.php?page=&usage=1&meter=M909&bay=-1&statusBar=Operation%20Succeeded!

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
        Call CGI to CREATE LoadMeter
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new LoadMeter++++++",LOADMETER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'usage'=>urlencode($data->bam_usage_id),
            'bam_code'=>urlencode($data->bam_code),
            'bam_name'=>urlencode($data->bam_name),
            'bam_type'=>urlencode($data->bam_type_id),
            'bam_kfa'=>urlencode($data->bam_kfa),
            'bam_minflow'=>urlencode($data->bam_min_flow),
            'bam_maxflow'=>urlencode($data->bam_max_flow),
            'bam_qty_type'=>urlencode($data->bam_qty_type),
            'bay'=>'',
            'page'=>'',
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
                logMe("Add LoadMeter failed!!!",LOADMETER);
                return "ERROR";
        }
        logMe("CGI Add LoadMeter succeeded!!!",LOADMETER);
		
        return "OK";
    }  


/*
https://bz.diamondkey.local/phpwrapper/mtrs_mod.php

usage	1
usage_id	1
bam_code	M909
bam_name	M909
bam_type	1
bam_kfa	14
bam_minflow	10
bam_maxflow	51
bam_qty_type	0
bay	
cmd	MOD
page	

https://bz.diamondkey.local/phpwrapper/batch_mtrs.php?page=&usage=1&meter=M909&bay=-1&statusBar=Operation%20Succeeded!

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
		$keys = array ("BAM_CODE"=>($data->bam_code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Load Meters", "BA_METERS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify LoadMeter 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating LoadMeter++++++",LOADMETER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'usage'=>urlencode($data->bam_usage_id),
            'usage_id'=>urlencode($data->bam_usage_id),
            'bam_code'=>urlencode($data->bam_code),
            'bam_name'=>urlencode($data->bam_name),
            'bam_type'=>urlencode($data->bam_type_id),
            'bam_kfa'=>urlencode($data->bam_kfa),
            'bam_minflow'=>urlencode($data->bam_min_flow),
            'bam_maxflow'=>urlencode($data->bam_max_flow),
            'bam_qty_type'=>urlencode($data->bam_qty_type),
            'bay'=>'',
            'page'=>'',
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
                logMe("Update LoadMeter!!!",LOADMETER);
                return "ERROR";
        }
        logMe("CGI Update LoadMeter!!!",LOADMETER);

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
https://bz.diamondkey.local/phpwrapper/mtrs_mod.php?usage=1&bay=-1&page=&bam_code=M909&bam_usage_id=1&bam_type=1&bam_qty_type=0&bam_name=M909&bam_minflow=10&bam_maxflow=51&bam_kfa=14&cmd=DEL

usage	1
bay	-1
page	
bam_code	M909
bam_usage_id	1
bam_type	1
bam_qty_type	0
bam_name	M909
bam_minflow	10
bam_maxflow	51
bam_kfa	14
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
		
        logMe("Info: ++++++Deleting LoadMeter++++++",LOADMETER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
			
            'usage'=>urlencode($data->bam_usage_id),
            'bam_usage_id'=>urlencode($data->bam_usage_id),
            'bam_code'=>urlencode($data->bam_code),
            'bam_name'=>urlencode($data->bam_name),
            'bam_type'=>urlencode($data->bam_type_id),
            'bam_kfa'=>urlencode($data->bam_kfa),
            'bam_minflow'=>urlencode($data->bam_min_flow),
            'bam_maxflow'=>urlencode($data->bam_max_flow),
            'bam_qty_type'=>urlencode($data->bam_qty_type),
            'bay'=>'-1',
            'page'=>'',
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
			logMe("CGI Delete LoadMeter failed!!!",LOADMETER);
			return "ERROR";
        }
        logMe("CGI Delete LoadMeter succeeded!!!",LOADMETER);

        return "OK";
    }   
	
    public function createByPHP($data)
	{
        $mydb = DB::getInstance();
		$sql = array();
		
        $sql['sql_text'] = "
			insert into BA_METERS
			( 
				BAM_CODE
				, BAM_TYPE
				, BAM_QTY_TYPE
				, BAM_USAGE
				, BAM_MIN_FLOW
				, BAM_MAX_FLOW
				, BAM_KFA
				, BAM_KDATE_DMY
				, BAM_NAME
			) 
			values 
			( 
				:bam_code
				, :bam_type_id
				, :bam_qty_type
				, :bam_usage_id
				, :bam_min_flow
				, :bam_max_flow
 				, :bam_kfa
				, SYSDATE
				, :bam_name
			) 
		";

		$sql['sql_data'] = array( $data->bam_code, $data->bam_type_id, $data->bam_qty_type, $data->bam_usage_id, $data->bam_min_flow, $data->bam_max_flow, $data->bam_kfa, $data->bam_name );
		
        $res = $mydb->insert($sql);
		
        if ($res == RETURN_OK)
        {
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);
		
			$keys = array ("BAM_CODE"=>($data->bam_code));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Load Meters", "BA_METERS", $keys, $excludes );
			$ins_journal->logOneLine("created a load meter [" . $data->bam_code . "] successfully");
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
		$keys = array ("BAM_CODE"=>($data->bam_code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Load Meters", "BA_METERS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			UPDATE BA_METERS set 
				BAM_TYPE=:bam_type_id
				, BAM_QTY_TYPE=:bam_qty_type
				, BAM_MIN_FLOW=:bam_min_flow 
				, BAM_MAX_FLOW=:bam_max_flow
				, BAM_KFA=:bam_kfa 
				, BAM_KDATE_DMY=SYSDATE
				, BAM_NAME=:bam_name 
			where 
				BAM_CODE=:bam_code
		";
		$sql['sql_data'] = array( $data->bam_type_id, $data->bam_qty_type, $data->bam_min_flow, $data->bam_max_flow, $data->bam_kfa, $data->bam_name, $data->bam_code );
		
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
		$bam_code = $data->bam_code;
        $mydb = DB::getInstance();        
        
		$csql = array();
		$csql['sql_text'] = "SELECT * FROM PIPENODE WHERE PN_MTR=:bam_code";
		$csql['sql_data'] = array( $bam_code );
        if( sizeof($mydb->query($csql))>0 )
		{
			return "ERROR"; 
		}

		$sql = array();
		$sql['sql_text'] = "DELETE FROM BA_METERS WHERE BAM_CODE=:bam_code";
		$sql['sql_data'] = array( $bam_code );
		$res = $mydb->delete($sql);
		
        if ($res == RETURN_OK)
        {
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);
		
			$keys = array ("BAM_CODE"=>($bam_code));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Load Meters", "BA_METERS", $keys, $excludes );
			$del_journal->logOneLine("deleted a load meter [" . $data->bam_code . "] successfully");
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