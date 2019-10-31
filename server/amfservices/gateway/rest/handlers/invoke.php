<?php 
$dCTRL = dmController::getController();

if(!($_REQUEST['service'] && $_REQUEST['args']))			die(json_encode(new dmError(array("dev" => "invoke failed : missing a service and or arguments"))));
if(!$args = json_decode($_REQUEST['args']))					die(json_encode(new dmError(array("dev" => "args was unable to be decoded"))));
if(!isset($args->dmMethod))									die(json_encode(new dmError(array("dev" => "args was decoded but no method was attached"))));

$class = $_REQUEST['service'];
$method = $args->dmMethod;
unset($args->dmMethod);

if(!file_exists(__DIR__ . "/../../../core/collections/" . $class . ".php")){
	
	if(!file_exists(__DIR__ . "/../../../core/models/" . $class . ".php")){
		die(json_encode(new dmError(array("dev" => "No class endpoint could be found for [" . $class ."]"))));
	}
	else
		require_once(__DIR__ . "/../../../core/models/" . $class . ".php");
}
else
	require_once(__DIR__ . "/../../../core/collections/" . $class . ".php");

if(!class_exists($class))	die(json_encode(new dmError(array("dev" => "A class file for [" . $class . "] could be found but no instantiable class could be determined"))));

$iClass = new $class($args);
$result = $iClass->$method($args);
$result->dispatchIdx = $_REQUEST['dispatchIdx'];

die(json_encode($result));
?>