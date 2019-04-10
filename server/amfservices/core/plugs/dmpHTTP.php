<?php
require_once('dmpCURL.php');

class dmpHTTP extends dmpCURL{
	
	private $url;
	private $response;
	private $opts;
	
	private $hdl;
	
	public function __construct( $params = false ){
		
	}
	
	private function setOptions(){
		
	}

	public function get( $params = false ){

		//pass the parameters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)		return $chk;
		$params = $chk->data;
		
		
		
	}
	
}
?>