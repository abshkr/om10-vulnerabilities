<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

echo $is_fsc;
if ($is_fsc == 'Y' || $is_fsc == 'y') {
    setcookie("IS_FSC_MODE", "Y");
} else {
    setcookie("IS_FSC_MODE", "N");
}
