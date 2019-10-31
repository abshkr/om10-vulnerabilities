<?php
require_once(__DIR__ . "/../dmCollection.php");

class dmCompanies extends dmCollection{
	
	/**
	 * Constructor
	 * @param Object|String $params - none.
	 */
	public function __construct( $params = false ){

		parent::__construct($params);
	
	}
	
	/**
	 * 
	 * @param string $params
	 * @return dmMesg, dmError
	 */
	public function getProductGroups( $params = false ){

		$sql="SELECT * FROM PRODUCT_GROUP";
	        	
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$ret = $chk->data;
		
		return new dmMesg(array("data" => $ret));
		
	}

	/**
	 * 
	 * @param string $params
	 * @return dmError|dmMesg
	 */
	public function getBaseClasses( $params = false ){
		
		$sql="SELECT * FROM BASECLASS";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$ret = $chk->data;
		
		return new dmMesg(array("data" => $ret));

	}
	
	/**
	 * 
	 * @param string $params
	 * @return Ambigous <dmMesg, dmError, unknown, Ambigous>|dmMesg
	 */
	public function lookup( $params = false ){
		
		$sql="SELECT BASE_CODE,BASE_NAME FROM BASE_PRODS";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$ret = $chk->data;
		
		return new dmMesg(array("data" => $ret));
	
	}
	
}
?>