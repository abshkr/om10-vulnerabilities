<?php
// required headers
include_once '../../shared/header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/staging_bay.php';

Utilities::exec('StagingBay', "next_trip_no", $filter = true);