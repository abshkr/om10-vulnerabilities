
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $html = http_get_cgi('cgi-bin/en/access_ctrl/gate_perm.cgi');
    echo str_replace(
        "gate_perm.js",
        "gate_perm_phpwrapper.js", 
        $html);
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $html = http_post_cgi('cgi-bin/en/access_ctrl/gate_perm.cgi');
    echo str_replace(
        "gate_perm.js",
        "gate_perm_phpwrapper.js", 
        $html);
}

?>

