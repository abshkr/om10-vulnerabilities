<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Credentials: true');

$is_fsc = substr(getenv('IS_FSC_MODE'), 0, 1);
if ($is_fsc == 'Y' || $is_fsc == 'y') {
    setcookie("IS_FSC_MODE", "Y");
    echo '{ "is_fsc": true }';
} else {
    setcookie("IS_FSC_MODE", "N");
    echo '{ "is_fsc": false }';
}
