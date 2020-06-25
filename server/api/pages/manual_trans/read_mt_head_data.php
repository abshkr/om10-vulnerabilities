<?php
// required headers
include_once '../../shared/header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/manual_trans_data.php';

Utilities::read('ManualTransData', "read_mt_head_data", $filter = true);
