<?php
require_once(__DIR__ . "/../dmModel.php");
require_once(__DIR__ . "/../models/dmFolioExceptionDate.php");

class dmFolioMeters extends dmModel
{
	public function __construct( $params = false )
	{
		
		$this->SQLTable = "FOLIOCALENDAR";
		$this->dmClass = "dmFolioSchedule";

		$this->primaryKey = "SEQ";
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		parent::__construct($params);
	}
	
	public function update( $params = false )
	{
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		$sess = $this->PLUG->dmpSession;

		return parent::update($params);
		
	}
}