<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
include_once '../objects/eqpt.php';
include_once '../objects/expiry_date.php';


$database = new Database();
$db = $database->getConnection();

// $expiry_type = new ExpiryDateType($db);
// $stmt2 = $expiry_type->readSimple(ExpiryTarget::TRANSP_EQUIP);
// $expiry_arr = array();

// while ($row = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS)) {
//     extract(array_change_key_case($row));
//     array_push($expiry_arr, $edt_type_code);
// }

// write_log(json_encode($expiry_arr), __FILE__, __LINE__);
 
$eqpt = new Equipment($db);
Utilities::create($eqpt, "equipment");

// get posted data
// $data = json_decode(file_get_contents("php://input"));
// $cmpts = array();
// $expiry_dates = array();
// if ($data) {
//     // set eqpt property values
//     if (property_exists($data, 'eqpt_code')) 
//         $eqpt->eqpt_code = $data->eqpt_code;
//     if (property_exists($data, 'eqpt_owner')) 
//         $eqpt->eqpt_owner = $data->eqpt_owner;
//     if (property_exists($data, 'eqpt_etp')) 
//         $eqpt->eqpt_etp = $data->eqpt_etp;
//     if (property_exists($data, 'eqpt_title')) 
//         $eqpt->eqpt_title = $data->eqpt_title;
//     if (property_exists($data, 'eqpt_area')) 
//         $eqpt->eqpt_area = $data->eqpt_area;
//     if (property_exists($data, 'eqpt_load_type'))
//         $eqpt->eqpt_load_type = $data->eqpt_load_type;
//     if (property_exists($data, 'eqpt_empty_kg'))
//         $eqpt->eqpt_empty_kg = $data->eqpt_empty_kg;
//     if (property_exists($data, 'pull_limit')) 
//         $eqpt->eqpt_max_gross = $data->pull_limit;
//     if (property_exists($data, 'eqpt_comments')) 
//         $eqpt->eqpt_comments = $data->eqpt_comments;
//     if (property_exists($data, 'eqpt_lock')) 
//         $eqpt->eqpt_lock = $data->eqpt_lock;
//     if (property_exists($data, 'eqp_must_tare_in')) 
//         $eqpt->eqp_must_tare_in = $data->eqp_must_tare_in;

//     if (property_exists($data, 'cmpt_count')) {
//         for ($i = 0; $i < $data->eqpt_count ; $i ++) {
//             $etyp_index = "sched_limit" . ($i + 1);
//             $cmpts[$i]['sched_limit'] = (int)$data->{$etyp_index};
//             $etyp_index = "sfl" . ($i + 1);
//             $cmpts[$i]['sfl'] = (int)$data->{$etyp_index};
//         }
//     }

//     foreach ($expiry_arr as $value) {
//         if (property_exists($data, $value))
//             $expiry_dates[$value] = $data->{$value};
//     }

// } else {
//     if (isset($_GET["eqpt_code"]))
//         $eqpt->eqpt_code = $_GET["eqpt_code"];
//     if (isset($_GET["eqpt_owner"]))
//         $eqpt->eqpt_owner = $_GET["eqpt_owner"];
//     if (isset($_GET["eqpt_etp"]))
//         $eqpt->eqpt_etp = $_GET["eqpt_etp"];
//     if (isset($_GET["eqpt_title"]))
//         $eqpt->eqpt_title = $_GET["eqpt_title"];
//     if (isset($_GET["eqpt_area"]))
//         $eqpt->eqpt_area = $_GET["eqpt_area"];
//     if (isset($_GET["eqpt_load_type"]))
//         $eqpt->eqpt_load_type = $_GET["eqpt_load_type"];
//     if (isset($_GET["eqpt_empty_kg"]))
//         $eqpt->eqpt_empty_kg = $_GET["eqpt_empty_kg"];
//     if (isset($_GET["pull_limit"]))
//         $eqpt->eqpt_max_gross = $_GET["pull_limit"];
//     if (isset($_GET["eqpt_comments"]))
//         $eqpt->eqpt_comments = $_GET["eqpt_comments"];
//     if (isset($_GET["eqpt_lock"]))
//         $eqpt->eqpt_lock = $_GET["eqpt_lock"];
//     if (isset($_GET["eqp_must_tare_in"]))
//         $eqpt->eqp_must_tare_in = $_GET["eqp_must_tare_in"];

//     if (isset($_GET["cmpt_count"])) {
//         for ($i = 0; $i < $_GET["cmpt_count"] ; $i ++) {
//             $etyp_index = "sched_limit" . ($i + 1);
//             if (isset($_GET[$etyp_index]))
//                 $cmpts[$i]['sched_limit'] = (int)$_GET[$etyp_index];
//             $etyp_index = "sfl" . ($i + 1);
//             if (isset($_GET[$etyp_index]))
//                 $cmpts[$i]['sfl'] = (int)$_GET[$etyp_index];
//         }
//     }

//     foreach ($expiry_arr as $value) {
//         if (isset($_GET[$value]))
//             $expiry_dates[$value] = $_GET[$value];
//     }
// }

// // write_log(json_encode($expiry_dates), __FILE__, __LINE__);

// if (!isset($eqpt->eqpt_code)) {
//     http_response_code(400);
//     echo json_encode(array("message" => "Unable to create equipment. Data is incomplete."));
//     return;
// }

// // create the eqpt
// if ($eqpt->create($cmpts, $expiry_dates)){
//     echo '{';
//         echo '"message": "Equipment created."';
//     echo '}';
// } else{
//     echo '{';
//         echo '"message": "Unable to create equipment."';
//     echo '}';
// }
