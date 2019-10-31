<?php
class LiveJournal
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';

	public function __construct()
	{
		$this->username = $_SERVER['OMEGA_USER'];
		$this->password = $_SERVER['OMEGA_PWD'];
		$this->server = 'localhost/OML5K';	
		$this->connect = oci_connect($this->username,$this->password,$this->server);
	}

	public function getJournals($date,$filter)
	{
		$query = "select * FROM GUI_SITE_JOURNAL WHERE GEN_DATE > '" . $date . "' AND ROWNUM < 2000 ORDER BY SEQ DESC";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
	
    public function getLastSequenceNumber()
	{
        $query="SELECT MAX(SEQ) AS LAST FROM GUI_SITE_JOURNAL ORDER BY SEQ";
 		$stid = oci_parse($this->connect, $query);
 		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res[0]->LAST);
    }

	public function justGetIt()
	{
        $seqNum = $this->getLastSequenceNumber()-250;
		if($seqNum<0)$seqNum=0;
        $query="SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ> :last ORDER BY SEQ";
 		$stid = oci_parse($this->connect, $query);
		oci_bind_by_name($stid,":last",$seqNum);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
	}
	
	public function getLiveFeed($last)
	{
        $query="SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ> :last ORDER BY SEQ";
 		$stid = oci_parse($this->connect, $query);
		oci_bind_by_name($stid,":last",$last);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
	}
	
    public function getJournalTypes()
	{
        $query="SELECT MSG_LOOKUP.MESSAGE FROM ENUMITEM JOIN MSG_LOOKUP ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID) WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT' AND ENUMITEM.ENUM_NO!=0 AND MSG_LOOKUP.LANG_ID='".$this->mylang."'";
 		$stid = oci_parse($this->connect, $query);
		oci_bind_by_name($stid,":last",$last);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
    } 
	
    public function getJournalSearch($filter,$key,$start,$end)
	{
        $tmpStr = "";
		if ($filter != "")
		{
            $arr = explode(':',$filter);
            for ($i=0; $i<count($arr);$i++){
                $tmpStr = $tmpStr . " MSG_EVENT='" . $arr[$i] . "'";
                if ($i!=count($arr)-1) $tmpStr = $tmpStr . " OR ";
            }
        }
        if ($tmpStr != "") $tmpStr = " AND (".$tmpStr .")";
		
        //$query="SELECT * FROM GUI_SITE_JOURNAL WHERE REGION_CODE='ENG' AND GEN_DATE > '" .$start."' AND GEN_DATE < '".$end."'".$tmpStr." AND ROWNUM < 5000 ORDER BY SEQ DESC";
		
		$query="SELECT * FROM ( SELECT * FROM GUI_SITE_JOURNAL WHERE REGION_CODE='ENG' AND GEN_DATE > '" .$start."' AND GEN_DATE < '".$end."'".$tmpStr." ORDER BY SEQ DESC) WHERE ROWNUM < 5000";
 		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $row;
		}
		return($res);
    }
}
?>