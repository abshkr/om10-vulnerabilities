<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_strap.php';

Utilities::read('TankStrap', $method = 'count_tank_straps', $filter = true);
