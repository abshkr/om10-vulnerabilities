<?php
require_once(dirname(__FILE__) . '/../classes/Personnel.class.php');
require_once(dirname(__FILE__) . '/../classes/Validator.class.php');


class PersonnelService {
    var $tbl_name = "GUI_PERSONNEL";

    public function count($filter, $order)
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

        //$g = new GlobalClass();
        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }

    public function isPsnlExisted($per_code){
        $g = new GlobalClass();
		$tbl_name = "PERSONNEL";
		//$filter = "WHERE PER_CODE='" . $per_code . "' ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE PER_CODE=:per_code ";
		$filter['sql_data'] = array( $per_code );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function isPsnlInLoad($per_code){
        $g = new GlobalClass();
		
		// check LOADS
		$tbl_name = "LOADS";
		//$filter = "WHERE LOAD_OPER='" . $per_code . "' ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE LOAD_OPER=:per_code ";
		$filter['sql_data'] = array( $per_code );
		
        $rows1 = $g->count( $tbl_name, $filter);
		
		$rows = $rows1;
		
		// check TRANSACTIONS
		$tbl_name = "TRANSACTIONS";
		//$filter = "WHERE TRSA_OPER='" . $per_code . "' ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE TRSA_OPER=:per_code ";
		$filter['sql_data'] = array( $per_code );
		
        $rows2 = $g->count( $tbl_name, $filter);
		
		if ( $rows < $rows2 )
		{
			$rows = $rows2;
		}
		
        return $rows;
    }
    
    public function getAll(){
        $g = new GlobalClass();
        $rows = $g->getAll($this->tbl_name);
        return $rows;
    }
    
    public function getPaged($filter, $order, $startIndex, $numItems){
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

        $p = new PersonnelClass();
        $rows = $p->getPaged($filter, $order, $startIndex, $numItems);
        
        $object = json_decode(json_encode($rows), FALSE);
        $a = array();

        foreach ($object as $key) {
            
            $key->user_last_reason = $key->per_last_modified;
            $key->valid_time = $key->per_last_dmy;
            array_push($a, $key);
 
        }

        return $a;

    }    
    
    public function getRecord($code){
        $g = new GlobalClass();
        $rows = $g->getRecord($this->tbl_name,$code);
        return $rows;
    }
    
    public function create($data,$perArray){
        // if(!Validator::validateStringLength(1, 49, $data->per_name)){
			// return "MSG_PS: 01";
		// } else if(!Validator::validateStringLength(1, 6, $data->per_code)) {
			// return "MSG_PS: 02";
		// } else 
		// {
            $data->session_id = $_SESSION['SESSION'];
			$p = new PersonnelClass();
			$data = (object)$data;
			$ret = $p->create($data,$perArray);
			return $ret;
		//}
    }
    
    public function update($data,$perArray){
        $data->session_id = $_SESSION['SESSION'];
        $p = new PersonnelClass();
        $data = (object)$data;
		//if(Validator::validateStringLength(1, 49, $data->per_name) && Validator::validateStringLength(1, 6, $data->per_code)){
			$ret = $p->update($data,$perArray);
			return $ret;
		//}
		//return "FAIL";
    }
    
    public function remove($data)
	{

        $data->session_id = $_SESSION['SESSION'];
        $tk = new PersonnelClass();
        $ret = $tk->delete($data);
        return $ret;
    }
/*      
    public function delete($data){
        $p = new PersonnelClass();
        $data = (object)$data;
        $ret = $p->delete($data);
        return $ret;
    }
*/    
    public function lookup(){
        $p = new PersonnelClass();
        return $p->lookup();
    }
    
    public function getOnSite($order){
        $p = new PersonnelClass();
        $ret = $p->getOnSite($order);
        return $ret;        
    }
    
    public function getSiteManager(){
        $p = new PersonnelClass();
        $ret = $p->getSiteManager();
        return $ret;
    }    
    
    public function getTimeCode(){
        $p = new PersonnelClass();
        $ret = $p->getTimeCode();
        return $ret;
    }      
    
    public function getPersonnelRoles(){
        $p = new PersonnelClass();
        $ret = $p->getPersonnelRoles();
        return $ret;
    } 
    
    public function getAreas(){
        $p = new PersonnelClass();
        $ret = $p->getAreas();
        return $ret;
    }    
    
    public function getAreaAccess($code){
        $p = new PersonnelClass();
        $ret = $p->getAreaAccess($code);
        return $ret;
    }
}
?>