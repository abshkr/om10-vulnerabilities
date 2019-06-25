<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/base_product.php';

Utilities::read('BaseProduct', $method = 'simple_list');
