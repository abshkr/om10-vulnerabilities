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
        $class_name = get_class($obj);
        foreach ($obj as $key => $value) {
            if (!is_string($value)) {
                continue;
            }

            $obj->{$key} = htmlspecialchars($value);
            if (isset($obj->AMPERSAND_FIELDS) && in_array(strtoupper($key), $obj->AMPERSAND_FIELDS)) {
                $obj->{$key} = str_replace("&amp;", "&", $obj->{$key});
            }
        }
    }

    /**
    * Recursively process an array to convert all values in the array
    * @param $data the array to be processed. This is pass-by-reference.
    */
    public static function arrayEncodingConversion(&$data, $to = 'UTF-8', $from = 'GB18030')
    // public static function arrayEncodingConversion(&$data, $to = 'UTF-8', $from = 'GB2312')
    // public static function arrayEncodingConversion(&$data, $to = 'GB2312', $from = 'UTF-8')
    {
        $nls_lang_str = strtoupper($_SERVER['NLS_LANG']);
        if ( strpos( $nls_lang_str, "AL32UTF8" ) !== FALSE ) {
            return;
        }
        
        foreach($data as $key => $value) {
            if (is_array($value) || is_object($value)) {
                if (is_array($data))
                    self::arrayEncodingConversion($data[$key], $to, $from);
                else if (is_object($data))
                    self::arrayEncodingConversion($data->$key, $to, $from);
            } else {
                if (is_string($value)) {
                    if (is_array($data))
                        $data[$key] = mb_convert_encoding($value, $to, $from);
                    else if (is_object($data))
                        $data->$key = mb_convert_encoding($value, $to, $from);
                }
            }
        }
    }


    // Because some CGI may return language-related content to indicate the success or failure of DB operations,
    // we need check them according to the particular langauge.
    public static function http_cgi_result($response, $results)
    {
        /* 
        // old code in V9 for the deletion of a record
        $patternSuccessEng = "Successfully Deleted";
        $patternSuccessChn = "成功删除";
        $patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
            logMe("Delete load schedule failed!!!",LOADSCHEDCLASS);
            return "ERROR";
        } */

        $lang = self::getCurrLang();

        $isFound = false;
        foreach ($results as $key => $value) {
            if ($lang === $key) {
                $patternSuccess = $value;
                // check if the response body contains the text indicating success
                $isFound = strpos($response, $patternSuccess);
                if ($isFound === true) {
                    break;
                }
                // if not found the success text, it may have different encoding in Chinese
                // CGI uses GB2312 for Chinese, V10 uses UTF-8.
                if ($lang === 'CHN') {
                    // $value is from V10 PHP in UTF-8 format
                    // the text in response is in GB2312
                    // $patternSuccess = mb_convert_encoding($value, 'UTF-8', 'GB2312');
                    $patternSuccess = mb_convert_encoding($value, 'GB2312', 'UTF-8');
                    // check if the response body contains the text indicating success
                    $isFound = strpos($response, $patternSuccess);
                    if ($isFound === true) {
                        break;
                    }
                }
            }
        }

        return $isFound;
    }

    public static function http_get_cgi($cgi)
    {
        $location = realpath($cgi);
        if ($location !== false) {
            write_log(sprintf("%s::%s(), location:%s", __CLASS__, __FUNCTION__, $location),
                __FILE__, __LINE__, LogLevel::ERROR);
            if (!str_starts_with($location, 'cgi-bin')) {
                return "invalid cgi";
            }
        }

        $host = $_SERVER['SERVER_ADDR'];
        if (getenv('USE_SERVER_NAME_IN_CGI') == 'Y') {
            $host = $_SERVER['SERVER_NAME'];
        }
        $url = URL_PROTOCOL . basename($host) . ":" . basename($_SERVER['SERVER_PORT']) . "/" . $cgi . "?";
        
        foreach ($_GET as $key => $value)
        {
            $url .= basename($key) . "=". rawurlencode(strip_tags($value)) . "&";
        }
        //$url = substr($url, 0, -1);
        if (!JWT_AUTH)
        {
            session_start();
            if (isset($_SESSION["SESSION"])) {
                $url .= "sess_id=" . basename($_SESSION["SESSION"]);
            }
        }
        
        if (strpos(URL_PROTOCOL, "https") !== false) {
            $arrContextOptions = array(
                "ssl"=>array(
                    "verify_peer"=>false,
                    "verify_peer_name"=>false,
                ),
            );  
            
            return file_get_contents($url, false, stream_context_create($arrContextOptions));
            
        } else {
            return file_get_contents($url);
        }
    }

    public static function http_cgi_invoke($cgi, $query_string = null)
    {
        $location = realpath($cgi);
        if ($location !== false) {
            write_log(sprintf("%s::%s(), location:%s", __CLASS__, __FUNCTION__, $location),
                __FILE__, __LINE__, LogLevel::ERROR);
            if (!str_starts_with($location, 'cgi-bin')) {
                return "invalid cgi";
            }
        }

        $host = $_SERVER['SERVER_ADDR'];
        if (getenv('USE_SERVER_NAME_IN_CGI') == 'Y') {
            $host = $_SERVER['SERVER_NAME'];
        }
        $url = URL_PROTOCOL . $host . ":" . $_SERVER['SERVER_PORT'] . "/" . $cgi . "?";
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
                    $url .= basename($key) . "=" . rawurlencode(strip_tags($value)) . "&";
                }
            } else {
                foreach ($_GET as $key => $value) {
                    $url .= basename($key) . "=" . rawurlencode(strip_tags($value)) . "&";
                }
            }
        }
        
        $url .= "sess_id=" . basename(self::getCurrentSession());

        write_log(sprintf("%s::%s(), url:%s", __CLASS__, __FUNCTION__, $url),
            __FILE__, __LINE__);

        $result = null;
        if (strpos(URL_PROTOCOL, "https") !== false) {
            $arrContextOptions = array(
                "ssl"=>array(
                    "verify_peer"=>false,
                    "verify_peer_name"=>false,
                ),
            );  
            
            $result = @file_get_contents($url, false, stream_context_create($arrContextOptions));
            
        } else {
            $result = @file_get_contents($url);
        }
        
        if ($result === false) {
            // write_log(json_encode(()), __FILE__, __LINE__);
            $e = error_get_last();
            return $e['message'];
        }

        return $result;
    }

    public static function read($class_name, $method = 'read', $filter = true, $params = null)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class_name, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = null;

        // initialize object
        try {
            $db = $database->getConnection($class_name, $method);
        } catch (InvalidToeknException $e) {
            $error = new EchoSchema(498, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        }

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class_name, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            die();
            return;
        }

        $object = new $class_name($db);

        if ($filter) {
            //Prior to PHP 5.6, a stream opened with php://input could only be read once
            $data = json_decode(file_get_contents("php://input"));
            // write_log(json_encode($data), __FILE__, __LINE__);
            if ($data) {
                foreach ($data as $key => $value) {
                    $object->$key = $value;
                    $object->uri_arugments[$key] = $value;
                }
            } else {
                // write_log(json_encode($_GET), __FILE__, __LINE__);
                foreach ($_GET as $key => $value) {
                    $object->$key = $value;
                    $object->uri_arugments[$key] = $value;
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
            // feel like it should echo the result if $stmt is an array return from $object->$method()
            /* http_response_code(200);
            if (count($stmt) > 0) {
                echo json_encode($stmt, JSON_PRETTY_PRINT);
            } else {
                $result["message"] = response("__NO_RECORD_FOUND__");
                echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            } */
            return;
        } else if (!$stmt) {
            $error = new EchoSchema(500, response("__INTERNAL_ERROR__"));
            die();
            return;
        }

        $result = array();
        if (isset($object->start_num) && isset($object->end_num)) {
            $result["count"] = $object->pagination_count();
            $result["next"] = null;
            $result["previous"] = null;
            if (intval($object->start_num) > 1) {
                $prev_start = $object->start_num - ($object->end_num - $object->start_num) - 1;
                if ($prev_start < 0) {
                    $prev_start = 0;
                }
                $prev_end = intval($object->start_num) - 1;
                $result["previous"] = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . 
                    "://$_SERVER[HTTP_HOST]" . strtok($_SERVER["REQUEST_URI"], '?') . '?start_num=' . $prev_start . '&end_num=' . $prev_end;
                
                foreach ($object->uri_arugments as $key => $value) {
                    if ($key === 'start_num' || $key === 'end_num') {
                        continue;
                    }

                    $result["previous"] .= '&' . $key . '=' . rawurlencode(strip_tags($value));
                }
            }

            $result["start_num"] = intval($object->start_num);
            $result["end_num"] = intval($object->end_num);
        }
        
        $temp_array = array();
        
        /**
         * last parameter method: normally it is read, so the hook name
         * is read_hook; if method is other name, like composition
         * in Tanker, so the hook method is composition_hook
         */
        $num = self::retrieve($temp_array, $object, $stmt, $method);
        if (isset($start_num->start_num) && isset($start_num->end_num)) {
            $result["retrieved"] = $num;
            if (intval($object->start_num) + $num < $result["count"]) {
                $next_start = $object->end_num + 1;
                $next_end = $next_start + $num - 1;
                $result["next"] = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . 
                    "://$_SERVER[HTTP_HOST]" . strtok($_SERVER["REQUEST_URI"], '?') . '?start_num=' . $next_start . '&end_num=' . $next_end;
                
                foreach ($object->uri_arugments as $key => $value) {
                    if ($key === 'start_num' || $key === 'end_num') {
                        continue;
                    }

                    $result["next"] .= '&' . $key . '=' . rawurlencode(strip_tags($value));
                }
            }
        }

        $result["records"] = $temp_array;

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
            // self::arrayEncodingConversion($result["records"]);
            // self::arrayEncodingConversion($result["records"], 'UTF-8', 'GB18030');
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = response("__NO_RECORD_FOUND__");
            echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Identical to read(), the difference is it does not continue after calling $object->$method()
     */
    public static function exec2($class_name, $method = 'read', $filter = true)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class_name, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = null;

        // initialize object
        try {
            $db = $database->getConnection2($class_name, $method);
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        }

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class_name, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            die();
            return;
        }

        $object = new $class_name($db);

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

        self::sanitize($object);

        if (method_exists($object, "common_prep")) {
            $object->common_prep();
        }
        
        return $object->$method();
    }

    /**
     * Identical to read(), the difference is it does not continue after calling $object->$method()
     */
    public static function exec($class_name, $method = 'read', $filter = true, $params = null)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class_name, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = null;

        // initialize object
        try {
            $db = $database->getConnection($class_name, $method);
        } catch (InvalidToeknException $e) {
            $error = new EchoSchema(498, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        }

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class_name, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            die();
            return;
        }

        $object = new $class_name($db);

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

    public static function count($class_name, $method = 'count', $filter = false)
    {
        $database = new Database();
        $db = null;
        try {
            $db = $database->getConnection($class_name, $method);
        } catch (InvalidToeknException $e) {
            $error = new EchoSchema(498, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        }

        // initialize object
        $object = new $class_name($db);

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
    public static function simpliedRead($class_name, $method = 'read', $filter = false)
    {
        $database = new Database();
        $db = null;
        try {
            $db = $database->getConnection($class_name, $method);
        } catch (InvalidToeknException $e) {
            $error = new EchoSchema(498, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        }

        // initialize object
        $object = new $class_name($db);

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
        /*
        write_log("DB1111 error:" . "gettype('111')=".gettype('111')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "gettype(111)=".gettype(111)."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "gettype('abc')=".gettype('abc')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "gettype('11.1')=".gettype('11.1')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "gettype(11.1)=".gettype(11.1)."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "is_int(111)=".is_int(111)."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "is_int('111')=".is_int('111')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "is_int('abc')=".is_int('abc')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "is_string('111')=".is_string('111')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "is_string('abc')=".is_string('abc')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "is_numeric('11.1')=".is_numeric('11.1')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "is_numeric('a11.1')=".is_numeric('a11.1')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "is_numeric(11.1)=".is_numeric(11.1)."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "intval(111)=".intval(111)."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "intval('111')=".intval('111')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "intval('11.1')=".intval('11.1')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "intval(11.1)=".intval(11.1)."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "intval('abc')=".intval('abc')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "floatval(111)=".floatval(111)."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "floatval('111')=".floatval('111')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "floatval('11.1')=".floatval('11.1')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "floatval(11.1)=".floatval(11.1)."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        write_log("DB1111 error:" . "floatval('abc')=".floatval('abc')."!!!",  __FILE__, __LINE__, LogLevel::ERROR);
        */

        $num = 0;
        //while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS + OCI_RETURN_LOBS)) {
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $num += 1;

            $base_item = array();
            foreach ($row as $key => $value) {
                $lower_key = strtolower($key);
                // write_log(sprintf("%s, %s=>%s", $lower_key, $key, $value), __FILE__, __LINE__);
                if (isset($object->BOOLEAN_FIELDS) &&
                    array_key_exists($key, $object->BOOLEAN_FIELDS)) {
                    // write_log("getit", __FILE__, __LINE__);
                    // the value could be an integer or a string
                    // need do special handling in PHP 8
                    if ((is_numeric($value) && (intval($value) > 0 || intval($value) === 1))
                        || $value === 'T' || $value === 'Y' ||  $value === 't' || $value === 'y') {
                        $base_item[$lower_key] = true;
                    } else {
                        $base_item[$lower_key] = false;
                    }
                } 
                else if (isset($object->NUMBER_FIELDS) &&
                    (array_key_exists($key, $object->NUMBER_FIELDS) || 
                    in_array($key, $object->NUMBER_FIELDS, true))) {
                    if (array_key_exists($key, $object->NUMBER_FIELDS) && !is_null($value)) {
                        $base_item[$lower_key] = round((float) $value, $object->NUMBER_FIELDS[$key]);
                    }
                    if (in_array($key, $object->NUMBER_FIELDS, true) && !is_null($value)) {
                        $base_item[$lower_key] = (float) $value;
                    }
                }
                else if (isset($object->CLOB_FIELDS) &&
                    (array_key_exists($key, $object->CLOB_FIELDS) ||
                    in_array($key, $object->CLOB_FIELDS, true))) {
                    if ($value !== null) {
                        $base_item[$lower_key] = $value->load();
                        //$base_item[$lower_key] = self::xml_to_json($base_item[$lower_key]);
                        //$base_item[$lower_key] = self::xml_to_json($value);
                    } else {
                        $base_item[$lower_key] = null;
                    }
                } else {
                    // $base_item[$lower_key] = $value;
                    $base_item[$lower_key] = htmlspecialchars_decode($value);
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

    //If $itemData is set, it means it is called from createArray(), so
    //do not echo if it success, just return true or false.
    public static function create($class_name, $method = 'create', $itemData = null)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class_name, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = null;
        try {
            $db = $database->getConnection($class_name, $method);
        } catch (InvalidToeknException $e) {
            $error = new EchoSchema(498, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        }

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class_name, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            die();
            return;
        }

        $object = new $class_name($db);
        $desc = (isset($object->desc) ? $object->desc : $class_name);

        // get posted data
        if (isset($itemData)) {
            $data = $itemData;
        } else {
            $data = json_decode(file_get_contents("php://input"));
        }

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
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                // $error = new EchoSchema(400, sprintf("Caught exception: %s", $e->getMessage()));
                $error = new EchoSchema(400, response("__GENERAL_EXCEPTION__", sprintf("Caught exception: %s", $e->getMessage())));
                die();
                return;
            }

            return false;
        }

        if ($object->check_exists && method_exists($object, "check_existence")) {
            if ($object->check_existence()) {
                $record_str = strlen($object->primiary_key_str()) > 0 ? " (" . $object->primiary_key_str() . ") ": " ";
                // $error = new EchoSchema(400, sprintf("record%salready exist", $record_str));
                $error = new EchoSchema(400, response("__ALREADY_EXIST__", sprintf("record%salready exist", $record_str)));
                die();
                return;
            }
        }
            
        try {
            if ($object->$method()) {
                if (!isset($itemData)) {
                    echo '{';
                    echo '"message": "' . $desc . ' created."';
                    echo '}';
                    /*
                    http_response_code(200);
                    echo '{';
                    if (method_exists($object, 'primiary_key_str')) {
                        if (strlen($object->primiary_key_str()) > 0) {
                            // echo '"message": "' . $desc . ' (' . $object->primiary_key_str() . ') created. "';
                            echo '"message": "' . response("__CREATE_SUCCEEDED__", 
                                sprintf("%s (%s) created", $desc, $object->primiary_key_str())) . '"';
                        } else {
                            echo '"message": "' . response("__CREATE_SUCCEEDED__", $desc . ' created') . '"';
                        }
                        
                    } else {
                        // echo '"message": "' . $desc . ' created. "';
                        echo '"message": "' . response("__CREATE_SUCCEEDED__", $desc . ' created') . '"';
                    }
                    echo '}';
                    */
                    return;
                }
                return true;
            } else {
                if (!isset($itemData)) {
                    // $error = new EchoSchema(500, 
                    // sprintf("Unable to create %s . Check logs/php_rest_*.log file for details.", $desc));
                    $error = new EchoSchema(500, response("__CREATE_FAILED__", 
                        sprintf("Unable to create %s . Internal server error.", $desc)));
                    die();
                    return;
                }
                return false;
            }
        } catch (DatabaseException $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("Database Error: %s", $e->getMessage())));
                die();
                return;
            }
            return false;
        } catch (IncompleteParameterException $e) {
            if (!isset($itemData)) {
                // $error = new EchoSchema(400, "Bad Request: " . $e->getMessage());
                $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "Bad Request: " . $e->getMessage()));
                die();
                return;
            }
            return false;
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
        // write_log(sprintf("%s, %s", strtoupper($class_name), $upper_key), __FILE__, __LINE__);

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
    public static function updateArray($class_name, $method = 'update')
    {
        if (method_exists($class_name, "pre_update_array")) {
            $database = new Database();
            $db = null;
            try {
                $db = $database->getConnection($class_name, "pre_update_array");
            } catch (InvalidToeknException $e) {
                $error = new EchoSchema(498, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
                die();
                return;
            } catch (UnauthException $e) {
                $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
                die();
                return;
            }

            $access_check = new AccessCheck($db);
            if (!$access_check->check($class_name, $method, self::getCurrPsn())) {
                $error = new EchoSchema(400, response("__INVALID_PRIV__"));
                die();
                return;
            }

            $object = new $class_name($db);
            $object->pre_update_array();
        }

        //Get data from POST
        $data = json_decode(file_get_contents("php://input"));
        foreach ($data as $item) {
            if (self::update($class_name, $method, $item) === false) {
                $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
                die();
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
    public static function createArray($class_name, $method = 'create')
    {
        //Get data from POST
        $data = json_decode(file_get_contents("php://input"));
        foreach ($data as $item) {
            if (self::create($class_name, $method, $item) === false) {
                $error = new EchoSchema(500, response("__CREATE_FAILED__"));
                die();
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
    public static function deleteArray($class_name, $method = 'delete')
    {
        //Get data from POST
        $data = json_decode(file_get_contents("php://input"));
        foreach ($data as $item) {
            if (self::delete($class_name, $method, $item) === false) {
                $error = new EchoSchema(500, response("__DELETE_FAILED__"));
                die();
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
    public static function update($class_name, $method = 'update', $itemData = null)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class_name, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = null;
        try {
            $db = $database->getConnection($class_name, $method);
        } catch (InvalidToeknException $e) {
            $error = new EchoSchema(498, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        } catch (UnauthException $e) {
            $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
            die();
            return;
        }

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class_name, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, response("__INVALID_PRIV__"));
            die();
            return;
        }

        $object = new $class_name($db);
        $desc = (isset($object->desc) ? $object->desc : $class_name);

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
                if (is_array($value) || is_object($value)) {
                    foreach ($value as $sub_object) {
                        if (is_array($sub_object) || is_object($sub_object)) {
                            foreach ($sub_object as $sub_key => $sub_value) {
                                // write_log(sprintf("%s => %s", $sub_key, $sub_value), __FILE__, __LINE__);
                                self::handleBoolean($object, $sub_object, $sub_key, $sub_value);
                            }
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
            if ($method === 'update' && method_exists($object, "mandatory_fields_check")) {
                $object->mandatory_fields_check();
            }
        } catch (NullableException $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(400, response("__GENERAL_EXCEPTION__", sprintf("Caught exception: %s", $e->getMessage())));
                die();
                return;
            }

            return false;
        }

        // write_log(json_encode($object), __FILE__, __LINE__, LogLevel::DEBUG);
        if ($method === 'update' && method_exists($object, "check_existence")) {
            if (!$object->check_existence()) {
                if ($object->create_in_update) {
                    $method = "create";
                } else {
                    $record_str = strlen($object->primiary_key_str()) > 0 ? " (" . $object->primiary_key_str() . ") ": " ";
                    write_log(sprintf("record%sdoes not not exist", $record_str), __FILE__, __LINE__, LogLevel::ERROR);
                    // $error = new EchoSchema(400, sprintf("record%sdoes not not exist", $record_str));
                    $error = new EchoSchema(400, response("__NOT_EXIST__", sprintf("record%sdoes not not exist", $record_str)));
                    die();
                    return;
                }
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
                        sprintf("Unable to update %s . Internal server error.", $desc)));
                    die();
                    return;
                }
                return false;
            }
        } catch (DatabaseException $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", "Database Error: " . $e->getMessage()));
                die();
                return;
            }
            return false;
        } catch (Exception $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__GENERAL_EXCEPTION__", "Server Failed Error: " . $e->getMessage()));
                die();
                return;
            }
            return false;
        }
    }

    //If $itemData is set, it means it is called from deleteArray(), so
    //do not echo if it success, just return true or false.
    public static function delete($class_name, $method = 'delete', $itemData = null)
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class_name, $method),
            __FILE__, __LINE__);

        $database = new Database();
        $db = $database->getConnection($class_name, $method);

        $access_check = new AccessCheck($db);
        if (!$access_check->check($class_name, $method, self::getCurrPsn())) {
            $error = new EchoSchema(400, reponse("__INVALID_PRIV__"));
            die();
            return;
        }

        $object = new $class_name($db);
        $desc = (isset($object->desc) ? $object->desc : $class_name);

        // get posted data
        if (isset($itemData)) {
            $data = $itemData;
        } else {
            $data = json_decode(file_get_contents("php://input"));
        }

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
                die();

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
                if (!isset($itemData)) {
                    http_response_code(200);
                    echo '{';
                    echo '"message": "' . response("__DELETE_SUCCEEDED__", $desc . ' deleted') . '"';
                    echo '}';
                }
                return true;
            } else {
                if (!isset($itemData)) {
                    $error = new EchoSchema(500, response("__DELETE_FAILED__", 
                        sprintf("Unable to delete %s. Most likely this record may have child record(s).", $desc)));
                    die();
                }
                return false;
            }
        } catch (DatabaseException $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", "Database Error: " . $e->getMessage()));
                die();
            }
            return false;
        } catch (Exception $e) {
            if (!isset($itemData)) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__GENERAL_EXCEPTION__", "Server Failed Error: " . $e->getMessage()));
                die();
            }
            return false;
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
        if (JWT_AUTH) {
            if (EXCLUED_POSTMAN_AUTHCHECK) {
                if ((isset($_SERVER['HTTP_USER_AGENT']) && substr($_SERVER['HTTP_USER_AGENT'], 0, 7) === 'Postman')) {
                    write_log("Postman, use 9999 as user", __FILE__, __LINE__);
                    return "9999";
                }
            }

            try {
                $token = get_http_token();
                $pay_load = check_token($token);
                if ($pay_load) {
                    return $pay_load->per_code;
                } else {
                    write_log("Failed to check token", __FILE__, __LINE__, LogLevel::ERROR);
                }
            } catch (Exception $e) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            }
        } 

        if (!isset($_SESSION)) {
            session_start();
        }

        // write_log(json_encode($_SESSION), __FILE__, __LINE__);
        // write_log($_SESSION['PERCODE'], __FILE__, __LINE__);

        if (isset($_SESSION['PERCODE'])) {
            return $_SESSION['PERCODE'];
        }

        if (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], 'localhost')) {
            // write_log("localhotst", __FILE__, __LINE__);
            return "9999";
        }

        return "";
    }

    public static function getCurrLang()
    {
        if (JWT_AUTH) {
            try {
                $token = get_http_token();
                $pay_load = check_token($token);
                // write_log(json_encode($pay_load), __FILE__, __LINE__);

                if ($pay_load) {
                    return $pay_load->lang ? $pay_load->lang : 'ENG';
                } else {
                    write_log("Failed to check token", __FILE__, __LINE__, LogLevel::ERROR);
                }
            } catch (Exception $e) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            }
        }

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
        if (JWT_AUTH) {
            try {
                $token = get_http_token();
                $pay_load = check_token($token);
                if ($pay_load) {
                    return $pay_load->sess_id;
                } else {
                    write_log("Failed to check token", __FILE__, __LINE__, LogLevel::ERROR);
                }
            } catch (Exception $e) {
                write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
            }
        }

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

    //validate only XML. HTML will be ignored.
    function is_valid_xml($content) {
        $content = trim($content);
        if (empty($content)) {
            return false;
        }
        //html go to hell!
        if (stripos($content, '<!DOCTYPE html>') !== false) {
            return false;
        }

        libxml_use_internal_errors(true);
        simplexml_load_string($content);
        $errors = libxml_get_errors();          
        libxml_clear_errors();  

        return empty($errors);
    }

	public static function xml_to_json ($contents) {
        //write_log("xml_to_json: ".$contents, __FILE__, __LINE__);
        if ($contents === null) {
            return null;
        }
        $contents = htmlspecialchars_decode($contents);
		$contents = str_replace(array("\n", "\r", "\t"), '', $contents);
        //write_log("xml_to_json2: ".$contents, __FILE__, __LINE__);

		$contents = trim(str_replace('"', "'", $contents));
        //write_log("xml_to_json3: ".$contents, __FILE__, __LINE__);

        $simpleXml = simplexml_load_string($contents);
        //write_log("xml_to_json4: ".$simpleXml, __FILE__, __LINE__);
        if ($simpleXml === FALSE) {
            $simpleXml = $contents;
        }

		//$json = (array)$simpleXml;
		//$json = $simpleXml;
        $json = json_encode($simpleXml);
        //write_log("xml_to_json5: ".$json, __FILE__, __LINE__);
        $json = str_replace('{}', '""', $json);

		return $json;
    }
    
    // Copyright: Maurits van der Schee <maurits@vdschee.nl>
    // Description: Convert from JSON to XML and back.
    // License: MIT

    public static function json2xml($json, $root='root') {
        $a = json_decode($json);
        $d = new DOMDocument();
        $c = $d->createElement($root);
        $d->appendChild($c);
        $t = function($v) {
            $type = gettype($v);
            switch($type) {
                case 'integer': return 'number';
                case 'double':  return 'number';
                default: return strtolower($type);
            }
        };
        $f = function($f,$c,$a,$s=false) use ($t,$d) {
            $c->setAttribute('type', $t($a));
            if ($t($a) != 'array' && $t($a) != 'object') {
                if ($t($a) == 'boolean') {
                    $c->appendChild($d->createTextNode($a?'true':'false'));
                } else {
                    $c->appendChild($d->createTextNode($a));
                }
            } else {
                foreach($a as $k=>$v) {
                    if ($k == '__type' && $t($a) == 'object') {
                        $c->setAttribute('__type', $v);
                    } else {
                        if ($t($v) == 'object') {
                            $ch = $c->appendChild($d->createElementNS(null, $s ? 'item' : $k));
                            $f($f, $ch, $v);
                        } else if ($t($v) == 'array') {
                            $ch = $c->appendChild($d->createElementNS(null, $s ? 'item' : $k));
                            $f($f, $ch, $v, true);
                        } else {
                            $va = $d->createElementNS(null, $s ? 'item' : $k);
                            if ($t($v) == 'boolean') {
                                $va->appendChild($d->createTextNode($v?'true':'false'));
                            } else {
                                $va->appendChild($d->createTextNode($v));
                            }
                            $ch = $c->appendChild($va);
                            $ch->setAttribute('type', $t($v));
                        }
                    }
                }
            }
        };
        $f($f,$c,$a,$t($a)=='array');
        return $d->saveXML($d->documentElement);
    }

    public static function xml2json($xml) {
        $a = dom_import_simplexml(simplexml_load_string($xml));
        $t = function($v) {
            return $v->getAttribute('type');
        };
        $f = function($f,$a) use ($t) {
            $c = null;
            if ($t($a)=='null') {
                $c = null; 
            } else if ($t($a)=='boolean') {
                $b = substr(strtolower($a->textContent),0,1);
                $c = in_array($b,array('1','t'));
            } else if ($t($a)=='number') {
                $c = $a->textContent+0; 
            } else if ($t($a)=='string') {
                $c = $a->textContent;
            } else if ($t($a)=='object') {
                $c = array();
                if ($a->getAttribute('__type')) {
                    $c['__type'] = $a->getAttribute('__type');
                }
                for ($i=0;$i<$a->childNodes->length;$i++) {
                    $v = $a->childNodes[$i];
                    $c[$v->nodeName] = $f($f,$v);
                }
                $c = (object)$c;
            } else if ($t($a)=='array') {
                $c = array();
                for ($i=0;$i<$a->childNodes->length;$i++) {
                    $v = $a->childNodes[$i];
                    $c[$i] = $f($f,$v);
                }
            }
            return $c;
        };
        $c = $f($f,$a);
        return json_encode($c,64);//64=JSON_UNESCAPED_SLASHES
    }

}
