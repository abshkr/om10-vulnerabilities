<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/allocation.php';

Utilities::read('Allocation', $method = 'check_multi_allocation', $filter = true);
