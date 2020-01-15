<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class LoadMeter extends CommonClass
{
    protected $TABLE_NAME = 'BA_METERS';
    protected $VIEW_NAME = 'BA_METERS';

    public function read()
    {
        $query = "
        SELECT BU.BAM_USAGE_NAME,
            BM.BAM_CODE,
            BT.BA_METER_ID,
            BT.BA_METER_NAME,
            BM.BAM_NAME,
            BM.BAM_MIN_FLOW,
            BM.BAM_MAX_FLOW,
            BM.BAM_KFA,
            BAM_KDATE_DMY BAM_LAST_MOD ,
            BAM_M_CURVE,
            BU.BAM_USAGE_ID,
            BQ.QTY_ID BAM_QTY_TYPE ,
            BQ.QTY_NAME BAM_QTY_TYPENAME 
        FROM BA_METERS BM,
            BAM_USAGE_TYP BU,
            QTY_TYP BQ,
            BA_METER_TYP BT 
        WHERE BM.BAM_USAGE = BU.BAM_USAGE_ID 
            AND BT.BA_METER_ID = BM.BAM_TYPE 
            AND BQ.QTY_ID = BM.BAM_QTY_TYPE 
            AND BU.BAM_USAGE_ID IN (1,2,3,7,8)
        ORDER BY BAM_CODE";
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