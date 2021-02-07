<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class TripAxle extends CommonClass
{
    protected $TABLE_NAME = 'SPECAXLES';
    // protected $VIEW_NAME = 'TRIP_AXLES_VW';
    protected $primary_keys = array("trip_no", "supp", "axle_id");
    protected $view_keys = array("trip_no", "supp_code", "tnkr_axle_id");


    public $NUMBER_FIELDS = array(
        "TRIP_NO",
        "AXLE_ID",
        "AXLE_WEIGH_IN",
        "AXLE_WEIGH_OUT",

        "TNKR_AXLE_ID",
        "EQPT_SEQ",
        "EQPT_ID",
        "EQPT_AXLE_ID",
        "LIMIT_TYPE_ID",
        "AXLE_GROUP",
        "USER_WEIGHT_LIMIT",
        "AXLE_WEIGHT_LIMIT",
    );

    protected $table_view_map = array(
        "SUPP" => "SUPP_CODE",
        "AXLE_ID" => "TNKR_AXLE_ID",
    );


    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
    );
    
    
    public function check_trip_axle()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM SPECAXLES
            WHERE SUPP = :supp_code AND TRIP_NO = :trip_no AND AXLE_ID = :axle_id
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supp_code', $this->supplier_code);
        oci_bind_by_name($stmt, ':trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':axle_id', $this->axle_id);
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
            FROM TRIP_AXLES_VW
            WHERE SUPP_CODE = :supp_code AND TRIP_NO=:trip_no
            ORDER BY SUPP_CODE, TRIP_NO, TNKR_AXLE_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supp_code', $this->supplier_code);
        oci_bind_by_name($stmt, ':trip_no', $this->shls_trip_no);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
