<?php
require_once(dirname(__FILE__) . '/../classes/BAMeters.class.php');
require_once(dirname(__FILE__) . '/../bootstrap.php');


class BAMetersService {
	var $tbl_name = "BA_METERS";

	public function getAll($order, $direction){
		$bam = new BAMetersClass();
		return $bam->getAll($order, $direction);
	}
	
	public function getAllByUsage($usage, $order, $direction){
		$bam = new BAMetersClass();
		return $bam->getAllByUsage($usage, $order, $direction);
	}
	
	public function update($code,$data){
        $data->session_id = $_SESSION['SESSION'];
		$bam = new BAMetersClass();
		return $bam->update($data);

	}
	
	
	public function create($data){
        $data->session_id = $_SESSION['SESSION'];
		$bam = new BAMetersClass();
		$res = $bam->create($data);

		return $res;
    }
	
	public function deleteMeter($code){
        $g = new GlobalClass();
        $ret = $g->delete($this->tbl_name,$code);
        return $ret;
		//$bam = new BAMetersClass();
    }   //return $bam->delete($code);
	
	public function baUsageLookup(){
		$bam = new BAMetersClass();
		return $bam->baUsageLookup();
	}
	
	public function baTypesLookup() {
		$bam = new BAMetersClass();
		return $bam->baTypesLookup();
	}
}