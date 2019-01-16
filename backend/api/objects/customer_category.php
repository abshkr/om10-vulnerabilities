<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../shared/utilities.php';

class CustomerCategory 
{
    // database connection and table name
    private $conn;

    public $category_code;
    public $category_name;
    
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read personnel
    function read()
    {
        $query = "
            SELECT 
                CATEG_CODE CATEGORY_CODE, 
                CATEG_DESCRIPT CATEGORY_NAME,
                NVL(CU.CATEG_COUNT, 0) CATEGORY_COUNT
            FROM 
                CST_PRCE_CATEGOR CG, 
                (
                SELECT CUST_CATEGORY, COUNT(*) CATEG_COUNT
                FROM CUSTOMER
                GROUP BY CUST_CATEGORY
                ) CU
            WHERE 
                CG.CATEG_CODE = CU.CUST_CATEGORY(+)";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }

    // pure php function
    function create()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "INSERT INTO CST_PRCE_CATEGOR 
                (CATEG_CODE,
                CATEG_DESCRIPT) 
        VALUES (:categ_code,
                :categ_descript)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        oci_bind_by_name($stmt, ':categ_descript', $this->category_name);

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

        $query = "UPDATE CST_PRCE_CATEGOR
                SET CATEG_DESCRIPT = :categ_descript
                WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        oci_bind_by_name($stmt, ':categ_descript', $this->category_name);

        if (!oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        return true;
    }

    function delete()
    {
        write_log(
            sprintf("%s::%s START. categ_code:%s", __CLASS__, __FUNCTION__, $this->category_code),
            __FILE__, __LINE__);

        Utilities::sanitize($this);
        
        $query = "DELETE FROM CST_PRCE_CATEGOR
                WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        
        if (!oci_execute($stmt)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        return true;
    }
}