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
$start_date = null;
$end_date = null;
if (isset($_GET['start_date'])) {
    $start_date = $_GET['start_date'];
    if (isset($_GET['end_date'])) {
        $end_date = $_GET['end_date'];        
    } else {
        echo json_encode(
            array("message" => "Invalid start/end date pairs")
        );
        return;
    }
}

// initialize object
$on_demand = new OndemandReport($db);
 
// query products
$stmt = $on_demand->closeout_nrs($start_date, $end_date);
 
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
            "closeout_nr" => $closeout_nr,
            "start_date" => $closeout_date,
            "end_date" => $prev_closeout_date,
            "status" => $status
    );

    array_push($personnels_arr["records"], $personnel_item);
}

if ($num > 0) {
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    echo json_encode(
        array("message" => "No closeout numbers found.")
    );
}
