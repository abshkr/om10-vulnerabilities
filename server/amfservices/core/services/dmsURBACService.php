<?php
require_once('dmsService.php');
class dmsURBACService extends dmsService{
	
	public function __construct( $params = false ){

		parent::__construct();
		
	}

	
	
	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function getUsers( $params = false ){

		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)					return $chk;
		$params = $chk->data;

		if(!file_exists(__DIR__ . "/../collections/dmURBAC_Users.php")){
			return new dmError(array("dev" => "Could not find file [" .  __DIR__ . "/../collections/dmURBAC_users.php" . "]"));
		}

		//require the FolioExceptionDate class
		require_once(__DIR__ . "/../collections/dmURBAC_Users.php");
		
		//create the folio exception; constructed with data set.
		$rCollection = new dmURBAC_Users($params);

		//return the collection
		return new dmMesg(array("data" => $rCollection));
		
	}
	
}