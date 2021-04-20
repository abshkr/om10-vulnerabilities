<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/base_owner_trans.php';

Utilities::read('BaseOwnerTrans', $method = 'read_by_summary', $filter = true);
