<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/tank_inv.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$cust_cat = new TankInv($db);
 
// query products
$stmt = $cust_cat->read();
 
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
        "tank_code" => $tank_code,
        "tank_location" => isset($tank_location) ? $tank_location : "",
        "base_name" => $base_name,
        "tank_prod_lvl" => $tank_prod_lvl,
        "tank_temp" => $tank_temp,
        "netvol" => $netvol,
        "grossvol" => $grossvol,
        "pumpablevol" => $pumpablevol,
        "usablevol" => $usablevol,
        "bookbalance" => $bookbalance
    );

    array_push($personnels_arr["records"], $personnel_item);
}

if ($num > 0) {
    http_response_code(200);
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No tank inventory record found.")
    );
}
