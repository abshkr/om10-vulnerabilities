<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../vo/OwnshipTrans.php');
require_once(dirname(__FILE__) . '/../models/DbTable/OwnershipTransDB.php');

/* define the module name for calling logMe() to output */
if(!defined('OWNERSHIP')) define('OWNERSHIP','OwnershipTransService');

class OwnershipTransService
{
    
    //Get all records from PRODOWNSHIP_TRANSACT table.
    public function getOwnshipTrans()
    {
        $mydb = DB::getInstance();
        $sql = "SELECT * FROM PRODOWNSHIP_TRANSACT";
        $rows = $mydb->query($sql);
        
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'OwnershipTrans')));
    }
    
    //Get next avilable sequence to be used as primary key.
    public function getNextTransNo($autoCommit = true)
    {
        $mydb = DB::getInstance();
        $sql = "SELECT MAX(OWNSHIP_TRSA_NO) SEQ FROM PRODOWNSHIP_TRANSACT";
        if ($autoCommit)
            $rows = $mydb->query($sql);
        else
            $rows = $mydb->query($sql, OCI_NO_AUTO_COMMIT);
        return ($rows[0]->SEQ) + 1;
    }
    
    /**
    * $data should be an array like array(key=>value), and key equals column of PRODOWNSHIP_TRANSACT, 
    * and value represents the value you want to insert. 
    * Sample: $data = array('OWNSHIP_TRSA_NO'=>215, 'BASE_PROD_CODE'=>'98328Q', 'SUPP_CMPY'=>'EMHK', 'QTY'=>1000, 'REASON'=>'No reason', 'TRSA_TIME'=>'SYSDATE');
    */
    public function insertOwnershipTrans($data, $autoCommit = true)
    {
        if (!$data)
            return RETURN_FAIL;
        
        $errMsg = '';
        if (!integrityCheck($data, $errMsg, 'OwnershipTrans'))
        {
            logMe("Invalid parameter. Error message: " . $errMsg, OWNERSHIP);
            return RETURN_FAIL;
        }
        
        $fields = "";
        $values = "";
        foreach ($data as $key=>$value)
        {
            if (!is_null($value))
            {
                $fields .= $key.",";
                if ($key == 'BASE_PROD_CODE' || $key == 'SUPP_CMPY')    //These columns are varchars.
                    $values .= "'$value',";
                else
                    $values .= "$value,";
            }
        }
        $fields = preg_replace("/,$/", "", $fields);
        $values = preg_replace("/,$/", "", $values);    
        $clause = "($fields) VALUES($values)";
        
        $mydb = DB::getInstance();
        $sql="INSERT INTO PRODOWNSHIP_TRANSACT $clause";
        if ($autoCommit)
            $res = $mydb->insert($sql);
        else
            $res = $mydb->insert($sql, OCI_NO_AUTO_COMMIT);
        return $res;
    }
    
    /**
    * @param $data: a Companys object
    * @param $where: an associative array of columns that are used in where clause. If it's NULL, 
    *  populate where clause from $data object
    */
    /*
    public function updateProductOwnershipTrans($data, $where = NULL)
    {
        if (!$where)
        {
            $where = array('OWNSHIP_TRSA_NO'=>$data->ownship_trsa_no, 'BASE_PROD_CODE'=>$data->base_prod_code, 'SUPP_CMPY'=>$data->supp_cmpy);            
        }
        
        $errMsg = '';
        if (!integrityCheck($data, $errMsg, 'OwnershipTrans') || !integrityCheck($where, $errMsg, 'OwnershipTrans'))
        {
            logMe("Invalid parameter. Error message: " . $errMsg,OWNERSHIP);
            return RETURN_FAIL;
        }
        
        $whereClause = array();
        $table = new Application_Model_DbTable_OwnershipTrans();
        foreach ($where as $key=>$value)
        {
            $tmpStr = $key . ' = ?';
            $whereClause[] = $table->getAdapter()->quoteInto($tmpStr, $value);
        }
        
        try
        {
            $count = $table->update(classToArray($data), $whereClause);
            logMe($count . " updated",OWNERSHIP);
            return RETURN_OK;
        }
        catch (Zend_Exception $e)
        {
            logMe("Failed to update. Error message: " . $e->getMessage(),OWNERSHIP);
            return RETURN_FAIL;
        }
    }*/
    
    /**
    * @param $where where clause of a delete sql statement
    */
    /*
    public function deleteProductOwnershipTrans($where)
    {
        if (!$where)
        {
            return RETURN_FAIL;
        }
        
        $errMsg = '';
        if (!integrityCheck($where, $errMsg, 'OwnershipTrans'))
        {
            logMe("Invalid parameter. Error message: " . $errMsg,OWNERSHIP);
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_OwnershipTrans();
        foreach ($where as $key=>$value)
        {
            $tmpStr = $key . ' = ?';
            $whereClause[] = $table->getAdapter()->quoteInto($tmpStr, $value);
        }
        
        try
        {
            $count = $table->delete($whereClause);
            logMe($count . " deleted",OWNERSHIP);
            return RETURN_OK;
        }
        catch (Zend_Exception $e)
        {
            logMe("Failed to update. Error message: " . $e->getMessage(),OWNERSHIP);
            return RETURN_FAIL;
        }   
    }*/
    
    /**
    * Get next transaction number
    * Not useful any more, cause PRODOWNSHIP_TRANSACT_SEQ.NEXTVAL is used instead.
    */
    /*
    public function getNextTransNo()
    {
        $sql = "select max(ownship_trsa_no) transno from prodownship_transact";
        
        $table = new Application_Model_DbTable_OwnershipTrans();
        $rows = $table->getAdapter()->fetchAll($sql);
        return $rows[0]['TRANSNO'] + 1;
    }*/
}
