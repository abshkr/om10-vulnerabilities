<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author jz
 * @version 1.0
 * @created 15-10-2013 10:09:50 AM
 */
 
class dmManualTransactionData extends dmModel{

	public function __construct( $params = false ){

		$this->SQLTable = "MOVEMENTS";
		$this->dmClass = "dmManualTransactionData";
		$this->primaryKey = array("MV_ID");
		
		parent::__construct($params);
		
	}
	
	

	public function getXXXX( $params = false ){

		if($params){
			if(isset($params->payload))	$this->payload = $params->payload;
		}


		require_once(__DIR__ . "/../collections/dmManualTransactionsData.php");

		$coll = new dmManualTransactions((object)array(
				"filter" => (object)array(
						$this->payload->MV_ID=> (object)array(
								"fields" => "MVITM_MOVE_ID",
								"equality" => "exact"
						)
				)
		));


		return new dmMesg(array("dev" => "ManualTransactions retrieved for folio [" . $this->payload->MV_ID . "]", "data" => $coll));

	}

}
?>