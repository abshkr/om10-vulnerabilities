
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/stck_mgmt/meter_dev.cgi');
    echo str_replace(
        "meter_dev.js",
        "meter_dev_phpwrapper.js", 
        $html);
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $html = http_post_cgi('cgi-bin/en/stck_mgmt/meter_dev.cgi');
    echo str_replace(
        "meter_dev.js",
        "meter_dev_phpwrapper.js", 
        $html);
}
?>

