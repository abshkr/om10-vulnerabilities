<?php
require_once('dmpBase.php');
class dmpDateHelper extends dmpBase{
	
	public $connArray;
	public $primary;
	
	/**
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
		
		
		
	}
	
	/**
	 * Takes a date integer (ie 1, as opposed to 01) and ensures the date complies to the month rules, returning a string formatted date , eg "08" whilst ensuring it is feasible for the given days of the month.
	 *
	 * [MUST] date Integer the day of the month (eg 1, 18, 25)
	 * [MUST] dom Integer the days in the given month. (eg 30, 31, 28, 29)
	 *
	 * @param string $params
	 * @return dmMesg|dmError dmMesg with the data parameter set to the string formated date (eg. 08). dmError on failure.
	 */
	public function sanifyDate( $params = false ){
	
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
	
		//ensure we have a date.
		if(!(isset($params->date)))		return new dmError(array("dev" => "no date was argued."));
		$date = $params->date;
	
		//ensure we argue the number of days in this month.
		if(!(isset($params->dom)))		return new dmError(array("dev" => "no month was argued."));
		if(!is_numeric($params->dom))	return new dmError(array("dev" => "The number of days is not a numeric value."));
	
		//make sure the date is inside the number of days in this month
		if( ($date  < 1) || ($date  > $params->dom) )									return new dmError(array("dev" => "Argued dates outside of acceptable ranges"));
	
		//if its less than 10, then ensure we have a leading zero; if we don't add a leading zero.
		if( ($date < 10) && (strlen($date) < 2)){
			$s = "0" + $date ;
			$date  = $s;
		}
	
		return new dmMesg(array("data" => $date));
	
	}
	
	/**
	 * 
	 * [MUST] date : STRING : A FULL datestamp ; eg "2013:05:01 00:00:00", 
	 * 
	 */
	public function dateIsValid( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//ensure we have a date.
		if(!(isset($params->date)))		return new dmError(array("dev" => "no date was argued."));
		$date = $params->date;
		
		//ensure the string is long enough
		if(strlen($params->date) != 19)			return new dmError(array("dev" => "The argued date was not valid.. it should be a datestamp YYYY:MM:DD HH:MM:SS but is not : it is [" . $params->date) . "]");
		
		//is this year a leapYear
		if(date('L'))		$leapYear = true;
		else				$leapYear = false;
		
		
		//explode the string to date / time
		$strExplode = explode(" ", $params->date);
		$datePart = $strExplode[0];		$timePart = $strExplode[1];

		
		
		
		
	}
	
	
}
?>