<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_owner.php';

Utilities::read('TankOwner', $method = 'read_by_summary', $filter = true);
