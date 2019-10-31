<?php
//ensure the folio service exists
if(!(file_exists(__DIR__ . "/../../core/services/dmsFolioService.php")))
	die(json_encode(new dmError(array("dev" => "the folio service class cannot be found at [" . __DIR__ . "/../../core/services/dmsFolioService.php"))));

//its there, include it.
require_once(__DIR__ . "/../../core/services/dmsFolioService.php");

//instance the folioservice
$sHDL = new dmsFolioService();

//set the method
if(!isset($_REQUEST['method']))		die(json_encode(new dmError(array("dev" => "Unwilling to perform:1"))));
$method = $_REQUEST['method'];

//check the method
if(!method_exists($sHDL, $method))	die(json_encode(new dmError(array("dev" => "Method doesn't exist [" . $method . "] on dmsFolioService"))));

//decode the args, ensure they're sane - if they exist.
if(!isset($_REQUEST['args']))			$args = array();
elseif(is_String($_REQUEST['args']))	$args = json_decode($_REQUEST['args']);
else									$args = $_REQUEST['args'];

//fire the method, die with an error if we don't get an error or a message.
if( (!($chk = $sHDL->$method($args)) instanceOf dmMesg) || (!($chk = $sHDL->$method($args)) instanceOf dmMesg) )
	die(json_encode(new dmError(array("dev" => "Execution failed to return a message nor error, it got [" . print_r($chk, true) . "]"))));

//die to stdout with the message or error.
die(json_encode($chk));
?>