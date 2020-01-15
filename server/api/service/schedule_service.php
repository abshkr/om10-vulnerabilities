<?php

include_once __DIR__ . '/../shared/log.php';

class ScheduleService
{
    public function __construct($db, $auto_commit = false)
    {
        $this->conn = $db;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function is_trip_used($trip, $supplier)
    {
        $query = "
            SELECT COUNT(*) CN
            FROM SCHEDULE
            WHERE SHLS_TRIP_NO = :trip AND SHLS_SUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip', $trip);
        oci_bind_by_name($stmt, ':supplier', $supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return ($row['CN'] > 0);
    }

    public function shls_drawer($trip, $supplier)
    {
        $query = "
            SELECT SHLS_DRAWER
            FROM SCHEDULE
            WHERE SHLS_TRIP_NO = :trip AND SHLS_SUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip', $trip);
        oci_bind_by_name($stmt, ':supplier', $supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['SHLS_DRAWER'];
    }
}
