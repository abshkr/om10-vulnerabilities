
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $html = http_post_cgi('cgi-bin/en/gantry/mtrs_mod.cgi');
	$html = str_replace( "Content-type: text/html; charset=GB2312\n\n", "", $html);
    echo str_replace(
        ".cgi",
        ".php", 
        $html);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/gantry/mtrs_mod.cgi');
	$html = str_replace( "Content-type: text/html; charset=GB2312\n\n", "", $html);
    echo str_replace(
        ".cgi",
        ".php", 
        $html);
}
?>

