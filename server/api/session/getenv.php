<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include_once '../config/setups.php';
// echo json_encode($_SERVER, JSON_PRETTY_PRINT);
echo json_encode(array(
    "SITE_TEMPERATURE_UNIT" => $_SERVER['SITE_TEMPERATURE_UNIT'],
    "SITE_DENSITY_UNIT" => $_SERVER['SITE_DENSITY_UNIT'],
    "TEMP_COMP_REF_TEMPERATURE" => $_SERVER['TEMP_COMP_REF_TEMPERATURE'],
    "VSM_COMPENSATION_PT" => $_SERVER['VSM_COMPENSATION_PT'],
    "SCHEDUNITS" => $_SERVER['SCHEDUNITS'],
), JSON_PRETTY_PRINT);