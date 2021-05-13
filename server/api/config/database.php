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

        if (!$this->conn) {
            $e = oci_error();
            echo ("Connect DB failed:" . $e['message']);
            write_log("Connect DB failed:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        //Set data format, otherwise data update will fail
        $query = "ALTER SESSION SET nls_date_format = 'YYYY-MM-DD HH24:MI:SS'";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "ALTER SESSION SET nls_timestamp_format = 'YYYY-MM-DD HH24:MI:SS'";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        // write_log(sprintf("%s::%s() END", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
        
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
        $this->setSessionData();
   
        /**
         * Check AUTH by default, unless
         * 1# Client is using Postman
         * 2# is using localhost:3000 because this is Umesh is using
         * his testing env.
         */
        if (AUTH_CHECK &&
            (isset($_SERVER['HTTP_USER_AGENT']) && substr($_SERVER['HTTP_USER_AGENT'], 0, 7) != 'Postman')) {
            if (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], 'localhost')) {
                // write_log("localhotst", __FILE__, __LINE__);
                // return $this->conn;
            }

            if (JWT_AUTH) {
                try {
                    $token = get_http_token();
                } catch (UnauthException $e) {
                    throw $e;
                }
                
                try {
                    $pay_load = check_token($token);
                    if (!$pay_load) {
                        write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                        throw new InvalidToeknException('Authentication check failed, cannot continue');
                    } else {
                        if (INVALIDATE_TOKEN_ENABLED &&
                            !$this->checkSessionStatus($pay_load->per_code, $pay_load->sess_id)) {
                            write_log(
                                sprintf(
                                    "Token already invalidated, cannot continue. per_code:%s, sess_id:%s",
                                    $pay_load->per_code, $pay_load->sess_id),
                                __FILE__, __LINE__, LogLevel::ERROR);
                            throw new InvalidToeknException('Token already invalidated, cannot continue');
                        }
                    }
                } catch (UnexpectedValueException $e) {
                    throw new InvalidToeknException($e->getMessage());
                }
                
            } else {
                if (!$this->getSessionStatus($class, $method)) {
                    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                    throw new InvalidToeknException('Authentication check failed, cannot continue');
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

    public function invalidate_token($per_code, $sess_id)
    {
        write_log(sprintf("%s::%s() START. per_code:%s, sess_id:%s", 
            __CLASS__, __FUNCTION__, $per_code, $sess_id), __FILE__, __LINE__);
        
        $query = "
            DELETE FROM HTTP_SESSION_TRACE
            WHERE PER_CODE = :per_code AND SESS_ID = :sess_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_code', $per_code);
        oci_bind_by_name($stmt, ':sess_id', $sess_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    //Audit data needs this
    private function setSessionData() 
    {
        // write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__), 
        //     __FILE__, __LINE__);
        if (!isset($_SESSION)) {
            session_start();
        }

        $lang = Utilities::getCurrLang();
        $ismanager = ($_SESSION['MANAGER'] === 'T') ? 'Y' : 'N';
        $cmpycode = $_SESSION['COMPANY'];
        $percode = Utilities::getCurrPsn();
        $clientip = $_SERVER['REMOTE_ADDR'];

        // write_log(sprintf("%s, %s, %s, %s, %s", $lang, $ismanager, $cmpycode, $percode, $clientip), 
        //     __FILE__, __LINE__);

        $query = "BEGIN ADT.SET_LANG(:lang); END;";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':lang', $lang);
        // write_log(oci_execute($stmt, OCI_NO_AUTO_COMMIT), __FILE__, __LINE__);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "BEGIN adt.SET_ISMANAGER(:ismanager); END;";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ismanager', $ismanager);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "BEGIN adt.SET_CMPYCODE(:cmpycode); END;";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpycode', $cmpycode);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
        
        $query = "BEGIN adt.SET_PERCODE(:percode); END;";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':percode', $percode);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "BEGIN adt.SET_CLIENTIP(:clientip); END;";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':clientip', $clientip);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    /* The reason $_SESSION['SESSION'] and $_SESSION['PERCODE'] can be used here is because
    the old AMF php code is still using. In SecureAuth.php, the function login() sets all the
    _SESSION variables. */
    private function getSessionStatus($class = null, $method = null)
    {
        // write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__), 
        //     __FILE__, __LINE__);

        if (!isset($_SESSION)) {
            session_start();
        }

        if (isset($_SESSION['SESSION'])) {
            $sess_id = strip_tags($_SESSION['SESSION']);
            $per_code = strip_tags($_SESSION['PERCODE']);

            // write_log("sess_id:" . $_SESSION['SESSION'] . ", per_code:" . $_SESSION['PERCODE'],
            //     __FILE__, __LINE__);
            // write_log(sprintf("sess_id:%s, per_code:%s, class:%s, method:%s",
            //     $_SESSION['SESSION'], $_SESSION['PERCODE'], $class, $method),
            //     __FILE__, __LINE__);

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
