<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/role.php';

Utilities::read('Role', $method = 'dropdown_role_types', $filter = true);
