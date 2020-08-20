
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	// trim the space in _POST
    foreach ($_POST as $key => $value)
    {
		$_POST[$key] = trim($value);
    }
	
    //echo http_get_cgi('cgi-bin/en/gantry/load_bays.cgi');
    $html = http_post_cgi('cgi-bin/en/gantry/load_bays_mod.cgi');
    echo str_replace(
		".cgi",
		".php", 
		$html);
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	// trim the space in _GET
    foreach ($_GET as $key => $value)
    {
		$_GET[$key] = trim($value);
    }
	
    $html = http_get_cgi('cgi-bin/en/gantry/load_bays_mod.cgi');
    echo str_replace(
        ".cgi",
        ".php", 
        $html);
}
?>

