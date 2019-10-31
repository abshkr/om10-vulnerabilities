<?php
require_once(__DIR__ . "/../dmModel.php");

/**
 *
 * @author bn
 *
*/
class dmFolioSchedule extends dmModel{
	
	public function __construct( $params = false ){
		
		$this->SQLTable = "FOLIOCALENDAR";
		$this->dmClass = "dmFolioSchedule";

		$this->primaryKey = array("SEQ");

		//$this->primaryKey = array("WINDOW_NAME","REPEAT_INTERVAL");
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		parent::__construct($params);
		
		
	
	}

	/**
	 * (non-PHPdoc)
	 * @see dmModel::setBlackList()
	 */
	protected function setBlackList(){
	
		if(!is_array($this->payloadBlackList))	$this->payloadBlackList = array();
	
		$this->payloadBlackList[] = "UIDate";
		parent::setBlackList();
	
	}
	
	
	public function checkOverride( $params = false){
		$sql = "UPDATE FOLIOCALENDAR SET STATUS = '0' WHERE WINDOW_NAME = 'OVERRIDE' AND REPEAT_INTERVAL = '".$params->payload->REPEAT_INTERVAL."'";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$strExplode = explode('_', $params->payload->REPEAT_INTERVAL);
		$date  = $strExplode[0];
		$month = $strExplode[1];
		$year  = $strExplode[2];
		$sql   = "UPDATE FILTERCALENDAR SET OVERRIDE = 0 WHERE c_date = to_DATE('" . $date . "/" . $month ."/" . $year . "','DD/MM/YYYY')";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$sql   = "SELECT WEEK_WINDOW, MONTH_WINDOW, YEAR_WINDOW, DATE_YEAR_WINDOW, ONCE_WINDOW FROM filtercalendar WHERE c_date = to_DATE('" . $date . "/" . $month ."/" . $year . "','DD/MM/YYYY')";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		return ($chk->data[0]['ONCE_WINDOW']  ||
			    $chk->data[0]['WEEK_WINDOW']  || 
			    $chk->data[0]['MONTH_WINDOW'] || 
			    $chk->data[0]['YEAR_WINDOW']  || 
			    $chk->data[0]['DATE_YEAR_WINDOW']);

	}
	/**
	 *
	 * 
	 * (non-PHPdoc)
	 * @see dmModel::create()
	 */
	public function create( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		$sess = $this->PLUG->dmpSession;

		$params->payload->USER_CODE 	= $_SESSION['PERCODE'];
		$params->payload->LAST_CHG_TIME = date('Y-m-d H:i:s', mktime());
		$params->payload->STATUS 		= "1";
		
		// check the override status first
		if($params->payload->WINDOW_NAME == "ONCE_WINDOW"){
			if($this->checkOverride($params))return new dmError(array("errorMessage"=>"Another exception rule already covers this date."));

		}
		//add the rule to the live exception table
		if(!($chk = $this->addExceptionToLiveTable($params)) instanceOf dmMesg)	return $chk;
				

		// check if this already exist.

		$sql = "SELECT COUNT(*) FROM FOLIOCALENDAR WHERE WINDOW_NAME = '".$params->payload->WINDOW_NAME."' AND REPEAT_INTERVAL = '".$params->payload->REPEAT_INTERVAL."'";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		
		if($chk->data[0]['COUNT(*)']==0){
			//fallback to inherited model methods.
			return parent::create($params);			
		}else{
			return parent::update($params);
		}

		
	}
	
	public function delete( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		$sess = $this->PLUG->dmpSession;
		$params->payload->USER_CODE 	= $_SESSION['PERCODE'];
		$params->payload->LAST_CHG_TIME = date('Y-m-d H:i:s', mktime());
		$params->payload->STATUS 		= "0";

		//remove the rule to the live exception table
		if(!($chk = $this->removeExceptionFromLiveTable($params)) instanceOf dmMesg)	return $chk;

		//fallback to inherited model methods.
		return parent::update($params);
		
	}

	public function update( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		$sess = $this->PLUG->dmpSession;
		$params->payload->USER_CODE 	= $_SESSION['PERCODE'];
		$params->payload->LAST_CHG_TIME = date('Y-m-d H:i:s', mktime());


		if($params->payload->STATUS == "0"){
			//remove the rule to the live exception table
			if(!($chk = $this->removeExceptionFromLiveTable($params)) instanceOf dmMesg){return $chk;}
		}else{
			//add the rule to the live exception table		
			if($params->payload->WINDOW_NAME == "ONCE_WINDOW"){
				$this->checkOverride($params);
			}
			if(!($chk = $this->addExceptionToLiveTable($params)) instanceOf dmMesg){return $chk;}
		}

		//fallback to inherited model methods.
		return parent::update($params);
		
	}
	
	/**
	 * 
	 * For the exception date calander, we have another method which updates the table's relevent rows with Boolean values (integer actually). This should be operational only when the class is in it's model form (ie. not simply just an unpopulated instance). The method evaluates payload::WINDOW_NAME, where the value of this attribute is the following:
	 * 
	 * "WEEK_WINDOW" " a day of the week, to be excluded from the closeout dates (Eg. Sunday).
	 *  REPEAT_INTERVAL is interpreted as a string; "monday", "MONDAY", 
	 *
	 * ONCE_WINDOW : a single, once off, date .
	 *  REPEAT_INTERVAL : is interpreted as a timestamp; "YYYY-MM-DD HH:MM:SS"
	 *  
	 * DATE_YEAR_WINDOW : a single DATE in a year, eg 25th Dec.
	 * 	REPEAT_INTERVAL : is interpreted as a timestamp; "YYYY-MM-DD HH:MM:SS"
	 * 
	 * MONTH_WINDOW : a single DATE to exclude every month, eg 10
	 * 	REPEAT_INTERVAL : is interpreted as an integer; 10
	 * 
	 * YEAR_WINDOW : a given day in a year, eg "the 2nd Friday of April".
	 * 	REPEAT_INTERVAL : is interpreted as a string "dd_monday_mm"; eg "2_friday_04"
	 * 
	 * @param string $params
	 * 
	 * 
	 * @return dmError|Ambigous <dmMesg, dmError, unknown, Ambigous>
	 */
	private function addExceptionToLiveTable( $params = false ){
		
		if(!isset($params->payload->WINDOW_NAME) || (!$params->payload->WINDOW_NAME))				return new dmError(array("dev" => "Folio Exception is corrupt, no window_name set, unwilling to perform."));
		$exceptionType = $params->payload->WINDOW_NAME;
		
		//ensure we have a repeat interval thats not empty
		if((!isset($params->payload->REPEAT_INTERVAL)) || (!$params->payload->REPEAT_INTERVAL) )	return new dmError(array("dev" => "No REPEAT_INTERVAL set for the live table set to dmFolioSchedule: " . print_r($this, TRUE)));
		
		switch($exceptionType){
				
			//dealing with once off : a single date run once only and not an annually recurring.
			case "ONCE_WINDOW":
			
				//explode the REPEAT_INTERVAL or bail.
				if(!$strExplode = explode('_', $params->payload->REPEAT_INTERVAL))		return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
			
				//ensure its an array
				if(!is_array($strExplode))												return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, result was not an array, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
			
				//ensure we have only 1 or 2 chars per item, or bail
				if( ($strExplode[1] > 12) || ($strExplode[1] < 1) )						return new dmError(array("dev" => "REPEAT INTERVAL received a corrupt month (its less the 1/jan, greater than 12/dec) it is : [" . $strExplode[1] . "]"));
			
				//create a month.
				if(!($chk = $this->dateArgToMonth(array("month" => $strExplode[1]))) instanceOf dmMesg)	return $chk;
				$month = $chk->data->month;
				$dOm = $chk->data->dom;
			
				//sanify the date
				if(!($chk = $this->sanifyDate(array("date" => $strExplode[0], "dom" => $dOm))) instanceof dmMesg)		return $chk;
				$date = $chk->data;
								
				$date  = $strExplode[0];
				$month = $strExplode[1];
				$year  = $strExplode[2];
					
				//apply the sql.
				$sql = "UPDATE filtercalendar SET ONCE_WINDOW = 1 WHERE c_date = to_DATE('" . $date . "/" . $month ."/" . $year . "','DD/MM/YYYY') AND C_DATE >= SYSDATE-1";
			
				//fire the query and break.
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
				break;
			
			
			//dealing with Day of Week;...
			case "WEEK_WINDOW":
		
				if(is_numeric($this->payload->REPEAT_INTERVAL)){
					if(($this->payload->REPEAT_INTERVAL > 0) && ($this->payload->REPEAT_INTERVAL < 8))	$dayNum = $this->payload->REPEAT_INTERVAL;
				}
				else{
		
					//work out the weekdat number.
					switch(strtoupper($this->payload->REPEAT_INTERVAL)){
		
						case "MONDAY":		case "MON":		$dayNum = 1;	break;
						case "TUESDAY":		case "TUES":	$dayNum = 2;	break;
						case "WEDNESDAY": 	case "WED":		$dayNum = 3;	break;
						case "THURSDAY":	case "THURS":	$dayNum = 4;	break;
						case "FRIDAY":		case "FRI":		$dayNum = 5;	break;
						case "SATDAY":	case "SAT":		$dayNum = 6;	break;
						case "SUNDAY":		case "SUN":		$dayNum = 7;	break;
						default: return new dmError(array("dev" => "A incorrect argument [" . $this->payload->REPEAT_INTERVAL ."] was not accepted for a WEEK_WINDOW Excpetion."));
		
					}
					
				}
		
				//apply the sql.
				//$sql = "UPDATE Filtercalendar SET WEEK_WINDOW = 1 WHERE TO_NUMBER (TO_CHAR (C_DATE, 'D')) IN (" . $dayNum . ")";
				$sql = "UPDATE Filtercalendar SET WEEK_WINDOW = 1 WHERE DAY_OF_WEEK IN (" . $dayNum . ") AND C_DATE >= SYSDATE-1";
				
				new dmError(array("dev" => " FIRED WEEK_WINDOW WITH SQL:\n" . $sql));
						
				//fire the query and break.
				if(!($chk = $this->ctl->insert(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
				break;
		
				
			case "MONTH_WINDOW":
			
				//error handle
				if(!is_numeric($this->payload->REPEAT_INTERVAL))				return new dmError(array("dev" => "REPEAT_INTERVAL is not a numeric value, and therefore cannot be a number between 1-12 [month] : it is [" . $this->payload->REPEAT_INTERVAL . "]"));
			
				//pad the dates with a leading 0.
				if(!($chk = $this->padToDate(array("date" => $this->payload->REPEAT_INTERVAL))) instanceOf dmMesg)			return $chk;
				$cleanMonth = $chk->data;
			
				//apply the sql.
				$sql = "UPDATE filtercalendar SET Month_window = 1 WHERE to_char (C_DATE, 'dd')= '" . $cleanMonth . "' AND C_DATE >= SYSDATE-1";
			
				//fire the query and break.
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
			
				break;		
		
			//an annually recuring date - eg. Christmas : 25th of DEC
			case "DATE_YEAR_WINDOW":

				new dmMesg(array("dev" => "doing date_year_window with  :\n" . print_r($this, TRUE)));
				
				//explode the REPEAT_INTERVAL or bail.
				if(!$strExplode = explode('_', $this->payload->REPEAT_INTERVAL))		return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
		
				//ensure its an array
				if(!is_array($strExplode))												return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, result was not an array, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
		
				//ensure we have only 1 or 2 chars per item, or bail
				if( ($strExplode[1] > 12) || ($strExplode[1] < 1) )						return new dmError(array("dev" => "REPEAT INTERVAL received a corrupt month (its less the 1/jan, greater than 12/dec) it is : [" . $strExplode[1] . "]"));
		
				//create a month.
				if(!($chk = $this->dateArgToMonth(array("month" => $strExplode[1]))) instanceOf dmMesg)	return $chk;
				$month = $chk->data->month;				//this is the 3 letter abbr . eg. JAN, FEB.
				
				$month = $strExplode[1];
				
				$dOm = $chk->data->dom;
		
				//overriding this with a padded month
				if(!($chk = $this->padToDate(array("date" => $strExplode[1]))) instanceOf dmMesg)	return $chk;
				$month = $chk->data;
				
				//sanify the date
				if(!($chk = $this->sanifyDate(array("date" => $strExplode[0], "dom" => $dOm))) instanceof dmMesg)		return $chk;
				$date = $chk->data;
		
				//apply the sql.
				$sql = "UPDATE filtercalendar SET DATE_YEAR_WINDOW = 1 WHERE to_char (C_DATE, 'dd_mm')= '" . $date . "_" . $month . "' AND C_DATE >= SYSDATE-1";
				
				//fire the query and break.
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
				break;

			//an annually recurring day - eg. 2nd Friday of April, Good Friday.
			case "YEAR_WINDOW":
				
				new dmMesg(array("dev" => "GOING FOR YEAR WINDOW: with \n" . print_r($this, TRUE) . "\n\n"));
				
				if(!$strExplode = explode('_', $this->payload->REPEAT_INTERVAL))		return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
		
				//ensure its an array
				if(!is_array($strExplode))												return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, result was not an array, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
		
				//ensure we have only 1 or 2 chars per item, or bail
				if( ($strExplode[2] > 12) || ($strExplode[2] < 1) )						return new dmError(array("dev" => "REPEAT INTERVAL received a corrupt month (its less the 1/jan, greater than 12/dec) it is : [" . $strExplode[2] . "]"));

				$dayCount = $strExplode[0]*7;
				$day   	  = $strExplode[1];	
				$month    = $strExplode[2];

		
				//overriding this with a padded month
				if(!($chk = $this->padToDate(array("date" => $month))) instanceOf dmMesg)	return $chk;
				$month = $chk->data;
				
				$sql = "UPDATE FILTERCALENDAR SET YEAR_WINDOW = 1 
				        WHERE c_date = next_day(last_day(add_months (c_date, -1)), '$day') + $dayCount 
				        AND TO_CHAR(c_date, 'mm') = '$month' AND C_DATE >= SYSDATE-1";
			
				//fire the query and break.
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
		
				break;
		
			default:
				return new dmError(array("dev" => "WINDOW TYPE (evaluated as [" . $exceptionType . "]) could not be determined for dmFolioSchedule:\n" . print_r($this, TRUE)));
		
		}
		
		return new dmMesg(array("dev" => "FilterExceptions table updated"));
		
		
	}
	
	/**
	 * 
	 * @param string $params
	 */
	private function removeExceptionFromLiveTable( $params = false ){
		
		if(!isset($this->payload->WINDOW_NAME) || (!$this->payload->WINDOW_NAME))				return new dmError(array("dev" => "Folio Exception is corrupt, no window_name set, unwilling to perform."));
		$exceptionType = $this->payload->WINDOW_NAME;
		
		//ensure we have a repeat interval thats not empty
		if((!isset($this->payload->REPEAT_INTERVAL)) || (!$this->payload->REPEAT_INTERVAL) )	return new dmError(array("dev" => "No REPEAT_INTERVAL set for the live table set to dmFolioSchedule: " . print_r($this, TRUE)));
		
		switch($exceptionType){
		
			//dealing with once off : a single date run once only and not an annually recurring.
			case "ONCE_WINDOW":
					
				//explode the REPEAT_INTERVAL or bail.
				if(!$strExplode = explode('_', $this->payload->REPEAT_INTERVAL))		return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
					
				//ensure its an array
				if(!is_array($strExplode))												return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, result was not an array, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
					
				//ensure we have only 1 or 2 chars per item, or bail
				if( ($strExplode[1] > 12) || ($strExplode[1] < 1) )						return new dmError(array("dev" => "REPEAT INTERVAL received a corrupt month (its less the 1/jan, greater than 12/dec) it is : [" . $strExplode[1] . "]"));
					
				//create a month.
				if(!($chk = $this->dateArgToMonth(array("month" => $strExplode[1]))) instanceOf dmMesg)	return $chk;
				$month = $chk->data->month;
				$dOm = $chk->data->dom;
					
				//sanify the date
				if(!($chk = $this->sanifyDate(array("date" => $strExplode[0], "dom" => $dOm))) instanceof dmMesg)		return $chk;
				$date = $chk->data;
					
					
				$date  = $strExplode[0];
				$month = $strExplode[1];
				$year  = $strExplode[2];
				
				
				//apply the sql.
				$sql = "UPDATE filtercalendar SET ONCE_WINDOW = 0 WHERE c_date = to_DATE('" . $date . "/" . $month ."/" . $year . "','DD/MM/YYYY') AND C_DATE >= SYSDATE-1";
					
				//fire the query and break.
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
				break;
					
					
				//dealing with Day of Week;...
			case "WEEK_WINDOW":
		
				if(is_numeric($this->payload->REPEAT_INTERVAL)){
					if(($this->payload->REPEAT_INTERVAL > 0) && ($this->payload->REPEAT_INTERVAL < 8))	$dayNum = $this->payload->REPEAT_INTERVAL;
				}
				else{
		
					//work out the weekdat number.
					switch(strtoupper($this->payload->REPEAT_INTERVAL)){
		
						case "MONDAY":		case "MON":		$dayNum = 1;	break;
						case "TUESDAY":		case "TUES":	$dayNum = 2;	break;
						case "WEDNESDAY": 	case "WED":		$dayNum = 3;	break;
						case "THURSDAY":	case "THURS":	$dayNum = 4;	break;
						case "FRIDAY":		case "FRI":		$dayNum = 5;	break;
						case "SATDAY":	case "SAT":		$dayNum = 6;	break;
						case "SUNDAY":		case "SUN":		$dayNum = 7;	break;
						default: return new dmError(array("dev" => "A incorrect argument [" . $this->payload->REPEAT_INTERVAL ."] was not accepted for a WEEK_WINDOW Excpetion."));
		
					}
						
				}
		
				//apply the sql.
				//$sql = "UPDATE Filtercalendar SET WEEK_WINDOW = 0 WHERE TO_NUMBER (TO_CHAR (C_DATE, 'D')) IN (" . $dayNum . ")";
				$sql = "UPDATE Filtercalendar SET WEEK_WINDOW = 0 WHERE DAY_OF_WEEK IN (" . $dayNum . ")  AND C_DATE >= SYSDATE-1";
				
				//fire the query and break.
				if(!($chk = $this->ctl->insert(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
				break;
		
		
			case "MONTH_WINDOW":
					
				//error handle
				if(!is_numeric($this->payload->REPEAT_INTERVAL))				return new dmError(array("dev" => "REPEAT_INTERVAL is not a numeric value, and therefore cannot be a number between 1-12 [month] : it is [" . $this->payload->REPEAT_INTERVAL . "]"));
					
				//pad the dates with a leading 0.
				if(!($chk = $this->padToDate(array("date" => $this->payload->REPEAT_INTERVAL))) instanceOf dmMesg)			return $chk;
				$cleanMonth = $chk->data;
					
				//apply the sql.
				$sql = "UPDATE filtercalendar SET Month_window = 0 WHERE to_char (C_DATE, 'dd')= '" . $cleanMonth . "'  AND C_DATE >= SYSDATE-1";
					
				//fire the query and break.
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
					
				break;
		
				//an annually recuring date - eg. Christmas : 25th of DEC
			case "DATE_YEAR_WINDOW":
		
				new dmMesg(array("dev" => "doing date_year_window with  :\n" . print_r($this, TRUE)));
		
				//explode the REPEAT_INTERVAL or bail.
				if(!$strExplode = explode('_', $this->payload->REPEAT_INTERVAL))		return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
		
				//ensure its an array
				if(!is_array($strExplode))												return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, result was not an array, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
		
				//ensure we have only 1 or 2 chars per item, or bail
				if( ($strExplode[1] > 12) || ($strExplode[1] < 1) )						return new dmError(array("dev" => "REPEAT INTERVAL received a corrupt month (its less the 1/jan, greater than 12/dec) it is : [" . $strExplode[1] . "]"));
		
				//create a month.
				if(!($chk = $this->dateArgToMonth(array("month" => $strExplode[1]))) instanceOf dmMesg)	return $chk;
				$month = $chk->data->month;				//this is the 3 letter abbr . eg. JAN, FEB.
				$dOm = $chk->data->dom;
		
				//overriding this with a padded month
				if(!($chk = $this->padToDate(array("date" => $strExplode[1]))) instanceOf dmMesg)	return $chk;
				$month = $chk->data;
		
				//sanify the date
				if(!($chk = $this->sanifyDate(array("date" => $strExplode[0], "dom" => $dOm))) instanceof dmMesg)		return $chk;
				$date = $chk->data;
		
				//apply the sql.
				$sql = "UPDATE filtercalendar SET DATE_YEAR_WINDOW = 0 WHERE to_char (C_DATE, 'dd_mm')= '" . $date . "_" . $month . "' AND C_DATE >= SYSDATE-1";
		
				//fire the query and break.
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
				break;
		
				//an annually recurring day - eg. 2nd Friday of April, Good Friday.
			case "YEAR_WINDOW":
				new dmMesg(array("dev" => "GOING FOR YEAR WINDOW: with \n" . print_r($this, TRUE) . "\n\n"));
				
				if(!$strExplode = explode('_', $this->payload->REPEAT_INTERVAL))		return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
		
				//ensure its an array
				if(!is_array($strExplode))												return new dmError(array("dev" => "REPEAT INTERVAL is corrupt, result was not an array, expecting dd_mm, got [" . $this->payload->REPEAT_INTERVAL ."]"));
		
				//ensure we have only 1 or 2 chars per item, or bail
				if( ($strExplode[2] > 12) || ($strExplode[2] < 1) )						return new dmError(array("dev" => "REPEAT INTERVAL received a corrupt month (its less the 1/jan, greater than 12/dec) it is : [" . $strExplode[2] . "]"));

				$dayCount = $strExplode[0]*7;
				$day   	  = $strExplode[1];	
				$month    = $strExplode[2];

		
				//overriding this with a padded month
				if(!($chk = $this->padToDate(array("date" => $month))) instanceOf dmMesg)	return $chk;
				$month = $chk->data;
				
				$sql = "UPDATE FILTERCALENDAR SET YEAR_WINDOW = 0 
				        WHERE c_date = next_day(last_day(add_months (c_date, -1)), '$day') + $dayCount 
				        AND TO_CHAR(c_date, 'mm') = '$month' AND C_DATE >= SYSDATE-1";
			
				//fire the query and break.
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)				return $chk;
				
		
				break;
		
			default:
				return new dmError(array("dev" => "WINDOW TYPE (evaluated as [" . $exceptionType . "]) could not be determined for dmFolioSchedule:\n" . print_r($this, TRUE)));
		
		}
		
		return new dmMesg(array("dev" => "FilterExceptions table updated"));
		
	}
	
	/**
	 * takes a month argument and returns its 3 digit string value with the days of that month, determining also if it is a leap year for february.
	 * 
	 * [MUST] month : the numeric number of the month
	 * 
	 * @param unknown $dateArg
	 * 
	 * @return dmMesg|dmError on Success, dmMesg with the data attribute an object with parameters dom (days in month), and month - a 3-4 letter representation of the month)
	 */
	private function dateArgToMonth( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		if(!(isset($params->month)))	return new dmError(array("dev" => "no month was argued."));
		
			switch($params->month){
					
				case 1:
				case "01":  		$month = "JAN";	$dOm = 31; 	break;
					
				case 2:
				case "02":
					$month = "FEB";
					if(date('L'))	$dOM = 29;
					else			$dOm = 28;
					break;
			
				case 3:
				case "03":			$month = "MAR"; $dOm = 31;	break;
			
				case 4:
				case "04":			$month = "APR"; $dOm = 30;	break;
					
				case 5:
				case "05":			$month = "MAY"; $dOm = 31;	break;
					
				case 6:
				case "06":			$month = "JUN"; $dOm = 30; 	break;
			
				case 7:
				case "07":			$month = "JUL"; $dOm = 31;	break;
					
				case 8:
				case "08":			$month = "AUG"; $dOm = 31;	break;
					
				case 9:
				case "09":			$month = "SEPT"; $dOm = 30;	break;
					
				case 10: $month = "OCT"; $dOm = 31;	break;
				case 11: $month = "NOV"; $dOm = 31; break;
				case 12: $month = "DEC"; $dOm = 31; break;
					
				default : return dmError(array("dev" => "Month could not be determined"));
			
			}
		
		return new dmMesg(array("data" => (object)array("dom" => $dOm, "month" => $month)));
		
	}
	
	/**
	 * 
	 */
	private function dayToNum( $dayNum ){
		
		if(!$dayNum)					return false;
		if(!is_numeric($dayNum))		return false;
		
		switch($dayNum){
			
		}
		
		
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
	private function sanifyDate( $params = false ){
		
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
			$s = "0" . $date ;
			$date  = $s;
		}
		
		return new dmMesg(array("data" => $date));
		
	}

	
	/**
	 * A method is provided to pad a date/month. This does no validation at all and simply pads the date or month. Arguing date with a number less than 10 will return a single zero lead string. Eg arguing 8 will return 08, 4 return 04, 11 returns 11.
	 * [MUST] date Integer the date
	 * 
	 * @param Array|Object $params key/value paired.
	 * 
	 * @return dmMesg|dmError dmMesg with the data atrribute a string of the date, dmError on failure.
	 */
	private function padToDate( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//ensure we have a date.
		if(!(isset($params->date)))		return new dmError(array("dev" => "no date was argued."));
		$date = $params->date;
		
		//if its less than 10, then ensure we have a leading zero; if we don't add a leading zero.
		if( ($date < 10) && (strlen($date) < 2)){
			$s = "0" . $date ;
			$date  = $s;
		}
		
		return new dmMesg(array("data" => $date));
		
	}

}