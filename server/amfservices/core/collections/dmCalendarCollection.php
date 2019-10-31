<?php

require_once("dmPagedCollection.php");

/**
 * 
 * A Calandar/Time based Collection
 * @author bn
 *
 */
class dmCalendarCollection extends dmPagedCollection{
	
	//this is almost like a filter... this should be changed.
	public $timeField;
	public $startTime;
	public $endTime;
	
	//filter
	protected $timePreResult;
	protected $timePostResult;	
	
	
	/**
	 * Constructor
	 * 
	 * @param Array|Object $params
	 * 
	 */
	public function __construct( $params = false ){

		if( ($params) && (is_object($params)) ){
		
			if(isset($params->startTime))		$this->startTime	= $params->startTime;
			if(isset($params->endTime))			$this->endTime		= $params->endTime;
			if(isset($params->timeField))		$this->timeField 	= $params->timeField;
			
		}
		
		parent::__construct($params);
	
	}
	
	/**
	 * 
	 * Set the start time of this calendar collection.
	 * 
	 * @param object|array $params
	 * 
	 * @return dmError|dmMesg
	 * 
	 */
	public function setStartTime( $params = false ){
	
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
	
		
		//ensure we have a startime
		if(isset($params->start)){
				
			//ensure they're useful.
			if(strlen($params->start) > 19)	$chkStartTime = substr($params->start,0, 19);
			else	$chkStartTime = $params->start;

			if(!strtotime($chkStartTime))	return new dmError(array("dev" => "Start Date format not accepted [" . $params->start . "]"));

			//set it
			$this->startTime = $params->start;
	
		}else
			return new dmError(array("dev" => "argue start time please."));
	
		//if it set
		if($this->startTime)		return new dmMesg();
	
		//excpetions.
		return new dmError(array("dev" => "Fell to an exception"));
	
	
	}
	
	/**
	 * Set the end time of this calendar collection.
	 * 
	 * @param array|object $params
	 * 
	 * @return dmError|dmMesg
	 */
	public function setEndTime( $params = false ){
	
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
	
		//ensure we have a startime
		if(isset($params->end)){
				
			//ensure they're useful.
			if(strlen($params->end) > 19)	$chkEndTime = substr($params->start,0, 19);
			else	$chkEndTime = $params->end;
			
			if(!strtotime($chkEndTime))		return new dmError(array("dev" => "End Date format not accepted [" . $params->end . "]"));

			//set it
			$this->endTime = $params->end;
	
		}else
			return new dmError(array("dev" => "argue end time please."));
	
		//if it set
		if($this->endTime)		return new dmMesg();
	
		//excepetions.
		return new dmError(array("dev" => "Fell to an exception"));
	
	}

	/**
	 * 
	 * set the time range for this calendar collection.
	 * 
	 * @param Array|Object $params
	 * 
	 * @return dmError|dmMesg
	 */
	public function setTimeRange( $params = false ){
	
		//pass initial param check
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
	
		//strip the milliseconds off, php won't deal with is.
		
		//ensure we have both.
		if(isset($params->start) && isset($params->end)){
				
			//ensure they're useful.
			if(strlen($params->start) > 19)	$chkStartTime = substr($params->start,0, 19);
			else	$chkStartTime = $params->start;
				
			if(strlen($params->end) > 19)	$chkEndTime = substr($params->start,0, 19);
			else	$chkEndTime = $params->end;
			
			//we could pattern match this... bit I'm also considering fixing up entries which aren't exactly what oracle expects, such as YYYY-MM-DD, without hours/seconds etc.
			
			if(!strtotime($chkStartTime))	return new dmError(array("dev" => "Start Date format not accepted [" . $params->start . "]"));
			if(!strtotime($chkEndTime))		return new dmError(array("dev" => "End Date format not accepted [" . $params->end . "]"));
				
			//set the values of the journal.
			$this->startTime = $params->start;
			$this->endTime = $params->end;
				
		}
		else
			return new dmError(array("dev" => "argue start and end times please."));
	
		//if both are set, return
		if($this->startTime && $this->endTime)		return new dmMesg();
	
		//excpetions.
		return new dmError(array("dev" => "Fell to an exception"));
	
	
	}
	
	/**
	 * (non-PHPdoc)
	 * @see dmPagedCollection::getData()
	 */
	public function getData( $params = false ){
		
		//invoke dmPagedCollection::getData first
		if(!($chk = parent::getData($params)) instanceOf dmMesg)			return $chk;
		
		//process time as range
		if($this->startTime)	$this->timePostResult = " (" . $this->timeField . " > '" . $this->startTime . "') ";
		if($this->endTime)		$this->timePostResult.= "AND (" . $this->timeField . " < '" . $this->endTime . "') ";
		
		return new dmMesg(array("dev" => "Query compilation for Calandered collection complete."));
		
	}
	
}
?>