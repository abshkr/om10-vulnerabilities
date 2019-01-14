<?php
require_once(dirname(__FILE__) . '/../classes/Domain.class.php');

class DomainService {
    var $tbl_name = "URBAC_DOMAINS";
	
	public function getDomains()
	{
		$g = new DomainClass();
		$rows =$g->getDomains();
		return $rows;
	}
	
	public function getObjects()
	{
		$g = new DomainClass();
		$rows =$g->getObjects();
		return $rows;
	}
	
	public function getLinks()
	{
		$g = new DomainClass();
		$rows =$g->getLinks();
		return $rows;
	}

	public function getMenuMain()
	{
		$g = new DomainClass();
		$rows =$g->getMenuMain();
		return $rows;
	}
	
	public function getMenuItems()
	{
		$g = new DomainClass();
		$rows =$g->getMenuItems();
		return $rows;
	}

}
?>