<?php

include_once __DIR__  . '/../config/log.php';

class Utilities
{ 
    public static function sanitize($cls)
    {
        foreach ($cls as $key => $value) {
            if (!is_string($value))
                continue;

            // write_log(sprintf("%s => %s", $key, $value), __FILE__, __LINE__);
            $cls->{$key} = htmlspecialchars(strip_tags($value));
        }
    }

    public static function retrieve(&$result_array, $stmt)
    {
        $num = 0;
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $num += 1;
            
            $base_item = array();
            foreach ($row as $key => $value) {
                $base_item[strtolower($key)] = $value;
            }

            $base_item = array_map(function($v){
                return (is_null($v)) ? "" : $v;
            }, $base_item);

            array_push($result_array, $base_item);
        }
        // write_log(json_encode($result, JSON_PRETTY_PRINT), __FILE__, __LINE__);
            
        return $num;
    }

    public static function update($object, $desc) 
    {
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

        write_log(json_encode($object), __FILE__, __LINE__);

        // if (!isset($tank->per_code)) {
        //     http_response_code(400);
        //     echo json_encode(array("message" => "Unable to update personnel. Data is incomplete."));
        //     return;
        // }

        if ($object->update()){
            echo '{';
                echo '"message": "' . $desc . ' updated."';
            echo '}';
        } else{
            echo '{';
                echo '"message": "Unable to update ' . $desc . '."';
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
        $condition_limit_num = ($page + $range)  + 1;
 
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