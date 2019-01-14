<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('LOGICALPRINTER')) define('LOGICALPRINTER','LogicalPrinterService.class');

class LogicalPrinterService
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
            $this->cgi = CGIDIR . "maintenance/printer_config.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/maintenance/printer_config.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = 
		"	
SELECT
	DECODE(pcu.CMPY, NULL, 'ANY', pcu.CMPY)  			as PRT_CMPY,  
	DECODE(cmp.CMPY_NAME, NULL, 'ALL', cmp.CMPY_NAME) 	as PRT_CMPY_NAME,
	pcu.USAGE											as PRT_USAGE,
	b.MESSAGE 											as PRT_USAGE_NAME,
	pcu.PRNTR 											as PRT_PRINTER,
	p.SYS_PRNTR 										as SYS_PRINTER, 
	p.PRNTR_AREA                    					as PRT_AREA,
	ar.AREA_NAME										as AREA_NAME
FROM
	PRNTR_CMPY_USAGE pcu,
	COMPANYS cmp,
	ENUMITEM a,
	MSG_LOOKUP b,
	PRINTER p, 
	AREA_RC ar
WHERE
    ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' and pcu.CMPY = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
        or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
        or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
        or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL
	)
	and cmp.CMPY_CODE (+)  = pcu.CMPY 
	AND b.MSG_ID = a.ENUM_TMM
	AND ( b.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND b.LANG_ID = 'ENG') ) 
	AND a.ENUM_NO = pcu.USAGE
	AND a.ENUMTYPENAME = 'PRN_USE'
	and p.PRNTR = pcu.PRNTR
	and p.PRNTR_AREA = ar.AREA_K(+) 
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
		else $sort="ORDER BY prt_cmpy ASC";
		
		$core_query = 
		"	
SELECT
	DECODE(pcu.CMPY, NULL, 'ANY', pcu.CMPY)  			as PRT_CMPY,  
	DECODE(cmp.CMPY_NAME, NULL, 'ALL', cmp.CMPY_NAME) 	as PRT_CMPY_NAME,
	pcu.USAGE											as PRT_USAGE,
	b.MESSAGE 											as PRT_USAGE_NAME,
	pcu.PRNTR 											as PRT_PRINTER,
	p.SYS_PRNTR 										as SYS_PRINTER, 
	p.PRNTR_AREA                    					as PRT_AREA,
	ar.AREA_NAME										as AREA_NAME
FROM
	PRNTR_CMPY_USAGE pcu,
	COMPANYS cmp,
	ENUMITEM a,
	MSG_LOOKUP b,
	PRINTER p, 
	AREA_RC ar
WHERE
    ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' and pcu.CMPY = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
        or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
        or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
        or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL
	)
	and cmp.CMPY_CODE (+)  = pcu.CMPY 
	AND b.MSG_ID = a.ENUM_TMM
	AND ( b.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND b.LANG_ID = 'ENG') ) 
	AND a.ENUM_NO = pcu.USAGE
	AND a.ENUMTYPENAME = 'PRN_USE'
	and p.PRNTR = pcu.PRNTR
	and p.PRNTR_AREA = ar.AREA_K(+) 
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

    public function isLogicalPrinterExisted($cmpy_id, $usage_id, $printer_id)
	{
		/*
		$sql = 
		"
			SELECT * 
			FROM PRNTR_CMPY_USAGE
			WHERE 
				CMPY = '$cmpy_id'
				AND USAGE = $usage_id
				AND PRNTR = '$printer_id' 
		";
		*/
/*		
		$sql = 
		"
			SELECT *
			FROM PRNTR_CMPY_USAGE
			WHERE 
				CMPY = '$cmpy_id'
				AND PRNTR = '$printer_id' 
				AND USAGE IN
					(select a.ENUM_NO 
					from ENUMITEM a,MSG_LOOKUP b
					where b.MSG_ID = a.ENUM_TMM
					and  ( b.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND b.LANG_ID = 'ENG') )  
					and b.MESSAGE = '$usage_id'
					and a.ENUMTYPENAME = 'PRN_USE')
		";
*/		
		
		$sql = array();
        $sql['sql_text'] = 
		"
			SELECT * 
			FROM PRNTR_CMPY_USAGE
			WHERE 
				CMPY = :cmpy_id
				AND USAGE = :usage_id
				AND PRNTR = :printer_id 
		";
		$sql['sql_data'] = array( $cmpy_id, $usage_id, $printer_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

    public function getPrintUsageCode($usage_id)
	{
		
		$sql = array();
        $sql['sql_text'] = "select PRNF_USE from PRNT_USE where USAGE=:usage_id ";
		$sql['sql_data'] = array( $usage_id );
		
        $mydb = DB::getInstance();
        $rows = $mydb->query($sql, "N");
		
		$str = "";
		if ( count( $rows ) > 0 )
		{
			$str = $rows[0]->PRNF_USE;
		}
		
        return $str;
    }

/*    
SCRIPT_NAME: /cgi-bin/en/maintenance/printer_config.cgi
begin: 20141001_11:18:28.028236+10
REQUEST_METHOD: POST
COOKIE: sess_id=rhzKzsAzsaZl; language=en; reqId=zOgLKptECaY
REQUEST: cmpy_typ_id=0000&op=17&priv=8&prtUsage=2&prtPrinter=P06
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
        Call CGI to CREATE Logical Printer
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Logical Printer++++++",LOGICALPRINTER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy_typ_id'=>urlencode($data->prt_cmpy),
            'prtUsage'=>urlencode($data->prt_usage),
            'prtPrinter'=>urlencode($data->prt_printer),
            'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=\"27\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Logical Printer failed!!!",LOGICALPRINTER);
                return "ERROR";
        }
        logMe("CGI Add Logical Printer succeeded!!!",LOGICALPRINTER);
		
        return "OK";
    }  


/*
SCRIPT_NAME: /cgi-bin/en/maintenance/printer_config.cgi
begin: 20141001_11:19:07.397292+10
REQUEST_METHOD: POST
COOKIE: sess_id=rhzKzsAzsaZl; language=en; reqId=zPcngiGVSXR
REQUEST: op=16&cmpy_typ_id=0000&prtUsage=INSTRUCT&pg=1&prtOrig=P07&priv=8&prtPrinter=P07
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
		//$keys = array ( "CMPY"=>($data->prt_cmpy), "PRNTR"=>($data->prt_printer), "USAGE"=>($data->prt_usage) );
		$keys = array ( "CMPY"=>($data->prt_cmpy), "USAGE"=>($data->prt_usage) );
		$excludes = array ( "CMPY"=>0, "USAGE"=>0 );
		$upd_journal = new UpdateJournalClass( "Logical Printers", "PRNTR_CMPY_USAGE", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Logical Printer 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Logical Printer++++++",LOGICALPRINTER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy_typ_id'=>urlencode($data->prt_cmpy),
            'prtUsage'=>urlencode($data->prt_usage_name),
            'prtOrig'=>urlencode($data->prt_orig),
            'prtPrinter'=>urlencode($data->prt_printer),
            'op'=>urlencode("16")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=\"26\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Logical Printer!!!",LOGICALPRINTER);
                return "ERROR";
        }
        logMe("CGI Update Logical Printer!!!",LOGICALPRINTER);

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
SCRIPT_NAME: /cgi-bin/en/maintenance/printer_config.cgi
begin: 20141001_11:21:11.042633+10
REQUEST_METHOD: GET
COOKIE: sess_id=rhzKzsAzsaZl; language=en; reqId=eNrAZkYsXnU
REQUEST: cmpy_typ_id=0000&op=8&pg=1&priv=8&prtUsage=INSTRUCT&prtPrinter=P11
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
		
		$usage_code = $data->prt_usage_name;
		$usage_code = $this->getPrintUsageCode($data->prt_usage);
		
        logMe("Info: ++++++Deleting Logical Printer++++++",LOGICALPRINTER);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy_typ_id'=>urlencode($data->prt_cmpy),
            'prtUsage'=>urlencode($usage_code),
            'prtPrinter'=>urlencode($data->prt_printer),
            'op'=>urlencode("18")
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=\"28\";";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("CGI Delete Logical Printer failed!!!",LOGICALPRINTER);
			return "ERROR";
        }
        logMe("CGI Delete Logical Printer succeeded!!!",LOGICALPRINTER);

        return "OK";
    }   
	
}
?>