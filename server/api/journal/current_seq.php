<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/om_journal.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$jnl = new OMJournal($db);

// query products
$max = $jnl->get_max_seq();
 
$personnels_arr = array();
$personnels_arr["records"] = array();
$personnel_item = array(
    "maximum_seq" => $max
);

array_push($personnels_arr["records"], $personnel_item);

http_response_code(200);
echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
