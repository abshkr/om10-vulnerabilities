<?php
require_once( 'bootstrap.php' );

class Lookups
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
		$this->connect = oci_connect($this->username,$this->password,$this->server,"zhs16gbk");
	}
	
    public function lookupOrderCustomer($supplier)
	{
		$query="
			select 
				cust.CUST_ACCT as CUST_ACNT 
				, cust.CUST_SUPP as CUST_SUPP_CODE
				, scmp.CMPY_NAME as CUST_SUPP_NAME
				, cust.CUST_CODE as CUST_CMPY_CODE
				, ccmp.CMPY_NAME as CUST_CMPY_NAME
			from 
				CUSTOMER cust
				, COMPANYS scmp
				, COMPANYS ccmp
			where 
				cust.CUST_SUPP = scmp.CMPY_CODE 
				and cust.CUST_CODE = ccmp.CMPY_CODE
				and (cust.CUST_SUPP=:supplier) 
			order by CUST_CMPY_NAME			
			";
			
			
		$sql = array();
        $sql['sql_text'] = $query;
		$sql['sql_data'] = array( $supplier );
			
        $mydb = DB::getInstance();
		$data = $mydb->query($sql, 'N');
 
		return($data);
    }	
	
    public function lookupOrderCustomer2($supplier)
	{
		$query="
			select 
				cust.CUST_ACCT as CUST_ACNT 
				, cust.CUST_SUPP as CUST_SUPP_CODE
				, scmp.CMPY_NAME as CUST_SUPP_NAME
				, cust.CUST_CODE as CUST_CMPY_CODE
				, ccmp.CMPY_NAME as CUST_CMPY_NAME
			from 
				CUSTOMER cust
				, COMPANYS scmp
				, COMPANYS ccmp
			where 
				cust.CUST_SUPP = scmp.CMPY_CODE 
				and cust.CUST_CODE = ccmp.CMPY_CODE
				and (cust.CUST_SUPP='$supplier') 
			order by CUST_CMPY_NAME			
			";
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