<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/expiry_type.php';

Utilities::read('ExpiryDateType', $method = 'read', $filter = false, array("target_code" => "TRANSP_EQUIP"));
