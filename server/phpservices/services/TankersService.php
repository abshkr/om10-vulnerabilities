<?php
require_once(dirname(__FILE__) . '/../classes/EquipmentTypes.class.php');
require_once(dirname(__FILE__) . '/../classes/Tankers.class.php');

class TankersService {
    var $tbl_name = "GUI_TANKERS";

    public function count($values, $dtypes, $sorts, $orders){
        $g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			//$filter = $values;
			$filterObj = array();
			$filterObj['sql_text'] = $values;
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		}

        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }

    public function isTankerScheduled($tnkr_code){
        $g = new GlobalClass();
		$tbl_name = "SCHEDULE";
		//$filter = "WHERE SHL_TANKER='" . $tnkr_code . "' ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE SHL_TANKER=:tnkr_code ";
		$filter['sql_data'] = array( $tnkr_code );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function isTankerExisted($tnkr_code){
        $g = new GlobalClass();
		$tbl_name = "TANKERS";
		//$filter = "WHERE UPPER(TNKR_CODE)=UPPER('" . $tnkr_code . "') ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE UPPER(TNKR_CODE)=UPPER(:tnkr_code) ";
		$filter['sql_data'] = array( $tnkr_code );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }
    
    public function getAll(){
        $g = new GlobalClass();
        $rows = $g->getAll($this->tbl_name);
        return $rows;
    }
    
	public function getTankers($values, $dtypes, $sorts, $orders)
	{
		$g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			//$filter = $values;
			$filterObj = array();
			$filterObj['sql_text'] = $values;
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		}
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
	
        $et = new TankersClass();
        $rows = $et->getTankers($filter,$sort);

        $object = json_decode(json_encode($rows), FALSE);
        
        $a = array();

        foreach ($object as $key) {
            
            array_push($a, $key);
 
        }

        return $a;

	}
	
    public function getPaged($values, $dtypes, $sorts, $orders, $offset, $tot)
	{
		$g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			//$filter = $values;
			$filterObj = array();
			$filterObj['sql_text'] = $values;
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		}
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
	
        $et = new TankersClass();
        $rows = $et->getPaged($offset,$tot,$filter,$sort);
        return $rows;
    }
	
    public function getTankerComposition($id, $tanker, $owner, $option )
	{
        $tk = new TankersClass();
        $rows = $tk->getTankerComposition($id, $tanker, $owner, $option );
        return $rows;
	}
	
    public function getEquipmentsByTypeAndOwner($id, $owner, $option)
	{
        $tk = new TankersClass();
        $rows = $tk->getEquipmentsByTypeAndOwner($id, $owner, $option);
        return $rows;
	}
	
    public function getEquipmentsByTypeAndTanker($id, $owner, $tanker, $idx, $option)
	{
        $tk = new TankersClass();
        $rows = $tk->getEquipmentsByTypeAndTanker($id, $owner, $tanker, $idx, $option);
        return $rows;
	}
    
    public function getRecord($code){
        $g = new GlobalClass();
        $rows = $g->getRecord($this->tbl_name,$code);
        return $rows;
    }
	
    public function create($data)
	{

        $data->session_id = $_SESSION['SESSION'];
        $tk = new TankersClass();
        $ret = $tk->create($data);
        return $ret;
    }
    
    public function update($data)
	{
        
        $data->session_id = $_SESSION['SESSION'];
        $tk = new TankersClass();
        $ret = $tk->update($data);
        return $ret;
    }
    
    public function remove($data)
	{

        $data->session_id = $_SESSION['SESSION'];
        $tk = new TankersClass();
        $ret = $tk->delete($data);
        return $ret;
    }
    
    public function delete($data){
        $g = new GlobalClass();
        $ret = $g->delete($this->tbl_name,$data->tnkr_code);
        return $ret;
    }
    
    public function lookup(){
        $tk = new TankersClass();
        return $tk->lookup();
    }
    
    public function terminalLookup(){
        $tk = new TankersClass();
        return $tk->terminalLookup();        
    }
    
    public function lookupByCarrier($carrier){
        $tk = new TankersClass();
        return $tk->lookupByCarrier($carrier);
    }
    
    public function tnkrEqptTypeLookup($etype, $cmpts){
        $et = new EquipmentTypesClass();
        return $et->lookupByFilter($etype, $cmpts);
    }
    
    public function getEquipmentShape($tnkr_code){
        $tk = new TankersClass();
        return $tk->getEquipmentShape($tnkr_code);        
    }
	
	public function unlockTankerCompartments($tnkr) 
	{
        $tk = new TankersClass();
        $ret = $tk->unlockTankerCompartments($tnkr);
        return $ret;
	}
}
?>