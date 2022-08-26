<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class InvRequest extends CommonClass
{
    protected $TABLE_NAME = 'TKINVRQ';

    public $BOOLEAN_FIELDS = array(
        "TKRQ_ALLFLAG" => "Y",
        "TANK_INV_NEEDED" => "Y",
        "TANK_ADHOC_IVRQ" => "Y"
    );

    public $NUMBER_FIELDS = array(
        
    );

    public function inv_req_period_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->inv_req_period_types();
    }

    public function inv_request_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->inv_request_types();
    }

    public function count_tanks()
    {
        $query = "
            SELECT COUNT(*) AS CNT
            FROM TANKS
            WHERE TANK_TERMINAL = :term_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':term_code', $this->terminal);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tanks()
    {
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_INVRQ_TANK_AUTOGAUGING", "N");
        $flag = ($config_value === 'Y' || $config_value === 'y');

        $gauge_condition = "";
        if ($flag) {
            $gauge_condition = " AND tnk.TANK_GAUGINGMTHD = 1 ";
        }

        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND trm.TERM_CODE = :term_code ";
        }
        $query = "
            SELECT 
                tnk.TANK_CODE,
                tnk.TANK_NAME,
                tnk.TANK_TERMINAL,
                trm.TERM_CODE || ' - ' || trm.TERM_NAME  AS TANK_TERMNAME,
                tnk.TANK_GAUGINGMTHD,
                gmt.GAUGE_METHOD_NAME                as TANK_GAUGINGMTHD_DESC,
                tnk.TANK_INV_NEEDED,
                tnk.TANK_ADHOC_IVRQ
            FROM 
                TANKS              tnk,
                GAUGE_METHOD_TYP   gmt,
                TERMINAL           trm
            WHERE 
                tnk.TANK_TERMINAL = trm.TERM_CODE
                and tnk.TANK_GAUGINGMTHD = gmt.GAUGE_METHOD_ID(+)
                $gauge_condition 
                $terminal_condition
            ORDER BY tnk.TANK_CODE, tnk.TANK_TERMINAL
        ";
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function is_terminal_allowed()
    {
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_ALLOW_MULTI_TERMINALS", "N");
        $flag = ($config_value === 'Y' || $config_value === 'y');

        return $flag;
        /* // check if the flag is turned on
        $query = "
            SELECT NVL(CONFIG_VALUE, 'N') CONFIG_VALUE 
            FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_ALLOW_MULTI_TERMINALS'
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        } 
        $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        if ($row['CONFIG_VALUE'] !== 'Y') {
            return false;
        }

        return true; */
    }

    public function read() 
    {
        if ($this->is_terminal_allowed()) {
            return $this->read_with_terminal();
        } else {
            return $this->read_without_terminal();
        }
    }

    // read inventory requests
    public function read_without_terminal()
    {
        $query = "
        SELECT TKRQ_DEPOT,
            TKRQ_ALLFLAG,
            TKRQ_DUE,
            TKRQ_PERIOD,
            RQ_PERIOD_NAME TKRQ_PERIOD_NAME,
            TKRQ_TYPE,
            RQ_NAME TKRQ_TYPE_NAME,
            TKRQ_FIRST
        FROM TKINVRQ, RQ_TYP, RQ_PERIOD_TYP
        WHERE TKRQ_TYPE = RQ_ID AND TKRQ_PERIOD = RQ_PERIOD_ID
        ORDER BY TKRQ_DUE DESC";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // read inventory requests
    public function read_with_terminal()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND trm.TERM_CODE = :term_code ";
        }
        $query = "
            SELECT 
                tir.TKRQ_DEPOT,
                trm.TERM_CODE || ' - ' || trm.TERM_NAME  AS TKRQ_DEPOTNAME,
                tir.TKRQ_ALLFLAG,
                tir.TKRQ_DUE,
                tir.TKRQ_PERIOD,
                rpt.RQ_PERIOD_NAME                       AS TKRQ_PERIOD_NAME,
                tir.TKRQ_TYPE,
                rqt.RQ_NAME                              AS TKRQ_TYPE_NAME,
                tir.TKRQ_FIRST
            FROM 
                TKINVRQ          tir, 
                TERMINAL         trm,
                RQ_TYP           rqt, 
                RQ_PERIOD_TYP    rpt
            WHERE 
                tir.TKRQ_TYPE = rqt.RQ_ID 
                AND tir.TKRQ_PERIOD = rpt.RQ_PERIOD_ID
                AND tir.TKRQ_DEPOT = trm.TERM_CODE
                $terminal_condition
            ORDER BY TKRQ_DUE DESC
        ";
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pre_update()
    {
        write_log(sprintf("TKINVRQ111 [%s][%s]", $this->tkrq_due, $this->tkrq_key),
        __FILE__, __LINE__, LogLevel::WARNING);

        if (isset($this->tkrq_due) && 
        isset($this->tkrq_key) && 
        $this->tkrq_due != $this->tkrq_key) {
            write_log(sprintf("TKINVRQ222 [%s][%s]", $this->tkrq_due, $this->tkrq_key),
            __FILE__, __LINE__, LogLevel::WARNING);
            // Since tkrq_due is PK, if it is changed, need update it first
            $query = "
                UPDATE TKINVRQ
                SET TKRQ_DUE = TO_DATE(:tkrq_due, 'YYYY-MM-DD HH24:MI:SS')
                WHERE TKRQ_DUE = TO_DATE(:tkrq_key, 'YYYY-MM-DD HH24:MI:SS')
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tkrq_due', $this->tkrq_due);
            oci_bind_by_name($stmt, ':tkrq_key', $this->tkrq_key);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return; // false;
            }
            
        }

        // TKRQ_DEPOT
        // TKRQ_ALLFLAG
        // TKRQ_DUE
        // TKRQ_PERIOD
        // TKRQ_TYPE
        // TKRQ_FIRST

        // return parent::update();
    }
}
