<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/base_owner.php';

Utilities::read('BaseOwner', $method = 'read', $filter = true);