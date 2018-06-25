<?php

class GuiSchedules
{    
	public $shls_trip_no;
	public $last_chg_time;
}

class ScheduleTankersLookup
{
    public $tnkr_code;
}

class SuppliersLookup
{
    public $supplier_code;
    public $supplier;
    public $supplier_desc;
}

class CarriersLookup
{
    public $cmpy_code;
    public $cmpy_name;
}

class DrawersLookup
{
	public $cmpy_code;
	public $cmpy_name;
}

class ProductsLookup
{
    public $prod_code;
    public $prod_name;
    public $schedule;
    public $unit;
    public $order_id;
}

class ScheduleProductDetails
{
    public $prod_code;
    public $prod_name;
    public $prod_cmpy;
    public $unit_code;
    public $unit_name;
    public $qty_scheduled;
    public $qty_loaded;
    public $preloaded;
    public $qty_amb;
    public $qty_std;
    public $qty_kg;
}

class ScheduleCompartmentDetails
{
	public $compartment;
    public $prod_code;
    public $prod_name;
    public $prod_cmpy;
    public $unit_code;
    public $unit_name;
    public $qty_scheduled;
    public $qty_loaded;
    public $preloaded;
    public $qty_amb;
    public $qty_std;
    public $qty_kg;
}


class LastLoadedProduct
{
    public $prod_code;
    public $prod_name;
    public $schd_comp_id;
    public $schd_specqty;
    public $schd_trailercomp;
}

class Order
{
    public $cust_code;
    public $cust_acct;
    public $orderid;
    public $cmpy_orderid;
    public $order_ref_code;
    public $order_exp_date;
    public $description;
}

class OrderDetails
{
    public $order_id;
    public $cmpy_orderid;
    public $order_prod_qty;
    public $order_prod_unit;
    public $orprod_scheduled;
    public $orprod_loaded;
    public $prod_code;
    public $prod_name;
    public $schedule;
    public $available;
    public $unit_desc;
}

class ScheduledCompartments
{
    public $eqpt_code;
    public $tnkr_cmpt_no;
    public $unit;
    public $tlr_cmpt;
    public $prod_code;
    public $prod_name;
    public $cmpt_units;
    public $allowed_qty;
    public $load_qty;
    public $preld_qty;
    public $prev_prod;
    public $order_cust_ordno;
    public $cmpt_capacit;
    public $order_ref_code;
    public $schorder_qty;
    public $prev_prodcode;
    public $tc_eqpt;
    public $shlsload_load_id;
    public $arm_name;
    public $armcode;
	public $schd_deliv_num;
	public $schd_sold_to_num;
	public $schd_ship_to_num;
}

class Seal
{
	    public $seal_nr;
	        public $sealspec_shlstrip;
	        public $sealspec_shlssupp;
		    public $seal_cmpt_nr;
}

class LoadSchdDriver
{
    public $per_code;
}