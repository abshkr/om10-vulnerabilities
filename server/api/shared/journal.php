<?php

include_once __DIR__ . '/../config/lookup.php';
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
    const JNLT_PAY = 6;
    const JNLT_MOVE = 7;
    const JNLT_VEHI = 8;
    const JNLT_DOC = 9;
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
        "GUI_TANKS" => "tank",
        "GUI_REPORT_COMPANY" => "report configuration",
        "GUI_REPORT_PROFILE" => "report profile",
        "GUI_PERSONNEL" => "personnel",
        "EXPIRY_DATE_PERSONNEL" => "personnel expiry date",
        "TIMECODE" => "time code",
        "PRINTER" => "physical printer",
        "GUI_TANKERS" => "tanker",
        "EXPIRY_DATE_TANKERS" => "tanker expiry date",
        "TRANSP_EQUIP" => "equipment",
        "EXPIRY_DATE_TRANSP_EQUIP" => "equipment expiry",
        "EXPIRY_DATE_TANKERS" => "tanker expiry",
        "EXPIRY_DATE_PERSONNEL" => "personnel expiry",
        "GUI_ACCESS_KEYS" => "id assignment",
        "BASE_PRODS" => "base product",
        "EXPIRY_DATE_TYPES" => "expiry date type",
        "URBAC_ROLE_DOMAINS_PRIVILEGES" => "role access privilege"
    );

    //Mainly fields in table
    private $keys = array(
        "GUI_TANKS" => array(
            "TANK_GAUGINGMTHD_DESC" => "gauging method",
            "TANK_ULLAGE" => "ullage",
            "TANK_API" => "API",
            "TANK_SG" => "specific gravity",
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
            "TANK_DENSITY" => "density",
            "TANK_INSTANCE" => "instance",
            "TANK_DRV_TYPE" => "interface type",
            "TANK_CHANNEL" => "channel",
            "TANK_ADDRESS" => "register offset",
            "TANK_DRV_AUX" => "auxiliary",
            "TANK_POLL_GAP" => "poll interval",
            "TANK_IDENTIFIER" => "identifer for gauge",
        ),
        "GUI_PERSONNEL" => array(
            "PER_NAME" => "name",
            "PER_LOCK" => "lock out",
            "PER_DEPARTMENT" => "department",
            "PER_LICENCE_NO" => "driver license no.",
            "PER_COMMENTS" => "comments",
            "PT_TIMECD" => "time code",
            "USER_STATUS_FLAG" => "status",
            "PER_CMPY" => "employer",
            "CMPY_NAME" => "employer",
            "PER_EMAIL" => "personnel email",
        ),
        "EXPIRY_DATE_DETAILS" => array(

        ),
        "TIMECODE" => array(
            "TCD_MON" => "Monday",
            "TCD_TUE" => "Thuesday",
            "TCD_WED" => "Wednesday",
            "TCD_THU" => "Thursday",
            "TCD_FRI" => "Friday",
            "TCD_SAT" => "Saturday",
            "TCD_SUN" => "Sunday",
        ),
        "PRINTER" => array(
            "SYS_PRNTR" => "system/physical printer",
            "AREA_NAME" => "area location",
            "PRNTR_LOCK" => "lock",
            "PRNTR_AREA" => "printer area",
        ),
        "GUI_TANKERS" => array(
            "ADJ_CMPT_LOCK" => "compartment lock status",
            "TNKR_LOCK" => "lock status",
            "TNKR_ACTIVE" => "active status",
            "TNKR_MAX_KG" => "max kg",
            "TNKR_BAY_LOOP_CH" => "bay check status",
            "TNKR_NTRIPS" => "total trips",
            "STATS" => "status",
            "LAST_TRIP" => "last trip",
            "TNKR_NAME" => "name",
            "TNKR_PIN" => "pin",
            "TNKR_ARCHIVE" => "archive status",
            "REMARKS" => "comments",
            "TNKR_OWN_TXT" => "tanker prompt",
        ),
        "TRANSP_EQUIP" => array(
            "EQPT_TITLE" => "title",
            "EQPT_LOCK" => "lock",
            "EQPT_EMPTY_KG" => "empty weight",
            "EQP_MUST_TARE_IN" => "tare_in status",
            "EQPT_MAX_GROSS" => "pulling limit",
            "EQPT_COMMENTS" => "comments",
            "EQPT_AREA" => "area",
            "EQPT_LOAD_TYPE" => "load type",
        ),
        "GUI_ACCESS_KEYS" => array(
            "KYA_LOCK" => "lock status",
            "KYA_TIMECD" => "time code",
            "KYA_TXT" => "tag",
            "KYA_ADHOC" => "adhoc",
            "KYA_PSN" => "personnel",
            "KYA_ROLE" => "role",
            "KYA_DRAWER" => "drawer",
            "KYA_TANKER" => "tanker",
            "KYA_EQUIPMENT" => "equipment",
            "KYA_SP_SUPPLIER" => "supplier",
            "KYA_PHYS_NAME" => "physical type",
        ),
        "BASE_PRODS" => array(
            "BASE_NAME" => "base name",
            "BASE_PROD_GROUP" => "product group",
            "BASE_CORR_MTHD" => "correction method",
            "BASE_REF_TEMP" => "reference temperature",
            "BASE_DENS_HI" => "density high",
            "BASE_DENS_LO" => "density low",
            "BASE_CAT" => "classification",
            "BASE_REF_TUNT" => "base ref tunt",
            "BASE_LIMIT_PRESET_HT" => "limit_preset_ht",
            "BASE_REF_TEMP_SPEC" => "ref temp spec",
        ),
        "EXPIRY_DATE_TYPES" => array(
            "EDT_TIME_ENABLED" => "enabled",
            "EDT_STATUS" => "status",
            "EDT_REJECT" => "reject authorization",
            "EDT_DEFAULT" => "default flag",
            "EDT_TYPE_DESC" => "type description",
            "EDT_DEF_EXP_DATE" => "default value",
        ),
        "PRMSSN_RC" => array (
            "PRMSSN_NAME" => "permission name",
            "RULE_CASE" => "permission rule class",
            "RULE_ETYP" => "equipment type",
            "RULE_AUTH" => "authority type",
            "RULE_EXPIRY_CHECK" => "expiry check"
        ),
        "URBAC_ROLE_DOMAINS_PRIVILEGES" => array(
            "PRIV_VIEW" => "view privilege",
            "PRIV_CREATE" => "create privilege",
            "PRIV_UPDATE" => "update privilege",
            "PRIV_DELETE" => "delete privilege",
            "PRIV_PROTECT" => "password",
        )
    );

    //Fields that do not count in valueChange.
    private $fields_excluded = array(
        "GUI_ACCESS_KEYS" => array("KYA_ROLE", "KYA_TYPE", "KYA_KEY_CREATED", "KYA_PHYS_TYPE"),
        "TRANSP_EQUIP" => array("EQPT_LAST_MODIFIED"),
        "GUI_TANKERS" => array("TNKR_LAST_MODIFIED"),
        "GUI_PERSONNEL" => array("PER_LAST_MODIFIED"),
    );

    // constructor with $db as database connection
    public function __construct($db, $autocommit = true)
    {
        $this->conn = $db;
        $this->autoCommit = $autocommit;
    }

    private function getEventStr($jnl_event, $lang)
    {
        $query = "SELECT B.MESSAGE
            FROM ENUMITEM A,MSG_LOOKUP B
            WHERE B.MSG_ID = A.ENUM_TMM
                AND ENUMTYPENAME = 'JNL_EVENT'
                AND ENUM_NO = :enum_no
                AND LANG_ID = :lang";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':enum_no', $jnl_event);
        oci_bind_by_name($stmt, ':lang', $lang);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['MESSAGE'];
    }

    private function getClassStr($jnl_class, $lang)
    {
        $query = "SELECT B.MESSAGE
            FROM ENUMITEM A,MSG_LOOKUP B
            WHERE B.MSG_ID = A.ENUM_TMM
                AND ENUMTYPENAME = 'JNL_CLASS'
                AND ENUM_NO = :enum_no
                AND LANG_ID = :lang";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':enum_no', $jnl_class);
        oci_bind_by_name($stmt, ':lang', $lang);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['MESSAGE'];
    }

    //For example: RECORD_ALTERED, userTxt, recordnmTxt, keyTxt
    public function jnlLogEvent($template, $data, $jnl_event, $jnl_class)
    {
        $query = "SELECT MESSAGE, LANG_ID FROM MSG_LOOKUP 
            WHERE MSG_ID = :msg_id AND LANG_ID IN (SELECT LANG_ID from LANG_TYP)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':msg_id', $template);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
        // $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $template_str = $row['MESSAGE'];
            $lang = $row['LANG_ID'];

            $hit = 0;
            $message = "";
            for ($i = 0; $i < strlen($template_str); $i++) {
                if ($template_str[$i] === '%') {
                    if ($hit === 1 && (
                        $template == Lookup::RECORD_ALTERED
                        || $template == Lookup::RECORD_ADD
                        || $template == Lookup::RECORD_DELETE
                    )) {
                        if (isset($this->modules[$data[1]])) {
                            $data[1] = $this->modules[$data[1]];
                        }
                    }
                    $message = $message . $data[$hit];
                    $hit += 1;
                } else {
                    $message = $message . $template_str[$i];
                }
            }
            write_log("Write journal: " . $message, __FILE__, __LINE__, LogLevel::INFO);
            
            $jnl_event_str = $this->getEventStr($jnl_event, $lang);
            $jnl_class_str = $this->getClassStr($jnl_class, $lang);
            
            $query = "INSERT INTO SITE_JOURNAL
                    (GEN_DATE,
                    REGION_CODE,
                    COMPANY_CODE,
                    MSG_EVENT,
                    MSG_CLASS,
                    MESSAGE,
                    SEQ)
            SELECT SYSDATE,
                    :lang,
                    SITE_MNGR,
                    :jnl_event,
                    :jnl_class,
                    :message,
                    JOURNAL_SEQ.NEXTVAL
            FROM SITE";
            $stmt2 = oci_parse($this->conn, $query);

            oci_bind_by_name($stmt2, ':lang', $lang);
            oci_bind_by_name($stmt2, ':jnl_event', $jnl_event_str);
            oci_bind_by_name($stmt2, ':jnl_class', $jnl_class_str);
            oci_bind_by_name($stmt2, ':message', $message);

            if ($this->autoCommit) {
                $mode = OCI_COMMIT_ON_SUCCESS;
            } else {
                $mode = OCI_NO_AUTO_COMMIT;
            }

            if (!oci_execute($stmt2, $mode)) {
                $e = oci_error($stmt2);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                write_log("Failed to write journal", __FILE__, __LINE__);
                oci_free_statement($stmt);
                return false;
            }
        }

        return true;
    }

    public function tryMe()
    {
        return;
    }

    /*
    use RECORD_ADDED % added % record with %: %
    Example [DKI_SUPER_USER] added [personnel area access control] record with [personnel code: cw3]: [area name:test]
     */
    // public function valueAdd($term, $record, $value)
    // {
    //     $jnl_data[0] = Utilities::getCurrPsn();
    //     $jnl_data[1] = $term;
    //     $jnl_data[2] = $record;
    //     $jnl_data[3] = $value;

    //     if (!$this->jnlLogEvent(
    //         Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
    //     {
    //         write_log("DB error:" . (oci_error($stmt))['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return false;
    //     }

    //     return true;
    // }

    //Call valueChange() to journal all the value changes. Normally in an update.
    public function updateChanges($set_old, $set_new, $module, $record)
    {
        write_log(sprintf("%s::%s START. module:%s, record:%s", __CLASS__, __FUNCTION__, $module, $record),
            __FILE__, __LINE__);

        // write_log(json_decode($set_new), __FILE__, __LINE__);
        // write_log(json_decode($set_old), __FILE__, __LINE__);

        foreach ($set_new as $key => $value) {
            if (array_key_exists($module, $this->fields_excluded) &&
                in_array($key, $this->fields_excluded[$module])) {
                continue;
            }

            if ($value != $set_old[strtoupper($key)]) {
                if (!$this->valueChange(
                    $module, $record, $key, $set_old[strtoupper($key)], $value)) {
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        return true;
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
        write_log(sprintf("%s::%s START. module:%s, record:%s, term:%s, orig:%s, new:%s",
            __CLASS__, __FUNCTION__, $module, $record, $term, $orig_value, $new_value),
            __FILE__, __LINE__);

        if ($orig_value === $new_value) {
            return;
        }

        $jnl_data[0] = Utilities::getCurrPsn();
        if (isset($this->modules[$module])) {
            $jnl_data[1] = $this->modules[$module];
        } else {
            $jnl_data[1] = $module;
        }

        $jnl_data[2] = $record;

        if (isset($this->keys[$module][strtoupper($term)])) {
            $jnl_data[3] = $this->keys[$module][strtoupper($term)];
        } else {
            $jnl_data[3] = $term;
            write_log(sprintf("[%s:%s] not defined in journal::keys, use term instead", $module, $term),
                __FILE__, __LINE__, LogLevel::WARNING);
        }

        $jnl_data[4] = $orig_value;
        $jnl_data[5] = $new_value;

        if (!$this->jnlLogEvent(
            Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}
