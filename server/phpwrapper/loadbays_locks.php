
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/gantry/loadbays_locks.cgi');
    echo str_replace(
        ".cgi",
        ".php", 
        $html);
}
?>

