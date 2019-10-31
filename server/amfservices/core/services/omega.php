<?php
class Omega
{
	var $username;
	var $password;
	var $dbase;
	var $server;	

	// var $username = "ShNewport";
	// var $password = "ShNewport";
	// var $server = '10.1.10.71/OML5K';	

		$this->username = $_SERVER['OMEGA_USER'];
		$this->password = $_SERVER['OMEGA_PWD'];
		$this->dbase    = $_SERVER['OMEGA_DBASE'];
		$this->server   = "localhost";


	//var $server = $_SERVER['SERVER_ADDR'];
	//var $username = "mw23112009";
	//var $password = "mw2311";
	//var $server = "//10.1.10.240/us7a";
	var $connect;
# 
	public function __construct()
	{

		//$server = 'localhost/OML5K';	
		//$this->connect = oci_connect($this->username,$this->password,$this->server);
		$this->connect = oci_connect($this->username, $this->password, $this->server .  '/' . $this->dbase);
	}

	public function getMessages()
	{
		$query = 'select * from HST_IN_MSGS'; 
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getCloseouts()
	{
		$query = 'select * from CLOSEOUTS';
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getAllCompanies()
	{
		$query = 'select * from COMPANYS';
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getJournals()
	{
		$query = 'select * FROM GUI_SITE_JOURNAL WHERE ROWNUM < 500';
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
	
	
	public function getCompanyList()
	{
		$query = 'select CMPY_NAME,CMPY_CODE from COMPANYS';
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			
			$resArray[] = $row;
		}
		return($resArray);
	}
		
    public function getCompanyByType($type)
	{
		$query = 'select * from COMPANYS';
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$flagtest = $row->CMPY_TYPE  &  $type;
			if ($flagtest == $type)
			{
			$resArray[] = $row;
			}
		}
		return($resArray);
	}
	
	public function getAccessKeys()
	{
		$stid = oci_parse($this->connect, 'select * from ACCESS_KEYS');
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getAccessKeysByIssuer($issuer,$key_type)
	{
		$query = 'select * from ACCESS_KEYS where KYA_KEY_ISSUER=:issuer ';
		$stid = oci_parse($this->connect, $query);
		oci_bind_by_name($stid,":issuer",$issuer);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			if ($key_type == -1 or $key_type == $row->KYA_TYPE)
			{
			$resArray[] = $row;
			}
		}
		return($resArray);
	}
	
	public function getKeyType()
	{
		$stid = oci_parse($this->connect, 'select * from KEY_TYP');
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	
	}
	
	public function getTransactions()
	{        
        $query="select * from GUI_TRANSACTIONS";
     
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
 	
	}
	
	public function geturbac()
	{
        $query="select * from URBAC_OBJECTS";
     
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
 	
	}

	public function getAllEnums()
	{
		$query = 'select view_name from user_views';
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$tmpStr = $row->VIEW_NAME;
			$found = mb_strpos($tmpStr, '_TYP');
			if  ($found == true)
			{
				$qry = 'select * from '.$tmpStr.' ORDER BY 2';
				$tid = oci_parse($this->connect, $qry);
				oci_execute($tid);
				
				while (($row = oci_fetch_row($tid)))
				{
					$tmp['id'] = (int)$row[0];
					$tmp['desc'] = $row[1];
					$tmp['type'] = $tmpStr;
					$resArray[] = $tmp;
				}
			}
		}
		return($resArray);
	}	
}

?>