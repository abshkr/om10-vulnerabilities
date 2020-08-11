<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/dor_history.php';

Utilities::read('DorHistory', $method = 'check_trip_cmpt_dor', $filter = true);
