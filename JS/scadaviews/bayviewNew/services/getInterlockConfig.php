<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Content-Type: text/html;charset=utf-8');

	// get interlock configuration in json format
	$jsonObj = file_get_contents('interlockConfig.json');
	
    echo $jsonObj;
?>