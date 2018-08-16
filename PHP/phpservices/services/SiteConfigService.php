<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/SiteConfiguration.class.php');

class SiteConfigService
{
    var $tbl_name = "SITE_CONFIG";

	public function getAllConfigSettings()
    {

		$g = new GlobalClass();

		$rows = $g->getAllwithoutLogin($this->tbl_name);
        return $rows;
    }

	public function getAllConfigSettingsRequiredByGUI($type) {
	    $db = new SiteConfigurationClass();
		return $db->getByFieldValue($this->tbl_name, "config_required_by_gui", $type);
	}

	public function update($data) {
		$data->session_id = $_SESSION['SESSION'];
	    $db = new SiteConfigurationClass();
		$rows = $db->update($data);
		///logMe("Site config result: " . $rows, SITECONFIG);
		return $rows;
	}



	public function findConfigValueByName($keyName)
    {
		$configs = new SiteConfigurationClass();
		$rowSet = $configs->findConfigByConfigKey($keyName);
		if (!($rowSet === null))
		{
			$rowsetArray = $rowSet->toArray();
			return $rowsetArray;
		}
		return null;

    }
}
