<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmCloseoutProductOwner extends dmModel{

	public function __construct( $params = false ){

		$this->SQLTable = "CLOSEOUT_PRODOWNSHIP";
		$this->dmClass = "dmCloseoutProductOwner";
		$this->primaryKey = "CLOSEOUT_NR";
	
		parent::__construct($params);
		
	}

	public function __destruct(){
		
	}

	
	
}
?>