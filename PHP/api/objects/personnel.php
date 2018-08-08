<?php
class Personnel 
{
    
    // database connection and table name
    private $conn;
    private $table_name = "GUI_PERSONNEL";
    private $default_pwd = 'a1qhH6yu9Tjg.';
 
    // object properties
    public $per_code;
    public $per_name;
    public $per_cmpy;
    public $per_auth;
    public $per_lock;
    public $per_last_dmy;
    public $per_department;
    public $per_licence_no;
    public $per_next_msg;
    public $per_level_num;
    public $per_terminal;
    public $per_comments;
    public $cmpy_code;
    public $cmpy_name;
    public $cmpy_type;
    public $cmpy_compress_bl;
    public $cmpy_check_licen;
    public $cmpy_ldgo_delta;
    public $cmpy_msg;
    public $cmpy_vet;
    public $cmpy_tkr_cfg;
    public $cmpy_enable_expd;
    public $cmpy_seal_number;
    public $cmpy_exp_code;
    public $cmpy_issu;
    public $cmpy_host;
    public $cmpy_aoi;
    public $cmpy_auto_ld;
    public $cmpy_rtn_prompt;
    public $cmpy_add_prompt;
    public $cmpy_log_ld_del;
    public $cmpy_host_docs;
    public $cmpy_comms_ok;
    public $cmpy_tkr_activat;
    public $cmpy_bol_vp_name;
    public $cmpy_ld_rep_vp;
    public $cmpy_drv_inst_vp;
    public $cmpy_wgh_complet;
    public $cmpy_wgh_auto_fl;
    public $cmpy_ord_carrier;
    public $cmpy_wipe_ordets;
    public $cmpy_rpt_t_unit;
    public $cmpy_rpt_temp;
    public $cmpy_auto_reconc;
    public $cmpy_bay_loop_ch;
    public $cmpy_mod_drawer;
    public $cmpy_must_sealno;
    public $cmpy_bltol_flag;
    public $cmpy_ldtol_flag;
    public $cmpy_req_pin_flag;
    public $pt_psncode;
    public $pt_timecd;
    public $perl_psn;
    public $perl_ara;
    public $perl_enter_time;
    public $user_id;
    public $user_code;
    public $user_username;
    public $user_type;
    public $user_status_flag;
    public $user_login_count;
    public $user_last_reason;
    public $valid_time;
    public $expire_time;
    public $record_switch;
    public $record_order;
 
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    function read()
    {
        $query = "
            SELECT PER_CODE,
                PER_NAME,
                PER_CMPY,
                PER_AUTH,
                PER_LOCK,
                PER_LAST_DMY,
                PER_DEPARTMENT,
                PER_LICENCE_NO,
                PER_NEXT_MSG,
                PER_LEVEL_NUM,
                PER_TERMINAL,
                PER_COMMENTS,
                CMPY_CODE,
                CMPY_NAME,
                CMPY_TYPE,
                CMPY_COMPRESS_BL,
                CMPY_CHECK_LICEN,
                CMPY_LDGO_DELTA,
                CMPY_MSG,
                CMPY_VET,
                CMPY_TKR_CFG,
                CMPY_ENABLE_EXPD,
                CMPY_SEAL_NUMBER,
                CMPY_EXP_CODE,
                CMPY_ISSU,
                CMPY_HOST,
                CMPY_AOI,
                CMPY_AUTO_LD,
                CMPY_RTN_PROMPT,
                CMPY_ADD_PROMPT,
                CMPY_LOG_LD_DEL,
                CMPY_HOST_DOCS,
                CMPY_COMMS_OK,
                CMPY_TKR_ACTIVAT,
                CMPY_BOL_VP_NAME,
                CMPY_LD_REP_VP,
                CMPY_DRV_INST_VP,
                CMPY_WGH_COMPLET,
                CMPY_WGH_AUTO_FL,
                CMPY_ORD_CARRIER,
                CMPY_WIPE_ORDETS,
                CMPY_RPT_T_UNIT,
                CMPY_RPT_TEMP,
                CMPY_AUTO_RECONC,
                CMPY_BAY_LOOP_CH,
                CMPY_MOD_DRAWER,
                CMPY_MUST_SEALNO,
                CMPY_BLTOL_FLAG,
                CMPY_LDTOL_FLAG,
                CMPY_REQ_PIN_FLAG,
                PT_PSNCODE,
                PT_TIMECD,
                PERL_PSN,
                PERL_ARA,
                PERL_ENTER_TIME,
                USER_ID,
                USER_CODE,
                USER_USERNAME,
                USER_TYPE,
                USER_STATUS_FLAG,
                USER_LOGIN_COUNT,
                USER_LAST_REASON,
                VALID_TIME,
                EXPIRE_TIME,
                RECORD_SWITCH,
                RECORD_ORDER                    
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

    function create()
    {
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
            oci_free_statement($stmt);
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
            oci_free_statement($stmt);
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
            oci_free_statement($stmt);
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
            oci_free_statement($stmt);
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
            oci_free_statement($stmt);
            return false;
        }

        oci_commit();
        oci_free_statement($stmt);
        return true;
    }
}
