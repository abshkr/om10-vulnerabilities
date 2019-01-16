<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/time_code.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare time_code object
$time_code = new TimeCode($db);
 
// get id of time_code to be edited
$data = json_decode(file_get_contents("php://input"));
$time_code->tcd_title = (isset($_GET["tcd_title"]) ? 
    $_GET["tcd_title"] : $data->tcd_title);
$time_code->tcd_mon = (isset($_GET["tcd_mon"]) ? 
    $_GET["tcd_mon"] : $data->tcd_mon);
$time_code->tcd_tue = (isset($_GET["tcd_tue"]) ? 
    $_GET["tcd_tue"] : $data->tcd_tue);
$time_code->tcd_wed = (isset($_GET["tcd_wed"]) ? 
    $_GET["tcd_wed"] : $data->tcd_wed);
$time_code->tcd_thu = (isset($_GET["tcd_thu"]) ? 
    $_GET["tcd_thu"] : $data->tcd_thu);
$time_code->tcd_fri = (isset($_GET["tcd_fri"]) ? 
    $_GET["tcd_fri"] : $data->tcd_fri);
$time_code->tcd_sat = (isset($_GET["tcd_sat"]) ? 
    $_GET["tcd_sat"] : $data->tcd_sat);
$time_code->tcd_sun = (isset($_GET["tcd_sun"]) ? 
    $_GET["tcd_sun"] : $data->tcd_sun);

if (!isset($time_code->tcd_title) || 
    !isset($time_code->tcd_mon) || 
    !isset($time_code->tcd_tue) || 
    !isset($time_code->tcd_wed) || 
    !isset($time_code->tcd_thu) || 
    !isset($time_code->tcd_fri) || 
    !isset($time_code->tcd_sat) || 
    !isset($time_code->tcd_sun) 
    ) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update time codes. Data is incomplete."));
}

// update the time_code
if ($time_code->update()) {
    echo '{';
        echo '"message": "time_code was updated."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to update time_code."';
    echo '}';
}
