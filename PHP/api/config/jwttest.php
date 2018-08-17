<?php

include_once "jwt.php";

$token = array();
$token['per_code'] = 'cw_test';
$token['exp'] = 1534410300;
echo JWT::encode($token, 'dki_jwt');


