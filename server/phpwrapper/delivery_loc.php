
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/cust_ord/delivery_loc.cgi');
    echo str_replace(
        "delivery_loc.js",
        "delivery_loc_phpwrapper.js", 
        $html);
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	echo http_post_cgi('cgi-bin/en/cust_ord/delivery_loc.cgi');
}

?>

