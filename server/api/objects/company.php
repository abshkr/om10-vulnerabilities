<?php

include_once __DIR__ . '/../config/journal.php';
include_once __DIR__ . '/../config/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class Company
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function issuers()
    {
        //5 == issuer
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 5)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function drawers()
    {
        //5 == issuer
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 4)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function suppliers()
    {
        //5 == issuer
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 1)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function employers()
    {
        //5 == issuer
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 6)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function carriers()
    {
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 2)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
