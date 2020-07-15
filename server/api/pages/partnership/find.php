<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/partnership.php';

Utilities::read('Partnership', $method = "read_by_condition", $filter = true);