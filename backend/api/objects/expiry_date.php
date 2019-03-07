<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';
include_once __DIR__  . '/expiry_type.php';

class ExpiryDate
{   
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function update($expiry_dates)
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        
        foreach ($expiry_dates as $key => $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            // write_log($value->edt_target_code, __FILE__, __LINE__);
            $old_expiry = null;
            $query = "
                SELECT ED_EXP_DATE
                FROM EXPIRY_DATE_DETAILS 
                WHERE ED_TARGET_CODE = :ed_target_code
                    AND ED_OBJECT_ID = :ed_object_id
                    AND ED_TYPE_CODE = :ed_type_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
            oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
            oci_bind_by_name($stmt, ':ed_type_code', $key);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            } else {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                $old_expiry = $row['ED_EXP_DATE'];
            }

            $query = "
                UPDATE EXPIRY_DATE_DETAILS 
                SET ED_EXP_DATE = :ed_exp_date
                WHERE ED_TARGET_CODE = :ed_target_code
                    AND ED_OBJECT_ID = :ed_object_id
                    AND ED_TYPE_CODE = :ed_type_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
            oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
            oci_bind_by_name($stmt, ':ed_type_code', $key);
            oci_bind_by_name($stmt, ':ed_exp_date', $value->ed_exp_date);
            // write_log(sprintf("%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s", 
            //     $this->eqpt_title, $this->eqpt_code, $this->eqpt_owner,
            //     $this->eqpt_lock, $this->eqpt_empty_kg, $this->eqp_must_tare_in,
            //     $this->eqpt_max_gross, $this->eqpt_comments, $this->eqpt_area,
            //     $this->eqpt_load_type, $this->eqpt_id), 
            //     __FILE__, __LINE__);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            $record = sprintf("code: %s", $value->ed_object_id);
            $module = "EXPIRY_DATE_" . $value->edt_target_code;
            if ($value->ed_exp_date != $old_expiry && 
                !$journal->valueChange(
                    $module, $record, $value->edt_type_desc, $old_expiry, $value->ed_exp_date)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        return true;
    }

    public function delete()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            DELETE FROM EXPIRY_DATE_DETAILS 
            WHERE ED_TARGET_CODE = :ed_target_code
                AND ED_OBJECT_ID = :ed_object_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->edt_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    //Do not commit
    public function create($expiry_dates)
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        write_log(json_encode($expiry_dates), __FILE__, __LINE__);
        
        Utilities::sanitize($this);

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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        foreach ($expiry_dates as $key => $value) {
            $query = "
                UPDATE EXPIRY_DATE_DETAILS 
                SET ED_EXP_DATE = :ed_exp_date
                WHERE ED_TARGET_CODE = :ed_target_code
                    AND ED_OBJECT_ID = :ed_object_id
                    AND ED_TYPE_CODE = :ed_type_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ed_target_code', $value->edt_target_code);
            oci_bind_by_name($stmt, ':ed_object_id', $value->ed_object_id);
            oci_bind_by_name($stmt, ':ed_type_code', $key);
            oci_bind_by_name($stmt, ':ed_exp_date', $value->ed_exp_date);
            // write_log(sprintf("%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s", 
            //     $this->eqpt_title, $this->eqpt_code, $this->eqpt_owner,
            //     $this->eqpt_lock, $this->eqpt_empty_kg, $this->eqp_must_tare_in,
            //     $this->eqpt_max_gross, $this->eqpt_comments, $this->eqpt_area,
            //     $this->eqpt_load_type, $this->eqpt_id), 
            //     __FILE__, __LINE__);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }
        
        return true;
    }

    /*For example: target_code = TRANSP_EQUIP, obj_code = 486357
    For equipment, obj_code is eqpt_id
    */
    public function read()
    {
        Utilities::sanitize($this);
        // write_log($this->ed_target_code, __FILE__, __LINE__, LogLevel::ERROR);
        // write_log($this->ed_object_id, __FILE__, __LINE__, LogLevel::ERROR);
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
            WHERE EDT_TARGET_CODE = ED_TARGET_CODE(+)
                AND EDT_TYPE_CODE = ED_TYPE_CODE(+)
            ORDER BY EDT_TYPE_CODE";        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_target_code', $this->ed_target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->ed_object_id);
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
    //     if (oci_execute($stmt)) {
    //         return $stmt;
    //     } else {
    //         write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return null;
    //     }
    // }
}   