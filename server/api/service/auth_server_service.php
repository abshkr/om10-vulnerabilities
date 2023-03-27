<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/order_service.php';
include_once __DIR__ . '/site_service.php';
include_once __DIR__ . '/crypt_service.php';

class AuthServerService
{
    public function __construct($db, $auth_type = null, $auto_commit = false)
    {
        $this->conn = $db;
        $this->auth_type = $auth_type;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function get_site_code()
    {
        $query = "SELECT SITE_CODE FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['SITE_CODE'];
    }

    public function get_site_exphour()
    {
        $query = "SELECT SITE_SHLS_EXP_H FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['SITE_SHLS_EXP_H'];
    }

    public function get_site_manager()
    {
        $query = "SELECT SITE_MNGR FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['SITE_MNGR'];
    }

    public function get_site_name()
    {
        $query = "SELECT TERM_NAME FROM TERMINAL WHERE TERM_CODE = (SELECT SITE_CODE FROM SITE)";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['TERM_NAME'];
    }

    //Let us get the total number of active sessions for this user
    public function get_active_sessions($user, $sess_id)
    {
        $query = "SELECT count(SESS_ID) AS SESS_COUNT FROM HTTP_SESSION_TRACE WHERE PER_CODE=:per_cd and ACTIVE_FLAG=0 and SESS_ID<>:sess_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_cd', $user);
        oci_bind_by_name($stmt, ':sess_id', $sess_id);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['SESS_COUNT'];
    }

    public function get_site_config($config_key, $default)
    {
        // write_log(sprintf("%s(%s, %s) START", __FUNCTION__, $config_key, $default), __FILE__, __LINE__);
        $query = "SELECT CONFIG_VALUE
            FROM SITE_CONFIG WHERE CONFIG_KEY = :config_key";
        $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':default', $default);
        oci_bind_by_name($stmt, ':config_key', $config_key);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $default;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row)
            return $row['CONFIG_VALUE'];

        return $default;
    }


    public function auth_servers($auth_type="LDAP")
    {
        $query = "
            SELECT AS_CODE, AS_NAME, AS_IP, AS_USERNAME, AS_PASSWORD, AS_BASE_DN, AS_FILTERS, AS_TYPE, AS_NOTE, AS_ROLE, AS_ACTIVE
            FROM AUTH_SERVERS
            WHERE AS_TYPE=:auth_type AND AS_ACTIVE>0
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':auth_type', $auth_type);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $servers = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $servers[$row['AS_CODE']] = $row;
        }

        // write_log(json_encode($servers), __FILE__, __LINE__);
        return $servers;
    }

    protected function get_ldap_filters($filter_keys, $value)
    {
        // (|(sAMAccountName=$ldapUsername)(userprincipalname=$ldapUsername))
        $codes = explode('|', $filter_keys);

        $len = count( $codes );
        
        $txt = "(|";
        for ( $i=0; $i<$len; $i++ ) {
            $code = $codes[$i];
            $txt .= "(" . $code . "=" . $value . ")";
        }
        $txt .= ")";

        return $txt;
    }

    public function auth_by_ldap($server, $username, $password, $base_dn, $filter_keys)
    {
        $ldapServer = $server;

        // need make sure the LDAP module and its functions are installed, otherwise return error message
        if (extension_loaded("ldap") === false || function_exists("ldap_connect") === false) {
            // connection check failed
            return array(
                'MSG_CODE' => '-9',
                'MSG_DESC' => 'LDAP module and its functions are not available'
            );
        }

        $ldap = ldap_connect($ldapServer);
        if ($ldap === false) {
            // connection check failed
            return array(
                'MSG_CODE' => '-1',
                'MSG_DESC' => 'Server could not be found'
            );
        }
        
        $ldapUsername = $username;
        $ldapPassword = $password;

        //$ldapRdn = 'mydomain' . "\\" . $ldapUsername;
        $ldapRdn = $ldapUsername;

        ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

        $bind = @ldap_bind($ldap, $ldapRdn, $ldapPassword);

        if ($bind) {
            // $filter="(|(sAMAccountName=$ldapUsername)(userprincipalname=$ldapUsername))";
            $filter = $this->get_ldap_filters($filter_keys, $ldapUsername);
            $ldapTree = $base_dn;
            $result = ldap_search($ldap, $ldapTree, $filter);
            if ($result === false) {
                // search failed
                return array(
                    'MSG_CODE' => '-3',
                    'MSG_DESC' => 'Failed to search the user'
                );
            }
                
            // ldap_sort($ldap, $result, "sn");
            $info = ldap_get_entries($ldap, $result);
            if ($info === false) {
                // search failed
                return array(
                    'MSG_CODE' => '-4',
                    'MSG_DESC' => 'Failed to retrieve user entries'
                );
            }
            if ($info["count"] === 0) {
                // search failed
                return array(
                    'MSG_CODE' => '-5',
                    'MSG_DESC' => 'No matched user entries found'
                );
            }

            $entries = array(
                "samaccountname" => $info[0]["samaccountname"][0],
                "userprincipalname" => $info[0]["userprincipalname"][0],
                "distinguishedname" => $info[0]["distinguishedname"][0],
                "objectcategory" => $info[0]["objectcategory"][0],
                "cn" => $info[0]["cn"][0],
                "displayname" => $info[0]["displayname"][0],
                "name" => $info[0]["name"][0],
                "sn" => $info[0]["sn"][0],
                "givenname" => $info[0]["givenname"][0],
                "c" => $info[0]["c"][0],
                "co" => $info[0]["co"][0],
                "countrycode" => $info[0]["countrycode"][0],
                "title" => $info[0]["title"][0],
                "physicaldeliveryofficename" => $info[0]["physicaldeliveryofficename"][0],
                "company" => $info[0]["company"][0],
                "telephonenumber" => $info[0]["telephonenumber"][0],
                "mail" => $info[0]["mail"][0],
                "memberof" => $info[0]["memberof"],
                "proxyaddresses" => $info[0]["proxyaddresses"],
            );

            //echo $info['count'];
            //echo json_encode($info, JSON_PRETTY_PRINT);
            //echo print_r($info, true);
            @ldap_close($ldap);
            return array(
                'MSG_CODE' => '0',
                'MSG_DESC' => 'SUCCESS',
                'MSG_LIST' => $entries
            );
        } else {
            // failed to connect the server by binding
            return array(
                'MSG_CODE' => '-2',
                'MSG_DESC' => 'Invalid email address or username / password'
            );
        }

    }

    public function lock_user_account($username)
    {
        $query = "
            UPDATE URBAC_USERS
            SET USER_STATUS_FLAG = 2
            WHERE USER_CODE = :per_cd 
                AND USER_CODE NOT IN
                (
                    SELECT USER_CODE
                    FROM URBAC_USERS A, URBAC_USER_ROLES B
                    WHERE A.USER_ID = B.USER_ID
                        AND A.USER_CODE = :per_cd
                        AND B.ROLE_ID < 0
                )
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_cd', $username);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = '9999';
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = "URBAC_USERS";
        $jnl_data[2] = sprintf("user_code:%s", $this->user_code); 

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function check_user_usage($username, $user_acct_stat)
    {
        $query = "
            SELECT 
                TMP.ACTION_DATE   AS ACTION_DATE, 
                SYSDATE - TMP.ACTION_DATE    AS DAYS_ELAPSED, 
                DECODE(CONFIG_VALUE, -1,'F', (case when sysdate - TMP.ACTION_DATE > TO_NUMBER(CONFIG_VALUE)  then 'T' else 'F' End))   AS AUTO_LOCK
            FROM 
                (
                    SELECT MAX(USERTRACE_ACTION_TIME) ACTION_DATE
                    FROM PERSONNEL, URBAC_USERS, URBAC_USER_TRACES, SITE_CONFIG
                    WHERE PERSONNEL.PER_CODE=:per_cd 
                        AND PERSONNEL.PER_CODE=URBAC_USERS.USER_CODE 
                        AND URBAC_USERS.USER_ID = USERTRACE_USERID 
                        AND USERTRACE_ACTION = 'LOGIN' 
                        AND CONFIG_KEY='URBAC_USER_AUTO_LOCK'
                ) TMP
                , SITE_CONFIG
            WHERE CONFIG_KEY='URBAC_USER_AUTO_LOCK'
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_cd', $username);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $user_acct_stat;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row && $row['AUTO_LOCK'] == 'T') {
            $locked = $this->lock_user_account($username);
            if ($locked) {
                $user_acct_stat = 2;
                // journal????
            }
        }

        return $user_acct_stat;
    }

    public function check_user_account($username)
    {
        $user_acct_stat = -1;
        $query = "
            SELECT USER_STATUS_FLAG
            FROM URBAC_USERS 
            WHERE USER_CODE = :per_cd
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_cd', $username);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $user_acct_stat;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row) {
            $user_acct_stat = $row['USER_STATUS_FLAG'];
        }
        /* it.s been X days since last login, just lock the account and tell them to piss off */
        if ($user_acct_stat == 1) {
            $user_acct_stat = $this->check_user_usage($username, $user_acct_stat);
        }


        return $user_acct_stat;
    }

    /**
     * Encrypt a passwd by cript.
     *   The linux function crypt only use the first 8 letters, so the string input is splitted by 8 letters to handle,
     */
    private function ecrypt_password($password)
    {
        $enctyped = '';
        $chunks = str_split($password, 8);
        foreach ($chunks as $value) {
            $tmp = crypt($value, ENCTYPED_SALT);
            $enctyped .= $tmp;
        }

        return $enctyped;
    }


    public function create_user_account($username, $params)
    {
        if (!isset($params->per_lock)) {
            $params->per_lock = 'N';
        }

        // get flag for SLP
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("DRIVER_SLP_ENABLED", "N");
        $slp_flag = ($config_value === 'Y' || $config_value === 'y');
        $slp_clns = "";
        $slp_vals = "";
        if ($slp_flag) { 
            $slp_clns = "
                SLP_ID,
            ";
            $slp_vals = "
                :slp_id,
            ";
        }

        // query to insert record
        //'a1qhH6yu9Tjg.', // encryption of default pw '12345'
        $query = "INSERT INTO PERSONNEL
                (PER_CODE,
                PER_NAME,
                PER_CMPY,
                PER_AUTH,
                PER_LOCK,
                PER_LAST_DMY,
                PER_DEPARTMENT,
                PER_PASSWD,
                PER_LICENCE_NO,
                PER_NEXT_MSG,
                PER_PASSWD_2,
                PER_LEVEL_NUM,
                PER_TERMINAL,
                PER_COMMENTS,
                $slp_clns
                PER_PHONE,
                PER_EMAIL,
                PER_LAST_MODIFIED)
        VALUES (:per_code,
                :per_name,
                :per_cmpy,
                :per_auth,
                :per_lock,
                SYSDATE,
                :per_department,
                :per_passwd,
                :per_licence_no,
                :per_next_msg,
                :per_passwd_2,
                :per_level_num,
                :per_terminal,
                :per_comments,
                $slp_vals
                :per_phone,
                :per_email,
                SYSDATE)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $params->per_code);
        oci_bind_by_name($stmt, ':per_name', $params->per_name);
        oci_bind_by_name($stmt, ':per_cmpy', $params->per_cmpy);
        oci_bind_by_name($stmt, ':per_auth', $params->per_auth);
        oci_bind_by_name($stmt, ':per_lock', $params->per_lock);
        oci_bind_by_name($stmt, ':per_department', $params->per_department);
        oci_bind_by_name($stmt, ':per_licence_no', $params->per_licence_no);
        oci_bind_by_name($stmt, ':per_next_msg', $params->per_next_msg);
        oci_bind_by_name($stmt, ':per_passwd', $params->default_pwd);
        oci_bind_by_name($stmt, ':per_passwd_2', $params->default_pwd);
        oci_bind_by_name($stmt, ':per_level_num', $params->per_level_num);
        oci_bind_by_name($stmt, ':per_terminal', $params->per_terminal);
        oci_bind_by_name($stmt, ':per_comments', $params->per_comments);
        if ($slp_flag) { 
            oci_bind_by_name($stmt, ':slp_id', $params->slp_id);
        }
        oci_bind_by_name($stmt, ':per_phone', $params->per_phone);
        oci_bind_by_name($stmt, ':per_email', $params->per_email);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        // use USER_TYPE to tell if it is from LDAP or SAML: 2 - LDAP; 3 - SAML; 0, 1 - NORMAL
        $query = "INSERT INTO URBAC_USERS
                (USER_CODE,
                USER_STATUS_FLAG,
                USER_TYPE,
                USER_USERNAME,
                USER_PASSWORD
                )
        VALUES (:per_code,
                1,
                2,
                :per_name,
                :user_password
                )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $params->per_code);
        oci_bind_by_name($stmt, ':per_name', $params->per_name);
        oci_bind_by_name($stmt, ':user_password', $params->default_pwd);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "INSERT INTO URBAC_USER_ROLES
                (USER_ID, 
                ROLE_ID, 
                USER_ROLE_ACTIVE
                )
                SELECT USER_ID, :role_id, 1 FROM URBAC_USERS WHERE USER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $params->per_code);
        oci_bind_by_name($stmt, ':role_id', $params->per_auth);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "INSERT INTO PER_TIMECODE
                (PT_PSNCODE,
                PT_TIMECD)
        VALUES (:per_code,
                :pt_timecd
                )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $params->per_code);
        oci_bind_by_name($stmt, ':pt_timecd', $params->pt_timecd);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (!isset($params->perl_ara)) {
            $params->perl_ara = 9999;     //By default, use OFF_SITE
        }
        $query = "INSERT INTO PERS_IN_AREA
                (PERL_PSN,
                PERL_ARA)
        VALUES (:per_code,
                :perl_ara
                )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $params->per_code);
        oci_bind_by_name($stmt, ':perl_ara', $params->perl_ara);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            oci_rollback($this->conn);
            return false;
        }

        $query = "INSERT INTO URBAC_PWD_TRACES
                (PWDTRACE_USERID,
                PWDTRACE_PWD,
                PWDTRACE_LAST_CHG)
        VALUES (URBAC_USERS_SEQ.CURRVAL,
                :pwdtrace_pwd,
                SYSDATE)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pwdtrace_pwd', $params->default_pwd);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (isset($params->area_accesses)) {
            foreach ($params->area_accesses as $key => $value) {
                // write_log($key, __FILE__, __LINE__);
                // write_log(json_encode($value), __FILE__, __LINE__);
                $query = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN)
                VALUES (:perm_area, :per_code)";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':per_code', $params->per_code);
                oci_bind_by_name($stmt, ':perm_area', $value);
                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        if (isset($params->expiry_dates)) {
            $expiry_dates = array();
            $expiry_date = new ExpiryDate($this->conn);
            $expiry_date->edt_target_code = ExpiryTarget::PERSONNEL;
            $expiry_date->ed_object_id = $params->per_code;
            // write_log(json_encode($params->expiry_dates), __FILE__, __LINE__);
            foreach ($params->expiry_dates as $key => $value) {
                $expiry_dates[$value->edt_type_code] = $value;
            }
            // write_log(json_encode($expiry_dates), __FILE__, __LINE__);
            if (!$expiry_date->create($expiry_dates)) {
                write_log("Failed to update expiry dates",
                    __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = '9999'; //Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $params->per_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function create_user_session($sessobj)
    {
        $query = "
            INSERT INTO HTTP_SESSION_TRACE (
                SESS_ID, 
                PER_CODE, 
                KYA_ROLE,
                CLIENT_IP,
                LANG, 
                PAGE_LIMIT )
            VALUES (
                DBMS_RANDOM.STRING('A',12),
                :per_cd,
                :kya_role,
                :client_ip, 
                :lang, 
                :page_limit ) 
            RETURNING SESS_ID into :sess_id
        ";

        $stmt = oci_parse($this->conn, $query);

        // $sess_id = '';
        oci_bind_by_name($stmt, ':per_cd', $sessobj->user);
        oci_bind_by_name($stmt, ':kya_role', $sessobj->role);
        oci_bind_by_name($stmt, ':client_ip', $sessobj->ip);
        oci_bind_by_name($stmt, ':lang', $sessobj->lang);
        oci_bind_by_name($stmt, ':page_limit', $sessobj->page);
        oci_bind_by_name($stmt, ':sess_id', $sess_id, 12);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return '';//$sess_id;
        }

        oci_commit($this->conn);
        return $sess_id;
    }


    public function auth_by_ldap_servers($authobj) 
    {
        // get Active Directory server
        $servers = $this->auth_servers("LDAP");
        // $servers = $this->auth_servers($authobj->authmode);
        $manager = $this->get_site_manager();
        $terminal = $this->get_site_code();
        $sitename = $this->get_site_name();
        $cs = new CryptService();

        $returns = array();
        // go through servers to authenticate the user
        foreach ($servers as $key => $item) {
            $useracct = $authobj->user;
            // $password = $authobj->plainpsw;
            $password = $cs->decrypt_blowfish($authobj->user, $authobj->hash);
            // AS_CODE, AS_NAME, AS_IP, AS_USERNAME, AS_PASSWORD, AS_BASE_DN, AS_FILTERS, AS_RETURNS, AS_TYPE, AS_NOTE, AS_ROLE, AS_ACTIVE
            $result = $this->auth_by_ldap($item["AS_IP"], $useracct, $password, $item["AS_BASE_DN"], $item["AS_FILTERS"]);
            $returns = $result;
            $username = $result["MSG_LIST"]["samaccountname"];
            $role = $item["AS_ROLE"];
            if ($result["MSG_CODE"] === '0') {
                // pass the authentication
                // check if this user exists in Omega
                $user_acct_stat = $this->check_user_account($username);
                if ($user_acct_stat == -1) {
                    // it is the first time that this user logs in

                    // prepare the user parameters
                    $params = new stdClass();
                    $params->per_code = $result["MSG_LIST"]["samaccountname"];
                    $params->per_name = $result["MSG_LIST"]["cn"];
                    $params->per_cmpy = $manager;
                    $params->per_auth = $role;
                    $params->per_lock = 'N';
                    $params->per_department = $result["MSG_LIST"]["physicaldeliveryofficename"];
                    $params->per_licence_no = '';
                    $params->per_next_msg = '';
                    // $params->default_pwd = $this->ecrypt_password($authobj->plainpsw); // "a1qhH6yu9Tjg.";
                    $params->default_pwd = $this->ecrypt_password($password); // "a1qhH6yu9Tjg.";
                    $params->per_level_num = 99;
                    $params->per_terminal = $terminal;
                    $params->per_comments = 'Active Directory User Account';
                    $params->slp_id = '';
                    $params->per_phone = $result["MSG_LIST"]["telephonenumber"];
                    $params->per_email = $result["MSG_LIST"]["mail"];
                    $params->pt_timecd = 'AL';
                    $params->perl_ara = 9999;
                    // $params->area_accesses = array();
                    // $params->expiry_dates = array();
            
                    // create omega user account with default role visitor or loader
                    $created = $this->create_user_account($username, $params);
                    if ($created === true) {
                        $user_acct_stat = 1;
                    }

                }
                $sess_id = '';
                if ($user_acct_stat == 1) {
                    // create the session
                    $sessobj = new stdClass();
                    $sessobj->user = $username;
                    $sessobj->role = $role;
                    $sessobj->ip = $authobj->clientip;
                    $sessobj->lang = $authobj->langcode;
                    $sessobj->page = 100;
                    $sess_id = $this->create_user_session($sessobj);
                }

                // construct the return message for successful login
                // $returns["MSG_CODE"] = "0";
                // $returns["MSG_DESC"] = "SUCCESS";
                $returns["LICENSE_CODE"] = "2";
                $returns["SITE_EXP_MINUTES"] = $this->get_site_exphour();
                $returns["MSG_BODY"] = "USER_DETAIL";
                $returns["USER_DETAIL"] = array();
                $returns["USER_DETAIL"]["USER_CODE"] = $username;
                $returns["USER_DETAIL"]["USER_STATUS_FLAG"] = "1";
                $returns["USER_DETAIL"]["USER_PASSWD_EXP"] = "F";
                $returns["USER_DETAIL"]["USER_SESSION"] = $sess_id;
                $returns["USER_DETAIL"]["USER_LANG"] = $authobj->langcode;
                $returns["USER_DETAIL"]["USER_CLIENTIP"] = $authobj->clientip;
                $returns["USER_DETAIL"]["ISMANAGER_CMPY"] = "T";
                $returns["USER_DETAIL"]["USER_CMPY"] = $manager;
                $returns["USER_DETAIL"]["SITE_CODE"] = $terminal;
                $returns["USER_DETAIL"]["SITE_NAME"] = $sitename;
                $returns["USER_DETAIL"]["HTTP_SESSION_TRACE_COUNT"] = $this->get_active_sessions($username, $sess_id);
                $returns["USER_DETAIL"]["MAX_HTTP_SESSION_ALLOWED"] = $this->get_site_config("URBAC_SESSION_PER_USER",  "10");
                $returns["USER_DETAIL"]["USR_PASSWD_MIN_LENGTH"] = $this->get_site_config("URBAC_PWD_LEN_MIN",  "5");
                $returns["USER_DETAIL"]["USR_PASSWD_MAX_LENGTH"] = $this->get_site_config("URBAC_PWD_LEN_MAX",  "32");
                $returns["USER_DETAIL"]["USR_MINTS_AUTO_LOGOFF"] = $this->get_site_config("URBAC_AUTO_LOGOFF",  "60");
                $returns["USER_DETAIL"]["USR_PASSWD_COMPLEX"] = $this->get_site_config("URBAC_PWD_COMPLEXITY",  "7");
                $returns["USER_DETAIL"]["USER_NAME"] = $result["MSG_LIST"]["cn"];
                $returns["USER_DETAIL"]["USER_DEPARTMENT"] = $result["MSG_LIST"]["physicaldeliveryofficename"];
                $returns["USER_DETAIL"]["SITE_SCHD_REV_REPOST_ENABLED"] = $this->get_site_config("SITE_SCHD_REV_REPOST_ENABLED",  "N");
                $returns["USER_DETAIL"]["SITE_SCHD_ARCHIVE_ENABLED"] = $this->get_site_config("SITE_SCHD_ARCHIVE_ENABLED",  "N");
                $returns["USER_DETAIL"]["SITE_MOVEMENTS_REV_ENABLED"] = $this->get_site_config("SITE_MOVEMENTS_REV_ENABLED",  "N");
                $returns["USER_DETAIL"]["SITE_CANCEL_LOAD_ENABLED"] = $this->get_site_config("SITE_CANCEL_LOAD_ENABLED",  "N");
                $returns["USER_DETAIL"]["SITE_ISOTAINER_ENABLED"] = $this->get_site_config("SITE_ISOTAINER_ENABLED",  "N");
                // $returns["USER_DETAIL"]["PSW_DECRYPT"] = $password2;
                // $returns["USER_DETAIL"]["PSW_DECRYPT2"] = rtrim($password2);

                // 4001	ENG	Login information, User: %, Name: %, Role: %, Cmpy: %, Login Addr: %
                $journal = new Journal($this->conn, false);
                $jnl_data[0] = $authobj->user . ' [' . $authobj->authmode . ']';
                $jnl_data[1] = $returns["USER_DETAIL"]["USER_NAME"];
                $jnl_data[2] = $role;
                $jnl_data[3] = $manager;
                $jnl_data[4] = $authobj->clientip;
        
                if (!$journal->jnlLogEvent(
                    4001, $jnl_data, JnlEvent::JNLT_SYS, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                }
                oci_commit($this->conn);

                break;
            }
        }
    
        return $returns;
    }
}

/*
    [0] => Array
        (
            [objectclass] => Array
                (
                    [count] => 4
                    [0] => top
                    [1] => person
                    [2] => organizationalPerson
                    [3] => user
                )

            [0] => objectclass
			
            [cn] => Bin Zhou
            [sn] => Zhou
            [c] => AU
            [title] => Solutions Adviser
            [description] => Solutions Adviser
            [physicaldeliveryofficename] => DKIA
            [telephonenumber] => (03) 9730 8874
            [givenname] => Bin
            [distinguishedname] => CN=Bin Zhou,OU=Rowville,DC=corp,DC=diamondkey,DC=com
            [instancetype] => 4
            [whencreated] => 20120718181053.0Z
            [whenchanged] => 20221208005927.0Z
            [displayname] => Bin Zhou
            [usncreated] => 14694
            [memberof] => Array
                (
                    [count] => 14
                    [0] => CN=AppDev-Internal-DKIA,OU=Distribution Group,OU=Groups,DC=corp,DC=diamondkey,DC=com
                    [1] => CN=TeamViewer-License,OU=Groups,DC=corp,DC=diamondkey,DC=com
                    [2] => CN=TideFrontEnd Developers,CN=Users,DC=corp,DC=diamondkey,DC=com
                    [3] => CN=TIDE Team,CN=Users,DC=corp,DC=diamondkey,DC=com
                    [4] => CN=Development_SEC,OU=TaroonFileServerSecurity,OU=Permissions - All,OU=Rowville,DC=corp,DC=diamondkey,DC=com
                    [5] => CN=Project_SEC,OU=TaroonFileServerSecurity,OU=Permissions - All,OU=Rowville,DC=corp,DC=diamondkey,DC=com
                    [6] => CN=Engineering_SEC,OU=TaroonFileServerSecurity,OU=Permissions - All,OU=Rowville,DC=corp,DC=diamondkey,DC=com
                    [7] => CN=OmegaMLDev,OU=Reources,OU=Rowville,DC=corp,DC=diamondkey,DC=com
                    [8] => CN=Products and Solutions,OU=Distribution Group,OU=Groups,DC=corp,DC=diamondkey,DC=com
                    [9] => CN=DKI - Australia,OU=Distribution Group,OU=Groups,DC=corp,DC=diamondkey,DC=com
                    [10] => CN=China Development,OU=Distribution Group,OU=Groups,DC=corp,DC=diamondkey,DC=com
                    [11] => CN=AllRowvilleUsers,OU=Groups,DC=corp,DC=diamondkey,DC=com
                    [12] => CN=Scada_SEC,OU=TaroonFileServerSecurity,OU=Permissions - All,OU=Rowville,DC=corp,DC=diamondkey,DC=com
                    [13] => CN=AppServices_SEC,OU=TaroonFileServerSecurity,OU=Permissions - All,OU=Rowville,DC=corp,DC=diamondkey,DC=com
                )

            [usnchanged] => 20059317
            [co] => Australia
            [company] => Diamond Key International
            [proxyaddresses] => Array
                (
                    [count] => 2
                    [0] => smtp:bz@diamondkey.com
                    [1] => SMTP:BinZhou@diamondkey.com
                )
            [name] => Bin Zhou
            [objectguid] => EÈ_XùQIŠNwöaÀJ
            [useraccountcontrol] => 66048
            [badpwdcount] => 0
            [codepage] => 0
            [countrycode] => 36
            [badpasswordtime] => 133150211382897360
            [lastlogoff] => 0
            [lastlogon] => 133150219313293568
            [pwdlastset] => 132334764173927424
            [primarygroupid] => 513
            [userparameters] => m:                    d	                        
            [objectsid] => ê6§©_ŒË
P¡
            [accountexpires] => 9223372036854775807
            [logoncount] => 1057
            [samaccountname] => bz
            [samaccounttype] => 805306368
			
            [userprincipalname] => bz@corp.diamondkey.com
            
			[lockouttime] => 0
            [objectcategory] => CN=Person,CN=Schema,CN=Configuration,DC=corp,DC=diamondkey,DC=com
            [msnpallowdialin] => TRUE
            [dscorepropagationdata] => Array
                (
                    [count] => 3
                    [0] => 20200224015241.0Z
                    [1] => 20200224015222.0Z
                    [2] => 16010101000000.0Z
                )

            [lastlogontimestamp] => 133149347677613685
            [msds-supportedencryptiontypes] => 0
            [mail] => BinZhou@diamondkey.com
            [msexchwhenmailboxcreated] => 20120718181053.0Z
            [msexchprovisioningflags] => 0
            [protocolsettings] => RemotePowerShellÂ§1
            [msexchbypassaudit] => FALSE
            [msexchaddressbookflags] => 1
            [msexchumdtmfmap] => Array
                (
                    [count] => 3
                    [0] => emailAddress:2469468
                    [1] => lastNameFirstName:9468246
                    [2] => firstNameLastName:2469468
                )

            [count] => 51
            [dn] => CN=Bin Zhou,OU=Rowville,DC=corp,DC=diamondkey,DC=com
        )
*/