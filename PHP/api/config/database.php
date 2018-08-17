<?php
include_once 'log.php';
include_once 'setups.php';
include_once 'jwt.php';

class Database 
{
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "localhost/OML5K";
    private $username = "test_coogee2";
    private $password = "abcd1234";
    public $conn;

    public function __construct()
    {
        $this->username = (isset($_SERVER['OMEGA_USER']) ? $_SERVER['OMEGA_USER'] : 'test_coogee2');
        $this->password = (isset($_SERVER['OMEGA_PWD']) ? $_SERVER['OMEGA_PWD'] : 'abcd1234');
        $this->db_name = 'localhost' . (isset($_SERVER['DB_PORT']) ? ':' . $_SERVER['DB_PORT'] : '') .
            (isset($_SERVER['DB_DBASE']) ? '/' . $_SERVER['DB_DBASE'] : '/OML5K');
        // echo $this->username;
        // echo $this->password;
        // echo $this->db_name;
    }
 
    // get the database connection
    public function getConnection()
    {
        $this->conn = oci_connect($this->username, $this->password, $this->db_name, 'AL32UTF8');
        
        if (!($this->conn))
        {
            $e = oci_error();
            // $this->logError($e);
            echo("Connect DB failed:" . $e['message']);
        }

        if (AUTH_CHECK) {
            if (JWT_AUTH) {
                if (!$this->checkToken())
                {
                    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                    return null;
                }
            } else {
                if (!$this->getSessionStatus()) {
                    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                    return null;
                }
            }
        } 
 
        return $this->conn;
    }

    private function checkToken()
    {
        if (!isset($_GET["token"]))
            return false;

        $token = $_GET["token"];
        try {
            if (!JWT::decode($token, 'dki_jwt'))
            {
                // $output['status'] = false;
                // $output['errors'] = '{"type": "unathenticated"}';
                return false;
            }
        } catch (UnexpectedValueException $e) {
            write_log('Caught exception: ' . $e->getMessage(), __FILE__, __LINE__);
            return false;
        }
        

        return true;
    }

    private function getSessionStatus()
    {
        session_start();
        if (isset($_SESSION['SESSION'])) {
            write_log("session", __FILE__, __LINE__);
            $sess_id = strip_tags($_SESSION['SESSION']);
            $per_code = strip_tags($_SESSION['PERCODE']);

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
        }
        
        return false;
    }
}
