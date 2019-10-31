<?php
require_once( 'bootstrap.php' );
//require_once( 'Thunk.class.php' );
//require_once( 'Journal.class.php' );

if(!defined('LIVEJOURNAL')) define('LIVEJOURNAL','[AMF]-LiveJournal.class');

class LiveJournal
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';

	public function __construct()
	{
		session_start();
		/*
		$this->username = $_SERVER['OMEGA_USER'];
		$this->password = $_SERVER['OMEGA_PWD'];
		$this->DBPort = $_SERVER['OMEGA_DBPORT'];
		if ( strlen($this->DBPort) > 0 )
		{
			$DBPort = ":".$this->DBPort;
		}
		if(isset($_SERVER['DB_ENCRYPT']) &&
			($_SERVER['DB_ENCRYPT'] == 'YES' || $_SERVER['DB_DECRYPT'] == 'yes')) 
		{
            $temp = decrypt_user_pwd($this->password);
            $this->password = $temp;
        }
		$this->server = "localhost".$DBPort."/".$_SERVER['OMEGA_DBASE'];     		
		$this->connect = oci_connect($this->username,$this->password,$this->server,"zhs16gbk");
		*/
	}

	public function getJournals($date,$filter)
	{	/*
		$query = "select * FROM GUI_SITE_JOURNAL WHERE GEN_DATE > '" . $date . "' AND ROWNUM < 10000 ORDER BY SEQ DESC";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
		*/
		$sql = array();
        $sql['sql_text'] = "select * FROM GUI_SITE_JOURNAL WHERE GEN_DATE > :date_time AND ROWNUM < 10000 ORDER BY SEQ DESC";
		$sql['sql_data'] = array( $date );
			
        $mydb = DB::getInstance();
		$data = $mydb->query($sql, "N");
        //XarrayEncodingConversion($data);

		return($data);
	}


    public function getLastSequenceNumber()
	{	/*
        //$query="SELECT MAX(SEQ) AS LAST FROM GUI_SITE_JOURNAL ORDER BY SEQ";
        $query="SELECT MAX(SEQ) AS LAST FROM GUI_SITE_JOURNAL WHERE GEN_DATE > SYSDATE-1";
 		$stid = oci_parse($this->connect, $query);
 		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res[0]->LAST);
		*/
        $mydb = DB::getInstance();
		$sql = "SELECT MAX(SEQ) AS LAST_ID FROM GUI_SITE_JOURNAL WHERE GEN_DATE > SYSDATE-1";
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->LAST_ID) == TRUE || $rows[0]->LAST_ID=="" )
		{
			$last_id = 1;
		}
		else
		{
			$last_id = (integer)$rows[0]->LAST_ID;
		}
		
		return($last_id);
		
		
		
    }

	public function justGetIt()
	{
        $seqNum = $this->getLastSequenceNumber()-250;
		if($seqNum<0)$seqNum=0;
		/*
        $query="SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ> :last ORDER BY SEQ";
 		$stid = oci_parse($this->connect, $query);
		oci_bind_by_name($stid,":last",$seqNum);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
		*/
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ> :seq_last ORDER BY SEQ";
		$sql['sql_data'] = array( $seqNum );
			
        $mydb = DB::getInstance();
		$data = $mydb->query($sql, "N");
        //XarrayEncodingConversion($data);

		return($data);
	}
	



	/*
	This function is Mirza's test implementation of the live Alarm
	requires no parameters for simplification;
	*/
	public function getAlarmFeed($lang = 'ENG')
	{
		// get the last sequence number
		$lastSequence    		= $this->getLastSequenceNumber();
		if(!isset($_SESSION["LAST_ALARM_FEED_SEQUENCE_NUM"]))
		{
			$_SESSION["LAST_ALARM_FEED_SEQUENCE_NUM"] = $lastSequence;
		}
		$sesLastSequence 		= $_SESSION["LAST_ALARM_FEED_SEQUENCE_NUM"];
		$res 					= array();
		$res["lastSequence"] 	= $lastSequence;
		$res["sesLastSequence"] = $sesLastSequence;
		// compare with session variable, if not same, do something
		if($sesLastSequence != $lastSequence)
		{	/*
			$query = "SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ > $sesLastSequence AND MSG_EVENT = 'ALARM' AND REGION_CODE = '".$lang."' ORDER BY GEN_DATE ASC";
			$stid  = oci_parse($this->connect, $query);
			oci_execute($stid);
			while (($row = oci_fetch_object($stid))){$data[] = $row;}
			*/
			$sql = array();
			$sql['sql_text'] = "SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ > :sesLastSequence AND MSG_EVENT = 'ALARM' AND REGION_CODE = :lang_code ORDER BY GEN_DATE ASC";
			$sql['sql_data'] = array( $sesLastSequence, $lang );
			
			$mydb = DB::getInstance();
			$data = $mydb->query($sql, "N");
			//XarrayEncodingConversion($data);
			
			$res["data"] = $data;
		}
		$_SESSION["LAST_ALARM_FEED_SEQUENCE_NUM"] = $lastSequence;
		return $res;
	}




	public function getLiveFeed($last,$curr,$lang)
	{	/*
        $query="SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ > :last AND REGION_CODE = '".$lang."' ORDER BY GEN_DATE ASC";
 		$stid = oci_parse($this->connect, $query);
 		oci_bind_by_name($stid,":last",$last);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
		*/
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ > :seq_last AND SEQ <= :seq_curr AND REGION_CODE = :lang_code ORDER BY GEN_DATE ASC";
		$sql['sql_data'] = array( $last, $curr, $lang );
			
        $mydb = DB::getInstance();
		$data = $mydb->query($sql, "N");
        //XarrayEncodingConversion($data);

		return($data);
	}

	public function getLiveFeed2($last,$lang)
	{	/*
        $query="SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ > :last AND REGION_CODE = '".$lang."' ORDER BY GEN_DATE ASC";
 		$stid = oci_parse($this->connect, $query);
 		oci_bind_by_name($stid,":last",$last);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
		*/
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ > :seq_last AND REGION_CODE = :lang_code ORDER BY GEN_DATE ASC";
		$sql['sql_data'] = array( $last, $lang );
			
        $mydb = DB::getInstance();
		$data = $mydb->query($sql, "N");
        //XarrayEncodingConversion($data);

		return($data);
	}
	
    public function getJournalTypes()
	{	/*
        $query="SELECT MSG_LOOKUP.MESSAGE FROM ENUMITEM JOIN MSG_LOOKUP ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID) WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT' AND ENUMITEM.ENUM_NO!=0 AND MSG_LOOKUP.LANG_ID='".$this->mylang."'";
 		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
		*/
		$sql = array();
        //$sql['sql_text'] = "SELECT MSG_LOOKUP.MESSAGE FROM ENUMITEM JOIN MSG_LOOKUP ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID) WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT' AND ENUMITEM.ENUM_NO!=0 AND MSG_LOOKUP.LANG_ID=:lang_code ";
        $sql['sql_text'] = "SELECT MSG_LOOKUP.MESSAGE FROM ENUMITEM JOIN MSG_LOOKUP ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID) WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT' AND ENUMITEM.ENUM_NO!=0 AND (MSG_LOOKUP.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND MSG_LOOKUP.LANG_ID = :lang_code)) ";
		$sql['sql_data'] = array( $this->mylang );
			
        $mydb = DB::getInstance();
		$data = $mydb->query($sql, "N");
        //XarrayEncodingConversion($data);

		return($data);
    } 
	
	public function getDrillDown($start,$end,$lang)
	{	/*
		$query = "SELECT * FROM GUI_SITE_JOURNAL WHERE  SEQ > " .$start. " AND SEQ < " .$end. " AND REGION_CODE = '".$lang."' ORDER BY SEQ DESC";
 		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
		*/	
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_SITE_JOURNAL WHERE  SEQ > :seq_start AND SEQ < :seq_end AND REGION_CODE = :lang_code ORDER BY SEQ DESC";
		$sql['sql_data'] = array( $start,$end,$lang );
			
        $mydb = DB::getInstance();
		$data = $mydb->query($sql, "N");
        //XarrayEncodingConversion($data);

		return($data);
	}
	
    public function getJournalSearch($filter,$key,$start,$end, $direction, $lang, $pageNum = 1,$pageSize = 500)
	{
		$filter_data = array();
		$filter_data[] = $start;
		$filter_data[] = $end;
		
        $tmpStr = "";
		if ($filter != "")
		{
            $arr = explode(':',$filter);
            for ($i=0; $i<count($arr);$i++)
			{
                //$tmpStr = $tmpStr . " MSG_EVENT='" . $arr[$i] . "'";
                //if ($i!=count($arr)-1) $tmpStr = $tmpStr . " OR ";
				
                $tmpStr = $tmpStr . " MSG_EVENT=:msg_event".$i . " ";
				$filter_data[] = $arr[$i];
                if ($i != count($arr) - 1) 
				{
					$tmpStr = $tmpStr . " OR ";
				}
				
            }
        }
        if ($tmpStr != "") 
		{
			$tmpStr = " AND (".$tmpStr .")";
		}
		
		if ( $direction == "N" )
		{
			//$query = "SELECT * FROM GUI_SITE_JOURNAL WHERE GEN_DATE > to_date('" .$start."','yyyy-mm-dd hh24:mi') AND GEN_DATE < to_date('".$end."','yyyy-mm-dd hh24:mi')".$tmpStr." AND REGION_CODE = '".$lang."' ORDER BY SEQ DESC";
			$query = "SELECT * FROM GUI_SITE_JOURNAL WHERE GEN_DATE > to_date(:start_dt,'yyyy-mm-dd hh24:mi') AND GEN_DATE < to_date(:end_dt,'yyyy-mm-dd hh24:mi')".$tmpStr." AND REGION_CODE = :lang_code ORDER BY SEQ DESC";
		}
		else
		{
			//$query = "SELECT * FROM GUI_SITE_JOURNAL WHERE GEN_DATE > to_date('" .$start."','yyyy-mm-dd hh24:mi') AND GEN_DATE < to_date('".$end."','yyyy-mm-dd hh24:mi')".$tmpStr." AND REGION_CODE = '".$lang."' ORDER BY SEQ ASC";
			$query = "SELECT * FROM GUI_SITE_JOURNAL WHERE GEN_DATE > to_date(:start_dt,'yyyy-mm-dd hh24:mi') AND GEN_DATE < to_date(:end_dt,'yyyy-mm-dd hh24:mi')".$tmpStr." AND REGION_CODE = :lang_code ORDER BY SEQ ASC";
		}
		$filter_data[] = $lang;
		
		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter_data;
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($queryPaged, "N");	// do not convert object attribute to lower case
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter_data;
		
		$data->count = $mydb->count( $queryCount );

		return($data);
		
		/*
		$sqlCount = "SELECT COUNT(*) TOTAL_COUNT FROM ($query)";
 		$stid = oci_parse($this->connect, $sqlCount);
		oci_execute($stid);
		$row = oci_fetch_object($stid);
		$count = $row->TOTAL_COUNT;


		$stid = oci_parse($this->connect, $queryPaged);
		oci_execute($stid);

		while (($row = oci_fetch_object($stid)))
		{
			//XarrayEncodingConversion($row);
			$res[] = $row;
		}
		$data->count = $count;
		//$data->data = $res;
		$data->data = (json_encode($res));
		return($data);
		*/
    }	
}
?>