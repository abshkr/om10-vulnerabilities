<?php

require_once('dmsService.php');

class dmsCRUD extends dmsService{
	
	public function __construct( $params = false ){

		parent::__construct();
		
	}
	
	/**
	 * CRUD Service for creating new models 
	 * 
	 * @param string $params
	 */
	public function create( $params = false ){
		
		if(!($chk = $this->getClass($params)) instanceOf dmMesg)				return $chk;
		$class = $chk->data;
		
		//attempt to instance the class
		$chk = new $class(array("payload" => $params->payload));
		if(!$chk instanceOf $class)	return new dmError(array("dev" => "instancing the class [" . $class . "] was successful but was found to be inconsistent, it is an instance of " . get_class($chk) . " - should be " . $class));
		
		//fire off the create method
		return $chk->create($params);
		
	}
	
	/**
	 * CRUD Service for removing existing models 
	 * 
	 * @param string $params
	 */
	public function delete( $params = false ){
		
		if(!($chk = $this->getClass($params)) instanceOf dmMesg)				return $chk;
		$class = $chk->data;
		
		//attempt to instance the class
		$chk = new $class(array("payload" => $params->payload));
		if(!$chk instanceOf $class)	return new dmError(array("dev" => "instancing the class [" . $class . "] was successful but was found to be inconsistent, it is an instance of " . get_class($chk) . " - should be " . $class));
		
		//fire off the create method
		return $chk->delete($params);
		
	}
	
	/**
	 * CRUD Service for updating existing models
	 *
	 * @param string $params
	 */
	public function update( $params = false ){
	
		if(!($chk = $this->getClass($params)) instanceOf dmMesg)				return $chk;
		$class = $chk->data;
	
		//attempt to instance the class
		$chk = new $class(array("payload" => $params->payload));
		if(!$chk instanceOf $class)	return new dmError(array("dev" => "instancing the class [" . $class . "] was successful but was found to be inconsistent, it is an instance of " . get_class($chk) . " - should be " . $class));
	
		//fire off the create method
		return $chk->update($params);
	
	}
	
	
	
	public function exposeModel( $params = false ){
		
		//get the class we're creating here
		if($params->dmClass){
			$tClass = explode("::", $params->dmClass);
			if ( count( $tClass ) == 1 )
			{
				$params->dmClass = $tClass[0];
			}
			else if ( count( $tClass ) > 1 )
			{
				$params->dmClass = $tClass[1];
			}
			else
			{
				;  // do nothing
			}
			//$params->dmClass = $tClass[1];
		}
		
		//ensure the file exists for this class.
		if(!file_exists(__DIR__ . "/../models/" . $params->dmClass . ".php"))	return new dmError(array("dev" => "Create service cannot continue creating a model for class [" . $params->dmClass . "] - class file could not be found"));
		require_once(__DIR__ . "/../models/" . $params->dmClass . ".php");
		
		//ensure there is a valid class defintiion.
		if(!class_exists($params->dmClass))	return new dmError(array("dev" => "Create service cannot continue creating a model for class [" . $params->dmClass . "] - class definition does not exist in the class file!"));
		$class = $params->dmClass;
		
		//attempt to instance the class
		$chk = new $class();
		
		if(!$chk instanceOf $class)	return new dmError(array("dev" => "instancing the class [" . $class . "] was successful but was found to be inconsistent, it is an instance of " . get_class($chk) . " - should be " . $class));
		
		//fire off the create method
		return $chk->exposeModel($params);
		
	}

	/**
	 * Get the class of the incoming object; fit with file checking and sanity.
	 * @param dmModel $obj
	 * @return dmError|dmMesg
	 */
	private function getClass( $obj ){
		
		//get the class we're creating here
		if($obj->dmClass){
			$tClass = explode("::", $obj->dmClass);
			if ( count( $tClass ) == 1 )
			{
				$obj->dmClass = $tClass[0];
			}
			else if ( count( $tClass ) > 1 )
			{
				$obj->dmClass = $tClass[1];
			}
			else
			{
				;  // do nothing
			}
			//$obj->dmClass = $tClass[1];
		}
		
		//ensure the file exists for this class.
		if(!file_exists(__DIR__ . "/../models/" . $obj->dmClass . ".php"))	return new dmError(array("dev" => "Create service cannot continue creating a model for class [" . $obj->dmClass . "] - class file could not be found"));
		require_once(__DIR__ . "/../models/" . $obj->dmClass . ".php");
		
		//ensure there is a valid class defintiion.
		if(!class_exists($obj->dmClass))	return new dmError(array("dev" => "Create service cannot continue creating a model for class [" . $obj->dmClass . "] - class definition does not exist in the class file!"));
		else
			return new dmMesg(array("data" => $obj->dmClass));
	
		return new dmError(array("dev" => "Fell to an exception"));
		
	}

}