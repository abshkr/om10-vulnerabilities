<?php
require_once( 'bootstrap.php' );
require_once( 'Journal.class.php' );

if(!defined('FEATURECONFIG')) define('FEATURECONFIG','FeatureConfigService.class');

class FeatureConfigService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
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

	public function getFeatureConfiguration()
	{
		$jsonFile = dirname(__FILE__) . "/FeatureSettings.json";
		//$jsonFile = "FeatureSettings.json";
		
		$data = file_get_contents( $jsonFile );
		
		return $data;
	}

	public function putFeatureConfiguration($data)
	{
		$jsonFile = dirname(__FILE__) . "/FeatureSettings.json";
		//$jsonFile = "FeatureSettings.json";
		
		// save the changes of feature settings
		//$result = file_put_contents( $jsonFile, json_encode($data, JSON_PRETTY_PRINT) );
		$result = file_put_contents( $jsonFile, json_encode($data) );
		
		if ( $result === FALSE )
		{
			return "ERROR";
		}
		else
		{
			// adjust the features;
			foreach( $data as $item )
			{
				$funcName = $item->feature_func;
				$this->$funcName( $item->feature_flag );
			}
		}
		return "OK";
	}
	
	
	public function ManageBaseProductDensityRange($flag)
	{
		$value = '0';
		if ( $flag == 'Y' )
		{
			$value = '1';
		}
		/*
		the following column settings are in the file ScreenGridColumnService.php
			$str .= "|1,base_dens_lo";
			$str .= "|1,base_dens_hi";
		*/
		$this->updateGridColumn( 'base_dens_lo', $value );
		$this->updateGridColumn( 'base_dens_hi', $value );
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|fld__base_dens_lo,1";
			$str .= "|fld__base_dens_hi,1";
			$str .= "|fld__base_dens_lo__base_dens_hi,1";
		*/
		$this->updateFormField( 'fld__base_dens_lo', $value );
		$this->updateFormField( 'fld__base_dens_hi', $value );
		$this->updateFormField( 'fld__base_dens_lo__base_dens_hi', $value );
	}
	
	public function ManageDCS($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_EXTERNAL_BLENDING_ALLOWED	Y	Determine whether it is requred to determine base product quantities based on recipes when blending is performed externally.
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( 'Y', 'SITE_EXTERNAL_BLENDING_ALLOWED' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_EXTERNAL_BLENDING_ALLOWED' );
		}
	}
	
	public function ManageHotProduct($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			HOT_LITRE_SFL_FACTOR	0.9345678	Site-wide percentage to be used to reduce preset for hot litres, valid range [0.0 - 1.0]
			SITE_ADJUST_PRESET_FOR_HIGHTEMP	Y	for back-end
			SITE_LOAD_SAFEFILL_CHECK_BY_HIGHTEMP	Y	Determine whether it is requred to check the capacity limiting of loads.
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( 'Y', 'SITE_LOAD_SAFEFILL_CHECK_BY_HIGHTEMP' );
			$this->updateSiteConfig( 'Y', 'SITE_ADJUST_PRESET_FOR_HIGHTEMP' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_LOAD_SAFEFILL_CHECK_BY_HIGHTEMP' );
			$this->updateSiteConfig( 'N', 'SITE_ADJUST_PRESET_FOR_HIGHTEMP' );
		}
		
		$value = '0';
		if ( $flag == 'Y' )
		{
			$value = '1';
		}
		/*
		the following column settings are in the file ScreenGridColumnService.php
			$str .= "|1,base_corr_mthd_name";
			$str .= "|1,base_ref_temp_spec_name";
			$str .= "|1,base_limit_preset_ht";
		*/
		$this->updateGridColumn( 'base_corr_mthd_name', $value );
		$this->updateGridColumn( 'base_ref_temp_spec_name', $value );
		$this->updateGridColumn( 'base_limit_preset_ht', $value );
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|fld__base_corr_mthd,1";
			$str .= "|fld__base_ref_temp_spec,1";
			$str .= "|fld__base_limit_preset_ht,1";
		*/
		$this->updateFormField( 'fld__base_corr_mthd', $value );
		$this->updateFormField( 'fld__base_ref_temp_spec', $value );
		$this->updateFormField( 'fld__base_limit_preset_ht', $value );
	}
	
	public function ManageAPI($flag)
	{
		$value = '0';
		if ( $flag == 'Y' )
		{
			$value = '1';
		}
		/*
		the following column settings are in the file ScreenGridColumnService.php
			$str .= "|1,trsf_api";
			$str .= "|1,trsf_temp_f";
			$str .= "|1,TRSB_API";
			$str .= "|1,TRSB_TMP_F";
			$str .= "|1,tank_15_density";
			$str .= "|1,tank_api";
		*/
		$this->updateGridColumn( 'trsf_api', $value );
		$this->updateGridColumn( 'trsf_temp_f', $value );
		$this->updateGridColumn( 'TRSB_API', $value );
		$this->updateGridColumn( 'TRSB_TMP_F', $value );
		$this->updateGridColumn( 'tank_15_density', $value );
		$this->updateGridColumn( 'tank_api', $value );
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|btn_recalcDensity,1";
			$str .= "|fld__tank_15_density,1";
			$str .= "|fld__tank_api,1";
		*/
		$this->updateFormField( 'btn_recalcDensity', $value );
		$this->updateFormField( 'fld__tank_15_density', $value );
		$this->updateFormField( 'fld__tank_api', $value );
	}
	
	public function ManageTankStrapping($flag)
	{
		$value = '0';
		if ( $flag == 'Y' )
		{
			$value = '1';
		}
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|btn_tankstrap,1";
			$str .= "|btn_recalcLevel,1";
		*/
		$this->updateFormField( 'btn_tankstrap', $value );
		$this->updateFormField( 'btn_tankstrap', $value );
	}
	
	public function ManageDangerousGoods($flag)
	{
		$value = '0';
		if ( $flag == 'Y' )
		{
			$value = '1';
		}
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|btnProdDGLink,0";
			$str .= "|prod_dglink,0";
		*/
		$this->updateFormField( 'btnProdDGLink', $value );
		$this->updateFormField( 'prod_dglink', $value );
	}
	
	public function ManageCompanyRelations($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_COMPANY_RELATION_ALLOWED	Y	Determine whether the Company Relation screen is enabled.		
			SITE_COMPANY_RELATION_CHILD_ROLES	2,6	The default child company roles available to choose		
			SITE_COMPANY_RELATION_PARENT_ROLES	1	The default parent company roles available to choose		
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( 'Y', 'SITE_COMPANY_RELATION_ALLOWED' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_COMPANY_RELATION_ALLOWED' );
		}
	}
	
	public function ManageAuditing($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_AUDIT_RETENTION	6	Site audit retention period.(Month)
			SITE_AUDIT_SCREEN_ENABLED	Y	Determine whether the Audit screen is enabled.
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( 'Y', 'SITE_AUDIT_SCREEN_ENABLED' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_AUDIT_SCREEN_ENABLED' );
		}
	}
	
	public function ManageCustomizedExpiryDates($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_DEFAULT_EQPT_EXPIRY	31/12/2030	determine the default expiry date for equipment
			SITE_DEFAULT_TIME_LENGTH	6	The length of time string. 3:" HH", 6:" HH:MM", 9:" HH:MM:SS"
			SITE_DEFAULT_TIME_STRING	23:59:59	default time part if the datetime value has date part only
			SITE_DEFAULT_TNKR_EXPIRY	31/12/2030	determine the default expiry date for tankers
			SITE_EXPIRY_DATE_MANAGE_MODE	3	1: Legacy Expiry Date only; 2: New Generic Expiry Date Types; 3: Both
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( '2', 'SITE_EXPIRY_DATE_MANAGE_MODE' );
		}
		else
		{
			$this->updateSiteConfig( '1', 'SITE_EXPIRY_DATE_MANAGE_MODE' );
		}
	}
	
	public function ManagePartnersAndPartnership($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_PARTNERSHIP_ENABLED	Y	Enable Partners and Partnership.
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( 'Y', 'SITE_PARTNERSHIP_ENABLED' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_PARTNERSHIP_ENABLED' );
		}
	}
	
	public function ManageDateRangeFilter($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_AUTO_FILTER_WHEN_OPEN_SCREEN	Y	determine if auto filtering is allowed when screen opens
			SITE_CLEAR_FILTER_BLANK	N	determine if the date range will be cleared or reset to default value
			SITE_DEFAULT_DATERANGE_ALLOCATION	-1~~-1	The default date ranges in allocation. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_AUDIT	0.020833~~0	The default date ranges in audit reporting. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_CUSTORDER	7~~1	The default date ranges in open orders. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_JOURNAL	0.125~~0	The default date ranges in live journals. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_SCHEDULE	7~~0	The default date ranges in load schedules screen. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_TRANSACTION	7~~0	The default date ranges in transactions. X~~Y: X days before today, Y days after today. -1: blank 
		*/
		if ( $flag == 'Y' )
		{
			//$this->updateSiteConfig( 'Y', 'SITE_AUTO_FILTER_WHEN_OPEN_SCREEN' );
			$this->updateSiteConfig( 'N', 'SITE_CLEAR_FILTER_BLANK' );
		}
		else
		{
			//$this->updateSiteConfig( 'N', 'SITE_AUTO_FILTER_WHEN_OPEN_SCREEN' );
			$this->updateSiteConfig( 'Y', 'SITE_CLEAR_FILTER_BLANK' );
		}
	}
	
	public function ManageAutoFilter($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_AUTO_FILTER_WHEN_OPEN_SCREEN	Y	determine if auto filtering is allowed when screen opens
			SITE_CLEAR_FILTER_BLANK	N	determine if the date range will be cleared or reset to default value
			SITE_DEFAULT_DATERANGE_ALLOCATION	-1~~-1	The default date ranges in allocation. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_AUDIT	0.020833~~0	The default date ranges in audit reporting. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_CUSTORDER	7~~1	The default date ranges in open orders. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_JOURNAL	0.125~~0	The default date ranges in live journals. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_SCHEDULE	7~~0	The default date ranges in load schedules screen. X~~Y: X days before today, Y days after today. -1: blank 
			SITE_DEFAULT_DATERANGE_TRANSACTION	7~~0	The default date ranges in transactions. X~~Y: X days before today, Y days after today. -1: blank 
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( 'Y', 'SITE_AUTO_FILTER_WHEN_OPEN_SCREEN' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_AUTO_FILTER_WHEN_OPEN_SCREEN' );
		}
	}
	
	public function ManageTankLevelAlarms($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_TANK_STATUS_ENFORCEMENT_FLAG	Y	The Tank Status Enforcement flag
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( 'Y', 'SITE_TANK_STATUS_ENFORCEMENT_FLAG' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_TANK_STATUS_ENFORCEMENT_FLAG' );
		}
		
		$value = '0';
		if ( $flag == 'Y' )
		{
			$value = '1';
		}
		/*
		the following column settings are in the file ScreenGridColumnService.php
			$str .= "|1,tank_status";
			$str .= "|1,tank_status_name";
			$str .= "|1,tank_hh_level";
			$str .= "|1,tank_h_level";
			$str .= "|1,tank_l_level";
			$str .= "|1,tank_ll_level";
			$str .= "|1,tank_uh_level";
			$str .= "|1,tank_ul_level";
			$str .= "|1,tank_hh_state";
			$str .= "|1,tank_h_state";
			$str .= "|1,tank_l_state";
			$str .= "|1,tank_ll_state";
			$str .= "|1,tank_uh_state";
			$str .= "|1,tank_ul_state";			
		*/
		$this->updateGridColumn( 'tank_status', $value );
		$this->updateGridColumn( 'tank_status_name', $value );
		$this->updateGridColumn( 'tank_hh_level', $value );
		$this->updateGridColumn( 'tank_h_level', $value );
		$this->updateGridColumn( 'tank_l_level', $value );
		$this->updateGridColumn( 'tank_ll_level', $value );
		$this->updateGridColumn( 'tank_uh_level', $value );
		$this->updateGridColumn( 'tank_ul_level', $value );
		$this->updateGridColumn( 'tank_hh_state', $value );
		$this->updateGridColumn( 'tank_h_state', $value );
		$this->updateGridColumn( 'tank_l_state', $value );
		$this->updateGridColumn( 'tank_ll_state', $value );
		$this->updateGridColumn( 'tank_uh_state', $value );
		$this->updateGridColumn( 'tank_ul_state', $value );
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|fld__tank_status,1";
			$str .= "|fld__tank_levels_states,1";
			$str .= "|fld__tank_hh_level,1";
			$str .= "|fld__tank_h_level,1";
			$str .= "|fld__tank_l_level,1";
			$str .= "|fld__tank_ll_level,1";
			$str .= "|fld__tank_uh_level,1";
			$str .= "|fld__tank_ul_level,1";
		*/
		$this->updateFormField( 'fld__tank_status', $value );
		$this->updateFormField( 'fld__tank_levels_states', $value );
		$this->updateFormField( 'fld__tank_hh_level', $value );
		$this->updateFormField( 'fld__tank_h_level', $value );
		$this->updateFormField( 'fld__tank_l_level', $value );
		$this->updateFormField( 'fld__tank_ll_level', $value );
		$this->updateFormField( 'fld__tank_uh_level', $value );
		$this->updateFormField( 'fld__tank_ul_level', $value );
	}
	
	public function ManageAdditionalHostData($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_CMPT_DOR_NUMBER_EDITABLE	N	The DOR number can be updated in load schedule compartment.
			SITE_DOR_HISTORY_AVAILABLE	Y	Enable the DOR history screen.
			SITE_DOR_NUMBER_EDITABLE	Y	The DOR number can be updated in load schedule screen.
			SITE_DOR_NUMBER_VISIBLE	Y	Show DOR number in load schedule screen.
		*/
		if ( $flag == 'Y' )
		{
			$this->updateSiteConfig( 'Y', 'SITE_CMPT_DOR_NUMBER_EDITABLE' );
			$this->updateSiteConfig( 'Y', 'SITE_DOR_HISTORY_AVAILABLE' );
			$this->updateSiteConfig( 'Y', 'SITE_DOR_NUMBER_EDITABLE' );
			$this->updateSiteConfig( 'Y', 'SITE_DOR_NUMBER_VISIBLE' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_CMPT_DOR_NUMBER_EDITABLE' );
			$this->updateSiteConfig( 'N', 'SITE_DOR_HISTORY_AVAILABLE' );
			$this->updateSiteConfig( 'N', 'SITE_DOR_NUMBER_EDITABLE' );
			$this->updateSiteConfig( 'N', 'SITE_DOR_NUMBER_VISIBLE' );
		}
	}
	
	public function ManageMakeManualTransaction($flag)
	{
		$value = '0';
		if ( $flag == 'Y' )
		{
			$value = '1';
		}
		/*
		the following column settings are in the file ScreenFormButtonService.php
		if ( $screen == "OPEN_ORDER" )
		{
			$str .= "|btnMakeTransaction,1";
		}
		
		if ( $screen == "LOAD_SCHEDULE" )
		{
			$str .= "|btnMakeTransaction,1";
		}
		*/
		$this->replaceFormField( 'btnMakeTransaction', $value );
	}
	
	public function ManageViewDeliveryDetails($flag)
	{
		$value = '0';
		if ( $flag == 'Y' )
		{
			$value = '1';
		}
		/*
		the following column settings are in the file ScreenFormButtonService.php
		if ( $screen == "OPEN_ORDER" )
		{
			$str .= "|viewDeliveryDetails,1";
		}
		
		if ( $screen == "LOAD_SCHEDULE" )
		{
			$str .= "|viewDeliveryDetails,1";
		}
		*/
		$this->replaceFormField( 'viewDeliveryDetails', $value );
	}
	
	
	
	public function updateGridColumn( $column, $value )
	{
		$fname = dirname(__FILE__) . "/ScreenGridColumnService.php";
		
		$txt = file_get_contents( $fname );

		/*
		the following column settings are examples in the file ScreenGridColumnService.php
			$str .= "|1,base_corr_mthd_name";
			$str .= "|1,base_ref_temp_spec_name";
			$str .= "|1,base_limit_preset_ht";
		*/
		$pos = strpos( $txt, ','.$column );
		$newTxt = substr_replace( $txt, $value, $pos-1, 1);
		
		$result = file_put_contents( $fname, $newTxt );
	}
	
	
	public function updateFormField( $field, $value )
	{
		$fname = dirname(__FILE__) . "/ScreenFormButtonService.php";
		
		$txt = file_get_contents( $fname );

		/*
		the following field settings are examples in the file ScreenFormButtonService.php
			$str .= "|fld__base_corr_mthd,1";
			$str .= "|fld__base_ref_temp_spec,1";
			$str .= "|fld__base_limit_preset_ht,1";
		*/
		$pos = strpos( $txt, '|'.$field );
		$newTxt = substr_replace( $txt, $value, $pos+strlen('|'.$field)+1, 1);
		
		$result = file_put_contents( $fname, $newTxt );
	}
	
	
	public function replaceFormField( $field, $value )
	{
		$fname = dirname(__FILE__) . "/ScreenFormButtonService.php";
		
		$txt = file_get_contents( $fname );

		/*
		the following field settings are examples in the file ScreenFormButtonService.php
			$str .= "|fld__base_corr_mthd,1";
			$str .= "|fld__base_ref_temp_spec,1";
			$str .= "|fld__base_limit_preset_ht,1";
		*/
		if ( $value == '1' )
		{
			$search = '|'.$field.',0';
			$replace = '|'.$field.',1';
		}
		else
		{
			$search = '|'.$field.',1';
			$replace = '|'.$field.',0';
		}
		$newTxt = str_replace($search, $replace, $txt);
		
		$result = file_put_contents( $fname, $newTxt );
	}
	
	
	public function updateSiteConfig($config_value, $config_key) 
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("CONFIG_KEY"=>($config_key));
		$excludes = array ("CONFIG_VAL_LAST_CHG"=>0);
		$upd_journal = new UpdateJournalClass( "Site Configuration", "SITE_CONFIG", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// update the configuration
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "UPDATE SITE_CONFIG SET CONFIG_VALUE=:config_value, CONFIG_VAL_LAST_CHG=SYSTIMESTAMP WHERE CONFIG_KEY=:config_key";
		$sql['sql_data'] = array( $config_value, $config_key );
		
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
	
	
	public function getSiteConfig($key='-1', $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from SITE_CONFIG where ('-1'=:config_key or CONFIG_KEY=:config_key ) 
			";
		$sql['sql_data'] = array( $key );
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql, $caseType);

		return($data);
    } 
	
}
?>