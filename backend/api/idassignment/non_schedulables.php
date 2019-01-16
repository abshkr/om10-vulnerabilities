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

$owner = (isset($_GET["owner"]) ? $_GET["owner"] : null);

// query products
$stmt = $idassign->non_schedulables($owner);
 
// products array
$personnels_arr = array();
$personnels_arr['result_count'] = $idassign->non_schedulables_count($owner);
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
        "eqpt_id" => $eqpt_id,
        "eqpt_code" => $eqpt_code,
        "eqpt_name" => $eqpt_name,
        "eqpt_etyp_id" => $eqpt_etyp_id,
        "eqpt_etyp_name" => $eqpt_etyp_name,
        "eqpt_ownr_code" => $eqpt_ownr_code,
        "eqpt_ownr_name" => $eqpt_ownr_name,
        "eqpt_desc" => $eqpt_desc
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
        array("message" => "No non-schedulable record found.")
    );
}
