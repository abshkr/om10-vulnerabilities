<?php
require_once('Zend/Amf/Server.php');

//create an instance of Zend AMF server
$server = new Zend_Amf_Server();

//adding the services folder in order to expose
//CatalogService and StudentsService
$server->addDirectory(dirname(__FILE__) . '/phpservices/services/');

//Mapping the ActionScript VO to the PHP VO
//you don't have to add the package name
$server->setClassMap("BaseProducts", "BaseProducts");

$server->setProduction(false);

echo($server -> handle());