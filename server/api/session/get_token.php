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

if (!$payload) {
    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
    echo json_encode(
        array("message" => "Invalid token."),
        JSON_PRETTY_PRINT
    );
    return;
} else {
    if (isset($payload->per_code)) {
        write_log("Get new token for user " . $payload->per_code, __FILE__, __LINE__);
    } else {
        write_log("No per code in token payload, cannot continue", __FILE__, __LINE__, LogLevel::ERROR);
        return;
    }
}

echo json_encode(
    array("token_type" => "bearer",
        "access_token" => get_token($payload->per_code, $payload->sess_id, $payload->site_code, $payload->lang)),
    JSON_PRETTY_PRINT
);

// refresh_token abandoned.
/*
$token = array();
$token['per_code'] = 'cw_test';
$token['exp'] = time() + 1800;

//TODO: grant_type = password; or grant_type=refresh_token
$grant_type = (isset($_GET["grant_type"]) ? $_GET["grant_type"] : "");
if ($grant_type === "refresh_token" && isset($_GET["refresh_token"])) {
// instantiate database and product object
$database = new Database();
$db = $database->getConnection2();

$refresh_tokens = new RefreshTokens($db);
$refresh_tokens->token_str = $_GET["refresh_token"];

if ($refresh_tokens->check()) {
if (!$refresh_tokens->delete())
{
echo '{';
echo '"message": "Token not created"';
echo '}';
}

$refresh_tokens->token_str = uniqid();
if (!$refresh_tokens->create()) {
echo '{';
echo '"message": "Token not created"';
echo '}';
} else {
echo json_encode(
array("token_type" => "bearer",
"access_token" => JWT::encode($token, 'dki_jwt'),
"expires_in" => 30,
"refresh_token" => $refresh_tokens->token_str),
JSON_PRETTY_PRINT
);
}
} else {
echo '{';
echo '"message": "Invalid refresh token"';
echo '}';
}
return;
}

// instantiate database and product object
$database = new Database();
$db = $database->getConnection2();

// initialize object
$refresh_tokens = new RefreshTokens($db);
$refresh_tokens->token_str = uniqid();
$refresh_tokens->per_code = $token['per_code'];

if (!$refresh_tokens->create()) {
echo '{';
echo '"message": "Token not created"';
echo '}';
} else {
echo json_encode(
array("token_type" => "bearer",
"access_token" => JWT::encode($token, 'dki_jwt'),
"expires_in" => 30,
"refresh_token" => $refresh_tokens->token_str),
JSON_PRETTY_PRINT
);
}
 */
