<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:59:04 PM
 */
class dmFolioManagement extends dmModel
{

	public function __construct( $params = false ){

		$this->SQLTable = "CLOSEOUTS";
		$this->dmClass = "dmFolioManagement";
		$this->primaryKey = "CLOSEOUT_NR";
		
		parent::__construct($params);
		
	}

	public function __destruct(){
		
	}


}
?>