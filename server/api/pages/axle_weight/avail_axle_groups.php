<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/axle_weight.php';

Utilities::read('AxleWeight', $method = 'avail_axle_groups', $filter = true);
