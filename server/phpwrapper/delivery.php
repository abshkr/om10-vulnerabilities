
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/cust_ord/delivery.cgi');
    echo str_replace(
        "delivery.js",
        "delivery_phpwrapper.js", 
        $html);
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$html = http_post_cgi('cgi-bin/en/cust_ord/delivery.cgi');
	echo str_replace(
        "delivery.js",
        "delivery_phpwrapper.js", 
        $html);
}

?>

