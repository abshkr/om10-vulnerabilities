<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:59:04 PM
 */
class dmTankMeterReading extends dmModel
{

	public function __construct( $params = false ){

		$this->SQLTable = "GUI_METER_DETAILS";
		$this->dmClass = "dmTankMeterReading";
		$this->primaryKey = "TRSFTRID_TRSA_ID";
		
		parent::__construct($params);
		
	}

	public function __destruct(){
		
	}


}
?>