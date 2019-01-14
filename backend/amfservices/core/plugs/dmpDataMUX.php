<?php
require_once('dmpBase.php');
class dmpDataMUX extends dmpBase{
	
	public $connArray;		// the list of instances of dmpDataSource
	public $primary;		// the name of primary datasource
	
	/**
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
		
		
		
	}
	
	/**
	 * Set the primary data source by common name.
	 * 
	 * @param Array|Object $params
	 * MUST : cn | String the common name of the data connection
	 */
	public function setPrimary( $params = false ){

		//parse param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)				return $chk;
		$params = $chk->data;
		
		if(!isset($params->source))						return new dmError(array("dev" => "No source specified, please argue one."));
		
		if(!$params->source instanceOf dmpDataSource)	return new dmError(array("dev" => "source is not a dmpDataSource object."));
		
		$sourceName = $params->source->cn;
		
		if(isset($this->connArray->$sourceName)){
			$this->primary = $sourceName;
			return new dmMesg(array("dev" => "Primary source set, " . $this->primary));
		}
		
		
	}
	
	/**
	 * Get the common name of the primary source.
	 * 
	 * @param string $params
	 * @return Ambigous <dmMesg, dmError>|dmError|dmMesg
	 */
	public function getPrimary( $params = false ){
		
		//parse param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)				return $chk;
		$params = $chk->data;
		
		if(!isset($this->primary))						return new dmError(array("dev" => "The MUX has no primary source specified."));
		$primary = $this->primary;
		
		if(!isset($this->connArray->$primary))			return new dmError(array("dev" => "The MUX attempted to use [" . $primary ."] as a datasource but could not find it in the array"));
		
		if($this->connArray->$primary instanceOf dmpDataSource){
			
			return new dmMesg(array("data" => $primary));
				
		}
		else
			return new dmError(array("dev" => "An expection occurred"));
			
	}
	
	/**
	 * Get Sources for this installation.
	 * @param string $params
	 */
	public function getSources( $params = false ){
		
		//get the session Plugin.
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg)	return $chk;
		$pSession = $chk->data;
		
		//get the session object
		if(!($chk = $pSession->get()) instanceOf dmMesg)							return $chk;
		$PHPSESS = $chk->data;
		
		//ensure we have datasources
		if(!isset($PHPSESS->datasources))	return new dmError(array("dev" => "Datasources are not set in the configuration file, please rectify this"));

		//ensure we have at least 1 and send them back
		if(count((array)$PHPSESS->datasources) > 0 ){
			
			$returnSource = (object)array();	
			
			foreach($PHPSESS->datasources as $name => $source){
				$source->cn = $name;
				$oSource = new dmpDataSource($source);
				if(!$oSource->isSane())					return new dmError(array("dev" => "a datasource was found corrupted: " . print_r($oSource, TRUE)));	
				$sourcename = $oSource->cn;
				
				$returnSource->$sourcename = $oSource;
			}
			
			if(!($chk = $this->unbind(array("plug" => "dmpSession"))) instanceOf dmMesg)	return $chk;
			return new dmMesg(array("data" => $returnSource));
		
		}
			
		//send a message back; we have none and so we'll send back an empty object - as expected for nothing.
		if(!($chk = $this->unbind(array("plug" => "dmpSession"))) instanceOf dmMesg)	return $chk;
		return new dmMesg(array("data" => (object)array()));
	
	}

	/**
	 * Set this class with all known sources
	 * @param string $params
	 */
	public function setSources( $params = false ){
		
		if(!($chk = $this->getSources()) instanceOf dmMesg)	return $chk;
		$this->connArray = $chk->data;
		
		
		//if we only got one, i'm going to set it as the primary source
		if(count((array)$this->connArray) == 1){

			$connAsArray = (array)$this->connArray;
			$source = array_shift($connAsArray);
			$this->setPrimary(array("source" => $source));
		
		}
		
		//how to hard test this; if no sources are specced, none are created - which is ok!
		return new dmMesg();
		
	}
	
	/**
	 * Connect a source to the MUX
	 * @param string $params contains "source" which is the name of data source
	 * MAY : source - an instance of dmpDataSource
	 */
	public function connectSource( $params = false){
		
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		if(!isset($params->source))	$params->source = $this->primary;
		$sourcename = $params->source;
		
		$connObj = $this->connArray->$sourcename;
		
		// use dmpDataSource's connect function which will call its driver's connect function eventually
		if(!($chk = $connObj->connect()) instanceOf dmMesg)	return $chk;
		
		
		
	}
	
	/**
	 * Determine if the MUX has a specific connection.
	 * 
	 * @param Object|Array $params
	 * 
	 * @return Ambigous <dmMesg, dmError>|dmMesg
	 */
	public function isConnected( $params = false ){
	
		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//if we have an empty connection array, just bail - nothing to be seen here.
		if(empty($this->connArray))										return new dmMesg(array("data" => false));
		
		//if no source is argued, assume the primary is.
		if(!isset($params->source)){
			
			//do we have a primary; no? no source, no primary... just indicate nothing is connected.
			if(!$this->primary)		return new dmMesg(array("data" => false));
			else{
				
				$source = $this->primary;
				if($this->connArray->$source->connected)	return new dmMesg(array("data" => true));
				else										return new dmMesg(array("data" => false));
			
			}
			
		}
		else{
			
			//set the source as provided.
			$source = $params->source;
			
			//if the source isn't in the connectionarray, indicate not connected.
			if(!isset($this->connArray->$source))			return new dmMesg(array("data" => false));
			
			//connected, looking good? ...
			if($this->connArray->$source->connected)		return new dmMesg(array("data" => true));
			else											return new dmMesg(array("data" => false));
					
		}
		
		
	}
	
}

class dmpDataSource{
	
	public $cn;
	public $driver;
	public $username;
	public $password;
	public $server;
	public $connected;
	public $instance;	// an instance of datastore class, such as dmpOracle...
	
	public function __construct( $params = false ){
		
		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//iterate the source value
		foreach($params as $key => $val)	$this->$key = $val;
		
		//set this unconnected.
		$this->connected = false;
			
	}
	
	/**
	 * Check to ensure this dmpDataSource is sane.
	 * @return BOOLEAN true if sane, false if corrupt.
	 */
	public function isSane(){
		
		if(
			!empty($this->cn) && 
			!empty($this->driver) &&
			!empty($this->username) 
		)	return true;
		
		return false;
		
	}
	
	/**
	 * Connect this datasource.
	 * 
	 * @param string $params
	 * 
	 * @return dmMesg|dmError
	 */
	public function connect( $params = false ){

		if($this->isSane()){
	
			//include the driver
			if(!@require_once(__DIR__ . "/data/" . $this->driver . ".php"))	return new dmError(array("dev" => "Driver [" . $this->driver . "] was not found at [" . __DIR__ . "/data]. Please install driver"));

			//ensure it has a class
			if(!class_exists($this->driver))		return new dmError(array("dev" => "Driver [" . $this->driver . "] was not instantiable, class file corrupt"));
			$driver = $this->driver;
			
			//instance and validate it has.
			$this->instance = new $driver($params);
			if(!$this->instance instanceOf $driver)	return new dmError(array("dev" => "Driver [" . $this->driver . "] was not instanced upon attempt"));
			
			//connect the source, from the driver
			if(!($chk = $this->instance->connect((object)array("source" => $this))) instanceOf dmMesg)	return $chk;
			
			//tag this source is now connected
			$this->connected = true;
			
			return new dmMesg();
			
		}
		else
			return new dmError(array("dev" => "Attempting to a connection that was not passed as sane."));
		
	}
	
	/**
	 * Query this datasource.
	 * 
	 * @param string $params
	 * 
	 * @return dmMesg|dmError
	 */
	public function query( $params = false ){
		
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		$result = $this->instance->query($params->sql);
		
//		new dmError(array("dev" => "Executed with query in dmpDataSource.query " . $params->sql->sql));
//		new dmMesg(array("dev" => "Executed with query in dmpDataSource.query " . $params->sql));
		return $result;
	}
	
	/**
	 * Update the datasource, expects no fetch.
	 *
	 * @param string $params
	 *
	 * @return dmMesg|dmError
	 */
	public function update( $params = false ){
	
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
	
		return $this->instance->update($params->sql);
	
	}
	
	/**
	 * Insert into the datasource, expects no fetch.
	 *
	 * @param string $params
	 *
	 * @return dmMesg|dmError
	 */
	public function insert( $params = false ){
	
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
	
		return $this->instance->insert($params->sql);
	
	}
	
}

?>
