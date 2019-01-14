<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmTank extends dmModel{

	public function __construct( $params = false ){

		$this->SQLTable = "TANKS";
		$this->dmClass = "dmTank";
		$this->primaryKey = array("TANK_BASE","TANK_TERMINAL");
		
		parent::__construct($params);
		
	}

	public function __destruct(){
		
	}

	
	
}
?>