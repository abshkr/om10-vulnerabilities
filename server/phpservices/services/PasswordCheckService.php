<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../vo/Personnel.vo.php');
require_once(dirname(__FILE__) . '/../classes/PasswordCheck.class.php');

/* define the module name for calling logMe() to output */
if(!defined('PASSWORDCHECKSERVICES')) define('PASSWORDCHECKSERVICES','PasswordCheckServices');

define ("RETURN_PASSOK",         "0");	/* Password is OK */
define ("RETURN_ERR_COMPLEXITY", "1");	/* Password complexity invalid */
define ("RETURN_ERR_REUSE",      "2");	/* Password reuse count invalid */
define ("RETURN_ERR_LENGTH",     "3");	/* Password length invalid */
define ("RETURN_ERR_MATCH",      "4");	/* Two passwords NOT match */
define ("RETURN_ERR_INTERVAL",   "5");	/* Password changing interval invalid */
define ("RETURN_ERR_PRIVILEGE",  "6");	/* Privilege NOT enough*/
define ("RETURN_ERR_OPERATION",  "7");	/* Personnel operation failed */
define ("RETURN_ERR_EXCEPTION",  "-1");	/* Exception or parameters error */
//define ("PWD_NO_CHECK", "0");	/* No need to check password validity */
//define ("PWD_CHECK", "1");	    /* Need to check password validity */

class PasswordCheckService
{
    protected $pwdMinLen;
    protected $pwdMaxLen;
    protected $pwdComlexity;
    protected $pwdInterval;
    protected $pwdReuse;
    
    protected $per_code;
    protected $password;
    protected $password_conf;
    protected $password_chk;

    /*
     * Check the password validity.
     * @param string $data->per_code  personnel code
     * @param string $data->password  password
     */    
    public function checkPwdValidity($data)
    {
        logMe("Info: ++++++Running into checkPwdValidity()++++++", PASSWORDCHECKSERVICES);
        
        try
        {
            $lib = new PasswordCheckClass();
            $per_code = $data->per_code;
            $password = $data->per_password;
            //$password_conf = $data->per_passconfirm;
            //$password_chk = $data->password_validate;
            $disableChk = -1;

            //if (strlen($password) == 0 or $password_chk == null or $password_chk == PWD_NO_CHECK) {
            //    logMe("pwd len = " . strlen($password), PASSWORDCHECKSERVICES);
            //    logMe("password_chk = " . $password_chk, PASSWORDCHECKSERVICES);
            //    return RETURN_PASSOK;
            //}
            if (strlen($password) == 0) {
                logMe("pwd len = " . strlen($password), PASSWORDCHECKSERVICES);
                return RETURN_ERR_EXCEPTION;
            }
            
            /* Check if two passwords match */
            /* 
            $retRes = strcmp($password, $password_conf);
            if ($retRes == 0) {
                logMe("Info: Two passwords match.", PASSWORDCHECKSERVICES);
            }
            else {
                logMe("Error: Two passwords NOT match!", PASSWORDCHECKSERVICES);
                return RETURN_ERR_MATCH;
            }
            */

            /* Check password Min length */
            /*
            $pwdMinLen = $lib->getPwdRuleSettings("URBAC_PWD_LEN_MIN");
            if (!($pwdMinLen == null or $pwdMinLen == $disableChk)) {
                logMe("Info: pwdMinLen=" . $pwdMinLen, PASSWORDCHECKSERVICES);
                $pwdLen = strlen($password);
                if ($pwdLen < $pwdMinLen) {
                    logMe("Error: Password length less than Min length setting value!", PASSWORDCHECKSERVICES);
                    return RETURN_ERR_LENGTH;
                }
                logMe("Info: Password length passes Min length check.", PASSWORDCHECKSERVICES);
            }
            else {
                logMe("Info: Min length setting value is NULL or -1. Skip checking it...", PASSWORDCHECKSERVICES);
            }
            */
            
            /* Check password Max length */
            /*
            $pwdMaxLen = $lib->getPwdRuleSettings("URBAC_PWD_LEN_MAX");
            if (!($pwdMaxLen == null or $pwdMaxLen == $disableChk)) {
                logMe("Info: pwdMaxLen=" . $pwdMaxLen, PASSWORDCHECKSERVICES);
                $pwdLen = strlen($password);
                if ($pwdLen > $pwdMaxLen) {
                    logMe("Error: Password length greater than Max length setting value!", PASSWORDCHECKSERVICES);
                    return RETURN_ERR_LENGTH;
                }
                logMe("Info: Password length passes Max length check.", PASSWORDCHECKSERVICES);
            }
            else {
                logMe("Info: Max length setting value is NULL or -1. Skip checking it...", PASSWORDCHECKSERVICES);
            }
            */
             
            /* Check password Complexity */
            $pwdComlexity = $lib->getPwdRuleSettings("URBAC_PWD_COMPLEXITY");
            if (!($pwdComlexity == null or $pwdComlexity == $disableChk)) {
                logMe("Info: pwdComlexity is " . $pwdComlexity, PASSWORDCHECKSERVICES);

                if ($pwdComlexity == 6) {
                    if (!preg_match('/^[0-9a-zA-Z]*$/',$password)) {
                        logMe("Error: Password Complexity invalid!", PASSWORDCHECKSERVICES);
                        return RETURN_ERR_COMPLEXITY;
                    }
                }
                else if ($pwdComlexity == 7) {
                    if (!preg_match('/^\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w*$/',$password)) {
                        logMe("Error: Password Complexity invalid!", PASSWORDCHECKSERVICES);
                        return RETURN_ERR_COMPLEXITY;
                    }                
                }
                else if ($pwdComlexity == 15) {
                    if (!preg_match('/^.*(?=.{4,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/',$password)) {
                        logMe("Error: Password Complexity invalid!", PASSWORDCHECKSERVICES);
                        return RETURN_ERR_COMPLEXITY;
                    }
                }
                else {
                    return RETURN_ERR_EXCEPTION;
                }
                logMe("Info: Password Complexity OK!", PASSWORDCHECKSERVICES);
            }
            else {
                logMe("Info: Comlexity setting value is NULL or -1. Skip checking it...", PASSWORDCHECKSERVICES);
            }         

            /* Check password Interval */
            /* Don't check at this stage.
            $pwdInterval = $lib->getPwdRuleSettings("URBAC_PWD_UPD_INTERVAL");
            if (!($pwdInterval == null or $pwdInterval == $disableChk)) {
                logMe("pwdInterval is ". $pwdInterval . " minutes.", PASSWORDCHECKSERVICES);
                $userStat = $lib->getUserStatus($per_code);
                // Check the Interval only when the user is NOT inactived.
                if ($userStat != null and $userStat != 0) {
                    logMe("userStat is ". $userStat . ", check interval now...", PASSWORDCHECKSERVICES);
                    $pwdChgTime = $lib->getLastPwdChgTime($per_code);
                    if (!($pwdChgTime == null)) {
                        logMe("pwdChgTime is " . $pwdChgTime, PASSWORDCHECKSERVICES);
                        logMe("current timezone is " . date_default_timezone_get(), PASSWORDCHECKSERVICES);
                        date_default_timezone_set(date_default_timezone_get());
                        $currentTime = date("Y/m/d H:i:s");
                        logMe("current time is " . $currentTime, PASSWORDCHECKSERVICES);
                        $deltaMins = round((strtotime($currentTime) - strtotime($pwdChgTime)) / 60);
                        logMe("delta mins is  " . $deltaMins, PASSWORDCHECKSERVICES);
                        if ($deltaMins <= $pwdInterval) {
                            logMe("Error: You can't change pwd so frequently.", PASSWORDCHECKSERVICES);
                            return RETURN_ERR_INTERVAL;
                        }
                        logMe("Info: Password Interval OK!", PASSWORDCHECKSERVICES);
                    }
                    else {
                        logMe("pwdChgTime is null. Go on the following processes...", PASSWORDCHECKSERVICES);
                    }
                }
                logMe("userStat is ". $userStat . ", no need to check interval.", PASSWORDCHECKSERVICES);
            }
            else {
                logMe("pwdInterval is null or -1. Skip checking it...", PASSWORDCHECKSERVICES);
            }
            */
            
            /* Check password Reuse count */
            $pwdReuseCnt = $lib->getPwdRuleSettings("URBAC_PWD_REUSE");
            if (!($pwdReuseCnt == null or $pwdReuseCnt == $disableChk)) {
                logMe("pwdReuseCnt is ". $pwdReuseCnt, PASSWORDCHECKSERVICES);
                $nPwds = $lib->getLatestPwds($per_code);
                logMe("nPwds count is " . count($nPwds), PASSWORDCHECKSERVICES);
                if (!($nPwds == null)) {
                    $chkCount = min(count($nPwds), $pwdReuseCnt);
                    logMe("chkCount is " . $chkCount, PASSWORDCHECKSERVICES);
                    $encryptedPwd = crypt($password,'a1\0');
                    logMe("encryptedPwd is " . $encryptedPwd, PASSWORDCHECKSERVICES);
                    for ($nLoop = 0; $nLoop < $chkCount; $nLoop++) {
                        logMe("Pwds[$nLoop] is " . $nPwds[$nLoop]->PWDTRACE_PWD, PASSWORDCHECKSERVICES);
                        if (strcmp($encryptedPwd, $nPwds[$nLoop]->PWDTRACE_PWD) == 0) {
                            logMe("Pwds is used recently. " . $nPwds[$nLoop]->PWDTRACE_PWD, PASSWORDCHECKSERVICES);
                            return RETURN_ERR_REUSE;
                        }
                    }
                    logMe("Info: Password Reuse count OK!", PASSWORDCHECKSERVICES);
                }
            }
            else {
                logMe("pwdReuseCnt is null or -1. Skip checking it...", PASSWORDCHECKSERVICES);
            }
            
            logMe("RETURN 0.", PASSWORDCHECKSERVICES);
            return RETURN_PASSOK;
        }
        catch (Zend_Exception $e)
        {
            logMe("Failed to check password. Error message: " . $e->getMessage(), PASSWORDCHECKSERVICES);
            return RETURN_ERR_EXCEPTION;
        }
    }
}
