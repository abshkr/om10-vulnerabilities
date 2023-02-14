<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/user_column.php';

Utilities::exec('UserColumn', $method = 'delete_columns', $filter = true);
