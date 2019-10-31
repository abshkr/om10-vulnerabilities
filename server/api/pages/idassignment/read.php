<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/idassignment.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$idassign = new IDAssignment($db);
if (isset($_GET["start_num"]))
    $idassign->start_num= $_GET["start_num"];
if (isset($_GET["end_num"]))
    $idassign->end_num= $_GET["end_num"];

// query products
$stmt = $idassign->read();
 
// products array
$personnels_arr = array();
$personnels_arr['result_count'] = $idassign->count();
$personnels_arr['start_num'] = $idassign->start_num;
$personnels_arr['end_num'] = $idassign->end_num;
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
        "kya_key_no" => $kya_key_no,
        "kya_key_issuer" => $kya_key_issuer,
        "kya_issuer_name" => $kya_issuer_name,
        "kya_type" => $kya_type,
        "kya_type_name" => $kya_type_name,
        "kya_phys_type" => $kya_phys_type,
        "kya_phys_name" => $kya_phys_name,
        "kya_timecode" => $kya_timecode,
        "kya_lock" => $kya_lock,
        "kya_adhoc" => $kya_adhoc,
        "kya_txt" => $kya_txt,
        "kya_key_created" => $kya_key_created,
        "kya_pin" => $kya_pin,
        "kya_pin_changed" => $kya_pin_changed,
        "kya_personnel" => $kya_personnel,
        "kya_psnl_name" => $kya_psnl_name,
        "kya_psnl_cmpy" => $kya_psnl_cmpy,
        "kya_psnl_cmpy_name" => $kya_psnl_cmpy_name,
        "kya_role" => $kya_role,
        "kya_role_name" => $kya_role_name,
        "kya_drawer" => $kya_drawer,
        "kya_draw_name" => $kya_draw_name,
        "kya_supplier" => $kya_supplier,
        "kya_supp_name" => $kya_supp_name,
        "kya_tanker" => $kya_tanker,
        "kya_tnkr_name" => $kya_tnkr_name,
        "kya_tnkr_desc" => $kya_tnkr_desc,
        "kya_tnkr_cmpy" => $kya_tnkr_cmpy,
        "kya_tnkr_cmpy_name" => $kya_tnkr_cmpy_name,
        "kya_equipment" => $kya_equipment,
        "kya_eqpt_name" => $kya_eqpt_name,
        "kya_eqpt_desc" => $kya_eqpt_desc,
        "kya_eqpt_cmpy" => $kya_eqpt_cmpy,
        "kya_eqpt_cmpy_name" => $kya_eqpt_cmpy_name,
        "kya_etyp_name" => $kya_etyp_name,
        "kya_load_site" => $kya_load_site,
        "kya_site_name" => $kya_site_name,
        "kya_load_id" => $kya_load_id,
        "kya_trip_no" => $kya_trip_no,
        "kya_alloc_type" => $kya_alloc_type,
        "kya_alloc_type_name" => $kya_alloc_type_name,
        "kya_alloc_cmpy" => $kya_alloc_cmpy,
        "kya_alloc_cmpy_name" => $kya_alloc_cmpy_name,
        "kya_order_no" => $kya_order_no,
        "kya_cust_ordno" => $kya_cust_ordno,
        "kya_cust_name" => $kya_cust_name,
        "kya_order_desc" => $kya_order_desc
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
        array("message" => "No id assignment record found.")
    );
}
