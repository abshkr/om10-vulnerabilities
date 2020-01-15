<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/order_service.php';

class TankerService
{
    public function __construct($db, $tnkr_code = null, $auto_commit = false)
    {
        $this->conn = $db;
        $this->tnkr_code = $tnkr_code;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function tankers_by_carrier($carrier = null)
    {
        if (isset($carrier)) {
            $query = "
                SELECT TNKR_CODE, TNKR_NAME
                FROM GUI_TANKERS
                WHERE TNKR_CARRIER = :carrier
                ORDER BY TNKR_CODE ASC";
            // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':carrier', $carrier);
        } else {
            $query = "
                SELECT TNKR_CODE, TNKR_NAME
                FROM GUI_TANKERS
                ORDER BY TNKR_CODE ASC";
            // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
            $stmt = oci_parse($this->conn, $query);
        }
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
