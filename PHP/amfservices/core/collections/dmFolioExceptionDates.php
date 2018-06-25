<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmFolioExceptionDate.php");

class dmFolioExceptionDates extends dmCollection{

	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
 

		$this->SQLTable = "filtercalendar";
		$this->model = "dmFolioExceptionDate";
		$this->dmClass = "dmFolioExceptionDates";
		
		parent::__construct($params);
		
		$this->gather = $this->gather($params);
	}
	
	
	
	public function gather($params = false){
	
	//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		

		new dmMesg(array("dev" => "\n\n\nGet Exception Dates..\n\n"));
		
		//find exception dates
		$sql = "";
		$sql.= "SELECT c_date, week_window, month_window, year_window, Date_YEAR_WINDOW, ONCE_WINDOW ";
		$sql.= "FROM filtercalendar ";
		$sql.= "WHERE (week_window = 1 OR month_window = 1 OR year_window = 1 OR Date_YEAR_WINDOW = 1 OR ONCE_WINDOW = 1) AND (override = 0 OR override is null) ";
		
		//if we're using the range parameter
		if(isset($params->range)){
			
			if(!is_object($params->range))												return new dmError(array("dev" => "range is not an array - should be array( startdate, enddate ) but is not"));
			
			if( (isset($params->range->start)) && (isset($params->range->end)) ){
				
				if(!is_string($params->range->start) || empty($params->range->start))	return new dmError(array("dev" => "range start date either empty or not a string"));
				if(!is_string($params->range->end) || empty($params->range->end))		return new dmError(array("dev" => "range end date either empty or not a string"));
				
				if(!strlen($params->range->start) == 19)								return new dmError(array("dev" => "start range not acceptable, it should be structured as YYYY-MM-DD HH:MM:SS but is not, it is [" . $params->range->start . "]"));
				if(!strlen($params->range->end) == 19)									return new dmError(array("dev" => "end range not acceptable, it should be structured as YYYY-MM-DD HH:MM:SS but is not, it is [" . $params->range->end . "]"));
				
				$sql .= "AND c_date >= to_date('" . $params->range->start . "', 'yyyy-mm-dd hh24:mi:ss')";
				$sql .= "AND c_date <= to_date('" . $params->range->end . "', 'yyyy-mm-dd hh24:mi:ss')";
			
			}
			
		}
		//if we're using the date parameter
		elseif(isset($params->date)){
			
			if(!is_string($params->date))				return new dmError(array("dev" => "date is not a string - should be string YYYY-MM-DD HH:MM:SS"));
			if(!strlen($params->date) == 19)			return new dmError(array("dev" => "date not acceptable, it should be structured as YYYY-MM-DD HH:MM:SS but is not, it is [" . $params->date . "]"));
			
			$sql .= "AND c_date = to_date('" . $params->date. "', 'yyyy-mm-dd hh24:mi:ss')";
			
		}
		
		//if we're using month/year
		elseif(isset($params->month)){
			
			if(!isset($params->year))	$year = date('Y');
			else						$year =	$params->year;

			$month = ($params->month+1);
			
			if( (is_numeric($year)) && ($year > 999) && ($year < 10000) ){
				
				if( (is_numeric($month)) && ($month >= 1) && ($month <= 12) ){


					if($month==1){
						$sql .= "AND ((c_date >= to_date('" . ($year-1) . "-12-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')";	
					}else{
						$sql .= "AND ((c_date >= to_date('" . $year . "-" . ($month-1) . "-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')";	
					}

					if($month == 12){
						$sql .= " AND c_date <= to_date('" . ($year+1) . "-02-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss'))";
					}else if($month == 11){
						$sql .= " AND c_date <= to_date('" . ($year+1) . "-01-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss'))";
					}else{
						$sql .= " AND c_date <= to_date('" . $year . "-" . ($month + 2) . "-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss'))";
					}		

					$thisMonth = date('m');
					$thisYear  = date('Y'); 

					$sql .= " OR (c_date >= to_date('".$thisYear."-".$thisMonth."-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss') ";

					if($thisMonth >= 11){
						$thisMonth = 0;
						$thisYear  = $thisYear + 1;
					}

					$sql .= "AND c_date <= to_date('".$thisYear."-".($thisMonth+2)."-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')))";
					
				}
				else
					return new dmError(array("dev" => "Argued month is not acceptable, not numeric and/or not between 1 and 12, the year check has passed however."));
			}
			else
				return new dmError(array("dev" => "Argued year is not acceptable, not numeric and/or not between 999 and 10000"));
				 
			
		}
		
		//if we're just using the year
		elseif(isset($params->year)){
			new dmMesg(array("dev" => "\n\ndoin' year"));
			
			//ensure the year is sane.
			if( (is_numeric($params->year)) && ($params->year > 999) && ($params->year < 10000) ){

				$sql .= "AND c_date >= to_date('" .$params->year . "-01-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss') ";
				$sql .= "AND c_date <= to_date('" .($params->year + 1) . "-01-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss') ";
				
			}
			else
				return new dmError(array("dev" => "Argued year is not acceptable, not numeric and/or not between 999 and 10000"));
		}
		$sql.= " ORDER BY c_date";


		//get the dates as an array.	
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$dates = $chk->data;


		
		//get the class definition files.
		if(!($chk = $this->requirefile(array("file" => __DIR__ . "/dmFolioExceptionDates.php"))) instanceOf dmMesg)						return $chk;
		if(!($chk = $this->requirefile(array("file" => __DIR__ . "/../models/dmFolioExceptionDate.php"))) instanceOf dmMesg)			return $chk;
		
		$tArray = array();
		foreach($dates as $i => $r){
			$tArray[] = new dmFolioExceptionDate((object)array("payload" => (object)$r));
		}
		$this->collection = $tArray;
		return new dmMesg();
		
	
	
	}
	
}


?>