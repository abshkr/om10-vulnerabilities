<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/time_code.php';

// get database connection
Utilities::update('TimeCode');
