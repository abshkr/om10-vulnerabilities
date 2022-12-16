<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/auth_server.php';

Utilities::read('AuthServer', $method = 'check_server', $filter = true);
