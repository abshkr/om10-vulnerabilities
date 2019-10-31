<?php
require_once ('dmCalendarCollection.php');
require_once(__DIR__ . "/../models/dmTankMeterReading.php");

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:40 PM
 */
class dmTankMeterReadings extends dmCalendarCollection{

	public function __construct( $params = false ){
		
		$this->SQLTable = "GUI_METER_DETAILS";
		parent::__construct($params);
		
		$this->getData();
		
	}
	
	/**
	 *
	 *
	 *
	 * (non-PHPdoc)
	 * @see dmCollection::getData()
	 */
	public function getData( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//set the sqlSelector and counter
		$this->sqlSelect = "SELECT * FROM " . $this->SQLTable;
		$this->sqlCount = "SELECT COUNT(*) FROM " . $this->SQLTable;
		
		if(!($chk = parent::getData($params)) instanceOf dmMesg)	return $chk;
		if(!($chk = parent::compile($params)) instanceOf dmMesg)	return $chk;
		if(!($chk = $this->processSQL($params)) instanceOf dmMesg)	return $chk;
		
		$tArray = array();
		foreach($this->collection as $dmTankMeterReading){
					
			$tArray[] = new dmTankMeterReading((object)array("payload" => $dmTankMeterReading));
		
		}
		
		$this->collection = $tArray;
		return new dmMesg();
		
	}
	
	public function __destruct(){
		
	}


}
?>