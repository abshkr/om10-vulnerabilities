<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('REPORTCONFIG')) define('REPORTCONFIG','ReportConfigService.class');

class ReportConfigService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview=" select * from GUI_REPORT_COMPANY ";
	
	
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
            $this->cgi = CGIDIR . "rpt_adm/report_config.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/rpt_adm/report_config.cgi";
        }
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) RPTCMPY ";
			
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
		else $sort="ORDER BY REPORT_CMPYCODE, REPORT_NAME";

		$query = "SELECT * FROM ( " . $this->myview . " ) RPTCMPY ";
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

    public function isReportCompanyDefined( $cmpy, $file )
	{
		//$sql = "select * from REPORT_CMPY where RPT_FILE='$file' and RPT_CMPY='$cmpy' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from REPORT_CMPY where RPT_FILE=:filename and RPT_CMPY=:cmpy ";
		$sql['sql_data'] = array( $file, $cmpy );
		
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
        Call CGI to CREATE Report Config
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Report Config++++++",REPORTCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy_typ_id'=>urlencode($data->report_cmpycode),
            'rptFile'=>urlencode($data->report_file),
            'rptName'=>urlencode($data->report_name),
            'rptDesc'=>urlencode($data->report_desc),
            'rptType'=>urlencode($data->report_type),
            'rptActive'=>urlencode($data->report_active),
            'rptEnabled'=>urlencode($data->report_enabled),
			'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=\"27\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Report Config failed!!!",REPORTCONFIG);
                return "ERROR";
        }
        logMe("CGI Add Report Config succeeded!!!",REPORTCONFIG);
		
		// update canprint/canemail and email address
		$this->updateFlagsForPrintAndEmail($data->report_cmpycode, $data->report_file, $data->report_canprint, $data->report_canemail);
		$this->updateEmailForCompany($data->report_cmpycode, $data->report_cmpyemail);
		
        return "OK";
    }  


	
    public function updateExtraFields($file, $name, $desc)
	{
        $mydb = DB::getInstance();
        //$sql="update REPORT_FILES set RPT_NAME='$name', DESCRIPTION='$desc' where RPT_FILE='$file' ";
		
		$sql = array();
        $sql['sql_text'] = "update REPORT_FILES set RPT_NAME=:rptname, DESCRIPTION=:rptdesc where RPT_FILE=:filename ";
		$sql['sql_data'] = array( $name, $desc, $file );
		
        $result = $mydb->update($sql);
        return $result;
    }

	
    public function updateFlagsForPrintAndEmail($rpt_cmpy, $rpt_file, $rpt_canprint, $rpt_canemail)
	{
        $mydb = DB::getInstance();
        //$sql="update REPORT_CMPY set RPT_CANPRINT='$rpt_canprint', RPT_CANEMAIL='$rpt_canemail' where RPT_CMPY='$rpt_cmpy' and RPT_FILE='$rpt_file' ";
		
		$sql = array();
        $sql['sql_text'] = "update REPORT_CMPY set RPT_CANPRINT=:rpt_canprint, RPT_CANEMAIL=:rpt_canemail where RPT_CMPY=:rpt_cmpy and RPT_FILE=:rpt_file ";
		$sql['sql_data'] = array( $rpt_canprint, $rpt_canemail, $rpt_cmpy, $rpt_file );
		
        $result = $mydb->update($sql);
        return $result;
    }

	
    public function updateEmailForCompany($rpt_cmpy, $rpt_email)
	{
        $mydb = DB::getInstance();
        //$sql="update COMPANYS set CMPY_REPORT_RECEIVERS='$rpt_email' where CMPY_CODE='$rpt_cmpy' ";
		
		$sql = array();
        $sql['sql_text'] = "update COMPANYS set CMPY_REPORT_RECEIVERS=:rpt_email where CMPY_CODE=:rpt_cmpy ";
		$sql['sql_data'] = array( $rpt_email, $rpt_cmpy );
		
        $result = $mydb->update($sql);
        return $result;
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
		$keys = array ( "RPT_CMPY"=>($data->report_cmpycode), "RPT_FILE"=>($data->report_file) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Report Configs", "REPORT_CMPY", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Report Config 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Report Config++++++",REPORTCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy_typ_id'=>urlencode($data->report_cmpycode),
            'rptFile'=>urlencode($data->report_file),
            'rptName'=>urlencode($data->report_name),
            'rptDesc'=>urlencode($data->report_desc),
            'rptType'=>urlencode($data->report_type),
            'rptActive'=>urlencode($data->report_active),
            'rptEnabled'=>urlencode($data->report_enabled),
			'op'=>urlencode("16")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=\"26\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Report Config!!!",REPORTCONFIG);
                return "ERROR";
        }
        logMe("CGI Update Report Config!!!",REPORTCONFIG);

		$this->updateExtraFields($data->report_file, $data->report_name, $data->report_desc);
		$this->updateFlagsForPrintAndEmail($data->report_cmpycode, $data->report_file, $data->report_canprint, $data->report_canemail);
		$this->updateEmailForCompany($data->report_cmpycode, $data->report_cmpyemail);
		
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
		
        logMe("Info: ++++++Deleting Report Config++++++",REPORTCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy_typ_id'=>urlencode($data->report_cmpycode),
            'rptFile'=>urlencode($data->report_file),
            'rptName'=>urlencode($data->report_name),
            'rptDesc'=>urlencode($data->report_desc),
            'rptType'=>urlencode($data->report_type),
            'rptActive'=>urlencode($data->report_active),
            'rptEnabled'=>urlencode($data->report_enabled),
			'op'=>urlencode("8")
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=\"18\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
			logMe("CGI Delete Report Config failed!!!",REPORTCONFIG);
			return "ERROR";
        }
        logMe("CGI Delete Report Config succeeded!!!",REPORTCONFIG);

        return "OK";
    }   
	
}
?>