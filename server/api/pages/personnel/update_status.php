<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/personnel.php';

Utilities::exec('Personnel', "update_status", $filter = true);
