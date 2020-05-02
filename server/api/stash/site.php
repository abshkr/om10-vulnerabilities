<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class Site
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //1: Legacy Expiry Date only; 2: New Generic Expiry Date Types; 3: Both
    public function expiryMode()
    {
        $query = "
            SELECT CONFIG_VALUE
            FROM SITE_CONFIG
            WHERE CONFIG_KEY = 'SITE_EXPIRY_DATE_MANAGE_MODE'";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CONFIG_VALUE'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }
}
