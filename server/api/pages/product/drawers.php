<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/product.php';

Utilities::read('Product', $method = 'drawers', $filter = true);
