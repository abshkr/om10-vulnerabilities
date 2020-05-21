<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../config/database.php';
include_once __DIR__ . '/common.php';
include_once __DIR__ . '/access_check.php';
include_once __DIR__ . '/response.php';

class Utilities
{
    // private static $COMPULSORY_FIELDS = array(
    //     "GUI_TANKS" => array("TANK_API",
    //         "TANK_IDENTIFIER"
    //     ),
    //     "GUI_PERSONNEL" => array(
    //         "PER_CDOE",
    //     )
    // );

    //"Y" means VARCHAR in db, Y/N.
    //"T" means VARCHAR in db, T/F
    //"1" means NUMBER in DB, 1/0
    // sample in tank.php:
    // public $BOOLEAN_FIELDS = array(
    //     "TANK_EXC_PID" => "Y",
    //     "TANK_EXC_PDS" => "Y",
    //     "TANK_EXC_SPMV" => "Y",
    //     "TANK_EXC_STCKRPT" => "Y",
    // );

    public static function clean_rusty_files($folder, $seconds = 15552000 /* 6 month*/)
    {
        $cdir = scandir($folder);
        foreach ($cdir as $key => $value) {
            if (in_array($value, array(".", ".."))) {
                continue;
            }
            if (time() - filemtime($folder . '/' . $value) > $seconds) {
                unlink($folder . '/' . $value);
                write_log(sprintf("File removed: %s", $folder . '/' . $value),
                    __FILE__, __LINE__);
            }
        }
    }

    public static function sanitize($obj)
    {
        $class = get_class($obj);
        foreach ($obj as $key => $value) {
            if (!is_string($value)) {
                continue;
            }

            $obj->{$key} = htmlspecialchars(strip_tags($value));
        }
    }

    public static function http_get_cgi($cgi)
    {
        $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . "/" . $cgi . "?";
    
        foreach ($_GET as $key => $value)
        {
            $url .= $key . "=". rawurlencode(strip_tags($value)) . "&";
        }
        //$url = substr($url, 0, -1);
        if (!JWT_AUTH)
        {
            session_start();
            if (isset($_SESSION["SESSION"])) {
                $url .= "sess_id=" . $_SESSION["SESSION"];
            }
        }
        //echo file_get_contents($url);
        return file_get_contents($url);
    }

    public static function http_cgi_invoke($cgi, $query_string = null)
    {
        if (!isset($_SESSION)) { 
            session_start(); 
        } 

        $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . "/" . $cgi . "?";
        if ($query_string) {
            $url .= $query_string . "&";
        } else {
            /**
             * If $query_string is null, and if this http_cgi_invoke is called inside
             * Utilities::read, then this part never works because all the POST data
             * has been read in read(). If it is using GET it is fine.
             * Conclusion: for POST, caller of http_cgi_invoke() should always prepare
             * $query_string parameter
             */
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                foreach ($_POST as $key => $value) {
                    $url .= $key . "=" . rawurlencode(strip_tags($value)) . "&";
                }
            } else {
                foreach ($_GET as $key => $value) {
                    $url .= $key . "=" . rawurlencode(strip_tags($value)) . "&";
                }
            }
        }
        
        if (isset($_SESSION["SESSION"])) {
            $url .= "sess_id=" . $_SESSION["SESSION"];
        } else {
            // $url .= "sess_id=LgMvAqIIpPfN";
            $url = rtrim($url, '&');
        }

        write_log(sprintf("%s::%s(), url:%s", __CLASS__, __FUNCTION__, $url),
            __FILE__, __LINE__);

        $result = @file_get_contents($url);
        if ($result === false) {
            // write_log(json_encode(()), __FILE__, __LINE__);
            $e = error_get_last();
            return $e['message'];
        }

        return $result;
    }

    public static function read($class, $method = 'read', $filter = false, $params = null)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = null;

        // initialize object
        try {
            $db = $database->getConnection($class, $method);
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $object = new $class($db);

        if ($filter) {
            //Prior to PHP 5.6, a stream opened with php://input could only be read once
            $data = json_decode(file_get_contents("php://input"));
            // write_log(json_encode($data), __FILE__, __LINE__);
            if ($data) {
                foreach ($data as $key => $value) {
                    $object->$key = $value;
                }
            } else {
                // write_log(json_encode($_GET), __FILE__, __LINE__);
                foreach ($_GET as $key => $value) {
                    $object->$key = $value;
                }
            }
        }

        if ($params) {
            foreach ($params as $prop => $value) {
                $object->$prop = $value;
            }
        }

        self::sanitize($object);
        
        $stmt = $object->$method();
        if (is_array($stmt)) {
            //means it is handled inside $object->$method()
            return;
        } else if (!$stmt) {
            $error = new EchoSchema(500, response("__INTERNAL_ERROR__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $result = array();
        $result["records"] = array();

        /**
         * last parameter method: normally it is read, so the hook name
         * is read_hook; if method is other name, like composition
         * in Tanker, so the hook method is composition_hook
         */
        $num = self::retrieve($result["records"], $object, $stmt, $method);

        /**
         * For read_decorate, it can change the result from read(), check
         * report_profile.php read_decorate for example.
         * Other decorator sample: load_bay.php::details_decorate
         */
        $decorator = $method . "_decorate";
        if (method_exists($object, $decorator)) {
            $object->$decorator($result["records"]);
        }

        http_response_code(200);
        if ($num > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = response("__NO_RECORD_FOUND__");
            echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Identical to read(), the difference is it does not continue after calling $object->$method()
     */
    public static function exec($class, $method = 'read', $filter = false, $params = null)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = null;

        // initialize object
        try {
            $db = $database->getConnection($class, $method);
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $object = new $class($db);

        if ($filter) {
            //Prior to PHP 5.6, a stream opened with php://input could only be read once
            $data = json_decode(file_get_contents("php://input"));
            // write_log(json_encode($data), __FILE__, __LINE__);
            if ($data) {
                foreach ($data as $key => $value) {
                    $object->$key = $value;
                }
            } else {
                // write_log(json_encode($_GET), __FILE__, __LINE__);
                foreach ($_GET as $key => $value) {
                    $object->$key = $value;
                }
            }
        }

        if ($params) {
            foreach ($params as $prop => $value) {
                $object->$prop = $value;
            }
        }

        self::sanitize($object);

        if (method_exists($object, "common_prep")) {
            $object->common_prep();
        }
        
        return $object->$method();
    }

    public static function count($class, $method = 'count', $filter = false)
    {
        $database = new Database();
        $db = $database->getConnection($class, $method);

        // initialize object
        $object = new $class($db);

        if ($filter) {
            $data = json_decode(file_get_contents("php://input"));
            if ($data) {
                foreach ($data as $key => $value) {
                    $object->$key = $value;
                }
            } else {
                // write_log(json_encode($_GET), __FILE__, __LINE__);
                foreach ($_GET as $key => $value) {
                    $object->$key = $value;
                }
            }
        }

        // query products
        $count = $object->$method();

        $result = array();
        $result["records"] = array();
        $item = array(
            "count" => $count,
        );

        array_push($result["records"], $item);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    //Example:
    /*
    "records": [
    "000004C521F3",
    "00000126FD7B",
    "000001270A16",
    "000001096EDE",
    "0000011B0BB9"
    ] */
    public static function simpliedRead($class, $method = 'read', $filter = false)
    {
        $database = new Database();
        $db = $database->getConnection($class, $method);

        // initialize object
        $object = new $class($db);

        if ($filter) {
            $data = json_decode(file_get_contents("php://input"));
            if ($data) {
                foreach ($data as $key => $value) {
                    $object->$key = $value;
                }
            } else {
                // write_log(json_encode($_GET), __FILE__, __LINE__);
                foreach ($_GET as $key => $value) {
                    $object->$key = $value;
                }
            }
        }

        // query products
        $stmt = $object->$method();

        $result = array();
        $result["records"] = array();
        $num = 0;
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $num += 1;

            //There should be only 1 field in $row
            $base_item = array();
            foreach ($row as $key => $value) {
                // $base_item[strtolower($key)] = $value;
                array_push($result["records"], is_null($value) ? "" : $value);
            }

            // $base_item = array_map(function($v){
            //     return (is_null($v)) ? "" : $v;
            // }, $base_item);

            // array_push($result["records"], $base_item);
        }
        // $result["result_count"] = $num;

        http_response_code(200);
        if ($num > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(
                array("message" => response("__NO_RECORD_FOUND__"))
            );
        }
    }

    public static function retrieve(&$result_array, $object, $stmt, $method = "read")
    {
        // write_log(sprintf("%s::%s() START, class:%s, method:%s",
        //     __CLASS__, __FUNCTION__, is_object($object) ? get_class($object) : gettype($object), $method),
        //     __FILE__, __LINE__);

        $num = 0;
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $num += 1;

            $base_item = array();
            foreach ($row as $key => $value) {
                $lower_key = strtolower($key);
                // write_log(sprintf("%s, %s=>%s", $lower_key, $key, $value), __FILE__, __LINE__);
                if (isset($object->BOOLEAN_FIELDS) &&
                    array_key_exists($key, $object->BOOLEAN_FIELDS)) {
                    // write_log("getit", __FILE__, __LINE__);
                    if ($value == 1 || $value === 'T' || $value === 'Y') {
                        $base_item[$lower_key] = true;
                    } else {
                        $base_item[$lower_key] = false;
                    }
                } else {
                    if (isset($object->NUMBER_FIELDS) && in_array($key, $object->NUMBER_FIELDS)) {
                        // write_log($value, __FILE__, __LINE__);
                        $base_item[$lower_key] = (float) $value;
                    } else {
                        $base_item[$lower_key] = $value;
                    }
                }
            }

            $base_item = array_map(function ($v) {
                return (is_null($v)) ? "" : $v;
            }, $base_item);

            $hook_method = $method . '_hook';
            if (method_exists($object, $hook_method)) {
                $object->$hook_method($base_item);
            }
            array_push($result_array, $base_item);
        }

        return $num;
    }

    public static function create($class, $method = 'create')
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = $database->getConnection($class, $method);

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $object = new $class($db);
        $desc = (isset($object->desc) ? $object->desc : $class);

        // get posted data
        $data = json_decode(file_get_contents("php://input"));
        // write_log(json_encode($data), __FILE__, __LINE__);
        if ($data) {
            foreach ($data as $key => $value) {
                $object->$key = $value;
                self::handleBoolean($object, $object, $key, $value);
            }
        } else {
            // write_log(json_encode($_GET), __FILE__, __LINE__);
            foreach ($_GET as $key => $value) {
                $object->$key = $value;
                self::handleBoolean($object, $object, $key, $value);
            }
        }

        self::sanitize($object);
        write_log(json_encode(($object)), __FILE__, __LINE__);

        if (method_exists($object, "common_prep")) {
            $object->common_prep();
        }
        
        if (method_exists($object, "pre_create")) {
            $object->pre_create();
        }

        // write_log(json_encode($object), __FILE__, __LINE__);
        try {
            if (method_exists($object, "mandatory_fields_check")) {
                $object->mandatory_fields_check();
            }
        } catch (NullableException $e) {
            write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            // $error = new EchoSchema(400, sprintf("Caught exception: %s", $e->getMessage()));
            $error = new EchoSchema(400, response("__GENERAL_EXCEPTION__", sprintf("Caught exception: %s", $e->getMessage())));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if ($object->check_exists && method_exists($object, "check_existence")) {
            if ($object->check_existence()) {
                $record_str = strlen($object->primiary_key_str()) > 0 ? " (" . $object->primiary_key_str() . ") ": " ";
                // $error = new EchoSchema(400, sprintf("record%salready exist", $record_str));
                $error = new EchoSchema(400, response("__ALREADY_EXIST__", sprintf("record%salready exist", $record_str)));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
        }
            
        try {
            if ($object->$method()) {
                echo '{';
                echo '"message": "' . $desc . ' created."';
                echo '}';
            } else {
                // $error = new EchoSchema(500, 
                // sprintf("Unable to create %s . Check logs/php_rest_*.log file for details.", $desc));
                $error = new EchoSchema(500, response("__CREATE_FAILED__", 
                    sprintf("Unable to create %s . Check logs/php_rest_*.log file for details.", $desc)));
                echo json_encode($error, JSON_PRETTY_PRINT);
            }
        } catch (DatabaseException $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("Database Error: %s", $e->getMessage())));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
            return false;
        } catch (IncompleteParameterException $e) {
            // $error = new EchoSchema(400, "Bad Request: " . $e->getMessage());
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "Bad Request: " . $e->getMessage()));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    /**
     * class_object: for example,  GatePermission
     * item_oject: for example, rules
           GatePermission sample:
               {
                    "prmssn_id": "1",
                    "prmssn_name": "ENTRY update",
                    "prmssn_case": "DEFAULT_PERSONNEL",
                    "prmssn_auth": "999",
                    "prmssn_adv_pin_pass": false,
                    "rules": [
                        {
                            "rule_id": "1",
                            "rule_parent": 1,
                            "rule_expiry_check": false
                        },
                        {
                            "rule_id": "1002",
                            "rule_parent": 1,
                            "rule_expiry_check": false
                        }
                    ]
                }
    */
    private static function handleBoolean($class_object, $item_object, $key, $value)
    {
        $upper_key = strtoupper($key);
        // write_log(sprintf("%s => %s", $key, $value), __FILE__, __LINE__);
        // write_log(sprintf("%s, %s", strtoupper($class), $upper_key), __FILE__, __LINE__);

        if (isset($class_object->BOOLEAN_FIELDS) &&
            array_key_exists($upper_key, $class_object->BOOLEAN_FIELDS)) {
            if ($class_object->BOOLEAN_FIELDS[$upper_key] === 'Y') {
                if ($value) {
                    $item_object->{$key} = 'Y';
                } else {
                    $item_object->{$key} = 'N';
                }

            } else if ($class_object->BOOLEAN_FIELDS[$upper_key] === 'T') {
                if ($value) {
                    $item_object->{$key} = 'T';
                } else {
                    $item_object->{$key} = 'F';
                }

            } else if ($class_object->BOOLEAN_FIELDS[$upper_key] === 1) {
                if ($value) {
                    $item_object->{$key} = 1;
                } else {
                    $item_object->{$key} = 0;
                }

            }
        }
    }

    //Loop to update for an array. sample: pages/folio/update_meters.php
    public static function updateArray($class, $method = 'update')
    {
        //Get data from POST
        $data = json_decode(file_get_contents("php://input"));
        foreach ($data as $item) {
            if (self::update($class, $method, $item) === false) {
                $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
        }

        http_response_code(200);
        echo '{';
        echo '"message": "' . response("__UPDATE_SUCCEEDED__").  '"';
        echo '}';
        return;
    }

    //Loop to create for an array. sample: pages/delv_location/create_links.php
    public static function createArray($class, $method = 'create')
    {
        //Get data from POST
        $data = json_decode(file_get_contents("php://input"));
        foreach ($data as $item) {
            if (self::create($class, $method) === false) {
                $error = new EchoSchema(500, response("__CREATE_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
        }

        http_response_code(200);
        echo '{';
        echo '"message": "' . response("__CREATE_SUCCEEDED__").  '"';
        echo '}';
        return;
    }

    //Loop to delete for an array. sample: pages/delv_location/delete_links.php
    public static function deleteArray($class, $method = 'delete')
    {
        //Get data from POST
        $data = json_decode(file_get_contents("php://input"));
        foreach ($data as $item) {
            if (self::delete($class, $method) === false) {
                $error = new EchoSchema(500, response("__DELETE_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
        }

        http_response_code(200);
        echo '{';
        echo '"message": "' . response("__DELETE_SUCCEEDED__").  '"';
        echo '}';
        return;
    }

    //If $itemData is set, it means it is called from updateArray(), so
    //do not echo if it success, just return true or false.
    public static function update($class, $method = 'update', $itemData = null)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = $database->getConnection($class, $method);

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $object = new $class($db);
        $desc = (isset($object->desc) ? $object->desc : $class);

        // get posted data
        if (isset($itemData)) {
            $data = $itemData;
        } else {
            $data = json_decode(file_get_contents("php://input"));
        }

        // write_log(json_encode($data), __FILE__, __LINE__);

        if ($data) {
            // write_log(json_encode($data), __FILE__, __LINE__);
            foreach ($data as $key => $value) {
                // write_log(sprintf("%s => %s", $key, $value), __FILE__, __LINE__);
                if (is_array($value)) {
                    foreach ($value as $sub_object) {
                        foreach ($sub_object as $sub_key => $sub_value) {
                            // write_log(sprintf("%s => %s", $sub_key, $sub_value), __FILE__, __LINE__);
                            self::handleBoolean($object, $sub_object, $sub_key, $sub_value);
                        }
                    }
                }
                $object->$key = $value;
                self::handleBoolean($object, $object, $key, $value);
            }
        } else {
            // write_log(json_encode($_GET), __FILE__, __LINE__);
            foreach ($_GET as $key => $value) {
                $object->$key = $value;
                self::handleBoolean($object, $object, $key, $value);
            }
        }

        if (method_exists($object, "common_prep")) {
            $object->common_prep();
        }

        if (method_exists($object, "pre_update")) {
            $object->pre_update();
        }

        try {
            if (method_exists($object, "mandatory_fields_check")) {
                $object->mandatory_fields_check();
            }
        } catch (NullableException $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(400, response("__GENERAL_EXCEPTION__", sprintf("Caught exception: %s", $e->getMessage())));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }

            return false;
        }

        // write_log(json_encode($object), __FILE__, __LINE__, LogLevel::DEBUG);
        if (method_exists($object, "check_existence")) {
            if (!$object->check_existence()) {
                $record_str = strlen($object->primiary_key_str()) > 0 ? " (" . $object->primiary_key_str() . ") ": " ";
                write_log(sprintf("record%sdoes not not exist", $record_str), __FILE__, __LINE__, LogLevel::ERROR);
                // $error = new EchoSchema(400, sprintf("record%sdoes not not exist", $record_str));
                $error = new EchoSchema(400, response("__NOT_EXIST__", sprintf("record%sdoes not not exist", $record_str)));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
        }

        self::sanitize($object);
        write_log(json_encode(($object)), __FILE__, __LINE__);

        try {
            if ($object->$method()) {
                if (!isset($itemData)) {
                    http_response_code(200);
                    echo '{';
                    if (method_exists($object, 'primiary_key_str')) {
                        if (strlen($object->primiary_key_str()) > 0) {
                            // echo '"message": "' . $desc . ' (' . $object->primiary_key_str() . ') updated. "';
                            echo '"message": "' . response("__UPDATE_SUCCEEDED__", 
                                sprintf("%s (%s) updated", $desc, $object->primiary_key_str())) . '"';
                        } else {
                            echo '"message": "' . response("__UPDATE_SUCCEEDED__", $desc . ' updated') . '"';
                        }
                        
                    } else {
                        // echo '"message": "' . $desc . ' updated. "';
                        echo '"message": "' . response("__UPDATE_SUCCEEDED__", $desc . ' updated') . '"';
                    }
                    echo '}';
                    return;
                }
                return true;
            } else {
                if (!isset($itemData)) {
                    $error = new EchoSchema(500, response("__UPDATE_FAILED__",
                        sprintf("Unable to update %s . Check logs/php_rest_*.log file for details.", $desc)));
                    echo json_encode($error, JSON_PRETTY_PRINT);
                    return;
                }
                return false;
            }
        } catch (DatabaseException $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", "Database Error: " . $e->getMessage()));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
            return false;
        } catch (Exception $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__GENERAL_EXCEPTION__", "Server Failed Error: " . $e->getMessage()));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
            return false;
        }
    }

    public static function delete($class, $method = 'delete')
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = $database->getConnection($class, $method);

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, reponse("__INVALID_PRIV__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $object = new $class($db);
        $desc = (isset($object->desc) ? $object->desc : $class);

        // get posted data
        $data = json_decode(file_get_contents("php://input"));
        if ($data) {
            foreach ($data as $key => $value) {
                $object->$key = $value;
            }
        } else {
            // write_log(json_encode($_GET), __FILE__, __LINE__);
            foreach ($_GET as $key => $value) {
                $object->$key = $value;
            }
        }

        if (method_exists($object, "common_prep")) {
            $object->common_prep();
        }

        // write_log(json_encode($object), __FILE__, __LINE__);
        if (method_exists($object, "check_existence")) {
            if (!$object->check_existence()) {
                write_log(sprintf("record (%s) does not not exist", $object->primiary_key_str()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(400, response("__NOT_EXIST__", 
                    sprintf("Record (%s) does not not exist", $object->primiary_key_str())));
                echo json_encode($error, JSON_PRETTY_PRINT);

                return;
            }
        }

        self::sanitize($object);
        write_log(json_encode(($object)), __FILE__, __LINE__);

        if (method_exists($object, "pre_delete")) {
            $object->pre_delete();
        }

        try {
            if ($object->$method()) {
                http_response_code(200);
                echo '{';
                echo '"message": "' . response("__DELETE_SUCCEEDED__", $desc . ' deleted') . '"';
                echo '}';
            } else {
                $error = new EchoSchema(500, response("__DELETE_FAILED__", 
                    sprintf("Unable to delete %s . Check logs/php_rest_*.log file for details.", $desc)));
                echo json_encode($error, JSON_PRETTY_PRINT);
            }
        } catch (DatabaseException $e) {
            write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", "Database Error: " . $e->getMessage()));
            echo json_encode($error, JSON_PRETTY_PRINT);
        } catch (Exception $e) {
            write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__GENERAL_EXCEPTION__", "Server Failed Error: " . $e->getMessage()));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    public static function echoRead($retrieve_count, $result, $desc = "")
    {
        http_response_code(200);
        if ($retrieve_count > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = response("__NO_RECORD_FOUND__");
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }

    public static function getCurrPsn()
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        // write_log(json_encode($_SESSION), __FILE__, __LINE__);

        if (isset($_SESSION['PERCODE'])) {
            return $_SESSION['PERCODE'];
        }
        return "";
    }

    public static function getCurrLang()
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        if (isset($_SESSION['LANGUAGE'])) {
            return $_SESSION['LANGUAGE'];
        }
        return "ENG";
    }

    public static function getCurrentSession()
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        if (isset($_SESSION['SESSION'])) {
            return strip_tags($_SESSION['SESSION']);
        }

        return "-1";
    }

    public function getPaging($page, $total_rows, $records_per_page, $page_url)
    {
        // paging array
        $paging_arr = array();

        // button for first page
        $paging_arr["first"] = $page > 1 ? "{$page_url}page=1" : "";

        // count all products in the database to calculate total pages
        $total_pages = ceil($total_rows / $records_per_page);

        // range of links to show
        $range = 3;

        // display links to 'range of pages' around 'current page'
        $initial_num = $page - $range;
        $condition_limit_num = ($page + $range) + 1;

        $paging_arr['pages'] = array();
        $page_count = 0;

        for ($x = $initial_num; $x < $condition_limit_num; $x++) {
            // be sure '$x is greater than 0' AND 'less than or equal to the $total_pages'
            if (($x > 0) && ($x <= $total_pages)) {
                $paging_arr['pages'][$page_count]["page"] = $x;
                $paging_arr['pages'][$page_count]["url"] = "{$page_url}page={$x}";
                $paging_arr['pages'][$page_count]["current_page"] = ($x == $page ? "yes" : "no");

                $page_count++;
            }
        }

        // button for last page
        $paging_arr["last"] = $page < $total_pages ? "{$page_url}page={$total_pages}" : "";

        // json format
        return $paging_arr;
    }

    /**
     * When CGI returns a xml, this can get value of a field
     * for example:
     * <?xml version="1.0" encoding="GB2312" ?>
     * <OMEGA_XML>
     * <MSG_CODE>0</MSG_CODE>
     * <MSG_DESC>SUCCESS!</MSG_DESC>
     * </OMEGA_XML>
     * If want to get 0, $xml_str would be this string, $field is MSG_CODE
     */
    public static function get_cgi_xml_value($xml_str, $field)
    {
        $pattern = $field . ">";
        $pattern_len = strlen($pattern);
        $pos_1 = strpos($xml_str, $pattern);
        if ($pos_1 === false) {
            return "";
        }

        $pos_2 = strpos($xml_str, "<", $pos_1);
        return substr($xml_str, $pos_1 + $pattern_len, $pos_2 - $pos_1 - $pattern_len);
    }
}
