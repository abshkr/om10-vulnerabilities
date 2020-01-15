<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/personnel.php';

Utilities::read('Personnel', $method = 'get_onsite', $filter = true);