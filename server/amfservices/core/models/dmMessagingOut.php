<?php
require_once (__DIR__ . '/../dmModel.php');

class dmMessagingOut extends dmModel
{
	public function __construct( $params = false )
	{
		$this->dmClass = "dmMessagingOut";
		$this->payloadBlackList = array('OM_FILE_TXT', 'OM_CONV_FILE');
		parent::__construct($params);
	}
	 
	
	/*public function reprocess( $params = false ){
	
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
	
		//copy the file.
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
		$modby_id = ($_SESSION["Default"]["PERCODE"]);
		$sql = "UPDATE HST_IN_MSGS SET OM_RECV_DTIME=(Select OM_RECV_DTIME from HST_IN_MSGS WHERE REC_ID = $rec_id),IGNORE_FLAG = 1, DESCRIPTION = 'Resubmitted',LAST_UPD_DTIME = sysdate,LAST_MOD_BYID = $modby_id  WHERE REC_ID = $rec_id";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		return new dmMesg(array("dev" => "GSAP Message [" . $this->payload->REC_ID . "] has been scheduled for Reprocessing."));
	
	
	}*/
	
	
}
?>