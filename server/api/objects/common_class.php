<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/exceptions.php';

class CommonClass
{
    // database connection and table name
    protected $conn;

    //before update/insert, if to check manndatory (not nullable) fields
    protected $check_mandatory = true;
    protected $mandatory_fields = null;
    protected $primary_keys = null;

    public $TABLE_NAME = null;

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = null;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //Check if the record that is to be updated is in db
    public function prior_to_update()
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        if ($this->TABLE_NAME === null) {
            return true;
        }

        $this->retrieve_primary_keys();
        if (count($this->primary_keys) <= 0) {
            write_log($this->TABLE_NAME . " does not have primary key", __FILE__, __LINE__);
            return true;
        }

        $query = "
            SELECT COUNT(*) CN
            FROM " . $this->TABLE_NAME . " WHERE ";

        $and_count = 0;
        foreach ($this->primary_keys as $value) {
            if ($and_count <= 0) {
                $query .= $value . " = :" . $value;
            } else {
                $query .= " and " . $value . " = :" . $value;
            }
            $and_count += 1;
        }

        $stmt = oci_parse($this->conn, $query);
        foreach ($this->primary_keys as $value) {
            oci_bind_by_name($stmt, ':' . $value, $this->$value);
        }
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if (intval($row['CN']) <= 0) {
                $primey_key_record = "";
                $and_count = 0;
                foreach ($this->primary_keys as $value) {
                    if ($and_count <= 0) {
                        $primey_key_record .= $value . ":" . $this->$value;
                    } else {
                        $primey_key_record .= ", " . $value . ":" . $this->$value;
                    }
                }
                throw new NonexistentException(
                    sprintf("record (%s) does not exist", $primey_key_record)
                );
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function mandatory_fields_check()
    {
        if ($this->check_mandatory) {
            if ($this->TABLE_NAME === null) {
                return true;
            }

            $this->retrieve_mandatory_fields();
            write_log(json_encode($this->mandatory_fields), __FILE__, __LINE__);

            foreach ($this->mandatory_fields as $value) {
                // write_log($value, __FILE__, __LINE__);
                // write_log(json_encode($this), __FILE__, __LINE__);
                if (!property_exists($this, $value) || $this->$value == null) {
                    write_log($value . " is not set for class " . get_class($this),
                        __FILE__, __LINE__);
                    throw new NullableException(
                        "Mandatory fields are missing. Please check these fields: " .
                        json_encode($this->mandatory_fields));
                }
            }
        }

        return true;
    }

    //retrieve primary keys and store them into
    private function retrieve_primary_keys()
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        $this->primary_keys = array();

        $query = "
            SELECT COLS.COLUMN_NAME
            FROM ALL_CONSTRAINTS CONS, ALL_CONS_COLUMNS COLS
            WHERE COLS.TABLE_NAME = '" . $this->TABLE_NAME . "'
                AND CONS.CONSTRAINT_TYPE = 'P'
                AND CONS.CONSTRAINT_NAME = COLS.CONSTRAINT_NAME
                AND CONS.OWNER = COLS.OWNER";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                array_push($this->primary_keys, strtolower($row['COLUMN_NAME']));
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //retrieve all mandatory fields into property mandatory_fields
    private function retrieve_mandatory_fields()
    {
        $this->mandatory_fields = array();

        $query = "
            SELECT COLUMN_NAME
            FROM USER_TAB_COLS
            WHERE TABLE_NAME = '" . $this->TABLE_NAME . "' AND NULLABLE = 'N'
                AND DATA_DEFAULT IS NULL";
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
