<?php
// required headers
include_once '../../shared/header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/open_order.php';

Utilities::read('OpenOrder', "next_cust_order", $filter = true);