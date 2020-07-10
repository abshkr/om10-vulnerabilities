<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/exceptions.php';
include_once __DIR__ . '/../shared/journal.php';

class CommonClass
{
    // database connection and table name
    protected $conn;

    //Reponse uses it, like "message": "FolioOverride created."
    public $desc = null;

    //before update/insert, if to check manndatory (not nullable) fields
    protected $check_mandatory = true;
    protected $mandatory_fields = null;

    protected $commit_mode = OCI_COMMIT_ON_SUCCESS;

    /* descedant can set primary_keys explicitly, or can leave it to //
    be initialized by retrieve_primary_keys.
    It is an array, all lower case.
    If want to use map_view_files_to_table_fiels, must explicitly set primary_keys
     */
    protected $primary_keys = null;
    protected $record_str = null;

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
     * Check tank.php as an example.
     * For the values in read_hook(), check cur_role.php::read_hook() for an example
     */
    public $BOOLEAN_FIELDS = null;

    //All the fields that should be treated as number in JSON. For example:
    // array(
    //     "TANK_BCLASS_DENS_HI",
    //     "TANK_BCLASS_DENS_LO" => 2,  //2 decimals
    // );
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

    /**
     * If del_n_ins_children is true, then it calls delete_children()
     * and insert_children() when update children. 
     * If del_n_ins_children is false, call update_children() to update children.
     * Most of the time, delete then insert can workd, but area-gate-permission is
     * an exception, because when update area, if delete gate first then insert them
     * back, and the gate has permission, then deleting gate will fail
     * Check area.php::update_children() for details
    */
    protected $del_n_ins_children = true;

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
        if ($this->TABLE_NAME == $this->VIEW_NAME) {
            $this->view_keys = $this->primary_keys;
            return $this->populate_primary_key_where();
        }

        if (!isset($this->view_keys)) {
            $this->view_keys = array();
            foreach ($this->primary_keys as $key => $value) {
                if (isset($this->table_view_map) && array_key_exists(strtoupper($value), $this->table_view_map)) {
                    array_push($this->view_keys, strtolower($this->table_view_map[strtoupper($value)]));
                } else {
                    array_push($this->view_keys, $value);
                }
            }
            
            if (!isset($this->view_keys)) {
                return "";
            }
        }

        // write_log(json_encode($this->view_keys), __FILE__, __LINE__);

        $where_query = " WHERE ";
        foreach ($this->view_keys as $value) {
            if (isset($this->table_view_map[strtoupper($value)])) {
                $value = strtolower($this->table_view_map[strtoupper($value)]);
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
        // write_log(json_encode($this->updatable_fields), __FILE__, __LINE__, LogLevel::DEBUG);
        // write_log(json_encode($this), __FILE__, __LINE__, LogLevel::DEBUG);
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
        // write_log($set_query, __FILE__, __LINE__, LogLevel::DEBUG);
        if (strlen($set_query) <= 0) {
            write_log("Nothing to update", __FILE__, __LINE__, LogLevel::WARNING);
            return null;
        }

        $query = "UPDATE " . $this->TABLE_NAME . " SET " . $set_query . $this->populate_primary_key_where();
        // write_log($query, __FILE__, __LINE__, LogLevel::DEBUG);
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
        // if (isset($this->table_view_map)) {
        //     $view_table_map = array_flip($this->table_view_map);
        // }
        $clob_fields_query = "";
        $clob_para_query = "";

        foreach ($this as $key => $value) {
            if (in_array($key, $this->primary_keys)) {
                $fields_query .= $key . ", ";
                $para_query .= " :" . $key . ", ";
                $to_insert[$key] = $value;
            } else if (in_array($key, $this->updatable_fields)) {
                $fields_query .= $key . ", ";
                if (isset($this->CLOB_FIELDS) &&
                    (array_key_exists(strtoupper($key), $this->CLOB_FIELDS) ||
                    in_array(strtoupper($key), $this->CLOB_FIELDS, true))) {
                        $para_query .= " EMPTY_CLOB(), ";
                        if (strlen($clob_fields_query) > 0) {
                            $clob_fields_query .= ", ";
                        }
                        $clob_fields_query .= $key;
                        if (strlen($clob_para_query) > 0) {
                            $clob_para_query .= ", ";
                        }
                        $clob_para_query .= " :myclob_" . $key;
                } else {
                    $para_query .= " :" . $key . ", ";
                }
                // $para_query .= " :" . $key . ", ";
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
        if (strlen($clob_fields_query) > 0 && strlen($clob_para_query) > 0) {
            // example: RETURNING GUD_HEAD_DATA,GUD_BODY_DATA INTO :mylob_loc_head, :mylob_loc_body
            $query .= " RETURNING " . $clob_fields_query . " INTO " . $clob_para_query;
            write_log("CLOB query: " . $query, __FILE__, __LINE__, LogLevel::DEBUG);
        }
        $stmt = oci_parse($this->conn, $query);

        foreach ($this->primary_keys as $value) {
            // write_log(sprintf("%s:%s", $value, $this->$value), __FILE__, __LINE__, LogLevel::DEBUG);
            oci_bind_by_name($stmt, ':' . $value, $this->$value);
        }

        foreach ($to_insert as $key => $value) {
            // write_log(sprintf("%s:%s:%s", $key, $value, $this->$key), __FILE__, __LINE__);
            if (isset($this->CLOB_FIELDS) &&
                (array_key_exists(strtoupper($key), $this->CLOB_FIELDS) ||
                in_array(strtoupper($key), $this->CLOB_FIELDS, true))) {
                // example:
                // Creates an "empty" OCI-Lob object to bind to the locator
                // $myLOB_hd = oci_new_descriptor($db->connect, OCI_D_LOB);
                // NOTE!!!!!! need define this variable in class level
                //$clobkey = "myclob_".$key;
                $clobkey = $key;
                if (!isset($this->CLOB_LOCATORS)) {
                    $this->CLOB_LOCATORS = array();
                }
                $this->CLOB_LOCATORS[$clobkey] = oci_new_descriptor($this->conn, OCI_D_LOB);
                // Bind the returned Oracle LOB locator to the PHP LOB object
                // oci_bind_by_name($stmt, ":mylob_loc_body", $myLOB_by, -1, OCI_B_CLOB);
                oci_bind_by_name($stmt, ':myclob_' . $key, $this->CLOB_LOCATORS[$clobkey], -1, OCI_B_CLOB);
                write_log('we have clob: '. $key, __FILE__, __LINE__, LogLevel::DEBUG);
            } else {
                oci_bind_by_name($stmt, ':' . $key, $this->$key);
            }
            // oci_bind_by_name($stmt, ':' . $key, $this->$key);
        }

        // write_log('prepare_insert successfully', __FILE__, __LINE__, LogLevel::DEBUG);

        return $stmt;
    }

    //Descedant class need to implement this. allocation.php as a referece
    protected function delete_children()
    {

    }

    //Descedant class need to implement this
    protected function insert_children()
    {
        return true;
    }

    //
    protected function update_children($old_data = null)
    {
        return true;
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
    protected function post_update()
    {
        return true;
    }

    /**
     * Descendant can implement this function to do some update that
     * cannot be done in common way. Refer to company as an example
     */
    protected function post_delete()
    {
        return true;
    }


    /* Sample: https://{{server_ip}}/api/pages/expiry_types/update.php 
    By calling prepare_update(), it only updates the fields that are passed in*/
    public function update()
    {
        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . $this->view_primary_key_where();
        // write_log(sprintf("query:%s", $query), __FILE__, __LINE__, LogLevel::DEBUG);
        $stmt = oci_parse($this->conn, $query);
        // write_log(json_encode($this->view_keys), __FILE__, __LINE__, LogLevel::DEBUG);
        foreach ($this->view_keys as $view_key) {
            // write_log(sprintf("%s", $view_key), __FILE__, __LINE__, LogLevel::DEBUG);
            // if (isset($this->TABLE_NAME) &&
            //     isset($this->VIEW_NAME) &&
            //     $this->TABLE_NAME !== $this->VIEW_NAME &&
            //     isset($this->table_view_map[strtoupper($value)])) {
            //     $value = strtolower($this->table_view_map[strtoupper($value)]);
            // }
            // if (array_key_exists(strtoupper($value), $this->table_view_map)) {
            //     $value = strtolower($this->table_view_map[strtoupper($value)]);
            // }
            
            // write_log(sprintf("%s:%s", $view_key, $this->$view_key), __FILE__, __LINE__, LogLevel::DEBUG);
            oci_bind_by_name($stmt, ':' . $view_key, $this->$view_key);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if ($row == false) {
                $row = array();
            }
            // write_log(json_encode($row), __FILE__, __LINE__, LogLevel::DEBUG);
            // write_log(json_encode($this), __FILE__, __LINE__, LogLevel::DEBUG);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $stmt = $this->prepare_update();
        if (!$stmt) {
            //Do not return because it might have children. Example: tank_group 
            // return false;
        } else if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        if ($this->post_update() === false) {
            write_log("Failed to execute post_update", __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $old_child_data = $this->retrieve_children_data();
        if ($this->del_n_ins_children) {
            $this->delete_children();
            $this->insert_children();
        } else {
            $this->update_children($old_child_data);
        }
        
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
            if (array_key_exists(strtoupper($key), $row) && $value != $row[strtoupper($key)] &&
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
        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $this->check_deletable();
        $this->delete_children();

        $query = "DELETE FROM " . $this->TABLE_NAME . " " . $this->populate_primary_key_where();
        // write_log($query, __FILE__, __LINE__, LogLevel::DEBUG);
        
        $stmt = oci_parse($this->conn, $query);
        foreach ($this->primary_keys as $value) {
            // write_log(sprintf("%s:%s", $value, $this->$value), __FILE__, __LINE__, LogLevel::DEBUG);
            oci_bind_by_name($stmt, ':' . $value, $this->$value);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        if ($this->post_delete() === false) {
            write_log("Failed to execute post_delete", __FILE__, __LINE__, LogLevel::ERROR);
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

    /**
     * This function will be called inside utilities.php::update(). If a sub class
     * needs some thing before update(), it implements this function.
     * Refer to report_profile.php as a sample
     *  */
    public function pre_update()
    {

    }

    /**
     * This function will be called inside utilities.php::create(). If a sub class
     * needs some thing before create(), it implements this function.
     * Refer to report_profile.php as a sample
     *  */
    public function pre_create()
    {
        return true;
    }

    protected function post_create()
    {
        return true;
    }

    public function pre_delete()
    {
        return true;
    }

    /**
     * How to use create() in descendents:
     * 1# set $this->TABLE_NAME, maby in contructor. See open_order.php
     * 2# If parameters are from VIEW_NAME, then need to set $this->table_view_map so that
     * it can map view fields into table fields to insert into table.
     * 3# if there is something to do before insert, do it in pre_create(), because
     * utilitiies::create() will call pre_create() before create(). open_order.php has an example
     * 3# if there is any thing cannot do previously, do it in post_create() in descendent
     * 3# if there are children records, do it in insert_children() in descendent
     */
    public function create()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);

        Utilities::sanitize($this);

        if (isset($this->CLOB_FIELDS) && count($this->CLOB_FIELDS)>0 ) {
            $this->commit_mode = OCI_DEFAULT;
            // write_log("CLOB commit_mode " . $this->commit_mode, __FILE__, __LINE__, LogLevel::DEBUG);
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
        //$this->commit_mode = OCI_NO_AUTO_COMMIT;

        $stmt = $this->prepare_insert();
        // write_log("after prepare_insert " . $stmt, __FILE__, __LINE__, LogLevel::ERROR);

        if (!$stmt) {
            write_log("stmt error" . $stmt, __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } else if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
        // write_log("after oci_execute " . $this->commit_mode, __FILE__, __LINE__, LogLevel::DEBUG);

        // save clob data
        if (isset($this->CLOB_FIELDS) && 
            count($this->CLOB_FIELDS) > 0 && 
            isset($this->CLOB_LOCATORS) && 
            count($this->CLOB_LOCATORS) > 0 ) {
            // write_log('we have clob fields ', __FILE__, __LINE__, LogLevel::DEBUG);
            foreach ($this->CLOB_LOCATORS as $key => $locator) {
                // write_log('CLOB locators '. $key . ' - ' . $this->$key, __FILE__, __LINE__, LogLevel::DEBUG);
                if (isset($locator)){
                    if (!$locator->save($this->$key)) {
                        // On error, rollback the transaction
                        write_log("DB LOB failed:", __FILE__, __LINE__, LogLevel::ERROR);
                        oci_rollback($this->conn);
                        //$locator->free();
                        return false;
                    } else {
                        //$locator->free();
                        write_log("DB LOB succeeded:", __FILE__, __LINE__, LogLevel::DEBUG);
                    }
                }
            }
            // write_log('we have clob fields2 ', __FILE__, __LINE__, LogLevel::DEBUG);
        }
        
        // write_log("after clob save " . $this->commit_mode, __FILE__, __LINE__, LogLevel::DEBUG);

        if ($this->post_create() === false) {
            write_log("Failed to execute post_create", __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
        
        // write_log("after post create " . $this->commit_mode, __FILE__, __LINE__, LogLevel::DEBUG);

        if (!$this->insert_children()) {
            write_log("Failed to execute insert_children", __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
        
        // write_log("after insert children " . $this->commit_mode, __FILE__, __LINE__, LogLevel::DEBUG);

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

        // $module = $this->VIEW_NAME;
        // $record = $jnl_data[2];
        // foreach ($this as $key => $value) {
        //     if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
        //         !$journal->valueChange(
        //             $module, $record, strtoupper($key), $row[strtoupper($key)], $value)) {
        //         oci_rollback($this->conn);
        //         return false;
        //     }
        // }

        oci_commit($this->conn);

        // free the resources
        if (isset($this->CLOB_FIELDS) && 
            count($this->CLOB_FIELDS) > 0 && 
            isset($this->CLOB_LOCATORS) && 
            count($this->CLOB_LOCATORS) > 0 ) {
            foreach ($this->CLOB_LOCATORS as $key => $locator) {
                // write_log('i am here to free resource '. $key . ' - ' . $this->$key, __FILE__, __LINE__, LogLevel::DEBUG);
                if (isset($locator)){
                    $locator->free();
                }
            }
        }
        unset($this->CLOB_LOCATORS);

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
        if (oci_execute($stmt, $this->commit_mode)) {
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
        if (isset($this->record_str)) {
            return $this->record_str;
        }

        if (!isset($this->primary_keys)) {
            return "";
        }

        $primey_key_record = "";
        foreach ($this->primary_keys as $value) {
            $primey_key_record .= ", " . $value . ":" . $this->$value;
        }

        return ltrim($primey_key_record, ", ");
    }

    public function common_prep()
    {
        $this->map_view_files_to_table_fiels();
    }

    private function map_view_files_to_table_fiels()
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);
        if (!isset($this->primary_keys)) {
            $this->retrieve_primary_keys();
            if (!isset($this->primary_keys)) {
                write_log("primary_keys not set", __FILE__, __LINE__);
                return;
            }
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
     * Descendant can overwrite this function. If not deletable, throw an exception
    */
    protected function check_deletable()
    {
        
    }

    /**
     * Check if the record that is to be updated is in db
     * return true: exist; false: not exist
     * Once descendant override this function, it needs to explicitly set primary_keys
     */
    public function check_existence()
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        if ($this->TABLE_NAME === null) {
            return true;
        }

        if (!isset($this->primary_keys)) {
            $this->retrieve_primary_keys();
        }

        // if (isset($this->TABLE_NAME) &&
        //     isset($this->VIEW_NAME) &&
        //     $this->TABLE_NAME !== $this->VIEW_NAME) {
        //     $this->map_view_files_to_table_fiels();
        // }
        
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
            // write_log($value, __FILE__, __LINE__);
            if (!isset($this->$value)) {
                throw new Exception(
                    "Primary key fields are missing. Please check these fields: " .
                    json_encode($this->primary_keys));
            }
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if (intval($row['CN']) <= 0) {
                // write_log(sprintf("record (%s) does not exist", $this->primiary_key_str()),
                //     __FILE__, __LINE__, LogLevel::INFO);
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
            // write_log(json_encode($this), __FILE__, __LINE__);
            foreach ($this->mandatory_fields as $value) {
                // write_log($value, __FILE__, __LINE__);
                // write_log(json_encode($this), __FILE__, __LINE__);

                //Before calling this function, map_view_files_to_table_fiels is called in common_prep
                // if (isset($this->table_view_map) && isset($this->table_view_map[strtoupper($value)])) {
                //     $value = strtolower($this->table_view_map[strtoupper($value)]);
                // }

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
        if (oci_execute($stmt, $this->commit_mode)) {
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
        if (oci_execute($stmt, $this->commit_mode)) {
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

    //Utilities::updateArray calls this one before call each update. for example: personnel_config.php 
    public function pre_update_array()
    {
        return true;
    }
}
