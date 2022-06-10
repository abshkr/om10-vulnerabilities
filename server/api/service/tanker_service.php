<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/order_service.php';
include_once __DIR__ . '/site_service.php';

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

    // will return tnkr_name as null for quick fix as Shell customers want to see tanker code only
    // will add a setting in SITE_CONFIG to control
    public function tankers_by_carrier($carrier = null)
    {
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_HIDE_ARCHIVE_TANKER", "N");
        $archive_flag = ($config_value === 'Y' || $config_value === 'y');
        $archive_cond = "";
        if ($archive_flag) { 
            // hide the archived tanker
            $archive_cond = " AND TNKR_ARCHIVE != 'Y' ";
        }

        if (isset($carrier)) {
            $query = "
                SELECT TNKR_CODE, NULL as TNKR_NAME, TNKR_ACTIVE, TNKR_LOCK, TNKR_ARCHIVE, TNKR_BAY_LOOP_CH
                FROM GUI_TANKERS
                WHERE TNKR_CARRIER = :carrier $archive_cond
                ORDER BY TNKR_CODE ASC";
            // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':carrier', $carrier);
        } else {
            $query = "
                SELECT TNKR_CODE, NULL as TNKR_NAME, TNKR_ACTIVE, TNKR_LOCK, TNKR_ARCHIVE, TNKR_BAY_LOOP_CH
                FROM GUI_TANKERS
                WHERE 1 = 1 $archive_cond
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

    // backup for future use
    public function tankers_by_carrier_withname($carrier = null)
    {
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_HIDE_ARCHIVE_TANKER", "N");
        $archive_flag = ($config_value === 'Y' || $config_value === 'y');
        $archive_cond = "";
        if ($archive_flag) { 
            // hide the archived tanker
            $archive_cond = " AND TNKR_ARCHIVE != 'Y' ";
        }

        if (isset($carrier)) {
            $query = "
                SELECT TNKR_CODE, TNKR_NAME, TNKR_ACTIVE, TNKR_LOCK, TNKR_ARCHIVE, TNKR_BAY_LOOP_CH
                FROM GUI_TANKERS
                WHERE TNKR_CARRIER = :carrier $archive_cond
                ORDER BY TNKR_CODE ASC";
            // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':carrier', $carrier);
        } else {
            $query = "
                SELECT TNKR_CODE, TNKR_NAME, TNKR_ACTIVE, TNKR_LOCK, TNKR_ARCHIVE, TNKR_BAY_LOOP_CH
                FROM GUI_TANKERS
                WHERE 1 = 1 $archive_cond
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
