<?php

require_once(__DIR__ . '/../dmCore.php');
class dmsService extends dmCore{

	public function __construct( $params = false ){
		
		parent::__construct();
		
		//all services should parse their config, set their session object up.
		@session_start();
		$this->parseConfig();
		
	}
	
}