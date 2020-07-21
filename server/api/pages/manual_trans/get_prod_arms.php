<?php
// required headers
include_once '../../shared/header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/manual_trans.php';

Utilities::read('ManualTrans', "get_prod_arms", $filter = true);
