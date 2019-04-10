<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/expiry_type.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$idassign = new ExpiryDateType($db);

// query products
$stmt = $idassign->readSimple(ExpiryTarget::PERSONNEL);
 
// products array
$expiry_arr = array();
$num = 0;

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract(array_change_key_case($row));
    array_push($expiry_arr, $edt_type_code);
}

if ($num > 0) {
    http_response_code(200);
    echo json_encode($expiry_arr, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No area record found.")
    );
}
