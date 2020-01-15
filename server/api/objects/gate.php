<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Gate extends CommonClass
{
    protected $TABLE_NAME = 'GATE_RC';
    
    public function read()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
        SELECT
            GATE_RC.GATE_K,
            GATE_RC.GATE_DVCE,
            KRD_CFG.KRDC_TYPE,
            AREA_RC.AREA_K,
            AREA_RC.AREA_NAME,
            G_TCD
        FROM GATE_RC, AREA_RC, KRD_CFG
        WHERE GATE_RC.GATE_AREA = AREA_RC.AREA_K(+) 
            AND GATE_RC.GATE_DVCE = KRD_CFG.KRDC_NAME(+)
        ORDER BY GATE_K";
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