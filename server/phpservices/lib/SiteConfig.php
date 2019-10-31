<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../models/DbTable/SiteConfigDB.php');


class SiteConfig 
{
	public function getAllConfigs() 
    {
       	
		$siteConfigs = new Application_Model_DbTable_Site_Config();
		$siteConfigsRows = $siteConfigs->fetchAll();
		return $siteConfigsRows;
    }
	
	public function findConfigByConfigKey($configKey) 
    {
       	
		$siteConfigs = new Application_Model_DbTable_Site_Config();
		$select = $siteConfigs->select();
		$where =  $select->getAdapter()->quoteInto('CONFIG_KEY = ?',$configKey);
		$siteConfigsRows = $siteConfigs->fetchAll($where);
		$rowCount = count($siteConfigsRows);
		if ($rowCount>0 && $rowCount==1)
		{
			foreach ($siteConfigsRows as $row) {
				//only interested in getting the cgi name
				return $row;
				}

		}
		
		return null;
    }
	
	
}
