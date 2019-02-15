<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';
include_once __DIR__  . '/../objects/expiry_date.php';
include_once __DIR__  . '/../objects/expiry_type.php';

class Personnel 
{
    // database connection and table name
    private $conn;
    private $table_name = "GUI_PERSONNEL";
    private $default_pwd = 'a1qhH6yu9Tjg.';
 
    // object properties
    // public $per_code;
    // public $per_name;
    // public $per_cmpy;
    // public $per_auth;
    // public $per_lock;
    // public $per_last_dmy;
    // public $per_department;
    // public $per_licence_no;
    // public $per_next_msg;
    // public $per_level_num;
    // public $per_terminal;
    // public $per_comments;
    // public $cmpy_code;
    // public $cmpy_name;
    // public $cmpy_type;
    // public $cmpy_compress_bl;
    // public $cmpy_check_licen;
    // public $cmpy_ldgo_delta;
    // public $cmpy_msg;
    // public $cmpy_vet;
    // public $cmpy_tkr_cfg;
    // public $cmpy_enable_expd;
    // public $cmpy_seal_number;
    // public $cmpy_exp_code;
    // public $cmpy_issu;
    // public $cmpy_host;
    // public $cmpy_aoi;
    // public $cmpy_auto_ld;
    // public $cmpy_rtn_prompt;
    // public $cmpy_add_prompt;
    // public $cmpy_log_ld_del;
    // public $cmpy_host_docs;
    // public $cmpy_comms_ok;
    // public $cmpy_tkr_activat;
    // public $cmpy_bol_vp_name;
    // public $cmpy_ld_rep_vp;
    // public $cmpy_drv_inst_vp;
    // public $cmpy_wgh_complet;
    // public $cmpy_wgh_auto_fl;
    // public $cmpy_ord_carrier;
    // public $cmpy_wipe_ordets;
    // public $cmpy_rpt_t_unit;
    // public $cmpy_rpt_temp;
    // public $cmpy_auto_reconc;
    // public $cmpy_bay_loop_ch;
    // public $cmpy_mod_drawer;
    // public $cmpy_must_sealno;
    // public $cmpy_bltol_flag;
    // public $cmpy_ldtol_flag;
    // public $cmpy_req_pin_flag;
    // public $pt_psncode;
    // public $pt_timecd;
    // public $perl_psn;
    // public $perl_ara;
    // public $perl_enter_time;
    // public $user_id;
    // public $user_code;
    // public $user_username;
    // public $user_type;
    // public $user_status_flag;
    // public $user_login_count;
    // public $user_last_reason;
    // public $valid_time;
    // public $expire_time;
    // public $record_switch;
    // public $record_order;
 
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    function read()
    {
        $query = "
            SELECT *                    
            FROM
                " . $this->table_name . " 
            ORDER BY PER_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    function areaAccess()
    {
        $query = "
            SELECT PERM_OF_AREA.*, AREA_NAME 
            FROM PERM_OF_AREA, AREA_RC 
            WHERE PERM_AREA = AREA_K AND PERM_PSN = :perm_psn
            ORDER BY AREA_K";        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':perm_psn', $this->per_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    //Calls CGI. This is because there is some logic inside CGI
    //Do not want to reimplement this funciton in PHP
    // function create()
    // {

    // }

    // pure php function
    function create()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

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

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            // $err_str = oci_error($stmt)['message'];
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);;
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);;
            return false;
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
            oci_rollback($this->conn);;
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);;
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $this->per_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function update()
    {
        write_log(__CLASS__ . ":::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        //Old data
        $query = "
            SELECT * FROM GUI_PERSONNEL 
            WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);            
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            while ($perm_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS))
            {
                $base_item = array();
                foreach ($perm_row as $key => $value) {
                    $base_item[strtolower($key)] = $value;
                }

                $base_item = array_map(function($v){
                    return (is_null($v)) ? "" : $v;
                }, $base_item);
                // write_log(json_encode($perm_row), __FILE__, __LINE__);
                $perm_array[strtolower($perm_row['PERM_AREA'])] = $base_item;
                // array_push($perm_array, $base_item);
            }          
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }
        
        $query = "
            UPDATE PERSONNEL
            SET PER_LOCK = :per_lock,
                PER_NAME = :per_name,
                PER_DEPARTMENT= DECODE(:per_department, '-1', NULL, :per_department),
                PER_LICENCE_NO = DECODE(:per_licence_no, '-1', NULL, :per_licence_no),
                PER_AUTH = :per_auth,
                PER_CMPY = :per_cmpy,
                PER_COMMENTS = :per_comments,
                PER_LEVEL_NUM = :per_level_num,
                PER_EMAIL = :per_email
            WHERE TRIM(PER_CODE) = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':per_name', $this->per_name);
        oci_bind_by_name($stmt, ':per_cmpy', $this->per_cmpy);
        oci_bind_by_name($stmt, ':per_auth', $this->per_auth);
        oci_bind_by_name($stmt, ':per_lock', $this->per_lock);
        oci_bind_by_name($stmt, ':per_department', $this->per_department);
        oci_bind_by_name($stmt, ':per_licence_no', $this->per_licence_no);
        oci_bind_by_name($stmt, ':per_level_num', $this->per_level_num);
        oci_bind_by_name($stmt, ':per_comments', $this->per_comments);
        oci_bind_by_name($stmt, ':per_email', $this->per_email);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            // $err_str = oci_error($stmt)['message'];
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);;
            return false;
        }

        $query = "
            UPDATE URBAC_USERS
            SET USER_STATUS_FLAG = :user_status_flag
            WHERE TRIM(USER_CODE) = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':user_status_flag', $this->user_status_flag);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            // $err_str = oci_error($stmt)['message'];
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);;
            return false;
        }

        $query = "
            UPDATE PER_TIMECODE   
            SET PT_TIMECD = :pt_timecd  
            WHERE TRIM(PT_PSNCODE) = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pt_timecd', $this->pt_timecd);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            oci_rollback($this->conn);;
            return false;
        }

        $query = "UPDATE PERS_IN_AREA SET PERL_ARA = :perl_ara
            WHERE TRIM(PERL_PSN) = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':perl_ara', $this->perl_ara);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);;
            return false;
        }

        $query = "DELETE FROM PERM_OF_AREA WHERE PERM_PSN = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);;
            return false;
        }

        foreach ($this->area_accesses as $key => $value) {
            // write_log($key, __FILE__, __LINE__);
            // write_log(json_encode($value), __FILE__, __LINE__);
            $query = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) 
                VALUES (:perm_area, :per_code)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':per_code', $this->per_code);
            oci_bind_by_name($stmt, ':perm_area', $value->perm_area);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);;
                return false;
            }
        }

        //Update expiry dates
        $expiry_dates = array();
        $expiry_date = new ExpiryDate($this->conn);
        // write_log(json_encode($this->expiry_dates), __FILE__, __LINE__);
        foreach ($this->expiry_dates as $key => $value) {
            $expiry_dates[$value->edt_type_code] = $value;
        }
        // write_log(json_encode($expiry_dates), __FILE__, __LINE__);
        if (!$expiry_date->update($expiry_dates)) {
            write_log("Failed to update expiry dates", 
                __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $this->per_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }
        
        $module = "GUI_PERSONNEL";
        $record = sprintf("code:%s", $this->per_code);
        foreach ($row2 as $key => $value) {
            if ((strpos($key, "CMPY_") !== false && $key != "CMPY_NAME") ||
                $key === "PER_CMPY" ||
                $key === "USER_LOGIN_COUNT"
                ) 
                continue;

            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] && 
                !$journal->valueChange(
                    $module, $record, $key, $row[strtoupper($key)], $value)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        $perm_array2 = array();
        $query = "
            SELECT PERM_OF_AREA.*, AREA_NAME 
            FROM PERM_OF_AREA, AREA_RC 
            WHERE PERM_AREA = AREA_K AND PERM_PSN = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            while ($perm_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS))
            {
                $base_item = array();
                foreach ($perm_row as $key => $value) {
                    $base_item[strtolower($key)] = $value;
                }

                $base_item = array_map(function($v){
                    return (is_null($v)) ? "" : $v;
                }, $base_item);

                // array_push($perm_array2, $base_item);
                $perm_array2[strtolower($perm_row['PERM_AREA'])] = $base_item;
            }          
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        foreach ($perm_array as $key => $value) {
            if (!in_array($key, array_keys($perm_array2))) {
                //In old, but not in new
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = "area access control";
                $jnl_data[2] = sprintf("personnel code:%s", $this->per_code);
                $jnl_data[3] = sprintf("area name:%s", $value['area_name']);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
                {
                    write_log("DB error:" . oci_error($stmt)['message'], 
                        __FILE__, __LINE__, LogLevel::ERROR);
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
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
                {
                    write_log("DB error:" . oci_error($stmt)['message'], 
                        __FILE__, __LINE__, LogLevel::ERROR);
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
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            BEGIN DELETE_PERSONNEL(:per_code, :exec_result); END;";
        $stmt = oci_parse($this->conn, $query);
        $exec_result = NULL;
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':exec_result', $exec_result, -1, SQLT_INT);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT) || !($exec_result === 0)) {
            write_log("Failed to execute DELETE_PERSONNEL:" . 
                oci_error($stmt)['message'], __FILE__, __LINE__);
            oci_rollback($this->conn);;
            return false;
        }
        
        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PERSONNEL";
        $jnl_data[2] = $this->per_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
                " . $this->table_name . " 
            WHERE PER_CODE = :per_code";
                
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        
        if (oci_execute($stmt)) {
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
                " . $this->table_name . " 
            WHERE PER_CODE LIKE :per_code 
                OR PER_NAME LIKE :per_name
            ORDER BY PER_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        $keyword = htmlspecialchars(strip_tags($keyword));
        $keyword = "%{$keyword}%";
        oci_bind_by_name($stmt, ':per_code', $keyword);
        oci_bind_by_name($stmt, ':per_name', $keyword);
        if (oci_execute($stmt)) {
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
                " . $this->table_name . " 
            ORDER BY PER_CODE) RES
            )
            WHERE RN BETWEEN :start_index AND :end_index";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_index', $from_record_num, -1, SQLT_INT);
        oci_bind_by_name($stmt, ':end_index', $to_record_num, -1, SQLT_INT);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // used for paging products
    public function count(){
        $query = "SELECT COUNT(*) TOTAL_ROWS FROM " . $this->table_name . "";
     
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return $row['TOTAL_ROWS'];
        }
    }
}
