<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/gate.php';

Utilities::read($class = "Gate", $method = 'open_gate', $filter = true);
