<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once 'expiry_date.php';
include_once 'expiry_type.php';
include_once 'common_class.php';
include_once 'eqpt_type.php';
include_once 'eqpt.php';

class Tanker extends CommonClass
{
    protected $TABLE_NAME = "TANKERS";
    protected $VIEW_NAME = "GUI_TANKERS";
    protected $primary_keys = array("tnkr_code");

    public $BOOLEAN_FIELDS = array(
        "TNKR_LOCK" => "Y",
        "TNKR_ACTIVE" => "Y",
        "TNKR_BAY_LOOP_CH" => "Y",
        "TNKR_ARCHIVE" => "Y",
        "EQPT_LOCK" => "Y",
        "EQP_MUST_TARE_IN" => "Y",
    );

    public $NUMBER_FIELDS = array(
        "TNKR_MAX_KG",
        "EQPT_MAX_GROSS",
        "CMPT_COUNT"
    );

    // protected $table_view_map = array(
    //     "STATS" => "TNKR_STATS",
    // );

    public $start_num = 1;
    public $end_num = null;
    public $err_msg;

    public function count()
    {
        $query = "
            SELECT COUNT(*) CN
            FROM GUI_TANKERS";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function composition_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $eqpt_types = new EquipmentType($this->conn);
        $stmt = $eqpt_types->equipments($hook_item['eqpt_etp']);
        $result = array();
        Utilities::retrieve($result, $eqpt_types, $stmt, $method = 'equipments');
        // write_log(json_encode($result), __FILE__, __LINE__);
        $hook_item['eqpt_list'] = $result;

        $eqpt = new Equipment($this->conn);
        $eqpt->eqpt_id = $hook_item['tc_eqpt'];
        $stmt = $eqpt->compartments();
        $result = array();
        Utilities::retrieve($result, $eqpt, $stmt, $method = 'compartments');
        // write_log(json_encode($result), __FILE__, __LINE__);
        $hook_item['compartments'] = $result;
    }

    public function read_hook(&$hook_item)
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        $expiry_date = new ExpiryDate($this->conn);
        $expiry_date->ed_target_code = ExpiryTarget::TANKER;
        $expiry_date->ed_object_id = $hook_item['tnkr_code'];
        $stmt = $expiry_date->read();
        $result = array();
        Utilities::retrieve($result, $expiry_date, $stmt);
        // write_log(json_encode($result), __FILE__, __LINE__);
        $hook_item['expiry_dates'] = $result;
    }

    public function read()
    {
        if (!isset($this->end_num)) {
            $this->start_num = 1;
            $this->end_num = $this->count();
        }

        $query = "
            SELECT *
            FROM
            (
                SELECT RES.*, ROWNUM RN
                FROM
                (
                    SELECT GUI_TANKERS.*
                    FROM GUI_TANKERS
                    ORDER BY TNKR_CODE
                ) RES
            )
            WHERE RN >= :start_num
                AND RN <= :end_num";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_num', $this->start_num);
        oci_bind_by_name($stmt, ':end_num', $this->end_num);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Actually it is carriers
    public function owners()
    {
        $serv = new CompanyService($this->conn);
        return $serv->carriers();
        // $query = "
        //     SELECT CMPY_CODE, CMPY_NAME
        //     FROM GUI_COMPANYS
        //     WHERE BITAND(CMPY_TYPE, POWER(2, 2)) != 0
        //     ORDER BY CMPY_NAME ASC";

        // $stmt = oci_parse($this->conn, $query);
        // if (oci_execute($stmt, $this->commit_mode)) {
        //     return $stmt;
        // } else {
        //     $e = oci_error($stmt);
        //     write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     return null;
        // }
    }

    public function searchCount()
    {
        // write_log(json_encode($this), __FILE__, __LINE__, LogLevel::ERROR);
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN
                    FROM GUI_TANKERS
                    WHERE TNKR_CODE LIKE :tnkr_code ";

        if (isset($this->tnkr_owner)) {
            $query = $query . " AND TNKR_OWNER = :tnkr_owner ";
        }

        if (isset($this->tnkr_etp)) {
            $query = $query . " AND TNKR_ETP = :tnkr_etp ";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (isset($this->tnkr_owner)) {
            oci_bind_by_name($stmt, ':tnkr_owner', $this->tnkr_owner);
        }
        if (isset($this->tnkr_etp)) {
            oci_bind_by_name($stmt, ':tnkr_etp', $this->tnkr_etp);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function search()
    {
        $this->tnkr_code = isset($this->tnkr_code) ? '%' . $this->tnkr_code . '%' : '%';

        if (!isset($this->end_num)) {
            $this->start_num = 1;
            $this->end_num = $this->searchCount();
        }

        Utilities::sanitize($this);

        $query = "
            SELECT TNKR_CODE,
                TNKR_NAME,
                TNKR_CARRIER,
                TNKR_CARRIER_NAME,
                TNKR_OWNER,
                TNKR_OWNER_NAME,
                TNKR_ETP,
                TNKR_EQPT_NAME,
                TNKR_BASE_SITE,
                TNKR_BASE_SITE_NAME,
                TNKR_DEST_DEPOT,
                TNKR_DEST_DEPOT_NAME,
                TNKR_LAST_DEPOT,
                TNKR_LAST_DEPOT_NAME,
                TNKR_CUR_DEPOT,
                TNKR_CUR_DEPOT_NAME,
                TNKR_PIN,
                TNKR_LOCK,
                TNKR_ACTIVE,
                TNKR_BAY_LOOP_CH,
                TNKR_ARCHIVE,
                TNKR_NTRIPS,
                TNKR_OWN_TXT,
                DECODE(TNKR_LIC_EXP, NULL, '',
                    TO_CHAR(TNKR_LIC_EXP, 'YYYY-MM-DD')) AS TNKR_LIC_EXP,
                DECODE(TNKR_DGLIC_EXP, NULL, '',
                    TO_CHAR(TNKR_DGLIC_EXP, 'YYYY-MM-DD')) AS TNKR_DGLIC_EXP,
                DECODE(TNKR_INS_EXP, NULL, '',
                    TO_CHAR(TNKR_INS_EXP, 'YYYY-MM-DD')) AS TNKR_INS_EXP,
                TNKR_STATS,
                TNKR_LAST_TRIP,
                TNKR_MAX_KG,
                REMARKS,
                ETYP_CATEGORY,
                TNKR_LAST_MODIFIED,
                TNKR_LAST_USED
            FROM
            (
                SELECT RES.*, ROWNUM RN
                FROM
                (
                    SELECT GUI_TANKERS.*
                    FROM GUI_TANKERS
                    WHERE TNKR_CODE LIKE :tnkr_code ";

        if (isset($this->tnkr_owner)) {
            $query = $query . " AND TNKR_OWNER = :tnkr_owner ";
        }

        if (isset($this->tnkr_etp)) {
            $query = $query . " AND TNKR_ETP = :tnkr_etp ";
        }

        $query = $query . "
                    ORDER BY TNKR_CODE
                ) RES
            )
            WHERE RN >= :start_num
                AND RN <= :end_num";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (isset($this->tnkr_owner)) {
            oci_bind_by_name($stmt, ':tnkr_owner', $this->tnkr_owner);
        }
        if (isset($this->tnkr_etp)) {
            oci_bind_by_name($stmt, ':tnkr_etp', $this->tnkr_etp);
        }
        oci_bind_by_name($stmt, ':start_num', $this->start_num);
        oci_bind_by_name($stmt, ':end_num', $this->end_num);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function eqptCount($tnkr_code)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN
            FROM TNKR_EQUIP
            WHERE TC_TANKER = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function composition()
    {
        $query = "
        SELECT TC_EQPT,
            TC_SEQNO,
            EQPT_CODE,
            EQPT_TITLE,
            EQPT_OWNER,
            EQPT_ETP,
            ETYP_TITLE,
            IMAGE,
            EQPT_EXP_D1_DMY,
            EQPT_EXP_D2_DMY,
            EQPT_EXP_D3_DMY,
            EQPT_LOCK,
            EQPT_EMPTY_KG,
            EQP_MUST_TARE_IN,
            EQPT_MAX_GROSS,
            EQPT_AREA,
            EQPT_LOAD_TYPE,
            EQPT_COMMENTS,
            NVL(CMPT_COUNT, 0) CMPT_COUNT
        FROM TNKR_EQUIP, TRANSP_EQUIP,
            (SELECT EQUIP_TYPES_VW.ETYP_TITLE, ETYP_ID, 
                NVL(ETYP_CATEGORY,
                    DECODE(ECNCT_ETYP,
                        NULL,
                        DECODE(UPPER(EQUIP_TYPES_VW.ETYP_ISRIGID), 'Y', 'R', DECODE(UPPER(EQUIP_TYPES_VW.ETYP_SCHEDUL), 'Y', 'T', 'P')),
                        DECODE(UPPER(FIRST_SUB_ITEM.ETYP_SCHEDUL), 'N', 'P', 'T'))
                    ) IMAGE
            FROM EQUIP_TYPES_VW,
                (SELECT NVL(ETYP_SCHEDUL, 'N') ETYP_SCHEDUL, NVL(ETYP_ISRIGID, 'N') ETYP_ISRIGID, CMPTNU, ECNCT_ETYP
                FROM EQUIP_TYPES_VW, EQP_CONNECT
                WHERE EQP_CONNECT.ECNCT_ETYP = EQUIP_TYPES_VW.ETYP_ID
                    AND EQC_COUNT = 1) FIRST_SUB_ITEM
            WHERE FIRST_SUB_ITEM.ECNCT_ETYP(+) = EQUIP_TYPES_VW.ETYP_ID  
                    ),
            (SELECT COUNT(*) CMPT_COUNT, CMPT_ETYP
            FROM COMPARTMENT GROUP BY CMPT_ETYP)
        WHERE TC_TANKER = :tnkr_code
            AND TC_EQPT = EQPT_ID
            AND EQPT_ETP = ETYP_ID
            AND EQPT_ETP = CMPT_ETYP(+)
        ORDER BY TC_SEQNO";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function compartmentCount($tnkr_code)
    {
        $query = "
              SELECT COUNT(*) CN
              FROM COMPARTMENT, TNKR_EQUIP, TRANSP_EQUIP
              WHERE COMPARTMENT.CMPT_ETYP = TRANSP_EQUIP.EQPT_ETP
                  AND TC_EQPT = TRANSP_EQUIP.EQPT_ID
                  AND TC_TANKER = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function unlockCompartments($tnkr_code)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__), __FILE__, __LINE__);

        $query = "
            UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK = 0
            WHERE ADJ_EQP IN
            (SELECT TC_EQPT FROM TNKR_EQUIP WHERE TC_TANKER = :tnkr_code)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, true);
        $jnl_data[0] = sprintf("%s unlocked all compartments in tanker [%s]",
            Utilities::getCurrPsn(), $tnkr_code);
        if (!$journal->jnlLogEvent(
            Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        return true;
    }

    public function compartments($tnkr_code)
    {
        $query = "
            SELECT TNKR_CMPT_NO,
                DECODE(ADJ_AMNT, NULL, CMPT_CAPACIT, CMPT_CAPACIT + ADJ_AMNT) SAFEFILL,
                DECODE(ADJ_CAPACITY, NULL, CMPT_CAPACIT, ADJ_CAPACITY) SFL,
                DECODE(CMPT_UNITS, 11, 'l (cor)', 17, 'kg', 'l (amb)') CMPT_UNITS
            FROM
                (
                SELECT TC_TANKER, TC_SEQNO, EQPT_ID, EQPT_CODE, EQPT_ETP, CMPT_NO,
                    CMPT_UNITS,
                    ROW_NUMBER() OVER
                    (PARTITION BY TC_TANKER ORDER BY TC_TANKER, TC_SEQNO, CMPT_NO) AS TNKR_CMPT_NO,
                    CMPT_CAPACIT
                FROM TNKR_EQUIP, TRANSP_EQUIP, COMPARTMENT
                WHERE TC_EQPT = EQPT_ID AND COMPARTMENT.CMPT_ETYP = TRANSP_EQUIP.EQPT_ETP
                    AND TC_TANKER = :tnkr_code
                ) TNKR_CMPT_INFO, SFILL_ADJUST
            WHERE TNKR_CMPT_INFO.EQPT_ID = SFILL_ADJUST.ADJ_EQP(+)
            AND TNKR_CMPT_INFO.CMPT_NO = SFILL_ADJUST.ADJ_CMPT(+)
            ORDER BY TNKR_CMPT_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function create($eqpts = null)
    {
        $term_code = null;
        $query = "
            SELECT TERM_CODE
            FROM TERMINAL";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $term_code = $row['TERM_CODE'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $query = "
            INSERT INTO TANKERS (
                TNKR_CODE,
                TNKR_NAME,
                TNKR_OWNER,
                TNKR_CARRIER,
                TNKR_BASE_SITE,
                TNKR_ETP,
                TNKR_NTRIPS,
                TNKR_LOCK,
                TNKR_ACTIVE,
                TNKR_BAY_LOOP_CH,
                TNKR_ARCHIVE,
                TNKR_OWN_TXT,
                TNKR_LAST_DEPOT,
                TNKR_DEST_DEPOT,
                TNKR_CUR_DEPOT,
                TNKR_PIN,
                LAST_TRIP,
                STATS,
                TNKR_MAX_KG,
                REMARKS
            )
            VALUES
            (
                :tnkr_code,
                :tnkr_name,
                :tnkr_owner,
                :tnkr_carrier,
                :term_code,
                :tnkr_etp,
                :tnkr_ntrips,
                :tnkr_lock,
                :tnkr_active,
                :tnkr_bay_loop_ch,
                :tnkr_archive,
                :tnkr_own_txt,
                :term_code,
                :term_code,
                :term_code,
                :tnkr_pin,
                :last_trip,
                :stats,
                :tnkr_max_kg,
                :remarks
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        oci_bind_by_name($stmt, ':tnkr_lock', $this->tnkr_lock);
        oci_bind_by_name($stmt, ':tnkr_active', $this->tnkr_active);
        oci_bind_by_name($stmt, ':tnkr_max_kg', $this->tnkr_max_kg);
        oci_bind_by_name($stmt, ':tnkr_bay_loop_ch', $this->tnkr_bay_loop_ch);
        oci_bind_by_name($stmt, ':tnkr_ntrips', $this->tnkr_ntrips);
        oci_bind_by_name($stmt, ':tnkr_own_txt', $this->tnkr_own_txt);
        // oci_bind_by_name($stmt, ':tnkr_lic_exp', $this->tnkr_lic_exp);
        // oci_bind_by_name($stmt, ':tnkr_dglic_exp', $this->tnkr_dglic_exp);
        // oci_bind_by_name($stmt, ':tnkr_ins_exp', $this->tnkr_ins_exp);
        oci_bind_by_name($stmt, ':stats', $this->tnkr_stats);
        oci_bind_by_name($stmt, ':last_trip', $this->tnkr_last_trip);
        oci_bind_by_name($stmt, ':tnkr_name', $this->tnkr_name);
        oci_bind_by_name($stmt, ':tnkr_pin', $this->tnkr_pin);
        oci_bind_by_name($stmt, ':tnkr_archive', $this->tnkr_archive);
        oci_bind_by_name($stmt, ':remarks', $this->remarks);
        oci_bind_by_name($stmt, ':tnkr_owner', $this->tnkr_owner);
        oci_bind_by_name($stmt, ':tnkr_carrier', $this->tnkr_carrier);
        oci_bind_by_name($stmt, ':tnkr_etp', $this->tnkr_etp);
        oci_bind_by_name($stmt, ':term_code', $term_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (!isset($this->tnkr_equips) || count($this->tnkr_equips) <= 0) {
            write_log("Equipment list (tnkr_equips) is not provided.", __FILE__, __LINE__, LogLevel::ERROR);
            // throw new IncompleteParameterException("Equipment list (tnkr_equips) is not provided.");

            $query = "SELECT COUNT(*) CN FROM EQP_CONNECT WHERE ECNCT_ETYP = :ecnct_etyp";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ecnct_etyp', $this->tnkr_etp);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if (intval($row['CN']) <= 0) {
                $eqpt = new Equipment($this->conn);
                $eqpt->eqpt_code = $this->tnkr_code;
                $eqpt->eqpt_area = 1;
                $eqpt->eqpt_title = $this->tnkr_code;
                $eqpt->eqpt_load_type = 'A';
                $eqpt->eqpt_owner = $this->tnkr_owner;
                $eqpt->eqpt_etp = $this->tnkr_etp;
                $eqpt->eqpt_lock = 'N';
                $eqpt->eqp_must_tare_in = 'N';
                if (!$eqpt->create()) {
                    write_log("Cannot create equipment", __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }

                $this->tnkr_equips = array();
                $eqpt_item = new stdClass();
                $eqpt_item->eqpt_id = $eqpt->eqpt_id;
                $eqpt_item->tc_seqno = 1;
                $eqpt_item->eqpt_code = $eqpt->eqpt_code;
                array_push($this->tnkr_equips, $eqpt_item);
            } else {
                $query = "SELECT EQC_SUB_ITEM, EQC_COUNT FROM EQP_CONNECT WHERE ECNCT_ETYP = :ecnct_etyp ORDER BY EQC_COUNT";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':ecnct_etyp', $this->tnkr_etp);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $this->tnkr_equips = array();
                while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                    $eqpt = new Equipment($this->conn);
                    $eqpt->eqpt_code = $this->tnkr_code . '_' . $row['EQC_SUB_ITEM'] . '_' . $row['EQC_COUNT'];
                    $eqpt->eqpt_area = 1;
                    $eqpt->eqpt_title = $this->tnkr_code . '_' . $row['EQC_SUB_ITEM'] . '_' . $row['EQC_COUNT'];
                    $eqpt->eqpt_load_type = 'A';
                    $eqpt->eqpt_owner = $this->tnkr_owner;
                    $eqpt->eqpt_etp = $row['EQC_SUB_ITEM'];
                    $eqpt->eqpt_lock = 'N';
                    $eqpt->eqp_must_tare_in = 'N';
                    if (!$eqpt->create()) {
                        write_log("Cannot create equipment", __FILE__, __LINE__, LogLevel::ERROR);
                        oci_rollback($this->conn);
                        return false;
                    }

                    $eqpt_item = new stdClass();
                    $eqpt_item->eqpt_id = $eqpt->eqpt_id;
                    $eqpt_item->tc_seqno = 1;
                    $eqpt_item->eqpt_code = $eqpt->eqpt_code;
                    array_push($this->tnkr_equips, $eqpt_item);
                }
            }
        }
        
        $seqno = 1;
        foreach ($this->tnkr_equips as $key => $value) {
            if (!property_exists($value, 'eqpt_id') && property_exists($value, 'etyp_id')) {
                write_log("Equipment ID not provided", __FILE__, __LINE__);
                $eqpt = new Equipment($this->conn);
                $eqpt->eqpt_code = $this->tnkr_code . '_' . $value->etyp_id . '_' . $key;
                $eqpt->eqpt_area = 1;
                $eqpt->eqpt_title = $this->tnkr_code . '_' . $value->etyp_id . '_' . $key;
                $eqpt->eqpt_load_type = 'A';
                $eqpt->eqpt_owner = $this->tnkr_owner;
                $eqpt->eqpt_etp = $value->etyp_id;
                $eqpt->eqpt_lock = 'N';
                $eqpt->eqp_must_tare_in = 'N';
                if (!$eqpt->create()) {
                    write_log("Cannot create equipment", __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }

                $this->tnkr_equips[$key]->eqpt_id = $eqpt->eqpt_id;
            }

            $query = "INSERT INTO TNKR_EQUIP (TC_TANKER, TC_EQPT, TC_SEQNO)
                VALUES (:tnkr_code, :tc_eqpt, :tc_seqno)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
            oci_bind_by_name($stmt, ':tc_eqpt', $value->eqpt_id);
            oci_bind_by_name($stmt, ':tc_seqno', $seqno);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            $seqno += 1;

            if (!isset($value->compartments)) {
                continue;
            }

            //compartment lock. The only thing about cmpt that can change on tanker is lock status
            foreach ($value->compartments as $key2 => $value2) {
                $query = "
                    SELECT NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
                    FROM SFILL_ADJUST
                    WHERE ADJ_EQP = :eqpt and ADJ_CMPT = :cmpt";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':eqpt', $value->eqpt_id);
                oci_bind_by_name($stmt, ':cmpt', $value2->cmpt_no);
                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                } else {
                    $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                    $old_lock = (int) $row['ADJ_CMPT_LOCK'];
                }

                $query = "
                    UPDATE SFILL_ADJUST
                    SET ADJ_CMPT_LOCK = :new_lock
                    WHERE ADJ_EQP = :eqpt and ADJ_CMPT = :cmpt";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':new_lock', $value2->adj_cmpt_lock);
                oci_bind_by_name($stmt, ':eqpt', $value->eqpt_id);
                oci_bind_by_name($stmt, ':cmpt', $value2->cmpt_no);

                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                if ($old_lock != (int)$value2->adj_cmpt_lock) {
                    $journal = new Journal($this->conn);
                    $module = "GUI_TANKERS";
                    $record = sprintf("Equip ID:%s, Compartment No:%d", $value->eqpt_id, $value2->cmpt_no);

                    if (!$journal->valueChange(
                        $module, $record, "ADJ_CMPT_LOCK", $old_lock, (int)$value2->adj_cmpt_lock)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        return false;
                    }
                }
            }
        }

        if (isset($this->expiry_dates)) {
            $expiry_dates = array();
            $expiry_date = new ExpiryDate($this->conn);
            $expiry_date->edt_target_code = ExpiryTarget::TANKER;
            $expiry_date->ed_object_id = $this->tnkr_code;
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

        // for ($i = 0; $i < count($eqpts); $i++) {
        //     $query = "
        //         INSERT INTO TNKR_EQUIP (
        //             TC_TANKER,
        //             TC_EQPT,
        //             TC_SEQNO)
        //         VALUES (
        //             :tnkr_code,
        //             :eqpt_id,
        //             :tc_seqno)";
        //     $stmt = oci_parse($this->conn, $query);
        //     oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        //     oci_bind_by_name($stmt, ':eqpt_id', $eqpts[$i]);
        //     $tc_seqno = $i + 1;
        //     oci_bind_by_name($stmt, ':tc_seqno', $tc_seqno);
        //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
        //         $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //         oci_rollback($this->conn);
        //         return false;
        //     }
        // }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->tnkr_code;
        $jnl_data[2] = $this->tnkr_owner;
        if (!$journal->jnlLogEvent(
            Lookup::TMM_TANKER_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        write_log(sprintf("%s::%s() START. tnkr_code:%s", __CLASS__, __FUNCTION__, $this->tnkr_code),
            __FILE__, __LINE__);

        $tnkr_owner = null;
        $query = "
            SELECT TNKR_ACTIVE, TNKR_OWNER
            FROM TANKERS
            WHERE TNKR_CODE = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $tnkr_owner = $row['TNKR_OWNER'];
            if (strtoupper($row['TNKR_ACTIVE']) == 'Y') {
                write_log("Tanker is active, cannot delete it.",
                    __FILE__, __LINE__, LogLevel::ERROR);
                $this->err_msg = "Tanker is active, cannot delete it.";
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "
            DELETE FROM TNKR_EQUIP
            WHERE TC_TANKER = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE ACCESS_KEYS
            SET KYA_TANKER = NULL
            WHERE KYA_TANKER = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            DELETE FROM TANKERS
            WHERE TNKR_CODE = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $expiry_dates = array();
        $expiry_date = new ExpiryDate($this->conn);
        $expiry_date->edt_target_code = ExpiryTarget::TANKER;
        $expiry_date->ed_object_id = $this->tnkr_code;
        if (!$expiry_date->delete()) {
            write_log("Failed to delete expiry dates", __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->tnkr_code;
        $jnl_data[2] = $tnkr_owner;
        if (!$journal->jnlLogEvent(
            Lookup::TMM_TANKER_DEL, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function update($eqpts = null)
    {
        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        
        $query = "
            SELECT *
            FROM GUI_TANKERS
            WHERE TNKR_CODE = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            $old_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        //Tanker composition
        $query = "
            SELECT LISTAGG(EQPT_CODE, ', ') WITHIN GROUP (ORDER BY TC_SEQNO) TNKR_EQUIPS
            FROM TNKR_EQUIP, TRANSP_EQUIP
            WHERE TC_TANKER = :tnkr_code
                AND TC_EQPT = EQPT_ID
            ORDER BY TC_SEQNO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            $tnkr_equips_rows = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "
            UPDATE TANKERS
            SET TNKR_LOCK = :tnkr_lock,
                TNKR_CARRIER = :tnkr_carrier,
                TNKR_ACTIVE = :tnkr_active,
                TNKR_MAX_KG = :tnkr_max_kg,
                TNKR_BAY_LOOP_CH = :tnkr_bay_loop_ch,
                TNKR_NTRIPS = :tnkr_ntrips,
                TNKR_OWN_TXT = :tnkr_own_txt,
                STATS = :stats,
                LAST_TRIP = :last_trip,
                TNKR_NAME = :tnkr_name,
                TNKR_PIN = :tnkr_pin,
                TNKR_ARCHIVE = :tnkr_archive,
                REMARKS = :remarks,
                TNKR_LAST_MODIFIED = SYSDATE
            WHERE TNKR_CODE = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        oci_bind_by_name($stmt, ':tnkr_lock', $this->tnkr_lock);
        oci_bind_by_name($stmt, ':tnkr_carrier', $this->tnkr_carrier);
        oci_bind_by_name($stmt, ':tnkr_active', $this->tnkr_active);
        oci_bind_by_name($stmt, ':tnkr_max_kg', $this->tnkr_max_kg);
        oci_bind_by_name($stmt, ':tnkr_bay_loop_ch', $this->tnkr_bay_loop_ch);
        oci_bind_by_name($stmt, ':tnkr_ntrips', $this->tnkr_ntrips);
        oci_bind_by_name($stmt, ':tnkr_own_txt', $this->tnkr_own_txt);
        oci_bind_by_name($stmt, ':stats', $this->tnkr_stats);
        oci_bind_by_name($stmt, ':last_trip', $this->tnkr_last_trip);
        oci_bind_by_name($stmt, ':tnkr_name', $this->tnkr_name);
        oci_bind_by_name($stmt, ':tnkr_pin', $this->tnkr_pin);
        oci_bind_by_name($stmt, ':tnkr_archive', $this->tnkr_archive);
        oci_bind_by_name($stmt, ':remarks', $this->remarks);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            SELECT NVL(MAX(CONFIG_VALUE), '2') CONFIG_VALUE 
            FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_EXPIRY_DATE_MANAGE_MODE'";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        } 
    
        $row = oci_fetch_array($stmt, $this->commit_mode);
        if ($row['CONFIG_VALUE'] === '1') {
            $query = "
                UPDATE TANKERS
                SET TNKR_LIC_EXP = :tnkr_lic_exp,
                    TNKR_DGLIC_EXP = :tnkr_dglic_exp, 
                    TNKR_INS_EXP = :tnkr_ins_exp
                WHERE TNKR_CODE = :tnkr_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tnkr_lic_exp', $this->tnkr_lic_exp);
            oci_bind_by_name($stmt, ':tnkr_dglic_exp', $this->tnkr_dglic_exp);
            oci_bind_by_name($stmt, ':tnkr_ins_exp', $this->tnkr_ins_exp);
            oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);

            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                throw new DatabaseException($e['message']);
                return false;
            }
        }
        
        //TNKR_EQUIP
        if (isset($this->tnkr_equips)) {
            $query = "DELETE FROM TNKR_EQUIP WHERE TC_TANKER = :tnkr_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            $seqno = 1;
            foreach ($this->tnkr_equips as $key => $value) {
                $eqpt_id = (isset($value->eqpt_id) ? $value->eqpt_id : $value->tc_eqpt);
                $query = "INSERT INTO TNKR_EQUIP (TC_TANKER, TC_EQPT, TC_SEQNO)
                    VALUES (:tnkr_code, :tc_eqpt, :tc_seqno)";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
                oci_bind_by_name($stmt, ':tc_eqpt', $eqpt_id);
                oci_bind_by_name($stmt, ':tc_seqno', $seqno);
                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }

                //compartment lock. The only thing about cmpt that can change on tanker is lock status
                foreach ($value->compartments as $key2 => $value2) {
                    $query = "
                        SELECT NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
                        FROM SFILL_ADJUST
                        WHERE ADJ_EQP = :eqpt and ADJ_CMPT = :cmpt";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':eqpt', $eqpt_id);
                    oci_bind_by_name($stmt, ':cmpt', $value2->cmpt_no);
                    if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        return false;
                    } else {
                        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                        $old_lock = (int) $row['ADJ_CMPT_LOCK'];
                    }

                    $query = "
                        UPDATE SFILL_ADJUST
                        SET ADJ_CMPT_LOCK = :new_lock
                        WHERE ADJ_EQP = :eqpt and ADJ_CMPT = :cmpt";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':new_lock', $value2->adj_cmpt_lock);
                    oci_bind_by_name($stmt, ':eqpt', $eqpt_id);
                    oci_bind_by_name($stmt, ':cmpt', $value2->cmpt_no);

                    if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        return false;
                    }

                    if ($old_lock != (int)$value2->adj_cmpt_lock) {
                        $journal = new Journal($this->conn);
                        $module = "GUI_TANKERS";
                        $record = sprintf("Equip ID:%s, Compartment No:%d", $eqpt_id, $value2->cmpt_no);

                        if (!$journal->valueChange(
                            $module, $record, "ADJ_CMPT_LOCK", $old_lock, (int)$value2->adj_cmpt_lock)) {
                            $e = oci_error($stmt);
                            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                            return false;
                        }
                    }
                }

                $seqno += 1;
            }
        }
        
        //Deactivate other tankers that have the same equipment
        if ($this->tnkr_active === 'Y') {
            $query = "UPDATE TANKERS SET TNKR_ACTIVE = 'N'
            WHERE TNKR_CODE IN (
                SELECT TC_TANKER FROM TNKR_EQUIP WHERE TC_EQPT IN 
                (SELECT TC_EQPT FROM TNKR_EQUIP WHERE TC_TANKER = :tnkr_code))
            AND TNKR_CODE != :tnkr_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }    
        }

        //Update expiry dates
        if (isset($this->expiry_dates)) {
            $expiry_dates = array();
            $expiry_date = new ExpiryDate($this->conn);
            $expiry_date->ed_object_id = $this->tnkr_code;
            $expiry_date->edt_target_code = ExpiryTarget::TANKER;
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
        }

        //Bulk etp
        if (isset($this->bulk_edit)) {
            foreach ($this->bulk_edit as $a_tanker) {
                // write_log(json_encode($value), __FILE__, __LINE__);
                if ($a_tanker->tnkr_code === $this->tnkr_code) {
                    continue;
                }

                if (!isset($this->expiry_dates)) {
                    $expiry_date = new ExpiryDate($this->conn);
                    $expiry_date->ed_target_code = ExpiryTarget::TANKER;
                    $expiry_date->ed_object_id = $this->tnkr_code;
                    $stmt = $expiry_date->read();
                    $result = array();
                    Utilities::retrieve($result, $expiry_date, $stmt);
                    $this->expiry_dates = $result;
                }

                $expiry_dates = array();
                $expiry_date->ed_object_id = $a_tanker->tnkr_code;
                $expiry_date->edt_target_code = ExpiryTarget::TANKER;
                // write_log(json_encode($this->expiry_dates), __FILE__, __LINE__);
                foreach ($this->expiry_dates as $key => $value) {
                    if (is_array($value)) {
                        $value = (object)$value;
                    }
                    $value->edt_object_id = $a_tanker->tnkr_code;
                    $value->ed_object_id = $a_tanker->tnkr_code;
                    $expiry_dates[$value->edt_type_code] = $value;
                }
                if (!$expiry_date->update($expiry_dates)) {
                    write_log("Failed to update expiry dates",
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->tnkr_code;
        $jnl_data[2] = $this->tnkr_owner;
        if (!$journal->jnlLogEvent(
            Lookup::TMM_TANKER_MOD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            oci_rollback($this->conn);
            return false;
        }

        //New data
        $query = "
            SELECT * FROM GUI_TANKERS
            WHERE TNKR_CODE = :tnkr_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $new_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = "GUI_TANKERS";
        $record = sprintf("tanker:%s, owner:%s", $this->tnkr_code, $this->tnkr_owner);
        if (!$journal->updateChanges($old_row, $new_row, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        //Tanker composition journal
        $query = "
            SELECT LISTAGG(EQPT_CODE, ', ') WITHIN GROUP (ORDER BY TC_SEQNO) TNKR_EQUIPS
            FROM TNKR_EQUIP, TRANSP_EQUIP
            WHERE TC_TANKER = :tnkr_code
                AND TC_EQPT = EQPT_ID
            ORDER BY TC_SEQNO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            $tnkr_equips_rows2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        if ($tnkr_equips_rows['TNKR_EQUIPS'] != $tnkr_equips_rows2['TNKR_EQUIPS'] &&
            !$journal->valueChange(
                $module, $record, "tanker equips",
                $tnkr_equips_rows['TNKR_EQUIPS'], $tnkr_equips_rows2['TNKR_EQUIPS'])) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    //This function does not auto-commit
    private function updateEqpts($tnkr_code, $eqpts)
    {
        write_log(sprintf("%s::%s() START. tnkr_code:%s", __CLASS__, __FUNCTION__, $this->tnkr_code),
            __FILE__, __LINE__);

        $eqpt_count = $this->eqptCount($tnkr_code);
        for ($i = 1; $i <= $eqpt_count; $i++) {
            if (!isset($eqpts[$i - 1])) {
                continue;
            }

            $query = "
                SELECT TC_EQPT
                FROM TNKR_EQUIP
                WHERE TC_TANKER = :tnkr_code AND TC_SEQNO = :tc_seqno";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);
            oci_bind_by_name($stmt, ':tc_seqno', $i);

            if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                if ($row['TC_EQPT'] != $eqpts[$i - 1]) {
                    $query = "
                        UPDATE TNKR_EQUIP
                        SET TC_EQPT = :tc_eqpt
                        WHERE TC_TANKER = :tnkr_code AND TC_SEQNO = :tc_seqno";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);
                    oci_bind_by_name($stmt, ':tc_seqno', $i);
                    oci_bind_by_name($stmt, ':tc_eqpt', $eqpts[$i - 1]);
                    if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        oci_rollback($this->conn);
                        return false;
                    }

                    $journal = new Journal($this->conn, false);
                    $jnl_data[0] = sprintf("%s changed tanker [%s] equipment [%d] from [%s] to [%s]",
                        Utilities::getCurrPsn(), $tnkr_code, $i, $row['TC_EQPT'], $eqpts[$i - 1]);
                    if (!$journal->jnlLogEvent(Lookup::TMM_TEXT_ONLY, $jnl_data,
                        JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        return false;
                    }
                }
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }
}
