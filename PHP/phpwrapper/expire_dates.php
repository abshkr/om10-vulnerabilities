
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	if (isset($_GET["op"]))
    {   //For the modification screen, need to do some replacement to embed php
        global $PROTOCOL;
        global $HOST;
        $url = $PROTOCOL . $HOST . "/cgi-bin/en/access_ctrl/expire_dates.cgi?";
        foreach ($_GET as $key => $value)
        {
            $url .= $key . "=". rawurlencode($value) . "&";
        }
        //$url = substr($url, 0, -1);
        $url .= "sess_id=" . $_SESSION["SESSION"];
        $orig_html = file_get_contents($url);
        echo str_replace(
                "expire_dates.js",
                "expire_dates_phpwrapper.js", 
                $orig_html);
    }
    else
    {
        echo http_get_cgi('cgi-bin/en/access_ctrl/expire_dates.cgi');
    }
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $orig_html = http_post_cgi('cgi-bin/en/access_ctrl/expire_dates.cgi');
        echo str_replace(
                "expire_dates.js",
                "expire_dates_phpwrapper.js", 
                $orig_html);
}
?>
