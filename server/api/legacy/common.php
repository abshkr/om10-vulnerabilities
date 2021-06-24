<?php
$PROTOCOL = "https://";
//$HOST = $_SERVER['HTTP_HOST'];
$HOST = $_SERVER['SERVER_ADDR'];
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

function http_post($url)
{
	$postdata = new \stdClass();
    $opt = null;
	$context = null;


    foreach ($_POST as $key => $value)
    {
		$postdata->$key = rawurlencode(strip_tags($value)); 
    }

/*	$certfile = './cert.pem'; */

	$opt = array(
		'http' => array(
			'method' => 'POST',
			'header' => 'Content-Type: application/x-www-form-urlencoded',
			'content' => json_encode($postdata)
		)
/*
		'ssl' => array(
			'verify_peer' => true,
			'cafile' => $certfile,
			//'ciphers' => 'HIGH:TLSv1.2:TLSv1.1:TLSv1.0:!SSLv3:!SSLv2',
			'disable_compression' => true
		)	
*/
	);
	$context = stream_context_create($opt);
    return file_get_contents($url, false, $context);
}
 
 
?>
