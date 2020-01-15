<?php

include_once __DIR__ . '/../shared/log.php';

class OrderService
{
    public function __construct($db, $order_no = 0, $auto_commit = false)
    {
        $this->conn = $db;
        $this->order_no = $order_no;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function is_cust_order_used($cust_order)
    {
        $query = "
            SELECT COUNT(*) CN
            FROM CUST_ORDER
            WHERE ORDER_CUST_ORDNO = :order_cust_ordno";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_cust_ordno', $cust_order);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return ($row['CN'] > 0);
    }
}
