<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/site_config.php';
//include_once '../../objects/address.php';

//Utilities::exec('Address', $method = 'update_address_template', $filter = true);
Utilities::update('SiteConfig');
