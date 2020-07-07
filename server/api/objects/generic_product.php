<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class GenericProduct extends CommonClass
{
    protected $TABLE_NAME = 'GENERIC_PROD';
    protected $primary_keys = array("gen_prod_code");
    public $NUMBER_FIELDS = array(
        "GEN_PROD_COUNT",
    );

    public function read()
    {
        $query = "SELECT * FROM GUI_GENERIC_PRODUCTS ORDER BY GEN_PROD_CODE, GEN_DPROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_brief()
    {
        $query = "
            SELECT * FROM GENERIC_PROD 
            ORDER BY GEN_PROD_CODE";
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
