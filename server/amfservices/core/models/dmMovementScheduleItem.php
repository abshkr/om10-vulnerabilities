<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmMovementScheduleItem extends dmModel{

	public function __construct( $params = false ){

		$this->SQLTable = "MOV_SCHD_ITEMS";
		$this->dmClass = "dmMovementScheduleItem";
		$this->primaryKey = array("MSITM_SHLSTRIP", "MSITM_SHLSSUPP", "MSITM_LINEID");
		
		parent::__construct($params);
		
	}
	
	public function create( $params = false )
	{
/*		if($params)
		{
			if(isset($params->payload))
			{
				if(isset($params->payload->MVITM_KEY) && isset($params->payload->MVITM_NUMBER))
				{
					$sql = "SELECT MV_ID FROM MOVEMENTS where MV_KEY='".$params->payload->MVITM_KEY."' and MV_NUMBER='".$params->payload->MVITM_NUMBER."' ";
					if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;

					// next MV_ID
					$params->payload->MVITM_MOVE_ID = $chk->data[0]["MV_ID"];
				}
			}
		}
		
		// create an unique key for a nomination item so that it can be identified in bay
		$params->payload->MVITM_ITEM_ID = $params->payload->MVITM_MOVE_ID * 1000 + $params->payload->MVITM_LINE_ID;
*/
		return parent::create($params);		

	}

}
?>