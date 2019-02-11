<?php

include_once 'lookup.php';
include_once 'log.php';

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
    const JNLC_DEBUG = 0;
    const JNLC_EVENT = 1;
    const JNLC_ERROR = 2;
    const JNLC_ALRM_CRITICAL = 3;
    const JNLC_ALRM_MAJOR = 4;
    const JNLC_ALRM_MINOR = 5;
    const JNLC_ALRM_WARNING = 6; 
    const JNLC_ALRM_INCIDENT = 7;
    const JNLC_ALRM_OBS_CRITICAL = 8;
    const JNLC_ALRM_OBS_MAJOR = 9;
    const JNLC_ALRM_OBS_MINOR = 10;
    const JNLC_ALRM_OBS_WARNING = 11;
    const JNLC_ALRM_OBS_INCIDENT = 12;
}

class Journal 
{
    private $conn;
    private $autoCommit;

    //Mainly table name
    private $modules = array(
        "GUI_TANKS" => "tank"
    );

    //Mainly fields in table
    private $keys = array(
        "GUI_TANKS" => array(
            "TANK_GAUGINGMTHD_DESC" => "gauging method",
            "TANK_ULLAGE" => "ullage",
            "TANK_API" => "API",
            "TANK_15_DENSITY" => "density",
            "TANK_SULPHUR" => "sulphur(wt%)",
            "TANK_FLASHPOINT" => "flash point",
            "TANK_STATUS_NAME" => "tank status",
            "TANK_HH_LEVEL" => "HH",
            "TANK_H_LEVEL" => "H",
            "TANK_L_LEVEL" => "L",
            "TANK_LL_LEVEL" => "LL",
            "TANK_UH_LEVEL" => "user H",
            "TANK_UL_LEVEL" => "user L",
            "TANK_AMB_VOL" => "AMB volume",
            "TANK_PROD_C_OF_E" => "Exp.Coeff",
            "TANK_PROD_LVL" => "product level",
            "TANK_COR_VOL" => "std volume",
            "TANK_LEAKDTCT_ON" => "leak detection",
            "TANK_BASE" => "product code",
            "TANK_TEMP" => "observed temperature",
            "TANK_LIQUID_KG" => "liquid mass",
            "TANK_DENSITY" => "density"
        )
    );

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
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
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
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
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
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return null;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $template = $row['MESSAGE'];

        $hit = 0;
        $message = "";
        for ($i = 0; $i < strlen($template); $i++) {
            if ($template[$i] === '%') {
                $message = $message . $data[$hit];
                $hit += 1;
            } else {
                $message = $message . $template[$i];
            }
        }
        write_log("Write journal: " . $message, __FILE__, __LINE__, LogLevel::INFO);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            write_log("Failed to write journal", __FILE__, __LINE__);
            oci_free_statement($stmt);
            return false;
        }

        return true;
    }

    public function tryMe()
    {
        return;
    }



    /* Use RECORD_CHANGED to write a journal indicating value changes
    % changed % of record % with % % to %
    Sample: [DKI_SUPER_USER] changed [Terminal] of record [1] with [URBAC_PWD_LEN_MAX] [19] to [20] 
    Parameters
        module: CGI module, indicates in which the change happens, or TABLE name
        record: mainly table primary key and a string identifying the table record
        term: which item (field) of this record has been changed, or KEY name
        orig_value:
        new_value:
    For example:
        [DKI_SUPER_USER] changed [Tank status] of record [code:T1] with [gauging method]  [MANUAL] to [AUTOMATIC]
        $module == Tank status
        $record == code:T1
        $term == "gauging method"
    */
    public function valueChange($module, $record, $term, $orig_value, $new_value)
    {
        if ($orig_value === $new_value) {
            return;
        }

        $jnl_data[0] = Utilities::getCurrPsn(); 
        if (isset($this->modules[$module]))
            $jnl_data[1] = $this->modules[$module];
        else
            $jnl_data[1] = $module;

        $jnl_data[2] = $record;

        if (isset($this->keys[$module][$term]))
        {
            $jnl_data[3] = $this->keys[$module][$term];
        }
        else
        {
            $jnl_data[3] = $term;
            write_log(sprintf("[%s:%s] not defined in journal::keys, use term instead", $module, $term),
                __FILE__, __LINE__);
        }

        $jnl_data[4] = $orig_value;
        $jnl_data[5] = $new_value;

        if (!$this->jnlLogEvent(
            Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}