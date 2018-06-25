<?php

class ScreenFormButtonService
{
	
	public function __construct()
	{
	}

    public function lookupFormButtonSettings($screen)
	{
		$str = "";
		
		if ( $screen == "OPEN_ORDER" )
		{
			// need tutn on when manual transaction creation is enabled
			$str .= "|btnMakeTransaction,1";
			
			// need tutn on when delivery details related features are enabled
			$str .= "|viewDeliveryDetails,1";
		}
		
		if ( $screen == "LOAD_SCHEDULE" )
		{
			// need tutn on when manual transaction creation is enabled
			$str .= "|btnMakeTransaction,1";
			
			// need tutn on when delivery details related features are enabled
			$str .= "|viewDeliveryDetails,1";
		}
		
		if ( $screen == "ONSITE_REPORT" )
		{
			// need tutn on when batch import of personnel is enabled
			$str .= "|batchPsnl,0";
			
			// need tutn on when batch import of equipment is enabled
			$str .= "|batchEqpt,0";
			
			// need tutn on when batch import of tankers is enabled
			$str .= "|batchTnkr,0";
		}
		
		if ( $screen == "DRAWER_PRODUCTS" )
		{
			// need tutn on when dangerous goods management is enabled
			$str .= "|btnProdDGLink,0";
			$str .= "|prod_dglink,0";
		}
		
		if ( $screen == "TANK_STATUS" )
		{
			// need tutn on when strapping data management is enabled
			$str .= "|btn_tankstrap,1";
			$str .= "|btn_recalcLevel,1";
			
			// need tutn on when API/std density management is enabled
			$str .= "|btn_recalcDensity,1";
			$str .= "|fld__tank_15_density,1";
			$str .= "|fld__tank_api,1";
			
			// need tutn on when volume calculation is enabled
			$str .= "|btn_recalcVolume,1";
			
			// need tutn on when coefficient of expansion management is enabled
			$str .= "|fld__tank_prod_c_of_e,1";
			
			// need tutn on when ullage field is enabled
			$str .= "|fld__tank_ullage,1";
			
			// need tutn on when sulphur/flashpoint management is enabled
			$str .= "|fld__tank_sulphur,1";
			$str .= "|fld__tank_flashpoint,1";
			$str .= "|fld__tank_sulphur__tank_flashpoint,1";
			
			// need tutn on when status and level alarms management is enabled
			$str .= "|fld__tank_status,1";
			$str .= "|fld__tank_levels_states,1";
			$str .= "|fld__tank_hh_level,1";
			$str .= "|fld__tank_h_level,1";
			$str .= "|fld__tank_l_level,1";
			$str .= "|fld__tank_ll_level,1";
			$str .= "|fld__tank_uh_level,1";
			$str .= "|fld__tank_ul_level,1";
		}
		
		if ( $screen == "BASE_PRODUCTS" )
		{
			// need turn on when bitumen related features are enabled
			$str .= "|fld__base_ref_temp,1";
			$str .= "|fld__base_ref_tunt,1";
			$str .= "|fld__base_corr_mthd,1";
			$str .= "|fld__base_ref_temp_spec,1";
			$str .= "|fld__base_limit_preset_ht,1";
			
			// need turn on when density range is enabled
			$str .= "|fld__base_dens_lo,1";
			$str .= "|fld__base_dens_hi,1";
			$str .= "|fld__base_dens_lo__base_dens_hi,1";
			
			// need turn on when color is enabled
			$str .= "|fld__base_color,1";
		}
		
        return $str;
    }
	
	public function getScreenFieldStatus($screen, $field)
	{
		$str = $this->lookupFormButtonSettings($screen);
		if ($str == "" )
		{
			return 0;
		}
		
		$cfgs = explode ("|", $str);
		$status = 0;
		foreach ( $cfgs as $cfg )
		{
			$values = explode (",", $cfg);
			if ( count($values) >= 2 )
			{
				if ( $values[0] == $field && $values[1] == '1' )
				{
					$status = 1;
					break;
				}
				if ( $values[0] == $field && $values[1] == '0' )
				{
					$status = -1;
					break;
				}
			}
		}
		return $status;
	}
}
?>