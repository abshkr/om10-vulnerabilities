
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/stck_mgmt/prod_movement.cgi');
    echo str_replace(
        "prod_movement.js",
        "prod_movement_phpwrapper.js", 
        $html);
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $html = http_post_cgi('cgi-bin/en/stck_mgmt/prod_movement.cgi');
    echo str_replace(
        "prod_movement.js",
        "prod_movement_phpwrapper.js", 
        $html);
}
?>

