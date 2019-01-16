<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/idassignment.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare idassign object
$idassign = new IDAssignment($db);
if (isset($_GET["start_num"]))
    $idassign->start_num = $_GET["start_num"];
if (isset($_GET["end_num"]))
    $idassign->end_num = $_GET["end_num"];

$tnkr_owner = (isset($_GET["tnkr_owner"]) ? 
    '%' . $_GET["tnkr_owner"] . '%' : '%');

// query products
$stmt = $idassign->tankers($tnkr_owner);
 
// products array
$personnels_arr = array();
$personnels_arr['result_count'] = $idassign->tanker_count($tnkr_owner);
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
        "tnkr_etyp_id" => $tnkr_etyp_id,
        "tnkr_etyp_name" => $tnkr_etyp_name,
        "tnkr_carrier" => $tnkr_carrier,
        "tnkr_carrier_name" => $tnkr_carrier_name,
        "tnkr_owner" => $tnkr_owner,
        "tnkr_owner_name" => $tnkr_owner_name,
        "tnkr_desc" => $tnkr_desc
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
