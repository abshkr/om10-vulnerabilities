<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmCloseoutMeter.php");

class dmCloseoutMeters extends dmCollection{

	/**
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->SQLTable = "CLOSEOUT_METER";
		$this->model = "dmCloseoutMeter";
		$this->dmClass = "dmCloseoutMeters";
		
		parent::__construct($params);
		$this->getData($params);
		//$this->gather();

	}	


	public function getData( $params = false ){
		$nr = key($params->filter);
		$sql = "SELECT DISTINCT CLOSEOUT_METER.*, BA_METERS.BAM_QTY_TYPE,  GUI_PIPENODE.STREAM_BASECODE, GUI_PIPENODE.STREAM_BASENAME, GUI_PIPENODE.STREAM_TANKCODE, GUI_PIPENODE.STREAM_TANKTEMP, GUI_PIPENODE.STREAM_TANKDEN  
				FROM 	CLOSEOUT_METER, BA_METERS,  GUI_PIPENODE  
				WHERE 	CLOSEOUT_METER.METER_CODE = BA_METERS.BAM_CODE AND
        			  	CLOSEOUT_METER.METER_CODE = GUI_PIPENODE.STREAM_MTRCODE AND 
        			  	BA_METERS.BAM_CODE		  = GUI_PIPENODE.STREAM_MTRCODE AND 
						CLOSEOUT_METER.CLOSEOUT_NR = " . $nr ." ORDER BY CLOSEOUT_NR, METER_CODE";
						/*
		$sql = "SELECT  CLOSEOUT_METER.*, BA_METERS.BAM_QTY_TYPE
				FROM 	CLOSEOUT_METER, BA_METERS  
				WHERE 	CLOSEOUT_METER.METER_CODE = BA_METERS.BAM_CODE AND
						CLOSEOUT_METER.CLOSEOUT_NR = " . $nr ;
						*/
 		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
 		$this->collection = $chk->data;
		$tArray = array();
		$lastOne = "";
		foreach($this->collection as $dmCloseoutMeter){	
			if($lastOne!=$dmCloseoutMeter["METER_CODE"]){
				$lastOne=$dmCloseoutMeter["METER_CODE"];
				$tArray[] = new dmCloseoutMeter((object)array("payload" => (object)$dmCloseoutMeter));
			}
		}
		$this->collection = $tArray;
		return new dmMesg();	
	}

	
}
?>