<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class SiteConfig extends CommonClass
{
    protected $TABLE_NAME = 'SITE_CONFIG';

    public function read()
    {
        if (isset($this->config_required_by_gui)) {
            $query = "SELECT *
                FROM SITE_CONFIG
                WHERE CONFIG_REQUIRED_BY_GUI = :config_required_by_gui
                ORDER BY CONFIG_KEY";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':config_required_by_gui', $this->config_required_by_gui);
        } else {
            $query = "SELECT * FROM SITE_CONFIG ORDER BY CONFIG_KEY";
            $stmt = oci_parse($this->conn, $query);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        } else {
            return $stmt;
        }
    }
}
