<?php
// required headers
include_once '../../shared/header.php';

// get database connection
include_once '../../config/database.php';
include_once '../../objects/report_profile.php';

Utilities::delete('ReportProfile');
