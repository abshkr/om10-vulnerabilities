<?php
// $PROTOCOL = "https://";
// //$HOST = $_SERVER['HTTP_HOST'];
// $HOST = $_SERVER['SERVER_ADDR'];
// // We want all cgi-bin calls to go via localhost only.
// //$HOST = "127.0.0.1";
// $PORT = $_SERVER['SERVER_PORT'];

function http_get_cgi($cgi)
{
    // global $PROTOCOL;
    // global $HOST;
    // global $PORT;
    // $url = $PROTOCOL . $HOST . ":" . $PORT . "/" . $cgi . "?";
    foreach ($_GET as $key => $value)
    {
        $query_string .= $key . "=". rawurlencode(strip_tags($value)) . "&";
    }
    // return $_SESSION["SESSION"];
    //$url = substr($url, 0, -1);
    $query_string .= "sess_id=" . $_SESSION["SESSION"];
    // $query_string = rtrim($query_string, '&');

    foreach ($_SERVER as $key => $value)
    {
        putenv("$key=$value");
    }
    $command = "../../" . $cgi;
    
    putenv("QUERY_STRING=$query_string");
    putenv("REQUEST_METHOD=GET");
    putenv("SCRIPT_NAME=$command");
    // print $command;
    //echo file_get_contents($url);
    $result = shell_exec($command);
    $remove_header = strpos($result, "<html>");
    return substr($result, $remove_header);
}

// function http_get_cgi($cgi)
// {
//     global $PROTOCOL;
//     global $HOST;
//     global $PORT;
//     $url = $PROTOCOL . $HOST . ":" . $PORT . "/" . $cgi . "?";
 
//     foreach ($_GET as $key => $value)
//     {
//         $url .= $key . "=". rawurlencode(strip_tags($value)) . "&";
//     }
//     //$url = substr($url, 0, -1);
//     $url .= "sess_id=" . $_SESSION["SESSION"];
//     //echo file_get_contents($url);
//     return file_get_contents($url);
// }

function http_post_cgi($cgi)
{
    // global $PROTOCOL;
    // global $HOST;
    // $url = $PROTOCOL . $HOST . "/" . $cgi . "?";
    // foreach ($_POST as $key => $value)
    // {
    //     $url .= $key . "=". rawurlencode(strip_tags($value)) . "&";
    // }
    // //$url = substr($url, 0, -1);
    // $url .= "sess_id=" . $_SESSION["SESSION"];
    //echo file_get_contents($url);
    // return file_get_contents($url);

    foreach ($_POST as $key => $value)
    {
        $query_string .= $key . "=". rawurlencode(strip_tags($value)) . "&";
    }
    //$url = substr($url, 0, -1);
    $query_string .= "sess_id=" . $_SESSION["SESSION"];
    $query_string = rtrim($query_string, '&');

    foreach ($_SERVER as $key => $value)
    {
        putenv("$key=$value");
    }
    $command = "../../../../" . $cgi;
    //$http_url = "https://".$this->host."/".$this->page_uri;
    // logMe($http_url ."?".$fields_string,THUNKCLASS);
    
    putenv("QUERY_STRING=$query_string");
    putenv("REQUEST_METHOD=GET");
    putenv("SCRIPT_NAME=$command");

    //echo file_get_contents($url);
    return shell_exec($command);
}

// function http_post_cgi($cgi)
// {
//     global $PROTOCOL;
//     global $HOST;
//     $url = $PROTOCOL . $HOST . "/" . $cgi . "?";
//     foreach ($_POST as $key => $value)
//     {
//         $url .= $key . "=". rawurlencode(strip_tags($value)) . "&";
//     }
//     //$url = substr($url, 0, -1);
//     $url .= "sess_id=" . $_SESSION["SESSION"];
//     //echo file_get_contents($url);
//     return file_get_contents($url);
// }
 
?>