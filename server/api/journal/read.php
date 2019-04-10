<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/om_journal.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$jnl = new OMJournal($db);
if (isset($_GET["start_num"]))
    $jnl->start_num= $_GET["start_num"];
if (isset($_GET["end_num"]))
    $jnl->end_num= $_GET["end_num"];
if (isset($_GET["region_code"]))
    $jnl->region_code= $_GET["region_code"];

// query products
$stmt = $jnl->read();
 
// products array
$personnels_arr = array();
$personnels_arr['max_seq'] = $jnl->get_max_seq();
$personnels_arr['result_count'] = $jnl->end_num - $jnl->start_num + 1;
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
