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

/*
C:\Users\bluet>curl -X POST -H "Content-Type: application/json" -d "{ \"user\": \"9999\", \"password\": \"0c18ef29e23447897f177bbd5e6886395692af2d7873cd1a5858cc327186c852\" }" http://10.2.20.53/api/login.php
{
"msg_code": "0",
"msg_desc": "SUCCESS",
"user_status_flag": "1",
"user_session": "psrUPZpxKrov",
"site_code": "CGPER",
"user_passwd_exp": "F",
"token_type": "bearer",
"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJfY29kZSI6Ijk5OTkiLCJleHAiOjE1NDE1NjI1NjUsInNlc3NfaWQiOiJwc3JVUFpweEtyb3YifQ.vTN_tZKs6wWGOWCV3QdCcq0aaWfhVT0rHP_hm4p4maI"
}
 */
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once './config/database.php';
include_once './shared/log.php';
include_once './objects/personnel.php';
include_once './config/setups.php';
include_once './config/jwt.php';
include_once './shared/utilities.php';

// initialize object
$object = new stdClass();

$data = json_decode(file_get_contents("php://input"));
if ($data) {
    foreach ($data as $key => $value) {
        $object->$key = $value;
    }
} else {
    // write_log(json_encode($_GET), __FILE__, __LINE__);
    foreach ($_GET as $key => $value) {
        $object->$key = $value;
    }
}
// write_log(json_encode($data), __FILE__, __LINE__);
if (!isset($object->user) ||
!isset($object->user)) {
    echo json_encode(
        array("message" => "Parameter (user or password) not provided.")
    );
    return;
}

$url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . '/cgi-bin/en/login.cgi';
$object->clientip = $_SERVER['REMOTE_ADDR'];

$object->langcode = 'ENG';
if (isset($data->lang)) {
    if ($data->lang == 'cn') {
        $object->langcode = 'CHN';
    }
}

$data = array(
    'lang' => $object->langcode,
    'oput' => 'XML',
    'lock' => 'N',
    'usr' => $object->user,
    'pwd' => $object->password,
    'clientip' => $object->clientip);

$options = array
    (
    'http' => array
    (
        'header' => "Content-type: text/xml\r\n",
        'method' => 'POST',
        'content' => http_build_query($data),
    ),
);
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$xml = simplexml_load_string($result);
// echo json_encode($xml, JSON_PRETTY_PRINT);
$json = json_encode($xml);
$array = json_decode($json, true);
// write_log(json_encode($array), __FILE__, __LINE__);
if ($array['MSG_DESC'] === 'SUCCESS') {
    write_log("User Login. user:" . $object->user, __FILE__, __LINE__, LogLevel::INFO);
} else {
    write_log("User Login failed. user:" . $object->user, __FILE__, __LINE__, LogLevel::ERROR);
}

if ($array['MSG_CODE'] === "0") {
    Utilities::clean_rusty_files((isset($_SERVER['OMEGA_HOME']) ? $_SERVER['OMEGA_HOME'] : '/usr/omega') . '/logs');

    $login_result = array();
    $login_result['userid'] = $object->user;
    $login_result['email'] = "";
    $login_result['displayName'] = $object->user;
    $login_result['token'] = get_token($object->user, $array['USER_DETAIL']['USER_SESSION']);
    $login_result['refreshToken'] = get_token($object->user, $array['USER_DETAIL']['USER_SESSION'], $exp_seconds = 3600);
    $login_result['expiresIn'] = 3600;

    //Some old screens like bay view still need session
    if (!isset($_SESSION)) {
        session_start();
    }
    
    session_regenerate_id(true);
    $_SESSION['SESSION'] = $array['USER_DETAIL']['USER_SESSION'];
    $_SESSION['MANAGER'] = $array['USER_DETAIL']['ISMANAGER_CMPY'];
    $_SESSION['LANGUAGE'] = $array['USER_DETAIL']['USER_LANG'];
    $_SESSION['COMPANY'] = $array['USER_DETAIL']['USER_CMPY'];
    $_SESSION['SITECODE'] = $array['USER_DETAIL']['SITE_CODE'];
    $_SESSION['PERCODE'] = $object->user;
    $_SESSION['PERNAME'] = $array['USER_DETAIL']['USER_NAME'];
    $_SESSION['CLIENTIP'] = $array['USER_DETAIL']['USER_CLIENTIP'];
    
    http_response_code(200);
    echo json_encode($login_result, JSON_PRETTY_PRINT);
} else {
    http_response_code(400);
    $login_result = array(
        'msg_code' => $array['MSG_CODE'],
        'msg_desc' => $array['MSG_DESC'],
        'attempt_left' => (isset($array['USER_DETAIL']['USER_ATTEMPT_LEFT']) ? $array['USER_DETAIL']['USER_ATTEMPT_LEFT'] : 0),
        // 'attempt_left' => $array['USER_DETAIL']['USER_ATTEMPT_LEFT'],
        'user_status_flag' => $array['USER_DETAIL']['USER_STATUS_FLAG']);
    
    echo json_encode($login_result, JSON_PRETTY_PRINT);
}


