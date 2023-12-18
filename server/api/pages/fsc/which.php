
<?php
$host = basename($_SERVER['HTTP_HOST']);
header('Access-Control-Allow-Origin: '.$host);

$url = "http://{$host}:5200/is_master";
$strJsonFileContents = file_get_contents($url);

// http://10.1.10.51:5200/is_master
echo $strJsonFileContents;
