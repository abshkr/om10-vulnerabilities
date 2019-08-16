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

    /* descedant can set primary_keys explicitly, or can leave it to //
    be initialized by retrieve_primary_keys.
    It is an array, all lower case
     */
    protected $primary_keys = null;

    /**
     * Sometimes when TABLE_NAME != VIEW_NAME, use primary_keys as update
     * use view_keys when retrieve from view. If not use, will use
     * primary_keys instead. All lower case
     */
    protected $view_keys = null;

    protected $TABLE_NAME = null; //used in update(), delete() and create()
    protected $VIEW_NAME = null; //used in read()

    /**
     * Some VIEW columns do not equal to TABLE names. For example, GUI_TANKS
     * , tnk.TANK_DAILY_TOL_VOL               as TANK_DTOL_VOLUME
     * , tnk.TANK_DAILY_TOL_PERCENT           as TANK_DTOL_PERCENT
     * , tnk.TANK_MONTHLY_TOL_VOL             as TANK_MTOL_VOLUME
     * , tnk.TANK_MONTHLY_TOL_PERCENT         as TANK_MTOL_PERCENT
     * Because read use VIEW, update use TABLE, we need to map them
     * it is from TABLE to VIEW
     */
    protected $table_view_map = null;

    /**
     * Child objects in "class name" => "table name" format
     * chidd objects will be embeded in every item
     */
    // protected $CHILD_OBJECTS = null;

    //An array that include all the fileds that can be updated.
    protected $updatable_fields = null;

    /**
     * All the fields that should be treated as BOOLEAN in JSON
     * Check tank.php as an example
     */
    public $BOOLEAN_FIELDS = null;

    //All the fields that should be treated as number in JSON
    public $NUMBER_FIELDS = null;

    /*
    Table fields that should not be exampt from mandatory fields. For example,
    TANK_TERMINAL in TANKS table. This is because React JS does not want to keep
    this extra field.
    Every desendant class should set its own $PRIMIRAY_KEY_EXCLUSIONS if there
    is any filed to be excluded. For example, tank.php
    All fields name should be in upper case
     */
    protected $PRIMIRAY_KEY_EXCLUSIONS = null;

    /**
     * If it is false, will not check existence
     * before insert. This is because sometimes primary key
     * is an auto-incremental number, it is not from outside.
     */
    public $check_exists = true;

    //read imp will be called inside read. Make it public because Utilities::update() calls it
    public function read_hook(&$hook_item)
    {

    }

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        if (!isset($this->TABLE_NAME)) {
            write_log("TABLE_NAME not set for class " . get_class($this),
                __FILE__, __LINE__, LogLevel::DEBUG);
        }

        if (!isset($this->VIEW_NAME)) {
            $this->VIEW_NAME = $this->TABLE_NAME;
        }
    }

    //Will be called before displaying, example: report_profile.php
    public function read_decorate(&$result_array)
    {

    }

    private function populate_primary_key_where()
    {
        if (!isset($this->primary_keys)) {
            return "";
        }

        $where_query = " WHERE ";
        foreach ($this->primary_keys as $value) {
            $where_query .= strtoupper($value) . " = :" . $value . " AND ";
        }

        return rtrim($where_query, 'AND ');
    }

    private function view_primary_key_where()
    {
        if (!isset($this->view_keys)) {
            $this->view_keys = $this->primary_keys;
            if (!isset($this->view_keys)) {
                return "";
            }
        }

        $where_query = " WHERE ";
        foreach ($this->view_keys as $value) {
            if (isset($this->table_view_map[strtoupper($value)])) {
                $value = strtolow($this->table_view_map[strtoupper($value)]);
            }
            $where_query .= strtoupper($value) . " = :" . $value . " AND ";
        }

        return rtrim($where_query, 'AND ');
    }

    private function populate_primary_key_identifier()
    {
        if (!isset($this->primary_keys)) {
            return "";
        }

        $identifier = "";
        foreach ($this->primary_keys as $value) {
            $identifier .= sprintf($value . ":%s, ", $this->$value);
        }
        return rtrim($identifier, ', ');
    }

    //Only update the fields that are passed in
    public function prepare_update()
    {
        if (!isset($this->updatable_fields)) {
            $this->initial_updatable_fields();
        }
        write_log(json_encode($this->updatable_fields), __FILE__, __LINE__, LogLevel::DEBUG);
        write_log(json_encode($this), __FILE__, __LINE__, LogLevel::DEBUG);
        $set_query = "";
        $to_update = array();
        if (isset($this->table_view_map)) {
            $view_table_map = array_flip($this->table_view_map);
        }

        foreach ($this as $key => $value) {
            if (in_array($key, $this->updatable_fields)) {
                $set_field = strtoupper($key);
                if (isset($view_table_map)) {
                    if (isset($view_table_map[strtoupper($key)])) {
                        $set_field = $view_table_map[strtoupper($key)];
                    }
                }
                $set_query .= $set_field . " = :" . $key . ", ";
                $to_update[$key] = $value;
            }
        }
        $set_query = rtrim($set_query, ', ');
        if (count($set_query) <= 0) {
            write_log("Nothing to update", __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $query = "UPDATE " . $this->TABLE_NAME . " SET " . $set_query . $this->populate_primary_key_where();
        write_log($query, __FILE__, __LINE__, LogLevel::DEBUG);
        $stmt = oci_parse($this->conn, $query);

        foreach ($this->primary_keys as $value) {
            // write_log(sprintf("%s:%s", $value, $this->$value), __FILE__, __LINE__, LogLevel::DEBUG);
            oci_bind_by_name($stmt, ':' . $value, $this->$value);
        }

        foreach ($to_update as $key => $value) {
            // write_log(sprintf("%s:%s:%s", $key, $value, $this->$key), __FILE__, __LINE__);
            oci_bind_by_name($stmt, ':' . $key, $this->$key);
        }

        return $stmt;
    }

    //Only update the fields that are passed in
    public function prepare_insert()
    {
        if (!isset($this->updatable_fields)) {
            $this->initial_updatable_fields();
        }

        $fields_query = "( ";
        $para_query = " ( ";
        $to_update = array();
        if (isset($this->table_view_map)) {
            $view_table_map = array_flip($this->table_view_map);
        }

        foreach ($this as $key => $value) {
            if (in_array($key, $this->primary_keys)) {
                $fields_query .= $key . ", ";
                $para_query .= " :" . $key . ", ";
                $to_insert[$key] = $value;
            } else if (in_array($key, $this->updatable_fields)) {
                $fields_query .= $key . ", ";
                $para_query .= " :" . $key . ", ";
                $to_insert[$key] = $value;
            }
        }
        // write_log($fields_query, __FILE__, __LINE__, LogLevel::DEBUG);
        $fields_query = rtrim($fields_query, ', ') . ")";
        $para_query = rtrim($para_query, ', ') . ")";
        if (count($to_insert) <= 0) {
            write_log("Nothing to insert", __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $query = "INSERT INTO " . $this->TABLE_NAME . $fields_query . " VALUES " . $para_query;
        write_log($query, __FILE__, __LINE__, LogLevel::DEBUG);
        $stmt = oci_parse($this->conn, $query);

        foreach ($this->primary_keys as $value) {
            // write_log(sprintf("%s:%s", $value, $this->$value), __FILE__, __LINE__, LogLevel::DEBUG);
            oci_bind_by_name($stmt, ':' . $value, $this->$value);
        }

        foreach ($to_insert as $key => $value) {
            // write_log(sprintf("%s:%s:%s", $key, $value, $this->$key), __FILE__, __LINE__);
            oci_bind_by_name($stmt, ':' . $key, $this->$key);
        }

        return $stmt;
    }

    //Descedant class need to implement this
    protected function delete_children()
    {

    }

    //Descedant class need to implement this
    protected function insert_children()
    {

    }

    //Descedant class need to implement this
    protected function retrieve_children_data()
    {

    }

    protected function journal_children_change($journal, $old, $new)
    {

    }

    /**
     * Descendant can implement this function to do some update that
     * cannot be done in common way. Refer to report_profile as an example
     */
    public function update_supplement()
    {
        return true;
    }

    public function update()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        write_log(json_encode($this), __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . $this->view_primary_key_where();
        // write_log(sprintf("query:%s", $query), __FILE__, __LINE__, LogLevel::DEBUG);
        $stmt = oci_parse($this->conn, $query);
        foreach ($this->primary_keys as $value) {
            // write_log(sprintf("%s:%s", $value, $this->$value), __FILE__, __LINE__, LogLevel::DEBUG);
            if (isset($this->TABLE_NAME) &&
                isset($this->VIEW_NAME) &&
                $this->TABLE_NAME !== $this->VIEW_NAME &&
                isset($this->table_view_map[strtoupper($value)])) {
                $value = strtolower($this->table_view_map[strtoupper($value)]);
            }
            oci_bind_by_name($stmt, ':' . $value, $this->$value);
        }
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $stmt = $this->prepare_update();
        if (!$stmt) {
            return false;
        } else if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if ($this->update_supplement() === false) {
            write_log("Failed to execute update_supplement", __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $old_child_data = $this->retrieve_children_data();
        $this->delete_children();
        $this->insert_children();
        $new_child_data = $this->retrieve_children_data();

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->VIEW_NAME;
        $jnl_data[2] = $this->populate_primary_key_identifier();

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = $this->VIEW_NAME;
        $record = $jnl_data[2];
        foreach ($this as $key => $value) {
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
                !$journal->valueChange(
                    $module, $record, strtoupper($key), $row[strtoupper($key)], $value)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        $this->journal_children_change($journal, $old_child_data, $new_child_data);

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

        $query = "DELETE FROM " . $this->TABLE_NAME . " " . $this->populate_primary_key_where();
        write_log($query, __FILE__, __LINE__, LogLevel::DEBUG);

        $stmt = oci_parse($this->conn, $query);
        foreach ($this->primary_keys as $value) {
            // write_log(sprintf("%s:%s", $value, $this->$value), __FILE__, __LINE__, LogLevel::DEBUG);
            oci_bind_by_name($stmt, ':' . $value, $this->$value);
        }
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->VIEW_NAME;
        $jnl_data[2] = $this->populate_primary_key_identifier();

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function create()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);

        Utilities::sanitize($this);

        $stmt = $this->prepare_insert();
        if (!$stmt) {
            return false;
        } else if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if ($this->update_supplement() === false) {
            write_log("Failed to execute update_supplement", __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->VIEW_NAME;
        $jnl_data[2] = $this->populate_primary_key_identifier();

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = $this->VIEW_NAME;
        $record = $jnl_data[2];
        foreach ($this as $key => $value) {
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
                !$journal->valueChange(
                    $module, $record, strtoupper($key), $row[strtoupper($key)], $value)) {
                oci_rollback($this->conn);
                return false;
            }
        }

        oci_commit($this->conn);
        return true;
    }

    //Fill up $this->updatable_fields so that descendant class
    //can populate corrent update query
    public function initial_updatable_fields()
    {
        $this->updatable_fields = array();

        $query = "
            SELECT COLUMN_NAME
            FROM USER_TAB_COLS
            WHERE TABLE_NAME = '" . $this->TABLE_NAME . "'";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
                if (!in_array(strtolower($row['COLUMN_NAME']), $this->primary_keys)) {
                    // if (isset($this->table_view_map[$row['COLUMN_NAME']])) {
                    //     array_push($this->updatable_fields, strtolower($this->table_view_map[$row['COLUMN_NAME']]));
                    // } else {
                    array_push($this->updatable_fields, strtolower($row['COLUMN_NAME']));
                    // }
                }
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        // write_log(json_encode($this->updatable_fields), __FILE__, __LINE__);
        return true;
    }

    public function empty_str()
    {
        return "empty";
    }

    public function primiary_key_str()
    {
        if (!isset($this->primary_keys)) {
            return "";
        }

        $primey_key_record = "";
        foreach ($this->primary_keys as $value) {
            $primey_key_record .= ", " . $value . ":" . $this->$value;
        }

        return ltrim($primey_key_record, ", ");
    }

    private function map_view_files_to_table_fiels()
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);
        if (!isset($this->primary_keys)) {
            return;
        }

        if (isset($this->table_view_map)) {
            $view_table_map = array_flip($this->table_view_map);
        }

        foreach ($this as $key => $value) {
            if (isset($view_table_map[strtoupper($key)])) {
                $prop = strtolower($view_table_map[strtoupper($key)]);
                $this->$prop = $value;
            }
        }
        // write_log(json_encode($this), __FILE__, __LINE__);
    }

    /**
     * Check if the record that is to be updated is in db
     * return true: exist; false: not exist
     *
     */
    public function check_existence()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if ($this->TABLE_NAME === null) {
            return true;
        }

        if (isset($this->TABLE_NAME) &&
            isset($this->VIEW_NAME) &&
            $this->TABLE_NAME !== $this->VIEW_NAME) {
            $this->map_view_files_to_table_fiels();
        }

        if (!isset($this->primary_keys)) {
            $this->retrieve_primary_keys();
        }

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
        // write_log($query, __FILE__, __LINE__);
        // write_log(json_encode($this->primary_keys), __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);
        $stmt = oci_parse($this->conn, $query);
        foreach ($this->primary_keys as $value) {
            oci_bind_by_name($stmt, ':' . $value, $this->$value);

            if (!isset($this->$value)) {
                throw new Exception(
                    "Primary key fields are missing. Please check these fields: " .
                    json_encode($this->primary_keys));
            }
        }
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if (intval($row['CN']) <= 0) {
                write_log(sprintf("record (%s) does not exist", $this->primiary_key_str()),
                    __FILE__, __LINE__, LogLevel::INFO);
                return false;
            }
            return true;
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
            // write_log(json_encode($this->mandatory_fields), __FILE__, __LINE__);
            foreach ($this->mandatory_fields as $value) {
                // write_log($value, __FILE__, __LINE__);
                // write_log(json_encode($this), __FILE__, __LINE__);
                if (isset($this->table_view_map) && isset($this->table_view_map[strtoupper($value)])) {
                    $value = strtolower($this->table_view_map[strtoupper($value)]);
                }

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
                if (!isset($this->PRIMIRAY_KEY_EXCLUSIONS) || !in_array($row['COLUMN_NAME'], $this->PRIMIRAY_KEY_EXCLUSIONS)) {
                    array_push($this->primary_keys, strtolower($row['COLUMN_NAME']));
                }
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
                if (!isset($this->PRIMIRAY_KEY_EXCLUSIONS) || !in_array($row['COLUMN_NAME'], $this->PRIMIRAY_KEY_EXCLUSIONS)) {
                    array_push($this->mandatory_fields, strtolower($row['COLUMN_NAME']));
                }
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
