<?php

/**
 * Windows CURL:
 * C:\Users\bluet>curl -i "http://10.2.20.53/api/logout.php" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJfY29kZSI6Ijk5OTkiLCJleHAiOjE1MzcwMjQ1NTUsInNlc3NfaWQiOiJOZFdnamFMUkVvZ1cifQ.R2L6Q4KzlAOU2JoLxoXV5_3NNCpPGvqGCpLkdxzbk2Q"
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

$payload = check_token(get_http_token());
if (!$payload) {
    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
    echo json_encode(
        array("message" => "Invalid token."),
        JSON_PRETTY_PRINT
    );
    return;
} else {
    if (isset($payload->per_code)) {
        write_log("Log out for user " . $payload->per_code, __FILE__, __LINE__);
    } else {
        write_log("No per code in token payload, cannot continue", __FILE__, __LINE__, LogLevel::WARNING);
        return;
    }

    if (!isset($payload->sess_id)) {
        write_log("No sess_id in token payload, cannot continue", __FILE__, __LINE__, LogLevel::WARNING);
        return;
    }
}

$url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . '/cgi-bin/en/logout.cgi';
$clientip = $_SERVER['REMOTE_ADDR'];
$langcode = isset($data->lang) ? isset($data->lang) : 'ENG';

//$url         = 'https://127.0.0.1/cgi-bin/en/login.cgi';
$data = array('sess_id' => $payload->sess_id, 'usr' => $payload->per_code);
$options = array(
    'http' => array(
        'header' => "Content-type: text/xml\r\n",
        'method' => 'POST',
        'content' => http_build_query($data),
    ),
);
$context = stream_context_create($options);
// create request to CGI
$result = file_get_contents($url, false, $context);
// print_r($result);

echo json_encode(
    array("message" => "Log out finishes.")
);
