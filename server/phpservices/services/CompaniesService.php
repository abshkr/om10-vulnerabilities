<?php
require_once(dirname(__FILE__) . '/../classes/Companies.class.php');
require_once(dirname(__FILE__) . '/../classes/Validator.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');

class CompaniesService {
    var $tbl_name = "COMPANYS";

    public function count($filter,$order){
        $g = new GlobalClass();
		if ($filter == "" )
		{
			//$filter = "";
			$filterObj = array();
			$filterObj['sql_text'] = "";
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$filterObj = json_decode( $filter );
			$fields = get_object_vars( $filterObj->fields );
			$types = get_object_vars( $filterObj->types );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		}

        //$g = new GlobalClass();
        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }    
    
    public function getCompanies($filter,$order)
	{
        $g = new GlobalClass();
		if ($filter == "" )
		{
			//$filter = "";
			$filterObj = array();
			$filterObj['sql_text'] = "";
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$filterObj = json_decode( $filter );
			$fields = get_object_vars( $filterObj->fields );
			$types = get_object_vars( $filterObj->types );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		}

		$comp = new CompaniesClass();
        $rows = $comp->getCompanies($filter,$order);
        return $rows;
    }
    
    public function getPaged($filter,$order,$offset,$tot){
        $g = new GlobalClass();
		if ($filter == "" )
		{
			//$filter = "";
			$filterObj = array();
			$filterObj['sql_text'] = "";
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$filterObj = json_decode( $filter );
			$fields = get_object_vars( $filterObj->fields );
			$types = get_object_vars( $filterObj->types );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		}

		$comp = new CompaniesClass();
        return $comp->getPaged($offset,$tot,$filter,$order);
    }
    
    public function getRecord($code){
		$comp = new CompaniesClass();
		return $comp->getCompany($code, $this->tbl_name);
    }
	
	public function getCompanyTypes() {
		$comp = new CompaniesClass();
		return $comp->getCompanyTypes($code);
	}
	
	public function getTransactionCompanyTypes(){
		$comp = new CompaniesClass();
		return $comp->getTransactionCompanyTypes();
	}
    
    public function create($data)
	{
		/*
        if(!Validator::validateStringLength(1, 8, $data->cmpy_code)) 
		{
			return "MSG_OMCS: 0";
		} 
		else if(!Validator::validateStringLength(1, 49, $data->cmpy_name)) 
		{
			return "MSG_OMCS: 1";
		} 
		else */
		{
			$g = new GlobalClass();
			$ret = $g->create($this->tbl_name,$data);
			if($ret != 'Success') {
				//trigger_error("Creation Error occured in Companies Service " . $ret, E_USER_ERROR);
                return "ERROR";
			} else {
		
				$keys = array ("CMPY_CODE"=>($data->cmpy_code));
				$excludes = array ();
				$ins_journal = new UpdateJournalClass( "Company", "COMPANYS", $keys, $excludes );
				$ins_journal->logOneLine("created a company [" . $data->cmpy_code . ":" . $data->cmpy_name . "] successfully");

				return $ret;
			}
		}
    }
    
    public function update($code,$data)
	{
		/*
		if(!Validator::validateStringLength(1, 49, $data->cmpy_name))
		{
			return "MSG_OMCS: 1";
		} 
		else */
		{
			
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("CMPY_CODE"=>($code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Company", "COMPANYS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			$g = new GlobalClass();
			$ret = $g->update($this->tbl_name,$code,$data);
			if($ret != 'Success') {
				//trigger_error("Update Error occurred in Companies Service " . $ret, E_USER_ERROR);
                return "ERROR";
			} else {
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

				return $ret;
			}
		}
    }
	

    
    public function delete($code){
        $g = new GlobalClass();
        $ret = $g->delete($this->tbl_name,$code);
		
		if($ret == 'Success') 
		{
			$keys = array ("CMPY_CODE"=>($code));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Company", "COMPANYS", $keys, $excludes );
			$del_journal->logOneLine("deleted a company [" . $code . "] successfully");
		}
		
        return $ret;
    }
    
    public function getTypes(){
        $comp = new CompaniesClass();
        return $comp->getTypes();
    }
    
    public function lookup(){
        $comp = new CompaniesClass();
        return $comp->lookup();
    }
    
    public function lookupByType($type){
        $comp = new CompaniesClass();
        return $comp->lookupByType($type);
    }

	 public function lookupCarriers($type){
        $comp = new CompaniesClass();
        return $comp->lookupCarriers($type);
    }
	
	public function lookupDocumentsPrinterLookup($cmpy_code)
	{
	    $comp = new CompaniesClass();
		return $comp->lookupDocumentsPrinterLookup($cmpy_code);
	}
	
	public function lookupLoadReportPrinter($cmpy_code)
	{
		$comp = new CompaniesClass();
		return $comp->lookupLoadReportPrinter($cmpy_code);
	}
	
	public function lookupDriverInstructions($cmpy_code)
	{
		$comp = new CompaniesClass();
		return $comp->lookupDriverInstructions($cmpy_code);
	}
}