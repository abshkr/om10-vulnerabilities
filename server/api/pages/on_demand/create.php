<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

include_once '../../config/database.php';
include_once '../../shared/log.php';
include_once '../../config/setups.php';
include_once '../../config/http_get_cgi.php';

$cgi_result = http_get_cgi('cgi-bin/en/rpt_adm/jasper_reports.cgi');
$xml = simplexml_load_string($cgi_result);
// echo json_encode($xml, JSON_PRETTY_PRINT);
$json = json_encode($xml);
$array = json_decode($json, TRUE);
if ($array['result'] === 'OK') {
    write_log("Jasper report created. report:" . $array['report'] . ", created:" . $array['filepath'], __FILE__, __LINE__, LogLevel::INFO);
    $jasper_result = array(
        'result' => $array['result'],
        'filepath' => JASPERREPORT_DIR . $array['filepath']);

    echo json_encode($jasper_result, JSON_PRETTY_PRINT);

} else {
    write_log("Jasper report creation failed. report:" . $array['report'] . ", created:" . $array['filepath'], __FILE__, __LINE__, LogLevel::ERROR);
    $jasper_result = array(
        'result' => $array['result'],
        'filepath' => JASPERREPORT_DIR . $array['filepath']);

    echo json_encode($jasper_result, JSON_PRETTY_PRINT);
}
