<?php
require_once(__DIR__ . "/../dmModel.php");

/**
 *
 * @author bn
 *
*/
class URBAC_User extends dmModel{
	
	public function __construct( $params = false ){
		
		$this->SQLTable = "URBAC_USERS";
		parent::__construct($params);
		
	}
	
}
?>