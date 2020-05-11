<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_status.php';

Utilities::exec('TankStatus', $method = 'calc_tank_qty_by_level', $filter = true);
