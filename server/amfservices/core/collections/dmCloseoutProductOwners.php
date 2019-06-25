<?php

require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmCloseoutProductOwner.php");

class dmCloseoutProductOwners extends dmCollection{

	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->SQLTable = "CLOSEOUT_PRODOWNSHIP";
		$this->dmClass = "dmCloseoutProductOwners";
		$this->model = "dmCloseoutProductOwner";
		
		parent::__construct($params);
		
		$this->gather();
		
	}
	
}
?>