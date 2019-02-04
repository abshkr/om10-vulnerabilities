<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
include_once '../objects/base_product.php';

$database = new Database();
$db = $database->getConnection();
 
$eqpt = new Base($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
$cmpts = array();
if ($data) {
    // set eqpt property values
    if (property_exists($data, 'base_code')) 
        $eqpt->base_code = $data->base_code;    
} else {
    if (isset($_GET["base_code"]))
        $eqpt->base_code = $_GET["base_code"];
}

if (!isset($eqpt->base_code)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to delete base product. Data is incomplete."));
    return;
}

// create the eqpt
if ($eqpt->delete()){
    echo '{';
        echo '"message": "Base product deleted."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to delete base product."';
    echo '}';
}
