<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/mov_schedule.php';

Utilities::read('MovementSchedule', $method = 'read', $filter = true);
