<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/customer_product.php';

Utilities::read('CustomerProduct', $method = 'read_customer_products', $filter = true);
