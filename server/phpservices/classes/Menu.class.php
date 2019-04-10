<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('MENUCLASS')) define('MENUCLASS','Menu.class');

class MenuClass
{
	public function getMenuMain()
	{
		$myDB = DB::getInstance();
		$sql="SELECT * FROM GUI_URBAC_OBJECTS WHERE OBJECT_PARENT_ID='-1' AND DOMAIN_OBJECT_ACTIVE='1'";
		$rows = $myDB->query($sql);
		//XarrayEncodingConversion($rows);
		return ($rows);
	}

	public function getMenuItems()
	{
		$myDB = DB::getInstance();
		$sql="SELECT * FROM GUI_URBAC_OBJECTS WHERE DOMAIN_OBJECT_ACTIVE = '1' AND OBJECT_PARENT_ID = '0'";
		$rows = $myDB->query($sql);
		//XarrayEncodingConversion($rows);
		return ($rows);
	}
}
?>