<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/trip_axle.php';

Utilities::read('TripAxle', $method = 'check_trip_axle', $filter = true);
