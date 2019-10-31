<?php
class TransactionsService
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
	
	public function getTransactions()
	{
		$query ="SELECT * FROM GUI_TRANSACTIONS";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getTripTransactions($trip,$supplier)
	{
		$query = "SELECT * from gui_transactions where trsa_trip='$trip' and trsa_supplier='$supplier'";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}

	public function getTransactionDetails($txn_id) 
	{
		$query ="SELECT * FROM GUI_TRANSACTION_DETAILS WHERE trsftrid_trsa_id='$txn_id'";
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