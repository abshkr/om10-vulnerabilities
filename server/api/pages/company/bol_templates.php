<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/company.php';

Utilities::read('Company', $method = 'bol_templates', $filter = true);
