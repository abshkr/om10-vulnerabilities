<?php
require_once(dirname(__FILE__) . '/../classes/EquipmentTypes.class.php');
require_once(dirname(__FILE__) . '/../classes/EquipmentList.class.php');

class EquipmentListService 
{
    var $tbl_name = "GUI_EQUIPMENT_LIST";

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

    public function isEqptUsedByTanker($eqpt_code){
        $g = new GlobalClass();
		$tbl_name = "TNKR_EQUIP";
		//$filter = "WHERE TC_EQPT in ( select eqpt_id from transp_equip where eqpt_code='" . $eqpt_code . "') ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE TC_EQPT in ( select eqpt_id from transp_equip where eqpt_code=:eqpt_code ) ";
		$filter['sql_data'] = array( $eqpt_code );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function isEqptExisted($eqpt_code){
        $g = new GlobalClass();
		$tbl_name = "TRANSP_EQUIP";
		//$filter = "WHERE EQPT_CODE='" . $eqpt_code . "' ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE EQPT_CODE=:eqpt_code ";
		$filter['sql_data'] = array( $eqpt_code );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }
    
	public function getEquipLoadTypes()
	{
        $db = new EquipmentListClass();
        $ret = $db->eqLoadTypes();
        return $ret;
    }

    public function getAll()
	{
        $g = new GlobalClass();
        $rows = $g->getAll($this->tbl_name);
        return $rows;
    }
	
	public function getEquipmentList($values, $dtypes, $sorts, $orders)
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
	
        $et = new EquipmentListClass();
        $rows = $et->getEquipmentList($filter,$sort);
        return $rows;
	}
	
    
    public function getPaged($values, $dtypes, $sorts, $orders, $offset, $tot){
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
	
        $et = new EquipmentListClass();
        $rows = $et->getPaged($offset,$tot,$filter,$sort);
        return $rows;
    }    
	
    public function getEquipmentComposition($id, $owner, $code, $option )
	{
        $et = new EquipmentListClass();
        $rows = $et->getEquipmentComposition($id, $owner, $code, $option );
        return $rows;
	}
	
    public function getEquipmentsByTypeAndOwner($id, $owner, $option)
	{
        $et = new EquipmentListClass();
        $rows = $et->getEquipmentsByTypeAndOwner($id, $owner, $option);
        return $rows;
	}
	
    public function getEquipmentsByTypeAndCode($id, $owner, $code, $option)
	{
        $et = new EquipmentListClass();
        $rows = $et->getEquipmentsByTypeAndCode($id, $owner, $code, $option);
        return $rows;
	}
    
    public function getEquipmentCompartments($id){
        $et = new EquipmentListClass();
        $rows = $et->getEquipmentCompartments($id);
        return $rows;
    }
    
    public function getSchdType($supplier, $trip_no)
	{
        $db = new EquipmentListClass();
        $ret = $db->getSchdType($supplier, $trip_no);
        return $ret;
    }
	
    public function create($data)
	{
        $db = new EquipmentListClass();
        $ret = $db->create($data);
        return $ret;
    }
    
    public function update($data)
	{
        $db = new EquipmentListClass();
        $ret = $db->update($data);
        return $ret;
    }
    
    public function remove($data)
	{
        $db = new EquipmentListClass();
        $ret = $db->delete($data);
        return $ret;
    }
    
    public function transpEqptTypeLookup($etype, $cmpts){
        $et = new EquipmentTypesClass();
        return $et->lookupByFilter($etype, $cmpts);
    }
 	
	public function toggleCompartmentLock($eqpt, $cmpt) 
	{
        $db = new EquipmentListClass();
        $ret = $db->toggleCompartmentLock($eqpt, $cmpt);
        return $ret;
	}
	
	public function unlockEquipmentCompartments($eqpt) 
	{
        $db = new EquipmentListClass();
        $ret = $db->unlockEquipmentCompartments($eqpt);
        return $ret;
	}
	
	public function unlockTankerCompartments($tnkr) 
	{
        $db = new EquipmentListClass();
        $ret = $db->unlockTankerCompartments($tnkr);
        return $ret;
	}
}
?>