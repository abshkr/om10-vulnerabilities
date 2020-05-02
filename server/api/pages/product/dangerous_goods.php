<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/dangerous_goods.php';

Utilities::read('DangerousGoods', $method = 'read_brief', $filter = true);
