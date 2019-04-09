<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';

class Metering 
{
    // database connection and table name
    private $conn;

    public $metercode; 
    public $metertype; 
    public $metertypename; 
    public $observedvolume;
    public $standardvolume;
    public $mass; 
    
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    // select * from BA_METER_TYP;
    // BA_METER_ID BA_METER_NAME  
    // ----------- ---------------
    //           0 *****          
    //           1 TURBINE        
    //           2 P-D            
    //           3 MASS     
    function read()
    {   
        Utilities::sanitize($this);
        $query = "
            SELECT BAM_CODE MeterCode, 
                BAM_TYPE MeterType,
                BA_METER_TYP.BA_METER_NAME MeterTypeName,
                BAM_LAST_ATOTAL ObservedVolume,
                BAM_LAST_CTOTAL StandardVolume,
                BAM_LAST_MTOTAL Mass 
            FROM BA_METERS, BA_METER_TYP 
            WHERE BA_METERS.BAM_TYPE = BA_METER_TYP.BA_METER_ID
                AND BA_METERS.BAM_CODE != 'NONE'
            ORDER BY BAM_CODE";        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}