<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/tanker.php';
include_once '../objects/expiry_date.php';

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
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    $base_item = array();
    foreach ($row as $key => $value) {
        $base_item[strtolower($key)] = $value;
    }

    //Expiry dates from EXPIRY_DATE_DETAILS
    $base_item["expiry_dates"] = array();
    $expiry_date = new ExpiryDate($db);
    $expiry_date->ed_target_code = ExpiryTarget::TANKER;
    $expiry_date->ed_object_id = $row["TNKR_CODE"];
    $stmt3 = $expiry_date->read();
    
    while ($row2 = oci_fetch_array($stmt3, OCI_ASSOC + OCI_RETURN_NULLS)) {
        $base_item2 = array();
        foreach ($row2 as $key => $value) {
            $base_item2[strtolower($key)] = $value;
        }

        $base_item2 = array_map(function($v){
                return (is_null($v)) ? "" : $v;
            }, $base_item2);

        if (count($base_item2) > 0) {
            array_push($base_item["expiry_dates"], $base_item2);
        }
    }

    $base_item = array_map(function($v){
        return (is_null($v)) ? "" : $v;
    }, $base_item);

    array_push($personnels_arr["records"], $base_item);
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
