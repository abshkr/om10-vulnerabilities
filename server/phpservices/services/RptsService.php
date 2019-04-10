<?php
require_once(dirname(__FILE__) . '/../classes/Reports.class.php');

class RptsService {
   public function count(){
        $rpts = new ReportsClass();	
		$allItems	= $rpts->getReports();
		return count($allItems);
    }    
    
    public function getAll(){
		$rpts = new ReportsClass();	
		$allItems	= $rpts->getReports();
		return $allItems;
    }
	
    public function lookupCompanysByReports($report)
	{
		$rpts = new ReportsClass();	
		$allItems	= $rpts->lookupCompanysByReports($report);
		return $allItems;
    }
	
    public function getAllRptsByCompany($cmpy_code){
		$rpts = new ReportsClass();	
		$allItems	= $rpts->lookupRptsByCompany($cmpy_code);
		return $allItems;
    }
	
    public function getReportFilters($rptJaspFileName){
		$rpts = new ReportsClass();	
		$allItems = $rpts->getRptsFiltersByRpt($rptJaspFileName);
		return $allItems;
    }
	
    public function lookupCloseouts()
	{
		$rpts = new ReportsClass();	
		$allItems = $rpts->lookupCloseouts();
		return $allItems;
    }
	
    public function lookupCloseoutsByDates($start, $end)
	{
		$rpts = new ReportsClass();	
		$allItems = $rpts->lookupCloseoutsByDates($start, $end);
		return $allItems;
    }
}    
    