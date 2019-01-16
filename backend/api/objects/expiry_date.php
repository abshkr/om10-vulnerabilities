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
        $jnl_data[0] = $curr_psn; 
        $jnl_data[1] = "Equpment";
        $jnl_data[2] = $this->obj_code;
        $module = "Equipment";

        $record = sprintf("equipment id:%s", $this->obj_code);
        
        foreach ($expiry_dates as $key => $value) {
            $old_expiry = null;
            $query = "
                SELECT TO_CHAR(ED_EXP_DATE, 'RRRR-MM-DD HH24:MI:SS') ED_EXP_DATE
                FROM EXPIRY_DATE_DETAILS 
                WHERE ED_TARGET_CODE = :ed_target_code
                    AND ED_OBJECT_ID = :ed_object_id
                    AND ED_TYPE_CODE = :ed_type_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ed_target_code', $this->target_code);
            oci_bind_by_name($stmt, ':ed_object_id', $this->obj_code);
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
            oci_bind_by_name($stmt, ':ed_target_code', $this->target_code);
            oci_bind_by_name($stmt, ':ed_object_id', $this->obj_code);
            oci_bind_by_name($stmt, ':ed_type_code', $key);
            oci_bind_by_name($stmt, ':ed_exp_date', $value);
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

            if ($value != $old_expiry && 
                !$journal->valueChange(
                    $module, $record, $key, $old_expiry, $value)) {
                oci_rollback($this->conn);
                return false;
            }
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
        oci_bind_by_name($stmt, ':ed_target_code', $this->target_code);
        oci_bind_by_name($stmt, ':ed_object_id', $this->obj_code);
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
            oci_bind_by_name($stmt, ':ed_target_code', $this->target_code);
            oci_bind_by_name($stmt, ':ed_object_id', $this->obj_code);
            oci_bind_by_name($stmt, ':ed_type_code', $key);
            oci_bind_by_name($stmt, ':ed_exp_date', $value);
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
        
        $query = "
            SELECT ED_TYPE_CODE, 
                EDT_TYPE_DESC, 
                ED_EXP_DATE
            FROM EXPIRY_DATE_DETAILS, EXPIRY_DATE_TYPES
            WHERE EDT_TARGET_CODE = :target_code 
                AND EDT_TYPE_CODE = ED_TYPE_CODE
                AND ED_TARGET_CODE = EDT_TARGET_CODE 
                AND ED_OBJECT_ID = :obj_code
            ORDER BY ED_TYPE_CODE";        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':target_code', $this->target_code);
        oci_bind_by_name($stmt, ':obj_code', $this->obj_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}   