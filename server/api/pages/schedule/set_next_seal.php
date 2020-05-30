<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/seal.php';

Utilities::exec('Seal', $method = 'set_next_seal', $filter = true);
