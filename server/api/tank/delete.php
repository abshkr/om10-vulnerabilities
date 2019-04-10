<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
include_once '../objects/tank.php';

$database = new Database();
$db = $database->getConnection();

$eqpt = new Tank($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    foreach ($data as $key => $value) {
        $eqpt->$key = $value;
    }
} else {
    // write_log(json_encode($_GET), __FILE__, __LINE__);
    foreach ($_GET as $key => $value) {
        $eqpt->$key = $value;
    }
}

write_log(json_encode($eqpt), __FILE__, __LINE__);

if (!isset($eqpt->tank_code)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to delete tank. Data is incomplete."));
    return;
}

// create the eqpt
if ($eqpt->delete()){
    echo '{';
        echo '"message": "Tank deleted."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to delete tank."';
    echo '}';
}
