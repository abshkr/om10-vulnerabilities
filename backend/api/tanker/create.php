<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
include_once '../objects/tanker.php';

$database = new Database();
$db = $database->getConnection();
 
$tanker = new Tanker($db);
Utilities::create($tanker, "tanker");

// get posted data
// $data = json_decode(file_get_contents("php://input"));
// $eqpts = array();
// if ($data) {
//     // set tanker property values
//     if (property_exists($data, 'tnkr_code')) 
//         $tanker->tnkr_code = $data->tnkr_code;
//     if (property_exists($data, 'tnkr_lock')) 
//         $tanker->tnkr_lock = $data->tnkr_lock;
//     if (property_exists($data, 'tnkr_active'))
//         $tanker->tnkr_active = $data->tnkr_active;
//     if (property_exists($data, 'tnkr_max_kg'))
//         $tanker->tnkr_max_kg = $data->tnkr_max_kg;
//     if (property_exists($data, 'tnkr_bay_loop_ch')) 
//         $tanker->tnkr_bay_loop_ch = $data->tnkr_bay_loop_ch;
//     if (property_exists($data, 'tnkr_ntrips')) 
//         $tanker->tnkr_ntrips = $data->tnkr_ntrips;
//     if (property_exists($data, 'tnkr_own_txt')) 
//         $tanker->tnkr_own_txt = $data->tnkr_own_txt;
//     if (property_exists($data, 'tnkr_lic_exp')) 
//         $tanker->tnkr_lic_exp = $data->tnkr_lic_exp;
//     if (property_exists($data, 'tnkr_dglic_exp')) 
//         $tanker->tnkr_dglic_exp = $data->tnkr_dglic_exp;
//     if (property_exists($data, 'tnkr_ins_exp')) 
//         $tanker->tnkr_ins_exp = $data->tnkr_ins_exp;
//     if (property_exists($data, 'stats')) 
//         $tanker->stats = $data->stats;
//     if (property_exists($data, 'last_trip')) 
//         $tanker->last_trip = $data->last_trip;
//     if (property_exists($data, 'tnkr_name')) 
//         $tanker->tnkr_name = $data->tnkr_name;
//     if (property_exists($data, 'tnkr_pin')) 
//         $tanker->tnkr_pin = $data->tnkr_pin;
//     if (property_exists($data, 'tnkr_archive')) 
//         $tanker->tnkr_archive = $data->tnkr_archive;
//     if (property_exists($data, 'remarks')) 
//         $tanker->remarks = $data->remarks;
//     if (property_exists($data, 'tnkr_owner')) 
//         $tanker->tnkr_owner = $data->tnkr_owner;

//     if (property_exists($data, 'eqpt_count')) {
//         for ($i = 0; $i < $data->eqpt_count ; $i ++) {
//             $etyp_index = "eqpt_" . ($i + 1);
//             $eqpts[$i] = (int)$data->{$etyp_index};
//         }
//     }
// } else {
//     if (isset($_GET["tnkr_code"]))
//         $tanker->tnkr_code = $_GET["tnkr_code"];
//     if (isset($_GET["tnkr_lock"]))
//         $tanker->tnkr_lock = $_GET["tnkr_lock"];
//     if (isset($_GET["tnkr_active"]))
//         $tanker->tnkr_active = $_GET["tnkr_active"];
//     if (isset($_GET["tnkr_max_kg"]))
//         $tanker->tnkr_max_kg = $_GET["tnkr_max_kg"];
//     if (isset($_GET["tnkr_bay_loop_ch"]))
//         $tanker->tnkr_bay_loop_ch = $_GET["tnkr_bay_loop_ch"];
//     if (isset($_GET["tnkr_ntrips"]))
//         $tanker->tnkr_ntrips = $_GET["tnkr_ntrips"];
//     if (isset($_GET["tnkr_own_txt"]))
//         $tanker->tnkr_own_txt = $_GET["tnkr_own_txt"];
//     if (isset($_GET["tnkr_lic_exp"]))
//         $tanker->tnkr_lic_exp = $_GET["tnkr_lic_exp"];
//     if (isset($_GET["tnkr_dglic_exp"]))
//         $tanker->tnkr_dglic_exp = $_GET["tnkr_dglic_exp"];
//     if (isset($_GET["tnkr_ins_exp"]))
//         $tanker->tnkr_ins_exp = $_GET["tnkr_ins_exp"];
//     if (isset($_GET["stats"]))
//         $tanker->stats = $_GET["stats"];
//     if (isset($_GET["last_trip"]))
//         $tanker->last_trip = $_GET["last_trip"];
//     if (isset($_GET["tnkr_name"]))
//         $tanker->tnkr_name = $_GET["tnkr_name"];
//     if (isset($_GET["tnkr_pin"]))
//         $tanker->tnkr_pin = $_GET["tnkr_pin"];
//     if (isset($_GET["tnkr_archive"]))
//         $tanker->tnkr_archive = $_GET["tnkr_archive"];
//     if (isset($_GET["remarks"]))
//         $tanker->remarks = $_GET["remarks"];
//     if (isset($_GET["tnkr_owner"]))
//         $tanker->tnkr_owner = $_GET["tnkr_owner"];
//     if (isset($_GET["tnkr_carrier"]))
//         $tanker->tnkr_carrier = $_GET["tnkr_carrier"];
//     if (isset($_GET["tnkr_etp"]))
//         $tanker->tnkr_etp = $_GET["tnkr_etp"];

//     if (isset($_GET["eqpt_count"])) {
//         for ($i = 0; $i < $_GET["eqpt_count"] ; $i ++) {
//             $etyp_index = "eqpt_" . ($i + 1);
//             if (isset($_GET[$etyp_index]))
//                 $eqpts[$i] = (int)$_GET[$etyp_index];
//         }
//     }
// }

// if (!isset($tanker->tnkr_code)) {
//     http_response_code(400);
//     echo json_encode(array("message" => "Unable to create tanker. Data is incomplete."));
//     return;
// }

// // create the tanker
// if ($tanker->create($eqpts)){
//     echo '{';
//         echo '"message": "Tanker created."';
//     echo '}';
// } else {
//     echo '{';
//         echo '"message": "Unable to create tanker."';
//     echo '}';
// }
