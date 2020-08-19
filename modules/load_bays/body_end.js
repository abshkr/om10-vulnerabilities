/****************************************
 * $Id: body_end.js,v 1.9 2012/09/12 07:08:01 abs Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/

if ( id("feedback")) {
	if ( cookieGet("feedback") ) {
		;
	}
}

for (var i = tag("select").length -1; i >= 0; --i){
	var slct = tag("select")[i];
	var newSize = slct.offsetWidth - DROPDOWN_INIT_SIZE;
	if ( newSize < 0) newSize = 100;
	newSize = Math.ceil(newSize / DROPDOWN_INCRS_SIZE);
	newSize = newSize * DROPDOWN_INCRS_SIZE + DROPDOWN_INIT_SIZE;
	slct.style.width = newSize;
}

document.cookie = 'feedback=; expires=Sat, 01 Jan 2000 00:00:00 UTC; path=/';
document.cookie = 'LOG=; expires=Sat, 01 Jan 2000 00:00:00 UTC; path=/';

var tblAlignRules = {
 address_T0: 'X'
,allocations_T0: 'XXXXXXX'
,allocations_T1: 'XNNNX'
,area_T0: 'XX'
,baseprods_T0: 'XXX'
,batch_mtrs_T0: 'XXNNNT'
,companies_T0: 'XXNXXXXXXXX'
,cust_T0: 'XNXXX'
,cust_invoice_T0: 'XTNN'
,cust_invoice_T1: 'XXNNNN'
,cust_ledger_T0: 'XXXNN'
,cust_pricing_T0: 'XXXXNX'
,delivery_loc_T0: 'XXXX'
,drawer_prods_T0: 'XXXXNX'
,drawer_prods_T1: 'XXN'
,equip_list_T0: 'XXXXX'
,equip_list_T1: 'XNNXNTX'
,equip_list_T2: 'XXX'
,equip_types_T0: 'XNNX'
,equip_types_T1: 'XNX'
,expire_dates_T0: 'XXX'
,gate_T0: 'XXXXX'
,gate_perm_T0: 'XX'
,gate_perm_T1: 'XXXX'
,hazchem_T0: 'XXXXXXXXX'
,id_assignment_T0: 'XXXXXXXX'
,journal_T0: 'TXXX'
,krdcfg_T0: 'XXXXX'
,load_bays_T0: 'XXXXNXXX'
,load_scheds_T0: 'XXXTNXXX'
,load_spec_prod_T0: 'XXNNNN'
,load_spec_compt_T0: 'XNXXNNNXN'
,meter_dev_T0: 'XNNXXXXNNN'
,meterings_T0: 'XXXNNN'
,ord_prd_pricing_T0: 'XXNXN'
,order_det_T0: 'XXNNXNN'
,order_ent_maint_T0: 'XXTTXX'
,order_list_T0: 'XXNXTX'
,order_schd_T0: 'XXNNNNX'
,personnel_T0: 'NXXX'
,personnel_T1: 'XXXXXXXX'
,physical_printer_config_T1: 'XX'
,price_offsets_T0: 'XXXXX'
,pricing_T0: 'XXXNX'
,printer_config_T2: 'XXX'
,prod_base_prices_T0: 'XXXXN'
,prod_inv_T0: 'XXNNNN'
,prod_movement_T1: 'XXXXXX'
,prodgrp_T0: 'XXX'
,report_config_T1: 'XXXX'
,report_profile_T1: 'XXX'
,report_scheduling_T0: 'XXX'
,rts_scrn_acc_T0: 'XXXXXXX'
,site_acc_dev_T0: 'XXNNXXXNX'
,site_bal_T0: 'XXXNNNNNNNX'
,tank_grp_T1: 'XNXX'
,tank_inv_T0: 'XXXNNNNNN'
,tank_inv_req_schd_tank_T0: 'XXX'
,tanker_list_T0: 'XXXXXXX'
,tanker_list_T1: 'XXX'
,tanker_ret_T0: 'XNXXNTXX'
,tanks_T0: 'XNXNX'
,term_locs_T0: 'XXXX'
,time_code_T0: 'XX'
,time_code_T1: 'XXXXXXX'
,trans_list_T0: 'NNNNNNNN'
,trans_list_T1: 'XNXNXNNNNN'
,trans_list_T2: 'XNXNXXTT'
}


function tdAlign( td, alignR){
	if(td.style){
		if( alignR == 'N'){
			td.style.textAlign = 'RIGHT';
		}
		if( alignR == 'T'){
			td.style.whiteSpace =  'NOWRAP';
		}
	}
}
	
function tblAlign( tbl, alignRule ){
	for (var r = 1; r < tbl.rows.length; r++ ){
		var tds_indx = 0;
		var tds = tbl.rows[r].childNodes;
		for (var i = 0; i < tds.length ; i++){
			if ( tds[i].tagName == 'TD' ){
				if (tds_indx == 0) tds[i].style.color = "RED";
				tdAlign( tds[i], alignRule.charAt( tds_indx ));
				tds_indx++;
			}
		}
	}
}


var infoTBNmPn = new RegExp("(.+?_T[0-9])");
var tabs = document.getElementsByTagName("TABLE");
for (var i = 0; i < tabs.length; i++){
	var obj = tabs[i];
	if(obj.id){
		if(obj.id.match( infoTBNmPn)){
			eval( 'var alignRule = tblAlignRules.' + obj.id)
			if ( alignRule ){
				tblAlign( obj, alignRule);
			}
		}
	}
}
