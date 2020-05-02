<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class InvRequest extends CommonClass
{
    protected $TABLE_NAME = 'TKINVRQ';

    public $BOOLEAN_FIELDS = array(
        "TKRQ_ALLFLAG" => "Y",
        "TANK_INV_NEEDED" => "Y",
        "TANK_ADHOC_IVRQ" => "Y"
    );

    public $NUMBER_FIELDS = array(
        
    );

    public function inv_req_period_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->inv_req_period_types();
    }

    public function inv_request_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->inv_request_types();
    }

    public function tanks()
    {
        $query = "SELECT TANK_CODE,
                TANK_INV_NEEDED,
                TANK_ADHOC_IVRQ
            FROM TANKS
            ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }

    // read personnel
    public function read()
    {
        $query = "
        SELECT TKRQ_DEPOT,
            TKRQ_ALLFLAG,
            TKRQ_DUE,
            TKRQ_PERIOD,
            RQ_PERIOD_NAME TKRQ_PERIOD_NAME,
            TKRQ_TYPE,
            RQ_NAME TKRQ_TYPE_NAME,
            TKRQ_FIRST
        FROM TKINVRQ, RQ_TYP, RQ_PERIOD_TYP
        WHERE TKRQ_TYPE = RQ_ID AND TKRQ_PERIOD = RQ_PERIOD_ID
        ORDER BY TKRQ_DUE DESC";
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
