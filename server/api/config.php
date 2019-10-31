
<?php
header("Access-Control-Allow-Origin: *");

$strJsonFileContents = file_get_contents("../html/config.json");
echo $strJsonFileContents;
