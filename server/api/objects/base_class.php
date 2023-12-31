<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class BaseClass extends CommonClass
{
    protected $TABLE_NAME = 'BASECLASS';

    public $NUMBER_FIELDS = array(
        "BCLASS_DENS_LO",
        "BCLASS_DENS_HI",
        "BCLASS_TEMP_LO",
        "BCLASS_TEMP_HI",
    );
    
    //Because base cannot be too many, do not do limit
    public function read()
    {
        // if (!isset($this->end_num)) {
        //     $this->start_num = 1;
        //     $this->end_num = $this->count();
        // }

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
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
