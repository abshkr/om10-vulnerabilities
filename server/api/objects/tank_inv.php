<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class TankInv extends CommonClass
{
    protected $TABLE_NAME = 'TANKS';

    public $NUMBER_FIELDS = array(
        "NETVOL",
        "GROSSVOL",
        "TANK_TEMP",
        "TANK_PROD_LVL",
        "PUMPABLEVOL",
        "USABLEVOL",
        "BOOKBALANCE"
    );

    // read personnel
    public function read()
    {
        $query = "
            SELECT TANKS.TANK_CODE TANK_CODE,
                TANKS.TANK_LOCATION TANK_LOCATION,
                BASE_PRODS.BASE_NAME BASE_NAME,
                TANKS.TANK_PROD_LVL TANK_PROD_LVL,
                TANKS.TANK_TEMP TANK_TEMP,
                TANK_COR_VOL * TANK_RPTVCF NETVOL,
                TANK_AMB_VOL * TANK_RPTVCF GROSSVOL,
                TANK_PUMP_VOL PUMPABLEVOL,
                TANK_LTR_CLOSE * TANK_RPTVCF USABLEVOL,
                (TANK_LTR_CLOSE * TANK_RPTVCFCLOSE + TANK_RCPT_VOL * TANK_RPTVCF - TANK_TRF_VOL * TANK_RPTVCF) BOOKBALANCE
            FROM TANKS, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
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
}
