<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/tank.php';

Utilities::read('Tank', 'calc_max_flow');
