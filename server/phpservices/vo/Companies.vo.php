<?php

class Companys
{
    public $cmpy_code;
    public $cmpy_name;
	public $cmpy_plant;
    public $cmpy_type;
    public $cmpy_aoi;
	public $site_manager;
	public $supplier;
	public $carrier;
	public $customer;
	public $drawer;
	public $issuer;
	public $employer;
    public $host;
    public $cmpy_compress_bl;     
    public $cmpy_check_licen;     
    public $cmpy_ldgo_delta; 
    public $cmpy_msg;
    public $cmpy_vet;
    public $cmpy_tkr_cfg;
    public $cmpy_enable_expd;
    public $cmpy_seal_number;
    public $cmpy_exp_cpde;
    public $cmpy_isse;
    public $cmpy_auto_ld;
    public $cmpy_rtn_prompt;
    public $cmpy_add_prompt;
    public $cmpy_log_ld_del;
    public $cmpy_host_docs;
	public $cmpy_host;
    public $cmpy_comms_ok;
    public $cmpy_tkr_activat;
    public $cmpy_bol_vp_name;
    public $cmpy_ld_rep_vp;
    public $cmpy_drv_inst_vp;
    public $cmpy_wgh_complet;
    public $cmpy_wgh_auto_fl;
    public $cmpy_trip_strt;
    public $cmpy_trip_end;
    public $cmpy_trip_last;
    public $cmpy_ord_carrier;
    public $cmpy_wipe_ordets;
    public $cmpy_flag_1;
    public $cmpy_flag_2;
    public $cmpy_flag_3;
    public $cmpy_rpt_t_unit;
    public $cmpy_rpt_temp;
    public $cmpy_auto_reconc;
    public $cmpy_bay_loop_ch;
    public $cmpy_ord_strt;
    public $cmpy_ord_end;
    public $cmpy_ord_last;
    public $cmpy_mod_drawer;
    public $cmpy_must_sealno;
	public $cmpy_req_pin_flag;
	public $cmpy_ldtol_flag;
	public $cmpy_bltol_flag;
	public $cmpy_schd_rev_repost;
	public $cmpy_schd_archive;
	public $cmpy_movements_rev;
    public $cmpy_report_receivers;
    public $cmpy_permit_no;
}

class CompanyLookup
{
    public $cmpy_code;
    public $cmpy_name;
}

class PrintersLookup
{
    public $cmpy;
	public $prntr;
	public $cmpy_bol_vp_name;
	public $cmpy_ld_rep_vp;
	public $cmpy_drv_inst_vp;
	public $usage;
}

class CompanyTypeLookup
{
	public $company_id;
	public $company_name;
}
