<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_status.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$tank = new TankStatus($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    foreach ($data as $key => $value) {
        $tank->$key = $value;
    }
} else {
    // write_log(json_encode($_GET), __FILE__, __LINE__);
    foreach ($_GET as $key => $value) {
        $tank->$key = $value;
    }
}

//write_log(json_encode($tank), __FILE__, __LINE__);

if (!isset($tank->tank_code)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to read tank. Data is incomplete."));
    return;
}

if ($tank->updateStatus()){
    echo '{';
        echo '"message": "Tank status updated."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to update tank status."';
    echo '}';
}
