<?php

include_once "jwt.php";
include_once 'log.php';

function get_token($per_code, $sess_id = null, $exp_seconds = 1800)
{
    write_log('get_token START. per_code:' . $per_code . ' sess_id:' . $sess_id, 
        __FILE__, __LINE__);
    $token = array();
    $token['per_code'] = $per_code;
    $token['exp'] = time() + $exp_seconds;
    $token['sess_id'] = $sess_id;

    return JWT::encode($token, JWT_SECRET);
}

//Get a token from http request
function get_http_token()
{
    if (AUTH_IN_HEADER) {
        $headers = apache_request_headers();
        
        if (!isset($headers['Authorization']))
        {
            write_log('JWT auth error: Authorization not set in http header', 
                __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
        
        $strs = explode(" ", $headers['Authorization']);
        
        if (!($strs[0] === "Bearer")) {
            write_log('JWT auth error: Authorization type is not Bearer', __FILE__, __LINE__);
            return false;
        }
        $token = $strs[1];
        // write_log($token, __FILE__, __LINE__);
    } else {
        if (!isset($_GET["token"])) {
            write_log('JWT auth error: Authorization not set in http request', 
                __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $token = $_GET["token"];
    }

    return $token;
}

//Check if a token is valid. Returns payload
function check_token($token)
{
    write_log('check_token START. $token:' . $token, __FILE__, __LINE__);

    try {
        $payload = JWT::decode($token, JWT_SECRET);
        if (!$payload)
        {
            write_log('JWT::decode failed', __FILE__, __LINE__, LogLevel::ERROR);
            // $output['status'] = false;
            // $output['errors'] = '{"type": "unathenticated"}';
            return false;
        }
    } catch (UnexpectedValueException $e) {
        write_log('Caught exception: ' . $e->getMessage(), __FILE__, __LINE__, LogLevel::ERROR);
        return false;
    } catch (ExpiredException $e) {
        write_log('Caught exception: ' . $e->getMessage(), __FILE__, __LINE__, LogLevel::ERROR);
        return false;
    } catch (SignatureInvalidException $e) {
        write_log('Caught exception: ' . $e->getMessage(), __FILE__, __LINE__, LogLevel::ERROR);
        return false;
    } 

    write_log('true', __FILE__, __LINE__);
    return $payload;
}