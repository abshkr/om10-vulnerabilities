<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate idassign object
include_once '../objects/idassignment.php';

$database = new Database();
$db = $database->getConnection();
 
$idassign = new IDAssignment($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    // set idassign property values
    if (property_exists($data, 'kya_key_no')) 
        $idassign->kya_key_no = $data->kya_key_no;
    if (property_exists($data, 'kya_key_issuer'))
        $idassign->kya_key_issuer = $data->kya_key_issuer;
    if (property_exists($data, 'kya_txt'))
        $idassign->kya_txt = $data->kya_txt;
    if (property_exists($data, 'kya_phys_type')) 
        $idassign->kya_phys_type = $data->kya_phys_type;
    if (property_exists($data, 'kya_type')) 
        $idassign->kya_type = $data->kya_type;
    if (property_exists($data, 'kya_timecd')) 
        $idassign->kya_timecd = $data->kya_timecd;
    if (property_exists($data, 'kya_lock')) 
        $idassign->kya_lock = $data->kya_lock;
    if (property_exists($data, 'kya_adhoc')) 
        $idassign->kya_adhoc = $data->kya_adhoc;
    if (property_exists($data, 'kya_psn')) 
        $idassign->kya_psn = $data->kya_psn;
    if (property_exists($data, 'kya_role')) 
        $idassign->kya_role = $data->kya_role;
    if (property_exists($data, 'kya_drawer')) 
        $idassign->kya_drawer = $data->kya_drawer;
    if (property_exists($data, 'kya_tanker')) 
        $idassign->kya_tanker = $data->kya_tanker;
    if (property_exists($data, 'kya_equipment')) 
        $idassign->kya_equipment = $data->kya_equipment;
    if (property_exists($data, 'kya_sp_supplier')) 
        $idassign->kya_sp_supplier = $data->kya_sp_supplier;
} else {
    if (isset($_GET["kya_key_no"]))
        $idassign->kya_key_no = $_GET["kya_key_no"];
    if (isset($_GET["kya_key_issuer"]))
        $idassign->kya_key_issuer= $_GET["kya_key_issuer"];
    if (isset($_GET["kya_txt"]))
        $idassign->kya_txt= $_GET["kya_txt"];
    if (isset($_GET["kya_phys_type"]))
        $idassign->kya_phys_type= $_GET["kya_phys_type"];
    if (isset($_GET["kya_type"]))
        $idassign->kya_type= $_GET["kya_type"];
    if (isset($_GET["kya_timecd"]))
        $idassign->kya_timecd= $_GET["kya_timecd"];
    if (isset($_GET["kya_lock"]))
        $idassign->kya_lock= $_GET["kya_lock"];
    if (isset($_GET["kya_adhoc"]))
        $idassign->kya_adhoc= $_GET["kya_adhoc"];
    if (isset($_GET["kya_psn"]))
        $idassign->kya_psn= $_GET["kya_psn"];
    if (isset($_GET["kya_role"]))
        $idassign->kya_role= $_GET["kya_role"];
    if (isset($_GET["kya_drawer"]))
        $idassign->kya_drawer= $_GET["kya_drawer"];
    if (isset($_GET["kya_tanker"]))
        $idassign->kya_tanker= $_GET["kya_tanker"];
    if (isset($_GET["kya_equipment"]))
        $idassign->kya_equipment= $_GET["kya_equipment"];
    if (isset($_GET["kya_sp_supplier"]))
        $idassign->kya_sp_supplier= $_GET["kya_sp_supplier"];
}

// create the idassign
if ($idassign->create()){
    echo '{';
        echo '"message": "id assignment was created."';
    echo '}';
} else{
    echo '{';
        echo '"message": "Unable to create id assignment."';
    echo '}';
}
