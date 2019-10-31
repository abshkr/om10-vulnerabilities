<?php
require_once (__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmMessagingIn.php");

class dmMessagingHost extends dmCollection{

	public $model;
	
	public function __construct( $params = false )
	{
		$this->SQLTable = "HST_IN_MSGS";
		$this->model = "dmMessagingIn";
		$this->dmClass = "dmMessagingHost";
		
		parent::__construct($params);
		$this->gather();
	}
}
?>