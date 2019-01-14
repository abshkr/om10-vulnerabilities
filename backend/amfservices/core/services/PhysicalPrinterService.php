<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('PHYSICALPRINTER')) define('PHYSICALPRINTER','PhysicalPrinterService.class');

class PhysicalPrinterService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	
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
            $this->cgi = CGIDIR . "maintenance/physical_printer_config.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/maintenance/physical_printer_config.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = 
		"	
			SELECT
				p.PRNTR
				, p.SYS_PRNTR
				, NVL(p.PRNTR_LOCK, 'N') as PRNTR_LOCK
				, NVL(p.PRNTR_AREA, '') as PRNTR_AREA
				, a.AREA_NAME
			FROM
				PRINTER p
				, AREA_RC a
			where
				p.PRNTR_AREA = a.AREA_K(+)
		";
			
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
		else $sort="ORDER BY PRNTR ASC";
		
		$core_query = 
		"	
			SELECT
				p.PRNTR
				, p.SYS_PRNTR
				, NVL(p.PRNTR_LOCK, 'N') as PRNTR_LOCK
				, NVL(p.PRNTR_AREA, '') as PRNTR_AREA
				, a.AREA_NAME
			FROM
				PRINTER p
				, AREA_RC a
			where
				p.PRNTR_AREA = a.AREA_K(+)
		";
		
		//$query = "SELECT * FROM ($core_query) $filter $sort";
		$query = "SELECT * FROM ($core_query) " . $filter['sql_text'] . " $sort";

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

    public function isPhysicalPrinterExisted($printer_id)
	{
		//$sql = "select * from PRINTER where PRNTR='" . $printer_id . "' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from PRINTER where PRNTR=:printer_id ";
		$sql['sql_data'] = array( $printer_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function isPhysicalPrinterUsedAsDefault($printer_id)
	{
		//$sql = "select * from COMPANYS where CMPY_BOL_VP_NAME='$printer_id' or CMPY_LD_REP_VP='$printer_id' or CMPY_DRV_INST_VP='$printer_id' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from COMPANYS where CMPY_BOL_VP_NAME=:printer_id or CMPY_LD_REP_VP=:printer_id or CMPY_DRV_INST_VP=:printer_id ";
		$sql['sql_data'] = array( $printer_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );

        return $count;
	}

    public function isPhysicalPrinterAreaMultiple($printer, $area, $logic)
	{
		//$sql = "select * from PRINTER where SYS_PRNTR='$printer' and PRNTR_AREA!=$area and PRNTR!='$logic'";
		
		$sql = array();
        $sql['sql_text'] = "select * from PRINTER where SYS_PRNTR=:printer_id and PRNTR_AREA!=:area_id and PRNTR!=:logic_prntr ";
		$sql['sql_data'] = array( $printer, $area, $logic );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

/*    
SCRIPT_NAME: /cgi-bin/en/maintenance/physical_printer_config.cgi
begin: 20140929_16:42:12.553028+10
REQUEST_METHOD: POST
COOKIE: sess_id=ATBRJjMzrKGq; PHPSESSID=umfats24gndp72uefnffhjhtf1; language=en; reqId=FIJzCtXTaCi
REQUEST: prtPrinter=P81&op=17&phyPrinter=aaa111&printerLock=Y&printerArea=9999
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
        Call CGI to CREATE Physical Printer
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Physical Printer++++++",PHYSICALPRINTER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'prtPrinter'=>urlencode($data->prntr),
            'phyPrinter'=>urlencode($data->sys_prntr),
            'printerLock'=>urlencode($data->prntr_lock),
            'printerArea'=>urlencode($data->prntr_area),
             'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=\"27\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Physical Printer failed!!!",PHYSICALPRINTER);
                return "ERROR";
        }
        logMe("CGI Add Physical Printer succeeded!!!",PHYSICALPRINTER);
		
        return "OK";
    }  


/*
SCRIPT_NAME: /cgi-bin/en/maintenance/physical_printer_config.cgi
begin: 20140929_16:42:44.571854+10
REQUEST_METHOD: POST
COOKIE: sess_id=CbtnhzIMthQv; PHPSESSID=umfats24gndp72uefnffhjhtf1; language=cn; reqId=XuRtTHZzjNF
REQUEST: prtPrinter=P81&op=6&phyPrinter=aaa111&printerLock=Y&printerArea=9999
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
		$keys = array ( "PRNTR"=>($data->prntr) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Physical Printers", "PRINTER", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Physical Printer 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Physical Printer++++++",PHYSICALPRINTER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'prtPrinter'=>urlencode($data->prntr),
            'phyPrinter'=>urlencode($data->sys_prntr),
            'printerLock'=>urlencode($data->prntr_lock),
            'printerArea'=>urlencode($data->prntr_area),
             'op'=>urlencode("16")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=\"26\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Physical Printer!!!",PHYSICALPRINTER);
                return "ERROR";
        }
        logMe("CGI Update Physical Printer!!!",PHYSICALPRINTER);

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
SCRIPT_NAME: /cgi-bin/en/maintenance/physical_printer_config.cgi
begin: 20140929_16:43:06.289760+10
REQUEST_METHOD: GET
COOKIE: sess_id=CbtnhzIMthQv; PHPSESSID=umfats24gndp72uefnffhjhtf1; language=cn; reqId=BozHAjHcrjk
REQUEST: prtPrinter=P81&op=8&priv=8&phyPrinter=aaa111&printerLock=Y&printerArea=1
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
		
        logMe("Info: ++++++Deleting Physical Printer++++++",PHYSICALPRINTER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'prtPrinter'=>urlencode($data->prntr),
            'phyPrinter'=>urlencode($data->sys_prntr),
            'printerLock'=>urlencode($data->prntr_lock),
            'printerArea'=>urlencode($data->prntr_area),
             'op'=>urlencode("18")
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=\"28\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
			logMe("CGI Delete Physical Printer failed!!!",PHYSICALPRINTER);
				
			$patternSuccess1 = "var op=\"48\";";
			$isFound1 = strstr($response, $patternSuccess1);
			if ($isFound1 == false) {
				return "ERROR";
			}
			else
			{
				return "DEPENDENCIES";
			}			
        }
        logMe("CGI Delete Physical Printer succeeded!!!",PHYSICALPRINTER);

        return "OK";
    }   
	
}
?>