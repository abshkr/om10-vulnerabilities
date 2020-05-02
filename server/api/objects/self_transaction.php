<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

//Old php: amfphp APATransactionService.php
class SelfTransaction extends CommonClass
{
    protected $TABLE_NAME = 'INTERFACE_TRANS';

    public function read()
    {
        if (isset($this->start_date) && isset($this->end_date)) {
            $query = "
                SELECT * FROM INTERFACE_TRANS
                WHERE TRAN_DATE > :start_date AND TRAN_DATE < :end_date
                ORDER BY TRAN_DATE DESC";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        } else {
            $query = "
            SELECT * FROM INTERFACE_TRANS
            ORDER BY TRAN_DATE DESC";
            $stmt = oci_parse($this->conn, $query);
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
