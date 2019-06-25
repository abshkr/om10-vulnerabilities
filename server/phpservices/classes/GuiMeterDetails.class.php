<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('GUIMETERDETAILSCLASS')) define('GUIMETERDETAILSCLASS','GuiMeterDetails.class');

class GuiMeterDetailsClass {

	public function getTransactionMeterDetails($txncode){
		$mydb = DB::getInstance();
		//$sql = "SELECT * FROM GUI_METER_DETAILS WHERE TRSFTRID_TRSA_ID='$txncode'";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_METER_DETAILS WHERE TRSFTRID_TRSA_ID=:txncode and IS_INJECTOR!='Y'";
		$sql['sql_data'] = array( $txncode );
		
		$rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'GuiMeterDetails')));
	}
}