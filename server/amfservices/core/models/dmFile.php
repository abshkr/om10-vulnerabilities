<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmFile extends dmModel{

	public function __construct( $params = false )
	{
		$this->dmClass = "dmFile";
		parent::__construct($params);
	}

	public function __destruct(){
		
	}

}
?>