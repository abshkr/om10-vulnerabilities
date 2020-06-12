<?php
/**
 * Get a token:
 * http://10.2.20.53/api/config/get_token.php
 *
 * Get a new token by existing token using curl:
 * curl -i "http://10.2.20.53/api/config/get_token.php" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJfY29kZSI6Ijk5OTkiLCJleHAiOjE1MzcwMjM4MzMsInNlc3NfaWQiOm51bGx9.35Gy9asUBLA3uBbwV9W4QUpaFGS4FHebcA-jTvCeQ5A"
 */

include_once __DIR__ .  "/../config/jwt_utilities.php";
include_once __DIR__ .  '/../shared/log.php';

$data = json_decode(file_get_contents("php://input"));
// write_log(json_encode($data), __FILE__, __LINE__);
if (isset($data->token)) {
    $token = $data->token;
} else if (isset($_GET["token"])) {
    $token = $_GET["token"];
} else {
    write_log("Invalid token parameter", __FILE__, __LINE__);
    echo json_encode(
        array("message" => "Invalid token parameter."),
        JSON_PRETTY_PRINT
    );
    return;
}

$payload = null;
try {
    $payload = check_token($token);
} catch (ExpiredException $e) {
    write_log("Token expired, cannot continue", __FILE__, __LINE__);
    echo json_encode(
        array("message" => "Token expired, cannot continue."),
        JSON_PRETTY_PRINT
    );
    return false;
} catch (SignatureInvalidException $e) {
    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
    echo json_encode(
        array("message" => "Invalid token."),
        JSON_PRETTY_PRINT
    );
    return false;
} catch (UnexpectedValueException $e) {
    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
    echo json_encode(
        array("message" => "Unexpected value exception."),
        JSON_PRETTY_PRINT
    );
    return false;
} 


// echo json_encode(
//     array("token_type" => "bearer",
//         "access_token" => get_token($payload->per_code, $payload->sess_id, $payload->site_code, $payload->lang)),
//     JSON_PRETTY_PRINT
// );
