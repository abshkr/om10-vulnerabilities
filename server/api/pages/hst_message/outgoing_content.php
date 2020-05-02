<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/hst_outgoing_msg.php';

Utilities::read('OutogingMsg', $method = 'content', $filter = true);
