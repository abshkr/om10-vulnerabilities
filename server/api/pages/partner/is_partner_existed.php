<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/partner.php';

Utilities::read('Partner', $method = 'is_partner_existed', $filter = true);