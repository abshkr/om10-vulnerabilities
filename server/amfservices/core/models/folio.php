<?php
require_once(__DIR__ . "/../dmModel.php");

/**
 * 
 * @author bn
 *
 */
class folio extends dmModel{
	
	public function __construct( $params = false ){
		
		if(is_object($params)){

			foreach($params->payload as $key => $value)
				$this->$key = $value;
		
		}
		
	}
	
}
?>