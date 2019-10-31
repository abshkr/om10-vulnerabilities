<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('ALLOCATIONPERIOD')) define('ALLOCATIONPERIOD','AllocationPeriodService.class');

class AllocationPeriodService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="select * from GUI_ALLOCATION_PERIODS";
	
	public function __construct()
	{
 		session_start();
		
       if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
			if( isset($_SERVER['HTTP_HOST']) )
			{
				$this->host = $_SERVER['HTTP_HOST'];
			}
			else
			{
				$this->host = "localhost";
			}
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "gantry/allocations.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/allocations.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) AIPERIODS ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function getPaged($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 50)
	{
        $g = new GlobalClass();
	
		if ($values == "" || is_string($values) )
		{
			//$filter = $values;
			$filterObj = array();
			$filterObj['sql_text'] = $values;
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		} 
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY AIPRD_TYPE, AIPRD_CMPYCODE, AIPRD_SUPPCODE, AIPRD_PRODCODE, AIPRD_INDEX";

		$query = "SELECT * FROM ( " . $this->myview . " ) AIPERIODS ";
		//$query = $query . " $filter $sort ";
		$query = $query . " " . $filter['sql_text'] . " $sort ";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter['sql_data'];
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($queryPaged);
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 

    public function getNextAllocationPeriodNumber( $type, $cmpy, $supp, $prod )
	{
        $mydb = DB::getInstance();
		/*
        $sql="
				select MAX(ALL_CHILD_P_NO)+1 AS NEXT_ID 
				from ALL_CHILD
				where 
					ALCH_ALP_ALL_ATKY_AT_TYPE=$type 
					and ALCH_ALP_ALL_ATKY_AT_CMPY='$cmpy' 
					and ALCH_ALP_ALL_PROD_PRODCMPY='$supp' 
					and ALCH_ALP_ALL_PROD_PRODCODE='$prod'
			";
		*/
		$sql = array();
        $sql['sql_text'] = "
				select MAX(ALL_CHILD_P_NO)+1 AS NEXT_ID 
				from ALL_CHILD
				where 
					ALCH_ALP_ALL_ATKY_AT_TYPE=:alloc_type 
					and ALCH_ALP_ALL_ATKY_AT_CMPY=:alloc_cmpy 
					and ALCH_ALP_ALL_PROD_PRODCMPY=:alloc_supp 
					and ALCH_ALP_ALL_PROD_PRODCODE=:alloc_prod
			";
		$sql['sql_data'] = array( $type, $cmpy, $supp, $prod );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->NEXT_ID) == TRUE || $rows[0]->NEXT_ID=="" )
		{
			$next_id = 1;
		}
		else
		{
			$next_id = (integer)$rows[0]->NEXT_ID;
		}
		
		return($next_id);
    }


/*    

CGIs for Allocation Item Periods
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?lock=4&op=17&cmd=MOD&typeId=3&cmpy=0022&supp=0002
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?item=1&start=2015-05-29&end=2015-06-06&limit=123456&unit=5&typeId=3&op=58&cmd=ADD&cmpy=0022&supp=0002&lock=4&prod=000152
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?item=1&start=2015-05-29&end=2015-06-05&limit=123499&unit=5&typeId=3&op=57&cmd=MOD&cmpy=0022&supp=0002&lock=4&prod=000152
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?op=59&typeId=3&cmpy=0022&supp=0002&lock=4&prod=000152&item=1&start=2015-05-29&end=2015-06-05&limit=123499&unit=l+%28amb%29&cmd=DEL

http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?vol=2345678&typeId=3&op=37&cmd=MOD&cmpy=0022&lock=4&supp=0002&prod=000152
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?item=1&start=2015-05-29&end=2015-06-06&limit=123456&unit=17&typeId=3&op=58&cmd=ADD&cmpy=0022&supp=0002&lock=4&prod=000152

*/	
    public function create($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to CREATE Allocation Product Period
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Allocation Product Period++++++",ALLOCATIONPERIOD);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'item'=>urlencode($data->aiprd_index),
            'start'=>urlencode($data->aiprd_daystart),
            'end'=>urlencode($data->aiprd_dayend),
            'limit'=>urlencode($data->aiprd_qtylimit),
            'unit'=>urlencode($data->aiprd_produnit),
            'typeId'=>urlencode($data->aiprd_type),
            'cmpy'=>urlencode($data->aiprd_cmpycode),
            'supp'=>urlencode($data->aiprd_suppcode),
            'lock'=>urlencode("4"),
            'prod'=>urlencode($data->aiprd_prodcode),
            'cmd'=>urlencode("ADD"),   	
			'op'=>urlencode("58")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        //$patternSuccessEng = "stBar=Success";
        //$patternSuccessChn = "stBar=成功";
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Success</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">成功</span>";
        $isFoundEng = strstr($response, $patternSuccessEng);
        $isFoundChn = strstr($response, $patternSuccessChn);
        if ($isFoundEng == false && $isFoundChn == false) {
                logMe("Add Allocation Product Period failed!!!",ALLOCATIONPERIOD);
                return "ERROR";
        }
        logMe("CGI Add Allocation Product Period succeeded!!!",ALLOCATIONPERIOD);
		
        return "OK";
    }  


/*
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?item=1&start=2015-05-29&end=2015-06-05&limit=123499&unit=5&typeId=3&op=57&cmd=MOD&cmpy=0022&supp=0002&lock=4&prod=000152
*/	
    public function update($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ( "ALCH_ALP_ALL_ATKY_AT_TYPE"=>($data->aiprd_type), "ALCH_ALP_ALL_ATKY_AT_CMPY"=>($data->aiprd_cmpycode), "ALCH_ALP_ALL_PROD_PRODCODE"=>($data->aiprd_prodcode), "ALCH_ALP_ALL_PROD_PRODCMPY"=>($data->aiprd_suppcode), "ALL_CHILD_P_NO"=>($data->aiprd_index) );
		$excludes = array ("ALL_CH_USED"=>0);
		$upd_journal = new UpdateJournalClass( "Allocation Product Periods", "ALL_CHILD", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Allocation Product Period 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Allocation Product Period++++++",ALLOCATIONPERIOD);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'item'=>urlencode($data->aiprd_index),
            'start'=>urlencode($data->aiprd_daystart),
            'end'=>urlencode($data->aiprd_dayend),
            'limit'=>urlencode($data->aiprd_qtylimit),
            'unit'=>urlencode($data->aiprd_produnit),
            'typeId'=>urlencode($data->aiprd_type),
            'cmpy'=>urlencode($data->aiprd_cmpycode),
            'supp'=>urlencode($data->aiprd_suppcode),
            'lock'=>urlencode("4"),
            'prod'=>urlencode($data->aiprd_prodcode),
            'cmd'=>urlencode("MOD"),   	
			'op'=>urlencode("57")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        //$patternSuccessEng = "stBar=Success";
        //$patternSuccessChn = "stBar=成功";
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Success</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">成功</span>";
        $isFoundEng = strstr($response, $patternSuccessEng);
        $isFoundChn = strstr($response, $patternSuccessChn);
        if ($isFoundEng == false && $isFoundChn == false) {
                logMe("Update Allocation Product Period!!!",ALLOCATIONPERIOD);
                return "ERROR";
        }
        logMe("CGI Update Allocation Product Period!!!",ALLOCATIONPERIOD);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
 		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        return "OK";
    }  

	
/*
http://bz.mobhk.om5000/cgi-bin/en/gantry/allocations.cgi?op=59&typeId=3&cmpy=0022&supp=0002&lock=4&prod=000152&item=1&start=2015-05-29&end=2015-06-05&limit=123499&unit=l+%28amb%29&cmd=DEL
*/
    public function delete($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting Allocation Product Period++++++",ALLOCATIONPERIOD);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'typeId'=>urlencode($data->aiprd_type),
            'cmpy'=>urlencode($data->aiprd_cmpycode),
            'supp'=>urlencode($data->aiprd_suppcode),
            'lock'=>urlencode("4"),
            'prod'=>urlencode($data->aiprd_prodcode),
            'item'=>urlencode($data->aiprd_index),
            'start'=>urlencode($data->aiprd_daystart),
            'end'=>urlencode($data->aiprd_dayend),
            'limit'=>urlencode($data->aiprd_qtylimit),
            'unit'=>urlencode($data->aiprd_unitname),
//            'unit'=>urlencode($data->aiprd_produnit),
            'cmd'=>urlencode("DEL"),   	
			'op'=>urlencode("59")
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        //$patternSuccessEng = "stBar=Success";
        //$patternSuccessChn = "stBar=成功";
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Success</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">成功</span>";
        $isFoundEng = strstr($response, $patternSuccessEng);
        $isFoundChn = strstr($response, $patternSuccessChn);
        if ($isFoundEng == false && $isFoundChn == false) {
			logMe("CGI Delete Allocation Product Period failed!!!",ALLOCATIONPERIOD);
			return "ERROR";
        }
        logMe("CGI Delete Allocation Product Period succeeded!!!",ALLOCATIONPERIOD);

        return "OK";
    }   
	
}
?>