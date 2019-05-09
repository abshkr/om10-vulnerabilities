<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';

class FlowRate
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    public function read()
    {
        $query = "
            SELECT FLOW_RATES.TANK_CODE,
                BAD_PHYSCODE,
                BAA_CODE,
                BAM_CODE,
                FLOWING,
                HIGH_FLOW_STATE,
                FLOW_CONTRIBUTION,
                CURRENT_FLOW_RATE,
                PRESET,
                LOADED_QTY, BASE_CODE, BASE_NAME
            FROM FLOW_RATES, TANKS, BASE_PRODS
            WHERE FLOW_RATES.TANK_CODE = TANKS.TANK_CODE AND TANK_BASE = BASE_CODE
            ORDER BY FLOW_RATES.TANK_CODE, BAA_CODE, BAM_CODE";

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
