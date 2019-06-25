<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/physical_printer.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$printer = new PhysicalPrinter($db);
$printer->prntr = (isset($_GET["prntr"]) ? $_GET["prntr"] : "%");
$printer->sys_prntr = (isset($_GET["sys_prntr"]) ? $_GET["sys_prntr"] : "%");
$printer->prntr_area = (isset($_GET["prntr_area"]) ? $_GET["prntr_area"] : "%");

// query products
$stmt = $printer->read();
 
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
        "prntr" => $prntr,
        "sys_prntr" => $sys_prntr,
        "prntr_lock" => $prntr_lock,
        "prntr_area" => $prntr_area,
        "area_name" => $area_name
    );

    array_push($personnels_arr["records"], $personnel_item);
}

if ($num > 0) {
    http_response_code(200);
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No physical printer record found.")
    );
}
