<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/ddd_additional_info.php';

Utilities::read('DddAdditionalInfo', $method = 'read', $filter = true);
