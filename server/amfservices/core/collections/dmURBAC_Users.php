<?php
require_once("dmPagedCollection.php");
require_once(__DIR__ . "/../models/URBAC_User.php");

class dmURBAC_Users extends dmPagedCollection{

	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->SQLTable = "URBAC_USERS";
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
		
		if(!($chk = parent::getData($params)) instanceOf dmMesg)	return $chk;
		
		$tArray = array();
		foreach($this->collection as $URBACUser){
			
			$tArray[] = new URBAC_User((object)array("payload" => $URBACUser));
		
		}
		
		$this->collection = $tArray;
		
		return new dmMesg();
		
	}
	
}
?>