<?php

session_start();
$siteCode = $_SESSION["SITECODE"];

if (isset($_SERVER['REPORT_DIR'])) {
    $report_dir = $_SERVER['REPORT_DIR'];
} else {
    $report_dir = "/var/www/htdocs/folio_rpts/";
}

$file = $report_dir . $siteCode . "/" . $_GET["report"];

// IMPORTANT!!! DO NOT REMOVE!!! SECURITY BREACH EMMINENT
$file = implode('', explode('../', $file));
$filename = array_pop(explode('/', $_GET["report"]));
$fileext = array_pop(explode('.', $filename));

header('Content-type: application/' . $fileext);
header('Content-Disposition: inline; filename="' . $filename . '"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . filesize($file));
header('Accept-Ranges: bytes');

@readfile($file);
