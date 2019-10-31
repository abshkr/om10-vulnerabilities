<?php
class dmUtils{
	
	/**
	 * 
	 */
	public static function passParams( $params = false ){

		
		//if params is false return an empty factory object.
		if(!$params)			$params = array();
		if(is_array($params))	$params = (object)$params;
		
		//this should be a recursive method actually (to ensure all nested object/arrays are stdClass), write one if you've got 30 minutes.
		if(isset($params->payload)){
			
			if(is_array($params->payload)){
				$pl = $params->payload;
				$params->payload = (object)$pl;
			}
			
			if( (is_object($params)) && (is_object($params->payload)) )	return new dmMesg(array("data" => $params));
			
		}
		elseif(is_object($params))	return new dmMesg(array("data" => $params));
		
		return new dmError(array("dev" => " argued incorrectly, parametise with either an associated array or an value object"));
		
	}
	
	/**
	 * 
	 * @param unknown $object
	 */
	public static function debug( $object ){
		
		echo "<pre>" . print_r($object, TRUE) . "</pre>";
	}
	
	/**
	 * 
	 * @param string $params
	 */
	public static function error( $params = false ){
		
	}
	
	/**
	 * 
	 * @param string $params
	 */
	public static function JSONError( $params = false ){
		die(json_encode(new dmError($params)));
	}
	
	/**
	 * Export data from the middleware in a sanified, clean way.
	 * 
	 * 
	 * @param string $params
	 * MUST object:dmMesg
	 */
	public static function export( $params = false ){
		
		return dmUtils::clean($params->object);
		
	}
	
	/**
	 * This is a recursive method for cycling through objects and removing known variables useful to the middleware albeit polluting the presentation
	 * 
	 * @param dmModel|dmCollection $obj 
	 * 
	 * @return dmModel|dmCollection a cleaned dmModel or dmCollection instance.
	 */
	private static function clean( $obj ){
		
		foreach($obj as $attr => $value){
			
			if( is_object($value) || is_array($value) ){

				$attr = dmUtils::clean($value);
				
			}
			else{
				
				switch($attr){
				
					case "payload":
					case "PLUG":
					case "sane":
						unset($attr);
						break;
						
					default:
						break;
			
				}
				
			}
			
		}
		
		return $obj;
		
	}
	
}