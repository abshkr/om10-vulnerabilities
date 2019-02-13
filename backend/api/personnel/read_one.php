<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/personnel.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare personnel object
$personnel = new Personnel($db);
 
// set ID property of personnel to be edited
$personnel->per_code = isset($_GET['per_code']) ? $_GET['per_code'] : die();
 
// read the details of personnel to be edited
$personnel->readOne();

$personnel_arr = array();
foreach ($personnel as $key => $value) {
    $personnel_arr[strtolower($key)] = $value;
}

// $personnel_arr = array(
//         "per_code" => $personnel->per_code,
//         "per_name" => $personnel->per_name,
//         "per_cmpy" => $personnel->per_cmpy,
//         "per_auth" => $personnel->per_auth,
//         "per_lock" => $personnel->per_lock,
//         "per_last_dmy" => $personnel->per_last_dmy,
//         "per_department" => $personnel->per_department,
//         "per_licence_no" => $personnel->per_licence_no,
//         "per_next_msg" => $personnel->per_next_msg,
//         "per_level_num" => $personnel->per_level_num,
//         "per_terminal" => $personnel->per_terminal,
//         "per_comments" => html_entity_decode($personnel->per_comments),
//         "cmpy_code" => $personnel->cmpy_code,
//         "cmpy_name" => $personnel->cmpy_name,
//         "cmpy_type" => $personnel->cmpy_type,
//         "cmpy_compress_bl" => $personnel->cmpy_compress_bl,
//         "cmpy_check_licen" => $personnel->cmpy_check_licen,
//         "cmpy_ldgo_delta" => $personnel->cmpy_ldgo_delta,
//         "cmpy_msg" => $personnel->cmpy_msg,
//         "cmpy_vet" => $personnel->cmpy_vet,
//         "cmpy_tkr_cfg" => $personnel->cmpy_tkr_cfg,
//         "cmpy_enable_expd" => $personnel->cmpy_enable_expd,
//         "cmpy_seal_number" => $personnel->cmpy_seal_number,
//         "cmpy_exp_code" => $personnel->cmpy_exp_code,
//         "cmpy_issu" => $personnel->cmpy_issu,
//         "cmpy_host" => $personnel->cmpy_host,
//         "cmpy_aoi" => $personnel->cmpy_aoi,
//         "cmpy_auto_ld" => $personnel->cmpy_auto_ld,
//         "cmpy_rtn_prompt" => $personnel->cmpy_rtn_prompt,
//         "cmpy_add_prompt" => $personnel->cmpy_add_prompt,
//         "cmpy_log_ld_del" => $personnel->cmpy_log_ld_del,
//         "cmpy_host_docs" => $personnel->cmpy_host_docs,
//         "cmpy_comms_ok" => $personnel->cmpy_comms_ok,
//         "cmpy_tkr_activat" => $personnel->cmpy_tkr_activat,
//         "cmpy_bol_vp_name" => $personnel->cmpy_bol_vp_name,
//         "cmpy_ld_rep_vp" => $personnel->cmpy_ld_rep_vp,
//         "cmpy_drv_inst_vp" => $personnel->cmpy_drv_inst_vp,
//         "cmpy_wgh_complet" => $personnel->cmpy_wgh_complet,
//         "cmpy_wgh_auto_fl" => $personnel->cmpy_wgh_auto_fl,
//         "cmpy_ord_carrier" => $personnel->cmpy_ord_carrier,
//         "cmpy_wipe_ordets" => $personnel->cmpy_wipe_ordets,
//         "cmpy_rpt_t_unit" => $personnel->cmpy_rpt_t_unit,
//         "cmpy_rpt_temp" => $personnel->cmpy_rpt_temp,
//         "cmpy_auto_reconc" => $personnel->cmpy_auto_reconc,
//         "cmpy_bay_loop_ch" => $personnel->cmpy_bay_loop_ch,
//         "cmpy_mod_drawer" => $personnel->cmpy_mod_drawer,
//         "cmpy_must_sealno" => $personnel->cmpy_must_sealno,
//         "cmpy_bltol_flag" => $personnel->cmpy_bltol_flag,
//         "cmpy_ldtol_flag" => $personnel->cmpy_ldtol_flag,
//         "cmpy_req_pin_flag" => $personnel->cmpy_req_pin_flag,
//         "pt_psncode" => $personnel->pt_psncode,
//         "pt_timecd" => $personnel->pt_timecd,
//         "perl_psn" => $personnel->perl_psn,
//         "perl_ara" => $personnel->perl_ara,
//         "perl_enter_time" => $personnel->perl_enter_time,
//         "user_id" => $personnel->user_id,
//         "user_code" => $personnel->user_code,
//         "user_username" => $personnel->user_username,
//         "user_type" => $personnel->user_type,
//         "user_status_flag" => $personnel->user_status_flag,
//         "user_login_count" => $personnel->user_login_count,
//         "user_last_reason" => $personnel->user_last_reason,
//         "valid_time" => $personnel->valid_time,
//         "expire_time" => $personnel->expire_time,
//         "record_switch" => $personnel->record_switch,
//         "record_order" => $personnel->record_order
// );
 
$personnel_arr["area_accesses"] = array();
$personnel->per_code = $personnel_arr['per_code'];
$stmt2 = $personnel->areaAccess();
 
// retrieve our table contents
while ($row = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $base_item2 = array();
    foreach ($row as $key => $value) {
        $base_item2[strtolower($key)] = $value;
    }

    // if ($personnel->per_code === "cw3") {
    //     write_log(json_encode($base_item2), __FILE__, __LINE__);
    // }

    $base_item2 = array_map(function($v){
            return (is_null($v)) ? "" : $v;
        }, $base_item2);

    if (count($base_item2) > 0) {
        array_push($personnel_arr["area_accesses"], $base_item2);
    }
}

$personnel_arr = array_map(function($v){
        return (is_null($v)) ? "" : $v;
    }, $personnel_arr);

// make it json format
print_r(json_encode($personnel_arr, JSON_PRETTY_PRINT));
