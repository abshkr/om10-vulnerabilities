<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_status.php';

Utilities::read('TankStatus', $method = 'calc_tank_qty_by_level', $filter = true);


// <?php
// // required headers
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");
 
// // include database and object files
// include_once '../../config/database.php';
// include_once '../../objects/tank_status.php';
 
// // instantiate database and product object
// $database = new Database();
// $db = $database->getConnection();

// // initialize object
// $eqpt = new TankStatus($db);

// // get posted data
// $data = json_decode(file_get_contents("php://input"));
// if ($data) {
//     foreach ($data as $key => $value) {
//         $eqpt->$key = $value;
//     }
// } else {
//     // write_log(json_encode($_GET), __FILE__, __LINE__);
//     foreach ($_GET as $key => $value) {
//         $eqpt->$key = $value;
//     }
// }

// write_log(json_encode($eqpt), __FILE__, __LINE__);

// if (!isset($eqpt->tank_base)) {
//     http_response_code(400);
//     echo json_encode(array("message" => "Unable to create tank. Data is incomplete."));
//     return;
// }

// //echo is in calc_tank_qty_by_level()
// $eqpt->calc_tank_qty_by_level();
// if ($eqpt->calc_tank_vol()) {
//     // echo 
//     // echo '{';
//     //     echo '"message": "Tank created."';
//     // echo '}';
// } else{
//     echo '{';
//         echo '"message": "Unable to calculate quantity."';
//     echo '}';
// }