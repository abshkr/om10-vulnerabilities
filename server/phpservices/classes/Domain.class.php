<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('DOMAINCLASS')) define('DOMAINCLASS','Domain.class');

class DomainClass
{
    var $tbl_domains = "URBAC_DOMAINS";
	var $tbl_objects = "URBAC_OBJECTS";
	var $tbl_links	 = "URBAC_DOMAIN_OBJECTS";
	
	public function getDomains()
	{
		$myDB = DB::getInstance();
		$sql="SELECT * FROM URBAC_DOMAINS ORDER BY DOMAIN_TEXT";
		$rows = $myDB->query($sql);
		//XarrayEncodingConversion($rows);
		return ($rows);
	}
	
	public function updateDomain($data)
	{
        $g = new GlobalClass();
        $ret = $g->update($this->tbl_domains,$data);
        return $ret;
	}
	
	public function createDomain($data)
	{
        $g = new GlobalClass();
        $ret = $g->create($this->tbl_domains,$data);
        return $ret;
	}
	
	public function deleteDomain($data)
	{
        $g = new GlobalClass();
        $ret = $g->delete($this->tbl_domains,$data);
        return $ret;
	}
	
	public function getObjects()
	{
		$myDB = DB::getInstance();
		$sql="SELECT * FROM GUI_URBAC_OBJECTS ORDER BY OBJECT_TEXT";
		$rows = $myDB->query($sql);
		//XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "GUI_URBAC_OBJECTS")));        
	}
	
	public function updateObject($data)
	{
	
	}
	
	public function createObject($data)
	{
	
	}
	
	public function deleteObject($data)
	{
	
	}

	public function getLinks()
	{
		$myDB = DB::getInstance();
		$sql="SELECT * FROM URBAC_DOMAIN_OBJECTS";
		$rows = $myDB->query($sql);
		//XarrayEncodingConversion($rows);
		return ($rows);
	}
	
	public function getMenuMain()
	{
		$myDB = DB::getInstance();
		$sql="SELECT * FROM GUI_URBAC_OBJECTS WHERE OBJECT_PARENT_ID='-1' AND DOMAIN_OBJECT_ACTIVE='1' ORDER BY RECORD_ORDER";
		$rows = $myDB->query($sql);
		//XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "MenuObjects")));        
	}

	public function getMenuItems()
	{
		$myDB = DB::getInstance();
		$sql="SELECT * FROM GUI_URBAC_OBJECTS WHERE DOMAIN_OBJECT_ACTIVE = '1' AND OBJECT_PARENT_ID <> '-1' ORDER BY RECORD_ORDER";
		$rows = $myDB->query($sql);
		//XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "ModuleObjects")));        
	}
}
?>