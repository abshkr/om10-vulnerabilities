<?php
require_once(dirname(__FILE__) . '/../classes/EquipmentTypes.class.php');

class EquipmentTypesService {
    var $tbl_name = "EQUIP_TYPES_VW";
	var $session_id= "";
	
   public function count($filter,$order,$sort){
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
		// TODO: need change FLEX to pass the var|value instead of sql text from front-end for data binding
        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
   }

    public function isEqptTypeExisted($etyp_code){
        $g = new GlobalClass();
		$tbl_name = "EQUIP_TYPES";
		//$filter = "WHERE UPPER(ETYP_TITLE)=UPPER('" . $etyp_code . "') ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE UPPER(ETYP_TITLE)=UPPER(:etyp_code) ";
		$filter['sql_data'] = array( $etyp_code );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }
    
    public function getAll($filter,$order,$sort){
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

        $et = new EquipmentTypesClass();
        $rows = $et->getAll($filter,$order,$sort);
        return $rows;
    }
    
    public function getPaged($filter,$order,$sort,$offset,$tot){
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

        $et = new EquipmentTypesClass();
        $rows = $et->getPaged($offset,$tot,$filter,$order,$sort);
        return $rows;
    }    
    
    public function getComposition($id){
        $et = new EquipmentTypesClass();
        $rows = $et->getComposition($id);
        return $rows;
    }
    
    public function getCompartmentsDetails($id){
        $et = new EquipmentTypesClass();
        $rows = $et->getCompartmentsDetails($id);
        return $rows;
    }
	
    public function getCompartmentsAll(){
        $et = new EquipmentTypesClass();
        $rows = $et->getCompartmentsAll();
        return $rows;
    }
    
    public function getUnitsLookup(){
        $et = new EquipmentTypesClass();
        $rows = $et->getUnitsLookup();
        return $rows;
    }
    
    public function updateCompartments($comp){
        $et = new EquipmentTypesClass();
        $ret = $et->updateCompartments($comp);
        return $ret;
    }
        
    public function create($data, $comp){
        $et = new EquipmentTypesClass();
        $ret = $et->create($data, $comp);
        return $ret;
    }
    
    public function update($data){
        $et = new EquipmentTypesClass();
        $ret = $et->update($data);
        return $ret;
    }
    
    public function delete($data){
        $et = new EquipmentTypesClass();
        $ret = $et->delete($data);
        return $ret;
    }
    
    public function lookup(){
        $et = new EquipmentTypesClass();
        return $et->lookup();
    }
    
    public function lookupByFilter($etype, $cmpts){
        $et = new EquipmentTypesClass();
        return $et->lookupByFilter($etype, $cmpts);
    }
	
	public function findTypeByTitle($title)
	{
		$g = new EquipmentTypesClass();
        $rows = $g->getByTitle($title);
        return $rows;
	}
}
?>