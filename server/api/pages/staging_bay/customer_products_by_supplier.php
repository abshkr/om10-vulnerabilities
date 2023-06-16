<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/staging_bay.php';

Utilities::read('StagingBay', $method = 'customer_products_by_supplier', $filter = true);
