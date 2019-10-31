<?php

include_once __DIR__ . '/../config/setups.php';

abstract class LogLevel
{
    const DEBUG = 'DEBUG';
    const INFO = 'INFO';
    const WARNING = 'WARNING';
    const ERROR = 'ERROR';
    const CRITICAL = 'CRITICAL';
}

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

date_default_timezone_set('UTC');
$log_file = (isset($_SERVER['OMEGA_HOME']) ? $_SERVER['OMEGA_HOME'] : '/usr/omega') .
'/logs/php_rest_' . date('Ymd') . '.log';

// ini_set('display_errors', 1);
// error_reporting(E_ALL);

function write_log($message, $file = __FILE__, $line = __LINE__, $level = LogLevel::DEBUG)
{
    if (!ENABLE_DEBUG_LOG) {
        return;
    }

    if (DEBUG_LEVEL === 1) {
        if ($level === LogLevel::DEBUG) {
            return;
        }
    }

    if (DEBUG_LEVEL === 2) {
        if ($level === LogLevel::DEBUG || $level === LogLevel::INFO) {
            return;
        }
    }

    global $log_file;
    $formatted = date("Y-m-d H:i:s") . " | "
    . basename($file) . ":"
        . $line . " | "
        . $level . " | "
        . $message . "\n";
    error_log($formatted, 3, $log_file);
}
