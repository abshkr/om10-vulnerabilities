<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/logical_printer.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare printer object
$printer = new LogicalPrinter($db);
 
// get id of printer to be edited
$data = json_decode(file_get_contents("php://input"));
$printer->prt_cmpy = (isset($_GET["prt_cmpy"]) ? 
    $_GET["prt_cmpy"] : $data->prt_cmpy);
$printer->prt_usage = (isset($_GET["prt_usage"]) ? 
    $_GET["prt_usage"] : $data->prt_usage);
$printer->prt_printer = (isset($_GET["prt_printer"]) ? 
    $_GET["prt_printer"] : $data->prt_printer);

if (!isset($printer->prt_cmpy) || 
    !isset($printer->prt_usage) || 
    !isset($printer->prt_printer) 
    ) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to delete logical printer. Data is incomplete."));
}

// update the printer
if ($printer->delete()) {
    echo '{';
        echo '"message": "Logical printer deleted."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to delete logical printer."';
    echo '}';
}
