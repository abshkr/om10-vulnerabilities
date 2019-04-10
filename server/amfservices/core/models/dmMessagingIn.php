<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
*/
class dmMessagingIn extends dmModel
{
	public function __construct( $params = false )
	{
		$this->dmClass  = "dmMessagingIn";
		$this->SQLTable = "HST_IN_MSGS";
		$this->primaryKey = array('REC_ID', 'HST_MSG_ID2');
		$this->payloadBlackList = array('OM_HST_MSG_FILE', 'HST_FILE_PATH', 'HST_MSG_FILE');
		//$this->payloadBlackList = array('OM_HST_MSG_FILE', 'HST_MSG_FILE');
		parent::__construct($params);
	}

		/**
	 * 
	 * 
	 */
	public function reprocess( $params = false ){

		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		if($params){
			if(isset($params->payload))	$this->payload = $params->payload;
		}
	
		//ensure the object isn't correupt
		if( (!isset($this->payload->IN_DIR_PATH)) || (!$this->payload->IN_DIR_PATH) )		return new dmError(array("dev" => "Corrupt MESSAGE [no inbox directory] : \n" . print_r($this, TRUE)));
		if( (!isset($this->payload->OUT_DIR_PATH)) || (!$this->payload->OUT_DIR_PATH) )		return new dmError(array("dev" => "Corrupt MESSAGE [no outbox directory] : \n" . print_r($this, TRUE)));
		if( (!isset($this->payload->HST_FILE_TYPE)) || (!$this->payload->HST_FILE_TYPE) )	return new dmError(array("dev" => "Corrupt MESSAGE [no file ] : \n" . print_r($this, TRUE)));
	
		//bind the filesystem plugin
		if(!($chk = $this->bind(array("plug" => "dmpFS"))) instanceOf dmMesg)				return $chk;
		$fs = $chk->data;

		//copy the file .
		if(!($chk = $fs->move((object)array(
			"source" => $this->payload->OUT_DIR_PATH,
			"target" => $this->payload->IN_DIR_PATH,
			"file" => $this->payload->HST_FILE_TYPE
		))) instanceOf dmMesg)	return $chk;
		else
			$rec_id = $this->payload->REC_ID;
			$ignore = $this->payload->IGNORE_FLAG;
			$description = $this->payload->DESCRIPTION;
			session_start();
			$modby_id = ($_SESSION["PERCODE"]);
			$sql = "UPDATE HST_IN_MSGS SET OM_RECV_DTIME=(Select OM_RECV_DTIME from HST_IN_MSGS WHERE REC_ID = $rec_id),IGNORE_FLAG = 1, DESCRIPTION = 'Ignore reason: Original Message Resubmitted',LAST_UPD_DTIME = sysdate,LAST_MOD_BYID = $modby_id  WHERE REC_ID = $rec_id";
			
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			return new dmMesg(array("dev" => "GSAP Message [" . $this->payload->REC_ID . "] has been scheduled for Reprocessing."));
		    

	}
	
	public function update($params = false){
		/*
		
		$rec_id = $this->payload->REC_ID;
		$ignore = $this->payload->IGNORE_FLAG;
		$description = $this->payload->DESCRIPTION;
		$user = ($_SESSION["Default"]["PERCODE"]);
		$sql = "UPDATE HST_IN_MSGS SET IGNORE_FLAG = $ignore, DESCRIPTION = '$description', LAST_UPD_DTIME =sysdate, LAST_MOD_BYID = $user  WHERE REC_ID = $rec_id";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		return new dmMesg();
		
		parent::update($params);
		*/


		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//bind the session plug
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		$sess = $this->PLUG->dmpSession;
		$params->payload->LAST_MOD_BYID = $_SESSION['PERCODE'];
		$params->payload->LAST_UPD_DTIME  = date('Y-m-d H:i:s', mktime());


		//fallback to inherited model methods.
		return parent::update($params);


		
	}

	
}
?>