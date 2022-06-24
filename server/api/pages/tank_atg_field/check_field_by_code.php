<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_atg_field.php';

Utilities::read('TankAtgField', $method = "check_field_by_code", $filter = true);
