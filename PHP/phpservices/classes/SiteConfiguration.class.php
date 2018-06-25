<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/Tankers.class.php');
require_once(dirname(__FILE__) . '/GlobalCfg.php');
require_once(dirname(__FILE__) . '/Journal.class.php');

if(!defined('SITECONFIGCLASS')) define('SITECONFIGCLASS', 'SiteConfiguration.class');

class SiteConfigurationClass {

    var $tblname  = "SITE_CONFIG";
	
	public function SiteConfigurationClass() {
	    if(defined('HOST')) {
		    $this->host = HOST;
		} else {
		    $this->host="localhost";
		}
		
		if(defined('CGIDIR')) {
		    $this->cgi = CGIDIR . "cust_ord/term_locs.cgi";
		} else {
		    $this->cgi="cust_ord/term_locs.cgi";
		}
	}

/*
	public function update($data) {
		
		$mydb = DB::getInstance();
		$config_key = urlencode($data->config_key);
		$config_value = urlencode($data->config_value);
		$query = "SELECT CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY = '$config_key'";
		$rows = $mydb->query($query);
		//XarrayEncodingConversion($rows);

		$old_value = $rows[0]->CONFIG_VALUE;
		$sql = "UPDATE SITE_CONFIG SET CONFIG_VALUE='$config_value', CONFIG_VAL_LAST_CHG=SYSTIMESTAMP WHERE CONFIG_KEY='$config_key'";
		$res = $mydb->update($sql);

		if ($old_value != $config_value)
		{
			$sess_obj = new SetSessionService();
			$session_id = $sess_obj->getSessionVar('SESSION');
			$get_person = "SELECT PER_CODE FROM HTTP_SESSION_TRACE WHERE SESS_ID = '$session_id'";
			$rows = $mydb->query($get_person);
			//XarrayEncodingConversion($rows);
			$person = $rows[0]->PER_CODE;
			$value_change = "Person [$person] changed [$config_key] from [$old_value] to [$config_value]";
			$myjournal = new JournalClass(null,null);
			$journal_data = new Journal();
			$journal_data->company_code = $sess_obj->getSessionVar('COMPANY');
			$journal_data->region_code = 'ENG';
			$journal_data->msg_event = 'CONF';
			$journal_data->msg_class = 'EVENT';
			$journal_data->message = $value_change;
			$myjournal->create($journal_data);
		}	

		return($res);
	}
*/	
	public function update($data) 
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("CONFIG_KEY"=>($data->config_key));
		$excludes = array ("CONFIG_VAL_LAST_CHG"=>0);
		$upd_journal = new UpdateJournalClass( "Site Configuration", "SITE_CONFIG", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// update the configuration
		$mydb = DB::getInstance();
		$config_key = urlencode($data->config_key);
		$config_value = urlencode($data->config_value);
		$sql = "UPDATE SITE_CONFIG SET CONFIG_VALUE='$config_value', CONFIG_VAL_LAST_CHG=SYSTIMESTAMP WHERE CONFIG_KEY='$config_key'";
		$res = $mydb->update($sql);
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		return($res);
	}
	
	public function getByFieldValue($tbl_name, $field_name, $value) {
	    $mydb = DB::getInstance();
		$sql="SELECT * FROM $tbl_name WHERE $field_name=$value";
		$rows = $mydb->query($sql);
		//XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => $tbl_name)));
	}
	
	
}
