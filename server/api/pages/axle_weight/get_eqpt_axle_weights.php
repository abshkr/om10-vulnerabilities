<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/axle_weight.php';

Utilities::read('AxleWeight', $method = 'get_eqpt_axle_weights', $filter = true);
