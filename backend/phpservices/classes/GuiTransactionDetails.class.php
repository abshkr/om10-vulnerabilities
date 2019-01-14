<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('GUITRANSACTIONDETAILS')) define('GUITRANSACTIONDETAILS','GuiTransactionDetails.class');

class GuiTransactionDetailsClass {

	public function getTransactionDetails($txn_id) {
		$mydb = DB::getInstance();
		//$sql ="SELECT * FROM GUI_TRANSACTION_DETAILS WHERE trsftrid_trsa_id=$txn_id";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_TRANSACTION_DETAILS WHERE trsftrid_trsa_id=:txn_id";
		$sql['sql_data'] = array( $txn_id );
		
		$rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "guitransactiondetails")));
	}
}