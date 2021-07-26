<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank_batch.php';

Utilities::read('TankBatch', $method = 'check_batches_in_transaction', $filter = true);
