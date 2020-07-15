<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/site.php';

Utilities::read('Site', $method = 'get_site', $filter = true);
