<?php

class Urbac_Roles
{
    public $role_code; // null when creating a role
    public $role_text; // not required if role_passed (can be empty)
    public $role_note; // passing for 2.1
    public $role_rank; // not using for 2.1
    public $role_type; // not using for 2.1
    public $role_status; // always active on create
	public $domainprivilege=array();
	public $role_code_old; // not required for 2.1
}

class DomainPrivilege_vo
{
	public $domain_id;
	public $object_id;
	public $priv_protect; 
	public $priv_view;
	public $priv_update;
	public $priv_create;
	public $priv_delete;
	public $needsCGI;
}