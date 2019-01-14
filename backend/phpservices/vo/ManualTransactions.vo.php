<?php

class Result_detail
{
    public $result_code;            /* 0 means OK, non-zero means error */
    public $result_string;          /* Error details */
}

class Manual_Transa 
{
    //public $Transaction_Number; 
    public $Load_Number;            /* Trip number */
    public $Supplier;               /* Supplier */
    //public $load_unload;
	
	//public $Load_Type;
    
	public $Start_Time;             /* */
    public $Finish_Time;
    
	public $Operator_Code;          
    
	//public $Drawer_Code;          /* Readonly */
    //public $Drawer_Name;          /* Readonly */
    public $Tanker_Code;            /* Readonly */
	
	public $TAS_Ref;                /* TAS Reference */
	public $Customer;               /* Customer      */
	public $User_Comments;          /* User Comments */
}

//class Manual_Product
//{
//    public $drawer_code;
//    public $product_code;
//}
//
//class Manual_Compartment
//{
//    public $eqp_cd;
//    public $nr_in_eqp;
//    public $nr_in_tkr;
//    
//    public $sched_is_base;
//    public $sched_drawer_code;
//    public $sched_prod_code;
//    
//    public $preload_amb_vol;
//    public $preload_cor_vol;
//    public $preload_liq_kg;
//}

/* This is to fill in the meter fields in TRANSFERS table */
class Transfer_Meter
{
    public $Injector_or_Meter;      /* "T" for injector, "F" for meter */
    public $Meter_Injector_Code;    /* Meter code, sample: "101"*/
    
    /* meter readings */
    public $open_amb;   
    public $open_cor;
    public $open_kg;
    public $close_amb;
    public $close_cor;
    public $close_kg;
}

class Transfer_Base
{
    public $Tank_Code;              /* Tank code */
    
    public $product_code;           /* Base product code */
    public $prod_class;             /* If it's addtive, set this as "ADDITIVE" */
    public $dens;                   /* Density */
    public $Temperature;            /* Temperature */
    
    public $amb_vol;                
    public $cor_vol;
    public $liq_kg;
}

class Manual_Transfer
{
    public $Arm_Code;           /* The arm where the transfer happens, sample: "A00101" */
    //public $Device_Code;        /* Basically it's the bay code, sample: "BAY01" */
    public $nr_in_tkr;          /* Compartment number */
    
    public $drawer_code;        /* Drawer */
    public $product_code;       /* Drawer product code */
    
    public $dens;               /* Density of this product */
    
    public $Temperature;        /* Temperature of this product */
    
    public $amb_vol;            /* Ambient liter of this product */
    public $cor_vol;            /* corrected liter of this product */
    public $liq_kg;             /* mass of this product */
    
	public $Equipment_ID;       /* Equipment ID    */
    public $Planned_Qty;        /* Planned Quality */
	public $Additional_UOM;     /* Additional UOM  */
	public $Alter_Qty;          /* Alternate Quantity */
	
    public $num_of_meter;       
    public $meters;             /* array points to Transfer_Meter objects */
    
    public $Number_of_Bases;
    public $bases;              /* array points to Transfer_Base objects */
}

/* This is for TRNS_TOTALS table, this is the duplicate of Transfer_Meter */
//class Manual_Meter
//{
//    public $Injector_or_Meter;      /* "T" for injector, "F" for meter */
//    public $Meter_Injector_Code;
//    public $prod_class;
//    public $dens;
//    public $Temperature;
//    public $Average_Temperature;
//    
//    public $open_amb;
//    public $open_cor;
//    public $open_kg;
//    public $close_amb;
//    public $close_cor;
//    public $close_kg;
//}

class MT_GUI_Data 
{
	public $gud_id;
	public $gud_module_id;
	public $gud_module_name;
	public $gud_head_data;
	public $gud_body_data;
	public $gud_user;
	public $gud_create_date;
	public $gud_update_date;
	public $gud_status;
}

