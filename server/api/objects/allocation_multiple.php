<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Allocation extends CommonClass
{
    protected $TABLE_NAME = 'LOCKAL';
    protected $VIEW_NAME = 'GUI_ALLOCATIONS';
    protected $primary_keys = array("lockal_index", "lockatyp_at_type", "lockatyp_at_cmpy", "lockal_supl");
    protected $view_keys = array("alloc_index", "alloc_type", "alloc_cmpycode", "alloc_suppcode");

    protected $del_n_ins_children = false;   //Because ALLOCS has child ALL_CHILD
    
    protected $table_view_map = array(
        "LOCKAL_INDEX" => "ALLOC_INDEX",
        "LOCKATYP_AT_TYPE" => "ALLOC_TYPE",
        "LOCKATYP_AT_CMPY" => "ALLOC_CMPYCODE",
        "LOCKAL_SUPL" => "ALLOC_SUPPCODE",
        "LOCKAL_OWNER" => "ALLOC_OWNERCODE",
        "LOCKAL_LOCK" => "ALLOC_LOCK",
        "LOCKAL_PERIOD" => "ALLOC_PERIOD",
        "LOCKAL_START_DMY" => "ALLOC_START_DATE",
        "LOCKAL_END_DMY" => "ALLOC_END_DATE",
        // "LOCKAL_NEXT_DMY" => "ALLOC_NEXT_DATE",
        "LOCKAL_COMMENTS" => "ALLOC_COMMENTS",
        "ALLOC_LIMIT" => "AITEM_QTYLIMIT",
        "ALL_PROD_PRODCODE" => "AITEM_PRODCODE",
        "ALLOC_UNITS" => "AITEM_PRODUNIT"
    );

    public $NUMBER_FIELDS = array(
        "AITEM_QTYLIMIT" => 0,
        "AITEM_QTYUSED" => 0,
        "AITEM_QTYLEFT" => 0,
        "AITEM_PRODUNIT",
        "ALLOC_LOCK",
        // "ALLOC_INDEX",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "ALLOC_BASEFLAG" => "Y",
    );

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM GUI_ALLOCATION_ITEMS
            WHERE 
                AITEM_INDEX = :aitem_index
                AND AITEM_TYPE = :aitem_type
                AND AITEM_CMPYCODE = :aitem_cmpycode
                AND AITEM_SUPPCODE = :aitem_suppcode";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':aitem_index', $this->alloc_index);
        oci_bind_by_name($stmt, ':aitem_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':aitem_cmpycode', $this->alloc_cmpycode);
        oci_bind_by_name($stmt, ':aitem_suppcode', $this->alloc_suppcode);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            // note: may need to use ($flow_row['AITEM_PRODCODE'] + '_' + $flow_row['AITEM_SUPPCODE'])
            $tank_max_flows[$flow_row['AITEM_PRODCODE']] = $flow_row;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $module = "ALLOCS";
        foreach ($old as $prod => $alloc_item) {
            if (isset($new[$prod]) &&
                $alloc_item['AITEM_QTYLIMIT'] != $new[$prod]['AITEM_QTYLIMIT']) {
                $record = sprintf("all_atky_at_type:%s, all_atky_at_cmpy:%s, all_prod_prodcmpy:%s, all_prod_prodcode:%s",
                    $this->alloc_type, $this->alloc_cmpycode, $this->alloc_suppcode, $prod);
                $journal->valueChange($module, $record, "ALLOC_LIMIT", $alloc_item['AITEM_QTYLIMIT'], $new[$prod]['AITEM_QTYLIMIT']);
            }

            if (!isset($new[$prod])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("all_atky_at_type:%s, all_atky_at_cmpy:%s, all_prod_prodcmpy:%s",
                    $this->alloc_type, $this->alloc_cmpycode, $this->alloc_suppcode);
                $jnl_data[3] = sprintf("all_prod_prodcode:%s", $prod);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($new as $prod => $alloc_item) {
            if (!isset($old[$prod])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("all_atky_at_type:%s, all_atky_at_cmpy:%s, all_prod_prodcmpy:%s",
                    $this->alloc_type, $this->alloc_cmpycode, $this->alloc_suppcode);
                $jnl_data[3] = sprintf("all_prod_prodcode:%s", $prod);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }
    }

    //Old php: AllocationService.php::resetAllocationItem
    public function reset()
    {
        $query = "UPDATE ALLOCS
        SET ALLOC_LEFT = ALLOC_LIMIT
        WHERE 
            ALL_INDEX = :alloc_index
            AND ALL_ATKY_AT_TYPE = :alloc_type
            AND ALL_ATKY_AT_CMPY = :alloc_cmpycode
            AND ALL_PROD_PRODCMPY = :alloc_suppcode
            AND ALL_PROD_PRODCODE = :aitem_prodcode
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':alloc_index', $this->aitem_index);
        oci_bind_by_name($stmt, ':alloc_suppcode', $this->aitem_suppcode);
        oci_bind_by_name($stmt, ':alloc_type', $this->aitem_type);
        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->aitem_cmpycode);
        oci_bind_by_name($stmt, ':aitem_prodcode', $this->aitem_prodcode);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        // JOURNAL - TODO

        return true;
    }

    public function pre_create()
    {
        // get the next alloc_index:
        if (!isset($this->alloc_index) || $this->alloc_index < 0) {
            $this->alloc_index = $this->next_alloc_index_internal();
            $this->lockal_index = $this->alloc_index;
        }
        // $this->alloc_index = $this->next_alloc_index_internal();
        // $this->lockal_index = $this->alloc_index;
        write_log(sprintf("%s::%s() START index=".$this->alloc_index, __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "SELECT COUNT(*) CN FROM ALLOC_TYPE
            WHERE AT_TYPE = :at_type AND AT_CMPY = :at_cmpy";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':at_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':at_cmpy', $this->alloc_cmpycode);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] <= 0) {
            $query = "INSERT INTO ALLOC_TYPE(AT_TYPE, AT_CMPY)
                VALUES (:at_type, :at_cmpy)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':at_type', $this->alloc_type);
            oci_bind_by_name($stmt, ':at_cmpy', $this->alloc_cmpycode);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }

    protected function post_create()
    {
        return $this->post_update();
    }

    protected function post_update()
    {
        $query = "UPDATE LOCKAL
        SET LOCKAL_DMY = SYSDATE
        WHERE 
            LOCKAL_INDEX = :aitem_index
            AND LOCKATYP_AT_TYPE = :aitem_type
            AND LOCKATYP_AT_CMPY = :aitem_cmpycode
            AND LOCKAL_SUPL = :aitem_suppcode
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':aitem_index', $this->alloc_index);
        oci_bind_by_name($stmt, ':aitem_suppcode', $this->alloc_suppcode);
        oci_bind_by_name($stmt, ':aitem_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':aitem_cmpycode', $this->alloc_cmpycode);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    protected function update_children($old_children = null)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);
        // write_log(json_encode($old_children), __FILE__, __LINE__);
        
        foreach ($old_children as $prodcode => $item_array) {
            $still_exist = false;
            foreach ($this->allocs as $alloc) {
                if ($alloc->aitem_prodcode == $prodcode) {
                    // if ($alloc->aitem_qtylimit == 0) {
                    if ($alloc->aitem_qtylimit === '' || is_null($alloc->aitem_qtylimit)) {
                        // delete ADJUSTS
                        $query = "DELETE FROM ADJUSTS
                            WHERE 
                                ADJALL_ALL_INDEX = :alloc_index
                                AND ADJALL_ALL_PROD_PRODCMPY = :alloc_suppcode
                                AND ADJALL_ALL_ATKY_AT_TYPE = :alloc_type
                                AND ADJALL_ALL_ATKY_AT_CMPY = :alloc_cmpycode";
                        $stmt = oci_parse($this->conn, $query);
                        oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
                        oci_bind_by_name($stmt, ':alloc_suppcode', $this->alloc_suppcode);
                        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
                        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->alloc_cmpycode);
                        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                            $e = oci_error($stmt);
                            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                            return false;
                        }

                        // delete ALL_CHILD
                        $query = "DELETE FROM ALL_CHILD
                            WHERE 
                                ALCH_ALP_ALL_INDEX = :alloc_index
                                AND ALCH_ALP_ALL_PROD_PRODCMPY = :alloc_suppcode
                                AND ALCH_ALP_ALL_ATKY_AT_TYPE = :alloc_type
                                AND ALCH_ALP_ALL_ATKY_AT_CMPY = :alloc_cmpycode";
                        $stmt = oci_parse($this->conn, $query);
                        oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
                        oci_bind_by_name($stmt, ':alloc_suppcode', $this->alloc_suppcode);
                        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
                        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->alloc_cmpycode);
                        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                            $e = oci_error($stmt);
                            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                            return false;
                        }
                        
                        $query = "DELETE FROM ALLOCS 
                            WHERE 
                                ALL_INDEX = :aitem_index
                                AND ALL_PROD_PRODCMPY = :aitem_suppcode
                                AND ALL_ATKY_AT_TYPE = :aitem_type
                                AND ALL_ATKY_AT_CMPY = :aitem_cmpycode
                                AND ALL_PROD_PRODCODE = :aitem_prodcode";
                        $stmt = oci_parse($this->conn, $query);
                        oci_bind_by_name($stmt, ':aitem_index', $this->alloc_index);
                        oci_bind_by_name($stmt, ':aitem_prodcode', $alloc->aitem_prodcode);
                        oci_bind_by_name($stmt, ':aitem_suppcode', $this->alloc_suppcode);
                        oci_bind_by_name($stmt, ':aitem_type', $this->alloc_type);
                        oci_bind_by_name($stmt, ':aitem_cmpycode', $this->alloc_cmpycode);
                        if (!oci_execute($stmt, $this->commit_mode)) {
                            $e = oci_error($stmt);
                            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                            return false;
                        }
                    // } else if ($alloc->aitem_qtylimit > 0) {
                    } else if ($alloc->aitem_qtylimit >= 0) {
                        $new_left = $item_array['AITEM_QTYLEFT'] + ($alloc->aitem_qtylimit - $item_array['AITEM_QTYLIMIT']);
                        $query = "UPDATE ALLOCS
                            SET ALLOC_LIMIT = :aitem_qtylimit,
                                ALLOC_LEFT = :new_left,
                                ALLOC_UNITS = :aitem_produnit
                            WHERE 
                                ALL_INDEX = :aitem_index
                                AND ALL_PROD_PRODCMPY = :aitem_suppcode
                                AND ALL_ATKY_AT_TYPE = :aitem_type
                                AND ALL_ATKY_AT_CMPY = :aitem_cmpycode
                                AND ALL_PROD_PRODCODE = :aitem_prodcode";
                        $stmt = oci_parse($this->conn, $query);
                        oci_bind_by_name($stmt, ':aitem_index', $this->alloc_index);
                        oci_bind_by_name($stmt, ':aitem_prodcode', $alloc->aitem_prodcode);
                        oci_bind_by_name($stmt, ':aitem_suppcode', $this->alloc_suppcode);
                        oci_bind_by_name($stmt, ':aitem_qtylimit', $alloc->aitem_qtylimit);
                        oci_bind_by_name($stmt, ':new_left', $new_left);
                        oci_bind_by_name($stmt, ':aitem_produnit', $alloc->aitem_produnit);
                        oci_bind_by_name($stmt, ':aitem_type', $this->alloc_type);
                        oci_bind_by_name($stmt, ':aitem_cmpycode', $this->alloc_cmpycode);
            
                        if (!oci_execute($stmt, $this->commit_mode)) {
                            $e = oci_error($stmt);
                            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                            return false;
                        }
                    }
                }
            }
        }

        //In new but not in old.
        foreach ($this->allocs as $alloc) {
            if (isset($old_children[$alloc->aitem_prodcode])
                || ($alloc->aitem_qtylimit === '' || is_null($alloc->aitem_qtylimit))) {
                // || $alloc->aitem_qtylimit === 0) {
                continue;
            }

            $query = "INSERT INTO ALLOCS (
                ALL_PROD_PRODCODE,
                ALL_PROD_PRODCMPY,
                ALLOC_LEFT,
                ALLOC_LIMIT,
                ALLOC_UNITS,
                ALL_INDEX,
                ALL_ATKY_AT_TYPE,
                ALL_ATKY_AT_CMPY,
                ALLOC_PER_CHILD)
            VALUES (
                :aitem_prodcode,
                :aitem_suppcode,
                :aitem_qtylimit,
                :aitem_qtylimit,
                :aitem_produnit,
                :aitem_index,
                :aitem_type,
                :aitem_cmpycode,
                NULL
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':aitem_index', $this->alloc_index);
            oci_bind_by_name($stmt, ':aitem_prodcode', $alloc->aitem_prodcode);
            oci_bind_by_name($stmt, ':aitem_suppcode', $this->alloc_suppcode);
            oci_bind_by_name($stmt, ':aitem_qtylimit', $alloc->aitem_qtylimit);
            oci_bind_by_name($stmt, ':aitem_produnit', $alloc->aitem_produnit);
            oci_bind_by_name($stmt, ':aitem_type', $this->alloc_type);
            oci_bind_by_name($stmt, ':aitem_cmpycode', $this->alloc_cmpycode);

            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->allocs)) {
            return true;
        }
        
        foreach ($this->allocs as $value) {
            // if ($value->aitem_qtylimit <= 0) {
            if ($value->aitem_qtylimit === '' || is_null($value->aitem_qtylimit) || $value->aitem_qtylimit < 0) {
                continue;
            }
            
            // write_log(json_encode($value), __FILE__, __LINE__);
            $query = "INSERT INTO ALLOCS (
                ALL_PROD_PRODCODE,
                ALL_PROD_PRODCMPY,
                ALLOC_LEFT,
                ALLOC_LIMIT,
                ALLOC_UNITS,
                ALL_INDEX,
                ALL_ATKY_AT_TYPE,
                ALL_ATKY_AT_CMPY,
                ALLOC_PER_CHILD)
            VALUES (
                :aitem_prodcode,
                :aitem_suppcode,
                :aitem_qtylimit,
                :aitem_qtylimit,
                :aitem_produnit,
                :aitem_index,
                :aitem_type,
                :aitem_cmpycode,
                NULL
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':aitem_index', $this->alloc_index);
            oci_bind_by_name($stmt, ':aitem_prodcode', $value->aitem_prodcode);
            oci_bind_by_name($stmt, ':aitem_suppcode', $this->alloc_suppcode);
            oci_bind_by_name($stmt, ':aitem_qtylimit', $value->aitem_qtylimit);
            oci_bind_by_name($stmt, ':aitem_produnit', $value->aitem_produnit);
            oci_bind_by_name($stmt, ':aitem_type', $this->alloc_type);
            oci_bind_by_name($stmt, ':aitem_cmpycode', $this->alloc_cmpycode);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }
    
    //TODO: ALLOCS can have children in ALL_CHILD table
    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        // delete ADJUSTS
        $query = "DELETE FROM ADJUSTS
            WHERE 
                ADJALL_ALL_INDEX = :alloc_index
                AND ADJALL_ALL_PROD_PRODCMPY = :alloc_suppcode
                AND ADJALL_ALL_ATKY_AT_TYPE = :alloc_type
                AND ADJALL_ALL_ATKY_AT_CMPY = :alloc_cmpycode";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
        oci_bind_by_name($stmt, ':alloc_suppcode', $this->alloc_suppcode);
        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->alloc_cmpycode);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        // delete ALL_CHILD
        $query = "DELETE FROM ALL_CHILD
            WHERE 
                ALCH_ALP_ALL_INDEX = :alloc_index
                AND ALCH_ALP_ALL_PROD_PRODCMPY = :alloc_suppcode
                AND ALCH_ALP_ALL_ATKY_AT_TYPE = :alloc_type
                AND ALCH_ALP_ALL_ATKY_AT_CMPY = :alloc_cmpycode";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
        oci_bind_by_name($stmt, ':alloc_suppcode', $this->alloc_suppcode);
        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->alloc_cmpycode);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        // delete ALLOCS
        $query = "DELETE FROM ALLOCS
            WHERE 
                ALL_INDEX = :aitem_index
                AND ALL_PROD_PRODCMPY = :aitem_suppcode
                AND ALL_ATKY_AT_TYPE = :aitem_type
                AND ALL_ATKY_AT_CMPY = :aitem_cmpycode";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':aitem_index', $this->alloc_index);
        oci_bind_by_name($stmt, ':aitem_suppcode', $this->alloc_suppcode);
        oci_bind_by_name($stmt, ':aitem_cmpycode', $this->alloc_cmpycode);
        oci_bind_by_name($stmt, ':aitem_type', $this->alloc_type);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    public function read()
    {
        //write_log("DB error:" . print_r($this, true), __FILE__, __LINE__, LogLevel::ERROR);
        if (!isset($this->alloc_index)) {
            $this->alloc_index = -1;
        }
        if (!isset($this->alloc_type)) {
            $this->alloc_type = -1;
        }
        if (!isset($this->alloc_cmpycode)) {
            $this->alloc_cmpycode = "-1";
        }
        if (!isset($this->alloc_suppcode)) {
            $this->alloc_suppcode = "-1";
        }
        if (!isset($this->alloc_lock)) {
            $this->alloc_lock = -1;
        }
        if (!isset($this->start_date)) {
            $this->start_date = "-1";
        }
        if (!isset($this->end_date)) {
            $this->end_date = "-1";
        }
        if (isset($this->start_date) && $this->start_date === -1) {
            $this->start_date = "-1";
        }
        if (isset($this->end_date) && $this->end_date === -1) {
            $this->end_date = "-1";
        }
        $this->start_date = trim($this->start_date);
        $this->end_date = trim($this->end_date);
        
        $query = "
            SELECT *
            FROM " . $this->VIEW_NAME . "
            WHERE 
                1 = 1
                AND (-1 = :alloc_type OR ALLOC_TYPE = :alloc_type)
                AND ('-1' = :alloc_cmpycode OR ALLOC_CMPYCODE = :alloc_cmpycode)
                AND ('-1' = :alloc_suppcode OR ALLOC_SUPPCODE = :alloc_suppcode)
                AND (-1 = :alloc_lock OR ALLOC_LOCK = :alloc_lock)
                AND (-1 = :alloc_index OR ALLOC_INDEX = :alloc_index)
        ";

        //        AND (:start_date = '-1' OR ALLOC_DATETIME > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')) 
        if ($this->start_date === "-1") {
            $query .= "
                AND (:start_date = '-1') 
            ";
        } else {
            $query .= "
                AND (ALLOC_DATETIME > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')) 
            ";
        }
        //        AND (:end_date = '-1' OR ALLOC_DATETIME < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS'))
        if ($this->end_date === "-1") {
            $query .= "
                AND (:end_date = '-1')
            ";
        } else {
            $query .= "
                AND (ALLOC_DATETIME < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS'))
            ";
        }
        $query .= "
            ORDER BY ALLOC_TYPE DESC
        ";
        /* write_log("DB error:" . $query, __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB error: start>>>>" . $this->start_date."<<<<", __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB error: end>>>>" . $this->end_date."<<<<", __FILE__, __LINE__, LogLevel::ERROR); */

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_date', $this->start_date);
        oci_bind_by_name($stmt, ':end_date', $this->end_date);
        oci_bind_by_name($stmt, ':alloc_suppcode', $this->alloc_suppcode);
        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->alloc_cmpycode);
        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':alloc_lock', $this->alloc_lock);
        oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_all()
    {
        $query = "
            SELECT *
            FROM " . $this->VIEW_NAME . "
            ORDER BY ALLOC_TYPE DESC";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function types()
    {
        if (isset($_SESSION['SESSION'])) {
            $this->curr_cmpy = strip_tags($_SESSION['COMPANY']);
        } else {
            $this->curr_cmpy = 'NA';
        }

        // $query = "
        //     SELECT *
        //     FROM ALLOCATIONCHECK
        //     ORDER BY ACHECK_TYPE";
        $query = "
            SELECT COMPANY_ID ACHECK_TYPE, COMPANY_NAME ACHECK_NAME
            FROM COMPANY_TYP
            WHERE COMPANY_ID IN (2,3,4)
            OR ( (:user_cmpy in (select CMPY_CODE from COMPANYS where bitand(CMPY_TYPE, 3)>0 )) AND COMPANY_ID=1 )
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':user_cmpy', $this->curr_cmpy);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function period_types()
    {
        $query = "
            SELECT *
            FROM ALLOC_PERIOD_TYP
            ORDER BY ALLOC_PERIOD_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function lock_types()
    {
        $query = "
            SELECT *
            FROM ALLOC_LOCK_TYP
            ORDER BY ALLOC_LOCK_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function items()
    {
        /* if (isset($this->customer) && $this->customer !== "null") {
            return $this->items_no_exchange();
        } */

        $serv = new SiteService($this->conn);
        //Because Reactjs can call carriers.php?customer=undefined, so undefined becomes a string
        
        if (isset($this->supplier)) {
            if (isset($this->customer) && $this->customer !== "null" && $serv->site_customer_product()) {
                $query = "
                SELECT
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_INDEX, ALL_PRODS.ALLOC_INDEX) AITEM_INDEX,
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
                    NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
                    NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
                    NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
                    NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
                    NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
                    PROD_CMPY                      AITEM_PRODCMPY,
                    PROD_OWNER                     AITEM_PRODOWNER,
                    NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
                    NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
                    NVL(AITEM_QTYLIMIT, NULL) AITEM_QTYLIMIT,
                    NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
                    NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
                    NVL(AITEM_PRODUNIT, 5) AITEM_PRODUNIT,
                    NVL(AITEM_UNITNAME, 'l (amb)') AITEM_UNITNAME2,
                    aunit.DESCRIPTION  AITEM_UNITNAME,
                    NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
                FROM
                (
                    SELECT distinct PRODUCTS.PROD_CODE,
                        PRODUCTS.PROD_CMPY,
                        PRODUCTS.PROD_NAME,
                        -- PRODUCTS.PROD_OWNER,
                        CUSTOMER.CUST_SUPP PROD_OWNER,
                        NULL ALLOC_INDEX,
                        NULL ALLOC_TYPE,
                        NULL ALLOC_TYPENAME,
                        CUSTOMER.CUST_CODE ALLOC_CMPYCODE,
                        NULL ALLOC_CMPYNAME,
                        -- CUSTOMER.CUST_SUPP ALLOC_SUPPCODE,
                        NULL ALLOC_SUPPCODE,
                        NULL ALLOC_SUPPNAME,
                        NULL ALLOC_LOCK,
                        NULL ALLOC_LOCKNAME,
                        NULL ALLOC_PERIOD
                    FROM SUPPLIER_PRODUCTS_VW PRODUCTS, CUSTOMER_PRODUCTS_VW, CUSTOMER
                    WHERE PRODUCTS.PROD_CMPY = :supplier 
                        AND CUSTOMER_PRODUCTS_VW.CUST_ACCT = CUSTOMER.CUST_ACCT
                        AND CUSTOMER.CUST_CODE = :customer
                        AND PRODUCTS.PROD_CODE = CUSTOMER_PRODUCTS_VW.PROD_CODE
                        AND PRODUCTS.PROD_CMPY = CUSTOMER_PRODUCTS_VW.PROD_CMPY
                ) ALL_PRODS,
                GUI_ALLOCATION_ITEMS
                , UNIT_SCALE_VW					aunit
                WHERE 
                    ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
                    AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND ALL_PRODS.ALLOC_INDEX = GUI_ALLOCATION_ITEMS.AITEM_INDEX(+)
                    AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
                    AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
                    AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND NVL(GUI_ALLOCATION_ITEMS.AITEM_PRODUNIT, 5) = aunit.UNIT_ID
                ORDER BY AITEM_QTYLIMIT DESC NULLS LAST, PROD_CODE
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':supplier', $this->supplier);
                oci_bind_by_name($stmt, ':customer', $this->customer);
            } else {
                $query = "
                SELECT
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_INDEX, ALL_PRODS.ALLOC_INDEX) AITEM_INDEX,
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
                    NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
                    NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
                    NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
                    NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
                    NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
                    PROD_CMPY                      AITEM_PRODCMPY,
                    PROD_OWNER                     AITEM_PRODOWNER,
                    NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
                    NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
                    NVL(AITEM_QTYLIMIT, NULL) AITEM_QTYLIMIT,
                    NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
                    NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
                    NVL(AITEM_PRODUNIT, 5) AITEM_PRODUNIT,
                    NVL(AITEM_UNITNAME, 'l (amb)') AITEM_UNITNAME2,
                    aunit.DESCRIPTION  AITEM_UNITNAME,
                    NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
                FROM
                (
                    SELECT distinct PROD_CODE,
                        PROD_CMPY,
                        PROD_NAME,
                        PROD_OWNER,
                        NULL ALLOC_INDEX,
                        NULL ALLOC_TYPE,
                        NULL ALLOC_TYPENAME,
                        NULL ALLOC_CMPYCODE,
                        NULL ALLOC_CMPYNAME,
                        NULL ALLOC_SUPPCODE,
                        NULL ALLOC_SUPPNAME,
                        NULL ALLOC_LOCK,
                        NULL ALLOC_LOCKNAME,
                        NULL ALLOC_PERIOD
                    FROM SUPPLIER_PRODUCTS_VW PRODUCTS
                    WHERE PRODUCTS.PROD_CMPY = :supplier
                ) ALL_PRODS,
                GUI_ALLOCATION_ITEMS
                , UNIT_SCALE_VW					aunit
                WHERE 
                    ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
                    AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND ALL_PRODS.ALLOC_INDEX = GUI_ALLOCATION_ITEMS.AITEM_INDEX(+)
                    AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
                    AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
                    AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND NVL(GUI_ALLOCATION_ITEMS.AITEM_PRODUNIT, 5) = aunit.UNIT_ID
                ORDER BY AITEM_QTYLIMIT DESC NULLS LAST, PROD_CODE
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':supplier', $this->supplier);
            }
        } else {
            if (isset($this->customer) && $this->customer !== "null" && $serv->site_customer_product()) {
                $query = "
                SELECT
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_INDEX, ALL_PRODS.ALLOC_INDEX) AITEM_INDEX,
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
                    NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
                    NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
                    NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
                    NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
                    NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
                    PROD_CMPY                      AITEM_PRODCMPY,
                    PROD_OWNER                     AITEM_PRODOWNER,
                    NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
                    NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
                    NVL(AITEM_QTYLIMIT, NULL) AITEM_QTYLIMIT,
                    NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
                    NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
                    NVL(AITEM_PRODUNIT, 5) AITEM_PRODUNIT,
                    NVL(AITEM_UNITNAME, 'l (amb)') AITEM_UNITNAME2,
                    aunit.DESCRIPTION  AITEM_UNITNAME,
                    NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
                FROM
                (
                    SELECT distinct PRODUCTS.PROD_CODE,
                        PRODUCTS.PROD_CMPY,
                        PRODUCTS.PROD_NAME,
                        -- PRODUCTS.PROD_OWNER,
                        CUSTOMER.CUST_SUPP PROD_OWNER,
                        ALLOC_INDEX,
                        ALLOC_TYPE,
                        ALLOC_TYPENAME,
                        ALLOC_CMPYCODE,
                        ALLOC_CMPYNAME,
                        ALLOC_SUPPCODE,
                        ALLOC_SUPPNAME,
                        ALLOC_LOCK,
                        ALLOC_LOCKNAME,
                        ALLOC_PERIOD
                    FROM SUPPLIER_PRODUCTS_VW PRODUCTS, GUI_ALLOCATIONS, CUSTOMER_PRODUCTS_VW, CUSTOMER
                    WHERE PRODUCTS.PROD_CMPY = GUI_ALLOCATIONS.ALLOC_SUPPCODE
                        AND PRODUCTS.PROD_CODE = CUSTOMER_PRODUCTS_VW.PROD_CODE
                        AND PRODUCTS.PROD_CMPY = CUSTOMER_PRODUCTS_VW.PROD_CMPY
                        AND ALLOC_INDEX = :alloc_index
                        AND ALLOC_TYPE = :alloc_type
                        AND ALLOC_CMPYCODE = :alloc_cmpy
                        AND ALLOC_SUPPCODE = :alloc_supp
                        AND CUSTOMER.CUST_CODE = :customer
                        AND CUSTOMER_PRODUCTS_VW.CUST_ACCT = CUSTOMER.CUST_ACCT
                ) ALL_PRODS,
                GUI_ALLOCATION_ITEMS
                , UNIT_SCALE_VW					aunit
                WHERE ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
                    AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND ALL_PRODS.ALLOC_INDEX = GUI_ALLOCATION_ITEMS.AITEM_INDEX(+)
                    AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
                    AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
                    AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND NVL(GUI_ALLOCATION_ITEMS.AITEM_PRODUNIT, 5) = aunit.UNIT_ID
                ORDER BY AITEM_QTYLIMIT DESC NULLS LAST, PROD_CODE
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
                oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
                oci_bind_by_name($stmt, ':alloc_cmpy', $this->alloc_cmpycode);
                oci_bind_by_name($stmt, ':alloc_supp', $this->alloc_suppcode);
                oci_bind_by_name($stmt, ':customer', $this->customer);
            } else {
                $query = "
                SELECT
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_INDEX, ALL_PRODS.ALLOC_INDEX) AITEM_INDEX,
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
                    NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
                    NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
                    NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
                    NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
                    NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
                    PROD_CMPY                      AITEM_PRODCMPY,
                    PROD_OWNER                     AITEM_PRODOWNER,
                    NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
                    NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
                    NVL(AITEM_QTYLIMIT, NULL) AITEM_QTYLIMIT,
                    NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
                    NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
                    NVL(AITEM_PRODUNIT, 5) AITEM_PRODUNIT,
                    NVL(AITEM_UNITNAME, 'l (amb)') AITEM_UNITNAME2,
                    aunit.DESCRIPTION  AITEM_UNITNAME,
                    NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
                FROM
                (
                    SELECT distinct PROD_CODE,
                        PROD_CMPY,
                        PROD_NAME,
                        PROD_OWNER,
                        ALLOC_INDEX,
                        ALLOC_TYPE,
                        ALLOC_TYPENAME,
                        ALLOC_CMPYCODE,
                        ALLOC_CMPYNAME,
                        ALLOC_SUPPCODE,
                        ALLOC_SUPPNAME,
                        ALLOC_LOCK,
                        ALLOC_LOCKNAME,
                        ALLOC_PERIOD
                    FROM SUPPLIER_PRODUCTS_VW PRODUCTS, GUI_ALLOCATIONS
                    WHERE PRODUCTS.PROD_CMPY = GUI_ALLOCATIONS.ALLOC_SUPPCODE
                        AND ALLOC_INDEX = :alloc_index
                        AND ALLOC_TYPE = :alloc_type
                        AND ALLOC_CMPYCODE = :alloc_cmpy
                        AND ALLOC_SUPPCODE = :alloc_supp
                ) ALL_PRODS,
                GUI_ALLOCATION_ITEMS
                , UNIT_SCALE_VW					aunit
                WHERE ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
                    AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND ALL_PRODS.ALLOC_INDEX = GUI_ALLOCATION_ITEMS.AITEM_INDEX(+)
                    AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
                    AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
                    AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND NVL(GUI_ALLOCATION_ITEMS.AITEM_PRODUNIT, 5) = aunit.UNIT_ID
                ORDER BY AITEM_QTYLIMIT DESC NULLS LAST, PROD_CODE
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
                oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
                oci_bind_by_name($stmt, ':alloc_cmpy', $this->alloc_cmpycode);
                oci_bind_by_name($stmt, ':alloc_supp', $this->alloc_suppcode);
            }
        }   
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function items_no_exchange()
    {
        $serv = new SiteService($this->conn);
        //Because Reactjs can call carriers.php?customer=undefined, so undefined becomes a string
        
        if (isset($this->supplier)) {
            if (isset($this->customer) && $this->customer !== "null" && $serv->site_customer_product()) {
                $query = "
                SELECT
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_INDEX, ALL_PRODS.ALLOC_INDEX) AITEM_INDEX,
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
                    NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
                    NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
                    NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
                    NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
                    NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
                    NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
                    NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
                    NVL(AITEM_QTYLIMIT, NULL) AITEM_QTYLIMIT,
                    NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
                    NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
                    NVL(AITEM_PRODUNIT, 5) AITEM_PRODUNIT,
                    NVL(AITEM_UNITNAME, 'l (amb)') AITEM_UNITNAME2,
                    aunit.DESCRIPTION  AITEM_UNITNAME,
                    NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
                FROM
                (
                    SELECT distinct PRODUCTS.PROD_CODE,
                        PRODUCTS.PROD_CMPY,
                        PRODUCTS.PROD_NAME,
                        NULL ALLOC_INDEX,
                        NULL ALLOC_TYPE,
                        NULL ALLOC_TYPENAME,
                        NULL ALLOC_CMPYCODE,
                        NULL ALLOC_CMPYNAME,
                        NULL ALLOC_SUPPCODE,
                        NULL ALLOC_SUPPNAME,
                        NULL ALLOC_LOCK,
                        NULL ALLOC_LOCKNAME,
                        NULL ALLOC_PERIOD
                    FROM PRODUCTS, CUSTOMER_PRODUCTS_VW, CUSTOMER
                    WHERE PRODUCTS.PROD_CMPY = :supplier 
                        AND CUSTOMER_PRODUCTS_VW.CUST_ACCT = CUSTOMER.CUST_ACCT
                        AND CUSTOMER.CUST_CODE = :customer
                        AND PRODUCTS.PROD_CODE = CUSTOMER_PRODUCTS_VW.PROD_CODE
                        AND PRODUCTS.PROD_CMPY = CUSTOMER_PRODUCTS_VW.PROD_CMPY
                ) ALL_PRODS,
                GUI_ALLOCATION_ITEMS
                , UNIT_SCALE_VW					aunit
                WHERE 
                    ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
                    AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND ALL_PRODS.ALLOC_INDEX = GUI_ALLOCATION_ITEMS.AITEM_INDEX(+)
                    AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
                    AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
                    AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND NVL(GUI_ALLOCATION_ITEMS.AITEM_PRODUNIT, 5) = aunit.UNIT_ID
                ORDER BY AITEM_QTYLIMIT DESC NULLS LAST, PROD_CODE
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':supplier', $this->supplier);
                oci_bind_by_name($stmt, ':customer', $this->customer);
            } else {
                $query = "
                SELECT
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_INDEX, ALL_PRODS.ALLOC_INDEX) AITEM_INDEX,
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
                    NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
                    NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
                    NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
                    NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
                    NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
                    NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
                    NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
                    NVL(AITEM_QTYLIMIT, NULL) AITEM_QTYLIMIT,
                    NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
                    NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
                    NVL(AITEM_PRODUNIT, 5) AITEM_PRODUNIT,
                    NVL(AITEM_UNITNAME, 'l (amb)') AITEM_UNITNAME2,
                    aunit.DESCRIPTION  AITEM_UNITNAME,
                    NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
                FROM
                (
                    SELECT distinct PROD_CODE,
                        PROD_CMPY,
                        PROD_NAME,
                        NULL ALLOC_INDEX,
                        NULL ALLOC_TYPE,
                        NULL ALLOC_TYPENAME,
                        NULL ALLOC_CMPYCODE,
                        NULL ALLOC_CMPYNAME,
                        NULL ALLOC_SUPPCODE,
                        NULL ALLOC_SUPPNAME,
                        NULL ALLOC_LOCK,
                        NULL ALLOC_LOCKNAME,
                        NULL ALLOC_PERIOD
                    FROM PRODUCTS
                    WHERE PRODUCTS.PROD_CMPY = :supplier
                ) ALL_PRODS,
                GUI_ALLOCATION_ITEMS
                , UNIT_SCALE_VW					aunit
                WHERE 
                    ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
                    AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND ALL_PRODS.ALLOC_INDEX = GUI_ALLOCATION_ITEMS.AITEM_INDEX(+)
                    AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
                    AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
                    AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND NVL(GUI_ALLOCATION_ITEMS.AITEM_PRODUNIT, 5) = aunit.UNIT_ID
                ORDER BY AITEM_QTYLIMIT DESC NULLS LAST, PROD_CODE
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':supplier', $this->supplier);
            }
        } else {
            if (isset($this->customer) && $this->customer !== "null" && $serv->site_customer_product()) {
                $query = "
                SELECT
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_INDEX, ALL_PRODS.ALLOC_INDEX) AITEM_INDEX,
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
                    NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
                    NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
                    NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
                    NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
                    NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
                    NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
                    NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
                    NVL(AITEM_QTYLIMIT, NULL) AITEM_QTYLIMIT,
                    NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
                    NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
                    NVL(AITEM_PRODUNIT, 5) AITEM_PRODUNIT,
                    NVL(AITEM_UNITNAME, 'l (amb)') AITEM_UNITNAME2,
                    aunit.DESCRIPTION  AITEM_UNITNAME,
                    NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
                FROM
                (
                    SELECT distinct PRODUCTS.PROD_CODE,
                        PRODUCTS.PROD_CMPY,
                        PRODUCTS.PROD_NAME,
                        ALLOC_INDEX,
                        ALLOC_TYPE,
                        ALLOC_TYPENAME,
                        ALLOC_CMPYCODE,
                        ALLOC_CMPYNAME,
                        ALLOC_SUPPCODE,
                        ALLOC_SUPPNAME,
                        ALLOC_LOCK,
                        ALLOC_LOCKNAME,
                        ALLOC_PERIOD
                    FROM PRODUCTS, GUI_ALLOCATIONS, CUSTOMER_PRODUCTS_VW, CUSTOMER
                    WHERE PRODUCTS.PROD_CMPY = GUI_ALLOCATIONS.ALLOC_SUPPCODE
                        AND PRODUCTS.PROD_CODE = CUSTOMER_PRODUCTS_VW.PROD_CODE
                        AND PRODUCTS.PROD_CMPY = CUSTOMER_PRODUCTS_VW.PROD_CMPY
                        AND ALLOC_INDEX = :alloc_index
                        AND ALLOC_TYPE = :alloc_type
                        AND ALLOC_CMPYCODE = :alloc_cmpy
                        AND ALLOC_SUPPCODE = :alloc_supp
                        AND CUSTOMER.CUST_CODE = :customer
                        AND CUSTOMER_PRODUCTS_VW.CUST_ACCT = CUSTOMER.CUST_ACCT
                ) ALL_PRODS,
                GUI_ALLOCATION_ITEMS
                , UNIT_SCALE_VW					aunit
                WHERE ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
                    AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND ALL_PRODS.ALLOC_INDEX = GUI_ALLOCATION_ITEMS.AITEM_INDEX(+)
                    AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
                    AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
                    AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND NVL(GUI_ALLOCATION_ITEMS.AITEM_PRODUNIT, 5) = aunit.UNIT_ID
                ORDER BY AITEM_QTYLIMIT DESC NULLS LAST, PROD_CODE
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
                oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
                oci_bind_by_name($stmt, ':alloc_cmpy', $this->alloc_cmpycode);
                oci_bind_by_name($stmt, ':alloc_supp', $this->alloc_suppcode);
                oci_bind_by_name($stmt, ':customer', $this->customer);
            } else {
                $query = "
                SELECT
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_INDEX, ALL_PRODS.ALLOC_INDEX) AITEM_INDEX,
                    NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
                    NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
                    NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
                    NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
                    NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
                    NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
                    NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
                    NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
                    NVL(AITEM_QTYLIMIT, NULL) AITEM_QTYLIMIT,
                    NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
                    NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
                    NVL(AITEM_PRODUNIT, 5) AITEM_PRODUNIT,
                    NVL(AITEM_UNITNAME, 'l (amb)') AITEM_UNITNAME2,
                    aunit.DESCRIPTION  AITEM_UNITNAME,
                    NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
                FROM
                (
                    SELECT distinct PROD_CODE,
                        PROD_CMPY,
                        PROD_NAME,
                        ALLOC_INDEX,
                        ALLOC_TYPE,
                        ALLOC_TYPENAME,
                        ALLOC_CMPYCODE,
                        ALLOC_CMPYNAME,
                        ALLOC_SUPPCODE,
                        ALLOC_SUPPNAME,
                        ALLOC_LOCK,
                        ALLOC_LOCKNAME,
                        ALLOC_PERIOD
                    FROM PRODUCTS, GUI_ALLOCATIONS
                    WHERE PRODUCTS.PROD_CMPY = GUI_ALLOCATIONS.ALLOC_SUPPCODE
                        AND ALLOC_INDEX = :alloc_index
                        AND ALLOC_TYPE = :alloc_type
                        AND ALLOC_CMPYCODE = :alloc_cmpy
                        AND ALLOC_SUPPCODE = :alloc_supp
                ) ALL_PRODS,
                GUI_ALLOCATION_ITEMS
                , UNIT_SCALE_VW					aunit
                WHERE ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
                    AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND ALL_PRODS.ALLOC_INDEX = GUI_ALLOCATION_ITEMS.AITEM_INDEX(+)
                    AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
                    AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
                    AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
                    AND NVL(GUI_ALLOCATION_ITEMS.AITEM_PRODUNIT, 5) = aunit.UNIT_ID
                ORDER BY AITEM_QTYLIMIT DESC NULLS LAST, PROD_CODE
                ";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':alloc_index', $this->alloc_index);
                oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
                oci_bind_by_name($stmt, ':alloc_cmpy', $this->alloc_cmpycode);
                oci_bind_by_name($stmt, ':alloc_supp', $this->alloc_suppcode);
            }
        }   
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_allocation()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM LOCKAL 
            WHERE 
                LOCKATYP_AT_TYPE=:at_type 
                AND LOCKATYP_AT_CMPY=:at_cmpy 
                AND LOCKAL_SUPL=:supplier
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':at_type', $this->at_type);
        oci_bind_by_name($stmt, ':at_cmpy', $this->at_cmpy);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_multi_allocation()
    {
        $checkPeriod = false;
        if ($this->lock_type == "3" || $this->lock_type == "4") {
            $checkPeriod = true;
        }
        $checkOwner = false;
        // LOCKAL_OWNER is used in SUPPLIER and CUSTOMER base allocation
        if ($this->at_type == "1" || $this->at_type == "3") {
            $checkOwner = true;
        }

        $query = "
            SELECT COUNT(*) AS CNT 
            FROM LOCKAL 
            WHERE 
                LOCKATYP_AT_TYPE=:at_type 
                AND LOCKATYP_AT_CMPY=:at_cmpy 
                AND LOCKAL_SUPL=:supplier
                AND LOCKAL_LOCK = :lock_type
                AND (LOCKAL_LOCK!=3 OR LOCKAL_PERIOD = :period_type)
        ";
        if ($checkPeriod) {
            $query .= "AND LOCKAL_START_DMY = TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS') ";
            $query .= "AND LOCKAL_END_DMY = TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS') ";
        }
        if ($checkOwner) {
            $query .= "AND ((LOCKAL_OWNER IS NULL AND :owner IS NULL) OR LOCKAL_OWNER=:owner)";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':lock_type', $this->lock_type);
        oci_bind_by_name($stmt, ':period_type', $this->period_type);
        oci_bind_by_name($stmt, ':at_type', $this->at_type);
        oci_bind_by_name($stmt, ':at_cmpy', $this->at_cmpy);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if ($checkPeriod) {
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        if ($checkOwner) {
            oci_bind_by_name($stmt, ':owner', $this->owner);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_multi_allocation_no_owner()
    {
        $checkPeriod = true;

        $query = "
            SELECT COUNT(*) AS CNT 
            FROM LOCKAL 
            WHERE 
                LOCKATYP_AT_TYPE=:at_type 
                AND LOCKATYP_AT_CMPY=:at_cmpy 
                AND LOCKAL_SUPL=:supplier
                AND LOCKAL_LOCK = :lock_type
                AND (LOCKAL_LOCK!=3 OR LOCKAL_PERIOD = :period_type)
        ";
        if ($checkPeriod) {
            $query .= "AND LOCKAL_START_DMY = TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS') ";
            $query .= "AND LOCKAL_END_DMY = TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS') ";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':lock_type', $this->lock_type);
        oci_bind_by_name($stmt, ':period_type', $this->period_type);
        oci_bind_by_name($stmt, ':at_type', $this->at_type);
        oci_bind_by_name($stmt, ':at_cmpy', $this->at_cmpy);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if ($checkPeriod) {
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function next_alloc_index()
    {
        $query = "
            SELECT NVL(MAX(LOCKAL_INDEX), 0) + 1 NEXT_NO
            FROM LOCKAL 
            WHERE 
                LOCKATYP_AT_TYPE = :alloc_type 
                AND LOCKATYP_AT_CMPY = :alloc_cmpycode 
                AND LOCKAL_SUPL = :alloc_suppcode
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':alloc_suppcode', $this->alloc_suppcode);
        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->alloc_cmpycode);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function next_alloc_index_internal()
    {
        $query = "
            SELECT NVL(MAX(LOCKAL_INDEX), 0) + 1 NEXT_NO
            FROM LOCKAL 
            WHERE 
                LOCKATYP_AT_TYPE = :alloc_type 
                AND LOCKATYP_AT_CMPY = :alloc_cmpycode 
                AND LOCKAL_SUPL = :alloc_suppcode
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':alloc_suppcode', $this->alloc_suppcode);
        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->alloc_cmpycode);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['NEXT_NO'];
    }
}
