<?php
require_once (__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmMessagingOut.php");

class dmMessagingOmega extends dmCollection{

	public $model;
	
	public function __construct( $params = false ){
		$this->SQLTable = "HST_OUT_MSGS";
		$this->model = "dmMessagingOut";
		$this->dmClass = "dmMessagingOmega";
		
		parent::__construct($params);
		$this->gather();
		
	}
}
?>