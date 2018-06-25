<?php

class ScreenGridColumnService
{
	
	public function __construct()
	{
	}

    public function lookupGridColumnSequence($screen)
	{
		$str = "";
		if ( $screen == "OPEN_ORDER" )
		{
			$str .= "|1,order_sys_no";
			$str .= "|0,order_supp_code";
			$str .= "|1,order_supp_name";
			$str .= "|0,order_cust_acnt";
			$str .= "|0,order_cust_code";
			$str .= "|1,order_cust_name";
			$str .= "|1,order_cust_no";
			$str .= "|0,order_ttyp_id";
			$str .= "|0,order_ttyp_name";
			$str .= "|0,order_stat_id";
			$str .= "|1,order_stat_name";
			$str .= "|1,order_ord_time,DateTimeRenderer";
			$str .= "|1,order_exp_time,DateTimeRenderer";
			$str .= "|1,order_last_change";
			$str .= "|0,order_styp_id";
			$str .= "|0,order_styp_name";
			$str .= "|0,order_dloc_code";
			$str .= "|1,order_dloc_name";
			$str .= "|1,order_ref_code";
			$str .= "|1,order_dlv_time,DateTimeRenderer";
			$str .= "|0,order_dtrm_code";
			$str .= "|0,order_dtrm_name";
			$str .= "|0,order_drwr_code";
			$str .= "|1,order_drwr_name";
			$str .= "|0,order_carr_code";
			$str .= "|1,order_carr_name";
			$str .= "|1,order_approved";
			$str .= "|0,order_inv_no";
			$str .= "|0,order_total";
			$str .= "|0,order_limit";
			$str .= "|0,order_app_no";
			$str .= "|0,order_app_time";
			$str .= "|0,order_trsf_type";
			$str .= "|0,order_price_printed";
			$str .= "|0,order_strm_code";
			$str .= "|0,order_strm_name";
			$str .= "|0,order_pay_note"; 
			$str .= "|0,order_psnl_code";
			$str .= "|1,order_psnl_name";
			$str .= "|1,order_sold_to_num";
			$str .= "|1,order_ship_to_num";
			$str .= "|0,order_src_id";
			$str .= "|0,order_src_name";
			$str .= "|0,order_items";
		}
		
		if ( $screen == "ID_ASSIGNMENT" )
		{
			$str .= "|1,kya_key_no";
			$str .= "|0,kya_key_issuer";
			$str .= "|1,kya_issuer_name";
			$str .= "|0,kya_type";
			$str .= "|1,kya_type_name";
			$str .= "|0,kya_phys_type";
			$str .= "|1,kya_phys_name";
			$str .= "|1,kya_timecode"; 
			$str .= "|1,kya_lock";
			$str .= "|1,kya_adhoc";
			$str .= "|1,kya_txt";
			$str .= "|0,kya_key_created";
			$str .= "|0,kya_pin";
			$str .= "|0,kya_pin_changed";
			$str .= "|0,kya_personnel";
			$str .= "|1,kya_psnl_name";
			$str .= "|0,kya_psnl_cmpy";
			$str .= "|0,kya_psnl_cmpy_name";
			$str .= "|0,kya_role";
			$str .= "|1,kya_role_name";
			$str .= "|0,kya_drawer";
			$str .= "|1,kya_draw_name";
			$str .= "|0,kya_supplier";
			$str .= "|1,kya_supp_name";
			$str .= "|1,kya_tanker";
			$str .= "|1,kya_tnkr_name";
			$str .= "|0,kya_tnkr_desc";
			$str .= "|0,kya_tnkr_cmpy";
			$str .= "|0,kya_tnkr_cmpy_name";
			$str .= "|0,kya_equipment";
			$str .= "|0,kya_eqpt_name";
			$str .= "|1,kya_eqpt_desc";
			$str .= "|0,kya_eqpt_cmpy";
			$str .= "|0,kya_eqpt_cmpy_name";
			$str .= "|0,kya_etyp_name";
			$str .= "|0,kya_load_site";
			$str .= "|0,kya_site_name";
			$str .= "|0,kya_load_id";
			$str .= "|0,kya_trip_no";
			$str .= "|0,kya_alloc_type";
			$str .= "|0,kya_alloc_type_name";
			$str .= "|0,kya_alloc_cmpy";
			$str .= "|0,kya_alloc_cmpy_name";
			$str .= "|0,kya_order_no";
			$str .= "|0,kya_order_desc";
			$str .= "|0,kya_cust_ordno";
			$str .= "|0,kya_cust_name"; 
		}
		
		if ( $screen == "TANKER_LIST" )
		{
			$str .= "|1,tnkr_code";
			$str .= "|1,tnkr_name";
			$str .= "|0,tnkr_carrier";
			$str .= "|1,tnkr_carrier_name";
			$str .= "|0,tnkr_owner";
			$str .= "|1,tnkr_owner_name";
			$str .= "|0,tnkr_etp";
			$str .= "|1,tnkr_eqpt_name";
			$str .= "|0,tnkr_base_site";
			$str .= "|1,tnkr_base_site_name";
			$str .= "|0,tnkr_dest_depot";
			$str .= "|0,tnkr_dest_depot_name";
			$str .= "|0,tnkr_last_depot";
			$str .= "|0,tnkr_last_depot_name";
			$str .= "|0,tnkr_cur_depot";
			$str .= "|0,tnkr_cur_depot_name";
			$str .= "|1,tnkr_lock";
			$str .= "|1,tnkr_active";
			$str .= "|1,tnkr_bay_loop_ch";
			$str .= "|1,tnkr_archive";
			$str .= "|1,tnkr_lic_exp";
			$str .= "|1,tnkr_dglic_exp"; 
			$str .= "|1,tnkr_ins_exp";
		}
		
		if ( $screen == "EQUIPMENT_LIST" )
		{
			$str .= "|1,eqpt_id";
			$str .= "|1,eqpt_code";
			$str .= "|1,eqpt_title";
			$str .= "|1,eqpt_tanker";
			$str .= "|0,eqpt_owner";
			$str .= "|1,eqpt_owner_name";
			$str .= "|0,eqpt_etp";
			$str .= "|1,eqpt_etp_title";
			$str .= "|1,eqpt_lock";
			$str .= "|0,eqpt_load_type";
			$str .= "|1,eqpt_load_type_name";
			$str .= "|1,eqpt_exp_d1_dmy";
			$str .= "|1,eqpt_exp_d2_dmy";
			$str .= "|1,eqpt_exp_d3_dmy";
			$str .= "|1,eqp_must_tare_in";
			$str .= "|0,eqpt_area";
			$str .= "|0,eqpt_area_name";
			$str .= "|0,eqpt_max_gross";
			$str .= "|0,eqpt_empty_kg";
		}
		
		if ( $screen == "TRANSACTION_LIST" )
		{
			$str .= "|1,trsa_bay_cd";
			$str .= "|1,trsa_id";
			$str .= "|1,trsa_trip";
			$str .= "|1,load_id";
			$str .= "|1,trsa_tanker";
			$str .= "|1,trsa_per_name";
			$str .= "|1,trsa_st_dmy";
			$str .= "|1,trsa_ed_dmy";
			$str .= "|1,trsa_terminal";
			$str .= "|1,trsa_psn";
			$str .= "|1,trsa_crt_dmy";
			$str .= "|0,trsa_reverse_flag";
			$str .= "|0,trsa_reverse";
			$str .= "|0,trsa_supplier";
			$str .= "|0,trsa_carrier";
			$str .= "|0,trsa_drawer";
		}
		if ( $screen == "TRANSFER_LIST" )
		{
			$str .= "|1,trsf_id";
			$str .= "|1,baa_bay_seq";
			$str .= "|1,eqpt_code";
			$str .= "|1,prod_name";
			$str .= "|1,trsf_qty_amb";
			$str .= "|1,trsf_qty_cor";
			$str .= "|1,trsf_load_kg";
			$str .= "|1,trsf_density";
			$str .= "|1,trsf_temp";
			$str .= "|1,trsf_api";
			$str .= "|1,trsf_temp_f";
		}
		if ( $screen == "TRANBASE_LIST" )
		{
			$str .= "|1,BASE_CODE";
			$str .= "|1,BASE_NAME";
			$str .= "|1,TRSB_TK_TANKCODE";
			$str .= "|1,TRSB_AVL";
			$str .= "|1,TRSB_CVL";
			$str .= "|1,TRSB_KG";
			$str .= "|1,TRSB_DNS";
			$str .= "|1,TRSB_TMP";
			$str .= "|1,TRSB_API";
			$str .= "|1,TRSB_TMP_F";
		}
		
		if ( $screen == "PERSONNEL" )
		{
			$str .= "|1,per_code";
			$str .= "|1,per_name";
			$str .= "|1,per_cmpy";
			$str .= "|1,cmpy_name";
			$str .= "|1,per_auth";
			$str .= "|1,per_licence_no";
			$str .= "|1,per_exp_d1_dmy";
			$str .= "|1,per_exp_d2_dmy";
			$str .= "|1,per_exp_d3_dmy";
			$str .= "|1,per_lock";
			$str .= "|1,user_status_flag";
			$str .= "|1,per_department";
			$str .= "|0,per_last_dmy";
			$str .= "|0,per_terminal";
			$str .= "|0,user_login_count";
		}
		
		if ( $screen == "LOAD_SCHEDULE" )	// not used yet
		{
			$str .= "|1,shls_srctype";
			$str .= "|1,shls_trip_no";
			$str .= "|1,shls_trip_no_org";
			$str .= "|1,shls_caldate";
			$str .= "|1,shls_status";
			$str .= "|1,carrier_code";
			$str .= "|1,carrier";
			$str .= "|1,tnkr_code";
			$str .= "|0,tnkr_name";
			$str .= "|1,supplier_code";
			$str .= "|1,supplier";
			$str .= "|1,order_cust_ordno";
			$str .= "|1,order_cust_cmpy_code";
			$str .= "|1,order_cust_cmpy_name";
			$str .= "|1,shls_ld_start";
			$str .= "|1,shls_ld_end";
			$str .= "|1,shls_ld_type";
			$str .= "|1,shls_exp2";
			$str .= "|1,load_reverse_flag";
			$str .= "|1,load_archive_flag";				//was load_reverse_flag
			$str .= "|1,shls_supp_org";
			$str .= "|1,shlsload_load_id";
			$str .= "|1,operator";
			$str .= "|1,last_chg_time";
			$str .= "|1,shls_sold_to_num";
			$str .= "|1,shls_ship_to_num";
		}
		
		if ( $screen == "ALLOCATION" )
		{
			$str .= "|1,alloc_type";
			$str .= "|1,alloc_typename";
			$str .= "|1,alloc_cmpycode";
			$str .= "|1,alloc_cmpyname";
			$str .= "|1,alloc_suppcode";
			$str .= "|1,alloc_suppname";
			$str .= "|1,alloc_lock";
			$str .= "|1,alloc_lockname";
			$str .= "|1,alloc_period";
			$str .= "|1,alloc_periodname";
			$str .= "|1,alloc_datetime";
		}
		
		if ( $screen == "AUDITING" )
		{
			$str .= "|1,audit_datetime";
			$str .= "|1,audit_record_key";
			$str .= "|0,audit_action_id";
			$str .= "|1,audit_action_name";
			$str .= "|0,audit_category_id";
			$str .= "|1,audit_category_name";
			$str .= "|0,audit_batch_key";
			$str .= "|0,audit_table_acc_seq";
			$str .= "|0,audit_table_acc_time";
			$str .= "|1,audit_description";
			$str .= "|1,audit_value_before";
			$str .= "|1,audit_value_after";
			$str .= "|1,audit_user_code";
			$str .= "|1,audit_user_name";
			$str .= "|1,audit_cmpy_code";
			$str .= "|1,audit_cmpy_name";
			$str .= "|1,audit_ip";
			$str .= "|0,audit_session_id";
			$str .= "|0,audit_osuser";
			$str .= "|0,audit_machine";
			$str .= "|0,audit_program";
			$str .= "|1,audit_column";
			$str .= "|1,audit_table";
			$str .= "|1,audit_pkeys";
		}
		
		if ( $screen == "TANK_STATUS" )
		{
			$str .= "|1,tank_atg_status";
			$str .= "|1,tank_active";
			$str .= "|1,tank_code";
			$str .= "|1,tank_name";
			$str .= "|0,tank_terminal";
			$str .= "|1,tank_sitename";
			$str .= "|1,tank_base";
			$str .= "|1,tank_base_name";
			$str .= "|0,tank_base_group";
			$str .= "|0,tank_base_class";
			$str .= "|1,tank_bclass_name";
			$str .= "|0,tank_base_tunit";
			$str .= "|0,tank_base_rpttemp";
			$str .= "|0,tank_bclass_dens_lo";
			$str .= "|0,tank_bclass_dens_hi";
			$str .= "|0,tank_bclass_vcf_alg";
			$str .= "|0,tank_bclass_temp_lo";
			$str .= "|0,tank_bclass_temp_hi";
			$str .= "|0,tank_drv_type";
			$str .= "|0,tank_drv_aux";
			$str .= "|0,tank_identifier";
			$str .= "|1,tank_location";
			$str .= "|0,tank_outflow_ope";
			$str .= "|0,tank_inflow_open";
			$str .= "|0,tank_adhoc_ivrq";
			$str .= "|0,tank_inv_needed";
			$str .= "|0,tank_dipping_on";
			$str .= "|0,tank_leakdtct_on";
			$str .= "|0,tank_alarmed";
			$str .= "|0,tank_poll_gap";
			$str .= "|1,tank_prod_lvl";
			$str .= "|0,tank_address";
			$str .= "|0,tank_rcpts";
			$str .= "|0,tank_trfs";
			$str .= "|0,tank_no_sbt";
			$str .= "|0,tank_versno";
			$str .= "|0,tank_pakscan_act";
			$str .= "|0,tank_alarm_state";
			$str .= "|0,tank_lvl_alarm";
			$str .= "|1,tank_lvlalarm_desc";
			$str .= "|0,tank_gaugingmthd";
			$str .= "|1,tank_gaugingmthd_desc";
			$str .= "|0,tank_instance";
			$str .= "|0,tank_channel";
			$str .= "|0,tank_sbt_ty";
			$str .= "|0,tank_eth_content";
			$str .= "|0,tank_ltr_close";
			$str .= "|0,tank_kg_close";
			$str .= "|0,tank_close_dens";
			$str .= "|0,tank_rptvcfclose";
			$str .= "|0,tank_inflow_rate";
			$str .= "|0,tank_spare_fld1";
			$str .= "|0,tank_spare_fld2";
			$str .= "|0,tank_rcpt_vol";
			$str .= "|0,tank_trf_vol";
			$str .= "|0,tank_rcpt_kg";
			$str .= "|0,tank_trf_kg";
			$str .= "|0,tank_pump_vol";
			$str .= "|0,tank_res";
			$str .= "|1,tank_amb_vol";
			$str .= "|1,tank_cor_vol";
			$str .= "|0,tank_vapour_kg";
			$str .= "|1,tank_liquid_kg";
			$str .= "|0,tank_water";
			$str .= "|0,tank_water_lvl";
			$str .= "|1,tank_ullage";
			$str .= "|0,tank_prod_c_of_e";
			$str .= "|0,tank_60_86_vcf";
			$str .= "|1,tank_density";
			
			// need tutn on when API/std density management is enabled
			$str .= "|1,tank_15_density";
			$str .= "|1,tank_api";
			
			$str .= "|1,tank_temp";
			$str .= "|0,tank_rptvcf";
			$str .= "|0,tank_amb_density";
			$str .= "|0,tank_tol_vol";
			$str .= "|0,tank_tol_percent";
			$str .= "|0,tank_dtol_volume";
			$str .= "|0,tank_dtol_percent";
			$str .= "|0,tank_mtol_volume";
			$str .= "|0,tank_mtol_percent";
			$str .= "|1,tank_group";
			$str .= "|0,tank_date";
			$str .= "|1,tank_atg_manchg,DateTimeRenderer";
			$str .= "|0,tank_base_ref_temp";
			$str .= "|0,tank_base_ref_tunt";
			$str .= "|0,tank_base_corr_mthd";
			$str .= "|0,tank_base_ref_temp_spec";
			$str .= "|0,tank_base_limit_preset_ht";
			
			// need tutn on when sulphur/flashpoint management is enabled
			$str .= "|1,tank_sulphur";
			$str .= "|1,tank_flashpoint";
			
			// need tutn on when status and level alarms management is enabled
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
		}
		
		if ( $screen == "BASE_PRODUCTS" )
		{
			$str .= "|1,base_code";
			$str .= "|1,base_name";
			
			// need turn on when color is enabled
			$str .= "|1,base_color";
			
			$str .= "|1,base_cat";
			$str .= "|1,base_class_desc";
			$str .= "|1,base_prod_group";
			$str .= "|1,base_group_name";
			$str .= "|0,base_rpt_tunt";
			$str .= "|0,base_rpt_temp";
			
			// need turn on when density range is enabled
			$str .= "|1,base_dens_lo";
			$str .= "|1,base_dens_hi";
			
			$str .= "|1,base_adtv";
			$str .= "|0,base_text";
			$str .= "|0,base_desc";
			$str .= "|1,base_tank_count";
			$str .= "|1,base_tank_list";
			$str .= "|1,base_class_dens_lo";
			$str .= "|1,base_class_dens_hi";
			$str .= "|0,base_class_vcf_alg";
			$str .= "|1,base_class_temp_lo";
			$str .= "|1,base_class_temp_hi";
			
			// need turn on when bitumen related features are enabled
			$str .= "|0,base_ref_temp";
			$str .= "|0,base_ref_tunt";
			$str .= "|0,base_ref_tunt_name";
			$str .= "|0,base_corr_mthd";
			$str .= "|1,base_corr_mthd_name";
			$str .= "|0,base_ref_temp_spec";
			$str .= "|1,base_ref_temp_spec_name";
			$str .= "|1,base_limit_preset_ht";
		}

        return $str;
    }
	
	
}
?>