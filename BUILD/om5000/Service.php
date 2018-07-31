<?php
	//if($_GET["action"] === "listTemplates"){
	if($_POST["action"] === "listTemplates"){
		$templates = scandir( "Templates/");
		array_shift($templates);array_shift($templates);
		echo json_encode($templates);
	}
	//if($_GET["action"] === "getTemplate"){
	if($_POST["action"] === "getTemplate"){
		//$fileName = "Templates/" . $_GET["fileName"];
		$fileName = "Templates/" . $_POST["fileName"];
		echo file_get_contents($fileName);
	}
	if($_POST["action"] === "save"){
		$dir = "";
		if(isset($_SERVER['OFFLINE_MSG_PATH'])) {
			$datestr = date('dhis', time());

			$dir = $_SERVER['OFFLINE_MSG_PATH'];
		}
		else
		{
			$dir = "Generated";
		}

		echo file_put_contents($dir."/".$datestr.".SAP", $_POST["data"]);
	}
?>
