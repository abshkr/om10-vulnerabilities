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
include_once '../../objects/eqpt_type.php';

 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare eqpy object
$eqpy = new EquipmentType($db);

$etyp_id = (isset($_GET["etyp_id"]) ? $_GET["etyp_id"]: null);

if (!isset($etyp_id)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to get equipment type compartments. Data is incomplete."));
}

// query products
$stmt = $eqpy->compartments($etyp_id);
 
// products array
$personnels_arr = array();
// $personnels_arr['count'] = $eqpy->compartmentCount($etyp_id);
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
        "sfl_unit" => "(L)"
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
