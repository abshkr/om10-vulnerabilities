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

$employer = (isset($_GET["employer"]) ? 
    '%' . $_GET["employer"] . '%' : '%');
$role = (isset($_GET["role"]) ? 
    '%' . $_GET["role"] . '%' : '%');

// query products
$stmt = $idassign->lookupPersonnel($employer, $role);
 
// products array
$personnels_arr = array();
$personnels_arr['result_count'] = $idassign->lookupPsnCount($employer, $role);
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
        "per_code" => $per_code,
        "per_name" => $per_name,
        "role_id" => $role_id,
        "role_name" => $role_name,
        "per_cmpy" => $per_cmpy,
        "cmpy_name" => $cmpy_name,
        "per_department" => $per_department
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
