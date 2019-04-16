<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class ExpiryTarget
{
    const TANKER = "TANKERS";
    const TRANSP_EQUIP = "TRANSP_EQUIP";
    const PERSONNEL = "PERSONNEL";
    const ALL = "%";
}

class ExpiryDateType
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readSimple($target_code = ExpiryTarget::ALL)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT EDT_TYPE_CODE
            FROM EXPIRY_DATE_TYPES
            WHERE EDT_TARGET_CODE LIKE :target_code
            ORDER BY EDT_TYPE_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':target_code', $target_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read($target_code = ExpiryTarget::ALL)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT EDT_TARGET_CODE,
                EDT_TYPE_CODE,
                EDT_TYPE_DESC,
                EDT_DEF_EXP_DATE,
                EDT_DATE_FMT,
                EDT_TIME_ENABLED,
                EDT_STATUS,
                EDT_REJECT,
                EDT_DEFAULT
            FROM EXPIRY_DATE_TYPES
            WHERE EDT_TARGET_CODE LIKE :target_code
            ORDER BY EDT_TYPE_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':target_code', $target_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
