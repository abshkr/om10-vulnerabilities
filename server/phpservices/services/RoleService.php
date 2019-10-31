<?php
/**
* The service functions for Role Based Access Control.
*
* @author Jack Zhu (jackzhu@diamondkey.com)
* @version 1.0 (for Omega5000 R2.1)
* @package services
*/

require_once(dirname(__FILE__) . '/../classes/Role.class.php');

/* define the module name for calling logMe() to output */
if(!defined('ROLEACCESS')) define('ROLEACCESS','RoleService');

class RoleService {
    protected $lib;

    public function __construct() {
        $this->lib = new RoleClass();
    }

    /**
    * Create a new role.
    *
    * @param string $role_code role code
    * @param string $role_text role name
    * @param string $role_note role comment
    * @param $domprivl(domain-object-privilege variable list)
    * @param int $role_rank role rank
    * @param int $role_status role status
    * @param int $role_type role type
    * @param int $record_order role order
    * @param int $record_switch role switch
    * Example:
    *    role_code:R100001,
    *    role_text:My Admin1,
    *    role_note:test role 001,
    * {
    *   domainprivileges:[
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
    public function createRole($role_code, $role_text, $role_note, $domprivl, $role_rank=0, $role_status=1, $role_type=0, $record_order=0, $record_switch=0) {
        logMe("Info: ++++++Running into createRole()++++++",ROLEACCESS);

        /* Check parameters. */
        if (0 == strlen(trim($role_text)) || null == $domprivl) {
            return RETURN_URBAC_ERR_9;
        }

        /* Check if role_code & role_text is unique. */
        $role_cnt = $this->lib->getRoleCount(trim($role_code), $role_text);
        if (RETURN_FAIL === $role_cnt) {
            return RETURN_FAIL;
        } else if ($role_cnt > 0) {
            logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
            return RETURN_URBAC_ERR_1;
        }
        logMe("Info: getRoleCount =".$role_cnt,ROLEACCESS);
        
        /* Prepare role_code if it is null. */
        if (0 == strlen(trim($role_code))) {
            $role_code = $this->lib->getNextRoleCode();
            logMe("Info: automatically generate role_code=".$role_code,ROLEACCESS);
            if (RETURN_FAIL === $role_code || RETURN_URBAC_ERR_7 == $role_code) {
                return RETURN_FAIL;
            }
        }
        
        /* Check if role_code is valid. */
        $ret = $this->lib->chkRoleCode(trim($role_code));
        if (RETURN_FAIL === $ret || RETURN_URBAC_0 != $ret) {
            return $ret;
        }

        /* Create a role. */
        $ret = $this->lib->addRole(trim($role_code), $role_text, $role_note, $domprivl);

        if (RETURN_URBAC_0 == $ret)
            return trim($role_code);
        else
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
    public function deleteRole($role_code) {
        logMe("Info: ++++++Running into deleteRole()++++++",ROLEACCESS);
        
        if (0 == strlen(trim($role_code))) {
            return RETURN_URBAC_ERR_9;
        }

        /* Check if a Role has been linked to Users. */
        $user_role_cnt = $this->lib->getUserRoleCount(trim($role_code));
        if (RETURN_FAIL === $user_role_cnt) {
            return RETURN_FAIL;
        } else if ($user_role_cnt > 0) {
            logMe("Warning: Role still in use!!",ROLEACCESS);
            return RETURN_URBAC_ERR_4;
        }
        logMe("Info: getUserRoleCount =".$user_role_cnt,ROLEACCESS);

        /* Delete a role. */
        $ret = $this->lib->delRole(trim($role_code));
        
        return $ret;
    }

    /**
    * Get a role's data including privileges.
    *
    * @param string $role_code role code
    * Example:
    *  role_code:R000010
    * @return role data vo
    */
    public function getRoleData($role_code) {
        logMe("Info: ++++++Running into getRoleData()++++++",ROLEACCESS);
        
        if (0 == strlen(trim($role_code))) {
            return RETURN_URBAC_ERR_9;
        }

        /* Check role count according to role_code. */
        $role_cnt = $this->lib->getRoleCount(trim($role_code), "");
        logMe("Info: getRoleCount()=".$role_cnt,ROLEACCESS);
        if (RETURN_FAIL === $role_cnt) {
            return RETURN_FAIL;
        } else if ($role_cnt > 0) {
            /* Get role data. */
            $ret = $this->lib->getRole(trim($role_code));            
            return $ret;
        } else {
            logMe("Info: Role code does not exist.",ROLEACCESS);
            return RETURN_URBAC_ERR_8;
        }
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
    public function _createRole_dyn($roleData) {
        logMe("Info: ++++++Running into createRole()++++++",ROLEACCESS);
        
        /* 1. Check if the parameters - role_code and role_name are unique. */
        $role_cnt = $this->lib->getRoleCount($roleData->role_code, $roleData->role_text);
        if ($role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        } else if ($role_cnt > 0) {
            logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
            return RETURN_URBAC_ERR_9;
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
    * @param string $role_code_old the role code you want to update
    * @param string $role_code new role code
    * @param string $role_text new role name
    * @param string $role_note new role comment
    * @param $domprivl(domain-object-privilege variable list)
    * @param int $role_rank role rank
    * @param int $role_status role status
    * @param int $role_type role type
    * @param int $record_order role order
    * @param int $record_switch role switch
    * Example:
    *    role_code_old:"R100001",
    *    role_code:"R100002",
    *    role_text:"My Admin2",
    *    role_note:"test role 002",
    *    role_rank:"100",
    *    role_type:"1",
    *    role_status:"1",
    * {
    *   domainprivileges:[
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
    */   
    public function updateRole($role_code_old, $role_code, $role_text, $role_note, $domprivl, $role_rank=0, $role_status=1, $role_type=0, $record_order=0, $record_switch=0) {
        logMe("Info: ++++++Running into updateRole()++++++",ROLEACCESS);
        
        /* Check parameters. */
        if (0 == strlen(trim($role_code_old)) || 0 == strlen(trim($role_text)) || null == $domprivl) {
            return RETURN_URBAC_ERR_9;
        }

        /* Check if old role_code is valid. */
        $ret = $this->lib->chkRoleCode(trim($role_code_old));
        if (RETURN_FAIL === $ret || RETURN_URBAC_0 != $ret) {
            return $ret;
        }
        
        /* Check if new role_code is valid. */
        if (0 != strlen(trim($role_code))) {         
            $ret = $this->lib->chkRoleCode(trim($role_code));
            if (RETURN_FAIL === $ret || RETURN_URBAC_0 != $ret) {
                return $ret;
            }
        }
        
        /* Check if old role_code exists. */
        $role_cnt = $this->lib->getRoleCount(trim($role_code_old), "");
        if ($role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        } else if (1 != $role_cnt) {
            logMe("Error: role_code_old does not exist!",ROLEACCESS);
            return RETURN_URBAC_ERR_8;
        }
        logMe("Info: getRoleCount(role_code_old) =".$role_cnt,ROLEACCESS);        
        
        /* Check if the parameters - role_code and role_name are unique. */
        /* If new role code is blank, only need to check role_text, as we will use the role_code_old. */
        if (0 != strlen(trim($role_code)) && trim($role_code) != trim($role_code_old)) { 
            $role_cnt = $this->lib->getRoleCount(trim($role_code), $role_text);
            if ($role_cnt === RETURN_FAIL) {
                return RETURN_FAIL;
            } else if ($role_cnt > 0) {
                logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
                return RETURN_URBAC_ERR_1;
            }
            logMe("Info: getRoleCount(role_code,role_text) =".$role_cnt,ROLEACCESS);
        } else { // If role_code is null or the same as old role_code, role name should be unique
            $row = $this->getRoleData(trim($role_code_old));
            $role_txt_old = $row->role_text;
            logMe("Info: role_txt_old=".$role_txt_old,ROLEACCESS);
            if (strcmp($role_txt_old,$role_text) != 0) {
                $role_cnt = $this->lib->getRoleCount("", $role_text);
                if ($role_cnt === RETURN_FAIL) {
                    return RETURN_FAIL;
                } else if ($role_cnt > 0) {
                    logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
                    return RETURN_URBAC_ERR_1;
                }
                logMe("Info: getRoleCount(role_text) =".$role_cnt,ROLEACCESS);                        
            } else {
                logMe("Info: role name not changed.",ROLEACCESS);
            }
        }

        /* Prepare role_code if it is null. */
        if (0 == strlen(trim($role_code))) {
           /* Keep using the same role code. */
            $role_code = trim($role_code_old);//$this->lib->getNextRoleCode();
            logMe("Info: automatically generate role_code=".$role_code,ROLEACCESS);
            //if (RETURN_FAIL === $role_code || RETURN_URBAC_ERR_7 == $role_code) {
            //    return RETURN_FAIL;
            //} 
        }
        
        /* Update a role. */
        $ret = $this->lib->updRole($role_code_old, $role_code, $role_text, $role_note, $domprivl);
        
        return $ret;
    }

    /**
    * @param $roleData->role_text
    *        $roleData->role_text_new
    * Example:
    *  role_text:"My Admin1",
    *  role_text_new:"Coyp of My Admin1"
    */
    public function copyRole($roleData) {
        logMe("Info: ++++++Running into copyRole()++++++",ROLEACCESS);
        
        /* Check if the parameters - role_name is unique. */
        $role_cnt = $this->lib->getRoleCount(null, $roleData->role_text_new);
        if ($role_cnt === RETURN_FAIL) {
            return RETURN_FAIL;
        } else if ($role_cnt > 0) {
            logMe("Error: role_code or role_name not UNIQUE!",ROLEACCESS);
            return RETURN_URBAC_ERR_9;
        }

        /* Copy a role. */
        $ret = $this->lib->cpyRole($roleData);
        
        return $ret;
    }
    
    public function getRoles() {
        $ret = $this->lib->getAllRoles();
        return $ret;    
    }
    
    public function getUserRole($user_cd) 
    {
        $role_cd = $this->lib->getUserRoleCode(trim($user_cd));
        logMe("Info: user[".$user_id."]'s role code=".$role_cd,ROLEACCESS);
        return $this->getRoleData($role_cd);
    }
    
    // END OF JZ's
    //=========================================================================
}
?>