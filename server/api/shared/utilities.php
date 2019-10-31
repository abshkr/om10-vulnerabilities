<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../config/database.php';

class ErrorSchema
{
    public function __construct($code, $type, $msg)
    {
        $this->errors = array();
        $this->errors[0] = new stdClass();
        $this->errors[0]->code = $code;
        $this->errors[0]->type = $type;
        $this->errors[0]->message = $msg;
    }
}

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

    public static function http_cgi_invoke($cgi)
    {
        session_start();

        $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . "/" . $cgi . "?";
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            foreach ($_POST as $key => $value) {
                $url .= $key . "=" . rawurlencode(strip_tags($value)) . "&";
            }
        } else {
            foreach ($_GET as $key => $value) {
                $url .= $key . "=" . rawurlencode(strip_tags($value)) . "&";
            }
        }

        $url .= "sess_id=" . $_SESSION["SESSION"];
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

    /**
     * params can be an array, like array (
     * "target_code" => "TRANSP_EQUIP"
     * );
     * See pages\equipment\expiry_types.php for reference
     */
    public static function read($class, $method = 'read', $filter = false, $params = null)
    {
        $database = new Database();
        $db = null;

        // initialize object
        try {
            $db = $database->getConnection($class, $method);
        } catch (UnauthException $e) {
            // http_response_code(401);
            http_response_code(200);
            echo 'Caught exception: ', $e->getMessage();
            return;
        }

        $object = new $class($db);

        if ($filter) {
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

        $stmt = $object->$method();
        if (is_array($stmt)) {
            //means it is handled inside $object->$method()
            return;
        } else if (!$stmt) {
            // http_response_code(500);
            http_response_code(200);
            echo "Internal error, check logs/php_rest_*.log file for details";
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
         * report_profile.php read_decorate for example
         */
        if (method_exists($object, "read_decorate")) {
            $object->read_decorate($result["records"]);
        }

        http_response_code(200);
        if ($num > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = "No record found.";
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
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

        if ($num > 0) {
            http_response_code(200);
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            // http_response_code(404);
            http_response_code(200);
            echo json_encode(
                array("message" => "No record found.")
            );
        }
    }

    public static function retrieve(&$result_array, $object, $stmt, $method = "read")
    {
        // write_log(sprintf("%s::%s() START, class:%s, method:%s",
        //     __CLASS__, __FUNCTION__, get_class($object), $method),
        //     __FILE__, __LINE__);

        $num = 0;
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $num += 1;

            $base_item = array();
            foreach ($row as $key => $value) {
                $lower_key = strtolower($key);
                // write_log(sprintf("%s, %s", $lower_key, $key), __FILE__, __LINE__);
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
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $database = new Database();
        $db = $database->getConnection($class, $method);

        $object = new $class($db);
        $desc = (isset($object->desc) ? $object->desc : $class);

        // get posted data
        $data = json_decode(file_get_contents("php://input"));
        // write_log(json_encode($data), __FILE__, __LINE__);
        if ($data) {
            foreach ($data as $key => $value) {
                $object->$key = $value;
                self::handleBoolean($class, $object, $key, $value);
            }
        } else {
            // write_log(json_encode($_GET), __FILE__, __LINE__);
            foreach ($_GET as $key => $value) {
                $object->$key = $value;
                self::handleBoolean($class, $object, $key, $value);
            }
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
            if (HTTP_CODE_ENABLED) {
                http_response_code(400);
            } else {
                http_response_code(200);
            }
            echo '{';
            echo '"detail": "Caught exception: ', $e->getMessage() . '"';
            echo '}';
            return;
        }

        if ($object->check_exists && method_exists($object, "check_existence")) {
            if ($object->check_existence()) {
                if (HTTP_CODE_ENABLED) {
                    http_response_code(400);
                } else {
                    http_response_code(200);
                }
                $error = new ErrorSchema(400, "Bad Request", sprintf("record (%s) already exist", $object->primiary_key_str()));
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
                echo '{';
                echo '"message": "Unable to create ' .
                    $desc .
                    '. Check logs/php_rest_*.log file for details."';
                echo '}';
            }
        } catch (IncompleteParameterException $e) {
            if (HTTP_CODE_ENABLED) {
                http_response_code(400);
            } else {
                http_response_code(200);
            }
            $error = new ErrorSchema(400, "Bad Request", $e->getMessage());
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    private static function handleBoolean($class, $object, $key, $value)
    {
        $upper_key = strtoupper($key);
        // write_log(sprintf("%s => %s", $key, $value), __FILE__, __LINE__);
        // write_log(sprintf("%s, %s", strtoupper($class), $upper_key), __FILE__, __LINE__);

        if (isset($object->BOOLEAN_FIELDS) &&
            array_key_exists($upper_key, $object->BOOLEAN_FIELDS)) {
            if ($object->BOOLEAN_FIELDS[$upper_key] === 'Y') {
                if ($value) {
                    $object->{$key} = 'Y';
                } else {
                    $object->{$key} = 'N';
                }

            } else if ($object->BOOLEAN_FIELDS[$upper_key] === 'T') {
                if ($value) {
                    $object->{$key} = 'T';
                } else {
                    $object->{$key} = 'F';
                }

            } else if ($object->BOOLEAN_FIELDS[$upper_key] === '1') {
                if ($value) {
                    $object->{$key} = 1;
                } else {
                    $object->{$key} = 0;
                }

            }
        }
    }

    //Loop to update for an array
    public static function updateArray($class, $method = 'update')
    {
        //Get data from POST
        $data = json_decode(file_get_contents("php://input"));
        foreach ($data as $item) {
            if (self::update($class, $method, $item) === false) {
                http_response_code(500);
                echo '{';
                echo '"message": "Unable to update. Check logs/php_rest_*.log file for details."';
                echo '}';
                return;
            }
        }

        http_response_code(200);
        echo '{';
        echo '"message": "Successfully updated. "';
        echo '}';
        return;
    }

    //If $itemData is set, it means it is called from updateArray(), so
    //do not echo if it success, just return true or false.
    public static function update($class, $method = 'update', $itemData = null)
    {
        $database = new Database();
        $db = $database->getConnection($class, $method);

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
                $object->$key = $value;
                self::handleBoolean($class, $object, $key, $value);
            }
        } else {
            // write_log(json_encode($_GET), __FILE__, __LINE__);
            foreach ($_GET as $key => $value) {
                $object->$key = $value;
                self::handleBoolean($class, $object, $key, $value);
            }
        }

        try {
            if (method_exists($object, "mandatory_fields_check")) {
                $object->mandatory_fields_check();
            }

        } catch (NullableException $e) {
            // http_response_code(422);
            if (!isset($itemData)) {
                if (HTTP_CODE_ENABLED) {
                    http_response_code(500);
                } else {
                    http_response_code(200);
                }
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new ErrorSchema(400, "Bad Request", sprintf("Caught exception: %s", $e->getMessage()));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }

            return false;
        }

        // write_log(json_encode($object), __FILE__, __LINE__, LogLevel::DEBUG);
        if (method_exists($object, "check_existence")) {
            if (!$object->check_existence()) {
                if (HTTP_CODE_ENABLED) {
                    http_response_code(500);
                } else {
                    http_response_code(200);
                }

                // echo '{';
                // echo '"errors": [';
                // echo '   {';
                // echo '    "code": 500,';
                // echo '    "type": "ServerFailedError",';
                // echo '    "message": "' . sprintf("record (%s) does not not exist", $object->primiary_key_str()) . '"';
                // echo '   }';
                // echo ']';
                // echo '}';
                write_log(sprintf("record (%s) does not not exist", $object->primiary_key_str()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new ErrorSchema(400, "Bad Request", sprintf("record (%s) does not not exist", $object->primiary_key_str()));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
        }

        Utilities::sanitize($object);

        try {
            if ($object->$method()) {
                if (!isset($itemData)) {
                    http_response_code(200);
                    echo '{';
                    if (method_exists($object, 'primiary_key_str')) {
                        echo '"message": "' . $desc . ' (' . $object->primiary_key_str() . ') updated. "';
                    } else {
                        echo '"message": "' . $desc . ' updated. "';
                    }
                    echo '}';
                    return;
                }
                return true;
            } else {
                if (!isset($itemData)) {
                    http_response_code(500);
                    echo '{';
                    echo '"message": "Unable to update ' .
                        $desc .
                        '. Check logs/php_rest_*.log file for details."';
                    echo '}';
                    return;
                }
                return false;
            }
        } catch (DatabaseException $e) {
            // http_response_code(422);
            if (!isset($itemData)) {
                if (HTTP_CODE_ENABLED) {
                    http_response_code(500);
                } else {
                    http_response_code(200);
                }
                
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new ErrorSchema(500, "Database Error", $e->getMessage());
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
            return false;
        } catch (Exception $e) {
            // http_response_code(422);
            if (!isset($itemData)) {
                if (HTTP_CODE_ENABLED) {
                    http_response_code(500);
                } else {
                    http_response_code(200);
                }
                
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new ErrorSchema(500, "Server Failed Error", $e->getMessage());
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
            return false;
        }
    }

    public static function delete($class, $method = 'delete')
    {
        $database = new Database();
        $db = $database->getConnection($class, $method);

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

        // write_log(json_encode($object), __FILE__, __LINE__);
        if (method_exists($object, "check_existence")) {
            if (!$object->check_existence()) {
                if (HTTP_CODE_ENABLED) {
                    http_response_code(400);
                } else {
                    http_response_code(200);
                }
                
                write_log(sprintf("record (%s) does not not exist", $object->primiary_key_str()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new ErrorSchema(400, "Bad Request", sprintf("record (%s) does not not exist", $object->primiary_key_str()));
                echo json_encode($error, JSON_PRETTY_PRINT);

                return;
            }
        }

        try {
            if ($object->$method()) {
                echo '{';
                echo '"message": "' . $desc . ' deleted."';
                echo '}';
            } else {
                if (HTTP_CODE_ENABLED) {
                    http_response_code(500);
                } else {
                    http_response_code(200);
                }
                
                echo '{';
                echo '"message": "Unable to delete ' .
                    $desc .
                    '. Check logs/php_rest_*.log file for details."';
                echo '}';
            }
        } catch (DatabaseException $e) {
            if (HTTP_CODE_ENABLED) {
                http_response_code(500);
            } else {
                http_response_code(200);
            }

            write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            $error = new ErrorSchema(500, "Database Error", $e->getMessage());
            echo json_encode($error, JSON_PRETTY_PRINT);
        } catch (Exception $e) {
            if (HTTP_CODE_ENABLED) {
                http_response_code(500);
            } else {
                http_response_code(200);
            }

            write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            $error = new ErrorSchema(500, "Server Failed Error", $e->getMessage());
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    public static function echoRead($retrieve_count, $result, $desc = "")
    {
        http_response_code(200);
        if ($retrieve_count > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = "No record found.";
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }

    public static function getCurrPsn()
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        if (isset($_SESSION['PERCODE'])) {
            return $_SESSION['PERCODE'];
        }
        return "";
    }

    public static function getCurrentSession()
    {
        session_start();
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
