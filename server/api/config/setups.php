<?php

//Set it to true means write_log will redirect message to ~/logs/php_rest_[date].log
//false means doing nothing
define('ENABLE_DEBUG_LOG', true);

//0: All debug; 1: info and above; 2: warning and above
define('DEBUG_LEVEL', 0);

//Check privilege of current user for read/create/update/delete
define('PRIVILEGE_CHECK', false);

//Set it to true, php will return different http code.
//In dev env, set to false, because we use localhost to call 10.1.10.66, and it will be
//blocked by CORS if we use different http code.
define("HTTP_CODE_ENABLED", true);

//Set it to true means user need to stay logged in before perform all the db-related actions
define('AUTH_CHECK', true);

//Set it to true to use Token-based authentication. false uses table HTTP_SESSION_TRACE
define('JWT_AUTH', true);

//Set it to true to call ini_set('display_errors', 1) and error_reporting(E_ALL)
define('DISPLAY_ALL_ERROS', false);

//If it is true, client uses sth like
//Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJfY29kZSI6ImN3X3Rlc3QiLCJleHAiOjE1MzY3NTk2NTF9.oGCzF22FiauRys6Ekq5HL3rxcRQIXr5qWiEMNJBPA7U
//in HTTP REQUEST HEADER
//C:\Users\bluet>curl -i "http://10.2.20.53/api/personnel/search.php?s=cw" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJfY29kZSI6ImN3X3Rlc3QiLCJleHAiOjE1MzY3NTk2NTF9.oGCzF22FiauRys6Ekq5HL3rxcRQIXr5qWiEMNJBPA7U"
/*Put this header below if AUTH_IN_HEADER is used:
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
otherwise there will be a "Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response" error
 */
define('AUTH_IN_HEADER', true);

//
// define('JWT_SECRET', 'dki_jwt');

//It can be http:// or https://
define('URL_PROTOCOL', 'https://');

define('JWT_SECRET', 'dki_jwt');

//if it is true, store $token['sess_id'] in db, and when check token
//also check if $token['sess_id'] is in db. Because when logout, $token['sess_id']
//will be delete from db, so it invalidate this token
define('INVALIDATE_TOKEN_ENABLED', true);

//If it is false, when token is expired, do not reject 
define('EXPIRY_TOKEN_ENABLED', false);

define('JASPERREPORT_DIR', 'reports/');

//HST host message folder
define('HST_INCOMING_FOLDER', '/usr/omega/data/gsap/archive/');
define('HST_OUTGOING_FOLDER', '/usr/omega/data/gsap/archive/out/');

//salt to call crypt
//Use "a1" because the old C functin used "a1", just for back-compatible
define('ENCTYPED_SALT', 'a1\0');

// If API_F == "YES", use API_F message definition, otherwise use the old style
define("API_F", "NO");

if (DISPLAY_ALL_ERROS) {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
}

//php5.3
if (version_compare(PHP_VERSION, '5.4', '<')) {
    define('JSON_PRETTY_PRINT', 0);
    define('JSON_UNESCAPED_UNICODE', 0);

    function http_response_code($code = null)
    {
        if ($code !== null) {
            switch ($code) {
                case 100:$text = 'Continue';
                    break;
                case 101:$text = 'Switching Protocols';
                    break;
                case 200:$text = 'OK';
                    break;
                case 201:$text = 'Created';
                    break;
                case 202:$text = 'Accepted';
                    break;
                case 203:$text = 'Non-Authoritative Information';
                    break;
                case 204:$text = 'No Content';
                    break;
                case 205:$text = 'Reset Content';
                    break;
                case 206:$text = 'Partial Content';
                    break;
                case 300:$text = 'Multiple Choices';
                    break;
                case 301:$text = 'Moved Permanently';
                    break;
                case 302:$text = 'Moved Temporarily';
                    break;
                case 303:$text = 'See Other';
                    break;
                case 304:$text = 'Not Modified';
                    break;
                case 305:$text = 'Use Proxy';
                    break;
                case 400:$text = 'Bad Request';
                    break;
                case 401:$text = 'Unauthorized';
                    break;
                case 402:$text = 'Payment Required';
                    break;
                case 403:$text = 'Forbidden';
                    break;
                case 404:$text = 'Not Found';
                    break;
                case 405:$text = 'Method Not Allowed';
                    break;
                case 406:$text = 'Not Acceptable';
                    break;
                case 407:$text = 'Proxy Authentication Required';
                    break;
                case 408:$text = 'Request Time-out';
                    break;
                case 409:$text = 'Conflict';
                    break;
                case 410:$text = 'Gone';
                    break;
                case 411:$text = 'Length Required';
                    break;
                case 412:$text = 'Precondition Failed';
                    break;
                case 413:$text = 'Request Entity Too Large';
                    break;
                case 414:$text = 'Request-URI Too Large';
                    break;
                case 415:$text = 'Unsupported Media Type';
                    break;
                case 498:$text = 'Token expired/invalid';
                    break;
                case 500:$text = 'Internal Server Error';
                    break;
                case 501:$text = 'Not Implemented';
                    break;
                case 502:$text = 'Bad Gateway';
                    break;
                case 503:$text = 'Service Unavailable';
                    break;
                case 504:$text = 'Gateway Time-out';
                    break;
                case 505:$text = 'HTTP Version not supported';
                    break;
                default:
                    exit('Unknown http status code "' . htmlentities($code) . '"');
                    break;
            }

            $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');

            header($protocol . ' ' . $code . ' ' . $text);

            $GLOBALS['http_response_code'] = $code;

        } else {

            $code = (isset($GLOBALS['http_response_code']) ? $GLOBALS['http_response_code'] : 200);

        }

        return $code;
    }
}
