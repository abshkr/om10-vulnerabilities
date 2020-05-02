<?php
// required headers
include_once '../shared/header.php';

// include database and object files
include_once '../config/database.php';
include_once '../objects/cur_role.php';

if (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], 'localhost')) {
    $psn = '9999';
} else {
    $psn = Utilities::getCurrPsn();
}

if ($psn === "") {
    $result = array();
    $result["records"] = array();
    $result["message"] = "No active user found.";
    echo json_encode($result, JSON_PRETTY_PRINT);
    return;
}

Utilities::read('CurRole', $method = 'read', $filter = false, 
    $params = array("user_code" => $psn, "lang" => Utilities::getCurrLang()));
