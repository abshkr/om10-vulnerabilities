<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');
require_once(dirname(__FILE__) . '/../classes/Companies.class.php');
require_once(dirname(__FILE__) . '/../classes/Personnel.class.php');

/* define the module name for calling logMe() to output */
if(!defined('LoadSchdDriverClass')) define('LoadSchdDriverClass','LoadSchdDriver.class');

class LoadSchdDriverClass
{
	public function LoadSchdDriverClass()
	{
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
	}
	
	public function employerCmpyLookup()
	{
		$mydb = DB::getInstance();
	
		$obj = new CompaniesClass();
        $res = $obj->lookupByTypeFrmView(6);
        return $res;
	}
	
	public function getCompanyByDriver($driver)
	{
		$mydb = DB::getInstance();

        $sql  = "SELECT c.CMPY_CODE, c.CMPY_NAME FROM COMPANYS c, PERSONNEL p WHERE c.CMPY_CODE = p.PER_CMPY and p.PER_CODE='$driver'";
        $rows = $mydb->query($sql);
        return (prepareForAMF($rows, array(0 => "CompanyLookup")));		
    }

	public function getScheduleDriver($trip, $supplier)
	{
		$mydb = DB::getInstance();

		$sql = "SELECT SHLS_DRIVER FROM SCHEDULE WHERE SHLS_TRIP_NO = $trip AND SHLS_SUPP = '$supplier'";
		$rows = $mydb->query($sql);
		return (prepareForAMF($rows, array(0 => "LoadSchdDriver")));
    }

	public function lookupCmpyByDriver($drivercode){
		$obj = new PersonnelClass();
		$res = $obj->lookupCmpyByDriver($drivercode);
		return $res;
	}
	
	public function lookupPSNListByCmpy($cmpycode){
		$obj = new PersonnelClass();
		$res = $obj->lookupPSNListByCmpy($cmpycode);
		return $res;
	}
	
	public function resetScheduleDriver($trip, $supp,$driver)
	{
		$mydb = DB::getInstance();
		$sql="update SCHEDULE set SHLS_DRIVER='$driver' where SHLS_SUPP='$supp' and SHLS_TRIP_NO=$trip";
		$result = $mydb->update($sql);
		return $result;
	}

	
	
}

