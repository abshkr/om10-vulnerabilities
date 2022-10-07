<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/user_column.php';

Utilities::createArray('UserColumn');
/*
$database = new Database();
$db = $database->getConnection2();

$obj = new UserColumn($db);
$cnt = $obj->is_user_column_existed();

if ($cnt > 0) {
    Utilities::updateArray('UserColumn');
} else {
    Utilities::createArray('UserColumn');
}
*/