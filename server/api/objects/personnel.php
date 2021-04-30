<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../objects/expiry_date.php';
include_once __DIR__ . '/../objects/expiry_type.php';
include_once 'common_class.php';

class Personnel extends CommonClass
{
    // database connection and table name
    protected $VIEW_NAME = "GUI_PERSONNEL";
    private $default_pwd = 'a1qhH6yu9Tjg.';

    protected $primary_keys = array("per_code");
    protected $TABLE_NAME = "PERSONNEL";

    public $BOOLEAN_FIELDS = array(
        "CMPY_AUTO_LD" => "Y",
        "PER_LOCK" => "Y",
        "CMPY_TKR_CFG" => "Y",
        "CMPY_ENABLE_EXPD" => "Y",
        "CMPY_MOD_DRAWER" => "Y",
        "CMPY_MUST_SEALNO" => "Y",
        "CMPY_BAY_LOOP_CH" => "Y",
        "CMPY_ORD_CARRIER" => "Y",
        "CMPY_WIPE_ORDETS" => "Y",
        "CMPY_WGH_COMPLET" => "Y",
        "CMPY_WGH_AUTO_FL" => "Y",
        "CMPY_HOST_DOCS" => "Y",
        "CMPY_LOG_LD_DEL" => "Y",
        "CMPY_AUTO_RECONC" => "Y",
        "CMPY_FLAG_1" => "Y",
        "CMPY_FLAG_2" => "Y",
        "CMPY_FLAG_3" => "Y",
        "CMPY_COMMS_OK" => "Y",
        "CMPY_ADD_PROMPT" => "Y",
        "CMPY_TKR_ACTIVAT" => "Y",
        "CMPY_BLTOL_FLAG" => 1,
        "CMPY_LDTOL_FLAG" => 1,
        "CMPY_REQ_PIN_FLAG" => 1,
    );

    public function get_onsite()
    {
        $query = "
            SELECT PER_CODE, PER_NAME, CMPY_NAME, AREA_NAME, PERL_ENTER_TIME 
            FROM GUI_PERSONNEL, AREA_RC 
            WHERE PER_CODE = PERL_PSN AND PERL_ARA <> 9999 AND PERL_ARA = AREA_K 
            ORDER BY PER_NAME";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // read personnel
    public function read()
    {
        $query = "SELECT * FROM " . $this->VIEW_NAME . " ORDER BY PER_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    public function user_status() 
    {
        $query = "SELECT * FROM USER_STATUS_TYP ORDER BY USER_STATUS_FLAG";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    public function read_dep()
    {
        if (!isset($this->per_code)) {
            $this->per_code = Utilities::getCurrPsn();
        }

        $query = "SELECT PER_DEPARTMENT FROM PERSONNEL WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    public function read_hook(&$hook_item)
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
        $this->per_code = $hook_item['per_code'];
        $hook_item['area_accesses'] = array();
        $stmt2 = $this->areaAccess2($hook_item['area_accesses'] );

        $expiry_date = new ExpiryDate($this->conn);
        $expiry_date->ed_target_code = ExpiryTarget::PERSONNEL;
        $expiry_date->ed_object_id = $hook_item['per_code'];
        $stmt = $expiry_date->read();
        $result = array();
        Utilities::retrieve($result, $expiry_date, $stmt);
        // write_log(json_encode($result), __FILE__, __LINE__);
        $hook_item['expiry_dates'] = $result;
    }

    public function areaAccess2(&$hook_item)
    {
        $query = "
            SELECT PERM_OF_AREA.PERM_AREA
            FROM PERM_OF_AREA
            WHERE PERM_PSN = :perm_psn
            ORDER BY PERM_AREA";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':perm_psn', $this->per_code);
        // write_log(sprintf(" %s", $this->per_code), __FILE__, __LINE__);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            // write_log(sprintf("%s", json_encode($row)), __FILE__, __LINE__);
            array_push($hook_item, $row["PERM_AREA"]);
        }
    }

    public function areaAccess()
    {
        $query = "
            SELECT PERM_OF_AREA.*, AREA_NAME
            FROM PERM_OF_AREA, AREA_RC
            WHERE PERM_AREA = AREA_K AND PERM_PSN = :perm_psn
            ORDER BY AREA_K";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':perm_psn', $this->per_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // pure php function
    public function create()
    {
        if (!isset($this->per_lock)) {
            $this->per_lock = 'N';
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
                PER_EMAIL,
                PER_LAST_MODIFIED)
        VALUES (:per_code,
                :per_name,
                :per_cmpy,
                :per_auth,
                :per_lock,
                SYSDATE,
                :per_department,
                'a1qhH6yu9Tjg.',
                :per_licence_no,
                :per_next_msg,
                :per_passwd_2,
                :per_level_num,
                :per_terminal,
                :per_comments,
                :per_email,
                SYSDATE)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':per_name', $this->per_name);
        oci_bind_by_name($stmt, ':per_cmpy', $this->per_cmpy);
        oci_bind_by_name($stmt, ':per_auth', $this->per_auth);
        oci_bind_by_name($stmt, ':per_lock', $this->per_lock);
        oci_bind_by_name($stmt, ':per_department', $this->per_department);
        oci_bind_by_name($stmt, ':per_licence_no', $this->per_licence_no);
        oci_bind_by_name($stmt, ':per_next_msg', $this->per_next_msg);
        oci_bind_by_name($stmt, ':per_passwd_2', $this->default_pwd);
        oci_bind_by_name($stmt, ':per_level_num', $this->per_level_num);
        oci_bind_by_name($stmt, ':per_terminal', $this->per_terminal);
        oci_bind_by_name($stmt, ':per_comments', $this->per_comments);
        oci_bind_by_name($stmt, ':per_email', $this->per_email);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "INSERT INTO URBAC_USERS
                (USER_CODE,
                USER_USERNAME,
                USER_PASSWORD
                )
        VALUES (:per_code,
                :per_name,
                :user_password
                )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':per_name', $this->per_name);
        oci_bind_by_name($stmt, ':user_password', $this->default_pwd);

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
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':role_id', $this->per_auth);

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
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':pt_timecd', $this->pt_timecd);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (!isset($this->perl_ara)) {
            $this->perl_ara = 9999;     //By default, use OFF_SITE
        }
        $query = "INSERT INTO PERS_IN_AREA
                (PERL_PSN,
                PERL_ARA)
        VALUES (:per_code,
                :perl_ara
                )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':perl_ara', $this->perl_ara);

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
        oci_bind_by_name($stmt, ':pwdtrace_pwd', $this->default_pwd);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (isset($this->area_accesses)) {
            foreach ($this->area_accesses as $key => $value) {
                // write_log($key, __FILE__, __LINE__);
                // write_log(json_encode($value), __FILE__, __LINE__);
                $query = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN)
                VALUES (:perm_area, :per_code)";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':per_code', $this->per_code);
                oci_bind_by_name($stmt, ':perm_area', $value);
                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        if (isset($this->expiry_dates)) {
            $expiry_dates = array();
            $expiry_date = new ExpiryDate($this->conn);
            $expiry_date->edt_target_code = ExpiryTarget::PERSONNEL;
            $expiry_date->ed_object_id = $this->per_code;
            // write_log(json_encode($this->expiry_dates), __FILE__, __LINE__);
            foreach ($this->expiry_dates as $key => $value) {
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
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $this->per_code;

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

    public function check_password()
    {
        if (!isset($this->per_code)) {
            $this->per_code = Utilities::getCurrPsn();
        }
        $encrypted = $this->ecrypt_password($this->password);

        /* write_log(sprintf("check_password per_code [%s]", $this->per_code),
        __FILE__, __LINE__, LogLevel::WARNING);
        write_log(sprintf("check_password password [%s]", $this->password),
        __FILE__, __LINE__, LogLevel::WARNING);
        write_log(sprintf("check_password encrypted [%s]", $encrypted),
        __FILE__, __LINE__, LogLevel::WARNING); */

        $query = "
            SELECT COUNT(*) CN 
            FROM PERSONNEL
            WHERE PER_CODE = :per_code 
              AND (PER_PASSWD_2 = :encrypted OR PER_PASSWD = :encrypted)
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':encrypted', $encrypted);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] > 0) {
            $error = new EchoSchema(200, response("__PASS__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        } else {
            $error = new EchoSchema(500, response("__INVALID_PASSWORD__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    // public function activate_login()
    // {
    //     $query = "SELECT CONFIG_VALUE VAL 
    //         FROM SITE_CONFIG
    //         WHERE CONFIG_KEY = 'URBAC_PWD_REUSE'";
    //     $stmt = oci_parse($this->conn, $query);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
    //         echo json_encode($error, JSON_PRETTY_PRINT);
    //         return;
    //     }

    //     $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //     $reuse = $row['VAL'];

    //     $query = "SELECT PWDTRACE_PWD
    //         FROM URBAC_PWD_TRACES, URBAC_USERS
    //         WHERE PWDTRACE_USERID = USER_ID AND USER_CODE = :per_code
    //         ORDER BY PWDTRACE_LAST_CHG DESC";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':per_code', $this->per_code);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
    //         echo json_encode($error, JSON_PRETTY_PRINT);
    //         return;
    //     }

    //     $encrypted = $this->ecrypt_password($this->password);
    //     while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    //         if ($reuse <= 0) {
    //             break;
    //         }

    //         $password_hist = $row['PWDTRACE_PWD'];
    //         if ($encrypted === $password_hist) {
    //             write_log("Cannot change to this password because it is recently used", __FILE__, __LINE__, LogLevel::ERROR);
    //             $error = new EchoSchema(500, response("__PWD_RECENTLY_USED__"));
    //             echo json_encode($error, JSON_PRETTY_PRINT);
    //             return;
    //         }

    //         $reuse -= 1;
    //     }

    //     $query = "SELECT USER_PASSWORD
    //         FROM URBAC_USERS
    //         WHERE USER_CODE = :per_code";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':per_code', $this->per_code);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
    //         echo json_encode($error, JSON_PRETTY_PRINT);
    //         return;
    //     }

    //     $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //     $old_db_password = $row['VAL'];
    //     $old_encryped = $this->ecrypt_password($this->old_password);
    //     if ($old_db_password !== $old_encryped) {
    //         write_log("Incorrect old password", __FILE__, __LINE__, LogLevel::ERROR);
    //         $error = new EchoSchema(500, response("__INVALID_PASSWORD__"));
    //         echo json_encode($error, JSON_PRETTY_PRINT);
    //         return;
    //     }

    //     $query = "
    //         UPDATE URBAC_USERS 
    //         SET USER_PASSWORD = :encrpted, USER_STATUS_FLAG = 1
    //         WHERE USER_CODE = :per_code";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':encrpted', $encrypted);
    //     oci_bind_by_name($stmt, ':per_code', $this->per_code);
    //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            
    //         $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
    //         echo json_encode($error, JSON_PRETTY_PRINT);
    //         return;
    //     }

    //     $query = "
    //         UPDATE PERSONNEL 
    //         SET PER_PASSWD_2 = :encrpted, PER_PASSWD = :encrpted
    //         WHERE PER_CODE = :per_code";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':encrpted', $encrypted);
    //     oci_bind_by_name($stmt, ':per_code', $this->per_code);
    //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            
    //         $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
    //         echo json_encode($error, JSON_PRETTY_PRINT);
    //         return;
    //     }

    //     $error = new EchoSchema(200, response("__PWD_UPDATED__", 
    //         sprintf("Password of user %s has been updated", $this->per_code)));
    //     echo json_encode($error, JSON_PRETTY_PRINT);
    //     return;
    // }

    public function reset_password()
    {
        $this->update_password();
        //Set USER_STATUS_FLAG = 0 so when user login with new password, force to change password
        $query = "UPDATE URBAC_USERS SET USER_STATUS_FLAG = 0 WHERE USER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        return;
    }

    public function update_password()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query = "SELECT CONFIG_VALUE VAL 
            FROM SITE_CONFIG
            WHERE CONFIG_KEY = 'URBAC_PWD_REUSE'";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $reuse = $row['VAL'];

        $query = "SELECT PWDTRACE_PWD
            FROM URBAC_PWD_TRACES, URBAC_USERS
            WHERE PWDTRACE_USERID = USER_ID AND USER_CODE = :per_code
            ORDER BY PWDTRACE_LAST_CHG DESC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $encrypted = $this->ecrypt_password($this->password);
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            if ($reuse <= 0) {
                break;
            }

            $password_hist = $row['PWDTRACE_PWD'];
            if ($encrypted === $password_hist) {
                write_log("Cannot change to this password because it is recently used", __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__PWD_RECENTLY_USED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }

            $reuse -= 1;
        }

        $query_string = "usr=" . rawurlencode(strip_tags($this->per_code)) . 
            "&old_pwd=" . rawurlencode($this->old_password) . 
            "&new_pwd=" . rawurlencode($this->password);
        $cgi_response = Utilities::http_cgi_invoke("cgi-bin/en/atm/resetpassword.cgi", $query_string);
        // write_log($cgi_response, __FILE__, __LINE__);
        if ($cgi_response === false) {
            $e = error_get_last();
            write_log($e['message'], __FILE__, __LINE__);
            $error = new EchoSchema(500, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        write_log(json_encode($cgi_response), __FILE__, __LINE__);
        $cgi_ret = Utilities::get_cgi_xml_value($cgi_response, 'MSG_CODE');
        $cgi_desc = Utilities::get_cgi_xml_value($cgi_response, 'MSG_DESC');

        $result = array();
        $result["records"] = array();
        if ($cgi_ret != 0) {
            // write_log($cgi_ret, __FILE__, __LINE__);
            write_log(sprintf("Failed to update password of user %s. err: %s", $this->per_code, $cgi_desc), __FILE__, __LINE__);
            $error = new EchoSchema(500, response("__PWD_UPDATE_FAILED__", 
                sprintf("Failed to update password of user %s. err: %s", $this->per_code, $cgi_desc)));
            echo json_encode($error, JSON_PRETTY_PRINT);

            return;
        }

        if ($this->refresh_token) {
            $result = array();
            $result[0] = new stdClass();
            $result[0]->code = $code;
            $result[0]->type = $type;
            $result[0]->message = $msg;

            $sess_id = null;
            $pay_load = null;
            if (JWT_AUTH) {
                try {
                    $token = get_http_token();
                    $pay_load = check_token($token);
                    if ($pay_load) {
                        $sess_id = $pay_load->sess_id;
                    } else {
                        write_log("Failed to check token", __FILE__, __LINE__, LogLevel::ERROR);
                    }
                } catch (Exception $e) {
                    write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                }
            }

            $rotated = substr($sess_id, 1) . substr($str, 0, 1);
            $query = "UPDATE HTTP_SESSION_TRACE SET SESS_ID = :rotated WHERE SESS_ID = :sess_id";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':sess_id', $sess_id);
            oci_bind_by_name($stmt, ':rotated', $rotated);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                
                // $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
                // echo json_encode($error, JSON_PRETTY_PRINT);
                // return;
            } else {
                $sess_id = $rotated;
            }

            $result[0]->token = get_token($pay_load->per_code, $sess_id, $pay_load->site_code, $pay_load->site_name, $pay_load->lang);

            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $error = new EchoSchema(200, response("__PWD_UPDATED__", 
                sprintf("Password of user %s has been updated", $this->per_code)));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
        
        return;
    }

    public function update_dep()
    {
        if (!isset($this->per_code)) {
            $this->per_code = Utilities::getCurrPsn();
        }

        //Old data
        $query = "SELECT PER_DEPARTMENT FROM GUI_PERSONNEL
            WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $old_dep = $row['PER_DEPARTMENT'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if ($this->per_department == $old_dep){
            $error = new EchoSchema(200, response("__UPDATE_SUCCEEDED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query = "
            UPDATE PERSONNEL SET PER_DEPARTMENT = :dep
            WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':dep', $this->per_department);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            
            $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $journal = new Journal($this->conn, true);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $this->per_code;

        $module = "GUI_PERSONNEL";
        $record = sprintf("code:%s", $this->per_code);
        $journal->valueChange($module, $record, "department", $old_dep, $this->per_department);

        $error = new EchoSchema(200, response("__UPDATE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    public function update()
    {
        $query = "SELECT NVL(CONFIG_VALUE, 2) CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_EXPIRY_DATE_MANAGE_MODE'";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $expiry_mode = $row['CONFIG_VALUE'];    //1: old, 2: new, 3: both

        //Old data
        $query = "
            SELECT * FROM GUI_PERSONNEL
            WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        //Old data: area access control
        $perm_array = array();
        $query = "
            SELECT PERM_OF_AREA.*, AREA_NAME
            FROM PERM_OF_AREA, AREA_RC
            WHERE PERM_AREA = AREA_K AND PERM_PSN = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            while ($perm_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                $base_item = array();
                foreach ($perm_row as $key => $value) {
                    $base_item[strtolower($key)] = $value;
                }

                $base_item = array_map(function ($v) {
                    return (is_null($v)) ? "" : $v;
                }, $base_item);
                // write_log(json_encode($perm_row), __FILE__, __LINE__);
                $perm_array[strtolower($perm_row['PERM_AREA'])] = $base_item;
                // array_push($perm_array, $base_item);
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $stmt = $this->prepare_update($stmt);
        if (!$stmt) {
            return false;
        } else if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE PERSONNEL SET PER_LAST_MODIFIED = SYSDATE
            WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (isset($this->user_status_flag)) {
            $query = "
            UPDATE URBAC_USERS
            SET USER_STATUS_FLAG = :user_status_flag
            WHERE TRIM(USER_CODE) = :per_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':per_code', $this->per_code);
            oci_bind_by_name($stmt, ':user_status_flag', $this->user_status_flag);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        if (isset($this->per_auth)) {
            $query = "
                UPDATE URBAC_USER_ROLES
                SET ROLE_ID = :per_auth
                WHERE USER_ID = (SELECT USER_ID FROM URBAC_USERS WHERE USER_CODE = :per_code)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':per_code', $this->per_code);
            oci_bind_by_name($stmt, ':per_auth', $this->per_auth);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        if (isset($this->pt_timecd)) {
            $query = "
            UPDATE PER_TIMECODE
            SET PT_TIMECD = :pt_timecd
            WHERE TRIM(PT_PSNCODE) = :per_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':pt_timecd', $this->pt_timecd);
            oci_bind_by_name($stmt, ':per_code', $this->per_code);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        if (isset($this->perl_ara)) {
            $query = "UPDATE PERS_IN_AREA SET PERL_ARA = :perl_ara
                WHERE TRIM(PERL_PSN) = :per_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':perl_ara', $this->perl_ara);
            oci_bind_by_name($stmt, ':per_code', $this->per_code);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }
        
        $query = "DELETE FROM PERM_OF_AREA WHERE PERM_PSN = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (isset($this->area_accesses)) {
            foreach ($this->area_accesses as $key => $value) {
                // write_log($key, __FILE__, __LINE__);
                // write_log(json_encode($value), __FILE__, __LINE__);
                $query = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN)
                    VALUES (:perm_area, :per_code)";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':per_code', $this->per_code);
                oci_bind_by_name($stmt, ':perm_area', $value);
                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        if (isset($this->expiry_dates) && ($expiry_mode == '2' || $expiry_mode == '3')) {
            //Update expiry dates
            $expiry_dates = array();
            $expiry_date = new ExpiryDate($this->conn);
            $expiry_date->edt_target_code = 'PERSONNEL';
            $expiry_date->ed_object_id = $this->per_code;

            // write_log(json_encode($this->expiry_dates), __FILE__, __LINE__);
            foreach ($this->expiry_dates as $key => $value) {
                $expiry_dates[$value->edt_type_code] = $value;
            }
            // write_log(json_encode(expiry_dates), __FILE__, __LINE__);
            if (!$expiry_date->update($expiry_dates)) {
                write_log("Failed to update expiry dates",
                    __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        //Bulk etp
        if (isset($this->bulk_edit)) {
            foreach ($this->bulk_edit as $bluk_eqpt) {
                // write_log(json_encode($bluk_eqpt), __FILE__, __LINE__);
                if ($bluk_eqpt->per_code === $this->per_code) {
                    continue;
                }

                //Legacy expiry or both
                if ($expiry_mode == '1' || $expiry_mode == '3') {
                    $query = "UPDATE PERSONNEL
                        SET PER_EXP_D1_DMY = :per_exp_d1_dmy,
                            PER_EXP_D2_DMY = :per_exp_d2_dmy,
                            PER_EXP_D3_DMY = :per_exp_d3_dmy
                        WHERE PER_CODE = :per_code";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':per_code', $bluk_eqpt->per_code);
                    oci_bind_by_name($stmt, ':per_exp_d1_dmy', $this->per_exp_d1_dmy);
                    oci_bind_by_name($stmt, ':per_exp_d2_dmy', $this->per_exp_d2_dmy);
                    oci_bind_by_name($stmt, ':per_exp_d3_dmy', $this->per_exp_d3_dmy);
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        oci_rollback($this->conn);
                        return false;
                    }
                } 

                //New expiry or both
                if ($expiry_mode == '2' || $expiry_mode == '3') {
                    if (!isset($this->expiry_dates)) {
                        $expiry_date = new ExpiryDate($this->conn);
                        $expiry_date->ed_target_code = ExpiryTarget::PERSONNEL;
                        $expiry_date->ed_object_id = $this->per_code;
                        $stmt = $expiry_date->read();
                        $result = array();
                        Utilities::retrieve($result, $expiry_date, $stmt);
                        $this->expiry_dates = $result;
                    }
    
                    $expiry_dates = array();
                    $expiry_date->ed_object_id = $bluk_eqpt->per_code;
                    $expiry_date->edt_target_code = ExpiryTarget::PERSONNEL;
                    // write_log(json_encode($this->expiry_dates), __FILE__, __LINE__);
                    foreach ($this->expiry_dates as $key => $value) {
                        if (is_array($value)) {
                            $value = (object)$value;
                        }
                        
                        $value->edt_object_id = $bluk_eqpt->per_code;
                        $value->ed_object_id = $bluk_eqpt->per_code;
                        $expiry_date->ed_object_id = $bluk_eqpt->per_code;
                        $expiry_dates[$value->edt_type_code] = $value;
                    }
                    // write_log(json_encode($expiry_dates), __FILE__, __LINE__);
                    if (!$expiry_date->update($expiry_dates)) {
                        write_log("Failed to update expiry dates",
                            __FILE__, __LINE__, LogLevel::ERROR);
                        oci_rollback($this->conn);
                        return false;
                    }
                } 
            }
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $this->per_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        //New data
        $query = "
            SELECT * FROM GUI_PERSONNEL
            WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = "GUI_PERSONNEL";
        $record = sprintf("code:%s", $this->per_code);
        // write_log(json_encode($row), __FILE__, __LINE__, LogLevel::ERROR);
        // write_log(json_encode($row2), __FILE__, __LINE__, LogLevel::ERROR);
        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        $perm_array2 = array();
        $query = "
            SELECT PERM_OF_AREA.*, AREA_NAME
            FROM PERM_OF_AREA, AREA_RC
            WHERE PERM_AREA = AREA_K AND PERM_PSN = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            while ($perm_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                $base_item = array();
                foreach ($perm_row as $key => $value) {
                    $base_item[strtolower($key)] = $value;
                }

                $base_item = array_map(function ($v) {
                    return (is_null($v)) ? "" : $v;
                }, $base_item);

                // array_push($perm_array2, $base_item);
                $perm_array2[strtolower($perm_row['PERM_AREA'])] = $base_item;
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        foreach ($perm_array as $key => $value) {
            if (!in_array($key, array_keys($perm_array2))) {
                //In old, but not in new
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = "area access control";
                $jnl_data[2] = sprintf("personnel code:%s", $this->per_code);
                $jnl_data[3] = sprintf("area name:%s", $value['area_name']);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        foreach ($perm_array2 as $key => $value) {
            if (!in_array($key, array_keys($perm_array))) {
                //In new, but not in old
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = "area access control";
                $jnl_data[2] = sprintf("personnel code:%s", $this->per_code);
                $jnl_data[3] = sprintf("area name:%s", $value['area_name']);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        //store procedure DELETE_PERSONNEL also checks if this personnel has been
        //used by trip. If so, it will not physically delete it.
        $query = "
            BEGIN DELETE_PERSONNEL(:per_code, :exec_result); END;";
        $stmt = oci_parse($this->conn, $query);
        $exec_result = null;
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':exec_result', $exec_result, -1, SQLT_INT);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT) || !($exec_result === 0)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        //delete expiry dates
        $expiry_dates = array();
        $expiry_date = new ExpiryDate($this->conn);
        $expiry_date->edt_target_code = ExpiryTarget::PERSONNEL;
        $expiry_date->ed_object_id = $this->per_code;
        if (!$expiry_date->delete()) {
            write_log("Failed to delete expiry dates", __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $this->per_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function readOne()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT *
            FROM
                " . $this->VIEW_NAME . "
            WHERE PER_CODE = :per_code";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);

        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // extract(array_change_key_case($row);
            $this->per_code = $row['PER_CODE'];
            $this->per_name = $row['PER_NAME'];
            $this->per_cmpy = $row['PER_CMPY'];
            $this->per_auth = $row['PER_AUTH'];
            $this->per_lock = $row['PER_LOCK'];
            $this->per_last_dmy = $row['PER_LAST_DMY'];
            $this->per_department = $row['PER_DEPARTMENT'];
            $this->per_licence_no = $row['PER_LICENCE_NO'];
            $this->per_next_msg = $row['PER_NEXT_MSG'];
            $this->per_level_num = $row['PER_LEVEL_NUM'];
            $this->per_terminal = $row['PER_TERMINAL'];
            $this->per_comments = html_entity_decode($row['PER_COMMENTS']);
            $this->cmpy_code = $row['CMPY_CODE'];
            $this->cmpy_name = $row['CMPY_NAME'];
            $this->cmpy_type = $row['CMPY_TYPE'];
            $this->cmpy_compress_bl = $row['CMPY_COMPRESS_BL'];
            $this->cmpy_check_licen = $row['CMPY_CHECK_LICEN'];
            $this->cmpy_ldgo_delta = $row['CMPY_LDGO_DELTA'];
            $this->cmpy_msg = $row['CMPY_MSG'];
            $this->cmpy_vet = $row['CMPY_VET'];
            $this->cmpy_tkr_cfg = $row['CMPY_TKR_CFG'];
            $this->cmpy_enable_expd = $row['CMPY_ENABLE_EXPD'];
            $this->cmpy_seal_number = $row['CMPY_SEAL_NUMBER'];
            $this->cmpy_exp_code = $row['CMPY_EXP_CODE'];
            $this->cmpy_issu = $row['CMPY_ISSU'];
            $this->cmpy_host = $row['CMPY_HOST'];
            $this->cmpy_aoi = $row['CMPY_AOI'];
            $this->cmpy_auto_ld = $row['CMPY_AUTO_LD'];
            $this->cmpy_rtn_prompt = $row['CMPY_RTN_PROMPT'];
            $this->cmpy_add_prompt = $row['CMPY_ADD_PROMPT'];
            $this->cmpy_log_ld_del = $row['CMPY_LOG_LD_DEL'];
            $this->cmpy_host_docs = $row['CMPY_HOST_DOCS'];
            $this->cmpy_comms_ok = $row['CMPY_COMMS_OK'];
            $this->cmpy_tkr_activat = $row['CMPY_TKR_ACTIVAT'];
            $this->cmpy_bol_vp_name = $row['CMPY_BOL_VP_NAME'];
            $this->cmpy_ld_rep_vp = $row['CMPY_LD_REP_VP'];
            $this->cmpy_drv_inst_vp = $row['CMPY_DRV_INST_VP'];
            $this->cmpy_wgh_complet = $row['CMPY_WGH_COMPLET'];
            $this->cmpy_wgh_auto_fl = $row['CMPY_WGH_AUTO_FL'];
            $this->cmpy_ord_carrier = $row['CMPY_ORD_CARRIER'];
            $this->cmpy_wipe_ordets = $row['CMPY_WIPE_ORDETS'];
            $this->cmpy_rpt_t_unit = $row['CMPY_RPT_T_UNIT'];
            $this->cmpy_rpt_temp = $row['CMPY_RPT_TEMP'];
            $this->cmpy_auto_reconc = $row['CMPY_AUTO_RECONC'];
            $this->cmpy_bay_loop_ch = $row['CMPY_BAY_LOOP_CH'];
            $this->cmpy_mod_drawer = $row['CMPY_MOD_DRAWER'];
            $this->cmpy_must_sealno = $row['CMPY_MUST_SEALNO'];
            $this->cmpy_bltol_flag = $row['CMPY_BLTOL_FLAG'];
            $this->cmpy_ldtol_flag = $row['CMPY_LDTOL_FLAG'];
            $this->cmpy_req_pin_flag = $row['CMPY_REQ_PIN_FLAG'];
            $this->pt_psncode = $row['PT_PSNCODE'];
            $this->pt_timecd = $row['PT_TIMECD'];
            $this->perl_psn = $row['PERL_PSN'];
            $this->perl_ara = $row['PERL_ARA'];
            $this->perl_enter_time = $row['PERL_ENTER_TIME'];
            $this->user_id = $row['USER_ID'];
            $this->user_code = $row['USER_CODE'];
            $this->user_username = $row['USER_USERNAME'];
            $this->user_type = $row['USER_TYPE'];
            $this->user_status_flag = $row['USER_STATUS_FLAG'];
            $this->user_login_count = $row['USER_LOGIN_COUNT'];
            $this->user_last_reason = $row['USER_LAST_REASON'];
            $this->valid_time = $row['VALID_TIME'];
            $this->expire_time = $row['EXPIRE_TIME'];
            $this->record_switch = $row['RECORD_SWITCH'];
            $this->record_order = $row['RECORD_ORDER'];
        }
    }

    public function search($keyword)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT *
            FROM
                " . $this->VIEW_NAME . "
            WHERE PER_CODE LIKE :per_code
                OR PER_NAME LIKE :per_name
            ORDER BY PER_CODE";

        $stmt = oci_parse($this->conn, $query);
        $keyword = htmlspecialchars(strip_tags($keyword));
        $keyword = "%{$keyword}%";
        oci_bind_by_name($stmt, ':per_code', $keyword);
        oci_bind_by_name($stmt, ':per_name', $keyword);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // read products with pagination
    public function readPaging($from_record_num, $to_record_num)
    {
        Utilities::sanitize($this);

        // select query
        $query = "
            SELECT * FROM (
            SELECT RES.*, ROW_NUMBER() OVER (ORDER BY PER_CODE) RN
            FROM
            (
            SELECT *
            FROM
                " . $this->VIEW_NAME . "
            ORDER BY PER_CODE) RES
            )
            WHERE RN BETWEEN :start_index AND :end_index";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_index', $from_record_num, -1, SQLT_INT);
        oci_bind_by_name($stmt, ':end_index', $to_record_num, -1, SQLT_INT);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // used for paging products
    public function count()
    {
        $query = "SELECT COUNT(*) TOTAL_ROWS FROM " . $this->VIEW_NAME . "";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return $row['TOTAL_ROWS'];
        }
    }

    public function update_status()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        //Old data
        $query = "
            SELECT * FROM GUI_PERSONNEL
            WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        if (isset($this->user_status_flag)) {
            $query = "
            UPDATE URBAC_USERS
            SET USER_STATUS_FLAG = :user_status_flag
            WHERE TRIM(USER_CODE) = :per_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':per_code', $this->per_code);
            oci_bind_by_name($stmt, ':user_status_flag', $this->user_status_flag);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $this->per_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        //New data
        $query = "
            SELECT * FROM GUI_PERSONNEL
            WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = "GUI_PERSONNEL";
        $record = sprintf("code:%s", $this->per_code);
        // write_log(json_encode($row), __FILE__, __LINE__, LogLevel::ERROR);
        // write_log(json_encode($row2), __FILE__, __LINE__, LogLevel::ERROR);
        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}
