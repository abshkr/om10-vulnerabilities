<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../models/DbTable/ProductOwnershipDB.php');

/* define the module name for calling logMe() to output */
if(!defined('PRODOWNERCLASS')) define('PRODOWNERCLASS','ProductOwnership.class');

class ProductOwnership
{
    public function getOwnershipByProdEx($base_code)
    {
        $mydb = DB::getInstance();
        $sql = "SELECT * FROM GUI_BASE_PROD_OWNSHIP WHERE base_prod_code='$base_code'";
        $rows = $mydb->query($sql);
        for ($i = 0; $i < count($rows); $i++)
        {
            $rows[$i]->ADJUSTMENT = 0;
            $rows[$i]->SELECTED = true;
            $rows[$i]->OWNSHIP_QTY = (integer)$rows[$i]->OWNSHIP_QTY;
        }
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'ProductOwnershipEx')));
    }     
    
    public function getAmountByProd($base_code)
    {
        $mydb = DB::getInstance();
        $sql="SELECT * FROM GUI_BASE_PROD_OWNSHIP WHERE base_prod_code='$base_code'";
        $rows = $mydb->query($sql);
        
        $amount = 0;
        for ($i = 0; $i < count($rows); $i++)
        {
            foreach ($rows[$i] as $key => $value)
            {
                $key = strtolower($key);
                if ($key == 'ownship_qty')
                {
                    $amount += $value;
                }
            }
        }        
        return $amount;
    }
    
    /* If autoCommit is false, we can control database transaction from outside. The reason is, every time 
    oci_execute() is executed, even it's only a select statement, if its mode is not OCI_NO_AUTO_COMMIT, the
    oci_execute() execution will automatically commit which affects all the before queries that are in hang.
    i.e. if this function is used in a database transaction, $autoCommit must be false */
    public function getProdOwnership($company, $base_code, $autoCommit = true)
    {
        $mydb = DB::getInstance();
        $sql = "SELECT * FROM GUI_BASE_PROD_OWNSHIP WHERE supp_cmpy = '$company' AND base_prod_code='$base_code'";
        if ($autoCommit)
            $rows = $mydb->query($sql);
        else
            $rows = $mydb->query($sql, OCI_NO_AUTO_COMMIT);
        for ($i = 0; $i < count($rows); $i++)
        {
            $rows[$i]->ADJUSTMENT = 0;
            $rows[$i]->SELECTED = true;
            $rows[$i]->OWNSHIP_QTY = (integer)$rows[$i]->OWNSHIP_QTY;
        }
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'ProductOwnershipEx')));
    }
    
    
    /**
    * @param $data: a Companys object
    * @param $where: an associative array of columns that are used in where clause. If it's NULL, 
    *  populate where clause from $data object
    * Actually, OWNSHIP_QTY is the only column that can be updated.
    */
    public function updateProductOwnership($data, $where = NULL, $autoCommit = true)
    {
        $whereClause = "";
        if (!$where)
        {
            $whereClause = "OWNSHIP_NO='". $data->ownship_no . "' AND BASE_PROD_CODE='" . $data->base_prod_code . "' AND SUPP_CMPY='" . $data->supp_cmpy . "'";
        }
        else
        {
            foreach ($where as $key=>$value)
            {
                if (!is_null($value))
                {
                    $whereClause .= "$key='$value',";
                }
            }
            $whereClause = preg_replace("/,$/", "", $whereClause);   
        }
        
        $mydb = DB::getInstance();
        $values = "";
        foreach ($data as $key=>$value)
        {
            if (strcasecmp($key, 'ownship_qty') == 0)
            {
                $values = "OWNSHIP_QTY = $data->ownship_qty";
                break;
            }
        }
        
        $sql="UPDATE BASE_PROD_OWNSHIP SET $values WHERE $whereClause";
        logMe($sql, PRODOWNERCLASS);
        if ($autoCommit)
            return $mydb->update($sql);
        else
            return $mydb->update($sql, OCI_NO_AUTO_COMMIT);
    }    
    
    /**
    * Adjust ownership, including insert into transaction table and update onwership table.
    * @param quantity 
    * @param company
    * @param base_code base product code
    * @param reason, this is numeric
    * @autoCommit default it's true, which means every delete/update/insert will commit automatically. Setting it false
    * gives caller control about database transaction.
    */
    public function adjustOwnership($quantity, $company, $base_code, $reason, $autoCommit = true)
    {
        require_once(dirname(__FILE__) . '/../services/OwnershipTransService.php');
        
        $transService = new OwnershipTransService();
        $nextSeq = $transService->getNextTransNo($autoCommit);
        $trans = array('OWNSHIP_TRSA_NO'=>$nextSeq, 'BASE_PROD_CODE'=>$base_code, 'SUPP_CMPY'=>$company, 'QTY'=>$quantity, 'REASON'=>$reason, 'TRSA_TIME'=>'SYSDATE');
        
        if (RETURN_OK != $transService->insertOwnershipTrans($trans, $autoCommit))
        {
            logMe("Update ownership transaction failed, cannot continue. quantity:" . $quantity . 
                ", company:" . $company . ", base_code:" . $base_code . ", reason:". $reason,PRODOWNERCLASS);
            return RETURN_FAIL;
        }
        
        $oldOwnership = $this->getProdOwnership($company, $base_code);
        if (count($oldOwnership) > 1 || count($oldOwnership) <= 0)
        {
            logMe("Get " . count($oldOwnership) . " records by company:" . $company . ", prod:" . $base_code,PRODOWNERCLASS);
            return RETURN_FAIL;
        }
        
        $oldOwnership[0]->ownship_qty += $quantity;
        if (RETURN_OK != $this->updateProductOwnership($oldOwnership[0], NULL, $autoCommit))
        {
            logMe("Update ownership failed, cannot continue. quantity:" . $quantity . 
                ", company:" . $company . ", base_code:" . $base_code . ", reason:". $reason,PRODOWNERCLASS);
            return RETURN_FAIL;
        }
        
        logMe("Updated ownership and transtion. quantity:" . $quantity . 
                ", company:" . $company . ", base_code:" . $base_code . ", reason:". $reason,PRODOWNERCLASS);
        
        return RETURN_OK;
    }
        
    /* Transfer product from one company to another 
    Both source and destination must exist in BASE_PROD_OWNSHIP table
    Using database transaction here */
    public function giveAwayOwnership($quantity, $src_cmpy, $dest_cmpy, $base_code)
    {
        define('GIVEAWAY', 0);  //0 means transfer, refer to SELECT * FROM PMV_TRANSFER_CLASS_TYP;
        $mydb = DB::getInstance();
        
        if (RETURN_OK == $this->adjustOwnership((0 - $quantity), $src_cmpy, $base_code, GIVEAWAY, false) &&
            RETURN_OK == $this->adjustOwnership($quantity, $dest_cmpy, $base_code, GIVEAWAY, false))
        {
            logMe("Giveaway succeeded. quantity:" . $quantity . 
                ", source:" . $src_cmpy . ", desctiny:" . $dest_cmpy . ", base_code:" . $base_code,PRODOWNERCLASS);
            $mydb->commit();
            return RETURN_OK;
        }
        else
        {
            logMe("Giveaway failed. quantity:" . $quantity . 
                ", source:" . $src_cmpy . ", desctiny:" . $dest_cmpy . ", base_code:" . $base_code,PRODOWNERCLASS);
            $mydb->rollback();
            return RETURN_FAIL;
        }
    }    
}
?>