<?php

//Set it to true means write_log will redirect message to ~/logs/php_rest_[date].log
//false means doing nothing
define('ENABLE_DEBUG_LOG', true);

//Set it to true means user need to stay logged in before perform all the db-related actions 
define('AUTH_CHECK', true);

//Set it to true to use Token-based authentication. false uses table HTTP_SESSION_TRACE
define ('JWT_AUTH', true);

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

//if it is trun, store $token['sess_id'] in db, and when check token
//also check if $token['sess_id'] is in db. Because when logout, $token['sess_id'] 
//will be delete from db, so it invalidate this token 
define('INVALIDATE_TOKEN_ENABLED', false);

define('JASPERREPORT_DIR', 'reports/');

if (DISPLAY_ALL_ERROS) {
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
}
