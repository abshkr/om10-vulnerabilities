<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/customer_carrier.php';

Utilities::delete('CustomerCarrier');