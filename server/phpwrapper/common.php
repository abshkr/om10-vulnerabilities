<?php
$PROTOCOL = "https://";
//$HOST = $_SERVER['HTTP_HOST'];
$HOST = $_SERVER['SERVER_NAME'];
// We want all cgi-bin calls to go via localhost only.
//$HOST = "127.0.0.1";
$PORT = $_SERVER['SERVER_PORT'];
 
function http_get_cgi($cgi)
{
    global $PROTOCOL;
    global $HOST;
    global $PORT;
    $url = $PROTOCOL . $HOST . ":" . $PORT . "/" . $cgi . "?";
 
    foreach ($_GET as $key => $value)
    {
        $url .= $key . "=". rawurlencode(strip_tags($value)) . "&";
    }
    //$url = substr($url, 0, -1);
    $url .= "sess_id=" . $_SESSION["SESSION"];
    //echo file_get_contents($url);
    return file_get_contents($url);
}
 
function http_post_cgi($cgi)
{
    global $PROTOCOL;
    global $HOST;
    $url = $PROTOCOL . $HOST . "/" . $cgi . "?";
    foreach ($_POST as $key => $value)
    {
        $url .= $key . "=". rawurlencode(strip_tags($value)) . "&";
    }
    //$url = substr($url, 0, -1);
    $url .= "sess_id=" . $_SESSION["SESSION"];
    //echo file_get_contents($url);
    return file_get_contents($url);
}
 
?>