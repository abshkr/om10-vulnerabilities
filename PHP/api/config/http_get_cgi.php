<?php

include_once 'setups.php';

function http_get_cgi($cgi)
{
    $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . "/" . $cgi . "?";
 
    foreach ($_GET as $key => $value)
    {
        $url .= $key . "=". rawurlencode(strip_tags($value)) . "&";
    }
    //$url = substr($url, 0, -1);
    if (!JWT_AUTH)
    {
        session_start();
        $url .= "sess_id=" . $_SESSION["SESSION"];
    }
    //echo file_get_contents($url);
    return file_get_contents($url);
}