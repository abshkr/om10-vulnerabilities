<?php
/**
* The lib functions for Role Based Access Control.
*
* @author Jack Zhu (jackzhu@diamondkey.com)
* @version 1.0 (for Omega5000 R2.1)
* @package lib
*/

require_once 'Zend/Date.php';
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../models/DbTable/RoleBasedAccessControl.php');
require_once(dirname(__FILE__) . '/../lib/RoleBasedAccessControlRetCode.php');
require_once(dirname(__FILE__) . '/../vo/Role.vo.php');

define ("ROLE_CODE_STEP", "2");
define ("ROLE_CODE_LEN", "7");
define ("ROLE_CODE_PREFIX", "R");
define ("PRIVILEGE_CNT", "5");

class RoleBasedAccessControl 
{
    private $Privilege_nm = array("PRIV_PROTECT", "PRIV_VIEW", "PRIV_UPDATE", "PRIV_CREATE", "PRIV_DELETE");
    /**
    * Get the next valid role code.
    *
    * @param null
    * @return string next valid role code
    */    
    public function getNextRoleCode()
    {
        $role_cd_max = ROLE_CODE_PREFIX . "000000";
        
        try {
            /* Get the maximum role ID. */
            $table = new Application_Model_DbTable_URBAC_ROLES();
            $sql="select max(ROLE_CODE) ROLE_CD_MAX from URBAC_ROLES";
            $rows = $table->getAdapter()->fetchAll($sql);
            if (count($rows) > 0) {
                $role_cd_max = $rows[0]['ROLE_CD_MAX'] != null ? $rows[0]['ROLE_CD_MAX'] : $role_cd_max;
            }

            /* Prepare next role code. */
            $role_cd_max_no = substr($role_cd_max, 1, 6);
            $role_cd_next_no = $role_cd_max_no + 1;
            if ($role_cd_next_no >= 999999) {
                return RETURN_URBAC_ERR_7;            
            }
            $role_cd_next = 'R' . sprintf("%000006d", strval($role_cd_next_no));

            logme("Max  Role Code =". $role_cd_max);
            logme("Next Role Code =". $role_cd_next);
        }
        catch (Zend_Exception $e) {
            logMe("Failed to get next Role Code. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }
        
        return $role_cd_next;
    }

    /**
    * Get role records count according to role_code or role_text.
    *
    * @param string $filter1 role code
    * @param string $filter2 role text
    * @return integer role count
    */
    public function getRoleCount($filter1, $filter2)
    {
        try {
            $table = new Application_Model_DbTable_URBAC_ROLES();
            $where = "";
            $cnt1 = 0;
            $cnt2 = 0;
            if ($filter1 != "")
            {
                $where = $table->getAdapter()->quoteInto('ROLE_CODE = ?', $filter1);
                $rows = $table->fetchAll($where);
                $cnt1 = $rows->count();
            }
            if ($filter2 != "")
            {
                $where = $table->getAdapter()->quoteInto('ROLE_TEXT = ?', $filter2);
                $rows = $table->fetchAll($where);
                $cnt2 = $rows->count();
            }
            
        }
        catch (Zend_Exception $e) {
            logMe("Failed to get Role count. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }

        return (max($cnt1, $cnt2));
    }

    /**
    * Get role data including privileges.
    *
    * @param string $role_code role code
    * Example:
    *  role_code:R000010
    * @return role data vo
    */
    public function getRole($role_code)
    {
        logMe("Info: ++++++Running into getRole()++++++");
        $ret = new UrbacRoles();
        $doprivl = array();

        /* Get role data. */
        $sql = "select ROLE_ID, ROLE_TEXT, ROLE_NOTE, ROLE_STATUS from URBAC_ROLES where ROLE_CODE='" . $role_code. "'";
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $rows = $table->getAdapter()->fetchAll($sql);
        if (count($rows) > 0) {
            $role_id = $rows[0]['ROLE_ID'];    
            $role_text = $rows[0]['ROLE_TEXT'];
            $role_note = $rows[0]['ROLE_NOTE'];
            $role_status = $rows[0]['ROLE_STATUS'];            

            logMe("--role_text: " . $role_text);
            logMe("--role_note: " . $role_note);
            
            $sql_do = "select DOMAIN_ID, OBJECT_ID from URBAC_ROLE_DOMAINS_PRIVILEGES where ROLE_ID='" . $role_id . "' and DOMAIN_ROLE_ACTIVE=1 group by DOMAIN_ID, OBJECT_ID order by DOMAIN_ID, OBJECT_ID";
            $rows_do = $table->getAdapter()->fetchAll($sql_do);
            $do_cnt = count($rows_do);
            if ($do_cnt > 0) {
                for($loop_do = 0; $loop_do < $do_cnt; $loop_do++) {
                    $dom_id = $rows_do[$loop_do]['DOMAIN_ID'];
                    $obj_id = $rows_do[$loop_do]['OBJECT_ID'];
                    
                    logMe("------dom_id: " . $dom_id);
                    logMe("------obj_id: " . $obj_id);
                    
                    $sql_privl = "select PRIVILEGE_ID from URBAC_ROLE_DOMAINS_PRIVILEGES where ROLE_ID='" . $role_id. "'" . "and DOMAIN_ID='" . $dom_id . "' and OBJECT_ID='" . $obj_id ."' and DOMAIN_ROLE_ACTIVE=1";
                    $rows_privl = $table->getAdapter()->fetchAll($sql_privl);
                    $privl_cnt = count($rows_privl);
                    if ($privl_cnt > 0) {
                    
                        $domainprivilege = new DomainPrivilege_vo();
                        $domainprivilege->domain_id = $dom_id;
                        $domainprivilege->object_id = $obj_id;
                        $domainprivilege->priv_protect = 0;
                        $domainprivilege->priv_view = 0;
                        $domainprivilege->priv_update = 0;
                        $domainprivilege->priv_create = 0;
                        $domainprivilege->priv_delete = 0;
                        
                        /* Fill the privilege variable list. */
                        for($loop_privl = 0; $loop_privl < $privl_cnt; $loop_privl++) {
                            /* Get privilege text */
                            $privilege_text = "";
                            $sql_privl_txt = "select PRIVILEGE_TEXT from URBAC_PRIVILEGES where PRIVILEGE_ID='" . $rows_privl[$loop_privl]['PRIVILEGE_ID'] . "'";
                            try {
                                $rows_privl_txt = $table->getAdapter()->fetchAll($sql_privl_txt);
                                if (count($rows_privl_txt) > 0) {
                                    $privilege_text = $rows_privl_txt[0]['PRIVILEGE_TEXT'];
                                }
                                else {
                                    logMe("Can not find Privilege Text");
                                    continue;
                                }
                            }
                            catch (Zend_Exception $e) {
                                logMe("Failed to get privl text. Error message: " . $e->getMessage());
                                continue;
                            }
                            
                            switch ($privilege_text) {
                            case "PRIV_PROTECT":
                                $domainprivilege->priv_protect = 1;
                                logMe("----------privilege_text: " . $privilege_text);
                                break;
                            case "PRIV_VIEW":
                                $domainprivilege->priv_view = 1;
                                logMe("----------privilege_text: " . $privilege_text);
                                break;
                            case "PRIV_UPDATE":
                                $domainprivilege->priv_update = 1;
                                logMe("----------privilege_text: " . $privilege_text);
                                break;
                            case "PRIV_CREATE":
                                $domainprivilege->priv_create = 1;
                                logMe("----------privilege_text: " . $privilege_text);
                                break;
                            case "PRIV_DELETE":
                                $domainprivilege->priv_delete = 1;
                                logMe("----------privilege_text: " . $privilege_text);
                                break;
                            }
                        }
                        $doprivl[] = $domainprivilege;
                    }
                

                }
            }
            $ret->role_code = $role_code;
            $ret->role_text = $role_text;
            $ret->role_note = $role_note;
            $ret->role_status = $role_status;
            $ret->domainprivilege = $doprivl;
        }

        return $ret;
    }
    
    public function getAllRoles()
    {
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $sql="select * from URBAC_ROLES";
        $rows = $table->getAdapter()->fetchAll($sql);
		arrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "UrbacRoles")));        
    }

    /**
    * Check role code validity.
    *
    * @param string $role_code role code
    * @return value of check status 
    */
    public function chkRoleCode($role_code)
    {
        if (!$role_code) {
            return RETURN_FAIL;
        }
        
        if (strlen($role_code) != ROLE_CODE_LEN) {
            return RETURN_URBAC_ERR_6;
        }

        if (strcmp(substr($role_code, 0, 1), ROLE_CODE_PREFIX) != 0) {
            return RETURN_URBAC_ERR_6;
        }        
        
        $ret = $this->getNextRoleCode();
        if ($ret == RETURN_FAIL || $ret == RETURN_URBAC_ERR_7) {
            logMe("Error. Can't get next role code.");
            return $ret;
        }
        $role_code_next = $ret;
        $role_no_next = substr($role_code_next, 1, 6);
        $role_no = substr($role_code, 1, 6);
        logMe("role_no_next: " . $role_no_next);
        logMe("role_no: " . $role_no);
        logMe("role_no - role_no_next: " . ($role_no - $role_no_next));
        if (($role_no - $role_no_next) > ROLE_CODE_STEP) {
            return RETURN_URBAC_ERR_6;
        }
        
        return RETURN_URBAC_0;
    }

    /**
    * Add role data into Role-Domain-Privilege table.
    *
    * @param string $role_code role code
    * @param $doprivilege(domain-object-privilege variable list)
    * @return exec status 
    */
    public function addRDP($role_code, $doprivilege)
    {
        logMe("Info: ++++++Running into addRDP()++++++");

        $table = new Application_Model_DbTable_URBAC_ROLES();

        /* Get current role ID. */
        $role_id  = $this->getRoleID($role_code);
        if ($role_id == RETURN_FAIL or $role_id == null) {
            logMe("Error. Can't get role ID.");
            //$table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Insert data into RDP table. */
        $urbac_role_domains_privileges_tbl = new Application_Model_DbTable_URBAC_ROLE_DOMAINS_PRIVILEGES();
        $arrCnt = count($doprivilege->domainprivileges);
        logMe("doprivilege array count = ". $arrCnt);
        for($loop =0; $loop < $arrCnt; $loop++) {
        
            logMe("new pair starts...");
            $arrPrivlCnt = count($this->Privilege_nm);
            logMe("domainprivileges array count = ". $arrPrivlCnt);
            
            $domain_id = $doprivilege->domainprivileges[$loop]->domain_id;
            $object_id = $doprivilege->domainprivileges[$loop]->object_id;    
            
            

            for($loop2 =0; $loop2 < $arrPrivlCnt; $loop2++) {
                //logMe("domainprivileges[". $loop2 ."] = " . $doprivilege[$loop]->domainprivileges[$loop2]->obj);

                $privilege_text = "";
                $privilege_id = "";
                /* Get Privilege ID. */
                switch ($this->Privilege_nm[$loop2]) {
                    case "PRIV_PROTECT":
                        $privilege_text = $doprivilege->domainprivileges[$loop]->priv_protect == 1 ? "PRIV_PROTECT" : "";
                        break;
                    case "PRIV_VIEW":
                        $privilege_text = $doprivilege->domainprivileges[$loop]->priv_view == 1 ? "PRIV_VIEW" : "";
                        break;
                    case "PRIV_UPDATE":
                        $privilege_text = $doprivilege->domainprivileges[$loop]->priv_update == 1 ? "PRIV_UPDATE" : "";
                        break;
                    case "PRIV_CREATE":
                        $privilege_text = $doprivilege->domainprivileges[$loop]->priv_create == 1 ? "PRIV_CREATE" : "";
                        break;
                    case "PRIV_DELETE":
                        $privilege_text = $doprivilege->domainprivileges[$loop]->priv_delete == 1 ? "PRIV_DELETE" : "";
                        break;
                }
                if ($privilege_text != "") {
                    logMe("Info: privilege_text = " . $privilege_text);
                    $sql="select PRIVILEGE_ID from URBAC_PRIVILEGES where PRIVILEGE_TEXT='" . $privilege_text . "'";
                    try {
                        $rows = $table->getAdapter()->fetchAll($sql);
                        if (count($rows) > 0) {
                            $privilege_id = $rows[0]['PRIVILEGE_ID'];
                        }
                        else {
                            logMe("Error: Parameters err - can not find Privilege ID");
                            //$table->getAdapter()->rollBack();
                            return RETURN_URBAC_ERR_3;
                        }
                    }
                    catch (Zend_Exception $e) {
                        logMe("Failed to store domain ID. Error message: " . $e->getMessage());
                        return RETURN_FAIL;
                    }
                    
                    /* Insert data into URBAC_ROLE_DOMAINS_PRIVILEGES. */
                    logMe("Info: role_id = " . $role_id);
                    logMe("Info: domain_id = " . $domain_id);
                    logMe("Info: object_id = " . $object_id);
                    logMe("Info: privilege_id = " . $privilege_id);
                    try {
                        $count = $urbac_role_domains_privileges_tbl->insert(array('ROLE_ID'=>$role_id, 'DOMAIN_ID'=>$domain_id, 'OBJECT_ID'=>$object_id, 'PRIVILEGE_ID'=>$privilege_id, 'DOMAIN_ROLE_ACTIVE'=>"1"));
                    }
                    catch (Zend_Exception $e) {
                        logMe("Failed to insert URBAC_ROLE_DOMAINS_PRIVILEGES. Error message: " . $e->getMessage());
                        //$table->getAdapter()->rollBack();
                        return RETURN_FAIL;
                    }
                    logMe("Insert URBAC_ROLE_DOMAINS_PRIVILEGES succeed!");                    
                }
            }
        }
        logMe("Adding RDP succeed!");
        return RETURN_URBAC_0;
    }

    /**
    * Create role. Add role data into database.
    *
    * @param string $role_code role code
    * @param string $role_text role name
    * @param string $role_note role comments
    * @param $doprivilege(domain-object-privilege variable list)
    * @return exec status 
    */
    public function addRole($role_code, $role_text, $role_note, $doprivilege)
    {
        logMe("Info: ++++++Running into addRole()++++++");
        
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $table->getAdapter()->beginTransaction();
        
        /* Insert data into URBAC_ROLES table. */
        try {
            $count = $table->insert(array('ROLE_CODE'=>$role_code, 'ROLE_TEXT'=>$role_text, 'ROLE_NOTE'=>$role_note));
        }
        catch (Zend_Exception $e) {
            logMe("Failed to insert URBAC_ROLES. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Insert data into URBAC_ROLE_DOMAINS_PRIVILEGES table. */
        $ret = $this->addRDP($role_code, $doprivilege);
        if ($ret != RETURN_URBAC_0) {
            $table->getAdapter()->rollBack();
            return $ret;
        }

        /* Commit */
        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Failed to commit. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }

        logMe("Creating Role succeed!");
        return RETURN_URBAC_0;
    }

    /**
    * Get the count of a role linked to users.
    *
    * @param string $role_code role code
    * @return the linked role count
    */
    public function getUserRoleCount($filter)
    {
        try {
            $table = new Application_Model_DbTable_URBAC_USER_ROLES();
            $db_temp = $table->getAdapter();
            $select = $db_temp->select()
                ->from(array('URBAC_USER_ROLES'))
                ->joinLeft(array('URBAC_ROLES'), 'URBAC_USER_ROLES.ROLE_ID = URBAC_ROLES.ROLE_ID');
            if ($filter != "")
            {
                $select->where('URBAC_ROLES.ROLE_CODE=?',$filter);
            }
            logMe($select);
            $stmt = $db_temp->query($select);
            $rows = $stmt->fetchAll();
        }
        catch (Zend_Exception $e) {
            logMe("Failed to get User_Role count. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }

        return (count($rows));
    }

    /**
    * Delete a role.
    *
    * @param string $role_code role code
    * @return exec status
    */
    public function delRole($role_code)
    {
        logMe("Info: ++++++Running into delRole()++++++");
        
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $table->getAdapter()->beginTransaction();

        /* Get the role ID. */
        $role_id  = $this->getRoleID($role_code);
        if ($role_id == RETURN_FAIL or $role_id == null) {
            logMe("Error. Can't get role ID.");
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Delete role data from URBAC_ROLE_DOMAINS_PRIVILEGES and URBAC_ROLES. */
        $ret = $this->delRDP($role_id);
        if ($ret != RETURN_URBAC_0) {
            $table->getAdapter()->rollBack();
            return $ret;
        }

        $urbac_roles_tbl = new Application_Model_DbTable_URBAC_ROLES();
        try
        {
            $where[0] = $urbac_roles_tbl->getAdapter()->quoteInto('ROLE_ID = ?', $role_id);
            $count = $urbac_roles_tbl->delete($where);
            logMe("URBAC_ROLES delete count=" . $count);
        }
        catch (Zend_Exception $e)
        {
            logMe("Failed to delete URBAC_ROLES. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
    
        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Failed to commit. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        logMe("Deleting Role succeed!");
        return RETURN_URBAC_0;
    }

    /**
    * Get Role ID according to role code.
    *
    * @param string $role_code role code
    * @return Role ID
    */
    public function getRoleID($role_code)
    {
        $role_id = null;
        
        try {
            $table = new Application_Model_DbTable_URBAC_ROLES();
            
            /* Get the role ID. */
            $sql="select ROLE_ID from URBAC_ROLES where ROLE_CODE='" . $role_code. "'";
            $rows = $table->getAdapter()->fetchAll($sql);
            if (count($rows) > 0) {
                $role_id = $rows[0]['ROLE_ID'];
            }
        }
        catch (Zend_Exception $e) {
            logMe("Failed to get Role ID. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }

        return $role_id;
    }

    /**
    * Delete role data from Role-Domain-Privilege table.
    *
    * @param string $role_id role ID
    * @return exec status 
    */
    public function delRDP($role_id)
    {
        logMe("Info: ++++++Running into delRDP()++++++");
        
        /* Delete data from URBAC_ROLE_DOMAINS_PRIVILEGES. */
        $urbac_role_domains_privileges_tbl = new Application_Model_DbTable_URBAC_ROLE_DOMAINS_PRIVILEGES();
        try
        {
            $where[0] = $urbac_role_domains_privileges_tbl->getAdapter()->quoteInto('ROLE_ID = ?', $role_id);
            $count = $urbac_role_domains_privileges_tbl->delete($where);
            logMe("URBAC_ROLE_DOMAINS_PRIVILEGES delete count=" . $count);
        }
        catch (Zend_Exception $e)
        {
            logMe("Failed to delete URBAC_ROLE_DOMAINS_PRIVILEGES. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }
        
        logMe("Deleting RDP table succeed!");
        return RETURN_URBAC_0;
    }

    public function addRDP_ori($data)
    {
        logMe("Info: ++++++Running into addRDP()++++++");
        
        if (!$data) {
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_URBAC_ROLES();

        /* Get current role ID. */
        $role_id  = $this->getRoleID($data->role_code);
        if ($role_id == RETURN_FAIL or $role_id == null) {
            logMe("Error. Can't get role ID.");
            //$table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Insert data into RDP table. */
        $urbac_role_domains_privileges_tbl = new Application_Model_DbTable_URBAC_ROLE_DOMAINS_PRIVILEGES();
        $arrCnt = count($data->domainprivilege);
        logMe("DomainPrivilege array count = ". $arrCnt);
        for($loop =0; $loop < $arrCnt; $loop++) {
        
            logMe("new pair starts...");
            $arrCnt2 = count($data->domainprivilege[$loop]->domainprivilegevpairs);
            logMe("DomainPrivilegeVPair array count = ". $arrCnt2);
            
            $is_first_item = true;
            $domain_id = "";
            $privilege_id = "";
            for($loop2 =0; $loop2 < $arrCnt2; $loop2++) {
                logMe("DomainPrivilegeVPair[". $loop2 ."] = " . $data->domainprivilege[$loop]->domainprivilegevpairs[$loop2]->obj);
                
                $obj_text = $data->domainprivilege[$loop]->domainprivilegevpairs[$loop2]->obj;
                
                if ($is_first_item === true) {
                    /* Store the Domain ID. */
                    $sql="select DOMAIN_ID from URBAC_DOMAINS where DOMAIN_TEXT='" . $obj_text . "'";
                    try {
                        $rows = $table->getAdapter()->fetchAll($sql);
                        if (count($rows) > 0) {
                            $domain_id = $rows[0]['DOMAIN_ID'];
                            $is_first_item = false;
                        }
                        else {
                            logMe("Error: Parameters err - can not find Domain ID");
                            //$table->getAdapter()->rollBack();
                            return RETURN_URBAC_ERR_2;
                        }
                    }
                    catch (Zend_Exception $e) {
                        logMe("Failed to store domain ID. Error message: " . $e->getMessage());
                        return RETURN_FAIL;
                    }
                }
                else {
                    /* Get Privilege ID. */
                    $sql="select PRIVILEGE_ID from URBAC_PRIVILEGES where PRIVILEGE_TEXT='" . $obj_text . "'";
                    try {
                        $rows = $table->getAdapter()->fetchAll($sql);
                        if (count($rows) > 0) {
                            $privilege_id = $rows[0]['PRIVILEGE_ID'];
                        }
                        else {
                            logMe("Error: Parameters err - can not find Privilege ID");
                            //$table->getAdapter()->rollBack();
                            return RETURN_URBAC_ERR_3;
                        }
                    }
                    catch (Zend_Exception $e) {
                        logMe("Failed to store domain ID. Error message: " . $e->getMessage());
                        return RETURN_FAIL;
                    }
                    
                    /* Insert data into URBAC_ROLE_DOMAINS_PRIVILEGES. */
                    try {
                        $count = $urbac_role_domains_privileges_tbl->insert(array('ROLE_ID'=>$role_id, 'DOMAIN_ID'=>$domain_id, 'PRIVILEGE_ID'=>$privilege_id, 'DOMAIN_ROLE_ACTIVE'=>$data->role_status));
                    }
                    catch (Zend_Exception $e) {
                        logMe("Failed to insert URBAC_ROLE_DOMAINS_PRIVILEGES. Error message: " . $e->getMessage());
                        //$table->getAdapter()->rollBack();
                        return RETURN_FAIL;
                    }
                    logMe("Insert URBAC_ROLE_DOMAINS_PRIVILEGES succeed!");
                }
                
            }
        }

        logMe("Adding RDP succeed!");
        return RETURN_URBAC_0;
    }
    
    public function addRole_ori($data)
    {
        logMe("Info: ++++++Running into addRole()++++++");
        
        if (!$data) {
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $table->getAdapter()->beginTransaction();
        
        /* Insert data into URBAC_ROLES table. */
        try {
            $count = $table->insert(array('ROLE_CODE'=>$data->role_code, 'ROLE_TEXT'=>$data->role_text, 'ROLE_NOTE'=>$data->role_note, 'ROLE_RANK'=>$data->role_rank, 'ROLE_TYPE'=>$data->role_type, 'ROLE_STATUS'=>$data->role_status));
        }
        catch (Zend_Exception $e) {
            logMe("Failed to insert URBAC_ROLES. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Insert data into URBAC_ROLE_DOMAINS_PRIVILEGES table. */
        $ret = $this->addRDP($data);
        if ($ret != RETURN_URBAC_0) {
            $table->getAdapter()->rollBack();
            return $ret;
        }

        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Failed to commit. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }

        logMe("Creating Role succeed!");
        return RETURN_URBAC_0;
    }

    public function updRole($data)
    {
        logMe("Info: ++++++Running into updRole()++++++");
        
        if (!$data) {
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $table->getAdapter()->beginTransaction();
        
        /* Get old role ID. */
        $role_id  = $this->getRoleID($data->role_code_old);
        if ($role_id == RETURN_FAIL or $role_id == null) {
            logMe("Error. Updating Role -> can't get role ID.");
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }

        /* Update URBAC_ROLES table. */
        $role_data = array(
                'ROLE_CODE'      => $data->role_code,
                'ROLE_TEXT'      => $data->role_text,
                'ROLE_NOTE'      => $data->role_note,
                'ROLE_RANK'      => $data->role_rank,
                'ROLE_TYPE'      => $data->role_type,
                'ROLE_STATUS'    => $data->role_status
                );
        $where = $table->getAdapter()->quoteInto('ROLE_ID = ?', $role_id);
        try {
            $count = $table->update($role_data, $where);
        }
        catch (Zend_Exception $e) {
            logMe("Failed to update URBAC_ROLES. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }

        /* Update URBAC_ROLE_DOMAINS_PRIVILEGES table. First delete all relevant and then insert. */
        $ret = $this->delRDP($role_id);
        if ($ret != RETURN_URBAC_0) {
            $table->getAdapter()->rollBack();
            return $ret;
        }
        $ret = $this->addRDP($data);
        if ($ret != RETURN_URBAC_0) {
            $table->getAdapter()->rollBack();
            return $ret;
        }
        
        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Failed to commit. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }

        logMe("Updating Role succeed!");
        return RETURN_URBAC_0;
    }

    public function cpyRole($data)
    {
        logMe("Info: ++++++Running into cpyRole()++++++");
        
        if (!$data) {
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $table->getAdapter()->beginTransaction();
        
        /* Find the next available role code in URBAC_ROLES table for the new Role. */
        $ret = $this->getNextRoleCode();
        if ($ret == RETURN_FAIL || $ret == RETURN_URBAC_ERR_7) {
            logMe("Error. Copying Role -> can't get next role code.");
            $table->getAdapter()->rollBack();
            return $ret;
        }
        $role_code_new = $ret;
        
        /* Get current role data in URBAC_ROLES table. */
        $role_id = 0;
        $role_note = "";
        $role_rank = 0;
        $role_type = 0;
        $role_status = 0;
        try {
            $sql="select ROLE_ID, ROLE_NOTE, ROLE_RANK, ROLE_TYPE, ROLE_STATUS from URBAC_ROLES where ROLE_TEXT='" . $data->role_text . "'";
            $rows = $table->getAdapter()->fetchAll($sql);
            if (count($rows) > 0) {
                $role_id = $rows[0]['ROLE_ID'];
                $role_note = $rows[0]['ROLE_NOTE'];
                $role_rank = $rows[0]['ROLE_RANK'];
                $role_type = $rows[0]['ROLE_TYPE'];
                $role_status = $rows[0]['ROLE_STATUS'];
            }
            else {
                logMe("Error: Can not find Role data");
                return RETURN_URBAC_ERR_5;
            }
        }
        catch (Zend_Exception $e) {
            logMe("Failed to get current role data. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }
        
        /* Create a new record in URBAC_ROLES table. */
        try {
            $count = $table->insert(array('ROLE_CODE'=>$role_code_new, 'ROLE_TEXT'=>$data->role_text_new, 'ROLE_NOTE'=>$role_note, 'ROLE_RANK'=>$role_rank, 'ROLE_TYPE'=>$role_type, 'ROLE_STATUS'=>$role_status));
        }
        catch (Zend_Exception $e) {
            logMe("Failed to insert URBAC_ROLES. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }

        /* Get the new role_id in URBAC_ROLES table. */
        $role_id_new = 0;
        try {
            $sql="select ROLE_ID from URBAC_ROLES where ROLE_TEXT='" . $data->role_text_new . "'";
            $rows = $table->getAdapter()->fetchAll($sql);
            if (count($rows) > 0) {
                $role_id_new = $rows[0]['ROLE_ID'];
            }
            else {
                logMe("Error: Can not find new role ID");
                return RETURN_URBAC_ERR_5;
            }
        }
        catch (Zend_Exception $e) {
            logMe("Failed to get new role ID. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }

        /* Insert new records in URBAC_ROLE_DOMAINS_PRIVILEGES table. */
        $domain_id = 0;
        $privilege_id = 0;
        $role_status = 0;
        $urbac_role_domains_privileges_tbl = new Application_Model_DbTable_URBAC_ROLE_DOMAINS_PRIVILEGES();
        try {
            $sql="select DOMAIN_ID,PRIVILEGE_ID,DOMAIN_ROLE_ACTIVE from URBAC_ROLE_DOMAINS_PRIVILEGES where ROLE_ID='" . $role_id . "' order by DOMAIN_ID,PRIVILEGE_ID,DOMAIN_ROLE_ACTIVE";
            $rows = $table->getAdapter()->fetchAll($sql);
            if (count($rows) > 0) {
                // Skip. Nothing to do.
                logMe("Info: RDP total count is:". count($rows));
            }
            else {
                logMe("Error: Can not find new role data");
                return RETURN_URBAC_ERR_5;
            }
            for ($loop = 0; $loop < count($rows); $loop++) {
                $domain_id = $rows[$loop]['DOMAIN_ID'];
                $privilege_id = $rows[$loop]['PRIVILEGE_ID'];
                $role_status = $rows[$loop]['DOMAIN_ROLE_ACTIVE'];
                $count = $urbac_role_domains_privileges_tbl->insert(array('ROLE_ID'=>$role_id_new, 'DOMAIN_ID'=>$domain_id, 'PRIVILEGE_ID'=>$privilege_id, 'DOMAIN_ROLE_ACTIVE'=>$role_status));
            }
        }
        catch (Zend_Exception $e) {
            logMe("Failed to insert new records in URBAC_ROLE_DOMAINS_PRIVILEGES. Error message: " . $e->getMessage());
            return RETURN_FAIL;
        }

        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Failed to commit. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }

        logMe("Copying Role succeed!");
        return RETURN_URBAC_0;
    }
    
    public function delRole_ori($data)
    {
        logMe("Info: ++++++Running into delRole()++++++");
        
        if (!$data) {
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $table->getAdapter()->beginTransaction();

        /* Get the role ID. */
        $role_id  = $this->getRoleID($data->role_code);
        if ($role_id == RETURN_FAIL or $role_id == null) {
            logMe("Error. Can't get role ID.");
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Delete role data from URBAC_ROLE_DOMAINS_PRIVILEGES and URBAC_ROLES. */
        $ret = $this->delRDP($role_id);
        if ($ret != RETURN_URBAC_0) {
            $table->getAdapter()->rollBack();
            return $ret;
        }

        $urbac_roles_tbl = new Application_Model_DbTable_URBAC_ROLES();
        try
        {
            $where[0] = $urbac_roles_tbl->getAdapter()->quoteInto('ROLE_ID = ?', $role_id);
            $count = $urbac_roles_tbl->delete($where);
            logMe("URBAC_ROLES delete count=" . $count);
        }
        catch (Zend_Exception $e)
        {
            logMe("Failed to delete URBAC_ROLES. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
    
        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Failed to commit. Error message: " . $e->getMessage());
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        logMe("Deleting Role succeed!");
        return RETURN_URBAC_0;
    }
}
