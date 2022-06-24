<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class TankAtgField extends CommonClass
{
    protected $TABLE_NAME = 'TANK_ATG_FIELDS';
    protected $primary_keys = array("atg_field_tank", "atg_field_terminal", "atg_field_code");

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "ATG_FIELD_AUTO" => "Y"
    );
    
    
    public function check_field()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM TANK_ATG_FIELDS
            WHERE ATG_FIELD_TANK=:tank AND ATG_FIELD_TERMINAL=:terminal AND ATG_FIELD_CODE=:field_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank', $this->tank);
        oci_bind_by_name($stmt, ':terminal', $this->terminal);
        oci_bind_by_name($stmt, ':field_code', $this->field_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_field_by_code()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM TANK_ATG_FIELDS
            WHERE ATG_FIELD_CODE=:field_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':field_code', $this->field_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_tanks_by_code()
    {
        $query = "
            SELECT ATG_FIELD_TANK, ATG_FIELD_TERMINAL, ATG_FIELD_TANKDESC, ATG_FIELD_TERMDESC 
            FROM TANK_ATG_FIELDS_VW
            WHERE ATG_FIELD_CODE=:field_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':field_code', $this->field_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_fields()
    {
        $query = "
            SELECT * FROM ATG_FIELDS WHERE ATG_FIELD_ACTIVE='Y'
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

    public function read()
    {
        $query = "
            SELECT *
            FROM TANK_ATG_FIELDS_VW
            WHERE ATG_FIELD_TANK=:tank AND ATG_FIELD_TERMINAL=:terminal
            ORDER BY ATG_FIELD_TANK, ATG_FIELD_TERMINAL, ATG_FIELD_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank', $this->tank);
        oci_bind_by_name($stmt, ':terminal', $this->terminal);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function post_update()
    {
        $query = "UPDATE TANK_ATG_FIELDS SET ATG_FIELD_UPDATED = SYSDATE 
            WHERE ATG_FIELD_TANK=:tank AND ATG_FIELD_TERMINAL=:terminal AND ATG_FIELD_CODE=:field_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank', $this->atg_field_tank);
        oci_bind_by_name($stmt, ':terminal', $this->atg_field_terminal);
        oci_bind_by_name($stmt, ':field_code', $this->atg_field_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}
