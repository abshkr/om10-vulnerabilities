<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';

class TimeCode 
{
    // database connection and table name
    private $conn;

    public $tcd_title;
    public $tcd_mon; 
    public $tcd_tue; 
    public $tcd_wed;
    public $tcd_thu;
    public $tcd_fri;
    public $tcd_sat;
    public $tcd_sun;
    
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    function read()
    {
        Utilities::sanitize($this);
        
        $query = "
            SELECT TCD_TITLE,
                TCD_MON,
                TCD_TUE,
                TCD_WED,
                TCD_THU,
                TCD_FRI,
                TCD_SAT,
                TCD_SUN
            FROM TIMECODE
            WHERE TCD_TITLE = :tcd_title";        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tcd_title', $this->tcd_title);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    function update()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        $query = "UPDATE TIMECODE
                SET TCD_MON = :tcd_mon,
                    TCD_TUE = :tcd_tue,
                    TCD_WED = :tcd_wed,
                    TCD_THU = :tcd_thu,
                    TCD_FRI = :tcd_fri,
                    TCD_SAT = :tcd_sat,
                    TCD_SUN = :tcd_sun
                WHERE TCD_TITLE = :tcd_title";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tcd_title', $this->tcd_title);
        oci_bind_by_name($stmt, ':tcd_tue', $this->tcd_tue);
        oci_bind_by_name($stmt, ':tcd_mon', $this->tcd_mon);
        oci_bind_by_name($stmt, ':tcd_wed', $this->tcd_wed);
        oci_bind_by_name($stmt, ':tcd_thu', $this->tcd_thu);
        oci_bind_by_name($stmt, ':tcd_fri', $this->tcd_fri);
        oci_bind_by_name($stmt, ':tcd_sat', $this->tcd_sat);
        oci_bind_by_name($stmt, ':tcd_sun', $this->tcd_sun);

        if (!oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        return true;
    }
}