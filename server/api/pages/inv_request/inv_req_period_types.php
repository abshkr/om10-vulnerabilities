<?php
// required headers
include_once '../../shared/header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/inv_request.php';

Utilities::read('InvRequest', $method="inv_req_period_types");
