<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/personnel.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$personnel = new Personnel($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    foreach ($data as $key => $value) {
        $personnel->$key = $value;
    }
} else {
    // write_log(json_encode($_GET), __FILE__, __LINE__);
    foreach ($_GET as $key => $value) {
        $personnel->$key = $value;
    }
}

// write_log(json_encode($personnel), __FILE__, __LINE__);

if (!isset($personnel->per_code)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to read data. data is incomplete: per_code is needed"));
    return;
}

// query products
$stmt = $personnel->areaAccess();
 
$personnels_arr = array();
$personnels_arr["records"] = array();

// retrieve our table contents
$num = Utilities::retrieve($personnels_arr["records"], $stmt);
Utilities::echoRead($num, $personnels_arr, "personnel");