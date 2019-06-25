<?php
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');
require_once(dirname(__FILE__) . '/../classes/Validator.class.php');

class JournalService {
	var $tbl_name = "SITE_JOURNAL";
	
    public function count($filter, $start_date, $end_date){
        $myjournal = new JournalClass($start_date, $end_date);
        return $myjournal->getRecordCount($filter); 
    }
    
    public function getLastSequenceNumber(){
        $myjournal = new JournalClass(null,null);
        return $myjournal->getLastSequenceNumber();
    }

    public function getLatestAlarms($seq){
        $myjournal = new JournalClass(null,null);
        $rows = $myjournal->getLatestAlarms($seq);
        if(sizeof($rows)==0){
            return null;
        }else{
            //XarrayEncodingConversion($rows);
            return (prepareForAMF($rows, array(0 => 'Journal')));
        }
    }
	
	public function create($data){
        if(Validator::validateStringLength(1, 7, $data->company_code) && Validator::validateStringLength(1, 6, $data->msg_event)
			&& Validator::validateStringLength(1, 5, $data->msg_class) && Validator::validateStringLength(1, 127, $data->message)
			&& Validator::validateStringLength(1, 3, $data->region_code)){
				$myjournal = new JournalClass(null,null);
				$res = $myjournal->create($data);
				return $res;
		}
		return "FAIL";
    }

    public function getPagedJournalEntries($filter, $start_date, $end_date, $startIndex, $numItems){
        $myjournal = new JournalClass($start_date, $end_date);
		$rows = $myjournal->getLatestPagedJournalLines($startIndex, $numItems, $filter);
        if(sizeof($rows)==0){
            return null;
        }else{
            //XarrayEncodingConversion($rows);
            return (prepareForAMF($rows, array(0 => 'Journal')));
        }
    }
    
    public function getCSVJournalEntries($filter, $start_date, $end_date){
        $myjournal = new JournalClass($start_date, $end_date);
	$rows = $myjournal->getCSVJournalLines($filter);
        if(sizeof($rows)==0){
            return null;
        }else{
            //XarrayEncodingConversion($rows);
            return (prepareForAMF($rows, array(0 => 'Journal')));
        }
    }    

    public function siteJournalTypesLookUp(){
        $myjournal = new JournalClass(null, null);
        $rows = $myjournal->getJournalEventClassList();
        if(sizeof($rows)==0){
            return null;
        }else{
            $rowsArray = objectToArray($rows);
            //XarrayEncodingConversion($rowsArray);
            return (prepareForAMF($rowsArray, array(0 => 'JournalTypes')));
        }        
    }
    
    public function getRecord($code){
        $myjournal = new JournalClass(null, null);
        $rows = $myjournal->getJournalEventClassList();
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "Journal")));
    }
	
	public function getServerTime()
	{
		return (date('Y-m-d H:i'));
	}
	
}
?>