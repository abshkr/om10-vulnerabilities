<?php
require_once("dmpDatastore.php");

/**
 * 
 * @author bn
 *
 */
class dmpXML extends dmpDatastore{
	
	private $FS;

	public function __construct( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		if(!($chk = $this->bind(array("plug" => "dmpFS"))) instanceOf dmMesg)		return $chk;
		$this->FS = $chk->data;


	}
	
}
?>