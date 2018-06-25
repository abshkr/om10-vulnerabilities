<?php
class OnsiteReport
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
	}

	public function getPersonnelOnSite()
	{
		$query = "select PER_NAME per_name,AREA_NAME per_area,PERL_ENTER_TIME per_enter_time from PERSONNEL,PERS_IN_AREA,AREA_RC where PER_CODE=PERL_PSN and PERL_ARA <> 9999 and PERL_ARA = AREA_K order by PERL_ARA,PER_NAME";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getAreas()
	{
		$query = "select * from AREA_RC";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getPersonnelRoles()
	{
		$query = "select * from ROLES_REF";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
	
    public function getTimeCode()
    {
 		$query = "select * from timecode";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
    }
	
	public function getSiteManager()
	{
		$query = "select SITE_NAME from SITE";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
}
?>