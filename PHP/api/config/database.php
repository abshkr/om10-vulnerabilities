<?php
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
 
        return $this->conn;
    }
}
