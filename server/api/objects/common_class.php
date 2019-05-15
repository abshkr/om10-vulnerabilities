<?php

include_once __DIR__ . '/../shared/log.php';

class CommonClass
{
    // database connection and table name
    protected $conn;

    //before update/insert, if to check manndatory fields
    protected $check_mandatory = false;
    protected $mandatory_fields = null;

    public $TABLE_NAME = null;

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = null;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;

        if ($this->check_mandatory) {
            $this->retrieve_mandatory_fields();
            write_log(json_encode($this->mandatory_fields), __FILE__, __LINE__);
        }
    }

    //retrieve all mandatory fields into property mandatory_fields
    public function retrieve_mandatory_fields()
    {
        $this->mandatory_fields = array();

        $query = "
            SELECT COLUMN_NAME
            FROM USER_TAB_COLS
            WHERE TABLE_NAME = '" . $this->TABLE_NAME . "' AND NULLABLE = 'N'";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                array_push($this->mandatory_fields, strtolower($row['COLUMN_NAME']));
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
