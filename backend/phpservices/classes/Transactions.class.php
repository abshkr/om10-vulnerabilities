<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/Thunk.class.php');

/* define the module name for calling logMe() to output */
//if(!defined('TRANSACTIONSCLASS')) define('TRANSACTIONSCLASS','Transaction.class');
define('TRANSACTIONSCLASS','Transaction.class');

class TransactionsClass {

	public function TransactionsClass(){
		if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
		
		if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "load_scheds/trans_cur_list.cgi";
		} else {
            $this->cgi ="cgi-bin/en/load_scheds/trans_cur_list.cgi";
		}
	}
	
	// NOT USED?
	public function reverseTransaction($trip_id,$supplier)
	{
        $mydb = DB::getInstance();
		$sql = "SELECT STATS FROM SCHEDULE WHERE SHLS_TRIP_NO = " . $trip_id . " AND SHLS_SUPP = '" . $supplier . "'";
        $result = $mydb->query($sql);
		$response="0:we continued";
		
       if ($result[0]->STATS != "D" && $result[0]->STATS != "E" )
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = "Load not complete, cannot do reverse";
			$response="-1:Load not complete, cannot do reverse";
            //return $result_detail;
        }
		        
        $sql = "SELECT TRSA_ID FROM TRANSACTIONS, LOADS, SCHEDULE WHERE TRSALDID_LOAD_ID = LOAD_ID AND TRSALDID_LD_TRM = LD_TERMINAL AND SHLSLOAD_LOAD_ID = LOAD_ID
            AND SHLSLOAD_LD_TRM = LD_TERMINAL AND SHLS_TRIP_NO = " . $trip_id . " AND SHLS_SUPP = '" . $supplier . "'";
        $result = $mydb->query($sql);
        $count = count($result);
        $trns_ids = array();
        for ($i = 0; $i < $count; ++ $i)
        {
            $trns_ids[$i] = $result[$i]->TRSA_ID;
        }
        return $response;
        $tran_det = $this->populate_reverse_det($count, $trns_ids);
        $client = new socket_client($this->bay_code);
        $client->send($tran_det);
        $response = $client->get_repond();
        
        if (substr_compare($response, "OK", 12, 2) == 0)
        {
            $result_detail->result_code = 0;
        }
        else
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = $response;
        }
        
        return $result_detail;
	}
	
	public function getPaged($offset,$tot,$filter='',$sort='')
	{
        $mydb = DB::getInstance();
        
        if($sort!='')
			$sort="ORDER BY $sort";
		else
			$sort="ORDER BY TRSA_ID";
        
        $sql="SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM gui_transactions $filter) res
             )
             where RN between ".($offset+1)." and ".($offset+$tot);        
        logMe("Query is: " . $sql, TRANSACTIONSCLASS);
		//error_log( "\n".$sql, 3, "temp.log");
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "transactions")));
    }
	
	public function getTransaction($code, $tblname){
		$mydb = DB::getInstance();
		//$sql = "SELECT * from $tblname where trsa_id='$code'";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * from $tblname where trsa_id=:trsa_code";
		$sql['sql_data'] = array( $code );
		
		$rows = $mydb->query($sql);
		//XarrayEncodingConversion($rows);
		return (prepareForAMF($rows, array(0 => "transactions")));
		
	}
	
	public function getTransactions($trip, $supplier)
	{
		$mydb = DB::getInstance();
		//$sql = "SELECT * from gui_transactions where trsa_trip='$trip' and trsa_supplier='$supplier'";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * from gui_transactions where trsa_trip=:trip and trsa_supplier=:supplier";
		$sql['sql_data'] = array( $trip, $supplier );
		
		$rows = $mydb->query($sql);
		//XarrayEncodingConversion($rows);
		return (prepareForAMF($rows, array(0 => "transactions")));
	}
	
	public function getMovementTransactions($move_id, $line_id)
	{
		$mydb = DB::getInstance();
		//$sql = "SELECT * from gui_transactions where (trsa_trip, trsa_supplier) in (select MS_SHLSTRIP, MS_SHLSSUPP from MOV_SCHEDULES where MS_MOVEID='$move_id') ";
		//$sql = "SELECT * from gui_transactions where (trsa_trip, trsa_supplier) in (select ms.MS_SHLSTRIP, ms.MS_SHLSSUPP from MOV_SCHEDULES ms, MOV_SCHD_ITEMS mi where ms.MS_SHLSTRIP=mi.MSITM_SHLSTRIP and ms.MS_SHLSSUPP=mi.MSITM_SHLSSUPP and mi.MSITM_MOVEID='$move_id' and mi.MSITM_MOVITEM='$line_id') ";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * from gui_transactions where (trsa_trip, trsa_supplier) in (select ms.MS_SHLSTRIP, ms.MS_SHLSSUPP from MOV_SCHEDULES ms, MOV_SCHD_ITEMS mi where ms.MS_SHLSTRIP=mi.MSITM_SHLSTRIP and ms.MS_SHLSSUPP=mi.MSITM_SHLSSUPP and mi.MSITM_MOVEID=:move_id and mi.MSITM_MOVITEM=:line_id) ";
		$sql['sql_data'] = array( $move_id, $line_id );
		
		$rows = $mydb->query($sql);
		//XarrayEncodingConversion($rows);
		return (prepareForAMF($rows, array(0 => "transactions")));
	}
	
	public function getAllByCompany($code, $type) {
		$mydb = DB::getInstance();
		//$sql = "SELECT * FROM gui_transactions where ($type=1 and trsa_supplier='$code') or ($type=2 and trsa_carrier='$code') or ($type=4 and trsa_drawer='$code') ";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM gui_transactions where ($type=1 and trsa_supplier=:cmpy_code) or ($type=2 and trsa_carrier=:cmpy_code) or ($type=4 and trsa_drawer=:cmpy_code) ";
		$sql['sql_data'] = array( $code );
		
		$rows = $mydb->query($sql);
		//XarrayEncodingConversion($rows);
		return (prepareForAMF($rows, array(0 => "transactions")));
	}
	
	public function closeTransaction($data){
		$fields = array(
            'sess_id'=>urlencode($data->session_id),
			'cmpy_typ_id'=>urlencode($data->cmpy_typ_id),
			'cmpyCd'=>urlencode($data->cmpy_code),
			'tankTerm'=>urlencode($data->tank_term),
			'bay_code'=>urlencode($data->bay_code),
			'op'=>urlencode("13"),
			'trans_id'=>urlencode($data->trans_id),
			'tk'=>urlencode($data->tk),
			'callerTyp'=>urlencode('flex')
		);
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        logMe($response,TRANSACTIONSCLASS);
		$patternSuccess = "var op=\"23\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
			logMe("Error closing transaction", TRANSACTIONSCLASS);
			return "FAIL";
		} else {
			return "SUCCESS";
		}
		
	}
}