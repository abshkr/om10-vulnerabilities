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

    public function tank_proddata()
    {
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
