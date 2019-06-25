<?php
require_once('dmCore.php');

/**
 * 
 * @author bn
 *
 */
class dmController{
	
	private static $instance;
	protected static $core;
	protected static $conn;		// an instance of dmpDataSource
	
	/**
	 * Constructor : Singleton.
	 */
	private function __construct(){ }
	
	/**
	 * 
	 * PHP doesn't have true singletons. getController should be used to instance the controller. 
	 * 
	 * @param array|object $params
	 * None.
	 * 
	 * @return dmController
	 */
	public static function getController( $params = false ){
		
		if(!self::$core)		self::$core = new dmCore();
		if(!self::$instance)	self::$instance = new dmController();
 		self::$instance->connect();
		return self::$instance;
		
	}
	
	/**
	 * 
	 * @param string $params
	 * @return unknown
	 */
	public function connect( $params = false ){

		if(!($chk = self::$core->bind(array("plug" => "dmpDataMUX"))) instanceOf dmMesg)	return $chk;
		$mux = $chk->data;
	
		//are we connected?
		if(!($chk = $mux->isConnected()) instanceOf dmMesg)			return $chk;
		$connChk = $chk->data;
		
		if(!$connChk){
		
			if(!($chk = $mux->setSources()) instanceOf dmMesg)		return $chk;
			if(!($chk = $mux->connectSource()) instanceOf dmMesg)	return $chk;

			//are we connected?
			if(!($chk = $mux->isConnected()) instanceOf dmMesg)		return $chk;
			$innerconnChk = $chk->data;
			
			if($innerconnChk)	return new dmMesg();
			else				return new dmError(array("dev" => "cannot connect after multiple attempts"));
			
		}
		else
			return new dmMesg();
		
	}
	
	/**
	 * 
	 * @param string $params
	 * @return Ambigous <dmMesg, dmError>|dmMesg|dmError
	 */
	public function setDatasource( $params = false){
		
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		if(!isset($params->source)){

			//get the data plug
			if(!($chk = self::$core->PLUG->dmpDataMUX->getPrimary()) instanceOf dmMesg)	return $chk;
			$source = $chk->data;
		
		}
		else
			$source = $params->source;
		
		
		self::$conn = self::$core->PLUG->dmpDataMUX->connArray->$source;

		if(self::$conn instanceOf dmpDataSource)	return new dmMesg(array("dev" => "Controller bound to [" . $source . "][" . self::$conn->server . "]"));

		return new dmError(array("dev" => "An exception occurred"));
		
	}
	
	/**
	 * 
	 * 
	 * @param string $params
	 * 
	 */
	public function query( $params = false ){
		
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		
		if(!($chk = $this->setDatasource(array("connected" => true))) instanceOf dmMesg)	return $chk;
		
		
		//new dmError(array("dev" => "Executed with query in dmController.query " . $params->sql));
		if(!($chk = self::$conn->query(array("sql" => $params))) instanceOf dmMesg)			return $chk;
		$return = $chk->data;
		
 		return new dmMesg(array("data" => $return));
 	
	}
	
	/**
	 *
	 *
	 * @param string $params
	 *
	 */
	public function insert( $params = false ){
	
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
	
	
		if(!($chk = $this->setDatasource(array("connected" => true))) instanceOf dmMesg)	return $chk;
	
	
		if(!($chk = self::$conn->insert(array("sql" => $params))) instanceOf dmMesg)			return $chk;
		$return = $chk->data;
	
		return new dmMesg(array("data" => $return));
	
	}
	
	/**
	 *
	 *
	 * @param string $params
	 *
	 */
	public function update( $params = false ){
	
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
	
	
		if(!($chk = $this->setDatasource(array("connected" => true))) instanceOf dmMesg)	return $chk;
	
	
		if(!($chk = self::$conn->update(array("sql" => $params))) instanceOf dmMesg)			return $chk;
		$return = $chk->data;
	
		return new dmMesg(array("data" => $return));
	
	}
	
	
	/**
	 * TODO: ????????
	 * @param Array|Object $params
	 * MUST type
	 * MAY uid 
	 * MAY conditions
	 * 
	 */
	public function get( $params = false ){
		
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//deal with conditions
		if(!isset($params->conditions))	$params->conditions 	= array();
		if(isset($params->uid))			$params->conditions[]	= array("uid", "=", $params->uid);
		
		
	}
	
	
	/**
	 * ??????
	 * @param string $params
	 */
	public function getWindow( $params = false ){

		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		
		
		
		
	}
	
}
?>
