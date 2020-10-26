<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class FaAuth extends CommonClass
{
    public function TwoFA_mail($user)
    {
        $query = "
            SELECT NVL(PER_EMAIL, '-1') PER_EMAIL FROM PERSONNEL WHERE PER_CODE = :per_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $user);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $email = $row['PER_EMAIL'];
        if ($email === '-1') {
            write_log(sprintf("Email not set for user %s", $user), __FILE__, __LINE__, LogLevel::ERROR);
            return "2FA NOEMAIL";
        }

        //email validateion
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "2FA INVALIDMAIL";
        }

        return $email;
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

    public function TwoFA_mailout($mail)
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

        mail($to, $subject, $msg, null, $from);

        write_log(sprintf("Send auth code %s mail address %s", $auth_code, $mail),
            __FILE__, __LINE__);
        return $auth_code;
    }

    public function post_check()
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        write_log(sprintf("%s::%s() START. auth code:%s, expected:%s", 
            __CLASS__, __FUNCTION__, $this->two_factor_code, $_SESSION['AUTH_CODE']),
            __FILE__, __LINE__);
        if ($this->two_factor_code === $_SESSION['AUTH_CODE']) {
            $serv = new SiteService($this->conn);
            $timecout = $serv->FA2_timeout();
            if (time() - intval($_SESSION['AUTH_CODE_CREATE_TIME']) > $timecout) {
                write_log(sprintf("2FA auth timeout. cur:%d, auth created:%s", time(), $_SESSION['AUTH_CODE_CREATE_TIME']),
                    __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__2FA_TIMEOUT__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
            } else {
                write_log("2FA auth passed", __FILE__, __LINE__);
                unset($_SESSION['AUTH_CODE']);
                unset($_SESSION['AUTH_CODE_CREATE_TIME']);
                $error = new EchoSchema(200, response("__ACTION_SUCCEED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
            }
        } else {
            write_log(sprintf("Fails 2FA, auth code:%s, expected:%s", $this->two_factor_code, $_SESSION['AUTH_CODE']),
                __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__2FA_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    public function pre_check($user)
    {
        write_log(sprintf("%s::%s() START. user:%s", __CLASS__, __FUNCTION__, $user),
            __FILE__, __LINE__);
        $serv = new SiteService($this->conn);
        if ($serv->FA2_enabled()) {
            write_log("2FA enabled, start 2FA auth process. " . $user, __FILE__, __LINE__);
            $mail = $this->TwoFA_mail($user);
            $auth_code = $this->TwoFA_mailout($mail);
            
            if (!isset($_SESSION)) {
                session_start();
            }

            $_SESSION['AUTH_CODE'] = $auth_code;
            $_SESSION['AUTH_CODE_CREATE_TIME'] = time();

            // write_log(json_encode($_SESSION), __FILE__, __LINE__);
            return "AUTH 2FA";
        }

        return "NA";
    }
}
