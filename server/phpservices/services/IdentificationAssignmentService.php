<?php
require_once(dirname(__FILE__) . '/../classes/IdentificationAssignment.class.php');

class IdentificationAssignmentService {
    var $tbl_name = "GUI_ACCESS_KEYS";

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

    public function isCmpyPinRequired($issuer){
        $g = new GlobalClass();
		$tbl_name = "COMPANYS";
		//$filter = "WHERE CMPY_CODE='" . $issuer . "' and CMPY_REQ_PIN_FLAG<>0 ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE CMPY_CODE=:issuer_code and CMPY_REQ_PIN_FLAG<>0 ";
		$filter['sql_data'] = array( $issuer );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function getTotalRecords(){
        $g = new GlobalClass();
		$tbl_name = "ACCESS_KEYS";
		$filter = "WHERE 1=1 ";
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function isKeyExisted($key_txt){
        $g = new GlobalClass();
		$tbl_name = "ACCESS_KEYS";
		//$filter = "WHERE KYA_TXT='" . $key_txt . "' ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE KYA_TXT=:key_txt ";
		$filter['sql_data'] = array( $key_txt );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function isKeyIdAllowDuplication()
	{
        $g = new GlobalClass();
		$tbl_name = "SITE_CONFIG";
		$filter = " where CONFIG_KEY='SITE_IDASSN_DUPLICATE' and CONFIG_VALUE='Y' ";
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function isKeyIdExisted($id, $issuer){
		$allow_dup = $this->isKeyIdAllowDuplication();
	
        $g = new GlobalClass();
		$tbl_name = "ACCESS_KEYS";
		if ( $allow_dup > 0 )
		{
			//$filter = "WHERE KYA_KEY_NO=$id and KYA_KEY_ISSUER='" . $issuer . "' ";
		
			$filter = array();
			$filter['sql_text'] = "WHERE KYA_KEY_NO=:key_id and KYA_KEY_ISSUER=:key_issuer ";
			$filter['sql_data'] = array( $id, $issuer );
		
		}
		else
		{
			//$filter = "WHERE KYA_KEY_NO=$id ";
		
			$filter = array();
			$filter['sql_text'] = "WHERE KYA_KEY_NO=:key_id ";
			$filter['sql_data'] = array( $id );
		
		}
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function isKeyIdTextExisted($id, $issuer, $key_txt){
        $g = new GlobalClass();
		$tbl_name = "ACCESS_KEYS";
		//$filter = "WHERE KYA_KEY_NO=$id and KYA_KEY_ISSUER='" . $issuer . "' and KYA_TXT='" . $key_txt . "' ";
		
		$filter = array();
        $filter['sql_text'] = "WHERE KYA_KEY_NO=:key_id and KYA_KEY_ISSUER=:key_issuer and KYA_TXT=:key_txt ";
		$filter['sql_data'] = array( $id, $issuer, $key_txt );
		
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }
    
    public function getAll(){
        $g = new GlobalClass();
        $rows = $g->getAll($this->tbl_name);
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
	
        $et = new IdentificationAssignmentClass();
        $rows = $et->getPaged($offset,$tot,$filter,$sort);
        return $rows;
    }    
	

    public function create($data)
	{
        
        $data->session_id = $_SESSION['SESSION'];
        $ia = new IdentificationAssignmentClass();
        $ret = $ia->create($data);
        return $ret;
    }
    
    public function update($data)
	{
        $data->session_id = $_SESSION['SESSION'];
        $ia = new IdentificationAssignmentClass();
        $ret = $ia->update($data);
        return $ret;
    }
    
    public function remove($data)
	{
        $data->session_id = $_SESSION['SESSION'];
        $ia = new IdentificationAssignmentClass();
        $ret = $ia->delete($data);
        return $ret;
    }
/*    
    public function delete($data){
        $g = new GlobalClass();
        $ret = $g->delete($this->tbl_name,$data->tnkr_code);
        return $ret;
    }
*/   
   
   
    public function lookupKeyCompany($type)
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyCompany($type);
    }
	
    public function lookupKeyType()
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyType();
    }
	
    public function lookupKeyPhysType()
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyPhysType();
    }
	
    public function lookupKeyRole()
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyRole();
    }
	
    public function lookupKeyPsnl($employer, $role)
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyPsnl($employer, $role);
    }
	
    public function lookupKeyTnkr($owner)
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyTnkr($owner);
    }
	
    public function lookupKeyEqpt($owner, $sched)
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyEqpt($owner, $sched);
    }
	
    public function lookupKeyTerminal()
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyTerminal();
    }
	
    public function lookupKeyTrip($supplier, $status)
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyTrip($supplier, $status);
    }
	
    public function lookupKeyAllocType()
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyAllocType();
    }
	
    public function lookupKeyCustomer($supplier)
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyCustomer($supplier);
    }
	
    public function lookupKeyOrder($customer)
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyOrder($customer);
    }
	
    public function lookupKeyTimeCode()
	{
        $ia = new IdentificationAssignmentClass();
        return $ia->lookupKeyTimeCode();
    }
	
	public function updateAdhocKey($data)
	{
		$ia = new IdentificationAssignmentClass();
		$rows = $ia->updateAdhocKey($data);
        return $rows;
	}

}
?>