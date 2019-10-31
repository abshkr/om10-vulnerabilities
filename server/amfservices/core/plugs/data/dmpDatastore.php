<?php

require_once(__DIR__ . '/../dmpBase.php');
class dmpDatastore extends dmpBase{
	
	protected $conn;
	
	public function __construct( $params = false ){

		parent::__construct($params);
	
	}
	
	
}