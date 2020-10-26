<?php
// required headers
include_once '../shared/header.php';

// include database and object files
include_once '../objects/fa_auth.php';

Utilities::exec('FaAuth', "post_check", $filter = true);
