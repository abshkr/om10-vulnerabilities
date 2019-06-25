<?php
require_once('dmBase.php');

/**
 *
 * @copyright Diamond Key (2012)
 * @author Bren Norris
 *
 */
class dmCore extends dmBase{

	public $PLUG;
	protected $ctl;							//an instance of the database singleton.
	
	
	public function __construct(){
		
		parent::__construct();
		
	}
	
	/**
	 * Bind a plug to this model/collection. Return it's instance, and store the instance to this::PLUG
	 * 
	 * @param array $params 
	 *  MUST	plug : String - the name of the plug being bound to this instance.
	 *  MAY		params: array|object - parameters for the plug
	 * 
	 * @return dmMesg|dmError dmMesg with the data parameter a reference to the resulting bound plugin class, dmError on failure.
	 */
	public function bind( $params = FALSE ){
		
		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;	
		$params = $chk->data;
	
		//ensure we have a plug
		if(!isset($params->plug))	return new dmError(array("dev" => "No plug specified to bind"));
		$plug = $params->plug;
		
		//ensure self::plug is an object
		if(!is_object($this->PLUG))		$this->PLUG = (object)array();
		//if the plug is already bound to the model, return gracefully.

		if(isset($this->PLUG->$plug) && ($this->PLUG->$plug instanceOf $plug))	return new dmMesg(array("data" => $this->PLUG->$plug));
		
		//set the plug location -- variable this in case we want to configure plug locations in the config.ini file.
		$plugLocation = __DIR__ .  '/plugs/' . $plug . '.php';
		
		//ensure the plug exists
		if(!file_exists($plugLocation))								return new dmError(array("dev" => "Plug not found [" . $plugLocation . "]"));
		
		//require the file
		if(!require_once($plugLocation))							return new dmError(array("dev" => "Plug found but could not be included [" . $plugLocation . "]" ));
		
		//ensure the plug class is instantiable now.
		if(!class_exists($plug))									return new dmError(array("dev" => "Plug [" . $plug . "] found at [" . $plugLocation . "] but no logical class is instantiable"));
		
		//bind the plug to the PLUG object
		$this->PLUG->$plug = new $plug($params);
		
		if($this->PLUG->$plug instanceOf $plug)						return new dmMesg(array("dev" => "PLUG [" . $plug . "] bound.", "data" => $this->PLUG->$plug));
		
		return new dmError(array("dev" => "Fell to an exception"));
		
	}
	
	/**
	 * Unbind a plug from this model/collection and garbage collect it.
	 * 
	 * @param string $params
	 * 
	 * @return dmError|dmMesg dmMessage with the data attribute a reference to the plug's instance. dmError on failure.
	 */
	public function unbind( $params = false ){

		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//ensure we have a plug
		if(!isset($params->plug))		return new dmError(array("dev" => "No plug specified to unbind"));
		$plug = $params->plug;
		
		//ensure self::plug is an object
		if(!is_object($this->PLUG))		$this->PLUG = (object)array();
		
		if(isset($this->PLUG->$plug))	unset($this->PLUG->$plug);
		
		if(!isset($this->PLUG->$plug))	return new dmMesg();
		else
			return new dmError(array("dev" => "Fell to an exception"));
	
	}
	
	/**
	 * Error Managed require. This is just to commonly notate the addition of classes, nothing special.
	 * 
	 * @param string $params, an array with "file"=>""
	 */
	public function requirefile( $params = false ){
		
		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//ensure we set it
		if(!isset($params->file))					return new dmError(array("dev" => "no file parameter passed, nothing included."));
			
		//ensure it exists
		if(!file_exists($params->file))				return new dmError(array("dev" => "class file [" . $params->file . "] does not exist"));
		
		if(!@include_once($params->file))			return new dmError(array("dev" => "class file [" . $params->file ."] exists but cannot be included, file permissions?"));
		else
													return new dmMesg();
		
		
	}
	
	/**
	 * Parse configuration for this server instance.
	 * 
	 * @param array|object $params
	 *  MAY foreReload DEFAULT false : when true, forces the config to reload.
	 * 
	 * @return dmMesg, dmError
	 */
	public function parseConfig( $params = false ){
	
		//pass param valid check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)						return $chk;
		$params = $chk->data;
		
		if(!isset($params->forceReload))		$params->forceReload = false;
		
		if(!isset($_SESSION['dm']) || $params->forceReload ){

			//bind the session plug
			if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg)		return $chk;
			$dmpSession = $chk->data;
			
			//parse the config to globals; moving the Session from disk/database to memory.
			if(!($chk = $dmpSession->parseConfig($params)) instanceOf dmMesg)				return $chk;
			
			//return ok only if the session is now set.
			if(isset($_SESSION['dm']))	return new dmMesg();
		
			return new dmError(array("dev" => "Fell to an excpetion"));
			
		}
		else
			return new dmMesg();
		
	}
	
	/**
	 * Error Managed Session Retrieval.
	 * @param string $params
	 */
	public function getSession( $params = false){
		
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg)		return $chk;
		$dmpSession = $chk->data;
		
		//get the session
		if(!($chk = $dmpSession->get()) instanceOf dmMesg)		return $chk;
		$sessionArray = $chk->data;
	
		if(is_array($sessionArray))								return new dmMesg(array("data" => $sessionArray));
		
		return new dmError(array("dev" => "Fell to an exception."));
		
	}
	
	/**
	 * 
	 * @param string $params
	 * @return unknown
	 */
	public function setSession( $params = false ){
		
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg)		return $chk;
		$dmpSession = $chk->data;
	
		
	}
	
	/**
	 * check to see if a datastore is connected. TODO: ?????? it hasn't return anything if conection exists
	 * @param Object|Array $params
	 * MAY connect Boolean DEFAULT : FALSE; if TRUE, perform a connection if the primary/argued source isn't already connected.
	 * MAY cn String DEFAULT : NULL; if provided, use as the common name of the connection.
	 * 
	 */
	public function isConnectedToDatastore( $params = false ){
		
		//pass param valid check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)						return $chk;
		$params = $chk->data;
		
		//is the plug attached? and is it an instance? if not, bail.
		if(!isset($this->PLUG->dmpDataMUX))						return new dmMesg(array("data" => false));
		if(!$this->PLUG->dmpDataMUX instanceOF dmpDataMUX)		return new dmMesg(array("data" => false));
		
		//is there a primary connection
		if(!($chk = $this->PLUG->dmpDataMUX->isConnected($params)) instanceOf dmMesg)		return $chk;
		
		//are we going to connect?
		if(isset($params->connect) && ($params->connect)){
			
			//are we connecting to some store other than the primary connection?
			if(isset($params->cn))			$connParams = (object)array("source" => $params->cn);
			else							$connParams = (object)array();
			
			
			
		}
			
	}
	
}
