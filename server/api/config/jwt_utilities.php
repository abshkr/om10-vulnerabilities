<?php

include_once "jwt.php";
include_once __DIR__ . '/../shared/log.php';

function generateRandomString($length = 15) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

/**
 * jwt secret store in a file jwt_secret under the same folder. 
 * If no such a file, create a new one, write a random string in it,
 * and use this string as jwt secret. This can guarantee jwt secret 
 * string is alway unique on different server so it is more secure
 */
function jwt_secret()
{
    $secret_file = dirname(__FILE__) . '/jwt_secret';
    
    if (!file_exists($secret_file) )
    {
        $random_secret = generateRandomString();
        $fd = fopen($secret_file, "w+");
        $fout = fwrite($fd, $random_secret);
        fclose($fd);
        return $random_secret;
    }

    return file_get_contents($secret_file);
}

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

    $jwt_str = jwt_secret();
    return JWT::encode($token, $jwt_str);
}

//Get a token from http request
function get_http_token()
{
    if (AUTH_IN_HEADER) {
        $headers = apache_request_headers();

        if (!array_key_exists('Authorization', $headers) && !array_key_exists('authorization', $headers)) {
            write_log('JWT auth error: Authorization not set in http header',
                __FILE__, __LINE__, LogLevel::ERROR);
            throw new UnauthException('JWT auth error: Authorization not set in http header');
            return false;
        }

        $authorization = isset($headers['Authorization']) ? $headers['Authorization'] : $headers['authorization'];

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
    $jwt_str = jwt_secret();

    try {
        $payload = JWT::decode($token, $jwt_str);
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
