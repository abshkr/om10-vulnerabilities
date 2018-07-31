<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Content-Type: text/html;charset=utf-8');

	// start the session and get session's language setting
	session_start();
	if ( array_key_exists('LANGUAGE', $_SESSION) === TRUE )
	{
		$lang = $_SESSION['LANGUAGE'];
	}
	else
	{
		$lang = "ENG";
	}
	if ( $lang == "" || $lang == null )
	{
		$lang = "ENG";
	}
	//echo $lang . "........." . $_SESSION['LANGUAGE'];
	// get bayview text in json format
	$jsonObj = file_get_contents('bayviewLang.json');
	// convert json to an associated array
	$arr = json_decode( $jsonObj, true );
	// get the bayview text for current language
	$currItem = $arr[$lang];
	$obj = json_encode($currItem);
    echo $obj;
?>