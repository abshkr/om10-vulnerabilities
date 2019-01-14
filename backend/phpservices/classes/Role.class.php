<?php
/**
* The lib functions for Role Based Access Control.
*
* @author Jack Zhu (jackzhu@diamondkey.com)
* @version 1.0 (for Omega5000 R2.1)
* @package class
*/

require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/Journal.class.php');

/* define the module name for calling logMe() to output */
if(!defined('ROLECLASS')) define('ROLECLASS','Role.class');

define ("RETURN_URBAC_0",     "0");	            /* Process succeed */
define ("RETURN_URBAC_ERR_1", "1");	            /* Role Code or Role Name NOT unique */
define ("RETURN_URBAC_ERR_2", "2");	            /* Domian Name error */
define ("RETURN_URBAC_ERR_3", "3");	            /* Failed to add role */
define ("RETURN_URBAC_ERR_4", "4");	            /* Role still in use */
define ("RETURN_URBAC_ERR_5", "5");	            /* Can not find role data */
define ("RETURN_URBAC_ERR_6", "6");	            /* Role Code invalid. Length should be N chars and step should within M. */
define ("RETURN_URBAC_ERR_7", "7");	            /* Role Code number reaches the limitation. */
define ("RETURN_URBAC_ERR_8", "8");	            /* Role Code does not exist. */
define ("RETURN_URBAC_ERR_9", "9");	            /* Parameters couldn't be null */
define ("RETURN_URBAC_ERR_EXCEPTION", "-1");    /* Exception */

define ("ROLE_CODE_STEP", "2");
define ("ROLE_CODE_LEN", "7");
define ("ROLE_CODE_PREFIX", "R");
define ("PRIVILEGE_CNT", "5");

class RoleClass {
    private $Privilege_nm;
    private $mydb;

    public function __construct() {
        $this->Privilege_nm = array("PRIV_PROTECT", "PRIV_VIEW", "PRIV_UPDATE", "PRIV_CREATE", "PRIV_DELETE");
        $this->mydb = DB::getInstance();
    }
        
    /**
    * Get the next valid role code.
    * 
    * @return string next valid role code
    */    
    public function getNextRoleCode() {
        $role_cd_max = ROLE_CODE_PREFIX . "000000";
        
        /* Get the maximum role ID. */
        $sql="SELECT MAX(ROLE_CODE) ROLE_CD_MAX FROM URBAC_ROLES";
        $rows = $this->mydb->query($sql);
        if (DB_RETURN_FAIL == $rows) {
            logMe("Error: Failed to get next Role Code.", ROLECLASS);
            return RETURN_FAIL;
        }
        
        if (count($rows) > 0) {
            $role_cd_max = $rows[0]->ROLE_CD_MAX != null ? $rows[0]->ROLE_CD_MAX : $role_cd_max;
        }

        /* Prepare next role code. */
        $role_cd_max_no = substr($role_cd_max, 1, 6);
        $role_cd_next_no = $role_cd_max_no + 1;
        if ($role_cd_next_no >= 999999) {
            return RETURN_URBAC_ERR_7;
        }
        $role_cd_next = 'R' . sprintf("%000006d", strval($role_cd_next_no));

        logMe("Max  Role Code =". $role_cd_max, ROLECLASS);
        logMe("Next Role Code =". $role_cd_next, ROLECLASS);
        
        return $role_cd_next;
    }

    /**
    * Get role records count according to role_code or role_text.
    *
    * @param string $filter1 role code
    * @param string $filter2 role text
    * @return integer role count
    */
    public function getRoleCount($filter1, $filter2) {
        $sql="SELECT COUNT(*) REC_COUNT FROM URBAC_ROLES ";
        $where = "";
        $cnt1 = 0;
        $cnt2 = 0;
        if ($filter1 != "") {
            //$where = " WHERE ROLE_CODE ='" . $filter1 . "'";
            //$rows = $this->mydb->query($sql.$where);
			
			$sqlarray = array();
			$sqlarray['sql_text'] = "SELECT COUNT(*) REC_COUNT FROM URBAC_ROLES WHERE ROLE_CODE =:filter1 ";
			$sqlarray['sql_data'] = array( $filter1 );
            $rows = $this->mydb->query($sqlarray);
			
            if (DB_RETURN_FAIL == $rows) {
                logMe("Error: Failed to get Role count.", ROLECLASS);
                return RETURN_FAIL;
            }                
            $cnt1 = $rows[0]->REC_COUNT;
        }
        if ($filter2 != "") {
            //$where = " WHERE upper(ROLE_TEXT) ='" . strtoupper($filter2) . "'";
            //$rows = $this->mydb->query($sql.$where);
			
			$sqlarray = array();
			$filter2 = strtoupper($filter2);
			$sqlarray['sql_text'] = "SELECT COUNT(*) REC_COUNT FROM URBAC_ROLES WHERE upper(ROLE_TEXT) =:filter2 ";
			$sqlarray['sql_data'] = array( $filter2 );
            $rows = $this->mydb->query($sqlarray);
			
            if (DB_RETURN_FAIL == $rows) {
                logMe("Error: Failed to get Role count.", ROLECLASS);
                return RETURN_FAIL;
            }                
            $cnt2 = $rows[0]->REC_COUNT;
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
    public function getRole($role_code) {
        logMe("Info: ++++++Running into getRole()++++++", ROLECLASS);
        $ret = new Urbac_Roles();
        $doprivl = array();

        /* Get role data. */
        //$sql = "SELECT ROLE_ID, ROLE_TEXT, ROLE_NOTE, ROLE_STATUS FROM URBAC_ROLES WHERE ROLE_CODE='" . $role_code. "'";
        //$rows = $this->mydb->query($sql);
			
		$sqlarray = array();
		$sqlarray['sql_text'] = "SELECT ROLE_ID, ROLE_TEXT, ROLE_NOTE, ROLE_STATUS FROM URBAC_ROLES WHERE ROLE_CODE=:role_code ";
		$sqlarray['sql_data'] = array( $role_code );
        $rows = $this->mydb->query($sqlarray);
			
        if (count($rows) > 0) {
            $role_id = $rows[0]->ROLE_ID;
            $role_text = $rows[0]->ROLE_TEXT;
            $role_note = $rows[0]->ROLE_NOTE;
            $role_status = $rows[0]->ROLE_STATUS;

            logMe("--role_text: " . $role_text, ROLECLASS);
            logMe("--role_note: " . $role_note, ROLECLASS);
            
            //$sql_do = "SELECT DOMAIN_ID, OBJECT_ID FROM URBAC_ROLE_DOMAINS_PRIVILEGES WHERE ROLE_ID='" . $role_id . "' and DOMAIN_ROLE_ACTIVE=1 group by DOMAIN_ID, OBJECT_ID order by DOMAIN_ID, OBJECT_ID";
            //$rows_do = $this->mydb->query($sql_do);
			
			$sqlarray2 = array();
			$sqlarray2['sql_text'] = "SELECT DOMAIN_ID, OBJECT_ID FROM URBAC_ROLE_DOMAINS_PRIVILEGES WHERE ROLE_ID=:role_id and DOMAIN_ROLE_ACTIVE=1 group by DOMAIN_ID, OBJECT_ID order by DOMAIN_ID, OBJECT_ID";
			$sqlarray2['sql_data'] = array( $role_id );
			$rows_do = $this->mydb->query($sqlarray2);
			
            $do_cnt = count($rows_do);
            if ($do_cnt > 0) {
                for($loop_do = 0; $loop_do < $do_cnt; $loop_do++) {
                    $dom_id = $rows_do[$loop_do]->DOMAIN_ID;
                    $obj_id = $rows_do[$loop_do]->OBJECT_ID;
                    // logMe("------dom_id: " . $dom_id, ROLECLASS);
                    // logMe("------obj_id: " . $obj_id, ROLECLASS);

                    $domainprivilege = new DomainPrivilege_vo();
                    $domainprivilege->domain_id = $dom_id;
                    $domainprivilege->object_id = $obj_id;
                    $domainprivilege->priv_protect = 0;
                    $domainprivilege->priv_view = 0;
                    $domainprivilege->priv_update = 0;
                    $domainprivilege->priv_create = 0;
                    $domainprivilege->priv_delete = 0;
                    $domainprivilege->needsCGI = 0;
						
                    //$sql_obj = "SELECT OBJECT_CGI_NAME FROM URBAC_OBJECTS WHERE OBJECT_ID='" . $obj_id. "'";
                    //$rows_obj = $this->mydb->query($sql_obj);
			
					$sqlarray3 = array();
					$sqlarray3['sql_text'] = "SELECT OBJECT_CGI_NAME FROM URBAC_OBJECTS WHERE OBJECT_ID=:obj_id ";
					$sqlarray3['sql_data'] = array( $obj_id );
					$rows_obj = $this->mydb->query($sqlarray3);
			
                    $obj_cnt = count($rows_obj);
                    if ($obj_cnt > 0) {
                        if (strlen(trim($rows_obj[0]->OBJECT_CGI_NAME)) <> 0) {
                            //logMe("Info: OBJECT_CGI_NAME length <> 0", ROLECLASS);
                            $domainprivilege->needsCGI = 1;
                        }
                    }
                    // logMe("------needsCGI: " . $domainprivilege->needsCGI, ROLECLASS);	

                    //$sql_privl = "SELECT PRIVILEGE_ID FROM URBAC_ROLE_DOMAINS_PRIVILEGES WHERE ROLE_ID='" . $role_id. "'" . "and DOMAIN_ID='" . $dom_id . "' and OBJECT_ID='" . $obj_id ."' and DOMAIN_ROLE_ACTIVE=1";
                    //$rows_privl = $this->mydb->query($sql_privl);
			
					$sqlarray4 = array();
					$sqlarray4['sql_text'] = "SELECT PRIVILEGE_ID FROM URBAC_ROLE_DOMAINS_PRIVILEGES WHERE ROLE_ID=:role_id and DOMAIN_ID=:dom_id and OBJECT_ID=:obj_id and DOMAIN_ROLE_ACTIVE=1";
					$sqlarray4['sql_data'] = array( $role_id, $dom_id, $obj_id );
					$rows_privl = $this->mydb->query($sqlarray4);
			
                    $privl_cnt = count($rows_privl);
                    if ($privl_cnt > 0) {

                        /* Fill the privilege variable list. */
                        for($loop_privl = 0; $loop_privl < $privl_cnt; $loop_privl++) {
                            /* Get privilege text */
                            $privilege_text = "";
                            //$sql_privl_txt = "SELECT PRIVILEGE_TEXT FROM URBAC_PRIVILEGES WHERE PRIVILEGE_ID='" . $rows_privl[$loop_privl]->PRIVILEGE_ID . "'";
                            //$rows_privl_txt = $this->mydb->query($sql_privl_txt);
			
							$sqlarray5 = array();
							$sqlarray5['sql_text'] = "SELECT PRIVILEGE_TEXT FROM URBAC_PRIVILEGES WHERE PRIVILEGE_ID=:privilege_id ";
							$sqlarray5['sql_data'] = array( $rows_privl[$loop_privl]->PRIVILEGE_ID );
							$rows_privl_txt = $this->mydb->query($sqlarray5);
			
                            if (DB_RETURN_FAIL == $rows_privl_txt) {
                                logMe("Error: Failed to get privl text.", ROLECLASS);
                                continue;                                
                            } else {
                                if (count($rows_privl_txt) > 0) {
                                    $privilege_text = $rows_privl_txt[0]->PRIVILEGE_TEXT;
                                } else {
                                    logMe("Can not find Privilege Text", ROLECLASS);
                                    continue;
                                }
                            }

                            switch ($privilege_text) {
                            case "PRIV_PROTECT":
                                $domainprivilege->priv_protect = 1;
                                // logMe("----------privilege_text: " . $privilege_text, ROLECLASS);
                                break;
                            case "PRIV_VIEW":
                                $domainprivilege->priv_view = 1;
                                // logMe("----------privilege_text: " . $privilege_text, ROLECLASS);
                                break;
                            case "PRIV_UPDATE":
                                $domainprivilege->priv_update = 1;
                                // logMe("----------privilege_text: " . $privilege_text, ROLECLASS);
                                break;
                            case "PRIV_CREATE":
                                $domainprivilege->priv_create = 1;
                                // logMe("----------privilege_text: " . $privilege_text, ROLECLASS);
                                break;
                            case "PRIV_DELETE":
                                $domainprivilege->priv_delete = 1;
                                // logMe("----------privilege_text: " . $privilege_text, ROLECLASS);
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
    
    public function getAllRoles() {
        //$sql="SELECT * FROM URBAC_ROLES WHERE ROLE_ID>=0 ORDER BY ROLE_CODE";
		$sql = " 
			select 
				ur.ROLE_ID 
				, ur.ROLE_CODE 
				, al.AUTH_LEVEL_NAME 		as ROLE_TEXT 
				, ur.ROLE_NOTE 
				, ur.ROLE_RANK 
				, ur.ROLE_TYPE 
				, ur.ROLE_STATUS 
				, ur.RECORD_SWITCH 
				, ur.RECORD_ORDER 
			from 
				URBAC_ROLES 		ur
				, auth_level_typ 	al
			where
				ur.ROLE_ID = al.AUTH_LEVEL_ID
		";
		
        $rows = $this->mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return ($rows);
    }

    /**
    * Check role code validity.
    *
    * @param string $role_code role code
    * @return value of check status 
    */
    public function chkRoleCode($role_code) {
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
        if (RETURN_FAIL == $ret || RETURN_URBAC_ERR_7 == $ret) {
            logMe("Error: Can't get next role code.", ROLECLASS);
            return $ret;
        }
        $role_code_next = $ret;
        $role_no_next = substr($role_code_next, 1, 6);
        $role_no = substr($role_code, 1, 6);
        // logMe("role_no_next: " . $role_no_next, ROLECLASS);
        // logMe("role_no: " . $role_no, ROLECLASS);
        // logMe("role_no - role_no_next: " . ($role_no - $role_no_next), ROLECLASS);
        if (($role_no - $role_no_next) > ROLE_CODE_STEP) {
            return RETURN_URBAC_ERR_6;
        }
        
        return RETURN_URBAC_0;
    }

    /**
    * Get the count of a role linked to users.
    *
    * @param string $role_code role code
    * @return the linked role count
    */
    public function getUserRoleCount($filter) {
		/*
        $sql = "SELECT * FROM URBAC_USER_ROLES,URBAC_ROLES WHERE URBAC_USER_ROLES.ROLE_ID = URBAC_ROLES.ROLE_ID";
        if ($filter != "") {
            $sql .= " AND URBAC_ROLES.ROLE_CODE='".$filter."'";
        }
        logMe($sql, ROLECLASS);
        $rows = $this->mydb->query($sql);
		*/	
		$sqlarray = array();
		$sqlarray['sql_text'] = "SELECT * FROM URBAC_USER_ROLES,URBAC_ROLES WHERE URBAC_USER_ROLES.ROLE_ID = URBAC_ROLES.ROLE_ID";
		$sqlarray['sql_data'] = array( );
        if ($filter != "") {
			$sqlarray['sql_text'] = $sqlarray['sql_text'] . " AND URBAC_ROLES.ROLE_CODE=:filter ";;
			$sqlarray['sql_data'] = array( $filter );
        }
        $rows = $this->mydb->query($sqlarray);
			
        if (DB_RETURN_FAIL == $rows) {
            logMe("Failed to get User_Role count.", ROLECLASS);
            return RETURN_FAIL;
        }

        return (count($rows));
    }
    
    /**
    * Add role data into Role-Domain-Privilege table.
    *
    * @param string $role_code role code
    * @param $domprivl(domain-object-privilege variable list)
    * @param $mode
    * @return exec status 
    */
    public function addRDP($role_code, $domprivl, $mode=OCI_NO_AUTO_COMMIT) {
        logMe("Info: ++++++Running into addRDP()++++++", ROLECLASS);

        /* Get current role ID. */
        $role_id  = $this->getRoleID($role_code, $mode);
        if (RETURN_FAIL == $role_id || null == $role_id) {
            logMe("Error: Can't get role ID.", ROLECLASS);
            return RETURN_FAIL;
        }
        
        /* Insert data into RDP table. */
        $arrCnt = count($domprivl->domainprivileges);
        logMe("domprivilege array count = ". $arrCnt, ROLECLASS);
        for($loop = 0; $loop < $arrCnt; $loop++) {
        
            logMe("new pair starts...", ROLECLASS);
            $arrPrivlCnt = count($this->Privilege_nm);
            logMe("Privilege_nm array count = ". $arrPrivlCnt, ROLECLASS);
            
            $domain_id = $domprivl->domainprivileges[$loop]->domain_id;
            $object_id = $domprivl->domainprivileges[$loop]->object_id;    

            for($loop2 =0; $loop2 < $arrPrivlCnt; $loop2++) {
                //logMe("domainprivileges[". $loop2 ."] = " . $domprivl[$loop]->domainprivileges[$loop2]->obj);

                $privilege_text = "";
                $privilege_id = "";
                /* Get Privilege ID. */
                switch ($this->Privilege_nm[$loop2]) {
                    case "PRIV_PROTECT":
                        $privilege_text = $domprivl->domainprivileges[$loop]->priv_protect == 1 ? "PRIV_PROTECT" : "";
                        break;
                    case "PRIV_VIEW":
                        $privilege_text = $domprivl->domainprivileges[$loop]->priv_view == 1 ? "PRIV_VIEW" : "";
                        break;
                    case "PRIV_UPDATE":
                        $privilege_text = $domprivl->domainprivileges[$loop]->priv_update == 1 ? "PRIV_UPDATE" : "";
                        break;
                    case "PRIV_CREATE":
                        $privilege_text = $domprivl->domainprivileges[$loop]->priv_create == 1 ? "PRIV_CREATE" : "";
                        break;
                    case "PRIV_DELETE":
                        $privilege_text = $domprivl->domainprivileges[$loop]->priv_delete == 1 ? "PRIV_DELETE" : "";
                        break;
                }
                if ($privilege_text != "") {
                    logMe("Info: privilege_text = " . $privilege_text, ROLECLASS);
                    //$sql="SELECT PRIVILEGE_ID FROM URBAC_PRIVILEGES WHERE PRIVILEGE_TEXT='" . $privilege_text . "'";
                    //$rows = $this->mydb->query($sql, $mode);
			
					$sqlarray = array();
					$sqlarray['sql_text'] = "SELECT PRIVILEGE_ID FROM URBAC_PRIVILEGES WHERE PRIVILEGE_TEXT=:privilege_text ";
					$sqlarray['sql_data'] = array( $privilege_text );
					$rows = $this->mydb->query($sqlarray, $mode);
			
                    if (DB_RETURN_FAIL == $rows) {
                        logMe("Error: Failed to store domain ID.", ROLECLASS);
                        return RETURN_FAIL;
                    } else {
                        if (count($rows) > 0) {
                            $privilege_id = $rows[0]->PRIVILEGE_ID;
                        }
                        else {
                            logMe("Can not find Privilege ID", ROLECLASS);
                            //$table->getAdapter()->rollBack();
                            return RETURN_URBAC_ERR_3;
                        }
                    }
                    
                    /* Insert data into URBAC_ROLE_DOMAINS_PRIVILEGES. */
                    logMe("Info: role_id = " . $role_id, ROLECLASS);
                    logMe("Info: domain_id = " . $domain_id, ROLECLASS);
                    logMe("Info: object_id = " . $object_id, ROLECLASS);
                    logMe("Info: privilege_id = " . $privilege_id, ROLECLASS);

                    //$sql = "INSERT INTO URBAC_ROLE_DOMAINS_PRIVILEGES(ROLE_ID,DOMAIN_ID,OBJECT_ID,PRIVILEGE_ID,DOMAIN_ROLE_ACTIVE) VALUES('".$role_id."','".$domain_id."','".$object_id."','".$privilege_id."','1')";
			
					$sql = array();
					$sql['sql_text'] = "INSERT INTO URBAC_ROLE_DOMAINS_PRIVILEGES(ROLE_ID,DOMAIN_ID,OBJECT_ID,PRIVILEGE_ID,DOMAIN_ROLE_ACTIVE) VALUES( :role_id, :domain_id, :object_id, :privilege_id, '1')";
					$sql['sql_data'] = array( $role_id, $domain_id, $object_id, $privilege_id );
			
                    $rows = $this->mydb->insert($sql, $mode);
                    if (DB_RETURN_FAIL == $rows) {
                        logMe("Failed to insert URBAC_ROLE_DOMAINS_PRIVILEGES.", ROLECLASS);
                        //$table->getAdapter()->rollBack();
                        return RETURN_FAIL;
                    }
                    logMe("Insert URBAC_ROLE_DOMAINS_PRIVILEGES succeed!", ROLECLASS);
                }
            }
        }
        logMe("Adding RDP succeed!", ROLECLASS);
        return RETURN_URBAC_0;
    }

    /**
    * Create role. Add role data into database.
    *
    * @param string $role_code role code
    * @param string $role_text role name
    * @param string $role_note role comments
    * @param $domprivl(domain-object-privilege variable list)
    * @return exec status 
    */
    public function addRole($role_code, $role_text, $role_note, $domprivl) {
        logMe("Info: ++++++Running into addRole()++++++", ROLECLASS);
        
        /*
        * !!!Adding role data needs to be put in a TRANSACTION!!!
        */
        
        /* Insert data into URBAC_ROLES table. */
        //$sql = "INSERT INTO URBAC_ROLES(ROLE_CODE,ROLE_TEXT,ROLE_NOTE) VALUES('".$role_code."','".$role_text."','".$role_note."')";
			
		$sql = array();
		$sql['sql_text'] = "INSERT INTO URBAC_ROLES(ROLE_CODE,ROLE_TEXT,ROLE_NOTE) VALUES( :role_code, :role_text, :role_note )";
		$sql['sql_data'] = array( $role_code, $role_text, $role_note );
			
        $res = $this->mydb->insert($sql, OCI_NO_AUTO_COMMIT);
        if (RETURN_OK != $res) {
            $this->mydb->rollBack();
            logMe("Error: Failed to insert URBAC_ROLES.", ROLECLASS);
            logMe("Rollback DB.", ROLECLASS);
            return RETURN_FAIL;
        }
        
        /* Insert data into URBAC_ROLE_DOMAINS_PRIVILEGES table. */
        $ret = $this->addRDP($role_code, $domprivl);
        if (RETURN_URBAC_0 != $ret) {
            $this->mydb->rollBack();
            logMe("Rollback DB.", ROLECLASS);
            return $ret;
        }

        /* Commit */
        $this->mydb->commit();
        logMe("Creating Role succeed!", ROLECLASS);
		
		/* Log the journal for role creation */
		if ($res == RETURN_OK)
		{
			$keys = array ("ROLE_CODE"=>($role_code), "ROLE_TEXT"=>($role_text));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Roles", "URBAC_ROLES", $keys, $excludes );
			$ins_journal->logOneLine("created a role [" . $role_code . ":" . $role_text . "] successfully");
		}
		
        return RETURN_URBAC_0;
    }
    
    /**
    * Update role. Update role data.
    *
    * @param string $role_code_old old role code
    * @param string $role_code new role code
    * @param string $role_text new role name
    * @param string $role_note new role comments
    * @param $domprivl(domain-object-privilege variable list)
    * @return exec status 
    */
    public function updRole($role_code_old, $role_code, $role_text, $role_note, $domprivl) {
        logMe("Info: ++++++Running into updRole()++++++", ROLECLASS);
        
        /*
        * !!!Updating role data needs to be put in a TRANSACTION!!!
        */        
        
        /* Get old role ID. */
        $role_id  = $this->getRoleID($role_code_old);
        if (RETURN_FAIL == $role_id || null == $role_id) {
            logMe("Error: Updating Role -> can't get role ID.", ROLECLASS);
            return RETURN_FAIL;
        }

        /* Update URBAC_ROLES table. */
		$params = array();
        $sql = "UPDATE URBAC_ROLES SET ";//ROLE_CODE='".$data->role_code."',ROLE_TEXT='".$data->role_text."',ROLE_NOTE='".$data->role_note."',ROLE_RANK='".$data->role_rank."',ROLE_TYPE=".$data->role_type.",ROLE_STATUS=".$data->role_status." WHERE ROLE_ID='".$role_id."'";
        if (0 != strlen(trim($role_code))) {
            //$sql .= "ROLE_CODE='".trim($role_code)."',";
            $sql .= "ROLE_CODE=:role_code,";
			$params[] = trim($role_code);
        }
        if (0 != strlen(trim($role_text))) {
            //$sql .= "ROLE_TEXT='".$role_text."',";
            $sql .= "ROLE_TEXT=:role_text,";
			$params[] = $role_text;
        }        
        if (0 != strlen(trim($role_note))) {
            //$sql .= "ROLE_NOTE='".$role_note."',";
            $sql .= "ROLE_NOTE=:role_note,";
			$params[] = $role_note;
        }
        /* At least one of above parameters should not be null, so cut the right ',' */
        $sql = substr($sql, 0, strlen($sql)-1);
        //$sql .= " WHERE ROLE_ID=".$role_id;
        $sql .= " WHERE ROLE_ID=:role_id";
		$params[] = $role_id;
        logMe($sql, ROLECLASS);
        //$res = $this->mydb->update($sql, OCI_NO_AUTO_COMMIT);
			
		$sqlarray = array();
		$sqlarray['sql_text'] = $sql;
		$sqlarray['sql_data'] = $params;
        $res = $this->mydb->update($sqlarray, OCI_NO_AUTO_COMMIT);
		
        if (RETURN_OK != $res) {
            $this->mydb->rollBack();
            logMe("Error: Failed to update URBAC_ROLES.", ROLECLASS);
            logMe("Rollback DB.", ROLECLASS);
            return RETURN_FAIL;
        }

        /* Update URBAC_ROLE_DOMAINS_PRIVILEGES table. First delete all relevant data and then insert. */
        $ret = $this->delRDP($role_id);
        if (RETURN_URBAC_0 != $ret) {
            $this->mydb->rollBack();
            logMe("Rollback DB.", ROLECLASS);
            return $ret;
        }
        $ret = $this->addRDP($role_code, $domprivl);
        if (RETURN_URBAC_0 != $ret) {
            $this->mydb->rollBack();
            logMe("Rollback DB.", ROLECLASS);
            return $ret;
        }        
        
        /* Commit */
        $this->mydb->commit();
        logMe("Updating Role succeed!", ROLECLASS);
		
		/* Log the journal for role modification */
		if ($res == RETURN_OK)
		{
			$keys = array ("ROLE_CODE"=>($role_code));
			$excludes = array ();
			$upd_journal = new UpdateJournalClass( "Roles", "URBAC_ROLES", $keys, $excludes );
			$upd_journal->logOneLine("modified a role [" . $role_code . "] successfully");
		}
		
        return RETURN_URBAC_0;
    }

    /**
    * Get user's role code.
    *
    * @param string $user_cd
    * @return role code 
    */
    public function getUserRoleCode($user_cd) {
        logMe("Info: ++++++Running into getUserRoleCode()++++++", ROLECLASS);

        $role_cd = null;
        /* Get user's role code. */
        try {
            //$sql="SELECT ROLE_CODE FROM URBAC_USERS u, URBAC_USER_ROLES ur, URBAC_ROLES r WHERE u.USER_ID= ur.USER_ID and r.ROLE_ID = ur.ROLE_ID and u.USER_CODE='" . $user_cd. "'";
            //$rows = $this->mydb->query($sql);
			
			$sqlarray = array();
			$sqlarray['sql_text'] = "SELECT ROLE_CODE FROM URBAC_USERS u, URBAC_USER_ROLES ur, URBAC_ROLES r WHERE u.USER_ID= ur.USER_ID and r.ROLE_ID = ur.ROLE_ID and u.USER_CODE=:user_cd ";
			$sqlarray['sql_data'] = array( $user_cd );
			$rows = $this->mydb->query($sqlarray);
			
            if (count($rows) > 0) {
                $role_cd = $rows[0]->ROLE_CODE;
            }
        }
        catch (Zend_Exception $e) {
            logMe("Error: Failed to get user's Role Code.", ROLECLASS);
            return RETURN_FAIL;
        }

        return $role_cd;
    }
    
    /**
    * Delete a role.
    *
    * @param string $role_code role code
    * @return exec status
    */
    public function delRole($role_code) {
        logMe("Info: ++++++Running into delRole()++++++", ROLECLASS);
        
        /*
        * !!!Deleting role data needs to be put in a TRANSACTION!!!
        */  
        
        /* Get the role ID. */
        $role_id  = $this->getRoleID($role_code);
        if (RETURN_FAIL == $role_id || null == $role_id) {
            logMe("Error: Can't get role ID.", ROLECLASS);
            return RETURN_FAIL;
        }
        
        /* Delete role data from URBAC_ROLE_DOMAINS_PRIVILEGES and URBAC_ROLES. */
        $ret = $this->delRDP($role_id);
        if (RETURN_URBAC_0 != $ret) {
            $this->mydb->rollBack();
            return $ret;
        }
        
        //$sql = "DELETE FROM URBAC_ROLES WHERE ROLE_ID='".$role_id."'";
			
		$sql = array();
		$sql['sql_text'] = "DELETE FROM URBAC_ROLES WHERE ROLE_ID=:role_id ";
		$sql['sql_data'] = array( $role_id );
			
        $res = $this->mydb->delete($sql, OCI_NO_AUTO_COMMIT);
        if (RETURN_OK != $res) {
            logMe("Error: Failed to delete URBAC_ROLES.", ROLECLASS);
            $this->mydb->rollBack();
            return RETURN_FAIL;
        }

        /* Commit */
        $this->mydb->commit();
        logMe("Deleting Role succeed!", ROLECLASS);
		
		/* Log the journal for role deletion */
		if ($res == RETURN_OK)
		{
			$keys = array ("ROLE_CODE"=>($role_code));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Roles", "URBAC_ROLES", $keys, $excludes );
			$del_journal->logOneLine("deleted a role [" . $role_code . "] successfully");
		}
		
        return RETURN_URBAC_0;
    }

	// seems never used by front-end, and may cause problem if it is used
    public function cpyRole($data) {
        logMe("Info: ++++++Running into cpyRole()++++++", ROLECLASS);

        /*
        * !!!Copying role data needs to be put in a TRANSACTION!!!
        */          
        
        if (!$data) {
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $table->getAdapter()->beginTransaction();
        
        /* Find the next available role code in URBAC_ROLES table for the new Role. */
        $ret = $this->getNextRoleCode();
        if (RETURN_FAIL == $ret || RETURN_URBAC_ERR_7 == $ret) {
            logMe("Error: Copying Role -> can't get next role code.", ROLECLASS);
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
            } else {
                logMe("Error: Can not find Role data", ROLECLASS);
                return RETURN_URBAC_ERR_5;
            }
        }
        catch (Zend_Exception $e) {
            logMe("Error: Failed to get current role data.", ROLECLASS);
            return RETURN_FAIL;
        }
        
        /* Create a new record in URBAC_ROLES table. */
        try {
            $count = $table->insert(array('ROLE_CODE'=>$role_code_new, 'ROLE_TEXT'=>$data->role_text_new, 'ROLE_NOTE'=>$role_note, 'ROLE_RANK'=>$role_rank, 'ROLE_TYPE'=>$role_type, 'ROLE_STATUS'=>$role_status));
        }
        catch (Zend_Exception $e) {
            logMe("Error: Failed to insert URBAC_ROLES.", ROLECLASS);
            return RETURN_FAIL;
        }

        /* Get the new role_id in URBAC_ROLES table. */
        $role_id_new = 0;
        try {
            $sql="select ROLE_ID from URBAC_ROLES where ROLE_TEXT='" . $data->role_text_new . "'";
            $rows = $table->getAdapter()->fetchAll($sql);
            if (count($rows) > 0) {
                $role_id_new = $rows[0]['ROLE_ID'];
            } else {
                logMe("Error: Can not find new role ID", ROLECLASS);
                return RETURN_URBAC_ERR_5;
            }
        }
        catch (Zend_Exception $e) {
            logMe("Error: Failed to get new role ID.", ROLECLASS);
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
                logMe("Info: RDP total count is:". count($rows), ROLECLASS);
            } else {
                logMe("Error: Can not find new role data", ROLECLASS);
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
            logMe("Error: Failed to insert new records in URBAC_ROLE_DOMAINS_PRIVILEGES.", ROLECLASS);
            return RETURN_FAIL;
        }

        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Error: Failed to commit.", ROLECLASS);
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }

        logMe("Copying Role succeed!", ROLECLASS);
        return RETURN_URBAC_0;
    }
    
    /**
    * Get Role ID according to role code.
    *
    * @param string $role_code role code
    * @return Role ID
    */
    public function getRoleID($role_code, $mode=OCI_NO_AUTO_COMMIT) {
        $role_id = null;
        
        try {
            /* Get the role ID. */
            //$sql="SELECT ROLE_ID FROM URBAC_ROLES WHERE ROLE_CODE='" . $role_code. "'";
			
			$sql = array();
			$sql['sql_text'] = "SELECT ROLE_ID FROM URBAC_ROLES WHERE ROLE_CODE=:role_code ";
			$sql['sql_data'] = array( $role_code );
			
            $rows = $this->mydb->query($sql, $mode);
            if (count($rows) > 0) {
                $role_id = $rows[0]->ROLE_ID;
            }
        }
        catch (Zend_Exception $e) {
            logMe("Error: Failed to get Role ID.", ROLECLASS);
            return RETURN_FAIL;
        }

        return $role_id;
    }

    /**
    * Delete role data from Role-Domain-Privilege table.
    *
    * @param string $role_id role ID
    * @param string $mode
    * @return exec status 
    */
    public function delRDP($role_id, $mode=OCI_NO_AUTO_COMMIT) {
        logMe("Info: ++++++Running into delRDP()++++++", ROLECLASS);
        
        /* Delete data from URBAC_ROLE_DOMAINS_PRIVILEGES. */
        try
        {
            //$sql ="DELETE FROM URBAC_ROLE_DOMAINS_PRIVILEGES WHERE ROLE_ID='".$role_id."'";
			
			$sql = array();
			$sql['sql_text'] = "DELETE FROM URBAC_ROLE_DOMAINS_PRIVILEGES WHERE ROLE_ID=:role_id ";
			$sql['sql_data'] = array( $role_id );
			
            $rows = $this->mydb->delete($sql, $mode);
            logMe("URBAC_ROLE_DOMAINS_PRIVILEGES deleted ROLE_ID=" . $role_id, ROLECLASS);
        }
        catch (Zend_Exception $e)
        {
            logMe("Error: Failed to delete URBAC_ROLE_DOMAINS_PRIVILEGES.", ROLECLASS);
            return RETURN_FAIL;
        }
        
        logMe("Deleting RDP table succeed!", ROLECLASS);
        return RETURN_URBAC_0;
    }

	// not used
    public function addRDP_dyn($data) {
        logMe("Info: ++++++Running into addRDP()++++++", ROLECLASS);
        
        if (!$data) {
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_URBAC_ROLES();

        /* Get current role ID. */
        $role_id  = $this->getRoleID($data->role_code);
        if (RETURN_FAIL == $role_id || null == $role_id) {
            logMe("Error: Can't get role ID.", ROLECLASS);
            //$table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Insert data into RDP table. */
        $urbac_role_domains_privileges_tbl = new Application_Model_DbTable_URBAC_ROLE_DOMAINS_PRIVILEGES();
        $arrCnt = count($data->domainprivilege);
        logMe("DomainPrivilege array count = ". $arrCnt, ROLECLASS);
        for($loop =0; $loop < $arrCnt; $loop++) {
        
            logMe("new pair starts...", ROLECLASS);
            $arrCnt2 = count($data->domainprivilege[$loop]->domainprivilegevpairs);
            logMe("DomainPrivilegeVPair array count = ". $arrCnt2, ROLECLASS);
            
            $is_first_item = true;
            $domain_id = "";
            $privilege_id = "";
            for($loop2 =0; $loop2 < $arrCnt2; $loop2++) {
                logMe("DomainPrivilegeVPair[". $loop2 ."] = " . $data->domainprivilege[$loop]->domainprivilegevpairs[$loop2]->obj, ROLECLASS);
                
                $obj_text = $data->domainprivilege[$loop]->domainprivilegevpairs[$loop2]->obj;
                
                if ($is_first_item === true) {
                    /* Store the Domain ID. */
                    $sql="select DOMAIN_ID from URBAC_DOMAINS where DOMAIN_TEXT='" . $obj_text . "'";
                    try {
                        $rows = $table->getAdapter()->fetchAll($sql);
                        if (count($rows) > 0) {
                            $domain_id = $rows[0]['DOMAIN_ID'];
                            $is_first_item = false;
                        } else {
                            logMe("Error: Parameters err - can not find Domain ID", ROLECLASS);
                            //$table->getAdapter()->rollBack();
                            return RETURN_URBAC_ERR_2;
                        }
                    }
                    catch (Zend_Exception $e) {
                        logMe("Error: Failed to store domain ID.", ROLECLASS);
                        return RETURN_FAIL;
                    }
                } else {
                    /* Get Privilege ID. */
                    $sql="select PRIVILEGE_ID from URBAC_PRIVILEGES where PRIVILEGE_TEXT='" . $obj_text . "'";
                    try {
                        $rows = $table->getAdapter()->fetchAll($sql);
                        if (count($rows) > 0) {
                            $privilege_id = $rows[0]['PRIVILEGE_ID'];
                        } else {
                            logMe("Error: Parameters err - can not find Privilege ID", ROLECLASS);
                            //$table->getAdapter()->rollBack();
                            return RETURN_URBAC_ERR_3;
                        }
                    }
                    catch (Zend_Exception $e) {
                        logMe("Error: Failed to store domain ID.", ROLECLASS);
                        return RETURN_FAIL;
                    }
                    
                    /* Insert data into URBAC_ROLE_DOMAINS_PRIVILEGES. */
                    try {
                        $count = $urbac_role_domains_privileges_tbl->insert(array('ROLE_ID'=>$role_id, 'DOMAIN_ID'=>$domain_id, 'PRIVILEGE_ID'=>$privilege_id, 'DOMAIN_ROLE_ACTIVE'=>$data->role_status));
                    }
                    catch (Zend_Exception $e) {
                        logMe("Error: Failed to insert URBAC_ROLE_DOMAINS_PRIVILEGES.", ROLECLASS);
                        //$table->getAdapter()->rollBack();
                        return RETURN_FAIL;
                    }
                    logMe("Insert URBAC_ROLE_DOMAINS_PRIVILEGES succeed!", ROLECLASS);
                }
                
            }
        }

        logMe("Adding RDP succeed!", ROLECLASS);
        return RETURN_URBAC_0;
    }
    
	// not used
    public function addRole_dyn($data) {
        logMe("Info: ++++++Running into addRole()++++++", ROLECLASS);
        
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
            logMe("Error: Failed to insert URBAC_ROLES.", ROLECLASS);
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Insert data into URBAC_ROLE_DOMAINS_PRIVILEGES table. */
        $ret = $this->addRDP($data);
        if (RETURN_URBAC_0 != $ret) {
            $table->getAdapter()->rollBack();
            return $ret;
        }

        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Error: Failed to commit.", ROLECLASS);
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }

        logMe("Creating Role succeed!", ROLECLASS);
        return RETURN_URBAC_0;
    }

	// not used
    public function delRole_dyn($data) {
        logMe("Info: ++++++Running into delRole()++++++", ROLECLASS);
        
        if (!$data) {
            return RETURN_FAIL;
        }
        
        $table = new Application_Model_DbTable_URBAC_ROLES();
        $table->getAdapter()->beginTransaction();

        /* Get the role ID. */
        $role_id  = $this->getRoleID($data->role_code);
        if (RETURN_FAIL == $role_id || null == $role_id) {
            logMe("Error: Can't get role ID.", ROLECLASS);
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        /* Delete role data from URBAC_ROLE_DOMAINS_PRIVILEGES and URBAC_ROLES. */
        $ret = $this->delRDP($role_id);
        if (RETURN_URBAC_0 != $ret) {
            $table->getAdapter()->rollBack();
            return $ret;
        }

        $urbac_roles_tbl = new Application_Model_DbTable_URBAC_ROLES();
        try
        {
            $where[0] = $urbac_roles_tbl->getAdapter()->quoteInto('ROLE_ID = ?', $role_id);
            $count = $urbac_roles_tbl->delete($where);
            logMe("URBAC_ROLES delete count=" . $count, ROLECLASS);
        }
        catch (Zend_Exception $e)
        {
            logMe("Error: Failed to delete URBAC_ROLES.", ROLECLASS);
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
    
        try {
            $table->getAdapter()->commit();
        }
        catch (Zend_Exception $e) {
            logMe("Error: Failed to commit.", ROLECLASS);
            $table->getAdapter()->rollBack();
            return RETURN_FAIL;
        }
        
        logMe("Deleting Role succeed!", ROLECLASS);
        return RETURN_URBAC_0;
    }

    // END OF JZ's
    //==========================================================================
    //==========================================================================
    //==========================================================================
    //==========================================================================
    
    public function getRoleGUI() {
        $myDB = DB::getInstance();
        $sql="SELECT * FROM URBAC_DOMAINS, URBAC_DOMAIN_OBJECTS,URBAC_OBJECTS WHERE ".
             "URBAC_DOMAINS.RECORD_ORDER > 0 AND URBAC_DOMAINS.DOMAIN_ID=URBAC_DOMAIN_OBJECTS.DOMAIN_ID ".
             "AND URBAC_DOMAIN_OBJECTS.OBJECT_ID=URBAC_OBJECTS.OBJECT_ID AND OBJECT_PARENT_ID IS NULL ".
             "ORDER BY URBAC_DOMAINS.RECORD_ORDER ASC, URBAC_OBJECTS.RECORD_ORDER ASC";
        $rows = $myDB->query($sql);
        //XarrayEncodingConversion($rows);
        return ($rows);
             
    }

    public function lookup(){
        $myDB = DB::getInstance();
        $sql="SELECT TNKR_CODE,EQUIPMENT_NAME,CARRIER_NAME FROM TANKERS_GUI";
        $rows = $myDB->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'TankersLookup')));
    }        
    
	// not used
    public function create($data){
        if (!$data) return RETURN_FAIL;
        
        $values = getInsertString($data);
        $myDB = DB::getInstance();
        $sql="INSERT INTO URBAC_ROLES $values";
        $res = $myDB->insert($sql);
        
        $ret = $this->addRDP($data);
        if ($ret != RETURN_URBAC_0) return $ret;        
        
        return $res;
    }
    
	// not used
    public function update($code,$data){
        if (!$data) return RETURN_FAIL;

        $values = getUpdateString($data);

        $myDB = DB::getInstance();
        $sql="UPDATE URBAC_ROLES SET $values WHERE role_code='$code'";
        $res = $myDB->insert($sql);
        return $res;
    }   
    
	// not used
    public function delete($code,$id){
        if (!$code) return RETURN_FAIL;
        $ret = $this->delRDP($role_id);
        if ($ret == RETURN_FAIL) return $ret;
        
        $myDB = DB::getInstance();
        $sql="DELETE FROM URBAC_ROLES WHERE ROLE_CODE='$code'";
        $res = $myDB->delete($sql);
        return $res;
    }
    
    public function checkRoleCode($role_code){
        if (!$role_code) return RETURN_FAIL;
        if (strlen($role_code) != ROLE_CODE_LEN) return RETURN_URBAC_ERR_6;
        if (strcmp(substr($role_code, 0, 1), ROLE_CODE_PREFIX) != 0) return RETURN_URBAC_ERR_6;

        $ret = $this->getNextRoleCode();
        if ($ret == RETURN_FAIL || $ret == RETURN_URBAC_ERR_7) return $ret;
        
        $role_code_next = $ret;
        $role_no_next = substr($role_code_next, 1, 6);
        $role_no = substr($role_code, 1, 6);
        
        if (($role_no - $role_no_next) > ROLE_CODE_STEP) return RETURN_URBAC_ERR_6;
        return RETURN_URBAC_0;
    } 
    /*
    private function getNextRoleCode(){
        $role_cd_max = ROLE_CODE_PREFIX . "000000";
        $myDB = DB::getInstance();
        $sql="select max(ROLE_CODE) ROLE_CD_MAX from URBAC_ROLES";
        $rows = $myDB->query($sql);
        if(sizeof($rows)>0){
            $role_cd_max = $rows[0]->ROLE_CD_MAX != null ? $rows[0]->ROLE_CD_MAX : $role_cd_max;
        }        
        $role_cd_max_no = substr($role_cd_max, 1, 6);        
        $role_cd_next_no = $role_cd_max_no + 1;
        if ($role_cd_next_no >= 999999) return RETURN_URBAC_ERR_7;
        $role_cd_next = 'R' . sprintf("%000006d", strval($role_cd_next_no));

        return $role_cd_next;
    }
    */    
    
    /*
    public function getUserRoleCount($code){
        $myDB = DB::getInstance();
        $sql="SELECT count(*) REC_COUNT FROM (SELECT * FROM URBAC_ROLES,URBAC_USER_ROLES WHERE URBAC_USER_ROLES.ROLE_ID = URBAC_ROLES.ROLE_ID(+) AND URBAC_ROLES.ROLE_CODE='$code');";
        $rows = $myDB->query($sql);
        return ((integer)$rows[0]->REC_COUNT);    
    }   
    */
    
    /*
    public function getRoleID($role_code){
        $myDB = DB::getInstance();
        $sql="SELECT ROLE_ID FROM URBAC_ROLES WHERE ROLE_CODE='$role_code'";
        $rows = $myDB->query($sql);
        return $rows[0]->ROLE_ID;
    }
    */    
    
    /*
    private function delRDP($role_id){
        if (!$code) return RETURN_FAIL;

        $myDB = DB::getInstance();
        $sql="DELETE FROM URBAC_ROLE_DOMAINS_PRIVILEGES WHERE ROLE_ID='$role_id'";
        $res = $myDB->delete($sql);
        return $res;
    }
    */
    
    /*
    public function addRDP($data){
        if (!$data) return RETURN_FAIL;
        $role_id  = $this->getRoleID($data->role_code);
        if ($role_id == RETURN_FAIL or $role_id == null) return RETURN_FAIL;

    */
            /* Insert data into RDP table. */
//            $urbac_role_domains_privileges_tbl = new Application_Model_DbTable_URBAC_ROLE_DOMAINS_PRIVILEGES();
//            $arrCnt = count($data->domainprivilege);
//            for($loop =0; $loop < $arrCnt; $loop++) {
//                $arrCnt2 = count($data->domainprivilege[$loop]->domainprivilegevpairs);
//                $is_first_item = true;
//                $domain_id = "";
//                $privilege_id = "";
//                for($loop2 =0; $loop2 < $arrCnt2; $loop2++) {
//                        $obj_text = $data->domainprivilege[$loop]->domainprivilegevpairs[$loop2]->obj;
//                        if ($is_first_item === true) {
//                            $sql="select DOMAIN_ID from URBAC_DOMAINS where DOMAIN_TEXT='" . $obj_text . "'";
//                            try {
//                                    $rows = $table->getAdapter()->fetchAll($sql);
//                                    if (count($rows) > 0) {
//                                            $domain_id = $rows[0]['DOMAIN_ID'];
//                                            $is_first_item = false;
//                                    }
//                                    else {
//                                            return RETURN_URBAC_ERR_2;
//                                    }
//                            }
//                        }
//                        else {
//                            $sql="select PRIVILEGE_ID from URBAC_PRIVILEGES where PRIVILEGE_TEXT='" . $obj_text . "'";
//                            try {
//                                    $rows = $table->getAdapter()->fetchAll($sql);
//                                    if (count($rows) > 0) {
//                                            $privilege_id = $rows[0]['PRIVILEGE_ID'];
//                                    }
//                                    else {
//                                           return RETURN_URBAC_ERR_3;
//                                    }
//                            }
//
//                            try {
//                                    $count = $urbac_role_domains_privileges_tbl->insert(array('ROLE_ID'=>$role_id, 'DOMAIN_ID'=>$domain_id, 'PRIVILEGE_ID'=>$privilege_id, 'DOMAIN_ROLE_ACTIVE'=>$data->role_status));
//                            }
//                        }
//
//                }
//            }
//            return RETURN_URBAC_0;
//    }
     
}
?>