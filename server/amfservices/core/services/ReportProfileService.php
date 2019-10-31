<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('REPORTPROFILE')) define('REPORTPROFILE','ReportProfileService.class');

class ReportProfileService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview=" select grp.*, grp.REPORT_CLOSEOUT_FLAG2 as REPORT_CLOSEOUTBY from GUI_REPORT_PROFILE grp ";
	/*
	var $myview="
	SELECT
		REPORT_FILES.RPT_FILE 							as REPORT_FILE
		, REPORT_FILES.RPT_NAME							as REPORT_NAME
		, REPORT_FILES.DESCRIPTION						as REPORT_DESC
		, REPORT_FILES.FREQUENCY						as REPORT_TYPE
		, RPT_TYPES.REPORT_TYPE_NAME					as REPORT_TYPE_NAME
		, REPORT_FILES.LANG_ID							as REPORT_LANG
		, NVL(REPORT_FILES.REPORT_ADDTIVE, 0)			as REPORT_ADDITIVE_FLAG
		, NVL(REPORT_FILES.IS_CLOSEOUT_REPORT, 0)		as REPORT_CLOSEOUT_FLAG2
		, REPORT_FILES.JASPER_FILE						as REPORT_JASPER_FILE
		, REPORT_FILES.ONDEMAND_TITLE					as REPORT_ONDEMAND_TITLE
		, BITAND(NVL(REPORT_FILES.ONDEMAND_FLAG, 0), 1)			as REPORT_ONDEMAND_FLAG
		, (BITAND(NVL(REPORT_FILES.ONDEMAND_FLAG, 0), 2)/2)		as REPORT_CLOSEOUT_FLAG
		, NVL(REPORT_FILES.ACCUMULATIVE_FLAG, 0)		as REPORT_ACCUMULATIVE_FLAG
		, NVL(REPORT_FILES.IS_FRONTEND, 0)				as REPORT_FRONTEND_FLAG
	FROM
		REPORT_FILES
		, (
			select 
				ALLOC_PERIOD_ID												as REPORT_TYPE_ID
				, DECODE(ALLOC_PERIOD_ID, 1, 'D', 2, 'W', 4, 'M', 'N')   	as REPORT_TYPE_CODE 
				, ALLOC_PERIOD_NAME 										as REPORT_TYPE_NAME
			from ALLOC_PERIOD_TYP 
			where ALLOC_PERIOD_ID in (0, 1,2,4)
		) RPT_TYPES
	WHERE
		 ( REPORT_FILES.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND REPORT_FILES.LANG_ID = 'ENG') )
		 and REPORT_FILES.FREQUENCY=RPT_TYPES.REPORT_TYPE_CODE(+)
	";
	*/
	
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
            $this->cgi = CGIDIR . "rpt_adm/report_profile.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/rpt_adm/report_profile.cgi";
        }
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) RPTPROF ";
			
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
		else $sort="ORDER BY REPORT_JASPER_FILE, REPORT_TYPE";

		$query = "SELECT * FROM ( " . $this->myview . " ) RPTPROF ";
		//$query = $query . " $filter $sort ";
		$query = $query . " " . $filter['sql_text'] . " $sort ";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter['sql_data'];
		
        $mydb = DB::getInstance();
		//$data = $mydb->retrieve($queryPaged);
		$data = $mydb->retrieveArray($queryPaged);
		
		$jfiles = $this->lookupReportFileFromFolder();
		$new_data = array();
		foreach( $data->data as $rowline )
		{
			if ( array_search( $rowline['report_jasper_file'], $jfiles ) === FALSE )
			{
				$rowline['report_jasper_file_exist'] = 0;
			}
			else
			{
				$rowline['report_jasper_file_exist'] = 1;
			}
			$new_data[] = $rowline;
		}
		$data->data = $new_data;
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 
	
	public function lookupReportFileFromFolder()
	{
		$dir = $_SERVER['OMEGA_HOME'] . '/bin/jasper';
		$files = scandir($dir);
		
		$arr = array();
		foreach( $files as $name )
		{	
			if ( strpos( $name, '.jasper' ) === FALSE )
			{
				continue;
			}
			$arr[] = $name;
		}
		
		return($arr);
    } 


    public function isReportFileDefined( $file )
	{
		//$sql = "select * from REPORT_FILES where RPT_FILE='$file' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from REPORT_FILES where RPT_FILE=:filename ";
		$sql['sql_data'] = array( $file );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isReportJasperFileUsed( $file, $freq )
	{
		//$sql = "select * from REPORT_FILES where JASPER_FILE='$file' and FREQUENCY='$freq' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from REPORT_FILES where JASPER_FILE=:filename and FREQUENCY=:freq ";
		$sql['sql_data'] = array( $file, $freq );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isReportFileUsedByCompany( $file )
	{
		//$sql = "select * from REPORT_CMPY where RPT_FILE='$file' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from REPORT_CMPY where RPT_FILE=:filename ";
		$sql['sql_data'] = array( $file );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

   
/*    


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
        Call CGI to CREATE Report Profile
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Report Profile++++++",REPORTPROFILE);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'rptFile'=>urlencode($data->report_file),
            'rptName'=>urlencode($data->report_name),
            'rptDesc'=>urlencode($data->report_desc),
            'rptType'=>urlencode($data->report_type),
            'ondemandFlag'=>urlencode($data->report_ondemand_flag),
            'is_closeout'=>urlencode($data->report_closeout_flag),
            'is_ondemand'=>urlencode($data->report_ondemand_flag),
            'OndemandName'=>urlencode($data->report_ondemand_title),
            'jasper_file'=>urlencode($data->report_jasper_file),
            'daterange_type'=>urlencode($data->report_closeoutby),
			'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=\"27\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Report Profile failed!!!",REPORTPROFILE);
                return "ERROR";
        }
        logMe("CGI Add Report Profile succeeded!!!",REPORTPROFILE);
		
        return "OK";
    }  


/*
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
		$keys = array ( "RPT_FILE"=>($data->report_file) );
		$excludes = array ("LANG_ID"=>0);
		$upd_journal = new UpdateJournalClass( "Report Profiles", "REPORT_FILES", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Report Profile 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Report Profile++++++",REPORTPROFILE);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'rptFile'=>urlencode($data->report_file),
            'rptName'=>urlencode($data->report_name),
            'rptDesc'=>urlencode($data->report_desc),
            'rptType'=>urlencode($data->report_type),
            'ondemandFlag'=>urlencode($data->report_ondemand_flag),
            'is_closeout'=>urlencode($data->report_closeout_flag),
            'is_ondemand'=>urlencode($data->report_ondemand_flag),
            'OndemandName'=>urlencode($data->report_ondemand_title),
            'jasper_file'=>urlencode($data->report_jasper_file),
            'daterange_type'=>urlencode($data->report_closeoutby),
			'op'=>urlencode("16")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=\"26\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Report Profile!!!",REPORTPROFILE);
                return "ERROR";
        }
        logMe("CGI Update Report Profile!!!",REPORTPROFILE);

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
		
        logMe("Info: ++++++Deleting Report Profile++++++",REPORTPROFILE);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'rptFile'=>urlencode($data->report_file),
            'rptName'=>urlencode($data->report_name),
            'rptDesc'=>urlencode($data->report_desc),
            'rptType'=>urlencode($data->report_type),
            'ondemandFlag'=>urlencode($data->report_ondemand_flag),
            'is_closeout'=>urlencode($data->report_closeout_flag),
            'is_ondemand'=>urlencode($data->report_ondemand_flag),
            'OndemandName'=>urlencode($data->report_ondemand_title),
            'jasper_file'=>urlencode($data->report_jasper_file),
			'op'=>urlencode("18")
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=\"28\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
			logMe("CGI Delete Report Profile failed!!!",REPORTPROFILE);
			return "ERROR";
        }
        logMe("CGI Delete Report Profile succeeded!!!",REPORTPROFILE);

        return "OK";
    }   
	
}
?>