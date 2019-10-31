<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('COMPCLASS')) define('COMPCLASS','Companies.class');

$a = new CompaniesClass();
$a->test();

class CompaniesClass {
    public function getTypes(){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM COMPANY_TYP";
        $res = $mydb->query($sql);
        return $res;        
    }
	
	public function getTransactionCompanyTypes(){
		$mydb = DB::getInstance();
		$sql = "SELECT * FROM COMPANY_TYP WHERE COMPANY_NAME='SUPPLIER' OR COMPANY_NAME='CARRIER' OR COMPANY_NAME='DRAWER'";
		$rows = $mydb->query($sql);
		//XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "companytypelookup")));
	}

	 public function test()
    {
                 $mydb = DB::getInstance();
		 //$sql="SELECT CMPY_NAME FROM COMPANYS WHERE CMPY_CODE = '0088'";
		 $sql="SELECT CMPY_CODE, CMPY_NAME FROM COMPANYS";
		 print_r($sql);
		 $rows = $mydb->query($sql);
		 print_r($rows);
		 print_r($rows[0]->CMPY_NAME);
		 //              $encoded = mb_convert_encoding($rows[0]->CMPY_NAME, 'UTF-8', 'GB2312');
		 //XarrayEncodingConversion($rows);
		 //              print_r($encoded);
		 print_r($rows);
	}
	
	
	public function getCompanies($filter='',$sort='')
	{
        $mydb = DB::getInstance();
		logMe("Sort: " . $sort, COMPCLASS);
		if (trim($sort) == '') $sort="ORDER BY nlssort(cmpy_name,'NLS_SORT=BINARY_CI') ASC"; 
		//else $sort="ORDER BY nlssort($sort,'NLS_SORT=BINARY_CI') ASC";
		$sql="SELECT * FROM gui_companys $filter $sort";
        logMe("Final SQL: " .$sql, COMPCLASS);
		$rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "companys")));
	}
	
	public function getPaged($offset,$tot,$filter='',$sort='')
	{
        $mydb = DB::getInstance();
        logMe("Sort: " . $sort, COMPCLASS);
        if($key=='') $key = getTableKey("companys");
        
        if($sort!='')$sort="ORDER BY nlssort($sort,'NLS_SORT=BINARY_CI') ASC";
        
        $sql="SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM gui_companys $filter) res
             )
             where RN between ".($offset+1)." and ".($offset+$tot)." $sort";        
        logMe("Final SQL: " .$sql, COMPCLASS);
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "companys")));
    }
    
    public function lookup(){
        $mydb = DB::getInstance();
        $sql="SELECT CMPY_CODE,CMPY_NAME FROM COMPANYS ORDER BY CMPY_NAME ASC";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CompanyLookup')));
    }
	
	public function getCompany($code, $tblname){
		$mydb = DB::getInstance();
		$sql = "SELECT * from $tblname where cmpy_code='$code'";
		$rows = $mydb->query($sql);
		//XarrayEncodingConversion($rows);
		return (prepareForAMF($rows, array(0 => $tblname)));
		
	}
    
    /**
    * Get company by its type. By default, type is supplier. 
    * A companay can have multiply roles, as long as it is a supplier, the company will be returned
    * @param cmpp_type: 0: SITE_MANAGER_CMPY;
                        1: SUPPLIER_COMPANY;
                        2: CARRIER_COMPANY;
                        3: CUSTOMER_COMPANY;
                        4: DRAWER_COMPANY;
                        5: ISSUER_COMPANY;
                        6: EMPLOYER_COMPANY;
                        7: HOST_COMPANY;
    */    
    public function lookupByType($cmpy_type = 1)
    {
        $bitAnd = pow(2, $cmpy_type);
        logMe($bitAnd, "COMPANIES");
        $mydb = DB::getInstance();
        $sql="SELECT CMPY_CODE,CMPY_NAME FROM COMPANYS WHERE BITAND(cmpy_type,$bitAnd)<>0 ORDER BY CMPY_NAME ASC";
        $rows = $mydb->query($sql);        
        
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CompanyLookup')));
    }    
	
	/**
    * Get company by its type. By default, type is supplier. 
    * A companay can have multiply roles, as long as it is a supplier, the company will be returned
    * @param cmpp_type: 0: SITE_MANAGER_CMPY;
                        1: SUPPLIER_COMPANY;
                        2: CARRIER_COMPANY;
                        3: CUSTOMER_COMPANY;
                        4: DRAWER_COMPANY;
                        5: ISSUER_COMPANY;
                        6: EMPLOYER_COMPANY;
                        7: HOST_COMPANY;
    */    
    public function lookupByTypeFrmView($cmpy_type = 1)
    {
        $bitAnd = pow(2, $cmpy_type);
        
        $mydb = DB::getInstance();
        $sql="SELECT CMPY_CODE,CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(cmpy_type,$bitAnd)<>0 ORDER BY CMPY_NAME ASC";
        $rows = $mydb->query($sql);        
        
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CompanyLookup')));
    }    
    
    /**
     * Get company by its carrier code. By default, getting all records for site manager.
     * The normal carrier only return their own companaies, the right companies will be returned
     * @param cmpy_type:
     *        default the carrier is 2 means carrier company
     *        
     * Step 1, select carrier company from GUI_COMPANYS
     * Step 2, 
     *         a. get the additional records from SUPP_LNKD_CMPY(all are carrier) if only one carrier company 
     *            been found in GUI_COMPANYS
     *         b. get all carrier company records only from GUI_COMPANYS if it isnot one carrier company been found 
     *            in GUI_COMPANYS 
     * Step 3, return records      
     */
    public function lookupCarriers($cmpy_type=2)
    {
        $bitAnd = pow(2, $cmpy_type);
       
        $mydb = DB::getInstance();
        $sql="SELECT count(*) REC_COUNT FROM GUI_COMPANYS WHERE BITAND(cmpy_type,$bitAnd)<>0";
        
        $rows = $mydb->query($sql);
        
        /* if it have one record only in GUI_COMPANYS, then return record if it is carrier */
        if( (integer)$rows[0]->REC_COUNT == 1 ){
            $sql="SELECT c.CMPY_CODE,c.CMPY_NAME FROM COMPANYS c, GUI_COMPANYS g " .
                 "Where BITAND(c.cmpy_type,$bitAnd)<>0 " .
                 " and g.CMPY_CODE = c.CMPY_CODE " .
                 "union " .
                 "SELECT c.CMPY_CODE,c.CMPY_NAME FROM COMPANYS c,SUPP_LNKD_CMPY s " .
                 " Where c.CMPY_CODE = s.CMPY_code " .
                 " and BITAND(c.cmpy_type,$bitAnd)<>0 " .
                 "ORDER BY CMPY_NAME ASC";
        }
        else{///* return all carrier companies from GUI_COMPANYS
             $sql="SELECT CMPY_CODE,CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(cmpy_type,$bitAnd)<>0 " .
             "ORDER BY CMPY_NAME ASC";
        }
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CompanyLookup')));
    }
	
	public function getCompanyTypes() {
		logMe("Running", "COMPANIES");
		$mydb = DB::getInstance();
		$sql = "SELECT CMPY_CODE
			, CMPY_NAME
			, DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,0)) = power (2,0)) then 'Y' else 'F' End)) as SITE_MANAGER 
			, DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,1)) = power (2,1)) then 'Y' else 'F' End)) as SUPPLIER 
			, DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,2)) = power (2,2)) then 'Y' else 'F' End)) as CARRIER 
			, DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,3)) = power (2,3)) then 'Y' else 'F' End)) as CUSTOMER 
			, DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,4)) = power (2,4)) then 'Y' else 'F' End)) as DRAWER 
			, DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,5)) = power (2,5)) then 'Y' else 'F' End)) as ISSUER 
			, DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,6)) = power (2,6)) then 'Y' else 'F' End)) as EMPLOYER 
			, DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,7)) = power (2,7)) then 'Y' else 'F' End)) as HOST 
			FROM GUI_COMPANYS";
		$res = $mydb->query($sql);
		return (prepareForAMF($res, array(0 => 'Companys')));
	}
	
	public function lookupDocumentsPrinterLookup($cmpy_code)
	{
	    logMe("+++++++++Get Companies Document Printers+++++++++", COMPANIES);
		$mydb = DB::getInstance();
		$sql = "SELECT P.CMPY, PRNTR, CMP.CMPY_BOL_VP_NAME FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
			P.USAGE = U.USAGE 
			AND (P.CMPY IN ('$cmpy_code', 'ANY') OR (p.CMPY IS NULL)) 
			AND U.PRNF_USE = 'DOCUMENT'
			AND PRNTR = CMP.CMPY_BOL_VP_NAME(+)";
		$res = $mydb->query($sql);
		logMe("Result is: " .$res, COMPANIESCLASS);
		return (prepareForAMF($res, array(0 => 'PrintersLookup')));
	}
	
	public function lookupLoadReportPrinter($cmpy_code)
	{
		$mydb = DB::getInstance();
		$sql = "SELECT P.CMPY, PRNTR, CMP.CMPY_LD_REP_VP FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
			P.USAGE = U.USAGE 
			AND (P.CMPY IN ('$cmpy_code', 'ANY') OR (p.CMPY IS NULL)) 
			AND U.PRNF_USE = 'LD_REPORT'
			AND PRNTR = CMP.CMPY_LD_REP_VP(+)";
		$res = $mydb->query($sql);
		return (prepareForAMF($res, array(0 => 'PrintersLookup')));
	}
	
	public function lookupDriverInstructions($cmpy_code)
	{
		$mydb = DB::getInstance();
		$sql = "SELECT P.CMPY, PRNTR, CMP.CMPY_DRV_INST_VP FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
			P.USAGE = U.USAGE 
			AND (P.CMPY IN ('$cmpy_code', 'ANY') OR (p.CMPY IS NULL)) 
			AND U.PRNF_USE = 'INSTRUCT'
			AND PRNTR = CMP.CMPY_DRV_INST_VP(+)";
		$res = $mydb->query($sql);
		return (prepareForAMF($res, array(0 => 'PrintersLookup')));
	}


}
