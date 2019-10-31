<?php
require_once('dmModel.php');

/**
 * 
 * @copyright Diamond Key (2012)
 * @author Bren Norris
 *
 */
class dmUser extends dmModel{

	/**
	 * Constructor
	 */
	public function __construct( $params ){
		
		if(!($chk = dmUtils::passParms($params)) instanceOf dmMesg)		$this->sane = false;
		parent::__construct($params);
		
	}
	
	/**
	 * 
	 * @param unknown $params
	 */
	public function authenticate( $params ){
		
	}
	
	
	/**
	 * 
	 * @param Array|Object $params
	 *  MAY : Default' EN (find out abbrev)
	 */
	public function setSession( $params = false ){
		
	}
	
}
