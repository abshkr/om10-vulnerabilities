<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/axle_weight.php';

Utilities::read('AxleWeight', $method = 'check_axle_weight_limit', $filter = true);
