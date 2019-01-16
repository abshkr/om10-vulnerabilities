<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate tanker object
include_once '../objects/tanker.php';

$database = new Database();
$db = $database->getConnection();
 
$tanker = new Tanker($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    // set tanker property values
    if (property_exists($data, 'tnkr_code')) 
        $tanker->tnkr_code = $data->tnkr_code;
} else {
    if (isset($_GET["tnkr_code"]))
        $tanker->tnkr_code= $_GET["tnkr_code"];
}

// create the tanker
if ($tanker->delete()){
    echo '{';
        echo '"message": "id assignment was deleted."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to delete id assignment: ' . $tanker->err_msg . '"';
    echo '}';
}
