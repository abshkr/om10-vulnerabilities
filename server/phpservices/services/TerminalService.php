<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Terminal.class.php');
require_once(dirname(__FILE__) . '/../classes/Validator.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');

class TerminalService
{
	var $tbl_name = "TERMINAL";
	
	public function count($filter,$order){
        $g = new GlobalClass();
        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }  
	
	public function getAllTerminal()
	{
		$term = new TerminalClass();
		return $term->getAll();
	}
	
	public function getPaged($filter,$order,$offset,$tot){
		$term = new TerminalClass();
        return $term->getPaged($offset,$tot,$filter,$order);
    }
	
	public function getDBAddress()
	{
		$term = new TerminalClass();
		return $term->getDBAddress();
	}
	
	public function update($code,$data)
	{
 		if(Validator::validateStringLength(1, 7, $data->term_code))
		{
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("TERM_CODE"=>($code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Site Configuration", "TERMINAL", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			$g = new GlobalClass();
			$res = $g->update($this->tbl_name,$code,$data);
			logMe("Result is: " . $res, TERMINAL);
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

			return $res;
		}
		return "FAIL";
	}
	
	public function create($data)
	{
		if(Validator::validateStringLength(1, 7, $data->term_code)){
			logMe('Validation is working', TERMINAL);
			$g = new GlobalClass();
			$ret = $g->create($this->tbl_name,$data);
			
			if ($ret == RETURN_OK)
			{
				$keys = array ("TERM_CODE"=>($data->term_code));
				$excludes = array ();
				$ins_journal = new UpdateJournalClass( "Terminal", "TERMINAL", $keys, $excludes );
				$ins_journal->logOneLine("created a terminal [" . $data->term_code . ":" . $data->term_name . "] successfully");
			}
		
			return $ret;
		}
		return "FAIL";
	}
	
	public function delete($code){
        $g = new GlobalClass();
        $ret = $g->delete($this->tbl_name,$code);
			
		if ($ret == RETURN_OK)
		{
			$keys = array ("TERM_CODE"=>($code));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Terminal", "TERMINAL", $keys, $excludes );
			$ins_journal->logOneLine("deleted a terminal [" . $code . "] successfully");
		}
		
		return $ret;
    }
	
	public function createTerminalAddress($data)
	{
		$g = new GlobalClass();
		return $g->create('DB_ADDRESS', $data);
	}
}