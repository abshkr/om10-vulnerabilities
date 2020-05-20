<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
//include_once '../../objects/delv_location.php';
include_once '../../objects/customer_delvloc.php';

//Utilities::read('DelvLocation', $method = 'read_customer_haveno_delvloc', $filter = true);
Utilities::read('CustomerDelvLocation', $method = 'read_customer_haveno_delvloc', $filter = true);
