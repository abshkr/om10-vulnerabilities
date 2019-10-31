<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmMovementCompanyBay.php");

class dmMovementCompanyBays extends dmCollection{

	/**
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
 		// this is a relationship table, no particular table is being used.
		$this->model    = "dmMovementCompanyBay";
		$this->dmClass  = "dmMovementCompanyBays";

		//required data;
		$this->bays     = array();
		$this->companys = array();
		$this->types    = array("Traditional Loading","Nomination Movement");
		parent::__construct($params);
		$this->getData($params);
		
	}

	public function getInstance($params = false){
		
		$mtObj = new dmMovementCompanyBays($params);
		$json_flag=1;
        $objData = (json_encode($mtObj));
		if ( $objData === FALSE )
		{
			$json_flag=0;
        	$objData = $mtObj;
		}
		
        return new dmMesg(array("data" => $objData, "json_on"=>$json_flag ));
		//return new dmMesg(array("data" => new dmMovementCompanyBays($params)));
	}
	
	/**
	 * (non-PHPdoc)
	 * @see dmCollection::getData()
	 */
	public function getData( $params = false )
	{
		$asynServiceCall = false;
		if ( $asynServiceCall == false )
		{
			// SQL for get all Company Code
			$sql = "SELECT * FROM GUI_COMPANYS WHERE SUPPLIER = 'Y'";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->companys = $chk->data;
			
			// SQL for get all Bay Code
			$sql = "SELECT * FROM BA_DEVICE";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->bays = $chk->data;
		}
		
		// SQL for MovementCompanyBays
		$sql = "SELECT * FROM BA_CMPY_LNK";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$this->collection = $chk->data;
		// class map
		$tArray = array();
		foreach($this->collection as $MovementCompanyBay){	
			$tArray[] = new dmMovementCompanyBay((object)array("payload" => (object)$MovementCompanyBay));

		}
		$this->collection = $tArray;
		return new dmMesg();	
	}
}
?>