<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate idassign object
include_once '../objects/idassignment.php';

$database = new Database();
$db = $database->getConnection();
 
$idassign = new IDAssignment($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    // set idassign property values
    if (property_exists($data, 'kya_key_no')) 
        $idassign->kya_key_no = $data->kya_key_no;
    if (property_exists($data, 'kya_key_issuer'))
        $idassign->kya_key_issuer = $data->kya_key_issuer;    
} else {
    if (isset($_GET["kya_key_no"]))
        $idassign->kya_key_no= $_GET["kya_key_no"];
    if (isset($_GET["kya_key_issuer"]))
        $idassign->kya_key_issuer= $_GET["kya_key_issuer"];    
}

// create the idassign
if ($idassign->delete()){
    echo '{';
        echo '"message": "id assignment was deleted."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to delete id assignment."';
    echo '}';
}
