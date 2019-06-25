<?php
require_once(dirname(__FILE__) . '/../classes/GuiMeterDetails.class.php');

class GuiMeterDetailsService {
    var $tbl_name = "GUI_METER_DETAILS";
	
	public function getTransactionMeterDetails($txncode){
		$meter = new GuiMeterDetailsClass();
		return $meter->getTransactionMeterDetails($txncode);
	}
}