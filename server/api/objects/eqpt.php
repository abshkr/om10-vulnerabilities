<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/expiry_type.php';
include_once __DIR__ . '/expiry_date.php';
include_once 'common_class.php';

class Equipment extends CommonClass
{
    protected $TABLE_NAME = "TRANSP_EQUIP";
    protected $primary_keys = array("eqpt_id");

    public $BOOLEAN_FIELDS = array(
        "ADJ_CMPT_LOCK" => 1,
        "EQP_MUST_TARE_IN" => "Y",
        "EQPT_LOCK" => "Y",
    );

    public $NUMBER_FIELDS = array(
        "EQPT_ID",
        "SFL",
        "SAFEFILL",
        "EQPT_EMPTY_KG",
        "EQPT_MAX_GROSS",
        "FRONT_WEIGH_LIMIT",
        "REAR_WEIGH_LIMIT",
    );

    protected $check_mandatory = false;
    public $check_exists = false;

    public function compartmentCount($eqpt_id)
    {
        Utilities::sanitize($this);

        $query = "
              SELECT COUNT(*) CN
              FROM COMPARTMENT, TRANSP_EQUIP
              WHERE COMPARTMENT.CMPT_ETYP = TRANSP_EQUIP.EQPT_ETP
                  AND TRANSP_EQUIP.EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $eqpt_id);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function compartments()
    {
        $query = "SELECT EQPT_CODE,
                    EQPT_ID EQPT_ETP,
                    CMPT_NO,
                    UNIT_ID CMPT_UNITS_CODE,
                    UNIT_TITLE CMPT_UNITS2,
                    UNIT_TITLE CMPT_UNITS,
                    ADJ_SAFEFILL SAFEFILL,
                    ADJ_CAPACITY SFL,
                    NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
                FROM GUI_EQUIPLIST_CMPT_VW 
                WHERE EQPT_ID = :eqpt_id
                    ORDER BY CMPT_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function unlockAllCmpts($eqpt)
    {
        $query = "
            UPDATE SFILL_ADJUST
            SET ADJ_CMPT_LOCK = 0
            WHERE ADJ_EQP = :eqpt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt', $eqpt);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = $eqpt;
        if (!$journal->jnlLogEvent(
            Lookup::EQTP_UNLOCK_ALL_CMPTS, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    public function toggleLocks($eqpt)
    {
        $query = "
            UPDATE SFILL_ADJUST
            SET ADJ_CMPT_LOCK = 1 - NVL(ADJ_CMPT_LOCK, 0)
            WHERE ADJ_EQP = :eqpt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt', $eqpt);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn);
        $jnl_data[0] = $eqpt;
        if (!$journal->jnlLogEvent(
            Lookup::EQTP_CMPT_LOCK_TOGGLED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    public function toggleLock($eqpt, $cmpt)
    {
        $old_value = null;
        $query = "
            SELECT NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
            FROM SFILL_ADJUST
            WHERE ADJ_EQP = :eqpt and ADJ_CMPT = :cmpt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt', $eqpt);
        oci_bind_by_name($stmt, ':cmpt', $cmpt);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } else {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $old_value = (int) $row['ADJ_CMPT_LOCK'];
        }

        $query = "
            UPDATE SFILL_ADJUST
            SET ADJ_CMPT_LOCK = 1 - NVL(ADJ_CMPT_LOCK, 0)
            WHERE ADJ_EQP = :eqpt and ADJ_CMPT = :cmpt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt', $eqpt);
        oci_bind_by_name($stmt, ':cmpt', $cmpt);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn);
        $module = "TRANSP_EQUIP";
        $record = sprintf("Equip ID:%s, Compartment No:%s", $eqpt, $cmpt);

        if (!$journal->valueChange(
            $module, $record, "ADJ_CMPT_LOCK", $old_value, 1 - $old_value)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function count()
    {
        $query = "
            SELECT COUNT(*) CN
            FROM GUI_EQUIPMENT_LIST";
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

    public function read_hook(&$hook_item)
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        $expiry_date = new ExpiryDate($this->conn);
        $expiry_date->ed_target_code = ExpiryTarget::TRANSP_EQUIP;
        $expiry_date->ed_object_id = $hook_item['eqpt_id'];
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
            SELECT EQPT_ID,
                EQPT_CODE,
                EQPT_TITLE,
                EQPT_TANKER,
                EQPT_OWNER,
                EQPT_OWNER_NAME,
                EQPT_ETP,
                EQPT_ETP_TITLE,
                EQPT_EXP_D1_DMY,
                EQPT_EXP_D2_DMY,
                EQPT_EXP_D3_DMY,
                EQPT_LOCK,
                EQPT_EMPTY_KG,
                EQP_MUST_TARE_IN,
                EQPT_MAX_GROSS,
                EQPT_COMMENTS,
                EQPT_AREA,
                EQPT_AREA_NAME,
                EQPT_LOAD_TYPE,
                EQPT_LOAD_TYPE_NAME,
                ETYP_CATEGORY,
                RN,
                EQPT_LAST_MODIFIED,
                EQPT_LAST_USED,
                FRONT_WEIGH_LIMIT,
                REAR_WEIGH_LIMIT,
                ETYP_FRONT_AXLE,
                ETYP_REAR_AXLE,
                TNKR_COUNT
            FROM
            (
                SELECT RES.*, ROWNUM RN
                FROM
                (
                    SELECT 
                        GUI_EQUIPMENT_LIST.*,
                        EQPT_AXLES_VW.FRONT_WEIGH_LIMIT,
                        EQPT_AXLES_VW.REAR_WEIGH_LIMIT,
                        EQPT_AXLES_VW.FRONT_AXLE_GROUP_DESC   AS ETYP_FRONT_AXLE,
                        EQPT_AXLES_VW.REAR_AXLE_GROUP_DESC    AS ETYP_REAR_AXLE,
                        NVL(TNKR_COUNTS.TNKR_COUNT, 0)  TNKR_COUNT
                    FROM 
                        GUI_EQUIPMENT_LIST,
                        EQPT_AXLES_VW,
                        (
                            SELECT TC_EQPT, COUNT(*) TNKR_COUNT
                            FROM TNKR_EQUIP
                            GROUP BY TC_EQPT
                        ) TNKR_COUNTS
                    WHERE 
                        EQPT_AXLES_VW.EQPT_ID = GUI_EQUIPMENT_LIST.EQPT_ID
                        AND GUI_EQUIPMENT_LIST.EQPT_ID = TNKR_COUNTS.TC_EQPT(+)
                    ORDER BY GUI_EQUIPMENT_LIST.EQPT_ID
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

    public function check_eqpt_code()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM GUI_EQUIPMENT_LIST WHERE EQPT_CODE = :eqpt_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_code', $this->eqpt_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function searchCount($eqpt_code, $eqpt_owner = null, $eqpt_etp = null)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN
                    FROM GUI_EQUIPMENT_LIST
                    WHERE EQPT_CODE LIKE :eqpt_code ";

        if (isset($eqpt_owner)) {
            $query = $query . " AND EQPT_OWNER = :eqpt_owner ";
        }

        if (isset($eqpt_etp)) {
            $query = $query . " AND EQPT_ETP = :eqpt_etp ";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_code', $eqpt_code);
        if (isset($eqpt_owner)) {
            oci_bind_by_name($stmt, ':eqpt_owner', $eqpt_owner);
        }
        if (isset($eqpt_etp)) {
            oci_bind_by_name($stmt, ':eqpt_etp', $eqpt_etp);
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

    public function search($eqpt_code, $eqpt_owner = null, $eqpt_etp = null)
    {
        if (!isset($this->end_num)) {
            $this->start_num = 1;
            $this->end_num = $this->searchCount($eqpt_code, $eqpt_owner, $eqpt_etp);
        }

        Utilities::sanitize($this);

        $query = "
            SELECT EQPT_ID,
                EQPT_CODE,
                EQPT_TITLE,
                EQPT_TANKER,
                EQPT_OWNER,
                EQPT_OWNER_NAME,
                EQPT_ETP,
                EQPT_ETP_TITLE,
                DECODE(EQPT_EXP_D1_DMY, NULL, '',
                    TO_CHAR(EQPT_EXP_D1_DMY, 'YYYY-MM-DD')) AS EQPT_EXP_D1_DMY,
                DECODE(EQPT_EXP_D2_DMY, NULL, '',
                    TO_CHAR(EQPT_EXP_D2_DMY, 'YYYY-MM-DD')) AS EQPT_EXP_D2_DMY,
                DECODE(EQPT_EXP_D3_DMY, NULL, '',
                    TO_CHAR(EQPT_EXP_D3_DMY, 'YYYY-MM-DD')) AS EQPT_EXP_D3_DMY,
                EQPT_LOCK,
                EQPT_EMPTY_KG,
                EQP_MUST_TARE_IN,
                EQPT_MAX_GROSS,
                EQPT_COMMENTS,
                EQPT_AREA,
                EQPT_AREA_NAME,
                EQPT_LOAD_TYPE,
                EQPT_LOAD_TYPE_NAME,
                ETYP_CATEGORY,
                RN,
                EQPT_LAST_MODIFIED,
                EQPT_LAST_USED
            FROM
            (
                SELECT RES.*, ROWNUM RN
                FROM
                (
                    SELECT GUI_EQUIPMENT_LIST.*
                    FROM GUI_EQUIPMENT_LIST
                    WHERE EQPT_CODE LIKE :eqpt_code ";

        if (isset($eqpt_owner)) {
            $query = $query . " AND EQPT_OWNER = :eqpt_owner ";
        }

        if (isset($eqpt_etp)) {
            $query = $query . " AND EQPT_ETP = :eqpt_etp ";
        }

        $query = $query . "
                    ORDER BY EQPT_CODE
                ) RES
            )
            WHERE RN >= :start_num
                AND RN <= :end_num";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_code', $eqpt_code);
        if (isset($eqpt_owner)) {
            oci_bind_by_name($stmt, ':eqpt_owner', $eqpt_owner);
        }
        if (isset($eqpt_etp)) {
            oci_bind_by_name($stmt, ':eqpt_etp', $eqpt_etp);
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

    public function loadType()
    {
        $query = "SELECT * FROM EQUIP_LIST_LD_TYPE_LOOKUP ORDER BY LD_TYPE_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function update_axle_weights()
    {
        $query = "
            SELECT NVL(CONFIG_VALUE, 'N') CONFIG_VALUE 
            FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_USE_AXLE_WEIGHT_LIMIT'
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } 
        $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        if ($row['CONFIG_VALUE'] !== 'Y') {
            return false;
        }

        $query = "
            UPDATE TRANSP_EQUIP 
            SET FRONT_WEIGH_LIMIT = :front_weight, REAR_WEIGH_LIMIT = :rear_weight 
            WHERE EQPT_ID = :eqpt_id
        ";
        write_log(
            sprintf("%s::%s TRANSP_EQUIP. key:%s, value:%s|%s", __CLASS__, __FUNCTION__, 
                $this->eqpt_id, $this->front_weigh_limit, $this->rear_weigh_limit),
            __FILE__, __LINE__
        );
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':front_weight', $this->front_weigh_limit);
        oci_bind_by_name($stmt, ':rear_weight', $this->rear_weigh_limit);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            // $error = new EchoSchema(500, response("__INTERNAL_ERROR__", "Internal Error: " . $e['message']));
            // echo json_encode($error, JSON_PRETTY_PRINT);
            return false;
        };

        return true;
    }

    //This function does not auto-commit
    private function updateCmpts($insert = false)
    {
        write_log(sprintf("%s::%s(%s) START", __CLASS__, __FUNCTION__, $insert),
            __FILE__, __LINE__);

        $cmpt_count = count($this->compartments);

        for ($i = 1; $i <= $cmpt_count; $i++) {
            $base_cap = 0;
            $query = "
                SELECT CMPT_CAPACIT FROM COMPARTMENT
                WHERE CMPT_NO = :cmpt_no
                    AND CMPT_ETYP =
                    (SELECT EQPT_ETP
                    FROM TRANSP_EQUIP
                    WHERE EQPT_ID = :eqpt_id)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
            oci_bind_by_name($stmt, ':cmpt_no', $i);
            if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                $base_cap = (int) $row['CMPT_CAPACIT'];
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $adj_amnt = (int) $this->compartments[$i - 1]->safefill - $base_cap;
            $adj_capacity = (int) $this->compartments[$i - 1]->sfl;
            $adj_cmpt_lock = (int) $this->compartments[$i - 1]->adj_cmpt_lock;

            /* Old data*/
            $query = "
                SELECT ADJ_AMNT, ADJ_CAPACITY, ADJ_CMPT_LOCK
                FROM SFILL_ADJUST
                WHERE ADJ_EQP = :eqpt_id
                    AND ADJ_CMPT = :cmpt_no";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
            oci_bind_by_name($stmt, ':cmpt_no', $i);
            if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                $old_limit = (int) $row['ADJ_AMNT'] + $base_cap;
                $old_capacity = (int) $row['ADJ_CAPACITY'];
                $old_lock = $row['ADJ_CMPT_LOCK'];
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $query = "
                UPDATE SFILL_ADJUST
                SET ADJ_AMNT = :adj_amnt,
                    ADJ_CAPACITY = :adj_capacity,
                    ADJ_CMPT_LOCK = :adj_cmpt_lock
                WHERE ADJ_EQP = :eqpt_id AND ADJ_CMPT = :cmpt_no";

            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
            oci_bind_by_name($stmt, ':cmpt_no', $i);
            oci_bind_by_name($stmt, ':adj_amnt', $adj_amnt);
            oci_bind_by_name($stmt, ':adj_capacity', $adj_capacity);
            oci_bind_by_name($stmt, ':adj_cmpt_lock', $adj_cmpt_lock);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            if ($insert) {
                continue;
            }

            $journal = new Journal($this->conn, false);
            // $module = "Equipment";
            // $record = sprintf("equipment id:%s, cmpt num:%d", $this->eqpt_id, $i);
            $module = "SFILL_ADJUST";
            $record = sprintf("adj_eqp:%s, adj_cmpt:%d", $this->eqpt_id, $i);
      
            if ($old_limit != (int) $this->compartments[$i - 1]->safefill &&
                !$journal->valueChange(
                    $module, $record, "ADJ_SAFEFILL",
                    $old_limit, $this->compartments[$i - 1]->safefill)) {
                oci_rollback($this->conn);
                return false;
            }
            if ($adj_capacity != $old_capacity &&
                !$journal->valueChange(
                    $module, $record, "ADJ_CAPACITY",
                    $old_capacity, $adj_capacity)) {
                oci_rollback($this->conn);
                return false;
            }
            // write_log($adj_cmpt_lock, __FILE__, __LINE__);
            // write_log($old_lock, __FILE__, __LINE__);

            if ($adj_cmpt_lock != $old_lock &&
                !$journal->valueChange(
                    $module, $record, "ADJ_CMPT_LOCK",
                    $old_lock, $adj_cmpt_lock)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        return true;
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

        $query = "
            SELECT *
            FROM TRANSP_EQUIP
            WHERE EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row0 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "
            UPDATE TRANSP_EQUIP
            SET EQPT_TITLE = :eqpt_title,
                EQPT_LOCK = :eqpt_lock,
                EQPT_EMPTY_KG = :eqpt_empty_kg,
                EQP_MUST_TARE_IN = :eqp_must_tare_in,
                EQPT_MAX_GROSS = :eqpt_max_gross,
                EQPT_COMMENTS = :eqpt_comments,
                EQPT_AREA = :eqpt_area,
                EQPT_LOAD_TYPE = :eqpt_load_type,
                EQPT_LAST_MODIFIED = sysdate
            WHERE EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_title', $this->eqpt_title);
        oci_bind_by_name($stmt, ':eqpt_lock', $this->eqpt_lock);
        oci_bind_by_name($stmt, ':eqpt_empty_kg', $this->eqpt_empty_kg);
        oci_bind_by_name($stmt, ':eqp_must_tare_in', $this->eqp_must_tare_in);
        oci_bind_by_name($stmt, ':eqpt_max_gross', $this->eqpt_max_gross);
        oci_bind_by_name($stmt, ':eqpt_comments', $this->eqpt_comments);
        oci_bind_by_name($stmt, ':eqpt_area', $this->eqpt_area);
        oci_bind_by_name($stmt, ':eqpt_load_type', $this->eqpt_load_type);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            throw new DatabaseException($e['message']);
            return false;
        }

        $this->update_axle_weights();

        $query = "
            SELECT NVL(MAX(CONFIG_VALUE), '2') CONFIG_VALUE 
            FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_EXPIRY_DATE_MANAGE_MODE'";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        } 
    
        $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        if ($row['CONFIG_VALUE'] === '1') {
            $query = "
                UPDATE TRANSP_EQUIP
                SET EQPT_EXP_D1_DMY = :eqpt_exp_d1_dmy,
                    EQPT_EXP_D2_DMY = :eqpt_exp_d2_dmy,
                    EQPT_EXP_D3_DMY = :eqpt_exp_d3_dmy
                WHERE EQPT_ID = :eqpt_id";
            $stmt = oci_parse($this->conn, $query);
           oci_bind_by_name($stmt, ':eqpt_exp_d1_dmy', $this->eqpt_exp_d1_dmy);
            oci_bind_by_name($stmt, ':eqpt_exp_d2_dmy', $this->eqpt_exp_d2_dmy);
            oci_bind_by_name($stmt, ':eqpt_exp_d3_dmy', $this->eqpt_exp_d3_dmy);
            oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                throw new DatabaseException($e['message']);
                return false;
            }
        }

        //Update expiry dates
        if (isset($this->expiry_dates) && ($expiry_mode == '2' || $expiry_mode == '3')) {
            $expiry_dates = array();
            $expiry_date = new ExpiryDate($this->conn);
            $expiry_date->ed_object_id = $this->eqpt_id;
            $expiry_date->edt_target_code = ExpiryTarget::TRANSP_EQUIP;
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

        //Compartments
        if (!$this->updateCmpts()) {
            write_log("Failed to update equipment equipments",
                __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        //Bulk etp
        if (isset($this->bulk_edit)) {
            foreach ($this->bulk_edit as $bluk_eqpt) {
                // write_log(json_encode($value), __FILE__, __LINE__);
                if ($bluk_eqpt->eqpt_id === $this->eqpt_id) {
                    continue;
                }

                //Legacy expiry or both
                if ($expiry_mode == '1' || $expiry_mode == '3') {
                    $query = "UPDATE TRANSP_EQUIP
                        SET EQPT_EXP_D1_DMY = :eqpt_exp_d1_dmy,
                            EQPT_EXP_D2_DMY = :eqpt_exp_d2_dmy,
                            EQPT_EXP_D3_DMY = :eqpt_exp_d3_dmy
                            WHERE EQPT_ID = :eqpt_id";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':eqpt_id', $bluk_eqpt->eqpt_id);
                    oci_bind_by_name($stmt, ':eqpt_exp_d1_dmy', $this->eqpt_exp_d1_dmy);
                    oci_bind_by_name($stmt, ':eqpt_exp_d2_dmy', $this->eqpt_exp_d2_dmy);
                    oci_bind_by_name($stmt, ':eqpt_exp_d3_dmy', $this->eqpt_exp_d3_dmy);
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
                        $expiry_date->ed_target_code = ExpiryTarget::TRANSP_EQUIP;
                        $expiry_date->ed_object_id = $this->eqpt_id;
                        $stmt = $expiry_date->read();
                        $result = array();
                        Utilities::retrieve($result, $expiry_date, $stmt);
                        $this->expiry_dates = $result;
                    }

                    $expiry_dates = array();
                    $expiry_date->ed_object_id = $bluk_eqpt->eqpt_id;
                    $expiry_date->edt_target_code = ExpiryTarget::TRANSP_EQUIP;
                    // write_log(json_encode($this->expiry_dates), __FILE__, __LINE__);
                    foreach ($this->expiry_dates as $key => $value) {
                        if (is_array($value)) {
                            $value = (object)$value;
                        }
                        
                        $value->edt_object_id = $bluk_eqpt->eqpt_id;
                        $value->ed_object_id = $bluk_eqpt->eqpt_id;
                        $expiry_date->ed_object_id = $bluk_eqpt->eqpt_id;
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

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME;
        $jnl_data[2] = $this->eqpt_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        //New data
        $query = "
            SELECT *
            FROM TRANSP_EQUIP
            WHERE EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        // write_log(json_encode($row2), __FILE__, __LINE__);
        $module = $this->TABLE_NAME;
        $record = sprintf("eqpt_code:%s", $this->eqpt_code);
        if (!$journal->updateChanges($row0, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    /*
    Insert into SFILL_ADJUST
    return true or false.
    Do not do auto-commit */
    private function initCmpts()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            INSERT INTO SFILL_ADJUST (
                ADJ_EQP,
                ADJ_CMPT,
                ADJ_AMNT,
                ADJ_CAPACITY)
            SELECT
                EQPT_ID,
                CMPT_NO,
                ADJ_AMNT,
                ADJ_CAPACITY
            FROM GUI_EQUIPLIST_CMPT_VW
            WHERE EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function create()
    {
        $this->eqpt_id = 1;
        $query = "
            SELECT NVL(MAX(EQPT_ID), 0) + 1 NEWID
            FROM TRANSP_EQUIP";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->eqpt_id = (int) $row['NEWID'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            INSERT INTO TRANSP_EQUIP (
                EQPT_ID,
                EQPT_CODE,
                EQPT_TITLE,
                EQPT_OWNER,
                EQPT_ETP,
                EQPT_LOCK,
                EQPT_EMPTY_KG,
                EQP_MUST_TARE_IN,
                EQPT_MAX_GROSS,
                EQPT_AREA,
                EQPT_LOAD_TYPE,
                EQPT_COMMENTS,
                EQPT_LAST_MODIFIED,
                EQPT_LAST_USED)
            VALUES (
                :eqpt_id,
                :eqpt_code,
                :eqpt_title,
                :eqpt_owner,
                :eqpt_etp,
                :eqpt_lock,
                :eqpt_empty_kg,
                :eqp_must_tare_in,
                :eqpt_max_gross,
                :eqpt_area,
                :eqpt_load_type,
                :eqpt_comments,
                SYSDATE,
                SYSDATE
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_title', $this->eqpt_title);
        oci_bind_by_name($stmt, ':eqpt_code', $this->eqpt_code);
        oci_bind_by_name($stmt, ':eqpt_etp', $this->eqpt_etp);
        oci_bind_by_name($stmt, ':eqpt_owner', $this->eqpt_owner);
        oci_bind_by_name($stmt, ':eqpt_lock', $this->eqpt_lock);
        oci_bind_by_name($stmt, ':eqpt_empty_kg', $this->eqpt_empty_kg);
        oci_bind_by_name($stmt, ':eqp_must_tare_in', $this->eqp_must_tare_in);
        oci_bind_by_name($stmt, ':eqpt_max_gross', $this->eqpt_max_gross);
        oci_bind_by_name($stmt, ':eqpt_comments', $this->eqpt_comments);
        oci_bind_by_name($stmt, ':eqpt_area', $this->eqpt_area);
        oci_bind_by_name($stmt, ':eqpt_load_type', $this->eqpt_load_type);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        // write_log(sprintf("%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s",
        //     $this->eqpt_title, $this->eqpt_code, $this->eqpt_owner,
        //     $this->eqpt_lock, $this->eqpt_empty_kg, $this->eqp_must_tare_in,
        //     $this->eqpt_max_gross, $this->eqpt_comments, $this->eqpt_area,
        //     $this->eqpt_load_type, $this->eqpt_id),
        //     __FILE__, __LINE__);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $this->update_axle_weights();

        if (isset($this->expiry_dates)) {
            $expiry_dates = array();
            $expiry_date = new ExpiryDate($this->conn);
            $expiry_date->edt_target_code = ExpiryTarget::TRANSP_EQUIP;
            $expiry_date->ed_object_id = $this->eqpt_id;
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
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME;
        $jnl_data[2] = $this->eqpt_id;
        //    "code:%s, type:%s, owner:%s, empty weight:%d, lock status:%s, must_tare_in status:%s",
        $jnl_data[3] = sprintf(
            "eqpt_code:%s, eqpt_etp:%s, eqpt_owner:%s, eqpt_empty_kg:%d, eqpt_lock:%s, eqp_must_tare_in:%s",
            $this->eqpt_code, $this->eqpt_etp, $this->eqpt_owner, $this->eqpt_empty_kg,
            $this->eqpt_lock, $this->eqp_must_tare_in);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (!$this->initCmpts()) {
            write_log("Failed to initialize equipment compartment",
                __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (isset($this->compartments)) {
            if (!$this->updateCmpts($insert = true)) {
                write_log("Failed to update equipment compartment",
                    __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        if (isset($this->expiry_dates)) {
            $expiry_dates = array();
            $expiry_date = new ExpiryDate($this->conn);
            $expiry_date->ed_object_id = $this->eqpt_id;
            $expiry_date->edt_target_code = ExpiryTarget::TRANSP_EQUIP;
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

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        $query = "
            SELECT NVL(MAX(TC_TANKER), 'NULL') TC_TANKER
            FROM TNKR_EQUIP
            WHERE TC_EQPT = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            write_log($row['TC_TANKER'], __FILE__, __LINE__);
            if ($row['TC_TANKER'] != 'NULL') {
                $e = sprintf("Equipment is used in tanker %s, cannot delete", $row['TC_TANKER']);
                write_log($e, __FILE__, __LINE__, LogLevel::ERROR);
                throw new DatabaseException($e);
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        //For journal
        $query = "
            SELECT *
            FROM TRANSP_EQUIP
            WHERE EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->eqpt_code = $row['EQPT_CODE'];
            $this->eqpt_etp = $row['EQPT_ETP'];
            $this->eqpt_owner = $row['EQPT_OWNER'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "
            DELETE FROM SFILL_ADJUST
            WHERE ADJ_EQP = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            throw new DatabaseException($e['message']);
            return false;
        }

        $query = "
            DELETE FROM TRANSP_EQUIP
            WHERE EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            throw new DatabaseException($e['message']);
            return false;
        }

        $query = "
            DELETE FROM EXPIRY_DATE_DETAILS
            WHERE ED_OBJECT_ID = :eqpt_id
                AND ED_TARGET_CODE = :ed_target_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        $ed_target_code = ExpiryTarget::TRANSP_EQUIP;
        oci_bind_by_name($stmt, ':ed_target_code', $ed_target_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            throw new DatabaseException($e['message']);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME;
        $jnl_data[2] = $this->eqpt_id;
        $jnl_data[3] = sprintf("eqpt_code:%s, eqpt_etp:%s, eqpt_owner:%s",
            $this->eqpt_code, $this->eqpt_etp, $this->eqpt_owner);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}
