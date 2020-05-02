<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/flow_profile.php';

Utilities::read('FlowProfile', $method = 'read', $filter = true);
