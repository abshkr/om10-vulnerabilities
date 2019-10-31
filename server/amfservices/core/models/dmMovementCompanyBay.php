<?php
require_once(__DIR__ . "/../dmModel.php");

/**
 *
 * @author mc
 *
*/
class dmMovementCompanyBay extends dmModel{
	
	public function __construct( $params = false ){
		
		$this->SQLTable = "BA_CMPY_LNK";
		$this->dmClass = "dmMovementCompanyBay";
		$this->primaryKey = array("BACL_BAY_CODE", "BACL_CMPY_CODE");
	
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

}
?>