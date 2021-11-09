<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class ProdInv extends CommonClass
{
    protected $TABLE_NAME = 'TANKS';

    public $NUMBER_FIELDS = array(
        "NETVOL",
        "GROSSVOL",
        "USABLEVOL",
        "BOOKBALANCE"
    );

    protected function is_terminal_allowed()
    {
        // check if the flag is turned on
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

        return true;
    }

    public function read() 
    {
        if ($this->is_terminal_allowed()) {
            return $this->read_with_terminal();
        } else {
            return $this->read_without_terminal();
        }

    }

    // read product inventory without terminal
    public function read_with_terminal()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND TERMINAL.TERM_CODE = :term_code ";
        }
        $query = "
            SELECT 
                TANKS.TANK_TERMINAL                                AS TANK_SITE,
                TERMINAL.TERM_CODE || ' - ' || TERMINAL.TERM_NAME  AS TANK_SITENAME,
                BASE_PRODS.BASE_CODE                               AS BASE_CODE,
                BASE_PRODS.BASE_NAME                               AS BASE_NAME,
                SUM(TANK_COR_VOL * TANK_RPTVCF)                    AS NETVOL,
                SUM(TANK_AMB_VOL * TANK_RPTVCF)                    AS GROSSVOL,
                SUM(NVL(TANK_SAFE_CAPACITY,0) - NVL(TANK_TOTAL_VOL, (NVL(TANK_AMB_VOL,0) + NVL(TANK_WATER,0) + NVL(TANK_IFC,0)))) AS ULLAGE,
                SUM(TANK_LTR_CLOSE * TANK_RPTVCF)                  AS USABLEVOL,
                SUM(TANK_LTR_CLOSE * TANK_RPTVCFCLOSE + TANK_RCPT_VOL * TANK_RPTVCF - TANK_TRF_VOL * TANK_RPTVCF)   AS BOOKBALANCE
            FROM 
                TANKS, 
                TERMINAL,
                BASE_PRODS
            WHERE 
                BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
                AND TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
                $terminal_condition
            GROUP BY TANKS.TANK_TERMINAL, (TERMINAL.TERM_CODE || ' - ' || TERMINAL.TERM_NAME), BASE_PRODS.BASE_CODE, BASE_PRODS.BASE_NAME
            ORDER BY TANKS.TANK_TERMINAL, BASE_PRODS.BASE_CODE
        ";

        $stmt = oci_parse($this->conn, $query);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }

    // read product inventory without terminal
    public function read_without_terminal()
    {
        $query = "
            SELECT BASE_PRODS.BASE_CODE BASE_CODE,
                BASE_PRODS.BASE_NAME BASE_NAME,
                SUM(TANK_COR_VOL * TANK_RPTVCF) NETVOL,
                SUM(TANK_AMB_VOL * TANK_RPTVCF) GROSSVOL,
                SUM(NVL(TANK_SAFE_CAPACITY,0) - NVL(TANK_TOTAL_VOL, (NVL(TANK_AMB_VOL,0) + NVL(TANK_WATER,0) + NVL(TANK_IFC,0)))) ULLAGE,
                SUM(TANK_LTR_CLOSE * TANK_RPTVCF) USABLEVOL,
                SUM(TANK_LTR_CLOSE * TANK_RPTVCFCLOSE + TANK_RCPT_VOL * TANK_RPTVCF - TANK_TRF_VOL * TANK_RPTVCF) BOOKBALANCE
            FROM TANKS, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
            GROUP BY BASE_CODE, BASE_NAME
            ORDER BY BASE_CODE
        ";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}
