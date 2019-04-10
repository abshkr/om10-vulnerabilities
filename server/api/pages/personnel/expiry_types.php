<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/expiry_type.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$idassign = new ExpiryDateType($db);

// query products
$stmt = $idassign->read(ExpiryTarget::PERSONNEL);
 
// products array
$personnels_arr = array();
$personnels_arr["records"] = array();

// retrieve our table contents
// while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
//     $num += 1;
    
//     // extract row
//     // this will make $row['name'] to
//     // just $name only
//     extract(array_change_key_case($row));

//     $personnel_item = array(
//         "edt_target_code" => $edt_target_code,
//         "edt_type_code" => $edt_type_code,
//         "edt_type_desc" => $edt_type_desc,
//         "edt_def_exp_date" => $edt_def_exp_date,
//         "edt_date_fmt" => $edt_date_fmt,
//         "edt_time_enabled " => $edt_time_enabled,
//         "edt_status" => $edt_status,
//         "edt_reject" => $edt_reject,
//         "edt_default" => $edt_default
//     );

//     $personnel_item = array_map(function($v){
//         return (is_null($v)) ? "" : $v;
//     }, $personnel_item);
//     array_push($personnels_arr["records"], $personnel_item);
// }

$num = Utilities::retrieve($personnels_arr["records"], $stmt);
Utilities::echoRead($num, $personnels_arr, "exipry type");