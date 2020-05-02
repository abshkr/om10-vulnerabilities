<?php

include_once __DIR__ . '/../shared/log.php';

class SiteService
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

    public function site_code()
    {
        $query = "SELECT SITE_CODE FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['SITE_CODE'];
    }

    public function site_config_boolean($config_key, $default)
    {
        // write_log(sprintf("%s, %s", $config_key, $default), LogLevel::ERROR);
        $query = "SELECT CONFIG_VALUE
            FROM SITE_CONFIG WHERE CONFIG_KEY = :config_key";
        $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':default', $default);
        oci_bind_by_name($stmt, ':config_key', $config_key);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row)
            return $row['CONFIG_VALUE'];

        return $default;
    }

    public function site_config($config_key, $default)
    {
        $query = "SELECT NVL(MAX(CONFIG_VALUE), :default)
            FROM SITE_CONFIG WHERE CONFIG_KEY = :config_key";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':default', $default);
        oci_bind_by_name($stmt, ':config_key', $config_key);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        return $stmt;
    }

    public function site_carrier_printer()
    {
        $config_value = $this->site_config_boolean('SITE_CARRIER_PRINTER', 'N');
        return ($config_value === 'Y' || $config_value === 'y');
    }
}
