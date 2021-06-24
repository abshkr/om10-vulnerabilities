
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	echo http_post_cgi('cgi-bin/en/load_scheds/load_spec_cancel.cgi');
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    echo http_get_cgi('cgi-bin/en/load_scheds/load_spec_cancel.cgi');
}

?>

