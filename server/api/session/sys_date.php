<?php
// required headers
include_once '../shared/header.php';

// include database and object files
include_once 'database.php';
include_once '../objects/linux_server.php';

Utilities::exec('LinuxServer', "server_date", $filter = true);
