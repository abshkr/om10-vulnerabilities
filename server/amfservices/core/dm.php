<?php
require_once('dmCore.php');
require_once('dmController.php');

class dm extends dmCore{

	public function __construct(){
		
		session_start();
		if(!($chk = $this->parseConfig()) instanceOf dmMesg)	die(print_r($chk));
	
	}
	
	public static function startdm(){
		
	
		
	}
	
}