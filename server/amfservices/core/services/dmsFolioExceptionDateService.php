<?php
require_once('dmsService.php');
class dmsFolioExceptionDateService extends dmsService{
	
	public function __construct( $params = false ){

		parent::__construct();
		
	}
	
	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function getExceptionDates( $params = false ){

		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)					return $chk;
		$params = $chk->data;

		if(!file_exists(__DIR__ . "/../collections/dmFolioExceptionDates.php")){
			return new dmError(array("dev" => "Could not find file [" .  __DIR__ . "/../collections/dmFolioExceptionDates.php" . "]"));
		}

		//require the FolioScheduling class
		require_once(__DIR__ . "/../collections/dmFolioExceptionDates.php");
		
		//create the folio exception; constructed with data set.
		$rCollection = new dmFolioExceptionDates($params);

		//return the collection
		return new dmMesg(array("data" => $rCollection));
		
	}
	
	
}