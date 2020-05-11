<?php
// required headers
include_once '../../shared/header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/schedule.php';

Utilities::exec('Schedule', "next_trip_no", $filter = true);