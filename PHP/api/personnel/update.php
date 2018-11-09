<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/personnel.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare personnel object
$personnel = new Personnel($db);
 
// get id of personnel to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of personnel to be edited
if (property_exists($data, 'per_code')) 
    $personnel->per_code = $data->per_code;
if (property_exists($data, 'per_name'))
    $personnel->per_name = $data->per_name;
if (property_exists($data, 'per_cmpy'))
    $personnel->per_cmpy = $data->per_cmpy;
if (property_exists($data, 'per_auth')) 
    $personnel->per_auth = $data->per_auth;
if (property_exists($data, 'per_lock')) 
    $personnel->per_lock = $data->per_lock;
if (property_exists($data, 'per_last_dmy')) 
    $personnel->per_last_dmy = $data->per_last_dmy;
if (property_exists($data, 'per_department')) 
    $personnel->per_department = $data->per_department;
if (property_exists($data, 'per_licence_no')) 
    $personnel->per_licence_no = $data->per_licence_no;
if (property_exists($data, 'per_next_msg')) 
    $personnel->per_next_msg = $data->per_next_msg;
if (property_exists($data, 'per_level_num')) 
    $personnel->per_level_num = $data->per_level_num;
if (property_exists($data, 'per_terminal')) 
    $personnel->per_terminal = $data->per_terminal;
if (property_exists($data, 'per_comments')) 
    $personnel->per_comments = $data->per_comments;
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

//original data
$personnel_orig = new Personnel($db);
$personnel_orig->per_code = $personnel->per_code;
$personnel_orig->readOne();

// write_log($personnel->per_name, __FILE__, __LINE__);
// write_log($personnel_orig->per_name, __FILE__, __LINE__);
if (!($personnel->per_name === $personnel_orig->per_name)) {
    $journal = new Journal($db);
    $jnl_data[0] = "DKI_SUPER_USER";  //TODO USER
    $jnl_data[1] = "PERSONNEL";
    $jnl_data[2] = "PER_NAME";
    $jnl_data[3] = $personnel->per_code;
    $jnl_data[4] = $personnel_orig->per_name;
    $jnl_data[5] = $personnel->per_name;

    $journal->jnlLogEvent(Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT);
}

if (!($personnel->per_lock === $personnel_orig->per_lock)) {
    $journal = new Journal($db);
    $jnl_data[0] = "DKI_SUPER_USER";  //TODO USER
    $jnl_data[1] = "PERSONNEL";
    $jnl_data[2] = "PER_LOCK";
    $jnl_data[3] = $personnel->per_code;
    $jnl_data[4] = $personnel_orig->per_lock;
    $jnl_data[5] = $personnel->per_lock;

    $journal->jnlLogEvent(Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT);
}

if (!($personnel->per_department === $personnel_orig->per_department)) {
    $journal = new Journal($db);
    $jnl_data[0] = "DKI_SUPER_USER";  //TODO USER
    $jnl_data[1] = "PERSONNEL";
    $jnl_data[2] = "PER_DEPARTMENT";
    $jnl_data[3] = $personnel->per_code;
    $jnl_data[4] = $personnel_orig->per_department;
    $jnl_data[5] = $personnel->per_department;

    $journal->jnlLogEvent(Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT);
}

if (!($personnel->per_licence_no === $personnel_orig->per_licence_no)) {
    $journal = new Journal($db);
    $jnl_data[0] = "DKI_SUPER_USER";  //TODO USER
    $jnl_data[1] = "PERSONNEL";
    $jnl_data[2] = "PER_LICENCE_NO";
    $jnl_data[3] = $personnel->per_code;
    $jnl_data[4] = $personnel_orig->per_licence_no;
    $jnl_data[5] = $personnel->per_licence_no;

    $journal->jnlLogEvent(Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT);
}

if (!($personnel->per_auth === $personnel_orig->per_auth)) {
    $journal = new Journal($db);
    $jnl_data[0] = "DKI_SUPER_USER";  //TODO USER
    $jnl_data[1] = "PERSONNEL";
    $jnl_data[2] = "PER_ROLE";
    $jnl_data[3] = $personnel->per_code;
    $jnl_data[4] = $personnel_orig->per_auth;
    $jnl_data[5] = $personnel->per_auth;

    $journal->jnlLogEvent(Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT);
}

if (!($personnel->pt_timecd === $personnel_orig->pt_timecd)) {
    $journal = new Journal($db);
    $jnl_data[0] = "DKI_SUPER_USER";  //TODO USER
    $jnl_data[1] = "PERSONNEL";
    $jnl_data[2] = "PER_TIMECD";
    $jnl_data[3] = $personnel->per_code;
    $jnl_data[4] = $personnel_orig->pt_timecd;
    $jnl_data[5] = $personnel->pt_timecd;

    $journal->jnlLogEvent(Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT);
}

if (!($personnel->perl_ara === $personnel_orig->perl_ara)) {
    $journal = new Journal($db);
    $jnl_data[0] = "DKI_SUPER_USER";  //TODO USER
    $jnl_data[1] = "PERSONNEL";
    $jnl_data[2] = "PER_AREA";
    $jnl_data[3] = $personnel->per_code;
    $jnl_data[4] = $personnel_orig->perl_ara;
    $jnl_data[5] = $personnel->perl_ara;

    $journal->jnlLogEvent(Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT);
}

if (!($personnel->per_cmpy === $personnel_orig->per_cmpy)) {
    $journal = new Journal($db);
    $jnl_data[0] = "DKI_SUPER_USER";  //TODO USER
    $jnl_data[1] = "PERSONNEL";
    $jnl_data[2] = "PER_CMPY";
    $jnl_data[3] = $personnel->per_code;
    $jnl_data[4] = $personnel_orig->per_cmpy;
    $jnl_data[5] = $personnel->per_cmpy;

    $journal->jnlLogEvent(Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT);
}

// update the personnel
if ($personnel->update()) {
    echo '{';
        echo '"message": "personnel was updated."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to update personnel."';
    echo '}';
}
