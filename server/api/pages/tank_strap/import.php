<?php
// required headers
include_once '../../shared/header.php'; 

include_once '../../config/database.php';
include_once '../../objects/tank_strap.php';

Utilities::exec('TankStrap', "batch_import", $filter = true);