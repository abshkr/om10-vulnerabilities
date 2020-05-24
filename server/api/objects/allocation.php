<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Allocation extends CommonClass
{
    protected $TABLE_NAME = 'LOCKAL';
    protected $VIEW_NAME = 'GUI_ALLOCATIONS';
    protected $primary_keys = array("lockatyp_at_type", "lockatyp_at_cmpy", "lockal_supl");
    
    protected $table_view_map = array(
        "LOCKATYP_AT_TYPE" => "ALLOC_TYPE",
        "LOCKATYP_AT_CMPY" => "ALLOC_CMPYCODE",
        "LOCKAL_SUPL" => "ALLOC_SUPPCODE",
        "LOCKAL_LOCK" => "ALLOC_LOCK",
        "LOCKAL_PERIOD" => "ALLOC_PERIOD",
    );

    public $NUMBER_FIELDS = array(
        "AITEM_QTYLIMIT",
        "AITEM_QTYUSED",
        "AITEM_QTYLEFT",
        "AITEM_PRODUNIT",
        "ALLOC_LOCK",
    );

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM GUI_ALLOCATION_ITEMS
            WHERE AITEM_TYPE = :aitem_type
                AND AITEM_CMPYCODE = :aitem_cmpycode
                AND AITEM_SUPPCODE = :aitem_suppcode";
        $stmt = oci_parse($this->conn, $query);
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
            $tank_max_flows[$flow_row['AITEM_PRODCODE']] = $flow_row;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $module = "allocation products";
        foreach ($old as $prod => $alloc_item) {
            if (isset($new[$prod]) &&
                $alloc_item['AITEM_QTYLIMIT'] != $new[$prod]['AITEM_QTYLIMIT']) {
                $record = sprintf("alloc type:%s, cmpy:%s, supp:%s, prod:%s",
                    $this->alloc_type, $this->alloc_cmpycode, $this->alloc_suppcode, $prod);
                $journal->valueChange($module, $record, "quantity allocated", $alloc_item['AITEM_QTYLIMIT'], $new[$prod]['AITEM_QTYLIMIT']);
            }

            if (!isset($new[$prod])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("alloc type:%s, cmpy:%s, supp:%s",
                    $this->alloc_type, $this->alloc_cmpycode, $this->alloc_suppcode);
                $jnl_data[3] = sprintf("product:%s", $prod);

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
                $jnl_data[2] = sprintf("alloc type:%s, cmpy:%s, supp:%s",
                    $this->alloc_type, $this->alloc_cmpycode, $this->alloc_suppcode);
                $jnl_data[3] = sprintf("product:%s", $prod);

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

    public function reset()
    {
        $query = "UPDATE ALLOCS
        SET ALLOC_LEFT = ALLOC_LIMIT
        WHERE ALL_ATKY_AT_TYPE = :alloc_type
            AND ALL_ATKY_AT_CMPY = :alloc_cmpycode
            AND ALL_PROD_PRODCMPY = :alloc_suppcode
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':alloc_suppcode', $this->alloc_suppcode);
        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':alloc_cmpycode', $this->alloc_cmpycode);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
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
        WHERE LOCKATYP_AT_TYPE = :aitem_type
            AND LOCKATYP_AT_CMPY = :aitem_cmpycode
            AND LOCKAL_SUPL = :aitem_suppcode
        ";
        $stmt = oci_parse($this->conn, $query);
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

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->allocs)) {
            return true;
        }
        
        foreach ($this->allocs as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            $query = "INSERT INTO ALLOCS (
                ALL_PROD_PRODCODE,
                ALL_PROD_PRODCMPY,
                ALLOC_LEFT,
                ALLOC_LIMIT,
                ALLOC_UNITS,
                ALL_ATKY_AT_TYPE,
                ALL_ATKY_AT_CMPY,
                ALLOC_PER_CHILD)
            VALUES (
                :aitem_prodcode,
                :aitem_suppcode,
                :aitem_qtylimit,
                :aitem_qtylimit,
                :aitem_produnit,
                :aitem_type,
                :aitem_cmpycode,
                NULL
            )";
            $stmt = oci_parse($this->conn, $query);
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

        $query = "
            DELETE FROM ALL_CHILD
            WHERE ALCH_ALP_ALL_PROD_PRODCMPY = :alloc_suppcode
                AND ALCH_ALP_ALL_ATKY_AT_TYPE = :alloc_type
                AND ALCH_ALP_ALL_ATKY_AT_CMPY = :alloc_cmpycode";
        $stmt = oci_parse($this->conn, $query);
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

        return true;
    }

    public function read()
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
        $query = "
            SELECT *
            FROM ALLOCATIONCHECK
            ORDER BY ACHECK_TYPE";
        $stmt = oci_parse($this->conn, $query);
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
        $query = "
        SELECT NVL(GUI_ALLOCATION_ITEMS.AITEM_TYPE, ALL_PRODS.ALLOC_TYPE) AITEM_TYPE,
            NVL(AITEM_TYPENAME, ALLOC_TYPENAME) AITEM_TYPENAME,
            NVL(AITEM_CMPYCODE, ALLOC_CMPYCODE) AITEM_CMPYCODE,
            NVL(AITEM_CMPYNAME, ALLOC_CMPYNAME) AITEM_CMPYNAME,
            NVL(AITEM_PRODCODE, PROD_CODE) AITEM_PRODCODE,
            NVL(AITEM_PRODNAME, PROD_NAME) AITEM_PRODNAME,
            NVL(AITEM_SUPPCODE, ALLOC_SUPPCODE) AITEM_SUPPCODE,
            NVL(AITEM_SUPPNAME, ALLOC_SUPPNAME) AITEM_SUPPNAME,
            NVL(AITEM_QTYLIMIT, 0) AITEM_QTYLIMIT,
            NVL(AITEM_QTYUSED, 0) AITEM_QTYUSED,
            NVL(AITEM_QTYLEFT, 0) AITEM_QTYLEFT,
            NVL(AITEM_PRODUNIT, AITEM_PRODUNIT) AITEM_PRODUNIT,
            NVL(AITEM_UNITNAME, AITEM_UNITNAME) AITEM_UNITNAME,
            NVL(AITEM_PERCHILD, ALLOC_PERIOD) AITEM_PERCHILD
        FROM
        (
            SELECT PROD_CODE,
                PROD_CMPY,
                PROD_NAME,
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
                AND ALLOC_TYPE = :alloc_type
                AND ALLOC_CMPYCODE = :alloc_cmpy
                AND ALLOC_SUPPCODE = :alloc_supp
        ) ALL_PRODS,
        GUI_ALLOCATION_ITEMS
        WHERE ALL_PRODS.PROD_CODE = GUI_ALLOCATION_ITEMS.AITEM_PRODCODE(+)
            AND ALL_PRODS.PROD_CMPY = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
            AND ALL_PRODS.ALLOC_TYPE = GUI_ALLOCATION_ITEMS.AITEM_TYPE(+)
            AND ALL_PRODS.ALLOC_CMPYCODE = GUI_ALLOCATION_ITEMS.AITEM_CMPYCODE(+)
            AND ALL_PRODS.ALLOC_SUPPCODE = GUI_ALLOCATION_ITEMS.AITEM_SUPPCODE(+)
        ORDER BY AITEM_QTYLIMIT DESC, PROD_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':alloc_type', $this->alloc_type);
        oci_bind_by_name($stmt, ':alloc_cmpy', $this->alloc_cmpycode);
        oci_bind_by_name($stmt, ':alloc_supp', $this->alloc_suppcode);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
