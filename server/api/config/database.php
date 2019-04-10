<?php
include_once 'log.php';
include_once 'setups.php';
include_once 'jwt.php';
include_once 'jwt_utilities.php';
include_once '../shared/utilities.php';

class Database 
{
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "localhost/OML5K";
    private $username = "test_coogee2";
    private $password = "abcd1234";
    private $conn;

    public function __construct()
    {
        $this->username = (isset($_SERVER['OMEGA_USER']) ? $_SERVER['OMEGA_USER'] : 'test_coogee2');
        $this->password = (isset($_SERVER['OMEGA_PWD']) ? $_SERVER['OMEGA_PWD'] : 'abcd1234');
        $this->db_name = 'localhost' . (isset($_SERVER['DB_PORT']) ? ':' . $_SERVER['DB_PORT'] : '') .
            (isset($_SERVER['DB_DBASE']) ? '/' . $_SERVER['DB_DBASE'] : '/OML5K');
        // echo $this->username;
        // echo $this->password;
        // echo $this->db_name;
        write_log("Database::__construct. username:" . $this->username . 
            " password:" . $this->password . " db_name:" . $this->db_name, __FILE__, __LINE__);
    }

    private function getConn()
    {
        $this->conn = oci_connect($this->username, $this->password, $this->db_name, 'AL32UTF8');
        
        if (!($this->conn))
        {
            $e = oci_error();
            // $this->logError($e);
            echo("Connect DB failed:" . $e['message']);
            write_log("Connect DB failed:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        return $this->conn;
    }

    //This connection does not require any auth
    public function getConnection2()
    {
        $this->getConn();
        return $this->conn;
    }
 
    // get the database connection; if auth fails, return null
    public function getConnection()
    {
        // write_log(__METHOD__ . " START", __FILE__, __LINE__);

        $this->getConn();

        if (AUTH_CHECK) {
            if (JWT_AUTH) {
                $token = check_token(get_http_token());
                if (!$token) {
                    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                    return null;
                } else {
                    if (INVALIDATE_TOKEN_ENABLED && 
                        !$this->checkSessionStatus($token->per_code, $token->sess_id)) {
                        write_log(
                            sprintf(
                                "Token already invalidated, cannot continue. per_code:%s, sess_id:%s",
                                $token->per_code, $token->sess_id), 
                            __FILE__, __LINE__, LogLevel::ERROR);
                        return null;
                    }
                }
            } else {
                if (!$this->getSessionStatus()) {
                    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                    return null;
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
            write_log(oci_error($stmt)['message'], __FILE__, __LINE__);
            return false;
        }
    }

    /* The reason $_SESSION['SESSION'] and $_SESSION['PERCODE'] can be used here is because
    the old AMF php code is still using. In SecureAuth.php, the function login() sets all the
    _SESSION variables. */
    private function getSessionStatus()
    {
        session_start();
        if (isset($_SESSION['SESSION'])) {
            $sess_id = strip_tags($_SESSION['SESSION']);
            $per_code = strip_tags($_SESSION['PERCODE']);

            write_log("sess_id:" . $_SESSION['SESSION'] . ", per_code:" . $_SESSION['PERCODE'],
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
                write_log(oci_error($stmt)['message'], __FILE__, __LINE__);
                return false;
            }
        } else {
            write_log(__METHOD__ . " failed: no session found", __FILE__, __LINE__);
        }
        
        return false;
    }
}
