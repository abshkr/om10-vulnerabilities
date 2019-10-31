<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
*/
class dmFolio extends dmModel{

	private $reportArray;

	public function __construct( $params = false ){

		$this->SQLTable = "CLOSEOUTS";
		$this->dmClass = "dmFolio";
		$this->primaryKey = "CLOSEOUT_NR";

		$_SERVER['REPORT_DIR'] = "/var/www/htdocs/folio_rpts";

		parent::__construct($params);



	}

	public function __destruct(){

	}

	/**
	 * Retrieve a dmMeterReadings Collection for this Folio
	 *
	 * @param params
	 */
	public function getMeterReadings( $params = false ){

		require_once(__DIR__ . "/../collections/dmTankMeterReadings.php");

		//instance up -json_encoding.
		$meterColl = new dmTankMeterReadings(json_decode('{

				filter : {

				' . $params->transactionCode . ' : {
				fields : "TRSFTRID_TRSA_ID",
				equality : "exact"
	}

	}

	}'));

		//instance up - literals.
		$meterColl = new dmTankMeterReadings((object)array(
				"filter" => (object)array(
						$params->transactionCode => (object)array(
								"fields" => "TRSFTRID_TRSA_ID",
								"equality" => "exact"
						)
				)
		));


		if($meterColl->sane)								return new dmMesg(array("data" => $meterColl));
		elseif($meterColl->sanityError instanceOf dmError)	return $meterColl->sanityError;
		else
			return new dmError(array("dev" => "Fell to an exception"));

	}

	public function getMeters( $params = false ){


		if($params){
			if(isset($params->payload))	$this->payload = $params->payload;
		}


		require_once(__DIR__ . "/../collections/dmCloseoutMeters.php");

		//return new dmMesg(array("dev" => "Meters retrieved for folio"));
		$ctColl = new dmCloseoutMeters((object)array(
				"filter" => (object)array(
						$this->payload->CLOSEOUT_NR => (object)array(
								"fields" => "CLOSEOUT_NR",
								"equality" => "exact"
						)
				)
		));

		return new dmMesg(array("dev" => "Meters retrieved for folio [" . $this->payload->CLOSEOUT_NR . "]", "data" => $ctColl));


	}

	/**
	 * Get a closeoutTank collection associated to this Folio
	 *
	 * @param string $params
	 *
	 * @return dmMesg
	 */
	public function getTank( $params = false ){

		if($params){
			if(isset($params->payload))	$this->payload = $params->payload;
		}


		require_once(__DIR__ . "/../collections/dmCloseoutTanks.php");

		$ctColl = new dmCloseoutTanks((object)array(
				"filter" => (object)array(
						$this->payload->CLOSEOUT_NR => (object)array(
								"fields" => "CLOSEOUT_NR",
								"equality" => "exact"
						)
				)
		));

		return new dmMesg(array("dev" => "Get Tank retrieved", "data" => $ctColl));

	}

	public function getProductOwners( $params = false ){

		if($params){
			if(isset($params->payload))	$this->payload = $params->payload;
		}


		require_once(__DIR__ . "/../collections/dmCloseoutProductOwners.php");

		$ctColl = new dmCloseoutProductOwners((object)array(
				"filter" => (object)array(
						$this->payload->CLOSEOUT_NR => (object)array(
								"fields" => "CLOSEOUT_NR",
								"equality" => "exact"
						)
				)
		));

		return new dmMesg(array("dev" => "Product Owners retrieved", "data" => $ctColl));

	}

	/**
	 *
	 * 
	 * 
	 * @param string $params
	 */
	public function getFolioReports( $params = false){

		//parse the payload if we have one.
		if($params)
			if(isset($params->payload))	$this->payload = $params->payload;

		//bind the filesystem plug
		if(!($chk = $this->bind(array('plug' => 'dmpFS'))) instanceOf dmMesg)			return $chk;

		//gather reports available to this folio.
		if(!($chk = $this->gatherReportDetail( $params )) instanceOf dmMesg)	return $chk;

		//attaches a file location for each report
		if(!($chk = $this->setTargetLocation()) instanceOf dmMesg)				return $chk;



		$sql = "SELECT SITE_CODE FROM SITE";
		//fire the query, assign it to the reportArray.
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$siteCode = $chk->data[0]["SITE_CODE"]; 


		//retrieve the file list.
		if(!($chk = $this->PLUG->dmpFS->getFiles(array("directory" => $_SERVER['REPORT_DIR'] . "/$siteCode/" . $this->payload->CLOSEOUT_NR))) instanceOf dmMesg)				return $chk;
		//if(!($chk = $this->PLUG->dmpFS->getFiles(array("directory" => '/var/www/htdocs/folio_rpts/' . $this->payload->CLOSEOUT_NR))) instanceOf dmMesg)				return $chk;
		$fileCollection = $chk->data;

		
		return new dmMesg(array("data" => $fileCollection));

	}

	/**
	 * 
	 * 
	 * 
	 */
	public function generateFolioReports( $params = false ){

		//parse the payload if we have one.
		if($params)
			if(isset($params->payload))	$this->payload = $params->payload;

		//gather reports available to this folio.
		//if(!($chk = $this->gatherReportDetail( $params )) instanceOf dmMesg)	return $chk;

		//esnure frequency and report triggering pass, remove them if they dont
//		if(!($chk = $this->removeReportsFT()) instanceOf dmMesg)				return $chk;

		//attaches a file location for each report
//		if(!($chk = $this->setTargetLocation()) instanceOf dmMesg)				return $chk;

		//build the shell execution commands for these reports (attaches them to the array as [shellexec])
//		if(!($chk = $this->buildShellCommands()) instanceOf dmMesg)				return $chk;
		
		//generate the target direcotry locations		

//		if(!($chk = $this->createTargetLocation()) instanceOf dmMesg)			return $chk;

//		new dmMesg(array("dev" => "EXECUTION LIST ->\n" . print_r($this->reportArray, TRUE)));
		
		//plug the shell
		



		$sql = "SELECT SITE_CODE FROM SITE";
		//fire the query, assign it to the reportArray.
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$siteCode = $chk->data[0]["SITE_CODE"]; 


		if(!($chk = $this->bind(array("plug" => "dmpShell"))) instanceOf dmMesg) return $chk;
		$sh = $this->PLUG->dmpShell;

		$mkdir = "mkdir -p ".$_SERVER["REPORT_DIR"]."/$siteCode/".$this->payload->CLOSEOUT_NR;
		if(!($chk = $sh->execute(array("cmd" => $mkdir))) instanceOf dmMesg)return $chk;
		
//		$closeout = $_SERVER["BIN"]."/closeout -r -g ".$_SERVER["REPORT_DIR"]."/$siteCode/".$this->payload->CLOSEOUT_NR." -F ".$this->payload->CLOSEOUT_NR . "  1>/dev/null 2>&1";
        if ($this->payload->STATUS == 0)    //OPEN
            $closeout = $_SERVER["BIN"]."/closeout -c FREEZE -o -D -a -d 32767 -f /tmp/clsout" . "  1>/dev/null 2>&1";
        else 
            $closeout = $_SERVER["BIN"]."/closeout -r -g ".$_SERVER["REPORT_DIR"]."/$siteCode/".$this->payload->CLOSEOUT_NR." -F ".$this->payload->CLOSEOUT_NR . " -d 32767 -f /tmp/clsout" . "  1>/dev/null 2>&1";
		if(!($chk = $sh->execute(array("cmd" => $closeout))) instanceOf dmMesg)	return $chk;

		//iterate over the required reports, execute JASPER
		/*
		foreach($this->reportArray as $report){

			if(!($chk = $sh->execute(array("cmd" => $report['shellexec']))) instanceOf dmMesg)	return $chk;
		
		}
		*/
		return new dmMesg(array("dev" => "LOOK" . print_r($this, TRUE)));
		//return new dmMesg();

	}

	/**
	 * Build the Shell commands for report generation. This infers gatherReport detail has been fired (in order to generate the available 
	 * reports for this folio. I check this by ensureing that there are items in the report array has been instanced.
	 */
	private function buildShellCommands( $params = false ){

		if(!is_array($this->reportArray))	return new dmError(array("dev" => "Please execute gatherReportDetail before invoking this method"));

		for($i = 0; $i < count($this->reportArray); $i++){

			$this->reportArray[$i]['shellexec'] = $_SERVER["BIN"].'/report_gen';
			$this->reportArray[$i]['shellexec'].= ' -g ' . $this->reportArray[$i]['RPT_FILE'];
			$this->reportArray[$i]['shellexec'].= ' -f ' . $this->reportArray[$i]['fileLocation'];
			$this->reportArray[$i]['shellexec'].= ' -o "pdf"';
			
			//this conditional determines if this is for any company or a specific
			//where the company is ANY the a flag of this execution is flagged as a %, otherwise its  flagged with a string of the RPT_CMPY
			if($this->reportArray[$i]['RPT_CMPY'] != "ANY")		$this->reportArray[$i]['shellexec'].= ' -a "' . $this->reportArray[$i]['RPT_CMPY']  . '"';
 			else												$this->reportArray[$i]['shellexec'].= ' -a %';


			//this conditional assumes IS_CLOSTOUT_REPORT is a boolean where 
			//1 - execute jasper's report generation with start and end data calculated 
			//0 - execute jasper's report generation with the CLOSEOUT_NR
			if(!$this->reportArray[$i]['IS_CLOSEOUT_REPORT']){
				
				//get the end date
				if(!($chk = $this->getEndDate((object)array("frequency" => $this->reportArray[$i]['FREQUENCY']))) instanceOf dmMesg)	return $chk;
				if(count($chk->data) > 1)	return new dmError(array("dev" => "Data is possibly corrupt, got more than 1 start and end date for this folio report....."));

				$endDate = '"' . $chk->data[0]['ENDDATE'] . '"';
				$startDate = '"' . $chk->data[0]['STARTDATE'] . '"';
			
			}
			else
				$startDate = $endDate = $this->payload->CLOSEOUT_NR;

			$this->reportArray[$i]['shellexec'].= ' -b ' . $startDate . ' -e ' . $endDate; 

		}

		return new dmMesg();

	}

	/**
	 * Gathers and sets the reportArray of this class. IMPORTANT! This also sets the reportArray as an instanced array for other methods to determine
	 * if this has been fired as a dependency of their execution (eg. buildShellCommands requires this.)
	 * 
	 * 
	 * @return Object
	 * 
	 */
	private function gatherReportDetail( $params = false ){

		//create the sql
		$sql = "SELECT * FROM REPORT_CMPY, REPORT_FOLIOS ";
		$sql.= "WHERE REPORT_CMPY.RPT_FILE = REPORT_FOLIOS.RPT_FILE";

		//set this reportArray as an empty array.
		$this->reportArray = array();

		//fire the query, assign it to the reportArray.
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$this->reportArray = $chk->data;


		return new dmMesg();

	}

	/**
	 * Sets the output file location for each report in the report Array. 
	 * This infers gatherReport detail has been fired (in order to generate the available reports for this folio. I check this by ensureing that there are items in the report array has been instanced.
	 */
	private function setTargetLocation( $params = false ){

		if(!is_array($this->reportArray))	return new dmError(array("dev" => "Please invoke gatherReportDetail before invocation of the method, no report list available (this::reportArray)"));
		
		for($i = 0; $i < count($this->reportArray); $i++){
		
			//$this->reportArray[$i]['fileLocation'] = $_SERVER['REPORT_DIR'] . '/folio_rpt/' . $this->payload->CLOSEOUT_NR . '/' . $this->reportArray[$i]['RPT_CMPY'] . '_' . str_replace('.sql', '.pdf', $this->reportArray[$i]['RPT_FILE']); 
		   $this->reportArray[$i]['fileLocation'] = $_SERVER['REPORT_DIR'] . '/' . $this->payload->CLOSEOUT_NR . '/' . $this->reportArray[$i]['RPT_CMPY'] . '_' . str_replace('.sql', '.pdf', $this->reportArray[$i]['RPT_FILE']); 
		
		}

		return new dmMesg();
	
	}

	/**
	 * 
	 */
	private function createTargetLocation( $params = false ){

		if(!file_exists($_SERVER['REPORT_DIR']  . '/' . $this->payload->CLOSEOUT_NR)){

			if(!file_exists($_SERVER['REPORT_DIR'] )){

				if(!mkdir($_SERVER['REPORT_DIR'] ))	return new dmError(array("dev" => "Could not create directory [ " .$_SERVER['REPORT_DIR'] . "] - file permissions?"));
			
			}

			if(!mkdir($_SERVER['REPORT_DIR'] . '/' . $this->payload->CLOSEOUT_NR ))	return new dmError(array("dev" => "Could not create directory [ " . $_SERVER['REPORT_DIR'] . '/' . $this->payload->CLOSEOUT_NR . "] - file permissions?"));


		}

		return new dmMesg();

	}

	/**
		 * To Fetch Closeout Folio Number
		 * @param string $params
		 * @return dmMesg
		 * @Author Hamid
		 */
	private function getStartDate( $params = false ){

		$sql  = "SELECT CLOSEOUT_DATE FROM closouts where CLOSEOUT_NR = " . $this->payload->CLOSEOUT_NR;

		if(!($chk = $this->ctl->query(array("sql"=>$sql))) instanceOf dmMesg)				return $chk;
		$results = $chk->data;

		return new dmMesg();

	}

	/**
	 * TO FETCH REPORT_FREQUENCY FOR REPORT RUNNING
	 * @param string $params
	 * @return dmMesg
	 */
	private function getFrequency( $params = false){
		
		$sql  = "SELECT REPORT_FILES.FREQUENCY ";
		$sql .=	"FROM REPORT_CMPY, REPORT_FILES ";
		$sql .= "WHERE REPORT_CMPY.RPT_FILE = REPORT_FILES.RPT_FILE AND RPT_ENABLED = 'Y' AND RPT_ACTIVE = 'Y' ";
		$sql .= "AND (ONDEMAND_FLAG = 2 OR ONDEMAND_FLAG = 3)";

		if(!($chk = $this->ctl->query(array("sql"=>$sql))) instanceOf dmMesg)				return $chk;
		$results = $chk->data;

		return new dmMesg(array("data" => $results));
	}

	/**
	 * Provides a method to ensure the report frequencies pass the folio triggers and removes them from the reportarray.
	 * 
	 * 
	 */
	private function removeReportsFT( $params = false ){

		if(!is_array($this->reportArray))		return new dmError(array("dev" => "Please execute gatherReportDetail before invoking this method"));

		//this should only oic
		if(!($this->payload->REPORT_TRIGGER)){

			$this->reportArray = array();
			new dmError(array("dev" => "REPORT TRIGGERING IS FOUND TO BE NULL, ignore for testing; no reports will be generated for FOLIO " . $this->payload->CLOSEOUT_NR));
			return new dmMesg(array("dev" => "Removed all reports, nothing should be processed forward."));

		}


		new dmMesg(array("dev" => "THIS:\n" . print_r($this, TRUE)));

		//iterate the reports.
		foreach($this->reportArray as $report){

			//if we've got a frequency of N, this means "Not Never"
			if($report->FREQUENCY == 'N')	continue;

			switch($this->payload->REPORT_TRIGGER){

				case "1":			//DAILY ONLY
					//if the report frequency is not daily, tag this item for removal inside the reportArray
					if($report->payload->FREQUENCY != 'D')	$report->rem = true;
					break;
				
				case "2":			//WEEKLY ONLY
					//if the report frequency is not weekly, tag this item for removal inside the reportArray
					if($report->payload->FREQUENCY != 'W')	$report->rem = true;
					break;
				
				case "4":			//MONTH ONLY
					//if the report frequency is not monthly, tag this item for removal inside the reportArray
					if($report->payload->FREQUENCY != 'M')	$report->rem = true;
					break;

				case "3":			//DAILY AND WEEKLY
					//if the report frequency is not daily or weekly, tag this item for removal inside the reportArray
					if(($report->payload->FREQUENCY != 'D') && ($report->payload->FREQUENCY != 'W'))	$report->rem = true;
					break;

				case "5":			//DAILY AND MONTHLY
					//if the report frequency is not daily or monthly tag this item for removal inside the reportArray
					if(($report->payload->FREQUENCY != 'D') && ($report->payload->FREQUENCY != 'M'))	$report->rem = true;
					break;

				case "7":			//DAILY AND WEEKLY AND MONTHLY
					//if the report frequency is not daily or monthly or weekly tag this item for removal inside the reportArray
					if(($report->payload->FREQUENCY != 'D') && ($report->payload->FREQUENCY != 'W') && ($report->payload->FREQUENCY != 'M'))	$report->rem = true;
					break;
				
				default:
					return new dmError(array("dev" => "an unknown or empty report trigger was found on this folio..."));

			}

			//unset all the tagged reports.
			foreach($this->reportArray as $k => $report){
			
				if(isset($report->rem) && ($report->rem))			unset($this->reportArray[$k]);
			
			}

			return new dmMesg(array("dev" => "Removed unrequired reports for generation inside of folio " . $this->payload->CLOSEOUT_NR));

		}

	}


	/**
	 * FUNCTION TO FETCH THE END_DATE OF THE FOLIO FOR REPORT RUNNING
	 * @param string $params
	 * @return dmMesg
	 */
	private function getEndDate( $params = false ){

	
		if(!isset($params->frequency))	return new dmError(array("dev" => "Please Invoke this with a frequency set"));
				
			switch(strtolower($params->frequency)){
						
					case 'd':
						$sql  = "SELECT TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH:MM:SS') AS STARTDATE, TO_CHAR(CLOSEOUT_DATE-1,'YYYY-MM-DD HH:MM:SS')  AS ENDDATE FROM closeouts where CLOSEOUT_NR = " . $this->payload->CLOSEOUT_NR;
						break;

					case 'm':
						$sql  = "SELECT TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH:MM:SS') AS STARTDATE, TO_CHAR(ADD_MONTHS(CLOSEOUT_DATE, -1),'YYYY-MM-DD HH:MM:SS')  AS ENDDATE FROM closeouts where CLOSEOUT_NR = " . $this->payload->CLOSEOUT_NR;				
						break;

					case 'w':
						$sql  = "SELECT TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH:MM:SS') AS STARTDATE, TO_CHAR(CLOSEOUT_DATE-7,'YYYY-MM-DD HH:MM:SS')  AS ENDDATE FROM closeouts where CLOSEOUT_NR = " . $this->payload->CLOSEOUT_NR;				
						break;

					case 'y':
						$sql  = "SELECT TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH:MM:SS') AS STARTDATE, TO_CHAR(ADD_MONTHS(CLOSEOUT_DATE, -12),'YYYY-MM-DD HH:MM:SS')  AS ENDDATE FROM closeouts where CLOSEOUT_NR = " . $this->payload->CLOSEOUT_NR;
						break;

					case 'm':
						$sql  = "SELECT TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH:MM:SS') AS STARTDATE, TO_CHAR(ADD_MONTHS(CLOSEOUT_DATE, -1),'YYYY-MM-DD HH:MM:SS')  AS ENDDATE FROM closeouts where CLOSEOUT_NR = " . $this->payload->CLOSEOUT_NR;
						break;
					
					case 'n':
						$sql = "SELECT TO_CHAR(CLOSEOUT_DATE, 'YYYY-MM-DD HH:MM:SS') AS STARTDATE, TO_CHAR(PREV_CLOSEOUT_DATE, 'YYYY-MM-DD HH:MM:SS') AS ENDDATE FROM CLOSEOUTS WHERE CLOSEOUT_NR = " . $this->payload->CLOSEOUT_NR;
						break;

					default : 
						return new dmError(array("dev" => "Fell to an exception frequency type unknown [" . print_r($params->frequency, TRUE) . "]"));		
					
			}

			if(!($chk = $this->ctl->query(array("sql"=>$sql))) instanceOf dmMesg)				return $chk;
			$results = $chk->data;

			return new dmMesg(array("dev" => "END DATE RETURNING AS " . print_r($results, TRUE), "data" => $results));
	}		
	
	
	public function update( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		return parent::update($params);
	}
	
	

	/**
	 * PRIVATE FUNCTION TO GET_COMPANY FROM CURRENT SESSION
	 * @param string $params
	 * @return dmMesg
	 */
	private function getCompany( $params = false ){

		//setting to a blank array until we know wtf 2 do.
		$results = array();

		return new dmMesg(array("data" => $results));
				
	}

}
?>