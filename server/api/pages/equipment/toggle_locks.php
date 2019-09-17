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

if ($idassign->toggleLocks($eqpt_id)) {
    echo '{';
    echo '"message": "Lock status of all compartments toggled."';
    echo '}';
} else {
    echo '{';
    echo '"message": "Failed to toggle compartment lock"';
    echo '}';
}

