<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/eqpt.php';
include_once '../objects/expiry_date.php';
include_once '../objects/expiry_type.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare eqpt object
$eqpt = new Equipment($db);
if (isset($_GET["start_num"]))
    $eqpt->start_num = $_GET["start_num"];
if (isset($_GET["end_num"]))
    $eqpt->end_num = $_GET["end_num"];

$eqpt_code = (isset($_GET["eqpt_code"]) ? 
    '%' . $_GET["eqpt_code"] . '%' : '%');
$eqpt_owner = (isset($_GET["eqpt_owner"]) ? 
    $_GET["eqpt_owner"] : null);
$eqpt_etp = (isset($_GET["eqpt_etp"]) ? 
    $_GET["eqpt_etp"] : null);

// query products
$stmt = $eqpt->search($eqpt_code, $eqpt_owner, $eqpt_etp);
 
// products array
$personnels_arr = array();
$personnels_arr['result_count'] = $eqpt->searchCount($eqpt_code, $eqpt_owner, $eqpt_etp);
$personnels_arr['start_num'] = $eqpt->start_num;
$personnels_arr['end_num'] = $eqpt->end_num;
$personnels_arr["records"] = array();
$num = 0;

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract(array_change_key_case($row));
    $eqpt_item = array(
        "eqpt_id" => $eqpt_id,
        "eqpt_code" => $eqpt_code,
        "eqpt_title" => $eqpt_title,
        "eqpt_tanker" => $eqpt_tanker,
        "eqpt_owner" => $eqpt_owner,
        "eqpt_owner_name" => $eqpt_owner_name,
        "eqpt_etp" => $eqpt_etp,
        "eqpt_etp_title" => $eqpt_etp_title,
        "expiry_dates" => array(),
        // "eqpt_exp_d1_dmy" => $eqpt_exp_d1_dmy,
        // "eqpt_exp_d2_dmy" => $eqpt_exp_d2_dmy, 
        // "eqpt_exp_d3_dmy" => $eqpt_exp_d3_dmy,
        "eqpt_lock" => $eqpt_lock,
        "eqpt_empty_kg" => $eqpt_empty_kg,
        "eqp_must_tare_in" => $eqp_must_tare_in,
        "eqpt_max_gross" => $eqpt_max_gross,
        "eqpt_comments" => $eqpt_comments,
        "eqpt_area" => $eqpt_area,
        "eqpt_area_name" => $eqpt_area_name,
        "eqpt_load_type" => $eqpt_load_type,
        "eqpt_load_type_name" => $eqpt_load_type_name,
        "etyp_category" => $etyp_category,
        "rn" => $rn,
        "eqpt_last_modified" => $eqpt_last_modified,
        "eqpt_last_used" => $eqpt_last_used
    );

    $expiry_date = new ExpiryDate($db);
    $expiry_date->target_code = ExpiryTarget::TRANSP_EQUIP;
    $expiry_date->obj_code = $eqpt_id;
    $stmt2 = $expiry_date->read();
     
    // retrieve our table contents
    while ($row = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS)) {
        extract(array_change_key_case($row));
        $dates_item = array(
            "ed_type_code" => $ed_type_code, 
            "edt_type_desc" => $edt_type_desc, 
            "ed_exp_date" => $ed_exp_date
        );

        if (!isset($dates_item))
            $dates_item = array();

        $dates_item = array_map(function($v){
                return (is_null($v)) ? "" : $v;
            }, $dates_item);
        array_push($eqpt_item["expiry_dates"], $dates_item);
    }

    $eqpt_item = array_map(function($v){
        return (is_null($v)) ? "" : $v;
    }, $eqpt_item);
    array_push($personnels_arr["records"], $eqpt_item);
}

if ($num > 0) {
    http_response_code(200);
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No equipment record found.")
    );
}
