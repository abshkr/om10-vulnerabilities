<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/hst_incoming_msg.php';

Utilities::read('IncomingMsg', $method = 'content', $filter = true);
