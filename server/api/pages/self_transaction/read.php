<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/self_transaction.php';

Utilities::read('SelfTransaction', $method = 'read', $filter = true);
