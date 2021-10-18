<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Metering extends CommonClass
{
    protected $TABLE_NAME = 'BA_METERS';

    protected $primary_keys = array(
        "bam_code"
    );
    
    public $NUMBER_FIELDS = array(
        "OBSERVEDVOLUME",
        "STANDARDVOLUME",
        "MASS"
    );

    // read personnel
    // select * from BA_METER_TYP;
    // BA_METER_ID BA_METER_NAME
    // ----------- ---------------
    //           0 *****
    //           1 TURBINE
    //           2 P-D
    //           3 MASS
    public function read()
    {
        $query = "
            SELECT BAM_CODE METERCODE,
                BAM_TYPE METERTYPE,
                BA_METER_TYP.BA_METER_NAME METERTYPENAME,
                BAM_LAST_ATOTAL OBSERVEDVOLUME,
                BAM_LAST_CTOTAL STANDARDVOLUME,
                BAM_LAST_MTOTAL MASS
            FROM BA_METERS, BA_METER_TYP
            WHERE BA_METERS.BAM_TYPE = BA_METER_TYP.BA_METER_ID
                AND BA_METERS.BAM_CODE != 'NONE'
            ORDER BY BAM_CODE";
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
