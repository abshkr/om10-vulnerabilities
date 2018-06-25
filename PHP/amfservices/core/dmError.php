<?php
/**
 *
 * @copyright Diamond Key (2012)
 * @author Bren Norris
 *
 * An managed error class
 * 
 * @todo logs, severity levels, email
 *
 */
class dmError{
	
	public $data;
	public $dev;
	public $user;
	public $dmClass;
		
	/**
	 * Constructor
	 */
	public function __construct( $params = false ){

		$this->dmClass = "dmError";
		
		//typecast params to an object if argued as an array
		if(is_array($params))	$params = (object)$params;
		
		//if params is an object, set the class.
		if(is_object($params)){

			foreach($params as $arg => $val)	$this->$arg = $val;
			
		}	
		
		//create common dev errors if one wasn't sent.
		//calling class, calling function, line number.
		$trace = debug_backtrace();	
		$call = array_shift($trace);
		
		
		//set up the default error and default precursion for best developer diagnosis.
		if(!$this->dev)	$this->dev = "An Error occured from " . $call['class'] . "::" . $call['function'] . " - on line " . $call['line'];				
		else			$this->dev = "An Error occured from " . @$call['class'] . "::" . @$call['function'] . " - on line " . $call['line'] . "\n\r" . $this->dev . "\n\r\n\r";
		
		
		if($this->dev)	$this->log();
		
	}
	
	private function log( $params = false ){
	
		if(isset($_SESSION['dm']))	$logFile = $_SESSION['dm']->logs->location;
		else						$logFile = __DIR__ . "/../logs/system.log";
		
		$entry = "!!!ERROR---  " .  $this->dev;
		file_put_contents($logFile, $entry, FILE_APPEND);
	
	
	}
	
	
}