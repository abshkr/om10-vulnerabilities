<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/prod_inv.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$cust_cat = new ProdInv($db);
 
// query products
$stmt = $cust_cat->read();
 
// products array
$personnels_arr = array();
$personnels_arr["records"] = array();
$num = 0;

$target_unit = (isset($_GET["unit"]) ? $_GET["unit"] : "LITRE");

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract(array_change_key_case($row));

    if (strcasecmp($target_unit, 'IMP.GAL') == 0) {
        $netvol *= 0.219969;
        $grossvol *= 0.219969;
        $usablevol *= 0.219969;
        $bookbalance *= 0.219969;
    } else if (strcasecmp($target_unit, 'CUBIC') == 0) {
        $netvol = $netvol / 1000.0;
        $grossvol = $grossvol / 1000.0;
        $usablevol = $usablevol / 1000.0;
        $bookbalance = $bookbalance / 1000.0;
    } else if (strcasecmp($target_unit, 'US.GAL') == 0) {
        $netvol *= 0.264172;
        $grossvol *= 0.264172;
        $usablevol *= 0.264172;
        $bookbalance *= 0.264172;
    }

    $personnel_item = array(
        "base_code" => $base_code,
        "base_name" => $base_name,
        "netvol" => $netvol,
        "grossvol" => $grossvol,
        "usablevol" => $usablevol,
        "bookbalance" => $bookbalance
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
        array("message" => "No product inventory record found.")
    );
}
