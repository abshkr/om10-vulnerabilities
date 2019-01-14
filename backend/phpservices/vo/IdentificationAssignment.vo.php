<?php

class GUI_AccessKeys
{
	public $kya_key_no;
	public $kya_key_issuer;
	public $kya_issuer_name;
	public $kya_type;
	public $kya_type_name;
	public $kya_phys_type;
	public $kya_phys_name;
	public $kya_timecode;
	public $kya_lock;
	public $kya_adhoc;
	public $kya_txt;
	public $kya_key_created;
	public $kya_pin;
	public $kya_pin_changed;
	public $kya_personnel;
	public $kya_psnl_name;
	public $kya_psnl_cmpy;
	public $kya_psnl_cmpy_name;
	public $kya_role;
	public $kya_role_name;
	public $kya_drawer;
	public $kya_draw_name;
	public $kya_supplier;
	public $kya_supp_name;
	public $kya_tanker;
	public $kya_tnkr_name;
	public $kya_tnkr_desc;
	public $kya_tnkr_cmpy;
	public $kya_tnkr_cmpy_name;
	public $kya_equipment;
	public $kya_eqpt_name;
	public $kya_eqpt_desc;
	public $kya_eqpt_cmpy;
	public $kya_eqpt_cmpy_name;
	public $kya_etyp_name;
	public $kya_load_site;
	public $kya_site_name;
	public $kya_load_id;
	public $kya_trip_no;
	public $kya_alloc_type;
	public $kya_alloc_type_name;
	public $kya_alloc_cmpy;
	public $kya_alloc_cmpy_name;
	public $kya_order_no;
	public $kya_cust_ordno; 
	public $kya_cust_name;
	public $kya_order_desc;
	public $rn;
}


//	KYA_KEY_ISSUER,
//	KYA_DRAWER,
//	KYA_SUPPLIER,
//	KYA_ALLOC_CMPY,
class KeyCmpyLookup
{
    public $cmpy_code;
    public $cmpy_name;
	public $cmpy_type;
}
	
//	KYA_TYPE,
class KeyTypeLookup
{
    public $type_id;
    public $type_name;
}

//	KYA_PHYS_TYPE,
class KeyPhysTypeLookup
{
    public $phys_type_id;
    public $phys_type_name;
}

//	KYA_ROLE,
class KeyRoleLookup
{
    public $role_id;
    public $role_name;
}

//	KYA_PERSONNEL,
class KeyPsnlLookup
{
    public $psnl_code;
    public $psnl_name;
    public $psnl_role;
    public $psnl_cmpy_code;
    public $psnl_cmpy_name;
    public $psnl_dept;
}

//	KYA_TANKER,
class KeyTnkrLookup
{
    public $tnkr_code;
    public $tnkr_name;
    public $tnkr_etyp_id;
    public $tnkr_etyp_name;
    public $tnkr_carr_code;
    public $tnkr_carr_name;
    public $tnkr_ownr_code;
    public $tnkr_ownr_name;
	public $tnkr_desc;
}

//	KYA_EQUIPMENT,
class KeyEqptLookup
{
    public $eqpt_id;
    public $eqpt_code;
    public $eqpt_name;
    public $eqpt_etyp_id;
    public $eqpt_etyp_name;
    public $eqpt_ownr_code;
    public $eqpt_ownr_name;
    public $eqpt_desc;
}

//	KYA_LOAD_SITE,
class KeyTerminalLookup
{
    public $term_code;
    public $term_name;
    public $term_desc;
}

//	KYA_LOAD_ID,
class KeyLoadLookup
{
    public $load_terminal;
    public $load_id;
    public $load_number;
    public $load_carrier;
    public $load_tanker;
    public $load_operator;
}

//	KYA_TRIP_ID,
class KeyTripLookup
{
    public $trip_supplier;
    public $trip_no;
	public $trip_status;
	public $trip_carrier;
	public $trip_owner;
    public $trip_tanker;
    public $load_terminal;
    public $load_id;
    public $load_number;
    public $load_operator;
}

//	KYA_ALLOC_TYPE,
class KeyAllocTypeLookup
{
    public $alloc_type_id;
    public $alloc_type_name;
}

//	KYA_CUST_NAME
class KeyCustomerLookup
{
    public $cust_acnt;
    public $cust_supp_code;
    public $cust_supp_name;
    public $cust_cmpy_code;
    public $cust_cmpy_name;
}

//	KYA_ORDER_NO,
//	KYA_CUST_ORDNO, 
//	KYA_CUST_NAME
class KeyOrderLookup
{
    public $order_id;
    public $order_cust_no;
    public $order_supp_code;
    public $order_supp_name;
    public $order_cust_acnt;
    public $order_cust_code;
    public $order_cust_name;
	public $order_desc;
}

// KYA_TIMECD
class KeyTimeCodeLookup
{
	public $tcd_title;
	public $tcd_mon;
	public $tcd_tue;
	public $tcd_wed;
	public $tcd_thu;
	public $tcd_fri;
	public $tcd_sat;
	public $tcd_sun;
}




