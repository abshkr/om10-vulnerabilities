
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	$html = http_get_cgi('cgi-bin/en/access_ctrl/gate.cgi');
	echo str_replace(
		"gate.js",
		"gate_phpwrapper.js", 
		$html);
}

?>

