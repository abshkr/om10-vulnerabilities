<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class FaAuth extends CommonClass
{
    protected $TABLE_NAME = "PERSONNEL";

    private function check_TwoFA_mail($user)
    {
        $query = "
            SELECT NVL(PER_EMAIL, '-1') PER_EMAIL FROM PERSONNEL WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $user);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return "Database error:" . $e['message'];
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $email = $row['PER_EMAIL'];
        if ($email === '-1') {
            write_log(sprintf("Email not set for user %s", $user), __FILE__, __LINE__, LogLevel::ERROR);
            return "2FA authentication: email not set";
        }

        //email validateion
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "2FA authentication: email not valid";
        }

        return "OK";
    }

    private function TwoFA_mail($user)
    {
        $query = "
            SELECT NVL(PER_EMAIL, '-1') PER_EMAIL FROM PERSONNEL WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $user);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return "Database error:" . $e['message'];
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $email = $row['PER_EMAIL'];
        if ($email === '-1') {
            write_log(sprintf("Email not set for user %s", $user), __FILE__, __LINE__, LogLevel::ERROR);
            return response("__2FA_EMAIL_NOT_SET__");
        }

        //email validateion
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response("__2FA_EMAIL_NOT_VALID__");
        }

        return $email;
    }

    private function TwoFA_phone($user)
    {
        $query = "
            SELECT NVL(PER_PHONE, '-1') PER_PHONE FROM PERSONNEL WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $user);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return "Database error:" . $e['message'];
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $phone = $row['PER_PHONE'];
        if ($phone === '-1') {
            write_log(sprintf("Phone number not set for user %s", $user), __FILE__, __LINE__, LogLevel::ERROR);
            return response("__2FA_EMAIL_NOT_SET__");
        }

        return $phone;
    }

    private function TwoFA_code()
    {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randstring = '';
        for ($i = 0; $i <= 5; $i++) {
            $randstring .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randstring;
    }

    private function TwoFA_mailout($mail)
    {
        $to = $mail;
        $subject = "DKI-TAS verification Code";
        $auth_code = $this->TwoFA_code();
        $msg = sprintf("Please verify that it’s you

We have noticed that you are signing in to a DKI TAS system.
If this is you, please use the following verification code to confirm your identity:

%s

If this wasn’t you, please reset your password.

Yours securely,
Team DKI", $auth_code);
        $from = "-rno-reply@TEST-2FA.shell-manual.sites";

        $result = mail($to, $subject, $msg, null, $from);

        write_log(sprintf("Send auth code %s mail address %s. result:%s", $auth_code, $mail, $result ? "true" : " false"),
            __FILE__, __LINE__);

        if (!$result)
        {
            write_log("Failed to send mail out, please contact administrator");
            return [
                "auth_code" => "",
                "result" => false,
                "err_msg" => "Failed to send out authentication mail, please contact administrator"
            ];
        }
        return [
            "auth_code" => $auth_code,
            "result" => true,
            "err_msg" => ""
        ];
    }

    public function post_check()
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        write_log(sprintf("%s::%s() START. auth code:%s", __CLASS__, __FUNCTION__, $this->two_factor_code), 
            __FILE__, __LINE__);
        
        $check_result = false;
        $serv = new SiteService($this->conn);
        if ($serv->FA2_method() === 'SMS') {
            $user = Utilities::getCurrPsn();
            $phone = $this->TwoFA_phone($user);
            $scriptfile = __DIR__  . "/../scripts/sms_verify.sh";
            chmod($scriptfile, 0755);
            $pyfile = __DIR__  . "/../scripts/sms_verify.py";
            chmod($pyfile, 0755);
            write_log($scriptfile . " " . $phone . " " . $this->two_factor_code, __FILE__, __LINE__);
            $result = shell_exec($scriptfile . " " . $phone . " " . $this->two_factor_code);
            if (strpos($result, "approved") === false) {
                write_log("Failed to verify. result from script: " . $result, __FILE__, __LINE__);
                $error = new EchoSchema(500, response("__2FA_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
            } else {
                $check_result = true;
            }
        } else {
            if ($this->two_factor_code === $_SESSION['AUTH_CODE']) {
                $timecout = $serv->FA2_timeout();
                if (time() - intval($_SESSION['AUTH_CODE_CREATE_TIME']) > $timecout) {
                    write_log(sprintf("2FA auth timeout. cur:%d, auth created:%s", time(), $_SESSION['AUTH_CODE_CREATE_TIME']),
                        __FILE__, __LINE__, LogLevel::ERROR);
                    $error = new EchoSchema(500, response("__2FA_TIMEOUT__"));
                    echo json_encode($error, JSON_PRETTY_PRINT);
                } else {
                    $check_result = true;
                }
            } else {
                write_log(sprintf("Fails 2FA, auth code:%s, expected:%s", $this->two_factor_code, $_SESSION['AUTH_CODE']),
                    __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__2FA_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
            }
        }

        if ($check_result) {
            write_log("2FA auth passed", __FILE__, __LINE__);
    
            $journal = new Journal($this->conn);
            $jnl_data[0] = sprintf("Omega System Login. User: %s", Utilities::getCurrPsn());

            if (!$journal->jnlLogEvent(
                Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_SYS, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            unset($_SESSION['AUTH_CODE']);
            unset($_SESSION['AUTH_CODE_CREATE_TIME']);
            $error = new EchoSchema(200, response("__ACTION_SUCCEED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    //If 2FA not needed, return "NA", or if email not correctly set
    public function pre_check($user)
    {
        write_log(sprintf("%s::%s() START. user:%s", __CLASS__, __FUNCTION__, $user),
            __FILE__, __LINE__);
        $serv = new SiteService($this->conn);
        if ($serv->FA2_enabled()) {
            if ($serv->FA2_method() === 'SMS') {
                $phone = $this->TwoFA_phone($user);
                if ($phone[0] != '+' && $phone[0] != '0') {
                    return $phone;
                }
            } else {
                $mail = $this->TwoFA_mail($user);
                if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
                    return $mail;
                } 
            }
        }
        
        return "OK";
    }

    //Send out a mail/SMS that includes the factor. If 2FA not enabled, returns NA
    public function sendout_factor($user)
    {
        // write_log(sprintf("%s::%s() START. user:%s", __CLASS__, __FUNCTION__, $user),
        //     __FILE__, __LINE__);
        $serv = new SiteService($this->conn);
        if ($serv->FA2_enabled()) {
            write_log("2FA enabled, start 2FA auth process. " . $user, __FILE__, __LINE__);
                
            if ($serv->FA2_method() === 'SMS') {
                $phone = $this->TwoFA_phone($user);
                $scriptfile = __DIR__  . "/../scripts/sms_sending.sh";
                chmod($scriptfile, 0755);
                $pyfile = __DIR__  . "/../scripts/sms_sending.py";
                chmod($pyfile, 0755);
                write_log($scriptfile . " " . $phone, __FILE__, __LINE__);
                $result = shell_exec($scriptfile . " " . $phone);
                if (strpos($result, "pending") !== false) {
                    return "AUTH 2FA";
                }
                write_log("Failed to send SMS. result from script: " . $result, __FILE__, __LINE__);
            } else {
                $mail = $this->TwoFA_mail($user);
                if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
                    return $mail;
                }
                
                $mail_result = $this->TwoFA_mailout($mail);
                
                if (!isset($_SESSION)) {
                    session_start();
                }

                if ($mail_result['result']) {
                    $_SESSION['AUTH_CODE'] = $mail_result['auth_code'];
                    $_SESSION['AUTH_CODE_CREATE_TIME'] = time();

                    // write_log(json_encode($_SESSION), __FILE__, __LINE__);
                    return [
                        "is_success" => true,
                        "twofa_result" => "AUTH 2FA",
                        "err_msg" => ""
                    ];
                } else {
                    return [
                        "is_success" => false,
                        "twofa_result" => "NA",
                        "err_msg" => $mail_result['err_msg']
                    ];
                }
                
            }
        }

        return [
            "is_success" => true,
            "twofa_result" => "NA"
        ];
    }
}
