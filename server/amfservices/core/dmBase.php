<?php
require_once('dmMesg.php');
require_once('dmError.php');
require_once('framework-utils.php');

/**
 *
 * @copyright Diamond Key (2012)
 * @author Bren Norris
 *
 */

class dmBase{
	
	public $sane;				//toggle to indicate this object is sane (useful for constructor failure)
	public $sanityError;		//if a constructor fails this parameter should reference a dmError.
	
	public function __construct( $params = false ){
		
	}
	

	
	
}


?>