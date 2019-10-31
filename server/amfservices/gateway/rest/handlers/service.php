<?php
//set service location

$svcLocation = __DIR__ . "/../../../core/services";

$dCTRL = dmController::getController();

if(!isset($_REQUEST['service']))		die(json_encode(new dmError(array("dev" => "Unwilling to perform:2"))));

if(strstr($_REQUEST['service'], '.'))	$svcArray = explode('.', $_REQUEST['service']);
else{
	$svcArray = array();
	$svcArray[] = $_REQUEST['service'];
}

if(!isset($_REQUEST['args']))		$args = array();
elseif(is_String($_REQUEST['args']))$args = json_decode($_REQUEST['args']);
else								$args = (object)$_REQUEST['args'];

//service exists, or die.
if(!file_exists($svcLocation . "/" . $svcArray[0] . ".php"))	dmUtils::JSONError(array("dev" => "Service " . $svcArray[0] . " not found. [" . $svcLocation . "/" . $svcArray[0] . ".php" ."]"));
else{
	
	//decode args or die - and if an empty object, die.
	if(($params = json_decode($_REQUEST['args'])) === FALSE)	dmUtils::JSONError(array("user" => "Service Error: JSON0003"));

	
	//if they're empty set them false.
	if(empty($params))				$params = false;
	
	if(is_array($params))			$params['rest'] = true;
	if(is_object($params))			$params->rest = true;

	
	//pull out "data" as the payload; construct with the payload.
	if( $params && isset($params->data) )	$constructorArgs = (object)array("payload" => $params->data);
	else									$constructorArgs = false;
	
	//instance the service
	require_once($svcLocation . "/" . $svcArray[0] . ".php");
	
	$service = new $svcArray[0]($params);
	if(!$service instanceOf $svcArray[0])						dmUtils::JSONError(array("user" => "Service Error: JSON0001"));
	
	//ensure the method exists
	if(!method_exists($service, $svcArray[1]))					dmUtils::JSONError(array("user" => "Service Error: JSON0002"));
	$method = $svcArray[1];
	
	if(!($result = $service->$method($params)) instanceOf dmMesg)	die(json_encode($result));
	
	$result->dispatchIdx = $_REQUEST['dispatchIdx'];
	
	//if( ($result instanceOf dmCollection) || ($result instanceOf dmModel) )	$result->export();
	
	//$tst = dmUtils::export((object)array("object" => $result));

	//new dmMesg(array("dev" => "dispatching with:\n" . print_r($tst, TRUE)));
	
	die(json_encode($result));
	
}

?>
