<?php

/**
* To test this:
* C:\Users\bluet>curl -X POST -H "Content-Type: application/json" -d "{ \"user\": \"9999\", \"password\": \"asddfafd\" }" http://10.2.20.53/api/login.php
*
* the print_r($data) will print:
* stdClass Object
* (
*     [user] => 9999
*     [password] => asddfafd
* )
* 
* 10.1.10.197, 9999/Om5000 login debug:
* SCRIPT_NAME: /cgi-bin/en/login.cgi
* begin: 20180915_16:58:36.080191+10
* REQUEST_METHOD: POST
* COOKIE:
* REQUEST: lang=ENG&oput=XML&lock=N&usr=9999&pwd=0c18ef29e23447897f177bbd5e6886395692af2d7873cd1a5858cc327186c852&clientip=10.2.20.18&hash=cc4515238072519b
* end:   20180915_16:58:36.317397+10
* 
* //Widnows TEST: C:\Users\bluet>curl -X POST -H "Content-Type: application/json" -d "{ \"user\": \"9999\", \"password\": \"0c18ef29e23447897f177bbd5e6886395692af2d7873cd1a5858cc327186c852\" }" http://10.2.20.53/api/login.php
* 0c18ef29e23447897f177bbd5e6886395692af2d7873cd1a5858cc327186c852: Om5000 encrpted
*/

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once './config/database.php';
include_once './config/log.php';
include_once './objects/personnel.php';
include_once './config/setups.php';
include_once './config/jwt.php';

// query 
// if (!isset($_GET["user"])) {
//     echo json_encode(
//         array("message" => "User name not provided.")
//     );
//     return;
// }
// $user = $_GET["user"];

// if (!isset($_GET["password"])) {
//     echo json_encode(
//         array("message" => "Password not provided.")
//     );
//     return;
// }
// $pwd = $_GET["user"];

// print_r("hello");
$post_data = json_decode(file_get_contents("php://input"));
// print_r($post_data);

if (!isset($post_data->user)) {
    echo json_encode(
        array("message" => "User name not provided.")
    );
    return;
}

if (!isset($post_data->password)) {
    echo json_encode(
        array("message" => "Password not provided.")
    );
    return;
}

$url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'].'/cgi-bin/en/login.cgi';
$clientip = $_SERVER['REMOTE_ADDR'];
$langcode = isset($data->lang) ? isset($data->lang) : 'ENG';

//$url         = 'https://127.0.0.1/cgi-bin/en/login.cgi';
$data = array(
    'lang' => $langcode, 
    'oput' => 'XML', 
    'lock' => 'N', 
    'usr' => $post_data->user, 
    'pwd' => $post_data->password, 
    'clientip' => $clientip);

$options = array
    (
        'http' => array
            (
            'header'  => "Content-type: text/xml\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
            )
    );
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$xml = simplexml_load_string($result);
// echo json_encode($xml, JSON_PRETTY_PRINT);
$json = json_encode($xml);
$array = json_decode($json, TRUE);
if ($array['MSG_DESC'] === 'SUCCESS') {
    write_log("User Login. user:" . $post_data->user, __FILE__, __LINE__, LogLevel::INFO);
}

$login_result = array(
    'msg_code' => $array['MSG_CODE'],
    'msg_desc' => $array['MSG_DESC'],
    'user_status_flag' => $array['USER_DETAIL']['USER_STATUS_FLAG']);
    
if ($array['MSG_CODE'] === "0") {
    $login_result['user_session'] = $array['USER_DETAIL']['USER_SESSION'];
    $login_result['site_code'] = $array['USER_DETAIL']['SITE_CODE'];
    $login_result['user_passwd_exp'] = $array['USER_DETAIL']['USER_PASSWD_EXP'];
    $login_result['token_type']= 'bearer';
    $login_result['access_token'] = get_token($post_data->user, $array['USER_DETAIL']['USER_SESSION']);
; 
} 

echo json_encode($login_result, JSON_PRETTY_PRINT);
