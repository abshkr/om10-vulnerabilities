<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/arm_additive.php';

Utilities::exec('ArmAdditive', $method = 'del_inj', $filter = true);
