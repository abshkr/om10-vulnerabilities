
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

// if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    //echo http_get_cgi('cgi-bin/en/gantry/load_bays.cgi');
    $html = http_get_cgi('cgi-bin/en/gantry/load_bays.cgi');
    echo str_replace(
		".cgi",
		".php", 
		$html);
}
?>

