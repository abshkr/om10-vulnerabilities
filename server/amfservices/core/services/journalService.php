<?php
require_once(__DIR__ . '/../collections/dmJournal.php');
require_once('dmsService.php');
class JournalService extends dmsService{

	private $journal;
	
	/**
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
		

		parent::__construct( $params );
		$this->table = "GUI_SITE_JOURNAL";
		
	}
	
	public function sync( $params ){
		
		//set normal params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		if(!isset($params->startTime))		return new dmError(array("dev" => "Please Sync with a startTime Time : Got [" . print_r($params, TRUE) . "]"));
		return $this->getPagedJournalEntries($params);
		
	} 
	
	
	/**
	 * 
	 * @param Array|Object $params
	 * 
	 * @return dmError|dmMesg
	 * 
	 *//*
    public function getPagedJournalEntries( $params ){

    	//set normal params
    	if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
    	$params = $chk->data;
    	
    	//set defaults
    	if(!isset($params->filter))			$params->filter = false;
    	if(!isset($params->startTime))		return new dmError(array("dev" => "Please provide a [startTime] as (YYYY-MM-DD HH:MM:SS)"));
    	
    	if(!isset($params->endTime))		$params->endTime = date("Y-m-d H:i:s");
    	if(!isset($params->startIdx))		$params->startIdx= false;
    	if(!isset($params->count))			$params->count = 100;
    	
    	$this->journal = new dmJournal( $params );
    	
    	//set the journals time range
    	//if(!($chk = $this->journal->setTimeRange(array("start" => $params->startTime, "end" => $params->endTime))) instanceOf dmMesg) return $chk;
    
    	//query 
		if(!($chk = $this->journal->getLatestPagedJournalLines($params)) instanceOf dmMesg) return $chk;
		$data = $chk->data;
		
        if(sizeof($data)==0){
        	
            return new dmMesg(array("dev" => "Query performed succesfully, no rows match the query however", "data" => array()));
            
        }else{

        	return $chk;
        	
        }
       
    } */
    
    public function getPagedJournalEntries( $params ){
    	
    	//pass params
    	if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)					return $chk;
    	$params = $chk->data;
    	
    	//create the folio exception; constructed with data set.
    	$rCollection = new dmJournal($params);
    	
    	//return the collection
    	return new dmMesg(array("data" => $rCollection));
    }
    

}



?>