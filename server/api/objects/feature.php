<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/role_service.php';
include_once 'common_class.php';

class Feature extends CommonClass
{
    protected $TABLE_NAME = 'DUMMY';
    
    public function read()
    {
        $file = null;
        if (file_exists("../../config/FeatureSettings.json")) {
            $file = "../../config/FeatureSettings.json";
        } else {
            $file = "../../config/FeatureSettings.default";
        }
        $feature_array = json_decode(file_get_contents($file));
        foreach ($feature_array as $item) {
            foreach ($item as $key => $value) {
                if ($key === "feature_gui" || $key === "feature_flag") {
                    if ($value === "Y" || $value === true) {
                        $item->$key = true;
                    } else {
                        $item->$key = false;
                    }
                }
            }
        }
        $result = array();
        $result["records"] = $feature_array;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function save()
    {
        $fp = fopen('../../config/FeatureSettings.json', 'w');
        fwrite($fp, json_encode($this->data, JSON_PRETTY_PRINT));
        fclose($fp);

        // adjust the features and related settings in SITE_CONFIG;
        foreach( $this->data as $item )
        {
            $funcName = $item->feature_func;
            $this->$funcName( $item->feature_flag );
        }

        $error = new EchoSchema(200, response("__SAVE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

	
	
	public function ManageBaseProductDensityRange($flag)
	{
		$value = '0';
		if ( $flag == 'Y' || $flag == true )
		{
			$value = '1';
        }
        /* The following are steps required in V9, now integrated into pages */
		/*
		the following column settings are in the file ScreenGridColumnService.php
			$str .= "|1,base_dens_lo";
			$str .= "|1,base_dens_hi";
		*/
		// $this->updateGridColumn( 'base_dens_lo', $value );
		// $this->updateGridColumn( 'base_dens_hi', $value );
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|fld__base_dens_lo,1";
			$str .= "|fld__base_dens_hi,1";
			$str .= "|fld__base_dens_lo__base_dens_hi,1";
		*/
		// $this->updateFormField( 'fld__base_dens_lo', $value );
		// $this->updateFormField( 'fld__base_dens_hi', $value );
		// $this->updateFormField( 'fld__base_dens_lo__base_dens_hi', $value );
	}
	
	public function ManageDCS($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_EXTERNAL_BLENDING_ALLOWED	Y	Determine whether it is requred to determine base product quantities based on recipes when blending is performed externally.
		*/
		if ( $flag == 'Y' || $flag == true )
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
		if ( $flag == 'Y' || $flag == true )
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
		if ( $flag == 'Y' || $flag == true )
		{
			$value = '1';
		}
        /* The following are steps required in V9, now integrated into pages */
		/*
		the following column settings are in the file ScreenGridColumnService.php
			$str .= "|1,base_corr_mthd_name";
			$str .= "|1,base_ref_temp_spec_name";
			$str .= "|1,base_limit_preset_ht";
		*/
		// $this->updateGridColumn( 'base_corr_mthd_name', $value );
		// $this->updateGridColumn( 'base_ref_temp_spec_name', $value );
		// $this->updateGridColumn( 'base_limit_preset_ht', $value );
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|fld__base_corr_mthd,1";
			$str .= "|fld__base_ref_temp_spec,1";
			$str .= "|fld__base_limit_preset_ht,1";
		*/
		// $this->updateFormField( 'fld__base_corr_mthd', $value );
		// $this->updateFormField( 'fld__base_ref_temp_spec', $value );
		// $this->updateFormField( 'fld__base_limit_preset_ht', $value );
	}
	
	public function ManageAPI($flag)
	{
		$value = '0';
		if ( $flag == 'Y' || $flag == true )
		{
			$value = '1';
		}
        /* The following are steps required in V9, now integrated into pages */
		/*
		the following column settings are in the file ScreenGridColumnService.php
			$str .= "|1,trsf_api";
			$str .= "|1,trsf_temp_f";
			$str .= "|1,TRSB_API";
			$str .= "|1,TRSB_TMP_F";
			$str .= "|1,tank_15_density";
			$str .= "|1,tank_api";
		*/
		// $this->updateGridColumn( 'trsf_api', $value );
		// $this->updateGridColumn( 'trsf_temp_f', $value );
		// $this->updateGridColumn( 'TRSB_API', $value );
		// $this->updateGridColumn( 'TRSB_TMP_F', $value );
		// $this->updateGridColumn( 'tank_15_density', $value );
		// $this->updateGridColumn( 'tank_api', $value );
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|btn_recalcDensity,1";
			$str .= "|fld__tank_15_density,1";
			$str .= "|fld__tank_api,1";
		*/
		// $this->updateFormField( 'btn_recalcDensity', $value );
		// $this->updateFormField( 'fld__tank_15_density', $value );
		// $this->updateFormField( 'fld__tank_api', $value );
	}
	
	public function ManageTankStrapping($flag)
	{
		$value = '0';
		if ( $flag == 'Y' || $flag == true )
		{
			$value = '1';
		}
        /* The following are steps required in V9, now integrated into pages */
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|btn_tankstrap,1";
			$str .= "|btn_recalcLevel,1";
		*/
		// $this->updateFormField( 'btn_tankstrap', $value );
		// $this->updateFormField( 'btn_tankstrap', $value );
	}
	
	public function ManageDangerousGoods($flag)
	{
		$value = '0';
		if ( $flag == 'Y' || $flag == true )
		{
			$value = '1';
		}
        /* The following are steps required in V9, now integrated into pages */
		/*
		the following column settings are in the file ScreenFormButtonService.php
			$str .= "|btnProdDGLink,0";
			$str .= "|prod_dglink,0";
		*/
		// $this->updateFormField( 'btnProdDGLink', $value );
		// $this->updateFormField( 'prod_dglink', $value );
	}
	
	public function ManageCompanyRelations($flag)
	{
		/*
		the following configuration items are in table SITE_CONFIG
			SITE_COMPANY_RELATION_ALLOWED	Y	Determine whether the Company Relation screen is enabled.		
			SITE_COMPANY_RELATION_CHILD_ROLES	2,6	The default child company roles available to choose		
			SITE_COMPANY_RELATION_PARENT_ROLES	1	The default parent company roles available to choose		
		*/
		if ( $flag == 'Y' || $flag == true )
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
		if ( $flag == 'Y' || $flag == true )
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
		if ( $flag == 'Y' || $flag == true )
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
		if ( $flag == 'Y' || $flag == true )
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
		if ( $flag == 'Y' || $flag == true )
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
		if ( $flag == 'Y' || $flag == true )
		{
			$this->updateSiteConfig( 'Y', 'SITE_TANK_STATUS_ENFORCEMENT_FLAG' );
		}
		else
		{
			$this->updateSiteConfig( 'N', 'SITE_TANK_STATUS_ENFORCEMENT_FLAG' );
		}
		
		$value = '0';
		if ( $flag == 'Y' || $flag == true )
		{
			$value = '1';
		}
        /* The following are steps required in V9, now integrated into pages */
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
		// $this->updateGridColumn( 'tank_status', $value );
		// $this->updateGridColumn( 'tank_status_name', $value );
		// $this->updateGridColumn( 'tank_hh_level', $value );
		// $this->updateGridColumn( 'tank_h_level', $value );
		// $this->updateGridColumn( 'tank_l_level', $value );
		// $this->updateGridColumn( 'tank_ll_level', $value );
		// $this->updateGridColumn( 'tank_uh_level', $value );
		// $this->updateGridColumn( 'tank_ul_level', $value );
		// $this->updateGridColumn( 'tank_hh_state', $value );
		// $this->updateGridColumn( 'tank_h_state', $value );
		// $this->updateGridColumn( 'tank_l_state', $value );
		// $this->updateGridColumn( 'tank_ll_state', $value );
		// $this->updateGridColumn( 'tank_uh_state', $value );
		// $this->updateGridColumn( 'tank_ul_state', $value );
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
		// $this->updateFormField( 'fld__tank_status', $value );
		// $this->updateFormField( 'fld__tank_levels_states', $value );
		// $this->updateFormField( 'fld__tank_hh_level', $value );
		// $this->updateFormField( 'fld__tank_h_level', $value );
		// $this->updateFormField( 'fld__tank_l_level', $value );
		// $this->updateFormField( 'fld__tank_ll_level', $value );
		// $this->updateFormField( 'fld__tank_uh_level', $value );
		// $this->updateFormField( 'fld__tank_ul_level', $value );
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
		if ( $flag == 'Y' || $flag == true )
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
		if ( $flag == 'Y' || $flag == true )
		{
			$value = '1';
		}
        /* The following are steps required in V9, now integrated into pages */
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
		// $this->replaceFormField( 'btnMakeTransaction', $value );
	}
	
	public function ManageViewDeliveryDetails($flag)
	{
		$value = '0';
		if ( $flag == 'Y' || $flag == true )
		{
			$value = '1';
		}
        /* The following are steps required in V9, now integrated into pages */
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
		// $this->replaceFormField( 'viewDeliveryDetails', $value );
	}
	
	
	
    public function updateSiteConfig($config_value, $config_key) 
    {
        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $query = "
            SELECT * FROM SITE_CONFIG WHERE CONFIG_KEY = :config_key
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':config_key', $config_key);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } 

        $old_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($old_row === FALSE) {
            return false;
        }
        $old_value = $old_row['CONFIG_VALUE'];

        $query = "
            UPDATE SITE_CONFIG SET 
                CONFIG_VALUE=:config_value, 
                CONFIG_VAL_LAST_CHG=SYSTIMESTAMP 
            WHERE CONFIG_KEY=:config_key
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':config_value', $config_value);
        oci_bind_by_name($stmt, ':config_key', $config_key);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            
            $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return false;
        }

        if ($old_value != $config_value) {
            $journal = new Journal($this->conn, false);
            $curr_psn = Utilities::getCurrPsn();
            $module = 'SITE_CONFIG';
            $record = $config_key;
            if (!$journal->valueChange(
                $module, $record, 'Config Value', $old_value, $config_value)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        oci_commit($this->conn);
        return true;
    }


}