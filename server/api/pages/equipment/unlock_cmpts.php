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

if ($idassign->unlockAllCmpts($eqpt_id)) {
    echo '{';
    echo '"message": "Unlocked all compartments."';
    echo '}';
} else {
    echo '{';
    echo '"message": "Failed to unlock all compartments"';
    echo '}';
}

