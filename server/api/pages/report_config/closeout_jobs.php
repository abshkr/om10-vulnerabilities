<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/report_config.php';

Utilities::read('ReportConfig', 'closeout_jobs', $filter = true);