<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

//Old php: amfphp PhysicalPrinterService
class PhysicalPrinter extends CommonClass
{
    public $desc = "physical printer";

    protected $VIEW_NAME = "PRINTER";
    protected $TABLE_NAME = "PRINTER";

    public $BOOLEAN_FIELDS = array(
        "PRNTR_LOCK" => "Y",
    );

    protected $primary_keys = array(    
        "prntr"
    );

    // read personnel
    public function read()
    {
        $query = "
            SELECT P.PRNTR, 
                P.SYS_PRNTR, 
                NVL(P.PRNTR_LOCK, 'N') AS PRNTR_LOCK, 
                NVL(P.PRNTR_AREA, '') AS PRNTR_AREA, 
                A.AREA_NAME
            FROM
                PRINTER P,
                AREA_RC A
            WHERE
                P.PRNTR_AREA = A.AREA_K(+)
            ORDER BY P.PRNTR";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
