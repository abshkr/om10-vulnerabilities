<?php
/**
* The service functions for Role Based Access Control.
*
* @author Jack Zhu (jackzhu@diamondkey.com)
* @version 1.0 (for Omega5000 R2.1)
* @package services
*/

require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../vo/Role.vo.php');
require_once(dirname(__FILE__) . '/../lib/RoleBasedAccessControl.php');

/* define the module name for calling logMe() to output */
if(!defined('ROLEACCESS')) define('ROLEACCESS','RoleBasedAccessControlService');

class RoleBasedAccessControlService
{
    protected $lib;

    public function __construct()
    {
        $this->lib = new RoleBasedAccessControl();
    }

    /**
    * Create a new role.
    *
    * @param string $role_code role code
    * @param string $role_text role name
    * @param string $role_note role comment
    * @param $doprivilege(domain-object-privilege variable list)
    * Example:
    *    role_code:R100001,
    *    role_text:My Admin1,
    *    role_note:test role 001,
    * {
    *   doprivilegepairs:[
    *    {domain_id:43,
    *     object_id:141,
    *     priv_protect:1,
    *     priv_view:1,
    *     priv_update:1,
    *     priv_create:1,
    *     priv_delete:1
    *    },
    *    {domain_id:43,
    *     object_id:142,
    *     priv_protect:1,
    *     priv_view:1,
    *     priv_update:1,
    *     priv_create:0,
    *     priv_delete:1
    *     }
    *   ]
    * }
    * @return exec status
    */
    public function createRole($role_code, $role_text, $role_note, $doprivilege)
    {
        logMe("Info: ++++++Running into createRole()++++++",ROLEACCESS);

        /* Check role_text. */
        if ($role_text == null or $doprivilege == null) {
            return RETURN_URBAC_ERR_1;
        }

        /* Check if role_code & role_text is unique. */
        $role_cnt = $this->lib->getRoleCount($role_code, $role_text);
        if ($role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        }
        else if ($role_cnt > 0) {
            logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
            return RETURN_URBAC_ERR_2;
        }
        
        /* Prepare role_code if it is null. */
        if ($role_code == null) {
            $role_code = getNextRoleCode();
        }
        
        /* Check if role_code is valid. */
        $ret = $this->lib->chkRoleCode($role_code);
        if ($ret === RETURN_FAIL || $ret != RETURN_URBAC_0) {
            return $ret;
        }

        /* Create a role. */
        $ret = $this->lib->addRole($role_code, $role_text, $role_note, $doprivilege);

        return $ret;
    }

    /**
    * Delete an exising role.
    *
    * @param string $role_code role code
    * Example:
    *  role_code:R000010
    * @return exec status
    */
    public function deleteRole($role_code)
    {
        logMe("Info: ++++++Running into deleteRole()++++++",ROLEACCESS);
        
        if ($role_code == null) {
            return RETURN_URBAC_ERR_1;
        }

        /* Check if a Role has been linked to Users. */
        $user_role_cnt = $this->lib->getUserRoleCount($role_code);
        logMe("User_Role count = ". $user_role_cnt,ROLEACCESS);
        if ($user_role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        }
        else if ($user_role_cnt > 0) {
            logMe("Warning: Role still in use!!",ROLEACCESS);
            return RETURN_URBAC_ERR_4;
        }

        /* Delete a role. */
        $ret = $this->lib->delRole($role_code);
        
        return RETURN_URBAC_0;
    }

    /**
    * Get a role's data including privileges.
    *
    * @param string $role_code role code
    * Example:
    *  role_code:R000010
    * @return role data vo
    */
    public function getRoleData($role_code)
    {
        logMe("Info: ++++++Running into getRoleData()++++++",ROLEACCESS);
        $ret = null;
        
        if ($role_code == null) {
            return RETURN_URBAC_ERR_1;
        }

        /* Check role count accordingto role_code. */
        $role_cnt = $this->lib->getRoleCount($role_code, "");
        if ($role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        }
        else if ($role_cnt > 0) {
            /* Get role data. */
            $ret = $this->lib->getRole($role_code);            
        }

        return $ret;
    }

    /**
    * @param $roleData->role_code
    *        $roleData->role_text
    *        $roleData->role_note
    *        $roleData->role_rank
    *        $roleData->role_type
    *        $roleData->role_status
    *        $roleData->domainprivilege(list)
    * Example:
    *    role_code:"R100001",
    *    role_text:"My Admin1",
    *    role_note:"test role 001",
    *    role_rank:"100",
    *    role_type:"1",
    *    role_status:"1",
    *    domainprivilege:[
    *      {
    *       domainprivilegevpairs:[
    *          {obj:"All"},
    *          {obj:"View"},
    *          {obj:"Add"},
    *          {obj:"Update"},
    *          {obj:"Delete"}
    *       ]
    *      }
    */
    public function createRole_ori($roleData)
    {
        logMe("Info: ++++++Running into createRole()++++++",ROLEACCESS);
        
        /* 1. Check if the parameters - role_code and role_name are unique. */
        $role_cnt = $this->lib->getRoleCount($roleData->role_code, $roleData->role_text);
        if ($role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        }
        else if ($role_cnt > 0) {
            logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
            return RETURN_URBAC_ERR_1;
        }
        
        /* 2. Check if the parameter - role_code is valid. */
        $ret = $this->lib->chkRoleCode($roleData->role_code);
        if ($ret === RETURN_FAIL || $ret != RETURN_URBAC_0) {
            return $ret;
        }

        /* 3. Create a role. */
        $ret = $this->lib->addRole($roleData);

        return $ret;
    }

    /**
    * @param $roleData->role_code
    *        $roleData->role_text
    *        $roleData->role_note
    *        $roleData->role_rank
    *        $roleData->role_type
    *        $roleData->role_status
    *        $roleData->role_code_old
    *        $roleData->domainprivilege(list)
    * Example:
    *    role_code:"R100002",
    *    role_text:"My Admin2",
    *    role_note:"test role 002",
    *    role_rank:"100",
    *    role_type:"1",
    *    role_status:"1",
    *    role_code_old:"R100001",
    *    domainprivilege:[
    *      {
    *       domainprivilegevpairs:[
    *          {obj:"All"},
    *          {obj:"View"},
    *          {obj:"Add"},
    *          {obj:"Update"},
    *          {obj:"Delete"}
    *       ]
    *      }
    */
    public function updateRole($roleData)
    {
        logMe("Info: ++++++Running into updateRole()++++++",ROLEACCESS);
        
        /* Check if the parameters - role_code and role_name are unique. */
        $role_cnt = $this->lib->getRoleCount($roleData->role_code, $roleData->role_text);
        if ($role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        }
        else if (($role_cnt == 0) || ($role_cnt == 1 && $roleData->role_code == $roleData->role_code_old)) {
            // Skip
        }
        else {
            logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
            return RETURN_URBAC_ERR_1;
        }

        /* Check if the parameter - role_code is valid. */
        $ret = $this->lib->chkRoleCode($roleData->role_code);
        if ($ret === RETURN_FAIL || $ret != RETURN_URBAC_0) {
            return $ret;
        }
        
        /* Update a role. */
        $ret = $this->lib->updRole($roleData);
        
        return $ret;
    }

    /**
    * @param $roleData->role_text
    *        $roleData->role_text_new
    * Example:
    *  role_text:"My Admin1",
    *  role_text_new:"Coyp of My Admin1"
    */
    public function copyRole($roleData)
    {
        logMe("Info: ++++++Running into copyRole()++++++",ROLEACCESS);
        
        /* Check if the parameters - role_name is unique. */
        $role_cnt = $this->lib->getRoleCount(null, $roleData->role_text_new);
        if ($role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        }
        else if ($role_cnt > 0) {
            logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
            return RETURN_URBAC_ERR_1;
        }

        /* Copy a role. */
        $ret = $this->lib->cpyRole($roleData);
        
        return $ret;
    }
    
    public function getRoles()
    {
        $ret = $this->lib->getAllRoles();
        return $ret;    
    }
}
