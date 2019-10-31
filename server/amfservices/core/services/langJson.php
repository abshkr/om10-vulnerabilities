<?php
	session_start();
	
    header('Access-Control-Allow-Origin: *');
    //header('Content-Type: application/json');
    header('Content-Type: text/html;charset=utf-8');

    include "./amfservices/core/services/SchemaService.php";
	
	$obj = new SchemaService();
	//$contents = $obj->initLanguageColumns();
	//$contents = $obj->initLanguageTables();
	$contents = $obj->initLanguageEnums();
	//$contents = $obj->initLanguageColumnEnums();
	echo var_export($contents,TRUE);
	echo "<br><br>";
	echo serialize($contents);
	echo "<br><br>";
	$contents = json_encode($contents, JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
	//$contents = json_encode($contents);
	echo $contents;
?>
