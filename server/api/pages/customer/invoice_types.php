<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/customer.php';

Utilities::read('Customer', $method = 'invoice_types', $filter = true);