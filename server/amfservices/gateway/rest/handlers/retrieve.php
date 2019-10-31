<?php 
$dCTRL = dmController::getController();

//if the id doesn't exist, just die.
if(isset($_REQUEST['id']))			$id = $_REQUEST['id'];

if(!isset($_REQUEST['type']))		die(json_encode(new dmError(array("dev" => "Unwilling to perform:2"))));
else								$type = $_REQUEST['type'];

if(!isset($_REQUEST['args']))		$args = array();
elseif(is_String($_REQUEST['args']))$args = json_decode($_REQUEST['args']);
else								$args = $_REQUEST['args'];

if(!isset($_REQUEST['id']) || ($_REQUEST['id'] == '*')){
	if(!($chk = $mCTRL->__getMulti(array("object" => $type, "conditionArray" => $args))) instanceOf dmMesg)	die(json_encode($chk));
}else{
	if(!($chk = $mCTRL->__get(array("object" => $type, "conditionArray" => array(array("uid", "=" , $id))))) instanceOf dmMesg)	die(json_encode($chk));
}

die(json_encode($chk));
?>