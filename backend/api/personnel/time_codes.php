<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/time_code.php';
 
// instantiate database
$database = new Database();
$db = $database->getConnection();
$time_code = new TimeCode($db);
$stmt = $time_code->read();
 
$personnels_arr = array();
$personnels_arr["records"] = array();

// retrieve our table contents
$num = Utilities::retrieve($personnels_arr["records"], $stmt);
Utilities::echoRead($num, $personnels_arr, "time code");