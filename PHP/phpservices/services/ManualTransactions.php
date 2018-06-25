<?php
require_once(dirname(__FILE__) . '/../classes/LoadSchedules.class.php');

class ManualTransactionsService 
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
        $db = new LoadSchedulesClass();
        $rows = $db->create($data);
        return $rows;
    }
	
    public function update($data){
        $db = new LoadSchedulesClass();
        $rows = $db->update($data);
        return $rows;
    }

    public function delete($data){
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
        $db = new LoadSchedulesClass();
        $rows = $db->updateAdhocKey($data);
        return $rows;
	}
}

?>
