<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('COMPANY')) define('COMPANY','CompanyService.class');

class CompanyService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select * from GUI_COMPANY 
	";
	
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
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) BPVIEW ";
			
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
		else $sort="ORDER BY BASE_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) BPVIEW ";
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

	
    public function lookupCompanyPermitNoList($caseType='L')
	{
        $sql="select CMPY_CODE, CMPY_PERMIT_NO from COMPANYS";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    }

	
    public function setCompanyPermitNo($cmpy_code, $permit_no)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("CMPY_CODE"=>($cmpy_code));
		//$excludes = array ();
		$excludes = array (
			"CMPY_CODE"=>0
			, "CMPY_NAME"=>0
			, "CMPY_TYPE"=>0
			, "CMPY_COMPRESS_BL"=>0
			, "CMPY_CHECK_LICEN"=>0
			, "CMPY_LDGO_DELTA"=>0
			, "CMPY_MSG"=>0
			, "CMPY_VET"=>0
			, "CMPY_TKR_CFG"=>0
			, "CMPY_ENABLE_EXPD"=>0
			, "CMPY_SEAL_NUMBER"=>0
			, "CMPY_EXP_CODE"=>0
			, "CMPY_ISSU"=>0
			, "CMPY_HOST"=>0
			, "CMPY_AOI"=>0
			, "CMPY_AUTO_LD"=>0
			, "CMPY_RTN_PROMPT"=>0
			, "CMPY_ADD_PROMPT"=>0
			, "CMPY_LOG_LD_DEL"=>0
			, "CMPY_HOST_DOCS"=>0
			, "CMPY_COMMS_OK"=>0
			, "CMPY_TKR_ACTIVAT"=>0
			, "CMPY_BOL_VP_NAME"=>0
			, "CMPY_LD_REP_VP"=>0
			, "CMPY_DRV_INST_VP"=>0
			, "CMPY_WGH_COMPLET"=>0
			, "CMPY_WGH_AUTO_FL"=>0
			, "CMPY_TRIP_STRT"=>0
			, "CMPY_TRIP_END"=>0
			, "CMPY_TRIP_LAST"=>0
			, "CMPY_ORD_CARRIER"=>0
			, "CMPY_WIPE_ORDETS"=>0
			, "CMPY_FLAG_1"=>0
			, "CMPY_FLAG_2"=>0
			, "CMPY_FLAG_3"=>0
			, "CMPY_RPT_T_UNIT"=>0
			, "CMPY_RPT_TEMP"=>0
			, "CMPY_AUTO_RECONC"=>0
			, "CMPY_BAY_LOOP_CH"=>0
			, "CMPY_ORD_STRT"=>0
			, "CMPY_ORD_END"=>0
			, "CMPY_ORD_LAST"=>0
			, "CMPY_MOD_DRAWER"=>0
			, "CMPY_MUST_SEALNO"=>0
			, "CMPY_BLTOL_FLAG"=>0
			, "CMPY_LDTOL_FLAG"=>0
			, "CMPY_REQ_PIN_FLAG"=>0
			, "CMPY_PLANT"=>0
			, "CMPY_SCHD_REV_REPOST"=>0
			, "CMPY_SCHD_ARCHIVE"=>0
			, "CMPY_MOVEMENTS_REV"=>0
			, "CMPY_REPORT_RECEIVERS"=>0
			, "CMPY_ADDR"=>0
		);
		$upd_journal = new UpdateJournalClass( "Company", "COMPANYS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "UPDATE COMPANYS set CMPY_PERMIT_NO=:permit_num where CMPY_CODE=:cmpy_code";
		$sql['sql_data'] = array( $permit_no, $cmpy_code );
		
        $res = $mydb->update($sql);
		
        if ($res == RETURN_OK)
        {
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    }
	
}
?>