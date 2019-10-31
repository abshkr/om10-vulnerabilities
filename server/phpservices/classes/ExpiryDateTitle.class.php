<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('EDTCLASS')) define('EDTCLASS','ExpiryDateTitle.class');

class ExpiryDateTitleClass
{
	public function getTitle($no)
	{
		$mydb = DB::getInstance();
		
		$sql = "SELECT * FROM EXPIRY_DATE WHERE EXPIRY_DATE_NO=$no";
		$rows = $mydb->query($sql);
		return (prepareForAMF($rows, array(0 => "ExpiryDateTitle")));
	}
	
	public function getAll()
	{
		$mydb = DB::getInstance();
		
		$sql = "SELECT * FROM EXPIRY_DATE";
		$rows = $mydb->query($sql);
		return (prepareForAMF($rows, array(0 => "ExpiryDateTitle")));
	}
	
}