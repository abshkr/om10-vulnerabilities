<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/time_code.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$time_code = new TimeCode($db);
$time_code->tcd_title = (isset($_GET["tcd_title"]) ? $_GET["tcd_title"] : "AL");
 
// query products
$stmt = $time_code->read();
 
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
        "tcd_title" => $tcd_title,
        "tcd_mon" => $tcd_mon,
        "tcd_tue" => $tcd_tue,
        "tcd_wed" => $tcd_wed,
        "tcd_thu" => $tcd_thu,
        "tcd_fri" => $tcd_fri,
        "tcd_sat" => $tcd_sat,
        "tcd_sun" => $tcd_sun
    );

    array_push($personnels_arr["records"], $personnel_item);
}

if ($num > 0) {
    http_response_code(200);
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No time code record found.")
    );
}
