
<?php
include_once __DIR__ . '/../config/jwt.php';
include_once __DIR__ . '/../config/jwt_utilities.php';

$token = get_http_token();
echo $token;
// $pay_load = check_token(get_http_token());
// echo json_decode($pay_load);