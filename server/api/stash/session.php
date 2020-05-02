

<?php
session_save_path('/var/www/tmp/php/session');

if (!isset($_SESSION)) {
    session_start();
}

$_SESSION["newsession"] = "hello";
echo json_encode($_SESSION);
