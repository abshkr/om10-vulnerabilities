<?php
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/eqpt.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$idassign = new Equipment($db);

$eqpt_id = (isset($_GET["eqpt_id"]) ? $_GET["eqpt_id"] : null);
$cmptnu = (isset($_GET["cmptnu"]) ? $_GET["cmptnu"] : null);

if ($idassign->toggleLock($eqpt_id, $cmptnu)) {
    echo '{';
    echo '"message": "Compartment lock toggled."';
    echo '}';
} else {
    echo '{';
    echo '"message": "Failed to toggle compartment lock"';
    echo '}';
}
