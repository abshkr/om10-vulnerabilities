<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/personnel.php';
include_once '../../shared/log.php';
include_once '../../objects/expiry_date.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$personnel = new Personnel($db);

// query products
$stmt = $personnel->read();

$personnels_arr = array();
$personnels_arr["records"] = array();

// retrieve our table contents
// $num = Utilities::retrieve($personnels_arr["records"], $stmt);

$num = 0;
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;

    $base_item = array();
    foreach ($row as $key => $value) {
        $base_item[strtolower($key)] = $value;
    }

    //area access control
    $base_item["area_accesses"] = array();
    $personnel->per_code = $row["PER_CODE"];
    $stmt2 = $personnel->areaAccess();

    while ($row = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS)) {
        $base_item2 = array();
        foreach ($row as $key => $value) {
            $base_item2[strtolower($key)] = $value;
        }

        $base_item2 = array_map(function ($v) {
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

        $base_item2 = array_map(function ($v) {
            return (is_null($v)) ? "" : $v;
        }, $base_item2);

        if (count($base_item2) > 0) {
            array_push($base_item["expiry_dates"], $base_item2);
        }
    }

    $base_item = array_map(function ($v) {
        return (is_null($v)) ? "" : $v;
    }, $base_item);

    array_push($personnels_arr["records"], $base_item);
}

Utilities::echoRead($num, $personnels_arr, "personnel");
