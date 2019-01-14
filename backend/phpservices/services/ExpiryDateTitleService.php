<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/ExpiryDateTitle.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');

class ExpiryDateTitleService
{
	var $tbl_name = "EXPIRY_DATE";
	
	public function getOneExpiryDateTitle($no)
	{
		$edt = new ExpiryDateTitleClass();
		return $edt->getTitle($no);
	}
	
	public function getAllExpiryDateTitle()
	{
		$edt = new ExpiryDateTitleClass();
		return $edt->getAll();
	}
	
	public function update($data)
	{
		return "FAIL";
	}
	
}