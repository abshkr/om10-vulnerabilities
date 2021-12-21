<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/prod_movement.php';

Utilities::exec('ProdMovement', $method='create_nomination', $filter=true);