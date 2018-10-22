<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/on_demand.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
if (isset($_GET['jasper_file'])) {
    $jasper_file = $_GET['jasper_file'];
} else {
    echo json_encode(
        array("message" => "No parameter found.")
    );
    return;
}   
 
$on_demand = new OndemandReport($db);
 
// query products
$stmt = $on_demand->parameters($jasper_file);
 
// products array
$personnels_arr = array();
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
        "argument_name" => $argument_name,
        "argument_seq" => $argument_seq
    );

    array_push($personnels_arr["records"], $personnel_item);
}

if ($num > 0) {
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    echo json_encode(
        array("message" => "No parameter found.")
    );
}
