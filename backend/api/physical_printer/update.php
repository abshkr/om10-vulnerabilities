<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/physical_printer.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare printer object
$printer = new PhysicalPrinter($db);
Utilities::update($printer, "physical printer");

// get id of printer to be edited
// $data = json_decode(file_get_contents("php://input"));
// $printer->prntr = (isset($_GET["prntr"]) ? 
//     $_GET["prntr"] : $data->prntr);
// $printer->sys_prntr = (isset($_GET["sys_prntr"]) ? 
//     $_GET["sys_prntr"] : $data->sys_prntr);
// $printer->prntr_lock = (isset($_GET["prntr_lock"]) ? 
//     $_GET["prntr_lock"] : $data->prntr_lock);
// $printer->prntr_area = (isset($_GET["prntr_area"]) ? 
//     $_GET["prntr_area"] : $data->prntr_area);

// if (!isset($printer->prntr) || 
//     !isset($printer->sys_prntr) || 
//     !isset($printer->prntr_lock) ||
//     !isset($printer->prntr_area)) {
//     http_response_code(400);
//     echo json_encode(array("message" => "Unable to update physical printer. Data is incomplete."));
//     return;
// }

// // update the printer
// if ($printer->update()) {
//     echo '{';
//         echo '"message": "Physical printer updated."';
//     echo '}';
// } else {
//     echo '{';
//         echo '"message": "Unable to update physical logical printer."';
//     echo '}';
// }
