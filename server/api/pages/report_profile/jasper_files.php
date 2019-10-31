<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/report_profile.php';

$database = new Database();
try {
    $db = $database->getConnection();
} catch (UnauthException $e) {
    // http_response_code(401);
    http_response_code(200);
    echo 'Caught exception: ', $e->getMessage();
    return;
}

$rpt = new ReportProfile($db);
$rpt->jasper_files();
