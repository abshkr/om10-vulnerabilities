<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmCloseoutMeter extends dmModel
{

	public function __construct( $params = false )
	{
		$this->SQLTable = "CLOSEOUT_METER";
		$this->dmClass = "dmCloseoutMeter";
		$this->primaryKey = array("CLOSEOUT_NR", 'METER_CODE');
	
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		
		parent::__construct($params);
	}

	public function __destruct()
	{
		
	}
	
	public function update( $params = false )
	{
	
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
        if ($params->payload->CLOSE_MASS_TOT != null && $params->payload->CLOSE_AMB_TOT != null && $params->payload->CLOSE_STD_TOT != null)
        {
            $fol=$params->payload->FOLIO;
            $mass=$params->payload->CLOSE_MASS_TOT;
            $std=$params->payload->CLOSE_STD_TOT;
            $amb=$params->payload->CLOSE_AMB_TOT;
            $mtr=$params->payload->METER_CODE;
		
            $sql = "update CLOSEOUT_METER SET OPEN_MASS_TOT=$mass, OPEN_AMB_TOT=$amb, OPEN_STD_TOT=$std where CLOSEOUT_NR=$fol and METER_CODE='$mtr'";
            if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
        }
		//fallback to inherited model methods.
		unset($params->payload->FOLIO);
		unset($params->payload->BAM_QTY_TYPE);
		unset($params->payload->STREAM_BASECODE);
		unset($params->payload->STREAM_BASENAME);
		unset($params->payload->STREAM_TANKCODE);
		unset($params->payload->STREAM_TANKTEMP);
		unset($params->payload->STREAM_TANKDEN);
		return parent::update($params);
		
	}
}
?>