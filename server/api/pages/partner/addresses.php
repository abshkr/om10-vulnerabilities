<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/address.php';

Utilities::read('Address', $method = 'read_brief', $filter = true);
