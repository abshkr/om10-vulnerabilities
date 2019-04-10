<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';

class SiteBal 
{
    // database connection and table name
    private $conn;

    public $tankcode; 
    public $productcode; 
    public $productname; 
    public $tank_density;
    public $openingstock;
    public $receiptsvol; 
    public $accnttot;
    public $transfervol;
    public $bookbalance;
    public $closingstock;
    public $gainloss;
    
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    function read()
    {
        $query = "
            SELECT T.TANK_CODE TANKCODE, 
                BP.BASE_CODE PRODUCTCODE, 
                BP.BASE_NAME PRODUCTNAME, 
                NVL(T.TANK_DENSITY, 0.0) TANK_DENSITY, 
                NVL(T.TANK_LTR_CLOSE, 0.0)*NVL(T.TANK_RPTVCFCLOSE, 1) OPENINGSTOCK, 
                NVL(T.TANK_RCPT_VOL, 0.0)*NVL(T.TANK_RPTVCF, 1) RECEIPTSVOL, 
                NVL(T.TANK_LTR_CLOSE, 0.0)*NVL(T.TANK_RPTVCFCLOSE, 1) + NVL(TANK_RCPT_VOL, 0.0)*NVL(T.TANK_RPTVCF, 1) ACCNTTOT, 
                NVL(T.TANK_TRF_VOL, 0.0)*NVL(T.TANK_RPTVCF, 1) TRANSFERVOL, 
                NVL(T.TANK_LTR_CLOSE, 0.0)*NVL(T.TANK_RPTVCFCLOSE, 1) + NVL(T.TANK_RCPT_VOL, 0.0)*NVL(T.TANK_RPTVCF, 1) - NVL(T.TANK_TRF_VOL, 0.0) * NVL(T.TANK_RPTVCF, 1) BOOKBALANCE, 
                NVL(T.TANK_COR_VOL, 0.0)*NVL(T.TANK_RPTVCF, 1) CLOSINGSTOCK, 
                NVL(T.TANK_COR_VOL, 0.0)*NVL(T.TANK_RPTVCF, 1) - NVL(T.TANK_LTR_CLOSE, 0.0)*NVL(T.TANK_RPTVCFCLOSE, 1) - NVL(T.TANK_RCPT_VOL, 0.0) * NVL(T.TANK_RPTVCF, 1)
                + NVL(T.TANK_TRF_VOL, 0.0)*NVL(T.TANK_RPTVCF, 1) GAINLOSS
            FROM TANKS T, BASE_PRODS BP
            WHERE BP.BASE_CODE = T.TANK_BASE 
            ORDER BY TANKCODE";        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}