<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/special_movement.php';

Utilities::exec('SpecialMovement', $method = "reverse", $filter = true);
