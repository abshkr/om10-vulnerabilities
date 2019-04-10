<?php

include_once __DIR__ . '/../config/journal.php';
include_once __DIR__ . '/../config/log.php';

class TankInv
{
    // database connection and table name
    private $conn;

    public $tank_code;
    public $tank_location;
    public $base_name;
    public $tank_prod_lvl;
    public $tank_temp;
    public $netvol;
    public $grossvol;
    public $pumpablevol;
    public $usablevol;
    public $bookbalance;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    public function read()
    {
        $query = "
            SELECT TANKS.TANK_CODE  TANK_CODE,
                TANKS.TANK_LOCATION  TANK_LOCATION,
                BASE_PRODS.BASE_NAME BASE_NAME,
                TANKS.TANK_PROD_LVL  TANK_PROD_LVL,
                TANKS.TANK_TEMP  TANK_TEMP,
                TANK_COR_VOL * TANK_RPTVCF NetVol,
                TANK_AMB_VOL * TANK_RPTVCF GrossVol,
                TANK_PUMP_VOL PumpableVol,
                TANK_LTR_CLOSE * TANK_RPTVCF UsableVol,
                (TANK_LTR_CLOSE * TANK_RPTVCFCLOSE + TANK_RCPT_VOL * TANK_RPTVCF - TANK_TRF_VOL * TANK_RPTVCF) BookBalance
            FROM TANKS, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
            ORDER BY TANK_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}
