<?php

//Set it to true means write_log will redirect message to ~/logs/php_rest_[date].log
//false means doing nothing
define('ENABLE_DEBUG_LOG', true);

//Set it to true means user need to log in before perform all the db-related actions 
define('SESSION_CHECK', true);

//Set it to true to call ini_set('display_errors', 1) and error_reporting(E_ALL)
define('DISPLAY_ALL_ERROS', false);

if (DISPLAY_ALL_ERROS) {
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
}
