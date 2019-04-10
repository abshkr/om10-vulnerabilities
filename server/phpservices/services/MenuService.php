<?php
require_once(dirname(__FILE__) . '/../classes/Menu.class.php');

class MenuService {
    var $tbl_name = "GUI_DOMAIN_OBJECTS";
	
	public function getMainMenu()
	{
		$g = new MenuClass();
		$rows =$g->getMenuMain();
		return $rows;
	}
	
	public function getItems()
	{
		$g = new MenuClass();
		$rows =$g->getMenuItems();
		return $rows;
	}
 }
?>