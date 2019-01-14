
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/cust_ord/account_details.cgi');
    echo str_replace(
        "account_details.js",
        "account_details_phpwrapper.js", 
        $html);
}

?>

