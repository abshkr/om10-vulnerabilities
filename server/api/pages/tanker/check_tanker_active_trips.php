<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tanker.php';

Utilities::read('Tanker', $method = 'check_tanker_active_trips', $filter = true);
