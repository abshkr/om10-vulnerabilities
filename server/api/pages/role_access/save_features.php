<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/feature.php';

$data = json_decode(file_get_contents("php://input"));
Utilities::read('Feature', $method = 'save', $filter = true, $param = array('data' => $data));