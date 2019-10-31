<?php

include_once '../../shared/journal.php';
include_once '../../shared/log.php';

class RefreshTokens
{
    // database connection and table name
    private $conn;
    private $table_name = "REFRESH_TOKENS";

    // object properties
    public $per_code;
    public $token_str;
    public $expire_time;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function delete()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);
        $query = "
            DELETE FROM " . $this->table_name .
            " WHERE REFRESH_TOKEN = :refresh_token";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':refresh_token', $this->token_str);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("Delete refresh token failed:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function check()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);
        $query = "
            SELECT COUNT(*) TOTAL_ROWS FROM " . $this->table_name .
            " WHERE REFRESH_TOKEN = :refresh_token";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':refresh_token', $this->token_str);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return ($row['TOTAL_ROWS'] > 0);
        }

        write_log("Failed to count refresh token:" .
            oci_error($stmt)['message'], __FILE__, __LINE__);
        return false;
    }

    public function create()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        // query to insert record, expire in 2 hours
        $query = "INSERT INTO " . $this->table_name . "
                (PER_CODE,
                REFRESH_TOKEN,
                EXPIRY_TIME)
        VALUES (:per_code,
                :refresh_token,
                SYSDATE + 2/24)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $this->per_code);
        oci_bind_by_name($stmt, ':refresh_token', $this->token_str);

        if (!oci_execute($stmt)) {
            write_log("Create refresh token failed:" .
                oci_error($stmt)['message'], __FILE__, __LINE__);
            return false;
        }

        return true;
    }
}
