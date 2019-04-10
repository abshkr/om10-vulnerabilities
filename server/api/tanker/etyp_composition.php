<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/tanker.php';
include_once '../objects/eqpt.php';
include_once '../objects/eqpt_type.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare eqyp object
$eqyp = new EquipmentType($db);

$top_etyp = (isset($_GET["etyp_id"]) ? $_GET["etyp_id"]: null);

if (!isset($top_etyp)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to get equipment compositon. Data is incomplete."));
}

// query products
$stmt = $eqyp->composition($top_etyp);
 
// products array
$personnels_arr = array();
$personnels_arr["subetyp_count"] = $eqyp->subeqptCount($top_etyp);
$personnels_arr["records"] = array();
$num = 0;

// retrieve our table contents
while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
    $num += 1;
    
    $equip_list = array();
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract(array_change_key_case($row));
    
    $personnel_item = array(
        "etyp_id" => $etyp_id, 
        "etyp_title" => $etyp_title, 
        "equip_isleaf" => $equip_isleaf,
        "cmpt_count" => $cmpt_count,
        "etyp_isrigid" => $etyp_isrigid,
        "eqpt_list" => $equip_list
    );

    $stmt2 = $eqyp->equipments($etyp_id);
     
    // retrieve our table contents
    while ($row = oci_fetch_array($stmt2, OCI_ASSOC + OCI_RETURN_NULLS)) {
        extract(array_change_key_case($row));
        $equip_list_item = array(
            "eqpt_id" => $eqpt_id, 
            "eqpt_code" => $eqpt_code, 
            "eqpt_title" => $eqpt_title,
            "eqpt_name" => $eqpt_name,
            "eqpt_owner" => $eqpt_owner,
            "eqpt_lock" => $eqpt_lock
        );

        if (!isset($equip_list_item))
            $equip_list_item = array();

        $equip_list_item = array_map(function($v){
                return (is_null($v)) ? "" : $v;
            }, $equip_list_item);
        array_push($personnel_item["eqpt_list"], $equip_list_item);
    }

    if ((int)$cmpt_count > 0) {
        $personnel_item["compartments"] = array();
            
        $stmt3 = $eqyp->compartments($etyp_id);
         
        // retrieve our table contents
        while ($row = oci_fetch_array($stmt3, OCI_ASSOC + OCI_RETURN_NULLS)) {
            extract(array_change_key_case($row));
            $compartment_item = array(
                "cmpt_no" => $cmpt_no,
                "cmpt_units" => $cmpt_units,
                "safefill" => $safefill,
                "sfl" => $sfl
            );

            $compartment_item = array_map(function($v){
                return (is_null($v)) ? "" : $v;
            }, $compartment_item);
            array_push($personnel_item["compartments"], $compartment_item);
        }
    }

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
        array("message" => "No tanker composition record found.")
    );
}
