<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('SITEACCESSDEVICE')) define('SITEACCESSDEVICE','SiteAccessDeviceService.class');

class SiteAccessDeviceService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
		select 
			adv.ADV_CODE						as ADV_CODE
			, adv.ADV_DEVICE             		as ADV_DEVICE
			, adv.ADV_PORT               		as ADV_PORT
			, adv.ADV_AREA               		as ADV_AREA
			, arc.AREA_NAME  					as ADV_AREA_NAME
			, adv.ADV_LOCKOUT            		as ADV_LOCKOUT
			, adv.ADV_PIN_PASS           		as ADV_PIN_PASS
			, adv.ADV_SECURITY           		as ADV_SECURITY
			, alt.AUTH_LEVEL_NAME				as ADV_SECURITY_NAME
			, adv.ADV_TYPE						as ADV_TYPE
		from 
			ACCDEV 								adv
			, AUTH_LEVEL_TYP 					alt
			, AREA_RC							arc
		where 
			arc.AREA_K = adv.ADV_AREA
			AND alt.AUTH_LEVEL_ID = adv.ADV_SECURITY
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
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "access_ctrl/site_acc_dev.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/access_ctrl/site_acc_dev.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) ADVIEW ";
			
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
		else $sort="ORDER BY ADV_DEVICE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) ADVIEW ";
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

    public function isSiteAccessDeviceExisted( $adv_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from ACCDEV where ADV_CODE=:adv_code ";
		$sql['sql_data'] = array( $adv_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

   
   public function lookupSiteAccessDeviceCodeListAvail()
   {
        $sql="
			SELECT
				KRD_CFG.KRDC_NAME 			as ADV_CODE
				, KRD_CFG.KRDC_NAME 		as ADV_NAME
			FROM
				KRD_CFG
			WHERE
				KRD_CFG.KRDC_NAME NOT IN (SELECT ADV_CODE FROM ACCDEV)
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
   }
    
   public function lookupSiteAccessDeviceCodeList()
   {
        $sql="
			SELECT
				KRD_CFG.KRDC_NAME 			as ADV_CODE
				, KRD_CFG.KRDC_NAME 		as ADV_NAME
			FROM
				KRD_CFG
			WHERE
				1=1
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
   }
  
   public function lookupSiteAccessDeviceTypeList()
   {
        $sql="
			SELECT
				DEV_TYPE 			as ADV_DEVICE_TYPE
				, DEV_TYPE 			as ADV_DEVICE_NAME
			FROM
				DEVICES
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
   }


	public function create( $data )
	{
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into ACCDEV
			( 
				ADV_CODE
				, ADV_DEVICE
				, ADV_PORT
				, ADV_AREA
				, ADV_LOCKOUT
				, ADV_PIN_PASS
				, ADV_SECURITY
				, ADV_TYPE				
			) 
			values 
			( 
				:adv_code
				, :adv_device
				, :adv_port
				, :adv_area
				, :adv_lockout
				, :adv_pin_pass
				, :adv_security
				, :adv_type				
			) 
		";
		$sql['sql_data'] = array( $data->adv_code, $data->adv_device, $data->adv_port, $data->adv_area, $data->adv_lockout, $data->adv_pin_pass, $data->adv_security, $data->adv_type );
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the site access device succeeded!!!",SITEACCESSDEVICE);

		// write journal
		$keys = array ("ADV_CODE"=>($data->adv_code) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Site Access Device", "ACCDEV", $keys, $excludes );
		$ins_journal->logOneLine("created a site access device [" . $data->adv_code . ":" . $data->adv_device . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update ACCDEV set 
				ADV_DEVICE = :adv_device
				, ADV_PORT = :adv_port 
				, ADV_AREA = :adv_area 
				, ADV_LOCKOUT = :adv_lockout 
				, ADV_PIN_PASS = :adv_pin_pass 
				, ADV_SECURITY = :adv_security 
				, ADV_TYPE = :adv_type 
			where 
				ADV_CODE = :adv_code
		";
		$sql['sql_data'] = array( $data->adv_device, $data->adv_port, $data->adv_area, $data->adv_lockout, $data->adv_pin_pass, $data->adv_security, $data->adv_type, $data->adv_code );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the site access device succeeded!!!",SITEACCESSDEVICE);

		// write journal
		$keys = array ("ADV_CODE"=>($data->adv_code) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Site Access Device", "ACCDEV", $keys, $excludes );
		$upd_journal->logOneLine("updated a site access device [" . $data->adv_code . ":" . $data->adv_device . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from ACCDEV 
			where 
				ADV_CODE = :adv_code
		";
		$sql['sql_data'] = array( $data->adv_code );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the site access device succeeded!!!",SITEACCESSDEVICE);

		// write journal
		$keys = array ("ADV_CODE"=>($data->adv_code) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Site Access Device", "ACCDEV", $keys, $excludes );
		$del_journal->logOneLine("deleted a site access device [" . $data->adv_code . ":" . $data->adv_device . "] successfully");
		
		return "OK";
	}
	
}
?>