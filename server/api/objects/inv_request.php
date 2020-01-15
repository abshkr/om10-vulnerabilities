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

    // read personnel
    public function read()
    {
        $query = "
        SELECT TKRQ_DEPOT,
            TKRQ_ALLFLAG,
            TKRQ_DUE,
            TKRQ_PERIOD,
            RQ_PERIOD_NAME,
            TKRQ_TYPE,
            RQ_NAME,
            TKRQ_FIRST
        FROM TKINVRQ, RQ_TYP, RQ_PERIOD_TYP
        WHERE TKRQ_TYPE = RQ_ID AND TKRQ_PERIOD = RQ_PERIOD_ID
        ORDER BY TKRQ_DUE DESC";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}
