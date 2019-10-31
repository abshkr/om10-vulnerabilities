<?php
require_once('dmsService.php');
require_once(__DIR__ . '/../dmController.php');

class dmsMessagingService extends dmsService{

	public function __construct( $params = false )
	{
		parent::__construct();
		$this->ctl = dmController::getController();
	}

	
	public function getHostMessages( $params = false ){

		
		
		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)					return $chk;
		$params = $chk->data;

		if(!file_exists(__DIR__ . "/../collections/dmMessagingHost.php")){
			return new dmError(array("dev" => "Could not find file [" .  __DIR__ . "/../collections/dmMessagingHost.php" . "]"));
		}
		require_once(__DIR__ . "/../collections/dmMessagingHost.php");

		$rCollection = new dmMessagingHost($params);

		//return the collection
		
		return new dmMesg(array("data" => $rCollection));

	}

	public function getOmegaMessages( $params = false ){

		//pass params
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg) return $chk;
		$params = $chk->data;

		if(!file_exists(__DIR__ . "/../collections/dmMessagingOmega.php")){
			return new dmError(array("dev" => "Could not find file [" .  __DIR__ . "/../collections/dmMessagingOmega.php" . "]"));
		}

		require_once(__DIR__ . "/../collections/dmMessagingOmega.php");

		$rCollection = new dmMessagingOmega($params);

		//return the collection
		return new dmMesg(array("data" => $rCollection));
	}

	public function getHostMsgTypes($params)
	{
		$sql = "select distinct HST_MSG_TYPE from HST_IN_MSGS";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		return new dmMesg(array("data" => $chk->data));
	}

	public function getOmegaMsgTypes($params)
	{
		$sql = "select distinct OM_MSG_TYPE from HST_OUT_MSGS";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		return new dmMesg(array("data" => $chk->data));
	}


	public function getPlantCodeTypes($params)
	{
		$sql = "select distinct HST_PLANT_CODE from HST_IN_MSGS where HST_PLANT_CODE is not NULL";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		return new dmMesg(array("data" => $chk->data));
	}

	public function getOmegaStatusTypes($params)
	{
		$sql = "select distinct OM_STATUS from HST_IN_MSGS";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		return new dmMesg(array("data" => $chk->data));
	}
	
	
 	public function gettotalInrecords($params)
 	{
 		$sql = "select count(REC_ID) from HST_IN_MSGS";
 		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
 		return new dmMesg(array("data" => $chk->data));
 	}
	
	
 	public function gettotalOutrecords($params)
 	{
 		$sql = "select count(REC_ID) from HST_OUT_MSGS";
 		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
 		return new dmMesg(array("data" => $chk->data));
 	}
	
	public function updatedescription($params)
	{
		$sql ="update hst_in_msgs set description ='Message Ignored' ";
	}

	public function getHostMessage($params)
	{

		$info = "File Backup Missing from Archive";
		if(file_exists('/usr/omega/data/gsap/archive/' . $params)){
			$file = fopen('/usr/omega/data/gsap/archive/' . $params, "r");
			$info = "";
			//!feof($file)
			while (true)
			{
				if($line = fgets($file))
					$info .= $line;
				else break;
			}
			fclose($file);
		}
		
		return new dmMesg(array("data" => $info));
	}
	
	
	
	public function getMessageFile($params)
	{
	
		$info = "File Backup Missing from Archive/out Folder";
		if(file_exists('/usr/omega/data/gsap/archive/out/' . $params)){
			$file = fopen('/usr/omega/data/gsap/archive/out/' . $params, "r");
			$info = "";
			//!feof($file)
			while (true)
			{
				if($line = fgets($file))
					$info .= $line;
				else break;
			}
			fclose($file);
		}
		//$info = "/usr/omega/data/gsap/archive/out/$params";
	
		return new dmMesg(array("data" => $info));
	}

// 	public function copyOutMessage($params)
// 	{
// 		$defaultdate = date('Ymdhms');
// 		$random = rand(111, 999);
// 		$random1 = rand(44444, 99999);
		
// 		switch($params->whichFile){
// 			case "Ticket":
// 				$file = '/usr/omega/data/gsap/temparchive/ticket.xml';
// 				$newfile = '/usr/omega/data/gsap/hstcom_out/'.'A'.$random . '_TKT_' .$random1.'_'. $defaultdate. '.xml';
// 				break;
// 			case "Movement":
// 				$file = '/usr/omega/data/gsap/temparchive/movements.xml';
// 				$newfile = '/usr/omega/data/gsap/hstcom_out/'.'A'.$random . '_SPM_' . $random1.'_'. $defaultdate . '.xml';
// 				break;
// 			case "Inventory":
// 				$file = '/usr/omega/data/gsap/temparchive/inventory.xml';
// 				$newfile = '/usr/omega/data/gsap/hstcom_out/'.'A'.$random . '_EOD_' .$random1.'_'. $defaultdate. '.xml';
// 				break;
// 			case "PDS":
// 				$file = '/usr/omega/data/gsap/temparchive/pds.dat';
// 				$newfile = '/usr/omega/data/gsap/hstcom_out/'.'A'. $random . '_PDS_' .$random1.'_'. $defaultdate . '.dat';
// 				break;
// 			case "Load details":
// 				$file = '/usr/omega/data/gsap/temparchive/loaddetail.dat';
// 				$newfile = '/usr/omega/data/gsap/hstcom_out/'.'A'. $random .'_LDD_ORD_'. $random1.'_'. $defaultdate .'.dat' ;
// 				break;
// 		}
		
// 		if (!copy($file, $newfile)) {
// 			return new dmMesg(array("data"=>"FAILED TO GENERATE FILE."));
// 			//echo "failed to copy $file...\n";
// 		}
// 		return new dmMesg(array("data"=>  $params->whichFile . " file Generated"));
// 	}
}