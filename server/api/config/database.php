<?php
include_once 'setups.php';
include_once 'jwt.php';
include_once 'jwt_utilities.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/exceptions.php';

class Database
{
    // specify your own database credentials
    private $host = null;
    private $db_name = null;
    private $username = null;
    private $password = null;
    private $conn = null;

    public function __construct()
    {
        $this->username = (isset($_SERVER['OMEGA_USER']) ? $_SERVER['OMEGA_USER'] : 'test_coogee2');
        $this->password = (isset($_SERVER['OMEGA_PWD']) ? $_SERVER['OMEGA_PWD'] : 'abcd1234');

        //This is to call a function in phpdecryption.so, check backend/decryption_libs/libdecryption_php
        if (isset($_SERVER['DB_ENCRYPT']) &&
            ($_SERVER['DB_ENCRYPT'] == 'YES' || $_SERVER['DB_ENCRYPT'] == 'yes')) {
            $temp = decrypt_user_pwd($this->password);
            $this->password = $temp;
        }

        $this->db_name = 'localhost' . (isset($_SERVER['OMEGA_DBPORT']) ? ':' . $_SERVER['OMEGA_DBPORT'] : '') .
            (isset($_SERVER['OMEGA_DBASE']) ? '/' . $_SERVER['OMEGA_DBASE'] : '/OML5K');
        // write_log("Database::__construct. username:" . $this->username .
        //     " password:" . $this->password . " db_name:" . $this->db_name, __FILE__, __LINE__);
    }

    public function __destruct()
    {
        // write_log(sprintf("%s::%s() START, disconnect db", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        if (isset($this->conn)) {
            oci_close($this->conn);
            $this->conn = null;
        }
    }

    private function getConn()
    {
        $this->conn = oci_connect($this->username, $this->password, $this->db_name, 'AL32UTF8');

        if (!($this->conn)) {
            $e = oci_error();
            // $this->logError($e);
            echo ("Connect DB failed:" . $e['message']);
            write_log("Connect DB failed:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        //Set data format, otherwise data update will fail
        $query = "ALTER SESSION SET nls_date_format = 'YYYY-MM-DD HH24:MI:SS'";
        $stmt = oci_parse($this->conn, $query);
        oci_execute($stmt);

        $query = "ALTER SESSION SET nls_timestamp_format = 'YYYY-MM-DD HH24:MI:SS'";
        $stmt = oci_parse($this->conn, $query);
        oci_execute($stmt);

        return $this->conn;
    }

    //This connection does not require any auth
    public function getConnection2()
    {
        $this->getConn();
        return $this->conn;
    }

    // get the database connection; if auth fails, return null
    public function getConnection($class = null, $method = null)
    {
        // write_log(__METHOD__ . " START", __FILE__, __LINE__);
        // write_log(json_encode($_SERVER, JSON_PRETTY_PRINT), __FILE__, __LINE__);
        $this->getConn();

        /**
         * Check AUTH by default, unless
         * 1# Client is using Postman
         * 2# is using localhost:3000 because this is Umesh is using
         * his testing env.
         */
        if (AUTH_CHECK &&
            substr($_SERVER['HTTP_USER_AGENT'], 0, 7) != 'Postman' &&
            !strpos($_SERVER['HTTP_REFERER'], 'localhost')) {
            if (JWT_AUTH) {
                $token = check_token(get_http_token());
                if (!$token) {
                    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                    throw new UnauthException('Authentication check failed, cannot continue');
                } else {
                    if (INVALIDATE_TOKEN_ENABLED &&
                        !$this->checkSessionStatus($token->per_code, $token->sess_id)) {
                        write_log(
                            sprintf(
                                "Token already invalidated, cannot continue. per_code:%s, sess_id:%s",
                                $token->per_code, $token->sess_id),
                            __FILE__, __LINE__, LogLevel::ERROR);
                        throw new UnauthException('Token already invalidated, cannot continue');
                    }
                }
            } else {
                if (!$this->getSessionStatus($class, $method)) {
                    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                    throw new UnauthException('Authentication check failed, cannot continue');
                }
            }
        }
        // write_log("getConnection done", __FILE__, __LINE__);
        return $this->conn;
    }

    private function checkSessionStatus($per_code, $sess_id)
    {
        $query = "
            SELECT COUNT(*) CNT FROM HTTP_SESSION_TRACE
            WHERE PER_CODE = :per_code AND SESS_ID = :sess_id";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $per_code);
        oci_bind_by_name($stmt, ':sess_id', $sess_id);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return $row['CNT'];
        } else {
            $e = oci_error($stmt);
            write_log($e['message'], __FILE__, __LINE__);
            return false;
        }
    }

    /* The reason $_SESSION['SESSION'] and $_SESSION['PERCODE'] can be used here is because
    the old AMF php code is still using. In SecureAuth.php, the function login() sets all the
    _SESSION variables. */
    private function getSessionStatus($class = null, $method = null)
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        if (isset($_SESSION['SESSION'])) {
            $sess_id = strip_tags($_SESSION['SESSION']);
            $per_code = strip_tags($_SESSION['PERCODE']);

            // write_log("sess_id:" . $_SESSION['SESSION'] . ", per_code:" . $_SESSION['PERCODE'],
            //     __FILE__, __LINE__);
            write_log(sprintf("sess_id:%s, per_code:%s, class:%s, method:%s",
                $_SESSION['SESSION'], $_SESSION['PERCODE'], $class, $method),
                __FILE__, __LINE__);

            // write_log("get session. sess_id:" . $sess_id . " per_code:" . $per_code,
            //     __FILE__, __LINE__);

            // $lang = strip_tags($_SESSION['LANGUAGE']);
            $query = "
                SELECT COUNT(*) CNT FROM HTTP_SESSION_TRACE
                WHERE PER_CODE = :per_code AND SESS_ID = :sess_id";

            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':per_code', $per_code);
            oci_bind_by_name($stmt, ':sess_id', $sess_id);
            if (oci_execute($stmt)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                return $row['CNT'];
            } else {
                $e = oci_error($stmt);
                write_log($e['message'], __FILE__, __LINE__);
                return false;
            }
        } else {
            write_log(__METHOD__ . " failed: no session found", __FILE__, __LINE__);
        }

        return false;
    }
}
