
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    echo http_get_cgi('cgi-bin/en/stck_mgmt/prod_inv.cgi');
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    echo http_post_cgi('cgi-bin/en/stck_mgmt/prod_inv.cgi');
}
?>

