<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';
include_once __DIR__  . '/expiry_type.php';

class Equipment
{   
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

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
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int)$row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function compartments($eqpt_id)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT EQPT_CODE, 
                EQPT_ETP, 
                CMPT_NO, 
                DECODE(CMPT_UNITS, 11, 'l (cor)', 17, 'kg', 'l (amb)') CMPT_UNITS,
                DECODE(ADJ_AMNT, NULL, CMPT_CAPACIT, CMPT_CAPACIT + ADJ_AMNT) SAFEFILL,
                DECODE(ADJ_CAPACITY, NULL, CMPT_CAPACIT, ADJ_CAPACITY) SFL,
                NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK
            FROM TRANSP_EQUIP, COMPARTMENT, SFILL_ADJUST
            WHERE COMPARTMENT.CMPT_ETYP = TRANSP_EQUIP.EQPT_ETP
                AND EQPT_ID = :eqpt_id
                AND EQPT_ID = SFILL_ADJUST.ADJ_EQP(+)
                AND CMPT_NO = SFILL_ADJUST.ADJ_CMPT(+)
            ORDER BY CMPT_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $eqpt_id);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function toggleLock($eqpt, $cmpt)
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $old_value = null;
        $query = "
            SELECT NVL(ADJ_CMPT_LOCK, 0) ADJ_CMPT_LOCK 
            FROM SFILL_ADJUST 
            WHERE ADJ_EQP = :eqpt and ADJ_CMPT = :cmpt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt', $eqpt);
        oci_bind_by_name($stmt, ':cmpt', $cmpt);
        if (!oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } else {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $old_value = (int)$row['ADJ_CMPT_LOCK'];
        }
        
        $query = "
            UPDATE SFILL_ADJUST 
            SET ADJ_CMPT_LOCK = 1 - NVL(ADJ_CMPT_LOCK, 0)
            WHERE ADJ_EQP = :eqpt and ADJ_CMPT = :cmpt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt', $eqpt);
        oci_bind_by_name($stmt, ':cmpt', $cmpt);
        
        if (!oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn);
        $module = "GUI_TANKERS";
        $record = sprintf("Equip ID:%s, Compartment No:%s", $eqpt, $cmpt);

        if (!$journal->valueChange(
                $module, $record, "ADJ_CMPT_LOCK", $old_value, 1 - $old_value)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    function count()
    {
        $query = "
            SELECT COUNT(*) CN
            FROM GUI_EQUIPMENT_LIST";        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int)$row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    function read()
    {
        if (!isset($this->end_num)) {
            $this->start_num = 1;
            $this->end_num = $this->count();
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
                    ORDER BY EQPT_ID
                ) RES
            )
            WHERE RN >= :start_num
                AND RN <= :end_num";        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_num', $this->start_num);
        oci_bind_by_name($stmt, ':end_num', $this->end_num);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int)$row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function loadType()
    {
        $query = "
            SELECT LD_TYPE_ID,
                LD_TYPE_CODE,
                LD_TYPE_TEXT 
            FROM EQUIP_LIST_LD_TYPE_LOOKUP";        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //This function does not auto-commit
    private function updateCmpts($cmpts, $insert = false)
    {
        write_log(sprintf("%s::%s() START. cmpts:%s", __CLASS__, __FUNCTION__, json_encode($cmpts)), 
            __FILE__, __LINE__);
        
        $cmpt_count = count($cmpts);
        
        for ($i = 1; $i <= $cmpt_count; $i ++) {
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
                $base_cap = (int)$row['CMPT_CAPACIT'];
            } else {
                write_log("DB error:" . oci_error($stmt)['message'], 
                    __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $adj_amnt = (int)$cmpts[$i - 1]['sched_limit'] - $base_cap;
            $adj_capacity = (int)$cmpts[$i - 1]['sfl'];
                       
            /* Old data*/            
            $query = "
                SELECT ADJ_AMNT, ADJ_CAPACITY
                FROM SFILL_ADJUST
                WHERE ADJ_EQP = :eqpt_id 
                    AND ADJ_CMPT = :cmpt_no";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
            oci_bind_by_name($stmt, ':cmpt_no', $i);
            if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                $old_limit = (int)$row['ADJ_AMNT'] + $base_cap;
                $old_capacity = (int)$row['ADJ_CAPACITY'];
            } else {
                write_log("DB error:" . oci_error($stmt)['message'], 
                    __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $query = "
                UPDATE SFILL_ADJUST
                SET ADJ_AMNT = :adj_amnt,
                    ADJ_CAPACITY = :adj_capacity
                WHERE ADJ_EQP = :eqpt_id AND ADJ_CMPT = :cmpt_no";                    
            
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
            oci_bind_by_name($stmt, ':cmpt_no', $i);
            oci_bind_by_name($stmt, ':adj_amnt', $adj_amnt);
            oci_bind_by_name($stmt, ':adj_capacity', $adj_capacity);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                write_log("DB error:" . oci_error($stmt)['message'], 
                    __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            if ($insert)
                continue;

            $journal = new Journal($this->conn, false);
            $module = "Equipment";
            $record = sprintf("equipment id:%s, cmpt num:%d", $this->eqpt_id, $i);
            if ($old_limit != (int)$cmpts[$i - 1]['sched_limit'] && 
                !$journal->valueChange(
                    $module, $record, "scheduled limit", 
                    $old_limit, $cmpts[$i - 1]['sched_limit'])) {
                oci_rollback($this->conn);
                return false;
            }
            if ($adj_capacity != $old_capacity && 
                !$journal->valueChange(
                    $module, $record, "sfl", 
                    $old_capacity, $adj_capacity)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        return true;
    }

    public function update($cmpts = null, $expiry_dates = null)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__), 
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        $eqpt_title = null;
        $eqpt_lock = null;
        $eqpt_empty_kg = null;
        $eqp_must_tare_in = null;
        $eqpt_max_gross = null;
        $eqpt_comments = null;
        $eqpt_area = null;
        $eqpt_load_type = null;

        $query = "
            SELECT EQPT_TITLE,
                EQPT_LOCK,
                EQPT_EMPTY_KG,
                EQP_MUST_TARE_IN,
                EQPT_MAX_GROSS,
                EQPT_COMMENTS,
                EQPT_AREA,
                EQPT_LOAD_TYPE      
            FROM GUI_EQUIPMENT_LIST
            WHERE EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $eqpt_title = $row['EQPT_TITLE'];
            $eqpt_lock = $row['EQPT_LOCK'];
            $eqpt_empty_kg = $row['EQPT_EMPTY_KG'];
            $eqp_must_tare_in = $row['EQP_MUST_TARE_IN'];
            $eqpt_max_gross = $row['EQPT_MAX_GROSS'];
            $eqpt_comments = $row['EQPT_COMMENTS'];
            $eqpt_area = $row['EQPT_AREA'];
            $eqpt_load_type = $row['EQPT_LOAD_TYPE'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
                EQPT_LOAD_TYPE = :eqpt_load_type
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn; 
        $jnl_data[1] = "Equpment";
        $jnl_data[2] = $this->eqpt_id;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "Equipment";
        $record = sprintf("equipment id:%s", $this->eqpt_id);
        if ($eqpt_title != $this->eqpt_title && 
            !$journal->valueChange(
                $module, $record, "equipment title", $eqpt_title, $this->eqpt_title)) {
            oci_rollback($this->conn);
            return false;
        }

        if ($eqpt_lock != $this->eqpt_lock && 
            !$journal->valueChange(
                $module, $record, "lock status", $eqpt_lock, $this->eqpt_lock)) {
            oci_rollback($this->conn);
            return false;
        }

        if ($eqpt_empty_kg != $this->eqpt_empty_kg && 
            !$journal->valueChange(
                $module, $record, "empty weight", $eqpt_empty_kg, $this->eqpt_empty_kg)) {
            oci_rollback($this->conn);
            return false;
        }

        if ($eqp_must_tare_in != $this->eqp_must_tare_in && 
            !$journal->valueChange(
                $module, $record, "tare_in status", $eqp_must_tare_in, $this->eqp_must_tare_in)) {
            oci_rollback($this->conn);
            return false;
        }

        if ($eqpt_max_gross != $this->eqpt_max_gross && 
            !$journal->valueChange(
                $module, $record, "pulling limit", $eqpt_max_gross, $this->eqpt_max_gross)) {
            oci_rollback($this->conn);
            return false;
        }

        if ($eqpt_comments != $this->eqpt_comments && 
            !$journal->valueChange(
                $module, $record, "comment", $eqpt_comments, $this->eqpt_comments)) {
            oci_rollback($this->conn);
            return false;
        }

        if ($eqpt_area != $this->eqpt_area && 
            !$journal->valueChange(
                $module, $record, "area", $eqpt_area, $this->eqpt_area)) {
            oci_rollback($this->conn);
            return false;
        }

        if ($eqpt_load_type != $this->eqpt_load_type && 
            !$journal->valueChange(
                $module, $record, "load type", $eqpt_load_type, $this->eqpt_load_type)) {
            oci_rollback($this->conn);
            return false;
        }

        if (isset($cmpts))
        {
            if (!$this->updateCmpts($cmpts)) {
                write_log("Failed to update equipment equipments", 
                    __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        $expiry_date = new ExpiryDate($this->conn);
        $expiry_date->obj_code = $this->eqpt_id;
        $expiry_date->target_code = ExpiryTarget::TRANSP_EQUIP;
        if (!$expiry_date->update($expiry_dates)) {
            write_log("Failed to update equipment expiry dates", 
                __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function create($cmpts = null, $expiry_dates = null)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__), 
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        $this->eqpt_id = 1;
        $query = "
            SELECT NVL(MAX(EQPT_ID), 0) + 1 NEWID
            FROM TRANSP_EQUIP";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->eqpt_id = (int)$row['NEWID'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn; 
        $jnl_data[1] = "Equpment";
        $jnl_data[2] = $this->eqpt_id;
        $jnl_data[3] = sprintf(
            "code:%s, type:%s, owner:%s, empty weight:%d, lock status:%s, must_tare_in status:%s", 
            $this->eqpt_code, $this->eqpt_etp, $this->eqpt_owner, $this->eqpt_empty_kg,
            $this->eqpt_lock, $this->eqp_must_tare_in);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (!$this->initCmpts()) {
            write_log("Failed to initialize equipment compartment", 
                __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if (isset($cmpts))
        {
            if (!$this->updateCmpts($cmpts, $insert = true)) {
                write_log("Failed to update equipment compartment", 
                    __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        $expiry_date = new ExpiryDate($this->conn);
        $expiry_date->obj_code = $this->eqpt_id;
        $expiry_date->target_code = ExpiryTarget::TRANSP_EQUIP;
        if (!$expiry_date->create($expiry_dates)) {
            write_log("Failed to update equipment expiry dates", 
                __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        write_log(sprintf("%s::%s() START. eqpt_id:%d", __CLASS__, __FUNCTION__, $this->eqpt_id), 
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            DELETE FROM SFILL_ADJUST
            WHERE ADJ_EQP = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {            
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $query = "
            DELETE FROM TRANSP_EQUIP
            WHERE EQPT_ID = :eqpt_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn; 
        $jnl_data[1] = "Equpment";
        $jnl_data[2] = $this->eqpt_id;
        $jnl_data[3] = "";

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
        {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}
