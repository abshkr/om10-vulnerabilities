<?php

include_once "jwt.php";
include_once __DIR__ . '/../shared/log.php';

function get_token($per_code, $sess_id = null, $site_code = null, $site_name = null, $lang = null, $exp_seconds = 7200)
{
    write_log('get_token START. per_code:' . $per_code . ' sess_id:' . $sess_id,
        __FILE__, __LINE__);
    $token = array();
    $token['per_code'] = $per_code;
    $token['site_code'] = $site_code;
    $token['site_name'] = $site_name;
    $token['lang'] = $lang;
    $token['exp'] = time() + $exp_seconds;
    $token['sess_id'] = $sess_id;

    return JWT::encode($token, JWT_SECRET);
}

//Get a token from http request
function get_http_token()
{
    if (AUTH_IN_HEADER) {
        $headers = apache_request_headers();

        $authorization = isset($headers['Authorization']) ? $headers['Authorization'] : $headers['authorization'];
        if (!isset($authorization)) {
            write_log('JWT auth error: Authorization not set in http header',
                __FILE__, __LINE__, LogLevel::ERROR);
            throw new UnauthException('JWT auth error: Authorization not set in http header');
            return false;
        }

        $strs = explode(" ", $authorization);

        if ($strs[0] === "Bearer") {
            $token = $strs[1];
        } else{
            // write_log('JWT auth error: Authorization type is not Bearer', __FILE__, __LINE__);
            $token = $strs[0];
        }
        // write_log($token, __FILE__, __LINE__);
    } else {
        if (!isset($_GET["token"])) {
            $data = json_decode(file_get_contents("php://input"));
            if (!isset($data["token"])) {
                write_log('JWT auth error: Authorization not set in http request',
                    __FILE__, __LINE__, LogLevel::ERROR);
                throw new UnauthException('JWT auth error: Authorization not set in http request');
                return false;
            }
            $token = $data["token"];
        } else {
            $token = $_GET["token"];
        }
    }

    return $token;
}

//Check if a token is valid. Returns payload
function check_token($token)
{
    // write_log('check_token START. $token:' . $token, __FILE__, __LINE__);

    try {
        $payload = JWT::decode($token, JWT_SECRET);
        if (!$payload) {
            write_log('JWT::decode failed', __FILE__, __LINE__, LogLevel::ERROR);
            // $output['status'] = false;
            // $output['errors'] = '{"type": "unathenticated"}';
            return false;
        }
    } catch (ExpiredException $e) {
        write_log('Caught exception: ' . $e->getMessage(), __FILE__, __LINE__, LogLevel::ERROR);
        if (EXPIRY_TOKEN_ENABLED) {
            throw $e;
            return false;
        }
        return true;
    } catch (SignatureInvalidException $e) {
        write_log('Caught exception: ' . $e->getMessage(), __FILE__, __LINE__, LogLevel::ERROR);
        throw $e;
        return false;
    } catch (UnexpectedValueException $e) {
        write_log('Caught exception: ' . $e->getMessage(), __FILE__, __LINE__, LogLevel::ERROR);
        throw $e;
        return false;
    }

    return $payload;
}
