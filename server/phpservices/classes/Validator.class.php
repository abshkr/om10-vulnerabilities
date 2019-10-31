<?php
/**
 *  Validator class used to ensure data matches DB rules before inserting into the database
 *  This first version only contains a static function to validate string length. You pass it
 *  a min value, a max value and the string to be validated. More methods will be added down the line.
 */
 
 
require_once(dirname(__FILE__) . '/../bootstrap.php');
if(!defined('VALIDATECLASS')) define('VALIDATECLASS','Validator.class');
class Validator {
	
	public static function validateStringLength($min, $max, $string) {
		$validator = new Zend_Validate_StringLength(array('min' => $min, 'max' => $max));
		if(!$validator->isValid($string)) {
			return false;
		}
		return true;
	}
}