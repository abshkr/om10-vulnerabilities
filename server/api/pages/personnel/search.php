<?php

/**
* curl -i "http://10.2.20.53/api/personnel/search.php?s=cw" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJfY29kZSI6Ijk5OTkiLCJleHAiOjE1MzczMzczMDcsInNlc3NfaWQiOiJaVXpJVlZ4Z1B6UW8ifQ.dGzWmDksxyWDe9Me0WAhnfBK9KZmoEhR9lXOyl8-D6A"
*/
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/personnel.php';
include_once '../../objects/expiry_date.php';
include_once '../../objects/expiry_type.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

if (!$db) {
    echo json_encode(
        array("message" => "No personnel found.")
    );
    return;
}

// initialize object
$personnel = new Personnel($db);
 
// query products
$keyword = isset($_GET["s"]) ? $_GET["s"] : "";
$stmt = $personnel->search($keyword);
 
$personnels_arr = array();
$personnels_arr["records"] = array();

$num = 0;
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    $base_item = array();
    foreach ($row as $key => $value) {
        $base_item[strtolower($key)] = $value;
    }

    $base_item["area_accesses"] = array();
    $personnel->per_code = $row["PER_CODE"];
    $stmt2 = $personnel->areaAccess();
     
    // retrieve our table contents
    while ($row = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS)) {
        $base_item2 = array();
        foreach ($row as $key => $value) {
            $base_item2[strtolower($key)] = $value;
        }

        // if ($personnel->per_code === "cw3") {
        //     write_log(json_encode($base_item2), __FILE__, __LINE__);
        // }

        $base_item2 = array_map(function($v){
                return (is_null($v)) ? "" : $v;
            }, $base_item2);

        if (count($base_item2) > 0) {
            array_push($base_item["area_accesses"], $base_item2);
        }
    }

    //Expiry dates from EXPIRY_DATE_DETAILS
    $base_item["expiry_dates"] = array();
    $expiry_date = new ExpiryDate($db);
    $expiry_date->ed_target_code = ExpiryTarget::PERSONNEL;
    $expiry_date->ed_object_id = $personnel->per_code;
    $stmt3 = $expiry_date->read();
     
    while ($row = oci_fetch_array($stmt3, OCI_ASSOC + OCI_RETURN_NULLS)) {
        $base_item2 = array();
        foreach ($row as $key => $value) {
            $base_item2[strtolower($key)] = $value;
        }

        // write_log(json_encode($base_item2), __FILE__, __LINE__);

        $base_item2 = array_map(function($v){
                return (is_null($v)) ? "" : $v;
            }, $base_item2);

        if (count($base_item2) > 0) {
            array_push($base_item["expiry_dates"], $base_item2);
        }
    }

    $base_item = array_map(function($v){
        return (is_null($v)) ? "" : $v;
    }, $base_item);

    array_push($personnels_arr["records"], $base_item);
}

Utilities::echoRead($num, $personnels_arr, "personnel");