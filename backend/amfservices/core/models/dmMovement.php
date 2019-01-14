<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmMovement extends dmModel{

	public function __construct( $params = false ){

		$this->SQLTable = "MOVEMENTS";
		$this->dmClass = "dmMovement";
		$this->primaryKey = array("MV_ID");
		
		parent::__construct($params);
		
	}

	public function create( $params = false )
	{

		// get next MV_ID
		$sql = "SELECT COUNT(MV_ID) as CNT_NUM FROM MOVEMENTS";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;

		if ( $chk->data[0]["CNT_NUM"] == 0)
		{
			$next_id = 1;
		}
		else
		{
			$sql = "SELECT MAX(MV_ID)+1 as NEXT_ID FROM MOVEMENTS";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;

			new dmError(array("dev" => ">>>>>". print_r($chk->data, true). "<<<<<<<<<<<<<<<"));

			if ( is_null($chk->data[0]["NEXT_ID"]) == TRUE || $chk->data[0]["NEXT_ID"]=="" )
			{
				$next_id = 1;
			}
			else
			{
				$next_id = $chk->data[0]["NEXT_ID"];
			}
		}
		new dmError(array("dev" => ">>>>>next_id:". $next_id. "<<<<<<<<<<<<<<<"));
		
		if($params)
		{
			new dmError(array("dev" => ">>>>>". print_r($params, true). "<<<<<<<<<<<<<<<"));
			if(isset($params->payload))
			{
				$params->payload->MV_ID = $next_id;
			}
		}

		return parent::create($params);		

	}

	public function getMovementItems( $params = false ){

		if($params){
			if(isset($params->payload))	$this->payload = $params->payload;
		}


		require_once(__DIR__ . "/../collections/dmMovementItems.php");

		$coll = new dmMovementItems((object)array(
				"filter" => (object)array(
						$this->payload->MV_ID=> (object)array(
								"fields" => "MVITM_MOVE_ID",
								"equality" => "exact"
						)
				)
		));


		return new dmMesg(array("dev" => "MovementItems retrieved for folio [" . $this->payload->MV_ID . "]", "data" => $coll));

	}

}
?>