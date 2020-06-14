<?php
// required headers
include_once '../shared/header.php';

// include database and object files
include_once '../objects/personnel.php';

Utilities::read('Personnel', "read_dep", $filter = true);
