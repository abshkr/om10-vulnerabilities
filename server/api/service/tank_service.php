<?php

include_once __DIR__ . '/../shared/log.php';

class TankService
{
    public function __construct($db, $tank_code = null, $auto_commit = false)
    {
        $this->conn = $db;
        $this->tank_code = $tank_code;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    protected function is_multi_folio_tank_base()
    {
        // check if the flag is turned on
        $query = "
            SELECT NVL(CONFIG_VALUE, 'N') CONFIG_VALUE 
            FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_FOLIO_TANK_BASE_CHANGE'
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

    protected function get_folios_by_date($start_date = null, $end_date = null)
    {
        // theoretically, the periods of different closeouts will not be overlapped
        // when start_date = end_date, there should be one closeout matched
        // when either date is null, we will use the current folio id
        if (isset($start_date) && isset($end_date)) {
            $query = "
            SELECT CLOSEOUT_NR,
                CLOSEOUT_DATE END_DATE,
                PREV_CLOSEOUT_DATE START_DATE,
                STATUS,
                DECODE(STATUS,
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS_DESC
            FROM CLOSEOUTS
            WHERE 
                PREV_CLOSEOUT_DATE <= :start_date
                AND (CLOSEOUT_DATE IS NULL OR CLOSEOUT_DATE >= :end_date)
            ORDER BY CLOSEOUT_NR DESC";

            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $start_date);
            oci_bind_by_name($stmt, ':end_date', $end_date);
        } else {
            $query = "
            SELECT CLOSEOUT_NR,
                PREV_CLOSEOUT_DATE START_DATE,
                CLOSEOUT_DATE END_DATE,
                STATUS,
                DECODE(STATUS,
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS_DESC
            FROM CLOSEOUTS
            ORDER BY CLOSEOUT_NR DESC";
            $stmt = oci_parse($this->conn, $query);
        }

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        } 
        $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        $nr = $row['CLOSEOUT_NR'];

        return $nr;
    }

    public function tank_proddata()
    {
        $flag = $this->is_multi_folio_tank_base();
        $query = "
            SELECT 
                TANK_BASE,
                TANK_BASE_NAME,
                TANK_BASE_CLASS,
                TANK_BCLASS_NAME,
                TANK_DENSITY,
                NVL(TANK_BASE_DENS_LO, TANK_BCLASS_DENS_LO) DENSITY_LO,
                NVL(TANK_BASE_DENS_HI, TANK_BCLASS_DENS_HI) DENSITY_HI,
                TANK_BASE_DENS_LO, 
                TANK_BASE_DENS_HI, 
                TANK_BCLASS_DENS_LO,
                TANK_BCLASS_DENS_HI,
                TANK_TEMP,
                TANK_BCLASS_TEMP_LO TEMP_LO,
                TANK_BCLASS_TEMP_HI TEMP_HI
            FROM GUI_TANKS
            WHERE TANK_CODE = :tank_code 
        ";

        if ($flag) {
            $query = "
                SELECT DISTINCT
                    TANK_BASE,
                    TANK_BASE_NAME,
                    TANK_BASE_CLASS,
                    TANK_BCLASS_NAME,
                    OPEN_DENSITY     as TANK_DENSITY,
                    NVL(TANK_BASE_DENS_LO, TANK_BCLASS_DENS_LO) DENSITY_LO,
                    NVL(TANK_BASE_DENS_HI, TANK_BCLASS_DENS_HI) DENSITY_HI,
                    TANK_BASE_DENS_LO, 
                    TANK_BASE_DENS_HI, 
                    TANK_BCLASS_DENS_LO,
                    TANK_BCLASS_DENS_HI,
                    OPEN_TEMP        as TANK_TEMP,
                    TANK_BCLASS_TEMP_LO TEMP_LO,
                    TANK_BCLASS_TEMP_HI TEMP_HI,
                    CLOSEOUT_NR,
                    BASE_PERIOD_INDEX,
                    BASE_PERIOD_OPEN,
                    BASE_PERIOD_CLOSE
                FROM 
                    GUI_FOLIO_TANKS
                WHERE 
                    TANK_CODE = :tank_code
                    AND CLOSEOUT_NR = :closeout_nr
                    -- AND (BASE_PERIOD_OPEN IS NULL OR BASE_PERIOD_OPEN <= :move_time)
                    -- AND (BASE_PERIOD_CLOSE IS NULL OR BASE_PERIOD_CLOSE >= :move_time)
            ";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if ($flag) {
            $closeout_nr = $this->get_folios_by_date($this->move_time, $this->move_time);
            oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
            // oci_bind_by_name($stmt, ':move_time', $this->move_time);
        }
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tank_proddata2()
    {
        // GUI_TANKS already has everthing including tanks, base products, and base classes.
        $query = "
            SELECT TANK_BASE,
                TANK_DENSITY,
                NVL(BASE_DENS_LO, BCLASS_DENS_LO) DENSITY_LO,
                NVL(BASE_DENS_HI, BCLASS_DENS_HI) DENSITY_HI,
                TANK_TEMP,
                BCLASS_TEMP_LO TEMP_LO,
                BCLASS_TEMP_HI TEMP_HI
            FROM GUI_TANKS, BASE_PRODS, BASECLASS
            WHERE TANK_CODE = :tank_code 
                AND TANK_BASE = BASE_CODE
                AND BASE_PRODS.BASE_CAT = BASECLASS.BCLASS_NO(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tanks_by_base($base_code)
    {
        if (isset($base_code)) {
            $query = "
                SELECT TANK_CODE, TANK_BASE
                FROM GUI_TANKS
                WHERE TANK_BASE = :tank_base
                ORDER BY TANK_CODE";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tank_base', $base_code);
        } else {
            $query = "
                SELECT TANK_CODE, TANK_BASE
                FROM GUI_TANKS
                ORDER BY TANK_CODE";
            $stmt = oci_parse($this->conn, $query);
        }
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function additive_tanks()
    {
        $query = "
            SELECT TANK_CODE, BASE_CODE, BASE_NAME
            FROM BASE_PRODS, TANKS 
            WHERE TANK_BASE = BASE_CODE AND BASE_CAT = 6
            ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function base_tanks()
    {
        $query = "
            SELECT TANK_CODE, BASE_CODE, BASE_NAME
            FROM BASE_PRODS, TANKS 
            WHERE TANK_BASE = BASE_CODE AND BASE_CAT != 6
            ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tanks()
    {
        $query = "
            SELECT TANK_CODE, BASE_CODE, BASE_NAME
            FROM BASE_PRODS, TANKS 
            WHERE TANK_BASE = BASE_CODE
            ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
