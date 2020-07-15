<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class Site extends CommonClass
{
    protected $TABLE_NAME = 'SITE';

    public $NUMBER_FIELDS = array(
        "SITE_AL_ADJ",
        "SITE_CL_ADJ",
        "SITE_KG_ADJ"
    );

    public function read()
    {
        $query = "
            SELECT SITE_AL_ADJ,
                SITE_CL_ADJ,
                SITE_KG_ADJ
            FROM SITE
        ";
            $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_site()
    {
        $query = "
            SELECT * FROM SITE
        ";
            $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pre_update()
    {
        if (!isset($this->site_code)) {
            $query = "SELECT SITE_CODE FROM SITE";
            $stmt = oci_parse($this->conn, $query);
            if (oci_execute($stmt, $this->commit_mode)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                $this->site_code = $row['SITE_CODE'];
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }
    }
}
