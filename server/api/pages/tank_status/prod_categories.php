<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_status.php';

Utilities::read('TankStatus', $method = 'prod_categories', $filter = true);
