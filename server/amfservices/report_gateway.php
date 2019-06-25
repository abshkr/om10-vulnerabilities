<?php


session_start();
$siteCode = $_SESSION["SITECODE"];

$file = "/var/www/htdocs/folio_rpts/$siteCode/".$_GET["report"];
//$filename = 'Reports.pdf'; 

// IMPORTANT!!! DO NOT REMOVE!!! SECURITY BREACH EMMINENT
$file = implode('',explode('../',$file));
$filename = array_pop(explode('/',$_GET["report"]));
$fileext  = array_pop(explode('.',$filename));


header('Content-type: application/'.$fileext);
header('Content-Disposition: inline; filename="' . $filename . '"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . filesize($file));
header('Accept-Ranges: bytes');

@readfile($file);



?>