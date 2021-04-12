<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../objects/tank.php';
include_once 'common_class.php';

class TankBatch extends CommonClass
{
    protected $TABLE_NAME = 'TANK_BATCHES';
    protected $VIEW_NAME = 'TANK_BATCHES_VW';
    protected $primary_keys = array("tank_batch_code");
    protected $view_keys = array("tank_batch_code");


    /* protected $table_view_map = array(
        "LIMIT_TYPE_ID" => "AXLE_LIMIT_TYPE_ID",
    ); */

    public $NUMBER_FIELDS = array(
        "TANK_DENSITY",
        "TANK_API",
        "TANK_STD_TEMP",
        "TANK_PROD_C_OF_E",
        "TANK_15_DENSITY",
        "TANK_SULPHUR",
        "TANK_FLASHPOINT",
        "TANK_VISCOSITY",
        "TANK_SG",
        "TANK_ROOF_WEIGHT",
        "TANK_BCLASS_DENS_LO",
        "TANK_BCLASS_DENS_HI",
        "TANK_BCLASS_TEMP_LO",
        "TANK_BCLASS_TEMP_HI",
        "TANK_BASE_REF_TEMP",
        "TANK_BASE_DENS_LO",
        "TANK_BASE_DENS_HI",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "AFC_ENABLED" => "Y",
        "TANK_DENS_MODE" => 1,
    );
    
    
    public function check_batches_by_tank()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM TANK_BATCHES
            WHERE TANK_CODE=:code and TANK_TERMINAL=:term 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->tank_code);
        oci_bind_by_name($stmt, ':term', $this->tank_terminal);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_batches_by_code()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM TANK_BATCHES
            WHERE TANK_BATCH_CODE=:code 
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->tank_batch_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_batches_by_detail()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM TANK_BATCHES
            WHERE 
                TANK_BATCH_CODE=:code 
                and TANK_CODE=:tank
                and TANK_TERMINAL=:term
                and TANK_BASE=:base
                and TRUNC(TANK_DENSITY, 3)=TRUNC(:dens, 3)
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->tank_batch_code);
        oci_bind_by_name($stmt, ':tank', $this->tank_code);
        oci_bind_by_name($stmt, ':term', $this->tank_terminal);
        oci_bind_by_name($stmt, ':base', $this->tank_base);
        oci_bind_by_name($stmt, ':dens', $this->tank_density);
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
        if (!isset($this->tank_batch_code)) {
            $this->tank_batch_code = "-1";
        }
        if (!isset($this->tank_code)) {
            $this->tank_code = "-1";
        }
        if (!isset($this->tank_terminal)) {
            $this->tank_terminal = "-1";
        }
        if (!isset($this->tank_base)) {
            $this->tank_base = "-1";
        }
        if (!isset($this->tank_base_class)) {
            $this->tank_base_class = -1;
        }
        if (!isset($this->tank_dens_mode)) {
            $this->tank_dens_mode = -1;
        }
        // tank_batch_time     date            default sysdate not null,
        if (!isset($this->start_date)) {
            $this->start_date = "-1";
        }
        if (!isset($this->end_date)) {
            $this->end_date = "-1";
        }
        if (isset($this->start_date) && $this->start_date === -1) {
            $this->start_date = "-1";
        }
        if (isset($this->end_date) && $this->end_date === -1) {
            $this->end_date = "-1";
        }
        $this->start_date = trim($this->start_date);
        $this->end_date = trim($this->end_date);

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . "
            WHERE 
                1 = 1
        ";

        if ( $this->start_date === "-1") {
            $query .= "
                AND ('-1' = :start_date) 
            ";
        } else {
            $query .= "
                AND (TANK_BATCH_TIME > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')) 
            ";
        }
        if ( $this->end_date === "-1") {
            $query .= "
                AND ('-1' = :end_date)
            ";
        } else {
            $query .= "
                AND (TANK_BATCH_TIME < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS'))
            ";
        }
        $query .= "
                AND ('-1' = :code OR TANK_BATCH_CODE LIKE '%'||:code||'%')
                AND ('-1' = :tank OR TANK_CODE = :tank)
                AND ('-1' = :term OR TANK_TERMINAL = :term)
                AND ('-1' = :base OR TANK_BASE = :base)
                AND (-1 = :catg OR TANK_BASE_CLASS = :catg)
                AND (-1 = :dens OR TANK_DENS_MODE = :dens)
            ORDER BY TANK_BATCH_TIME DESC
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_date', $this->start_date);
        oci_bind_by_name($stmt, ':end_date', $this->end_date);
        oci_bind_by_name($stmt, ':code', $this->tank_batch_code);
        oci_bind_by_name($stmt, ':tank', $this->tank_code);
        oci_bind_by_name($stmt, ':term', $this->tank_terminal);
        oci_bind_by_name($stmt, ':base', $this->tank_base);
        oci_bind_by_name($stmt, ':catg', $this->tank_base_class);
        oci_bind_by_name($stmt, ':dens', $this->tank_dens_mode);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_by_code()
    {
        if (!isset($this->tank_batch_code)) {
            $this->tank_batch_code = "-1";
        }
        $query = "
            SELECT * 
            FROM TANK_BATCHES_VW
            WHERE TANK_BATCH_CODE=:code 
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->tank_batch_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    private function is_batch_num_existed()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM TANK_BATCHES
            WHERE TANK_BATCH_CODE=:code 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->tank_batch_no);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return (int)$row['CNT'];
    }

    /* public function pre_update() 
    {
        // check if the batch number exists in history
        if (isset($this->tank_batch_code) && strlen(trim($this->tank_batch_code)) > 0) {
            $this->tank_batch_code = trim($this->tank_batch_code);
            $isExisted = $this->is_batch_num_existed();

            if ($isExisted <= 0) {
                // not existed, do insertion
                $this->create();
            } else {
                // existed, do modification
                // return parent::update();
            }
        }
    }

    protected function post_update() {
        // update TANKS
        $tank = new Tank($this->conn);
        if (isset($this->tank_code)) {
            $tank->tank_code = $this->tank_code;
        }
        if (isset($this->tank_terminal)) {
            $tank->tank_terminal = $this->tank_terminal;
        }
        if (isset($this->tank_batch_no)) {
            $tank->tank_batch_no = $this->tank_batch_no;
        }
        if (isset($tank->tank_code) && isset($tank->tank_terminal) && isset($tank->tank_batch_no)) {
            $tank->update();
        }

        return true;
    } */

}
