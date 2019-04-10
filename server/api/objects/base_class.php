<?php

include_once __DIR__ . '/../config/journal.php';
include_once __DIR__ . '/../config/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class BaseClass
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //Because base cannot be too many, do not do limit
    public function read()
    {
        // if (!isset($this->end_num)) {
        //     $this->start_num = 1;
        //     $this->end_num = $this->count();
        // }

        Utilities::sanitize($this);

        $query = "
            SELECT
                BCLASS_NO,
                NVL(BCLASS_NAME, BCLASS_DESC) AS BCLASS_DESC,
                BCLASS_DENS_LO,
                BCLASS_DENS_HI,
                BCLASS_VCF_ALG,
                BCLASS_TEMP_LO,
                BCLASS_TEMP_HI
            FROM BASECLASS, BCLASS_TYP
            WHERE BCLASS_NO > 0
                AND BCLASS_NO = BCLASS_ID(+)
            ORDER BY BCLASS_NO";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
