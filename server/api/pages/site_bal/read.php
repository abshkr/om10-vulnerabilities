<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/site_bal.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$cust_cat = new SiteBal($db);
 
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
        $openingstock *= 0.219969;
        $receiptsvol *= 0.219969;
        $accnttot *= 0.219969;
        $transfervol *= 0.219969;
        $bookbalance *= 0.219969;
        $closingstock *= 0.219969;
        $gainloss *= 0.219969;        
    } else if (strcasecmp($target_unit, 'CUBIC') == 0) {
        $openingstock /= 1000;
        $receiptsvol /= 1000;
        $accnttot /= 1000;
        $transfervol /= 1000;
        $bookbalance /= 1000;
        $closingstock /= 1000;
        $gainloss /= 1000;
    } else if (strcasecmp($target_unit, 'US.GAL') == 0) {
        $openingstock *= 0.264172;
        $receiptsvol *= 0.264172;
        $accnttot *= 0.264172;
        $transfervol *= 0.264172;
        $bookbalance *= 0.264172;
        $closingstock *= 0.264172;
        $gainloss *= 0.264172; 
    }

    $personnel_item = array(
        "tankcode" => $tankcode,
        "productcode" => $productcode,
        "productname" => $productname,
        "tank_density" => $tank_density,
        "openingstock" => $openingstock,
        "receiptsvol" => $receiptsvol,
        "accnttot" => $accnttot,
        "transfervol" => $transfervol,
        "bookbalance" => $bookbalance,
        "closingstock" => $closingstock,
        "gainloss" => $gainloss
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
        array("message" => "No site balance record found.")
    );
}
