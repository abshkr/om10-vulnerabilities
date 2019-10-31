<?php
require_once(__DIR__ . "/../framework-utils.php");

class Service{
	
	protected $table;
	
	public function __construct(){
		
	}
	
	
	public function get( $params = false ){

		//pass parameter check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//paged results.
		if(!isset($params->paged))	$params->paged = true;
		else						$params->paged = false;
		
		
		
	}
	
	public function create( $params = false ){
		
		//pass parameter check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
	}
	
	public function update( $params = false ){
		
		//pass parameter check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
	}
	
	public function delete( $params = false ){
		
		//pass parameter check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
	}
	
	
}