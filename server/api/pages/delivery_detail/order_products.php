<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/delivery_detail.php';

Utilities::read('DeliveryDetail', $method = 'order_products', $filter = true);
