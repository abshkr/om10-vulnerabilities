<?php

include_once 'lookup.php';

//Also called JNL_TYPE in jnl.h
class JnlEvent
{
    const JNLT_ALL = 0;
    const JNLT_ORD = 1;
    const JNLT_SCHD = 2;
    const JNLT_LOAD = 3;
    const JNLT_BAY = 4;
    const JNLT_DELV = 5;
    const JNLT_PAY  = 6;
    const JNLT_MOVE = 7;
    const JNLT_VEHI = 8;
    const JNLT_DOC  = 9;
    const JNLT_FAIL = 10;
    const JNLT_CONF = 11;
    const JNLT_COMM = 12;
    const JNLT_ALRM = 13; /* incorrect procedure or malfunction events */ 
    const JNLT_SYS = 14;
    const JNLT_RSS = 15;
    const JNLT_SCAD = 16;
}

//Also called JNL_CATEGORY in jnl.h
class JnlClass
{
    const JNLC_DEBUG = 1;
    const JNLC_EVENT = 2;
    const JNLC_ERROR = 3;
    const JNLC_ALRM_CRITICAL = 4;
    const JNLC_ALRM_MAJOR = 5;
    const JNLC_ALRM_MINOR = 6;
    const JNLC_ALRM_WARNING = 7; 
    const JNLC_ALRM_INCIDENT = 8;
    const JNLC_ALRM_OBS_CRITICAL = 9;
    const JNLC_ALRM_OBS_MAJOR = 10;
    const JNLC_ALRM_OBS_MINOR = 11;
    const JNLC_ALRM_OBS_WARNING = 12;
    const JNLC_ALRM_OBS_INCIDENT = 13;
}

class Journal 
{
    private $conn;
    private $autoCommit;

    // constructor with $db as database connection
    public function __construct($db, $autocommit = true)
    {
        $this->conn = $db;
        $this->autoCommit = $autocommit;
    }

    private function getEventStr($jnl_event)
    {
        $query = "SELECT B.MESSAGE
            FROM ENUMITEM A,MSG_LOOKUP B
            WHERE B.MSG_ID = A.ENUM_TMM
                AND ENUMTYPENAME = 'JNL_EVENT'
                AND ENUM_NO = :enum_no
                AND LANG_ID = 'ENG'";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':enum_no', $jnl_event);
        if (!oci_execute($stmt)) {
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['MESSAGE'];
    }

    private function getClassStr($jnl_class)
    {
        $query = "SELECT B.MESSAGE
            FROM ENUMITEM A,MSG_LOOKUP B
            WHERE B.MSG_ID = A.ENUM_TMM
                AND ENUMTYPENAME = 'JNL_CLASS'
                AND ENUM_NO = :enum_no
                AND LANG_ID = 'ENG'";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':enum_no', $jnl_class);
        if (!oci_execute($stmt)) {
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['MESSAGE'];
    }

    //For example: RECORD_ALTERED, userTxt, recordnmTxt, keyTxt
    public function jnlLogEvent($template, $data, $jnl_event, $jnl_class)
    {
        $query = "SELECT MESSAGE FROM MSG_LOOKUP WHERE MSG_ID = :msg_id AND LANG_ID = 'ENG'";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':msg_id', $template);
        if (!oci_execute($stmt)) {
            return null;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $template = $row['MESSAGE'];

        $hit = 0;
        for ($i = 0; $i < strlen($template); $i++) {
            if ($template[$i] === '%') {
                $message = $message . $data[$hit];
                $hit += 1;
            } else {
                $message = $message . $template[$i];
            }
        }

        $query = "INSERT INTO SITE_JOURNAL 
                (GEN_DATE,
                REGION_CODE,
                COMPANY_CODE,
                MSG_EVENT,
                MSG_CLASS,
                MESSAGE,
                SEQ) 
        SELECT SYSDATE,
                'ENG',
                SITE_MNGR,
                :jnl_event,
                :jnl_class,
                :message,
                JOURNAL_SEQ.NEXTVAL
        FROM SITE";
        $stmt = oci_parse($this->conn, $query);

        $jnl_event = $this->getEventStr($jnl_event);
        $jnl_class = $this->getClassStr($jnl_class);
        oci_bind_by_name($stmt, ':jnl_event', $jnl_event);
        oci_bind_by_name($stmt, ':jnl_class', $jnl_class);
        oci_bind_by_name($stmt, ':message', $message);
        
        if ($this->autoCommit)
            $mode = OCI_COMMIT_ON_SUCCESS;
        else
            $mode = OCI_NO_AUTO_COMMIT;
        if (!oci_execute($stmt, $mode)) {
            oci_free_statement($stmt);
            return false;
        }

        return true;
    }
}