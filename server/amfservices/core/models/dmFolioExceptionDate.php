<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmFolioExceptionDate extends dmModel{

	public function __construct( $params = false ){

		//$this->SQLTable = "TANKS";
		$this->dmClass = "dmFolioExceptionDate";
		//$this->primaryKey = "SEQ";
		
		parent::__construct($params);
		
	}

	public function revertOverride( $params = true ){





			//yearly monthly weekly dayOfYear once_off

			//date - pulled from payload







	}

	
	
}
?>