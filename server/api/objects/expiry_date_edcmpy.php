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
        "EDT_REJECT" => 1,
    );

    public function update($expiry_dates = null)
    {
        // write_log(json_encode($this), __FILE__, __LINE__);
        write_log(json_encode($expiry_dates), __FILE__, __LINE__);
        $query = "
            SELECT ED_EXP_DATE, ED_TARGET_CODE, ED_OBJECT_ID, ED_TYPE_CODE, EDT_TYPE_DESC, ED_CMPY_CODE
            FROM EXPIRY_DATE_DETAILS, EXPIRY_DATE_TYPES
            WHERE EDT_TYPE_CODE = ED_TYPE_CODE
                AND ED_TARGET_CODE = :ed_target_code
                AND ED_OBJECT_ID = :ed_object_id
        ";
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            $query .= "
                AND (ED_CMPY_CODE IS NULL OR ED_CMPY_CODE = :ed_cmpy_code)
            ";
        }
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->edt_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            oci_bind_by_name($stmt, ':ed_cmpy_code', $this->ed_cmpy_code);
        }
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
                $jnl_data[1] = "EXPIRY_DATE_DETAILS";
                $jnl_data[2] = sprintf("ed_target_code:%s, ed_object_id:%s", $value['ed_target_code'], $value['ed_object_id']);
                $jnl_data[3] = sprintf("ed_type_code:%s", $value['edt_type_desc']);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            } else if ($value['ed_exp_date'] != $expiry_dates[$key]->ed_exp_date) {
                //Changed
                $module = "EXPIRY_DATE_DETAILS";
                $record = sprintf("ed_target_code:%s, ed_object_id:%s", $value['ed_target_code'], $value['ed_object_id']);

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
                $jnl_data[1] = "EXPIRY_DATE_DETAILS";
                $jnl_data[2] = sprintf("ed_target_code:%s, ed_object_id:%s", $target, $object_id);
                $jnl_data[3] = sprintf("ed_type_code:%s", $value->edt_type_desc);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        //Also update PERSONNEL, TANKERS, TRANSP_EQUIP table to make it consistent
        if ($this->edt_target_code === "TRANSP_EQUIP") {
            $eqpt_exp_d1_dmy = isset($expiry_dates["EQPT_EXPIRY_DATE_1"]) ? 
                $expiry_dates["EQPT_EXPIRY_DATE_1"]->ed_exp_date : null;
            $eqpt_exp_d2_dmy = isset($expiry_dates["EQPT_EXPIRY_DATE_2"]) ? 
                $expiry_dates["EQPT_EXPIRY_DATE_2"]->ed_exp_date : null;
            $eqpt_exp_d3_dmy = isset($expiry_dates["EQPT_EXPIRY_DATE_3"]) ? 
                $expiry_dates["EQPT_EXPIRY_DATE_3"]->ed_exp_date : null;
            $query = "
                UPDATE TRANSP_EQUIP
                SET EQPT_EXP_D1_DMY = :eqpt_exp_d1_dmy,
                    EQPT_EXP_D2_DMY = :eqpt_exp_d2_dmy,
                    EQPT_EXP_D3_DMY = :eqpt_exp_d3_dmy
                WHERE EQPT_ID = :ed_object_id";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':eqpt_exp_d1_dmy', $eqpt_exp_d1_dmy);
            oci_bind_by_name($stmt, ':eqpt_exp_d2_dmy', $eqpt_exp_d2_dmy);
            oci_bind_by_name($stmt, ':eqpt_exp_d3_dmy', $eqpt_exp_d3_dmy);
            oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        } else if ($this->edt_target_code === "PERSONNEL") {
            $per_exp_d1_dmy = isset($expiry_dates["PSNL_EXPIRY_DATE_1"]) ? 
                $expiry_dates["PSNL_EXPIRY_DATE_1"]->ed_exp_date : null;
            $per_exp_d2_dmy = isset($expiry_dates["PSNL_EXPIRY_DATE_2"]) ? 
                $expiry_dates["PSNL_EXPIRY_DATE_2"]->ed_exp_date : null;
            $per_exp_d3_dmy = isset($expiry_dates["PSNL_EXPIRY_DATE_3"]) ? 
                $expiry_dates["PSNL_EXPIRY_DATE_3"]->ed_exp_date : null;
            $query = "
                UPDATE PERSONNEL
                SET PER_EXP_D1_DMY = :per_exp_d1_dmy,
                    PER_EXP_D2_DMY = :per_exp_d2_dmy,
                    PER_EXP_D3_DMY = :per_exp_d3_dmy
                WHERE PER_CODE = :ed_object_id";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':per_exp_d1_dmy', $per_exp_d1_dmy);
            oci_bind_by_name($stmt, ':per_exp_d2_dmy', $per_exp_d2_dmy);
            oci_bind_by_name($stmt, ':per_exp_d3_dmy', $per_exp_d3_dmy);
            oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        } else if ($this->edt_target_code === "TANKERS") {
            $tnkr_lic_exp = isset($expiry_dates["TNKR_EXPIRY_DATE_1"]) ? 
                $expiry_dates["TNKR_EXPIRY_DATE_1"]->ed_exp_date : null;
            $tnkr_dglic_exp = isset($expiry_dates["TNKR_EXPIRY_DATE_2"]) ? 
                $expiry_dates["TNKR_EXPIRY_DATE_2"]->ed_exp_date : null;
            $tnkr_ins_exp = isset($expiry_dates["TNKR_EXPIRY_DATE_3"]) ? 
                $expiry_dates["TNKR_EXPIRY_DATE_3"]->ed_exp_date : null;
            $query = "
                UPDATE TANKERS
                SET TNKR_LIC_EXP = :tnkr_lic_exp,
                    TNKR_DGLIC_EXP = :tnkr_dglic_exp,
                    TNKR_INS_EXP = :tnkr_ins_exp
                WHERE TNKR_CODE = :ed_object_id";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tnkr_lic_exp', $tnkr_lic_exp);
            oci_bind_by_name($stmt, ':tnkr_dglic_exp', $tnkr_dglic_exp);
            oci_bind_by_name($stmt, ':tnkr_ins_exp', $tnkr_ins_exp);
            oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        if ($this->delete($expiry_dates) != true) {
            write_log("Failed to delete before insert", __FILE__, __LINE__);
            return false;
        }
        return $this->create($expiry_dates);
    }

    public function delete()
    {
        $query = "
            DELETE FROM EXPIRY_DATE_DETAILS
            WHERE ED_TARGET_CODE = :ed_target_code
                AND ED_OBJECT_ID = :ed_object_id
        ";
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            $query .= "
                AND (ED_CMPY_CODE IS NULL OR ED_CMPY_CODE = :ed_cmpy_code)
            ";
        }
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->edt_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            oci_bind_by_name($stmt, ':ed_cmpy_code', $this->ed_cmpy_code);
        }
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
        $cmpyLine = "NULL";
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            $cmpyLine = ":ed_cmpy_code";
        }
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
                ".$cmpyLine.",
                :ed_object_id,
                EDT_TYPE_CODE,
                null,
                1
            FROM EXPIRY_DATE_TYPES
            WHERE EDT_TARGET_CODE = :ed_target_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->edt_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            oci_bind_by_name($stmt, ':ed_cmpy_code', $this->ed_cmpy_code);
        }
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
                    AND ED_TYPE_CODE = :ed_type_code
            ";
            if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
                $query .= "
                    AND (ED_CMPY_CODE IS NULL OR ED_CMPY_CODE = :ed_cmpy_code)
                ";
            }
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
            if ($this->ed_object_id !== "") {
                oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
            } else {
                oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
            }
            if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
                oci_bind_by_name($stmt, ':ed_cmpy_code', $this->ed_cmpy_code);
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
                AND ED_EXP_DATE IS NULL
        ";
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            $query .= "
                AND (ED_CMPY_CODE IS NULL OR ED_CMPY_CODE = :ed_cmpy_code)
            ";
        }
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
        if ($this->ed_object_id !== "") {
            oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        } else {
            oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
        }
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            oci_bind_by_name($stmt, ':ed_cmpy_code', $this->ed_cmpy_code);
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
        $cmpyLine = "";
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            $cmpyLine = "
                AND (ED_CMPY_CODE IS NULL OR ED_CMPY_CODE = :ed_cmpy_code)
            ";
        }
        $query = "
            SELECT EDT_TARGET_CODE,
                EDT_TYPE_CODE,
                EDT_TYPE_DESC,
                NVL(ED_CMPY_CODE, DEFAULT_CMPY) ED_CMPY_CODE,
                NVL(ED_OBJECT_ID, DEFAULT_OBJ) ED_OBJECT_ID,
                ED_EXP_DATE,
                ED_STATUS,
                EDT_REJECT
            FROM (
                SELECT ED_CMPY_CODE,
                    ED_OBJECT_ID,
                    ED_TYPE_CODE,
                    ED_EXP_DATE,
                    ED_STATUS,
                    ED_TARGET_CODE
                FROM EXPIRY_DATE_DETAILS 
                WHERE ED_TARGET_CODE = :ed_target_code
                    ".$cmpyLine."
                    AND ED_OBJECT_ID = :ed_object_id
                    AND ED_EXP_DATE IS NOT NULL
                ) EXPIRY_DATE_DETAILS_PER,
                (
                SELECT EDT_TARGET_CODE, EDT_TYPE_CODE, EDT_TYPE_DESC, EDT_REJECT
                FROM EXPIRY_DATE_TYPES
                WHERE EDT_TARGET_CODE = :ed_target_code
                ) EXPIRY_DATE_PERSONNEL_TYPES,
                (SELECT MAX(ED_CMPY_CODE) DEFAULT_CMPY, MAX(ED_OBJECT_ID) DEFAULT_OBJ
                FROM EXPIRY_DATE_DETAILS
                WHERE ED_TARGET_CODE = :ed_target_code
                    ".$cmpyLine."
                    AND ED_OBJECT_ID = :ed_object_id) TMP
            WHERE EDT_TARGET_CODE = ED_TARGET_CODE
                AND EDT_TYPE_CODE = ED_TYPE_CODE
            ORDER BY EDT_TYPE_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->ed_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        if (isset($this->ed_cmpy_code) && $this->ed_cmpy_code != "") {
            oci_bind_by_name($stmt, ':ed_cmpy_code', $this->ed_cmpy_code);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
