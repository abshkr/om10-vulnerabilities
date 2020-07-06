<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/expiry_type.php';
include_once 'common_class.php';

class ExpiryDate extends CommonClass
{
    protected $TABLE_NAME = "EXPIRY_DATE_DETAILS";

    public $BOOLEAN_FIELDS = array(
        "ED_STATUS" => 1,
    );

    public function update($expiry_dates = null)
    {
        // write_log(json_encode($this), __FILE__, __LINE__);
        write_log(json_encode($expiry_dates), __FILE__, __LINE__);
        $query = "
            SELECT ED_EXP_DATE, ED_TARGET_CODE, ED_OBJECT_ID, ED_TYPE_CODE, EDT_TYPE_DESC
            FROM EXPIRY_DATE_DETAILS, EXPIRY_DATE_TYPES
            WHERE EDT_TYPE_CODE = ED_TYPE_CODE
            AND ED_TARGET_CODE = :ed_target_code
                AND ED_OBJECT_ID = :ed_object_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->edt_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        $old_data = array();
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                $base_item = array();
                foreach ($row as $key => $value) {
                    $base_item[strtolower($key)] = $value;
                }

                $base_item = array_map(function ($v) {
                    return (is_null($v)) ? "" : $v;
                }, $base_item);

                // array_push($perm_array2, $base_item);
                $old_data[$row['ED_TYPE_CODE']] = $base_item;
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        write_log(json_encode($old_data), __FILE__, __LINE__);
        $journal = new Journal($this->conn, false);
        foreach ($old_data as $key => $value) {
            // write_log($key, __FILE__, __LINE__);
            // write_log(json_encode($value), __FILE__, __LINE__);
            if (!in_array($key, array_keys($expiry_dates))) {
                // write_log("In old, not in new", __FILE__, __LINE__);
                //In old, but not in new
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = "expiry dates";
                $jnl_data[2] = sprintf("target:%s, code:%s", $value['ed_target_code'], $value['ed_object_id']);
                $jnl_data[3] = sprintf("expiry type:%s", $value['edt_type_desc']);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            } else if ($value['ed_exp_date'] != $expiry_dates[$key]->ed_exp_date) {
                //Changed
                $module = "expiry dates";
                $record = sprintf("target:%s, code:%s", $value['ed_target_code'], $value['ed_object_id']);

                if (!$journal->valueChange(
                    $module, $record, $value['edt_type_desc'], $value['ed_exp_date'], $expiry_dates[$key]->ed_exp_date)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
            }
        }

        foreach ($expiry_dates as $key => $value) {
            // write_log($key, __FILE__, __LINE__);
            // write_log(json_encode($value), __FILE__, __LINE__);
            $target = (isset($value->ed_target_code) ? $value->ed_target_code : $value->edt_target_code);
            $object_id = (isset($value->ed_object_id) ? $value->ed_object_id : $value->edt_object_id);
            if (!in_array($key, array_keys($old_data))) {
                // write_log("In old, not in new", __FILE__, __LINE__);
                //In new, but not in old
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = "expiry dates";
                $jnl_data[2] = sprintf("target:%s, code:%s", $target, $object_id);
                $jnl_data[3] = sprintf("expiry type:%s", $value->edt_type_desc);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        if ($this->delete($expiry_dates) != true) {
            write_log("Failed to delete before insert", __FILE__, __LINE__);
            return false;
        }
        return $this->create($expiry_dates);
    }

    // public function update($expiry_dates)
    // {
    //     write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

    //     Utilities::sanitize($this);

    //     $journal = new Journal($this->conn, false);
    //     $curr_psn = Utilities::getCurrPsn();

    //     foreach ($expiry_dates as $key => $value) {
    //         // write_log(json_encode($value), __FILE__, __LINE__);
    //         // write_log($value->edt_target_code, __FILE__, __LINE__);
    //         $old_expiry = null;
    //         $query = "
    //             SELECT ED_EXP_DATE
    //             FROM EXPIRY_DATE_DETAILS
    //             WHERE ED_TARGET_CODE = :ed_target_code
    //                 AND ED_OBJECT_ID = :ed_object_id
    //                 AND ED_TYPE_CODE = :ed_type_code";
    //         $stmt = oci_parse($this->conn, $query);
    //         oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
    //         oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
    //         oci_bind_by_name($stmt, ':ed_type_code', $key);
    //         if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //             $e = oci_error($stmt);
    //             write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //             oci_rollback($this->conn);
    //             return false;
    //         } else {
    //             $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //             $old_expiry = $row['ED_EXP_DATE'];
    //         }

    //         $query = "
    //             UPDATE EXPIRY_DATE_DETAILS
    //             SET ED_EXP_DATE = :ed_exp_date
    //             WHERE ED_TARGET_CODE = :ed_target_code
    //                 AND ED_OBJECT_ID = :ed_object_id
    //                 AND ED_TYPE_CODE = :ed_type_code";
    //         $stmt = oci_parse($this->conn, $query);
    //         oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
    //         oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
    //         oci_bind_by_name($stmt, ':ed_type_code', $key);
    //         oci_bind_by_name($stmt, ':ed_exp_date', $value->ed_exp_date);
    //         // write_log(sprintf("%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s",
    //         //     $this->eqpt_title, $this->eqpt_code, $this->eqpt_owner,
    //         //     $this->eqpt_lock, $this->eqpt_empty_kg, $this->eqp_must_tare_in,
    //         //     $this->eqpt_max_gross, $this->eqpt_comments, $this->eqpt_area,
    //         //     $this->eqpt_load_type, $this->eqpt_id),
    //         //     __FILE__, __LINE__);
    //         if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //             $e = oci_error($stmt);
    //             write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //             oci_rollback($this->conn);
    //             return false;
    //         }

    //         $record = sprintf("code: %s", $value->ed_object_id);
    //         $module = "EXPIRY_DATE_" . $value->edt_target_code;
    //         if ($value->ed_exp_date != $old_expiry &&
    //             !$journal->valueChange(
    //                 $module, $record, $value->edt_type_desc, $old_expiry, $value->ed_exp_date)) {
    //             oci_rollback($this->conn);
    //             return false;
    //         }
    //     }

    //     return true;
    // }

    public function delete()
    {
        $query = "
            DELETE FROM EXPIRY_DATE_DETAILS
            WHERE ED_TARGET_CODE = :ed_target_code
                AND ED_OBJECT_ID = :ed_object_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->edt_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    //Do not commit.
    //First insert into EXPIRY_DATE_DETAILS all, then delete
    //the records where ED_EXP_DATE IS NULL.
    public function create($expiry_dates = null)
    {
        $query = "
            INSERT INTO EXPIRY_DATE_DETAILS (
                ED_TARGET_CODE,
                ED_CMPY_CODE,
                ED_OBJECT_ID,
                ED_TYPE_CODE,
                ED_EXP_DATE,
                ED_STATUS)
            SELECT
                EDT_TARGET_CODE,
                null,
                :ed_object_id,
                EDT_TYPE_CODE,
                null,
                1
            FROM EXPIRY_DATE_TYPES
            WHERE EDT_TARGET_CODE = :ed_target_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->edt_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        foreach ($expiry_dates as $key => $value) {
            /* Flex frontend always use 23:59:59, so here we use it too */
            if (substr($value->ed_exp_date, 11, 8) === "00:00:00") {
                $value->ed_exp_date = substr($value->ed_exp_date, 0, 11) . " 23:59:59";
            }

            // write_log($key, __FILE__, __LINE__);
            // write_log(json_encode($value), __FILE__, __LINE__);
            // write_log(json_encode($this), __FILE__, __LINE__);
            $query = "
                UPDATE EXPIRY_DATE_DETAILS
                SET ED_EXP_DATE = :ed_exp_date,
                    ED_STATUS = :ed_status
                WHERE ED_TARGET_CODE = :ed_target_code
                    AND ED_OBJECT_ID = :ed_object_id
                    AND ED_TYPE_CODE = :ed_type_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
            if ($this->ed_object_id !== "") {
                oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
            } else {
                oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
            }
            if (isset($this->ed_status)) {
                oci_bind_by_name($stmt, ':ed_status', $this->ed_status);
            } else {
                oci_bind_by_name($stmt, ':ed_status', $value->ed_status);
            }

            oci_bind_by_name($stmt, ':ed_type_code', $key);
            oci_bind_by_name($stmt, ':ed_exp_date', $value->ed_exp_date);
            // write_log($value->ed_exp_date, __FILE__, __LINE__);
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
        }

        $query = "
            DELETE FROM EXPIRY_DATE_DETAILS
            WHERE ED_TARGET_CODE = :ed_target_code
                AND ED_OBJECT_ID = :ed_object_id
                AND ED_EXP_DATE IS NULL";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
        if ($this->ed_object_id !== "") {
            oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        } else {
            oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
        }
        // write_log(sprintf("%s, %s, %s, %s",
        //     $value->edt_target_code, $this->ed_object_id,
        //     $value->ed_object_id, ),
        //     __FILE__, __LINE__);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    /*For example: target_code = TRANSP_EQUIP, obj_code = 486357
    For equipment, obj_code is eqpt_id
     */
    public function read()
    {
        $query = "
            SELECT EDT_TARGET_CODE,
                EDT_TYPE_CODE,
                EDT_TYPE_DESC,
                NVL(ED_CMPY_CODE, DEFAULT_CMPY) ED_CMPY_CODE,
                NVL(ED_OBJECT_ID, DEFAULT_OBJ) ED_OBJECT_ID,
                ED_EXP_DATE,
                ED_STATUS
            FROM (
                SELECT ED_CMPY_CODE,
                    ED_OBJECT_ID,
                    ED_TYPE_CODE,
                    ED_EXP_DATE,
                    ED_STATUS,
                    ED_TARGET_CODE
                FROM EXPIRY_DATE_DETAILS WHERE ED_TARGET_CODE = :ed_target_code
                    AND ED_OBJECT_ID = :ed_object_id
                    AND ED_EXP_DATE IS NOT NULL
                ) EXPIRY_DATE_DETAILS_PER,
                (
                SELECT EDT_TARGET_CODE, EDT_TYPE_CODE, EDT_TYPE_DESC
                FROM EXPIRY_DATE_TYPES
                WHERE EDT_TARGET_CODE = :ed_target_code
                ) EXPIRY_DATE_PERSONNEL_TYPES,
                (SELECT MAX(ED_CMPY_CODE) DEFAULT_CMPY, MAX(ED_OBJECT_ID) DEFAULT_OBJ
                FROM EXPIRY_DATE_DETAILS
                WHERE ED_TARGET_CODE = :ed_target_code
                    AND ED_OBJECT_ID = :ed_object_id) TMP
            WHERE EDT_TARGET_CODE = ED_TARGET_CODE
                AND EDT_TYPE_CODE = ED_TYPE_CODE
            ORDER BY EDT_TYPE_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->ed_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    // public function read()
    // {
    //     Utilities::sanitize($this);

    //     $query = "
    //         SELECT ED_TYPE_CODE,
    //             EDT_TYPE_DESC,
    //             ED_EXP_DATE
    //         FROM EXPIRY_DATE_DETAILS, EXPIRY_DATE_TYPES
    //         WHERE EDT_TARGET_CODE = :target_code
    //             AND EDT_TYPE_CODE = ED_TYPE_CODE
    //             AND ED_TARGET_CODE = EDT_TARGET_CODE
    //             AND ED_OBJECT_ID = :obj_code
    //         ORDER BY ED_TYPE_CODE";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':target_code', $this->target_code);
    //     oci_bind_by_name($stmt, ':obj_code', $this->obj_code);
    //     if (oci_execute($stmt, $this->commit_mode)) {
    //         return $stmt;
    //     } else {
    //         $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return null;
    //     }
    // }
}
