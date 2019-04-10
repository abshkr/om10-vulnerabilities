<?php

include_once __DIR__ . '/../config/journal.php';
include_once __DIR__ . '/../config/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class Terminal
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "
            SELECT TERM_CODE, TERM_NAME, TERM_CODE||' - '||TERM_NAME AS TERM_DESC
            FROM TERMINAL ORDER BY TERM_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
