<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/delivery_detail.php';

Utilities::read('DeliveryDetail', $method = 'check_delivery_detail_for_bol', $filter = true);
