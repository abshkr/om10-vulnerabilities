<?php

class Gui_Equipment_List
{
	public $eqpt_id;
	public $eqpt_code;
	public $eqpt_title;
	public $eqpt_tanker;
	public $eqpt_owner;
	public $eqpt_owner_name;
	public $eqpt_etp;
	public $eqpt_etp_title;
	public $eqpt_exp_d1_dmy;
	public $eqpt_exp_d2_dmy;
	public $eqpt_exp_d3_dmy;
	public $eqpt_lock;
	public $eqpt_empty_kg;
	public $eqp_must_tare_in;
	public $eqpt_max_gross;
	public $eqpt_comments;
	public $eqpt_area;
	public $eqpt_area_name;
	public $eqpt_load_type;
	public $eqpt_load_type_name;
	public $etyp_category;
	public $rn;
	public $composition;
	public $eqpt_last_modified;
	public $eqpt_last_used;
}

class EquipmentComposition
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

class EquipmentStructure
{
	public $eqpt_id;
	public $eqpt_code;
	public $eqpt_title;
	public $eqpt_name;
	public $eqpt_owner;
	public $eqpt_owner_name;
	public $eqpt_etp;
	public $eqpt_etp_title;
	public $eqpt_lock;
	public $compartments;
}

class EquipmentCompartment
{
	public $eqpt_id;
	public $eqpt_code;
	public $etyp_id;
	public $etyp_title;
	public $cmpt_no;
	public $cmpt_capacit;
	public $unit_id;
	public $unit_title;
	public $adj_amnt;
	public $adj_capacity;
	public $adj_safefill;
	public $adj_cmpt_lock;
}
