<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_group.php';

Utilities::exec('TankGroup', $method = 'activate_tank', $filter = true);
