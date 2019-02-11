<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
include_once '../objects/base_product.php';

$database = new Database();
$db = $database->getConnection();

$eqpt = new Base($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    // set eqpt property values
    if (property_exists($data, 'base_color')) 
        $eqpt->base_color = $data->base_color;
    if (property_exists($data, 'base_name')) 
        $eqpt->base_name = $data->base_name;
    if (property_exists($data, 'base_prod_group')) 
        $eqpt->base_prod_group = $data->base_prod_group;
    if (property_exists($data, 'base_corr_mthd')) 
        $eqpt->base_corr_mthd = $data->base_corr_mthd;
    if (property_exists($data, 'base_ref_temp')) 
        $eqpt->base_ref_temp = $data->base_ref_temp;
    if (property_exists($data, 'base_dens_hi'))
        $eqpt->base_dens_hi = $data->base_dens_hi;
    if (property_exists($data, 'base_dens_lo'))
        $eqpt->base_dens_lo = $data->base_dens_lo;
    if (property_exists($data, 'base_cat')) 
        $eqpt->base_cat = $data->base_cat;
    if (property_exists($data, 'base_ref_tunt')) 
        $eqpt->base_ref_tunt = $data->base_ref_tunt;
    if (property_exists($data, 'base_limit_preset_ht')) 
        $eqpt->base_limit_preset_ht = $data->base_limit_preset_ht;
    if (property_exists($data, 'base_ref_temp_spec')) 
        $eqpt->base_ref_temp_spec = $data->base_ref_temp_spec;
    if (property_exists($data, 'base_code')) 
        $eqpt->base_code = $data->base_code;
} else {
    if (isset($_GET["base_color"]))
        $eqpt->base_color = $_GET["base_color"];
    if (isset($_GET["base_name"]))
        $eqpt->base_name = $_GET["base_name"];
    if (isset($_GET["base_prod_group"]))
        $eqpt->base_prod_group = $_GET["base_prod_group"];
    if (isset($_GET["base_corr_mthd"]))
        $eqpt->base_corr_mthd = $_GET["base_corr_mthd"];
    if (isset($_GET["base_ref_temp"]))
        $eqpt->base_ref_temp = $_GET["base_ref_temp"];
    if (isset($_GET["base_dens_hi"]))
        $eqpt->base_dens_hi = $_GET["base_dens_hi"];
    if (isset($_GET["base_dens_lo"]))
        $eqpt->base_dens_lo = $_GET["base_dens_lo"];
    if (isset($_GET["base_cat"]))
        $eqpt->base_cat = $_GET["base_cat"];
    if (isset($_GET["base_ref_tunt"]))
        $eqpt->base_ref_tunt = $_GET["base_ref_tunt"];
    if (isset($_GET["base_limit_preset_ht"]))
        $eqpt->base_limit_preset_ht = $_GET["base_limit_preset_ht"];
    if (isset($_GET["base_ref_temp_spec"]))
        $eqpt->base_ref_temp_spec = $_GET["base_ref_temp_spec"];
    if (isset($_GET["base_code"]))
        $eqpt->base_code = $_GET["base_code"];
}

write_log(json_encode($eqpt), __FILE__, __LINE__);

if (!isset($eqpt->base_code)) {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create base. Data is incomplete."));
    return;
}

// create the eqpt
if ($eqpt->create()){
    echo '{';
        echo '"message": "Base product created."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to create base."';
    echo '}';
}
