<?php

//AJAX location (currently it's set in FRONT of the web root so this should change at some point).
$ajaxLocation =__DIR__ . "/handlers";

//we need to use document_root here only, or at least point this at the server session class, when this is called
//and the static method startViper is invoked, we can refer to the document root with gloal __documentRoot (see config.ini for other globals).
require_once(__DIR__ . "/../../core/dmController.php");
if(isset($_REQUEST['action'])){
	
	if(!file_exists($ajaxLocation . '/' . $_REQUEST['action'] . ".php")){

		die(json_encode((object)array("user" => "server error has occured, please try this request again later")));
	}
	
	require_once($ajaxLocation . '/' . $_REQUEST['action'] . ".php");
	
}
?>