<?php
class Database 
{
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    //For example: RECORD_ALTERED, userTxt, recordnmTxt, keyTxt
    // public function jnlLogEvent($template, $data, $jnl_type, $jnl_category)
    // {
    //     $query = "INSERT INTO SITE_JOURNAL 
    //             (GEN_DATE,
    //             REGION_CODE,
    //             COMPANY_CODE,
    //             MSG_EVENT,
    //             MSG_CLASS,
    //             MESSAGE,
    //             SEQ,                                                                                                                                                                                                                        
    //             JNL_CAT) 
    //     VALUES (SYSDATE,
    //             'ENG',
    //             :per_cmpy,
    //             :per_auth,
    //             :per_lock,
    //             SYSDATE,
    //             :per_department,
    //             'a1qhH6yu9Tjg.', 
    //             :per_licence_no,
    //             :per_next_msg,
    //             :per_passwd_2,
    //             :per_level_num,
    //             :per_terminal,
    //             :per_comments,
    //             SYSDATE)";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':per_code', $this->per_code);
    //     oci_bind_by_name($stmt, ':per_name', $this->per_name);
    //     oci_bind_by_name($stmt, ':per_cmpy', $this->per_cmpy);
    //     oci_bind_by_name($stmt, ':per_auth', $this->per_auth);
    //     oci_bind_by_name($stmt, ':per_lock', $this->per_lock);
    //     oci_bind_by_name($stmt, ':per_department', $this->per_department);
    //     oci_bind_by_name($stmt, ':per_licence_no', $this->per_licence_no);
    //     oci_bind_by_name($stmt, ':per_next_msg', $this->per_next_msg);
    //     oci_bind_by_name($stmt, ':per_passwd_2', $this->default_pwd);
    //     oci_bind_by_name($stmt, ':per_level_num', $this->per_level_num);
    //     oci_bind_by_name($stmt, ':per_terminal', $this->per_terminal);
    //     oci_bind_by_name($stmt, ':per_comments', $this->per_comments);

    //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         oci_free_statement($stmt);
    //         return false;
    //     }
    // }
}