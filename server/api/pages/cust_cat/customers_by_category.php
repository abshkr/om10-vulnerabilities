<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/customer_category.php';

Utilities::read('CustomerCategory', $method = 'customers_by_category', $filter = true);