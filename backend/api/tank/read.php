<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/tank.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$tank = new Tank($db);

// query products
$stmt = $tank->read();

$personnels_arr = array();
$personnels_arr["records"] = array();
$num = 0;

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    $base_item = array();
    foreach ($row as $key => $value) {
        $base_item[strtolower($key)] = $value;
    }

    $base_item = array_map(function($v){
        return (is_null($v)) ? "" : $v;
    }, $base_item);
    array_push($personnels_arr["records"], $base_item);
}

if ($num > 0) {
    http_response_code(200);
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No tank product record found.")
    );
}
