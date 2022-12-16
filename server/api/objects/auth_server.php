<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class AuthServer extends CommonClass
{
    protected $TABLE_NAME = 'AUTH_SERVERS';

    public $NUMBER_FIELDS = array(
        "AS_ROLE",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "AS_ACTIVE" => 1
    );
    
    public function check_server()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM AUTH_SERVERS
            WHERE (AS_CODE=:server OR AS_NAME=:server OR AS_IP=:server)
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':server', $this->server);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read()
    {
        $query = "
            SELECT AS_CODE, AS_NAME, AS_IP, AS_USERNAME, AS_PASSWORD, AS_BASE_DN, AS_FILTERS, AS_TYPE, AS_NOTE, AS_ROLE, AS_ACTIVE, AUTH_LEVEL_NAME AS AS_ROLE_NAME
            FROM AUTH_SERVERS, AUTH_LEVEL_TYP
            WHERE AS_ROLE = AUTH_LEVEL_ID(+)
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
     
    public function read_ldap_servers()
    {
        $query = "
            SELECT AS_CODE, AS_NAME, AS_IP, AS_USERNAME, AS_PASSWORD, AS_BASE_DN, AS_FILTERS, AS_TYPE, AS_NOTE, AS_ROLE, AS_ACTIVE
            FROM AUTH_SERVERS
            WHERE AS_TYPE='LDAP'
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
     
    public function read_saml_servers()
    {
        $query = "
            SELECT AS_CODE, AS_NAME, AS_IP, AS_USERNAME, AS_PASSWORD, AS_BASE_DN, AS_FILTERS, AS_TYPE, AS_NOTE, AS_ROLE, AS_ACTIVE
            FROM AUTH_SERVERS
            WHERE AS_TYPE='SAML'
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
