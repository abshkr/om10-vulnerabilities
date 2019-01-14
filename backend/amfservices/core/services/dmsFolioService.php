<?php
require_once('dmsService.php');
class dmsFolioService extends dmsService{
	
	public function __construct( $params = false ){

		parent::__construct();
		
	}

	/**
	 * Determines whether or not this is a day folios should be created/performed
	 */
	public function chkFolioDay( $params = false ){
		
	}

	/**
	 * Method for daily execution by CRON. Currently checks to see if the day as a permissable day to create a folio and creates one if it is.
	 * 
	 * @param string $params
	 * 
	 */
	public function cronFolio( $params = false ){
		
		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//create the SQL
		$sql = "SELECT * FROM folioCalander WHERE ";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$this->collection = $chk->data;
		
		
	}
	
	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function getFolioScheduling( $params = false ){

		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)					return $chk;
		$params = $chk->data;

		if(!file_exists(__DIR__ . "/../collections/dmFolioScheduling.php")){
			return new dmError(array("dev" => "Could not find file [" .  __DIR__ . "/../collections/dmFolioScheduling.php" . "]"));
		}

		//require the FolioScheduling class
		require_once(__DIR__ . "/../collections/dmFolioScheduling.php");
		
		//create the folio exception; constructed with data set.
		$rCollection = new dmFolioScheduling($params);
		$rCollection->getData();

		//return the collection
		return new dmMesg(array("data" => $rCollection));
		
	}

	public function addSchedulingOverride( $params = false ){

		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)					return $chk;
		$params = $chk->data;

		if(!file_exists(__DIR__ . "/../collections/dmFolioScheduling.php")){
			return new dmError(array("dev" => "Could not find file [" .  __DIR__ . "/../collections/dmFolioScheduling.php" . "]"));
		}

		//require the FolioScheduling class
		require_once(__DIR__ . "/../collections/dmFolioScheduling.php");
		
		//create the folio exception; constructed with data set.
		$rCollection = new dmFolioScheduling($params);
		$rCollection->addOverride($params);

		//return the collection
		return new dmMesg(array("data" => $rCollection));
		
	}
	
	public function getFolios( $params = false ){
		
		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)					return $chk;
		$params = $chk->data;
		
		if(!file_exists(__DIR__ . "/../collections/dmFolioManagement.php")){
			return new dmError(array("dev" => "Could not find file [" .  __DIR__ . "/../collections/dmFolioScheduling.php" . "]"));
		}
		
		//require the FolioScheduling class
		require_once(__DIR__ . "/../collections/dmFolioManagement.php");
		
		//create the folio exception; constructed with data set.
		$rCollection = new dmFolioManagement($params);
		
		new dmMesg(array("Dev" =>  "exporting" . print_r($rCollection, TRUE)));
		
		//return the collection
		return new dmMesg(array("data" => $rCollection));
		
	}
	
}