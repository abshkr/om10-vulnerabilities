<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/on_demand.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$supplier = isset($_GET['cmpy_code']) ? $_GET['cmpy_code'] : 'ANY';
 
$on_demand = new OndemandReport($db);
 
// query products
$stmt = $on_demand->reports($supplier);
 
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
            "report" => $ondemand_title,
            "rpt_file" => $rpt_file,
            'jasper_file' => $jasper_file
    );

    array_push($personnels_arr["records"], $personnel_item);
}

if ($num > 0) {
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    echo json_encode(
        array("message" => "No report found.")
    );
}
