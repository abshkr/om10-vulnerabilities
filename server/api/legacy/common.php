<?php
$PROTOCOL = "https://";
//$HOST = $_SERVER['HTTP_HOST'];
$HOST = $_SERVER['SERVER_ADDR'];
if (getenv('USE_SERVER_NAME_IN_CGI') == 'Y') {
    $HOST = $_SERVER['SERVER_NAME'];
}
// We want all cgi-bin calls to go via localhost only.
//$HOST = "127.0.0.1";
$PORT = $_SERVER['SERVER_PORT'];
 
function http_get_cgi($cgi)
{
    $location = realpath($cgi);
    if ($location !== false) {
        if (!str_starts_with($location, 'cgi-bin')) {
            return "invalid cgi";
        }
    }

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
    $arrContextOptions = array(
                "ssl"=>array(
                    "verify_peer"=>false,
                    "verify_peer_name"=>false,
                ),
            );
    //echo file_get_contents($url);
    return file_get_contents($url, false, stream_context_create($arrContextOptions));
}
 
function http_post_cgi($cgi)
{
    $location = realpath($cgi);
    if ($location !== false) {
        if (!str_starts_with($location, 'cgi-bin')) {
            return "invalid cgi";
        }
    }

    global $PROTOCOL;
    global $HOST;
    global $PORT;
    $url = $PROTOCOL . $HOST . ":" . $PORT . "/" . $cgi . "?";
    foreach ($_POST as $key => $value)
    {
        $url .= $key . "=". rawurlencode(strip_tags($value)) . "&";
    }
    //$url = substr($url, 0, -1);
    $url .= "sess_id=" . $_SESSION["SESSION"];
    $arrContextOptions = array(
                "ssl"=>array(
                    "verify_peer"=>false,
                    "verify_peer_name"=>false,
                ),
            );
    //echo file_get_contents($url);
    return file_get_contents($url, false, stream_context_create($arrContextOptions));
}

 
 
?>
