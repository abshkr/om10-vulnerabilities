<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/transaction.php';

Utilities::exec('Transaction', $method = 'close_trsa', $filter = true);
