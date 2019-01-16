<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';

class ProdInv 
{
    // database connection and table name
    private $conn;

    public $base_code;
    public $base_name;
    public $netvol;
    public $grossvol;
    public $usablevol;
    public $bookbalance;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    function read()
    {
        $query = "
            SELECT BASE_PRODS.BASE_CODE BASE_CODE,
                BASE_PRODS.BASE_NAME BASE_NAME,
                SUM(TANK_COR_VOL * TANK_RPTVCF) NETVOL,
                SUM(TANK_AMB_VOL * TANK_RPTVCF) GROSSVOL,
                SUM(TANK_LTR_CLOSE * TANK_RPTVCF) USABLEVOL,
                SUM(TANK_LTR_CLOSE * TANK_RPTVCFCLOSE + TANK_RCPT_VOL * TANK_RPTVCF - TANK_TRF_VOL * TANK_RPTVCF) BOOKBALANCE
            FROM TANKS, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
            GROUP BY BASE_CODE, BASE_NAME
            ORDER BY BASE_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}