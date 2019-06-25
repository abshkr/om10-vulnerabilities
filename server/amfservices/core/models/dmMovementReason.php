<?php
require_once(__DIR__ . "/../dmModel.php");

/**
 *
 * @author mc
 *
*/
class dmMovementReason extends dmModel{
	
	public function __construct( $params = false ){
		
		$this->SQLTable = "MOV_REASONS";
		$this->dmClass = "dmMovementReason";
		$this->primaryKey = "MR_ID";
	
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		parent::__construct($params);
	}
	/**
	 * (non-PHPdoc)
	 * @see dmModel::setBlackList()
	 */
	protected function setBlackList(){
	
		if(!is_array($this->payloadBlackList))	$this->payloadBlackList = array();

		parent::setBlackList();
	
	}

	public function delete( $params = false ){	
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		$params->payload->MR_FLAG 		= "-1";
		//fallback to inherited model methods.
		return parent::update($params);
		
	}
}
?>