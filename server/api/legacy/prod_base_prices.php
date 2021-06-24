
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/cust_ord/prod_base_prices.cgi');
    echo str_replace(
        "prod_base_prices.js",
        "prod_base_prices_phpwrapper.js", 
        $html);
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $html = http_post_cgi('cgi-bin/en/cust_ord/prod_base_prices.cgi');
    echo str_replace(
        "prod_base_prices.js",
        "prod_base_prices_phpwrapper.js", 
        $html);
}
?>

