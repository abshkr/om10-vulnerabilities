<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/folio_schedule.php';

Utilities::update('FolioSchedule');
