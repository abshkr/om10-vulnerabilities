<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/site_bal.php';

Utilities::read('SiteBal', $method = 'read', $filter = true); 


