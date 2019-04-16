<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/company.php';
include_once '../shared/utilities.php';
include_once '../../shared/log.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$idassign = new Company($db);

// query products
$stmt = $idassign->employers();

$personnels_arr = array();
$personnels_arr["records"] = array();

// retrieve our table contents
$num = Utilities::retrieve($personnels_arr["records"], $stmt);
Utilities::echoRead($num, $personnels_arr, "employer");

