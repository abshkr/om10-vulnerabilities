<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmMovementItem.php");

class dmMovementItems extends dmCollection{

	/**
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->SQLTable = "MOVEMENT_ITEMS";							//the table/view this collection maps to.
		$this->model = "dmMovementItem";							//the model that this collection should consist of.
		$this->dmClass = "dmMovementItems";							//the class name for Middleware/Front end integration.
		
		parent::__construct($params);		
		
		$this->gather();

	}

	public function getInstance($params = false)
	{
		new dmError(array("dev" => "getInstance in dmMovementItems "));

		return new dmMesg(array("data" => new dmMovementItems($params)));
	}

	
	
}


?>