<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/idassignment.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$jnl = new IDAssignment($db);

// query products
$count = $jnl->count();
 
$personnels_arr = array();
$personnels_arr["records"] = array();
$personnel_item = array(
    "count" => $count
);

array_push($personnels_arr["records"], $personnel_item);

http_response_code(200);
echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
