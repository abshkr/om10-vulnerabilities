<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class MovementReason extends CommonClass
{
    protected $TABLE_NAME = 'MOV_REASONS';
    
    public $NUMBER_FIELDS = array(
        "MVITM_PROD_QTY",
        "MVITM_QTY_SCHD",
        "MVITM_QTY_MOVE",
        "MVITM_QTY_DELV"
    );

    public $BOOLEAN_FIELDS = array(
        
    );

    public function types()
    {
        $service = new EnumService($this->conn);
        return $service->movement_types();
    }
    
    public function read()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            SELECT MR_ID,
                MR_ACTION,
                MR_TYPE,
                MOVITEM_TYPE_NAME MR_TYPE_NAME,
                MR_MOV_TYPE_ORI,
                MR_REASON_CODE_ORI,
                MR_MOV_TYPE_REV,
                MR_REASON_CODE_REV,
                MR_FLAG
            FROM MOV_REASONS,
                (SELECT MOVITEM_TYPE_ID, 
                DECODE(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') MOVITEM_TYPE_CODE, 
                MOVITEM_TYPE_NAME 
                FROM MOVITEM_TYPES)
            WHERE MR_TYPE = MOVITEM_TYPE_CODE(+)
            ORDER BY MR_ID
        ";
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