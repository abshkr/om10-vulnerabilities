<?php
require_once(dirname(__FILE__) . '/../classes/GuiTransactionDetails.class.php');


class GuiTransactionDetailsService {
	var $tbl_name = "GUI_TRANSACTION_DETAILS";

	public function getTransactionDetails($txn_id){
		$g = new GuiTransactionDetailsClass();
		$rows = $g->getTransactionDetails($txn_id);
		return $rows;
	}
}