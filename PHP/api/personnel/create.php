<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate personnel object
include_once '../objects/personnel.php';

$database = new Database();
$db = $database->getConnection();
 
$personnel = new Personnel($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// set personnel property values
if (property_exists($data, 'per_code')) 
    $personnel->per_code = $data->per_code;
if (property_exists($data, 'per_name'))
    $personnel->per_name = $data->per_name;
if (property_exists($data, 'per_cmpy'))
    $personnel->per_cmpy = $data->per_cmpy;
if (property_exists($data, 'per_auth')) 
    $personnel->per_auth = $data->per_auth;
if (property_exists($data, 'per_lock')) 
    $personnel->per_lock = $data->per_auth;
if (property_exists($data, 'per_last_dmy')) 
    $personnel->per_last_dmy = $data->per_auth;
if (property_exists($data, 'per_department')) 
    $personnel->per_department = $data->per_auth;
if (property_exists($data, 'per_licence_no')) 
    $personnel->per_licence_no = $data->per_auth;
if (property_exists($data, 'per_next_msg')) 
    $personnel->per_next_msg = $data->per_auth;
if (property_exists($data, 'per_level_num')) 
    $personnel->per_level_num = $data->per_auth;
if (property_exists($data, 'per_terminal')) 
    $personnel->per_terminal = $data->per_auth;
if (property_exists($data, 'per_comments')) 
    $personnel->per_comments = $data->per_auth;
if (property_exists($data, 'pt_psncode')) 
    $personnel->pt_psncode = $data->pt_psncode;
if (property_exists($data, 'pt_timecd')) 
    $personnel->pt_timecd = $data->pt_timecd;
if (property_exists($data, 'perl_psn')) 
    $personnel->perl_psn = $data->perl_psn;
if (property_exists($data, 'perl_ara')) 
    $personnel->perl_ara = $data->perl_ara;
if (property_exists($data, 'perl_enter_time')) 
    $personnel->perl_enter_time = $data->perl_enter_time;
if (property_exists($data, 'user_id')) 
    $personnel->user_id = $data->user_id;
if (property_exists($data, 'user_code')) 
    $personnel->user_code = $data->user_id;
if (property_exists($data, 'user_username')) 
    $personnel->user_username = $data->user_username;
if (property_exists($data, 'user_type')) 
    $personnel->user_type = $data->user_type;
if (property_exists($data, 'user_status_flag')) 
    $personnel->user_status_flag = $data->user_status_flag;
if (property_exists($data, 'user_login_count')) 
    $personnel->user_login_count = $data->user_login_count;
if (property_exists($data, 'user_last_reason')) 
    $personnel->user_last_reason = $data->user_last_reason;
if (property_exists($data, 'valid_time')) 
    $personnel->valid_time = $data->valid_time;
if (property_exists($data, 'expire_time')) 
    $personnel->expire_time = $data->expire_time;
if (property_exists($data, 'record_switch')) 
    $personnel->record_switch = $data->record_switch;
if (property_exists($data, 'record_order')) 
    $personnel->record_order = $data->record_order;

// create the personnel
if ($personnel->create()){
    echo '{';
        echo '"message": "personnel was created."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to create personnel."';
    echo '}';
}
