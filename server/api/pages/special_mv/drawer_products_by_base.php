<?php
// required headers
include_once '../../shared/header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/special_movement.php';

Utilities::read('SpecialMovement', "drawer_products_by_base", $filters = true);
