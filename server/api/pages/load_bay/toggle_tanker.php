<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/load_bay.php';

Utilities::read('LoadBay', $method = 'toggle_tanker_determination', $filter = true);
