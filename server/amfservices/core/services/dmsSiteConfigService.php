<?php
require_once('dmsService.php');
require_once(__DIR__ . '/../dmController.php');

class dmsSiteConfigService extends dmsService
{	
	public function __construct( $params = false )
	{
		parent::__construct();
		$this->ctl = dmController::getController();		
	}
		
	public function getCloseoutStatus($params)
	{
		$sql = "select CONFIG_VALUE from SITE_CONFIG where CONFIG_KEY='CLOSEOUT_AUTO_CLOSE'";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		return new dmMesg(array("data" => $chk->data));
	}
}