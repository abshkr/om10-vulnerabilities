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
    protected $VIEW_NAME = "EXPIRY_DATE_TYPES";

    public $BOOLEAN_FIELDS = array(
        "EDT_STATUS" => 1,
        "EDT_REJECT" => 1,
        "EDT_DEFAULT" => 1,
        "EDT_TIME_ENABLED" => 1,
    );

    public $NUMBER_FIELDS = array(
        "CHILD_COUNT",
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
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read($target_code = ExpiryTarget::ALL)
    {
        $query = "SELECT EXPIRY_DATE_TYPES.*, 
                    DECODE(EDT_TARGET_CODE, 
                        'TANKERS', 'Expiry Dates For Tankers',
                        'PERSONNEL', 'Expiry Dates For Personnel',
                        'TRANSP_EQUIP', 'Expiry Dates For Equipment',
                        'Unknown') EDT_TARGET_DESC,
                    DECODE(COUNT(*), 1, 0, COUNT(*)) CHILD_COUNT
                FROM EXPIRY_DATE_TYPES, EXPIRY_DATE_DETAILS
                WHERE EDT_TARGET_CODE LIKE :target_code
                    AND ED_TYPE_CODE(+) = EDT_TYPE_CODE
                GROUP BY EDT_TARGET_CODE,
                    EDT_TYPE_CODE,
                    EDT_TYPE_DESC,
                    EDT_DEF_EXP_DATE,
                    EDT_DATE_FMT,
                    EDT_TIME_ENABLED,
                    EDT_STATUS,
                    EDT_REJECT,
                    EDT_DEFAULT
                ORDER BY EDT_TARGET_CODE, EDT_TYPE_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->target_code)&& $this->target_code) {
            oci_bind_by_name($stmt, ':target_code', $this->target_code);
        } else {
            oci_bind_by_name($stmt, ':target_code', $target_code);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function check_deletable()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        $query = "SELECT EDT_DEFAULT FROM EXPIRY_DATE_TYPES 
            WHERE EDT_TARGET_CODE = :edt_target_code AND EDT_TYPE_CODE = :edt_type_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':edt_type_code', $this->edt_type_code);
        oci_bind_by_name($stmt, ':edt_target_code', $this->edt_target_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['EDT_DEFAULT'] == 1) {
            throw new UndeletableException(sprintf("Expiry type %s cannot be deleted because it is predefined type", $this->edt_type_code));
        }

        $query = "SELECT COUNT(*) CN FROM EXPIRY_DATE_DETAILS 
            WHERE ED_TARGET_CODE = :ed_target_code AND ED_TYPE_CODE = :ed_type_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ed_type_code', $this->edt_type_code);
        oci_bind_by_name($stmt, ':ed_target_code', $this->edt_target_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] > 0) {
            throw new UndeletableException(sprintf("Expiry type %s cannot be deleted because it is being used", $this->edt_type_code));
        }
    }
}
