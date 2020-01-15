<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/transaction.php';

Utilities::read('Transaction', $method='get_meter_details', $filter=true);
