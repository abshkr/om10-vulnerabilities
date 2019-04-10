<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tanker.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$idassign = new Tanker($db);

$tnkr_code = (isset($_GET["tnkr_code"]) ? $_GET["tnkr_code"] : null);
if (!isset($tnkr_code)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to get tanker compositon. Data is incomplete."));
    return;
}

// update the printer
if ($idassign->unlockCompartments($tnkr_code)) {
    echo '{';
        echo '"message": "All compartments unlocked."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Failed to unlock all compartments"';
    echo '}';
}

