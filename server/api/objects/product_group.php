<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class ProductGroup
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
        Utilities::sanitize($this);

        $query = "
            SELECT PGR_CODE,
                PGR_DESCRIPTION,
                PGR_UNIT,
                PGR_CODE||' - '||PGR_DESCRIPTION AS PGR_TEXT
            FROM
                PRODUCT_GROUP
            ORDER BY PGR_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
