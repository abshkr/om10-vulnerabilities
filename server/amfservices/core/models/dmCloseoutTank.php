<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmCloseoutTank extends dmModel{

	public function __construct( $params = false ){

		$this->SQLTable = "CLOSEOUT_TANK";
		$this->dmClass = "dmCloseoutTank";
		$this->sql='';
		$this->primaryKey = array("CLOSEOUT_NR", "TANK_TERMINAL", "TANK_CODE");
	//	$this->journalBlackList = array('LAST_CHG_TIME');

		parent::__construct($params);
		
	}

	public function __destruct(){
		
	}

	public function update( $params = false )
	{
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		$fol=$params->payload->FOLIO;
		$dens=$params->payload->CLOSE_DENSITY;
		$mass=$params->payload->CLOSE_MASS_TOT;
		$std=$params->payload->CLOSE_STD_TOT;
		$tmp=$params->payload->CLOSE_TEMP;
		$tank=$params->payload->TANK_CODE;
		$sql = "update CLOSEOUT_TANK SET OPEN_MASS_TOT='$mass', OPEN_DENSITY='$dens', OPEN_STD_TOT='$std', OPEN_TEMP='$tmp' where CLOSEOUT_NR=$fol and TANK_CODE='$tank'";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		//fallback to inherited model methods.
		unset($params->payload->FOLIO);
		unset($params->payload->TANK_BASE);
		unset($params->payload->BASE_NAME);
		
		unset($params->payload->CLOSE_AMB_TOT_RND);
		unset($params->payload->CLOSE_AMB_TOT);
		unset($params->payload->OPEN_STD_TOT_RND);
		unset($params->payload->OPEN_MASS_TOT_RND);
		unset($params->payload->CLOSE_STD_TOT_RND);
		unset($params->payload->CLOSE_MASS_TOT_RND);
		unset($params->payload->FREEZE_STD_TOT_RND);
		unset($params->payload->FREEZE_MASS_TOT_RND);
		
		unset($params->payload->BCLASS_DESC);
		unset($params->payload->BCLASS_NO);
		unset($params->payload->BCLASS_DENS_LO);
		unset($params->payload->BCLASS_DENS_HI);
		unset($params->payload->BCLASS_VCF_ALG);	
	
		unset($params->payload->TANK_DENSITY);
		
		return parent::update($params);
		
	}
	
	
}
?>