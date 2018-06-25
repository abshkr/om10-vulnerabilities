<?php

class GUI_Tankers
{
    public $tnkr_code;
    public $tnkr_name;
    public $tnkr_carrier;
	public $tnkr_carrier_name;
    public $tnkr_owner;
    public $tnkr_owner_name;
    public $tnkr_etp;
	public $tnkr_eqpt_name;
    public $tnkr_base_site;
    public $tnkr_base_site_name;
    public $tnkr_dest_depot;
	public $tnkr_dest_depot_name;
    public $tnkr_last_depot;
    public $tnkr_last_depot_name;
    public $tnkr_cur_depot;
	public $tnkr_cur_depot_name;
    public $tnkr_pin;
    public $tnkr_lock;
    public $tnkr_active;
	public $tnkr_bay_loop_ch;
    public $tnkr_archive;
    public $tnkr_ntrips;
    public $tnkr_own_txt;
    public $tnkr_lic_exp;
	public $tnkr_dglic_exp;
    public $tnkr_ins_exp;
    public $tnkr_stats;
    public $tnkr_last_trip;
	public $tnkr_max_kg;
	public $rn;
	public $remarks;
    public $composition;
}

class TankerComposition
{
    public $etyp_id;
    public $etyp_title;
    public $eqc_sub_item;
    public $equip_isleaf;
    public $etyp_schedul;
    public $idx;
    public $compartments;
    public $sub_item_sched_type;
    public $etyp_isrigid;
    public $sub_item_etyp_isrigid;
    public $eqc_sub_item_title;
	public $equip_list;
	public $equipment;
}

class TankersLookup
{
    public $tnkr_code;
    public $equipment_name;
    public $carrier_name;
}

class TerminalLookup
{
    public $term_code;
    public $term_name;
    public $term_desc;
}
