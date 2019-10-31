<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmMovementScheduleItem.php");

class dmMovementScheduleItems extends dmCollection{

	/**
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->SQLTable = "MOV_SCHD_ITEMS";							//the table/view this collection maps to.
		$this->model = "dmMovementScheduleItem";							//the model that this collection should consist of.
		$this->dmClass = "dmMovementScheduleItems";							//the class name for Middleware/Front end integration.
		
		parent::__construct($params);		
		
		$this->gather();

	}

	public function getInstance($params = false)
	{
		new dmError(array("dev" => "getInstance in dmMovementScheduleItems "));

		return new dmMesg(array("data" => new dmMovementScheduleItems($params)));
	}

	
	
}


?>