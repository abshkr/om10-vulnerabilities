<?php

class EQUIP_TYPES_VW
{
    public $etyp_id;
    public $etyp_class;
    public $etyp_n_items;
    public $etyp_title;
    public $etyp_schedul;
    public $etyp_is_drumfill;
    public $etyp_max_gross;
    public $etyp_isrigid;
    public $cmptnu;
	public $rn;
    public $composition;
}


class Composition
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
}

class Compartment
{
    public $cmpt_etyp;
    public $cmpt_no;
    public $cmpt_units;
    public $cmpt_capacit;
	public $cmpt_n_seals;
    public $unit;
    public $etyp_title;
    public $seq;
    public $schedule;
    public $product_name;
    public $product_code;
    public $prev_product_name;
    public $prev_product_code;
	public $qty_preload;
    public $order_id;
	public $schd_deliv_num;
	public $schd_sold_to_num;
	public $schd_ship_to_num;
}

class UnitsLookup
{
    public $unit_id;
    public $description;
}

class EqptypeLookup
{
    public $etyp_id;
    public $etyp_title;
}


class EqptTypeLookupByFilter
{
    public $etyp_id;
    public $etyp_title;
	public $etyp_class;
	public $etyp_cmpts;
}

