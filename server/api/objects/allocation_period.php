<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

//Old PHP: amfservices\core\services\AllocationPeriodService.php
class AllocationPeriod extends CommonClass
{
    protected $TABLE_NAME = 'ALL_CHILD';
    protected $VIEW_NAME = 'GUI_ALLOCATION_PERIODS';
    protected $view_keys = array("aiprd_type", "aiprd_cmpycode", "aiprd_prodcode", "aiprd_suppcode", "aiprd_index");
    
    protected $table_view_map = array(
        "ALCH_ALP_ALL_ATKY_AT_TYPE" => "AIPRD_TYPE",
        "ALCH_ALP_ALL_ATKY_AT_CMPY" => "AIPRD_CMPYCODE",
        "ALCH_ALP_ALL_PROD_PRODCODE" => "AIPRD_PRODCODE",
        "ALCH_ALP_ALL_PROD_PRODCMPY" => "AIPRD_SUPPCODE",
        "ALL_CHILD_P_NO" => "AIPRD_INDEX",
        "ALL_CH_STRT_DAY" => "AIPRD_DAYSTART",
        "ALL_CH_END_DAY" => "AIPRD_DAYEND",
        "ALL_CH_UNIT" => "AIPRD_PRODUNIT",
        "ALL_CH_QTY" => "AIPRD_QTYLIMIT",
    );

    public $NUMBER_FIELDS = array(
        "AIPRD_QTYLIMIT",
    );

    public $BOOLEAN_FIELDS = array(
        "ACTIVE" => "Y",
    );

    public function read()
    {
        $query = "
            SELECT GUI_ALLOCATION_PERIODS.*,
                (CASE WHEN AIPRD_DAYSTART < SYSDATE  AND AIPRD_DAYEND > SYSDATE THEN 'Y' ELSE 'N' END) ACTIVE
            FROM " . $this->VIEW_NAME . "
            WHERE AIPRD_TYPE = :aiprd_type
                AND AIPRD_CMPYCODE = :aiprd_cmpycode
                AND AIPRD_PRODCODE = :aiprd_prodcode
                AND AIPRD_SUPPCODE = :aiprd_suppcode
            ORDER BY AIPRD_TYPE, AIPRD_CMPYCODE, AIPRD_PRODCODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':aiprd_type', $this->aiprd_type);
        oci_bind_by_name($stmt, ':aiprd_cmpycode', $this->aiprd_cmpycode);
        oci_bind_by_name($stmt, ':aiprd_prodcode', $this->aiprd_prodcode);
        oci_bind_by_name($stmt, ':aiprd_suppcode', $this->aiprd_suppcode);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function post_create()
    {
        return $this->post_update();
    }

    protected function post_update()
    {
        $query = "SELECT SYSDATE FROM DUAL";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['SYSDATE'] >= $this->aiprd_daystart && $row['SYSDATE'] <= $this->aiprd_dayend) {
            $query = "SELECT NVL(ALLOC_PER_CHILD, -1) ALLOC_PER_CHILD
                FROM ALLOCS
                WHERE ALL_PROD_PRODCODE = :aiprd_prodcode
                    AND ALL_PROD_PRODCMPY = :aiprd_suppcode
                    AND ALL_ATKY_AT_TYPE = :aiprd_type 
                    AND ALL_ATKY_AT_CMPY = :aiprd_cmpycode";
            $stmt = oci_parse($this->conn, $query);
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':aiprd_type', $this->aiprd_type);
            oci_bind_by_name($stmt, ':aiprd_cmpycode', $this->aiprd_cmpycode);
            oci_bind_by_name($stmt, ':aiprd_prodcode', $this->aiprd_prodcode);
            oci_bind_by_name($stmt, ':aiprd_suppcode', $this->aiprd_suppcode);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $previous_used = false;
            if ($row['ALLOC_PER_CHILD'] > 0) {
                $previous_used = true;
            }

            write_log("Update ALLOCS as current allocation period", __FILE__, __LINE__, LogLevel::INFO);

            $query = "UPDATE ALLOCS
            SET ALLOC_PER_CHILD = :aiprd_index
            WHERE ALL_PROD_PRODCODE = :aiprd_prodcode
                AND ALL_PROD_PRODCMPY = :aiprd_suppcode
                AND ALL_ATKY_AT_TYPE = :aiprd_type 
                AND ALL_ATKY_AT_CMPY = :aiprd_cmpycode";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':aiprd_type', $this->aiprd_type);
            oci_bind_by_name($stmt, ':aiprd_cmpycode', $this->aiprd_cmpycode);
            oci_bind_by_name($stmt, ':aiprd_prodcode', $this->aiprd_prodcode);
            oci_bind_by_name($stmt, ':aiprd_suppcode', $this->aiprd_suppcode);
            oci_bind_by_name($stmt, ':aiprd_index', $this->aiprd_index);
            oci_bind_by_name($stmt, ':aiprd_qtylimit', $this->aiprd_qtylimit);
            oci_bind_by_name($stmt, ':aiprd_produnit', $this->aiprd_produnit);
            
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            if ($previous_used) {
                write_log("Update ALLOCS quantity", __FILE__, __LINE__, LogLevel::INFO);

                $query = "UPDATE ALLOCS
                SET ALLOC_LIMIT = :aiprd_qtylimit,
                    ALLOC_UNITS = :aiprd_produnit
                WHERE ALL_PROD_PRODCODE = :aiprd_prodcode
                    AND ALL_PROD_PRODCMPY = :aiprd_suppcode
                    AND ALL_ATKY_AT_TYPE = :aiprd_type 
                    AND ALL_ATKY_AT_CMPY = :aiprd_cmpycode";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':aiprd_type', $this->aiprd_type);
                oci_bind_by_name($stmt, ':aiprd_cmpycode', $this->aiprd_cmpycode);
                oci_bind_by_name($stmt, ':aiprd_prodcode', $this->aiprd_prodcode);
                oci_bind_by_name($stmt, ':aiprd_suppcode', $this->aiprd_suppcode);
                oci_bind_by_name($stmt, ':aiprd_index', $this->aiprd_index);
                oci_bind_by_name($stmt, ':aiprd_qtylimit', $this->aiprd_qtylimit);
                oci_bind_by_name($stmt, ':aiprd_produnit', $this->aiprd_produnit);
                
                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
            }
        }

        return true;
    }

    protected function post_delete()
    {
        $query = "UPDATE ALLOCS
        SET ALLOC_PER_CHILD = NULL
        WHERE ALL_PROD_PRODCODE = :aiprd_prodcode
            AND ALL_PROD_PRODCMPY = :aiprd_suppcode
            AND ALL_ATKY_AT_TYPE = :aiprd_type 
            AND ALL_ATKY_AT_CMPY = :aiprd_cmpycode
            AND ALLOC_PER_CHILD = :aiprd_index";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':aiprd_type', $this->aiprd_type);
        oci_bind_by_name($stmt, ':aiprd_cmpycode', $this->aiprd_cmpycode);
        oci_bind_by_name($stmt, ':aiprd_prodcode', $this->aiprd_prodcode);
        oci_bind_by_name($stmt, ':aiprd_suppcode', $this->aiprd_suppcode);
        oci_bind_by_name($stmt, ':aiprd_index', $this->aiprd_index);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
    }
}
