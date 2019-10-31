<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/metering.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$cust_cat = new Metering($db);
 
// query products
$stmt = $cust_cat->read();
 
// products array
$personnels_arr = array();
$personnels_arr["records"] = array();
$num = 0;

//Mass unit could be kg, lb, IMP, ton
$mass_unit = (isset($_GET["mass_unit"]) ? $_GET["mass_unit"] : "kg");
//Vol unit could be litre, m3, gal.imp, gal.us, bbl.imp, bbl.us
$vol_unit = (isset($_GET["vol_unit"]) ? $_GET["vol_unit"] : "litre");

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract(array_change_key_case($row));

    if (strcasecmp($mass_unit, 'lb') == 0) {
        $mass *= 2.20462;
    } else if (strcasecmp($mass_unit, 'IMP') == 0) {
        $mass *= 0.000984207;
    } else if (strcasecmp($mass_unit, 'ton') == 0) {
        $mass *= 0.001;
    }

    if (strcasecmp($vol_unit, 'm3') == 0) {
        $observedvolume *= 0.001;
        $standardvolume *= 0.001;
    } else if (strcasecmp($vol_unit, 'gal.imp') == 0) {
        $observedvolume *= 0.219969;
        $standardvolume *= 0.219969;
    } else if (strcasecmp($vol_unit, 'gal.us') == 0) {
        $observedvolume *= 0.264172;
        $standardvolume *= 0.264172;
    } else if (strcasecmp($vol_unit, 'bbl.imp') == 0) {
        $observedvolume *= 0.0061103;
        $standardvolume *= 0.0061103;
    } else if (strcasecmp($vol_unit, 'bbl.us') == 0) {
        $observedvolume *= 0.0062898;
        $standardvolume *= 0.0062898;
    }

    $personnel_item = array(
        "metercode" => $metercode,
        "metertype" => $metertype,
        "metertypename" => $metertypename,
        "observedvolume" => $observedvolume,
        "standardvolume" => $standardvolume,
        "mass" => $mass
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
        array("message" => "No metering record found.")
    );
}
