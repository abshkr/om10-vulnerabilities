<?php
// required headers
include_once '../shared/header.php';

// include database and object files
include_once '../objects/fa_auth.php';

// write_log(sprintf("%s() START. ", __FUNCTION__), __FILE__, __LINE__);

$database = new Database();
$db = null;

// initialize object
try {
    $db = $database->getConnection2('FaAuth', 'post_check');    //No JWT check 
} catch (UnauthException $e) {
    $error = new EchoSchema(401, response("__NOT_AUTH__", sprintf("Caught exception: %s", $e->getMessage())));
    echo json_encode($error, JSON_PRETTY_PRINT);
    return;
}

$object = new FaAuth($db);

//Prior to PHP 5.6, a stream opened with php://input could only be read once
$data = json_decode(file_get_contents("php://input"));
// write_log(json_encode($data), __FILE__, __LINE__);
if ($data) {
    foreach ($data as $key => $value) {
        $object->$key = $value;
    }
} else {
    // write_log(json_encode($_GET), __FILE__, __LINE__);
    foreach ($_GET as $key => $value) {
        $object->$key = $value;
    }
}

return $object->post_check();
