
<?php
header("Access-Control-Allow-Origin: *");

$strJsonFileContents = file_get_contents("config.json");
echo $strJsonFileContents;
