<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/base_owner_trans.php';

Utilities::read('BaseOwnerTrans', $method = 'check_ownership_by_ukey', $filter = true);
