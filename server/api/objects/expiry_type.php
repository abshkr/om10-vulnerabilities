<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class ExpiryTarget
{
    const TANKER = "TANKERS";
    const TRANSP_EQUIP = "TRANSP_EQUIP";
    const PERSONNEL = "PERSONNEL";
    const ALL = "%";
}

class ExpiryDateType extends CommonClass
{
    protected $TABLE_NAME = "EXPIRY_DATE_TYPES";

    public $BOOLEAN_FIELDS = array(
        "EDT_STATUS" => 1,
        "EDT_REJECT" => 1,
        "EDT_DEFAULT" => 1,
        "EDT_TIME_ENABLED" => 1,
    );

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
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read($target_code = ExpiryTarget::ALL)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT *
            FROM EXPIRY_DATE_TYPES
            WHERE EDT_TARGET_CODE LIKE :target_code
            ORDER BY EDT_TYPE_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->target_code)&& $this->target_code) {
            oci_bind_by_name($stmt, ':target_code', $this->target_code);
        } else {
            oci_bind_by_name($stmt, ':target_code', $target_code);
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
