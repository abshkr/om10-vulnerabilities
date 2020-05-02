<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/site_config.php';

Utilities::read('SiteConfig', $method = 'read', $filter = true);
