<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmCloseoutTank.php");

class dmCloseoutTanks extends dmCollection{

	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->SQLTable = "CLOSEOUT_TANK";
		$this->model = "dmCloseoutTank";
		$this->dmClass = "dmCloseoutTanks";
		
		//$this->gather();

		parent::__construct($params);
		$this->getData($params);
	}

	public function getData($params){
		$nr = key($params->filter);
		$sql = "SELECT 
					CLOSEOUT_TANK.CLOSEOUT_NR
					, CLOSEOUT_TANK.TANK_TERMINAL
					, CLOSEOUT_TANK.TANK_CODE
					, CLOSEOUT_TANK.OPEN_STD_TOT
					, CLOSEOUT_TANK.OPEN_MASS_TOT
					, CLOSEOUT_TANK.LAST_GAUGE_TIME
					, CLOSEOUT_TANK.CLOSE_STD_TOT
					, CLOSEOUT_TANK.CLOSE_MASS_TOT
					, CLOSEOUT_TANK.FREEZE_STD_TOT
					, CLOSEOUT_TANK.FREEZE_MASS_TOT
					, CLOSEOUT_TANK.RCPT_VOL
					, CLOSEOUT_TANK.TRF_VOL
					, CLOSEOUT_TANK.FREEZE_TEMP
					, CLOSEOUT_TANK.FREEZE_DENSITY
					, CLOSEOUT_TANK.CLOSE_TEMP
					, CLOSEOUT_TANK.CLOSE_DENSITY
					, CLOSEOUT_TANK.OPEN_TEMP
					, CLOSEOUT_TANK.OPEN_DENSITY
					, CLOSEOUT_TANK.DESCRIPTION
					, CLOSEOUT_TANK.USER_CODE
					, CLOSEOUT_TANK.LAST_CHG_TIME					
					, TANKS.TANK_BASE
					, BASE_PRODS.BASE_NAME  
					, CAST (CLOSEOUT_TANK.OPEN_STD_TOT as INT) as OPEN_STD_TOT_RND
					, CAST (CLOSEOUT_TANK.OPEN_MASS_TOT as INT) as OPEN_MASS_TOT_RND
					, CAST (CLOSEOUT_TANK.CLOSE_STD_TOT as INT) as CLOSE_STD_TOT_RND
					, CAST (CLOSEOUT_TANK.CLOSE_MASS_TOT as INT) as CLOSE_MASS_TOT_RND
					, CAST (CLOSEOUT_TANK.FREEZE_STD_TOT as INT) as FREEZE_STD_TOT_RND
					, CAST (CLOSEOUT_TANK.FREEZE_MASS_TOT as INT) as FREEZE_MASS_TOT_RND
					, BASECLASS.BCLASS_DESC
					, BASECLASS.BCLASS_NO
					, BASECLASS.BCLASS_DENS_LO
					, BASECLASS.BCLASS_DENS_HI
					, BASECLASS.BCLASS_VCF_ALG					
					, TANKS.TANK_DENSITY
		        FROM 
					CLOSEOUT_TANK
					, TANKS
					, BASE_PRODS
					, BASECLASS 
		        WHERE  
					CLOSEOUT_TANK.TANK_CODE = TANKS.TANK_CODE 
					AND TANKS.TANK_BASE = BASE_PRODS.BASE_CODE 
					AND BASE_PRODS.BASE_CAT = BASECLASS.BCLASS_NO
					AND CLOSEOUT_TANK.CLOSEOUT_NR = " . $nr . " ORDER BY BASECLASS.BCLASS_DESC";
 		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
 		$this->collection = $chk->data;
		foreach($this->collection as $dmCloseoutTank){	
			$tArray[] = new dmCloseoutTank((object)array("payload" => (object)$dmCloseoutTank));
		}
		$this->collection = $tArray;
		return new dmMesg();	
	}	
	
}


?>