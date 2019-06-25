<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/eqpt.php';

 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare tankers object
$tankers = new Equipment($db);

$eqpt_id = (isset($_GET["eqpt_id"]) ? $_GET["eqpt_id"]: null);

if (!isset($eqpt_id)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to get equipment compositon. Data is incomplete."));
}

// query products
$stmt = $tankers->compartments($eqpt_id);
 
// products array
$personnels_arr = array();
$personnels_arr['count'] = $tankers->compartmentCount($eqpt_id);
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
        "cmpt_no" => $cmpt_no, 
        "safefill" => $safefill, 
        "safefill_unit" => $cmpt_units,
        "sfl" => $sfl,
        "sfl_unit" => "(L)",
        "adj_cmpt_lock" => $adj_cmpt_lock
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
        array("message" => "No equipment compartment record found.")
    );
}
