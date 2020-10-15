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
include_once './shared/log.php';
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

$query_string = "usr=" . rawurlencode(strip_tags($payload->per_code));
$res = Utilities::http_cgi_invoke("cgi-bin/en/logout.cgi", $query_string);

if (isset($_SESSION)) {
    session_unset();
    session_destroy();
}

echo json_encode(
    array("message" => "Log out finishes.")
);
