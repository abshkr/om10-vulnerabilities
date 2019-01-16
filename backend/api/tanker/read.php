<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/tanker.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$tanker = new Tanker($db);
if (isset($_GET["start_num"]))
    $tanker->start_num= $_GET["start_num"];
if (isset($_GET["end_num"]))
    $tanker->end_num= $_GET["end_num"];

// query products
$stmt = $tanker->read();
 
// products array
$personnels_arr = array();
$personnels_arr['result_count'] = $tanker->count();
$personnels_arr['start_num'] = $tanker->start_num;
$personnels_arr['end_num'] = $tanker->end_num;
$personnels_arr["records"] = array();
$num = 0;

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract(array_change_key_case($row));

    $personnel_item = array(
        "tnkr_code" => $tnkr_code,
        "tnkr_name" => $tnkr_name,
        "tnkr_carrier" => $tnkr_carrier,
        "tnkr_carrier_name" => $tnkr_carrier_name,
        "tnkr_owner" => $tnkr_owner,
        "tnkr_owner_name" => $tnkr_owner_name,
        "tnkr_etp" => $tnkr_etp,
        "tnkr_eqpt_name" => $tnkr_eqpt_name,
        "tnkr_base_site" => $tnkr_base_site,
        "tnkr_base_site_name" => $tnkr_base_site_name,
        "tnkr_dest_depot" => $tnkr_dest_depot,
        "tnkr_dest_depot_name" => $tnkr_dest_depot_name,
        "tnkr_last_depot" => $tnkr_last_depot,
        "tnkr_last_depot_name" => $tnkr_last_depot_name,
        "tnkr_cur_depot" => $tnkr_cur_depot,
        "tnkr_cur_depot_name" => $tnkr_cur_depot_name,
        "tnkr_pin" => $tnkr_pin,
        "tnkr_lock" => $tnkr_lock,
        "tnkr_active" => $tnkr_active,
        "tnkr_bay_loop_ch" => $tnkr_bay_loop_ch,
        "tnkr_archive" => $tnkr_archive,
        "tnkr_ntrips" => $tnkr_ntrips,
        "tnkr_own_txt" => $tnkr_own_txt,
        "tnkr_lic_exp" => $tnkr_lic_exp,
        "tnkr_dglic_exp" => $tnkr_dglic_exp,
        "tnkr_ins_exp" => $tnkr_ins_exp,
        "tnkr_stats" => $tnkr_stats,
        "tnkr_last_trip" => $tnkr_last_trip,
        "tnkr_max_kg" => $tnkr_max_kg,
        "remarks" => $remarks,
        "etyp_category" => $etyp_category,
        "tnkr_last_modified" => $tnkr_last_modified,
        "tnkr_last_used" => $tnkr_last_used
    );

    $personnel_item = array_map(function($v){
        return (is_null($v)) ? "" : $v;
    }, $personnel_item);
    array_push($personnels_arr["records"], $personnel_item);
}

if ($num > 0) {
    http_response_code(200);
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No tanker record found.")
    );
}
