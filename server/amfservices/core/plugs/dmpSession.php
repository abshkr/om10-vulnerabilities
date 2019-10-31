<?php
require_once('dmpBase.php');
require_once(__DIR__  . '/../dmController.php');

class dmpSession extends dmpBase{

	public $ctl;
	
	public function __construct( $params = false ){
		
		
	
	}
	
	/**
	 * Parse the config initialisation file to the PHPSESSION. This method attempts to parse /config/config.ini as an override to the PHP environement variables inside omega5k server.
	 * 
	 * @param string $params
	 * 
	 * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
	 * 
	 */
	public function parseConfig( $params = false ){
			
		//parse the INI file for override.
		if(!($chk = $this->parseINI()) instanceOf dmMesg)	return $chk;
		$parse = $chk->data;
			
		//set up an accessible session object.
		$sess = (object)array();
		$sess->datasources = (object)array();
		$sess->logs = (object)array();
		
		//does the INI file signal an override for logs, levels and locations?
		if(isset($parse->logs) && !empty($parse->logs)){
			
			//logging on or off?
			if(isset($parse->logs->logging) && ($parse->logs->logging))		$sess->logs->logging = $parse->logs->logging;
			else															$sess->logs->logging = false;
			
			//logging level
			if(isset($parse->logs->detail))									$sess->logs->detail = $parse->logs->detail;
			else															$sess->logs->detail = 1;
			
			//logging location
			if(isset($parse->logs->location))								$sess->logs->location = $parse->logs->location;
			else															$sess->logs->location = __DIR__ . "/../logs/system.log";
			
		}
		
		//does the INI file signal an override for datasources?
		if(isset($parse->datasources) && !empty($parse->datasources)){
				
			//TODO: need enhancement in this part, because one $dbase could have multiple users and each of them could be an independent datasource. !!!!!!
			//boot if there are more there is more than 1 set.
			if(count($parse->datasources) > 1)	return new dmError(array("dev" => "Multiple datasources are not supported at this time"));
				
			//get the key - this is the database name in the config.ini structure, if ommitted, it attempts to resolve it in the environment
			foreach($parse->datasources as $k => $v)	$dbase = $k;
			if(!isset($dbase)){
				if(!($dbase = getenv('OMEGA_DBASE')))		return new dmError(array("dev" => "Database not identified in either the config.ini or environemnt - resolve"));
			}
			
			
			//create the dbase object
			if($dbase)	$sess->datasources->$dbase = (object)array();

			//if we're using the INI database definition.
			if(isset($parse->datasources->$dbase)){

				//skim over the config; i choose a switch so I can catch a bad config variable.
				foreach($parse->datasources->$dbase as $k => $v){
					
					switch($k){
							
						case "driver":
							$driver = $v;
							break;
								
						case "username":
							$username = $v;
							break;
								
						case "password":
							$password = $v;
							break;
								
						case "server":
							$server = $v;
							break;
								
						default:
							return new dmError(array("dev" => "Unknown Configuration value [" . $k . "]; delete this in config.ini"));
								
					}
						
				}
			}
				
		}
			
		//if no driver was set, use dmpOracle
		//use the parsed username or (if not set) the PHP ENV set user, or die.
		if(isset($driver))						$sess->datasources->$dbase->driver = $driver;
		else									$sess->datasources->$dbase->driver = "dmpOracle";
			
		//use the parsed username or (if not set) the PHP ENV set user, or die.
		if(isset($username))					$sess->datasources->$dbase->username = $username;
		else{
			if(getenv('OMEGA_USER'))			$sess->datasources->$dbase->username = getenv('OMEGA_USER');
			else								return new dmError(array("dev" => "No database username was found in either the Apache configuration or config.ini"));
		}
			
		//use the parsed password or (if not set) the PHP ENV set password, or die.
		if(isset($password))					$sess->datasources->$dbase->password = $password;
		else{
			if(getenv('OMEGA_PWD'))	$sess->datasources->$dbase->password = getenv('OMEGA_PWD');
			else								return new dmError(array("dev" => "No database password was found in either the Apache configuration or config.ini"));
		}
			
		//user the config's server, or set it localhost.
		if(isset($server))						$sess->datasources->$dbase->server = $server;
		else									$sess->datasources->$dbase->server = 'localhost';
			
		//attach the parsed contents to the session object
		$_SESSION['dm'] = $sess;

		$this->getXMLConfig();
		
		if(isset($_SESSION['dm']) && (is_object($_SESSION['dm'])))	return new dmMesg();
		else														return new dmError(array("dev" => "Fell to an exception"));
		
	}
	
	/**
	 * 
	 * @return dmError|dmMesg
	 */
	private function parseINI(){
		
		//set config location
		$configLocation = __DIR__ . '/../../config/config.ini';
			
		//ensure the config file exists
		if(!file_exists($configLocation))	return new dmError(array("dev" => "config file not found at [" . $configLocation . "]"));
		
		//ensure we got config contents
		if(!$contents = file_get_contents($configLocation))	return new dmError(array("dev" => "config.ini is corrupt, contents could not be read"));
		
		//parse contents
		if(!$parse = json_decode($contents))	return new dmError(array("dev" => "config.ini is corrupt, contents are not parsing"));
		
		return new dmMesg(array("data" => $parse));
		
	}

	/**
	 * Get the session object, or a specific parameter of it.
	 * 
	 * @param string $params
	 * 
	 * @return dmError, dmMesg|dmMesg
	 */
	public function get( $params = false ){
		


		//if there is no session, parse the configuration.
		if(!isset($_SESSION['dm'])){
			
			if(!($chk = $this->parseConfig()) instanceOf dmMesg)	return $chk;

			if(!isset($_SESSION['dm']))	return new dmError(array("dev" => "Attempted to retrieve the session variable at [dm] but failed, tried to parse the server configuration to the session and succeeded but its still not set - probably a PHP server issue; bailing."));

		}
		
		//we're going to bring in the old variables with the dm index of the session.
		if(!($chk = $this->mergeWith3k()) instanceOf dmMesg)		return $chk;
		
		foreach($chk->data as $k => $v)
			$_SESSION['dm']->$k = (object)$v;
		
		
		return new dmMesg(array("data" => $_SESSION['dm']));
		
	}

	/**
	 * This retrieves the ZEND implimentation of the session.
	 * 
	 * 
	 */ 
	private function mergeWith3k( $params = false ){

		$var = $_SESSION;
		
		unset($var['dm']);

		return new dmMesg(array("data" => $var));

	} 

	private function getXMLConfig( $params = false ){
	
		
		return new dmMesg();
		
		
	}

	
}
?>