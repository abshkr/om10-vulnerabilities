<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/area.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$idassign = new Area($db);

// query products
$stmt = $idassign->read();
 
// products array
$personnels_arr = array();
$personnels_arr["records"] = array();

$num = Utilities::retrieve($personnels_arr["records"], $stmt);
Utilities::echoRead($num, $personnels_arr, "area");

// retrieve our table contents
// while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
//     $num += 1;
    
//     // extract row
//     // this will make $row['name'] to
//     // just $name only
//     extract(array_change_key_case($row));

//     $personnel_item = array(
//         "area_k" => $area_k,
//         "area_name" => $area_name,
//         "area_cpcty" => $area_cpcty
//     );

//     $personnel_item = array_map(function($v){
//         return (is_null($v)) ? "" : $v;
//     }, $personnel_item);
//     array_push($personnels_arr["records"], $personnel_item);
// }

// if ($num > 0) {
//     http_response_code(200);
//     echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
// } else {
//     http_response_code(404);
//     echo json_encode(
//         array("message" => "No area record found.")
//     );
// }
