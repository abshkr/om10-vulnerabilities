<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/schedule.php';

Utilities::read('Schedule', $method = 'search', $filter = true);
