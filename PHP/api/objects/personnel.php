<?php

include_once '../config/journal.php';
include_once '../config/log.php';

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

    //Calls CGI. This is because there is some logic inside CGI
    //Do not want to reimplement this funciton in PHP
    // function create()
    // {

    // }

    // pure php function
    function create()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);
        
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
            oci_rollback($this->conn);;
            return false;
        }

        $journal = new Journal($this->conn);
        $data[0] = "TEST";  //TODO USER
        $data[1] = "PERSONNEL";
        $data[2] = $this->per_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            oci_rollback($this->conn);;
            return false;
        }

        oci_commit();
        return true;
    }

    public function readOne()
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
            WHERE PER_CODE = :per_code
            ORDER BY PER_CODE";
                
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
        // select query
        $query = "
            SELECT * FROM (
            SELECT RES.*, ROW_NUMBER() OVER (ORDER BY PER_CODE) RN 
            FROM
            (
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
