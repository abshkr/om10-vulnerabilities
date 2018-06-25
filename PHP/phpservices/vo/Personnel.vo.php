<?php

class Gui_Personnel
{
    public $per_exp_d1_dmy;
    public $per_exp_d2_dmy;
    public $per_exp_d3_dmy;
    public $per_code;
    public $per_name;
    public $per_cmpy;
    public $per_area;     
    public $per_auth;
    public $per_lock;
    public $per_last_dmy;
    public $per_department;
    public $per_passwd;
    public $per_licence_no;
    public $per_next_msg;
    public $per_passwd_2;
    public $per_level_num;
    public $per_terminal;
    public $per_comments;
	public $cmpy_name;
	public $pt_timecd;	/*PER_TIMECODE.PT_TIMECD*/
	public $role; 		/*AUTH_LEVEL_TYP.AUTH_LEVEL_NAME*/
	public $perl_ara;	/*PERS_IN_AREA.PERL_ARA*/
	public $per_password;
	public $per_passconfirm;
	public $password_validate; /* 0:ignore, 1:validate */
	public $session_id; /* */
	public $user_status_flag; /*user lock status 0-inactive, 1-active, 2-locked, 3-deleted */
	public $per_accesslocks; /*array of lockout areas */
}

class AccessPermissions_vo
{
	public $perm_psn;
	public $perm_area;
}


class PersonnelLookup
{
    public $cmpy_code;
    public $cmpy_name;
}

class PersonnelOnSite
{
    public $per_code;
    public $per_name;
    public $cmpy_name;
    public $per_area;
    public $per_enter_time;
}


class SiteAreas
{
	public $area_k;
	public $area_name;
	public $area_cpcty;
	public $area_eqp_sft_lnk;
}


class PersonnelByCmpyLookup
{
    public $per_code;
    public $per_name;
}
