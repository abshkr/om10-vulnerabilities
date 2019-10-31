<?php
require_once(dirname(__FILE__) . '/../classes/LoadSchedules.class.php');
require_once(dirname(__FILE__) . '/../classes/Seals.class.php');
require_once(dirname(__FILE__) . '/../classes/LoadSchdDriver.class.php');

class LoadSchedulesService 
{
    var $tbl_name = "GUI_SCHEDULES";
    
    public function count($values, $dtypes, $sorts, $orders){
        $g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types );
		}

        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }
	
   public function getReport($values, $dtypes, $sorts, $orders)
   {
		$g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types );
		}
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
	
        $db = new LoadSchedulesClass();
        $rows = $db->getReport($filter,$sort);
        return $rows;
   }
   
   public function getPaged($values, $dtypes, $sorts, $orders, $offset, $tot)
	{
		$g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types );
		}
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
	
        $db = new LoadSchedulesClass();
        $rows = $db->getPaged($offset,$tot,$filter,$sort);
       return $rows;
	   //return (json_encode($rows));
    }   
   
   public function getTrips($values, $dtypes, $sorts, $orders, $offset, $tot)
	{
		$g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types );
		}
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
	
        $db = new LoadSchedulesClass();
        $rows = $db->getPaged($offset,$tot,$filter,$sort);
       return $rows;
	   //return (json_encode($rows));
    }  
	
    public function tankersLookup(){
        $db = new LoadSchedulesClass();
        $rows = $db->tankersLookup();
        return $rows;
    }
    
    public function suppliersLookup(){
        $db = new LoadSchedulesClass();
        $rows = $db->suppliersLookup();
        return $rows;
    }

    public function drawersLookup(){
        $db = new LoadSchedulesClass();
        $rows = $db->drawersLookup();
        return $rows;
    }
	
    public function carriersLookup(){
        $db = new LoadSchedulesClass();
        $rows = $db->carriersLookup();
        return $rows;
    }

    public function tankersLookupByCarrier($carrier){
        $db = new LoadSchedulesClass();
        $rows = $db->tankersLookupByCarrier($carrier);
        return $rows;
    }    
    public function productsLookup($cmpy_code){
        $db = new LoadSchedulesClass();
        $rows = $db->productsLookup($cmpy_code);
        return $rows;        
    }
        
    public function getOrders($cmpy_code){
        $db = new LoadSchedulesClass();
        $rows = $db->getOrders($cmpy_code);
        return $rows;
    }    

    public function getOrderDetails($cmpy_code,$order_id){
        $db = new LoadSchedulesClass();
        $rows = $db->getOrderDetails($cmpy_code,$order_id);
        return $rows;        
    }
    
    public function getLastCompartmentProducts($supplier,$tanker){
        $db = new LoadSchedulesClass();
        $rows = $db->getLastCompartmentProducts($supplier,$tanker);
        return $rows;                
    }
    
    public function getScheduledCompartments($supplier,$trip_no){
        $db = new LoadSchedulesClass();
        $rows = $db->getScheduledCompartments($supplier,$trip_no);
        return $rows;                
    } 
	
    public function getDetailsByProducts($supplier,$trip_no){
        $db = new LoadSchedulesClass();
        $rows = $db->getDetailsByProducts($supplier,$trip_no);
        return $rows;                
    }
	
    public function getDetailsByCompartments($supplier,$trip_no){
        $db = new LoadSchedulesClass();
        $rows = $db->getDetailsByCompartments($supplier,$trip_no);
        return $rows;                
    }
    public function getSeqNum($sess_id,$terminal,$supplier){

        $sess_id = $_SESSION['SESSION'];
        $db = new LoadSchedulesClass();
        $rows = $db->getSeqNum($sess_id,$terminal,$supplier);
        return $rows;
    }
    
    public function checkTripNumber($trip_no,$supplier){
        $db = new LoadSchedulesClass();
        $rows = $db->checkTripNumber($trip_no,$supplier);
        return $rows;
    }       
    
    public function create($data){
        $data->session_id = $_SESSION['SESSION'];
        $db = new LoadSchedulesClass();
        $rows = $db->create($data);
        return $rows;
    }
	
    public function update($data){

        $data->session_id = $_SESSION['SESSION'];
        $db = new LoadSchedulesClass();
        $rows = $db->update($data);
        return $rows;
    }

    public function delete($data){
        $data->session_id = $_SESSION['SESSION'];
        $db = new LoadSchedulesClass();
        $rows = $db->delete($data);
        return $rows;
    }
	
	public function getSchedStatus()
	{
        $db = new LoadSchedulesClass();
        $rows = $db->schedStatus();
        return $rows;
		
	}
	
    public function adhocKeyLookup()
	{
        $db = new LoadSchedulesClass();
        $rows = $db->getAdhocKeys();
        return $rows;
    }
	
	public function updateAdhocKey($data)
	{
        
        $data->session_id = $_SESSION['SESSION'];
        $db = new LoadSchedulesClass();
        $rows = $db->updateAdhocKey($data);
        return $rows;
	}

    public function setPrefix($seal, $prefix)
    {
        if(strlen($prefix)>5){
            return "Prefix too long, Maximum 5 characters.";
        }
        $g = new SealsClass();
        $rows = $g->setPrefix($seal, $prefix);
        return $rows;
    }
    
    public function setSuffix($seal, $suffix)
    {
        if(strlen($suffix)>3){
            return "Suffix too long, Maximum 3 characters.";
        }
        $g = new SealsClass();
        $rows = $g->setSuffix($seal, $suffix);
        return $rows;
    }

    public function getSeals($trip, $supplier)
    {
        $g = new SealsClass();
        $rows = $g->getSeals($trip, $supplier);
        return $rows;
    }
    public function allocateSeal($trip, $supplier, $numSeal)
    {
        if($numSeal > 120){
            return "To many Seals, Maximum 120";
        }
        $g = new SealsClass();
        $rows = $g->allocateSeal($trip, $supplier, $numSeal);
        return $rows;
    }
     public function deallocateAllSeal($trip, $supplier)
    {
        $g = new SealsClass();
        $rows = $g->deallocateAllSeal($trip, $supplier);
        return $rows;
    }
    public function getNextSeal()
    {
        $g = new SealsClass();
        $rows = $g->getNextSeal();
        return $rows;
    }
    public function setNextSeal($seal)
    {
        $g = new SealsClass();
        $rows = $g->setNextSeal($seal);
        return $rows;
    }
    public function deleteSeal($seal)
    {
        $g = new SealsClass();
        $rows = $g->deleteSeal($seal);
        return $rows;
    }
    public function reallocate($seal, $trip, $supplier, $cmpt_nr)
    {
        $g = new SealsClass();
        $rows = $g->deleteSeal($seal);
        $rows = $g->reallocate($trip, $supplier, $cmpt_nr);
        return $rows;
    }
    public function allocateOne($trip, $supplier, $cmpt_nr)
    {
        $g = new SealsClass();
        $rows = $g->reallocate($trip, $supplier, $cmpt_nr);
        return $rows;
    }
	
	//
	public function resetScheduleDriver($trip, $supp, $driver)
	{
		$g = new LoadSchdDriverClass();
		$result = $g->resetScheduleDriver($trip, $supp, $driver);
		return $result;
	}
	
	public function lookupPSNListByCmpy($cmpycode){
		$g = new LoadSchdDriverClass();
		$result = $g->lookupPSNListByCmpy($cmpycode);
		return $result;
	}
	
	public function lookupCmpyByDriver($drivercode){
		$g = new LoadSchdDriverClass();
		$result = $g->lookupCmpyByDriver($drivercode);
		return $result;
	}
	
	public function getScheduleDriver($trip, $supplier) {
		$g = new LoadSchdDriverClass();
		$result = $g->getScheduleDriver($trip, $supplier);
		return $result;
	}
	
	public function getCompanyByDriver($driver) {
		$g = new LoadSchdDriverClass();
		$result = $g->getCompanyByDriver($driver);
		return $result;
	}
	
	public function employerCmpyLookup() {
		$g = new LoadSchdDriverClass();
		$result = $g->employerCmpyLookup();
		return $result;
	}
}

?>
