<?php
require_once(__DIR__ . "/dmCalendarCollection.php");
require_once(__DIR__ . "/../models/dmJournalEntry.php");
require_once(__DIR__ . "/../models/journalEvent.php");

class dmJournal extends dmCalendarCollection{
	
	/**
	 * Constructor
	 * @param Object|String $params - none.
	 */
	public function __construct( $params = false ){

		$this->timeField = "GEN_DATE";
		$this->SQLTable = "GUI_SITE_JOURNAL";
		$this->model = "dmJournalEntry";
		$this->dmClass = "dmJournal";
		parent::__construct($params);
	
		$this->gather();
	
	}
	
	/**
	 * @param Object|Array $params
	 * MAY startIndex:Integer - the start of (is this the sequence number?)
	 * MAY numItems:Integer - the amount of journal entry records to be retrieved.
	 * MAY filter:
	 * 
	 * @return dmMesg|dmError dmMesg with the data parameter an array of dmJournalEntry Instances, dmError on failure.
	 */
	public function getLatestPagedJournalLines( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		if($params){
			if(isset($params->payload))	$this->payload = $params->payload;
		}
		if(!($chk = $this->gather()) instanceOf dmMesg)			return $chk;
		
		$export = $this->export();
		
		return new dmMesg(array("data" => $this));
		
	}

	/**
	 * Retrieve a window of records from a specific record with a windowsize.
	 * 
	 * 
	 * @param string $params;
	 */
	protected function syncPage( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//validate the focus model.
		if(!isset($params->focus))					return new dmError(array("dev" => "a focus model was not provided"));
		if(!$params->focus instanceOf dmModel)		return new dmError(array("dev" => "focus must be an instance of model"));

		//ensure we have a pageSize
		if(!isset($params->pageSize))				return new dmError(array("dev" => "A pageSize for the window (the number of records in this window) should be provided"));
		if(!is_integer($params->pageSize))			return new dmError(array("dev" => "pageSize should be a number, the number of records in this window"));
		
		//set the sql retrieval time.
		$cTime = $params->focus->GEN_DATE;
		
		//get the pagesize/2 prior to focus model.
		$sql = "SELECT * FROM (SELECT GUI_SITE_JOURNAL.*, ROW_NUMBER() over (order by GEN_DATE DESC) RN from GUI_SITE_JOURNAL WHERE REGION_CODE='ENG'"; // . $this->mylang . "'";
		$sql.= " AND (GEN_DATE > '" . $cTime . "')";
		$sql .= " )";
		$sql .= " ORDER BY SEQ DESC";
		//$sql.= " LIMIT " . ($params->pageSize / 2);
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$preSet = $chk->data;
		foreach($preSet as $item)	$this->collection[] = $item;
		
		$this->collection[] = $params->focus;
		
		//get the pagesize/2 prior to focus model.
		$sql = "SELECT * FROM (SELECT GUI_SITE_JOURNAL.*, ROW_NUMBER() over (order by GEN_DATE DESC) RN from GUI_SITE_JOURNAL WHERE REGION_CODE='ENG'"; // . $this->mylang . "'";
		$sql.= " AND (GEN_DATE < '" . $cTime . "')";
		$sql .= " )";
		$sql .= " ORDER BY SEQ DESC";
		//$sql.= " LIMIT " . ($params->pageSize / 2);

		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$preSet = $chk->data;
		foreach($preSet as $item)	$this->collection[] = $item;
		
		$tmpArray = array();
		foreach($this->collection as $dmJournalEntry){
			$tmpArray[] = new dmJournalEntry((object)array("payload" => $dmJournalEntry));
		}
		$this->collection = $tmpArray;
		
		return new dmMesg(array("data" => $this->collection));
		
	}
	
	/**
	 * Get known journal events.
	 * @param string $params
	 */
	public function getEvents( $params = false ){
		
		$sql="SELECT MSG_LOOKUP.MESSAGE FROM ENUMITEM JOIN MSG_LOOKUP ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID) WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT' AND ENUMITEM.ENUM_NO!=0 AND MSG_LOOKUP.LANG_ID='ENG'";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$events = $chk->data;
		
		return new dmMesg(array("data" => $events));
	
	}
	
	/**
	 * 
	 * 
	 * @return dmError|dmMesg
	 */
	public function getData( $params = false ){
		
		//set the sqlSelector
		$this->sqlSelect = "SELECT * FROM GUI_SITE_JOURNAL WHERE REGION_CODE='ENG'";
		$this->sqlCount = "SELECT COUNT(*) FROM GUI_SITE_JOURNAL WHERE REGION_CODE='ENG'";
		$this->cJoin = "AND";
		
		//invoke dmPagedCollection::getData first
		if(!($chk = parent::getData($params)) instanceOf dmMesg)			return $chk;

		return new dmMesg();
		
	}

}
?>