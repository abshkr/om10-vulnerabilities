<?php
require_once(__DIR__ . "/../dmModel.php");

/**
 * 
 * @author bn
 *
 */
class dmJournalEntry extends dmModel{
	


	public function __construct( $params = false ){
	
		$this->SQLTable = "SITE_JOURNAL";
		$this->dmClass = "dmJournalEntry";
		

		parent::__construct($params);

		if(is_object($params)){

			foreach($params->payload as $key => $value)
				$this->$key = $value;
			
		}
	
	}
	
}
?>