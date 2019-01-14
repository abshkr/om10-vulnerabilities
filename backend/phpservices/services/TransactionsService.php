<?php

require_once(dirname(__FILE__) . '/../classes/Transactions.class.php');
require_once(dirname(__FILE__) . '/../classes/Validator.class.php');
require_once(dirname(__FILE__) . '/../classes/ReverseTransaction.class.php');

class TransactionsService {
	var $tbl_name = "GUI_TRANSACTIONS";
	
	
	public function count($filter,$order){
        $g = new GlobalClass();
        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }    
    
    public function getAll(){
        $g = new GlobalClass();
        $rows = $g->getAll($this->tbl_name);
        return $rows;
    }
	
	public function getTransactions($trip, $supplier)
	{
		$t = new TransactionsClass();
		$rows = $t->getTransactions($trip, $supplier);
		return $rows;
	}
	
	public function getMovementTransactions($move_id, $line_id)
	{
		$t = new TransactionsClass();
		return $t->getMovementTransactions($move_id, $line_id);
	}
    
    public function getPaged($filter,$order,$offset,$tot){
		$comp = new TransactionsClass();
        return $comp->getPaged($offset,$tot,$filter,$order);
    }
	
	public function getAllByCompany($code, $type){
		$trans = new TransactionsClass();
		return $trans->getAllByCompany($code,$type);
	}
	
	
    
    public function getRecord($code){
		$comp = new TransactionsClass();
		return $comp->getTransaction($code, $this->tbl_name);
    }
	
	public function update($code,$data){
		//if(!Validator::validateStringLength(1, 49, $data->cmpy_name)){
		//	return "MSG_OMCS: 1";
		//} else {
		$g = new GlobalClass();
		$ret = $g->update($this->tbl_name,$code,$data);
		if($ret != 'Success') {
			trigger_error("Update Error occured in Transactions Service " . $ret, E_USER_ERROR);
		} else {
			return $ret;
		}
	}
	
	public function closeTransaction($data){
		$data->session_id = $_SESSION['SESSION'];
		$trans = new TransactionsClass();
		return $trans->closeTransaction($data);
	}
	
	public function reverseTransactions($supplier,$trip,$archive, $login_user)
	{
		if ($archive == false)
		{
			$manual_tran = new ReverseTransactionClass();
			return $manual_tran->do_reverse($trip, $supplier, $login_user);
		}
		else
		{
			$rev_arch_tran = new ReverseTransactionClass();
			return $rev_arch_tran->do_reverse_archive($trip, $supplier, $login_user);
		}
	}
}

	
