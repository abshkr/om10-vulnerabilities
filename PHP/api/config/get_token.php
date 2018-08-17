<?php

include_once "jwt.php";

$token = array();
$token['per_code'] = 'cw_test';
$token['exp'] = time() + 1800;
echo JWT::encode($token, 'dki_jwt');


