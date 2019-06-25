<?php

// CUST_ORDER
class GUI_ORDERS
{
	public $order_sys_no;
	public $order_cust_no;
	public $order_cust_acnt;
	public $order_cust_code;
	public $order_cust_name;
	public $order_supp_code;
	public $order_supp_name;
	public $order_ord_time;
	public $order_ttyp_id;
	public $order_ttyp_name;
	public $order_stat_id;
	public $order_stat_name;
	public $order_styp_id;
	public $order_styp_name;
	public $order_dloc_code;
	public $order_dloc_name;
	public $order_ref_code;
	public $order_dlv_time;
	public $order_dtrm_code;
	public $order_dtrm_name;
	public $order_expired;
	public $order_drwr_code;			
	public $order_drwr_name;
	public $order_carr_code;
	public $order_carr_name;
	public $order_approved;
	public $order_inv_no;
	public $order_total;
	public $order_limit;
	public $order_app_no;
	public $order_app_time;
	public $order_trsf_type;
	public $order_price_printed;
	public $order_strm_code;
	public $order_strm_name;
	public $order_pay_note;
	public $order_psnl_code;
	public $order_psnl_name;
	public $order_src_id;
	public $order_src_name;
	public $order_instructions;
	public $order_items;
	public $order_schedules;
	public $order_sold_to_num;
	public $order_ship_to_num;
	public $order_last_change;
	public $rn;
}

// ORD_INSTRUCT
class OrderInstructions
{
	public $oinst_order;
	public $oinst_counter;
	public $oinst_text;
}

// OPRODMTD
class GUI_ORDER_ITEMS
{
	public $oitem_order_id;
	public $oitem_prod_code;
	public $oitem_prod_cmpy;
	public $oitem_prod_name;
	public $oitem_drwr_name;
	public $oitem_prod_qty;
	public $oitem_prod_unit;
	public $oitem_unit_name;
	public $oitem_by_packs;
	public $oitem_pack_size;
	public $oitem_schd_qty;
	public $oitem_load_qty;
	public $oitem_delv_qty;
	public $oitem_exempt_no;
	public $oitem_padj_code;
	public $oitem_padj_name;
	public $oitem_price_type;
	public $oitem_price_name;
	public $oitem_prod_price;
	public $oitem_period_no;
	public $oitem_line_no;
	public $oitem_periods;
	public $oitem_schedules;
}

// OPROD_CHILD
class GUI_ORDER_PERIODS
{
	public $oprd_order_id;
	public $oprd_prod_code;
	public $oprd_prod_cmpy;
	public $oprd_prod_name;
	public $oprd_drwr_name;
	public $oprd_period_no;
	public $oprd_period_start;
	public $oprd_period_end;
	public $oprd_prod_unit;
	public $oprd_unit_name;
	public $oprd_prod_qty;
	public $oprd_prod_used;
	public $oprd_price_fixed;
	public $oprd_prod_price;
}

// 
class OrderScheduleLookup
{
	public $schd_order_id;
	public $schd_supp_code;
	public $schd_supplier;
	public $schd_trip_no;
	public $schd_carr_code;
	public $schd_carrier;
	public $schd_tnkr_code;
	public $schd_tanker;
	public $schd_date;
	public $schd_status_code;
	public $schd_status;
}

// 
class OrderItemScheduleLookup
{
	public $schd_order_id;
	public $schd_supp_code;
	public $schd_supplier;
	public $schd_trip_no;
	public $schd_cmpt_no;
	public $schd_prod_code;
	public $schd_prod_cmpy;
	public $schd_prod_name;
	public $schd_prod_qty;
	public $schd_prod_unit;
	public $schd_unit_name;
}


//	CUSTOMER
class OrderCustomerLookup
{
    public $cust_acnt;
    public $cust_supp_code;
    public $cust_supp_name;
    public $cust_cmpy_code;
    public $cust_cmpy_name;
	public $cust_desc;
}

//	COMPANYS
//	supplier, drawer, customer, carrier
class OrderCmpyLookup
{
    public $cmpy_code;
    public $cmpy_name;
	public $cmpy_type;
}
	
//	ORD_MTHD_TYP
class OrderMethodTypeLookup
{
    public $ordmthd_type_id;
    public $ordmthd_type_name;
}
	
//	TRANSPORT_TYP
class OrderTrnsptTypeLookup
{
    public $trnspt_type_id;
    public $trnspt_type_name;
}
	
//	ORDER_STATUS_TYP
class OrderStatusTypeLookup
{
    public $ordstat_type_id;
    public $ordstat_type_name;
}
	
//	CUSTOMER_SALE_TYP
class OrderSaleTypeLookup
{
    public $sale_type_id;
    public $sale_type_name;
}
	
//	DELV_LOCATION
class OrderDelvLocLookup
{
    public $delv_code;
    public $delv_name;
    public $delv_desc;
}

//	TERMINAL
class OrderTerminalLookup
{
    public $term_code;
    public $term_name;
    public $term_desc;
}

//	PERSONNEL
class OrderPsnlLookup
{
    public $psnl_code;
    public $psnl_name;
    public $psnl_role;
    public $psnl_cmpy_code;
    public $psnl_cmpy_name;
    public $psnl_dept;
}

//	ERP_TYPE,
class OrderErpTypeLookup
{
    public $erp_type_id;
    public $erp_type_name;
}

// UNIT_SCALE_VW
class OrderUnitLookup
{
    public $unit_id;
    public $unit_name;
}
	
//	CUSTOMER_PRICE_TYP
class OrderPriceTypeLookup
{
    public $price_type_id;
    public $price_type_name;
}
	
//	PRICE_ADJUSTS
class OrderPriceOffsetLookup
{
    public $proff_code;
    public $proff_name;
    public $proff_deb_type;
    public $proff_deb_name;
    public $proff_apply;
    public $proff_apply_name;
    public $proff_to_print;
}
	
//	PRODUCTS
class OrderProductLookup
{
    public $prod_code;
    public $prod_cmpy;
    public $prod_cmpy_name;
    public $prod_name;
    public $prod_prod_group;
    public $prod_class;
    public $prod_rpt_unit;
    public $prod_rpt_temp;
    public $prod_is_blend;
}

//	SCHEDULE
class OrderTripLookup
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





