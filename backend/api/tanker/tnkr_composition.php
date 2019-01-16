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
 
// prepare tankers object
$tankers = new Tanker($db);

$tnkr_code = (isset($_GET["tnkr_code"]) ? $_GET["tnkr_code"]: null);

if (!isset($tnkr_code)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to get tanker compositon. Data is incomplete."));
}

// query products
$stmt = $tankers->composition($tnkr_code);
 
// products array
$personnels_arr = array();
$personnels_arr["eqpt_count"] = $tankers->eqptCount($tnkr_code);
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
        "tc_eqpt" => $tc_eqpt, 
        "tc_seqno" => $tc_seqno, 
        "eqpt_code" => $eqpt_code,
        "eqpt_title" => $eqpt_title,
        "eqpt_owner" => $eqpt_owner,
        "eqpt_etp" => $eqpt_etp,
        "etyp_title" => $etyp_title,
        "eqpt_list" => $equip_list,
        "eqpt_exp_d1_dmy" => $eqpt_exp_d1_dmy,
        "eqpt_exp_d2_dmy" => $eqpt_exp_d2_dmy,
        "eqpt_exp_d3_dmy" => $eqpt_exp_d3_dmy,
        "eqpt_lock" => $eqpt_lock,
        "eqpt_empty_kg" => $eqpt_empty_kg,
        "eqp_must_tare_in" => $eqp_must_tare_in,
        "eqpt_max_gross" => $eqpt_max_gross,
        "eqpt_area" => $eqpt_area,
        "eqpt_load_type" => $eqpt_load_type,
        "eqpt_comments" => $eqpt_comments,
        "cmpt_count" => $cmpt_count
    );

    $eqpt_types = new EquipmentType($db);
    $stmt2 = $eqpt_types->equipments($eqpt_etp);
     
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

        $equip_list_item = array_map(function($v){
            return (is_null($v)) ? "" : $v;
        }, $equip_list_item);
        array_push($personnel_item["eqpt_list"], $equip_list_item);
    }

    if ((int)$cmpt_count > 0) {
        $personnel_item["compartments"] = array();
            
        $eqpt = new Equipment($db);
        $stmt3 = $eqpt->compartments($tc_eqpt);
         
        // retrieve our table contents
        while ($row = oci_fetch_array($stmt3, OCI_ASSOC + OCI_RETURN_NULLS)) {
            extract(array_change_key_case($row));
            $compartment_item = array(
                "eqpt_code" => $eqpt_code, 
                "eqpt_etp" => $eqpt_etp, 
                "cmpt_no" => $cmpt_no,
                "cmpt_units" => $cmpt_units,
                "safefill" => $safefill,
                "sfl" => $sfl,
                "adj_cmpt_lock" => $adj_cmpt_lock
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
