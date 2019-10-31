
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $html = http_post_cgi('cgi-bin/en/gantry/bay_flow_prof_updt.cgi');
    echo str_replace(
        ".cgi",
        ".php", 
        $html);
}
?>

