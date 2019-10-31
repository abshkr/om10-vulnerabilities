<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/expiry_type.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$idassign = new ExpiryDateType($db);

// query products
$stmt = $idassign->read(ExpiryTarget::PERSONNEL);

// products array
$personnels_arr = array();
$personnels_arr["records"] = array();

$num = Utilities::retrieve($personnels_arr["records"], $personnels_arr["records"], $stmt);
Utilities::echoRead($num, $personnels_arr, "exipry type");
