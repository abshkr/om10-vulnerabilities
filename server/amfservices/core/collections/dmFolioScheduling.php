<?php
require_once("dmPagedCollection.php");
require_once(__DIR__ . "/../models/dmFolioSchedule.php");

class dmFolioScheduling extends dmCollection{

	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->SQLTable = "FOLIOCALENDAR";
		$this->model    = "dmFolioSchedule";
		$this->dmClass  = "dmFolioScheduling";
		$this->bleh     = "";
		
		parent::__construct($params);
		
	}
	
	/**
	 * 
	 * 
	 * 
	 * (non-PHPdoc)
	 * @see dmCollection::getData()
	 */
	public function getData( $params = false ){

		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		//set the sqlSelector and counter
		$this->sqlSelect = "SELECT * FROM " . $this->SQLTable;
		$this->sqlCount = "SELECT COUNT(*) FROM " . $this->SQLTable;
		
		if(!($chk = parent::getData($params)) instanceOf dmMesg)	return $chk;
		if(!($chk = parent::compile($params)) instanceOf dmMesg)	return $chk;
		if(!($chk = $this->processSQL($params)) instanceOf dmMesg)	return $chk;
		
		$tArray = array();
		foreach($this->collection as $folioSchedule){
			
			$tArray[] = new dmFolioSchedule((object)array("payload" => (object)$folioSchedule));

		}
		
		
		$this->collection = $tArray;
		return new dmMesg();
		
	}
	

	public function addOverride($params = false){



		if(!$strExplode = explode('_', $params->payload->REPEAT_INTERVAL))		return new dmError(array("dev" => "CLEAR DATE is corrupt, expecting dd_mm, got [" . $this->payload->CLEAR_DATE ."]"));
		if(!is_array($strExplode))										return new dmError(array("dev" => "CLEAR DATE is corrupt, result was not an array, expecting dd_mm, got [" . $this->payload->CLEAR_DATE ."]"));
		if( ($strExplode[1] > 12) || ($strExplode[1] < 1) )				return new dmError(array("dev" => "CLEAR DATE received a corrupt month (its less the 1/jan, greater than 12/dec) it is : [" . $strExplode[1] . "]"));

		$date  = $strExplode[0];
		$month = $strExplode[1];
		$year  = $strExplode[2];
		
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		
		$sess = $this->PLUG->dmpSession;
		$ucode = $_SESSION['PERCODE'];

		$sql = "MERGE INTO FOLIOCALENDAR FC
   					USING (SELECT 	'OVERRIDE' WINDOW_NAME, 
                 					'OVERRIDE' DESCRIPTION, 
                 					'".$params->payload->REPEAT_INTERVAL."' REPEAT_INTERVAL, 
                 					'1' STATUS, 
                 					'".$ucode."' USER_CODE, 
                 					to_DATE('".date('Y-m-d H:i', mktime())."','yyyy-MM-dd hh24:mi') LAST_CHG_TIME FROM dual) CFC
     				ON (FC.WINDOW_NAME        = CFC.WINDOW_NAME AND
        				FC.REPEAT_INTERVAL 	  = CFC.REPEAT_INTERVAL)
   				WHEN MATCHED THEN
      				UPDATE SET 	DESCRIPTION   = CFC.DESCRIPTION,
                 				STATUS        = CFC.STATUS,
                 				USER_CODE     = CFC.USER_CODE,
                 				LAST_CHG_TIME = CFC.LAST_CHG_TIME
   				WHEN NOT MATCHED THEN
      				INSERT (WINDOW_NAME, DESCRIPTION, REPEAT_INTERVAL, STATUS, USER_CODE, LAST_CHG_TIME) 
      				VALUES (CFC.WINDOW_NAME, CFC.DESCRIPTION, CFC.REPEAT_INTERVAL, CFC.STATUS, CFC.USER_CODE, CFC.LAST_CHG_TIME)";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		

		$sql = "";
		$sql.= "UPDATE FILTERCALENDAR SET OVERRIDE = 1";
		$sql.= "WHERE c_date = to_DATE('" . $date . "/" . $month ."/" . $year . "','DD/MM/YYYY')";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;

		return new dmMesg();
	}
	/**
	 * Get the scheduled exception dates for this scheduling collection.
	 * @param string $params
	 * [MAY] date 
	 * [MAY] exceptionDate  
	 * [MAY] range Object{ start|string, end|string } (The start date/time structured as YYYY-MM-DD HH:MM:SS, The start date/time structured as YYYY-MM-DD HH:MM:SS)
	 * [MAY*] month - if argued, must also have year argued
	 * [MAY} year : integer , the year in full format , eg. 2012, 1999
	 * @return dmMesg|dmError On success, dmMesg with the data attribute set to a range of dates, dmError on failure.
	 */
	public function getExceptionDates( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		new dmMesg(array("dev" => "\n\n\nGet Exception Dates..\n\n"));
		
		//find exception dates
		$sql = "";
		$sql.= "SELECT c_date, week_window, month_window, year_window, Date_YEAR_WINDOW, ONCE_WINDOW ";
		$sql.= "FROM filtercalendar ";
		$sql.= "WHERE (week_window = 1 OR month_window = 1 OR year_window = 1 OR Date_YEAR_WINDOW = 1 OR ONCE_WINDOW = 1) AND (override = 0) ";
		
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

			$month = $params->month;
			
			if( (is_numeric($year)) && ($year > 999) && ($year < 10000) ){
				
				if( (is_numeric($month)) && ($month > 0) && ($month < 13) ){
					
					$sql .= "AND c_date >= to_date('" . $year . "-" . $month . "-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')";
					
					//if the month is december, we need to push the year + 1, and the month to 0 (so it adds 1 , thus gets jan) (ie. 2014-13-01 BAD!!!!, 2015-01-01 good..) we can't use a month of 13 for a range check.
					if($month == 12){ $month = 0; $year++; }		
					$sql .= " AND c_date <= to_date('" . $year . "-" . ($month + 1) . "-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')";
					
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

				$sql .= "AND c_date >= to_date('" .$params->year . "-01-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')";
				$sql .= "AND c_date <= to_date('" .$params->year + 1 . "-01-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')";
				
			}
			else
				return new dmError(array("dev" => "Argued year is not acceptable, not numeric and/or not between 999 and 10000"));
		}
		$sql.= "ORDER BY c_date";
	
		//get the dates as an array.	
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$dates = $chk->data;
		
		//get the class definition files.
		if(!($chk = $this->requirefile(array("file" => __DIR__ . "/dmFolioExceptionDates.php"))) instanceOf dmMesg)						return $chk;
		if(!($chk = $this->requirefile(array("file" => __DIR__ . "/../models/dmFolioExceptionDate.php"))) instanceOf dmMesg)			return $chk;
		
		//instance a FolioExceptionsDates.
		$cFED = new dmFolioExceptionDates();
	
	
		//instance to a collection.
		foreach($dates as $i => $r){
			
			$cFED->addModel(array("model" => new dmFolioExceptionDate((object)array("payload" => (object)$r))));
			
		}
		
		return new dmMesg(array("data" => $cFED));
		
	}
	
	
}


?>