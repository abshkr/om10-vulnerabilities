<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../../config/database.php';
include_once '../../objects/personnel.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare personnel object
$personnel = new Personnel($db);
 
Utilities::delete($personnel, "personnel");