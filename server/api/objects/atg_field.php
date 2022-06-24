<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class AtgField extends CommonClass
{
    protected $TABLE_NAME = 'ATG_FIELDS';
    protected $primary_keys = array("atg_field_code");

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
       "ATG_FIELD_ACTIVE" => "Y"
    );
    
    
    public function check_field()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM ATG_FIELDS
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

    public function get_labels()
    {
        // $langClnFile = __DIR__ . "/../config/langColumns.json";
        $langClnFile = dirname(__FILE__) . "/../config/langColumns.json";
		$jsonColumns = file_get_contents($langClnFile);
		// convert json to an associated array
		$langColumns = json_decode( $jsonColumns, true );
		
        $atgColumns = array();
        foreach ($langColumns as $lang => $tables) {
            $atgColumns[$lang] = array();
            foreach($tables as $tbl => $columns) {
                if ($tbl == "TANKS") {
                    foreach($columns as $key => $value) {
                        $atgColumns[$lang][$key] = $value;
                    }
                }
            }
        }

        $result = array();
        $result["records"] = array();

        array_push($result["records"], $atgColumns);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function get_filters()
    {

        $result = array();
        $result["records"] = array();
        $item = array("TANK_TEMP", "TANK_DENSITY", "TANK_PROD_LVL");

        array_push($result["records"], $item);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function get_fields()
    {
        $query = "
            SELECT * FROM USER_TAB_COLUMNS WHERE TABLE_NAME='TANKS'
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
            FROM ATG_FIELDS
            WHERE 1=1
            ORDER BY ATG_FIELD_CODE
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

    public function post_update()
    {
        $query = "UPDATE ATG_FIELDS SET ATG_FIELD_UPDATED = SYSDATE WHERE ATG_FIELD_CODE=:field_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':field_code', $this->atg_field_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}
