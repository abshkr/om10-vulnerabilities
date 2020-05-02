<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/compliance.php';

Utilities::read('ComplianceMsg', $method = 'read', $filter = true);
