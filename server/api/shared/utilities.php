<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../config/database.php';

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

    //
    public static function read($class, $method = 'read', $filter = false)
    {
        $database = new Database();
        $db = $database->getConnection();

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

            $base_item = array();
            foreach ($row as $key => $value) {
                $lower_key = strtolower($key);
                // write_log(sprintf("%s, %s", $class, $lower_key), __FILE__, __LINE__);
                if (property_exists($class, "BOOLEAN_FIELDS") &&
                    array_key_exists($key, $object->BOOLEAN_FIELDS)) {
                    if ($value === 1 || $value === 'T' || $value === 'Y') {
                        $base_item[$lower_key] = true;
                    } else {
                        $base_item[$lower_key] = false;
                    }

                } else {
                    if (property_exists($class, "NUMBER_FIELDS") && in_array($key, $object->NUMBER_FIELDS)) {
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

            array_push($result["records"], $base_item);
        }
        // $result["result_count"] = $num;

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
        $db = $database->getConnection();

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
        $db = $database->getConnection();

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
            http_response_code(404);
            echo json_encode(
                array("message" => "No record found.")
            );
        }
    }

    private static function retrieve(&$result_array, $stmt)
    {
        $num = 0;
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $num += 1;

            $base_item = array();
            foreach ($row as $key => $value) {
                $base_item[strtolower($key)] = $value;
            }

            $base_item = array_map(function ($v) {
                return (is_null($v)) ? "" : $v;
            }, $base_item);

            array_push($result_array, $base_item);
        }
        // write_log(json_encode($result, JSON_PRETTY_PRINT), __FILE__, __LINE__);

        return $num;
    }

    public static function create($class, $method = 'create')
    {
        $database = new Database();
        $db = $database->getConnection();

        $object = new $class($db);
        $desc = (isset($object->desc) ? $object->desc : $class);

        // get posted data
        $data = json_decode(file_get_contents("php://input"));
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

        // write_log(json_encode($object), __FILE__, __LINE__);

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
    }

    private static function handleBoolean($class, $object, $key, $value)
    {
        $lower_key = strtolower($key);
        // write_log(sprintf("%s => %s", $key, $value), __FILE__, __LINE__);
        // write_log(sprintf("%s, %s", strtoupper($class), $lower_key), __FILE__, __LINE__);

        if (property_exists($class, "BOOLEAN_FIELDS") &&
            array_key_exists($key, $object->BOOLEAN_FIELDS)) {
            if ($object->BOOLEAN_FIELDS[toupper($key)] === 'Y') {
                if ($value) {
                    $object->{$key} = 'Y';
                } else {
                    $object->{$key} = 'N';
                }

            } else if ($object->BOOLEAN_FIELDS[toupper($key)] === 'T') {
                if ($value) {
                    $object->{$key} = 'T';
                } else {
                    $object->{$key} = 'F';
                }

            } else if ($object->BOOLEAN_FIELDS[toupper($key)] === '1') {
                if ($value) {
                    $object->{$key} = 1;
                } else {
                    $object->{$key} = 0;
                }

            }
        }
    }

    public static function update($class, $method = 'update')
    {
        $database = new Database();
        $db = $database->getConnection();

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
        // write_log(json_encode($object), __FILE__, __LINE__);

        if ($object->$method()) {
            echo '{';
            echo '"message": "' . $desc . ' updated."';
            echo '}';
        } else {
            echo '{';
            echo '"message": "Unable to update ' .
                $desc .
                '. Check logs/php_rest_*.log file for details."';
            echo '}';
        }
    }

    public static function delete($class, $method = 'delete')
    {
        $database = new Database();
        $db = $database->getConnection();

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

        if ($object->$method()) {
            echo '{';
            echo '"message": "' . $desc . ' deleted."';
            echo '}';
        } else {
            echo '{';
            echo '"message": "Unable to delete ' .
                $desc .
                '. Check logs/php_rest_*.log file for details."';
            echo '}';
        }
    }

    public static function echoRead($retrieve_count, $result, $desc = "")
    {
        if ($retrieve_count > 0) {
            http_response_code(200);
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "No " . $desc . " record found.")
            );
        }
    }

    public static function getCurrPsn()
    {
        return "DKI_SUPER_USER";
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

}
