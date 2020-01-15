<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Device extends CommonClass
{
    protected $TABLE_NAME = 'ACCDEV';
    
    public $BOOLEAN_FIELDS = array(
        "ADV_LOCKOUT" => "Y",
        "ADV_PIN_PASS" => "Y",
    );
    
    public function read()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
        SELECT 
            ADV.ADV_CODE,
            ADV.ADV_DEVICE,
            ADV.ADV_PORT,
            ADV.ADV_AREA,
            ARC.AREA_NAME,
            ADV.ADV_LOCKOUT,
            ADV.ADV_PIN_PASS,
            ADV.ADV_SECURITY,
            ALT.AUTH_LEVEL_NAME,
            ADV.ADV_TYPE
        FROM 
        ACCDEV ADV,
        AUTH_LEVEL_TYP ALT,
        AREA_RC ARC
        WHERE ARC.AREA_K = ADV.ADV_AREA
        AND ALT.AUTH_LEVEL_ID = ADV.ADV_SECURITY";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}