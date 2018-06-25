<?php

class ScreenFormColumnService
{
	
	public function __construct()
	{
	}

    public function lookupFormColumnSettings($screen)
	{
		$str = "";
		
		if ( $screen == "ADDRESSES" )
		{
			$str .= "|address_code,document,40";
			/*
			1	STREET
			2	CITY1
			3	CITY2
			4	DISTRICT
			5	POSTAL_CODE
			6	STATE
			7	COUNTRY
			8	TEL
			9	NAME
			10	EMAIL
			11	FAX
			12	TEMPL_ID
			*/
//grid id#target column code#condition column code:condition value, validation type, max length
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:1,document,210";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:2,document,210";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:3,document,210";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:4,document,210";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:5,numeric,9";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:6,document,210";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:7,document,210";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:8,document,25";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:9,document,210";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:10,email,50";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:11,document,25";
			$str .= "|addressLineGrid#db_addr_line#db_addr_line_type:12,document,210";
		}
		
		if ( $screen == "DELIVERYDETAILS" )
		{
			$str .= "|dd_instruction,document,420";
			$str .= "|dd_lpg_remark,document,420";
			$str .= "|dd_vat_id,alphanumeric,13";
			/*
ddi_dd_number			VARCHAR2(40 BYTE)
ddi_dd_supp_code		VARCHAR2(16 BYTE)
ddi_dd_tripord_no		NUMBER(9,0)
ddi_dd_ld_type			NUMBER(2,0)

ddi_line_item_num		NUMBER(6,0)
ddi_prod_code			VARCHAR2(36 BYTE)
ddi_cmpy_code			VARCHAR2(16 BYTE)
ddi_unit				NUMBER(2,0)

ddi_item_cat			NUMBER(4,0)
ddi_cmpt_num			NUMBER(2,0)
ddi_qty					NUMBER(9,0)
ddi_item_desc			VARCHAR2(300 BYTE)
ddi_duty_code			VARCHAR2(20 BYTE)
ddi_excise_lic_num		NUMBER(15,0)
ddi_ref_doc_num			NUMBER(10,0)
ddi_site_capacity		NUMBER(10,0)
ddi_tank_code			VARCHAR2(20 BYTE)			
			*/
//grid id#target column code#condition column code:condition value[TBD=no condition], validation type, max length, flags [1:optional and editable; 2:not optional and not editable; 3:not optional and editable]
			$str .= "|ddiGrid#ddi_line_item_num#TBD,numeric,6,2";
			$str .= "|ddiGrid#ddi_prod_code#TBD,document,36,2";
			$str .= "|ddiGrid#ddi_cmpy_code#TBD,document,16,2";
			$str .= "|ddiGrid#ddi_unit#TBD,numeric,2,2";
			
			$str .= "|ddiGrid#ddi_item_cat#TBD,numeric,4,1";
			$str .= "|ddiGrid#ddi_cmpt_num#TBD,numeric,2,1";
			$str .= "|ddiGrid#ddi_qty#TBD,numeric,9,3";
			$str .= "|ddiGrid#ddi_item_desc#TBD,document,300,1";
			$str .= "|ddiGrid#ddi_duty_code#TBD,document,20,1";
			$str .= "|ddiGrid#ddi_excise_lic_num#TBD,numeric,15,1";
			$str .= "|ddiGrid#ddi_ref_doc_num#TBD,numeric,10,1";
			$str .= "|ddiGrid#ddi_site_capacity#TBD,numeric,10,1";
			$str .= "|ddiGrid#ddi_tank_code#TBD,document,20,1";
		}
		
		if ( $screen == "BASE_PRODUCTS" )
		{
			//$str .= "|base_code,document,20";
			$str .= "|base_name,document,40";
		}
		
		if ( $screen == "COMPANIES" )
		{
			//$str .= "|cmpy_codeTextInput,document,16";
			$str .= "|cmpy_nameTextInput,document,300";
			$str .= "|plant_code,alphanumeric,4";
		}
		
		if ( $screen == "DRAWER_PRODUCTS" )
		{
			//$str .= "|prod_code,document,36";
			$str .= "|prod_name,document,40";
		}
		
		if ( $screen == "EQUIPMENT_LIST" )
		{
			$str .= "|eqpt_code,document,40";
			$str .= "|eqpt_title,document,40";
			$str .= "|eqpt_comments,document,800";
			$str .= "|eqpt_exp_d1_dmy,TBD,0,1";
			$str .= "|eqpt_exp_d2_dmy,TBD,0,1";
			$str .= "|eqpt_exp_d3_dmy,TBD,0,1";
		}
		
		if ( $screen == "EQUIPMENT_TYPES" )
		{
			$str .= "|etyp_title,document,40";
		}
		
		if ( $screen == "PARTNERS" )
		{
			$str .= "|partner_name1,document,210";
			$str .= "|partner_name2,document,210";
			$str .= "|partner_name3,document,210";
			$str .= "|partner_name4,document,210";
			$str .= "|partner_name5,document,210";
		}
		
		if ( $screen == "PERSONNEL" )
		{
			//$str .= "|per_codeTextInput,document,12";
			$str .= "|per_nameTextInput,document,49";
			$str .= "|per_departmentTextInput,document,16";
			$str .= "|per_comments,document,800";
			$str .= "|df_driverLicense,TBD,0,1";
			$str .= "|df_dangerousGoodsLicense,TBD,0,1";
			$str .= "|df_AIP_PassPort,TBD,0,1";
		}
		
		if ( $screen == "TANK_CONFIGURATION" )
		{
			//$str .= "|tank_code,document,24";
			$str .= "|tank_name,document,30";
		}
		
		if ( $screen == "TANKER_LIST" )
		{
			$str .= "|tnkr_code,document,40";
			$str .= "|tnkr_name,document,40";
			$str .= "|remarks,document,800";
			$str .= "|tnkr_lic_exp,TBD,0,1";
			$str .= "|tnkr_dglic_exp,TBD,0,1";
			$str .= "|tnkr_ins_exp,TBD,0,1";
		}
		
		if ( $screen == "TANK_GROUP" )
		{
			$str .= "|tgr_name,document,16";
		}
		
		if ( $screen == "PRODUCT_GROUPS" )
		{
			$str .= "|pgr_code,document,16";
			$str .= "|pgr_name,document,100";
		}
		
		if ( $screen == "OPEN_ORDER" )
		{
			$str .= "|order_ord_time,TBD,1,1";
			$str .= "|order_dlv_time,TBD,1,1";
			$str .= "|order_exp_time,TBD,1,1";
		}
		
		if ( $screen == "REPORTPROFILE" )
		{
			// DKI_ValidatorComboBox id="report_jasper_file" 
			$str .= "|report_jasper_file,alphanumericdot,80";
			$str .= "|report_name,document,80";
			// DKI_ValidatorComboBox id="report_type" 
			$str .= "|report_desc,document,100";
			// CheckBox id="report_ondemand_flag"
			// CheckBox id="report_closeout_flag"
			$str .= "|report_file,alphanumericdot,50";
			//$str .= "|report_ondemand_title,alphanumericslashbrackets,80";
		}
		
		if ( $screen == "REPORTCOMPANY" )
		{
			// DKI_ValidatorComboBox id="report_jasper_file" 
			$str .= "|report_cmpyemail,email,256";
		}
		
		if ( $screen == "COMPLIANCE_MESSAGES" )
		{
			$str .= "|cm_message_code,document,16";
			$str .= "|cm_message_name,document,128";
		}
		
        return $str;
    }
	
	
}
?>