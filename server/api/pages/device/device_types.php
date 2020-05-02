<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/device.php';

Utilities::read('Device', $method='device_types');
