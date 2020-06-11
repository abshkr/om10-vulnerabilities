<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/movement.php';

Utilities::read('Movement', $method = 'carrier_by_tanker', $filter = true);