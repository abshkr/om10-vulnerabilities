<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class MeterDevice extends CommonClass
{
    protected $TABLE_NAME = 'METERTD';

    public $BOOLEAN_FIELDS = array(
        "TKRQ_ALLFLAG" => "Y",
    );

    public $NUMBER_FIELDS = array(
        
    );

    public function inv_req_period_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->inv_req_period_types();
    }

    public function dest_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_movement_types();
    }

    public function source_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_movement_types();
    }

    public function types()
    {
        $serv = new EnumService($this->conn);
        return $serv->meter_device_types();
    }

    // read personnel
    public function read()
    {
        $query = "
        SELECT MTD_CODE,
            MTD_ADDRESS,
            MTD_SRC_TYPE,
            MTD_DST_TYPE,
            MTD_AMB,
            MTD_COR,
            MTD_POLL,
            MTD_TYPE,
            MTD_TYP.MTD_NAME MTD_TYPE_NAME,
            MTD_SRC_CODE,
            SRC.PMV_NAME SRC_NAME,
            MTD_DST_CODE,
            DST.PMV_NAME DST_NAME
        FROM METERTD, PMV_TYP SRC , PMV_TYP DST, MTD_TYP
        WHERE METERTD.MTD_TYPE = MTD_TYP.MTD_ID
            AND METERTD.MTD_SRC_CODE = SRC.PMV_ID
            AND METERTD.MTD_DST_CODE = DST.PMV_ID
        ORDER BY MTD_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}
