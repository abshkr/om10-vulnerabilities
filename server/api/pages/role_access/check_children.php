<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/table_children.php';

Utilities::read('TableChildren', $method = 'check_children', $filter = true);
