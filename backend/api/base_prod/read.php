<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/base_product.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$base = new Base($db);

// query products
$stmt = $base->read();

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

    $base_item = array(
        "base_code" => $base_code,
        "base_name" => $base_name,
        "base_prod_group" => $base_prod_group,
        "base_group_name" => $base_group_name,
        "base_cat" => $base_cat,
        "base_class_desc" => $base_class_desc,
        "base_rpt_tunt" => $base_rpt_tunt,
        "base_rpt_temp" => $base_rpt_temp,
        "base_dens_lo" => $base_dens_lo,
        "base_dens_hi" => $base_dens_hi,
        "base_color" => $base_color,
        "base_adtv" => $base_adtv,
        "base_text" => $base_text,
        "base_desc" => $base_desc,
        "base_class_dens_lo" => $base_class_dens_lo,
        "base_class_dens_hi" => $base_class_dens_hi,
        "base_class_vcf_alg" => $base_class_vcf_alg,
        "base_class_temp_lo" => $base_class_temp_lo,
        "base_class_temp_hi" => $base_class_temp_hi,
        "base_tank_count" => $base_tank_count,
        "base_tank_list" => $base_tank_list,
        "base_ref_temp" => $base_ref_temp,
        "base_ref_tunt" => $base_ref_tunt,
        "base_limit_preset_ht" => $base_limit_preset_ht,
        "base_corr_mthd" => $base_corr_mthd,
        "base_ref_temp_spec" => $base_ref_temp_spec,
        "base_ref_tunt_name" => $base_ref_tunt_name,
        "base_corr_mthd_name" => $base_corr_mthd_name,
        "base_ref_temp_spec_name" => $base_ref_temp_spec_name
    );

    $base_item = array_map(function($v){
        return (is_null($v)) ? "" : $v;
    }, $base_item);
    array_push($personnels_arr["records"], $base_item);
}

if ($num > 0) {
    http_response_code(200);
    echo json_encode($personnels_arr, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No base product record found.")
    );
}
