
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/cust_ord/cust.cgi');
    echo str_replace(
        "cust.js",
        "cust_phpwrapper.js", 
        $html);
}

?>

