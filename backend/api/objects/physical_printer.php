<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';

class PhysicalPrinter 
{
    // database connection and table name
    private $conn;

    public $prntr;
    public $sys_prntr;
    public $prntr_lock;
    public $prntr_area;
    public $area_name;
    
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->prntr = '%';
        $this->sys_prntr = '%';
        $this->prntr_area = '%';
    }

    // read personnel
    function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT
                P.PRNTR
                , P.SYS_PRNTR
                , NVL(P.PRNTR_LOCK, 'N') AS PRNTR_LOCK
                , NVL(P.PRNTR_AREA, '') AS PRNTR_AREA
                , A.AREA_NAME
            FROM
                PRINTER P
                , AREA_RC A
            WHERE
                P.PRNTR_AREA = A.AREA_K(+)
                AND TO_CHAR(P.PRNTR) LIKE :prntr
                AND TO_CHAR(P.SYS_PRNTR) LIKE :sys_prntr
                AND TO_CHAR(P.PRNTR_AREA) LIKE :prntr_area
            ORDER BY P.PRNTR";        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        oci_bind_by_name($stmt, ':sys_prntr', $this->sys_prntr);
        oci_bind_by_name($stmt, ':prntr_area', $this->prntr_area);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    function create()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "INSERT INTO PRINTER (
            PRNTR,
            SYS_PRNTR,
            PRNTR_LOCK,
            PRNTR_AREA)
            VALUES (
            :prntr,
            :sys_prntr,
            :prntr_lock,
            :prntr_area
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        oci_bind_by_name($stmt, ':sys_prntr', $this->sys_prntr);
        oci_bind_by_name($stmt, ':prntr_lock', $this->prntr_lock);
        oci_bind_by_name($stmt, ':prntr_area', $this->prntr_area);
        
        if (!oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        return true;
    }

    function delete()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);
        
        Utilities::sanitize($this);

        $query = "DELETE FROM PRINTER 
            WHERE PRNTR = :prntr
                AND SYS_PRNTR = :sys_prntr
                AND PRNTR_LOCK = :prntr_lock
                AND PRNTR_AREA = :prntr_area";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        oci_bind_by_name($stmt, ':sys_prntr', $this->sys_prntr);
        oci_bind_by_name($stmt, ':prntr_lock', $this->prntr_lock);
        oci_bind_by_name($stmt, ':prntr_area', $this->prntr_area);
        
        if (!oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        return true;
    }

    function update()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "UPDATE PRINTER 
            SET SYS_PRNTR = :sys_prntr,
                PRNTR_LOCK = :prntr_lock,
                PRNTR_AREA = :prntr_area
            WHERE PRNTR = :prntr";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prntr', $this->prntr);
        oci_bind_by_name($stmt, ':sys_prntr', $this->sys_prntr);
        oci_bind_by_name($stmt, ':prntr_lock', $this->prntr_lock);
        oci_bind_by_name($stmt, ':prntr_area', $this->prntr_area);

        if (!oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        return true;
    }
}