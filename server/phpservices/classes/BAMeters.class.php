<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');


/* define the module name for calling logMe() to output */
if(!defined('BAMETERSCLASS')) define('BAMETERSCLASS','BAMeters.class');

class BAMetersClass {

	public function BAMetersClass(){
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "gantry/edit_batch.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/edit_batch.cgi";
        }
    }
	public function getAll($order, $direction) {
		$mydb = DB::getInstance();
		$sql = "SELECT BAM_CODE, BA_METER_NAME, BAM_USAGE, BAM_NAME, BAM_MIN_FLOW, BAM_MAX_FLOW, BAM_KFA, BAM_KDATE_DMY FROM BA_METERS, BA_METER_TYP WHERE BA_METER_ID = BAM_TYPE" . $order . $direction;
		logMe('SQL Is: ' .$sql, BAMETERSCLASS);
		$rows = $mydb->query($sql);
        return (prepareForAMF($rows, array(0 => 'BA_Meters')));
	}
	
	public function getAllByUsage($usage,$order, $direction) {
		$mydb = DB::getInstance();
		$sql = "SELECT BAM_CODE, BA_METER_NAME, BAM_USAGE, BAM_NAME, BAM_MIN_FLOW, BAM_MAX_FLOW, BAM_KFA, BAM_KDATE_DMY FROM BA_METERS, BA_METER_TYP WHERE BA_METER_ID = BAM_TYPE AND BAM_USAGE=$usage" . $order . $direction;
		$rows = $mydb->query($sql);
        return (prepareForAMF($rows, array(0 => 'BA_Meters')));
	}
	
	public function baUsageLookup() {
		$mydb = DB::getInstance();
		$sql = "SELECT bu.BAM_USAGE_ID, bu.BAM_USAGE_NAME FROM BAM_USAGE_TYP bu WHERE bu.BAM_USAGE_ID IN (1,2,3,7,8) ORDER by 1";
		$rows = $mydb->query($sql);
        return (prepareForAMF($rows, array(0 => 'BA_Usage')));
	}
	
	public function baTypesLookup() {
		$mydb = DB::getInstance();
		$sql = "SELECT BA_METER_ID, BA_METER_NAME FROM BA_METER_TYP WHERE Ba_Meter_Id <> 0";
		$rows = $mydb->query($sql);
        return (prepareForAMF($rows, array(0 => 'BA_Types')));
	}
	
	public function update($data) {
		$keys = array("BAM_CODE"=>urlencode($data->bam_code));
		$excludes = array ("BAM_CODE"=>0);   
		$upd = new UpdateJournalClass("Load Meters", "BA_METERS", $keys, $excludes);
		$upd->setOldValues($upd->getRecordValues());
		$mydb = DB::getInstance();
		logMe("*********************************************Date is****************************************************************",BAMETERSCLASS);
		logMe("Date: " . $phpdate, BAMETERSCLASS);
		$sql = "UPDATE BA_METERS SET BAM_MIN_FLOW='$data->bam_min_flow', BAM_MAX_FLOW='$data->bam_max_flow', BAM_KFA='$data->bam_kfa', BAM_KDATE_DMY=to_char(sysdate,'YYYY-mm-dd hh:mm:ss') WHERE BAM_CODE='$data->bam_code'";
		$res = $mydb->update($sql);
		$upd->setNewValues($upd->getRecordValues());
		$upd->log();
		return $res;
		/* $meterFields = array(
			'sess_id'=>urlencode($data->session_id),
			'bay'=>urlencode(-1),
			'meter'=>urlencode(23),
			'usage'=>urlencode(1),
			'bam_code'=>urlencode($data->bam_code),
			'bam_type'=>urlencode($data->bam_type),
			'bam_name'=>urlencode($data->bam_name),
			'bam_min_flow'=>urlencode($data->bam_min_flow),
			'bam_max_flow'=>urlencode($data->bam_max_flow),
			'bam_kfa'=>urlencode($data->bam_kfa),
			'bam_kdate_dmy'=>urlencode($data->bam_kdate_dmy),
			'callerTyp'=>urlencode('flex'),
			'cmd'=>urlencode('MOD'));
			$thunkObj = new Thunk($this->host, $this->cgi, $meterFields);
			$thunkObj->writeToClient($this->cgi);
			$res = $thunkObj->read();
			logMe("*********************** Reading Response ***********************", BAMETERSCLASS);
			logMe("Response is: " . $res, BAMETERSCLASS);
			return $res; */
		
	}
	
	public function create($data) {
		//$keys = array("BAM_CODE"=>urlencode($data->bam_code));
		//$excludes = array ("BAM_CODE"=>0);   
		//$upd = new UpdateJournalClass("Load Meters", "BA_METERS", $keys, $excludes);
		//$upd->setOldValues($upd->getRecordValues());
		$mydb = DB::getInstance();
		$sql = "INSERT INTO BA_METERS (BAM_CODE, BAM_TYPE, BAM_NAME, BAM_USAGE, BAM_MIN_FLOW, BAM_MAX_FLOW, BAM_KFA, BAM_KDATE_DMY) VALUES ('$data->bam_code','$data->bam_type','$data->bam_name','$data->bam_usage','$data->bam_min_flow','$data->bam_max_flow','$data->bam_kfa',to_char(sysdate,'yyyy-mm-dd hh:mm:ss'))";
		logMe("SQL Is: " . $sql, BAMETERSCLASS);
		$res = $mydb->insert($sql);
		//$upd->setNewValues($upd->getRecordValues());
		//$upd->createLog();
		return $res;
	}
	
	public function delete($code) {
		$mydb = DB::getInstance();
		$sql = "DELETE FROM BA_METERS WHERE BAM_CODE='$code'";
		logMe("SQL Is: " . $sql, BAMETERSCLASS);
		$res = $mydb->delete($sql);
		return $res;
	}

}