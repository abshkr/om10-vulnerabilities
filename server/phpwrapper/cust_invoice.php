
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/cust_ord/cust_invoice.cgi');
    echo str_replace(
        "cust_invoice.js",
        "cust_invoice_phpwrapper.js", 
        $html);
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	echo http_post_cgi('cgi-bin/en/cust_ord/cust_invoice.cgi');
}

?>

