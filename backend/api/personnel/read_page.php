<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/personnel.php';
 
// utilities
$utilities = new Utilities();
 
// instantiate database and personnel object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$personnel = new Personnel($db);
 
// query personnels
$stmt = $personnel->readPaging($from_record_num, $to_record_num);

// personnels array
$personnels_arr = array();
$personnels_arr["records"] = array();
$personnels_arr["paging"] = array();
$num = 0;

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    extract(array_change_key_case($row));
    
    $personnel_item = array(
            "per_code" => $per_code,
            "per_name" => $per_name,
            "per_cmpy" => $per_cmpy,
            "per_auth" => $per_auth,
            "per_lock" => $per_lock,
            "per_last_dmy" => $per_last_dmy,
            "per_department" => $per_department,
            "per_licence_no" => $per_licence_no,
            "per_next_msg" => $per_next_msg,
            "per_level_num" => $per_level_num,
            "per_terminal" => $per_terminal,
            "per_comments" => html_entity_decode($per_comments),
            "cmpy_code" => $cmpy_code,
            "cmpy_name" => $cmpy_name,
            "cmpy_type" => $cmpy_type,
            "cmpy_compress_bl" => $cmpy_compress_bl,
            "cmpy_check_licen" => $cmpy_check_licen,
            "cmpy_ldgo_delta" => $cmpy_ldgo_delta,
            "cmpy_msg" => $cmpy_msg,
            "cmpy_vet" => $cmpy_vet,
            "cmpy_tkr_cfg" => $cmpy_tkr_cfg,
            "cmpy_enable_expd" => $cmpy_enable_expd,
            "cmpy_seal_number" => $cmpy_seal_number,
            "cmpy_exp_code" => $cmpy_exp_code,
            "cmpy_issu" => $cmpy_issu,
            "cmpy_host" => $cmpy_host,
            "cmpy_aoi" => $cmpy_aoi,
            "cmpy_auto_ld" => $cmpy_auto_ld,
            "cmpy_rtn_prompt" => $cmpy_rtn_prompt,
            "cmpy_add_prompt" => $cmpy_add_prompt,
            "cmpy_log_ld_del" => $cmpy_log_ld_del,
            "cmpy_host_docs" => $cmpy_host_docs,
            "cmpy_comms_ok" => $cmpy_comms_ok,
            "cmpy_tkr_activat" => $cmpy_tkr_activat,
            "cmpy_bol_vp_name" => $cmpy_bol_vp_name,
            "cmpy_ld_rep_vp" => $cmpy_ld_rep_vp,
            "cmpy_drv_inst_vp" => $cmpy_drv_inst_vp,
            "cmpy_wgh_complet" => $cmpy_wgh_complet,
            "cmpy_wgh_auto_fl" => $cmpy_wgh_auto_fl,
            "cmpy_ord_carrier" => $cmpy_ord_carrier,
            "cmpy_wipe_ordets" => $cmpy_wipe_ordets,
            "cmpy_rpt_t_unit" => $cmpy_rpt_t_unit,
            "cmpy_rpt_temp" => $cmpy_rpt_temp,
            "cmpy_auto_reconc" => $cmpy_auto_reconc,
            "cmpy_bay_loop_ch" => $cmpy_bay_loop_ch,
            "cmpy_mod_drawer" => $cmpy_mod_drawer,
            "cmpy_must_sealno" => $cmpy_must_sealno,
            "cmpy_bltol_flag" => $cmpy_bltol_flag,
            "cmpy_ldtol_flag" => $cmpy_ldtol_flag,
            "cmpy_req_pin_flag" => $cmpy_req_pin_flag,
            "pt_psncode" => $pt_psncode,
            "pt_timecd" => $pt_timecd,
            "perl_psn" => $perl_psn,
            "perl_ara" => $perl_ara,
            "perl_enter_time" => $perl_enter_time,
            "user_id" => $user_id,
            "user_code" => $user_code,
            "user_username" => $user_username,
            "user_type" => $user_type,
            "user_status_flag" => $user_status_flag,
            "user_login_count" => $user_login_count,
            "user_last_reason" => $user_last_reason,
            "valid_time" => $valid_time,
            "expire_time" => $expire_time,
            "record_switch" => $record_switch,
            "record_order" => $record_order
    );

    array_push($personnels_arr["records"], $personnel_item);
}
 
// include paging
$total_rows = $personnel->count();
$page_url = "{$home_url}personnel/read_paging.php?";
$paging = $utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
$personnels_arr["paging"] = $paging;

if ($num > 0) {
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else{
    echo json_encode(
        array("message" => "No personnels found.")
    );
}
