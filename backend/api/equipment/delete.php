<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
include_once '../objects/eqpt.php';

$database = new Database();
$db = $database->getConnection();
 
$eqpt = new Equipment($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
$cmpts = array();
if ($data) {
    // set eqpt property values
    if (property_exists($data, 'eqpt_id')) 
        $eqpt->eqpt_id = $data->eqpt_id;    
} else {
    if (isset($_GET["eqpt_id"]))
        $eqpt->eqpt_id = $_GET["eqpt_id"];
}

if (!isset($eqpt->eqpt_id)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to delete equipment. Data is incomplete."));
    return;
}

// create the eqpt
if ($eqpt->delete()){
    echo '{';
        echo '"message": "Equipment deleted."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to delete equipment."';
    echo '}';
}
