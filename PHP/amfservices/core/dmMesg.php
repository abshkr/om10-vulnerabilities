<?php

class dmMesg{
	
	public $data;
	public $dev;
	public $user;
	public $verbosity;
	public $dmClass;
		
	/**
	 * Constructor
	 */
	public function __construct( $params = false ){

		$this->dmClass = "dmMesg";
		
		//typecast params to an object if argued as an array
		if(is_array($params)){

			$params = (object)$params;
		
		}
		
		
		//if params is an object, set the class.
		if(is_object($params)){

			//default verbosity
			if(!isset($params->vb))	$this->verbosity = 3;
			else					$this->verbosity = $params->vb;
				
			foreach($params as $arg => $val)	$this->$arg = $val;
			
		}
		
		if($this->dev)	$this->log($params);
		
	}
	
	/**
	 * 
	 * Log output
	 * 
	 * @param MAY $params
	 * 
	 * @return dmError
	 * 
	 */
	private function log( $params = false ){
		
		if(isset($_SESSION['dm']))	$logFile = $_SESSION['dm']->logs->location;
		else
		$logFile = __DIR__ . "/../logs/system.log";
		
		$entry = "---Message---  " . $this->dev . "\n\r"; 	
		if(!file_put_contents($logFile, $entry, FILE_APPEND))
		{
			die('Could not write to logfile [' . $logFile . '] - file permissions?');
			
		} 
		
		
	} 
	
	
}