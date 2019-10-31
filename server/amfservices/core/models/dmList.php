<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmList extends dmModel
{

	public function __construct( $params = false )
	{

		$this->SQLTable = "";
		$this->dmClass = "dmList";
		$this->primaryKey = array();
		
		parent::__construct($params);
		
	}

}
?>