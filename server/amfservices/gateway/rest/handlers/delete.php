<?php
//if the file exists require it or die
if(!file_exists($fileLocation = __DIR__ . "/../../../../core/models/" . $_REQUEST['type'] . ".php")){

	if(!file_exists($fileLocation = __DIR__ . "/../../../core/collections/" . $_REQUEST['type'] . ".php")){

		die(json_encode(new dmError(array("dev" => "AJAX_update received no parameters - REQUEST[<params>] does not exist"))));

	}
}
	
require_once($fileLocation);
if(!class_exists($_REQUEST['type']))
	die(json_encode(new dmError(array("dev" => "AJAX_delete read the class definition for [" . $_REQUEST['type'] . "] but could not resolve an instantiable class"))));
	
//die if no paramters were sent
if(!isset($_REQUEST['params']))
	die(json_encode(new dmError(array("dev" => "AJAX_delete received no parameters - REQUEST[<params>] does not exist"))));

//die if the params cannot be decoded
if(!$decodedParams = json_decode($_REQUEST['params']))
	die(json_encode(new dmError(array("dev" => "AJAX_delete could not decode REQUEST[<params>] as a JSON string, params were :\n" . print_r($_REQUEST['params'], TRUE)))));

//attempt to construct it
$object = new $_REQUEST['type']($decodedParams);

//if the resulting construction attempt failed to produce the right instance
if(!$object instanceOf $_REQUEST['type'])
	die(json_encode(new dmError(array("dev" => "AJAX_delete failed to instance the object class [" . $_REQUEST['type'] . "] with Params:\n" . print_r(json_decode($_REQUEST['params']), TRUE)))));

//if the instance doesn't have the delete() method
if(!method_exists($object, 'delete'))
	die(json_encode(new dmError(array("dev" => "AJAX_delete could not invoke delete upon [" . $_REQUEST['type'] . "] , method is not a class member."))));

//if the delete method returned a succes die to an encoded mesg, or die to an encoded error on fail
$chk = $object->delete();
if( ($chk instanceOf dmMesg) || ($chk instanceOf dmError) )		die(json_encode($chk));

//okkkkay.... this isn't so good, just die with an exception.
die(json_encode(new dmError(array("dev" => "AJAX_delete fell to an exception."))));

?>