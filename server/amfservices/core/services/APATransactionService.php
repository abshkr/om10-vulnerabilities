<?php
class APATransactionService
{
	var $username;
	var $password;
	var $server;	
	var $connect;

	public function __construct()
	{
		$this->username = $_SERVER['OMEGA_USER'];
		$this->password = $_SERVER['OMEGA_PWD'];
		$this->server = 'localhost/OML5K';	
		$this->connect = oci_connect($this->username,$this->password,$this->server,"zhs16gbk");
	}
	
    public function getData($start,$end)
	{		
        $format = "rrrr-MM-DD hh24:mi:ss";
 		$sd = "TO_DATE('" . $start . "', '" . $format . "')";
		$ed = "TO_DATE('" . $end . "', '" . $format . "')";
	    $query="SELECT * FROM ( SELECT * FROM INTERFACE_TRANS WHERE  TRAN_DATE > $sd AND TRAN_DATE < $ed ORDER BY SEQ DESC) WHERE ROWNUM < 5000";
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