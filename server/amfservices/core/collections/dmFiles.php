<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmFile.php");

class dmFiles extends dmCollection{

	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->model = "dmFile";
		$this->dmClass = "dmFiles";
		$this->payload->totalFileSize = 0;
		$this->payload->fileCount = 0;
	
		
	}
	
	/**
	 * Add a file (a dmFile) to this collection.
	 * 
	 * [MUST] file : dmFile
	 * 
	 * @param string $params
	 * 
	 * @return void
	 */
	public function addFile( $params = false ){
		
		if(isset($params->file)){
			
			if(!$params->file instanceOf dmFile)					return new dmError(array("dev" => "File was not an instance of dmFile...."));
			$this->collection[] = $params->file;
		
		}
		else
			return new dmError(array("dev" => "File is required"));
		
		//$this->payload->totalFileSize += $params->file->payload->size;
		$this->payload->fileCount++;
	}
	
}
?>