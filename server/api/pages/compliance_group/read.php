<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/compliance_group.php';

Utilities::read('ComplianceGroup', $method = 'read', $filter = true);
