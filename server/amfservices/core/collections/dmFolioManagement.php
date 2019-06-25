<?php
require_once (__DIR__ . "/../dmCollection.php");

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:56:40 PM
 */
class dmFolioManagement extends dmCollection{

	public $model;
	
	public function __construct( $params = false ){
		
		$this->SQLTable = "CLOSEOUTS";
		$this->model = "dmFolio";
		$this->dmClass = "dmFolioManagement";
		
		parent::__construct($params);
		$this->gather();
		
	}
}
?>