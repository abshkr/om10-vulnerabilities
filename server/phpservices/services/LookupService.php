<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../models/DbTable/Timecode.php');
require_once(dirname(__FILE__) . '/../models/DbTable/Pers_In_Area.php');

class LookupService
{

	public function getPersonnelOnSite()
	{
        $table = new Application_Model_DbTable_Pers_In_Area();
		$rows = $table->getAdapter()->fetchAll("select PER_NAME per_name,AREA_NAME per_area,PERL_ENTER_TIME per_enter_time from PERSONNEL,PERS_IN_AREA,AREA_RC where PER_CODE=PERL_PSN and PERL_ARA <> 9999 and PERL_ARA = AREA_K order by PERL_ARA,PER_NAME");
        return ($rows);
	}
	
	public function getAreas()
	{
		$db = Zend_Db_Table::getDefaultAdapter();
		$rows = $db->fetchAll("select * from AREA_RC");
        return ($rows);
	}
	
	public function getPersonnelRoles()
	{
		$db = Zend_Db_Table::getDefaultAdapter();
		$rows = $db->fetchAll("select * from ROLES_REF");
        return ($rows);
	}
	
    public function getTimeCode()
    {
        $table = new Application_Model_DbTable_Timecode();
		$rows = $table->getAdapter()->fetchAll('select * from timecode');
        return ($rows);
    }
	
	public function getSiteManager()
	{
       $table = new Application_Model_DbTable_Timecode();
       $rows = $table->getAdapter()->fetchAll('select SITE_NAME from SITE');
		return ($rows[0]['SITE_NAME']);
	}
	
}
?>
