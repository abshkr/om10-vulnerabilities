<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/tank_status.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$tank = new TankStatus($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    foreach ($data as $key => $value) {
        $tank->$key = $value;
    }
} else {
    // write_log(json_encode($_GET), __FILE__, __LINE__);
    foreach ($_GET as $key => $value) {
        $tank->$key = $value;
    }
}

write_log(json_encode($tank), __FILE__, __LINE__);

if (!isset($tank->tank_code)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to read tank. Data is incomplete."));
    return;
}

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
