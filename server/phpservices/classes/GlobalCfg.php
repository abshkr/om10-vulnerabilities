<?php

/* define the OS for new line character, windows or lunix */
if(!defined('OS')) define('OS','lunix');

/* define the LOGDIR */
if(isset($_SERVER["OMEGA_HOME"]))
    $GLOBALS["LOGDIR"] = $_SERVER["OMEGA_HOME"] . '/logs';
else 
    $GLOBALS["LOGDIR"] = '/tmp/logs';

/* define the module name for calling logMe() to output */
/*** define DB error log file name ***/
if(!defined('DBERRORLOG')) define('DBERRORLOG',$GLOBALS["LOGDIR"] . '/' .'db_error.log');

/*** define debug log file name ***/
if(!defined('TLOG')) define('TLOG',$GLOBALS["LOGDIR"] . '/' .'debug.log');

/*** define user error log file name ***/
if(!defined('ERRORLOG')) define('ERRORLOG',$GLOBALS["LOGDIR"] . '/' .'error.log');

/* define the HOST const */
define ("HOST","df.mobhk.om5000");
//define ("HOST","10.2.20.53");
/* define the base CGI directory */
define ("CGIDIR","cgi-bin/en/");

/* Define the Oracle database const */
//if(!defined('ORA_USER')) define ("ORA_USER","df");
//if(!defined('ORA_PWD')) define ("ORA_PWD","abcd1234");
//if(!defined('DBASE')) define ("DBASE","OML5K");
//if(!defined('ORA_USER')) define ("ORA_USER","df_emhk24082012");
if(!defined('ORA_USER')) define ("ORA_USER","df_emhk24082012-26092012");
if(!defined('ORA_PWD')) define ("ORA_PWD","abcd1234");
if(!defined('DBASE')) define ("DBASE","OM5LK");

define ("DEBUG","NO"); /* YES or NO */
?>
