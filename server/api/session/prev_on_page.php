<?php
// required headers
include_once '../shared/header.php';
include_once '../objects/cur_role.php';

// if (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], 'localhost')) {
//     $psn = '9999';
// } else {
//     $psn = Utilities::getCurrPsn();
// }

$psn = Utilities::getCurrPsn();

if ($psn === "") {
    $result = array();
    $result["records"] = array();
    $result["message"] = "No active user found.";
    echo json_encode($result, JSON_PRETTY_PRINT);
    return;
}

$object_text = null;
$data = json_decode(file_get_contents("php://input"));
// write_log(json_encode($data), __FILE__, __LINE__);
if ($data) {
    foreach ($data as $key => $value) {
        if ($key === "object_text") {
            $object_text = $value;
            break;
        }
    }
} else {
    // write_log(json_encode($_GET), __FILE__, __LINE__);
    foreach ($_GET as $key => $value) {
        if ($key === "object_text") {
            $object_text = $value;
            break;
        }
    }
}

Utilities::read('CurRole', $method = 'prev_on_page', $filter = false, 
    $params = array("user_code" => $psn, 'object_text' => $object_text));
