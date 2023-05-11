<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/bay_configuration.php';

Utilities::read('BayConfiguration', $method = 'details', $filter = true);
