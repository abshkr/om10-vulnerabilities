<?php

// class Log 
// {
//     public static function writeLog($message, $file = __FILE__, $line == __LINE__)
//     {
//         $log_file = (isset($_SERVER['OMEGA_HOME']) ? $_SERVER['OMEGA_HOME'] : '/usr/omega') . 
//             '/logs/php_rest_' . date('Ymd') . '.log';

//         $formatted = "[".date("y-m-d H:i:s")."] | " 
//             . basename($file) . " | " 
//             . $line . " | " 
//             . $message . "\n";
//         error_log($formatted, 3, $log_file);
//     }
// }

$log_file = (isset($_SERVER['OMEGA_HOME']) ? $_SERVER['OMEGA_HOME'] : '/usr/omega') . 
        '/logs/php_rest_' . date('Ymd') . '.log';

// ini_set('display_errors', 1);
// error_reporting(E_ALL);

function write_log($message, $file = __FILE__, $line = __LINE__)
{
    global $log_file;
    $formatted = date("Y-m-d H:i:s") . " | " 
        . basename($file) . ":" 
        . $line . " | " 
        . $message . "\n";
    error_log($formatted, 3, $log_file);
}