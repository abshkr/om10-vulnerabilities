<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../../config/database.php';
 
// instantiate personnel object
include_once '../../objects/personnel.php';

$database = new Database();
$db = $database->getConnection();
 
$personnel = new Personnel($db);
 
Utilities::create($personnel, "personnel");
