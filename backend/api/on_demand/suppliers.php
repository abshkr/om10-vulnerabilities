<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/on_demand.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$on_demand = new OndemandReport($db);
 
// query products
$stmt = $on_demand->suppliers();
 
// products array
$personnels_arr = array();
$personnels_arr["records"] = array();

$num = Utilities::retrieve($personnels_arr["records"], $stmt);
Utilities::echoRead($num, $personnels_arr, "supplier");