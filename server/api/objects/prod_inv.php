<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class ProdInv extends CommonClass
{
    protected $TABLE_NAME = 'TANKS';

    public $NUMBER_FIELDS = array(
        "NETVOL",
        "GROSSVOL",
        "USABLEVOL",
        "BOOKBALANCE"
    );

    // read personnel
    public function read()
    {
        $query = "
            SELECT BASE_PRODS.BASE_CODE BASE_CODE,
                BASE_PRODS.BASE_NAME BASE_NAME,
                SUM(TANK_COR_VOL * TANK_RPTVCF) NETVOL,
                SUM(TANK_AMB_VOL * TANK_RPTVCF) GROSSVOL,
                SUM(NVL(TANK_SAFE_CAPACITY,0) - NVL(TANK_TOTAL_VOL, (NVL(TANK_AMB_VOL,0) + NVL(TANK_WATER,0) + NVL(TANK_IFC,0)))) ULLAGE,
                SUM(TANK_LTR_CLOSE * TANK_RPTVCF) USABLEVOL,
                SUM(TANK_LTR_CLOSE * TANK_RPTVCFCLOSE + TANK_RCPT_VOL * TANK_RPTVCF - TANK_TRF_VOL * TANK_RPTVCF) BOOKBALANCE
            FROM TANKS, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
            GROUP BY BASE_CODE, BASE_NAME
            ORDER BY BASE_CODE
        ";

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
