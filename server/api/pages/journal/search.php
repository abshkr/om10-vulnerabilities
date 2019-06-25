<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/om_journal.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare jnl object
$jnl = new OMJournal($db);
 
// get id of jnl to be edited
if (isset($_GET["start_date"]))
    $start_date = $_GET["start_date"];
if (isset($_GET["end_date"]))
    $end_date = $_GET["end_date"];

if (isset($_GET["start_num"]))
    $jnl->start_num = $_GET["start_num"];
if (isset($_GET["end_num"]))
    $jnl->end_num = $_GET["end_num"];

$types = (isset($_GET["types"]) ? 
    $_GET["types"] : null);
$target_str = (isset($_GET["target_str"]) ? 
    '%' . $_GET["target_str"] . '%' : '%');

if (!isset($start_date) || 
    !isset($end_date)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to search for jnl. Data is incomplete."));
}

// query products
$stmt = $jnl->search($types, $start_date, $end_date, $target_str);
 
// products array
$personnels_arr = array();
$personnels_arr['result_count'] = $jnl->search_count($types, $start_date, $end_date, $target_str);
$personnels_arr['start_num'] = $jnl->start_num;
$personnels_arr['end_num'] = $jnl->end_num;
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
        "gen_date" => $gen_date,
        "region_code" => $region_code,
        "print_date" => $print_date,
        "company_code" => $company_code,
        "msg_event" => $msg_event,
        "msg_class" => $msg_class,
        "message" => $message,
        "seq" => $seq,
        "jnl_cat" => $jnl_cat
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
        array("message" => "No journal record found.")
    );
}
