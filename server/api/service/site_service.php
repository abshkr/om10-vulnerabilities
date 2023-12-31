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

    private function site_config_boolean($config_key, $default)
    {
        // write_log(sprintf("%s(%s, %s) START", __FUNCTION__, $config_key, $default), __FILE__, __LINE__);
        $query = "SELECT CONFIG_VALUE
            FROM SITE_CONFIG WHERE CONFIG_KEY = :config_key";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':config_key', $config_key);
        // oci_bind_by_name($stmt, ':default', $default);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $default;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row)
            return $row['CONFIG_VALUE'];

        return $default;
    }

    public function site_config_value($config_key, $default)
    {
        // write_log(sprintf("%s(%s, %s) START", __FUNCTION__, $config_key, $default), __FILE__, __LINE__);
        $query = "SELECT CONFIG_VALUE
            FROM SITE_CONFIG WHERE CONFIG_KEY = :config_key";
        $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':default', $default);
        oci_bind_by_name($stmt, ':config_key', $config_key);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $default;
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

    public function FA2_enabled()
    {
        $config_value = $this->site_config_boolean('SITE_2FA_ENABLED', 'N');
        return ($config_value === 'Y' || $config_value === 'y');
    }

    public function FA2_method()
    {
        return $this->site_config_value('SITE_2FA_METHOD', 'EMAIL');
    }

    public function site_customer_carrier()
    {
        $config_value = $this->site_config_boolean('SITE_CUSTOMER_CARRIER', 'N');
        return ($config_value === 'Y' || $config_value === 'y');
    }

    public function site_customer_product()
    {
        $config_value = $this->site_config_boolean('SITE_CUSTOMER_PRODUCT', 'N');
        return ($config_value === 'Y' || $config_value === 'y');
    }

    public function FA2_timeout()
    {
        return $this->site_config_value('SITE_2FA_TIMEOUT', '300');
    }

    public function reports_closeout_job()
    {
        $config_value = $this->site_config_boolean('REPORTS_CLOSEOUT_JOB', 'N');
        return ($config_value === 'Y' || $config_value === 'y');
    }

    private function set_closeout_user($user, $config_key)
    {
        $query = "SELECT COUNT(*) CN FROM SITE_CONFIG 
            WHERE CONFIG_KEY = :config_key";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':config_key', $config_key);

        $existing = false;
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } 
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ((int) $row['CN'] > 0) {
            $existing = true;
        }
        
        if ($existing) {
            $query = "UPDATE SITE_CONFIG SET CONFIG_VALUE = :config_value
                WHERE CONFIG_KEY = :config_key";
        } else {
            $query = "INSERT INTO SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE)
                VALUES (:config_key, :config_value)";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':config_value', $user);
        oci_bind_by_name($stmt, ':config_key', $config_key);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function set_closeout_freeze_user($user)
    {
        return $this->set_closeout_user($user, "NEXT_CLOSEOUT_FREEZE_USER");
    } 

    public function set_closeout_close_user($user)
    {
        return $this->set_closeout_user($user, "NEXT_CLOSEOUT_CLOSE_USER");
    } 
}
