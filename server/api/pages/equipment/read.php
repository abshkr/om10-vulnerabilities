<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/eqpt.php';
include_once '../../objects/expiry_date.php';
include_once '../../objects/expiry_type.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$eqpt = new Equipment($db);
if (isset($_GET["start_num"]))
    $eqpt->start_num= $_GET["start_num"];
if (isset($_GET["end_num"]))
    $eqpt->end_num= $_GET["end_num"];

// query products
$stmt = $eqpt->read();

$personnels_arr = array();
$personnels_arr['result_count'] = $eqpt->count();
$personnels_arr['start_num'] = $eqpt->start_num;
$personnels_arr['end_num'] = $eqpt->end_num;
$personnels_arr["records"] = array();
$num = 0;

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;

    $eqpt_item = array();
    foreach ($row as $key => $value) {
        $eqpt_item[strtolower($key)] = $value;
    }

    $eqpt_item["expiry_dates"] = array();
    $eqpt_id = $row['EQPT_ID'];
    $expiry_date = new ExpiryDate($db);
    $expiry_date->ed_target_code = ExpiryTarget::TRANSP_EQUIP;
    $expiry_date->ed_object_id = $eqpt_id;
    $stmt2 = $expiry_date->read();
    // retrieve our table contents
    while ($row = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS)) {
        $dates_item = array();
        foreach ($row as $key => $value) {
            $dates_item[strtolower($key)] = $value;
        }

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
        array("message" => "No eqpt record found.")
    );
}
