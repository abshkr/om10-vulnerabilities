
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/cust_ord/category.cgi');
    echo str_replace(
        "category.js",
        "category_phpwrapper.js", 
        $html);
}

?>

