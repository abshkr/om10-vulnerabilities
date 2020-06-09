<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/delivery_detail.php';

Utilities::read('DeliveryDetail', $method = 'trip_products', $filter = true);
