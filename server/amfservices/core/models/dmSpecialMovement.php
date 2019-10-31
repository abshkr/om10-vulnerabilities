<?php
require_once(__DIR__ . "/../dmModel.php");

/**
 *
 * @author mc
 *
*/
class dmSpecialMovement extends dmModel{
	
	public function __construct( $params = false ){
		
		$this->SQLTable = "MOV_LOAD_ITEMS";
		$this->dmClass = "dmSpecialMovement";
		$this->primaryKey = "MLITM_ID";
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

	public function create( $params = false ){
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		$sess = $this->PLUG->dmpSession;
		$params->payload->MLITM_OPER_POSTED = $_SESSION['PERCODE'];
		$params->payload->MLITM_DTIM_POSTED = date('Y-m-d H:i:s', mktime());

		$sql = "SELECT MAX(MLITM_ID) as NUM FROM MOV_LOAD_ITEMS";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$params->payload->MLITM_ID  	 = $chk->data[0]["NUM"]+1;
		$params->payload->MLITM_MOV_NUM  = $chk->data[0]["NUM"]+1;


		return parent::create($params);			
	}

	public function update( $params = false ){
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		$sess = $this->PLUG->dmpSession;
		$params->payload->MLITM_OPER_POSTED = $_SESSION['PERCODE'];
		$params->payload->MLITM_DTIM_POSTED = date('Y-m-d H:i:s', mktime());
		unset($params->payload->RN);
		unset($params->payload->CAN_REVERSE);
		return parent::update($params);			
	}

	public function delete( $params = false ){
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		$sess = $this->PLUG->dmpSession;
		$params->payload->MLITM_OPER_POSTED = $_SESSION['PERCODE'];
		$params->payload->MLITM_DTIM_POSTED = date('Y-m-d H:i:s', mktime());
		unset($params->payload->RN);
		unset($params->payload->CAN_REVERSE);
		return parent::delete($params);			
	}

}
?>