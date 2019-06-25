<?php

class Base_Prods 
{
    public $base_code;
    public $base_name;
	public $base_prod_group;
	public $base_cat;
	public $base_rpt_tunt;
	public $base_rpt_temp;
	public $base_pub_temp;
	public $base_pub_dens;
	public $base_pub_dens_std;
	public $base_pub_vcf;
	public $base_real_temp;
	public $base_real_dens;
	public $base_real_dens_std;
	public $base_real_vcf;
	public $base_compensate_mode;
	public $base_compensate_priority;
	public $last_upd_time;
	public $pgr_description;
	public $pgr_unit;
	public $bclass_desc;
	public $bclass_dens_lo;
	public $bclass_dens_hi;
	public $bclass_vcf_alg;
}

class ProductGroup
{
    public $pgr_code;
    public $pgr_description;
    public $pgr_unit;
}

class BaseClass
{
    public $bclass_no;
    public $bclass_desc;
    public $bclass_dens_lo;
    public $bclass_dens_hi;
    public $bclass_vcf_alg;
}

class BaseProductsLookup 
{
    public $base_code;
    public $base_name;   
}