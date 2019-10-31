<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');

/* define the module name for calling logMe() to output */
if(!defined('SEALCLASS')) define('SEALCLASS','Seals.class');

class SealsClass
{
    public function SealsClass()
    {
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "load_scheds/loadspec_seal.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/load_scheds/loadspec_seal.cgi";
        }
    }
    
    public function getNextSeal()
    {
        $mydb = DB::getInstance();
        
        $sql = "SELECT SITE_NEXT_SEAL FROM SITE";
        $rows = $mydb->query($sql);
        return (prepareForAMF($rows, array(0 => "Seal")));
    }
    
    public function setNextSeal($nextSeal)
    {
        $mydb = DB::getInstance();
        
        $sql = "UPDATE SITE SET SITE_NEXT_SEAL = '$nextSeal'";
        $rows = $mydb->update($sql);

        return "OK";
        //return (prepareForAMF($rows, array(0 => "Seal")));
    }
    
    public function deleteSeal($seal)
    {
        $mydb = DB::getInstance();
        
        $sql = "SELECT SEALSPEC_SHLSTRIP, SEALSPEC_SHLSSUPP FROM SEAL WHERE SEAL_NR = '$seal'";
        $rows = $mydb->query($sql);
        $trip = $rows[0]->SEALSPEC_SHLSTRIP;
        $supplier = $rows[0]->SEALSPEC_SHLSSUPP;

        $sql = "DELETE FROM SEAL WHERE SEAL_NR = '$seal'";
        $rows = $mydb->delete($sql);

        //return "OK";                                
        $fields = array(
            'trip'=>urlencode($trip),
            'supplier'=>urlencode($supplier),
            'cmd'=>'reassemble'
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "OK";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("reassemble seal failed!!!",EQUIPLISTCLASS);
                return "ERROR";
        }
        logMe("reassemble seal succeeded!!!",EQUIPLISTCLASS);
        return "OK";   
    }

    public function deallocateAllSeal($trip, $supplier)
    {
        $mydb = DB::getInstance();
        $sql = "DELETE FROM SEAL WHERE SEALSPEC_SHLSTRIP = $trip AND SEALSPEC_SHLSSUPP = '$supplier'";
        $rows = $mydb->delete($sql);
        $sql = "UPDATE SCHEDULE SET SHLS_SEAL_NO = NULL WHERE SHLS_TRIP_NO = $trip AND SHLS_SUPP = '$supplier'";
        $rows = $mydb->update($sql);
        return "OK";
    }
    
    public function replaceSeal($orig_seal, $new_seal)
    {
        $mydb = DB::getInstance();
        $sql = "UPDATE SEAL SET SEAL_NR = '$new_seal'  WHERE SEAL_NR = '$orig_seal'";
        $rows = $mydb->delete($sql);
        return "OK";
    }

    public function getSeals($trip, $supplier)
    {
        $mydb = DB::getInstance();
        
        $sql = "SELECT SEAL_NR, SEAL_CMPT_NR, SEAL_PREFIX, SEAL_SUFFIX FROM SEAL WHERE SEALSPEC_SHLSTRIP = $trip AND SEALSPEC_SHLSSUPP = '$supplier' ORDER BY SEAL_CMPT_NR, SEAL_NR";
        $rows = $mydb->query($sql);
        return (prepareForAMF($rows, array(0 => "Seal")));
    }
    
    public function setPrefix($seal, $prefix)
    {
        $mydb = DB::getInstance();
        $sql = "UPDATE SEAL SET SEAL_PREFIX = '$prefix' WHERE SEAL_NR = '$seal'";
                                $rows = $mydb->update($sql);
        
        $sql = "SELECT SEALSPEC_SHLSTRIP, SEALSPEC_SHLSSUPP FROM SEAL WHERE SEAL_NR = '$seal'";
        $rows = $mydb->query($sql);
        $trip = $rows[0]->SEALSPEC_SHLSTRIP;
        $supplier = $rows[0]->SEALSPEC_SHLSSUPP;

        //return "OK";                                
        $fields = array(
            'trip'=>urlencode($trip),
            'supplier'=>urlencode($supplier),
            'cmd'=>'reassemble'
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "OK";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("reassemble seal failed!!!",EQUIPLISTCLASS);
                return "ERROR";
        }
        logMe("reassemble seal succeeded!!!",EQUIPLISTCLASS);
        return "OK";        
    }
    
    public function setSuffix($seal, $suffix)
    {
        $mydb = DB::getInstance();
        $sql = "UPDATE SEAL SET SEAL_SUFFIX = '$suffix' WHERE SEAL_NR = '$seal'";
                                $rows = $mydb->update($sql);
                                
        $sql = "SELECT SEALSPEC_SHLSTRIP, SEALSPEC_SHLSSUPP FROM SEAL WHERE SEAL_NR = '$seal'";
        $rows = $mydb->query($sql);
        $trip = $rows[0]->SEALSPEC_SHLSTRIP;
        $supplier = $rows[0]->SEALSPEC_SHLSSUPP;

        //return "OK";
                                
        $fields = array(
            'trip'=>urlencode($trip),
            'supplier'=>urlencode($supplier),
            'cmd'=>'reassemble'
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "OK";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("reassemble seal failed!!!",EQUIPLISTCLASS);
                return "ERROR";
        }
        logMe("reassemble seal succeeded!!!",EQUIPLISTCLASS);
        return "OK"; 
}


    public function reallocate($trip, $supplier, $cmpt_nr)
    {
        $fields = array(
            'trip'=>urlencode($trip),
            'supplier'=>urlencode($supplier),
            'cmd'=>'realloc',
            'cmpt_nr'=>$cmpt_nr
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "OK";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add equipment list failed!!!",EQUIPLISTCLASS);
                return $response;
        }
        logMe("CGI Add equipment list succeeded!!!",EQUIPLISTCLASS);
        return "OK";
    }
    public function allocateSeal($trip, $supplier, $seal_num=null)
    {
        $fields = array(
            'trip'=>urlencode($trip),
            'supplier'=>urlencode($supplier),
            'seal_num'=>urlencode($seal_num)
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "OK";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add equipment list failed!!!",EQUIPLISTCLASS);
                return "ERROR";
        }
        logMe("CGI Add equipment list succeeded!!!",EQUIPLISTCLASS);
        return "OK";
    }
/*
    public function allocateSeal($trip, $supplier)
    {
        $fields = array(
            'trip'=>urlencode($trip),
            'supplier'=>urlencode($supplier)
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "OK";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add equipment list failed!!!",EQUIPLISTCLASS);
                return $response;
        }
        logMe("CGI Add equipment list succeeded!!!",EQUIPLISTCLASS);
        return "OK";
    }
    */
}
